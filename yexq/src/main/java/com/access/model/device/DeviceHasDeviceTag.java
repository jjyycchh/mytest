package com.access.model.device;

public class DeviceHasDeviceTag {
    private String deviceId;

    private Long deviceTagId;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId == null ? null : deviceId.trim();
    }

    public Long getDeviceTagId() {
        return deviceTagId;
    }

    public void setDeviceTagId(Long deviceTagId) {
        this.deviceTagId = deviceTagId;
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
        DeviceHasDeviceTag other = (DeviceHasDeviceTag) that;
        return (this.getDeviceId() == null ? other.getDeviceId() == null : this.getDeviceId().equals(other.getDeviceId()))
            && (this.getDeviceTagId() == null ? other.getDeviceTagId() == null : this.getDeviceTagId().equals(other.getDeviceTagId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getDeviceId() == null) ? 0 : getDeviceId().hashCode());
        result = prime * result + ((getDeviceTagId() == null) ? 0 : getDeviceTagId().hashCode());
        return result;
    }
}