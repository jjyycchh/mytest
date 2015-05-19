package com.access.model.device;

import java.util.Date;

public class DhcpInfo {
    private Long id;

    private String userIp;

    private String mac;

    private String status;

    private String pvlanId;

    private String cvlanId;

    private String attribute;

    private Date offlineDatetime;

    private Date createDatetime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserIp() {
        return userIp;
    }

    public void setUserIp(String userIp) {
        this.userIp = userIp == null ? null : userIp.trim();
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac == null ? null : mac.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getPvlanId() {
        return pvlanId;
    }

    public void setPvlanId(String pvlanId) {
        this.pvlanId = pvlanId == null ? null : pvlanId.trim();
    }

    public String getCvlanId() {
        return cvlanId;
    }

    public void setCvlanId(String cvlanId) {
        this.cvlanId = cvlanId == null ? null : cvlanId.trim();
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute == null ? null : attribute.trim();
    }

    public Date getOfflineDatetime() {
        return offlineDatetime;
    }

    public void setOfflineDatetime(Date offlineDatetime) {
        this.offlineDatetime = offlineDatetime;
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
        DhcpInfo other = (DhcpInfo) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getUserIp() == null ? other.getUserIp() == null : this.getUserIp().equals(other.getUserIp()))
            && (this.getMac() == null ? other.getMac() == null : this.getMac().equals(other.getMac()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getPvlanId() == null ? other.getPvlanId() == null : this.getPvlanId().equals(other.getPvlanId()))
            && (this.getCvlanId() == null ? other.getCvlanId() == null : this.getCvlanId().equals(other.getCvlanId()))
            && (this.getAttribute() == null ? other.getAttribute() == null : this.getAttribute().equals(other.getAttribute()))
            && (this.getOfflineDatetime() == null ? other.getOfflineDatetime() == null : this.getOfflineDatetime().equals(other.getOfflineDatetime()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getUserIp() == null) ? 0 : getUserIp().hashCode());
        result = prime * result + ((getMac() == null) ? 0 : getMac().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getPvlanId() == null) ? 0 : getPvlanId().hashCode());
        result = prime * result + ((getCvlanId() == null) ? 0 : getCvlanId().hashCode());
        result = prime * result + ((getAttribute() == null) ? 0 : getAttribute().hashCode());
        result = prime * result + ((getOfflineDatetime() == null) ? 0 : getOfflineDatetime().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        return result;
    }
}