package com.access.model.merchant;

public class PortalTemplateHasPortalTag {
    private Long portalTemplateId;

    private Long portalTagId;

    public Long getPortalTemplateId() {
        return portalTemplateId;
    }

    public void setPortalTemplateId(Long portalTemplateId) {
        this.portalTemplateId = portalTemplateId;
    }

    public Long getPortalTagId() {
        return portalTagId;
    }

    public void setPortalTagId(Long portalTagId) {
        this.portalTagId = portalTagId;
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
        PortalTemplateHasPortalTag other = (PortalTemplateHasPortalTag) that;
        return (this.getPortalTemplateId() == null ? other.getPortalTemplateId() == null : this.getPortalTemplateId().equals(other.getPortalTemplateId()))
            && (this.getPortalTagId() == null ? other.getPortalTagId() == null : this.getPortalTagId().equals(other.getPortalTagId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getPortalTemplateId() == null) ? 0 : getPortalTemplateId().hashCode());
        result = prime * result + ((getPortalTagId() == null) ? 0 : getPortalTagId().hashCode());
        return result;
    }
}