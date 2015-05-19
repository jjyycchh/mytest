package com.access.model.account;

public class AccountTagHasAccount {
    private Long accountTagId;

    private Long accountId;

    public Long getAccountTagId() {
        return accountTagId;
    }

    public void setAccountTagId(Long accountTagId) {
        this.accountTagId = accountTagId;
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
        AccountTagHasAccount other = (AccountTagHasAccount) that;
        return (this.getAccountTagId() == null ? other.getAccountTagId() == null : this.getAccountTagId().equals(other.getAccountTagId()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getAccountTagId() == null) ? 0 : getAccountTagId().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        return result;
    }
}