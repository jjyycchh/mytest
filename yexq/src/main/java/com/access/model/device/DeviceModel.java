package com.access.model.device;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class DeviceModel {
    private Long id;

    private String brand;

    private String model;

    private Integer totalMem;

    private String cpuBrand;

    private String cpuSeries;

    private String cpuModel;

    private Integer maxTurboFrequency;

    private Integer cpuCores;

    private Boolean isUseApi;

    private String unsupportApiVersions;

    private Date createDatetime;
    
    private Long manufacturerId;

	public void addUnsupportApiVersion(Long componentId) {
        if (componentId != null) {
            List<Long> unsupportVerLst = this.getUnsupportApiVerLst();

            if (unsupportVerLst == null){
                unsupportVerLst = new ArrayList<Long>();
            }

            unsupportVerLst.add(componentId);
            this.unsupportApiVersions = new Gson().toJson(unsupportVerLst);
        }
    }

    public List<Long> getUnsupportApiVerLst() {
        List<Long> unsupportVerLst = null;
        Gson gsonUtil = new Gson();

        if (StringUtils.isNotBlank(this.unsupportApiVersions)) {
            unsupportVerLst = gsonUtil.fromJson(this.unsupportApiVersions,
                    new TypeToken<List<Long>>(){}.getType());
        }

        return unsupportVerLst;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand == null ? null : brand.trim();
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model == null ? null : model.trim();
    }

    public Integer getTotalMem() {
        return totalMem;
    }

    public void setTotalMem(Integer totalMem) {
        this.totalMem = totalMem;
    }

    public String getCpuBrand() {
        return cpuBrand;
    }

    public void setCpuBrand(String cpuBrand) {
        this.cpuBrand = cpuBrand == null ? null : cpuBrand.trim();
    }

    public String getCpuSeries() {
        return cpuSeries;
    }

    public void setCpuSeries(String cpuSeries) {
        this.cpuSeries = cpuSeries == null ? null : cpuSeries.trim();
    }

    public String getCpuModel() {
        return cpuModel;
    }

    public void setCpuModel(String cpuModel) {
        this.cpuModel = cpuModel == null ? null : cpuModel.trim();
    }

    public Integer getMaxTurboFrequency() {
        return maxTurboFrequency;
    }

    public void setMaxTurboFrequency(Integer maxTurboFrequency) {
        this.maxTurboFrequency = maxTurboFrequency;
    }

    public Integer getCpuCores() {
        return cpuCores;
    }

    public void setCpuCores(Integer cpuCores) {
        this.cpuCores = cpuCores;
    }

    public Boolean getIsUseApi() {
        return isUseApi;
    }

    public void setIsUseApi(Boolean isUseApi) {
        this.isUseApi = isUseApi;
    }

    public String getUnsupportApiVersions() {
        return unsupportApiVersions;
    }

    public void setUnsupportApiVersions(String unsupportApiVersions) {
        this.unsupportApiVersions = unsupportApiVersions == null ? null : unsupportApiVersions.trim();
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }
    
    public Long getManufacturerId() {
		return manufacturerId;
	}

	public void setManufacturerId(Long manufacturerId) {
		this.manufacturerId = manufacturerId;
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
        DeviceModel other = (DeviceModel) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getBrand() == null ? other.getBrand() == null : this.getBrand().equals(other.getBrand()))
            && (this.getModel() == null ? other.getModel() == null : this.getModel().equals(other.getModel()))
            && (this.getTotalMem() == null ? other.getTotalMem() == null : this.getTotalMem().equals(other.getTotalMem()))
            && (this.getCpuBrand() == null ? other.getCpuBrand() == null : this.getCpuBrand().equals(other.getCpuBrand()))
            && (this.getCpuSeries() == null ? other.getCpuSeries() == null : this.getCpuSeries().equals(other.getCpuSeries()))
            && (this.getCpuModel() == null ? other.getCpuModel() == null : this.getCpuModel().equals(other.getCpuModel()))
            && (this.getMaxTurboFrequency() == null ? other.getMaxTurboFrequency() == null : this.getMaxTurboFrequency().equals(other.getMaxTurboFrequency()))
            && (this.getCpuCores() == null ? other.getCpuCores() == null : this.getCpuCores().equals(other.getCpuCores()))
            && (this.getIsUseApi() == null ? other.getIsUseApi() == null : this.getIsUseApi().equals(other.getIsUseApi()))
            && (this.getUnsupportApiVersions() == null ? other.getUnsupportApiVersions() == null : this.getUnsupportApiVersions().equals(other.getUnsupportApiVersions()))
            && (this.getCreateDatetime() == null ? other.getCreateDatetime() == null : this.getCreateDatetime().equals(other.getCreateDatetime()))
            && (this.getManufacturerId() == null ? other.getManufacturerId() == null : this.getManufacturerId().equals(other.getManufacturerId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getBrand() == null) ? 0 : getBrand().hashCode());
        result = prime * result + ((getModel() == null) ? 0 : getModel().hashCode());
        result = prime * result + ((getTotalMem() == null) ? 0 : getTotalMem().hashCode());
        result = prime * result + ((getCpuBrand() == null) ? 0 : getCpuBrand().hashCode());
        result = prime * result + ((getCpuSeries() == null) ? 0 : getCpuSeries().hashCode());
        result = prime * result + ((getCpuModel() == null) ? 0 : getCpuModel().hashCode());
        result = prime * result + ((getMaxTurboFrequency() == null) ? 0 : getMaxTurboFrequency().hashCode());
        result = prime * result + ((getCpuCores() == null) ? 0 : getCpuCores().hashCode());
        result = prime * result + ((getIsUseApi() == null) ? 0 : getIsUseApi().hashCode());
        result = prime * result + ((getUnsupportApiVersions() == null) ? 0 : getUnsupportApiVersions().hashCode());
        result = prime * result + ((getCreateDatetime() == null) ? 0 : getCreateDatetime().hashCode());
        result = prime * result + ((getManufacturerId() == null) ? 0 : getManufacturerId().hashCode());
        return result;
    }
    
    //管理设备品牌型号
    private Long deviceTotal;
    private Long producedDevicesTotal;
    private String fullname;

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	
	public Long getDeviceTotal() {
		return deviceTotal;
	}

	public void setDeviceTotal(Long deviceTotal) {
		this.deviceTotal = deviceTotal;
	}
	
	public Long getProducedDevicesTotal() {
		return producedDevicesTotal;
	}

	public void setProducedDevicesTotal(Long producedDevicesTotal) {
		this.producedDevicesTotal = producedDevicesTotal;
	}
}