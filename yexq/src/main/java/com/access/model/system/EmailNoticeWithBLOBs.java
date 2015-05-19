package com.access.model.system;

public class EmailNoticeWithBLOBs extends EmailNotice {
    private String to;

    private String cc;

    private String bcc;

    private String subject;

    private String body;

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to == null ? null : to.trim();
    }

    public String getCc() {
        return cc;
    }

    public void setCc(String cc) {
        this.cc = cc == null ? null : cc.trim();
    }

    public String getBcc() {
        return bcc;
    }

    public void setBcc(String bcc) {
        this.bcc = bcc == null ? null : bcc.trim();
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject == null ? null : subject.trim();
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body == null ? null : body.trim();
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
        EmailNoticeWithBLOBs other = (EmailNoticeWithBLOBs) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getFrom() == null ? other.getFrom() == null : this.getFrom().equals(other.getFrom()))
            && (this.getRetryTimes() == null ? other.getRetryTimes() == null : this.getRetryTimes().equals(other.getRetryTimes()))
            && (this.getIsSent() == null ? other.getIsSent() == null : this.getIsSent().equals(other.getIsSent()))
            && (this.getSentDatetime() == null ? other.getSentDatetime() == null : this.getSentDatetime().equals(other.getSentDatetime()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getAccountId() == null ? other.getAccountId() == null : this.getAccountId().equals(other.getAccountId()))
            && (this.getTo() == null ? other.getTo() == null : this.getTo().equals(other.getTo()))
            && (this.getCc() == null ? other.getCc() == null : this.getCc().equals(other.getCc()))
            && (this.getBcc() == null ? other.getBcc() == null : this.getBcc().equals(other.getBcc()))
            && (this.getSubject() == null ? other.getSubject() == null : this.getSubject().equals(other.getSubject()))
            && (this.getBody() == null ? other.getBody() == null : this.getBody().equals(other.getBody()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getFrom() == null) ? 0 : getFrom().hashCode());
        result = prime * result + ((getRetryTimes() == null) ? 0 : getRetryTimes().hashCode());
        result = prime * result + ((getIsSent() == null) ? 0 : getIsSent().hashCode());
        result = prime * result + ((getSentDatetime() == null) ? 0 : getSentDatetime().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getAccountId() == null) ? 0 : getAccountId().hashCode());
        result = prime * result + ((getTo() == null) ? 0 : getTo().hashCode());
        result = prime * result + ((getCc() == null) ? 0 : getCc().hashCode());
        result = prime * result + ((getBcc() == null) ? 0 : getBcc().hashCode());
        result = prime * result + ((getSubject() == null) ? 0 : getSubject().hashCode());
        result = prime * result + ((getBody() == null) ? 0 : getBody().hashCode());
        return result;
    }
}