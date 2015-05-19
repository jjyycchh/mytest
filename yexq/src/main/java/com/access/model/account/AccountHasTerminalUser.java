package com.access.model.account;

public class AccountHasTerminalUser {
    private Long accountId;

    private Long terminalUserId;

    private String memo;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getTerminalUserId() {
        return terminalUserId;
    }

    public void setTerminalUserId(Long terminalUserId) {
        this.terminalUserId = terminalUserId;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo == null ? null : memo.trim();
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
        AccountHasTerminalUser other = (AccountHasTerminalUser) that;
        return (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()))
            && (this.getTerminalUserId() == null ? other.getTerminalUserId() == null : this.getTerminalUserId().equals(other.getTerminalUserId()))
            && (this.getMemo() == null ? other.getMemo() == null : this.getMemo().equals(other.getMemo()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        result = prime * result + ((getTerminalUserId() == null) ? 0 : getTerminalUserId().hashCode());
        result = prime * result + ((getMemo() == null) ? 0 : getMemo().hashCode());
        return result;
    }
}