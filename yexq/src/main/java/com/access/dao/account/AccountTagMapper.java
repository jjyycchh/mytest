package com.access.dao.account;

import java.util.List;

import com.access.model.account.AccountTag;

public interface AccountTagMapper {
    int deleteByPrimaryKey(Long id);

    int insert(AccountTag record);

    int insertSelective(AccountTag record);

    AccountTag selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AccountTag record);

    int updateByPrimaryKey(AccountTag record);
    
    List<AccountTag> selectByAccountId(Long accountId);
    
    AccountTag selectByTagName(String tagName);
}