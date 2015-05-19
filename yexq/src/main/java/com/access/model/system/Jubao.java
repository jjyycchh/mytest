package com.access.model.system;

import java.util.Date;

public class Jubao {
    private Long id;

    private Byte jbType;

    private String visiousAccount;

    private String visiousUrl;

    private String jbDescription;

    private Long jbAccountId;

    private Date createDatetime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Byte getJbType() {
        return jbType;
    }

    public void setJbType(Byte jbType) {
        this.jbType = jbType;
    }

    public String getVisiousAccount() {
        return visiousAccount;
    }

    public void setVisiousAccount(String visiousAccount) {
        this.visiousAccount = visiousAccount == null ? null : visiousAccount.trim();
    }

    public String getVisiousUrl() {
        return visiousUrl;
    }

    public void setVisiousUrl(String visiousUrl) {
        this.visiousUrl = visiousUrl == null ? null : visiousUrl.trim();
    }

    public String getJbDescription() {
        return jbDescription;
    }

    public void setJbDescription(String jbDescription) {
        this.jbDescription = jbDescription == null ? null : jbDescription.trim();
    }

    public Long getJbAccountId() {
        return jbAccountId;
    }

    public void setJbAccountId(Long jbAccountId) {
        this.jbAccountId = jbAccountId;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
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
        Jubao other = (Jubao) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getJbType() == null ? other.getJbType() == null : this.getJbType().equals(other.getJbType()))
            && (this.getVisiousAccount() == null ? other.getVisiousAccount() == null : this.getVisiousAccount().equals(other.getVisiousAccount()))
            && (this.getVisiousUrl() == null ? other.getVisiousUrl() == null : this.getVisiousUrl().equals(other.getVisiousUrl()))
            && (this.getJbDescription() == null ? other.getJbDescription() == null : this.getJbDescription().equals(other.getJbDescription()))
            && (this.getJbAccountId() == null ? other.getJbAccountId() == null : this.getJbAccountId().equals(other.getJbAccountId()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getJbType() == null) ? 0 : getJbType().hashCode());
        result = prime * result + ((getVisiousAccount() == null) ? 0 : getVisiousAccount().hashCode());
        result = prime * result + ((getVisiousUrl() == null) ? 0 : getVisiousUrl().hashCode());
        result = prime * result + ((getJbDescription() == null) ? 0 : getJbDescription().hashCode());
        result = prime * result + ((getJbAccountId() == null) ? 0 : getJbAccountId().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        return result;
    }
    
    private String reportAccountUsername;
    private String reportAccountMerchantName;
    private String reportAccountFullname;
    private String reportAccountType;
    private String visiousAccountUsername;
    private String visiousAccountMerchantName;
    private String visiousAccountFullname;
    private String visiousAccountType;

	public String getReportAccountUsername() {
		return reportAccountUsername;
	}

	public void setReportAccountUsername(String reportAccountUsername) {
		this.reportAccountUsername = reportAccountUsername;
	}

	public String getReportAccountMerchantName() {
		return reportAccountMerchantName;
	}

	public void setReportAccountMerchantName(String reportAccountMerchantName) {
		this.reportAccountMerchantName = reportAccountMerchantName;
	}

	public String getReportAccountFullname() {
		return reportAccountFullname;
	}

	public void setReportAccountFullname(String reportAccountFullname) {
		this.reportAccountFullname = reportAccountFullname;
	}

	public String getReportAccountType() {
		return reportAccountType;
	}

	public void setReportAccountType(String reportAccountType) {
		this.reportAccountType = reportAccountType;
	}

	public String getVisiousAccountUsername() {
		return visiousAccountUsername;
	}

	public void setVisiousAccountUsername(String visiousAccountUsername) {
		this.visiousAccountUsername = visiousAccountUsername;
	}

	public String getVisiousAccountMerchantName() {
		return visiousAccountMerchantName;
	}

	public void setVisiousAccountMerchantName(String visiousAccountMerchantName) {
		this.visiousAccountMerchantName = visiousAccountMerchantName;
	}

	public String getVisiousAccountFullname() {
		return visiousAccountFullname;
	}

	public void setVisiousAccountFullname(String visiousAccountFullname) {
		this.visiousAccountFullname = visiousAccountFullname;
	}

	public String getVisiousAccountType() {
		return visiousAccountType;
	}

	public void setVisiousAccountType(String visiousAccountType) {
		this.visiousAccountType = visiousAccountType;
	}
}