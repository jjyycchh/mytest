package com.access.dao.merchant;

import com.access.model.merchant.ResourceHasPortalPage;

public interface ResourceHasPortalPageMapper {
    int insert(ResourceHasPortalPage record);

    int insertSelective(ResourceHasPortalPage record);
    
    int delete(ResourceHasPortalPage record);
}