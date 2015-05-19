package com.access.model.merchant;

import java.util.Date;

public class PortalDisplayPolicy {
    private Long id;

    private String name;

    private Long accountId;

    private String status;

    private Date latestUpdateDatetime;

    private Long latestUpdateAccountId;

    private Date createDatetime;

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

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public Date getLatestUpdateDatetime() {
        return latestUpdateDatetime;
    }

    public void setLatestUpdateDatetime(Date latestUpdateDatetime) {
        this.latestUpdateDatetime = latestUpdateDatetime;
    }

    public Long getLatestUpdateAccountId() {
        return latestUpdateAccountId;
    }

    public void setLatestUpdateAccountId(Long latestUpdateAccountId) {
        this.latestUpdateAccountId = latestUpdateAccountId;
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
        PortalDisplayPolicy other = (PortalDisplayPolicy) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getLatestUpdateDatetime() == null ? other.getLatestUpdateDatetime() == null : this.getLatestUpdateDatetime().equals(other.getLatestUpdateDatetime()))
            && (this.getLatestUpdateAccountId() == null ? other.getLatestUpdateAccountId() == null : this.getLatestUpdateAccountId().equals(other.getLatestUpdateAccountId()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getLatestUpdateDatetime() == null) ? 0 : getLatestUpdateDatetime().hashCode());
        result = prime * result + ((getLatestUpdateAccountId() == null) ? 0 : getLatestUpdateAccountId().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        return result;
    }
}