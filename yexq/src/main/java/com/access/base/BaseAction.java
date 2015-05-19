package com.access.base;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;

import com.access.core.commons.Page;
import com.access.core.constant.Constants;
import com.access.core.util.DateUtil;
import com.access.core.util.JsonUtil;
import com.access.core.util.PropertiesUtil;
import com.access.core.util.SmsSendUtil;
import com.access.core.util.StringUtil;
import com.access.core.util.ValidateUtil;
import com.access.core.util.rules.Length;
import com.access.core.util.rules.Regex;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;
import com.access.dao.account.AccountOptLogMapper;
import com.access.dao.system.ExceptionLogMapper;
import com.access.model.account.AccountOptLogWithBLOBs;
import com.access.model.account.AccountWithBLOBs;
import com.access.model.account.Permission;
import com.access.model.device.Device;
import com.access.model.system.ExceptionLogWithBLOBs;
import com.access.model.user.TerminalUserAuthLog;
import com.access.service.account.AccountService;
import com.access.service.device.DeviceService;
import com.access.service.system.SystemService;
import com.alipay.util.httpClient.HttpRequest;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
@Results({@Result(name = "error", type = "json", params = {"root", "resultMap" }),
@Result(name = "errorpage", location="/WEB-INF/jsp${jspversion}/error.jsp")
})
public class BaseAction extends ActionSupport implements ServletRequestAware,ServletResponseAware,SessionAware {
	private static final long serialVersionUID = -4417628200145005068L;
	Logger logger = Logger.getLogger(this.getClass());
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	protected Map<String, Object> sessionMap;
	protected HttpSession session;
	
	protected File image;  
	protected String uploadImageType;  //上传文件的类型  
	protected String uploadImageName;  // 上传文件的文件名  
	protected String jspversion;
	
	/**
	 * Ajax请求header中的标识名和值
	 */
	private static String AJAX_REQUEST_HEADER_NAME = "x-requested-with";
	private static String AJAX_REQUEST_HEADER_VALUE = "XMLHttpRequest";
	
	@Resource(name="accountService")
	private AccountService accountService;
	
	public File getImage() {
		return image;
	}
	public void setImage(File image) {
		this.image = image;
	}
	public String getUploadImageType() {
		return uploadImageType;
	}
	public void setUploadImageType(String uploadImageType) {
		this.uploadImageType = uploadImageType;
	}
	public String getUploadImageName() {
		return uploadImageName;
	}
	public void setUploadImageName(String uploadImageName) {
		this.uploadImageName = uploadImageName;
	}
	public String getJspversion() {
		return jspversion;
	}
	public void setJspversion(String jspversion) {
		this.jspversion = jspversion;
	}
	
	//返回json数据的map
	protected Map<String, Object> resultMap;
	public Map<String, Object> getResultMap() {
		return resultMap;
    }
	
	//分页数据
	protected Integer pageNo;
	protected Integer pageSize;
	protected String gettotal;
	
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public void setGettotal(String gettotal) {
		this.gettotal = gettotal;
	}
	public Page getPage(){
		if(pageNo == null) {
			pageNo = 1;
		}
		
		if(pageSize==null){
			return new Page(pageNo);
		}else{
			return new Page(pageNo,pageSize);
		}
	}
	
	public void setPageInfo(Page page) throws Exception{
		resultMap.put("pageNo", page.getPageNo());
		resultMap.put("pageSize", page.getPageSize());
		resultMap.put("totalRecord", page.getTotalRecord());
		resultMap.put("totalPage", page.getTotalPage());
		if(page.getRecords() != null){
			resultMap.put("totalResult", page.getRecords().size());
			resultMap.put("records", JsonUtil.listToJson(page.getRecords()));
		}
	}
	
	public Gson gson = new Gson();
	public String returnMessage = StringUtils.EMPTY;
	
	/**
	 * action 请求结果
	 */
	public boolean result = false;
	
	/*********************************************************/
	public void setServletRequest(HttpServletRequest request) {   
		this.request = request;
		try {
			String jv = PropertiesUtil.get("project.jsp.version");
			if(StringUtils.isBlank(jv)){
				jv = "";
			}
			this.jspversion = jv;
		} catch (Exception e) {
			// TODO: handle exception
		}
		
	}

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	public void setSession(Map<String, Object> sessionMap) {
		this.sessionMap = sessionMap;
		this.session = this.request.getSession();
	}

	@Resource(name="accountOptLogMapper")
	private AccountOptLogMapper accountOptLogMapper;
	@Resource(name="systemService")
	protected SystemService systemService;
	@Resource(name="deviceService")
	protected DeviceService deviceService;
	@Resource(name="exceptionLogMapper")
	protected ExceptionLogMapper exceptionLogMapper;
	public String execute() {    
		ActionContext.getContext().getSession().put("msg", "Hello World from Session!");
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();        
		HttpSession session = request.getSession();
		return SUCCESS;
	}

	public String getURLWithContextPath() {
		   return this.request.getScheme() + "://" + this.request.getServerName() + ":" + this.request.getServerPort() + this.request.getContextPath();
	}
	
	/**
	 * 当前登录帐户
	 * @return
	 */
	public AccountWithBLOBs getCurLoginAccount(){
		return (AccountWithBLOBs) this.session.getAttribute(Constants.LOGIN_ACCOUNT_INFO);
	}
	
	/**
	 * 当前登录帐户的权限
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Permission> getCurPerms(){
		return  (List<Permission>) this.session.getAttribute(Constants.LOGIN_ACCOUNT_PERM);
	}

    public void refreshSessionAcctInfo(AccountWithBLOBs searchResult, List<Permission> permList) {
        String[] permissions = new String[permList.size()];
        for(int i=0; i<permList.size(); i++){
            permissions[i] = permList.get(i).getPermCode();
        }
        searchResult.setPermissions(permissions);
        this.session.setAttribute(Constants.LOGIN_ACCOUNT_INFO,
                searchResult);
        this.session.setAttribute(Constants.LOGIN_ACCOUNT_PERM,
                permList);
    }

	/**
	 * 记录帐户的操作日志
	 * @param accountId 操作人Id
	 * @param description 操作描述
	 * @param serviceName service层名字
	 * @param result 操作是否成功
	 * @param message 操作返回的信息
	 */
	public void loadAccountOptLog(Long accountId, String description, 
			String actionFunc, String moduleName, String serviceName, 
			boolean result, String message){
		AccountOptLogWithBLOBs optLog = new AccountOptLogWithBLOBs();
		optLog.setAccountId(accountId);
		optLog.setDescription(description);
		optLog.setSourceIp(getClientIpAddr(request));
		optLog.setSourcePort(String.valueOf(request.getRemotePort()));
//		optLog.setActionFunc(Thread.currentThread().getStackTrace()[1].getMethodName());
//		optLog.setModuleName(this.getClass().toString());
		optLog.setActionFunc(actionFunc);
		optLog.setModuleName(moduleName);
		optLog.setServiceName(serviceName);
        String parameter = StringUtils.EMPTY;
        if (request.getMethod().equalsIgnoreCase(HttpRequest.METHOD_GET)) {
            parameter = request.getQueryString();
        } else {
            Map<String, Object> parameterMap = request.getParameterMap();
            if (parameterMap != null) {
                parameter = new Gson().toJson(parameterMap);
            }
        }
		optLog.setParameter(parameter);
		optLog.setResult(result);
		optLog.setReturnMessage(message);
		accountOptLogMapper.insertSelective(optLog);
	}
	
	/**
	 * 记录异常日志
	 * @param moduleName
	 * @param serviceName
	 * @param sysErrorMssage
	 */
	public void saveExceptionLog(String moduleName, String serviceName, /*Map paramMap,*/ Exception e){
		try {
			ExceptionLogWithBLOBs log = new ExceptionLogWithBLOBs();
			log.setModuleName(moduleName);
			log.setServiceName(serviceName);
			Map<String, Object> param = new HashMap<String, Object>();
	        AccountWithBLOBs optAccount = this.getCurLoginAccount();
	        param.put("optAccountId", optAccount == null ? "" : optAccount.getId().toString());
			param.put("parameter", this.request.getParameterMap());
			param.put("method", this.request.getMethod());
			param.put("protocol", this.request.getProtocol());
			param.put("cookies", this.request.getCookies());
			param.put("url", this.request.getHeader("referer"));

			log.setParameter(gson.toJson(param));
			log.setSysErrorMssage(e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
			
			exceptionLogMapper.insertSelective(log);
			
			//send email to administrator
			String subject = "IP: "+InetAddress.getLocalHost().getHostAddress()+", DATE: "+ DateUtil.getNow()+", ExceptionLogId: "+log.getId();
			String emailContent = subject + "\n"
					+ gson.toJson(param) + "\n" 
					+ StringUtil.getExceptionStackTrace(e);
//			
//			systemService.saveEmailNotice(PropertiesUtil.confProperties.getProperty("emailNotice.sender.mail"), 
//					PropertiesUtil.confProperties.getProperty("emailNotice.receiver.mail"),
//					null, null, subject, emailContent, Long.parseLong("1"));
		} catch (Exception e2) {
			e2.printStackTrace();
		}
		
	}
	
	/**
	 * 获取客户端ip
	 * @param request
	 * @return
	 */
	public String getClientIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		ip = request.getHeader("Proxy-Client-IP");
		}
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		ip = request.getRemoteAddr();
		}
		return ip;
	}
	
	public static void main(String[] args) {
//		UUID.randomUUID();
//		System.out.println("abcdefghijk".indexOf("sbcd"));
		
		String a = "{\"directParentIds\": [\"aaa\",\"bbb\",\"ccc\"], \"totalParentIds\": [\"ddd\",\"eee\",\"fff\"]}";
		
		List<String> directParentIds = AccountWithBLOBs.getDirectParentIds(a);
		List<String> totalParentIds = AccountWithBLOBs.getTotalParentIds(a);
		
//		Map<String,List<String>> parentIds = parentIdMap.get("parentIds");
//		List<String> directParentIds = parentIds.get("directParentIds");
//		List<String> totalParentIds = parentIds.get("totalParentIds");
		for(String s : totalParentIds){
			System.out.println(s);
		}
	}
	
	/**
	 * 校验商户字段
	 * @param account
	 * @return
	 * @throws Exception 
	 */
	public String fullAccountValidation(AccountWithBLOBs account) throws Exception{
		if(account == null){
			return "数据提交错误";
			
		}else {
			ValidateUtil vu = new ValidateUtil();
			vu.add("userName", account.getUsername(), "用户名", new Rule[]{new Length(1,50)});
			vu.add("password", account.getPassword(), "密码", new Rule[]{new Length(6,20)});
			vu.add("email", account.getEmail(), "邮箱", new Rule[]{new Required(), new Regex(Constants.EMAIL_PATTERN)});
			vu.add("cellNumber", account.getCellNumber(), "手机号码", new Rule[]{new Regex(Constants.CELLPHONE_PATTERN)});
			vu.add("geoLocation", account.getGeoLevel(), "省市区地址", new Rule[]{new Required()});
			return vu.validateString();
		}
	}
	
	protected boolean hasMerchantPermission() {
		AccountWithBLOBs loginAccount = this.getCurLoginAccount();
		boolean hasPermission = false;
		if (java.util.Arrays.asList(loginAccount.getPermissions()).contains(Constants.PERMISSION_MERCHANT_MGMT_EN)) {
			hasPermission = true;
		}
		return hasPermission;
	}
	
	protected boolean hasPortalPermission() {
		AccountWithBLOBs loginAccount = this.getCurLoginAccount();
		boolean hasPermission = false;

		if(loginAccount.getType().equalsIgnoreCase(Constants.ACCOUNT_TYPE_SUPER_MAN_EN)){
			hasPermission = true;
		}
		
		if (java.util.Arrays.asList(loginAccount.getPermissions()).contains(Constants.PERMISSION_PORTAL_MGMT_EN)) {
			hasPermission = true;
		}
		return hasPermission;
	}
	
	/**
	 * 是否拥有"用户管理"的权限
	 * @return
	 */
	public boolean hasUserManagePerm(){
		AccountWithBLOBs loginAccount = this.getCurLoginAccount();
		boolean hasPermission = false;
		if (java.util.Arrays.asList(loginAccount.getPermissions()).contains(Constants.PERMISSION_USER_MGMT_EN)) {
			hasPermission = true;
		}
		return hasPermission;
	}

    /**
     * 发送短信验证码
     * @param authId 手机号或者唯一标识
     * @param deviceId 设备ID
     * @param authCode 验证码
     * @param authLogId 可空
     * @return
     * @throws Exception
     */
    protected String sendCodeBySms(String authId, String deviceId, String authCode, Long authLogId) throws Exception {
    	// 获取商户名
    	Long accountId = deviceService.getAccountIdByDeviceId(deviceId);
    	AccountWithBLOBs account = accountService.getAccountById(accountId);
    	
    	String merchantName = null;
    	
    	if(account != null){
    		merchantName = StringUtils.isNotBlank(account.getMerchantName()) ? account.getMerchantName() : account.getUsername();
    	}
		
		merchantName = StringUtils.isBlank(merchantName) ? PropertiesUtil.confProperties.getProperty("message.merchantName") : merchantName;
		
		// 获取消息内容模板
		String contentTemplate = new String(PropertiesUtil.confProperties.getProperty("message.content"));
		
		// 转变为具体的信息内容
		String content = String.format(contentTemplate, authCode);
		
		// 获取短信网关
		String smsGW = this.systemService.getSmsGW(authId);
		
		// 发送短信
		String smsSendingRetMsg = SmsSendUtil.sendSms(authId, content, smsGW);
		
		// 保存短信
		this.systemService.saveSms(authId, content, authLogId);
		
		logger.debug("============================ authCode: " + authCode);
		return content + " " + smsSendingRetMsg;
	}
    

    protected String SendAuthCodeBySmsInEn(String authId, Device device, String authCode, TerminalUserAuthLog authLog) throws IOException {
		String contentTemplate = new String(PropertiesUtil.confProperties.getProperty("message.content.en"));
        //AccountWithBLOBs merchant = deviceService.getAccountByDeviceId(device.getDeviceId());
		//String merchantName = org.apache.commons.lang3.StringUtils.isNotBlank(merchant.getMerchantName()) ? merchant.getMerchantName() : merchant.getUsername();
		String content = String.format(contentTemplate, authCode);

		String smsGW = this.systemService.getSmsGW(authId);
		String smsSendingRetMsg = SmsSendUtil.sendSms(authId, content, smsGW);

		this.systemService.saveSms(authId, content, authLog.getId());
		System.out.println("=============================================");
		System.out.println("authCode: " + authCode);
		System.out.println("=============================================");

		return content + " " + smsSendingRetMsg;
    }

    
    protected String SendAuthCodeBySms(String authId, Device device,String authCode, TerminalUserAuthLog authLog) throws Exception {
//		AccountWithBLOBs merchant = deviceService.getAccountByDeviceId(device.getDeviceId());
		Long accountId = deviceService.getAccountIdByDeviceId(device.getDeviceId());
    	AccountWithBLOBs merchant = accountService.getAccountById(accountId);
    	
    	String merchantName = StringUtils.EMPTY;
    	if(merchant != null) {
    		merchantName = StringUtils.isNotBlank(merchant.getMerchantName()) ? merchant.getMerchantName() : merchant.getUsername();
    	}
		return this.sendCodeBySmsOld(authId, authCode, merchantName, authLog.getId());
	}
    
    protected String sendCodeBySmsOld(String authId, String authCode, String merchantName, Long authLogId) throws IOException {
		String contentTemplate = new String(PropertiesUtil.confProperties.getProperty("message.content"));
		merchantName = StringUtils.isBlank(merchantName) ? 
				PropertiesUtil.confProperties.getProperty("message.merchantName") : merchantName;
		String content = String.format(contentTemplate, authCode);
		
		String smsGW = this.systemService.getSmsGW(authId);
		String smsSendingRetMsg = SmsSendUtil.sendSms(authId, content, smsGW);
		
		this.systemService.saveSms(authId, content, authLogId);
		logger.debug("============================ authCode: " + authCode);
		return content + " " + smsSendingRetMsg;
	}
    
//    protected String SendAccountBindingCodeBySms(String phoneNumber, Long bindingAccount, String verificationCode) throws IOException  {
//        String contentTemplate = new String(PropertiesUtil.confProperties.getProperty("message.phone_bind.content.cn"));
//        String content = String.format(contentTemplate, verificationCode);
//
//		String smsGW = this.systemService.getSmsGW(phoneNumber);
//		String smsSendingRetMsg = SmsSendUtil.sendSms(phoneNumber, content, smsGW);
//
//        this.systemService.saveSms(phoneNumber, content, Constants.SMS_SOURCE_TYPE_PHONE_BIND, null, bindingAccount);
//		System.out.println("=============================================");
//		System.out.println("verificationCode: " + verificationCode);
//		System.out.println("=============================================");
//
//        return content + " " + smsSendingRetMsg;
//    }

    /**
	 * 是否ajax请求
	 * @param request
	 * @return
	 */
    protected boolean isAjaxRequest(HttpServletRequest request) {
		String val = request.getHeader(AJAX_REQUEST_HEADER_NAME);
		val = val == null ? "" : val.toLowerCase();
		return AJAX_REQUEST_HEADER_VALUE.toLowerCase().equals(val);
	}
    
    protected Map<String, Object> getResult(String message, String result){
        Map<String, Object> rltMap = new HashMap<String, Object>();
        rltMap.put("message", message);
        rltMap.put("result", result);
    	return rltMap;
    }
    
    protected Map<String, Object> getResult(String message){
        Map<String, Object> rltMap = new HashMap<String, Object>();
        rltMap.put("message", message);
        rltMap.put("result", "FAIL");
    	return rltMap;
    }
    
    protected Map<String, Object> getResult(){
    	Map<String, Object> rltMap = new HashMap<String, Object>();
        rltMap.put("result", "OK");
    	return rltMap;
    }
}
