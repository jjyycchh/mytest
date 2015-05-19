package com.access.model.account;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class Permission implements Serializable{
	
    /**
	 * 
	 */
	private static final long serialVersionUID = -2095789365293653180L;

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	private Long id;

    private String name;

    private String permCode;

    private String defaultAccountType;

    private String description;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getPermCode() {
        return permCode;
    }

    public void setPermCode(String permCode) {
        this.permCode = permCode == null ? null : permCode.trim();
    }

    public String getDefaultAccountType() {
        return defaultAccountType;
    }

    public void setDefaultAccountType(String defaultAccountType) {
        this.defaultAccountType = defaultAccountType == null ? null : defaultAccountType.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
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
        Permission other = (Permission) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getPermCode() == null ? other.getPermCode() == null : this.getPermCode().equals(other.getPermCode()))
            && (this.getDefaultAccountType() == null ? other.getDefaultAccountType() == null : this.getDefaultAccountType().equals(other.getDefaultAccountType()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getPermCode() == null) ? 0 : getPermCode().hashCode());
        result = prime * result + ((getDefaultAccountType() == null) ? 0 : getDefaultAccountType().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        return result;
    }
}