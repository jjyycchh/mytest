package com.access.model.system;

import java.util.Date;

public class EmailNotice {
    private Long id;

    private String from;

    private Integer retryTimes;

    private Boolean isSent;

    private Date sentDatetime;

    private Date createDatetime;

    private Long accountId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from == null ? null : from.trim();
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

    public Date getSentDatetime() {
        return sentDatetime;
    }

    public void setSentDatetime(Date sentDatetime) {
        this.sentDatetime = sentDatetime;
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
        EmailNotice other = (EmailNotice) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getFrom() == null ? other.getFrom() == null : this.getFrom().equals(other.getFrom()))
            && (this.getRetryTimes() == null ? other.getRetryTimes() == null : this.getRetryTimes().equals(other.getRetryTimes()))
            && (this.getIsSent() == null ? other.getIsSent() == null : this.getIsSent().equals(other.getIsSent()))
            && (this.getSentDatetime() == null ? other.getSentDatetime() == null : this.getSentDatetime().equals(other.getSentDatetime()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getFrom() == null) ? 0 : getFrom().hashCode());
        result = prime * result + ((getRetryTimes() == null) ? 0 : getRetryTimes().hashCode());
        result = prime * result + ((getIsSent() == null) ? 0 : getIsSent().hashCode());
        result = prime * result + ((getSentDatetime() == null) ? 0 : getSentDatetime().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        return result;
    }
}