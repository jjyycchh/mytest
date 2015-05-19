package com.access.dao.account;

import java.util.List;

import com.access.model.account.Permission;

public interface PermissionMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Permission record);

    int insertSelective(Permission record);

    Permission selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Permission record);

    int updateByPrimaryKeyWithBLOBs(Permission record);

    int updateByPrimaryKey(Permission record);
    
    List<Permission> getListByPermCode(String[] permCodeArr);
    
    List<Permission> getPermListByAccountId(Long accountId);
}