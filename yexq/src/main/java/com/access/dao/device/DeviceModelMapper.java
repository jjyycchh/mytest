package com.access.dao.device;

import java.util.Map;

import com.access.model.device.DeviceModel;

public interface DeviceModelMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DeviceModel record);

    int insertSelective(DeviceModel record);

    DeviceModel selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DeviceModel record);

    int updateByPrimaryKey(DeviceModel record);

    DeviceModel getModelByDeviceId(String deviceId);

    DeviceModel getModelObjByBrandModel(Map<String, String> param);
    
    DeviceModel selectByBrandModel(Map<String, Object> paramMap);
}