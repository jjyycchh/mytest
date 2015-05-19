package com.access.model.system;

import java.util.Date;

public class EmailSendingLog {
    private Long id;

    private String title;

    private Date createDatetime;

    private Long emailNoticeId;

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

    public Long getEmailNoticeId() {
        return emailNoticeId;
    }

    public void setEmailNoticeId(Long emailNoticeId) {
        this.emailNoticeId = emailNoticeId;
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
        EmailSendingLog other = (EmailSendingLog) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTitle() == null ? other.getTitle() == null : this.getTitle().equals(other.getTitle()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getEmailNoticeId() == null ? other.getEmailNoticeId() == null : this.getEmailNoticeId().equals(other.getEmailNoticeId()))
            && (this.getMessage() == null ? other.getMessage() == null : this.getMessage().equals(other.getMessage()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getTitle() == null) ? 0 : getTitle().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getEmailNoticeId() == null) ? 0 : getEmailNoticeId().hashCode());
        result = prime * result + ((getMessage() == null) ? 0 : getMessage().hashCode());
        return result;
    }
}