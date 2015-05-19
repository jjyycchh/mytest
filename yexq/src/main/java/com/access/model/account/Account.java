package com.access.model.account;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.Date;

public class Account implements Serializable{
    private Long id;

    private String username;

    private String password;

    private String email;

    private String fullname;

    private String avatarPath;

    private String cellNumber;

    private String merchantName;

    private Boolean isSuperuser;

    private String status;

    private String type;

    private String geoLevel;

    private Integer errorPasswordRetry;

    private Date createDatetime;

    private Date lastLoginDatetime;

    private String changePwdToken;

    private Boolean phoneBinded;
    
    private String[] tags;
    
    private String[] permissions;
    
    public void writeObject(ObjectOutputStream outputStream) throws Exception{
    	outputStream.defaultWriteObject();
/*    	
    	String thisObjJsonStr = JsonUtil.objectToJsonStr(this);

    	outputStream.writeObject(thisObjJsonStr);
    	outputStream.flush();*/
    }
    
    private void readObject(ObjectInputStream inputStream) throws IOException,ClassNotFoundException{
    	inputStream.defaultReadObject();//defaultReadObject()补充自动序列化
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname == null ? null : fullname.trim();
    }

    public String getAvatarPath() {
        return avatarPath;
    }

    public void setAvatarPath(String avatarPath) {
        this.avatarPath = avatarPath == null ? null : avatarPath.trim();
    }

    public String getCellNumber() {
        return cellNumber;
    }

    public void setCellNumber(String cellNumber) {
        this.cellNumber = cellNumber == null ? null : cellNumber.trim();
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName == null ? null : merchantName.trim();
    }

    public Boolean getIsSuperuser() {
        return isSuperuser;
    }

    public void setIsSuperuser(Boolean isSuperuser) {
        this.isSuperuser = isSuperuser;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public String getGeoLevel() {
        return geoLevel;
    }

    public void setGeoLevel(String geoLevel) {
        this.geoLevel = geoLevel == null ? null : geoLevel.trim();
    }

    public Integer getErrorPasswordRetry() {
        return errorPasswordRetry;
    }

    public void setErrorPasswordRetry(Integer errorPasswordRetry) {
        this.errorPasswordRetry = errorPasswordRetry;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Date getLastLoginDatetime() {
        return lastLoginDatetime;
    }

    public void setLastLoginDatetime(Date lastLoginDatetime) {
        this.lastLoginDatetime = lastLoginDatetime;
    }

    public String getChangePwdToken() {
        return changePwdToken;
    }

    public void setChangePwdToken(String changePwdToken) {
        this.changePwdToken = changePwdToken == null ? null : changePwdToken.trim();
    }

    public Boolean getPhoneBinded() {
        return phoneBinded;
    }

    public void setPhoneBinded(Boolean phoneBinded) {
        this.phoneBinded = phoneBinded;
    }
    
    public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}

	public String[] getPermissions() {
		return permissions;
	}

	public void setPermissions(String[] permissions) {
		this.permissions = permissions;
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
        Account other = (Account) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getUsername() == null ? other.getUsername() == null : this.getUsername().equals(other.getUsername()))
            && (this.getPassword() == null ? other.getPassword() == null : this.getPassword().equals(other.getPassword()))
            && (this.getEmail() == null ? other.getEmail() == null : this.getEmail().equals(other.getEmail()))
            && (this.getFullname() == null ? other.getFullname() == null : this.getFullname().equals(other.getFullname()))
            && (this.getAvatarPath() == null ? other.getAvatarPath() == null : this.getAvatarPath().equals(other.getAvatarPath()))
            && (this.getCellNumber() == null ? other.getCellNumber() == null : this.getCellNumber().equals(other.getCellNumber()))
            && (this.getMerchantName() == null ? other.getMerchantName() == null : this.getMerchantName().equals(other.getMerchantName()))
            && (this.getIsSuperuser() == null ? other.getIsSuperuser() == null : this.getIsSuperuser().equals(other.getIsSuperuser()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getGeoLevel() == null ? other.getGeoLevel() == null : this.getGeoLevel().equals(other.getGeoLevel()))
            && (this.getErrorPasswordRetry() == null ? other.getErrorPasswordRetry() == null : this.getErrorPasswordRetry().equals(other.getErrorPasswordRetry()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getLastLoginDatetime() == null ? other.getLastLoginDatetime() == null : this.getLastLoginDatetime().equals(other.getLastLoginDatetime()))
            && (this.getChangePwdToken() == null ? other.getChangePwdToken() == null : this.getChangePwdToken().equals(other.getChangePwdToken()))
            && (this.getPhoneBinded() == null ? other.getPhoneBinded() == null : this.getPhoneBinded().equals(other.getPhoneBinded()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getUsername() == null) ? 0 : getUsername().hashCode());
        result = prime * result + ((getPassword() == null) ? 0 : getPassword().hashCode());
        result = prime * result + ((getEmail() == null) ? 0 : getEmail().hashCode());
        result = prime * result + ((getFullname() == null) ? 0 : getFullname().hashCode());
        result = prime * result + ((getAvatarPath() == null) ? 0 : getAvatarPath().hashCode());
        result = prime * result + ((getCellNumber() == null) ? 0 : getCellNumber().hashCode());
        result = prime * result + ((getMerchantName() == null) ? 0 : getMerchantName().hashCode());
        result = prime * result + ((getIsSuperuser() == null) ? 0 : getIsSuperuser().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getGeoLevel() == null) ? 0 : getGeoLevel().hashCode());
        result = prime * result + ((getErrorPasswordRetry() == null) ? 0 : getErrorPasswordRetry().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getLastLoginDatetime() == null) ? 0 : getLastLoginDatetime().hashCode());
        result = prime * result + ((getChangePwdToken() == null) ? 0 : getChangePwdToken().hashCode());
        result = prime * result + ((getPhoneBinded() == null) ? 0 : getPhoneBinded().hashCode());
        return result;
    }
    
    /////////////////////////////////////////////////////////////////////
    private Integer deviceCount;

	public Integer getDeviceCount() {
		return deviceCount;
	}

	public void setDeviceCount(Integer deviceCount) {
		this.deviceCount = deviceCount;
	}
    
}