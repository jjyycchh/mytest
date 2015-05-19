package com.access.dao.device;

import com.access.model.device.AAAVirtualDevice;

public interface AAAVirtualDeviceMapper {
	int deleteByPrimaryKey(Long id);

    int insert(AAAVirtualDevice record);

    int insertSelective(AAAVirtualDevice record);

    AAAVirtualDevice selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AAAVirtualDevice record);

    int updateByPrimaryKey(AAAVirtualDevice record);
    
    int updateByDeviceId(AAAVirtualDevice record);

    AAAVirtualDevice getRaduisByAcname(String wlanacname);

    AAAVirtualDevice getRaduisByDeviceId(String deviceId);
    
    AAAVirtualDevice getRaduisByDeviceIp(String deviceIp);
    
    AAAVirtualDevice getRaduisByRaduis(AAAVirtualDevice raduis);
}
