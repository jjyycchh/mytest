package com.access.dao.authentication;

import java.util.List;
import java.util.Map;

import com.access.model.authentication.ThirdApplicationType;

public interface ThirdApplicationTypeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ThirdApplicationType record);

    int insertSelective(ThirdApplicationType record);

    ThirdApplicationType selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ThirdApplicationType record);

    int updateByPrimaryKey(ThirdApplicationType record);

    //查找第三方应用所有类型
    List<Map<String,Object>> getThirdApplicationType();

    //第三方应用是否存在ByType
    int getThirdApplicationTypeByType(String type);
    
    //第三方应用是否存在ByID
    int getThirdApplicationTypeByID(Long id);
}