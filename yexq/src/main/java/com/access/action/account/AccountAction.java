package com.access.action.account;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

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
import com.access.core.util.ValidateUtil;
import com.access.core.util.rules.Length;
import com.access.core.util.rules.Numeric;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;
import com.access.model.account.AccountWithBLOBs;
import com.access.service.account.AccountService;
import com.access.service.system.SystemService;
import com.access.service.user.UserService;
import com.alipay.util.httpClient.HttpRequest;
import com.google.gson.reflect.TypeToken;


@Controller
@Namespace("/account")
public class AccountAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
	Logger logger  =  Logger.getLogger(this.getClass());
	
	@Resource
	private AccountService accountService;
	@Resource
	private SystemService systemService;
	@Resource
	private UserService userService;
	
	// 黑白名单相关的设备ID列表和mac地址列表
	private List<String> devIdList = null;
	private List<String> macList = null;
	private Long accountId;
	
	/**
	 * 用户登录页
	 * 
	 * @return
	 */
	@Action(value = "login", results = {
			@Result(name = SUCCESS, location = "/WEB-INF/jsp${jspversion}/loggout/login.jsp"), 
			@Result(name = "redirect_main_base", location = "home.htm", type="redirect")}) 
	public String login() {
		try {
			if (this.session.getAttribute(Constants.LOGIN_ACCOUNT_INFO) != null) {
				String hostname = PropertiesUtil.get("server.plat.hostname");
				String httpport = PropertiesUtil.get("server.plat.httpport");
				response.sendRedirect("http://"+hostname+":"+httpport+"/account/home.htm");
				return null;
			}else {
				this.session.setAttribute(Constants.PLAT_HTTP_PORT,
						PropertiesUtil.confProperties.getProperty("server.plat.httpport"));
				return SUCCESS;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ERROR;
		}
	}
	
	/**
	 * 默认页
	 * 
	 * @return
	 */
	@Action(value = "main", results = {
			@Result(name = SUCCESS, location = "/WEB-INF/jsp30/syslogin/interior/loginin.jsp"),
			@Result(name = "MERCHANT", location = "/WEB-INF/jsp30/syslogin/interior/loginin.jsp")})
	public String main() {
		try {
			String portalSvrHostName = PropertiesUtil.confProperties.getProperty("server.plat.hostname");
			String port = PropertiesUtil.confProperties.getProperty("server.plat.httpport");
			
			portalSvrHostName = "http://" + portalSvrHostName;
			portalSvrHostName += ":" + port;
			
			request.setAttribute("portalSvrHostName", portalSvrHostName);
			return SUCCESS;
		} catch (Exception e) {
			e.printStackTrace();
			return ERROR;
		}
	}
	
	/**
	 * 首页
	 * 
	 * @return
	 */
	@Action(value = "home", results = {
			@Result(name = SUCCESS, location = "/WEB-INF/jsp30/syslogin/interior/loginin.jsp"),
			@Result(name = "MERCHANT", location = "/WEB-INF/jsp30/syslogin/interior/loginin.jsp")})
	public String home() {
		try {
			AccountWithBLOBs curAccount = this.getCurLoginAccount();
			String portalSvrHostName = PropertiesUtil.confProperties.getProperty("server.portal.hostname");
			String isUseSSL = PropertiesUtil.confProperties.getProperty("server.portal.usessl");
			String port = null;
			if (StringUtils.isNotBlank(isUseSSL) && isUseSSL.equalsIgnoreCase("no")) {
				port = PropertiesUtil.confProperties.getProperty("server.portal.httpport");
				portalSvrHostName = "http://" + portalSvrHostName;
			}
			else {
				port = PropertiesUtil.confProperties.getProperty("server.portal.sslport");
				portalSvrHostName = "https://" + portalSvrHostName;
			}
			portalSvrHostName += ":" + port;
			request.setAttribute("portalSvrHostName", portalSvrHostName);
			
			if(curAccount.getType().equals(Constants.ACCOUNT_TYPE_MERCHANT_EN)){
				return "MERCHANT";
			} else {
				return SUCCESS;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return ERROR;
		}
	}
	
	/**
	 * 用户退出
	 * @return
	 */
	@Action(value = "logout", results = { @Result(name = SUCCESS, location = "login.htm", type="redirect")})
	public String logout() {
		boolean result=true;
		String returnString=SUCCESS;
		AccountWithBLOBs account = this.getCurLoginAccount();
		try {
			if(account != null){
				accountId = account.getId();
				this.session.removeAttribute(Constants.LOGIN_ACCOUNT_INFO);
				this.session.removeAttribute(Constants.LOGIN_ACCOUNT_PERM);
				this.session.invalidate();
				loadAccountOptLog(accountId, "退出系统","AccountAction.logout", "account", accountService.getClass()
						.getName(), result, "");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
			returnString=ERROR;
			loadAccountOptLog(accountId, "退出系统异常", 
					"AccountAction.logout", "account", 
					accountService.getClass().getName(), result, e.toString());
			
			saveExceptionLog("account", accountService.getClass().toString(), e);
		}
		return returnString;
	}
	
	
	/********************************************* 黑白名单  ***********************************************************/
	
	
	/**
	 * 添加mac地址到设备的黑名单
	 * @return
	 */
	@Action(value = "addMacToBlackList", results = { @Result(name = SUCCESS, type = "json", params = {
			"root", "resultMap" }) })
	public String addMacToBlackList() {
		
		try{
    		if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
    			
    			// 获取参数并校验
    			resultMap = blackAndWhiteListParamValidate(request);
    			
    			if("FAIL".equalsIgnoreCase(resultMap.get("result").toString())) {
    				return SUCCESS;
    			}
    			
//    			jsonToList(request);
    			
    			// 业务处理
    			resultMap = accountService.addMacToBlackList(devIdList, macList,accountId);
    			
    			if(resultMap != null && "OK".equalsIgnoreCase((String) resultMap.get("result"))) {
    				resultMap = this.getResult();
    				
    			}else {
    				returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.addBlacklistFail");
    				resultMap = this.getResult(returnMessage);
    			}
    			
    			return SUCCESS;
    			
    		}else {
    			returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
    			resultMap = this.getResult(returnMessage);
    			return SUCCESS;
    		}
    		
		}catch (Exception e) {
    		e.printStackTrace();
    		saveExceptionLog("account", accountService.getClass().toString(), e);
    		returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
    	}
	}
	
	/**
	 * 从设备的黑名单中删除mac地址
	 * @return
	 */
	@Action(value = "removeMacFromBlackList", results = { @Result(name = SUCCESS, type = "json", params = {
			"root", "resultMap" }) })
	public String removeMacFromBlackList() {
		try{
    		if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
        		
    			// 获取参数并校验
    			resultMap = blackAndWhiteListParamValidate(request);
    			
    			if("FAIL".equalsIgnoreCase(resultMap.get("result").toString())) {
    				return SUCCESS;
    			}
    			
//    			jsonToList(request);
    			
    			// 业务处理
    			resultMap = accountService.removeMacFromBlackList(devIdList, macList, accountId);
    			
    			if(resultMap != null && "OK".equalsIgnoreCase((String) resultMap.get("result"))) {
    				resultMap = this.getResult();
    				
    			}else {
    				returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.removeBlacklistFail");
    				resultMap = this.getResult(returnMessage);
    			}
    			
    			return SUCCESS;
    			
    		}else {
    			returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
    			resultMap = this.getResult(returnMessage);
    			return SUCCESS;
    		}
    		
		}catch (Exception e) {
    		e.printStackTrace();
    		saveExceptionLog("account", accountService.getClass().toString(), e);
    		returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
    	}
	}
	
	/**
	 * 添加mac地址到设备的白名单
	 * @return
	 */
	@Action(value = "addMacToWhiteList", results = { @Result(name = SUCCESS, type = "json", params = {
			"root", "resultMap" }) })
	public String addMacToWhitekList() {
		
		try{
    		if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
        		
    			// 获取参数并校验
    			resultMap = blackAndWhiteListParamValidate(request);
    			
    			if("FAIL".equalsIgnoreCase(resultMap.get("result").toString())) {
    				return SUCCESS;
    			}
    			
//    			jsonToList(request);
    			
    			// 业务处理
    			resultMap = accountService.addMacToWhitekList(devIdList, macList, accountId);
    			
    			if(resultMap != null && "OK".equalsIgnoreCase((String) resultMap.get("result"))) {
    				resultMap = this.getResult();
    				
    			}else {
    				returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.addWhitelistFail");
    				resultMap = this.getResult(returnMessage);
    			}
    			
    			return SUCCESS;
    			
    		}else {
    			returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
    			resultMap = this.getResult(returnMessage);
    			return SUCCESS;
    		}
    		
		}catch (Exception e) {
    		e.printStackTrace();
    		saveExceptionLog("account", accountService.getClass().toString(), e);
    		returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
    	}
	}
	
	/**
	 * 从设备的白名单中删除mac地址
	 * @return
	 */
	@Action(value = "removeMacFromWhiteList", results = { @Result(name = SUCCESS, type = "json", params = {
			"root", "resultMap" }) })
	public String removeMacFromWhitekList() {
		
		try{
    		if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
        		
    			// 获取参数并校验
    			resultMap = blackAndWhiteListParamValidate(request);
    			
    			if("FAIL".equalsIgnoreCase(resultMap.get("result").toString())) {
    				return SUCCESS;
    			}
    			
//    			jsonToList(request);
    			
    			// 业务处理
    			resultMap = accountService.removeMacFromWhitekList(devIdList, macList, accountId);
    			
    			if(resultMap != null && "OK".equalsIgnoreCase((String) resultMap.get("result"))) {
    				resultMap = this.getResult();
    				
    			}else {
    				returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.removeWhitelistFail");
    				resultMap = this.getResult(returnMessage);
    			}
    			
    			return SUCCESS;
    			
    		}else {
    			returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
    			resultMap = this.getResult(returnMessage);
    			return SUCCESS;
    		}
    		
		}catch (Exception e) {
    		e.printStackTrace();
    		saveExceptionLog("account", accountService.getClass().toString(), e);
    		returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
    	}
	}
	
	/**
	 * 黑白名单四个接口的参数校验
	 * @param request
	 * @return
	 * @throws Exception
	 */
	private Map<String, Object> blackAndWhiteListParamValidate(HttpServletRequest request) throws Exception {
		String accountIdString = request.getParameter("account_id");
		String devIdListJson = request.getParameter("dev_id_list");
		String macListJson = request.getParameter("mac_list");
		
		// 获取参数并校验
		ValidateUtil vu = new ValidateUtil();
		vu.add("devIdListJson", devIdListJson, PropertiesUtil.confProperties.getProperty("device.param.devIdListJson"),
				new Rule[]{new Required()});
		vu.add("macListJson", macListJson, PropertiesUtil.confProperties.getProperty("device.param.macListJson"),
				new Rule[]{new Required()});
		String validStr = vu.validateString();
		
		if(validStr != null){
			resultMap = this.getResult(validStr);
			return resultMap;
		}
		
		try{
			devIdList = gson.fromJson(devIdListJson, new TypeToken<List<String>>(){}.getType());
			macList = gson.fromJson(macListJson, new TypeToken<List<String>>(){}.getType());
			
		}catch (IllegalStateException e) {
			e.printStackTrace();
    		saveExceptionLog("account", accountService.getClass().toString(), e);
    		returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalStateException");
    		resultMap = this.getResult(returnMessage);
			return resultMap;
		}
		
		try{
			accountId = Long.parseLong(accountIdString);	
			
		}catch(Exception ex) {
			accountId = null;
		}
		
		
		vu = new ValidateUtil();
		String devId = PropertiesUtil.confProperties.getProperty("device.param.devId");
		String mac = PropertiesUtil.confProperties.getProperty("device.param.mac");
		
		for(int i = 0; i < devIdList.size(); i++)	{
			vu.add("devId" + i, devIdList.get(i), devId, new Rule[]{new Required(), new Length(64)});
		}
		
		for(int i = 0; i < macList.size(); i++)	{
			vu.add("mac" + i, MacUtil.convertMacToTwifiFormat(macList.get(i)), mac, 
					new Rule[]{new Required()});
		}
		
		validStr = vu.validateString();
		
		if(validStr != null){
			resultMap = this.getResult(validStr);
			return resultMap;
		}
		
		resultMap = this.getResult();
		return resultMap;
	}
	
	/**
	 * 设置会员
	 * @return
	 * @throws Exception 
	 */
	@Action(value = "setMember", results = { 
			@Result(name = SUCCESS, type = "json", params = {"root", "resultMap"})})
	public String setMember() throws Exception {
		
		try{
			if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
				String userIdString = request.getParameter("userId");
				String memberIdString = request.getParameter("memberId");
				
				// 获取参数并校验
				ValidateUtil vu = new ValidateUtil();
				vu.add("userId", userIdString, PropertiesUtil.confProperties.getProperty("user.param.userId"),
						new Rule[]{new Required(), new Numeric()});
				vu.add("memberId", memberIdString, PropertiesUtil.confProperties.getProperty("user.param.memberId"),
						new Rule[]{new Required(), new Numeric()});
				String validStr = vu.validateString();
				
				if(validStr != null){
					resultMap = this.getResult(validStr);
					return SUCCESS;
				}
				
				boolean result = accountService.setMember(Long.parseLong(userIdString), Long.parseLong(memberIdString));
				
				if(result) {
					resultMap = this.getResult();
					
				}else {
					resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("account.msg.setMemberFail"));
				}
				
				return SUCCESS;
			}else {
				returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
				resultMap = this.getResult(returnMessage);
				return SUCCESS;
			}
			
		}catch (Exception e) {
    		e.printStackTrace();
    		saveExceptionLog("account", accountService.getClass().toString(), e);
    		returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
    	}
	}
	
	/**
	 * 删除会员
	 * @return
	 * @throws Exception
	 */
	@Action(value = "deleteMember", results = { 
			@Result(name = SUCCESS, type = "json", params = {"root", "resultMap"})})
	public String deleteMember() throws Exception {
		
		try{
			if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
				String userIdString = request.getParameter("userId");
				
				// 获取参数并校验
				ValidateUtil vu = new ValidateUtil();
				vu.add("userId", userIdString, PropertiesUtil.confProperties.getProperty("user.param.userId"),
						new Rule[]{new Required(), new Numeric()});
				String validStr = vu.validateString();
				
				if(validStr != null){
					resultMap = this.getResult(validStr);
					return SUCCESS;
				}
				
				boolean result = accountService.deleteMember(Long.parseLong(userIdString));
				
				if(result) {
					resultMap = this.getResult();
					
				}else {
					resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("account.msg.deleteMemberFail"));
				}
				
				return SUCCESS;
				
			}else {
				returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
				resultMap = this.getResult(returnMessage);
				return SUCCESS;
			}
			
		}catch (Exception e) {
    		e.printStackTrace();
    		saveExceptionLog("account", accountService.getClass().toString(), e);
    		returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
    	}
	}
	
	
	/*************************************************测试用***********************************************************/
	
	/**
	 * 单元测试转换参数用
	 * @param request
	 */
//	private void jsonToList(HttpServletRequest request) {
//		Map<String,List<String>> paramMap = request.getParameterMap();
//		Iterator<Entry<String, List<String>>> iterator = paramMap.entrySet().iterator();
//		String param = "";
//		while(iterator.hasNext()) {
//			Entry<String, List<String>> entry = (Entry<String, List<String>>) iterator.next();
//			param = (String) entry.getKey();
//		}
//		
//		Map<String,List<String>> listMap = new Gson().fromJson(param, new TypeToken<Map<String, List<String>>>(){}.getType());
//		
//		devIdList = listMap.get("dev_id_list");
//		macList = listMap.get("mac_list");
//	}
	
}


