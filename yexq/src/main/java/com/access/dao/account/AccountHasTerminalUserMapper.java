package com.access.dao.account;

import java.util.List;
import java.util.Map;

import com.access.model.account.AccountHasTerminalUser;

public interface AccountHasTerminalUserMapper {
    int insert(AccountHasTerminalUser record);

    int insertSelective(AccountHasTerminalUser record);
    
    int insertNotExist(AccountHasTerminalUser record);

    int selectAccountUser(AccountHasTerminalUser record);

    int updateAccountUser(AccountHasTerminalUser record);
    
    String getUserMemo(Map<String,Long> paramMap);
    
    List<AccountHasTerminalUser> getRecordsByUserId(Long userId);
    
    /**
     * 根据用户ID和商户ID获取一条记录
     * @param paramMap
     * @return
     */
    AccountHasTerminalUser selectByAccountIdAndUserId(Map<String, Long> paramMap);
}