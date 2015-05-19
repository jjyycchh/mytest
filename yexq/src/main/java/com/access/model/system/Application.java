package com.access.model.system;

import java.util.Date;

public class Application {
    private Long id;

    private String platform;

    private String version;

    private String path;

    private Date uploadDatetime;

    private Date publishedDatetime;

    private Byte isPublished;

    private Long downloadCount;

    private String description;

    private String thumbnailPath;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform == null ? null : platform.trim();
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version == null ? null : version.trim();
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path == null ? null : path.trim();
    }

    public Date getUploadDatetime() {
        return uploadDatetime;
    }

    public void setUploadDatetime(Date uploadDatetime) {
        this.uploadDatetime = uploadDatetime;
    }

    public Date getPublishedDatetime() {
        return publishedDatetime;
    }

    public void setPublishedDatetime(Date publishedDatetime) {
        this.publishedDatetime = publishedDatetime;
    }

    public Byte getIsPublished() {
        return isPublished;
    }

    public void setIsPublished(Byte isPublished) {
        this.isPublished = isPublished;
    }

    public Long getDownloadCount() {
        return downloadCount;
    }

    public void setDownloadCount(Long downloadCount) {
        this.downloadCount = downloadCount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getThumbnailPath() {
        return thumbnailPath;
    }

    public void setThumbnailPath(String thumbnailPath) {
        this.thumbnailPath = thumbnailPath == null ? null : thumbnailPath.trim();
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
        Application other = (Application) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getPlatform() == null ? other.getPlatform() == null : this.getPlatform().equals(other.getPlatform()))
            && (this.getVersion() == null ? other.getVersion() == null : this.getVersion().equals(other.getVersion()))
            && (this.getPath() == null ? other.getPath() == null : this.getPath().equals(other.getPath()))
            && (this.getUploadDatetime() == null ? other.getUploadDatetime() == null : this.getUploadDatetime().equals(other.getUploadDatetime()))
            && (this.getPublishedDatetime() == null ? other.getPublishedDatetime() == null : this.getPublishedDatetime().equals(other.getPublishedDatetime()))
            && (this.getIsPublished() == null ? other.getIsPublished() == null : this.getIsPublished().equals(other.getIsPublished()))
            && (this.getDownloadCount() == null ? other.getDownloadCount() == null : this.getDownloadCount().equals(other.getDownloadCount()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getThumbnailPath() == null ? other.getThumbnailPath() == null : this.getThumbnailPath().equals(other.getThumbnailPath()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getPlatform() == null) ? 0 : getPlatform().hashCode());
        result = prime * result + ((getVersion() == null) ? 0 : getVersion().hashCode());
        result = prime * result + ((getPath() == null) ? 0 : getPath().hashCode());
        result = prime * result + ((getUploadDatetime() == null) ? 0 : getUploadDatetime().hashCode());
        result = prime * result + ((getPublishedDatetime() == null) ? 0 : getPublishedDatetime().hashCode());
        result = prime * result + ((getIsPublished() == null) ? 0 : getIsPublished().hashCode());
        result = prime * result + ((getDownloadCount() == null) ? 0 : getDownloadCount().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getThumbnailPath() == null) ? 0 : getThumbnailPath().hashCode());
        return result;
    }
}