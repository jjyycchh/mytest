package com.access.action.device;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.access.base.BaseAction;
import com.access.core.commons.Page;
import com.access.core.constant.Constants;
import com.access.core.error.ErrorMessage;
import com.access.core.util.DateUtil;
import com.access.core.util.JsonUtil;
import com.access.core.util.MacUtil;
import com.access.core.util.PropertiesUtil;
import com.access.core.util.StringUtil;
import com.access.core.util.ValidateUtil;
import com.access.core.util.rules.CheckBox;
import com.access.core.util.rules.DateValue;
import com.access.core.util.rules.Length;
import com.access.core.util.rules.NumberRange;
import com.access.core.util.rules.Numeric;
import com.access.core.util.rules.Regex;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;
import com.access.model.device.AAAVirtualDevice;
import com.access.model.device.Device;
import com.access.model.device.DeviceGroup;
import com.access.model.device.DeviceWithBLOBs;
import com.access.model.device.ProducedDevices;
import com.access.model.device.SsidVirtualDevice;
import com.access.model.device.VlanVirtualDevice;
import com.access.model.system.Location;
import com.alipay.util.httpClient.HttpRequest;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Controller
@Namespace("/device")
public class DeviceAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	Logger logger  =  Logger.getLogger(this.getClass());
	
	/**
	 * 同步设备--添加或者修改
	 * @return
	 */
	@Action(value = "/addDevice", results = {
			@Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
	public synchronized String synchronizeDevice() {

		ValidateUtil vu = null;
		
		// 返回信息
		String returnMessage = StringUtils.EMPTY;
		
		// 参数校验结果
        String validStr = null;
        
    	try {
        	if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
        		
        			// 获取设备类型、网元ID
        			String type = StringUtil.htmlEscape(request.getParameter("type"));
        			String emsDevIdString = StringUtil.htmlEscape(request.getParameter("ems_dev_id"));
        			String emsCreateDatetime = request.getParameter("ems_create_datetime");
        			
        			// 参数校验
        			vu = new ValidateUtil();
    				vu.add("ems_dev_id", emsDevIdString, PropertiesUtil.confProperties.getProperty("device.param.ems_dev_id"), 
                            new Rule[]{new Required(), new Numeric(), new Length(50)});
        			vu.add("type", type, PropertiesUtil.confProperties.getProperty("device.param.type"), 
                            new Rule[]{new Required(), new CheckBox(new String[]{Constants.DEVICE_TYPE_BAS,Constants.DEVICE_TYPE_AC,Constants.DEVICE_TYPE_FIT_AP,Constants.DEVICE_TYPE_FAT_AP,Constants.DEVICE_TYPE_VLAN})});
        			vu.add("ems_create_datetime", emsCreateDatetime, PropertiesUtil.confProperties.getProperty("device.param.emsCreateDateTime"), 
                            new Rule[]{ new Required(), new Length(100), new DateValue()});
        			
        			validStr = vu.validateString();
        			
    				// 校验结果：参数有误时返回错误信息
    				if(validStr != null){
    					resultMap = this.getResult(validStr);
    					return SUCCESS;
    				}
    				
    				Long emsDevId = Long.parseLong(emsDevIdString);
    				
    				// 根据网元ID获取设备，判断请求是添加设备还是更新设备
    				DeviceWithBLOBs emsDevice = deviceService.getDeviceByEmsDevId(emsDevId);
    									
    				// 判断标志，添加设备为true，更新设备为false
    				boolean addDevice = true;
    				
    				// emsDevice不为空时，为更新设备
    				if(emsDevice != null) {
    					
    					// 根据网元ID和设备类型获取设备
//    					DeviceWithBLOBs deviceInDB = deviceService.getDeviceByEmsDevIdAndType(emsDevId, type);
        				
    					// typeDevice为null时，返回错误信息--设备类型不能修改
    					if(!emsDevice.getType().equalsIgnoreCase(type)){
    						returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.deviceType");
    						resultMap = this.getResult(returnMessage);
    						return SUCCESS;
    					}
    					    					
    					addDevice = false;    				
    				}
    				
    				// AC/BAS/胖AP设备都用得到的参数--获取
    				String brand = StringUtil.htmlEscape(request.getParameter("brand"));
        			String model = StringUtil.htmlEscape(request.getParameter("model"));
        			String framewareVersion = StringUtil.htmlEscape(request.getParameter("firmware_version"));
        			String province = request.getParameter("province");
        			String city = request.getParameter("city");
        			String countyDistrict = request.getParameter("county");
        			
        			if(province != null){
        				province = URLDecoder.decode(province, "UTF-8");
        			}
        			
        			if(city != null){
        				city = URLDecoder.decode(city, "UTF-8");
        			}
        			
        			if(countyDistrict != null){
        				countyDistrict = URLDecoder.decode(countyDistrict, "UTF-8");
        			}

        			// 校验公共参数
        			vu = new ValidateUtil();
        			vu.add("brand", brand, PropertiesUtil.confProperties.getProperty("device.param.brand"), 
                            new Rule[]{new Length(60)});
        			vu.add("model", model, PropertiesUtil.confProperties.getProperty("device.param.model"), 
                            new Rule[]{new Length(60)});
//        			vu.add("frameware_version", framewareVersion, PropertiesUtil.confProperties.getProperty("device.param.framewareVersion"), 
//                            new Rule[]{new Required(), new Length(50)});
//        			vu.add("province", province, PropertiesUtil.confProperties.getProperty("device.param.province"), 
//                            new Rule[]{new Required()});
        			
        			validStr = vu.validateString();
        			
        			// 校验结果：参数有误时返回错误信息
    				if(validStr != null){
    					resultMap = this.getResult(validStr);
    					return SUCCESS;
    				}
    				
    				// 获取locationId
    				Location location = new Location();
    				location.setAccountId(1L);
    				
    				/*if (StringUtils.isNotBlank(province)) {
    					location.setProvince(province);
    				}
    				if (StringUtils.isNotBlank(city)) {
    					location.setCity(city);
    				}
    				if (StringUtils.isNotBlank(countyDistrict)) {
    					location.setCountyDistrict(countyDistrict);
    				}*/
    				
    				Long locationId = deviceService.saveOrGetLocation(location).getId();
    				
    				// 获取deviceModelId
    				long deviceModelId = (long)0;
    				if(brand!=null && brand!="" && model!=null && model!=""){
    					deviceModelId = deviceService.getDeviceModelId(brand, model);
    				}
    				
    				if(StringUtils.isBlank(framewareVersion)){
    					framewareVersion = Constants.COMPONENT_TYPE_FIRMWARE;
    				}
    				
    				// 创建Device添加对象和更新对象
    				DeviceWithBLOBs device = new DeviceWithBLOBs();
    				DeviceWithBLOBs deviceUpdate = emsDevice;
    				
    				if(type.equalsIgnoreCase(Constants.DEVICE_TYPE_BAS) 
    						|| type.equalsIgnoreCase(Constants.DEVICE_TYPE_AC)
    						|| type.equalsIgnoreCase(Constants.FAT_AP_DEVICE_TYPE_EN) 
    						|| type.equalsIgnoreCase(Constants.VLAN_DEVICE_TYPE)) {
    					
    					// 添加设备时，设置各种设备的公共参数
        				if(addDevice) {
        					device = new DeviceWithBLOBs();
        					device.setEmsCreateDatetime(DateUtil.parseToDateTry(emsCreateDatetime));
        					device.setBrand(brand);
        					device.setModel(model);
    						device.setFramewareVersion(framewareVersion);
        					device.setStatus(Constants.DEVICE_STATUS_OFFLINE);
        					if(locationId>0){
        						device.setLocationId(locationId);
        					}
        					if(deviceModelId>0){
        						device.setDeviceModelId(deviceModelId);
    						}
//        					if(componentId!=null){
//        						device.setComponentId(componentId);
//        					}
        					device.setCreateDatetime(new Date());
        					device.setEmsDevId(emsDevId);
        					
        					// 有默认值的字段
//        					device.setWanProtocol(wanProtocol);
        					
        					// 以下是可为空字段
//        					device.setLastOnlineDatetime(lastOnlineDatetime);
//        					device.setRegisterationDate(registerationDate);        					
//        					device.setStartupTask(startupTask);
//        					device.setPublicIp(publicIp);
//        					device.setConfigItems(configItems);
//        					device.setManufacturerId(manufacturerId);
//        					device.setTrafficLimit(trafficLimit);
//        					device.setMinsLimit(minsLimit);
//        					device.setTelcomAccount(telcomAccount);
//        					device.setName(name);
//        					device.setLocationId(locationId);
        					
        				// 设备更新时
        				}else {
        					deviceUpdate.setEmsCreateDatetime(DateUtil.parseToDateTry(emsCreateDatetime));
        					deviceUpdate.setBrand(brand);
        					deviceUpdate.setModel(model);
        					deviceUpdate.setFramewareVersion(framewareVersion);
        					deviceUpdate.setStatus(Constants.DEVICE_STATUS_OFFLINE);
        					if(deviceModelId>0){
        						deviceUpdate.setDeviceModelId(deviceModelId);
        					}
//        					deviceUpdate.setComponentId(componentId);
        					if(locationId>0){
        						deviceUpdate.setLocationId(locationId);
        					}
        					
        					// 更新设备
        					this.deviceService.updateByPrimaryKeySelective(deviceUpdate);
        				}
    				}

    				// 设置device对象参数
					String deviceId = StringUtils.EMPTY;
					
    				// AC/BAS设备
        			if(type.equalsIgnoreCase(Constants.DEVICE_TYPE_BAS) || type.equalsIgnoreCase(Constants.DEVICE_TYPE_AC)) {
        				
        				// AC/BAS设备专用参数
        				String wlanAcName = StringUtil.htmlEscape(request.getParameter("ac_name"));
        				String devIp = this.deviceService.trimInnerSpaceStr(StringUtil.htmlEscape(request.getParameter("dev_ip")));
        				String port = this.deviceService.trimInnerSpaceStr(StringUtil.htmlEscape(request.getParameter("port")));
        				
        				// AC/BAS设备参数校验
        				vu = new ValidateUtil();
        				vu.add("acName", wlanAcName, PropertiesUtil.confProperties.getProperty("device.param.acName"),
        						new Rule[]{new Required(), new Length(60)});
        				vu.add("devIp", devIp, PropertiesUtil.confProperties.getProperty("device.param.devIp"),
        						new Rule[]{new Required(), new Regex(Constants.IP_PATTERN), new Length(15)});
        				vu.add("port", port, PropertiesUtil.confProperties.getProperty("device.param.port"),
        						new Rule[]{new Required(), new Length(10), new Numeric()});
        				vu.add("brand", brand, PropertiesUtil.confProperties.getProperty("device.param.brand"), 
                                new Rule[]{new Required(), new Length(60)});
            			vu.add("model", model, PropertiesUtil.confProperties.getProperty("device.param.model"), 
                                new Rule[]{new Required(), new Length(60)});
        				validStr = vu.validateString();
            			
            			// 校验结果：参数有误时返回错误信息
        				if(validStr != null){
        					resultMap = this.getResult(validStr);
        					return SUCCESS;
        				}
        				
        				// 根据acName获取AC/BAS设备附表记录
        				AAAVirtualDevice aaaVirtualDeviceInDB = deviceService.getRaduisByAcname(wlanAcName.trim());
        				
        				// acName唯一，当aaaVirtualDeviceInDB不为null时，返回错误信息--acName已存在
//        				if(aaaVirtualDeviceInDB != null && emsDevice != null && !aaaVirtualDeviceInDB.getDeviceId().equals(emsDevice.getDeviceId())) {
//    						returnMessage = PropertiesUtil.confProperties.getProperty("device.param.acNameExisted");
//    						resultMap = this.getResult(returnMessage);
//    		    			return SUCCESS;
//    					} 
        				
        				// 创建AAAVirtualDevice对象
    					AAAVirtualDevice radius = null;
    					
        				// 添加AC/BAS设备
        				if(addDevice) {
        					
        					// acName唯一，当aaaVirtualDeviceInDB不为null时，返回错误信息--acName已存在
        					if(aaaVirtualDeviceInDB != null && aaaVirtualDeviceInDB.getWlanacname().equals(wlanAcName.trim())) {
        						returnMessage = PropertiesUtil.confProperties.getProperty("device.param.acNameExisted");
        						resultMap = this.getResult(returnMessage);
        		    			return SUCCESS;
        					} 
        					
        					// 设置设备ID
        					if(type.equalsIgnoreCase(Constants.DEVICE_TYPE_BAS)){
        						deviceId = this.deviceService.generateBASDeviceId(brand, model, new Date());
    							device.setDeviceId(deviceId);
    							
    						} else if(type.equalsIgnoreCase(Constants.DEVICE_TYPE_AC)){
    							deviceId = this.deviceService.generateACDeviceId(brand, model, wlanAcName, new Date());
    							device.setDeviceId(deviceId);
    						}
        					
        					// 设置设备类型
        					if(type.equalsIgnoreCase(Constants.DEVICE_TYPE_BAS)){
        						device.setType(Constants.DEVICE_TYPE_BAS);
        						
    						} else if(type.equalsIgnoreCase(Constants.DEVICE_TYPE_AC)){
    							device.setType(Constants.DEVICE_TYPE_AC);
    						}
        					
        					
        					// 保存设备
        					this.deviceService.saveNewDevice(device);
//        					try{
//        						this.deviceService.sendDevice(device, Constants.OPT_TYPE_INSERT, Constants.DEVICE_TBL);
//        					} catch(Exception e) {
//        						logger.error("dataMQ发送device insert信息出错，错误信息：" + e.getMessage());
//        					}
        					
        					// 设置radius对象参数
        					radius = new AAAVirtualDevice();
        					radius.setWlanacname(wlanAcName);
        					radius.setDeviceId(deviceId);
        					radius.setIpAddr(devIp);
        					radius.setPort(Integer.parseInt(port));
        					radius.setCreateDatetime(new Date());
        					
        					// 有默认值字段
//        					radius.setRegistSecret(registSecret);
        					
        					// 可为空字段
//        					radius.setAuthSecret(authSecret);
//        					radius.setAccountingSecret(accountingSecret);
//        					radius.setName(name);
//        					radius.setDescription(description);
        					
        					// 保存AAAVirtualDevice设备
        					this.deviceService.saveAAAVirtualDevice(radius);
//        					try{
//        						this.deviceService.sendAAAVirtualDevice(radius, Constants.OPT_TYPE_INSERT, Constants.AAA_VIRTUAL_DEVICE_TBL);
//        					} catch(Exception e) {
//        						logger.error("dataMQ发送aaa_virtual_device insert信息出错，错误信息：" + e.getMessage());
//        					}
        					
        				// 更新AC/BAS设备
        				}else {
        					
        					// 设置虚拟设备
        					radius = deviceService.getRaduisByDeviceId(emsDevice.getDeviceId());
        					radius.setWlanacname(wlanAcName);
        					radius.setIpAddr(devIp);
        					radius.setPort(Integer.parseInt(port));
        					
        					// 更新radius
        					this.deviceService.updateAAAVirtualDevice(radius);
//        					try{
//        						this.deviceService.sendAAAVirtualDevice(radius, Constants.OPT_TYPE_UPDATE, Constants.AAA_VIRTUAL_DEVICE_TBL);
//        					} catch(Exception e) {
//        						logger.error("dataMQ发送aaa_virtual_device update信息出错，错误信息：" + e.getMessage());
//        					}
        				}
        				
        			// 瘦AP设备	
        			}else if(type.equalsIgnoreCase(Constants.FIT_AP_DEVICE_TYPE_EN)) {
        				
        				// 瘦AP专用参数
        				String parentEmsDevId = StringUtil.htmlEscape(request.getParameter("parent_ems_dev_id"));
        				String ssid = StringUtil.htmlEscape(request.getParameter("ssid"));
        				String mac = StringUtil.htmlEscape(request.getParameter("apmac"));
            			mac = MacUtil.convertMacToTwifiFormat(mac);
            			
        				// 瘦AP设备参数校验
        				vu = new ValidateUtil();
        				vu.add("parentEmsDevId", parentEmsDevId, PropertiesUtil.confProperties.getProperty("device.param.parentEmsDevId"),
        						new Rule[]{new Required(), new Length(50)});
        				vu.add("ssid", ssid, PropertiesUtil.confProperties.getProperty("device.param.ssid"),
        						new Rule[]{new Required(), new Length(100)});
        				if(StringUtils.isNotBlank(mac)) {
            				vu.add("mac", mac, PropertiesUtil.confProperties.getProperty("device.param.mac"), 
                                    new Rule[]{new Regex(Constants.MAC_PATTERN), new Length(12,12)});
            			}
        				validStr = vu.validateString();
        				
        				// 校验结果：参数有误时返回错误信息
        				if(validStr != null){
        					resultMap = this.getResult(validStr);
        					return SUCCESS;
        				}
        				
        				// 根据父网元ID获取一个AC/BAS虚拟设备
        				DeviceWithBLOBs acDevice = deviceService.getDeviceByEmsDevId(Long.parseLong(parentEmsDevId));
        				
        				// acDevice不存在,或者存在但是类型不是AC/BAS时，返回错误消息--ac/bas设备不存在，请先添加ac/bas设备
        				if(acDevice == null || (acDevice != null &&
        						!(acDevice.getType().equals(Constants.DEVICE_TYPE_AC) || acDevice.getType().equals(Constants.DEVICE_TYPE_BAS)))) {
        					returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.acDeviceNotExisted");
    						resultMap = this.getResult(returnMessage);
    		    			return SUCCESS;
        				}
        				
        				//获取AC/BAS设备信息
        				AAAVirtualDevice aaaDevice = deviceService.getRaduisByDeviceId(acDevice.getDeviceId());
        				
        				
        				if(aaaDevice == null) {
        					returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.acDeviceNotExisted");
    						resultMap = this.getResult(returnMessage);
    		    			return SUCCESS;
        				}
        				
        				// 获取瘦AP设备信息
        				SsidVirtualDevice ssidDeviceInDB = this.deviceService.getSsidDevice(ssid, acDevice.getDeviceId(), mac);
        				
        				// 添加瘦AP设备
        				if(ssidDeviceInDB == null) {
        					deviceId = deviceService.generateFitApDeviceId(brand, model, aaaDevice.getWlanacname(), ssid, new Date());
        					device.setDeviceId(deviceId);
        					device.setType(Constants.DEVICE_TYPE_FIT_AP);
        					device.setMac(mac);
        					device.setStatus(Constants.DEVICE_STATUS_OFFLINE);
        					device.setLocationId(acDevice.getLocationId());
        					device.setEmsDevId(emsDevId);
        					device.setEmsCreateDatetime(DateUtil.parseToDateTry(emsCreateDatetime));
        					device.setCreateDatetime(new Date());
        					
        					System.out.println("*********************ac_location_id :***************** " + acDevice.getLocationId());
        					
        					// 保存瘦AP对应的虚AP
        					this.deviceService.saveNewDevice(device);
        					
        					// 设置瘦AP对象
        					SsidVirtualDevice ssidDevice = new SsidVirtualDevice();
        					ssidDevice.setSsid(ssid);
        					ssidDevice.setAcDeviceId(acDevice.getDeviceId());
        					ssidDevice.setApMac(mac);
        					ssidDevice.setDeviceId(device.getDeviceId());
        					ssidDevice.setCreateDatetime(new Date());
        					
        					// 保存瘦AP对象
        					this.deviceService.saveSsidVirtualDevice(ssidDevice);
        					
        					resultMap = this.getResult(deviceId,"OK");
                			return SUCCESS;
        					
        				}else {
        					resultMap = this.getResult("SSID已存在");
        					return SUCCESS;
        				}
        				
        				
        				// 添加瘦AP设备
/*        				if(addDevice) {
        					deviceId = deviceService.generateFitApDeviceId(brand, model, aaaDevice.getWlanacname(), ssid, new Date());
        					device.setDeviceId(deviceId);
        					device.setType(Constants.DEVICE_TYPE_FIT_AP);
        					device.setMac(mac);
        					device.setLocationId(acDevice.getLocationId());
        					
        					// 保存瘦AP设备
        					this.deviceService.saveNewDevice(device);
        					
        					// 设置SsidVirtualDevice对象
        					SsidVirtualDevice ssidDevice = new SsidVirtualDevice();
        					ssidDevice.setSsid(ssid);
        					ssidDevice.setAcDeviceId(acDevice.getDeviceId());
        					ssidDevice.setApMac(mac);
        					ssidDevice.setDeviceId(device.getDeviceId());
        					ssidDevice.setCreateDatetime(new Date());
        					
        					// 保存SsidVirtualDevice对象
        					this.deviceService.saveSsidVirtualDevice(ssidDevice);
//        					try{
//        						this.deviceService.sendSsidVirtualDevice(ssidDevice, Constants.OPT_TYPE_INSERT, Constants.SSID_VIRTUAL_DEVICE_TBL);
//        					} catch(Exception e) {
//        						logger.error("dataMQ发送ssid_virtual_device insert信息出错，错误信息：" + e.getMessage());
//        					}
        					
        				// 更新瘦AP设备	
        				}else {
        					
        					// 根据deviceId获取要更新的SsidVirtualDevice对象
        					deviceId = ssidDeviceInDB.getDeviceId();
        					SsidVirtualDevice ssidDevice = this.deviceService.getSsidDeviceByDeviceId(deviceId);
        					
        					// 如果要设置的值已存在，且不是自己的话返回错误消息--此fitAp设备已存在
        					if(ssidDevice != null && ssidDeviceInDB != null && ssidDevice.getId() != ssidDeviceInDB.getId()) {
        						returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.fitApDeviceExisted");
        						resultMap = this.getResult(returnMessage);
        						return SUCCESS;
        					}
        					
        					// 设置SsidVirtualDevice对象
        					ssidDevice.setSsid(ssid);
        					ssidDevice.setDeviceId(emsDevice.getDeviceId());
        					ssidDevice.setApMac(mac);
        					ssidDevice.setAcDeviceId(acDevice.getDeviceId());
        					device.setLocationId(acDevice.getLocationId());
        					
        					// 更新ssid设备
        					this.deviceService.updateByPrimaryKeySelective(ssidDevice);
        					ssidDevice = this.deviceService.getSsidDeviceByDeviceId(deviceId);
//        					try{
//        						this.deviceService.sendSsidVirtualDevice(ssidDevice, Constants.OPT_TYPE_UPDATE, Constants.SSID_VIRTUAL_DEVICE_TBL);
//        					} catch(Exception e) {
//        						logger.error("dataMQ发送ssid_virtual_device update信息出错，错误信息：" + e.getMessage());
//        					}
        				}*/
        				
        			// 胖AP设备
        			}else if(type.equalsIgnoreCase(Constants.FAT_AP_DEVICE_TYPE_EN)) {
        				
        				// 胖AP专用参数
        				String framewareVersionFatAp = StringUtil.htmlEscape(request.getParameter("firmware_version"));
        				String componentVersion = StringUtil.htmlEscape(request.getParameter("component_version"));
        				String pinCode = StringUtil.htmlEscape(request.getParameter("pin_code"));
        				String xPos = StringUtil.htmlEscape(request.getParameter("xPos"));
            			String yPos = StringUtil.htmlEscape(request.getParameter("yPos"));
            			String fixAddr = StringUtil.htmlEscape(request.getParameter("fix_addr"));
            			String mac = StringUtil.htmlEscape(request.getParameter("mac"));
            			mac = MacUtil.convertMacToTwifiFormat(mac);
            			
        				// 胖AP设备参数校验
        				vu = new ValidateUtil();
        				vu.add("brand", brand, PropertiesUtil.confProperties.getProperty("device.param.brand"), 
                                new Rule[]{new Required(), new Length(60)});
            			vu.add("model", model, PropertiesUtil.confProperties.getProperty("device.param.model"), 
                                new Rule[]{new Required(), new Length(60)});
            			vu.add("componentVersion", componentVersion, PropertiesUtil.confProperties.getProperty("device.param.componentVersion"),
        						new Rule[]{new Required(), new Length(50)});
            			vu.add("framewareVersion", framewareVersionFatAp, PropertiesUtil.confProperties.getProperty("device.param.framewareVersion"),
        						new Rule[]{new Required(), new Length(50)});
        				vu.add("pinCode", pinCode, PropertiesUtil.confProperties.getProperty("device.param.pinCode"),
        						new Rule[]{new Required(), new Numeric(), new Length(20)});
        				vu.add("xPos", xPos, PropertiesUtil.confProperties.getProperty("device.param.xPos"), 
                                new Rule[]{new Length(9)});
            			vu.add("yPos", yPos, PropertiesUtil.confProperties.getProperty("device.param.yPos"), 
                                new Rule[]{new Length(9)});
            			vu.add("fixAddr", fixAddr, PropertiesUtil.confProperties.getProperty("device.param.fixAddr"), 
                                new Rule[]{new Length(200)});
            			if(StringUtils.isNotBlank(mac)) {
            				vu.add("mac", mac, PropertiesUtil.confProperties.getProperty("device.param.mac"), 
                                    new Rule[]{new Regex(Constants.MAC_PATTERN),new Required(), new Length(12,12)});
            			}
        				validStr = vu.validateString();
        				
        				// 校验结果：参数有误时返回错误信息
        				if(validStr != null){
        					resultMap = this.getResult(validStr);
        					return SUCCESS;
        				}

        				// 分别根据网元ID和mac地址获取ProducedDevices对象
        				ProducedDevices producedDeviceByEmsDevId = this.deviceService.getProducedDeviceByEmsDevId(emsDevId); 
        				ProducedDevices producedDeviceByMac = this.deviceService.getProductedDevicesByMac(mac);
        				
        				// 新增胖AP设备
        				if(producedDeviceByMac == null) {
        					
        					// 根据mac搜不到设备，那么根据此EMSDevId也不能搜索到设备，否则返回错误消息--mac地址和网元ID不匹配
        					if(producedDeviceByEmsDevId != null) {
        						returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.emsDevIdAndMacError");
        						resultMap = this.getResult(returnMessage);
        						return SUCCESS;
        					}
        					
        					producedDeviceByMac = new ProducedDevices();
        					producedDeviceByMac.setDeviceModelId(deviceModelId);
        					producedDeviceByMac.setBrand(brand);
        					producedDeviceByMac.setModel(model);
        					producedDeviceByMac.setFramewareVersion(framewareVersionFatAp);
//        					if(StringUtils.isNotBlank(componentVersion)){
        						producedDeviceByMac.setComponentVersion(componentVersion);
//        					}
        					producedDeviceByMac.setMac(mac);
        					producedDeviceByMac.setPinCode(pinCode);
        					producedDeviceByMac.setStatus(Constants.PRODUCED_DEVICES_STATUS_AUDITED);
        					producedDeviceByMac.setCreateDatetime(new Date());
        					producedDeviceByMac.setEmsDevId(emsDevId);
        					producedDeviceByMac.setEmsCreateDatetime(DateUtil.parseToDateTry(emsCreateDatetime));
        					producedDeviceByMac.setXpos(xPos);
        					producedDeviceByMac.setYpos(yPos);
        					producedDeviceByMac.setFixAddr(fixAddr);
        					producedDeviceByMac.setProvince(province);
        					producedDeviceByMac.setCity(city);
        					producedDeviceByMac.setCounty(countyDistrict);
        					
        					// 可以为空的字段
//        					producedDeviceByMac.setId(id);
//        					producedDeviceByMac.setManufacturerId(manufacturerId);
//        					producedDeviceByMac.setConfigItems(configItems);
//        					producedDeviceByMac.setProvince(province);;
//        					producedDeviceByMac.setCity(city);
//        					producedDeviceByMac.setCounty(county);
        					
        					// 插入记录
        					this.deviceService.addProducedDevices(producedDeviceByMac);
        					
//        					try{
//        						this.deviceService.sendProduceDevice(producedDeviceByMac, Constants.OPT_TYPE_INSERT, Constants.PRODUCED_DEVICE_TBL);
//        						
//        					} catch(Exception e) {
//        						logger.error("dataMQ发送produced_devices insert 信息出错，错误信息：" + e.getMessage());
//        					}

        				// 修改胖AP设备
        				}else {
        					
        					// mac地址不一致时返回--mac地址不可改变
        					if(producedDeviceByEmsDevId != null && !producedDeviceByEmsDevId.getMac().equalsIgnoreCase(mac)) {
        						returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.macCannotModify");
        						resultMap = this.getResult(returnMessage);
        						return SUCCESS;
        					}
        					
        					producedDeviceByMac.setEmsDevId(emsDevId);
        					producedDeviceByMac.setDeviceModelId(deviceModelId);
        					producedDeviceByMac.setBrand(brand);
        					producedDeviceByMac.setModel(model);
        					producedDeviceByMac.setFramewareVersion(framewareVersionFatAp);
//        					if(StringUtils.isNotBlank(componentVersion)){
        						producedDeviceByMac.setComponentVersion(componentVersion);
//        					}
        					producedDeviceByMac.setPinCode(pinCode);
        					producedDeviceByMac.setStatus(Constants.PRODUCED_DEVICES_STATUS_AUDITED);
        					producedDeviceByMac.setCreateDatetime(new Date());
        					producedDeviceByMac.setEmsDevId(emsDevId);
        					producedDeviceByMac.setEmsCreateDatetime(DateUtil.parseToDateTry(emsCreateDatetime));
        					producedDeviceByMac.setXpos(xPos);
        					producedDeviceByMac.setYpos(yPos);
        					producedDeviceByMac.setFixAddr(fixAddr);
        					
        					this.deviceService.updateProducedDevices(producedDeviceByMac);
        					
//        					try{
//        						this.deviceService.sendProduceDevice(producedDeviceByMac, Constants.OPT_TYPE_UPDATE, Constants.PRODUCED_DEVICE_TBL);
//        					
//        					} catch(Exception e) {
//        						logger.error("dataMQ发送produced_devices update信息出错，错误信息：" + e.getMessage());
//        					}
        				}
        			} else if(type.equalsIgnoreCase(Constants.VLAN_DEVICE_TYPE)) { //热点同步
        				//热点专用参数
        				String domain = request.getParameter("domain");
        				String acname = request.getParameter("acname");
        				String pvlan = request.getParameter("pvlan");
        				String cvlan = request.getParameter("cvlan");
        				String ethPort = request.getParameter("ethport");
        				String ssid = request.getParameter("ssid");
        				String shel = request.getParameter("shel");
        				String slot = request.getParameter("slot");

        				// 热点参数校验
        				vu = new ValidateUtil();
        				vu.add("ethPort", ethPort, PropertiesUtil.confProperties.getProperty("device.param.ethport"), 
                                new Rule[]{new Required(), new Length(5)});
                        vu.add("acname", acname, "acname", 
                                new Rule[]{new Required()});
        				vu.add("pvlan", pvlan, "pvlan", 
                                new Rule[]{new Required()});
//        				vu.add("cvlan", ethPort, "pvlan", 
//                                new Rule[]{new Required()});
//        				vu.add("shel", ethPort, "shel", 
//                                new Rule[]{new Required()});
//        				vu.add("slot", ethPort, "slot", 
//                                new Rule[]{new Required()});
        				validStr = vu.validateString();
        				
        				
        				logger.debug("pvlan : " + pvlan);
        				
        				// 校验结果：参数有误时返回错误信息
        				if(validStr != null){
        					resultMap = this.getResult(validStr);
        					return SUCCESS;
        				}

        				// 根据acname获取一个AC/BAS设备
        				if(StringUtils.isNotBlank(acname)){
        					AAAVirtualDevice aaaDevice = deviceService.getRaduisByAcname(acname);
        					if(aaaDevice==null){
        						returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.acDeviceNotExisted");
        						resultMap = this.getResult(returnMessage);
        		    			return SUCCESS;
        					}
        				}
        				
        				// 设置VlanVirtualDevice对象
        				VlanVirtualDevice tempVlanDevice = new VlanVirtualDevice();
        				tempVlanDevice.setAcname(acname);
        				tempVlanDevice.setDomain(domain);
    					tempVlanDevice.setPvlanId(pvlan);
    					tempVlanDevice.setCvlanId(cvlan);
    					tempVlanDevice.setEthPort(ethPort);
    					tempVlanDevice.setName(ssid);
    					tempVlanDevice.setTelecomAccount(ssid);
    					tempVlanDevice.setShel(shel);
    					tempVlanDevice.setSlot(slot);
    					
        				// 用来判断此VlanVirtualDevice记录是否已存在
    					VlanVirtualDevice vlanDeviceInDB = this.deviceService.getVlanDevice(tempVlanDevice);
    					
        				// 添加热点
        				if(addDevice) {
        					// vlanDeviceInDB不为null时，返回错误信息：热点已存在
        					if(vlanDeviceInDB != null) {
        						returnMessage = PropertiesUtil.confProperties.getProperty("device.param.vlanDeviceExisted");
        						resultMap = this.getResult(returnMessage);
        		    			return SUCCESS;
        					} 
        					
        					deviceId = deviceService.generateVlanDeviceId(acname, cvlan, pvlan, new Date());
        					device.setDeviceId(deviceId);
        					device.setType(Constants.DEVICE_TYPE_VLAN);
        					
        					// 保存热点主表
        					this.deviceService.saveNewDevice(device);
        					
        					// 保存热点从表
        					tempVlanDevice.setDeviceId(deviceId);
        					this.deviceService.saveVlanVirtualDevice(tempVlanDevice);
        					
        				// 更新热点：又分为添加和更新
        				}else {
        					
        					// 根据deviceId获取要热点
        					deviceId = deviceUpdate.getDeviceId();
        					VlanVirtualDevice vlanDevice = this.deviceService.getVlanDeviceByDeviceId(deviceId);
        					
        					// 热点不存在时：添加
        					if(vlanDevice == null) {
        						
        						// vlanDeviceInDB不为null时，返回错误信息：热点已存在
            					if(vlanDeviceInDB != null) {
            						returnMessage = PropertiesUtil.confProperties.getProperty("device.param.vlanDeviceExisted");
            						resultMap = this.getResult(returnMessage);
            		    			return SUCCESS;
            					} 
            					
            					// 设备类型不一样的时候返回：设备类型不能修改
            					if(!Constants.VLAN_DEVICE_TYPE.equalsIgnoreCase(emsDevice.getType())) {
            						returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.deviceType");
            						resultMap = this.getResult(returnMessage);
            		    			return SUCCESS;
            					}
            					
            					// 设置并保存热点从表
            					tempVlanDevice.setDeviceId(deviceId);
            					this.deviceService.saveVlanVirtualDevice(tempVlanDevice);
            				
        					}else {
        						// 设置VlanVirtualDevice对象，更新
            					vlanDevice.setAcname(acname);
            					vlanDevice.setDomain(domain);
            					vlanDevice.setPvlanId(pvlan);
            					vlanDevice.setCvlanId(cvlan);
            					vlanDevice.setEthPort(ethPort);
            					vlanDevice.setName(ssid);
            					vlanDevice.setTelecomAccount(ssid);
            					vlanDevice.setShel(shel);
            					vlanDevice.setSlot(slot);
            					vlanDevice.setDeviceId(emsDevice.getDeviceId());
            					
            					// 更新热点
            					this.deviceService.updateByPrimaryKeySelective(vlanDevice);
        					}
        					
        					
//        					ssidDevice = this.deviceService.getSsidDeviceByDeviceId(deviceId);
//        					try{
//        						this.deviceService.sendSsidVirtualDevice(ssidDevice, Constants.OPT_TYPE_UPDATE, Constants.SSID_VIRTUAL_DEVICE_TBL);
//        					} catch(Exception e) {
//        						logger.error("dataMQ发送ssid_virtual_device update信息出错，错误信息：" + e.getMessage());
//        					}
        				}
        			}
        			resultMap = this.getResult(deviceId,"OK");
        			return SUCCESS;
        			
        	// 数据提交方式不是POST的时候，返回错误信息--非法请求		
        	} else {
        		returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
            	resultMap = this.getResult(returnMessage);
            	return SUCCESS;
        	}
        
        // 系统异常时，输入错误日志，打印错误信息，返回错误信息--系统异常，保存错误信息到异常表
        } catch(Exception e) {
        	logger.error("同步设备出错：" + e.getMessage());
//        	e.printStackTrace();
			saveExceptionLog("device", deviceService.getClass().toString(), e);
			returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
        }
	
	}
	
	/**
	 * 注册AC/BAS设备
	 * @return
	 */
	@Action(value = "/radiusRegister",
			results = {@Result(name = SUCCESS, type = "json",params = {"root","resultMap"})})
	public synchronized String radiusRegister() {
        
    	try {
        	if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
        		
        		// 获取参数
        		String type = this.deviceService.trimInnerSpaceStr(StringUtil.htmlEscape(request.getParameter("type")));
    			String acName = this.deviceService.trimInnerSpaceStr(StringUtil.htmlEscape(request.getParameter("ac_name")));
    			String devIp = this.deviceService.trimInnerSpaceStr(StringUtil.htmlEscape(request.getParameter("dev_ip")));
    			String secret = this.deviceService.trimInnerSpaceStr(StringUtil.htmlEscape(request.getParameter("secret")));
    			
    			// 参数校验
    			ValidateUtil vu = new ValidateUtil();
    			vu.add("type", type, PropertiesUtil.confProperties.getProperty("device.param.type"), 
                        new Rule[]{new Required(), new Length(30), new CheckBox(new String[]{Constants.DEVICE_TYPE_AC, Constants.DEVICE_TYPE_BAS})});
    			vu.add("devIp", devIp, PropertiesUtil.confProperties.getProperty("device.param.devIp"), 
                        new Rule[]{new Regex(Constants.IP_PATTERN), new Required(), new Length(50)});
    			vu.add("acName", acName, PropertiesUtil.confProperties.getProperty("device.param.deviceName"), 
                        new Rule[]{new Regex(Constants.AC_NAME_PATTERN), new Required(), new Length(60)});
    			vu.add("secret", secret, PropertiesUtil.confProperties.getProperty("device.param.secret"), 
                        new Rule[]{new Required(), new Length(60)});
    			String validStr = vu.validateString();
    			
    			// 参数校验不通过，返回错误信息
    			if(validStr != null) {
    				resultMap = this.getResult(validStr);
        			return SUCCESS;
    			}
    			
				if(type.equalsIgnoreCase(Constants.DEVICE_TYPE_AC) || type.equalsIgnoreCase(Constants.DEVICE_TYPE_BAS)) {
					
					// 创建Radius设备
                    AAAVirtualDevice radius = new AAAVirtualDevice();
                    radius.setWlanacname(acName);
                    radius.setIpAddr(devIp);
                    radius.setRegistSecret(secret);
                    radius.setName(acName);
                    
//					String port = StringUtil.htmlEscape(request.getParameter("port"));
//					String authSecret = StringUtil.htmlEscape(request.getParameter("authSecret"));
//					String accountingSecret = StringUtil.htmlEscape(request.getParameter("accountingSecret"));
//					String description = StringUtil.htmlEscape(request.getParameter("description"));
//					
//					if (StringUtils.isNotBlank(port)) {
//						radius.setPort(Integer.parseInt(port));
//					}
//					
//					if (StringUtils.isNotBlank(authSecret)) {
//						radius.setAuthSecret(authSecret);
//					}
//					
//					if (StringUtils.isNotBlank(accountingSecret)) {
//						radius.setAccountingSecret(accountingSecret);
//					}
//					
//					if (StringUtils.isNotBlank(description)) {
//						radius.setDescription(description);
//					}
					
                    // 根据acName获取一条记录
					AAAVirtualDevice aaaDevice = deviceService.getRaduisByAcname(acName);
					
					DeviceWithBLOBs device = new DeviceWithBLOBs();
					Date createDate = new Date();
					
					if(aaaDevice != null)  {
						radius.setDeviceId(aaaDevice.getDeviceId());
						this.deviceService.updateAAAVirtualDevice(radius);
						
						device.setDeviceId(aaaDevice.getDeviceId());
						device.setRegisterationDate(createDate);
						this.deviceService.updateByPrimaryKeySelective(device);
						
					// 创建对应的虚拟device	
					} else {
						
						// 设置device对象参数
    					String deviceId = StringUtils.EMPTY;
    					
    					// 设置设备ID
    					if(type.equalsIgnoreCase(Constants.DEVICE_TYPE_BAS)){
    						deviceId = this.deviceService.generateBASDeviceId(Constants.AC_DEVICE_BRAND, Constants.AC_DEVICE_MODEL, new Date());
							
						} else if(type.equalsIgnoreCase(Constants.DEVICE_TYPE_AC)){
							deviceId = this.deviceService.generateACDeviceId(Constants.AC_DEVICE_BRAND, Constants.AC_DEVICE_MODEL, acName, new Date());
						}
                       
    					String uuid = UUID.randomUUID().toString().toUpperCase().replace("-", "");
                        String deviceName = Constants.RADIUS_DEVICE_NAME_PREFIX + uuid.substring(0, Constants.RADIUS_DEVICE_NAME_RAND_STR_LEN);
                        
                        device.setDeviceId(deviceId);
                        device.setRegisterationDate(createDate);
                        
                        radius.setDeviceId(device.getDeviceId());
                        
                        if (StringUtils.isNotBlank(deviceName)){
                            device.setName(deviceName);
                        }
                        
                        device.setBrand(Constants.RADIUS_DEVICE_BRAND);
                        device.setModel(Constants.RADIUS_DEVICE_MODEL);
                        device.setFramewareVersion(Constants.RADIUS_DEVICE_FIRMWARE_VERSION);
                        device.setStatus(Constants.DEVICE_STATUS_OFFLINE);
                        device.setDeviceModelId(deviceService.getOrCreateDeviceModelIdByBrandModel(device.getBrand(), device.getModel()));
                        device.setManufacturerId(Constants.SUPER_ADMIN_ACCOUNT_ID);
                        device.setType(type.toUpperCase());

                        this.deviceService.saveNewDevice(device);
                        
		                this.deviceService.saveAAAVirtualDevice(radius);
					}
					
					String returnreturnMessage = StringUtils.EMPTY;

			         // radius服务器地址
			         String radiusCreateOrUpdateUserUrl = 
			                 PropertiesUtil.confProperties.getProperty("radius.serverAddrTwo") +
			                 PropertiesUtil.confProperties.getProperty("radius.registerACBas");
			         
			         // 设置请求参数
			         Map<String, String> params = new HashMap<String, String>();
					 params.put("nasname", URLEncoder.encode(devIp, "UTF-8"));
			         params.put("shortname", URLEncoder.encode(acName, "UTF-8"));
			         params.put("type", URLEncoder.encode(type, "UTF-8"));
			         params.put("secret", URLEncoder.encode(secret, "UTF-8")); 
			         
			         
			         logger.debug("radius注册AC/BAS：" + radiusCreateOrUpdateUserUrl + "----参数： " + params.toString());
			         
			         // 发送请求并接受返回结果
			         InputStream inputStream = null;
			         try{
			        	 inputStream = HttpRequest.sendPostJsonRequest(radiusCreateOrUpdateUserUrl, params);//"http://127.0.0.1:8000/device/test.htm"
			         } catch (IOException e) {
			        	 logger.error("radius接收请求失败，错误信息：" + e.getMessage());
			        	 resultMap = this.getResult(ErrorMessage.getErrorMsg("error.radius.failed"));
			             return SUCCESS;
			         }
			         // 判断返回结果
			         if(inputStream == null){
			             resultMap = this.getResult(ErrorMessage.getErrorMsg("error.radius.failed"));
			             return SUCCESS;
			             
			         }else{
			        	 returnreturnMessage = new String(HttpRequest.parseInputStream(inputStream).array());
			         }
			         logger.debug("radius注册AC/BAS返回：" + returnreturnMessage);
			         resultMap = this.gson.fromJson(returnreturnMessage, new TypeToken<Map<String, Object>>(){}.getType());
			         
			         if("OK".equals(resultMap.get("result"))) {
			        	 resultMap = this.getResult();
			        	 
			         }else {
			        	 resultMap = this.getResult(ErrorMessage.getErrorMsg("error.radius.failed"));
			         }
				} 
    			
        	} else {
        		returnMessage = PropertiesUtil.confProperties.getProperty("returnMessage.illegalRequest");//非法请求
        		resultMap = this.getResult(returnMessage);
    			return SUCCESS;
        	}
        	
        	return SUCCESS;
        	
        } catch(Exception e) {
        	e.printStackTrace();
        	result = false;
			saveExceptionLog("device", deviceService.getClass().toString(), e);
			returnMessage = PropertiesUtil.confProperties.getProperty("returnMessage.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
        }
		
	}
	
	/**
	 * 查询商户号对应的胖AP的mac地址
	 */
	@Action(value = "/getFatapMacByAccount", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	public synchronized String getFatapMacByAccount() {
		// 返回信息
		String returnMessage = StringUtils.EMPTY;
		// 参数校验结果
        String validStr = null;
    	try {
    		String accountId = request.getParameter("account");
    		ValidateUtil vu = new ValidateUtil();
			vu.add("account_id", accountId, PropertiesUtil.confProperties.getProperty("account.param.accountId"), 
					new Rule[]{new Required(), new Length(20), new Numeric()});
			validStr = vu.validateString();
			
			// 校验结果：参数有误时返回错误信息
			if(validStr != null){
				resultMap = this.getResult(validStr);
				return SUCCESS;
			}
			String mac = deviceService.getFatapMacByAccountId(Long.valueOf(accountId));
			Map<String,String> result = new HashMap<String,String>();
			result.put("mac", mac);
			returnMessage = this.gson.toJson(result);
			resultMap = this.getResult(returnMessage,"OK");
			return SUCCESS;
        } catch(Exception e) {
        	logger.error("查询商户号对应的胖AP的mac地址出错：" + e.getMessage());
			saveExceptionLog("device", deviceService.getClass().toString(), e);
			returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
        }
	}

	/*-------------------------- 已注册设备查询 ----------------------------*/
	/**
	 * 已注册设备查询页
	 * 
	 * @return
	 */
	@Action(value = "searchdevicepage", results = { 
			@Result(name = SUCCESS, location="/WEB-INF/jsp${jspversion}/system/system_device_library.jsp"),
			@Result(name = "ERROR", type = "json", params = { "root", "resultMap" })})
	public String searchDevicePage() {
		resultMap = new HashMap<String, Object>();
		Boolean result = false;
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)) {
				result = true;
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.illegalRequest"));
			}
		} catch(Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("device", deviceService.getClass().toString(), e);
		}
		if(result) {
			return SUCCESS;
		} else {
			return "ERROR";
		}
	}	

	/**
	 * 查询已注册设备
	 * 
	 * @return
	 */
	@Action(value = "searchdevice", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	@SuppressWarnings("unchecked")
	public String searchDevice() {
		resultMap = new HashMap<String, Object>();
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)) {
				String keywords = StringUtil.fromGetRequest(this.request.getParameter("keywords"));
				String type = this.request.getParameter("type");
				String startDate = this.request.getParameter("startdate");
				String endDate = this.request.getParameter("enddate");
				String province = StringUtil.fromGetRequest(this.request.getParameter("province"));
				String city = StringUtil.fromGetRequest(this.request.getParameter("city"));
				//当前页码
				String pageNo = this.request.getParameter("pageNo");
				Page page = null;
				if(StringUtils.isBlank(pageNo)){
					page = new Page(Integer.valueOf(pageNo),10);
				}
				ValidateUtil vu = new ValidateUtil();
				vu.add("pageNo", (this.pageNo == null) ? null : String.valueOf(this.pageNo), PropertiesUtil.confProperties.getProperty("page.pageNo"), 
						new Rule[]{new Numeric()});
				vu.add("pageSize", (this.pageSize==null) ? null : String.valueOf(this.pageSize), PropertiesUtil.confProperties.getProperty("page.pageSize"), 
						new Rule[]{new Numeric()});
				vu.add("type", type, PropertiesUtil.confProperties.getProperty("device.param.type"), 
						new Rule[]{new CheckBox(new String[]{Constants.DEVICE_TYPE_CUSTOMIZED_AP, 
								Constants.DEVICE_TYPE_FIT_AP, 
								Constants.DEVICE_TYPE_NAS, 
								Constants.DEVICE_TYPE_P2, 
								Constants.DEVICE_TYPE_STANDARD_AP, 
								Constants.DEVICE_TYPE_THIRD_ACCESS, 
								Constants.AC_DEVICE_TYPE,
								Constants.BAS_DEVICE_TYPE,
								Constants.FAT_AP_DEVICE_TYPE_EN,
								""}), new Length(100)});
				vu.add("startDate", startDate, PropertiesUtil.confProperties.getProperty("system.param.startdate"), 
						new Rule[]{new Regex(Constants.DATE_PATTERN)});
				vu.add("endDate", endDate, PropertiesUtil.confProperties.getProperty("system.param.enddate"), 
						new Rule[]{new Regex(Constants.DATE_PATTERN)});
				String validStr = vu.validateString();
				if(validStr == null){
					Location location = new Location();
					if (StringUtils.isNotBlank(province)) {
						location.setProvince(province);
					}
					if (StringUtils.isNotBlank(city)) {
						location.setCity(city);
					}
					Long[] locationIds = null;
					if(StringUtils.isNotBlank(province) || StringUtils.isNotBlank(city)){
						locationIds = deviceService.getLocation(location);
					}
					
					Page<Device> resultPage = deviceService.getDevicePage((page == null ? this.getPage(): page), 
							this.gettotal, keywords, type, startDate, endDate, locationIds, province, city);
					this.setPageInfo(resultPage);
					resultMap.put("result", "OK");
				} else {
					resultMap.put("result", "FAIL");
					resultMap.put("message", validStr);
				}
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.illegalRequest"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("device", deviceService.getClass().toString(), e);
		}
		return SUCCESS;
	}

	/**
	 * 查询已注册设备总量
	 * @return
	 * */
	@Action(value = "searchdevicetotal", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	@SuppressWarnings("unchecked")
	public String searchDeviceTotal() {
		resultMap = new HashMap<String, Object>();
		int total = 0;
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)){
				String keywords = StringUtil.fromGetRequest(this.request.getParameter("keywords"));
				String type = this.request.getParameter("type");
				String startDate = this.request.getParameter("startdate");
				String endDate = this.request.getParameter("enddate");
				String province = StringUtil.fromGetRequest(this.request.getParameter("province"));
				String city = StringUtil.fromGetRequest(this.request.getParameter("city"));
				ValidateUtil vu = new ValidateUtil();
				vu.add("type", type, PropertiesUtil.confProperties.getProperty("device.param.type"), 
						new Rule[]{new CheckBox(new String[]{Constants.DEVICE_TYPE_CUSTOMIZED_AP, 
								Constants.DEVICE_TYPE_FIT_AP, 
								Constants.DEVICE_TYPE_NAS, 
								Constants.DEVICE_TYPE_P2, 
								Constants.DEVICE_TYPE_STANDARD_AP, 
								Constants.DEVICE_TYPE_THIRD_ACCESS, 
								Constants.AC_DEVICE_TYPE,
								Constants.BAS_DEVICE_TYPE,
								Constants.FAT_AP_DEVICE_TYPE_EN,
								""}), new Length(100)});
				vu.add("startDate", startDate, PropertiesUtil.confProperties.getProperty("system.param.startdate"), 
						new Rule[]{new Regex(Constants.DATE_PATTERN)});
				vu.add("endDate", endDate, PropertiesUtil.confProperties.getProperty("system.param.enddate"), 
						new Rule[]{new Regex(Constants.DATE_PATTERN)});
				String validStr = vu.validateString();
				if(validStr == null){
					Location location = new Location();
					if (StringUtils.isNotBlank(province)) {
						location.setProvince(province);
					}
					if (StringUtils.isNotBlank(city)) {
						location.setCity(city);
					}
					if(StringUtils.isNotBlank(province) || StringUtils.isNotBlank(city)){
						location = deviceService.saveOrGetLocation(location);
					}
					total = deviceService.getDevicePageTotal(this.getPage(), 
							this.gettotal, keywords, type, startDate, endDate, location);
					resultMap.put("result", "OK");
					resultMap.put("total", total);
				} else {
					resultMap.put("result", "FAIL");
					resultMap.put("message", validStr);
				}
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.illegalRequest"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("device", deviceService.getClass().toString(), e);
		}
		return SUCCESS;
	}
	
	/**
	 * 查询设备详情
	 * 
	 * @return
	 */
	@Action(value = "searchdevicedetail", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	@SuppressWarnings("unchecked")
	public String searchDeviceDetail() {
		resultMap = new HashMap<String, Object>();
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)) {
				String deviceId = StringUtil.fromGetRequest(this.request.getParameter("device_id"));
				String type = this.request.getParameter("type");
				ValidateUtil vu = new ValidateUtil();
				vu.add("deviceId", deviceId, PropertiesUtil.confProperties.getProperty("device.param.deviceId"), 
						new Rule[]{new Required(),new Length(64)});
				vu.add("type", type, PropertiesUtil.confProperties.getProperty("device.param.type"), 
						new Rule[]{new CheckBox(new String[]{Constants.DEVICE_TYPE_CUSTOMIZED_AP, 
								Constants.DEVICE_TYPE_FIT_AP, 
								Constants.DEVICE_TYPE_NAS, 
								Constants.DEVICE_TYPE_P2, 
								Constants.DEVICE_TYPE_STANDARD_AP, 
								Constants.DEVICE_TYPE_THIRD_ACCESS, 
								Constants.AC_DEVICE_TYPE,
								Constants.BAS_DEVICE_TYPE,
								Constants.FAT_AP_DEVICE_TYPE_EN,
								""}), new Length(100)});
				String validStr = vu.validateString();
				if(validStr == null) {
					if(type.equalsIgnoreCase(Constants.AC_DEVICE_TYPE) || type.equalsIgnoreCase(Constants.BAS_DEVICE_TYPE)) {
						AAAVirtualDevice aaaDevice = deviceService.getRaduisByDeviceId(deviceId);
						if(aaaDevice != null){
							resultMap.put("record", JsonUtil.objectToJson(aaaDevice));
						} else {
							resultMap.put("record", "");
						}
					} else if(type.equalsIgnoreCase(Constants.FIT_AP_DEVICE_TYPE_EN)) {
						SsidVirtualDevice ssidDevice = deviceService.getSsidDeviceByDeviceId(deviceId);
						if(ssidDevice != null){
							resultMap.put("record", JsonUtil.objectToJson(ssidDevice));
						} else {
							resultMap.put("record", "");
						}
					} else if(type.equalsIgnoreCase(Constants.FAT_AP_DEVICE_TYPE_EN)) {
						Device device = deviceService.getDeviceDetailById(deviceId);
						if(device != null){
							resultMap.put("record", JsonUtil.objectToJson(device));
						} else {
							resultMap.put("record", "");
						}
					} else {
						Device device = deviceService.getDeviceDetailById(deviceId);
						if(device != null){
							resultMap.put("record", JsonUtil.objectToJson(device));
						} else {
							resultMap.put("record", "");
						}
					}
					resultMap.put("result", "OK");
					resultMap.put("message", "");
				} else {
					resultMap.put("result", "FAIL");
					resultMap.put("message", validStr);
				}
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.noPermission"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("device", this.getClass().toString(), e);
		}
		return SUCCESS;
	}
	
	/**
	 * 查询分组
	 * 
	 * @return
	 */
	@Action(value = "searchdevicegroup", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	@SuppressWarnings("unchecked")
	public String searchDeviceGroup() {
		resultMap = new HashMap<String, Object>();
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)) {
				String keywords = StringUtil.fromGetRequest(this.request.getParameter("keywords"));
				String province = StringUtil.fromGetRequest(this.request.getParameter("province"));
				String city = StringUtil.fromGetRequest(this.request.getParameter("city"));
				//当前页码
				String pageNo = this.request.getParameter("pageNo");
				Page page = null;
				if(StringUtils.isBlank(pageNo)){
					page = new Page(Integer.valueOf(pageNo),10);
				}
				ValidateUtil vu = new ValidateUtil();
				vu.add("pageNo", (this.pageNo == null) ? null : String.valueOf(this.pageNo), PropertiesUtil.confProperties.getProperty("page.pageNo"), 
						new Rule[]{new Numeric()});
				vu.add("pageSize", (this.pageSize==null) ? null : String.valueOf(this.pageSize), PropertiesUtil.confProperties.getProperty("page.pageSize"), 
						new Rule[]{new Numeric()});
				String validStr = vu.validateString();
				if(validStr == null){
					Page<DeviceGroup> resultPage = deviceService.getDeviceGroupPage((page == null ? this.getPage(): page), 
							this.gettotal, keywords, province, city);
					this.setPageInfo(resultPage);
					resultMap.put("result", "OK");
				} else {
					resultMap.put("result", "FAIL");
					resultMap.put("message", validStr);
				}
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.illegalRequest"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("device", deviceService.getClass().toString(), e);
		}
		return SUCCESS;
	}
	
	/**
	 * 查询分组总量
	 * @return
	 * */
	@Action(value = "searchdevicegrouptotal", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	@SuppressWarnings("unchecked")
	public String searchDeviceGroupTotal() {
		resultMap = new HashMap<String, Object>();
		int total = 0;
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)){
				String keywords = StringUtil.fromGetRequest(this.request.getParameter("keywords"));
				String province = StringUtil.fromGetRequest(this.request.getParameter("province"));
				String city = StringUtil.fromGetRequest(this.request.getParameter("city"));
				total = deviceService.getDeviceGroupPageTotal(this.getPage(), 
						this.gettotal,keywords, province, city);
				resultMap.put("result", "OK");
				resultMap.put("total", total);
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.illegalRequest"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("device", deviceService.getClass().toString(), e);
		}
		return SUCCESS;
	}
	
	/**
	 * 查询ap组信息
	 */
	@Action(value = "searchgroupinfo", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	@SuppressWarnings("unchecked")
	public String searchGroupInfo() {
		resultMap = new HashMap<String, Object>();
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)) {
				String groupId = StringUtil.fromGetRequest(this.request.getParameter("groupId"));
				ValidateUtil vu = new ValidateUtil();
				vu.add("groupId", groupId, PropertiesUtil.confProperties.getProperty("device.param.deviceId"), 
						new Rule[]{new Required(),new Length(64)});
				String validStr = vu.validateString();
				if(validStr == null) {
					Long group_Id =(long) Integer.parseInt(groupId);
					DeviceGroup deviceGroup = deviceService.getGroupById(group_Id);
					List<Device> devices = deviceService.getDeviceByGroupId(group_Id);
					List<Object> devObjTypeList = null;
					if (devices != null && devices.size() > 0) {
						for (Device dev : devices) {
							if (devObjTypeList == null){
								devObjTypeList = new ArrayList<Object>();
							}
							
							devObjTypeList.add((Object) dev);
						}
					}
					resultMap.put("record", deviceGroup == null ? "" : JsonUtil.objectToJson(deviceGroup));
					resultMap.put("records", devObjTypeList == null ? "" : JsonUtil.listToJson(devObjTypeList));
					resultMap.put("result", "OK");
				} else {
					resultMap.put("result", "FAIL");
					resultMap.put("message", validStr);
				}
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.noPermission"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("device", this.getClass().toString(), e);
		}
		return SUCCESS;
	}
	
	/**
	 * 查询未分组设备
	 */
	@Action(value = "searchungroupap", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	@SuppressWarnings("unchecked")
	public String searchUnGroupAp() {
		resultMap = new HashMap<String, Object>();
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)) {
				String keywords = StringUtil.fromGetRequest(this.request.getParameter("groupId"));
				ValidateUtil vu = new ValidateUtil();
				String validStr = vu.validateString();
				if(validStr == null){
					Map<String, Object> paramMap = new HashMap<String, Object>();
					if (StringUtils.isNotBlank(keywords)) {
			            paramMap.put("keywords", keywords.split(" "));
			        }
					List<Device> devices = deviceService.getUnGroupAp(paramMap);
					List<Object> devObjTypeList = null;
					if (devices != null && devices.size() > 0) {
						for (Device dev : devices) {
							if (devObjTypeList == null){
								devObjTypeList = new ArrayList<Object>();
							}
							
							devObjTypeList.add((Object) dev);
						}
					}
					resultMap.put("records", devObjTypeList == null ? "" : JsonUtil.listToJson(devObjTypeList));
					resultMap.put("result", "OK");
				} else {
					resultMap.put("result", "FAIL");
					resultMap.put("message", validStr);
				}
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.noPermission"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("device", this.getClass().toString(), e);
		}
		return SUCCESS;
	}
	
	/**
	 * 保存分组
	 */
	@Action(value = "saveGroupInfo", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	@SuppressWarnings("unchecked")
	public String saveGroupInfo() {
		resultMap = new HashMap<String, Object>();
		String returnMessage = StringUtils.EMPTY;
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
				String group_id = this.request.getParameter("group_id");
				String groupName = this.request.getParameter("group_name");
				String note = this.request.getParameter("note");
				String province = this.request.getParameter("province");
				String city = this.request.getParameter("city");
				String type = this.request.getParameter("type");
				String deviceIds = this.request.getParameter("device_ids");
				
				ValidateUtil vu = new ValidateUtil();
				vu.add("group_name", groupName, PropertiesUtil.confProperties.getProperty("devicegroup.param.group_name"), 
                        new Rule[]{new Required(), new Length(20)});
				vu.add("note", note, PropertiesUtil.confProperties.getProperty("devicegroup.param.note"), 
                        new Rule[]{new Length(200)});
				String validStr = vu.validateString();
				
				if(validStr == null){
					//组名不能重复
					boolean deviceGroupNameExist = false;
					deviceGroupNameExist = deviceService.isExistDeviceGroup(groupName);
					if(type.equalsIgnoreCase("add")) {
						if(deviceGroupNameExist){
							returnMessage = PropertiesUtil.confProperties.getProperty("devicegroup.msg.groupName");
							resultMap = this.getResult(returnMessage);
							return SUCCESS;
						}
					} else if(type.equalsIgnoreCase("edit")){
						Long groupId =(long) Integer.parseInt(group_id);
						DeviceGroup oldDeviceGroup = deviceService.getGroupById(groupId);
						if(!oldDeviceGroup.getGroupName().equals(groupName) && deviceGroupNameExist){
							returnMessage = PropertiesUtil.confProperties.getProperty("devicegroup.msg.groupName");
							resultMap = this.getResult(returnMessage);
							return SUCCESS;
						}
					} else if(StringUtils.isNotBlank(type)) {
						returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
						resultMap = this.getResult(returnMessage);
						return SUCCESS;
					}
					
					DeviceGroup newdg = new DeviceGroup();
					newdg.setGroupName(groupName);
					newdg.setNote(note);
					if(StringUtils.isNotBlank(group_id)){
						newdg.setGroupId((long) Integer.parseInt(group_id));
					}
					newdg.setProvince(province);
					newdg.setCity(city);
					
					deviceService.saveOrUpdateDeviceGroup(newdg);
					if(newdg.getGroupId()!=null && newdg.getGroupId()>0) {
						DeviceGroup deviceGroup = deviceService.getGroupById(newdg.getGroupId());
						if(deviceGroup != null){
//							try{
//								deviceService.sendDeviceGroup(deviceGroup, Constants.OPT_TYPE_UPDATE, Constants.DEVICE_GROUP_TBL);
//							} catch(Exception e) {
//	    						logger.error("dataMQ发送device_group update消息出错，错误信息：" + e.getMessage());
//	    					}
						}
					} else {
						DeviceGroup deviceGroup = deviceService.getDeviceGroupByGroupname(newdg.getGroupName());
						if(deviceGroup!=null) {
//							try{
//								deviceService.sendDeviceGroup(deviceGroup, Constants.OPT_TYPE_INSERT, Constants.DEVICE_GROUP_TBL);
//							} catch(Exception e) {
//	    						logger.error("dataMQ发送device_group insert消息出错，错误信息：" + e.getMessage());
//	    					}
						}
					}
					
					DeviceGroup group = deviceService.getDeviceGroupByGroupname(groupName);
					List<String> deviceIdsArr =null;
					if(StringUtils.isNotBlank(deviceIds)){
						deviceIdsArr = new Gson().fromJson(deviceIds, new TypeToken<List<String>>(){}.getType());
						deviceService.saveDeviceHasDeviceGroup(group.getGroupId(), deviceIdsArr);
						
//						try{
//							deviceService.sendDeviceHasDeviceGroup(group.getGroupId(), deviceIdsArr, Constants.DEVICE_HAS_DEVICE_GROUP_TBL);
//						} catch(Exception e) {
//    						logger.error("dataMQ发送device_has_device_group 更新消息出错，错误信息：" + e.getMessage());
//    					}
					}
					
					resultMap.put("result", "OK");
				} else {
					resultMap = this.getResult(validStr);
				}
			} else {
				returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
				resultMap = this.getResult(returnMessage);
			}
		} catch (Exception e) {
			e.printStackTrace();
			returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			saveExceptionLog("device", deviceService.getClass().toString(), e);
		}
		return SUCCESS;
	}
	
	/**
	 * 虚AP组删除
	 * @return
	 */
	@Action(value = "apgroupdelete", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	public String apgroupdelete(){
		resultMap = new HashMap<String, Object>();
		boolean result = true;
		String message = "";
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)){
				List<String> groupIdsArr =null;
					String groupids = request.getParameter("groupids");
					ValidateUtil vu = new ValidateUtil();
					if(groupids!=null){
						groupIdsArr = new Gson().fromJson(groupids, new TypeToken<List<String>>(){}.getType());
						for(int i=0; i<groupIdsArr.size(); i++){
							vu.add("groupId"+i, groupIdsArr.get(i), "groupId"+i, 
									new Rule[]{new Length(20), new Numeric()});
						}
					}
					
					String validStr = vu.validateString();
					if(validStr == null){
						for(int i=0;i<groupIdsArr.size();i++) {
							Long groupId =(long) Integer.parseInt(groupIdsArr.get(i));
							DeviceGroup devicegroup = deviceService.getGroupById(groupId);
							this.deviceService.deleteGroupById(groupId);
//							try{
//								deviceService.sendDeviceHasDeviceGroup(groupId, null, Constants.DEVICE_HAS_DEVICE_GROUP_TBL);
//								deviceService.sendDeviceGroup(devicegroup, Constants.OPT_TYPE_DELETE, Constants.DEVICE_GROUP_TBL);
//							} catch(Exception e) {
//	    						logger.error("dataMQ发送apgroupdelete() 失败，错误信息：" + e.getMessage());
//	    					}
						}
						
						resultMap.put("result", "OK");
					}else {
						resultMap.put("result", "FAIL");
						resultMap.put("message", validStr);
					}
			}else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.illegalRequest"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
			message = "Exception during packagedelete: " + e.toString();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			
			saveExceptionLog("device", this.getClass().toString(), e);
		}
//		loadAccountOptLog(this.getCurLoginAccount().getId(), "虚AP组删除", 
//				"SystemAction.packagedelete", "system", 
//				systemService.getClass().getName(), 
//				result, message);
		return SUCCESS;
	}

	
	/**
	 * 设备过户
	 * @return
	 */
	@Action(value = "deviceOwnerChange", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	public String deviceOwnerChange() {
		
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_POST)){
				
				//　获取及校验参数
				String deviceId = this.request.getParameter("deviceId");
				String accountIdString = this.request.getParameter("accountId");
				String province = this.request.getParameter("province");
				String city = this.request.getParameter("city");
				String countyDistrict = this.request.getParameter("countyDistrict");
				String address = this.request.getParameter("address");
				
				ValidateUtil vu = new ValidateUtil();
				vu.add("deviceId", deviceId, PropertiesUtil.confProperties.getProperty("device.param.deviceId"), 
						new Rule[]{new Required(),new Length(64)});
				vu.add("accountIdString", accountIdString, PropertiesUtil.confProperties.getProperty("device.param.deviceId"), 
						new Rule[]{new Required(),new Length(20)});
				String validStr = vu.validateString();
				
				if(validStr != null) {
					resultMap = this.getResult(validStr);
					return SUCCESS;
				}
				
				// 获取设备并判断该设备是否存在，不存在时返回--该设备不存在
				DeviceWithBLOBs device = this.deviceService.getDeviceById(deviceId);
				
				if(device == null) {
					returnMessage = PropertiesUtil.confProperties.getProperty("platform.msg.tvDeviceNotExisted");
					resultMap = this.getResult(returnMessage);
					return SUCCESS;
				}
				
				// 创建或更新位置
				Location location = new Location();
				location.setCountry("中国");
				location.setProvince(province);
				location.setCity(city);
				location.setCountyDistrict(countyDistrict);
				location.setAddress(address);
				location.setAccountId(Long.parseLong(accountIdString));
				location.setCreateDatetime(new Date());
				
				location = deviceService.saveOrGetLocation(location);
				
				device.setLocationId(location.getId());
				
				int dbResult = deviceService.updateByPrimaryKeySelective(device);
				
				
				// 判断更新结果，更新失败是返回--设备过户失败
				if(dbResult != 1) {
					returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.deviceOwnerChangerFail");
					resultMap = this.getResult(returnMessage);
					return SUCCESS;
				}
				
				resultMap = this.getResult();
				return SUCCESS;
				
			}else {
				returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
				resultMap = this.getResult(returnMessage);
				return SUCCESS;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			saveExceptionLog("device", deviceService.getClass().toString(), e);
			returnMessage = PropertiesUtil.confProperties.getProperty("message.exception");
			resultMap = this.getResult(returnMessage);
			return SUCCESS;
		}
	}
	
	/**
	 * 时长流量控制
	 * @return
	 */
	@Action(value="deviceSaveLimitation", results={
			@Result(name=SUCCESS, type="json", params={"root","resultMap"})
	})
	public String deviceLimitation() {
		try{
			if(HttpRequest.METHOD_POST.equalsIgnoreCase(request.getMethod())){
				String deviceIdListJson = StringUtil.htmlEscape(request.getParameter("dev_id_list"));
				String minsLimit = StringUtil.htmlEscape(request.getParameter("minslimit"));
				String trafficLimit = StringUtil.htmlEscape(request.getParameter("trafficlimit"));
				
				// 时长流量为空时设置默认值
				minsLimit = StringUtils.isBlank(minsLimit)?PropertiesUtil.confProperties.getProperty("user.auth.expireMinutes.default"):minsLimit;
				trafficLimit = StringUtils.isBlank(trafficLimit)?PropertiesUtil.confProperties.getProperty("user.auth.traffic.default"):trafficLimit;
				
				ValidateUtil vu = new ValidateUtil();
				vu.add("minslimit", minsLimit, PropertiesUtil.confProperties.getProperty("device.param.minslimit"), 
						new Rule[]{new Numeric(), new NumberRange(PropertiesUtil.confProperties.getProperty("user.auth.expireMinutes.min"), 
													PropertiesUtil.confProperties.getProperty("user.auth.expireMinutes.max"))});
				vu.add("trafficlimit", trafficLimit, PropertiesUtil.confProperties.getProperty("device.param.trafficlimit"), 
						new Rule[]{new Numeric(), new NumberRange(PropertiesUtil.confProperties.getProperty("user.auth.traffic.min"), 
													PropertiesUtil.confProperties.getProperty("user.auth.traffic.max"))});
				vu.add("deviceIdList", deviceIdListJson, PropertiesUtil.confProperties.getProperty("device.param.deviceId"), 
						new Rule[]{new Required()});
				
				String validStr = vu.validateString();
				
				if(validStr == null){
					boolean result = deviceService.deviceLimation(deviceIdListJson, minsLimit, trafficLimit);
					
					if(result) {
						resultMap = this.getResult();
						
					}else {
						returnMessage = PropertiesUtil.confProperties.getProperty("device.msg.deviceLimationFail");
						resultMap = this.getResult(returnMessage);
					}
					
				}else {
					resultMap = this.getResult(validStr);
					return SUCCESS;
				}
				
			}else {
				returnMessage = PropertiesUtil.confProperties.getProperty("message.illegalRequest");
				resultMap = this.getResult(returnMessage);
				return SUCCESS;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("device", deviceService.getClass().toString(), e);
		}
		
		return SUCCESS;
	}
	
	/**
	 * 测试
	 * 
	 * @return
	 */
	@Action(value = "/test", 
			results = { @Result(name = SUCCESS, type = "json", params = { "root", "resultMap" })})
	public String radiusVirtualDevicePage() {
		resultMap = new HashMap<String, Object>();
		if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
			String nasname = StringUtil.htmlEscape(request.getParameter("nasname"));
			String shortname = StringUtil.htmlEscape(request.getParameter("shortname"));
			String type = StringUtil.htmlEscape(request.getParameter("type"));
			String secret = StringUtil.htmlEscape(request.getParameter("secret"));
			System.err.println("--------post-------"+nasname);
			resultMap.put("result", "ok");
			resultMap.put("message", "nasname: "+nasname+"-shortname: "+shortname+"-type: "+type+"-secret: "+secret);
		} else {
			System.err.println("--------error-------");
			resultMap.put("result", "FAIL");
			resultMap.put("message", "test error");
		}
		return SUCCESS;
	}
	
	/**
	 * 测试
	 * 
	 * @return
	 */
	@Action(value = "/testPage", 
			results = { @Result(name = SUCCESS, location = "/WEB-INF/jsp${jspversion}/loggout/test.jsp")})
	public String testPage() {
		resultMap = new HashMap<String, Object>();
		if(request.getMethod().equals(HttpRequest.METHOD_POST)) {
			String nasname = StringUtil.htmlEscape(request.getParameter("nasname"));
			System.err.println("--------post-------"+nasname);
			resultMap.put("result", "ok");
			resultMap.put("message", "success");
		} else {
			System.err.println("--------error-------");
			resultMap.put("result", "FAIL");
			resultMap.put("message", "test error");
		}
		return SUCCESS;
	}
	
	/**
	 * 测试action
	 * @return
	 */
	@Action(value="fatApPage",results = {
			@Result(name=SUCCESS, location="/WEB-INF/jsp${jspversion}/loggout/fatAP.jsp")
	})
	public String test() {
		return SUCCESS;
	}
}
