package com.access.dao.authentication;

import java.util.Map;

import com.access.model.authentication.MerchantHasThirdApplication;
import com.access.model.authentication.MerchantHasThirdApplicationKey;

public interface MerchantHasThirdApplicationMapper {
    int deleteByPrimaryKey(MerchantHasThirdApplicationKey key);

    int insert(MerchantHasThirdApplication record);

    int insertSelective(MerchantHasThirdApplication record);

    MerchantHasThirdApplication selectByPrimaryKey(MerchantHasThirdApplicationKey key);

    int updateByPrimaryKeySelective(MerchantHasThirdApplication record);

    int updateByPrimaryKey(MerchantHasThirdApplication record);

    int delMerchantThirdApplication(Map<String, Object> paramMap);
    
    MerchantHasThirdApplication getMerchantHasThirdApplicationByIds(MerchantHasThirdApplication record);
    
    int updateStatusByIds(MerchantHasThirdApplication record);
}