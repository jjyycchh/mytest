package com.access.action.platform10;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.access.base.BaseAction;
import com.access.core.constant.Constants;
import com.access.core.error.ErrorMessage;
import com.access.core.util.MacUtil;
import com.access.core.util.PropertiesUtil;
import com.access.core.util.StringUtil;
import com.access.core.util.ValidateUtil;
import com.access.core.util.rules.Numeric;
import com.access.core.util.rules.Regex;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;
import com.access.model.device.ComponentWithBLOBs;
import com.access.model.device.Device;
import com.access.model.device.DeviceWithBLOBs;
import com.access.model.system.Location;
import com.access.model.system.ThirdPlatform;
import com.access.model.user.TerminalUser;
import com.access.model.user.TerminalUserAuthLog;
import com.access.service.user.UserService;
import com.access.core.token.TwifiTokenRepository;
import com.access.core.commons.HttpRequest;
import com.access.model.device.AAAVirtualDevice;
import com.access.core.util.rules.CheckBox;
import com.access.core.util.rules.Length;
import com.google.gson.reflect.TypeToken;


@Controller
@Scope("prototype")
@Namespace("/platform10")
public class PlatformAction extends BaseAction {
	
	private static final long serialVersionUID = 16426676657004142L;
	Logger logger  =  Logger.getLogger(this.getClass());
	
	@Resource(name="userService")
	private UserService userService;
	
	@Resource(name="twifiTokenRepository")
	private TwifiTokenRepository tokenRepository;
	
	private String appIdList = PropertiesUtil.confProperties.getProperty("appid.list");
	private static Map<String, ThirdPlatform> platformCodeCache = new HashMap<String, ThirdPlatform>();
	
	
	/**
	 * 二级平台注册
	 * 
	 * @return
	 * */
	@Action(value = "register", results = { @Result(name = SUCCESS, type = "json", params = {
			"root", "resultMap" }) })
	public String register() {
		resultMap = new HashMap<String, Object>();
//		AccountWithBLOBs curAccount = this.getCurLoginAccount();
//		boolean result = true;
		String message = "";
//		String operationDescription = "注册二级平台。";
		try {
			String name = StringUtil.htmlEscape(this.request.getParameter("name"));
			String domain = StringUtil.htmlEscape(this.request.getParameter("domain"));
			String ipAddr = StringUtil.htmlEscape(this.request.getParameter("ip_addr"));
			String ipPort = StringUtil.htmlEscape(this.request.getParameter("ip_port"));
			String description = StringUtil.htmlEscape(this.request.getParameter("description"));
			String phone = StringUtil.htmlEscape(this.request.getParameter("phone"));
			String authType = StringUtil.htmlEscape(this.request.getParameter("auth_type"));
			String province = StringUtil.htmlEscape(this.request.getParameter("province"));
			String city = StringUtil.htmlEscape(this.request.getParameter("city"));
			String county = StringUtil.htmlEscape(this.request.getParameter("district"));
			String userOnlineURL = this.request.getParameter("user_online_url");
			String userOfflineURL = this.request
					.getParameter("user_offline_url");
			String welcomeURL = StringUtil.htmlEscape(this.request.getParameter("welcome_url"));
			
			//校验传进来的参数
			ValidateUtil vu = new ValidateUtil();
			vu.add("name", name, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformName"), new Rule[] {
					new Required(), new Length(100) });
			vu.add("domain", domain, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformDomain"),
					new Rule[] { new Required(), new Length(100) });
			vu.add("ipAddr", ipAddr, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformIpAddr"),
					new Rule[] { new Required(), new Length(40) });
			vu.add("ipPort", ipPort, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformIpPort"),
					new Rule[] { new Required(), new Length(10) });
			vu.add("description", description, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformDescription"),
					new Rule[] { new Length(1000) });
			vu.add("authType", authType, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformAuthType"),
					new Rule[] { new Length(20) });
			vu.add("phone", phone, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformPhone"),
					new Rule[] { new Required(), new Length(15) });
			vu.add("province", province, PropertiesUtil.confProperties
					.getProperty("device.param.province"), new Rule[] {
					new Required(), new Length(45) });
			vu.add("city", city, PropertiesUtil.confProperties
					.getProperty("device.param.city"), new Rule[] {
					new Required(), new Length(250) });
			vu.add("county", county, PropertiesUtil.confProperties
					.getProperty("device.param.county"),
					new Rule[] { new Length(250) });
			vu.add("userOnlineURL",
					userOnlineURL,
					PropertiesUtil.confProperties
							.getProperty("system.param.thirdPlatformOnlineURL"),
					new Rule[] { new Required(), new Length(500) });
			vu.add("userOfflineURL",
					userOfflineURL,
					PropertiesUtil.confProperties
							.getProperty("system.param.thirdPlatformOfflineURL"),
					new Rule[] { new Required(), new Length(500) });
			vu.add("welcomeURL", welcomeURL, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformWelcomeURL"),
					new Rule[] { new Length(500) });

			String validStr = vu.validateString();
			if (validStr == null) {
				Map<String, Object> resultMapTmp = new HashMap<String, Object>();
                resultMapTmp = systemService.checkLocation(province, city, county);
                if(resultMapTmp.get("result").toString() != "FAIL") {
                    province = resultMapTmp.get("province").toString();
                    city = resultMapTmp.get("city").toString();
                    if (resultMapTmp.get("result").toString() == "OK") {
                        county = resultMapTmp.get("county").toString();
                    }
                    ThirdPlatform thirdPlatform = new ThirdPlatform();
    				DeviceWithBLOBs device = new DeviceWithBLOBs();

    				//生成对应虚拟设备的设备ID
    				String platformCode = this.deviceService.
    						generateThirdPlatformCode(new Date());
    				
    				//配置对应虚拟设备的其他信息并写入数据库
    				Location deviceLocation = new Location();
    				deviceLocation.setProvince(province);
    				deviceLocation.setCity(city);
    				if(StringUtils.isNotBlank(county)) {
    					deviceLocation.setCountyDistrict(county);
    				}
    				deviceLocation.setAccountId(Constants.SUPER_ADMIN_ACCOUNT_ID);
    				//Location virtualLocation = this.deviceService.getOrCreateDefaultLocationByAccountId(Constants.SUPER_ADMIN_ACCOUNT_ID);
                    ComponentWithBLOBs component = this.deviceService.getOrCreateComponent(Constants.THIRD_PLATFORM_DEVICE_COMPONENT_VERSION);
                    String uuid = UUID.randomUUID().toString().toUpperCase();
                    uuid = uuid.replace("-", "");
                    String deviceName = Constants.THIRD_PLATFORM_DEVICE_NAME_PREFIX + uuid.substring(0, Constants.THIRD_PLATFORM_DEVICE_NAME_RAND_STR_LEN);
                    device.setDeviceId(platformCode);
                    if (StringUtils.isNotBlank(deviceName)){
                        device.setName(deviceName);
                    }
                    
                    device.setDeviceModelId(deviceService.getOrCreateDeviceModelIdByBrandModel(
                    		Constants.THIRD_PLATFORM_DEVICE_BRAND, Constants.THIRD_PLATFORM_DEVICE_MODEL));
                    device.setBrand(Constants.THIRD_PLATFORM_DEVICE_BRAND);
                    device.setModel(Constants.THIRD_PLATFORM_DEVICE_MODEL);
                    device.setFramewareVersion(Constants.THIRD_PLATFORM_DEVICE_FIRMWARE_VERSION);
                    device.setComponentId(component.getId());
                    device.setLocationId(deviceService.saveOrgetLocation(deviceLocation).getId());
                    device.setStatus(Constants.DEVICE_STATUS_OFFLINE);
                    device.setManufacturerId(Constants.SUPER_ADMIN_ACCOUNT_ID);
                    this.deviceService.saveNewDevice(device);

                    //配置二级平台信息并写入数据库
    				thirdPlatform.setName(name);
    				thirdPlatform.setDomain(domain);
    				thirdPlatform.setIpAddr(ipAddr);
    				thirdPlatform.setIpPort(ipPort);
    				thirdPlatform.setPhone(phone);
    				thirdPlatform.setAppAuthType(authType);
    				thirdPlatform.setProvince(province);
    				thirdPlatform.setCity(city);
    				thirdPlatform.setUserOnlineUrl(userOnlineURL);
    				thirdPlatform.setUserOfflineUrl(userOfflineURL);
    				thirdPlatform.setPlatformCode(platformCode);
    				if (StringUtils.isNotBlank(description)) {
    					thirdPlatform.setDescription(description);
    				}
    				if (StringUtils.isNotBlank(county)) {
    					thirdPlatform.setCounty(county);
    				}
    				if (StringUtils.isNotBlank(welcomeURL)) {
    					thirdPlatform.setWelcomeUrl(welcomeURL);
    				}
    				systemService.saveThirdPlatform(thirdPlatform);
//    				operationDescription += "平台唯一码：";
//    				operationDescription += platformCode;
    				resultMap.put("result", "OK");
    				resultMap.put("message", message);
                } else {
                	message = resultMapTmp.get("message").toString();
                	resultMap.put("result", "FAIL");
                    resultMap.put("message", message);
                }
			} else {
				message = validStr;
				resultMap.put("result", "FAIL");
				resultMap.put("message", message);
			}
		} catch (Exception e) {
			e.printStackTrace();
			message = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap.put("result", "FAIL");
			resultMap.put("message", message);
			result = false;
			saveExceptionLog("platform", this.getClass().toString(), e);
		}
//		loadAccountOptLog(curAccount != null ? curAccount.getId() : null,
//				operationDescription, "PlatformAction.register", "system", systemService
//						.getClass().getName(), result, "");
		return SUCCESS;
	}
		
	
	/**
	 * 二级平台修改
	 * @return
	 */
	@Action(value = "setthirdplatform", results = { @Result(name = SUCCESS, type = "json", params = {
			"root", "resultMap" }) })
	public String setThirdPlatform() {
		resultMap = new HashMap<String, Object>();
//		AccountWithBLOBs curAccount = this.getCurLoginAccount();
//		boolean result = true;
		try {
			String id = StringUtil.htmlEscape(this.request.getParameter("id"));
			String name = StringUtil.htmlEscape(this.request.getParameter("name"));
			String domain = StringUtil.htmlEscape(this.request.getParameter("domain"));
			String ipAddr = StringUtil.htmlEscape(this.request.getParameter("ip_addr"));
			String ipPort = StringUtil.htmlEscape(this.request.getParameter("ip_port"));
			String description = StringUtil.htmlEscape(this.request.getParameter("description"));
			String phone = StringUtil.htmlEscape(this.request.getParameter("phone"));
			String authType = StringUtil.htmlEscape(this.request.getParameter("auth_type"));
			String province = StringUtil.htmlEscape(this.request.getParameter("province"));
			String city = StringUtil.htmlEscape(this.request.getParameter("city"));
			String county = StringUtil.htmlEscape(this.request.getParameter("district"));
			String userOnlineURL = this.request.getParameter("user_online_url");
			String userOfflineURL = this.request
					.getParameter("user_offline_url");
			String welcomeURL = StringUtil.htmlEscape(this.request.getParameter("welcome_url"));
			
			//校验传进来的参数
			ValidateUtil vu = new ValidateUtil();
			vu.add("name", name, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformName"), new Rule[] {
					new Required(), new Length(100) });
			vu.add("domain", domain, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformDomain"),
					new Rule[] { new Required(), new Length(100) });
			vu.add("ipAddr", ipAddr, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformIpAddr"),
					new Rule[] { new Required(), new Length(40) });
			vu.add("ipPort", ipPort, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformIpPort"),
					new Rule[] { new Required(), new Length(10) });
			vu.add("description", description, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformDescription"),
					new Rule[] { new Length(1000) });
			vu.add("phone", phone, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformPhone"),
					new Rule[] { new Required(), new Length(15) });
			vu.add("authType", authType, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformAuthType"),
					new Rule[] { new Length(20) });
			vu.add("province", province, PropertiesUtil.confProperties
					.getProperty("device.param.province"), new Rule[] {
					new Required(), new Length(45) });
			vu.add("city", city, PropertiesUtil.confProperties
					.getProperty("device.param.city"), new Rule[] {
					new Required(), new Length(250) });
			vu.add("county", county, PropertiesUtil.confProperties
					.getProperty("device.param.county"),
					new Rule[] { new Length(250) });
			vu.add("userOnlineURL",
					userOnlineURL,
					PropertiesUtil.confProperties
							.getProperty("system.param.thirdPlatformOnlineURL"),
					new Rule[] { new Required(), new Length(500) });
			vu.add("userOfflineURL",
					userOfflineURL,
					PropertiesUtil.confProperties
							.getProperty("system.param.thirdPlatformOfflineURL"),
					new Rule[] { new Required(), new Length(500) });
			vu.add("welcomeURL", welcomeURL, PropertiesUtil.confProperties
					.getProperty("system.param.thirdPlatformWelcomeURL"),
					new Rule[] { new Length(500) });

			String validStr = vu.validateString();
			if (validStr == null) {
				ThirdPlatform thirdPlatform = new ThirdPlatform();
				thirdPlatform.setId(Long.parseLong(id));
				thirdPlatform.setName(name);
				thirdPlatform.setDomain(domain);
				thirdPlatform.setIpAddr(ipAddr);
				thirdPlatform.setIpPort(ipPort);
				thirdPlatform.setPhone(phone);
				thirdPlatform.setAppAuthType(authType);
				thirdPlatform.setProvince(province);
				thirdPlatform.setCity(city);
				thirdPlatform.setUserOnlineUrl(userOnlineURL);
				thirdPlatform.setUserOfflineUrl(userOfflineURL);
				thirdPlatform.setDescription(description);
				thirdPlatform.setCounty(county);
				thirdPlatform.setWelcomeUrl(welcomeURL);
				
				systemService.updateThirdPlatformById(thirdPlatform);
				
				resultMap.put("result", "OK");
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", validStr);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties
					.getProperty("message.exception"));
			result = false;
			saveExceptionLog("platform", this.getClass().toString(), e);
		}
//		loadAccountOptLog(curAccount != null ? curAccount.getId() : null,
//				"修改二级平台", "PlatformAction.setThirdPlatform", "system", systemService
//						.getClass().getName(), result, "");
		return SUCCESS;
	}
	
	
	
	/**
     * 发送验证码接口（APP发送验证码，中心平台调用）
     * @return
     */
    @Action(value = "sendcode-p", results = {
            @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
    public String sendCode() {
        try {
            String authId = StringUtil.htmlEscape(request.getParameter("auth_id"));
            String terMac = request.getParameter("ter_mac");
            String authType = request.getParameter("auth_type");
            terMac = MacUtil.convertMacToTwifiFormat(terMac);
            
            ValidateUtil vu = new ValidateUtil();
            vu.add("auth_id", authId, PropertiesUtil.confProperties.getProperty("user.param.authId"), 
                    new Rule[]{new Required(), new Length(11,11), new Regex(Constants.CELLPHONE_PATTERN)});
//            vu.add("ter_mac", terMac, "terMac", new Rule[]{new Required(), new Length(12), new Regex(Constants.MAC_PATTERN)});
            vu.add("auth_type", authType, PropertiesUtil.confProperties.getProperty("user.param.authType"), 
                    new Rule[]{new Required(), new CheckBox(new String[]{Constants.PORTAL_AUTH_TYPE_MOBILE, Constants.PORTAL_AUTH_TYPE_APPMOBILE})});
            String validStr = vu.validateString();
            
            if (validStr != null) {
                resultMap = this.getResult(validStr);
                return SUCCESS;
            }
            
            TerminalUser user = this.userService.getTerminalUserByAuthId(authId);
            
            if(user == null){
            	user = new TerminalUser();
            	user.setAuthId(authId);
            	user.setCreateDatetime(new Date());
            }
            
            // 生成 auth_code 并保存到 TerminalUser表
            String authCode = tokenRepository.generateAuthCode();
            user.setAuthCode(authCode);
            user.setAuthType(authType);
            user.setAuthenticationType(authType);
            user.setMac(terMac);
            this.userService.saveOrUpdateTerminalUser(user);
            
            //3 发送短信 auth_code 到 auth_id
            this.sendCodeBySms(authId, null, authCode, null);

            resultMap = this.getResult();
            resultMap.put("message", "");
            
        } catch (Exception e) {
            logger.error("sendcode-p 请求错误：", e);
            saveExceptionLog("platform10", this.getClass().toString(), e);
            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("user.msg.readValidateCodeFail"));
        }
        
        return SUCCESS;
    }

    /**
     * 验证验证码 (APP点击免费登陆）
     * @return
     */
    @Action(value = "login-p", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String loginP() {
    	
    	try {
	        String authId = this.request.getParameter("auth_id");
	    	String authCode = this.request.getParameter("auth_code");
	    	String terMac = this.request.getParameter("ter_mac");
			String authType = this.request.getParameter("auth_type");
	        terMac = MacUtil.convertMacToTwifiFormat(terMac);
	    	
	    	ValidateUtil vul = new ValidateUtil();
	    	vul.add("auth_type", authType, PropertiesUtil.confProperties.getProperty("user.param.authType"), 
	                new Rule[]{new Required()});
//	        vul.add("terMaC", terMac, "terMac", new Rule[]{new Required(), new Length(12,12), new Regex(Constants.MAC_PATTERN)});
        	
            if (Constants.PORTAL_AUTH_TYPE_MOBILE.equalsIgnoreCase(authType) || Constants.PORTAL_AUTH_TYPE_APPMOBILE.equalsIgnoreCase(authType)) {
            	vul.add("authId", authId, PropertiesUtil.confProperties.getProperty("user.param.authId"), 
                        new Rule[]{new Required(), new Length(11, 11), new Numeric(), new Regex(Constants.CELLPHONE_PATTERN)});
            	vul.add("authCode", authCode, PropertiesUtil.confProperties.getProperty("user.param.authCode"), 
                        new Rule[]{new Required(), new Length(Constants.AUTH_CODE_LENGTH, Constants.AUTH_CODE_LENGTH), new Numeric()});
    	        String validStr = vul.validateString();
    	        
                if (StringUtils.isNotEmpty(validStr)) {
                    resultMap = this.getResult(validStr);
                    return SUCCESS;
                }
                
            	// 根据auth_id 获取 TernimalUser 记录
            	TerminalUser terUser = this.userService.getTerminalUserByAuthId(authId);

                if (terUser == null) {
                	// 请先获取验证码
                    resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("user.msg.pleateGetValidateCode"));
                    return SUCCESS;
                }
                
                if(!authCode.equals(terUser.getAuthCode())){
                	// 验证码错误，请填入正确的验证码
                    resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("account.msg.retCode.error"));
                    return SUCCESS;
                }
                
                resultMap = this.getResult();
            } else {
                resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("user.msg.wrongValidateType"));
            }
        } catch (Exception e) {
            logger.error("login-p 请求错误：", e);
            saveExceptionLog("platform10", this.getClass().toString(), e);
            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
        }

        return SUCCESS;
    }
    
    /**
     * 获取token,手机APP点击热点认证
     * @return
     */
    @SuppressWarnings("deprecation")
	@Action(value = "token", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
	public String accessToken() {
    	
		try {
			String appId = StringUtil.htmlEscape(this.request.getParameter("app_id"));
			String authId = StringUtil.htmlEscape(this.request.getParameter("auth_id"));
        	String terMac = StringUtil.htmlEscape(this.request.getParameter("ter_mac"));
        	String terIp = StringUtil.htmlEscape(this.request.getParameter("ter_ip"));
        	String authType = StringUtil.htmlEscape(this.request.getParameter("auth_type"));
        	String terminalType = StringUtil.htmlEscape(this.request.getParameter("terminal_type"));
        	String devId = StringUtil.htmlEscape(this.request.getParameter("dev_id"));
        	String acName = StringUtil.htmlEscape(this.request.getParameter("ac_name"));
        	String platformCode = StringUtil.htmlEscape(this.request.getParameter("platform_code"));
        	String portalUrl = this.request.getParameter("portal_url");
//        	String appUnqid = StringUtil.htmlEscape(this.request.getParameter("app_unqid"));
//        	String imei = StringUtil.htmlEscape(this.request.getParameter("imei"));
        	terMac = MacUtil.convertMacToTwifiFormat(terMac);
        	
        	ValidateUtil vu = new ValidateUtil();
        	vu.add("authType", authType, PropertiesUtil.confProperties.getProperty("user.param.authType"),new Rule[]{new Required()});
//        	vu.add("terMac", terMac, "ter_mac", new Rule[]{new Required(), new Regex(Constants.MAC_PATTERN)});
        	
        	// 手机号码，免认证时非必须
        	if(!Constants.PORTAL_AUTH_TYPE_OPTION.equalsIgnoreCase(authType)){
        		vu.add("authId", authId, "auth_id", new Rule[]{new Required(), new Numeric()});
        	}
        	
            if(Constants.PORTAL_AUTH_TYPE_APPMOBILE.equalsIgnoreCase(authType)){
                if(StringUtils.isNotBlank(appId) && StringUtils.isNotBlank(appIdList)){
                    if( appIdList.indexOf(appId) < 0 ){
                        resultMap = this.getResult("app未授权，非法APP。");
                        return SUCCESS;
                    }
                }
                vu.add("terIp", authId, "ter_ip", new Rule[]{new Required()});
//                vu.add("appUnqid", appUnqid, "appUnqid", new Rule[]{new Required()});
            }
            
        	vu.add("terminalType", terminalType, "terminal type", new Rule[]{new Required()});
        	String validStr = vu.validateString();

        	// 参数校验结果有误时，返回
            if (StringUtils.isNotEmpty(validStr)) {
                resultMap = this.getResult(validStr);
                return SUCCESS;
            }
            
            terIp = StringUtils.isBlank(terIp) ? getRemoteHost(this.request) : terIp;
            
            //乌镇测试时使用
           /* if(portalUrl != null && portalUrl.indexOf("wic2014-portal.51iwifi.com") > -1
            		&& portalUrl.indexOf("wlanacname") > -1){
            	String wzUrl = URLDecoder.decode(portalUrl);
            	Pattern ptn = Pattern.compile("(^|\\?|&)wlanacname=([^&]*)(&|$)");
            	Matcher matcher = ptn.matcher(wzUrl);
            	if(matcher.find()){
            		acName = matcher.group(2);
            	}
            }*/
            
            String appAuthType = null;
            Device device = null;
            
            // 第三方验证的时候，platformCode作为 虚拟设备id
            if(StringUtils.isNotBlank(platformCode)){
            	appAuthType = Constants.APP_AUTH_TYPE_THIRD;
            	devId = platformCode;	
            	
            }else if(StringUtils.isNotBlank(devId)){
            	AAAVirtualDevice radius = this.deviceService.getRaduisByDeviceId(devId);
            	
        		if(radius != null){
        			appAuthType = Constants.APP_AUTH_TYPE_AC;
        			devId = radius.getDeviceId();
                    /*if (StringUtils.isBlank(terMac)) {
                        List<DhcpInfo> dhcpInfos = this.deviceService.getOnlineDhcpInfosByUserIp(terIp);
                        if (dhcpInfos == null || dhcpInfos.size() == 0) {
                            return this.getResult("IP 找不到对应已经绑定的设备MAC地址");
                        } else {
                        	terMac = dhcpInfos.get(0).getMac();
                        }
                    }*/
        		}else{
        			appAuthType = Constants.APP_AUTH_TYPE_AP;
        		}
        		
            }else if(StringUtils.isNotBlank(acName)){
            	AAAVirtualDevice radius = this.deviceService.getRaduisByAcname(acName);
            	
    			if(radius != null){
        			appAuthType = Constants.APP_AUTH_TYPE_AC;
        			devId = radius.getDeviceId();
    			}
    			
            }else if(StringUtils.isNotBlank(portalUrl)){
            	//如果devId 和 platformCode都为空时，则根据portalUrl来判断devId
                portalUrl = URLDecoder.decode(portalUrl);
        		String domain = null;
        		Pattern ptn = Pattern.compile("/([\\w.\\w]+)[/:?]*");
        		Matcher matcher = ptn.matcher(portalUrl);
        		
        		if(matcher.find() && matcher.groupCount() > 0){
        			domain = matcher.group(1);
        		}
        		
        		ThirdPlatform platform = platformCodeCache.get(domain);
        		
    			if(platform != null){
    				devId = platform.getPlatformCode();
    				appAuthType = platform.getAppAuthType();
    				
    			}else{
    				platform = this.systemService.selectByDomain(domain);
    				
    				if(platform != null){
    					devId = platform.getPlatformCode();
    					appAuthType = platform.getAppAuthType();
    					platformCodeCache.put(domain, platform);
    				}
    			}
            }
            
            if(StringUtils.isBlank(appAuthType)){
                resultMap = this.getResult(ErrorMessage.getErrorMsg("error.protocol"));
                return SUCCESS;
            }
            
            device = this.deviceService.getDeviceById(devId);
            
            if (device == null) {
                resultMap = this.getResult(ErrorMessage.getErrorMsg("error.device.find"));
                return SUCCESS;
            }
            
            // 手机认证
            if ( authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_APPMOBILE) || authType.equalsIgnoreCase(Constants.PORTAL_AUTH_TYPE_MOBILE) ){
                TerminalUser user = null;
                
                if(StringUtils.isNotBlank(authId)){
            		user = this.userService.getTerminalUserByAuthId(authId);
            		
            	} else {
            		TerminalUserAuthLog authLog = this.userService.getLastAuthLogByMap(null, terMac, authType);
            		
            		if(authLog != null){
                		user = this.userService.getTerminalUserById(authLog.getTerminalUserId());
                	}
            	}
                
                Boolean isUserBlockedOnDevice = Boolean.FALSE;
                
                // 用户为空时创建用户，用户不为空时判断是否在设备上被锁定
            	if (user == null) {
                    user = this.userService.addTerminalUserAndLink(authId, device, authType, terMac);
                    
                } else {
                    isUserBlockedOnDevice = this.userService.isUserBlockedOnDevice(device, user);
                }
            	
                isUserBlockedOnDevice = isUserBlockedOnDevice 
                		&& Boolean.parseBoolean(PropertiesUtil.confProperties.getProperty("user.auth.userBlock.isEnable"));
                
                // 用户没被该设备锁定时
                if (!isUserBlockedOnDevice) {
                    user.setAuthType(authType);
                    user.setMac(terMac);
//                  user.setBrowserType(browserType);
//                  user.setMerchantName(merchantName);
                    this.userService.saveOrUpdateTerminalUser(user);

                    // 插入 authentication_log记录
//                  TerminalUserAuthLog authLog = this.userService.SaveAuthLog(device, user, Constants.USER_STATUS_OFFLINE);

                    //4. 查找设备所归属的商户
                    Location location = this.deviceService.getLocationById(device.getLocationId());
                    Long deviceOwnerId = location.getAccountId();
                    
                    //5. 生成token
                    String token = tokenRepository.generateTokenData(authId, terMac, devId, terminalType);

                    //6. 插入 authentication_log记录,记录token
                    TerminalUserAuthLog authLog = new TerminalUserAuthLog();
                    authLog.setTerminalUserId(user.getId());
            		authLog.setAuthType(user.getAuthType());
            		authLog.setLogContent("");
            		authLog.setDeviceId(device.getDeviceId());
                    authLog.setToken(token);
                    authLog.setTerminalMac(terMac);
                    authLog.setStatus(Constants.USER_STATUS_OFFLINE);
                    this.userService.saveTerminalUserAuthLog(authLog);

                    Map<String, Object> userinfo = this.userService.saveUserInfo(device, user, authLog, deviceOwnerId, token);

                    String returnMessage = StringUtils.EMPTY;

                    // 在Radius服务器上更新token，创建访问路径
                    String radiusCreateOrUpdateUserUrl = 
                    		PropertiesUtil.confProperties.getProperty("radius.serverAddrOne") +
                            PropertiesUtil.confProperties.getProperty("radius.createRadiusUser");
                    
                    // 组合请求参数
                    Map<String, String> params = new HashMap<String, String>();
//                    String userName = Constants.APP_AUTH_TYPE_AC.equals(appAuthType) ? authId
//                            : authId + PropertiesUtil.confProperties.getProperty("radius.username.suffix");
                    String userName = authId + PropertiesUtil.confProperties.getProperty("radius.username.suffix");
                    
                    params.put("username", URLEncoder.encode(userName, "UTF-8"));
                    params.put("password", URLEncoder.encode(token, "UTF-8"));
                    params.put("token", URLEncoder.encode(token, "UTF-8"));
                    params.put("max_traffic", URLEncoder.encode(String.valueOf(userinfo.get("max_traffic")), "UTF-8"));
                    params.put("exp_time", URLEncoder.encode(String.valueOf(userinfo.get("expired_time")), "UTF-8"));
                    params.put("ter_mac", URLEncoder.encode(terMac, "UTF-8"));
                    
                    
                    logger.debug("radiu注册用户" + radiusCreateOrUpdateUserUrl + "----参数： " + params.toString());
                    
                    InputStream inputStream = HttpRequest.sendPostRequest(radiusCreateOrUpdateUserUrl, params);
                    
                    if(inputStream == null){
                        resultMap = this.getResult(ErrorMessage.getErrorMsg("error.radius.failed"));
                        return SUCCESS;
                        
                    }else{
                    	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array());
                    }
                    logger.debug("radiu注册用户返回：" + returnMessage);
                    
                    // 更新成功
                    if(returnMessage.contains("OK")){
                    	resultMap = this.getResult();
	                    resultMap.put("token", token);
	                    resultMap.put("appauth_type", appAuthType);
	                    
	                    if(StringUtils.isNotBlank(portalUrl)){
	                    	resultMap.put("platform_code", StringUtils.isBlank(platformCode) ? devId : platformCode);
	                    }
	                    
	                    resultMap.put("username", authId);
	                    resultMap.put("password", token);
                        resultMap.put("accountid", deviceOwnerId);
	                    resultMap.put("authid", authId);
	                    
                    }else{
                    	resultMap = this.getResult(returnMessage);
                    }
                    
                } else {
                    resultMap = this.getResult(ErrorMessage.getErrorMsg("error.user.device.lock"));
                    return SUCCESS;
                }
            }
            
		} catch(Exception e) {
			logger.error("token 请求出错：", e);
            saveExceptionLog("platform10", this.getClass().toString(), e);
            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
		}
		
		return SUCCESS;
	}

    /**
     * APP认证 
     * @return
     */
	@Action(value = "appauth", results = {@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String appAuth() {
		resultMap = new HashMap<String, Object>();
		
		try {
	    	String authId = StringUtil.htmlEscape(this.request.getParameter("auth_id"));
	    	String terMac = StringUtil.htmlEscape(this.request.getParameter("ter_mac"));
	    	String terIp = StringUtil.htmlEscape(this.request.getParameter("ter_ip"));
	    	String authType = StringUtil.htmlEscape(this.request.getParameter("auth_type"));
	    	String terminalType = StringUtil.htmlEscape(this.request.getParameter("terminal_type"));
	    	String browserType = this.request.getParameter("browser_type");
	    	String appAuthType = StringUtil.htmlEscape(this.request.getParameter("appauth_type"));
	    	String platformCode = StringUtil.htmlEscape(this.request.getParameter("platform_code"));
			String token = this.request.getParameter("token");
			String redirectParams = this.request.getParameter("redirect_params");
	        String thirdAuthRequest = this.request.getParameter("third_auth_request");
//	    	String imei = StringUtil.htmlEscape(this.request.getParameter("imei"));
//	    	String appUnqid = this.request.getParameter("app_unqid");
	        terMac = MacUtil.convertMacToTwifiFormat(terMac);
	        
	    	ValidateUtil vu = new ValidateUtil();
	    	vu.add("authId", authId, "auth_id", new Rule[]{new Required(), new Numeric()});
	    	vu.add("auth_type", authType, PropertiesUtil.confProperties.getProperty("user.param.authType"), new Rule[]{new Required()});
	    	vu.add("appauth_type", appAuthType, "appauth_type", new Rule[]{new Required()});
//	    	vu.add("terMac", terMac, "ter_mac", new Rule[]{new Required(), new Regex(Constants.MAC_PATTERN)});
	        vu.add("terminalType", terminalType, "terminal_type", new Rule[]{new Required(), new Length(100)});
	        vu.add("platformCode", platformCode, "platform_code", new Rule[]{new Required()});
	        vu.add("token", token, "token", new Rule[]{new Required()});
//	        vu.add("redirectParams", redirectParams, "redirect_params", new Rule[]{new Required()});
	        String validStr = vu.validateString();
			
			if (StringUtils.isNotEmpty(validStr)) {
                resultMap = this.getResult(validStr);
                return SUCCESS;
	        }
			
			terMac = MacUtil.convertMacToTwifiFormat(terMac);
			terIp = StringUtils.isBlank(terIp) ? getRemoteHost(this.request) : terIp;
			authType = authType.toUpperCase();
			
			if(Constants.APP_AUTH_TYPE_THIRD.equals(appAuthType) && 
					(Constants.PORTAL_AUTH_TYPE_APPMOBILE.equals(authType) || Constants.PORTAL_AUTH_TYPE_MOBILE.equals(authType))){
				
		        Device device = this.deviceService.getDeviceById(platformCode);
		        
		        if (device == null) {
                    resultMap = this.getResult(ErrorMessage.getErrorMsg("error.platform_code"));
                    return SUCCESS;
		        }
		        
		        ThirdPlatform platform = systemService.selectURLByCode(platformCode);
		        
		        if(platform == null){
                    resultMap = this.getResult(ErrorMessage.getErrorMsg("error.platform_code"));
                    return SUCCESS;
		        }
		        
		        TerminalUser terUser = this.userService.getTerminalUserByAuthId(authId);
				TerminalUserAuthLog authLog = userService.getLastAuthLogByMap(authId, terMac, authType);
				
				if(authLog == null || terUser == null || !token.equals(authLog.getToken()) || 
						!authType.equals(authLog.getAuthType())|| !platformCode.equals(authLog.getDeviceId())){
                    resultMap = this.getResult(ErrorMessage.getErrorMsg("error.auth.failed"));
                    return SUCCESS;
				}
				
				//判断token的时效性。
				if(!tokenRepository.validToken(authId, token)){
                    resultMap = this.getResult(ErrorMessage.getErrorMsg("error.auth.failed"));
                    return SUCCESS;
				}
				
				Boolean isUserBlockedOnDevice = Boolean.FALSE;
                isUserBlockedOnDevice = this.userService.isUserBlockedOnDevice(device, terUser);
            	
                isUserBlockedOnDevice = isUserBlockedOnDevice && Boolean.parseBoolean(PropertiesUtil.confProperties.getProperty("user.auth.userBlock.isEnable"));
                
		        if (isUserBlockedOnDevice) {
                    resultMap = this.getResult(ErrorMessage.getErrorMsg("error.user.device.lock"));
                    return SUCCESS;
		        }
				
				authLog.setAuthType(authType);
				authLog.setDeviceId(platformCode);
				authLog.setModifiedDatetime(new Date());
				authLog.setCreateDatetime(new Date());
		        authLog.setStatus(Constants.USER_STATUS_ONLINE);
		        authLog.setTerminalType(terminalType);
		        authLog.setBrowserType(browserType);
		        
		        // 更新用户状态为在线
		        terUser.setStatus(Constants.USER_STATUS_ONLINE);
		        this.userService.saveOrUpdateTerminalUser(terUser);
		        
		        //更新authLog 日志
		        this.userService.saveTerminalUserAuthLog(authLog);
		        
		        //更新缓存
		        Location location = this.deviceService.getLocationById(device.getLocationId());
				Long deviceOwnerId = location.getAccountId();
		        this.userService.saveUserInfo(device, terUser, authLog, deviceOwnerId, token);

                if(thirdAuthRequest!= null && "true".equals(thirdAuthRequest)) {
                    String url = platform.getUserOnlineUrl().startsWith("http://") ? platform.getUserOnlineUrl()
                            : ("http://" + platform.getDomain() + ":" + platform.getIpPort() + "/" + platform.getUserOnlineUrl());
                   
                    //认证成功，调用第三方接口进行认证放行
                    ByteBuffer buff = this.sendRequest(url,redirectParams, null, authId, terMac, terminalType, terIp);

                    if (buff == null) {
                        resultMap = this.getResult("第三方用户上线请求失败");
                        return SUCCESS;
                    }
                    
                    String returnMessage = new String(buff.array());
                    resultMap = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
                    
                    if (resultMap.get("token") != null) {
                        resultMap.put("third_token", resultMap.get("token"));
                    }
                    
                    resultMap.remove("token");
                } 
                
                resultMap = this.getResult();
                resultMap.put("logOffURL", platform.getUserOfflineUrl());
                
			} else {
				resultMap = this.getResult("不合法的验证");
			}
			
		} catch (Exception e) {
			logger.error("appauth 请求错误：", e);
            saveExceptionLog("platform10", this.getClass().toString(), e);
            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
		}
		
        return SUCCESS;
    }
    
    /**
     * 验证验证码（APP免费登陆，中心平台调用）
     * @return
     */
    @Action(value = "userAuth", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String userAuth() {
    	
    	try {
	        String authId = this.request.getParameter("auth_id");
	    	String authCode = this.request.getParameter("auth_code");
	    	String terMac = this.request.getParameter("ter_mac");
			String authType = this.request.getParameter("auth_type");
	        terMac = MacUtil.convertMacToTwifiFormat(terMac);
	    	
	    	ValidateUtil vul = new ValidateUtil();
	    	vul.add("auth_type", authType, PropertiesUtil.confProperties.getProperty("user.param.authType"), 
	                new Rule[]{new Required()});
//	        vul.add("terMaC", terMac, "terMac", new Rule[]{new Required(), new Length(12,12), new Regex(Constants.MAC_PATTERN)});

	        if (Constants.PORTAL_AUTH_TYPE_MOBILE.equalsIgnoreCase(authType) || Constants.PORTAL_AUTH_TYPE_APPMOBILE.equalsIgnoreCase(authType)) {
            	vul.add("authId", authId, PropertiesUtil.confProperties.getProperty("user.param.authId"), 
                        new Rule[]{new Required(), new Length(11, 11), new Numeric(), new Regex(Constants.CELLPHONE_PATTERN)});
            	vul.add("authCode", authCode, PropertiesUtil.confProperties.getProperty("user.param.authCode"), 
                        new Rule[]{new Required(), new Length(Constants.AUTH_CODE_LENGTH, Constants.AUTH_CODE_LENGTH), new Numeric()});
    	        String validStr = vul.validateString();
    	        
                if (StringUtils.isNotEmpty(validStr)) {
                    resultMap = this.getResult(validStr);
                    return SUCCESS;
                }
                
            	// 根据auth_id 获取 TernimalUser 记录
            	TerminalUser terUser = this.userService.getTerminalUserByAuthId(authId);

                if (terUser == null) {
                	// 请先获取验证码
                    resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("user.msg.pleateGetValidateCode"));
                    return SUCCESS;
                }
                
                if(!authCode.equals(terUser.getAuthCode())){
                	// 验证码错误，请填入正确的验证码
                    resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("account.msg.retCode.error"));
                    return SUCCESS;
                }
                
                resultMap = this.getResult();
                
            } else {
                resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("user.msg.wrongValidateType"));
            }
        } catch (Exception e) {
            logger.error("login-p 请求错误：", e);
            saveExceptionLog("platform10", this.getClass().toString(), e);
            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
        }

        return SUCCESS;
    }
	
	/**
	 * 获取ssid列表接口
	 * @return
	 */
	@Action(value = "ssidlists", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String ssidlists() {
        resultMap = new HashMap<String, Object>();
        try {
			List<Map<String,String>> ssidList = deviceService.getSsidList();
			String versionLatest = systemService.getLatestVersion();
			
			//添加默认的ssid
			String ssids = PropertiesUtil.confProperties.getProperty("ssid.list");
			if(StringUtils.isNotBlank(ssids)){
				String[] ssidSplit = ssids.split(",");
				ssidList = ssidList == null ? new ArrayList<Map<String, String>>() : ssidList;
				for(String sid : ssidSplit){
					Map<String, String> map = new HashMap<String, String>();
					map.put("ssid", sid);
					ssidList.add(map);
				}
			}
			
        	resultMap.put("result", "OK");
        	resultMap.put("message", "");
        	resultMap.put("data", ssidList);
        	resultMap.put("version", versionLatest);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "FAIL");
            resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));

            saveExceptionLog("platform10", this.getClass().toString(), e);
        }

        return SUCCESS;
    }
	
	
	/**
	 * 用户下线接口
	 * @return
	 */
	@Action(value = "useroffline", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String useroffline() {
        try {
        	String authId = StringUtil.htmlEscape(this.request.getParameter("auth_id"));
        	String platformCode = StringUtil.htmlEscape(this.request.getParameter("platform_code"));
        	String authType = StringUtil.htmlEscape(this.request.getParameter("auth_type"));
        	String appAuthType = StringUtil.htmlEscape(this.request.getParameter("appauth_type"));
        	String terminalType = StringUtil.htmlEscape(this.request.getParameter("terminal_type"));
        	String terIp = StringUtil.htmlEscape(this.request.getParameter("ter_ip"));
			String token = this.request.getParameter("token");
			String thirdToken = this.request.getParameter("third_token");
			String redirectParams = this.request.getParameter("redirect_params");
			
			ValidateUtil vu = new ValidateUtil();
			vu.add("authId", authId, "auth_id", new Rule[]{new Required()});
			vu.add("auth_type", authType, "auth_type", new Rule[]{new Required()});
	    	vu.add("appauth_type", appAuthType, "appauth_type", new Rule[]{new Required()});
	    	vu.add("terminalType", terminalType, "terminal_type", new Rule[]{new Required()});
	        vu.add("platformCode", platformCode, "platform_code", new Rule[]{new Required()});
	        vu.add("token", token, "token", new Rule[]{new Required()});
	        vu.add("redirectParams", redirectParams, "redirect_params", new Rule[]{new Required()});
	        
	        String validStr = vu.validateString();
			if (validStr != null) {
                resultMap = this.getResult(validStr);
                return SUCCESS;
			}
			
			terIp = StringUtils.isBlank(terIp) ? getRemoteHost(this.request) : terIp;
			if(Constants.APP_AUTH_TYPE_THIRD.equals(appAuthType) && Constants.PORTAL_AUTH_TYPE_APPMOBILE.equals(authType)){
				ThirdPlatform platform = systemService.selectURLByCode(platformCode);
		        if(platform == null){
                    resultMap = this.getResult("非法platformCode");
                    return SUCCESS;
		        }
		        
				/*//清空radius服务器上的用户数据
				String radiusUserOfflineUrl =
                        PropertiesUtil.confProperties.getProperty("user.auth.radapi.serverAddr") +
                        PropertiesUtil.confProperties.getProperty("user.auth.radapi.setUserOffline");
                
                Map<String, String> params = new HashMap<String, String>();
                params.put("username", URLEncoder.encode(authId + 
                		PropertiesUtil.confProperties.getProperty("radius.username.suffix"), "UTF-8"));
                String returnMessage = StringUtils.EMPTY;
                InputStream inputStream = HttpRequest.sendPostRequest(radiusUserOfflineUrl, params);
                if(inputStream == null){
                	return this.getResult("radius, 用户下线失败。");
                }else{
                	returnMessage = HttpRequest.parseInputStream(inputStream).toString();
                	if(!returnMessage.contains("OK")){
                		return this.getResult("radius, 用户下线失败。");
                	}
                }*/
                
                //1.update status of auth_log
				userService.updateUserStatus(Constants.TERMINALUSER_AUTH_LOG_STATUS_OFFLINE, platformCode, token);
		        
				//发送下线请求
				String url = platform.getUserOfflineUrl().startsWith("http://") ? platform.getUserOfflineUrl()
    					: ("http://" + platform.getDomain() + ":" + platform.getIpPort() + "/" + platform.getUserOfflineUrl());
				ByteBuffer buff = this.sendRequest(url, 
						redirectParams, thirdToken, authId, null, terminalType, terIp);
		        if(buff == null){
                    resultMap = this.getResult("第三方用户下线请求失败");
                    return SUCCESS;
		        }
		        String returnMessage = new String(buff.array());
		        resultMap = this.gson.fromJson(returnMessage, Map.class);
		        
		        if( resultMap.get("token") != null ){
		        	resultMap.put("third_token", resultMap.get("token"));
		        	resultMap.remove("token");
		        }
			}
        }catch (Exception e) {
            e.printStackTrace();
            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
            saveExceptionLog("platform10", this.getClass().toString(), e);
		}
        return SUCCESS;
	}

	
	/**
	 * 获取远程地址
	 * @param request
	 * @return
	 */
	protected String getRemoteHost(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		
		return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
	}
	
	
	/**
	 * 
	 * @param requestUrl
	 * @param redirectParams
	 * @param thirdToken
	 * @param authId
	 * @param terMac
	 * @param terType
	 * @param terIp
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("deprecation")
	protected ByteBuffer sendRequest(String requestUrl, String redirectParams, String thirdToken, 
    		String authId, String terMac, String terType, String terIp) throws IOException{
    	redirectParams = URLDecoder.decode(redirectParams);
    	redirectParams = StringUtils.isBlank(thirdToken) ? 
    			redirectParams : ("token=" + thirdToken + "&" + redirectParams);
    	String onlineUrl = "";
        if(requestUrl.indexOf("?") > -1){
        	onlineUrl = requestUrl.replace("${authId}", authId)
        			.replace("${terMac}", (terMac == null ? "" : terMac))
        				.replace("${terType}", (terType == null ? "" : terType))
        				.replace("${terIp}", (terIp == null ? "" : terIp))+ "&" + redirectParams;
        }else{
        	onlineUrl = requestUrl + "?" + redirectParams;
        }
        ByteBuffer buff = null;
        logger.debug(onlineUrl);
        if(requestUrl.indexOf("post=1") > -1){
        	//发送post请求
            InputStream inputStream = HttpRequest.sendPostRequest(onlineUrl, new HashMap<String, String>());
            if(inputStream != null){
                buff = HttpRequest.parseInputStream(inputStream);
            }
        }else{
        	buff = HttpRequest.sendGetRequest(onlineUrl, null);
        }
        logger.debug(buff != null ? new String(buff.array()) : "request is null--------------------------------------");
        return buff;
    }
}
