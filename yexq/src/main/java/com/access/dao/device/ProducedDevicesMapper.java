package com.access.dao.device;

import java.util.Map;

import com.access.model.device.ProducedDevices;

public interface ProducedDevicesMapper {
    int deleteByPrimaryKey(String mac);

    int insert(ProducedDevices record);

    int insertSelective(ProducedDevices record);

    ProducedDevices selectByPrimaryKey(String mac);

    int updateByPrimaryKeySelective(ProducedDevices record);
    
    int updateAllByPrimaryKeySelective(ProducedDevices record);

    int updateByPrimaryKey(ProducedDevices record);
    
    ProducedDevices selectByMac(String mac);
    
    int deleteByMac(String mac);
    
    int deleteByMacMap(Map<String, Object> paramMap);
    
    int auditByPrimaryKey(Map<String, Object> paramMap);
    
    int updateBrandModelById(Map<String, Object> paramMap);
    
    ProducedDevices selectByEmsDeviceId(Long emsDevId);
}