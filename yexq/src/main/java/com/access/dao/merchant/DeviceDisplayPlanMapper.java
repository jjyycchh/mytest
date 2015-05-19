package com.access.dao.merchant;

import java.util.List;

import com.access.model.merchant.DeviceDisplayPlan;

public interface DeviceDisplayPlanMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DeviceDisplayPlan record);

    int insertSelective(DeviceDisplayPlan record);

    DeviceDisplayPlan selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DeviceDisplayPlan record);

    int updateByPrimaryKey(DeviceDisplayPlan record);
    
    List<DeviceDisplayPlan> getDisplayPlanByDeviceId(String deviceId);
    
    int deleteByDeviceId(String deviceId);
    
    int selectBySiteId(Long siteId);
}