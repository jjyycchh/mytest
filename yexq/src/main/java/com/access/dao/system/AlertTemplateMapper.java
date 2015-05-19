package com.access.dao.system;

import com.access.model.system.AlertTemplate;

public interface AlertTemplateMapper {
    int deleteByPrimaryKey(Long id);

    int insert(AlertTemplate record);

    int insertSelective(AlertTemplate record);

    AlertTemplate selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AlertTemplate record);

    int updateByPrimaryKey(AlertTemplate record);
}