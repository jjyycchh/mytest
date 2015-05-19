package com.access.dao.authentication;

import com.access.model.authentication.RequestLog;
import com.access.model.authentication.RequestLogWithBLOBs;

public interface RequestLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(RequestLogWithBLOBs record);

    int insertSelective(RequestLogWithBLOBs record);

    RequestLogWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(RequestLogWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(RequestLogWithBLOBs record);

    int updateByPrimaryKey(RequestLog record);
}