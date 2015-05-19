package com.access.dao.authentication;

import java.util.Map;

import com.access.model.authentication.ThirdApplication;

public interface ThirdApplicationMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ThirdApplication record);

    int insertSelective(ThirdApplication record);

    ThirdApplication selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ThirdApplication record);

    int updateByPrimaryKey(ThirdApplication record);
    
    ThirdApplication getThirdApplicationByName(Map<String, Object> paramMap);
    
    ThirdApplication getThirdApplicationByAppId(String appId);
}