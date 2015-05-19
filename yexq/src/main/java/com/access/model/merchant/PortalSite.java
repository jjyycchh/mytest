package com.access.model.merchant;

import java.util.Date;

public class PortalSite {
    private Long id;

    private String siteName;

    private String thumbnailPath;

    private Date createDatetime;

    private Long createdAccountId;

    private Long accountId;

    private Long lastEditAccountId;

    private Date lastUpdateDatetime;

    private String status;

    private String description;

    private String[] tags;
    
    private PortalPage[] portalPages;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName == null ? null : siteName.trim();
    }

    public String getThumbnailPath() {
        return thumbnailPath;
    }

    public void setThumbnailPath(String thumbnailPath) {
        this.thumbnailPath = thumbnailPath == null ? null : thumbnailPath.trim();
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Long getCreatedAccountId() {
        return createdAccountId;
    }

    public void setCreatedAccountId(Long createdAccountId) {
        this.createdAccountId = createdAccountId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getLastEditAccountId() {
        return lastEditAccountId;
    }

    public void setLastEditAccountId(Long lastEditAccountId) {
        this.lastEditAccountId = lastEditAccountId;
    }

    public Date getLastUpdateDatetime() {
        return lastUpdateDatetime;
    }

    public void setLastUpdateDatetime(Date lastUpdateDatetime) {
        this.lastUpdateDatetime = lastUpdateDatetime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    
    public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}

	public PortalPage[] getPortalPages() {
		return portalPages;
	}

	public void setPortalPages(PortalPage[] portalPages) {
		this.portalPages = portalPages;
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
        PortalSite other = (PortalSite) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getSiteName() == null ? other.getSiteName() == null : this.getSiteName().equals(other.getSiteName()))
            && (this.getThumbnailPath() == null ? other.getThumbnailPath() == null : this.getThumbnailPath().equals(other.getThumbnailPath()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getCreatedAccountId() == null ? other.getCreatedAccountId() == null : this.getCreatedAccountId().equals(other.getCreatedAccountId()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()))
            && (this.getLastEditAccountId() == null ? other.getLastEditAccountId() == null : this.getLastEditAccountId().equals(other.getLastEditAccountId()))
            && (this.getLastUpdateDatetime() == null ? other.getLastUpdateDatetime() == null : this.getLastUpdateDatetime().equals(other.getLastUpdateDatetime()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getSiteName() == null) ? 0 : getSiteName().hashCode());
        result = prime * result + ((getThumbnailPath() == null) ? 0 : getThumbnailPath().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getCreatedAccountId() == null) ? 0 : getCreatedAccountId().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        result = prime * result + ((getLastEditAccountId() == null) ? 0 : getLastEditAccountId().hashCode());
        result = prime * result + ((getLastUpdateDatetime() == null) ? 0 : getLastUpdateDatetime().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        return result;
    }
    
    /////////////////////////////////////////////////////////////////////
    private String deviceId;
    private Date pushDatetime;
    private Long portalPageId;
    private Long pushCount;

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public Date getPushDatetime() {
		return pushDatetime;
	}

	public void setPushDatetime(Date pushDatetime) {
		this.pushDatetime = pushDatetime;
	}

	public Long getPortalPageId() {
		return portalPageId;
	}

	public void setPortalPageId(Long portalPageId) {
		this.portalPageId = portalPageId;
	}

	public Long getPushCount() {
		return pushCount;
	}

	public void setPushCount(Long pushCount) {
		this.pushCount = pushCount;
	}
    
}