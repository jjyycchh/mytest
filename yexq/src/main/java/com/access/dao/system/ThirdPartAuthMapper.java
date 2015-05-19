package com.access.dao.system;

import java.util.List;

import com.access.model.system.ThirdPartAuth;

public interface ThirdPartAuthMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ThirdPartAuth record);

    int insertSelective(ThirdPartAuth record);

    ThirdPartAuth selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ThirdPartAuth record);

    int updateByPrimaryKey(ThirdPartAuth record);
    
    List<ThirdPartAuth> getAll();
    
    ThirdPartAuth selectByDeviceId(String deviceId);
}