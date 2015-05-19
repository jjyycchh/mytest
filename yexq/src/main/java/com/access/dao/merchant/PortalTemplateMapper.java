package com.access.dao.merchant;

import java.util.List;
import java.util.Map;
import com.access.model.merchant.PortalTemplate;
import com.access.model.merchant.PortalTemplateWithBLOBs;

public interface PortalTemplateMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PortalTemplateWithBLOBs record);

    Long insertSelective(PortalTemplateWithBLOBs record);

    PortalTemplateWithBLOBs selectByPrimaryKey(Long id);

    Long updateByPrimaryKeySelective(PortalTemplateWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(PortalTemplateWithBLOBs record);

    int updateByPrimaryKey(PortalTemplate record);
    
    List<PortalTemplateWithBLOBs> getAll();

    List<PortalTemplateWithBLOBs> getTemplateList(Map<String, Object> paraMap);
    
    PortalTemplateWithBLOBs getTemplateByMap(Map<String, Object> paraMap);
    
    List<PortalTemplateWithBLOBs> getTemplatePage(Map<String, Object> paraMap);
}