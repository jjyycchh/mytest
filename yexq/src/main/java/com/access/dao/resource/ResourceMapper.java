package com.access.dao.resource;

import java.util.List;
import java.util.Map;

import com.access.model.resource.Resource;

public interface ResourceMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Resource record);

    int insertSelective(Resource record);

    Resource selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Resource record);

    int updateByPrimaryKey(Resource record);

    int updateReferenceTimesAdd(Long resourceId);
    
    int updateReferenceTimesCut(Long resourceId);
}