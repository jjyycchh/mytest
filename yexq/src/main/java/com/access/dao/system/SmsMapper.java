package com.access.dao.system;

import java.util.Map;
import com.access.model.system.Sms;

public interface SmsMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Sms record);

    int insertSelective(Sms record);

    Sms selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Sms record);

    int updateByPrimaryKey(Sms record);
    
    Integer getUserSmsCount(Map<String, Object> paramMap);
}