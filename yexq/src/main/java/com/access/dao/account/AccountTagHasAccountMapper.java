package com.access.dao.account;

import com.access.model.account.AccountTagHasAccount;

public interface AccountTagHasAccountMapper {
    int insert(AccountTagHasAccount record);

    int insertSelective(AccountTagHasAccount record);
    
    int deleteByAccountId(Long accountId);
}