package com.access.dao.device;

import java.util.List;
import java.util.Map;

import com.access.model.device.DeviceGroup;

public interface DeviceGroupMapper {
	DeviceGroup selectByPrimaryKey(Long groupId);
	
	int insert(DeviceGroup group);
	
	int updateByPrimaryKey(DeviceGroup group);
	
	int deleteByPrimaryKey(Long groupId);

    List<DeviceGroup> getDeviceGroupPage(Map<String, Object> paramMap);
    
    int getDeviceGroupPageTotal(Map<String, Object> paramMap);
    
    List<DeviceGroup> getDeviceGroupByProvince(String province);
    
    List<DeviceGroup> getDeviceGroupByProvinceAndCity(Map<String, Object> paramMap);
    
    DeviceGroup selectByGroupname(String groupName);
}
