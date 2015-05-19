package com.access.dao.account;

import java.util.List;
import java.util.Map;

import com.access.core.commons.Page;
import com.access.model.account.AccountOptLog;
import com.access.model.account.AccountOptLogWithBLOBs;

public interface AccountOptLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(AccountOptLogWithBLOBs record);

    int insertSelective(AccountOptLogWithBLOBs record);

    AccountOptLogWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AccountOptLogWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(AccountOptLogWithBLOBs record);

    int updateByPrimaryKey(AccountOptLog record);
    
    List<AccountOptLogWithBLOBs> findAccountOptLogPage(Page<AccountOptLogWithBLOBs> page);
    
    List<Map<String, Object>> findLatestShortcutsAccess(Map<String, Object> param);
}