package com.access.model.system;

import java.util.Date;

public class ThirdPlatform {
    private Long id;

    private String name;

    private String domain;

    private String ipAddr;

    private String ipPort;

    private String phone;

    private String province;

    private String city;

    private String county;

    private String userOnlineUrl;

    private String userOfflineUrl;

    private String description;

    private String platformCode;

    private String welcomeUrl;

    private Date createDatetime;

    private String appAuthType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain == null ? null : domain.trim();
    }

    public String getIpAddr() {
        return ipAddr;
    }

    public void setIpAddr(String ipAddr) {
        this.ipAddr = ipAddr == null ? null : ipAddr.trim();
    }

    public String getIpPort() {
        return ipPort;
    }

    public void setIpPort(String ipPort) {
        this.ipPort = ipPort == null ? null : ipPort.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
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

    public String getUserOnlineUrl() {
        return userOnlineUrl;
    }

    public void setUserOnlineUrl(String userOnlineUrl) {
        this.userOnlineUrl = userOnlineUrl == null ? null : userOnlineUrl.trim();
    }

    public String getUserOfflineUrl() {
        return userOfflineUrl;
    }

    public void setUserOfflineUrl(String userOfflineUrl) {
        this.userOfflineUrl = userOfflineUrl == null ? null : userOfflineUrl.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getPlatformCode() {
        return platformCode;
    }

    public void setPlatformCode(String platformCode) {
        this.platformCode = platformCode == null ? null : platformCode.trim();
    }

    public String getWelcomeUrl() {
        return welcomeUrl;
    }

    public void setWelcomeUrl(String welcomeUrl) {
        this.welcomeUrl = welcomeUrl == null ? null : welcomeUrl.trim();
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public String getAppAuthType() {
        return appAuthType;
    }

    public void setAppAuthType(String appAuthType) {
        this.appAuthType = appAuthType == null ? null : appAuthType.trim();
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
        ThirdPlatform other = (ThirdPlatform) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getDomain() == null ? other.getDomain() == null : this.getDomain().equals(other.getDomain()))
            && (this.getIpAddr() == null ? other.getIpAddr() == null : this.getIpAddr().equals(other.getIpAddr()))
            && (this.getIpPort() == null ? other.getIpPort() == null : this.getIpPort().equals(other.getIpPort()))
            && (this.getPhone() == null ? other.getPhone() == null : this.getPhone().equals(other.getPhone()))
            && (this.getProvince() == null ? other.getProvince() == null : this.getProvince().equals(other.getProvince()))
            && (this.getCity() == null ? other.getCity() == null : this.getCity().equals(other.getCity()))
            && (this.getCounty() == null ? other.getCounty() == null : this.getCounty().equals(other.getCounty()))
            && (this.getUserOnlineUrl() == null ? other.getUserOnlineUrl() == null : this.getUserOnlineUrl().equals(other.getUserOnlineUrl()))
            && (this.getUserOfflineUrl() == null ? other.getUserOfflineUrl() == null : this.getUserOfflineUrl().equals(other.getUserOfflineUrl()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getPlatformCode() == null ? other.getPlatformCode() == null : this.getPlatformCode().equals(other.getPlatformCode()))
            && (this.getWelcomeUrl() == null ? other.getWelcomeUrl() == null : this.getWelcomeUrl().equals(other.getWelcomeUrl()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getAppAuthType() == null ? other.getAppAuthType() == null : this.getAppAuthType().equals(other.getAppAuthType()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getDomain() == null) ? 0 : getDomain().hashCode());
        result = prime * result + ((getIpAddr() == null) ? 0 : getIpAddr().hashCode());
        result = prime * result + ((getIpPort() == null) ? 0 : getIpPort().hashCode());
        result = prime * result + ((getPhone() == null) ? 0 : getPhone().hashCode());
        result = prime * result + ((getProvince() == null) ? 0 : getProvince().hashCode());
        result = prime * result + ((getCity() == null) ? 0 : getCity().hashCode());
        result = prime * result + ((getCounty() == null) ? 0 : getCounty().hashCode());
        result = prime * result + ((getUserOnlineUrl() == null) ? 0 : getUserOnlineUrl().hashCode());
        result = prime * result + ((getUserOfflineUrl() == null) ? 0 : getUserOfflineUrl().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getPlatformCode() == null) ? 0 : getPlatformCode().hashCode());
        result = prime * result + ((getWelcomeUrl() == null) ? 0 : getWelcomeUrl().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getAppAuthType() == null) ? 0 : getAppAuthType().hashCode());
        return result;
    }
}