package com.access.dao.user;

import java.util.Map;

import com.access.model.user.UserBlacklist;

public interface UserBlacklistMapper {
	int insertSelective(UserBlacklist record);
	
	int updateByDeviceId(UserBlacklist record);
	
	UserBlacklist selectByDeviceId(String deviceId);
	
	UserBlacklist selectByDeviceIdAndMac(Map<String, String> paramMap);
}