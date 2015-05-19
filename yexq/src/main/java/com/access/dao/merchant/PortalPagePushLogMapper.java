package com.access.dao.merchant;

import java.util.List;
import java.util.Map;

import com.access.model.merchant.PortalPagePushLog;

public interface PortalPagePushLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(PortalPagePushLog record);

    int insertSelective(PortalPagePushLog record);

    PortalPagePushLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PortalPagePushLog record);

    int updateByPrimaryKey(PortalPagePushLog record);

    List<Map<String, Object>> getPortalPagePushStatis(Map<String, Object> param);

    List<Map<String, Object>> getPortalPagePushDefault(Map<String, Object> param);
    
    long getPortalPagePushPoint(Map<String, Object> param);
    
    long getPortalPagePushDefaultPoint(Map<String, Object> param);
    
    List<Map<String, Object>> getSiteRanking(Map<String, Object> param);
    
    int getPushCountBySiteId(Long portalSiteId);
    
    List<Map<String, Object>> getSiteRankingPoint(Map<String, Object> param);
    
    PortalPagePushLog getLastPortalPushLog(Long siteId);
    
    Map<String, Object> getLastPortalPushInfoBySiteId(Long siteId);
}