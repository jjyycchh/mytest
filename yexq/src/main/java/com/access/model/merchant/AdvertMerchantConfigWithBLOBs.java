package com.access.model.merchant;

public class AdvertMerchantConfigWithBLOBs extends AdvertMerchantConfig {
    private String jscode1; 

    private String jscode2;

    private String jscode3;

    public String getJscode1() {
        return jscode1;
    }

    public void setJscode1(String jscode1) {
        this.jscode1 = jscode1 == null ? null : jscode1.trim();
    }

    public String getJscode2() {
        return jscode2;
    }

    public void setJscode2(String jscode2) {
        this.jscode2 = jscode2 == null ? null : jscode2.trim();
    }

    public String getJscode3() {
        return jscode3;
    }

    public void setJscode3(String jscode3) {
        this.jscode3 = jscode3 == null ? null : jscode3.trim();
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
        AdvertMerchantConfigWithBLOBs other = (AdvertMerchantConfigWithBLOBs) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()))
            && (this.getStatus1() == null ? other.getStatus1() == null : this.getStatus1().equals(other.getStatus1()))
            && (this.getStatus2() == null ? other.getStatus2() == null : this.getStatus2().equals(other.getStatus2()))
            && (this.getStatus3() == null ? other.getStatus3() == null : this.getStatus3().equals(other.getStatus3()))
            && (this.getCreatedate() == null ? other.getCreatedate() == null : this.getCreatedate().equals(other.getCreatedate()))
            && (this.getEditdate() == null ? other.getEditdate() == null : this.getEditdate().equals(other.getEditdate()))
            && (this.getJscode1() == null ? other.getJscode1() == null : this.getJscode1().equals(other.getJscode1()))
            && (this.getJscode2() == null ? other.getJscode2() == null : this.getJscode2().equals(other.getJscode2()))
            && (this.getJscode3() == null ? other.getJscode3() == null : this.getJscode3().equals(other.getJscode3()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        result = prime * result + ((getStatus1() == null) ? 0 : getStatus1().hashCode());
        result = prime * result + ((getStatus2() == null) ? 0 : getStatus2().hashCode());
        result = prime * result + ((getStatus3() == null) ? 0 : getStatus3().hashCode());
        result = prime * result + ((getCreatedate() == null) ? 0 : getCreatedate().hashCode());
        result = prime * result + ((getEditdate() == null) ? 0 : getEditdate().hashCode());
        result = prime * result + ((getJscode1() == null) ? 0 : getJscode1().hashCode());
        result = prime * result + ((getJscode2() == null) ? 0 : getJscode2().hashCode());
        result = prime * result + ((getJscode3() == null) ? 0 : getJscode3().hashCode());
        return result;
    }
}