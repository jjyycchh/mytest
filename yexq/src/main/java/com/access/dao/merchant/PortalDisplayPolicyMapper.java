package com.access.dao.merchant;

import java.util.List;
import java.util.Map;

import com.access.model.merchant.PortalDisplayPolicy;
import com.access.model.merchant.PortalDisplayPolicyWithBLOBs;

public interface PortalDisplayPolicyMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PortalDisplayPolicyWithBLOBs record);

    int insertSelective(PortalDisplayPolicyWithBLOBs record);

    PortalDisplayPolicyWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PortalDisplayPolicyWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(PortalDisplayPolicyWithBLOBs record);

    int updateByPrimaryKey(PortalDisplayPolicy record);
    
    int updatePortalPolicyStatus(PortalDisplayPolicy record);
    
    List<PortalDisplayPolicyWithBLOBs> getPortalDisplayPoliciesByDeviceId(String deviceId);
    
    int getPolicyCountBySiteId(Long portalSiteId);
    
    int getDeletedPolicyCountBySiteId(Long portalSiteId);
    
    int updateSiteName(Map<String, Object> paramMap);
    
    List<PortalDisplayPolicyWithBLOBs> selectBySiteId(Map<String, Object> paramMap);
    
    List<PortalDisplayPolicyWithBLOBs> selectByDeviceId(Map<String, Object> paramMap);
    
}