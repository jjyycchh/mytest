package com.access.dao.merchant;

import java.util.List;

import com.access.model.merchant.PortalTag;

public interface PortalTagMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PortalTag record);

    Long insertSelective(PortalTag record);

    PortalTag selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PortalTag record);

    int updateByPrimaryKey(PortalTag record);
    
    PortalTag getPortalTagByName(String name);
    
    List<PortalTag> getTagsByPortalSiteId(Long id);
    
    List<PortalTag> getTagsByPortalTemplateId(Long id);
    
    List<PortalTag> selectByByTemplateId(Long templateId);
}