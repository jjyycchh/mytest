package com.access.dao.system;

import java.util.Map;

import com.access.model.system.SystemData;

public interface SystemDataMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SystemData record);

    int insertSelective(SystemData record);

    SystemData selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SystemData record);

    int updateByPrimaryKey(SystemData record);
    
    SystemData getDataByTypeAndValue(SystemData record);
    
    int getAuthServerCount(Map<String,Object> paramMap);
}