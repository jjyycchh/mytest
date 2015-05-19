package com.access.service.user;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
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
import com.access.core.util.DateUtil;
import com.access.core.util.DeviceTaskUtil;
import com.access.core.util.PropertiesUtil;
import com.access.dao.account.AccountHasTerminalUserMapper;
import com.access.dao.system.LocationMapper;
import com.access.dao.user.TerminalUserAuthLogMapper;
import com.access.dao.user.TerminalUserHasDeviceMapper;
import com.access.dao.user.TerminalUserMapper;
import com.access.model.account.AccountHasTerminalUser;
import com.access.model.device.Device;
import com.access.model.system.Location;
import com.access.model.user.TerminalUser;
import com.access.model.user.TerminalUserAuthLog;
import com.access.model.user.TerminalUserHasDevice;
import com.access.service.device.DeviceService;
import com.alipay.util.httpClient.HttpRequest;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Service("userService")
public class UserService extends BaseService {

	@Resource(name = "locationMapper")
	private LocationMapper locationMapper;

	@Resource(name = "terminalUserMapper")
	private TerminalUserMapper terminalUserMapper;

	@Resource(name = "terminalUserAuthLogMapper")
	private TerminalUserAuthLogMapper terminalUserAuthLogMapper;

	@Resource(name = "terminalUserHasDeviceMapper")
	private TerminalUserHasDeviceMapper terminalUserHasDeviceMapper;

	@Resource(name = "accountHasTerminalUserMapper")
	private AccountHasTerminalUserMapper accountHasTerminalUserMapper;
	
	@Resource(name = "deviceService")
	private DeviceService deviceService;

	Logger logger = Logger.getLogger(this.getClass());
	
	/**
	 * 根据authId获取terminalUser对象
	 * @param authId authId
	 * @return
	 */
	public TerminalUser getTerminalUserByAuthId(String authId) {
		TerminalUser terminalUser = null;
		
		if(StringUtils.isNotBlank(authId)) {
			terminalUser = this.terminalUserMapper.getTerminalUserByAuthId(authId);
		}
		
		return terminalUser;
	}

	/**
	 * 创建一个新用户，并创建其TerminalUserHasDevice 和  AccountHasTerminalUser对象
	 * @param authId authId
	 * @param device device对象
	 * @param authType 验证类型
	 * @param mac mac地址
	 * @return
	 */
	public TerminalUser addTerminalUserAndLink(String authId, Device device, String authType, String mac) {

		// 构建一个terminalUser对象
		TerminalUser user = new TerminalUser();
		user.setAuthenticationType(StringUtils.isNotBlank(authType) ? authType: Constants.PORTAL_AUTH_TYPE_MOBILE);
		user.setAuthType(StringUtils.isNotBlank(authType) ? authType : Constants.PORTAL_AUTH_TYPE_MOBILE);
		user.setAuthId(authId);
		user.setStatus(Constants.USER_STATUS_OFFLINE);
		user.setCreateDatetime(new Date());
		
		if (StringUtils.isNotBlank(mac)) {
			user.setMac(mac);
		}
		
		// 保存对象
		this.saveOrUpdateTerminalUser(user);

		// 创建用户-设备关系和商户-用户关系
		if (device != null && StringUtils.isNotBlank(device.getDeviceId())) {
			createTerminalUserDeviceLink(device, user);
			createAccountTerminalUserLink(device, user);
		}

		return user;
	}

	/**
	 * 创建或者更新一条terminalUser记录
	 * @param user
	 * @return
	 */
	public int saveOrUpdateTerminalUser(TerminalUser user) {
		int result = 0;
		
		if (user != null) {
			
			// 更新
			if (user.getId() != null) {
				this.terminalUserMapper.updateByPrimaryKey(user);
				deviceService.sendTerminalUser(user, Constants.OPT_TYPE_UPDATE, Constants.TERMINAL_USER_TBL);
				
			} else {
				// 创建
				this.terminalUserMapper.insertSelective(user);
				deviceService.sendTerminalUser(user, Constants.OPT_TYPE_INSERT, Constants.TERMINAL_USER_TBL);
			}
		}

		return result;
	}

	/**
	 * 创建用户-设备关系
	 * @param device 设备对象
	 * @param user 用户
	 * @return 创建结果 true:创建成功； false:创建失败
	 */
	public boolean createTerminalUserDeviceLink(Device device, TerminalUser user) {
		boolean isUserDeviceLinkExisted = false;
		
		if(device != null && StringUtils.isNotBlank(device.getDeviceId()) && user != null && user.getId() != null) {
			TerminalUserHasDevice terminalUserHasDevice = this.getTerminalUserHasDeviceByUserIdDeviceId(device.getDeviceId(), user.getId());
			
			if(terminalUserHasDevice != null) {
				isUserDeviceLinkExisted = true;
			}
		}

		// 用户-设备关系不存在时创建
		if (!isUserDeviceLinkExisted) {
			TerminalUserHasDevice userDevice = new TerminalUserHasDevice();
			userDevice.setDeviceId(device.getDeviceId());
			userDevice.setTerminalUserId(user.getId());
			userDevice.setStatus(Constants.TERMINALUSER_DEVICE_STATUS_NORMAL);
			this.saveTerminalUserHasDevice(userDevice);
			isUserDeviceLinkExisted = true;
		}
		
		return isUserDeviceLinkExisted;
	}
	
	/**
	 * 创建商户-用户关系
	 * @param device 设备
	 * @param user 用户
	 */
	public boolean createAccountTerminalUserLink(Device device, TerminalUser user) {
		boolean isAccountUserLinkExisted = false;
		
		if(device != null && device.getLocationId() != null && user != null && user.getId() != null) {
			Location location = this.locationMapper.selectByPrimaryKey(device.getLocationId());
			
			if(location != null) {
				if(this.getAccountHasUserByAccountIdAndUserId(location.getAccountId(), user.getId()) != null) {
					isAccountUserLinkExisted = true;
				}
			}
			
			// 商户-用户关系不存在时创建
			if (!isAccountUserLinkExisted) {
				AccountHasTerminalUser accountUser = new AccountHasTerminalUser();
				accountUser.setAccountId(location.getAccountId());
				accountUser.setTerminalUserId(user.getId());
				this.saveAccountHasTerminalUser(accountUser);
				isAccountUserLinkExisted = true;
			}
		}
		
		return isAccountUserLinkExisted;
	}

	/**
	 * 根据设备ID和用户ID获取一个TerminalUserHasDevice对象
	 * @param deviceId 设备ID
	 * @param userId  用户ID
	 * @return
	 */
	public TerminalUserHasDevice getTerminalUserHasDeviceByUserIdDeviceId(String deviceId, Long userId) {
		TerminalUserHasDevice terminalUserHasDevice = null;

		if(StringUtils.isNotBlank(deviceId) && userId != null) {
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("deviceId", deviceId);
			paramMap.put("terminalUserId", userId);
			
			terminalUserHasDevice = terminalUserHasDeviceMapper.selectByUserIdAndDeviceId(paramMap);
		}
		
		return terminalUserHasDevice;
	}
	
	/**
	 * 根据用户ID和商户ID获取一个AccountHasTerminalUser对象
	 * @param accountId
	 * @param userId
	 * @return
	 */
	public AccountHasTerminalUser getAccountHasUserByAccountIdAndUserId(Long accountId, Long userId) {
		AccountHasTerminalUser accountHasTerminalUser = null;

		if( accountId != null && userId != null) {
			Map<String, Long> paramMap = new HashMap<String, Long>();
			paramMap.put("accountId", accountId);
			paramMap.put("userId", userId);
			
			accountHasTerminalUser = accountHasTerminalUserMapper.selectByAccountIdAndUserId(paramMap);
		}
		
		return accountHasTerminalUser;
	}
	
	/**
	 * 判断用户是否在某设备上被锁定
	 * @param device 设备
	 * @param user 用户
	 * @return
	 */
	public boolean isUserBlockedOnDevice(Device device, TerminalUser user) {
		boolean isUserBlockedOnDevice = false;
		
		if(device != null && StringUtils.isNotBlank(device.getDeviceId()) && user != null && user.getId() != null ) {
			TerminalUserHasDevice terminalUserHasDevice = this.getTerminalUserHasDeviceByUserIdDeviceId(device.getDeviceId(), user.getId());
			
			// 用户-设备关系不存在时,创建用户-设备关系和商户-用户关系
			if(terminalUserHasDevice == null) {
				this.createTerminalUserDeviceLink(device, user);
				this.createAccountTerminalUserLink(device, user);
			}
			
			// 用户-设备关系存在时判断是否被锁定
			if(terminalUserHasDevice != null && terminalUserHasDevice.getStatus().equalsIgnoreCase(Constants.TERMINALUSER_DEVICE_STATUS_LOCKED)) {
				isUserBlockedOnDevice = true;
			}
		}
		
		
		return isUserBlockedOnDevice;
	}
	
	/**
	 * 保存TerminalUserHasDevice记录
	 * @param userDevice
	 * @return
	 */
	public int saveTerminalUserHasDevice(TerminalUserHasDevice userDevice) {
		int result = 0;
		if (userDevice != null) {
			this.terminalUserHasDeviceMapper.insertSelective(userDevice);
			deviceService.sendTerminalUserHasDevice(userDevice, Constants.OPT_TYPE_INSERT, Constants.TERMINAL_USER_HAS_DEVICE_TBL);
		}

		return result;
	}

	/**
	 * 根据用户ID获取此用户的所有设备ID
	 * 
	 * @param userId
	 * @return
	 */
	public List<String> getDeviceIdsByUserId(Long userId) {
		List<String> deviceIdList = null;

		if (userId != null) {
			List<TerminalUserHasDevice> terminalUserHasDeviceList = this.terminalUserHasDeviceMapper.getRecordsByUserId(userId);

			if (terminalUserHasDeviceList != null && terminalUserHasDeviceList.size() > 0) {
				deviceIdList = new ArrayList<String>();
				
				for (TerminalUserHasDevice record : terminalUserHasDeviceList) {
					deviceIdList.add(record.getDeviceId());
				}
			}
		}

		return deviceIdList;
	}

	public int saveAccountHasTerminalUser(AccountHasTerminalUser accountUser) {
		int result = 0;
		
		if (accountUser != null) {
			this.accountHasTerminalUserMapper.insertSelective(accountUser);
			deviceService.sendAccountHasTerminalUser(accountUser, Constants.OPT_TYPE_INSERT, Constants.ACCOUNT_HAS_TERMINAL_USER_TBL);
		}

		return result;
	}

	public List<Long> getAccountIdsByUserId(Long userId) {
		List<Long> accountIds = null;

		if (userId != null) {
			List<AccountHasTerminalUser> records = this.accountHasTerminalUserMapper.getRecordsByUserId(userId);

			if (records != null && records.size() > 0) {
				for (AccountHasTerminalUser record : records) {
					if (accountIds == null) {
						accountIds = new ArrayList<Long>();
					}

					accountIds.add(record.getAccountId());
				}
			}
		}

		return accountIds;
	}

	/**
	 * 添加验证记录
	 * @param device 设备
	 * @param user 用户
	 * @param status 在线状态
	 * @return
	 */
	public TerminalUserAuthLog saveAuthLog(Device device, TerminalUser user,String status, String authType) {
		
		// 构建一条验证记录
		TerminalUserAuthLog authLog = new TerminalUserAuthLog();
		authLog.setTerminalUserId(user.getId());
		authLog.setAuthType(authType);
		authLog.setLogContent("");
		authLog.setDeviceId(device.getDeviceId());

		if (StringUtils.isNotBlank(status)&& (status.equalsIgnoreCase(Constants.USER_STATUS_OFFLINE) || status.equalsIgnoreCase(Constants.USER_STATUS_ONLINE))) {
			authLog.setStatus(status);
			
		} else {
			authLog.setStatus(Constants.USER_STATUS_OFFLINE);
		}

		// 保存验证记录
		this.terminalUserAuthLogMapper.insertSelective(authLog);
		deviceService.sendTerminalUserAuthLog(authLog, Constants.OPT_TYPE_INSERT, Constants.TERMINAL_USER_AUTHENTICATION_LOG_TBL);

		return authLog;
	}
	
/*	public TerminalUserAuthLog SaveAuthLog(Device device, TerminalUser user, String status, String authType) {
		TerminalUserAuthLog authLog = new TerminalUserAuthLog();
		authLog.setTerminalUserId(user.getId());
		authLog.setAuthType(authType);
		authLog.setLogContent("");
		authLog.setDeviceId(device.getDeviceId());

        if (StringUtils.isNotBlank(status)&& (status.equalsIgnoreCase(Constants.USER_STATUS_OFFLINE)|| status.equalsIgnoreCase(Constants.USER_STATUS_ONLINE))) {
            authLog.setStatus(status);
        }else {
            authLog.setStatus(Constants.USER_STATUS_OFFLINE);
        }

		this.saveTerminalUserAuthLog(authLog);
		
		return authLog;
	}*/

	/**
	 * 更新或者新增一条验证记录
	 * @param authLog 验证记录
	 * @return
	 */
	public int saveOrUpdateTerminalUserAuthLog(TerminalUserAuthLog authLog) {
		int result = 0;
		
		if (authLog != null) {
			if (authLog.getId() != null) {
				this.terminalUserAuthLogMapper.updateByPrimaryKeySelective(authLog);
				deviceService.sendTerminalUserAuthLog(authLog, Constants.OPT_TYPE_UPDATE, Constants.TERMINAL_USER_AUTHENTICATION_LOG_TBL);
				
			} else {
				this.terminalUserAuthLogMapper.insertSelective(authLog);
				deviceService.sendTerminalUserAuthLog(authLog, Constants.OPT_TYPE_INSERT, Constants.TERMINAL_USER_AUTHENTICATION_LOG_TBL);
			}
		}

		return result;
	}

	/**
	 * 根据authType和mac地址获取用户记录 
	 * @param mac mac地址
	 * @param authType 验证类型
	 * @return
	 */
	public TerminalUser getTerminalUserByMap(String mac, String authType) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("mac", mac);
		paramMap.put("authType", authType);

		return terminalUserMapper.getTerminalUserByMap(paramMap);
	}

	/**
	 * 根据userId获取一个用户，但是加入了验证码有效期内
	 * @param userId
	 * @return
	 */
	public TerminalUserAuthLog getLatestUserAuthLogsByUserId(Long userId) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("userId", userId);
		String strLatestDays = PropertiesUtil.confProperties.getProperty("user.auth.auchcode.expireDays");
		
		if (StringUtils.isNotBlank(strLatestDays)) {
			param.put("expireDays", Integer.parseInt("-" + strLatestDays));
		}

		return this.terminalUserAuthLogMapper.getLatestUserAuthLogsByUserId(param);
	}

	/**
	 * 获取终端用户的验证日志，有效期内，7天
	 * 
	 * @param authId
	 * @param terMac 终端MAC地址
	 * @param authType
	 * @return
	 */
	public TerminalUserAuthLog getLastAuthLogByMap(String authId,String terMac, String authType) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("mac", terMac);
		paramMap.put("authType", authType);
		
		if (StringUtils.isNotBlank(authId)) {
			paramMap.put("authId", authId);
		}
		String strLatestDays = PropertiesUtil.confProperties.getProperty("user.auth.auchcode.expireDays");
		
		if (StringUtils.isNotBlank(strLatestDays)) {
			paramMap.put("expireDays", Integer.parseInt("-" + strLatestDays));
		}

		return terminalUserAuthLogMapper.getLastAuthLogByMap(paramMap);
	}

	/**
	 * 用户信息写入到redis中。
	 * 
	 * @param device
	 * @param user
	 * @param authLog
	 * @param accountId
	 * @param token
	 * @return
	 */
	public Map<String, Object> saveUserInfo(Device device, TerminalUser user,
			TerminalUserAuthLog authLog, Long accountId, String token) {
		// memdb 写入 user info with token and etc.
		/*
		 * {'db_id':xx *(authLogId), 'token':xx *, 'user_id':xx *(auth_id),
		 * 'ip':xx, 'mac':xx, 'incoming':xx, 'outgoing':xx, 'login_time':xx *,
		 * 'logout_time':xx, 'update_time':xx * 'dev_id':xx *, 'account_id':xx
		 * *, 'expired_time':xx *, 'max_traffic':xx *}
		 */

		Map<String, Object> userInfo = new HashMap<String, Object>();
		userInfo.put("db_id", authLog.getId());
		userInfo.put("token", token);
		userInfo.put("user_db_id", user.getId());
		userInfo.put("user_id", user.getAuthId());
		String strLoginDate = DateUtil.formatToString(authLog == null|| authLog.getCreateDatetime() == null 
				? new Date(): authLog.getCreateDatetime(),DateUtil.YYYY_MM_DD_HH_MM);
		userInfo.put("login_time", strLoginDate);
		userInfo.put("update_time", strLoginDate);
		userInfo.put("dev_id", device.getDeviceId());
		userInfo.put("account_id", accountId);
		userInfo.put("terminal_type", "");
		userInfo.put("browser_type", "");

		// 设置到期时间
		Integer minLimit = null;
		
		if (device.getMinsLimit() != null && device.getMinsLimit() > 0) {
			minLimit = device.getMinsLimit();
			
		} else {
			String expiration = PropertiesUtil.confProperties.getProperty("user.auth.expireMinutes.default");
			Long durationMins = Long.parseLong(expiration);
			minLimit = durationMins.intValue();
		}

		if (minLimit != null) {
			Date expiredTime = new Date();
			Calendar c = Calendar.getInstance();
			c.setTime(expiredTime);
			c.add(Calendar.MINUTE, minLimit.intValue());
			expiredTime = c.getTime();
			userInfo.put("expired_time", DateUtil.formatToString(expiredTime,DateUtil.YYYY_MM_DD_HH_MM));
		}

		
		// 设置连接数？
		Integer trafficLimit = null;
		
		if (device.getTrafficLimit() != null && device.getTrafficLimit() > 0) {
			trafficLimit = device.getTrafficLimit();
			
		} else {
			String maxTraffic = PropertiesUtil.confProperties.getProperty("user.auth.traffic.default");
			Float fltTrafficLmt = Float.parseFloat(maxTraffic);
			trafficLimit = fltTrafficLmt.intValue();
		}

		if (trafficLimit != null) {
			userInfo.put("max_traffic", trafficLimit);
		}

		try {
			DeviceTaskUtil.userInfoPush(token, new Gson().toJson(userInfo));
//			Map<String, Object> newUserInfo = DeviceTaskUtil.getUserInfo(token);

		} catch (Exception e) {
			this.saveExceptionLog("user", this.getClass().toString(), null, e,"");
		}

		return userInfo;
	}

	/**
	 * 保存用户验证日志
	 * @param authLog
	 * @return
	 */
	public int saveTerminalUserAuthLog(TerminalUserAuthLog authLog) {
		int result = 0;
		
		if (authLog != null) {
			if (authLog.getId() != null) {
				this.terminalUserAuthLogMapper.updateByPrimaryKeySelective(authLog);
				deviceService.sendTerminalUserAuthLog(authLog, Constants.OPT_TYPE_UPDATE, Constants.TERMINAL_USER_AUTHENTICATION_LOG_TBL);
				
			}else {
				this.terminalUserAuthLogMapper.insertSelective(authLog);
				deviceService.sendTerminalUserAuthLog(authLog, Constants.OPT_TYPE_INSERT, Constants.TERMINAL_USER_AUTHENTICATION_LOG_TBL);
			}
		}
		
		return result;
	}
	
	/**
	 * 根据ID获取用户对象
	 * @param userId
	 * @return
	 */
	public TerminalUser getTerminalUserById(Long userId){
		return this.terminalUserMapper.selectByPrimaryKey(userId);
	}
	
	/**
	 * 根据account，location，device，terminalUserHasDevice，terminalUser等几张表的关系获取一个用户
	 * @param accountId
	 * @param authId
	 * @param authType
	 * @param mac
	 * @return
	 * @throws Exception 
	 */
	public TerminalUser getTerminalUser(Long accountId, String authId, String authType, String mac) throws Exception {
		// 获取中心平台请求路径
		String getTerminalUserUrl = 
                PropertiesUtil.confProperties.getProperty("applicationCentel") +
                PropertiesUtil.confProperties.getProperty("applicationCentel.getTerminalUser");
		
		// 设置请求参数
		Map<String, String> requestParam = new HashMap<String, String>();
		if(accountId != null) {
			requestParam.put("accountId", accountId+"");
		}
		
		if(StringUtils.isNotBlank(authId)) {
			requestParam.put("authId", authId);
		}
		
		requestParam.put("authType", authType);
		
		if(StringUtils.isNotBlank(mac)) {
			requestParam.put("mac", mac);
		}
		
		logger.debug("应用中心获取用户" + getTerminalUserUrl + "----参数： " + requestParam.toString());
		
		// 发送post请求并接受返回结果
		InputStream inputStream = HttpRequest.sendPostRequest(getTerminalUserUrl, requestParam);
		String returnMessage = "";
		
		// 判断返回结果
        if(inputStream == null){
        	this.saveExecptionLog("device", this.getClass().toString(), 
        			PropertiesUtil.confProperties.getProperty("device.msg.getTerminalUserFail"));
            throw new Exception();
             
        }else{
        	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
        }
        logger.debug("应用中心获取用户返回：" + returnMessage);
        Map<String, Object> resultMap = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
         
        TerminalUser terminalUser = null;
        
        if("OK".equalsIgnoreCase((String) resultMap.get("result"))) {
        	terminalUser = gson.fromJson((String) resultMap.get("user"), new TypeToken<TerminalUser>(){}.getType());
        	
        }else {
        	this.saveExecptionLog("device", this.getClass().toString(), 
        			PropertiesUtil.confProperties.getProperty("device.msg.getTerminalUserFail"));
        	throw new Exception();
        }
        
        return terminalUser;
	}
	
	/**
	 * 获取用户最后一次的验证记录
	 * @param mac
	 * @param authType
	 * @return
	 */
	public TerminalUserAuthLog getLastAuthLogByMap(String mac, String authType){
    	return this.getLastAuthLogByMap(null, mac, authType);
    }
	
	/**
	 * 根据设备id和用户token修改用户在线状态
	 * @param status
	 * @param deviceId
	 * @param token
	 * @return
	 */
	public int updateUserStatus(String status, String deviceId, String token){
		//1.查询用户id
		TerminalUserAuthLog authLog = this.getAuthLogByToken(deviceId, token);
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		//2.修改用户认证日志的在线状态
		paramMap.put("status", status);
		paramMap.put("authLogId", authLog.getId());
		terminalUserAuthLogMapper.updateAuthLogStatus(paramMap);
		
		// 数据同步
		authLog.setStatus(status);
		authLog.setOfflineDatetime(new Date());
		deviceService.sendTerminalUserAuthLog(authLog, Constants.OPT_TYPE_INSERT, Constants.TERMINAL_USER_AUTHENTICATION_LOG_TBL);
		
		//3.修改用户状态
		TerminalUser user = new TerminalUser();
		user.setId(authLog.getTerminalUserId());
		if(status.equalsIgnoreCase(Constants.TERMINALUSER_AUTH_LOG_STATUS_ONLINE)){
			user.setStatus(Constants.TERMINALUSER_STATUS_ONLINE);
		} else if(status.equalsIgnoreCase(Constants.TERMINALUSER_AUTH_LOG_STATUS_OFFLINE)) {
			user.setStatus(Constants.TERMINALUSER_STATUS_OFFLINE);
		}
		terminalUserMapper.updateUserStatus(user);
		deviceService.sendTerminalUser(user, Constants.OPT_TYPE_UPDATE, Constants.TERMINAL_USER_TBL);
		
		return 0;
	}
	
	/**
	 * 根据deviceId 和 token查询TerminalUserAuthLog.
	 * @param deviceId
	 * @param token
	 * @return
	 */
	public TerminalUserAuthLog getAuthLogByToken(String deviceId, String token){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("deviceId", deviceId);
		paramMap.put("token", token);
		return terminalUserAuthLogMapper.getAuthLogByToken(paramMap);
	}
	
	public static void main(String[] args) {
		String s = null;
		System.out.println(s+"");
	}
}
