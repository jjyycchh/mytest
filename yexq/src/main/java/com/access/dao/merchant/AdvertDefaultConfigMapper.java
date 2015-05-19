package com.access.dao.merchant;

import com.access.model.merchant.AdvertDefaultConfig;
import com.access.model.merchant.AdvertMerchantConfigWithBLOBs;

public interface AdvertDefaultConfigMapper {
    int deleteByPrimaryKey(Long id);

    int insert(AdvertDefaultConfig record);

    int insertSelective(AdvertDefaultConfig record);

    AdvertDefaultConfig selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AdvertDefaultConfig record);

    int updateByPrimaryKeyWithBLOBs(AdvertDefaultConfig record);

    int updateByPrimaryKey(AdvertDefaultConfig record);

}