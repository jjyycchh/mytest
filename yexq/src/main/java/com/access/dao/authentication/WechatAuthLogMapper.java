package com.access.dao.authentication;

import java.util.Map;

import com.access.model.authentication.WechatAuthLog;

public interface WechatAuthLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(WechatAuthLog record);

    int insertSelective(WechatAuthLog record);

    WechatAuthLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(WechatAuthLog record);

    int updateByPrimaryKey(WechatAuthLog record);
    
    WechatAuthLog getWechatAuthLogByWechatUser(Map<String, Object> param);
}