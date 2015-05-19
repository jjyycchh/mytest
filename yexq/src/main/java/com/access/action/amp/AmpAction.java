package com.access.action.amp;


import java.util.Date;
import java.util.HashMap;
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
import com.access.core.util.PropertiesUtil;
import com.access.core.util.StringUtil;
import com.access.core.util.ValidateUtil;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;
import com.access.model.device.Device;
import com.access.model.system.Location;
import com.access.model.user.TerminalUser;
import com.access.model.user.TerminalUserAuthLog;
import com.access.service.user.UserService;


/**
 * Created by Richard on 2014/8/12.
 */

@Controller
@Namespace("/radapi10")
public class AmpAction extends BaseAction {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Logger logger  =  Logger.getLogger(this.getClass());

	@Resource(name="userService")
	private UserService userService;
	
	@Action(value = "ampauth", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
    public String smpAuth() {
        resultMap = new HashMap<String, Object>();
        String retMessage = StringUtils.EMPTY;
        try {
            String deviceId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("device_id")));
			String authId = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("auth_id")));
            String userIp = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("user_ip")));
            String terMac = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("user_mac")));
            String browserType = StringUtil.htmlEscape(StringUtil.fromGetRequest(this.request.getParameter("browser_type")));
            
            if (StringUtils.isNotBlank(terMac)) {
            	terMac = terMac.toUpperCase();
            	terMac = terMac.replace(":","").replace("-","").replace(".","");
            }


			ValidateUtil vu = new ValidateUtil();
			vu.add("auth_id", authId, PropertiesUtil.confProperties.getProperty("user.param.authId"),
					new Rule[]{new Required()});
			vu.add("deviceId", deviceId, PropertiesUtil.confProperties.getProperty("user.param.deviceId"),
					new Rule[]{new Required()});

			String validStr = vu.validateString();
			if (org.apache.commons.lang3.StringUtils.isNotBlank(validStr)) {
				resultMap.put("result", "FAIL");
				resultMap.put("message", validStr);
			}
			else {
				Device device = this.deviceService.getDeviceById(deviceId);
                if (StringUtils.isBlank(terMac)) {
                	terMac = "085700A7DAF7";
                }

                if (device == null) {
                    retMessage = "非法设备";
                    resultMap.put("message", retMessage);
                    resultMap.put("result", "FAIL");
                }
                else {
                	TerminalUser user = this.userService.getTerminalUserByAuthId(authId);
    	            if(user == null){
    	            	user = new TerminalUser();
    	            	user.setAuthId(authId);
    	            	user.setCreateDatetime(new Date());
//    	            	user.setModifiedDatetime(new Date());
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
                     authLog.setTerminalIp(userIp);
                     
//                     Long merchantId = accountService.getAccountIdByDeviceId(deviceId);
//                     authLog.setAccountId(merchantId);
                     
                     authLog.setAccountId(deviceOwnerId);
                     this.userService.saveTerminalUserAuthLog(authLog);

                     this.userService.saveUserInfo(device, user, authLog, deviceOwnerId, token);

                     String authCodeUUID = UUID.randomUUID().toString().toUpperCase();
                     uuid = authCodeUUID.replace("-", "");
                     authCode = uuid.substring(0, Constants.AUTH_TOKEN_LENGTH);

                     resultMap = this.getResult();
                }
				
			}
			
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "FAIL");
            resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));

            saveExceptionLog("api", this.getClass().toString(), e);
        }

        return SUCCESS;
    }


}
