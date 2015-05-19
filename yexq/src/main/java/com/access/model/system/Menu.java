package com.access.model.system;

import java.io.Serializable;

public class Menu implements Serializable {
    private static final long serialVersionUID = 660266446017912950L;

    /**
     * menu.id: 
     * <p>
     */
    private Integer id;

    /**
     * menu.name: 
     * <p>
     */
    private String name;

    /**
     * menu.description: 
     * <p>
     */
    private String description;

    /**
     * menu.parent_id: 
     * <p>
     */
    private Integer pId;

    /**
     * menu.url: 
     * <p>
     */
    private String url;

    /**
     * menu.type: 
     * <p>
     * <code>
     * 菜单的层级（0：根层。。。以此类推）<br>
     * </code>
     */
    private Integer type;

    /**
     * menu.flag: 
     * <p>
     */
    private Boolean flag;

    /**
     * menu.position: 
     * <p>
     */
    private String position;

    /**
     * menu.unused: 
     * <p>
     */
    private Boolean unused;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Integer getPId() {
        return pId;
    }

    public void setpPd(Integer pId) {
        this.pId = pId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Boolean getFlag() {
        return flag;
    }

    public void setFlag(Boolean flag) {
        this.flag = flag;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position == null ? null : position.trim();
    }

    public Boolean getUnused() {
        return unused;
    }

    public void setUnused(Boolean unused) {
        this.unused = unused;
    }
}