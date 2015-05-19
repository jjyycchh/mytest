package com.access.dao.merchant;

import java.util.List;

import com.access.model.merchant.PortalTemplateHasPortalTag;

public interface PortalTemplateHasPortalTagMapper {
    int insert(PortalTemplateHasPortalTag record);

    int insertSelective(PortalTemplateHasPortalTag record);
    
    List<PortalTemplateHasPortalTag> selectByTagId(Long portalTagId);
    
    List<PortalTemplateHasPortalTag> selectByTemplateId(Long portalTemplateId);
    
    int deleteByTemplateId(Long templateId);
}