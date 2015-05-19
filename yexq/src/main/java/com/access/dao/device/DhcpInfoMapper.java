package com.access.dao.device;

import com.access.model.device.DhcpInfo;

import java.util.List;
import java.util.Map;

public interface DhcpInfoMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DhcpInfo record);

    int insertSelective(DhcpInfo record);

    DhcpInfo selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DhcpInfo record);

    int updateByPrimaryKey(DhcpInfo record);

    List<DhcpInfo> getOnlineDhcpInfosByUserIp(Map<String, String> param);
}