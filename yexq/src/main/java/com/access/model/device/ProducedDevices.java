package com.access.model.device;

import java.util.Date;

public class ProducedDevices {
    private String mac;

    private String id;
    
    private Long emsDevId;
    
    private Date emsCreateDatetime;
    
    private Long deviceModelId;

    private String brand;

    private String model;

    private String framewareVersion;

    private String componentVersion;

    private String pinCode;

    private String configItems;

    private String province;

    private String city;

    private String county;

    private Date createDatetime;

    private String status;
    
    private Long manufacturerId;
    
	private String xpos;
    
    private String ypos;
    
    private String fixAddr;

	public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac == null ? null : mac.trim();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
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

    public String getFramewareVersion() {
        return framewareVersion;
    }

    public void setFramewareVersion(String framewareVersion) {
        this.framewareVersion = framewareVersion == null ? null : framewareVersion.trim();
    }

    public String getComponentVersion() {
        return componentVersion;
    }

    public void setComponentVersion(String componentVersion) {
        this.componentVersion = componentVersion == null ? null : componentVersion.trim();
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode == null ? null : pinCode.trim();
    }

    public String getConfigItems() {
        return configItems;
    }

    public void setConfigItems(String configItems) {
        this.configItems = configItems == null ? null : configItems.trim();
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province == null ? null : province.trim();
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city == null ? null : city.trim();
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county == null ? null : county.trim();
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }
    
    public Long getManufacturerId() {
		return manufacturerId;
	}

	public void setManufacturerId(Long manufacturerId) {
		this.manufacturerId = manufacturerId;
	}

	 public String getXpos() {
			return xpos;
	}

	public void setXpos(String xpos) {
		this.xpos = xpos;
	}

	public String getYpos() {
		return ypos;
	}

	public void setYpos(String ypos) {
		this.ypos = ypos;
	}

	public String getFixAddr() {
		return fixAddr;
	}

	public void setFixAddr(String fixAddr) {
		this.fixAddr = fixAddr;
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
        ProducedDevices other = (ProducedDevices) that;
        return (this.getMac() == null ? other.getMac() == null : this.getMac().equals(other.getMac()))
            && (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getDeviceModelId() == null ? other.getDeviceModelId() == null : this.getDeviceModelId().equals(other.getDeviceModelId()))
            && (this.getBrand() == null ? other.getBrand() == null : this.getBrand().equals(other.getBrand()))
            && (this.getModel() == null ? other.getModel() == null : this.getModel().equals(other.getModel()))
            && (this.getFramewareVersion() == null ? other.getFramewareVersion() == null : this.getFramewareVersion().equals(other.getFramewareVersion()))
            && (this.getComponentVersion() == null ? other.getComponentVersion() == null : this.getComponentVersion().equals(other.getComponentVersion()))
            && (this.getPinCode() == null ? other.getPinCode() == null : this.getPinCode().equals(other.getPinCode()))
            && (this.getConfigItems() == null ? other.getConfigItems() == null : this.getConfigItems().equals(other.getConfigItems()))
            && (this.getProvince() == null ? other.getProvince() == null : this.getProvince().equals(other.getProvince()))
            && (this.getCity() == null ? other.getCity() == null : this.getCity().equals(other.getCity()))
            && (this.getCounty() == null ? other.getCounty() == null : this.getCounty().equals(other.getCounty()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getManufacturerId() == null ? other.getManufacturerId() == null : this.getManufacturerId().equals(other.getManufacturerId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getMac() == null) ? 0 : getMac().hashCode());
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getDeviceModelId() == null) ? 0 : getDeviceModelId().hashCode());
        result = prime * result + ((getBrand() == null) ? 0 : getBrand().hashCode());
        result = prime * result + ((getModel() == null) ? 0 : getModel().hashCode());
        result = prime * result + ((getFramewareVersion() == null) ? 0 : getFramewareVersion().hashCode());
        result = prime * result + ((getComponentVersion() == null) ? 0 : getComponentVersion().hashCode());
        result = prime * result + ((getPinCode() == null) ? 0 : getPinCode().hashCode());
        result = prime * result + ((getConfigItems() == null) ? 0 : getConfigItems().hashCode());
        result = prime * result + ((getProvince() == null) ? 0 : getProvince().hashCode());
        result = prime * result + ((getCity() == null) ? 0 : getCity().hashCode());
        result = prime * result + ((getCounty() == null) ? 0 : getCounty().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getManufacturerId() == null) ? 0 : getManufacturerId().hashCode());
        return result;
    }
    
    ////////////////////////////////////////////////
    //关联账户表
    private String fullname;
    private String dmBrand;
	private String dmModel;

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	
	public String getDmBrand() {
		return dmBrand;
	}

	public void setDmBrand(String dmBrand) {
		this.dmBrand = dmBrand;
	}

	public String getDmModel() {
		return dmModel;
	}

	public void setDmModel(String dmModel) {
		this.dmModel = dmModel;
	}
	
	public Long getEmsDevId() {
		return emsDevId;
	}

	public void setEmsDevId(Long emsDevId) {
		this.emsDevId = emsDevId;
	}

	public Date getEmsCreateDatetime() {
		return emsCreateDatetime;
	}

	public void setEmsCreateDatetime(Date emsCreateDatetime) {
		this.emsCreateDatetime = emsCreateDatetime;
	}

	//////////////////////////////////////////////////
	//修改全部数据
	private String macNew;

	public String getMacNew() {
		return macNew;
	}

	public void setMacNew(String macNew) {
		this.macNew = macNew;
	}

}