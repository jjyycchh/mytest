package com.access.model.device;

public class ComponentWithBLOBs extends Component {
    private String description;

    private String deviceSupported;

    private String requirements;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getDeviceSupported() {
        return deviceSupported;
    }

    public void setDeviceSupported(String deviceSupported) {
        this.deviceSupported = deviceSupported == null ? null : deviceSupported.trim();
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements == null ? null : requirements.trim();
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
        ComponentWithBLOBs other = (ComponentWithBLOBs) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getRefCounter() == null ? other.getRefCounter() == null : this.getRefCounter().equals(other.getRefCounter()))
            && (this.getVersion() == null ? other.getVersion() == null : this.getVersion().equals(other.getVersion()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getPkgPath() == null ? other.getPkgPath() == null : this.getPkgPath().equals(other.getPkgPath()))
            && (this.getScriptPath() == null ? other.getScriptPath() == null : this.getScriptPath().equals(other.getScriptPath()))
            && (this.getIsMandatory() == null ? other.getIsMandatory() == null : this.getIsMandatory().equals(other.getIsMandatory()))
            && (this.getIsPublished() == null ? other.getIsPublished() == null : this.getIsPublished().equals(other.getIsPublished()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getDeviceSupported() == null ? other.getDeviceSupported() == null : this.getDeviceSupported().equals(other.getDeviceSupported()))
            && (this.getRequirements() == null ? other.getRequirements() == null : this.getRequirements().equals(other.getRequirements()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getRefCounter() == null) ? 0 : getRefCounter().hashCode());
        result = prime * result + ((getVersion() == null) ? 0 : getVersion().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getPkgPath() == null) ? 0 : getPkgPath().hashCode());
        result = prime * result + ((getScriptPath() == null) ? 0 : getScriptPath().hashCode());
        result = prime * result + ((getIsMandatory() == null) ? 0 : getIsMandatory().hashCode());
        result = prime * result + ((getIsPublished() == null) ? 0 : getIsPublished().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getDeviceSupported() == null) ? 0 : getDeviceSupported().hashCode());
        result = prime * result + ((getRequirements() == null) ? 0 : getRequirements().hashCode());
        return result;
    }
}