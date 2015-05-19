package com.access.model.system;

public class ExceptionLogWithBLOBs extends ExceptionLog {
    private String parameter;

    private String sysErrorMssage;

    public String getParameter() {
        return parameter;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter == null ? null : parameter.trim();
    }

    public String getSysErrorMssage() {
        return sysErrorMssage;
    }

    public void setSysErrorMssage(String sysErrorMssage) {
        this.sysErrorMssage = sysErrorMssage == null ? null : sysErrorMssage.trim();
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
        ExceptionLogWithBLOBs other = (ExceptionLogWithBLOBs) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getModuleName() == null ? other.getModuleName() == null : this.getModuleName().equals(other.getModuleName()))
            && (this.getServiceName() == null ? other.getServiceName() == null : this.getServiceName().equals(other.getServiceName()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getParameter() == null ? other.getParameter() == null : this.getParameter().equals(other.getParameter()))
            && (this.getSysErrorMssage() == null ? other.getSysErrorMssage() == null : this.getSysErrorMssage().equals(other.getSysErrorMssage()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getModuleName() == null) ? 0 : getModuleName().hashCode());
        result = prime * result + ((getServiceName() == null) ? 0 : getServiceName().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getParameter() == null) ? 0 : getParameter().hashCode());
        result = prime * result + ((getSysErrorMssage() == null) ? 0 : getSysErrorMssage().hashCode());
        return result;
    }
}