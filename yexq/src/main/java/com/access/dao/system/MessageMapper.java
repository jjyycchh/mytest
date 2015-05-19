package com.access.dao.system;

import java.util.List;
import java.util.Map;

import com.access.model.system.Message;

public interface MessageMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Message record);

    int insertSelective(Message record);

    Message selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Message record);

    int updateByPrimaryKeyWithBLOBs(Message record);

    int updateByPrimaryKey(Message record);
    
    List<Message> selectByTypeAndOwnerId(Map<String, Object> paramMap);
}