package com.access.model.device;

public class DeviceWithBLOBs extends Device {
    private String startupTask;

    private String configItems;

    public String getStartupTask() {
        return startupTask;
    }

    public void setStartupTask(String startupTask) {
        this.startupTask = startupTask == null ? null : startupTask.trim();
    }

    public String getConfigItems() {
        return configItems;
    }

    public void setConfigItems(String configItems) {
        this.configItems = configItems == null ? null : configItems.trim();
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
        DeviceWithBLOBs other = (DeviceWithBLOBs) that;
        return (this.getDeviceId() == null ? other.getDeviceId() == null : this.getDeviceId().equals(other.getDeviceId()))
            && (this.getDeviceModelId() == null ? other.getDeviceModelId() == null : this.getDeviceModelId().equals(other.getDeviceModelId()))
            && (this.getBrand() == null ? other.getBrand() == null : this.getBrand().equals(other.getBrand()))
            && (this.getModel() == null ? other.getModel() == null : this.getModel().equals(other.getModel()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getFramewareVersion() == null ? other.getFramewareVersion() == null : this.getFramewareVersion().equals(other.getFramewareVersion()))
            && (this.getComponentId() == null ? other.getComponentId() == null : this.getComponentId().equals(other.getComponentId()))
            && (this.getLocationId() == null ? other.getLocationId() == null : this.getLocationId().equals(other.getLocationId()))
            && (this.getWanProtocol() == null ? other.getWanProtocol() == null : this.getWanProtocol().equals(other.getWanProtocol()))
            && (this.getLastOnlineDatetime() == null ? other.getLastOnlineDatetime() == null : this.getLastOnlineDatetime().equals(other.getLastOnlineDatetime()))
            && (this.getRegisterationDate() == null ? other.getRegisterationDate() == null : this.getRegisterationDate().equals(other.getRegisterationDate()))
            && (this.getMac() == null ? other.getMac() == null : this.getMac().equals(other.getMac()))
            && (this.getPublicIp() == null ? other.getPublicIp() == null : this.getPublicIp().equals(other.getPublicIp()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getManufacturerId() == null ? other.getManufacturerId() == null : this.getManufacturerId().equals(other.getManufacturerId()))
            && (this.getTrafficLimit() == null ? other.getTrafficLimit() == null : this.getTrafficLimit().equals(other.getTrafficLimit()))
            && (this.getMinsLimit() == null ? other.getMinsLimit() == null : this.getMinsLimit().equals(other.getMinsLimit()))
            && (this.getTelcomAccount() == null ? other.getTelcomAccount() == null : this.getTelcomAccount().equals(other.getTelcomAccount()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getStartupTask() == null ? other.getStartupTask() == null : this.getStartupTask().equals(other.getStartupTask()))
            && (this.getConfigItems() == null ? other.getConfigItems() == null : this.getConfigItems().equals(other.getConfigItems()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getDeviceId() == null) ? 0 : getDeviceId().hashCode());
        result = prime * result + ((getDeviceModelId() == null) ? 0 : getDeviceModelId().hashCode());
        result = prime * result + ((getBrand() == null) ? 0 : getBrand().hashCode());
        result = prime * result + ((getModel() == null) ? 0 : getModel().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getFramewareVersion() == null) ? 0 : getFramewareVersion().hashCode());
        result = prime * result + ((getComponentId() == null) ? 0 : getComponentId().hashCode());
        result = prime * result + ((getLocationId() == null) ? 0 : getLocationId().hashCode());
        result = prime * result + ((getWanProtocol() == null) ? 0 : getWanProtocol().hashCode());
        result = prime * result + ((getLastOnlineDatetime() == null) ? 0 : getLastOnlineDatetime().hashCode());
        result = prime * result + ((getRegisterationDate() == null) ? 0 : getRegisterationDate().hashCode());
        result = prime * result + ((getMac() == null) ? 0 : getMac().hashCode());
        result = prime * result + ((getPublicIp() == null) ? 0 : getPublicIp().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getManufacturerId() == null) ? 0 : getManufacturerId().hashCode());
        result = prime * result + ((getTrafficLimit() == null) ? 0 : getTrafficLimit().hashCode());
        result = prime * result + ((getMinsLimit() == null) ? 0 : getMinsLimit().hashCode());
        result = prime * result + ((getTelcomAccount() == null) ? 0 : getTelcomAccount().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getStartupTask() == null) ? 0 : getStartupTask().hashCode());
        result = prime * result + ((getConfigItems() == null) ? 0 : getConfigItems().hashCode());
        return result;
    }
}