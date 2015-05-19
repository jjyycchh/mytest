package com.access.dao.user;

import java.util.List;
import java.util.Map;

import com.access.model.user.TerminalUserAuthLog;
import com.access.model.user.TerminalUserRequestLog;

public interface TerminalUserRequestLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TerminalUserRequestLog record);

    int insertSelective(TerminalUserRequestLog record);

    TerminalUserRequestLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TerminalUserRequestLog record);

    int updateByPrimaryKeyWithBLOBs(TerminalUserRequestLog record);

    int updateByPrimaryKey(TerminalUserRequestLog record);
}