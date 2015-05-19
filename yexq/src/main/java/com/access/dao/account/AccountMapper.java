package com.access.dao.account;

import java.util.List;
import java.util.Map;
import com.access.model.account.Account;
import com.access.model.account.AccountWithBLOBs;

public interface AccountMapper {
    int deleteByPrimaryKey(Long id);

    int insert(AccountWithBLOBs record);

    long insertSelective(AccountWithBLOBs record);

    AccountWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AccountWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(AccountWithBLOBs record);

    int updateByPrimaryKey(Account record);
    
    AccountWithBLOBs selectLoginAccount(Account record);
    
    int updateAccountStatus(AccountWithBLOBs record);
    
    int changePassword(AccountWithBLOBs record);

    int getCountByUsername(Map<String, Object> param);
    
    AccountWithBLOBs getAccountByUsername(String username);
    
    List<AccountWithBLOBs> getAccountListByType(Map<String, Object> param);
    
    AccountWithBLOBs getAccountByDeviceId(String deviceId);
    
    long getAccountIdByDeviceId(Long deviceId);
    
    long updateDirectParentId(Map<String, Object> param);
    
    long updateIndirectParentId(Map<String, Object> param);
    
    long removeDirectParentId(Map<String, Object> param);
    
    long removeIndirectParentId(Map<String, Object> param);
    
    long updateLoginTime(Long accountId);
    
    int updateParentId(AccountWithBLOBs record);
    
    List<AccountWithBLOBs> getTotalSubAccountByAccountId(Long id);
    
    int updateToken(AccountWithBLOBs account);
    
    AccountWithBLOBs getAccountByToken(String changePwdToken);
    
    List<AccountWithBLOBs> getLatestDaysIncsAcct(Long days);
    
    List<AccountWithBLOBs> getOtherDirectAccount(Map<String, Object> param);
    
    List<AccountWithBLOBs> getAccountListByCellNumber(String cellnumber);
    
    int getChildCount(Map<String, Object> param);
    
    long getIdbyFullname(String fullname);
    
    Account ad_getAccountById(Long id);
    
    List<Map<String,Object>> getHotmapList(Map<String,Object> param);
}