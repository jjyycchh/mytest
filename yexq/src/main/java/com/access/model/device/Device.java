package com.access.model.device;

import java.util.Date;

public class Device {
    private String deviceId;

    private Long emsDevId;
    
    private Long deviceModelId;

    private String brand;

    private String model;

    private String name;

    private String status;

    private String framewareVersion;

    private Long componentId;

    private Long locationId;

    private String wanProtocol;

    private Date lastOnlineDatetime;

    private Date registerationDate;

    private String mac;

    private String publicIp;

    private Date createDatetime;

    private Long manufacturerId;

    private Integer trafficLimit;

    private Integer minsLimit;

    private String telcomAccount;

    private String type;
    
    private Date emsCreateDatetime;
    
    private String xPos;

    private String yPos;
    
    private String fixAddr;
    
    private Long groupId;
    
    private String groupName;
    
    public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public Date getEmsCreateDatetime() {
		return emsCreateDatetime;
	}

	public void setEmsCreateDatetime(Date emsCreateDatetime) {
		this.emsCreateDatetime = emsCreateDatetime;
	}

	public String getXPos() {
		return xPos;
	}

	public void setXPos(String xPos) {
		this.xPos = xPos;
	}

	public String getYPos() {
		return yPos;
	}

	public void setYPos(String yPos) {
		this.yPos = yPos;
	}

	public String getFixAddr() {
		return fixAddr;
	}

	public void setFixAddr(String fixAddr) {
		this.fixAddr = fixAddr;
	}

	public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId == null ? null : deviceId.trim();
    }


	public Long getEmsDevId() {
		return emsDevId;
	}

	public void setEmsDevId(Long emsDevId) {
		this.emsDevId = emsDevId;
	}

	public Long getDeviceModelId() {
        return deviceModelId;
    }

    public void setDeviceModelId(Long deviceModelId) {
        this.deviceModelId = deviceModelId;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand == null ? null : brand.trim();
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model == null ? null : model.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getFramewareVersion() {
        return framewareVersion;
    }

    public void setFramewareVersion(String framewareVersion) {
        this.framewareVersion = framewareVersion == null ? null : framewareVersion.trim();
    }

    public Long getComponentId() {
        return componentId;
    }

    public void setComponentId(Long componentId) {
        this.componentId = componentId;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getWanProtocol() {
        return wanProtocol;
    }

    public void setWanProtocol(String wanProtocol) {
        this.wanProtocol = wanProtocol == null ? null : wanProtocol.trim();
    }

    public Date getLastOnlineDatetime() {
        return lastOnlineDatetime;
    }

    public void setLastOnlineDatetime(Date lastOnlineDatetime) {
        this.lastOnlineDatetime = lastOnlineDatetime;
    }

    public Date getRegisterationDate() {
        return registerationDate;
    }

    public void setRegisterationDate(Date registerationDate) {
        this.registerationDate = registerationDate;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac == null ? null : mac.trim();
    }

    public String getPublicIp() {
        return publicIp;
    }

    public void setPublicIp(String publicIp) {
        this.publicIp = publicIp == null ? null : publicIp.trim();
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Long getManufacturerId() {
        return manufacturerId;
    }

    public void setManufacturerId(Long manufacturerId) {
        this.manufacturerId = manufacturerId;
    }

    public Integer getTrafficLimit() {
        return trafficLimit;
    }

    public void setTrafficLimit(Integer trafficLimit) {
        this.trafficLimit = trafficLimit;
    }

    public Integer getMinsLimit() {
        return minsLimit;
    }

    public void setMinsLimit(Integer minsLimit) {
        this.minsLimit = minsLimit;
    }

    public String getTelcomAccount() {
        return telcomAccount;
    }

    public void setTelcomAccount(String telcomAccount) {
        this.telcomAccount = telcomAccount == null ? null : telcomAccount.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
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
        Device other = (Device) that;
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
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()));
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
        return result;
    }
    
    /** ==================================================== */
    private String locationName;
    private String locationAdress;
    private Float latitude;
    private Float longitude;
    private String merchantName;
    private Long upTraffic;
    private Long downTraffic;
    private Long accountId;
    private String geoLocation;
    private String sysLoad;
    private String sysMemfree; 
	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	public String getLocationAdress() {
		return locationAdress;
	}

	public void setLocationAdress(String locationAdress) {
		this.locationAdress = locationAdress;
	}

	public Float getLatitude() {
		return latitude;
	}

	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	public Float getLongitude() {
		return longitude;
	}

	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
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

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getGeoLocation() {
		return geoLocation;
	}

	public void setGeoLocation(String geoLocation) {
		this.geoLocation = geoLocation;
	}

	public String getSysLoad() {
		return sysLoad;
	}

	public void setSysLoad(String sysLoad) {
		this.sysLoad = sysLoad;
	}

	public String getSysMemfree() {
		return sysMemfree;
	}

	public void setSysMemfree(String sysMemfree) {
		this.sysMemfree = sysMemfree;
	}
	
	
	/******************获得设备位置信息****************/
	
	private String country;
	private String province;
	private String city;
	private String countyDistrict;
	private String address;
	private String accountUsername;
	private String accountMerchantName;
	private String accountFullname;
	private String accountType;
	private String componentVersion;
	
	public String getComponentVersion() {
		return componentVersion;
	}

	public void setComponentVersion(String componentVersion) {
		this.componentVersion = componentVersion;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public String getAccountUsername() {
		return accountUsername;
	}

	public void setAccountUsername(String accountUsername) {
		this.accountUsername = accountUsername;
	}

	public String getAccountMerchantName() {
		return accountMerchantName;
	}

	public void setAccountMerchantName(String accountMerchantName) {
		this.accountMerchantName = accountMerchantName;
	}

	public String getAccountFullname() {
		return accountFullname;
	}

	public void setAccountFullname(String accountFullname) {
		this.accountFullname = accountFullname;
	}

	
    public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCountyDistrict() {
		return countyDistrict;
	}

	public void setCountyDistrict(String countyDistrict) {
		this.countyDistrict = countyDistrict;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

    public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}
}