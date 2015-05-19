package com.access.dao.device;

import com.access.model.device.FitApVirtualDevice;

public interface FitApVirtualDeviceMapper {
    int deleteByPrimaryKey(Long id);

    int insert(FitApVirtualDevice record);

    int insertSelective(FitApVirtualDevice record);

    FitApVirtualDevice selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(FitApVirtualDevice record);

    int updateByPrimaryKey(FitApVirtualDevice record);
    
    FitApVirtualDevice getFitApBySsid(FitApVirtualDevice record);
    
    int updateByDeviceId(FitApVirtualDevice record);
}