package com.access.model.user;

import java.util.Date;

public class TerminalUserRequestLog {
    private Long id;

    private String mac;

    private String destIp;

    private String destPort;

    private String sourceIp;

    private String sourcePort;

    private Date createDatetime;

    private Long terminalUserId;

    private String deviceId;

    private String url;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac == null ? null : mac.trim();
    }

    public String getDestIp() {
        return destIp;
    }

    public void setDestIp(String destIp) {
        this.destIp = destIp == null ? null : destIp.trim();
    }

    public String getDestPort() {
        return destPort;
    }

    public void setDestPort(String destPort) {
        this.destPort = destPort == null ? null : destPort.trim();
    }

    public String getSourceIp() {
        return sourceIp;
    }

    public void setSourceIp(String sourceIp) {
        this.sourceIp = sourceIp == null ? null : sourceIp.trim();
    }

    public String getSourcePort() {
        return sourcePort;
    }

    public void setSourcePort(String sourcePort) {
        this.sourcePort = sourcePort == null ? null : sourcePort.trim();
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Long getTerminalUserId() {
        return terminalUserId;
    }

    public void setTerminalUserId(Long terminalUserId) {
        this.terminalUserId = terminalUserId;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId == null ? null : deviceId.trim();
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
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
        TerminalUserRequestLog other = (TerminalUserRequestLog) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getMac() == null ? other.getMac() == null : this.getMac().equals(other.getMac()))
            && (this.getDestIp() == null ? other.getDestIp() == null : this.getDestIp().equals(other.getDestIp()))
            && (this.getDestPort() == null ? other.getDestPort() == null : this.getDestPort().equals(other.getDestPort()))
            && (this.getSourceIp() == null ? other.getSourceIp() == null : this.getSourceIp().equals(other.getSourceIp()))
            && (this.getSourcePort() == null ? other.getSourcePort() == null : this.getSourcePort().equals(other.getSourcePort()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getTerminalUserId() == null ? other.getTerminalUserId() == null : this.getTerminalUserId().equals(other.getTerminalUserId()))
            && (this.getDeviceId() == null ? other.getDeviceId() == null : this.getDeviceId().equals(other.getDeviceId()))
            && (this.getUrl() == null ? other.getUrl() == null : this.getUrl().equals(other.getUrl()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getMac() == null) ? 0 : getMac().hashCode());
        result = prime * result + ((getDestIp() == null) ? 0 : getDestIp().hashCode());
        result = prime * result + ((getDestPort() == null) ? 0 : getDestPort().hashCode());
        result = prime * result + ((getSourceIp() == null) ? 0 : getSourceIp().hashCode());
        result = prime * result + ((getSourcePort() == null) ? 0 : getSourcePort().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getTerminalUserId() == null) ? 0 : getTerminalUserId().hashCode());
        result = prime * result + ((getDeviceId() == null) ? 0 : getDeviceId().hashCode());
        result = prime * result + ((getUrl() == null) ? 0 : getUrl().hashCode());
        return result;
    }
}