package com.access.dao.device;

import java.util.Map;

import com.access.model.device.TelecomVirtualDevice;

public interface TelecomVirtualDeviceMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TelecomVirtualDevice record);

    int insertSelective(TelecomVirtualDevice record);

    TelecomVirtualDevice selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TelecomVirtualDevice record);

    int updateByPrimaryKey(TelecomVirtualDevice record);

    TelecomVirtualDevice findByTvDevice(TelecomVirtualDevice record);
    
    TelecomVirtualDevice findByMap(Map<String, Object> paramMap);
    
    int updateByDeviceId(TelecomVirtualDevice record);
}