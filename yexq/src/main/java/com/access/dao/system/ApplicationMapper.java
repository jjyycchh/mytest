package com.access.dao.system;

import java.util.Map;

import com.access.model.system.Application;

public interface ApplicationMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Application record);

    int insertSelective(Application record);

    Application selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Application record);

    int updateByPrimaryKey(Application record);
    
    int updateIsPublishedByPlatform(String platform);
    
    int updateIsPublishedById(Long id);
    
    Application selectByPlatformVersion(Map<String, Object> paramMap);
    
    String selectVersionByPlatform(String platform);
    
    String getPathByPlatform(String platform);
    
    int updateDownloadCount(String platform);
}