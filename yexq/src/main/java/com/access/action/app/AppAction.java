package com.access.action.app;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.access.base.BaseAction;
import com.access.core.constant.Constants;
import com.access.core.util.MacUtil;
import com.access.core.util.PropertiesUtil;
import com.access.core.util.StringUtil;
import com.access.core.util.ValidateUtil;
import com.access.core.util.rules.Length;
import com.access.core.util.rules.Numeric;
import com.access.core.util.rules.Regex;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;
import com.access.model.device.Device;
import com.access.model.system.Location;
import com.access.model.system.ThirdPartAuth;
import com.access.model.user.TerminalUser;
import com.access.model.user.TerminalUserAuthLog;
import com.access.service.device.DeviceService;
import com.access.service.system.SystemService;
import com.access.service.user.UserService;

@Controller
@Namespace("/app")
public class AppAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(this.getClass());

	@Resource(name="deviceService")
	private DeviceService deviceService;
	@Resource(name="systemService")
	private SystemService systemService;
	@Resource(name="userService")
	private UserService userService;

	/**
	 * 发送验证码
	 * @return
	 */
	@Action(value = "sms", results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	public String sms() {
		resultMap = new HashMap<String, Object>();
		String retMessage = StringUtils.EMPTY;

		try {
			// 获取参数
			String authId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("phone")));
			String devId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("dev_id")));

			// 校验参数
			ValidateUtil vu = new ValidateUtil();
			vu.add("authId", authId, PropertiesUtil.confProperties.getProperty("user.param.authId"), 
					new Rule[]{new Required(), new Numeric(),new Length(11,11), new Regex(Constants.CELLPHONE_PATTERN)});
			vu.add("devId", devId, PropertiesUtil.confProperties.getProperty("user.param.deviceId"), new Rule[]{new Required()});
			String validStr = vu.validateString();
			
			// 校验结果不为null，参数有误，返回参数校验结果
			if (validStr != null) {
				resultMap = this.getResult(validStr);

			} else {
				Device device = null;
				boolean isVirtualDeviceLocked = false;
				
				// 获取第三方设备(third_part_auth表)的idList
				List<String> thirdPartDeviceIdList = this.systemService.getAllThirdPartAuthVirtualDeviceIds();

				// 参数设备ID在第三方设备中时，根据devId获取第三方设备对象，根据设备状态判读该设备是否被锁定
				if (thirdPartDeviceIdList.contains(devId)) {
					ThirdPartAuth thirdPartAuth = this.systemService.getThirdPartAuthByDeviceId(devId);

					if (thirdPartAuth != null) {
						isVirtualDeviceLocked = thirdPartAuth.getStatus().equalsIgnoreCase(Constants.THIRD_PART_AUTH_STATUS_LOCKED);
					}
				}

				// 第三方设备被锁定时，返回第三方设备暂时被锁定
				if (isVirtualDeviceLocked) {
					retMessage = PropertiesUtil.confProperties.getProperty("user.msg.blockedVirtualDevice");
					resultMap = this.getResult(retMessage);

				} else {
					// 根据devId获取device对象
					device = this.deviceService.getDeviceById(devId);
					
					// device为空时，返回非法设备
					if (device == null) {
						retMessage = PropertiesUtil.confProperties.getProperty("user.msg.illegalDevice");
						resultMap = this.getResult(retMessage);
					
					} else {
						// device不为空时，检查用户是否在设备上被锁定
						boolean isUserBlockedOnDevice = false;
						
						// 根据authId获取terminalUser对象
						TerminalUser user = this.userService.getTerminalUserByAuthId(authId);

						// terminalUser不存在时添加记录
						if (user == null) {
							user = this.userService.addTerminalUserAndLink(authId, device,Constants.PORTAL_AUTH_TYPE_MOBILE,null);
							
						} else {
							// 用户已存在时，判断该用户在此设备上是否被锁定
							isUserBlockedOnDevice = this.userService.isUserBlockedOnDevice(device, user);
						}

						Boolean isBlockUserEnabled = Boolean.parseBoolean(PropertiesUtil.confProperties.getProperty("user.auth.userBlock.isEnable"));
						
						// 没有锁定的情况时，生成验证码并发送
						if (!isUserBlockedOnDevice || !isBlockUserEnabled) {
							// 生成 auth_code 并保存到 TerminalUser表
							String authCode = RandomStringUtils.random(Constants.AUTH_CODE_LENGTH, false,true);
							user.setAuthCode(authCode);
							this.userService.saveOrUpdateTerminalUser(user);

							// 添加验证记录
							TerminalUserAuthLog authLog = this.userService.saveAuthLog(device,user,Constants.USER_STATUS_OFFLINE, Constants.PORTAL_AUTH_TYPE_MOBILE);

							// 发送验证短信到 auth_id
							this.sendCodeBySms(authId, device.getDeviceId(), authCode, authLog.getId());
							
							resultMap = this.getResult();
							
						} else {
							// 用户在该设备上被锁定时，返回用户在该设备上被锁定
							resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("user.msg.userIsLockedOnDevice"));
						}
					}
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("app", this.getClass().toString(), e);
		}
		return SUCCESS;
	}

	/**
	 * 校验验证码
	 * @return
	 */
	@Action(value = "checkcode", results = { @Result(name = SUCCESS, type = "json", params = {
			"root", "resultMap" }) })
	public String checkCode() {
		resultMap = new HashMap<String, Object>();
		String retMessage = StringUtils.EMPTY;
		
		try {
			String authId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("phone")));
			String authCode = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("code")));
			String devId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("dev_id")));
			String mac = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("terminal_mac")));
			String terminalType = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("terminal_type")));
//			String browserType = StringUtil.fromGetRequest(this.request.getParameter("browser_type"));
//			following next two parameters (accountId and wechatPubAcctId)
//			used for WECHAT auth type
//			String wechatPubAcctId =StringUtil.fromGetRequest(this.request.getParameter("wechat_pub_acct"));
//			String accountId = StringUtil.fromGetRequest(this.request.getParameter("account_id"));

			String authType = Constants.PORTAL_AUTH_TYPE_APPMOBILE;

			// 把mac格式化为平台mac格式
			mac = MacUtil.convertMacToTwifiFormat(mac);

			ValidateUtil vu = new ValidateUtil();
			vu.add("authId", authId, PropertiesUtil.confProperties.getProperty("user.param.authId"),
					new Rule[] { new Numeric() });
			vu.add("authCode", authCode, PropertiesUtil.confProperties.getProperty("user.param.authCode"),
					new Rule[] { new Length(Constants.AUTH_CODE_LENGTH,Constants.AUTH_CODE_LENGTH), new Numeric() });
			vu.add("MAC", mac, PropertiesUtil.confProperties.getProperty("api.param.mac"), 
					new Rule[] { new Required(),new Regex(Constants.MAC_PATTERN) });
			vu.add("devId", devId, PropertiesUtil.confProperties.getProperty("user.param.deviceId"),
					new Rule[] { new Required() });
			vu.add("terminalType", terminalType, PropertiesUtil.confProperties.getProperty("user.param.terminalType"),
					new Rule[] { new Required() });
			// vu.add("browserType", browserType, "Browser Type", new Rule[]{new Required()});
			String validStr = vu.validateString();

			if (StringUtils.isNotEmpty(validStr)) {
				resultMap = this.getResult(validStr);

			} else {
				Device device = this.deviceService.getDeviceById(devId);

				// 非法设备
				if (device == null) {
					resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("user.msg.illegalDevice"));

				} else {
					// user login without cellphone number and authcode
					Boolean isAuthWithoutCode = null; 
					TerminalUser user = null;

					// 第一次验证
					if (StringUtils.isNotBlank(authCode)&& StringUtils.isNotBlank(authId)) {
						isAuthWithoutCode = Boolean.FALSE;
						user = this.userService.getTerminalUserByAuthId(authId);
					}
					
					// 之前验证过的
					if (StringUtils.isBlank(authCode) && StringUtils.isBlank(authId)) {
						isAuthWithoutCode = Boolean.TRUE;
						user = this.userService.getTerminalUserByMap(mac,authType);
					}

					if (user == null) {
						retMessage = PropertiesUtil.confProperties.getProperty("user.msg.pleateGetValidateCode");
						resultMap = this.getResult(retMessage);

					} else {

						if (isAuthWithoutCode != null) {
							
							// 使用了验证码
							if (isAuthWithoutCode == Boolean.FALSE && 
									(StringUtils.isBlank(user.getAuthCode()) || !user.getAuthCode().equalsIgnoreCase(authCode))) {
								
								// 号码或验证码不正确，请重新获取验证码
								retMessage = PropertiesUtil.confProperties.getProperty("user.msg.reGetValidateCode");
								resultMap = this.getResult(retMessage);

							} else {
								// 获取 TernimalUserAuthLog 记录
								TerminalUserAuthLog authLog = null;

								if (isAuthWithoutCode == Boolean.FALSE) {
									authLog = this.userService.getLatestUserAuthLogsByUserId(user.getId());

								} else {
									TerminalUserAuthLog latestAuthLog = this.userService.getLastAuthLogByMap(null,mac, authType);

									if (latestAuthLog != null) {
										authLog = new TerminalUserAuthLog();
										authLog.setTerminalUserId(latestAuthLog.getTerminalUserId());
										authLog.setLogContent(latestAuthLog.getLogContent());
										authLog.setAuthType(latestAuthLog.getAuthType());
										authLog.setDeviceId(devId);
										authLog.setStatus(latestAuthLog.getStatus());
										authLog.setModifiedDatetime(new Date());
										this.userService.saveOrUpdateTerminalUserAuthLog(authLog);
									}
								}

								if (authLog == null) {
									// 号码或验证码不正确，请重新获取验证码
									retMessage = PropertiesUtil.confProperties.getProperty("user.msg.reGetValidateCode");
									resultMap = this.getResult(retMessage);
									
								} else {
									// 查找设备所归属的AccountId
									Location location = this.deviceService.getLocationById(device.getLocationId());
									Long deviceOwnerId = location.getAccountId();

									// 生成token
									String uuid = UUID.randomUUID().toString().toUpperCase().replace("-", "");
									String token = uuid.substring(0,Constants.AUTH_TOKEN_LENGTH);

									// 更新authLog 中的token
									authLog.setToken(token);
									authLog.setStatus(Constants.USER_STATUS_ONLINE);
									
									if (StringUtils.isNotBlank(terminalType)) {
										authLog.setTerminalType(terminalType);
									}
//									if(StringUtils.isNotBlank(browserType)){
//										authLog.setBrowserType(browserType);
//									}
									
									// 更新用户状态为在线
									user.setMac(mac);
									user.setStatus(Constants.USER_STATUS_ONLINE);
									this.userService.saveOrUpdateTerminalUser(user);
									
									this.userService.saveOrUpdateTerminalUserAuthLog(authLog);
									this.userService.saveUserInfo(device, user,authLog, deviceOwnerId, token);

									// 反馈result = ok and token
									resultMap.put("token", token);
									resultMap.put("message", "");
									resultMap.put("result", "OK");
								}
							}
						} else {
							retMessage = "数据提交错误";
							resultMap = this.getResult(retMessage);
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			this.getResult( PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("app", this.getClass().toString(), e);
		}

		return SUCCESS;
	}


}
