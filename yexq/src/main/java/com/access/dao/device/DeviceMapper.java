package com.access.dao.device;

import java.util.List;
import java.util.Map;

import com.access.model.device.Device;
import com.access.model.device.DeviceWithBLOBs;

public interface DeviceMapper {
    int deleteByPrimaryKey(String deviceId);

    int insert(DeviceWithBLOBs record);

    int insertSelective(DeviceWithBLOBs record);

    DeviceWithBLOBs selectByPrimaryKey(String deviceId);

    int updateByPrimaryKeySelective(DeviceWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(DeviceWithBLOBs record);

    int updateByPrimaryKey(Device record);
    
    int updateStatus(Map<String, String> paramMap);
    
    List<Device> selectDeviceInfoByIds(Map<String, Object> param);
    
    public int updateSettings(Map<String, Object> param);
    
    int updateSettingsBatch(Map<String, Object> param);
    
    DeviceWithBLOBs getDeviceByMac(String mac);
    
    List<DeviceWithBLOBs> userDeviceList(Map<String, Object> param);
    
    List<DeviceWithBLOBs> getDeviceForPolicyByOwnerId(Map<String, Object> param);

    List<DeviceWithBLOBs> getDevicesByLocationId(Long locationId);
    
    int updateDeviceLimit(Map<String, Object> param);
    
    DeviceWithBLOBs findDeviceLimit(Long accountId);
    
    List<Map<String, Object>> getDeviceDetails(Map<String, Object> param);
    
    int getDeviceCount(Map<String, Object> param);
    
    int getDeviceCountBySiteId(Long portalSiteId);
    
    List<Device> getRefereshDeviceByIds(Map<String, Object> param);
    
    Map<String, Object> superGetDevicePage(Map<String, Object> paramMap);
   
    int getDevicePageTotal(Map<String, Object> paramMap);
    
    int getBaseDevicePageTotal(Map<String, Object> paramMap);
    
    int updateBrandModelById(Map<String, Object> paramMap);
    
    List<Map<String,String>> getSsidList();
    
    int updateDeviceLocationByAccount(Map<String, Object> paramMap);
    
    //查询设备区域列表
    List<Map<String,Object>> findDeviceAddress(String account);
    
    DeviceWithBLOBs getDeviceByEmsDevId(Long emsDevie);
    
    DeviceWithBLOBs selectByPrimaryKeySelective(DeviceWithBLOBs record);
    
    /**
     * 根据网元ID和设备类型获取一条记录
     * @param paramMap
     * @return
     */
    DeviceWithBLOBs selectByEmsDevIdAndType(Map<String, Object> paramMap);
    
    /**
     * 根据网元ID和mac获取一条记录
     * @param paramMap
     * @return
     */
    DeviceWithBLOBs selectByEmsDevIdAndMac(Map<String, Object> paramMap);
    
    /**
     * 获取设备详情
     */
    Device getDeviceDetailByPrimaryKey(String deviceId);
    /**
     * 查询ap组下设备
     * @param groupId
     * @return
     */
    List<Device> getDeviceByGroupId(Long groupId);
    /**
     * 查询未分组设备
     * @param groupId
     * @return
     */
    List<Device> getUnGroupAp(Map<String, Object> paramMap);
    
    Long getAccountIdByDeviceId(String deviceId);
    
    String getFatapMacByAccountId(Long accountId);
}