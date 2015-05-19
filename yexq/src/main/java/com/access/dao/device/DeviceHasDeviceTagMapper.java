package com.access.dao.device;

import com.access.model.device.DeviceHasDeviceTag;

public interface DeviceHasDeviceTagMapper {
    int insert(DeviceHasDeviceTag record);

    int insertSelective(DeviceHasDeviceTag record);
}