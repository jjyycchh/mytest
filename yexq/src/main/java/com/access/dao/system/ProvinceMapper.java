package com.access.dao.system;

import com.access.model.system.Province;

public interface ProvinceMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Province record);

    int insertSelective(Province record);

    Province selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Province record);

    int updateByPrimaryKey(Province record);
    
    Province selectIdByProvince(String province);
}