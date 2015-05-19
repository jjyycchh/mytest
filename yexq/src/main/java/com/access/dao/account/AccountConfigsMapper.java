package com.access.dao.account;

import java.util.List;
import java.util.Map;
import com.access.model.account.AccountConfigs;

public interface AccountConfigsMapper {
    int deleteByPrimaryKey(Long id);

    int insert(AccountConfigs record);

    int insertSelective(AccountConfigs record);

    AccountConfigs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AccountConfigs record);

    int updateByPrimaryKey(AccountConfigs record);
    
    AccountConfigs getAccountConfigsByKey(Map<String, Object> paramMap);

    int updateValueById(AccountConfigs record);
    
    int updateValueByKey(AccountConfigs record);

    List<AccountConfigs> getAccountConfigsMap(Long accountId);
    
    int saveOnDuplicate(AccountConfigs record);

    List<AccountConfigs> getAccountConfigsByKeyValue(Map<String, String> param);
    
    AccountConfigs getAccountConfigsByAccountId(AccountConfigs record);
}