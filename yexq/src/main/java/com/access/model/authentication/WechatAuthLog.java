package com.access.model.authentication;

import java.util.Date;

public class WechatAuthLog {
    private Long id;

    private String wechatAccount;

    private String userOpenId;

    private String phone;

    private Date createDatetime;

    private Long terminalUserId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWechatAccount() {
        return wechatAccount;
    }

    public void setWechatAccount(String wechatAccount) {
        this.wechatAccount = wechatAccount == null ? null : wechatAccount.trim();
    }

    public String getUserOpenId() {
        return userOpenId;
    }

    public void setUserOpenId(String userOpenId) {
        this.userOpenId = userOpenId == null ? null : userOpenId.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Long getTerminalUserId() {
        return terminalUserId;
    }

    public void setTerminalUserId(Long terminalUserId) {
        this.terminalUserId = terminalUserId;
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
        WechatAuthLog other = (WechatAuthLog) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getWechatAccount() == null ? other.getWechatAccount() == null : this.getWechatAccount().equals(other.getWechatAccount()))
            && (this.getUserOpenId() == null ? other.getUserOpenId() == null : this.getUserOpenId().equals(other.getUserOpenId()))
            && (this.getPhone() == null ? other.getPhone() == null : this.getPhone().equals(other.getPhone()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getTerminalUserId() == null ? other.getTerminalUserId() == null : this.getTerminalUserId().equals(other.getTerminalUserId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getWechatAccount() == null) ? 0 : getWechatAccount().hashCode());
        result = prime * result + ((getUserOpenId() == null) ? 0 : getUserOpenId().hashCode());
        result = prime * result + ((getPhone() == null) ? 0 : getPhone().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getTerminalUserId() == null) ? 0 : getTerminalUserId().hashCode());
        return result;
    }
}