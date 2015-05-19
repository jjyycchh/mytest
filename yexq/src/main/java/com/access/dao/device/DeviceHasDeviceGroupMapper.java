package com.access.dao.device;

import java.util.List;

import com.access.model.device.DeviceHasDeviceGroup;

public interface DeviceHasDeviceGroupMapper {
	List<DeviceHasDeviceGroup> selectByGroupId(Long groupId);
	
	List<DeviceHasDeviceGroup> selectDeviceHasDeviceGroup(DeviceHasDeviceGroup record);
	
	DeviceHasDeviceGroup getByDeviceId(String deviceId);
	
	int insert(DeviceHasDeviceGroup record);

    int insertSelective(DeviceHasDeviceGroup record);
    
    int deleteByGroupId(Long groupId);
    
    int deleteDeviceHasDeviceGroup(DeviceHasDeviceGroup record);
    
    int deleteByDeviceId(String deviceId);
    
    void updateForeignKeyChecks(Integer status);
}
