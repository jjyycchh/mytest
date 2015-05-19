package com.access.dao.system;

import com.access.model.system.ThirdPlatform;

public interface ThirdPlatformMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ThirdPlatform record);

    int insertSelective(ThirdPlatform record);

    ThirdPlatform selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ThirdPlatform record);

    int updateByPrimaryKey(ThirdPlatform record);
    
    ThirdPlatform selectURLByCode(String platformCode);
    
    ThirdPlatform selectByDomain(String domain);
}