package com.access.dao.user;

import java.util.List;
import java.util.Map;

import com.access.model.user.TerminalUserHasDevice;

public interface TerminalUserHasDeviceMapper {
    int insert(TerminalUserHasDevice record);

    int insertSelective(TerminalUserHasDevice record);
    
    int insertNotExist(TerminalUserHasDevice record);
    
    int updateUserDeviceStatus(TerminalUserHasDevice record);
    
    List<TerminalUserHasDevice> getRecordsByUserId(Long userId);
    
    /**
     * 根据用户ID和设备ID获取一条记录
     * @param deviceId 设备ID
     * @param userId 用户ID
     * @return
     */
    TerminalUserHasDevice selectByUserIdAndDeviceId(Map<String, Object> paramMap);
    
    int updateUserDeviceStatusByUserIdAndDeviceId(Map<String, Object> paramMap);
}