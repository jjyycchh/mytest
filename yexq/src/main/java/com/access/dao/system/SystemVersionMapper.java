package com.access.dao.system;

import com.access.model.system.SystemVersion;

public interface SystemVersionMapper {
    int insert(SystemVersion record);

    int insertSelective(SystemVersion record);
    
    String getLatestVersion();
}