package com.access.action.api10;

import java.io.InputStream;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
import com.access.core.error.ErrorMessage;
import com.access.core.util.DateUtil;
import com.access.core.util.MacUtil;
import com.access.core.util.PropertiesUtil;
import com.access.core.util.StringUtil;
import com.access.core.util.ValidateUtil;
import com.access.core.util.rules.CheckBox;
import com.access.core.util.rules.Length;
import com.access.core.util.rules.Numeric;
import com.access.core.util.rules.Regex;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;
import com.access.model.account.AccountHasTerminalUser;
import com.access.model.account.AccountWithBLOBs;
import com.access.model.device.Device;
import com.access.model.device.DeviceModel;
import com.access.model.device.DeviceWithBLOBs;
import com.access.model.device.ProducedDevices;
import com.access.model.system.Location;
import com.access.model.system.ThirdPartAuth;
import com.access.model.user.TerminalUser;
import com.access.model.user.TerminalUserAuthLog;
import com.access.service.account.AccountService;
import com.access.service.user.UserService;
import com.alipay.util.httpClient.HttpRequest;
import com.google.gson.reflect.TypeToken;


@Controller
@Namespace("/api10")
public class ApiAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
	Logger logger  =  Logger.getLogger(this.getClass());

	@Resource(name="accountService")
	private AccountService accountService;
	
	@Resource(name="userService")
	private UserService userService;
	
	/**
	 * 胖AP激活
	 * @return
	 */
	@Action(value = "register", results = {@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" }),
			@Result(name = "RETURN_PAGE", location = "/WEB-INF/jsp${jspversion}/device/fatap_register.jsp")})
    public String deviceRegister() {

        try {
        	// 访问设备注册页面
            if (this.request.getMethod().equals(HttpRequest.METHOD_GET)) {

                String gw_address = StringUtil.htmlEscape(StringUtil.fromGetRequest(request.getParameter("gw_address")));
                String gw_port = StringUtil.htmlEscape(StringUtil.fromGetRequest(request.getParameter("gw_port")));
                String gw_mac = StringUtil.htmlEscape(StringUtil.fromGetRequest(request.getParameter("gw_mac")));
                String component_version_name = StringUtil.htmlEscape(StringUtil.fromGetRequest(request.getParameter("soft_ver")));
                
                gw_mac = MacUtil.convertMacToTwifiFormat(gw_mac);
                
                if (StringUtils.isBlank(component_version_name))  {
                    component_version_name = request.getParameter("ver");
                }

                request.setAttribute("gw_address", gw_address);
                request.setAttribute("gw_port", gw_port);
                request.setAttribute("gw_mac", gw_mac);
                request.setAttribute("ver", component_version_name);

                this.session.setAttribute(Constants.PLAT_HTTP_PORT, PropertiesUtil.confProperties.getProperty("server.plat.httpport"));
                
                return "RETURN_PAGE";
            
            // 注册（激活）设备
            } else {
                try {
                	// 第一波参数校验--注不注册新用户都要校验的参数
                    String mac = request.getParameter("gw_mac");
                    String username = StringUtil.htmlEscape(request.getParameter("username"));
                    String password = StringUtil.htmlEscape(request.getParameter("password"));
                    String registerAccount = StringUtil.htmlEscape(request.getParameter("registeraccount"));
                    String telcomAccount = StringUtil.htmlEscape(request.getParameter("telcom_account"));
                    String ver = StringUtil.htmlEscape(request.getParameter("ver"));
                    
                    // 转换mac格式为iwifi平台格式
                    mac = MacUtil.convertMacToTwifiFormat(mac);
                    
                    ValidateUtil vu = new ValidateUtil();
                    vu.add("mac", mac, PropertiesUtil.confProperties.getProperty("device.param.mac"),
                            new Rule[]{new Required(), new Length(12,12), new Regex(Constants.MAC_PATTERN)});
                    vu.add("username", username, PropertiesUtil.confProperties.getProperty("device.param.username"),
                            new Rule[]{new Required(), new Length(6,50)});
                    vu.add("password", password, PropertiesUtil.confProperties.getProperty("device.param.password"),
                            new Rule[]{new Length(6,255)});
                    vu.add("registerAccount", registerAccount, PropertiesUtil.confProperties.getProperty("device.param.registerAccount"),
                            new Rule[]{new Required(), new CheckBox(new String[]{"true", "false"})});
                    vu.add("telcomAccount", telcomAccount, PropertiesUtil.confProperties.getProperty("device.param.telcomAccount"),
                            new Rule[]{new Required(), new Length(200)});
                    vu.add("ver", ver, PropertiesUtil.confProperties.getProperty("device.param.version"),
                            new Rule[]{new Required(), new Length(200)});
                    String validStr = vu.validateString();
                    
                    // 第一波参数校验失败--返回参数错误消息
                    if (validStr != null) {
                        resultMap = this.getResult(validStr);
                        return SUCCESS;
                        
                    }
                    
                    // 获取商户，再获取设备，然后再删除设备和其余对象的关系
                    AccountWithBLOBs account = null;
                    Long accountId = null;
                    
                    // 获取商户：获取商户分为注册新商户和不注册新商户---注册新商户
                    if (Boolean.TRUE.toString().equalsIgnoreCase(registerAccount)) {
                    	
                    	// 第二波参数校验--注册新用户时，校验注册参数
//                    	String rePassword = StringUtil.htmlEscape(request.getParameter("rePassword"));
                        String email = StringUtil.htmlEscape(request.getParameter("email"));
                        String cellNumber = StringUtil.htmlEscape(request.getParameter("cellNumber"));
                        String merchantName = StringUtil.htmlEscape(request.getParameter("merchantName"));
                        String recommendNumber = StringUtil.htmlEscape(request.getParameter("recommendNumber"));
                        String merchantDescription = StringUtil.htmlEscape(request.getParameter("merchantDescription"));
                        String geoLocation = StringUtil.htmlEscape(request.getParameter("geoLocation"));

                        ValidateUtil vuRegisterUser = new ValidateUtil();
//                        vuRegisterUser.add("rePassword", password, PropertiesUtil.confProperties.getProperty("account.param.rePassword"),
//                        		new Rule[]{new Length(6,255)});
                        vuRegisterUser.add("email", email, PropertiesUtil.confProperties.getProperty("account.param.email"), 
                        		new Rule[]{new Required(), new Regex(Constants.EMAIL_PATTERN)});
                        vuRegisterUser.add("cellNumber", cellNumber, PropertiesUtil.confProperties.getProperty("account.param.cellNumber"), 
                        		new Rule[]{new Required(), new Regex(Constants.CELLPHONE_PATTERN)});
                        vuRegisterUser.add("merchantName", merchantName, PropertiesUtil.confProperties.getProperty("account.param.merchantName"), 
            					new Rule[]{new Required(), new Length(50)});
            			vuRegisterUser.add("recommendNumber", recommendNumber, PropertiesUtil.confProperties.getProperty("account.param.recommendNumber"),
                                new Rule[]{new Regex(Constants.CELLPHONE_PATTERN)});
            			vuRegisterUser.add("geoLocation", geoLocation, PropertiesUtil.confProperties.getProperty("account.param.geoLocation"), 
            					new Rule[]{new Required()});
            			validStr = vuRegisterUser.validateString();
            			
            			// 第二波参数校验失败--返回参数错误消息
            			if(validStr != null) {
            				 resultMap = this.getResult(validStr);
                             return SUCCESS;
            			}
            			
            			// 判断两次密码是否一致
//                        if(!password.equals(rePassword)) {
//                        	resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("account.param.passwordDiff"));
//                        	return SUCCESS;
//                        }
                        
                        // 根据用户名获取用户，判断此用户是否存在
                        account = this.accountService.getAccountByUsername(username);
                        
                        // 用户已存在时--返回错误信息：用户名已存在
                        if(account != null) {
                        	resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("device.msg.usernameIsExisted"));
                            return SUCCESS;
                        }
            			
                        // 构建商户对象
                        account = new AccountWithBLOBs();
                        account.setUsername(username);
                        
//                      password = MD5Util.getStringMD5String(password);
                        account.setPassword(password);
                        account.setEmail(email);
                        account.setCellNumber(cellNumber);
                        account.setMerchantName(merchantName);
                        account.setMerchantDescription(merchantDescription);
                        account.setGeoLocation(geoLocation);
                        account.setType(Constants.ACCOUNT_TYPE_MERCHANT_EN);
		                account.setParentIds(Constants.DEFAULT_PARENTIDS);
		                
		                // 保存商户对象，并更新其子级关系
		                InputStream inputStream = this.accountService.addAccount(account, recommendNumber);
                    
		                // 判断返回结果
		                if(inputStream == null){
		                	resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("account.msg.addAccountFail"));
		                	return SUCCESS;
		                	
		                }else{
		                	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
		                }
		                
		                logger.debug("应用中心添加商户返回：" + returnMessage);
		                
		                Map<String, Object> requestResult = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
		                
		                if("OK".equalsIgnoreCase((String) requestResult.get("result"))){
		                	accountId = Long.parseLong((String) requestResult.get("message"));
		                	
		                }else {
		                	resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("account.msg.addAccountFail"));
		                	return SUCCESS;
		                }
		                
		                
                    // 不注册新商户
                    }else {
                        account = this.accountService.getAccountByUsername(username);
                        
                        //账户不存在时返回错误消息--申请绑定设备的用户不存在
                        if (account == null) {
                            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("device.msg.toBindDeviceAccountIsNotExisted"));
                            return SUCCESS;
                        
                        // 账户存在时候，密码不一致时返回错误消息--账户名密码不匹配
                        } else if(!account.getPassword().equals(password)) {
							resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("device.msg.passwdNotMatch"));
							return SUCCESS;
							
                        }else {
                        	accountId = account.getId();
                        	logger.debug("不注册新用户的accountId" + accountId);
                        }
                    }

                    // 获取商户后，要获取设备信息，设备分为已导入的设备和激活过的设备
                    DeviceWithBLOBs device = this.deviceService.getDeviceByMac(mac);
                    
                    if (device != null) {
				        DeviceModel model = this.deviceService.getModelObjByBrandModel(device.getBrand(),device.getModel());
				        
				        if (model != null) {
				            device.setDeviceModelId(model.getId());
				        }

				        // 查找设备的位置对象,更新位置所属商户
				        Location location = this.deviceService.getLocationById(device.getLocationId());
				        location.setAccountId(accountId);
				    	location = deviceService.saveOrGetLocation(location);
				    	logger.debug("位置对象设置的accountId：" + accountId);
				    	
				    	if(location != null && location.getId() != null) {
				    		device.setLocationId(location.getId());
					        this.deviceService.saveOrUpdateDevice(device);
				    	}
				        
				     // 需要激活的是没有激活过的设备    
				    }else {
				    	ProducedDevices producedDevice = this.deviceService.getProductedDevicesByMac(mac);
						
						if (producedDevice != null) {
							
							// 判断此设备是否已通过审批--通过时
							if(producedDevice.getStatus().equals(Constants.PRODUCED_DEVICES_STATUS_AUDITED)){
						        
					        	// 为此设备创建一个位置对象
								Location location = new Location();
								location.setCountry(Constants.DEVICE_lOCATION_COUNTRY);
								location.setProvince(producedDevice.getProvince());
								location.setCity(producedDevice.getCity());
						    	location.setCountyDistrict(producedDevice.getCounty());
						    	location.setAccountId(accountId);
						    	location.setCreateDatetime(new Date());
						    	location = deviceService.saveOrGetLocation(location);
						    	
						    	// 创建设备对象
						        device = new DeviceWithBLOBs();
						        device.setBrand(producedDevice.getBrand());
						        device.setModel(producedDevice.getModel());
						        device.setStatus(Constants.DEVICE_STATUS_OFFLINE);
						        device.setFramewareVersion(producedDevice.getFramewareVersion());
						        device.setTelcomAccount(telcomAccount);
						        device.setConfigItems(producedDevice.getConfigItems());
						        device.setEmsDevId(producedDevice.getEmsDevId());
						        device.setEmsCreateDatetime(producedDevice.getEmsCreateDatetime());
						        device.setXPos(producedDevice.getXpos());
						        device.setYPos(producedDevice.getYpos());
						        device.setFixAddr(producedDevice.getFixAddr());
						        device.setLocationId(location.getId());
						        device.setMac(producedDevice.getMac());
						        device.setType(Constants.DEVICE_TYPE_FAT_AP);
						        
						        // 设备ID
						        if (StringUtils.isNotBlank(producedDevice.getId())) {
						            device.setDeviceId(producedDevice.getId());
						            
						        }else {
						            device.setDeviceId(this.deviceService.generateFatApDeviceId(producedDevice.getBrand(), 
						            		producedDevice.getModel(), producedDevice.getCreateDatetime()));
						        }
						       
						        // 设备品牌型号ID
						        if(producedDevice.getDeviceModelId() != null) {
						        	device.setDeviceModelId(producedDevice.getDeviceModelId());
						        	
						        }else {
						        	DeviceModel model = this.deviceService.getModelObjByBrandModel(device.getBrand(),device.getModel());
							        
							        if (model != null) {
							            device.setDeviceModelId(model.getId());
							        }
						        }
						        
						        // 设置组件ID
						        Long componentId = this.deviceService.getComponentId(ver, device.getBrand(), device.getModel());
						        device.setComponentId(componentId);
					        	
					            this.deviceService.saveNewDevice(device);
					            this.deviceService.deleteProducedDeviceByMac(mac);
								
							}else {
								// 返回错误信息--设备审批未通过
								resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("device.msg.producedDeviceFail"));
								return SUCCESS;
							}
						}
                    }

					if(device == null){
						
					    // 返回错误信息--来自非法设备的绑定请求
					    resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("device.msg.bindRequestFromIllegalDevice"));
					    resultMap.put("dev_id", "");
					    return SUCCESS;
					}
						
					// 向应用中心发起删除设备上的策略的请求 
                    String deleteDispalyUrl = 
                    		PropertiesUtil.confProperties.getProperty("applicationCentel") +
                            PropertiesUtil.confProperties.getProperty("applicationCentel.deleteDispalyUrl");
                    
                    // 组合请求参数
                    Map<String, String> params = new HashMap<String, String>();
                    params.put("dev_id", URLEncoder.encode(device.getDeviceId(), "UTF-8"));
                    
                    logger.debug("应用中心删除策略" + deleteDispalyUrl + "----参数： " + params.toString());
                    
                    InputStream inputStream = HttpRequest.sendPostRequest(deleteDispalyUrl, params);
                    
                    if(inputStream == null){
                        resultMap = this.getResult(ErrorMessage.getErrorMsg("error.device.fatApRegisterFail"));
                        resultMap.put("dev_id", device.getDeviceId());
                        return SUCCESS;
                        
                    }else{
                    	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array());
                    }
                    
                    resultMap = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
       	         
                    logger.debug("应用中心删除策略返回：" + returnMessage);
                    
                    // 策略删除失败
        	        if(!"OK".equalsIgnoreCase((String) resultMap.get("result"))) {
        	        	resultMap = this.getResult(ErrorMessage.getErrorMsg("error.device.fatApRegisterFail"));
                        resultMap.put("dev_id", device.getDeviceId());
                        return SUCCESS;
        	        }
        	        
				    // 下发脚本字符串到memdb,并设置memdb中设备状态为Registration
				    this.deviceService.setApiDeviceInfo(device.getDeviceId());
					
				    Long emsDevId = device.getEmsDevId();
				    
				    // emsDevId不为空时向网管发送经纬度请求
				    if(emsDevId != null) {
				    	// 向网管平台发送经纬度和地址的请求URL
						String fatApRegisterUrl = 
			                    PropertiesUtil.confProperties.getProperty("device.emsapi.serverAddr") +
			                    PropertiesUtil.confProperties.getProperty("device.emsapi.fatApRegisterUrl");
				         
						 // 设置请求参数
						 params.clear();
						 params.put("id", URLEncoder.encode(device.getEmsDevId()+"", "UTF-8"));
						 params.put("devId", URLEncoder.encode(device.getDeviceId()+"", "UTF-8"));
						 params.put("xpos", URLEncoder.encode(device.getXPos()==null ? "" : device.getXPos()+"", "UTF-8"));
						 params.put("ypos", URLEncoder.encode(device.getYPos()==null ? "" : device.getYPos()+"", "UTF-8"));
						 params.put("fixaddr", URLEncoder.encode(device.getFixAddr()==null ? "" : device.getFixAddr()+"", "UTF-8")); 
				         
						 logger.debug("网管平台对接经纬度" + fatApRegisterUrl + "----参数： " + params.toString());
						 
				         // 发送请求并接受返回结果
				         inputStream = HttpRequest.sendPostRequest(fatApRegisterUrl, params);
				         
				         // 判断返回结果  error.device.fatApRegisterFail
				         if(inputStream == null){
				             resultMap = this.getResult(ErrorMessage.getErrorMsg("error.radapi"));
				             return SUCCESS;
				             
				         }else{
				         	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
				         }
				         logger.debug("网管平台对接经纬度返回：" + returnMessage);
				         resultMap = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
				         
				         if("OK".equals(resultMap.get("result"))) {
				        	 resultMap = this.getResult();
				        	 resultMap.put("dev_id", device.getDeviceId());
				        	 
				         }else {
				        	 resultMap = this.getResult(ErrorMessage.getErrorMsg("error.radapi"));
				         }
				    }
				    
					resultMap = this.getResult();
					resultMap.put("dev_id", device.getDeviceId());
			         
                } catch (Exception e) {
                    e.printStackTrace();
                    resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
                    saveExceptionLog("api device", deviceService.getClass().toString(), e);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
            saveExceptionLog("api", this.getClass().toString(), e);
        }

        return SUCCESS;
    }

	/**
	 * 获取验证码(PC获取验证码，中心平台调用）
	 * @return
	 */
	@Action(value = "userLogin", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String userLogin() {
		resultMap = new HashMap<String, Object>();
		String retMessage = StringUtils.EMPTY;
		
        try {
        	// 获取参数并校验
			String authType = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("authType")));
			String authId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("authId")));
			String devId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("devId")));
			String lang = StringUtil.fromGetRequest(this.request.getParameter("lang"));
			
			ValidateUtil vu = new ValidateUtil();
			vu.add("authType", authType, PropertiesUtil.confProperties.getProperty("user.param.authType"),
					new Rule[]{new Required()});
			vu.add("authId", authId, PropertiesUtil.confProperties.getProperty("user.param.authId"),
                    new Rule[]{new Numeric(), new Length(11,11), new Regex(Constants.CELLPHONE_PATTERN)});
			vu.add("devId", devId, PropertiesUtil.confProperties.getProperty("user.param.deviceId"),
					new Rule[]{new Required(), new Length(64)});
			vu.add("lang", lang, "中英文短信标志", new Rule[]{new Required(), new CheckBox(new String[]{
					Constants.LANGUAGE_CN,
					Constants.LANGUAGE_CHINESE,
					Constants.LANGUAGE_EN,
					Constants.LANGUAGE_ENGLISH})});
			
			String validStr = vu.validateString();
			
			if (validStr != null) {
				resultMap = this.getResult(validStr);
				return SUCCESS;
			}
			
			if (authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_MOBILE) || authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_APPMOBILE)) {
	            boolean isVirtualDeviceLocked = false;
			            
	            // 获取所有的第三方设备
				List<String> thirdPartDeviceIds = this.systemService.getAllThirdPartAuthVirtualDeviceIds();
				
				if (thirdPartDeviceIds != null && thirdPartDeviceIds.contains(devId)) {
					ThirdPartAuth thirdPartAuth = this.systemService.getThirdPartAuthByDeviceId(devId);
				
				    if (thirdPartAuth != null) {
				        isVirtualDeviceLocked = thirdPartAuth.getStatus().equalsIgnoreCase(Constants.THIRD_PART_AUTH_STATUS_LOCKED);
				    }
				}
				
				if (isVirtualDeviceLocked) {
				    retMessage = PropertiesUtil.confProperties.getProperty("user.msg.blockedVirtualDevice");
				    resultMap = this.getResult(retMessage);
				    return SUCCESS;
				    
				}
				
				// 判断设备是否存在
				Device device = this.deviceService.getDeviceById(devId);
			
			    if (device == null) {
			        retMessage = PropertiesUtil.confProperties.getProperty("user.msg.illegalDevice");
				    resultMap = this.getResult(retMessage);
				    return SUCCESS;
			    }
			    
			    boolean isUserBlockedOnDevice = false;
			    
			    // 检查 terminal uer 是否存在
				TerminalUser user = this.userService.getTerminalUserByAuthId(authId);
				
				if (user == null) {
				    // terminal user 不存在 添加 记录
				    user = this.userService.addTerminalUserAndLink(authId, device, Constants.PORTAL_AUTH_TYPE_MOBILE, null);
				    
				}else {
					// 存在时判断是否在设备上锁定
				    isUserBlockedOnDevice = this.userService.isUserBlockedOnDevice(device, user);
				}
			
				Boolean isBlockUserEnabled = Boolean.parseBoolean(PropertiesUtil.confProperties.getProperty("user.auth.userBlock.isEnable"));
			   
				// 用户在设备上锁定时返回错误信息
			    if (isUserBlockedOnDevice && isBlockUserEnabled) {
				    retMessage = PropertiesUtil.confProperties.getProperty("user.msg.userIsLockedOnDevice");
					resultMap = this.getResult(retMessage);
				    return SUCCESS;
				}
			
				//生成 auth_code 并保存到 TerminalUser表
				String authCode = RandomStringUtils.random(Constants.AUTH_CODE_LENGTH, false, true);
				
				// 设置用户验证码并更新用户表
				user.setAuthCode(authCode);
				this.userService.saveOrUpdateTerminalUser(user);
				
				// 插入 authentication_log记录
				TerminalUserAuthLog authLog = this.userService.saveAuthLog(device, user, Constants.USER_STATUS_OFFLINE, authType);
				
				String authSuccessRetMessage = StringUtils.EMPTY;
				
				// 发送短信
				if (StringUtils.equalsIgnoreCase(lang, Constants.LANGUAGE_EN)
                        || StringUtils.equalsIgnoreCase(lang, Constants.LANGUAGE_ENGLISH)) {
					
                    authSuccessRetMessage = this.SendAuthCodeBySmsInEn(authId, device, authCode, authLog);
                }
                else {
                    authSuccessRetMessage = this.SendAuthCodeBySms(authId, device, authCode, authLog);
                }
				
				resultMap.put("message", "");
				resultMap.put("result", "OK");
				return SUCCESS;
			    
			}else {
			    retMessage = PropertiesUtil.confProperties.getProperty("user.msg.wrongValidateType");
			    resultMap = this.getResult(retMessage);
			    return SUCCESS;
			}
                
        } catch (Exception e) {
            e.printStackTrace();
            saveExceptionLog("api", this.getClass().toString(), e);
            retMessage = PropertiesUtil.confProperties.getProperty("message.exception");
            resultMap = this.getResult(retMessage);
            return SUCCESS;
        }
    }
	
	/**
	 * 胖AP认证（PC免费登陆，中心平台调用）
	 * @return
	 */
	@Action(value = "userAuth", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String userAuth() {
        resultMap = new HashMap<String, Object>();
        String retMessage = StringUtils.EMPTY;
        
        try {
        	// 获取参数
			String authType = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("auth_type")));
			String authId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("auth_id")));
			String authCode = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("auth_code")));
			String devId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("dev_id")));
			String mac = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("mac")));
            String browserType = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("browser_type")));
            String terminalType = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("terminal_type")));

            // 以下两个参数用于微博验证
            String wechatPubAcctId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("wechat_pub_acct")));
            String accountId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("account_id")));

            // mac格式化
			mac = MacUtil.convertMacToTwifiFormat(mac);
            
            // 验证类型转化为大写
            if (StringUtils.isNotBlank(authType)) {
                authType = authType.toUpperCase();
            }
        	
            // 验证验证类型是否为空
			ValidateUtil vu = new ValidateUtil();
			vu.add("authType", authType, PropertiesUtil.confProperties.getProperty("user.param.authType"),new Rule[]{new Required()});
			String validStr = vu.validateString();
			
			if (StringUtils.isNotBlank(validStr)) {
				resultMap = this.getResult(validStr);
				
			}else {
				// 验证类型为无验证
                if (authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_OPTION)) {
                	
                	// 校验参数
                    ValidateUtil vul = new ValidateUtil();
                    vul.add("MAC", mac.toUpperCase(), "Mac", new Rule[]{new Required(), new Length(12,12), new Regex(Constants.MAC_PATTERN)});
                    vul.add("devId", devId, PropertiesUtil.confProperties.getProperty("user.param.deviceId"),new Rule[]{new Required()});
                    vul.add("browserType", browserType, "Browser Type", new Rule[]{new Required()});
                    vul.add("terminalType", terminalType, "Terminal Type", new Rule[]{new Required()});
                    validStr = vul.validateString();
                    
                    // 参数校验失败
                    if (StringUtils.isNotBlank(validStr)) {
                    	resultMap = this.getResult(validStr);
                        
                    }else {
                    	// 判断设备是否存在
                        Device device = this.deviceService.getDeviceById(devId);

                        if (device == null) {
                            retMessage = PropertiesUtil.confProperties.getProperty("user.msg.illegalDevice");
                            resultMap = this.getResult(retMessage);
                            
                        } else {
//                            AccountWithBLOBs merchant = deviceService.getAccountByDeviceId(devId);
                        	
                        	//boolean isInBlacklist = accountService.isInBlacklist(devId, mac);
                        	boolean isInBlacklist = false;
                        	if(isInBlacklist) {
                        		retMessage = PropertiesUtil.confProperties.getProperty("user.msg.macIsInBlacklist");
                            	resultMap = this.getResult(retMessage);
                            	return SUCCESS;
                        	}
                        	
                        	// 获取商户ID
                            Long merchantId = deviceService.getAccountIdByDeviceId(devId);
                            
                            if(merchantId == null) {
                            	retMessage = PropertiesUtil.confProperties.getProperty("user.msg.accountIsNOtExists");
                            	resultMap = this.getResult(retMessage);
                            	return SUCCESS;
                            }
                            
                            // 判断用户是否存在，不存在时创建，存在时判断是否在设备上被锁定
                            TerminalUser user = this.userService.getTerminalUser(merchantId, null, authType, mac);
                            boolean isUserBlockedOnDevice = false;
                            Boolean isBlockUserEnabled = Boolean.parseBoolean(PropertiesUtil.confProperties.getProperty("user.auth.userBlock.isEnable"));
                            
                            authId =  DateUtil.formatToString(new Date(), DateUtil.YYYY_MM_DD_HH_MM_SS)
                                    + UUID.randomUUID().toString().replace("-", "").substring(0, 8);
                            
                            if (user == null) {
                                user = this.userService.addTerminalUserAndLink(authId, device, Constants.PORTAL_AUTH_TYPE_OPTION, mac);
                                
                            }else {
                                isUserBlockedOnDevice = this.userService.isUserBlockedOnDevice(device, user);
                            }
                           
                            // 没被锁定
                            if (!(isUserBlockedOnDevice && isBlockUserEnabled)) {
                                // 生成 auth_code 并保存到 TerminalUser表
                                authCode = RandomStringUtils.random(Constants.AUTH_CODE_LENGTH, false, true);
                                user.setAuthType(Constants.PORTAL_AUTH_TYPE_OPTION);
								user.setAuthCode(authCode);
                                user.setMac(mac);
                                user.setStatus(Constants.USER_STATUS_ONLINE);
								this.userService.saveOrUpdateTerminalUser(user);

                                // 插入 authentication_log记录
                                TerminalUserAuthLog authLog = this.userService.saveAuthLog(device, user, Constants.USER_STATUS_ONLINE, authType);

                                // 生成token
                                String uuid = UUID.randomUUID().toString().toUpperCase();
                                uuid = uuid.replace("-", "");
                                String token = uuid.substring(0, Constants.AUTH_TOKEN_LENGTH);

                                // 更新authLog 中的token
                                authLog.setToken(token);
                                authLog.setStatus(Constants.USER_STATUS_ONLINE);
                                authLog.setMac(mac);
                                authLog.setTerminalMac(mac);
                                
                                if (StringUtils.isNotBlank(browserType)) {
                                    authLog.setBrowserType(browserType);
                                }
                                
                                if (StringUtils.isNotBlank(terminalType)) {
                                    authLog.setTerminalType(terminalType);
                                }
                                
                                this.userService.saveTerminalUserAuthLog(authLog);
                                this.userService.saveUserInfo(device, user, authLog, merchantId, token);

                                // 发送会员在线消息给商户
//                                if (user.getMembershipId() != null) {
////                                	this.systemService.saveMemberOnlineMessage(user.getMembershipId(), merchantId, devId);
//                                    sendMemberOnlineMessage(user.getMembershipId(), merchantId, devId);
//                                }

                                resultMap = this.getResult();
                                resultMap.put("token", token);
                                resultMap.put("terminalId", user.getId());
                                resultMap.put("deviceOwnerId", merchantId);
                                resultMap.put("message", "");
                                
                            }else {
                                retMessage = PropertiesUtil.confProperties.getProperty("user.msg.userIsLockedOnDevice");
                                resultMap = this.getResult(retMessage);
                            }
                        }
                    }
                    
                // 手机认证
                }else if (authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_MOBILE) || authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_APPMOBILE)) {
                    ValidateUtil vul = new ValidateUtil();
                    vul.add("authId", authId, PropertiesUtil.confProperties.getProperty("user.param.authId"),
                    		new Rule[]{new Numeric(), new Length(11,11), new Regex(Constants.CELLPHONE_PATTERN)});
                    vul.add("authCode", authCode, PropertiesUtil.confProperties.getProperty("user.param.authCode"),
                    		new Rule[]{new Length(Constants.AUTH_CODE_LENGTH, Constants.AUTH_CODE_LENGTH), new Numeric()});
                    vul.add("devId", devId, PropertiesUtil.confProperties.getProperty("user.param.deviceId"),
                    		new Rule[]{new Required()});
                    vul.add("MAC", mac, PropertiesUtil.confProperties.getProperty("device.param.mac"), 
                    		new Rule[]{new Required(), new Length(12,12), new Regex(Constants.MAC_PATTERN)});
                    vul.add("browserType", browserType, PropertiesUtil.confProperties.getProperty("user.param.browserType"),
                    		new Rule[]{new Required()});
                    vul.add("terminalType", terminalType, PropertiesUtil.confProperties.getProperty("user.param.terminalType"), 
                    		new Rule[]{new Required()});
                    validStr = vul.validateString();
                    
                    if (StringUtils.isNotEmpty(validStr)) {
                        resultMap = this.getResult(validStr);
                        
                    }else {
                        Device device = this.deviceService.getDeviceById(devId);

                        if (device == null) {
                        	 retMessage = PropertiesUtil.confProperties.getProperty("user.msg.illegalDevice");
                             resultMap = this.getResult(retMessage);
                             
                        }else {
//                        	boolean isInBlacklist = accountService.isInBlacklist(devId, mac);
                        	boolean isInBlacklist = false;
                        	if(isInBlacklist) {
                        		retMessage = PropertiesUtil.confProperties.getProperty("user.msg.macIsInBlacklist");
                            	resultMap = this.getResult(retMessage);
                            	return SUCCESS;
                        	}
                        	
                        	TerminalUser user = null;
                        	Boolean isAuthWithoutCode = null;

                        	// 没使用验证码，之前验证过的
                        	if(StringUtils.isBlank(authCode) && StringUtils.isBlank(authId)){
                        		isAuthWithoutCode = Boolean.TRUE;
                        		user = this.userService.getTerminalUserByMap(mac, authType);
                        	}

                        	// 使用了验证码
                        	if(StringUtils.isNotBlank(authCode) && StringUtils.isNotBlank(authId)){
                            	isAuthWithoutCode = Boolean.FALSE;
                                user = this.userService.getTerminalUserByAuthId(authId);
                        	}

                            if (user == null) {
                            	// 用户并未注册过的时候--请先获取验证码
                                retMessage = PropertiesUtil.confProperties.getProperty("user.msg.pleateGetValidateCode");
                                resultMap = this.getResult(retMessage);
                                
                            }else {
                                
                                // 判断用户是否在设备上被锁定
                                Boolean isUserBlockedOnDevice = this.userService.isUserBlockedOnDevice(device, user);
                                Boolean isBlockUserEnabled = Boolean.parseBoolean(PropertiesUtil.confProperties.getProperty("user.auth.userBlock.isEnable"));
                                
                                if(isBlockUserEnabled && isUserBlockedOnDevice) {
                                	retMessage = PropertiesUtil.confProperties.getProperty("user.msg.userIsLockedOnDevice");
                                    resultMap = this.getResult(retMessage);
                                    return SUCCESS;
                                }
                                
                            	if(isAuthWithoutCode != null){
                            		if (isAuthWithoutCode == Boolean.FALSE && (StringUtils.isBlank(user.getAuthCode()) || !authCode.equalsIgnoreCase(user.getAuthCode()))) {
                                		// 号码或验证码不正确，请重新获取验证码	
                            			retMessage = PropertiesUtil.confProperties.getProperty("user.msg.validateFailAndReGetValidateCode");
                                		resultMap = this.getResult(retMessage);
                                			
                                    }else {
                                        // 根据UserId 获取 TernimalUserAuthLog 记录
                                        TerminalUserAuthLog authLog = null;

                                        // 使用了验证码，获取验证记录，验证码有效期判断
                                        if(isAuthWithoutCode == Boolean.FALSE) {
                                        	authLog = this.userService.getLatestUserAuthLogsByUserId(user.getId());
                                        	
                                        	if(authLog != null) {
                                        		authLog.setTerminalMac(mac);
                                        	}
                                            
                                        // 没使用验证码，判断是否重新登录（7天，体现在SQL里）
                                        }else {
                                        	TerminalUserAuthLog latestAuthLog = this.userService.getLastAuthLogByMap(mac, authType);

                                        	if(latestAuthLog!=null){
                                        		authLog = new TerminalUserAuthLog();
                                        		authLog.setTerminalUserId(latestAuthLog.getTerminalUserId());
                                        		authLog.setLogContent(latestAuthLog.getLogContent());
                                        		authLog.setAuthType(latestAuthLog.getAuthType());
                                        		authLog.setDeviceId(devId);
                                        		authLog.setStatus(latestAuthLog.getStatus());
                                                authLog.setTerminalMac(mac);
                                                authLog.setMac(mac);
                                        		authLog.setModifiedDatetime(new Date());
                                        		this.userService.saveTerminalUserAuthLog(authLog);
                                        	}
                                        }

                                        if (authLog == null) {
                                        	// 手机号码、验证码不正确，或验证码已经过期，请重新获取验证码
                                        	retMessage = PropertiesUtil.confProperties.getProperty("user.msg.reGetValidateCode");
                                        	resultMap = this.getResult(retMessage);
                                            
                                        } else {
                                            // 生成token
                                            String uuid = UUID.randomUUID().toString().toUpperCase();
                                            uuid = uuid.replace("-", "");
                                            String token = uuid.substring(0, Constants.AUTH_TOKEN_LENGTH);

                                            // 更新authLog 中的token
                                            authLog.setToken(token);
                                            authLog.setStatus(Constants.USER_STATUS_ONLINE);
                                            authLog.setTerminalMac(mac);
                                            
                                            if (StringUtils.isNotBlank(browserType)) {
                                                authLog.setBrowserType(browserType);
                                            }
                                            
                                            if (StringUtils.isNotBlank(terminalType)) {
                                                authLog.setTerminalType(terminalType);
                                            }
                                            
                                            // 查找设备所归属的AccountId
                                            Location location = this.deviceService.getLocationById(device.getLocationId());
                                            Long deviceOwnerId = location.getAccountId();
                                            
                                            // 更新用户状态为在线
                                            user.setMac(mac);
                                        	user.setStatus(Constants.USER_STATUS_ONLINE);
                                            this.userService.saveOrUpdateTerminalUser(user);
                                            
                                            this.userService.saveTerminalUserAuthLog(authLog);
                                            this.userService.saveUserInfo(device, user, authLog, deviceOwnerId, token);

                                            // 用户是会员的时候发送会员在线消息
//                                            if (user.getMembershipId() != null) {
////                                                this.systemService.saveMemberOnlineMessage(user.getMembershipId(), deviceOwnerId, devId);
//                                                sendMemberOnlineMessage(user.getMembershipId(), deviceOwnerId, devId);
//                                            }

                                            resultMap = this.getResult();
                                            resultMap.put("token", token);
                                            resultMap.put("terminalId", user.getId());
                                            resultMap.put("deviceOwnerId", deviceOwnerId);
                                            resultMap.put("message", "");
                                        }
                                    }
                            		
                            	} else {
                            		// 数据提交错误
                            		retMessage = PropertiesUtil.confProperties.getProperty("account.msg.dataSubmitError");
                            		resultMap = this.getResult(retMessage);
                            	}
                            }
                        }
                    }
                
                // 微博认证
                }else if (authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_WECHAT)) {
                    ValidateUtil vul = new ValidateUtil();
                    vul.add("authId", authId, "ID", new Rule[]{new Required(), new Length(400)});
                    vul.add("accountId", accountId, "AccountId", new Rule[]{new Required(), new Numeric()});
                    vul.add("wechatPubAcctId", wechatPubAcctId, "WechatPubAcctId", new Rule[]{new Required()});

                    validStr = vul.validateString();
                    if (StringUtils.isNotEmpty(validStr)) {
                        resultMap = this.getResult(validStr);
                        
                    }else {
                        // authId is openId in WECHAT auth type

                    	// 判断用户是否为空，为空时创建
                        TerminalUser user = this.userService.getTerminalUser(null , authId, authType, null);

                        if (user == null) {
                            user = this.userService.addTerminalUserAndLink(authId, null, Constants.PORTAL_AUTH_TYPE_WECHAT, mac);
                        }

                        // 判断商户是否存在
                        Long nAccountId = Long.parseLong(accountId);
                        logger.error("accountId: " + accountId);
                        AccountWithBLOBs deviceOwner = this.accountService.getAccountById(nAccountId);

                        if (deviceOwner == null) {
                        	retMessage = PropertiesUtil.confProperties.getProperty("message.parameterError");
                        	resultMap = this.getResult(retMessage);
                        }

                        // 判断商户-用户关系是否存在，不存在时建立起关系
                        List<Long> userAcctIdList = this.userService.getAccountIdsByUserId(user.getId());
                        boolean isAccountLnkExisted = false;
                        
                        if(userAcctIdList != null && userAcctIdList.contains(nAccountId)) {
                        	isAccountLnkExisted = true;
                        }
                        
                        if (!isAccountLnkExisted) {
                            AccountHasTerminalUser accountUser = new AccountHasTerminalUser();
                            accountUser.setAccountId(nAccountId);
                            accountUser.setTerminalUserId(user.getId());
                            this.userService.saveAccountHasTerminalUser(accountUser);
                        }

                        // 根据account，location获取默认设备
                        DeviceWithBLOBs device = null;
                        List<Location> locations = this.deviceService.getLocationList(nAccountId);
                        logger.error("locations size: " + locations.size());
                        
                        if (locations != null && locations.size() > 0) {
                            for (Location tmpLocation : locations) {
                                List<DeviceWithBLOBs> devices = this.deviceService.getDevicesByLocationId(tmpLocation.getId());
                                logger.error("devices size: " + devices.size());
                                if (devices != null && devices.size() > 0) {
                                    device = devices.get(0);
                                    break;
                                }
                            }
                        }
                        
                        // 设备不为空时，创建用户-设备关系
                        if (device != null) {
                        	
                        	// 判断用户在设备上是否被锁定
                        	boolean isUserBlockedOnDevice = this.userService.isUserBlockedOnDevice(device, user);
                            Boolean isBlockUserEnabled = Boolean.parseBoolean(PropertiesUtil.confProperties.getProperty("user.auth.userBlock.isEnable"));
                            
                            if (!(isUserBlockedOnDevice && isBlockUserEnabled)) {

                                // 创建authLog
                                TerminalUserAuthLog authLog = this.userService.saveAuthLog(device, user, Constants.USER_STATUS_ONLINE,authType);

                                // 生成token
                                String uuid = UUID.randomUUID().toString().toUpperCase();
                                uuid = uuid.replace("-", "");
                                String token = uuid.substring(0, Constants.AUTH_TOKEN_LENGTH);

                                // 更新authLog -- token
                                authLog.setToken(token);
                                authLog.setAuthType(Constants.PORTAL_AUTH_TYPE_WECHAT);
                                
                                if (StringUtils.isNotBlank(browserType)) {
                                    authLog.setBrowserType(browserType);
                                }
                                
                                if (StringUtils.isNotBlank(terminalType)) {
                                    authLog.setTerminalType(terminalType);
                                }
                                
                                this.userService.saveTerminalUserAuthLog(authLog);
                                this.userService.saveUserInfo(device, user, authLog, nAccountId, token);

                                // 用户是会员的时候发送会员在线消息
//                                if (user.getMembershipId() != null) {
////                                    this.systemService.saveMemberOnlineMessage(user.getMembershipId(), nAccountId, null);
//                                    sendMemberOnlineMessage(user.getMembershipId(), nAccountId, null);
//                                }
                                
                                resultMap = this.getResult();
                                resultMap.put("token", token);
                                resultMap.put("terminalId", user.getId());
                                resultMap.put("deviceOwnerId", nAccountId);
                                resultMap.put("message", "");
                            }
                            else {
                                resultMap.put("message", PropertiesUtil.confProperties.getProperty("user.msg.userIsLockedOnDevice"));
                                resultMap.put("result", "FAIL");
                            }
                            
                        }else {
                            // 微信认证，查找设备失败
                            resultMap.put("message", PropertiesUtil.confProperties.getProperty("user.msg.wechatAuthFindingDeviceFail"));
                            resultMap.put("result", "FAIL");
                        }
                    }
                    
                }else {
                	// 不支持该类型验证
                    retMessage = PropertiesUtil.confProperties.getProperty("user.msg.wrongValidateType");
                    resultMap = this.getResult(retMessage);
                }
            }
			
        } catch (Exception e) {
        	// 系统异常
            e.printStackTrace();
            retMessage = PropertiesUtil.confProperties.getProperty("message.exception");
            resultMap = this.getResult(retMessage);
            saveExceptionLog("api", this.getClass().toString(), e);
        }

        return SUCCESS;
    }
	
	
	@Action(value = "ampauth", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String ampAuth() {
        resultMap = new HashMap<String, Object>();
        String retMessage = StringUtils.EMPTY;
        try {
            String deviceId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("device_id")));
			String authId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("auth_id")));
            String userIp = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("user_ip")));
            String terMac = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("user_mac")));
            String browserType = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("browser_type")));

			ValidateUtil vu = new ValidateUtil();
			vu.add("auth_id", authId, PropertiesUtil.confProperties.getProperty("user.param.authId"),
					new Rule[]{new Required()});
			vu.add("deviceId", deviceId, PropertiesUtil.confProperties.getProperty("user.param.deviceId"),
					new Rule[]{new Required()});
			String validStr = vu.validateString();
			
			if (StringUtils.isNotBlank(validStr)) {
				resultMap = this.getResult(validStr);
			
			}else {
				Device device = this.deviceService.getDeviceById(deviceId);
				 
	            if (StringUtils.isNotBlank(terMac)) {
	            	terMac = MacUtil.convertMacToTwifiFormat(terMac);
	            }else {
	            	terMac = "085700A7DAF7";
	            }

                if (device == null) {
                    retMessage = PropertiesUtil.confProperties.getProperty("user.msg.illegalDevice");
                    resultMap = this.getResult(retMessage);
               
                }else {
                	TerminalUser user = this.userService.getTerminalUserByAuthId(authId);
    	            if(user == null){
    	            	user = new TerminalUser();
    	            	user.setAuthId(authId);
    	            	user.setCreateDatetime(new Date());
    	            }
    	            
    	            String authType = Constants.PORTAL_AUTH_TYPE_MOBILE;
    	            String authCode = RandomStringUtils.random(Constants.AUTH_CODE_LENGTH, false, true);
    	            user.setAuthCode(authCode);
    	            user.setAuthType(authType);
    	            user.setAuthenticationType(authType);
    	            user.setMac(terMac);
    	            user.setBrowserType(browserType);
    	            this.userService.saveOrUpdateTerminalUser(user);
    	            
                     //3. 插入 authentication_log记录
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
                     authLog.setTerminalMac(terMac);
                     authLog.setAccountId(deviceOwnerId);
                     authLog.setTerminalIp(userIp);
                     this.userService.saveTerminalUserAuthLog(authLog);
                     
                     this.userService.saveUserInfo(device, user, authLog, deviceOwnerId, token);

                     resultMap = this.getResult();

                     /* InputStream inputStream = accountService.getAccountByDeviceId(deviceId);
                     
                     // 判断返回结果,获取商户ID
		             if(inputStream == null){
	                	resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("account.msg.addAccountFail"));
	                	return SUCCESS;
	                	
	                 }else {
	                	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
	                 }
	                
	                logger.debug("应用中心根据deviceId获取accountId返回：" + returnMessage);
	                
	                Map<String, Object> requestResult = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
	                
	                Long accountId = null;
	                
	                if("OK".equalsIgnoreCase((String) requestResult.get("result"))){
	                	accountId = Long.parseLong((String) requestResult.get("message"));
	                	
	                }else {
	                	resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("account.msg.addAccountFail"));
	                	return SUCCESS;
	                }*/
                     
                    
                }
				
			}
			
        } catch (Exception e) {
            e.printStackTrace();
            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
            saveExceptionLog("api10", this.getClass().toString(), e);
        }

        return SUCCESS;
    }
	
	
	
	/**
	 * 胖AP注册-验证推荐码
	 * 
	 * @return
	 */
	@Action(value = "recommendNumbervalidation", results = { @Result(name = SUCCESS, type = "json", params = {
			"root", "resultMap" }) })
	public String recommendNumberValidate() {
		resultMap = new HashMap<String, Object>();
		try {
			String recommendNumber = StringUtil.fromGetRequest(request.getParameter("recommendNumber"));
			
			ValidateUtil vu = new ValidateUtil();
			vu.add("recommendNumber", recommendNumber, PropertiesUtil.confProperties.getProperty("device.param.recommendNumber"), 
					new Rule[]{new Regex(Constants.CELLPHONE_PATTERN)});
			String validStr = vu.validateString();
			
			if(validStr == null){
				List<AccountWithBLOBs> agentList = accountService.getAccountListByCellNumber(recommendNumber);
				if(agentList==null || agentList.size()==0){
					resultMap = this.getResult("推荐码无效");
				} else {
					resultMap = this.getResult();
				}
			} else {
				resultMap = this.getResult(validStr);
			}
		} catch (Exception e) {
			e.printStackTrace();
			saveExceptionLog("api10", this.getClass().toString(), e);
			resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
		} 
		return SUCCESS;
	}
	
	
	/**
	 * 向中心平台发送请求，中心平台发送会员在线消息给商户
	 * @param memberId	会员ID
	 * @param accountId	商户ID
	 * @param deviceId	设备ID
	 * @return
	 * @throws IOException 
	 */
	/*private boolean sendMemberOnlineMessage(Long memberId, Long accountId, String deviceId) throws IOException {
		boolean returnValue = Boolean.FALSE;
		
		// 获取中心平台请求路径
		String whitelistUrl = 
                PropertiesUtil.confProperties.getProperty("applicationCentel") +
                PropertiesUtil.confProperties.getProperty("applicationCentel.sendMemberOnlineMessage");
		
		// 设置请求参数
		Map<String, String> requestParam = new HashMap<String, String>();
		requestParam.put("memberId", memberId+"");
		requestParam.put("accountId", accountId+"");
		requestParam.put("deviceId", deviceId);
		
		logger.debug("应用中心发送会员在线消息：" + whitelistUrl + "----参数： " + requestParam.toString());
		
		// 发送post请求并接受返回结果
		InputStream inputStream = HttpRequest.sendPostRequest(whitelistUrl, requestParam);
		String returnMessage = "";
		
		// 判断返回结果
        if(inputStream == null){
        	userService.saveExecptionLog("api", this.getClass().toString(), PropertiesUtil.confProperties.getProperty("device.msg.fatApAuthFail"));
        	System.out.println("");
            return returnValue;
            
        }else{
        	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
        }
		
        Map<String, Object> requestResult = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
        
        logger.debug("应用中心发送会员在线消息返回：" + returnMessage);
        
        if("OK".equalsIgnoreCase((String) requestResult.get("result"))){
        	returnValue = Boolean.TRUE;
        }else {
        	returnValue = Boolean.FALSE;
        	userService.saveExecptionLog("api", this.getClass().toString(), PropertiesUtil.confProperties.getProperty("device.msg.fatApAuthFail"));
        	System.out.println(requestResult.get("message")+"**********************************************");
        }
        
        return returnValue;
	}*/
}
