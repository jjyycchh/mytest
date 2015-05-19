package com.access.model.merchant;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.access.core.util.StringUtil;

public class PortalPage {
    private Long id;

    private String title;

    private String status;
    
    private String type;

    private String name;

    private Long portalTemplateId;

    private Long pushStatis;

    private Long portalSiteId;

    private Date createDatetime;

    private String thumbnailPath;
    
    private String content;
    
    private PortalTemplateWithBLOBs portalTemplate;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }
    
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Long getPortalTemplateId() {
        return portalTemplateId;
    }

    public void setPortalTemplateId(Long portalTemplateId) {
        this.portalTemplateId = portalTemplateId;
    }

    public Long getPushStatis() {
        return pushStatis;
    }

    public void setPushStatis(Long pushStatis) {
        this.pushStatis = pushStatis;
    }

    public Long getPortalSiteId() {
        return portalSiteId;
    }

    public void setPortalSiteId(Long portalSiteId) {
        this.portalSiteId = portalSiteId;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public String getThumbnailPath() {
        return thumbnailPath;
    }

    public void setThumbnailPath(String thumbnailPath) {
        this.thumbnailPath = thumbnailPath == null ? null : thumbnailPath.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public PortalTemplateWithBLOBs getPortalTemplate() {
		return portalTemplate;
	}

	public void setPortalTemplate(PortalTemplateWithBLOBs portalTemplate) {
		this.portalTemplate = portalTemplate;
	}

	@Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        PortalPage other = (PortalPage) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTitle() == null ? other.getTitle() == null : this.getTitle().equals(other.getTitle()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getPortalTemplateId() == null ? other.getPortalTemplateId() == null : this.getPortalTemplateId().equals(other.getPortalTemplateId()))
            && (this.getPushStatis() == null ? other.getPushStatis() == null : this.getPushStatis().equals(other.getPushStatis()))
            && (this.getPortalSiteId() == null ? other.getPortalSiteId() == null : this.getPortalSiteId().equals(other.getPortalSiteId()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getThumbnailPath() == null ? other.getThumbnailPath() == null : this.getThumbnailPath().equals(other.getThumbnailPath()))
            && (this.getContent() == null ? other.getContent() == null : this.getContent().equals(other.getContent()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getTitle() == null) ? 0 : getTitle().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getPortalTemplateId() == null) ? 0 : getPortalTemplateId().hashCode());
        result = prime * result + ((getPushStatis() == null) ? 0 : getPushStatis().hashCode());
        result = prime * result + ((getPortalSiteId() == null) ? 0 : getPortalSiteId().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getThumbnailPath() == null) ? 0 : getThumbnailPath().hashCode());
        result = prime * result + ((getContent() == null) ? 0 : getContent().hashCode());
        return result;
    }
    
    /* ===================================================================================== */

	//portal_page的content内容中要检查的属性
	public static final List<String> escapePropList = Arrays.asList(new String[]{"url","title","name","thumb","description"});
	/**
	 * 递归转义
	 * @param map
	 */
	public static void pageContentHtmlEscape(Map<String, Object> map){
		Set<Map.Entry<String, Object>> set = map.entrySet();
		for (Iterator<Map.Entry<String, Object>> it = set.iterator(); it.hasNext();) {
			Map.Entry<String, Object> entry = it.next();
			String key = entry.getKey();
			System.out.println("key: "+key);
			if(entry.getValue() != null){
				String type = entry.getValue().getClass().toString();
				if(type.equals("class java.lang.String")){
					if(escapePropList.contains(key)){
						String value = (String)entry.getValue();
						entry.setValue(StringUtil.htmlEscape(value));
					}
				} else if(type.equals("class java.util.ArrayList")) {
					List<Map<String,Object>> childMapList = (ArrayList<Map<String,Object>>)entry.getValue();
					for(Map<String,Object> childMap2 : childMapList){
						pageContentHtmlEscape(childMap2);
						
					}
					entry.setValue(childMapList);
				} else {
					Map<String,Object> childMap = (Map<String,Object>)entry.getValue();
					pageContentHtmlEscape(childMap);
					entry.setValue(childMap);
				}
			}
		}
	}

	public static String htmlEscape(String json){
		Gson gson = new Gson();
		Map<String, Object> map =  gson.fromJson(json, new TypeToken<Map<String, Object>>(){}.getType());
		PortalPage.pageContentHtmlEscape(map);
		return gson.toJson(map);
	}
}