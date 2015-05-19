package com.access.model.device;

public class FitApVirtualDevice {
    private Long id;

    private String ssid;

    private String acDeviceId;

    private String apMac;

    private String deviceId;

    private String createDatetime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSsid() {
        return ssid;
    }

    public void setSsid(String ssid) {
        this.ssid = ssid == null ? null : ssid.trim();
    }

    public String getAcDeviceId() {
        return acDeviceId;
    }

    public void setAcDeviceId(String acDeviceId) {
        this.acDeviceId = acDeviceId == null ? null : acDeviceId.trim();
    }

    public String getApMac() {
        return apMac;
    }

    public void setApMac(String apMac) {
        this.apMac = apMac == null ? null : apMac.trim();
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId == null ? null : deviceId.trim();
    }

    public String getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(String createDatetime) {
        this.createDatetime = createDatetime == null ? null : createDatetime.trim();
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
        FitApVirtualDevice other = (FitApVirtualDevice) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getSsid() == null ? other.getSsid() == null : this.getSsid().equals(other.getSsid()))
            && (this.getAcDeviceId() == null ? other.getAcDeviceId() == null : this.getAcDeviceId().equals(other.getAcDeviceId()))
            && (this.getApMac() == null ? other.getApMac() == null : this.getApMac().equals(other.getApMac()))
            && (this.getDeviceId() == null ? other.getDeviceId() == null : this.getDeviceId().equals(other.getDeviceId()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getSsid() == null) ? 0 : getSsid().hashCode());
        result = prime * result + ((getAcDeviceId() == null) ? 0 : getAcDeviceId().hashCode());
        result = prime * result + ((getApMac() == null) ? 0 : getApMac().hashCode());
        result = prime * result + ((getDeviceId() == null) ? 0 : getDeviceId().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        return result;
    }
    
    private String wlanacname;

	public String getWlanacname() {
		return wlanacname;
	}

	public void setWlanacname(String wlanacname) {
		this.wlanacname = wlanacname;
	}
}