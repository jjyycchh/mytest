package com.access.dao.account;

import com.access.model.account.PermissionHasAccount;

public interface PermissionHasAccountMapper {
    int insert(PermissionHasAccount record);

    int insertSelective(PermissionHasAccount record);
    
    void updateForeignKeyChecks(Integer status);
    
    int deleteByAccountId(Long accountId);
}