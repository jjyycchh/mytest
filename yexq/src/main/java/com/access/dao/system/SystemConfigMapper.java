package com.access.dao.system;

import java.util.List;

import com.access.model.system.SystemConfig;

public interface SystemConfigMapper {
    int deleteByPrimaryKey(Long id);

    int insert(SystemConfig record);

    long insertSelective(SystemConfig record);

    SystemConfig selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SystemConfig record);

    int updateByPrimaryKey(SystemConfig record);
    
    List<SystemConfig> getAllSystemConfigs(Long nothing);
    
    SystemConfig selectByConfigKey(String configKey);
}