package com.access.dao.system;

import com.access.model.system.Suggest;

public interface SuggestMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Suggest record);

    int insertSelective(Suggest record);

    Suggest selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Suggest record);

    int updateByPrimaryKey(Suggest record);
}