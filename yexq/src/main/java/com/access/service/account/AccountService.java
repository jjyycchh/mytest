package com.access.service.account;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.access.base.BaseService;
import com.access.core.constant.Constants;
import com.access.core.util.PropertiesUtil;
import com.access.dao.user.TerminalUserMapper;
import com.access.dao.user.UserBlacklistMapper;
import com.access.dao.user.UserWhitelistMapper;
import com.access.model.account.AccountWithBLOBs;
import com.access.model.device.DeviceWithBLOBs;
import com.access.model.user.TerminalUser;
import com.access.model.user.UserBlacklist;
import com.access.model.user.UserWhitelist;
import com.access.service.device.DeviceService;
import com.alipay.util.httpClient.HttpRequest;
import com.google.gson.reflect.TypeToken;

@Service("accountService")
public class AccountService extends BaseService {
	
	@Resource(name="userBlacklistMapper")
	private UserBlacklistMapper userBlacklistMapper;

	@Resource(name="userWhitelistMapper")
	private UserWhitelistMapper userWhitelistMapper;
	
	@Resource(name="terminalUserMapper")
	private TerminalUserMapper terminalUserMapper;
	
	@Resource(name="deviceService")
	private DeviceService deviceService;
	
	Logger logger = Logger.getLogger(this.getClass());
	
	/***********************************************以下是黑白名单******************************************************/
	
	/**
	 * 添加mac到设备的黑名单
	 * @param devIdList 设备ID列表
	 * @param macList 	mac地址列表
	 * @return
	 * @throws Exception 
	 */
	public Map<String, Object>  addMacToBlackList(List<String> devIdList, List<String> macList, Long accountId) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String macs = gson.toJson(macList);
		Date date = new Date();
		
		if(devIdList != null && devIdList.size() > 0 && macList != null && macList.size() > 0) {
			UserBlacklist blackList = null;
			UserWhitelist whitelist = null;
			String deviceId = "";
			boolean deviceIsExist = false;
			
			// 更新本系统数据
			for(int i = 0; i< devIdList.size(); i++) {
				
				// 根据deviceId获取黑白名单记录
				deviceId = devIdList.get(i);
				deviceIsExist = this.isExistDevice(deviceId);
				
				// 设备不存在时返回
				if(!deviceIsExist) {
					resultMap = this.getResult(PropertiesUtil.get("device.msg.deviceValidateFail"));
					return resultMap;
				}
				
				blackList = userBlacklistMapper.selectByDeviceId(deviceId);
				whitelist = userWhitelistMapper.selectByDeviceId(deviceId);
				
				// mac在白名单存在时，从白名单中删除
				if(whitelist != null) {
					
					// 获取数据库中白名单的macList
					List<String> macListInDB = gson.fromJson(whitelist.getMacs(), new TypeToken<List<String>>(){}.getType());
					
					// 参数中的mac与数据库中白名单的macList对比，存在时删除
					if(macListInDB != null && macListInDB.size() > 0) {
						for(String mac : macList) {
							if(macListInDB.contains(mac)){
								macListInDB.remove(mac);
							}
						}
					}
					
					// 更新白名单
					whitelist.setMacs(gson.toJson(macListInDB));
					userWhitelistMapper.updateByDeviceId(whitelist);
//					deviceService.sendUserWhitelist(whitelist, Constants.OPT_TYPE_UPDATE, Constants.USER_WHITELIST);
					
				}
				
				// 黑名单存在时更新
				if(blackList != null) {
					
					// 获取数据库中的macList
					List<String> macListInDB = gson.fromJson(blackList.getMacs(), new TypeToken<List<String>>(){}.getType());
					
					// 参数中的mac与数据库中黑名单的macList对比，不存在时添加
					if(macListInDB != null && macListInDB.size() > 0) {
						for(String mac : macList) {
							if(!macListInDB.contains(mac)){
								macListInDB.add(mac);
							}
						}
						blackList.setMacs(gson.toJson(macListInDB));
						
					}else {
						blackList.setMacs(macs);
					}
					
					// 更新黑名单
					userBlacklistMapper.updateByDeviceId(blackList);
//					deviceService.sendUserBlacklist(blackList, Constants.OPT_TYPE_UPDATE, Constants.USER_BLACKLIST);
					
				// 黑名单不存在时保存
				}else {
					blackList = new UserBlacklist();
					blackList.setDeviceId(deviceId);
					blackList.setMacs(macs);
					blackList.setCreateDatetime(date);
					
					userBlacklistMapper.insertSelective(blackList);
//					deviceService.sendUserBlacklist(blackList, Constants.OPT_TYPE_INSERT, Constants.USER_BLACKLIST);
				}
			}
			
			// 向网管平台发送白名单记录，同步数据
			resultMap = this.sendWhitelistToEms();
			
		}
		
		return resultMap;
	}
	
	/**
	 * 从设备的黑名单中移除mac地址
	 * @param devIdList 设备ID列表
	 * @param macList 	mac地址列表
	 * @return
	 */
	public Map<String, Object> removeMacFromBlackList(List<String> devIdList, List<String> macList, Long accountId) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		if(devIdList != null && devIdList.size() > 0 && macList != null && macList.size() > 0) {
			UserBlacklist blackList = null;
			String macJson = null;
			
			for(int i = 0; i< devIdList.size(); i++) {
				String deviceId = devIdList.get(i);
				blackList = userBlacklistMapper.selectByDeviceId(deviceId);
				
				if(blackList != null) {
					macJson = blackList.getMacs();
					
					// 获取数据库中的macList
					List<String> macListInDB = gson.fromJson(macJson, new TypeToken<List<String>>(){}.getType());
					
					// 参数中的mac与数据库中的macList对比，存在时删除
					if(macListInDB != null && macListInDB.size() > 0) {
						for(String mac : macList) {
							if(macListInDB.contains(mac)){
								macListInDB.remove(mac);
							}
						}
					}
					
					// 更新黑名单
					blackList.setMacs(gson.toJson(macListInDB));
					userBlacklistMapper.updateByDeviceId(blackList);
					
				}
				
//				deviceService.sendUserBlacklist(blackList, Constants.OPT_TYPE_UPDATE, Constants.USER_BLACKLIST);
			}
			resultMap = this.getResult();
			
		}
			
		return resultMap;
	}
	
	/**
	 * 添加mac到设备的白名单
	 * @param devIdList 设备ID列表
	 * @param macList 	mac地址列表
	 * @return
	 * @throws Exception 
	 */
	public Map<String, Object> addMacToWhitekList(List<String> devIdList, List<String> macList, Long accountId) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String macs = gson.toJson(macList);
		Date date = new Date();
		
		if(devIdList != null && devIdList.size() > 0  && macList != null && macList.size() > 0) {
			UserBlacklist blackList = null;
			UserWhitelist whitelist = null;
			String deviceId = "";
			boolean deviceIsExist = false;
			
			// 更新本系统数据
			for(int i = 0; i< devIdList.size(); i++) {
				
				// 根据deviceId获取黑白名单记录
				deviceId = devIdList.get(i);
				deviceIsExist = this.isExistDevice(deviceId);
				
				// 设备不存在时返回
				if(!deviceIsExist) {
					resultMap = this.getResult(PropertiesUtil.get("device.msg.deviceValidateFail"));
					return resultMap;
				}
				
				blackList = userBlacklistMapper.selectByDeviceId(deviceId);
				whitelist = userWhitelistMapper.selectByDeviceId(deviceId);
				
				// mac地址在黑名单存在时，从黑名单中删除
				if(blackList != null) {
					
					// 获取数据库中黑名单的macList
					List<String> macListInDB = gson.fromJson(blackList.getMacs(), new TypeToken<List<String>>(){}.getType());
					
					// 参数中的mac与数据库中的macList对比，存在时删除
					if(macListInDB != null && macListInDB.size() > 0) {
						for(String mac : macList) {
							if(macListInDB.contains(mac)){
								macListInDB.remove(mac);
							}
						}
					}
					
					// 更新黑名单
					blackList.setMacs(gson.toJson(macListInDB));
					userBlacklistMapper.updateByDeviceId(blackList);
//					deviceService.sendUserBlacklist(blackList, Constants.OPT_TYPE_UPDATE, Constants.USER_BLACKLIST);
				}
				
				// 白名单存在时更新
				if(whitelist != null) {
					
					// 获取数据库中白名单的macList
					List<String> macListInDB = gson.fromJson(whitelist.getMacs(), new TypeToken<List<String>>(){}.getType());
					
					// 参数中的mac与数据库中白名单的macList对比，不存在时添加
					if(macListInDB != null && macListInDB.size() > 0) {
						for(String mac : macList) {
							if(!macListInDB.contains(mac)){
								macListInDB.add(mac);
							}
						}
						whitelist.setMacs(gson.toJson(macListInDB));
						
					}else {
						whitelist.setMacs(macs);
					}
					
					// 更新白名单
					userWhitelistMapper.updateByDeviceId(whitelist);
//					deviceService.sendUserWhitelist(whitelist, Constants.OPT_TYPE_UPDATE, Constants.USER_WHITELIST);
					
				// 白名单不存在时保存
				}else {
					whitelist = new UserWhitelist();
					whitelist.setDeviceId(deviceId);
					whitelist.setMacs(macs);
					whitelist.setCreateDatetime(date);
					
					userWhitelistMapper.insertSelective(whitelist);
//					deviceService.sendUserWhitelist(whitelist, Constants.OPT_TYPE_INSERT, Constants.USER_WHITELIST);
				}
			}
			
			// 向网管平台发送白名单记录，同步数据
			resultMap = this.sendWhitelistToEms();
			
		}
		
		return resultMap;
	}
	
	/**
	 * 从设备的白名单中移除mac地址
	 * @param devIdList 设备ID列表
	 * @param macList 	mac地址列表
	 * @return
	 * @throws Exception 
	 */
	public Map<String, Object> removeMacFromWhitekList(List<String> devIdList, List<String> macList, Long accountId) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		if(devIdList != null && devIdList.size() > 0 && macList != null && macList.size() > 0) {
			UserWhitelist whitelist = null;
			String macJson = null;
			
			for(int i = 0; i< devIdList.size(); i++) {
				String deviceId = devIdList.get(i);
				whitelist = userWhitelistMapper.selectByDeviceId(deviceId);
				
				if(whitelist != null) {
					macJson = whitelist.getMacs();
					
					// 获取数据库中的macList
					List<String> macListInDB = gson.fromJson(macJson, new TypeToken<List<String>>(){}.getType());
					
					// 参数中的mac与数据库中的macList对比，存在时删除
					if(macListInDB != null && macListInDB.size() > 0) {
						for(String mac : macList) {
							if(macListInDB.contains(mac)){
								macListInDB.remove(mac);
							}
						}
					}
					
					// 更新白名单
					whitelist.setMacs(gson.toJson(macListInDB));
					userWhitelistMapper.updateByDeviceId(whitelist);
				
				}
				
//				deviceService.sendUserWhitelist(whitelist, Constants.OPT_TYPE_UPDATE, Constants.USER_WHITELIST);
			}
			
			// 获取所有白名单记录，发往网管平台（ems)
			resultMap = this.sendWhitelistToEms();
		}
		
		return resultMap;
	}
	
	/**
	 * 根据设备ID获取设备，判断设备是否存在
	 * @param deviceId
	 * @return
	 */
	private boolean isExistDevice(String deviceId) {
		boolean isExist = false;
		
		if(StringUtils.isNotBlank(deviceId)) {
			DeviceWithBLOBs device = deviceService.getDeviceById(deviceId);
			if(device != null) {
				isExist = true;
			}
		}
		
		return isExist;
	}
	
	/**
	 * 获取所有白名单记录，发往网管平台（ems)
	 * @throws Exception
	 */
	private Map<String, Object> sendWhitelistToEms() throws Exception{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 获取所有的白名单记录
		List<UserWhitelist> whiteListList = userWhitelistMapper.selectAll();
		Map<String, Object> devIdAndMacMap = null;
		List<String> devIdList = null;
		
		if(whiteListList != null && whiteListList.size() > 0) {
			devIdAndMacMap = new HashMap<String, Object>();
			devIdList = new ArrayList<String>();
			
			// 设置参数macs的值
			for(int i = 0; i < whiteListList.size(); i++) {
//				devIdAndMacMap.put(URLEncoder.encode(whiteListList.get(i).getDeviceId(), "UTF-8"),
//						URLEncoder.encode(whiteListList.get(i).getMacs(), "UTF-8"));
				
				devIdAndMacMap.put(whiteListList.get(i).getDeviceId(), gson.fromJson(whiteListList.get(i).getMacs(), new TypeToken<List<String>>(){}.getType()));
				devIdList.add(whiteListList.get(i).getDeviceId());
			}
			
			// 获取网管平台请求路径
			String whitelistUrl = 
                    PropertiesUtil.confProperties.getProperty("device.emsapi.serverAddr") +
                    PropertiesUtil.confProperties.getProperty("device.emsapi.emsRegisterBasUrl");
			
//			String whitelistUrl = 
//                    PropertiesUtil.confProperties.getProperty("device.emsapi.serverAddrTest") +
//                    PropertiesUtil.confProperties.getProperty("device.emsapi.emsRegisterBasUrl");
			
			// 设置请求参数
			Map<String, String> requestParam = new HashMap<String, String>();
			requestParam.put("type", Constants.AP_DEVICE_ACTION_TYPE_SIX);
			requestParam.put("devIds", gson.toJson(devIdList));
			requestParam.put("macs", gson.toJson(devIdAndMacMap));
			
			logger.debug("网管平台下发白名单" + whitelistUrl + "----参数： " + requestParam.toString());
			
			// 发送post请求并接受返回结果
			InputStream inputStream = HttpRequest.sendPostRequest(whitelistUrl, requestParam);
			String returnMessage = "";
			
			// 判断返回结果
	        if(inputStream == null){
	        	returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.whitelistFail");
	            resultMap = this.getResult(returnMessage);
	            return resultMap;
	             
	        }else{
	        	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
	        }
	        logger.debug("网管平台下发白名单返回：" + returnMessage);
			
	        resultMap = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
	         
	        if("OK".equalsIgnoreCase((String) resultMap.get("result"))) {
	        	resultMap = this.getResult();
	        }
	         
		}else {
			resultMap = this.getResult();
		}
		
		return resultMap;
	}

	/**
	 * 判断mac是否在黑名单
	 * @param deviceId
	 * @param mac
	 * @return
	 */
	public boolean isInBlacklist(String deviceId, String mac) {
		UserBlacklist blackList = userBlacklistMapper.selectByDeviceId(deviceId);
		
		if(blackList == null) {
			return false;
			
		}else {
			List<String> macList = gson.fromJson(blackList.getMacs(), new TypeToken<List<String>>(){}.getType());
			
			if(macList != null && macList.size() > 0) {
				for(String macInDb : macList) {
					if(mac.equalsIgnoreCase(macInDb)) {
						return true;
					}
				}
				
			}else {
				return false;
			}
		}
		return true;
	}
	
	/***********************************************以上是黑白名单******************************************************/
	
	
	
	/***********************************************以下是account相关***************************************************/
	 
	/**
     * 根据accountId请求中心平台返回account信息
     * @param accountId
     * @return
     * @throws UnsupportedEncodingException
     * @throws IOException
     */
    public AccountWithBLOBs getAccountById(Long accountId) throws UnsupportedEncodingException, IOException {
    	
    	if(accountId == null) {
    		return null;
    	}
    	
    	// 获取中心平台请求路径
		String whitelistUrl = 
                PropertiesUtil.confProperties.getProperty("applicationCentel") +
                PropertiesUtil.confProperties.getProperty("applicationCentel.getAccountById");
		
		// 设置请求参数
		Map<String, String> requestParam = new HashMap<String, String>();
		requestParam.put("account_id", accountId+"");
		
		logger.debug("应用中心根据ID获取商户" + whitelistUrl + "----参数： " + requestParam.toString());
		
		// 发送post请求并接受返回结果
		InputStream inputStream = HttpRequest.sendPostRequest(whitelistUrl, requestParam);
		String returnMessage = "";
		
		// 判断返回结果
        if(inputStream == null){
            return null;
            
        }else{
        	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
        }
		
        logger.debug("应用中心根据ID获取商户返回：" + returnMessage);
        
        Map<String, Object> requestResult = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
        
        if("OK".equalsIgnoreCase((String) requestResult.get("result"))){
        	return gson.fromJson((String) requestResult.get("account"), new TypeToken<AccountWithBLOBs>(){}.getType());
        	
        }else {
        	return null;
        }
    }
    
    /**
     * 根据手机号获取商户列表
     * @param cellNumber
     * @return
     * @throws Exception 
     */
    public List<AccountWithBLOBs> getAccountListByCellNumber(String cellNumber) throws Exception {
    	List<AccountWithBLOBs> accountList = null;
    	// 获取中心平台请求路径
    			String whitelistUrl = 
    	                PropertiesUtil.confProperties.getProperty("applicationCentel") +
    	                PropertiesUtil.confProperties.getProperty("applicationCentel.getAccountByCellNumber");
    			
    			// 设置请求参数
    			Map<String, String> requestParam = new HashMap<String, String>();
    			requestParam.put("cellNumber", cellNumber);
    			
    			logger.debug("应用中心根据手机号获取商户" + whitelistUrl + "----参数： " + requestParam.toString());
    			
    			// 发送post请求并接受返回结果
    			InputStream inputStream = HttpRequest.sendPostRequest(whitelistUrl, requestParam);
    			String returnMessage = "";
    			
    			// 判断返回结果
    	        if(inputStream == null){
    	        	System.out.println("请求中心平台根据手机号获取用户信息失败******************************");
    	        	this.saveExecptionLog("account", this.getClass().toString(), PropertiesUtil.confProperties.getProperty("account.msg.getAccountByCellNumberFail"));
    	            throw new Exception();
    	            
    	        }else{
    	        	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
    	        }
    	        logger.debug("应用中心根据手机号获取商户返回：" + returnMessage);
    	        
    	        Map<String, Object> requestResult = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
    	        
    	        if("OK".equalsIgnoreCase((String) requestResult.get("result"))){
    	        	accountList = gson.fromJson((String) requestResult.get("account"), new TypeToken<List<AccountWithBLOBs>>(){}.getType());
    	        	return accountList;
    	        	
    	        }else {
    	        	throw new Exception();
    	        }
    }
    
    /**
     * 根据username请求中心平台返回account信息
     * @param username
     * @return
     * @throws Exception 
     */
    public AccountWithBLOBs getAccountByUsername(String username) throws Exception {
    	
    	if(StringUtils.isBlank(username)) {
    		return null;
    	}
    	
    	// 获取中心平台请求路径
		String whitelistUrl = 
                PropertiesUtil.confProperties.getProperty("applicationCentel") +
                PropertiesUtil.confProperties.getProperty("applicationCentel.getAccountByUsername");
		
		// 设置请求参数
		Map<String, String> requestParam = new HashMap<String, String>();
		requestParam.put("user_name", username);
		
		logger.debug("应用中心根据用户名获取商户" + whitelistUrl + "----参数： " + requestParam.toString());
		
		// 发送post请求并接受返回结果
		InputStream inputStream = HttpRequest.sendPostRequest(whitelistUrl, requestParam);
		String returnMessage = "";
		
		// 判断返回结果
        if(inputStream == null){
        	System.out.println("请求中心平台根据用户名获取用户信息失败******************************");
        	this.saveExecptionLog("account", this.getClass().toString(), PropertiesUtil.confProperties.getProperty("account.msg.getAccountByUsernameFail"));
            throw new Exception();
            
        }else{
        	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
        }
		
        logger.debug("应用中心根据用户名获取商户返回：" + returnMessage);
        Map<String, Object> requestResult = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
        
        if("OK".equalsIgnoreCase((String) requestResult.get("result"))){
        	return gson.fromJson((String) requestResult.get("account"), new TypeToken<AccountWithBLOBs>(){}.getType());
        	
        }else {
        	// TODO 应不应该这样做
        	throw new Exception();
        }
    }
    
    /**
     * 根据deviceId请求中心平台返回accountId
     * @param deviceId
     * @return
     * @throws IOException
     */
    public InputStream getAccountByDeviceId(String deviceId) throws IOException {
    	InputStream inputStream = null;
    	
    	if(deviceId == null) {
    		return null;
    	}
    	
    	// 获取中心平台请求路径
		String getAccountIdByDeviceIdUrl = 
                PropertiesUtil.confProperties.getProperty("applicationCentel") +
                PropertiesUtil.confProperties.getProperty("applicationCentel.getAccountByDeviceId");
		
		// 设置请求参数
		Map<String, String> requestParam = new HashMap<String, String>();
		requestParam.put("deviceId", deviceId);
		
		logger.debug("应用中心根据deviceId获取商户ID：" + getAccountIdByDeviceIdUrl + "----参数： " + requestParam.toString());
		
		// 发送post请求并接受返回结果
		inputStream = HttpRequest.sendPostRequest(getAccountIdByDeviceIdUrl, requestParam);
        
        return inputStream;
    }
    
    /**
     * 向中心平台请求添加商户
     * @param account
     * @param recommendNumber
     * @throws IOException 
     */
    public InputStream addAccount(AccountWithBLOBs account, String recommendNumber) throws IOException {
    	InputStream inputStream = null;
    	
    	if(account == null) {
    		return null;
    	}
    	
    	// 获取中心平台请求路径
		String whitelistUrl = 
                PropertiesUtil.confProperties.getProperty("applicationCentel") +
                PropertiesUtil.confProperties.getProperty("applicationCentel.addAccount");
		
		// 设置请求参数
		Map<String, String> requestParam = new HashMap<String, String>();
		requestParam.put("account", gson.toJson(account));
		requestParam.put("recommendNumber", recommendNumber);
		
		logger.debug("应用中心添加商户" + whitelistUrl + "----参数： " + requestParam.toString());
		
		// 发送post请求并接受返回结果
		inputStream = HttpRequest.sendPostRequest(whitelistUrl, requestParam);
        
        return inputStream;
    }
    
    /**
     * 设置会员
     * @param userId
     * @param memberId
     * @return
     */
    public boolean setMember(Long userId, Long memberId) {
    	boolean result = false;
    	TerminalUser user = terminalUserMapper.selectByPrimaryKey(userId);
    	
    	if(user != null) {
    		user.setMembershipId(memberId);
    		terminalUserMapper.updateByPrimaryKey(user);
    		result = true;
    	}
    	
    	return result;
    }
    
    /**
     * 删除会员
     * @param userId
     * @return
     */
    public boolean deleteMember(Long userId) {
    	boolean result = false;
    	TerminalUser user = terminalUserMapper.selectByPrimaryKey(userId);
    	
    	if(user != null) {
    		user.setMembershipId(null);
    		terminalUserMapper.updateByPrimaryKey(user);
    		result = true;
    	}
    	
    	return result;
    } 

}
