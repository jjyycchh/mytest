package com.access.dao.system;

import com.access.model.system.Jubao;

public interface JubaoMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Jubao record);

    int insertSelective(Jubao record);

    Jubao selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Jubao record);

    int updateByPrimaryKey(Jubao record);
}