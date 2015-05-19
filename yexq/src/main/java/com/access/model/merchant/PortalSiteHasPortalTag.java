package com.access.model.merchant;

public class PortalSiteHasPortalTag {
    private Long portalSiteId;

    private Long portalTagId;

    public Long getPortalSiteId() {
        return portalSiteId;
    }

    public void setPortalSiteId(Long portalSiteId) {
        this.portalSiteId = portalSiteId;
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
        PortalSiteHasPortalTag other = (PortalSiteHasPortalTag) that;
        return (this.getPortalSiteId() == null ? other.getPortalSiteId() == null : this.getPortalSiteId().equals(other.getPortalSiteId()))
            && (this.getPortalTagId() == null ? other.getPortalTagId() == null : this.getPortalTagId().equals(other.getPortalTagId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getPortalSiteId() == null) ? 0 : getPortalSiteId().hashCode());
        result = prime * result + ((getPortalTagId() == null) ? 0 : getPortalTagId().hashCode());
        return result;
    }
}