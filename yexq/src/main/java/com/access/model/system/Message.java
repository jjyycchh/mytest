package com.access.model.system;

import java.util.Date;

public class Message {
    private Long id;

    private Long senderId;

    private String receiverId;

    private Long ownerId;

    private Boolean isSent;

    private String title;

    private String content;

    private Boolean isRead;

    private Boolean isFlaged;

    private Date createDatetime;

    private Long parentMsgId;

    private String type;

    public Message clone() {
    	Message clonedObj = new Message();
    	clonedObj.setId(this.id);
    	clonedObj.setSenderId(this.senderId);
    	clonedObj.setReceiverId(this.receiverId);
    	clonedObj.setOwnerId(this.ownerId);
    	clonedObj.setTitle(this.title);
    	clonedObj.setContent(this.content);
    	clonedObj.setIsRead(this.isRead);
    	clonedObj.setIsFlaged(this.isFlaged);
    	clonedObj.setCreateDatetime(this.createDatetime);
    	clonedObj.setParentMsgId(this.parentMsgId);
    	
    	return clonedObj;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId == null ? null : receiverId.trim();
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Boolean getIsSent() {
        return isSent;
    }

    public void setIsSent(Boolean isSent) {
        this.isSent = isSent;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public Boolean getIsFlaged() {
        return isFlaged;
    }

    public void setIsFlaged(Boolean isFlaged) {
        this.isFlaged = isFlaged;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Long getParentMsgId() {
        return parentMsgId;
    }

    public void setParentMsgId(Long parentMsgId) {
        this.parentMsgId = parentMsgId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
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
        Message other = (Message) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getSenderId() == null ? other.getSenderId() == null : this.getSenderId().equals(other.getSenderId()))
            && (this.getReceiverId() == null ? other.getReceiverId() == null : this.getReceiverId().equals(other.getReceiverId()))
            && (this.getOwnerId() == null ? other.getOwnerId() == null : this.getOwnerId().equals(other.getOwnerId()))
            && (this.getIsSent() == null ? other.getIsSent() == null : this.getIsSent().equals(other.getIsSent()))
            && (this.getTitle() == null ? other.getTitle() == null : this.getTitle().equals(other.getTitle()))
            && (this.getContent() == null ? other.getContent() == null : this.getContent().equals(other.getContent()))
            && (this.getIsRead() == null ? other.getIsRead() == null : this.getIsRead().equals(other.getIsRead()))
            && (this.getIsFlaged() == null ? other.getIsFlaged() == null : this.getIsFlaged().equals(other.getIsFlaged()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getParentMsgId() == null ? other.getParentMsgId() == null : this.getParentMsgId().equals(other.getParentMsgId()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getSenderId() == null) ? 0 : getSenderId().hashCode());
        result = prime * result + ((getReceiverId() == null) ? 0 : getReceiverId().hashCode());
        result = prime * result + ((getOwnerId() == null) ? 0 : getOwnerId().hashCode());
        result = prime * result + ((getIsSent() == null) ? 0 : getIsSent().hashCode());
        result = prime * result + ((getTitle() == null) ? 0 : getTitle().hashCode());
        result = prime * result + ((getContent() == null) ? 0 : getContent().hashCode());
        result = prime * result + ((getIsRead() == null) ? 0 : getIsRead().hashCode());
        result = prime * result + ((getIsFlaged() == null) ? 0 : getIsFlaged().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getParentMsgId() == null) ? 0 : getParentMsgId().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        return result;
    }
}