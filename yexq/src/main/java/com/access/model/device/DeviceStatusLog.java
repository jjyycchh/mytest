package com.access.model.device;

import java.util.Date;

public class DeviceStatusLog {
    private Long id;

    private String logType;

    private String type;

    private String statusMessage;

    private Long upTraffic;

    private Long downTraffic;

    private Date createDatetime;

    private String deviceId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogType() {
        return logType;
    }

    public void setLogType(String logType) {
        this.logType = logType == null ? null : logType.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage == null ? null : statusMessage.trim();
    }

    public Long getUpTraffic() {
        return upTraffic;
    }

    public void setUpTraffic(Long upTraffic) {
        this.upTraffic = upTraffic;
    }

    public Long getDownTraffic() {
        return downTraffic;
    }

    public void setDownTraffic(Long downTraffic) {
        this.downTraffic = downTraffic;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId == null ? null : deviceId.trim();
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
        DeviceStatusLog other = (DeviceStatusLog) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getLogType() == null ? other.getLogType() == null : this.getLogType().equals(other.getLogType()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getStatusMessage() == null ? other.getStatusMessage() == null : this.getStatusMessage().equals(other.getStatusMessage()))
            && (this.getUpTraffic() == null ? other.getUpTraffic() == null : this.getUpTraffic().equals(other.getUpTraffic()))
            && (this.getDownTraffic() == null ? other.getDownTraffic() == null : this.getDownTraffic().equals(other.getDownTraffic()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getDeviceId() == null ? other.getDeviceId() == null : this.getDeviceId().equals(other.getDeviceId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getLogType() == null) ? 0 : getLogType().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getStatusMessage() == null) ? 0 : getStatusMessage().hashCode());
        result = prime * result + ((getUpTraffic() == null) ? 0 : getUpTraffic().hashCode());
        result = prime * result + ((getDownTraffic() == null) ? 0 : getDownTraffic().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getDeviceId() == null) ? 0 : getDeviceId().hashCode());
        return result;
    }
}