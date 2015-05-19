package com.access.model.resource;

import java.util.Date;

public class Resource {
    private Long id;

    private String name;

    private String resourcePath;

    private Integer referenceTimes;

    private String thumbnailPath;

    private Date createDatetime;

    private Long accountId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getResourcePath() {
        return resourcePath;
    }

    public void setResourcePath(String resourcePath) {
        this.resourcePath = resourcePath == null ? null : resourcePath.trim();
    }

    public Integer getReferenceTimes() {
        return referenceTimes;
    }

    public void setReferenceTimes(Integer referenceTimes) {
        this.referenceTimes = referenceTimes;
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

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
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
        Resource other = (Resource) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getResourcePath() == null ? other.getResourcePath() == null : this.getResourcePath().equals(other.getResourcePath()))
            && (this.getReferenceTimes() == null ? other.getReferenceTimes() == null : this.getReferenceTimes().equals(other.getReferenceTimes()))
            && (this.getThumbnailPath() == null ? other.getThumbnailPath() == null : this.getThumbnailPath().equals(other.getThumbnailPath()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getResourcePath() == null) ? 0 : getResourcePath().hashCode());
        result = prime * result + ((getReferenceTimes() == null) ? 0 : getReferenceTimes().hashCode());
        result = prime * result + ((getThumbnailPath() == null) ? 0 : getThumbnailPath().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        return result;
    }
}