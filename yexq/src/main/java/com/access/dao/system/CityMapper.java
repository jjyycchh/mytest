package com.access.dao.system;

import java.util.Map;

import com.access.model.system.City;

public interface CityMapper {
    int deleteByPrimaryKey(Long id);

    int insert(City record);

    int insertSelective(City record);

    City selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(City record);

    int updateByPrimaryKey(City record);
    
    Map<String, Object> selectIdByCity(Map<String, Object> paramMap);
}