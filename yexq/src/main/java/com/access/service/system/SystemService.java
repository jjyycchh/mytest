package com.access.service.system;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.access.core.constant.Constants;
import com.access.dao.device.DeviceGroupMapper;
import com.access.dao.device.DeviceHasDeviceGroupMapper;
import com.access.dao.device.DeviceMapper;
import com.access.dao.system.LocationMapper;
import com.access.dao.system.MenuMapper;
import com.access.dao.system.SmsMapper;
import com.access.dao.system.SystemConfigMapper;
import com.access.dao.system.ThirdPartAuthMapper;
import com.access.dao.system.ThirdPlatformMapper;
import com.access.dao.user.UserMembershipMapper;
import com.access.model.system.Menu;
import com.access.model.system.Sms;
import com.access.model.system.SystemConfig;
import com.access.model.system.ThirdPartAuth;
import com.access.model.system.ThirdPlatform;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.access.dao.system.SystemVersionMapper;
import com.access.base.BaseDao;
import com.access.core.commons.Page;
import com.access.core.util.DateUtil;
import com.access.model.device.Device;
import com.access.dao.system.CityMapper;
import com.access.dao.system.CountyDistrictMapper;
import com.access.dao.system.ProvinceMapper;
import com.access.model.system.Province;
import com.access.service.device.DeviceService;

@Service("systemService")
public class SystemService {

	@Resource(name = "smsMapper")
	private SmsMapper smsMapper;

	@Resource(name="deviceMapper")
	private DeviceMapper deviceMapper;
	
	@Resource(name="locationMapper")
	private LocationMapper locationMapper;
	
	@Resource(name = "thirdPartAuthMapper")
	private ThirdPartAuthMapper thirdPartAuthMapper;

	@Resource(name = "systemConfigMapper")
	private SystemConfigMapper systemConfigMapper;
	
	@Resource(name="thirdPlatformMapper")
	private ThirdPlatformMapper thirdPlatformMapper;
	
	@Resource(name="userMembershipMapper")
	private UserMembershipMapper userMembershipMapper;
	
	@Resource(name="provinceMapper")
    private ProvinceMapper provinceMapper;
	
	@Resource(name="countyDistrictMapper")
    private CountyDistrictMapper countyDistrictMapper;
	 
	@Resource(name="cityMapper")
    private CityMapper cityMapper;
	
	@Resource(name="menuMapper")
    private MenuMapper menuMapper;
	
	@Resource(name="systemVersionMapper")
    private SystemVersionMapper systemVersionMapper;
	
	@Resource(name="baseDao")
	private BaseDao baseDao;
	
	@Resource(name="deviceGroupMapper")
	private DeviceGroupMapper deviceGroupMapper;
	
	@Resource(name="deviceHasDeviceGroupMapper")
	private DeviceHasDeviceGroupMapper deviceHasDeviceGroupMapper;
	
	@Resource(name="deviceService")
	private DeviceService deviceService;
	 
	/**
	 * 获取所有的third_part_auth记录的ID
	 * @return
	 */
	public List<String> getAllThirdPartAuthVirtualDeviceIds() {
		List<String> virtualDeviceIds = null;
		List<ThirdPartAuth> allAuths = this.getAllThirdPartAuth();
		
		if (allAuths != null && allAuths.size() > 0) {
			virtualDeviceIds = new ArrayList<String>();
			
			for (ThirdPartAuth auth : allAuths) {
				virtualDeviceIds.add(auth.getVirtualDeviceId());
			}
		}

		return virtualDeviceIds;
	}

	/**
	 * 获取所有的third_part_auth记录
	 * @return
	 */
	public List<ThirdPartAuth> getAllThirdPartAuth() {
		return this.thirdPartAuthMapper.getAll();
	}

	/**
	 * 根据设备ID获取第三方设备对象
	 * @param deviceId	设备ID
	 * @return
	 */
	public ThirdPartAuth getThirdPartAuthByDeviceId(String deviceId) {
		ThirdPartAuth thirdPartAuth = null;

		if (StringUtils.isNotBlank(deviceId)) {
			thirdPartAuth = this.thirdPartAuthMapper.selectByDeviceId(deviceId);
		}

		return thirdPartAuth;
	}

	/**
	 * 获取短信网关
	 * @param phoneNumber
	 * @return
	 */
	public String getSmsGW(String phoneNumber) {
		String gateWay = null;
		String telcomGW = null;
		String unicomGW = null;
		String mobileGW = null;

		List<SystemConfig> configList = this.getAllSystemConfigs();

		// 获取各运行商短信网关
		for (SystemConfig config : configList) {
			if (config.getCfgKey().equalsIgnoreCase(Constants.SYS_CFG_SMSGW_KEY)) {
				String allGateWays = config.getCfgValue();

				Map<String, Object> gwMap = new Gson().fromJson(allGateWays,new TypeToken<Map<String, Object>>(){}.getType());
				telcomGW = gwMap.get(Constants.TELCOM_EN_NAME).toString();
				unicomGW = gwMap.get(Constants.UNICOM_EN_NAME).toString();
				mobileGW = gwMap.get(Constants.MOBILE_EN_NAME).toString();
				break;
			}
		}

		// 电信网关
		Matcher telcom_matcher = Constants.TELCOM_CELL_NUMBERS.matcher(phoneNumber);
		
		if (!telcom_matcher.matches()) {
			gateWay = telcomGW;
		}
		
		// 联通网关
		Matcher unicom_matcher = Constants.UNICOM_CELL_NUMBERS.matcher(phoneNumber);
		
		if (!unicom_matcher.matches()) {
			if (StringUtils.isNotBlank(unicomGW)) {
				gateWay = unicomGW;
				
			} else {
				gateWay = telcomGW;
			}
		}
		
		// 移动网关
		Matcher mobile_matcher = Constants.MOBILE_CELL_NUMBERS.matcher(phoneNumber);
		
		if (!mobile_matcher.matches()) {
			if (StringUtils.isNotBlank(mobileGW)) {
				gateWay = mobileGW;
				
			} else {
				gateWay = telcomGW;
			}
		}

		return gateWay;
	}

	/**
	 * 获取系统配置(目前有：sms_gateway，default_id，authType，sms_unit_price)
	 * @return
	 */
	public List<SystemConfig> getAllSystemConfigs() {
		return systemConfigMapper.getAllSystemConfigs(null);
	}

	/**
	 * 新增短信消息记录
	 * 
	 * @param cellphone
	 * @param content
	 * @return
	 * @throws IOException
	 */
	public int saveSms(String cellphone, String content, Long userAuthId)throws IOException {
		Sms sms = new Sms();
		sms.setCellphone(cellphone);
		sms.setContent(content);
		sms.setIsSent(true);
		sms.setTerminalUserAuthenticationLogId(userAuthId);
		return smsMapper.insertSelective(sms);
	}
	
	/**
	 * 根据platformCode取得欢迎页的URL
	 * @param platformCode
	 * @return
	 */
    public ThirdPlatform selectURLByCode(String platformCode){
        return thirdPlatformMapper.selectURLByCode(platformCode);
    }
    
    /**
     * 根据域名获取一个第三方记录
     * @param domain
     * @return
     */
    public ThirdPlatform selectByDomain(String domain){
    	return thirdPlatformMapper.selectByDomain(domain);
    }
    
    
    /**
     * 会员用户登陆时构建站内信
     * @param memberId
     * @param accountId
     * @param deviceId
     * @return
     */
/*    public int saveMemberOnlineMessage(Long memberId, Long accountId, String deviceId){
    	
        if (memberId != null && accountId != null) {
//          String memberOnlineLocation = StringUtils.EMPTY;
//          String onlineDatetime = DateUtil.formatToString(new Date(), DateUtil.YYYY_MM_DD_HH_MM_SS);
            
//            if (StringUtils.isNotBlank(deviceId)) {
//                DeviceWithBLOBs deviceInfo = this.deviceMapper.selectByPrimaryKey(deviceId);
//                Location location = this.locationMapper.selectByPrimaryKey(deviceInfo.getLocationId());
//
//                // 组合用户登陆地址
//                if (StringUtils.isNotBlank(location.getProvince())) {
//                    memberOnlineLocation += location.getProvince();
//                }
//
//                if (StringUtils.isNotBlank(location.getCity())) {
//                    memberOnlineLocation += location.getCity();
//                }
//
//                if (StringUtils.isNotBlank(location.getCountyDistrict())) {
//                    memberOnlineLocation += location.getCountyDistrict();
//                }
//
//                if (StringUtils.isNotBlank(location.getAddress())) {
//                    memberOnlineLocation += location.getAddress();
//                }
//            }
        	
        	// 设置消息标题和内容
        	String memberOnlineMsgTitle = "VIP客户来访";
            String memberOnlineMsgContent = "VIP客户%s，登录wifi!";
            UserMembership memberInfo = this.userMembershipMapper.selectByPrimaryKey(memberId);
            String memberName = StringUtils.isNotBlank(memberInfo.getFullName())? memberInfo.getFullName() :  memberInfo.getPhoneNumber();
            memberOnlineMsgContent = String.format(memberOnlineMsgContent, memberName);

            // 构建Message对象
            Message message = new Message();
            message.setSenderId(Constants.SUPER_ADMIN_ACCOUNT_ID);
            message.setTitle(memberOnlineMsgTitle);
            message.setContent(memberOnlineMsgContent);
            message.setType(Constants.MESSAGE_TYPE_MEMBER_ALERT);
            
            List<String>accountIdLst = new ArrayList<String>();
            accountIdLst.add(accountId.toString());
            message.setReceiverId(new Gson().toJson(accountIdLst));

            // 保存信息
            return this.saveMessage(message);
            
        }else {
            return -1;
        }
    }*/
    
    /**
	 * 保存站内信
	 * @param message
	 * @return
	 */
	/*public int saveMessage(Message message) {
		if (message == null || message.getId() != null) {
			return 0;
		}

		int result = 0;
		List<String> receiverIdList = new Gson().fromJson(message.getReceiverId(), new TypeToken<List<String>>(){}.getType());
		
		if (receiverIdList != null && receiverIdList.size() > 0) {
			for (String receiverId : receiverIdList) {
				receiverId = receiverId.replace("\"", "");
				Message receiverCopy = message.clone();
				receiverCopy.setOwnerId(Long.parseLong(receiverId));
				receiverCopy.setId(null);
				receiverCopy.setIsSent(false);
				
				result += this.messageMapper.insertSelective(receiverCopy);
			}
			
			// TODO ???为什么要这么做
			Message senderCopy = message;
			senderCopy.setOwnerId(senderCopy.getSenderId());
			senderCopy.setIsSent(true);
			
			result += this.messageMapper.insertSelective(senderCopy);
		}

		return result;
	}*/
    
	/**
     * 校验设备的省市区信息是否合法
     * 
     * @param provinceName
     *            省级行政单位名称的前两个字
     * @param cityName
     *            市级行政单位名称的前两个字
     * @param countyName
     *            区级行政单位名称的前两个字
     * @return resultMap 包含校验结果（OK、FAIL、NOCOUNTY）和标准的省市区名称（数据库中）。OK：省市区合法且对应；
     *         NOCOUNTY：省市合法且对应，没有区级信息；FAIL：省市区信息不存在或者互相不对应
     * */
    public Map<String, Object> checkLocation(String provinceName,
            String cityName, String countyName) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        Province province = provinceMapper.selectIdByProvince(provinceName);
        // 在province表中查询省名，若存在则取回其ID；
        // 若不存在，返回FAIL。
        if (province != null) {
            Map<String, Object> paramMapCity = new HashMap<String, Object>();
            Map<String, Object> paramMapCounty = new HashMap<String, Object>();
            Map<String, Object> tmpCityMap = new HashMap<String, Object>();
            Map<String, Object> tmpCountyMap = new HashMap<String, Object>();
            // 若省级行政单位为直辖市和港澳地区，则直接到county_district表中校验区级信息，合法则取回标准名称并返回OK；
            // 否则，到city表中校验市级信息，合法则取回市名ID。
            if (province.getId() <= 6) {
                paramMapCounty.put("name", cityName);
                paramMapCounty.put("provinceId", province.getId());
                tmpCityMap = countyDistrictMapper
                        .selectCountyByName(paramMapCounty);
            } else {
                paramMapCity.put("name", cityName);
                paramMapCity.put("provinceId", province.getId());
                tmpCityMap = cityMapper.selectIdByCity(paramMapCity);
            }
            // 若区级信息为空，或者省份是台湾省，则不再校验区级信息；
            // 否则，在county_district表中校验区级信息。
            if (tmpCityMap != null
                    && (StringUtils.isBlank(countyName) || province.getId() == 34)) {
                resultMap.put("province", province.getName());
                resultMap.put("city", tmpCityMap.get("name").toString());
                resultMap.put("result", "NOCOUNTY");
            } else if (tmpCityMap != null && StringUtils.isNotBlank(countyName)) {
                paramMapCounty.put("name", countyName);
                paramMapCounty.put("cityId", tmpCityMap.get("id"));
                tmpCountyMap = countyDistrictMapper
                        .selectCountyByName(paramMapCounty);
                // 若区与市不对应，返回FAIL；
                // 否则，取回标准名称，并返回OK。
                if (tmpCountyMap == null) {
                    resultMap.put("result", "FAIL");
                    resultMap.put("message", "地区错误：" + countyName + "不属于"
                            + cityName);
                } else {
                    resultMap.put("province", province.getName());
                    resultMap.put("city", tmpCityMap.get("name").toString());
                    resultMap
                            .put("county", tmpCountyMap.get("name").toString());
                    resultMap.put("result", "OK");
                }
            } else {
                resultMap.put("result", "FAIL");
                resultMap.put("message", "地区错误：" + cityName + "不属于"
                        + provinceName);
            }

        } else {
            resultMap.put("result", "FAIL");
            resultMap.put("message", "地区错误：" + provinceName + "不存在");
        }

        return resultMap;
    }
    /**
     * 获取已激活的厂商设备的页面
     * 
     * @param curAccountType
     *            当前登录账户类型
     * @param id
     *            当前登录账户ID
     * @param keywords
     *            查询关键字，模糊匹配MAC地址、品牌、型号、固件、组件
     * @return
     * */
    @SuppressWarnings("unchecked")
    public Page<Device> getDevicePage(Page<Device> page, String curAccountType,
            long id, String gettotal, String keywords, String type, 
            String startDate, String endDate) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("page", page);
        // 如果登录账户是设备厂商，则只能看到属于自己的设备；
        if (curAccountType.equals(Constants.ACCOUNT_TYPE_MANUFACTURER_EN)) {
            paramMap.put("manufacturerId", id);
        }
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
        if (StringUtils.isBlank(gettotal)) {
            page = baseDao.findPageList("device_getDevicePage", paramMap);
        } else if (Boolean.valueOf(gettotal)) {
            page = baseDao.findPageInfo("device_getDevicePage", paramMap);
        }

        return page;
    }
    
    
    public String getLatestVersion(){
		return systemVersionMapper.getLatestVersion();
	}
    
    /**
     * 获取资源树列表
     * @param domain
     * @return
     */
    public List<Menu> selectAllTree(){
    	return menuMapper.selectAllTree();
    }
    
    /**
     * 注册二级平台（超级管理员）
     * 
     * @param thirdPlatform
     *            对象，包含二级平台的信息
     * @return
     * */
    public int saveThirdPlatform(ThirdPlatform thirdPlatform) {
    	int result =0;
    	result = thirdPlatformMapper.insertSelective(thirdPlatform);
    	deviceService.sendThirdPlatform(thirdPlatform, Constants.OPT_TYPE_INSERT, Constants.THIRD_PLATFORM);
        return result;
    }
    
    /**
     * 修改二级平台（超级管理员）
     * 
     * @param thirdPlatform
     *            对象，包含二级平台的信息
     * @return
     * */
    public int updateThirdPlatformById(ThirdPlatform thirdPlatform) {
    	int result = 0;
    	result =  thirdPlatformMapper.updateByPrimaryKeySelective(thirdPlatform);
    	deviceService.sendThirdPlatform(thirdPlatform, Constants.OPT_TYPE_UPDATE, Constants.THIRD_PLATFORM);
        return result;
    }
}
