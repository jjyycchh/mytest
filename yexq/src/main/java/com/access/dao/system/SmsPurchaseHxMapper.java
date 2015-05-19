package com.access.dao.system;

import com.access.model.system.SmsPurchaseHx;

public interface SmsPurchaseHxMapper {
    int deleteByPrimaryKey(Long id);

    int insert(SmsPurchaseHx record);

    int insertSelective(SmsPurchaseHx record);

    SmsPurchaseHx selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SmsPurchaseHx record);

    int updateByPrimaryKey(SmsPurchaseHx record);
    
    SmsPurchaseHx selectByOutsideTradeId(String outsideTradeId);
}