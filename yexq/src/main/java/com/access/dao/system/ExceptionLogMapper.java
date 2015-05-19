package com.access.dao.system;

import java.util.List;
import java.util.Map;

import com.access.model.account.AccountConfigs;
import com.access.model.system.ExceptionLog;
import com.access.model.system.ExceptionLogWithBLOBs;

public interface ExceptionLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ExceptionLogWithBLOBs record);

    int insertSelective(ExceptionLogWithBLOBs record);

    ExceptionLogWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ExceptionLogWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(ExceptionLogWithBLOBs record);

    int updateByPrimaryKey(ExceptionLog record);
    
    int getExceptionLogCount(Map<String, Object> param);
    
    List<ExceptionLogWithBLOBs> exportExceptionLog(Map<String, Object> param);
}