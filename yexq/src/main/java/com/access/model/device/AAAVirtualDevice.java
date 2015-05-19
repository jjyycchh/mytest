package com.access.model.device;

import java.util.Date;

public class AAAVirtualDevice {
	private Long id;
	
	private String deviceId;
	
    private String wlanacname;

    private String ipAddr;

    private Integer port;

    private String registSecret;
    
    private String authSecret;

    private String accountingSecret;

    private String name;

    private String description;

    private Date createDatetime;

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWlanacname() {
        return wlanacname;
    }

    public void setWlanacname(String wlanacname) {
        this.wlanacname = wlanacname == null ? null : wlanacname.trim();
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId == null ? null : deviceId.trim();
    }

    public String getIpAddr() {
        return ipAddr;
    }

    public void setIpAddr(String ipAddr) {
        this.ipAddr = ipAddr == null ? null : ipAddr.trim();
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getRegistSecret() {
		return registSecret;
	}

	public void setRegistSecret(String registSecret) {
		this.registSecret = registSecret;
	}
	
    public String getAuthSecret() {
        return authSecret;
    }

    public void setAuthSecret(String authSecret) {
        this.authSecret = authSecret == null ? null : authSecret.trim();
    }

    public String getAccountingSecret() {
        return accountingSecret;
    }

    public void setAccountingSecret(String accountingSecret) {
        this.accountingSecret = accountingSecret == null ? null : accountingSecret.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
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
        AAAVirtualDevice other = (AAAVirtualDevice) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getWlanacname() == null ? other.getWlanacname() == null : this.getWlanacname().equals(other.getWlanacname()))
            && (this.getDeviceId() == null ? other.getDeviceId() == null : this.getDeviceId().equals(other.getDeviceId()))
            && (this.getIpAddr() == null ? other.getIpAddr() == null : this.getIpAddr().equals(other.getIpAddr()))
            && (this.getPort() == null ? other.getPort() == null : this.getPort().equals(other.getPort()))
            && (this.getRegistSecret() == null ? other.getRegistSecret() == null : this.getRegistSecret().equals(other.getRegistSecret()))
            && (this.getAuthSecret() == null ? other.getAuthSecret() == null : this.getAuthSecret().equals(other.getAuthSecret()))
            && (this.getAccountingSecret() == null ? other.getAccountingSecret() == null : this.getAccountingSecret().equals(other.getAccountingSecret()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getWlanacname() == null) ? 0 : getWlanacname().hashCode());
        result = prime * result + ((getDeviceId() == null) ? 0 : getDeviceId().hashCode());
        result = prime * result + ((getIpAddr() == null) ? 0 : getIpAddr().hashCode());
        result = prime * result + ((getPort() == null) ? 0 : getPort().hashCode());
        result = prime * result + ((getRegistSecret() == null) ? 0 : getRegistSecret().hashCode());
        result = prime * result + ((getAuthSecret() == null) ? 0 : getAuthSecret().hashCode());
        result = prime * result + ((getAccountingSecret() == null) ? 0 : getAccountingSecret().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        return result;
    }
    
    /************************* 虚拟设备管理 ***********************/
    private Long locationId;
    private String deviceProvince;
    private String deviceCity;
    private String deviceCountyDistrict;
    private String deviceAddress;
    private Long accountId;
    private String accountUsername;
    private String accountType;
    private String accountMerchantName;
    
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

	private String accountFullname;

	public Long getLocationId() {
		return locationId;
	}

	public void setLocationId(Long locationId) {
		this.locationId = locationId;
	}

	public String getDeviceProvince() {
		return deviceProvince;
	}

	public void setDeviceProvince(String deviceProvince) {
		this.deviceProvince = deviceProvince;
	}

	public String getDeviceCity() {
		return deviceCity;
	}

	public void setDeviceCity(String deviceCity) {
		this.deviceCity = deviceCity;
	}

	public String getDeviceCountyDistrict() {
		return deviceCountyDistrict;
	}

	public void setDeviceCountyDistrict(String deviceCountyDistrict) {
		this.deviceCountyDistrict = deviceCountyDistrict;
	}

	public String getDeviceAddress() {
		return deviceAddress;
	}

	public void setDeviceAddress(String deviceAddress) {
		this.deviceAddress = deviceAddress;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getAccountUsername() {
		return accountUsername;
	}

	public void setAccountUsername(String accountUsername) {
		this.accountUsername = accountUsername;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
}
