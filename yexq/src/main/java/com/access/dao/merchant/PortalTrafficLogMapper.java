package com.access.dao.merchant;

import java.util.List;
import java.util.Map;

import com.access.model.merchant.PortalTrafficLog;

public interface PortalTrafficLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PortalTrafficLog record);

    int insertSelective(PortalTrafficLog record);

    PortalTrafficLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PortalTrafficLog record);

    int updateByPrimaryKeyWithBLOBs(PortalTrafficLog record);

    int updateByPrimaryKey(PortalTrafficLog record);
    
    List<Map<String, Object>> getPortalTrafficStatis(Map<String, Object> param);
}