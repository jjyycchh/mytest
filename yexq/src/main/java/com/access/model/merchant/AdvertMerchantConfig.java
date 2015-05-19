package com.access.model.merchant;

import java.util.Date;

public class AdvertMerchantConfig {
    private Long id;

    private Long accountId;

    private String status1;

    private String status2;

    private String status3;

    private Date createdate;

    private Date editdate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getStatus1() {
        return status1;
    }

    public void setStatus1(String status1) {
        this.status1 = status1 == null ? null : status1.trim();
    }

    public String getStatus2() {
        return status2;
    }

    public void setStatus2(String status2) {
        this.status2 = status2 == null ? null : status2.trim();
    }

    public String getStatus3() {
        return status3;
    }

    public void setStatus3(String status3) {
        this.status3 = status3 == null ? null : status3.trim();
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public Date getEditdate() {
        return editdate;
    }

    public void setEditdate(Date editdate) {
        this.editdate = editdate;
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
        AdvertMerchantConfig other = (AdvertMerchantConfig) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()))
            && (this.getStatus1() == null ? other.getStatus1() == null : this.getStatus1().equals(other.getStatus1()))
            && (this.getStatus2() == null ? other.getStatus2() == null : this.getStatus2().equals(other.getStatus2()))
            && (this.getStatus3() == null ? other.getStatus3() == null : this.getStatus3().equals(other.getStatus3()))
            && (this.getCreatedate() == null ? other.getCreatedate() == null : this.getCreatedate().equals(other.getCreatedate()))
            && (this.getEditdate() == null ? other.getEditdate() == null : this.getEditdate().equals(other.getEditdate()));
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
        return result;
    }
}