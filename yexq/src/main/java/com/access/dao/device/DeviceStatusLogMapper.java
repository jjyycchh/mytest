package com.access.dao.device;

import java.util.Map;

import com.access.model.device.DeviceStatusLog;
import com.access.model.device.DeviceWithBLOBs;

public interface DeviceStatusLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DeviceStatusLog record);

    int insertSelective(DeviceStatusLog record);

    DeviceStatusLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DeviceStatusLog record);

    int updateByPrimaryKey(DeviceStatusLog record);
    
    DeviceWithBLOBs getTrafficByDeviceId(Map<String, Object> param);
    
    DeviceStatusLog getDeviceLatestOnlineLog(String deviceId);
    
    DeviceStatusLog getDeviceLatestLog(String deviceId);
}