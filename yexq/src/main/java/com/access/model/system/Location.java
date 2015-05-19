package com.access.model.system;

import java.util.Date;

import org.apache.commons.lang.StringUtils;

public class Location {
    private Long id;

    private String name;

    private String description;

    private String country;

    private String province;

    private String city;

    private String countyDistrict;

    private String address;

    private Double latitude;

    private Double longitude;

    private Long accountId;

    private Date createDatetime;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country == null ? null : country.trim();
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

    public String getCountyDistrict() {
        return countyDistrict;
    }

    public void setCountyDistrict(String countyDistrict) {
        this.countyDistrict = countyDistrict == null ? null : countyDistrict.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
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
        Location other = (Location) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getCountry() == null ? other.getCountry() == null : this.getCountry().equals(other.getCountry()))
            && (this.getProvince() == null ? other.getProvince() == null : this.getProvince().equals(other.getProvince()))
            && (this.getCity() == null ? other.getCity() == null : this.getCity().equals(other.getCity()))
            && (this.getCountyDistrict() == null ? other.getCountyDistrict() == null : this.getCountyDistrict().equals(other.getCountyDistrict()))
            && (this.getAddress() == null ? other.getAddress() == null : this.getAddress().equals(other.getAddress()))
            && (this.getLatitude() == null ? other.getLatitude() == null : this.getLatitude().equals(other.getLatitude()))
            && (this.getLongitude() == null ? other.getLongitude() == null : this.getLongitude().equals(other.getLongitude()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getCountry() == null) ? 0 : getCountry().hashCode());
        result = prime * result + ((getProvince() == null) ? 0 : getProvince().hashCode());
        result = prime * result + ((getCity() == null) ? 0 : getCity().hashCode());
        result = prime * result + ((getCountyDistrict() == null) ? 0 : getCountyDistrict().hashCode());
        result = prime * result + ((getAddress() == null) ? 0 : getAddress().hashCode());
        result = prime * result + ((getLatitude() == null) ? 0 : getLatitude().hashCode());
        result = prime * result + ((getLongitude() == null) ? 0 : getLongitude().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        return result;
    }
    
    public static String getLocationString(Location location){
    	StringBuffer buf = new StringBuffer("");
		if(StringUtils.isNotBlank(location.getCountry())){
			buf.append(location.getCountry());
		}
		if(StringUtils.isNotBlank(location.getProvince())){
			if(buf.toString().length()>0){
				buf.append("-");
			}
			buf.append(location.getProvince());
		}
		if(StringUtils.isNotBlank(location.getCity())){
			if(buf.toString().length()>0){
				buf.append("-");
			}
			buf.append(location.getCity());
		}
		if(StringUtils.isNotBlank(location.getCountyDistrict())){
			if(buf.toString().length()>0){
				buf.append("-");
			}
			buf.append(location.getCountyDistrict());
		}
		if(StringUtils.isNotBlank(location.getAddress())){
			if(buf.toString().length()>0){
				buf.append("-");
			}
			buf.append(location.getAddress());
		}
		return buf.toString();
    }
}