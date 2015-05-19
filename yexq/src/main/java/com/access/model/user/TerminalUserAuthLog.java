package com.access.model.user;

import java.util.Date;

public class TerminalUserAuthLog {
    private Long id;

    private Long terminalUserId;
    
    private String logContent;

    private String authType;

    private String token;

    private String deviceId;

    private String status;

    private String terminalMac;

    private Date offlineDatetime;

    private String terminalType;

    private String browserType;

    private Long totalUpTraffic;

    private Long totalDwTraffic;

    private Date modifiedDatetime;

    private Date createDatetime;

    private String terminalIp;
    
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTerminalUserId() {
        return terminalUserId;
    }

    public void setTerminalUserId(Long terminalUserId) {
        this.terminalUserId = terminalUserId;
    }

    public String getAuthType() {
        return authType;
    }

    public void setAuthType(String authType) {
        this.authType = authType == null ? null : authType.trim();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token == null ? null : token.trim();
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId == null ? null : deviceId.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getTerminalMac() {
        return terminalMac;
    }

    public void setTerminalMac(String terminalMac) {
        this.terminalMac = terminalMac == null ? null : terminalMac.trim();
    }

    public Date getOfflineDatetime() {
        return offlineDatetime;
    }

    public void setOfflineDatetime(Date offlineDatetime) {
        this.offlineDatetime = offlineDatetime;
    }

    public String getTerminalType() {
        return terminalType;
    }

    public void setTerminalType(String terminalType) {
        this.terminalType = terminalType == null ? null : terminalType.trim();
    }

    public String getBrowserType() {
        return browserType;
    }

    public void setBrowserType(String browserType) {
        this.browserType = browserType == null ? null : browserType.trim();
    }

    public Long getTotalUpTraffic() {
        return totalUpTraffic;
    }

    public void setTotalUpTraffic(Long totalUpTraffic) {
        this.totalUpTraffic = totalUpTraffic;
    }

    public Long getTotalDwTraffic() {
        return totalDwTraffic;
    }

    public void setTotalDwTraffic(Long totalDwTraffic) {
        this.totalDwTraffic = totalDwTraffic;
    }

    public Date getModifiedDatetime() {
        return modifiedDatetime;
    }

    public void setModifiedDatetime(Date modifiedDatetime) {
        this.modifiedDatetime = modifiedDatetime;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public String getLogContent() {
        return logContent;
    }

    public void setLogContent(String logContent) {
        this.logContent = logContent == null ? null : logContent.trim();
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
        TerminalUserAuthLog other = (TerminalUserAuthLog) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTerminalUserId() == null ? other.getTerminalUserId() == null : this.getTerminalUserId().equals(other.getTerminalUserId()))
            && (this.getAuthType() == null ? other.getAuthType() == null : this.getAuthType().equals(other.getAuthType()))
            && (this.getToken() == null ? other.getToken() == null : this.getToken().equals(other.getToken()))
            && (this.getDeviceId() == null ? other.getDeviceId() == null : this.getDeviceId().equals(other.getDeviceId()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getTerminalMac() == null ? other.getTerminalMac() == null : this.getTerminalMac().equals(other.getTerminalMac()))
            && (this.getOfflineDatetime() == null ? other.getOfflineDatetime() == null : this.getOfflineDatetime().equals(other.getOfflineDatetime()))
            && (this.getTerminalType() == null ? other.getTerminalType() == null : this.getTerminalType().equals(other.getTerminalType()))
            && (this.getBrowserType() == null ? other.getBrowserType() == null : this.getBrowserType().equals(other.getBrowserType()))
            && (this.getTotalUpTraffic() == null ? other.getTotalUpTraffic() == null : this.getTotalUpTraffic().equals(other.getTotalUpTraffic()))
            && (this.getTotalDwTraffic() == null ? other.getTotalDwTraffic() == null : this.getTotalDwTraffic().equals(other.getTotalDwTraffic()))
            && (this.getModifiedDatetime() == null ? other.getModifiedDatetime() == null : this.getModifiedDatetime().equals(other.getModifiedDatetime()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getLogContent() == null ? other.getLogContent() == null : this.getLogContent().equals(other.getLogContent()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getTerminalUserId() == null) ? 0 : getTerminalUserId().hashCode());
        result = prime * result + ((getAuthType() == null) ? 0 : getAuthType().hashCode());
        result = prime * result + ((getToken() == null) ? 0 : getToken().hashCode());
        result = prime * result + ((getDeviceId() == null) ? 0 : getDeviceId().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getTerminalMac() == null) ? 0 : getTerminalMac().hashCode());
        result = prime * result + ((getOfflineDatetime() == null) ? 0 : getOfflineDatetime().hashCode());
        result = prime * result + ((getTerminalType() == null) ? 0 : getTerminalType().hashCode());
        result = prime * result + ((getBrowserType() == null) ? 0 : getBrowserType().hashCode());
        result = prime * result + ((getTotalUpTraffic() == null) ? 0 : getTotalUpTraffic().hashCode());
        result = prime * result + ((getTotalDwTraffic() == null) ? 0 : getTotalDwTraffic().hashCode());
        result = prime * result + ((getModifiedDatetime() == null) ? 0 : getModifiedDatetime().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getLogContent() == null) ? 0 : getLogContent().hashCode());
        return result;
    }

    /******************************* 用户认证记录 *******************************/
    private String mac;
    private String content;
    private String cellphone;
    private Long accountId;
    
    public String getCellphone() {
		return cellphone;
	}

	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}
	
	public Long getAccountId() {
			return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getTerminalIp() {
		return terminalIp;
	}

	public void setTerminalIp(String terminalIp) {
		this.terminalIp = terminalIp;
	}
}