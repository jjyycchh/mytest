package com.access.dao.merchant;

import java.util.List;
import java.util.Map;

import com.access.model.merchant.PortalSite;

public interface PortalSiteMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PortalSite record);

    int insertSelective(PortalSite record);

    PortalSite selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PortalSite record);

    int updateByPrimaryKey(PortalSite record);
    
    int updateSiteStatus(PortalSite record);
    
    List<PortalSite> getPortalSitesBySiteIds(Map<String, Object> param);
    
    List<PortalSite> getPortalSiteByOwnerId(Long accountId);
    
    PortalSite getDefaultSite(Map<String, Object> param);
}