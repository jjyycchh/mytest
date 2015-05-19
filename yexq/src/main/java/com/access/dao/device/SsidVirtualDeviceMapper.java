package com.access.dao.device;

import java.util.Map;

import com.access.model.device.SsidVirtualDevice;

public interface SsidVirtualDeviceMapper {
	int deleteByPrimaryKey(Long id);

    int insert(SsidVirtualDevice record);

    int insertSelective(SsidVirtualDevice record);

    SsidVirtualDevice selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SsidVirtualDevice record);

    int updateByPrimaryKey(SsidVirtualDevice record);
    
    SsidVirtualDevice getFitApBySsid(SsidVirtualDevice record);
    
    int updateByDeviceId(SsidVirtualDevice record);
    
    SsidVirtualDevice getFitApBySsidAndMac(SsidVirtualDevice record);
    
    int updateByMacAndSsidSelective(SsidVirtualDevice record);
    
    SsidVirtualDevice selectBySsidMacAcDeviceId(Map<String, Object> paramMap);
    
    SsidVirtualDevice selectByDeviceId(String deviceId);
}
