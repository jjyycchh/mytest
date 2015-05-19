package com.access.model.system;

import java.util.Date;

public class Sms {
    private Long id;

    private String cellphone;

    private String content;

    private Integer retryTimes;

    private Boolean isSent;

    private Date createDatetime;

    private Long terminalUserAuthenticationLogId;

    private Long associatedId;

    private String sourceType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone == null ? null : cellphone.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Integer getRetryTimes() {
        return retryTimes;
    }

    public void setRetryTimes(Integer retryTimes) {
        this.retryTimes = retryTimes;
    }

    public Boolean getIsSent() {
        return isSent;
    }

    public void setIsSent(Boolean isSent) {
        this.isSent = isSent;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Long getTerminalUserAuthenticationLogId() {
        return terminalUserAuthenticationLogId;
    }

    public void setTerminalUserAuthenticationLogId(Long terminalUserAuthenticationLogId) {
        this.terminalUserAuthenticationLogId = terminalUserAuthenticationLogId;
    }

    public Long getAssociatedId() {
        return associatedId;
    }

    public void setAssociatedId(Long associatedId) {
        this.associatedId = associatedId;
    }

    public String getSourceType() {
        return sourceType;
    }

    public void setSourceType(String sourceType) {
        this.sourceType = sourceType == null ? null : sourceType.trim();
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
        Sms other = (Sms) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getCellphone() == null ? other.getCellphone() == null : this.getCellphone().equals(other.getCellphone()))
            && (this.getContent() == null ? other.getContent() == null : this.getContent().equals(other.getContent()))
            && (this.getRetryTimes() == null ? other.getRetryTimes() == null : this.getRetryTimes().equals(other.getRetryTimes()))
            && (this.getIsSent() == null ? other.getIsSent() == null : this.getIsSent().equals(other.getIsSent()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getTerminalUserAuthenticationLogId() == null ? other.getTerminalUserAuthenticationLogId() == null : this.getTerminalUserAuthenticationLogId().equals(other.getTerminalUserAuthenticationLogId()))
            && (this.getAssociatedId() == null ? other.getAssociatedId() == null : this.getAssociatedId().equals(other.getAssociatedId()))
            && (this.getSourceType() == null ? other.getSourceType() == null : this.getSourceType().equals(other.getSourceType()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getCellphone() == null) ? 0 : getCellphone().hashCode());
        result = prime * result + ((getContent() == null) ? 0 : getContent().hashCode());
        result = prime * result + ((getRetryTimes() == null) ? 0 : getRetryTimes().hashCode());
        result = prime * result + ((getIsSent() == null) ? 0 : getIsSent().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getTerminalUserAuthenticationLogId() == null) ? 0 : getTerminalUserAuthenticationLogId().hashCode());
        result = prime * result + ((getAssociatedId() == null) ? 0 : getAssociatedId().hashCode());
        result = prime * result + ((getSourceType() == null) ? 0 : getSourceType().hashCode());
        return result;
    }
}