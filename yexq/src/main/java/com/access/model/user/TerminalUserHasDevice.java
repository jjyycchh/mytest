package com.access.model.user;

public class TerminalUserHasDevice {
    private Long terminalUserId;

    private String deviceId;

    private String status;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
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
        TerminalUserHasDevice other = (TerminalUserHasDevice) that;
        return (this.getTerminalUserId() == null ? other.getTerminalUserId() == null : this.getTerminalUserId().equals(other.getTerminalUserId()))
            && (this.getDeviceId() == null ? other.getDeviceId() == null : this.getDeviceId().equals(other.getDeviceId()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getTerminalUserId() == null) ? 0 : getTerminalUserId().hashCode());
        result = prime * result + ((getDeviceId() == null) ? 0 : getDeviceId().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        return result;
    }
}