package com.access.dao.user;

import java.util.List;
import java.util.Map;

import com.access.model.user.UserWhitelist;

public interface UserWhitelistMapper {
	int insertSelective(UserWhitelist record);
	
	int updateByDeviceId(UserWhitelist record);
	
	UserWhitelist selectByDeviceId(String deviceId);
	
	UserWhitelist selectByDeviceIdAndMac(Map<String, String> paramMap);
	
	List<UserWhitelist>  selectAll();
}