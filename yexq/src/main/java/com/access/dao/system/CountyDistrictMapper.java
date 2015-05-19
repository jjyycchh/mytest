package com.access.dao.system;

import java.util.Map;

import com.access.model.system.CountyDistrict;

public interface CountyDistrictMapper {
    int deleteByPrimaryKey(Long id);

    int insert(CountyDistrict record);

    int insertSelective(CountyDistrict record);

    CountyDistrict selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(CountyDistrict record);

    int updateByPrimaryKey(CountyDistrict record);
    
    Map<String, Object> selectCountyByName(Map<String, Object> paramMap);
}