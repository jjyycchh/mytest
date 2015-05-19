package com.access.model.device;

public class DeviceStatusLogKey {
    private Long id;

    private String deviceDeviceId;

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
        DeviceStatusLogKey other = (DeviceStatusLogKey) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getDeviceDeviceId() == null ? other.getDeviceDeviceId() == null : this.getDeviceDeviceId().equals(other.getDeviceDeviceId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getDeviceDeviceId() == null) ? 0 : getDeviceDeviceId().hashCode());
        return result;
    }
}