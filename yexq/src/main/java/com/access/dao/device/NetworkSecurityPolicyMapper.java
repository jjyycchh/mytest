package com.access.dao.device;

import com.access.model.device.NetworkSecurityPolicy;

public interface NetworkSecurityPolicyMapper {
    int deleteByPrimaryKey(Long id);

    int insert(NetworkSecurityPolicy record);

    int insertSelective(NetworkSecurityPolicy record);

    NetworkSecurityPolicy selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(NetworkSecurityPolicy record);

    int updateByPrimaryKeyWithBLOBs(NetworkSecurityPolicy record);

    int updateByPrimaryKey(NetworkSecurityPolicy record);
}