package com.access.model.account;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.access.core.util.JsonUtil;


public class AccountWithBLOBs extends Account implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 2386144386698002151L;

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	private String parentIds;

    private String merchantDescription;

    private String attributes;

    private String geoLocation;

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
    
    
    public String getParentIds() {
        return parentIds;
    }

    public void setParentIds(String parentIds) {
        this.parentIds = parentIds == null ? null : parentIds.trim();
    }

    public String getMerchantDescription() {
        return merchantDescription;
    }

    public void setMerchantDescription(String merchantDescription) {
        this.merchantDescription = merchantDescription == null ? null : merchantDescription.trim();
    }

    public String getAttributes() {
        return attributes;
    }

    public void setAttributes(String attributes) {
        this.attributes = attributes == null ? null : attributes.trim();
    }

    public String getGeoLocation() {
        return geoLocation;
    }

    public void setGeoLocation(String geoLocation) {
        this.geoLocation = geoLocation == null ? null : geoLocation.trim();
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
        AccountWithBLOBs other = (AccountWithBLOBs) that;
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
            && (this.getPhoneBinded() == null ? other.getPhoneBinded() == null : this.getPhoneBinded().equals(other.getPhoneBinded()))
            && (this.getParentIds() == null ? other.getParentIds() == null : this.getParentIds().equals(other.getParentIds()))
            && (this.getMerchantDescription() == null ? other.getMerchantDescription() == null : this.getMerchantDescription().equals(other.getMerchantDescription()))
            && (this.getAttributes() == null ? other.getAttributes() == null : this.getAttributes().equals(other.getAttributes()))
            && (this.getGeoLocation() == null ? other.getGeoLocation() == null : this.getGeoLocation().equals(other.getGeoLocation()));
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
        result = prime * result + ((getParentIds() == null) ? 0 : getParentIds().hashCode());
        result = prime * result + ((getMerchantDescription() == null) ? 0 : getMerchantDescription().hashCode());
        result = prime * result + ((getAttributes() == null) ? 0 : getAttributes().hashCode());
        result = prime * result + ((getGeoLocation() == null) ? 0 : getGeoLocation().hashCode());
        return result;
    }
    
    public static Map<String,List<String>> getParentIdsMap(String parentIdsJson){
    	Gson gson = new Gson();
    	//{"directParentIds":[ "2", "1000", "20", "50"], "totalParentIds": ["2","20"]}
		Map<String,List<String>> parentIdsMap = gson.fromJson(parentIdsJson, new TypeToken<Map<String, List<String>>>(){}.getType());
		return parentIdsMap;
    }
    /**
     * 取直属parentid
     * @param parentIdsJson
     * @return
     */
    public static List<String> getDirectParentIds(String parentIdsJson){
    	if(parentIdsJson==null || "".equals(parentIdsJson)){
    		return null;
    	}
    	return getParentIdsMap(parentIdsJson).get("directParentIds");
    }
    /**
     * 取所有parentid
     * @param parentIdsJson
     * @return
     */
    public static List<String> getTotalParentIds(String parentIdsJson){
    	if(parentIdsJson==null || "".equals(parentIdsJson)){
    		return null;
    	}
    	return getParentIdsMap(parentIdsJson).get("totalParentIds");
    }
    /****************************************************************************************/
    
    public static Map<String,List<Long>> getParentIdsMapL(String parentIdsJson){
    	Gson gson = new Gson();
    	//{"directParentIds":[ "2", "1000", "20", "50"], "totalParentIds": ["2","20"]}
		Map<String,List<Long>> parentIdsMap = gson.fromJson(parentIdsJson, new TypeToken<Map<String, List<Long>>>(){}.getType());
		return parentIdsMap;
    }
    /**
     * 取直属parentid
     * @param parentIdsJson
     * @return
     */
    public static List<Long> getDirectParentIdsL(String parentIdsJson){
    	if(parentIdsJson==null || "".equals(parentIdsJson)){
    		return null;
    	}
    	return getParentIdsMapL(parentIdsJson).get("directParentIds");
    }
    /**
     * 取所有parentid
     * @param parentIdsJson
     * @return
     */
    public static List<Long> getTotalParentIdsL(String parentIdsJson){
    	if(parentIdsJson==null || "".equals(parentIdsJson)){
    		return null;
    	}
    	return getParentIdsMapL(parentIdsJson).get("totalParentIds");
    }
    
    public static Map<String,String> getLocationMap(String locationJson){
    	Gson gson = new Gson();
    	Map<String,String> locationMap = gson.fromJson(locationJson, new TypeToken<Map<String, String>>(){}.getType());
		return locationMap;
    }
}