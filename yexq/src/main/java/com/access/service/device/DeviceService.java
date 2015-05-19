package com.access.service.device;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.access.base.BaseDao;
import com.access.base.BaseService;
import com.access.core.commons.Page;
import com.access.core.constant.Constants;
import com.access.core.util.DateUtil;
import com.access.core.util.DeviceTaskUtil;
import com.access.core.util.PropertiesUtil;
import com.access.core.util.StringUtil;
import com.access.core.util.ValidateUtil;
import com.access.core.util.dataMQUtil;
import com.access.core.util.rules.Length;
import com.access.core.util.rules.Rule;
import com.access.dao.device.AAAVirtualDeviceMapper;
import com.access.dao.device.ComponentMapper;
import com.access.dao.device.DeviceGroupMapper;
import com.access.dao.device.DeviceHasDeviceGroupMapper;
import com.access.dao.device.DeviceMapper;
import com.access.dao.device.DeviceModelMapper;
import com.access.dao.device.ProducedDevicesMapper;
import com.access.dao.device.SsidVirtualDeviceMapper;
import com.access.dao.device.VlanVirtualDeviceMapper;
import com.access.dao.system.LocationMapper;
import com.access.model.account.AccountHasTerminalUser;
import com.access.model.device.AAAVirtualDevice;
import com.access.model.device.ComponentWithBLOBs;
import com.access.model.device.Device;
import com.access.model.device.DeviceGroup;
import com.access.model.device.DeviceHasDeviceGroup;
import com.access.model.device.DeviceModel;
import com.access.model.device.DeviceWithBLOBs;
import com.access.model.device.ProducedDevices;
import com.access.model.device.SsidVirtualDevice;
import com.access.model.device.VlanVirtualDevice;
import com.access.model.system.Location;
import com.access.model.system.ThirdPartAuth;
import com.access.model.system.ThirdPlatform;
import com.access.model.user.TerminalUser;
import com.access.model.user.TerminalUserAuthLog;
import com.access.model.user.TerminalUserHasDevice;
import com.access.model.user.UserBlacklist;
import com.access.model.user.UserWhitelist;
import com.alipay.util.httpClient.HttpRequest;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Service("deviceService")
public class DeviceService extends BaseService {
	Logger logger  =  Logger.getLogger(this.getClass());
	@Resource(name="baseDao")
	private BaseDao baseDao;
	
	@Resource(name = "deviceMapper")
	private DeviceMapper deviceMapper;

	@Resource(name = "locationMapper")
	private LocationMapper locationMapper;
	
	@Resource(name="AAAVirtualDeviceMapper")
	private AAAVirtualDeviceMapper aaaVirtualDeviceMapper;
	
	@Resource(name = "ssidVirtualDeviceMapper")
	private SsidVirtualDeviceMapper ssidVirtualDeviceMapper;
	
	@Resource(name = "vlanVirtualDeviceMapper")
	private VlanVirtualDeviceMapper vlanVirtualDeviceMapper;
	@Resource(name="componentMapper")  
	private ComponentMapper componentMapper;
	
	@Resource(name="deviceModelMapper")
	private DeviceModelMapper deviceModelMapper;

	@Resource(name="producedDevicesMapper")
	private ProducedDevicesMapper producedDevicesMapper;
	
	@Resource(name="deviceGroupMapper")
	private DeviceGroupMapper deviceGroupMapper;
	
	@Resource(name="deviceHasDeviceGroupMapper")
	private DeviceHasDeviceGroupMapper deviceHasDeviceGroupMapper;
	
	public DeviceWithBLOBs getDeviceById(String id) {
		return this.deviceMapper.selectByPrimaryKey(id);
	}
	
	public Device getDeviceDetailById(String id) {
		return this.deviceMapper.getDeviceDetailByPrimaryKey(id);
	}
	
	/**
	 * 根据网元ID和设备类型获取虚拟设备
	 * @param device
	 * @return
	 */
	public DeviceWithBLOBs getDeviceByDevice(DeviceWithBLOBs device) {
		return this.deviceMapper.selectByPrimaryKeySelective(device);
	}
	

	/**
	 * 根据网元ID获取虚拟设备
	 * @param emsDevId
	 * @return
	 */
	public DeviceWithBLOBs getDeviceByEmsDevId(Long emsDevId) {
		DeviceWithBLOBs device = null;
		
		if(emsDevId != null) {
			device = this.deviceMapper.getDeviceByEmsDevId(emsDevId); 
		}
		
		return device;
	}
	
	/**
	 * 根据网元ID和设备类型获取虚拟设备
	 * @param device
	 * @return
	 */
	public DeviceWithBLOBs getDeviceByEmsDevIdAndType(Long emsDevId, String type) {
		DeviceWithBLOBs device = null;
		
		if(emsDevId != null && type != null) {
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("emsDevId", emsDevId);
			paramMap.put("type", type);
			
			device =  this.deviceMapper.selectByEmsDevIdAndType(paramMap);
		}
		
		return device;
	}
	
	/**
	 * 根据网元ID和mac获取虚拟设备
	 * @param device
	 * @return
	 */
	public DeviceWithBLOBs getDeviceByEmsDevIdAndMac(Long emsDevId, String mac) {
		DeviceWithBLOBs device = null;
		
		if(emsDevId != null && mac != null) {
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("emsDevId", emsDevId);
			paramMap.put("mac", mac);
			
			device =  this.deviceMapper.selectByEmsDevIdAndMac(paramMap);
		}
		
		return device;
	}

	/**
	 * 查找location
	 * 
	 * @param id
	 * @return
	 */
	public Location getLocationById(Long id) {
		return locationMapper.selectByPrimaryKey(id);
	}
	
	/**
	 * 更新location
	 * @param location
	 * @return
	 */
	public int updateLocation(Location location) {
		result = 0;
		
		if(location != null) {
			result = locationMapper.updateByPrimaryKey(location);
			this.sendLocation(location, Constants.OPT_TYPE_UPDATE, Constants.LOCATION_TBL);
		}
		return result;
	}
	
	/**
	 * 根据设备ID获取虚拟设备
	 * @param deviceId
	 * @return
	 */
	public AAAVirtualDevice getRaduisByDeviceId(String deviceId) {
		AAAVirtualDevice result = null;
        
        if (StringUtils.isNotBlank(deviceId)) {
            result = this.aaaVirtualDeviceMapper.getRaduisByDeviceId(deviceId);
        }

        return result;
    }
	
	/**
	 * 根据设备Ip获取虚拟设备
	 * @param deviceId
	 * @return
	 */
	public AAAVirtualDevice getRaduisByDeviceIp(String deviceIp) {
		AAAVirtualDevice result = null;
        
        if (StringUtils.isNotBlank(deviceIp)) {
            result = this.aaaVirtualDeviceMapper.getRaduisByDeviceIp(deviceIp);
        }

        return result;
    }
	/**
	 * 根据acName获取设备
	 * @param wlanacname
	 * @return
	 */
	public AAAVirtualDevice getRaduisByAcname(String wlanacname) {
		AAAVirtualDevice result = null;
		
        if (StringUtils.isNotBlank(wlanacname)) {
            result = this.aaaVirtualDeviceMapper.getRaduisByAcname(wlanacname);
        }

        return result;
    }
	
	/**
	 * 获取deviceId和WlanAcName获取设备
	 * @param raduis
	 * @return
	 */
	public AAAVirtualDevice getRaduisByRaduis(AAAVirtualDevice raduis) {
		AAAVirtualDevice result = null;
        result = this.aaaVirtualDeviceMapper.getRaduisByRaduis(raduis);
        
        return result;
    }
	/**
	 * 根据设备ssid和mac获取瘦ap
	 * @param deviceId
	 * @return
	 */
	public SsidVirtualDevice getFitApBySsidAndMac(SsidVirtualDevice record) {
		SsidVirtualDevice result = null;
        result = this.ssidVirtualDeviceMapper.getFitApBySsidAndMac(record);
        return result;
    }
	
	

	/**
	 * 2.6平台
	 * AC/BAS默认device_id类型：RADIUS-RADIUS-8位年月日-8位随机数
	 * FAT-AP默认device_id类型：brand-model-8位年月日-8位随机数
	 */
	public String generateDeviceIdFor26(String brand, String model,Date importedDate) {
		String newDeviceId = null;
		String connector = "-";
		int randomSeedStringLength = 8;
		if (StringUtils.isBlank(brand)) {
			brand = "NO_BRAND";
		}
		brand = brand.replaceAll("/[^A-Za-z0-9_-]/", "");
		if (StringUtils.isBlank(model)) {
			model = "NO_MODEL";
		}
		model = model.replaceAll("/[^A-Za-z0-9_-]/", "");
		if (importedDate == null) {
			importedDate = new Date();
		}
		String deviceIdProfix = brand + connector + model + connector
				+ DateUtil.formatToString(importedDate, DateUtil.YYYYMMDD)
				+ connector;
		String randomSeedStr = null;
		boolean isExisted = false;
		do {
			String uuid = UUID.randomUUID().toString().replace("-", "");
			randomSeedStr = uuid.substring(0, randomSeedStringLength);
			DeviceWithBLOBs device = this.deviceMapper
					.selectByPrimaryKey(deviceIdProfix + deviceIdProfix);
			if (device != null) {
				isExisted = true;
			}
		} while (isExisted);
		newDeviceId = deviceIdProfix + randomSeedStr;
		return newDeviceId;
	}
	
	/**
	 * 2.6平台
	 * FIT-AP默认device_id类型：FIT-AP-8位年月日-8位随机数
	 */
	public String generateFitApDeviceIdFor26(Date importedDate) {
		String newDeviceId = null;
		String connector = "-";
		String deviceIdProfix = "FIT-AP-"
				+ DateUtil.formatToString(importedDate, DateUtil.YYYYMMDD)
				+ connector;
		String randomSeedStr = null;
		int randomSeedStringLength = 8;
		boolean isExisted = false;
		do {
			String uuid = UUID.randomUUID().toString().replace("-", "");
			randomSeedStr = uuid.substring(0, randomSeedStringLength);
			DeviceWithBLOBs device = this.deviceMapper
					.selectByPrimaryKey(deviceIdProfix + deviceIdProfix);
			if (device != null) {
				isExisted = true;
			}
		} while (isExisted);
		newDeviceId = deviceIdProfix + randomSeedStr;
		return newDeviceId;
	}

	/**
	 * 3.0接入系统BAS设备生成device_id,格式：brand-model-8位年月日-8位随机数
	 * 默认:BAS-8位年月日-8位随机数
	 */
	public String generateBASDeviceId(String brand, String model, Date importedDate) {
		String newDeviceId = null;
		String connector = "-";
		StringBuffer deviceIdProfix = new StringBuffer();
		int randomSeedStringLength = 8;
		if (StringUtils.isBlank(brand) && StringUtils.isBlank(model)) {
			deviceIdProfix.append(Constants.BAS_DEVICE_BRAND).append(connector);
		}
		if(StringUtils.isNotBlank(brand)){
			brand = brand.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(brand).append(connector);
		}
		if (StringUtils.isNotBlank(model)) {
			model = model.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(model).append(connector);
		}
		
		if (importedDate == null) {
			importedDate = new Date();
		}
		deviceIdProfix.append(DateUtil.formatToString(importedDate, DateUtil.YYYYMMDD)).append(connector);
		String deviceIdProfixStr = deviceIdProfix.toString();
		String randomSeedStr = null;
		boolean isExisted;
		do {
			isExisted = false;
			String uuid = UUID.randomUUID().toString().replace("-", "");
			randomSeedStr = uuid.substring(0, randomSeedStringLength);
			DeviceWithBLOBs device = this.deviceMapper
					.selectByPrimaryKey(deviceIdProfixStr + randomSeedStr);
			if (device != null) {
				isExisted = true;
			}
		} while (isExisted);
		newDeviceId = deviceIdProfixStr + randomSeedStr;
		return newDeviceId;
	}
	
	/**
	 * 3.0接入系统FAT-AP设备生成device_id,格式：brand-model-8位年月日-8位随机数
	 * 默认:FAT_AP-8位年月日-8位随机数
	 */
	public String generateFatApDeviceId(String brand, String model, Date importedDate) {
		String newDeviceId = null;
		String connector = "-";
		StringBuffer deviceIdProfix = new StringBuffer();
		int randomSeedStringLength = 8;
		if (StringUtils.isBlank(brand) && StringUtils.isBlank(model)) {
			deviceIdProfix.append(Constants.FAT_AP_DEVICE_BRAND_EN).append(connector);
		}
		if(StringUtils.isNotBlank(brand)){
			brand = brand.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(brand).append(connector);
		}
		if (StringUtils.isNotBlank(model)) {
			model = model.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(model).append(connector);
		}
		
		if (importedDate == null) {
			importedDate = new Date();
		}
		deviceIdProfix.append(DateUtil.formatToString(importedDate, DateUtil.YYYYMMDD)).append(connector);
		String deviceIdProfixStr = deviceIdProfix.toString();
		String randomSeedStr = null;
		boolean isExisted;
		do {
			isExisted = false;
			String uuid = UUID.randomUUID().toString().replace("-", "");
			randomSeedStr = uuid.substring(0, randomSeedStringLength);
			DeviceWithBLOBs device = this.deviceMapper
					.selectByPrimaryKey(deviceIdProfixStr + randomSeedStr);
			if (device != null) {
				isExisted = true;
			}
		} while (isExisted);
		newDeviceId = deviceIdProfixStr + randomSeedStr;
		return newDeviceId;
	}
	
	/**
	 * 3.0接入系统FIT-AP设备生成device_id,格式：brand-model-acname-ssid-8位年月日-8位随机数
	 * 默认:FIT_AP-acname-ssid-8位年月日-8位随机数
	 */
	public String generateFitApDeviceId(String brand, String model, String acname, String ssid, Date importedDate) {
		String newDeviceId = null;
		String connector = "-";
		StringBuffer deviceIdProfix = new StringBuffer();
		int randomSeedStringLength = 8;
		int deviceIdMaxLength = 64;
		if (StringUtils.isBlank(brand) && StringUtils.isBlank(model)) {
			deviceIdProfix.append(Constants.FIT_AP_DEVICE_BRAND_EN).append(connector);
		}
		if(StringUtils.isNotBlank(brand)){
			brand = brand.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(brand).append(connector);
		}
		if (StringUtils.isNotBlank(model)) {
			model = model.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(model).append(connector);
		}
		if (StringUtils.isNotBlank(acname)) {
			acname = acname.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(acname).append(connector);
		}
		if (StringUtils.isNotBlank(ssid)) {
			ssid = ssid.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(ssid).append(connector);
		}
		
		if (importedDate == null) {
			importedDate = new Date();
		}
		deviceIdProfix.append(DateUtil.formatToString(importedDate, DateUtil.YYYYMMDD)).append(connector);
		String deviceIdProfixStr = deviceIdProfix.toString();
		String randomSeedStr = null;
		boolean isExisted;
		do {
			isExisted = false;
			String uuid = UUID.randomUUID().toString().replace("-", "");
			randomSeedStr = uuid.substring(0, randomSeedStringLength);
			newDeviceId = deviceIdProfixStr + randomSeedStr;
			if(newDeviceId.length()>deviceIdMaxLength)
				newDeviceId = newDeviceId.substring(0,deviceIdMaxLength);
			DeviceWithBLOBs device = this.deviceMapper.selectByPrimaryKey(newDeviceId);
			if (device != null) {
				isExisted = true;
			}
		} while (isExisted);
		return newDeviceId;
	}
	
	/**
	 * 3.0接入系统AC设备生成device_id,格式：brand-model-wlanacname-8位年月日-8位随机数
	 * 默认:AC-wlanacname-8位年月日-8位随机数
	 */
	public String generateACDeviceId(String brand, String model, String wlanacname, Date importedDate) {
		String newDeviceId = null;
		String connector = "-";
		StringBuffer deviceIdProfix = new StringBuffer();
		int randomSeedStringLength = 8;
		if (StringUtils.isBlank(brand) && StringUtils.isBlank(model)) {
			deviceIdProfix.append(Constants.AC_DEVICE_BRAND).append(connector);
		}
		if(StringUtils.isNotBlank(brand)){
			brand = brand.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(brand).append(connector);
		}
		if (StringUtils.isNotBlank(model)) {
			model = model.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(model).append(connector);
		}
		
		if (importedDate == null) {
			importedDate = new Date();
		}
		deviceIdProfix.append(wlanacname).append(connector).append(DateUtil.formatToString(importedDate, DateUtil.YYYYMMDD)).append(connector);
		String deviceIdProfixStr = deviceIdProfix.toString();
		
		String randomSeedStr = null;
		boolean isExisted;
		do {
			isExisted = false;
			String uuid = UUID.randomUUID().toString().replace("-", "");
			randomSeedStr = uuid.substring(0, randomSeedStringLength);
			DeviceWithBLOBs device = this.deviceMapper
					.selectByPrimaryKey(deviceIdProfixStr + randomSeedStr);
			if (device != null) {
				isExisted = true;
			}
		} while (isExisted);
		newDeviceId = deviceIdProfixStr + randomSeedStr;
		return newDeviceId;
	}
	
	/**
	 * 3.0接入系统热点生成device_id,格式：VLAN-acname-cvlan-pvlan-8位年月日-8位随机数
	 */
	public String generateVlanDeviceId(String acname, String cvlan, String pvlan, Date importedDate) {
		String newDeviceId = null;
		String connector = "-";
		StringBuffer deviceIdProfix = new StringBuffer("VLAN-");
		int randomSeedStringLength = 8;
		int deviceIdMaxLength = 64;
		if(StringUtils.isNotBlank(acname)){
			acname = acname.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(acname).append(connector);
		}
		if (StringUtils.isNotBlank(cvlan) && StringUtils.isNotBlank(pvlan)) {
			cvlan = cvlan.replaceAll("/[^A-Za-z0-9_-]/", "");
			pvlan = pvlan.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(cvlan).append(".").append(pvlan).append(connector);
		} else if (StringUtils.isNotBlank(cvlan)) {
			cvlan = cvlan.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(cvlan).append(connector);
		} else if (StringUtils.isNotBlank(pvlan)) {
			pvlan = pvlan.replaceAll("/[^A-Za-z0-9_-]/", "");
			deviceIdProfix.append(pvlan).append(connector);
		}
		
		if (importedDate == null) {
			importedDate = new Date();
		}
		deviceIdProfix.append(DateUtil.formatToString(importedDate, DateUtil.YYYYMMDD)).append(connector);
		String deviceIdProfixStr = deviceIdProfix.toString();
		String randomSeedStr = null;
		boolean isExisted;
		do {
			isExisted = false;
			String uuid = UUID.randomUUID().toString().replace("-", "");
			randomSeedStr = uuid.substring(0, randomSeedStringLength);
			newDeviceId = deviceIdProfixStr + randomSeedStr;
			if(newDeviceId.length()>deviceIdMaxLength)
				newDeviceId = newDeviceId.substring(0,deviceIdMaxLength);
			DeviceWithBLOBs device = this.deviceMapper.selectByPrimaryKey(newDeviceId);
			if (device != null) {
				isExisted = true;
			}
		} while (isExisted);
		return newDeviceId;
	}
	
	/**
	 * 根据account Id 获取或创建默认Location（全空）
	 * @param accountId
	 * @return
	 */
	public Location getOrCreateDefaultLocationByAccountId(Long accountId) {
		Location dftLocation = this.locationMapper.getEmptyLocaitonByAccountId(accountId);
		
		if (dftLocation == null) {
			dftLocation = new Location();
			dftLocation.setAccountId(accountId);
			
			this.locationMapper.insertSelective(dftLocation);
			this.sendLocation(dftLocation, Constants.OPT_TYPE_INSERT, Constants.LOCATION_TBL);
		}
		
		return dftLocation;
	}
	
	public ComponentWithBLOBs getOrCreateComponent(String componentVersion) {
		ComponentWithBLOBs component = null;
		
		if (StringUtils.isNotBlank(componentVersion)) {
			component = this.getComponentByVersionAndType(componentVersion, Constants.COMPONENT_TYPE_FIRMWARE);
			if (component == null) {
				component = new ComponentWithBLOBs();
				component.setVersion(componentVersion);
				this.componentMapper.insertSelective(component);
				this.sendComponent(component, Constants.OPT_TYPE_INSERT, Constants.COMPONENT_TBL);
			}
		}
		
		return component;
	}
	
	public ComponentWithBLOBs getComponentByVersionAndType(String compenentVersion, String componentType) {
        ComponentWithBLOBs component = null;
        if (StringUtils.isNotBlank(componentType) && StringUtils.isNotBlank(componentType)) {
            Map<String, String> param = new HashMap<String, String>();
            param.put("version", compenentVersion);
            param.put("type", componentType);

            component = componentMapper.getComponentByVersionAndType(param);
        }

        return component;
    }
	
	/**
	 * 获取一个热点
	 */
	public VlanVirtualDevice getVlanDevice(VlanVirtualDevice vlanDevice) {
		VlanVirtualDevice vlanDeviceInDB = null;
		if(vlanDevice != null) {
			vlanDeviceInDB = vlanVirtualDeviceMapper.findByVlanVirtualDevice(vlanDevice);
		}
		return vlanDeviceInDB;
	}
	
	/**
	 * 保存热点
	 */
	public int saveVlanVirtualDevice(VlanVirtualDevice vlanDevice){
        int result = this.vlanVirtualDeviceMapper.insertSelective(vlanDevice);
        this.sendVlanVirtualDevice(vlanDevice, Constants.OPT_TYPE_INSERT, Constants.TELECOM_VIRTUAL_DEVICE_TBL);
        return result;
    }
	
	/**
	 * 根据deviceId获取要更新的热点
	 * @param deviceId
	 * @return
	 */
	public VlanVirtualDevice getVlanDeviceByDeviceId(String deviceId) {
		VlanVirtualDevice vlanDevice = null;
		
		if(StringUtils.isNotBlank(deviceId)) {
			vlanDevice = vlanVirtualDeviceMapper.selectByDeviceId(deviceId);
		}
		
		return vlanDevice;
	}
	
	/**
	 * 更新热点
	 */
	public int updateByPrimaryKeySelective(VlanVirtualDevice vlanDevice) {
		result = vlanVirtualDeviceMapper.updateByPrimaryKeySelective(vlanDevice);
		this.sendVlanVirtualDevice(vlanDevice, Constants.OPT_TYPE_UPDATE, Constants.TELECOM_VIRTUAL_DEVICE_TBL);
		
		return result;
	}
	
	/**
	 * 根据SSID, acDeviceId, apMac获取一条SsidVirtualDevice记录
	 * @param ssid
	 * @param acDeviceId
	 * @param apMac
	 * @return
	 */
	public SsidVirtualDevice getSsidDevice(String ssid, String acDeviceId, String apMac) {
		SsidVirtualDevice ssidDevice = null;
			
		if(ssid != null && acDeviceId != null && apMac != null) {
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("ssid", ssid);
			paramMap.put("acDeviceId", acDeviceId);
			paramMap.put("apMac", apMac);
			ssidDevice = ssidVirtualDeviceMapper.selectBySsidMacAcDeviceId(paramMap);
		}
		
		return ssidDevice;
	}
	
	/**
	 * 根据deviceId获取一条SsidVirtualDevice记录
	 * @param deviceId
	 * @return
	 */
	public SsidVirtualDevice getSsidDeviceByDeviceId(String deviceId) {
		SsidVirtualDevice ssidDevice = null;
		
		if(StringUtils.isNotBlank(deviceId)) {
			ssidDevice = ssidVirtualDeviceMapper.selectByDeviceId(deviceId);
		}
		
		return ssidDevice;
	}
	
	/**
	 * 根据主键更新一条SsidVirtualDevice记录
	 * @param ssidDevice
	 * @return
	 */
	public int updateByPrimaryKeySelective(SsidVirtualDevice ssidDevice) {
		result = 0;
		
		if(ssidDevice != null && ssidDevice.getId() != null && ssidDevice.getAcDeviceId() != null
				&& ssidDevice.getApMac() != null && ssidDevice.getSsid() != null && ssidDevice.getCreateDatetime() != null) {
			result = ssidVirtualDeviceMapper.updateByPrimaryKeySelective(ssidDevice);
			this.sendSsidVirtualDevice(ssidDevice, Constants.OPT_TYPE_UPDATE, Constants.FIT_AP_VIRTUAL_DEVICE_TBL);
		}
		
		return result;
	}
	
	/**
	 * 根据emsDeviceId获取一条ProducedDevices记录
	 * @param emsDevId
	 * @return
	 */
	public ProducedDevices getProducedDeviceByEmsDevId(Long emsDevId) {
		ProducedDevices producedDevice = null;
		
		if(emsDevId != null) {
			producedDevice = producedDevicesMapper.selectByEmsDeviceId(emsDevId);
		}
		
		return producedDevice;
	}
	
	/**
	 * 插入一条ProducedDevices记录
	 * @param producedDevice
	 * @return
	 */
	public int addProducedDevices(ProducedDevices producedDevice) {
		result = 0;
		
		if(producedDevice != null) {
			result = producedDevicesMapper.insertSelective(producedDevice);
			this.sendProduceDevice(producedDevice, Constants.OPT_TYPE_INSERT, Constants.PRODUCED_DEVICE_TBL);
		}
		
		return result;
	}
	
	/**
	 * 更新ProducedDevices记录
	 * @param producedDevice
	 * @return
	 */
	public int updateProducedDevices(ProducedDevices producedDevice) {
		result = 0;
		
		if(producedDevice != null) {
			result = producedDevicesMapper.updateByPrimaryKeySelective(producedDevice);
			this.sendProduceDevice(producedDevice, Constants.OPT_TYPE_UPDATE, Constants.PRODUCED_DEVICE_TBL);
		}
		
		return result;
	}
	
	
	/**
	 * 根据品牌和型号获取一个deviceModel对象
	 * @param brand
	 * @param model
	 * @return
	 */
	public DeviceModel getModelObjByBrandModel(String brand, String model) {
        DeviceModel resultModel = null;

        if (StringUtils.isNotBlank(brand) && StringUtils.isNotBlank(model)) {
            Map<String, String> param = new HashMap<String, String>();
            param.put("brand", brand);
            param.put("model", model);

            resultModel = this.deviceModelMapper.getModelObjByBrandModel(param);
        }

        return resultModel;
    }
	
	/**
	 * 根据品牌和型号获取deviceModelId
	 * @param brand
	 * @param model
	 * @return
	 */
	public Long getDeviceModelId(String brand, String model) {
		DeviceModel deviceModel = getModelObjByBrandModel(brand ,model);
		
		if(deviceModel == null) {
			deviceModel = addDeviceModel(brand, model);
		}
		
		return deviceModel.getId();
	}
	
	/**
	 * 添加一个deviceModel对象
	 * @param brand
	 * @param model
	 * @return
	 */
	public DeviceModel addDeviceModel(String brand, String model) {
		DeviceModel deviceModel = new DeviceModel();
		deviceModel.setBrand(brand);
		deviceModel.setModel(model);
		deviceModel.setTotalMem(Constants.DEFAULT_DEVICE_TOTAL_MEM);
		deviceModel.setManufacturerId(Constants.SUPER_ADMIN_ACCOUNT_ID);
		deviceModelMapper.insertSelective(deviceModel);
		this.sendDeviceModel(deviceModel, Constants.OPT_TYPE_INSERT, Constants.DEVICE_MODEL_TBL);
		return deviceModel;
	}
	
	/**
	 * 获取deviceModelIdId
	 * @param brand
	 * @param model
	 * @return
	 */
	public long getOrCreateDeviceModelIdByBrandModel(String brand, String model) {
    	DeviceModel deviceModel = new DeviceModel();
    	Map<String, String> paramMap = new HashMap<String, String>();
    	paramMap.put("brand", brand);
    	paramMap.put("model", model);
    	deviceModel = deviceModelMapper.getModelObjByBrandModel(paramMap);
    	if (deviceModel != null) {
    		return deviceModel.getId();
    	} else {
    		DeviceModel newDeviceModel = new DeviceModel();
    		newDeviceModel.setBrand(brand);
    		newDeviceModel.setModel(model);
    		newDeviceModel.setTotalMem(Constants.DEFAULT_DEVICE_TOTAL_MEM);
    		newDeviceModel.setManufacturerId(Constants.SUPER_ADMIN_ACCOUNT_ID);
    		deviceModelMapper.insertSelective(newDeviceModel);
    		this.sendDeviceModel(newDeviceModel, Constants.OPT_TYPE_INSERT, Constants.DEVICE_MODEL_TBL);
    		return newDeviceModel.getId();
    	}
    }
	
	/**
	 * 保存 新设备
	 * @param device
	 * @return
	 */
	public int saveNewDevice(DeviceWithBLOBs device) {
	    int result = deviceMapper.insertSelective(device);
		this.sendDevice(device, Constants.OPT_TYPE_INSERT, Constants.DEVICE_TBL);
		return result;
	}
	
	/**
	 * 保存 AAA设备
	 * @param device
	 * @return
	 */
	public int saveAAAVirtualDevice(AAAVirtualDevice radius){
        int result = 0;
        result = this.aaaVirtualDeviceMapper.insertSelective(radius);
        this.sendAAAVirtualDevice(radius, Constants.OPT_TYPE_INSERT, Constants.RADIUS_VIRTUAL_DEVICE_TBL);
        return result;
    }
	
	/**
	 * 保存 ssid设备
	 * @param device
	 * @return
	 */
	public int saveSsidVirtualDevice(SsidVirtualDevice device){
        int result = this.ssidVirtualDeviceMapper.insertSelective(device);
        this.sendSsidVirtualDevice(device, Constants.OPT_TYPE_INSERT, Constants.FIT_AP_VIRTUAL_DEVICE_TBL);
        return result;
    }
	
	/**
	 * 更新DeviceWithBLOBs设置
	 */
/*	public int updateSettings(String deviceId, Map<String, Object> param) {
		int result = -1;
		if (param != null) {
			param.put("deviceId", deviceId);
			result = deviceMapper.updateSettings(param);
		}
		return result;
	}*/
	
	/**
	 * 根据device_id更新AAAVirtualDevice
	 */
	public int updateAAAVirtualDevice(AAAVirtualDevice radius) {
    	 int result = 0;
    	 result = aaaVirtualDeviceMapper.updateByDeviceId(radius);
    	 this.sendAAAVirtualDevice(radius, Constants.OPT_TYPE_UPDATE, Constants.RADIUS_VIRTUAL_DEVICE_TBL);
    	 return result;
    }
	
	/**
	 * 根据device_id更新Device
	 */
	public int updateByPrimaryKeySelective(DeviceWithBLOBs radius) {
    	int result = 0;
    	result = deviceMapper.updateByPrimaryKeySelective(radius);
    	this.sendDevice(radius, Constants.OPT_TYPE_UPDATE, Constants.DEVICE_TBL);
    	return result;
    }
	
	public int updateByMacAndSsidSelective(SsidVirtualDevice fitAp) {
    	int result = ssidVirtualDeviceMapper.updateByMacAndSsidSelective(fitAp);
    	this.sendSsidVirtualDevice(fitAp, Constants.OPT_TYPE_UPDATE, Constants.FIT_AP_VIRTUAL_DEVICE_TBL);
    	return result;
    }
	
	/**
	 * 构建设备ID，brand_model_8位日期_8位UUID
	 * @param brand
	 * @param model
	 * @param importedDate
	 * @return
	 */
	public String generateDeviceId(String brand, String model, Date importedDate) {
		String newDeviceId = null;
		String connector = "-";
		int randomSeedStringLength = 8;
		
		if (StringUtils.isBlank(brand)) {
			brand = "NO_BRAND";
		}
        brand = brand.replaceAll("/[^A-Za-z0-9_-]/", "");
		if (StringUtils.isBlank(model)) {
			model = "NO_MODEL";
		}
		model = model.replaceAll("/[^A-Za-z0-9_-]/", "");
		if (importedDate == null) {
			importedDate = new Date();
		}
		
		String deviceIdProfix = brand + connector + model + connector 
				+ DateUtil.formatToString(importedDate, DateUtil.YYYYMMDD) + connector;
		String randomSeedStr = null;

		boolean isExisted = false;
		do {
			
			String uuid = UUID.randomUUID().toString().replace("-", "");
			randomSeedStr = uuid.substring(0, randomSeedStringLength);
			
			DeviceWithBLOBs device = this.deviceMapper.selectByPrimaryKey(deviceIdProfix + randomSeedStr);
			
			if (device != null) {
				isExisted = true;
			}
		} while (isExisted);
		
		newDeviceId = deviceIdProfix + randomSeedStr;
		
		return newDeviceId;
	}
	
	/**
	 * 验证设备是否存在
	 * @param mac
	 * @return
	 */
	public ProducedDevices getProductedDevicesByMac(String mac){
		return producedDevicesMapper.selectByMac(mac);
	}
	
	public Location saveOrGetLocation(Location location){
		List<Location> locationsExisted = locationMapper.searchLocation(location);
		
		if(locationsExisted == null || locationsExisted.size() == 0){
			if(location.getAccountId() ==  null) {
				location.setAccountId(1L);
			}
			locationMapper.insertSelective(location);
			sendLocation(location, Constants.OPT_TYPE_INSERT, Constants.LOCATION_TBL);
		}else {
			location = locationsExisted.get(0);
		}
		return location;
	}
	
	/**
	 * 获取所属地ID
	 * @param accountId
	 * @return
	 */
	public Long[] getLocation(Location location){
		
		List<Location> locations = locationMapper.searchLocation(location);
		List idlist = new ArrayList();
		Long[] ids = null;
		if(locations != null && locations.size() > 0) {
			Iterator<Location> it = locations.iterator();
			while (it.hasNext()) {
				Location locat = (Location)it.next();
				idlist.add(locat.getId());
			}
			ids = (Long[])idlist.toArray(new Long[0]);
		}
		return ids;
	}
	
	/**
	 * 获取商户户的location列表
	 * @param accountId
	 * @return
	 */
	public List<Location> getLocationList(Long accountId){
		return locationMapper.getLocationList(accountId);
	}
	
	/**
     * 获取某个地点的所有设备
     * @param locationId
     * @return
     */
    public List<DeviceWithBLOBs> getDevicesByLocationId(Long locationId) {
        List<DeviceWithBLOBs> devices = null;

        if (locationId != null) {
            devices = this.deviceMapper.getDevicesByLocationId(locationId);
        }

        return devices;
    }
	
	/**
	 * 根据version, brand, model查询组件信息
	 * @param compenentVersion device component version
     * @param brand device brand
     * @param model device model
	 * @return
	 */
	public List<ComponentWithBLOBs> getComponentsByVersionModel(String compenentVersion, String brand, String model){
        Map<String, String> deviceSupportedMap = new HashMap<String, String>();
        deviceSupportedMap.put(Constants.COMPONENT_SUPPORTED_BRAND, brand);
        deviceSupportedMap.put(Constants.COMPONENT_SUPPORTED_MODEL, model);

        String deviceModelDesc = new Gson().toJson(deviceSupportedMap);

        Map<String, Object> param = new HashMap<String, Object>();
        param.put("version", compenentVersion);
        param.put("device_supported", deviceModelDesc);

		return componentMapper.getComponentsByVersionModel(param);
	}
	
	/**
	 * 根据组件版本，品牌和型号获取组件ID
	 * @param componentVersion
	 * @param brand
	 * @param model
	 * @return
	 */
	public Long getComponentId(String componentVersion, String brand, String model) {
		  List<ComponentWithBLOBs> componentList = getComponentsByVersionModel(componentVersion, brand, model);
			
		    ComponentWithBLOBs deviceComponent = null;
	        
	        // 固件版本不存在时创建新的固件件
	        if (componentList == null || componentList.size() < 1) {
	            List<Map<String, String>> deviceSupported = new ArrayList<Map<String, String>>();
	            Map<String, String> deviceSupportedMap = new HashMap<String, String>();
	            deviceSupportedMap.put(Constants.COMPONENT_SUPPORTED_BRAND, brand);
	            deviceSupportedMap.put(Constants.COMPONENT_SUPPORTED_MODEL, model);
	            deviceSupported.add(deviceSupportedMap);

	            ComponentWithBLOBs newComponent = new ComponentWithBLOBs();
	            newComponent.setVersion(componentVersion);
	            newComponent.setDeviceSupported(new Gson().toJson(deviceSupported));
	            newComponent.setType(Constants.COMPONENT_TYPE_FIRMWARE);

	            saveOrUpdateComponent(newComponent);

	            deviceComponent = newComponent;
	         
	         // 组件存在时，取其第一个
	        }else {
	            deviceComponent = componentList.get(0);
	        }
	        
	        return deviceComponent.getId();
	}
	
	public boolean saveOrUpdateComponent(ComponentWithBLOBs component) {
        boolean result = false;

        if (component != null) {
            if (component.getId() == null) {
                this.componentMapper.insertSelective(component);
                sendComponent(component, Constants.OPT_TYPE_INSERT, Constants.COMPONENT_TBL);
                result = true;
            }
            else {
                this.componentMapper.updateByPrimaryKeySelective(component);
                sendComponent(component, Constants.OPT_TYPE_UPDATE, Constants.COMPONENT_TBL);
                result = true;
            }
        }

        return result;
    }
	
	public DeviceWithBLOBs getDeviceByMac(String mac){
		return deviceMapper.getDeviceByMac(mac);	
	}
	
	public int deleteProducedDeviceByMac(String mac) {
		
		int result = 0;
		result = producedDevicesMapper.deleteByMac(mac);
		
		ProducedDevices producedDevice = new ProducedDevices();
		producedDevice.setMac(mac);
		this.sendProduceDevice(producedDevice, Constants.OPT_TYPE_DELETE, Constants.PRODUCED_DEVICE_TBL);
		
		return result;
	}
	
	public int saveOrUpdateDevice(DeviceWithBLOBs device) {
		if (device == null) {
			return 0;
		}
		
		int result = 0;
		if (device.getDeviceId() == null) {
			result = deviceMapper.insertSelective(device);
			this.sendDevice(device, Constants.OPT_TYPE_INSERT, Constants.DEVICE_TBL);
		} 
		else {
			result = deviceMapper.updateByPrimaryKeySelective(device);
			this.sendDevice(device, Constants.OPT_TYPE_UPDATE, Constants.DEVICE_TBL);
		}
		
		return result;
	}
	
	 public String setApiDeviceInfo(String deviceId) throws IOException {
	        String apiDeviceInfo = StringUtils.EMPTY;

			if (StringUtils.isNotBlank(deviceId)) {
	            Device device = this.deviceMapper.selectByPrimaryKey(deviceId);

	            apiDeviceInfo = DeviceTaskUtil.generateAcitveApiTaskData(deviceId, this.getLocationById(device.getLocationId()).getAccountId(), device.getRegisterationDate());

	            DeviceTaskUtil.apiDeviceActivePush(deviceId, apiDeviceInfo);
			}

	        return apiDeviceInfo;
	}
	 
	 /**
	  * 检验设备共有参数
	  * @return
	  * @throws Exception
	  */
//	 public String deviceValidateString(DeviceWithBLOBs device,String str) throws Exception{
//		 if(device == null){
//				return "数据提交错误";
//			}
//			else{
//				String validStr = null;
//				ValidateUtil vu = new ValidateUtil();
//				
//				vu.add("type", this.trimInnerSpaceStr(device.getType()), PropertiesUtil.confProperties.getProperty("device.param.type"), 
//                        new Rule[]{new Required(), new Length(30)});
//				vu.add("ems_dev_id", device.getEms_dev_id()+"", PropertiesUtil.confProperties.getProperty("device.param.ems_dev_id"), 
//                        new Rule[]{ new Numeric(), new Required(), new Length(18)});
////    			vu.add("name", device.getName(), PropertiesUtil.confProperties.getProperty("device.param.deviceName"), 
////                        new Rule[]{/*new Regex(Constants.AC_NAME_PATTERN),*/ new Required(), new Length(60)});
//    			vu.add("firmware_version", device.getFramewareVersion(), PropertiesUtil.confProperties.getProperty("device.param.framewareVersion"), 
//                        new Rule[]{new Required(), new Length(50)});
//    			vu.add("brand", device.getBrand(), PropertiesUtil.confProperties.getProperty("device.param.brand"), 
//                        new Rule[]{new Required(), new Length(60)});
//    			vu.add("model", device.getModel(), PropertiesUtil.confProperties.getProperty("device.param.model"), 
//                        new Rule[]{new Required(), new Length(60)});
//    			vu.add("mac", device.getMac(), PropertiesUtil.confProperties.getProperty("device.param.mac"), 
//                        new Rule[]{new Regex(Constants.MAC_PATTERN),new Required(), new Length(60)});
//    			vu.add("ems_create_datetime", str, "添加时间", 
//                        new Rule[]{new DateValue(),new Regex(Constants.DATE_PATTERN), new Required(), new Length(100)});
//    			validStr = vu.validateString();
//    			if(validStr == null) {
//    				if(str.contains("0000")) {
//    					validStr = "添加时间不正确";
//    				}
//    			}
//    			return validStr;
//			}	 
//	 }
	 /**
	  * 检验radius参数
	  * @return
	  * @throws Exception
	  */
//	 public String raduisValidateString(AAAVirtualDevice radius,String port) throws Exception{
//		 if(radius == null){
//				return "数据提交错误";
//			}
//			else{
//				ValidateUtil vu = new ValidateUtil();
//				vu.add("ac_name", radius.getWlanacname(), PropertiesUtil.confProperties.getProperty("device.param.deviceName"), 
//                      new Rule[]{/*new Regex(Constants.AC_NAME_PATTERN),*/ new Required(), new Length(60)});
//				vu.add("devIp", radius.getIpAddr(), PropertiesUtil.confProperties.getProperty("device.param.ip"), 
//                        new Rule[]{new Regex(Constants.IP_PATTERN),new Required(), new Length(50)});
//				vu.add("port",port , PropertiesUtil.confProperties.getProperty("device.param.port"), 
//                        new Rule[]{new Required(),new Numeric(),new Length(10)/*new NumberRange(PropertiesUtil.confProperties.getProperty("user.auth.expireMinutes.min"), 
//								PropertiesUtil.confProperties.getProperty("user.auth.expireMinutes.max"))*/});
//				return vu.validateString();
//			} 
//	 }
	 
	 /**
	  * 检验fit-ap参数
	  * @return
	  * @throws Exception
	  */
//	 public String fitApValidateString(SsidVirtualDevice fitAp) throws Exception{
//		 ValidateUtil vu = new ValidateUtil();
//		 String validStr = null;
//		 vu.add("parentemsdevid", fitAp.getAcDeviceId(), PropertiesUtil.confProperties.getProperty("device.param.parentemsdevid"), 
//                 new Rule[]{ new Numeric(), new Required(), new Length(50)});
//		 vu.add("ssid", fitAp.getSsid(), PropertiesUtil.confProperties.getProperty("device.param.ssid"), 
//                 new Rule[]{new Required(), new Length(100)});
//		 validStr =  vu.validateString();
//		 if(validStr == null) {
//			 DeviceWithBLOBs acDevice = new DeviceWithBLOBs();
//			 acDevice.setEms_dev_id(fitAp.getAcDeviceId());
//			 acDevice.setType(Constants.DEVICE_TYPE_AC);
//			 DeviceWithBLOBs parentemsdev = this.getDeviceByDevice(acDevice);//查询上级ac
//				if(parentemsdev == null) {
//					validStr = PropertiesUtil.confProperties.getProperty("system.msg.acIsNotExits");//AC设备不存在
//				}
//		 }
//			return validStr;
//	 }
	 
	 /**
	  * 检验fat-ap参数
	  * @return
	  * @throws Exception
	  */
	 public String fatApValidateString(ProducedDevices fatAp) throws Exception{
		 ValidateUtil vu = new ValidateUtil();
//		 	vu.add("province", fatAp.getProvince(), PropertiesUtil.confProperties.getProperty("device.param.province"), 
//					new Rule[]{new Length(200)});
//			vu.add("city", fatAp.getCity(), PropertiesUtil.confProperties.getProperty("device.param.city"), 
//					new Rule[]{new Length(200)});
			vu.add("componentVersion", fatAp.getComponentVersion(), PropertiesUtil.confProperties.getProperty("device.param.componentVersion"), 
					new Rule[]{new Length(400)});
			vu.add("pinCode", fatAp.getPinCode(), PropertiesUtil.confProperties.getProperty("device.param.pinCode"), 
					new Rule[]{new Length(60)});
			
			return vu.validateString(); 
	 }
	 
	 /**
	  * 同步FAT-AP设备
	  * 
	  *  @param
	  *  @return
	  * */
//	    public List<String> saveProduceDevices(List<ProducedDevices> devices) {
//	        List<String> errorMsgs = null;
//
//	        if (devices != null && devices.size() > 0) {
//	            for (ProducedDevices device : devices) {
//	                ProducedDevices isExistedInProduced = this.producedDevicesMapper
//	                        .selectByMac(device.getMac());
//	                DeviceWithBLOBs isExistedInDevice = this.deviceMapper
//	                        .getDeviceByMac(device.getMac());
//	                String retMessage = null;
//	                if (isExistedInProduced != null) {
//	                    retMessage = String.format("MAC: %s 已经存在", device.getMac());
//	                } else if (isExistedInDevice != null) {
//	                    retMessage = String
//	                            .format("MAC: %s 已经被激活", device.getMac());
//	                } else {
//	                    this.producedDevicesMapper.insertSelective(device);
//	                }
//	                if (errorMsgs == null) {
//	                    errorMsgs = new ArrayList<String>();
//	                }
//	                if (StringUtils.isNotBlank(retMessage)) {
//	                    errorMsgs.add(retMessage);
//	                }
//	            }
//	        }
//	        return errorMsgs;
//	    }
	    
	    /***
	     * 去掉字符串前后的空间，中间的空格保留
	     * @param str
	     * @return
	     */
	    public String trimInnerSpaceStr(String str){
	    	if(str != null) {
	    		str = str.trim();
		        while(str.startsWith(" ")){
		        str = str.substring(1,str.length()).trim();
		        }
		        while(str.endsWith(" ")){
		        str = str.substring(0,str.length()-1).trim();
		        }
	    	}
	        return str;
	    }
	    
	    /****************************** 已注册设备查询 *******************************/
	    /**
	     * 获取已注册设备的页面
	     * 
	     * @param keywords
	     *            查询关键字，模糊匹配MAC地址、品牌、型号、固件、组件
	     * @return
	     * */
	    @SuppressWarnings("unchecked")
	    public Page<Device> getDevicePage(Page<Device> page, String gettotal, String keywords, String type, 
	            String startDate, String endDate, Long[] locationIds, String province, String city) {
	        Map<String, Object> paramMap = new HashMap<String, Object>();
	        paramMap.put("page", page);
	        // 若参数“关键字”、“起始日期”、“截止日期”存在，传递之。
	        if (StringUtils.isNotBlank(keywords)) {
	            paramMap.put("keywords", keywords.split(" "));
	        }
	        if (StringUtils.isNotBlank(type)) {
	            paramMap.put("type", type);
	        }
	        if (StringUtils.isNotBlank(startDate)) {
	            paramMap.put("startDate", DateUtil.parseToDateTry(startDate));
	        }
	        if (StringUtils.isNotBlank(endDate)) {
	            paramMap.put("endDate", DateUtil.parseToDateTry(endDate));
	        }
	        if (locationIds != null && locationIds.length>0) {
	            paramMap.put("locationIds", locationIds);
	        }
	        if (locationIds == null && (StringUtils.isNotBlank(province) || StringUtils.isNotBlank(city))){
	        	page.setRecords(null);
	        	page.setTotalRecord(0);
	        	page.setTotalPage(0);
	        } else {
		        if (StringUtils.isBlank(gettotal)) {
		            page = baseDao.findPageList("device_getBaseDevicePage", paramMap);
		            //如果（gettotal==null），那么给page对象赋值，总记录数和总分页数
		            int totalR = deviceMapper.getBaseDevicePageTotal(paramMap);
		            //总记录数
		            page.setTotalRecord(totalR);
		            //总分页数
		            page.setTotalPage(totalR/page.getPageSize());
		        } else if (Boolean.valueOf(gettotal)) {
		            page = baseDao.findPageInfo("device_getBaseDevicePage", paramMap);
		        }
	        }

	        return page;
	    }
	    
	    /**
	     * 获取已注册的设备的总量
	     * 
	     * @param
	     * @return
	     * */
	    @SuppressWarnings("unchecked")
	    public int getDevicePageTotal(Page<Device> page, String gettotal, String keywords, String type, 
	            String startDate, String endDate, Location location) {
	        Map<String, Object> paramMap = new HashMap<String, Object>();
	        paramMap.put("page", page);
	        // 若参数“关键字”、“起始日期”、“截止日期”存在，传递之。
	        if (StringUtils.isNotBlank(keywords)) {
	            paramMap.put("keywords", keywords.split(" "));
	        }
	        if (StringUtils.isNotBlank(type)) {
	            paramMap.put("type", type);
	        }
	        if (StringUtils.isNotBlank(startDate)) {
	            paramMap.put("startDate", DateUtil.parseToDateTry(startDate));
	        }
	        if (StringUtils.isNotBlank(endDate)) {
	            paramMap.put("endDate", DateUtil.parseToDateTry(endDate));
	        }
	        if (location != null && location.getId()!=null) {
	            paramMap.put("locationId", location.getId());
	        }
	        return deviceMapper.getBaseDevicePageTotal(paramMap);
	    }

	    /****************************** 分组 *******************************/
	    /**
	     * 获取分组的页面
	     * 
	     * @param keywords
	     *            查询关键字，模糊匹配组名
	     * @return
	     * */
	    @SuppressWarnings("unchecked")
	    public Page<DeviceGroup> getDeviceGroupPage(Page<DeviceGroup> page, String gettotal, String keywords,
	            String province, String city) {
	        Map<String, Object> paramMap = new HashMap<String, Object>();
	        paramMap.put("page", page);
	        // 若参数“关键字”、“起始日期”、“截止日期”存在，传递之。
	        if (StringUtils.isNotBlank(keywords)) {
	            paramMap.put("keywords", keywords.split(" "));
	        }
	        if (StringUtils.isNotBlank(province)) {
	            paramMap.put("province", province);
	        }
	        if (StringUtils.isNotBlank(city)) {
	        	paramMap.put("city", city);
	        }
	        if (StringUtils.isBlank(gettotal)) {
	        	List<DeviceGroup> d = deviceGroupMapper.getDeviceGroupPage(paramMap);
	            page.setRecords(d);
	            //如果（gettotal==null），那么给page对象赋值，总记录数和总分页数
	            int totalR = deviceGroupMapper.getDeviceGroupPageTotal(paramMap);
	            //总记录数
	            page.setTotalRecord(totalR);
	            //总分页数
	            page.setTotalPage(totalR/page.getPageSize());
	        } else if (Boolean.valueOf(gettotal)) {
	        	int totalR = deviceGroupMapper.getDeviceGroupPageTotal(paramMap);
	            page.setTotalRecord(totalR);
	        }

	        return page;
	    }
	    
	    /**
	     * 获取设备分组总量
	     * 
	     * @param keywords关键字，province省份，city城市
	     * @return
	     * */
	    @SuppressWarnings("unchecked")
	    public int getDeviceGroupPageTotal(Page<DeviceGroup> page, String gettotal, String keywords, 
	            String province, String city) {
	        Map<String, Object> paramMap = new HashMap<String, Object>();
	        paramMap.put("page", page);
	        // 若参数“关键字”、“起始日期”、“截止日期”存在，传递之。
	        if (StringUtils.isNotBlank(keywords)) {
	            paramMap.put("keywords", keywords.split(" "));
	        }
	        if (StringUtils.isNotBlank(province)) {
	            paramMap.put("province", province);
	        }
	        if (StringUtils.isNotBlank(city)) {
	        	paramMap.put("city", city);
	        }
	        return deviceGroupMapper.getDeviceGroupPageTotal(paramMap);
	    }
	    
	    /**
		 * 根据groupname查询分组
		 * @param groupName
		 * @return
		 */
		public DeviceGroup getDeviceGroupByGroupname(String groupName){
			return deviceGroupMapper.selectByGroupname(groupName);
		}
		
		/**
		 * groupname不能重复
		 * @param groupName
		 * @return
		 */
		public boolean isExistDeviceGroup(String groupName){
			boolean result = false;
			DeviceGroup group = getDeviceGroupByGroupname(groupName);
			if (group != null){
				result = true;
			}
			return result;
		}
		
	    /**
		 * 保存或更新分组信息
		 * @param group
		 * @return
		 */
		public void saveOrUpdateDeviceGroup(DeviceGroup group){
			
			DeviceGroup deviceGroup = null;
			if(group.getGroupId()!=null && group.getGroupId()>0) {
				deviceGroup = this.getGroupById(group.getGroupId());
			}
			
			if(deviceGroup == null){
				group.setCreateTime(new Date());
				deviceGroupMapper.insert(group);
			} else {
				group.setUpdateTime(new Date());
				deviceGroupMapper.updateByPrimaryKey(group);
			}
		}
		
		/****************************************数据同步*********************************************************/
		
		public void sendDeviceHasDeviceGroup(Long groupId, String deviceId, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(groupId!=null && groupId>0){
					paramValue.put("group_id", groupId+"");
				}
				if(deviceId!=null && !(deviceId.equals(""))){
					paramValue.put("device_id", StringUtil.convertToString(deviceId));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(groupId!=null && groupId>0){
					conditions = " group_id="+groupId;
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions, groupId);
				} catch (Exception e) {
					logger.error("dataMQ发送device_has_device_group "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送device_has_device_group "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendDeviceHasDeviceGroup(Long groupId, List<String> deviceIds, String tblname) {
			sendDeviceHasDeviceGroup(groupId, null, Constants.OPT_TYPE_DELETE, tblname);
			if(deviceIds != null && deviceIds.size()>0) {
				for(String deviceId : deviceIds){
					sendDeviceHasDeviceGroup(groupId, deviceId, Constants.OPT_TYPE_INSERT, tblname);
				}
			}
		}
		
		public void sendDeviceGroup(DeviceGroup group, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(group.getGroupId()!=null && group.getGroupId()>0){
					paramValue.put("group_id", group.getGroupId()+"");
				}
				
				if(group.getGroupName()!=null && !(group.getGroupName().equals(""))){
					paramValue.put("group_name", StringUtil.convertToString(group.getGroupName()));
				}
				
				if(group.getNote()!=null && !(group.getNote().equals(""))){
					paramValue.put("note", StringUtil.convertToString(group.getNote()));
				} else {
					paramValue.put("note", StringUtil.NULL);
				}
				
				if(group.getProvince()!=null && !(group.getProvince().equals(""))){
					paramValue.put("province", StringUtil.convertToString(group.getProvince()));
				} else {
					paramValue.put("province", StringUtil.NULL);
				}
				
				if(group.getCity()!=null && !(group.getCity().equals(""))){
					paramValue.put("city", StringUtil.convertToString(group.getCity()));
				} else {
					paramValue.put("city", StringUtil.NULL);
				}
				
				if(group.getCountyDistrict()!=null && !(group.getCountyDistrict().equals(""))){
					paramValue.put("county_district", StringUtil.convertToString(group.getCountyDistrict()));
				} else {
					paramValue.put("county_district", StringUtil.NULL);
				}
				
				if(group.getCreateTime()!=null){
					String create_time = DateUtil.formatToString(group.getCreateTime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_time", StringUtil.convertToString(create_time));
				} 
				
				if(group.getUpdateTime()!=null){
//					String update_time = DateUtil.formatToString(group.getUpdateTime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
//					paramValue.put("update_time", StringUtil.convertToString(update_time));
					paramValue.put("update_time", dateToString(group.getUpdateTime()));
				} 
			}

			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(group.getGroupId()!=null && group.getGroupId()>0){
					conditions = " group_id="+group.getGroupId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions, group.getGroupId());
				} catch (Exception e) {
					logger.error("dataMQ发送device_group "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送device_group "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendProduceDevice(ProducedDevices produceDevice, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(produceDevice.getMac()!=null && !(produceDevice.getMac().equals(""))){
					paramValue.put("mac", StringUtil.convertToString(produceDevice.getMac()));
				} 
				if(produceDevice.getId()!=null && !(produceDevice.getId().equals(""))){
					paramValue.put("id", StringUtil.convertToString(produceDevice.getId()));
				} 
				if(produceDevice.getEmsDevId()!=null && produceDevice.getEmsDevId()>0){
					paramValue.put("ems_dev_id", produceDevice.getEmsDevId()+"");
				} 
				if(produceDevice.getEmsCreateDatetime()!=null){
					String emsCreateDatetime = DateUtil.formatToString(produceDevice.getEmsCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("ems_create_datetime", StringUtil.convertToString(emsCreateDatetime));
//					paramValue.put("ems_create_datetime", dateToString(produceDevice.getEmsCreateDatetime()));
				}
				if(produceDevice.getDeviceModelId()!=null && produceDevice.getDeviceModelId()>0){
					paramValue.put("device_model_id", produceDevice.getDeviceModelId()+"");
				} 
				
				if(produceDevice.getBrand()!=null && !(produceDevice.getBrand().equals(""))){
					paramValue.put("brand", StringUtil.convertToString(produceDevice.getBrand()));
				} 
				if(produceDevice.getModel()!=null && !(produceDevice.getModel().equals(""))){
					paramValue.put("model", StringUtil.convertToString(produceDevice.getModel()));
				} 
				if(produceDevice.getFramewareVersion()!=null && !(produceDevice.getFramewareVersion().equals(""))){
					paramValue.put("frameware_version", StringUtil.convertToString(produceDevice.getFramewareVersion()));
				} 
				if(produceDevice.getComponentVersion()!=null && !(produceDevice.getComponentVersion().equals(""))){
					paramValue.put("component_version", StringUtil.convertToString(produceDevice.getComponentVersion()));
				} 
				if(produceDevice.getPinCode()!=null && !(produceDevice.getPinCode().equals(""))){
					paramValue.put("pin_code", StringUtil.convertToString(produceDevice.getPinCode()));
				} 
				if(produceDevice.getConfigItems()!=null && !(produceDevice.getConfigItems().equals(""))){
					paramValue.put("config_items", StringUtil.convertToString(produceDevice.getConfigItems()));
				} 
				if(produceDevice.getProvince()!=null && !(produceDevice.getProvince().equals(""))){
					paramValue.put("province", StringUtil.convertToString(produceDevice.getProvince()));
				} 
				if(produceDevice.getCity()!=null && !(produceDevice.getCity().equals(""))){
					paramValue.put("city", StringUtil.convertToString(produceDevice.getCity()));
				} 
				if(produceDevice.getCounty()!=null && !(produceDevice.getCounty().equals(""))){
					paramValue.put("county", StringUtil.convertToString(produceDevice.getCounty()));
				} 
				if(produceDevice.getCreateDatetime()!=null){
					String createDatetime = DateUtil.formatToString(produceDevice.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(createDatetime));
				}
				if(produceDevice.getStatus()!=null && !(produceDevice.getStatus().equals(""))){
					paramValue.put("status", StringUtil.convertToString(produceDevice.getStatus()));
				} 
				if(produceDevice.getManufacturerId()!=null && produceDevice.getManufacturerId()>0){
					paramValue.put("manufacturer_id", produceDevice.getManufacturerId()+"");
				} 
				if(produceDevice.getXpos()!=null && !(produceDevice.getXpos().equals(""))){
					paramValue.put("xpos", StringUtil.convertToString(produceDevice.getXpos()));
				} 
				if(produceDevice.getYpos()!=null && !(produceDevice.getYpos().equals(""))){
					paramValue.put("ypos", StringUtil.convertToString(produceDevice.getYpos()));
				} 
				if(produceDevice.getFixAddr()!=null && !(produceDevice.getFixAddr().equals(""))){
					paramValue.put("fixaddr", StringUtil.convertToString(produceDevice.getFixAddr()));
				} 
			} 
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)){
				if(produceDevice.getMac()!=null && !(produceDevice.getMac().equals(""))){
					conditions = " mac=" + StringUtil.convertToString(produceDevice.getMac());
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送produced_devices "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送produced_devices "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendDevice(DeviceWithBLOBs device, String optType, String tblname){
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(device.getDeviceId()!=null && !(device.getDeviceId().equals(""))){
					paramValue.put("device_id", StringUtil.convertToString(device.getDeviceId()));
				} 
				if(device.getDeviceModelId()!=null && device.getDeviceModelId()>0){
					paramValue.put("device_model_id", device.getDeviceModelId()+"");
				} 
				if(device.getBrand()!=null && !(device.getBrand().equals(""))){
					paramValue.put("brand", StringUtil.convertToString(device.getBrand()));
				}
				if(device.getModel()!=null && !(device.getModel().equals(""))){
					paramValue.put("model", StringUtil.convertToString(device.getModel()));
				}
				if(device.getName()!=null && !(device.getName().equals(""))){
					paramValue.put("name", StringUtil.convertToString(device.getName()));
				}
				if(device.getStatus()!=null && !(device.getStatus().equals(""))){
					paramValue.put("status", StringUtil.convertToString(device.getStatus()));
				}
				if(device.getFramewareVersion()!=null && !(device.getFramewareVersion().equals(""))){
					paramValue.put("frameware_version", StringUtil.convertToString(device.getFramewareVersion()));
				}
				if(device.getComponentId()!=null && device.getComponentId()>0){
					paramValue.put("component_id", device.getComponentId()+"");
				}
				if(device.getLocationId()!=null && device.getLocationId()>0){
					paramValue.put("location_id", device.getLocationId()+"");
				}
				if(device.getWanProtocol()!=null && !(device.getWanProtocol().equals(""))){
					paramValue.put("wan_protocol", StringUtil.convertToString(device.getWanProtocol()));
				}
				if(device.getLastOnlineDatetime()!=null){
//					String last_online_datetime = DateUtil.formatToString(device.getLastOnlineDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
//					paramValue.put("last_online_datetime", StringUtil.convertToString(last_online_datetime));
					paramValue.put("last_online_datetime", dateToString(device.getLastOnlineDatetime()));
				}
				if(device.getMac()!=null && !(device.getMac().equals(""))){
					paramValue.put("mac", StringUtil.convertToString(device.getMac()));
				}
				if(device.getStartupTask()!=null && !(device.getStartupTask().equals(""))){
					paramValue.put("startup_task", StringUtil.convertToString(device.getStartupTask()));
				}
				if(device.getPublicIp()!=null && !(device.getPublicIp().equals(""))){
					paramValue.put("public_ip", StringUtil.convertToString(device.getPublicIp()));
				}
				if(device.getConfigItems()!=null && !(device.getConfigItems().equals(""))){
					paramValue.put("config_items", StringUtil.convertToString(device.getConfigItems()));
				}
				if(device.getManufacturerId()!=null && device.getManufacturerId()>0){
					paramValue.put("manufacturer_id", device.getManufacturerId()+"");
				} 
				if(device.getTrafficLimit()!=null && device.getTrafficLimit()>0){
					paramValue.put("traffic_limit", device.getTrafficLimit()+"");
				} 
				if(device.getMinsLimit()!=null && device.getMinsLimit()>0){
					paramValue.put("mins_limit", device.getMinsLimit()+"");
				} 
				if(device.getTelcomAccount()!=null && !(device.getTelcomAccount().equals(""))){
					paramValue.put("telcom_account", StringUtil.convertToString(device.getTelcomAccount()));
				}
				if(device.getType()!=null && !(device.getType().equals(""))){
					paramValue.put("type", StringUtil.convertToString(device.getType()));
				}
				
				if(device.getXPos() != null){
					paramValue.put("xpos", StringUtil.convertToString(device.getEmsDevId()+""));
				}
				
				if(device.getYPos() != null){
					paramValue.put("ypos", StringUtil.convertToString(device.getYPos()+""));
				}
				
				if(device.getFixAddr() != null){
					paramValue.put("fixaddr", StringUtil.convertToString(device.getFixAddr()));
				}
				
				if(device.getEmsDevId() != null){
					paramValue.put("ems_dev_id", StringUtil.convertToString(device.getEmsDevId()+""));
				}
				
				if(device.getEmsDevId() != null){
//					paramValue.put("ems_create_datetime", 
//							StringUtil.convertToString(DateUtil.formatToString(device.getEmsCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS)));
				
					paramValue.put("ems_create_datetime", dateToString(device.getEmsCreateDatetime()));
				}
				
				if(device.getCreateDatetime()!=null){
					String create_datetime = DateUtil.formatToString(device.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(create_datetime));
				}
				if(device.getRegisterationDate()!=null){
//					String registeration_date = DateUtil.formatToString(device.getRegisterationDate(), DateUtil.YYYY_MM_DD_HH_MM_SS);
//					paramValue.put("registeration_date", StringUtil.convertToString(registeration_date));
					paramValue.put("registeration_date", dateToString(device.getRegisterationDate()));
				}
			} 
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)){
				if(device.getDeviceId()!=null && !(device.getDeviceId().equals(""))){
					conditions = " device_id=" + StringUtil.convertToString(device.getDeviceId());
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送device "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送device "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendAAAVirtualDevice(AAAVirtualDevice radius, String optType, String tblname){
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(radius.getId()!=null && radius.getId()>0){
					paramValue.put("id", radius.getId()+"");
				}
				
				if(radius.getWlanacname()!=null && !(radius.getWlanacname().equals(""))){
					paramValue.put("wlanacname", StringUtil.convertToString(radius.getWlanacname()));
				}
				
				if(radius.getDeviceId()!=null && !(radius.getDeviceId().equals(""))){
					paramValue.put("device_id", StringUtil.convertToString(radius.getDeviceId()));
				}
				
				if(radius.getIpAddr()!=null && !(radius.getIpAddr().equals(""))){
					paramValue.put("ip_addr", StringUtil.convertToString(radius.getIpAddr()));
				}
				
				if(radius.getPort()!=null && radius.getPort()>0){
					paramValue.put("port", radius.getPort()+"");
				}
				
				if(radius.getRegistSecret()!=null && !(radius.getRegistSecret().equals(""))){
					paramValue.put("regist_secret", StringUtil.convertToString(radius.getRegistSecret()));
				}
				
				if(radius.getAuthSecret()!=null && !(radius.getAuthSecret().equals(""))){
					paramValue.put("auth_secret", StringUtil.convertToString(radius.getAuthSecret()));
				}
				
				if(radius.getAccountingSecret()!=null && !(radius.getAccountingSecret().equals(""))){
					paramValue.put("accounting_secret", StringUtil.convertToString(radius.getAccountingSecret()));
				}
				
				if(radius.getName()!=null && !(radius.getName().equals(""))){
					paramValue.put("name", StringUtil.convertToString(radius.getName()));
				}
				
				if(radius.getDescription()!=null && !(radius.getDescription().equals(""))){
					paramValue.put("description", StringUtil.convertToString(radius.getDescription()));
				}
				
				if(radius.getCreateDatetime()!=null){
					String create_datetime = DateUtil.formatToString(radius.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(create_datetime));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)){
				if(radius.getDeviceId()!=null && !(radius.getDeviceId().equals(""))){
					conditions = " device_id=" + StringUtil.convertToString(radius.getDeviceId());
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送aaa_virtual_device "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送aaa_virtual_device "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendSsidVirtualDevice(SsidVirtualDevice device, String optType, String tblname){
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(device.getId()!=null && device.getId()>0){
					paramValue.put("id", device.getId()+"");
				}
				
				if(device.getSsid()!=null && !(device.getSsid().equals(""))){
					paramValue.put("ssid", StringUtil.convertToString(device.getSsid()));
				}
				
				if(device.getAcDeviceId()!=null && !(device.getAcDeviceId().equals(""))){
					paramValue.put("ac_device_id", StringUtil.convertToString(device.getAcDeviceId()));
				}
				
				if(device.getApMac()!=null && !(device.getApMac().equals(""))){
					paramValue.put("ap_mac", StringUtil.convertToString(device.getApMac()));
				}
				
				if(device.getDeviceId()!=null && !(device.getDeviceId().equals(""))){
					paramValue.put("device_id", StringUtil.convertToString(device.getDeviceId()));
				}
				
				if(device.getCreateDatetime()!=null){
					String create_datetime = DateUtil.formatToString(device.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(create_datetime));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)){
				if(device.getDeviceId()!=null && !(device.getDeviceId().equals(""))) {
					conditions = " device_id=" + StringUtil.convertToString(device.getDeviceId());
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送ssid_virtual_device "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送ssid_virtual_device "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendVlanVirtualDevice(VlanVirtualDevice vlanDevice, String optType, String tblname ){
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(vlanDevice.getId() != null && vlanDevice.getId() > 0) {
					paramValue.put("id", StringUtil.convertToString(vlanDevice.getId() + ""));
				}
				if(StringUtils.isNotBlank(vlanDevice.getPvlanId())) {
					paramValue.put("pvlan_id", StringUtil.convertToString(vlanDevice.getPvlanId()));
				}
				if(StringUtils.isNotBlank(vlanDevice.getCvlanId())) {
					paramValue.put("cvlan_id", StringUtil.convertToString(vlanDevice.getCvlanId()));
				}
				if(StringUtils.isNotBlank(vlanDevice.getDomain())) {
					paramValue.put("domain", StringUtil.convertToString(vlanDevice.getDomain()));
				}
				if(StringUtils.isNotBlank(vlanDevice.getEthPort())) {
					paramValue.put("eth_port", StringUtil.convertToString(vlanDevice.getEthPort()));
				}
				if(StringUtils.isNotBlank(vlanDevice.getName())) {
					paramValue.put("name", StringUtil.convertToString(vlanDevice.getName()));
				}
				if(StringUtils.isNotBlank(vlanDevice.getDescription())) {
					paramValue.put("description", StringUtil.convertToString(vlanDevice.getDescription()));
				}
				if(StringUtils.isNotBlank(vlanDevice.getDeviceId())) {
					paramValue.put("device_id", StringUtil.convertToString(vlanDevice.getDeviceId()));
				}
				if(vlanDevice.getAccountId() != null && vlanDevice.getAccountId() >0) {
					paramValue.put("account_id", StringUtil.convertToString(vlanDevice.getAccountId() + ""));
				}else{
					paramValue.put("account_id", StringUtil.convertToString("1"));
				}
				if(StringUtils.isNotBlank(vlanDevice.getTelecomAccount())) {
					paramValue.put("telecom_account", StringUtil.convertToString(vlanDevice.getTelecomAccount()));
				}
				if(vlanDevice.getCreateDatetime()!=null){
					String createDatetime = DateUtil.formatToString(vlanDevice.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(createDatetime));
				}				
				if(StringUtils.isNotBlank(vlanDevice.getAcname())) {
					paramValue.put("acname", StringUtil.convertToString(vlanDevice.getAcname()));
				}
				if(StringUtils.isNotBlank(vlanDevice.getShel())) {
					paramValue.put("shel", StringUtil.convertToString(vlanDevice.getShel()));
				}
				if(StringUtils.isNotBlank(vlanDevice.getSlot())) {
					paramValue.put("slot", StringUtil.convertToString(vlanDevice.getSlot()));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)){
				if(StringUtils.isNotBlank(vlanDevice.getDeviceId())) {
					conditions = " device_id=" + StringUtil.convertToString(vlanDevice.getDeviceId());
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送ssid_virtual_device "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送ssid_virtual_device "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendLocation(Location location, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(location.getId()!=null && location.getId()>0){
					paramValue.put("id", location.getId()+"");
				}
				if(location.getCountry()!=null && !(location.getCountry().equals(""))){
					paramValue.put("country", StringUtil.convertToString(location.getCountry()));
				} 
				if(location.getProvince()!=null && !(location.getProvince().equals(""))){
					paramValue.put("province", StringUtil.convertToString(location.getProvince()));
				} 
				if(location.getCity()!=null && !(location.getCity().equals(""))){
					paramValue.put("city", StringUtil.convertToString(location.getCity()));
				} 
				if(location.getCountyDistrict()!=null && !(location.getCountyDistrict().equals(""))){
					paramValue.put("county_district", StringUtil.convertToString(location.getCountyDistrict()));
				} 
				if(location.getAccountId()!=null && location.getAccountId()>0){
					paramValue.put("account_id", location.getAccountId()+"");
				} 
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(location.getId()!=null && location.getId()>0){
					conditions = " id="+location.getId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions, location.getId());
				} catch (Exception e) {
					logger.error("dataMQ发送location "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送location "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendComponent(ComponentWithBLOBs component, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(component.getId()!=null && component.getId()>0){
					paramValue.put("id", component.getId()+"");
				}
				if(component.getVersion()!=null && !(component.getVersion().equals(""))){
					paramValue.put("version", StringUtil.convertToString(component.getVersion()));
				}
				if(component.getDeviceSupported()!=null && !(component.getDeviceSupported().equals(""))){
					paramValue.put("device_supported", StringUtil.convertToString(component.getDeviceSupported()));
				} 
				if(component.getType()!=null && !(component.getType().equals(""))){
					paramValue.put("type", StringUtil.convertToString(component.getType()));
				} 
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(component.getId()!=null && component.getId()>0){
					conditions = " id="+component.getId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions, component.getId());
				} catch (Exception e) {
					logger.error("dataMQ发送component "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送component "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendDeviceModel(DeviceModel deviceModel, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(deviceModel.getId()!=null && deviceModel.getId()>0){
					paramValue.put("id", deviceModel.getId()+"");
				}
				
				if(deviceModel.getBrand()!=null && !(deviceModel.getBrand().equals(""))){
					paramValue.put("brand", StringUtil.convertToString(deviceModel.getBrand()));
				}
				
				if(deviceModel.getModel()!=null && !(deviceModel.getModel().equals(""))){
					paramValue.put("model", StringUtil.convertToString(deviceModel.getModel()));
				}
				
				if(deviceModel.getTotalMem()!=null && deviceModel.getTotalMem()>0){
					paramValue.put("total_mem", deviceModel.getTotalMem()+"");
				}
				
				if(deviceModel.getManufacturerId()!=null && deviceModel.getManufacturerId()>0){
					paramValue.put("manufacturer_id", deviceModel.getManufacturerId()+"");
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(deviceModel.getId()!=null && deviceModel.getId()>0){
					conditions = " id="+deviceModel.getId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions,deviceModel.getId());
				} catch (Exception e) {
					logger.error("dataMQ发送device_model "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送device_model "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendAccountHasTerminalUser(AccountHasTerminalUser accountHasTerminalUser, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(accountHasTerminalUser.getAccountId()!=null && accountHasTerminalUser.getAccountId()>0){
					paramValue.put("account_id", accountHasTerminalUser.getAccountId()+"");
				}
				if(accountHasTerminalUser.getTerminalUserId()!=null && accountHasTerminalUser.getTerminalUserId()>0){
					paramValue.put("terminal_user_id", accountHasTerminalUser.getTerminalUserId()+"");
				}
				if(accountHasTerminalUser.getMemo()!=null && !(accountHasTerminalUser.getMemo().equals(""))){
					paramValue.put("memo", StringUtil.convertToString(accountHasTerminalUser.getMemo()));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(accountHasTerminalUser.getAccountId()!=null && accountHasTerminalUser.getTerminalUserId()!=null && accountHasTerminalUser.getAccountId()>0 && accountHasTerminalUser.getTerminalUserId()>0){
					conditions = " account_id=" + accountHasTerminalUser.getAccountId() + " and terminal_user_id=" + accountHasTerminalUser.getTerminalUserId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送account_has_terminal_user "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送account_has_terminal_user "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendTerminalUser(TerminalUser terminalUser, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(terminalUser.getId()!=null && terminalUser.getId()>0){
					paramValue.put("id", terminalUser.getId()+"");
				}
				if(terminalUser.getAuthenticationType()!=null && !(terminalUser.getAuthenticationType().equals(""))){
					paramValue.put("authentication_type", StringUtil.convertToString(terminalUser.getAuthenticationType()));
				}
				if(terminalUser.getCreateDatetime()!=null){
					String createDatetime = DateUtil.formatToString(terminalUser.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(createDatetime));
				}
				if(terminalUser.getStatus()!=null && !(terminalUser.getStatus().equals(""))){
					paramValue.put("status", StringUtil.convertToString(terminalUser.getStatus()));
				}
				if(terminalUser.getMemo()!=null && !(terminalUser.getMemo().equals(""))){
					paramValue.put("memo", StringUtil.convertToString(terminalUser.getMemo()));
				}
				if(terminalUser.getAuthType()!=null && !(terminalUser.getAuthType().equals(""))){
					paramValue.put("auth_type", StringUtil.convertToString(terminalUser.getAuthType()));
				}
				if(terminalUser.getAuthId()!=null && !(terminalUser.getAuthId().equals(""))){
					paramValue.put("auth_id", StringUtil.convertToString(terminalUser.getAuthId()));
				}
				if(terminalUser.getAuthCode()!=null && !(terminalUser.getAuthCode().equals(""))){
					paramValue.put("auth_code", StringUtil.convertToString(terminalUser.getAuthCode()));
				}
				if(terminalUser.getParameter()!=null && !(terminalUser.getParameter().equals(""))){
					paramValue.put("parameter", StringUtil.convertToString(terminalUser.getParameter()));
				}
				if(terminalUser.getMac()!=null && !(terminalUser.getMac().equals(""))){
					paramValue.put("mac", StringUtil.convertToString(terminalUser.getMac()));
				}
				if(terminalUser.getMembershipId()!=null && terminalUser.getMembershipId()>0){
					paramValue.put("membership_id", terminalUser.getMembershipId()+"");
				}
				if(terminalUser.getPhoneNumber()!=null && !(terminalUser.getPhoneNumber().equals(""))){
					paramValue.put("phone_number", StringUtil.convertToString(terminalUser.getPhoneNumber()));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(terminalUser.getId()!=null && terminalUser.getId()>0){
					conditions = " id="+terminalUser.getId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送terminal_user "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送terminal_user "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}

		public void sendTerminalUserAuthLog(TerminalUserAuthLog terminalUserAuthLog, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(terminalUserAuthLog.getId()!=null && terminalUserAuthLog.getId()>0){
					paramValue.put("id", terminalUserAuthLog.getId()+"");
				}
				if(terminalUserAuthLog.getTerminalUserId()!=null && terminalUserAuthLog.getTerminalUserId()>0){
					paramValue.put("terminal_user_id", terminalUserAuthLog.getTerminalUserId()+"");
				}
				if(terminalUserAuthLog.getLogContent()!=null && !(terminalUserAuthLog.getLogContent().equals(""))){
					paramValue.put("log_content", StringUtil.convertToString(terminalUserAuthLog.getLogContent()));
				}
				if(terminalUserAuthLog.getAuthType()!=null && !(terminalUserAuthLog.getAuthType().equals(""))){
					paramValue.put("auth_type", StringUtil.convertToString(terminalUserAuthLog.getAuthType()));
				}
				if(terminalUserAuthLog.getToken()!=null && !(terminalUserAuthLog.getToken().equals(""))){
					paramValue.put("token", StringUtil.convertToString(terminalUserAuthLog.getToken()));
				}
				if(terminalUserAuthLog.getDeviceId()!=null && !(terminalUserAuthLog.getDeviceId().equals(""))){
					paramValue.put("device_id", StringUtil.convertToString(terminalUserAuthLog.getDeviceId()));
				}
				if(terminalUserAuthLog.getStatus()!=null && !(terminalUserAuthLog.getStatus().equals(""))){
					paramValue.put("status", StringUtil.convertToString(terminalUserAuthLog.getStatus()));
				}
				if(terminalUserAuthLog.getTerminalMac()!=null && !(terminalUserAuthLog.getTerminalMac().equals(""))){
					paramValue.put("terminal_mac", StringUtil.convertToString(terminalUserAuthLog.getTerminalMac()));
				}
				if(terminalUserAuthLog.getOfflineDatetime()!=null){
//					String offlineDatetime = DateUtil.formatToString(terminalUserAuthLog.getOfflineDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
//					paramValue.put("offline_datetime", StringUtil.convertToString(offlineDatetime));
					paramValue.put("offline_datetime", dateToString(terminalUserAuthLog.getOfflineDatetime()));
					
				}
				if(terminalUserAuthLog.getTerminalType()!=null && !(terminalUserAuthLog.getTerminalType().equals(""))){
					paramValue.put("terminal_type", StringUtil.convertToString(terminalUserAuthLog.getTerminalType()));
				}
				if(terminalUserAuthLog.getBrowserType()!=null && !(terminalUserAuthLog.getBrowserType().equals(""))){
					paramValue.put("browser_type", StringUtil.convertToString(terminalUserAuthLog.getBrowserType()));
				}
				if(terminalUserAuthLog.getTotalUpTraffic()!=null && terminalUserAuthLog.getTotalUpTraffic()>0){
					paramValue.put("total_up_traffic", terminalUserAuthLog.getTotalUpTraffic()+"");
				}
				if(terminalUserAuthLog.getTotalDwTraffic()!=null && terminalUserAuthLog.getTotalDwTraffic()>0){
					paramValue.put("total_dw_traffic", terminalUserAuthLog.getTotalDwTraffic()+"");
				}
				if(terminalUserAuthLog.getModifiedDatetime()!=null){
//					String modifiedDatetime = DateUtil.formatToString(terminalUserAuthLog.getModifiedDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
//					paramValue.put("modified_datetime", StringUtil.convertToString(modifiedDatetime));
					paramValue.put("modified_datetime", dateToString(terminalUserAuthLog.getModifiedDatetime()));
				}
				if(terminalUserAuthLog.getCreateDatetime()!=null){
					String createDatetime = DateUtil.formatToString(terminalUserAuthLog.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(createDatetime));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(terminalUserAuthLog.getId()!=null && terminalUserAuthLog.getId()>0){
					conditions = " id="+terminalUserAuthLog.getId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送terminal_user_authentication_log "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送terminal_user_authentication_log "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendTerminalUserHasDevice(TerminalUserHasDevice terminalUserHasDevice, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(terminalUserHasDevice.getTerminalUserId()!=null && terminalUserHasDevice.getTerminalUserId()>0){
					paramValue.put("terminal_user_id", terminalUserHasDevice.getTerminalUserId()+"");
				}
				if(terminalUserHasDevice.getDeviceId()!=null && !(terminalUserHasDevice.getDeviceId().equals(""))){
					paramValue.put("device_id", StringUtil.convertToString(terminalUserHasDevice.getDeviceId()));
				}
				if(terminalUserHasDevice.getStatus()!=null && !(terminalUserHasDevice.getStatus().equals(""))){
					paramValue.put("status", StringUtil.convertToString(terminalUserHasDevice.getStatus()));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(terminalUserHasDevice.getTerminalUserId()!=null && terminalUserHasDevice.getDeviceId()!=null && terminalUserHasDevice.getTerminalUserId()>0 && !(terminalUserHasDevice.getDeviceId().equals(""))){
					conditions = " terminal_user_id=" + terminalUserHasDevice.getTerminalUserId() + " and device_id=" + StringUtil.convertToString(terminalUserHasDevice.getDeviceId());
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送terminal_user_has_device "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送terminal_user_has_device "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}
		}
		
		public void sendThirdPartAuth(ThirdPartAuth thirdPartAuth, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(thirdPartAuth.getId()!=null && thirdPartAuth.getId()>0){
					paramValue.put("id", thirdPartAuth.getId()+"");
				}
				if(thirdPartAuth.getBusinessName()!=null && !(thirdPartAuth.getBusinessName().equals(""))){
					paramValue.put("business_name", StringUtil.convertToString(thirdPartAuth.getBusinessName()));
				}
				if(thirdPartAuth.getVirtualDeviceId()!=null && !(thirdPartAuth.getVirtualDeviceId().equals(""))){
					paramValue.put("virtual_device_id", StringUtil.convertToString(thirdPartAuth.getVirtualDeviceId()));
				}
				if(thirdPartAuth.getSiteId()!=null && thirdPartAuth.getSiteId()>0){
					paramValue.put("site_id", thirdPartAuth.getSiteId()+"");
				}
				if(thirdPartAuth.getStatus()!=null && !(thirdPartAuth.getStatus().equals(""))){
					paramValue.put("status", StringUtil.convertToString(thirdPartAuth.getStatus()));
				}
				if(thirdPartAuth.getCreateDatetime()!=null){
					String createDatetime = DateUtil.formatToString(thirdPartAuth.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(createDatetime));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(thirdPartAuth.getId()!=null && thirdPartAuth.getId()>0){
					conditions = " id="+thirdPartAuth.getId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送third_part_auth "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送third_part_auth "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}			
		}
		
		public void sendThirdPlatform(ThirdPlatform thirdPlatform, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(thirdPlatform.getId()!=null && thirdPlatform.getId()>0){
					paramValue.put("id", thirdPlatform.getId()+"");
				}
				if(thirdPlatform.getName()!=null && !(thirdPlatform.getName().equals(""))){
					paramValue.put("name", StringUtil.convertToString(thirdPlatform.getName()));
				}
				if(thirdPlatform.getDomain()!=null && !(thirdPlatform.getDomain().equals(""))){
					paramValue.put("domain", StringUtil.convertToString(thirdPlatform.getDomain()));
				}
				if(thirdPlatform.getIpAddr()!=null && !(thirdPlatform.getIpAddr().equals(""))){
					paramValue.put("ip_addr", StringUtil.convertToString(thirdPlatform.getIpAddr()));
				}
				if(thirdPlatform.getIpPort()!=null && !(thirdPlatform.getIpPort().equals(""))){
					paramValue.put("ip_port", StringUtil.convertToString(thirdPlatform.getIpPort()));
				}
				if(thirdPlatform.getPhone()!=null && !(thirdPlatform.getPhone().equals(""))){
					paramValue.put("phone", StringUtil.convertToString(thirdPlatform.getPhone()));
				}
				if(thirdPlatform.getProvince()!=null && !(thirdPlatform.getProvince().equals(""))){
					paramValue.put("province", StringUtil.convertToString(thirdPlatform.getProvince()));
				}
				if(thirdPlatform.getCity()!=null && !(thirdPlatform.getCity().equals(""))){
					paramValue.put("city", StringUtil.convertToString(thirdPlatform.getCity()));
				}
				if(thirdPlatform.getCounty()!=null && !(thirdPlatform.getCounty().equals(""))){
					paramValue.put("county", StringUtil.convertToString(thirdPlatform.getCounty()));
				}
				if(thirdPlatform.getUserOnlineUrl()!=null && !(thirdPlatform.getUserOnlineUrl().equals(""))){
					paramValue.put("user_online_url", StringUtil.convertToString(thirdPlatform.getUserOnlineUrl()));
				}
				if(thirdPlatform.getUserOfflineUrl()!=null && !(thirdPlatform.getUserOfflineUrl().equals(""))){
					paramValue.put("user_offline_url", StringUtil.convertToString(thirdPlatform.getUserOfflineUrl()));
				}
				if(thirdPlatform.getDescription()!=null && !(thirdPlatform.getDescription().equals(""))){
					paramValue.put("description", StringUtil.convertToString(thirdPlatform.getDescription()));
				}
				if(thirdPlatform.getPlatformCode()!=null && !(thirdPlatform.getPlatformCode().equals(""))){
					paramValue.put("platform_code", StringUtil.convertToString(thirdPlatform.getPlatformCode()));
				}
				if(thirdPlatform.getWelcomeUrl()!=null && !(thirdPlatform.getWelcomeUrl().equals(""))){
					paramValue.put("welcome_url", StringUtil.convertToString(thirdPlatform.getWelcomeUrl()));
				}
				if(thirdPlatform.getCreateDatetime()!=null){
					String createDatetime = DateUtil.formatToString(thirdPlatform.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(createDatetime));
				}
				if(thirdPlatform.getAppAuthType()!=null && !(thirdPlatform.getAppAuthType().equals(""))){
					paramValue.put("app_auth_type", StringUtil.convertToString(thirdPlatform.getAppAuthType()));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(thirdPlatform.getId()!=null && thirdPlatform.getId()>0){
					conditions = " id="+thirdPlatform.getId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送third_platform "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送third_platform "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}			
		}
		
		public void sendUserBlacklist(UserBlacklist userBlacklist, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(userBlacklist.getId()!=null && userBlacklist.getId()>0){
					paramValue.put("id", userBlacklist.getId()+"");
				}
				if(userBlacklist.getMacs()!=null && !(userBlacklist.getMacs().equals(""))){
					paramValue.put("macs", StringUtil.convertToString(userBlacklist.getMacs()));
				}
				if(userBlacklist.getDeviceId()!=null && !(userBlacklist.getDeviceId().equals(""))){
					paramValue.put("device_id", StringUtil.convertToString(userBlacklist.getDeviceId()));
				}
				if(userBlacklist.getCreateDatetime()!=null){
					String createDatetime = DateUtil.formatToString(userBlacklist.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(createDatetime));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(userBlacklist.getId()!=null && userBlacklist.getId()>0){
					conditions = " id="+userBlacklist.getId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送user_blacklist "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送user_blacklist "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}			
		}
		
		public void sendUserWhitelist(UserWhitelist userWhitelist, String optType, String tblname) {
			Map<String, String> paramValue = new HashMap<String, String>();
			String conditions = "";
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT) || optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE)){
				if(userWhitelist.getId()!=null && userWhitelist.getId()>0){
					paramValue.put("id", userWhitelist.getId()+"");
				}
				if(userWhitelist.getMacs()!=null && !(userWhitelist.getMacs().equals(""))){
					paramValue.put("macs", StringUtil.convertToString(userWhitelist.getMacs()));
				}
				if(userWhitelist.getDeviceId()!=null && !(userWhitelist.getDeviceId().equals(""))){
					paramValue.put("device_id", StringUtil.convertToString(userWhitelist.getDeviceId()));
				}
				if(userWhitelist.getCreateDatetime()!=null){
					String createDatetime = DateUtil.formatToString(userWhitelist.getCreateDatetime(), DateUtil.YYYY_MM_DD_HH_MM_SS);
					paramValue.put("create_datetime", StringUtil.convertToString(createDatetime));
				}
			}
			
			if(optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) {
				if(userWhitelist.getId()!=null && userWhitelist.getId()>0){
					conditions = " id="+userWhitelist.getId();
				}
			}
			
			if(((optType.equalsIgnoreCase(Constants.OPT_TYPE_UPDATE) || optType.equalsIgnoreCase(Constants.OPT_TYPE_DELETE)) 
					&& !conditions.equals("")) || optType.equalsIgnoreCase(Constants.OPT_TYPE_INSERT)) {
				try {
					dataMQUtil.mqsender(paramValue, optType, tblname, conditions);
				} catch (Exception e) {
					logger.error("dataMQ发送user_whitelist "+optType.toLowerCase()+" 信息失败，错误信息：" + e.toString() + "  " + StringUtil.getExceptionStackTrace(e));
				}
			} else {
				logger.error("dataMQ发送user_whitelist "+optType.toLowerCase()+" 信息，参数错误：conditions = " + conditions);
			}			
		}

		
		/****************************************数据同步*********************************************************/
		
		
		/**
		 * 把日期转换为字符串
		 * @param datetime
		 * @return
		 */
		private String dateToString (Date datetime) {
			
			if(datetime == null) {
				return null;
				
			}else {
				String datetimeString = DateUtil.formatToString(datetime, DateUtil.YYYY_MM_DD_HH_MM_SS);
				
				if(StringUtils.EMPTY.equals(datetimeString)) {
					datetimeString = null;
					
				}else {
					datetimeString = StringUtil.convertToString(datetimeString);
				}
				
				return datetimeString;
			}
			
		}
		
		/**
		 * 分页查询分组
		 * @param paramMap
		 * @return
		 */
		public List<DeviceGroup> getDeviceGroupListByPage(Map<String, Object> paramMap){
			return deviceGroupMapper.getDeviceGroupPage(paramMap);
		}
		
		/**
		 * 根据省份查询分组
		 * @param paramMap
		 * @return
		 */
		public List<DeviceGroup> getDeviceGroupListByProvince(String province){
			return deviceGroupMapper.getDeviceGroupByProvince(province);
		}
		
	    /**
		 * 根据省份城市查询分组
		 * @param paramMap
		 * @return
		 */
		public List<DeviceGroup> getPermListByType(Map<String, Object> paramMap){
			return deviceGroupMapper.getDeviceGroupByProvinceAndCity(paramMap);
		}
		
		/**
		 * 对设备进行分组
		 * @param paramMap
		 * @param deviceIds
		 * @return
		 */
		public void saveDeviceHasDeviceGroup(Long groupId, List<String> deviceIds){
			
			deviceHasDeviceGroupMapper.deleteByGroupId(groupId);
			if(deviceIds.size()>0) {
				for(String deviceId : deviceIds){
					DeviceHasDeviceGroup deviceHasDeviceGroup = new DeviceHasDeviceGroup();
					deviceHasDeviceGroup.setDeviceId(deviceId);
					deviceHasDeviceGroup.setGroupId(groupId);
					DeviceHasDeviceGroup olddhg = deviceHasDeviceGroupMapper.getByDeviceId(deviceId);
					if(olddhg != null) {
						deviceHasDeviceGroupMapper.deleteByDeviceId(deviceId);
					}
					deviceHasDeviceGroupMapper.insert(deviceHasDeviceGroup);
				}
			}
		}
		
		/**
		 * 获取SSID列表
		 * @return
		 */
		public List<Map<String,String>> getSsidList(){
	    	return deviceMapper.getSsidList();
	    }
		
		/**
		 * 查询虚ap组
		 * @param mac
		 * @return
		 */
		public DeviceGroup getGroupById(Long groupId) { 
			return deviceGroupMapper.selectByPrimaryKey(groupId);
		}
		
		/**
		 * 删除虚ap组
		 * @param mac
		 * @return
		 */
		public int deleteGroupById(Long groupId) {
			int re = deviceHasDeviceGroupMapper.deleteByGroupId(groupId);
			re = deviceGroupMapper.deleteByPrimaryKey(groupId);
			
			return re;
		}
		
		/**
		 * 通过ap组Id查询设备
		 * @param mac
		 * @return
		 */
		public List<Device> getDeviceByGroupId(Long groupId) {		
			return deviceMapper.getDeviceByGroupId(groupId);
		}
		
		/**
		 * 查询未分组设备
		 * @param mac
		 * @return
		 */
		public List<Device> getUnGroupAp(Map<String, Object> paramMap) {		
			return deviceMapper.getUnGroupAp(paramMap);
		}
		
		/**
		 * 设备流量时长控制
		 * @param deviceIdListJson	设备ID list
		 * @param minsLimit
		 * @param trafficLimit
		 * @throws IOException 
		 */
		public boolean deviceLimation(String deviceIdListJson, String minsLimit, String trafficLimit) throws IOException {
			List<String> deviceIdList = gson.fromJson(deviceIdListJson, new TypeToken<List<String>>(){}.getType());
			boolean result = false;
			
			if(deviceIdList != null && deviceIdList.size() > 0) {
				
				// 更新接入系统设备流量时长信息
				this.updateDeviceLimitation(deviceIdList, Integer.parseInt(minsLimit), Integer.parseInt(trafficLimit));
				
				// 向网管系统发送设备流量信息
				result = sendDeviceLimationToEms(deviceIdListJson, trafficLimit);
			
			}else {
				result = true;
			}
			
			return result;
		}
		
		/**
		 * 更新设备流量时长
		 * @param deviceIdList
		 * @param minsLimit
		 * @param trafficLimit
		 */
		public void updateDeviceLimitation(List<String> deviceIdList, Integer minsLimit, Integer trafficLimit) {
			if(deviceIdList != null && deviceIdList.size() > 0) {
				DeviceWithBLOBs device = null;
				
				for(String deviceId : deviceIdList){
					device = deviceMapper.selectByPrimaryKey(deviceId);
					if(device != null) {
						device.setMinsLimit(minsLimit);
						device.setTrafficLimit(trafficLimit);
						deviceMapper.updateByPrimaryKey(device);
						this.sendDevice(device, Constants.OPT_TYPE_UPDATE, Constants.DEVICE_TBL);
					}
				}
			}
		}
		
		/**
		 * 向网关平台发送流量控制请求
		 * @param deviceIdListJson 设备ID list json串
		 * @param trafficLimit 上行下行
		 * @throws IOException 
		 */
		public boolean sendDeviceLimationToEms(String deviceIdListJson, String trafficLimit) throws IOException {
			boolean requestResult = Boolean.FALSE;
			
			// 获取网管平台请求路径
			String deviceLimationUrl = 
                    PropertiesUtil.confProperties.getProperty("device.emsapi.serverAddr") +
                    PropertiesUtil.confProperties.getProperty("device.emsapi.emsRegisterBasUrl");
			
//			String deviceLimationUrl = 
//                    PropertiesUtil.confProperties.getProperty("device.emsapi.serverAddrTest") +
//                    PropertiesUtil.confProperties.getProperty("device.emsapi.emsRegisterBasUrl");
			
			// 设置请求参数
			Map<String, String> requestParam = new HashMap<String, String>();
			requestParam.put("type", Constants.AP_DEVICE_ACTION_TYPE_SEVEN);
			requestParam.put("devIds", deviceIdListJson);
			requestParam.put("inbound_rate", trafficLimit);
			requestParam.put("outbound_rate", trafficLimit);
			
			logger.debug("网管平台流量时长控制：" + deviceLimationUrl + "----参数： " + requestParam.toString());
			
			// 发送post请求并接受返回结果
			InputStream inputStream = HttpRequest.sendPostRequest(deviceLimationUrl, requestParam);
			String returnMessage = "";
			
			// 判断返回结果
	        if(inputStream == null){
	            return requestResult;
	             
	        }else{
	        	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
	        }
	        logger.debug("网管平台流量时长控制返回：" + returnMessage);
	        Map<String, Object> resultMap = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
	         
	        if("OK".equalsIgnoreCase((String) resultMap.get("result"))) {
	        	requestResult = Boolean.TRUE;
	        	
	        }else {
	        	requestResult = Boolean.FALSE;
	        }
	        
	        return requestResult;
	}
	
		/**
		 * 根据设备ID获取accountId
		 * @param deviceId
		 * @return
		 * @throws Exception 
		 */
		public Long getAccountIdByDeviceId(String deviceId) throws Exception {
			Long accountId = null;
			
			if(StringUtils.isNotBlank(deviceId)){
				
				// 获取中心平台请求路径
				String deviceLimationUrl = 
	                    PropertiesUtil.confProperties.getProperty("applicationCentel") +
	                    PropertiesUtil.confProperties.getProperty("applicationCentel.getAccountByDeviceId");
				
				// 设置请求参数
				Map<String, String> requestParam = new HashMap<String, String>();
				requestParam.put("deviceId", deviceId);
				
				logger.debug("应用中心根据设备ID获取商户" + deviceLimationUrl + "----参数： " + requestParam.toString());
				
				// 发送post请求并接受返回结果
				InputStream inputStream = HttpRequest.sendPostRequest(deviceLimationUrl, requestParam);
				String returnMessage = "";
				
				// 判断返回结果
		        if(inputStream == null){
		        	this.saveExecptionLog("device", this.getClass().toString(), 
		        			PropertiesUtil.confProperties.getProperty("device.msg.getAccountByDeviceIdFail"));
		            throw new Exception();
		             
		        }else{
		        	returnMessage = new String(HttpRequest.parseInputStream(inputStream).array(),"UTF-8");
		        }
		        
		        logger.debug("应用中心根据设备ID获取商户返回：" + returnMessage);
		        Map<String, Object> resultMap = this.gson.fromJson(returnMessage, new TypeToken<Map<String, Object>>(){}.getType());
		         
		        if("OK".equalsIgnoreCase((String) resultMap.get("result"))) {
		        	String accountIdString = (String) resultMap.get("accountId");
		        	if(StringUtils.isNotBlank(accountIdString)) {
		        		accountId = Long.parseLong(accountIdString);
		        		
		        	}else {
		        		this.saveExecptionLog("device", this.getClass().toString(), 
			        			PropertiesUtil.confProperties.getProperty("device.msg.getAccountByDeviceIdFail"));
			        	throw new Exception();
		        	}
		        	
		        	
		        }else {
		        	this.saveExecptionLog("device", this.getClass().toString(), 
		        			PropertiesUtil.confProperties.getProperty("device.msg.getAccountByDeviceIdFail"));
		        	throw new Exception();
		        }
		        
			}
			return accountId;
		}
		
		/**
		 * 根据商户ID取得胖AP的MAC地址
		 */
		public String getFatapMacByAccountId(Long accountId) {
			return deviceMapper.getFatapMacByAccountId(accountId);
		}

		/**
		 * 生成二级平台码
		 * @param importedDate
		 * @return
		 */
		public String generateThirdPlatformCode(Date importedDate) {
			String thirdPlatformCode = null;
			String connector = "-";
			String deviceIdProfix = "THIRD-PLATFORM-"
					+ DateUtil.formatToString(importedDate, DateUtil.YYYYMMDD) + connector;
			String randomSeedStr = null;
			int randomSeedStringLength = 8;

			boolean isExisted = false;
			do {
				
				String uuid = UUID.randomUUID().toString().replace("-", "");
				randomSeedStr = uuid.substring(0, randomSeedStringLength);
				
				DeviceWithBLOBs device = this.deviceMapper.selectByPrimaryKey(deviceIdProfix + deviceIdProfix);
				
				if (device != null) {
					isExisted = true;
				}
			} while (isExisted);
			
			thirdPlatformCode = deviceIdProfix + randomSeedStr;
			
			return thirdPlatformCode;
		}

		/**
		 * 获取一个位置对象
		 * @param location
		 * @return
		 */
		public Location saveOrgetLocation(Location location){
			List<Location> locationsExisted = locationMapper.searchLocation(location);
			
			if(locationsExisted == null || locationsExisted.size() == 0){
				locationMapper.insertSelective(location);
				this.sendLocation(location, Constants.OPT_TYPE_INSERT, Constants.LOCATION_TBL);
			}else {
				location = locationsExisted.get(0);
			}
			return location;
		}

}
