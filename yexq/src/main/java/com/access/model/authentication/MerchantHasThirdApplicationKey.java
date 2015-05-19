package com.access.model.authentication;

public class MerchantHasThirdApplicationKey {
    private Long thirdAppId;

    private Long accountId;

    public Long getThirdAppId() {
        return thirdAppId;
    }

    public void setThirdAppId(Long thirdAppId) {
        this.thirdAppId = thirdAppId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
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
        MerchantHasThirdApplicationKey other = (MerchantHasThirdApplicationKey) that;
        return (this.getThirdAppId() == null ? other.getThirdAppId() == null : this.getThirdAppId().equals(other.getThirdAppId()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getThirdAppId() == null) ? 0 : getThirdAppId().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        return result;
    }
}