package com.access.dao.system;

import com.access.model.system.EmailNotice;
import com.access.model.system.EmailNoticeWithBLOBs;

public interface EmailNoticeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(EmailNoticeWithBLOBs record);

    int insertSelective(EmailNoticeWithBLOBs record);

    EmailNoticeWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(EmailNoticeWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(EmailNoticeWithBLOBs record);

    int updateByPrimaryKey(EmailNotice record);
}