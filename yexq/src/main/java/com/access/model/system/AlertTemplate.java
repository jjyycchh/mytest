package com.access.model.system;

import java.util.Date;

public class AlertTemplate {
    private Long id;

    private String smsContent;

    private String type;

    private Date createDatetime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSmsContent() {
        return smsContent;
    }

    public void setSmsContent(String smsContent) {
        this.smsContent = smsContent == null ? null : smsContent.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
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
        AlertTemplate other = (AlertTemplate) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getSmsContent() == null ? other.getSmsContent() == null : this.getSmsContent().equals(other.getSmsContent()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getSmsContent() == null) ? 0 : getSmsContent().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        return result;
    }
}