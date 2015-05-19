package com.access.dao.merchant;

import com.access.model.merchant.AdvertMerchantConfig;
import com.access.model.merchant.AdvertMerchantConfigWithBLOBs;

public interface AdvertMerchantConfigMapper {
    int deleteByPrimaryKey(Long id);

    int insert(AdvertMerchantConfigWithBLOBs record);

    int insertSelective(AdvertMerchantConfigWithBLOBs record);

    AdvertMerchantConfigWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AdvertMerchantConfigWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(AdvertMerchantConfigWithBLOBs record);

    int updateByPrimaryKey(AdvertMerchantConfig record);

    //超级管理员根据deviceId取得商户
    String selectAccountByDeviceId(String deviceId);

    //通过accountId查找脚本
    AdvertMerchantConfigWithBLOBs selectByAccountId(Long accountId);

    //添加商户广告js
    int insertAdvertJs(AdvertMerchantConfigWithBLOBs record);

    //更新商户广告js
    int updateAdvertJsByAccountId(AdvertMerchantConfigWithBLOBs record);
}