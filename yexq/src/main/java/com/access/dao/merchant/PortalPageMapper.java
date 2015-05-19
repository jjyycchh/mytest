package com.access.dao.merchant;

import java.util.List;
import java.util.Map;

import com.access.model.merchant.PortalPage;

public interface PortalPageMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PortalPage record);

    int insertSelective(PortalPage record);

    PortalPage selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PortalPage record);

    int updateByPrimaryKeyWithBLOBs(PortalPage record);

    int updateByPrimaryKey(PortalPage record);
    
    List<PortalPage> getPortalPagesBySiteId (Long siteId);
    
    PortalPage getAuthPageBySiteId(Long siteId);
    
    PortalPage getLoginPageBySiteId(Long siteId);
    
    int updateByAuthTypeAndSiteId(PortalPage record);    
    
    int updateStatusById(Map<String,Object> paramMap);
}