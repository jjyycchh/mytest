package com.access.model.system;

import java.util.Date;

public class BackgroundTaskLog {
    private Long id;

    private String title;

    private Date createDatetime;

    private Integer backgroundTaskId;

    private String message;

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

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Integer getBackgroundTaskId() {
        return backgroundTaskId;
    }

    public void setBackgroundTaskId(Integer backgroundTaskId) {
        this.backgroundTaskId = backgroundTaskId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message == null ? null : message.trim();
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
        BackgroundTaskLog other = (BackgroundTaskLog) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTitle() == null ? other.getTitle() == null : this.getTitle().equals(other.getTitle()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getBackgroundTaskId() == null ? other.getBackgroundTaskId() == null : this.getBackgroundTaskId().equals(other.getBackgroundTaskId()))
            && (this.getMessage() == null ? other.getMessage() == null : this.getMessage().equals(other.getMessage()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getTitle() == null) ? 0 : getTitle().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getBackgroundTaskId() == null) ? 0 : getBackgroundTaskId().hashCode());
        result = prime * result + ((getMessage() == null) ? 0 : getMessage().hashCode());
        return result;
    }
}