package com.access.model.merchant;

public class ResourceHasPortalPage {
    private Long resourceId;

    private Long portalPageId;

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public Long getPortalPageId() {
        return portalPageId;
    }

    public void setPortalPageId(Long portalPageId) {
        this.portalPageId = portalPageId;
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
        ResourceHasPortalPage other = (ResourceHasPortalPage) that;
        return (this.getResourceId() == null ? other.getResourceId() == null : this.getResourceId().equals(other.getResourceId()))
            && (this.getPortalPageId() == null ? other.getPortalPageId() == null : this.getPortalPageId().equals(other.getPortalPageId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getResourceId() == null) ? 0 : getResourceId().hashCode());
        result = prime * result + ((getPortalPageId() == null) ? 0 : getPortalPageId().hashCode());
        return result;
    }
}