package com.access.model.system;

import java.util.Date;

public class BackgroundTask {
    private Integer id;

    private String name;

    private String status;

    private String scriptPath;

    private String executeCommand;

    private Date createDatetime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getScriptPath() {
        return scriptPath;
    }

    public void setScriptPath(String scriptPath) {
        this.scriptPath = scriptPath == null ? null : scriptPath.trim();
    }

    public String getExecuteCommand() {
        return executeCommand;
    }

    public void setExecuteCommand(String executeCommand) {
        this.executeCommand = executeCommand == null ? null : executeCommand.trim();
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
        BackgroundTask other = (BackgroundTask) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getScriptPath() == null ? other.getScriptPath() == null : this.getScriptPath().equals(other.getScriptPath()))
            && (this.getExecuteCommand() == null ? other.getExecuteCommand() == null : this.getExecuteCommand().equals(other.getExecuteCommand()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getScriptPath() == null) ? 0 : getScriptPath().hashCode());
        result = prime * result + ((getExecuteCommand() == null) ? 0 : getExecuteCommand().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        return result;
    }
}