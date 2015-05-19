package com.access.dao.system;

import com.access.model.system.BackgroundTaskLog;

public interface BackgroundTaskLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(BackgroundTaskLog record);

    int insertSelective(BackgroundTaskLog record);

    BackgroundTaskLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(BackgroundTaskLog record);

    int updateByPrimaryKeyWithBLOBs(BackgroundTaskLog record);

    int updateByPrimaryKey(BackgroundTaskLog record);
}