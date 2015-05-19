package com.access.model.merchant;

public class PortalDisplayPolicyWithBLOBs extends PortalDisplayPolicy {
    private String deviceIds;

    private String displayItems;

    public String getDeviceIds() {
        return deviceIds;
    }

    public void setDeviceIds(String deviceIds) {
        this.deviceIds = deviceIds == null ? null : deviceIds.trim();
    }

    public String getDisplayItems() {
        return displayItems;
    }

    public void setDisplayItems(String displayItems) {
        this.displayItems = displayItems == null ? null : displayItems.trim();
    }
    
    @Override
    public PortalDisplayPolicyWithBLOBs clone() {
    	PortalDisplayPolicyWithBLOBs newPolicy = new PortalDisplayPolicyWithBLOBs();
    	
    	newPolicy.setId(this.getId());
    	newPolicy.setAccountId(this.getAccountId());
    	newPolicy.setCreateDatetime(this.getCreateDatetime());
    	newPolicy.setDeviceIds(this.getDeviceIds());
    	newPolicy.setDisplayItems(this.getDisplayItems());
    	newPolicy.setLatestUpdateAccountId(this.getLatestUpdateAccountId());
    	newPolicy.setLatestUpdateDatetime(this.getLatestUpdateDatetime());
    	newPolicy.setName(this.getName());
    	newPolicy.setStatus(this.getStatus());
    	
    	return newPolicy;
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
        PortalDisplayPolicyWithBLOBs other = (PortalDisplayPolicyWithBLOBs) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getLatestUpdateDatetime() == null ? other.getLatestUpdateDatetime() == null : this.getLatestUpdateDatetime().equals(other.getLatestUpdateDatetime()))
            && (this.getLatestUpdateAccountId() == null ? other.getLatestUpdateAccountId() == null : this.getLatestUpdateAccountId().equals(other.getLatestUpdateAccountId()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getDeviceIds() == null ? other.getDeviceIds() == null : this.getDeviceIds().equals(other.getDeviceIds()))
            && (this.getDisplayItems() == null ? other.getDisplayItems() == null : this.getDisplayItems().equals(other.getDisplayItems()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getLatestUpdateDatetime() == null) ? 0 : getLatestUpdateDatetime().hashCode());
        result = prime * result + ((getLatestUpdateAccountId() == null) ? 0 : getLatestUpdateAccountId().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getDeviceIds() == null) ? 0 : getDeviceIds().hashCode());
        result = prime * result + ((getDisplayItems() == null) ? 0 : getDisplayItems().hashCode());
        return result;
    }
    
    private String editor;
    private String editorusername;
    private String username;
    private String fullname;
    private String merchantname;

	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public String getEditorusername() {
		return editorusername;
	}

	public void setEditorusername(String editorusername) {
		this.editorusername = editorusername;
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

	public String getMerchantname() {
		return merchantname;
	}

	public void setMerchantname(String merchantname) {
		this.merchantname = merchantname;
	}
    
}