package com.access.model.device;

import java.util.Date;

public class TelecomVirtualDevice {
    private Long id;

    private String pvlanId;

    private String cvlanId;

    private String domain;

    private String ethPort;

    private String name;

    private String description;

    private String deviceId;

    private Long accountId;

    private String telecomAccount;

    private Date createDatetime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPvlanId() {
        return pvlanId;
    }

    public void setPvlanId(String pvlanId) {
        this.pvlanId = pvlanId == null ? null : pvlanId.trim();
    }

    public String getCvlanId() {
        return cvlanId;
    }

    public void setCvlanId(String cvlanId) {
        this.cvlanId = cvlanId == null ? null : cvlanId.trim();
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain == null ? null : domain.trim();
    }

    public String getEthPort() {
        return ethPort;
    }

    public void setEthPort(String ethPort) {
        this.ethPort = ethPort == null ? null : ethPort.trim();
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

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId == null ? null : deviceId.trim();
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getTelecomAccount() {
        return telecomAccount;
    }

    public void setTelecomAccount(String telecomAccount) {
        this.telecomAccount = telecomAccount == null ? null : telecomAccount.trim();
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreatedatetime(Date createDatetime) {
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
        TelecomVirtualDevice other = (TelecomVirtualDevice) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getPvlanId() == null ? other.getPvlanId() == null : this.getPvlanId().equals(other.getPvlanId()))
            && (this.getCvlanId() == null ? other.getCvlanId() == null : this.getCvlanId().equals(other.getCvlanId()))
            && (this.getDomain() == null ? other.getDomain() == null : this.getDomain().equals(other.getDomain()))
            && (this.getEthPort() == null ? other.getEthPort() == null : this.getEthPort().equals(other.getEthPort()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getDeviceId() == null ? other.getDeviceId() == null : this.getDeviceId().equals(other.getDeviceId()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()))
            && (this.getTelecomAccount() == null ? other.getTelecomAccount() == null : this.getTelecomAccount().equals(other.getTelecomAccount()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getPvlanId() == null) ? 0 : getPvlanId().hashCode());
        result = prime * result + ((getCvlanId() == null) ? 0 : getCvlanId().hashCode());
        result = prime * result + ((getDomain() == null) ? 0 : getDomain().hashCode());
        result = prime * result + ((getEthPort() == null) ? 0 : getEthPort().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getDeviceId() == null) ? 0 : getDeviceId().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        result = prime * result + ((getTelecomAccount() == null) ? 0 : getTelecomAccount().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        return result;
    }
    /** ====================*/
     
	private String deviceName;
	private Long locationId;
	private String country;
	private String province;
	private String city;
	private String countyDistrict;
	private String address;
	private String accountType;
	private String username;
	private String fullname;
	private String merchantName;

	public String getDeviceName() {
		return deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public Long getLocationId() {
		return locationId;
	}

	public void setLocationId(Long locationId) {
		this.locationId = locationId;
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

	public String getCountyDistrict() {
		return countyDistrict;
	}

	public void setCountyDistrict(String countyDistrict) {
		this.countyDistrict = countyDistrict;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}
     
     
     
}