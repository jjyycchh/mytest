package com.access.dao.system;

import com.access.model.system.BackgroundTask;

public interface BackgroundTaskMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BackgroundTask record);

    int insertSelective(BackgroundTask record);

    BackgroundTask selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BackgroundTask record);

    int updateByPrimaryKey(BackgroundTask record);
}