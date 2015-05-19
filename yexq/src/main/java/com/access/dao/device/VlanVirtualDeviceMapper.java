package com.access.dao.device;

import java.util.Map;

import com.access.model.device.VlanVirtualDevice;

public interface VlanVirtualDeviceMapper {
	int deleteByPrimaryKey(Long id);

    int insert(VlanVirtualDevice record);

    int insertSelective(VlanVirtualDevice record);

    VlanVirtualDevice selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(VlanVirtualDevice record);

    int updateByPrimaryKey(VlanVirtualDevice record);

    VlanVirtualDevice findByVlanVirtualDevice(VlanVirtualDevice record);
    
    VlanVirtualDevice findByMap(Map<String, Object> paramMap);
    
    VlanVirtualDevice selectByDeviceId(String deviceId);
    
    int updateByDeviceId(VlanVirtualDevice record);
}
