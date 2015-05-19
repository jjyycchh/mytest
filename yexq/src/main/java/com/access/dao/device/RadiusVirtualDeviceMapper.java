package com.access.dao.device;

import com.access.model.device.RadiusVirtualDevice;

public interface RadiusVirtualDeviceMapper {
    int deleteByPrimaryKey(Long id);

    int insert(RadiusVirtualDevice record);

    int insertSelective(RadiusVirtualDevice record);

    RadiusVirtualDevice selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(RadiusVirtualDevice record);

    int updateByPrimaryKey(RadiusVirtualDevice record);
    
    int updateByDeviceId(RadiusVirtualDevice record);

    RadiusVirtualDevice getRaduisByAcname(String wlanacname);

    RadiusVirtualDevice getRaduisByDeviceId(String deviceId);
}