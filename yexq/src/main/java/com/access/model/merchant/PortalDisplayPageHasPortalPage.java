package com.access.model.merchant;

public class PortalDisplayPageHasPortalPage {
    private Long portalDisplayPolicyId;

    private Long portalPageId;

    public Long getPortalDisplayPolicyId() {
        return portalDisplayPolicyId;
    }

    public void setPortalDisplayPolicyId(Long portalDisplayPolicyId) {
        this.portalDisplayPolicyId = portalDisplayPolicyId;
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
        PortalDisplayPageHasPortalPage other = (PortalDisplayPageHasPortalPage) that;
        return (this.getPortalDisplayPolicyId() == null ? other.getPortalDisplayPolicyId() == null : this.getPortalDisplayPolicyId().equals(other.getPortalDisplayPolicyId()))
            && (this.getPortalPageId() == null ? other.getPortalPageId() == null : this.getPortalPageId().equals(other.getPortalPageId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getPortalDisplayPolicyId() == null) ? 0 : getPortalDisplayPolicyId().hashCode());
        result = prime * result + ((getPortalPageId() == null) ? 0 : getPortalPageId().hashCode());
        return result;
    }
}