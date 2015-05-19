package com.access.model.merchant;

import java.util.Date;

public class DeviceDisplayPlan {
    private Long id;

    private String deviceDeviceId;

    private Long portalSiteId;

    private Float clock;

    private Date effon;

    private Date effend;

    private Date createDatetime;

    private Long latestUpdateAccountId;

    private Date latestUpdateDatetime;

    private Long latestUpdatePolicyId;

    public void fullCopyFrom(DeviceDisplayPlan plan) {
    	this.id = plan.getId();
    	this.deviceDeviceId = plan.getDeviceDeviceId();
    	this.portalSiteId = plan.getPortalSiteId();
    	this.clock = plan.getClock();
    	this.effon = plan.getEffon();
    	this.effend = plan.getEffend();
    	this.createDatetime = plan.getCreateDatetime();
    	this.latestUpdateAccountId = plan.getLatestUpdateAccountId();
    	this.latestUpdateDatetime = plan.getLatestUpdateDatetime();
    	this.latestUpdatePolicyId = plan.getLatestUpdatePolicyId();
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeviceDeviceId() {
        return deviceDeviceId;
    }

    public void setDeviceDeviceId(String deviceDeviceId) {
        this.deviceDeviceId = deviceDeviceId == null ? null : deviceDeviceId.trim();
    }

    public Long getPortalSiteId() {
        return portalSiteId;
    }

    public void setPortalSiteId(Long portalSiteId) {
        this.portalSiteId = portalSiteId;
    }

    public Float getClock() {
        return clock;
    }

    public void setClock(Float clock) {
        this.clock = clock;
    }

    public Date getEffon() {
        return effon;
    }

    public void setEffon(Date effon) {
        this.effon = effon;
    }

    public Date getEffend() {
        return effend;
    }

    public void setEffend(Date effend) {
        this.effend = effend;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Long getLatestUpdateAccountId() {
        return latestUpdateAccountId;
    }

    public void setLatestUpdateAccountId(Long latestUpdateAccountId) {
        this.latestUpdateAccountId = latestUpdateAccountId;
    }

    public Date getLatestUpdateDatetime() {
        return latestUpdateDatetime;
    }

    public void setLatestUpdateDatetime(Date latestUpdateDatetime) {
        this.latestUpdateDatetime = latestUpdateDatetime;
    }

    public Long getLatestUpdatePolicyId() {
        return latestUpdatePolicyId;
    }

    public void setLatestUpdatePolicyId(Long latestUpdatePolicyId) {
        this.latestUpdatePolicyId = latestUpdatePolicyId;
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
        DeviceDisplayPlan other = (DeviceDisplayPlan) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getDeviceDeviceId() == null ? other.getDeviceDeviceId() == null : this.getDeviceDeviceId().equals(other.getDeviceDeviceId()))
            && (this.getPortalSiteId() == null ? other.getPortalSiteId() == null : this.getPortalSiteId().equals(other.getPortalSiteId()))
            && (this.getClock() == null ? other.getClock() == null : this.getClock().equals(other.getClock()))
            && (this.getEffon() == null ? other.getEffon() == null : this.getEffon().equals(other.getEffon()))
            && (this.getEffend() == null ? other.getEffend() == null : this.getEffend().equals(other.getEffend()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getLatestUpdateAccountId() == null ? other.getLatestUpdateAccountId() == null : this.getLatestUpdateAccountId().equals(other.getLatestUpdateAccountId()))
            && (this.getLatestUpdateDatetime() == null ? other.getLatestUpdateDatetime() == null : this.getLatestUpdateDatetime().equals(other.getLatestUpdateDatetime()))
            && (this.getLatestUpdatePolicyId() == null ? other.getLatestUpdatePolicyId() == null : this.getLatestUpdatePolicyId().equals(other.getLatestUpdatePolicyId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getDeviceDeviceId() == null) ? 0 : getDeviceDeviceId().hashCode());
        result = prime * result + ((getPortalSiteId() == null) ? 0 : getPortalSiteId().hashCode());
        result = prime * result + ((getClock() == null) ? 0 : getClock().hashCode());
        result = prime * result + ((getEffon() == null) ? 0 : getEffon().hashCode());
        result = prime * result + ((getEffend() == null) ? 0 : getEffend().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getLatestUpdateAccountId() == null) ? 0 : getLatestUpdateAccountId().hashCode());
        result = prime * result + ((getLatestUpdateDatetime() == null) ? 0 : getLatestUpdateDatetime().hashCode());
        result = prime * result + ((getLatestUpdatePolicyId() == null) ? 0 : getLatestUpdatePolicyId().hashCode());
        return result;
    }
}