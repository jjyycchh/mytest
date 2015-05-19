package com.access.dao.device;

import com.access.model.device.DeviceTaskLog;
import com.access.model.device.DeviceTaskLogWithBLOBs;

public interface DeviceTaskLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DeviceTaskLogWithBLOBs record);

    int insertSelective(DeviceTaskLogWithBLOBs record);

    DeviceTaskLogWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DeviceTaskLogWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(DeviceTaskLogWithBLOBs record);

    int updateByPrimaryKey(DeviceTaskLog record);
}