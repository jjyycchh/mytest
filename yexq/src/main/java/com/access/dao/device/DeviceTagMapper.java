package com.access.dao.device;

import com.access.model.device.DeviceTag;

public interface DeviceTagMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DeviceTag record);

    int insertSelective(DeviceTag record);

    DeviceTag selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DeviceTag record);

    int updateByPrimaryKey(DeviceTag record);
}