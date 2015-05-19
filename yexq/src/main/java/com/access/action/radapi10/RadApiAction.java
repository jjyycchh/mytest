package com.access.action.radapi10;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
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
import com.access.core.token.TwifiTokenRepository;
import com.access.core.util.DateUtil;
import com.access.core.util.PropertiesUtil;
import com.access.core.util.StringUtil;
import com.access.core.util.ValidateUtil;
import com.access.core.util.rules.CheckBox;
import com.access.core.util.rules.Length;
import com.access.core.util.rules.Numeric;
import com.access.core.util.rules.Regex;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;
import com.access.model.device.AAAVirtualDevice;
import com.access.model.device.Device;
import com.access.model.system.Location;
import com.access.model.user.TerminalUser;
import com.access.model.user.TerminalUserAuthLog;
import com.access.service.account.AccountService;
import com.access.service.user.UserService;

@Controller
@Namespace("/radapi10")
public class RadApiAction extends BaseAction{

	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name = "accountService")
	AccountService accountService;
	
	@Resource(name = "userService")
	UserService userService;
	

	/**
	 * AC认证
	 * @return
	 */
	@Action(value = "userauth", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String userAuth() {
        resultMap = new HashMap<String, Object>();
        String retMessage = StringUtils.EMPTY;
        try {
			String authType = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("auth_type")));
			String authId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("auth_id")));
			String authCode = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("auth_code")));
			String acName = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("ac_name")));
            String authGwType = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("auth_gw_type")));
            String userIp = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("user_ip")));
            String mac = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("user_mac")));

            if (StringUtils.isNotBlank(mac)) {
                mac = mac.toUpperCase();
                mac = mac.replace(":","").replace("-","").replace(".","");
            }
            
            if (org.apache.commons.lang3.StringUtils.isNotBlank(authType)) {
                authType = authType.toUpperCase();
            }

			ValidateUtil vu = new ValidateUtil();
			vu.add("authType", authType, PropertiesUtil.confProperties.getProperty("user.param.authType"),
					new Rule[]{new Required()});

			String validStr = vu.validateString();
			if (org.apache.commons.lang3.StringUtils.isNotBlank(validStr)) {
				resultMap.put("result", "FAIL");
				resultMap.put("message", validStr);
				
			}else {
                AAAVirtualDevice radius = this.deviceService.getRaduisByAcname(acName);

                if (radius == null ){
                    resultMap.put("result", "FAIL");
                    resultMap.put("message", "NAS设备尚未注册！");
                    
                }else {
                	
                    String devId = radius.getDeviceId();
                    if (StringUtils.isBlank(mac)) {
                        /*List<DhcpInfo> dhcpInfos = this.deviceService.getOnlineDhcpInfosByUserIp(userIp);
                        if (dhcpInfos == null || dhcpInfos.size() == 0) {
                            resultMap.put("result", "FAIL");
                            resultMap.put("message", "IP 找不到对应已经绑定的设备MAC地址");
                        }
                        else {
                            mac = dhcpInfos.get(0).getMac();
                        }*/
                    	mac = "085700A7DAF7";
                    }
                    
                    // 获取商户ID
                    Long merchantId = deviceService.getAccountIdByDeviceId(devId);
                    
                    if(merchantId == null) {
                    	retMessage = PropertiesUtil.confProperties.getProperty("user.msg.accountIsNOtExists");
                    	resultMap = this.getResult(retMessage);
                    	return SUCCESS;
                    }

   	                // 免验证类型
                    if (authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_OPTION)) {
                        ValidateUtil vul = new ValidateUtil();
                        vul.add("user ip", userIp, "user ip", new Rule[]{new Required(),
                                new Regex(Constants.IP_PATTERN)});
                        vul.add("AC name", acName, "AC name", new Rule[]{new Required()});
                        vul.add("authGwType", authGwType, "auth gateway type",
                                new Rule[]{new Required(), new CheckBox(new String[]{"RADIUS"})});
                        vul.add("MAC", mac, "Mac", new Rule[]{/*new Required(),*/ new Regex(Constants.MAC_PATTERN)});

                        validStr = vul.validateString();
                        authId =  DateUtil.formatToString(new Date(), DateUtil.YYYYMMDDHHMMSS)
                                + UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();

                        logger.info("进入免验证");
                        
                        if (org.apache.commons.lang3.StringUtils.isNotBlank(validStr)) {
                            resultMap.put("result", "FAIL");
                            resultMap.put("message", validStr);
                            
                        } else {
                            Device device = this.deviceService.getDeviceById(devId);
                            if (device == null) {
                                retMessage = "非法设备";
                                resultMap.put("message", retMessage);
                                resultMap.put("result", "FAIL");
                           
                            }else {
                                //1. 检查 terminal uer 是否存在
                                boolean isUserBlockedOnDevice = false;

//                                AccountWithBLOBs merchant = deviceService.getAccountByDeviceId(devId);
                                
                                TerminalUser user = this.userService.getTerminalUser(merchantId, null, authType, mac);

                                if (user == null) {
//                                    user = this.userService.createNewUser(authId, device, Constants.PORTAL_AUTH_TYPE_OPTION, mac);
                                    user = this.userService.addTerminalUserAndLink(authId, device, Constants.PORTAL_AUTH_TYPE_OPTION, mac);
                               
                                }else {
//                                    isUserBlockedOnDevice = this.userService.processExistedUser(device, user);
                                	this.userService.isUserBlockedOnDevice(device, user);
                                }

                                Boolean isBlockUserEnabled = Boolean.parseBoolean(PropertiesUtil.confProperties.getProperty("user.auth.userBlock.isEnable"));
                               
                                if (!isUserBlockedOnDevice || !isBlockUserEnabled) {
                                    //2. 生成 auth_code 并保存到 TerminalUser表
                                    authCode = RandomStringUtils.random(Constants.AUTH_CODE_LENGTH, false, true);
                                    user.setAuthType(Constants.PORTAL_AUTH_TYPE_OPTION);
                                    user.setAuthCode(authCode);
                                    user.setMac(mac);
                                    this.userService.saveOrUpdateTerminalUser(user);

                                    //3. 插入 authentication_log记录
//                                    TerminalUserAuthLog authLog = this.userService.saveAuthLog(device, user, Constants.USER_STATUS_ONLINE);
                                    TerminalUserAuthLog authLog = this.userService.saveAuthLog(device, user, Constants.USER_STATUS_ONLINE, authType);
                                    
                                    //4. 查找设备所归属的AccountId
                                    Location location = this.deviceService.getLocationById(device.getLocationId());
                                    Long deviceOwnerId = location.getAccountId();

                                    //5. 生成token
                                    String uuid = UUID.randomUUID().toString().toUpperCase();
                                    uuid = uuid.replace("-", "");
                                    String token = uuid.substring(0, Constants.AUTH_TOKEN_LENGTH);

                                    //6. 更新authLog 中的token
                                    authLog.setToken(token);
                                    authLog.setStatus(Constants.USER_STATUS_ONLINE);
                                    authLog.setTerminalMac(mac);
                                    this.userService.saveTerminalUserAuthLog(authLog);

                                    logger.info("*******************************准备存入内存数据库*****************************************");
                                    Map<String, Object> userinfo = this.userService.saveUserInfo(device, user, authLog, deviceOwnerId, token);

                                    String authCodeUUID = UUID.randomUUID().toString().toUpperCase();
                                    uuid = authCodeUUID.replace("-", "");
                                    authCode = uuid.substring(0, Constants.AUTH_TOKEN_LENGTH);

                                    // 反馈result = ok and token
                                    resultMap.put("token", token);
                                    resultMap.put("exp_time", userinfo.get("expired_time"));
                                    resultMap.put("max_traffic", userinfo.get("max_traffic"));
                                    resultMap.put("ter_mac", mac);
                                    String userName = authId + PropertiesUtil.confProperties.getProperty("radius.username.suffix");
                                    resultMap.put("username", userName);
                                    
                                    String password = new TwifiTokenRepository().generateTokenData(authId, mac, devId, authType);
                                    resultMap.put("password", password);

                                    resultMap.put("terminalId", user.getId());
                                    resultMap.put("deviceOwnerId", merchantId);
                                    
                                    String returnMessage = StringUtils.EMPTY;

                                    // Send Membership online message to DeviceOwner
                                 /*   if (user.getMembershipId() != null) {
                                        this.systemService.saveMemberOnlineMessage(user.getMembershipId(), deviceOwnerId, devId);
                                    }*/

                                    /* commented Radius server createOrUpdateUser interface call
                                    // createOrUpdateUser on Radius server
                                    String radiusCreateOrUpdateUserUrl =
                                            PropertiesUtil.confProperties.getProperty("user.auth.radapi.serverAddr") +
                                            PropertiesUtil.confProperties.getProperty("user.auth.radapi.createRadiusUserUrl");

                                    String radiusCreateOrUpdateUserParam = "username=" + URLEncoder.encode(authId, "UTF-8");
                                    radiusCreateOrUpdateUserParam += "&password=" + URLEncoder.encode(authCode, "UTF-8");
                                    radiusCreateOrUpdateUserParam += "&token=" + URLEncoder.encode(token, "UTF-8");
                                    radiusCreateOrUpdateUserParam += "&max_traffic=" + URLEncoder.encode(String.valueOf(userinfo.get("max_traffic")), "UTF-8");
                                    radiusCreateOrUpdateUserParam += "&exp_time=" + URLEncoder.encode(String.valueOf(userinfo.get("expired_time")), "UTF-8");
                                    radiusCreateOrUpdateUserParam += "&ter_mac=" + URLEncoder.encode(mac, "UTF-8");

                                    boolean isCreateRadiusServerUserSuccess = true;

                                    HttpURLConnection conn = null;
                                    BufferedReader rd = null;
                                    DataOutputStream writer = null;
                                    try {
                                        URL url = new URL(radiusCreateOrUpdateUserUrl);
                                        conn = (HttpURLConnection) url.openConnection();
                                        conn.setDoOutput(true);
                                        conn.setDoInput(true);
                                        conn.setInstanceFollowRedirects(false);
                                        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                                        conn.setRequestMethod(HttpRequest.METHOD_POST);

                                        writer = new DataOutputStream(conn.getOutputStream());
                                        writer.writeBytes(radiusCreateOrUpdateUserParam);
                                        writer.flush();

                                        // Get the response
                                        rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));

                                        String line;
                                        while ((line = rd.readLine()) != null) {
                                            returnMessage += line;
                                        }

                                    } catch (Exception e){
                                        e.printStackTrace();
                                        isCreateRadiusServerUserSuccess = false;
                                        saveExceptionLog("api", this.getClass().toString(), e);
                                        returnMessage = "Fail to create user on radius server:" + returnMessage + e.getMessage();
                                    }
                                    finally {
                                        if (writer != null) {
                                            writer.close();
                                        }
                                        if (rd != null) {
                                            rd.close();
                                        }
                                        if (conn != null) {
                                            conn.disconnect();
                                        }
                                    }

                                    if (isCreateRadiusServerUserSuccess) {
                                        resultMap.put("result", "OK");
                                    } else {
                                        resultMap.put("result", "FAIL");
                                    }
*/
                                    resultMap.put("result", "OK");
                                    resultMap.put("message", returnMessage);
                                    logger.info("*******************************返回值设置完毕*****************************************");
                                }
                                else {
                                    resultMap.put("message", "用户在该设备上被锁定");
                                    resultMap.put("result", "FAIL");
                                }
                            }
                        }
                        
                    }else if (authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_MOBILE)) {
                        // validate
                        ValidateUtil vul = new ValidateUtil();
                        vul.add("authId", authId, "ID", new Rule[]{/*new Required(),*/ new Numeric()});
                        vul.add("authCode", authCode, "认证码", new Rule[]{/*new Required(),*/ new Length(Constants.AUTH_CODE_LENGTH-1, Constants.AUTH_CODE_LENGTH+1), new Numeric()});
                        vul.add("MAC", mac, "Mac", new Rule[]{/*new Required(),*/ new Regex(Constants.MAC_PATTERN)});
                        vul.add("user ip", userIp, "user ip", new Rule[]{new Required(), new Regex(Constants.IP_PATTERN)});

                        validStr = vul.validateString();
                        if (org.apache.commons.lang3.StringUtils.isNotEmpty(validStr)) {
                            resultMap.put("result", "FAIL");
                            resultMap.put("message", validStr);
                       
                        } else {
                        	logger.info("*******************************进入MOBILE分支*****************************************");
                            Device device = this.deviceService.getDeviceById(devId);
                            if (StringUtils.isBlank(mac)) {
                                /*List<DhcpInfo> dhcpInfos = this.deviceService.getOnlineDhcpInfosByUserIp(userIp);
                                if (dhcpInfos == null || dhcpInfos.size() == 0) {
                                    resultMap.put("result", "FAIL");
                                    resultMap.put("message", "IP 找不到对应已经绑定的设备MAC地址");
                                }
                                else {
                                    mac = dhcpInfos.get(0).getMac();
                                }*/
                            	
                            	mac = "085700A7DAF7";
                            }

                            if (device == null) {
                                retMessage = "非法设备";
                                resultMap.put("message", retMessage);
                                resultMap.put("result", "FAIL");
                            }
                            else {
                                TerminalUser user = null;
                                Boolean isAuthWithoutCode = null; // user login without cellphone number and authcode

                                if(org.apache.commons.lang3.StringUtils.isBlank(authCode) && org.apache.commons.lang3.StringUtils.isBlank(authId)){
                                    isAuthWithoutCode = Boolean.TRUE;
                                    user = this.userService.getTerminalUserByMap(mac, authType);
                                }

                                //auth firstly
                                if(org.apache.commons.lang3.StringUtils.isNotBlank(authCode) && org.apache.commons.lang3.StringUtils.isNotBlank(authId)){
                                    isAuthWithoutCode = Boolean.FALSE;
                                     // 跟据auth_id 获取 TernimalUser 记录
                                    user = this.userService.getTerminalUserByAuthId(authId);
                                }

                                if (user == null) {
                                    retMessage = "请先通过短信方式获取验证码";
                                    resultMap.put("message", retMessage);
                                    resultMap.put("result", "FAIL");
                                }
                                else {
                                	authId = user.getAuthId();
                                    user.setMac(mac);
                                    this.userService.saveOrUpdateTerminalUser(user);

                                    if(isAuthWithoutCode != null){
                                        if (isAuthWithoutCode == Boolean.FALSE && (org.apache.commons.lang3.StringUtils.isBlank(user.getAuthCode()) || !user.getAuthCode().equalsIgnoreCase(authCode))) {
                                                retMessage = "号码或验证码不正确，请重新获取验证码";
                                                resultMap.put("message", retMessage);
                                                resultMap.put("result", "FAIL");
                                        }
                                        else {
                                            // 跟据UserId 获取 TernimalUserAuthLog 记录
                                            TerminalUserAuthLog authLog = null;

                                            if(isAuthWithoutCode == Boolean.FALSE) {
                                                authLog = this.userService.getLatestUserAuthLogsByUserId(user.getId());
                                            }
                                            else {
                                                TerminalUserAuthLog latestAuthLog = this.userService.getLastAuthLogByMap(mac, authType);

                                                if(latestAuthLog!=null){
                                                    authLog = new TerminalUserAuthLog();
                                                    authLog.setTerminalUserId(latestAuthLog.getTerminalUserId());
                                                    authLog.setLogContent(latestAuthLog.getLogContent());
                                                    authLog.setAuthType(latestAuthLog.getAuthType());
                                                    authLog.setDeviceId(devId);
                                                    authLog.setStatus(latestAuthLog.getStatus());
                                                    authLog.setTerminalMac(mac);
                                                    authLog.setModifiedDatetime(new Date());
                                                    this.userService.saveTerminalUserAuthLog(authLog);
                                                }
                                            }

                                            if (authLog == null) {
                                                retMessage = "手机号码、验证码不正确，或验证码已经过期，请重新获取验证码";
                                                resultMap.put("message", retMessage);
                                                resultMap.put("result", "FAIL");
                                                
                                            }else {
                                                // 查找设备所归属的AccountId
//                                                Location location = this.deviceService.getLocationById(device.getLocationId());
//                                                Long deviceOwnerId = location.getAccountId();

                                                // 生成token
                                                String uuid = UUID.randomUUID().toString().toUpperCase();
                                                uuid = uuid.replace("-", "");
                                                String token = uuid.substring(0, Constants.AUTH_TOKEN_LENGTH);

                                                // 更新authLog 中的token
                                                authLog.setToken(token);
                                                authLog.setStatus(Constants.USER_STATUS_ONLINE);
                                                authLog.setTerminalMac(mac);
                                                this.userService.saveTerminalUserAuthLog(authLog);
                                                logger.info("*******************************准备存入内存数据库：MOBILE*****************************************");
                                                
                                                Map<String, Object> userinfo = this.userService.saveUserInfo(device, user, authLog, merchantId, token);

                                                resultMap.put("message", "");
                                                resultMap.put("result", "OK");

                                                // 反馈result = ok and token
                                                resultMap.put("token", token);
                                                resultMap.put("exp_time", userinfo.get("expired_time"));
                                                resultMap.put("max_traffic", userinfo.get("max_traffic"));
                                                resultMap.put("ter_mac", mac);
                                                String userName = authId + PropertiesUtil.confProperties.getProperty("radius.username.suffix");
                                                resultMap.put("username", userName);
                                                resultMap.put("terminalId", user.getId());
                                                resultMap.put("deviceOwnerId", merchantId);
                                                
//                                              String passwordUUID = UUID.randomUUID().toString().toUpperCase();
//                                              uuid = passwordUUID.replace("-", "");
//                                              String password = uuid.substring(0, Constants.AUTH_TOKEN_LENGTH);
                                                
                                                String password = new TwifiTokenRepository().generateTokenData(authId, mac, devId, authType);
                                                resultMap.put("password", password);
                                                logger.info("*******************************返回值设置完毕：MOBILE*****************************************");

                                                // Send Membership online message to DeviceOwner
//                                                if (user.getMembershipId() != null) {
//                                                    this.systemService.saveMemberOnlineMessage(user.getMembershipId(), deviceOwnerId, devId);
//                                                }
                                           }
                                        }
                                        
                                    }else {
                                        retMessage = "数据提交错误";
                                        resultMap.put("message", retMessage);
                                        resultMap.put("result", "FAIL");
                                    }
                                }
                            }
                        }
                    }else {
                        retMessage = PropertiesUtil.confProperties.getProperty("user.msg.wrongValidateType");
                        resultMap.put("message", retMessage);
                        resultMap.put("result", "FAIL");
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "FAIL");
            resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));

            saveExceptionLog("api", this.getClass().toString(), e);
        }

        logger.info("*******************************返回*****************************************");
        return SUCCESS;
    }
}
