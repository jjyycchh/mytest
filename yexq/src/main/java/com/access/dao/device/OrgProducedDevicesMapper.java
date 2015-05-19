package com.access.dao.device;

import com.access.model.device.OrgProducedDevices;

public interface OrgProducedDevicesMapper {
    int insert(OrgProducedDevices record);

    int insertSelective(OrgProducedDevices record);
}