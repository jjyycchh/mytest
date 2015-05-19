package com.access.dao.system;

import com.access.model.system.EmailSendingLog;

public interface EmailSendingLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(EmailSendingLog record);

    int insertSelective(EmailSendingLog record);

    EmailSendingLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(EmailSendingLog record);

    int updateByPrimaryKeyWithBLOBs(EmailSendingLog record);

    int updateByPrimaryKey(EmailSendingLog record);
}