package com.access.model.merchant;

public class AdvertDefaultConfig {
    private Long id;

    private String codetype;

    private String jscode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodetype() {
        return codetype;
    }

    public void setCodetype(String codetype) {
        this.codetype = codetype == null ? null : codetype.trim();
    }

    public String getJscode() {
        return jscode;
    }

    public void setJscode(String jscode) {
        this.jscode = jscode == null ? null : jscode.trim();
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
        AdvertDefaultConfig other = (AdvertDefaultConfig) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getCodetype() == null ? other.getCodetype() == null : this.getCodetype().equals(other.getCodetype()))
            && (this.getJscode() == null ? other.getJscode() == null : this.getJscode().equals(other.getJscode()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getCodetype() == null) ? 0 : getCodetype().hashCode());
        result = prime * result + ((getJscode() == null) ? 0 : getJscode().hashCode());
        return result;
    }
}