package com.access.core.constant;
import com.access.core.enu.AccountTypeEnum;
import com.access.core.enu.PermissionEnum;
import com.access.core.util.DateUtil;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * 常量
 * @ClassName Constants
 * @CreateDate 2014-3-19
 * @Version V1.0
 */
public final class Constants {
	
	private Constants() {}
	
	public static final Long SUPER_ADMIN_ACCOUNT_ID = new Long("1");
	
	/**
	 * 用户登录后存放用户信息的Session名
	 */
	public static final String LOGIN_ACCOUNT_INFO = "login_account_info";
	
	/**
	 * 用户登录后可访问的菜单的Session名
	 */
	public static final String LOGIN_ACCOUNT_PERM = "login_account_perm";
	
	/**
	 * 服务端口号
	 */
	public static final String PLAT_HTTP_PORT = "httpPort";
	
	/**
	 * cookie name of remember me
	 */
	public static final String REMEMBER_ME_COOKIE_NAME = "TWIFI_COOKIE_REMEMBER_ME";
	
	/**
	 * cookie age
	 */
	public static final int COOKIE_AGE = 30 * 24 * 3600; //SECNODS
	
	/**
	 * 用户登录后存放用户可访问的全部资源的Session名
	 */
	public static final String LOGIN_ACCOUNT_RESOURCES = "login_account_resources";
	/**
	 * 登录用户的所有角色
	 */
	public static final String LOGIN_ACCOUNT_ROLE = "login_account_role";

    public static final String LANGUAGE_CN = "CN";
    public static final String LANGUAGE_CHINESE = "CHINESE";
    public static final String LANGUAGE_EN = "EN";
    public static final String LANGUAGE_ENGLISH = "ENGLISH";

	/**
	 * 省份ID和省份名称键
	 */
	public static final String PROVINCE_ID = "PROVINCE_ID";
	public static final String PROVINCE_NAME = "PROVINCE_NAME";
	
	public static final String ACCOUNT_GEO_LEVEL_1 = "1";//全国级
	public static final String ACCOUNT_GEO_LEVEL_1_CN = "L1 - 全国";
	public static final String ACCOUNT_GEO_LEVEL_2 = "2";//省级
	public static final String ACCOUNT_GEO_LEVEL_2_CN = "L2 - 省级";
	public static final String ACCOUNT_GEO_LEVEL_3 = "3";//市级
	public static final String ACCOUNT_GEO_LEVEL_3_CN = "L3 - 市级";
	public static final String ACCOUNT_GEO_LEVEL_4 = "4";//区级
	public static final String ACCOUNT_GEO_LEVEL_4_CN = "L4 - 县区级";
	
	public static final String ACCOUNT_TYPE_SUPER_MAN_CN = "超级管理员";
	public static final String ACCOUNT_TYPE_SUPER_MAN_EN = "SUPER_MAN";
	public static final String ACCOUNT_TYPE_ADMINISTRATOR_CN = "管理员";
	public static final String ACCOUNT_TYPE_ADMINISTRATOR_EN = "ADMINISTRATOR";
	public static final String ACCOUNT_TYPE_REPRESENTATIVE_CN = "代理商"; 
	public static final String ACCOUNT_TYPE_REPRESENTATIVE_EN = "REPRESENTATIVE"; 
	public static final String ACCOUNT_TYPE_MERCHANT_CN = "商户";
	public static final String ACCOUNT_TYPE_MERCHANT_EN = "MERCHANT";
	public static final String ACCOUNT_TYPE_MANUFACTURER_CN = "设备厂商";
	public static final String ACCOUNT_TYPE_MANUFACTURER_EN = "MANUFACTURER";
	public static final String ACCOUNT_TYPE_DEVICE_ADMIN_CN = "设备管理员";
	public static final String ACCOUNT_TYPE_DEVICE_ADMIN_EN = "DEVICE_ADMIN";

	public static final String PERMISSION_SUBADMIN_MGMT_CN = "下属管理员管理";
	public static final String PERMISSION_SUBADMIN_MGMT_EN = "SUBADMIN_MGMT";
	public static final String PERMISSION_REPRESENTATIVE_MGMT_CN = "代理商管理";
	public static final String PERMISSION_REPRESENTATIVE_MGMT_EN = "REPRESENTATIVE_MGMT";
	public static final String PERMISSION_MERCHANT_MGMT_CN = "商户管理";
	public static final String PERMISSION_MERCHANT_MGMT_EN = "MERCHANT_MGMT";
	public static final String PERMISSION_MANUFACTURER_MGMT_CN = "设备厂商管理";
	public static final String PERMISSION_MANUFACTURER_MGMT_EN = "MANUFACTURER_MGMT";
	public static final String PERMISSION_DEVICE_ADMIN_MGMT_CN = "设备管理员管理";
	public static final String PERMISSION_DEVICE_ADMIN_MGMT_EN = "DEVICE_ADMIN_MGMT";
	public static final String PERMISSION_USER_MGMT_CN = "用户管理";
	public static final String PERMISSION_USER_MGMT_EN = "USER_MGMT";
	public static final String PERMISSION_DEVICE_MGMT_CN = "设备管理";
	public static final String PERMISSION_DEVICE_MGMT_EN = "DEVICE_MGMT";
	public static final String PERMISSION_PORTAL_MGMT_CN = "WiFi门户管理";
	public static final String PERMISSION_PORTAL_MGMT_EN = "PORTAL_MGMT";
	public static final String PERMISSION_PROFILE_MGMT_CN = "基本信息管理";
	public static final String PERMISSION_PROFILE_MGMT_EN = "PROFILE_MGMT";
	public static final String PERMISSION_SYSTEM_CFG_MGMT_CN = "系统配置管理";
	public static final String PERMISSION_SYSTEM_CFG_MGMT_EN = "SYSTEM_CFG_MGMT";
	public static final String PERMISSION_MANU_DEVICE_MGMT_CN = "厂商设备管理";
	public static final String PERMISSION_MANU_DEVICE_MGMT_EN = "MANU_DEVICE_MGMT";
	
	//超级管理员
	public static final String[] SUPER_MAN_PERM = {
		PermissionEnum.subadmin_mgmt.name().toUpperCase(),
		PermissionEnum.representative_mgmt.name().toUpperCase(),
		PermissionEnum.merchant_mgmt.name().toUpperCase(),
		PermissionEnum.manufacturer_mgmt.name().toUpperCase(),
		PermissionEnum.device_admin_mgmt.name().toUpperCase(),
		PermissionEnum.user_mgmt.name().toUpperCase(),
		PermissionEnum.device_mgmt.name().toUpperCase(),
		PermissionEnum.portal_mgmt.name().toUpperCase(),
		PermissionEnum.profile_mgmt.name().toUpperCase(),
		PermissionEnum.system_cfg_mgmt.name().toUpperCase(),
		PermissionEnum.manu_device_mgmt.name().toUpperCase()};
	//管理员
	public static final String[] ADMINISTRATOR_PERM = {
		PermissionEnum.subadmin_mgmt.name().toUpperCase(),
		PermissionEnum.representative_mgmt.name().toUpperCase(),
		PermissionEnum.merchant_mgmt.name().toUpperCase(),
		PermissionEnum.user_mgmt.name().toUpperCase(),
		PermissionEnum.device_mgmt.name().toUpperCase(),
		PermissionEnum.portal_mgmt.name().toUpperCase(),
		PermissionEnum.profile_mgmt.name().toUpperCase()};
	//代理商
	public static final String[] REPRESENTATIVE_PERM = {
		PermissionEnum.representative_mgmt.name().toUpperCase(),
		PermissionEnum.merchant_mgmt.name().toUpperCase(),
		PermissionEnum.user_mgmt.name().toUpperCase(),
		PermissionEnum.device_mgmt.name().toUpperCase(),
		PermissionEnum.portal_mgmt.name().toUpperCase(),
		PermissionEnum.profile_mgmt.name().toUpperCase()};
	//商户
	public static final String[] MERCHANT_PERM = {
		PermissionEnum.user_mgmt.name().toUpperCase(),
		PermissionEnum.device_mgmt.name().toUpperCase(),
		PermissionEnum.portal_mgmt.name().toUpperCase(),
		PermissionEnum.profile_mgmt.name().toUpperCase()};
	//设备厂商
	public static final String[] MANUFACTURER_PERM = {
		PermissionEnum.profile_mgmt.name().toUpperCase(),
		PermissionEnum.manu_device_mgmt.name().toUpperCase()};
	//设备管理员
	public static final String[] DEVICE_ADMIN_PERM = {
		PermissionEnum.profile_mgmt.name().toUpperCase(),
		PermissionEnum.manu_device_mgmt.name().toUpperCase()};
	
	public static final Map<String,String[]> accountPermCodeMap = new HashMap<String,String[]>();
	static{
		accountPermCodeMap.put(AccountTypeEnum.SUPER_MAN.name(), SUPER_MAN_PERM);
		accountPermCodeMap.put(AccountTypeEnum.ADMINISTRATOR.name(), ADMINISTRATOR_PERM);
		accountPermCodeMap.put(AccountTypeEnum.REPRESENTATIVE.name(), REPRESENTATIVE_PERM);
		accountPermCodeMap.put(AccountTypeEnum.MERCHANT.name(), MERCHANT_PERM);
		accountPermCodeMap.put(AccountTypeEnum.MANUFACTURER.name(), MANUFACTURER_PERM);
		accountPermCodeMap.put(AccountTypeEnum.DEVICE_ADMIN.name(), DEVICE_ADMIN_PERM);
	}

	/**
	 * 帐户状态操作
	 */
	public static final String ACCOUNT_STATUS_OPT_LOCK = "LOCK";
	public static final String ACCOUNT_STATUS_OPT_UNLOCK = "UNLOCK";
	public static final String ACCOUNT_STATUS_OPT_DELETED = "DELETED";
	
	/**
	 * 帐户状态
	 */
	public static final String ACCOUNT_STATUS_NORMAL = "NORMAL";//正常
	public static final String ACCOUNT_STATUS_LOCKED = "LOCKED";//锁定
	public static final String ACCOUNT_STATUS_DELETED = "DELETED";

	/**
	 * 设备状态
	 */
	public static final String DEVICE_STATUS_ONLINE = "ONLINE";//正常
	public static final String DEVICE_STATUS_OFFLINE = "OFFLINE";//离线
	public static final String DEVICE_STATUS_LOCKED = "LOCKED";//锁定
	
	/**
	 * 设备类型
	 * */
	public static final String DEVICE_TYPE_CUSTOMIZED_AP = "CUSTOMIZED_AP";
//	public static final String DEVICE_TYPE_FIT_AP = "FIT_AP";
	public static final String DEVICE_TYPE_NAS = "NAS";
	public static final String DEVICE_TYPE_P2 = "P2";
	public static final String DEVICE_TYPE_STANDARD_AP = "STANDARD_AP";
	public static final String DEVICE_TYPE_THIRD_ACCESS = "THIRD_ACCESS";
	
	/**
	 * 设备类型3.0
	 * */
	public static final String DEVICE_TYPE_BAS = "BAS";
	public static final String DEVICE_TYPE_AC = "AC";
	public static final String DEVICE_TYPE_FIT_AP = "FIT_AP";
	public static final String DEVICE_TYPE_FAT_AP = "FAT_AP";
	public static final String DEVICE_TYPE_VLAN = "VLAN";
	
	/**
	 * site状态
	 */
	public static final String SITE_STATUS_LOCKED  = "LOCKED";
	public static final String SITE_STATUS_NORMAL = "NORMAL";
	public static final String SITE_STATUS_DELETED = "DELETED";
	
	/**
	 * site 状态操作
	 */
	public static final String SITE_STATUS_OPT_LOCK = "LOCK";
	public static final String SITE_STATUS_OPT_UNLOCK = "UNLOCK";
	public static final String SITE_STATUS_OPT_DELETE = "DELETED";
	
	/**
	 * portal policy 状态
	 */
	public static final String PORTAL_POLICY_STATUS_LOCKED = "LOCKED";
	public static final String PORTAL_POLICY_STATUS_NORMAL = "NORMAL";
	public static final String PORTAL_POLICY_STATUS_DELETED = "DELETED";
	
	/**
	 * portal policy 状态操作
	 */
	public static final String PORTAL_POLICY_STATUS_OPT_LOCK = "LOCK";
	public static final String PORTAL_POLICY_STATUS_OPT_UNLOCK = "UNLOCK";
	public static final String PORTAL_POLICY_STATUS_OPT_DELETE = "DELETE";
	
	/**
	 * 用户状态
	 */
	public static final String TERMINALUSER_STATUS_ONLINE = "ONLINE";//正常
	public static final String TERMINALUSER_STATUS_OFFLINE = "OFFLINE";//离线
	public static final String TERMINALUSER_STATUS_LOCKED = "LOCKED";//锁定

	/**
	 * 用户认证日志状态
	 */
	public static final String TERMINALUSER_AUTH_LOG_STATUS_ONLINE = "ONLINE";//正常
	public static final String TERMINALUSER_AUTH_LOG_STATUS_OFFLINE = "OFFLINE";//离线
	

	/**
	 * 设备日志类型
	 */
		public static final String DEVICE_STATUS_TYPE_HEARTBEAT = "HEARTBEAT";
		public static final String DEVICE_STATUS_TYPE_REGISTRATION = "REGISTRATION";
		public static final String DEVICE_STATUS_TYPE_ONLINE = "ONLINE";
		public static final String DEVICE_STATUS_TYPE_OFFLINE = "OFFLINE";
	
	/**
	 * 用户-设备状态
	 */
	public static final String TERMINALUSER_DEVICE_STATUS_NORMAL = "NORMAL";//正常
	public static final String TERMINALUSER_DEVICE_STATUS_LOCKED = "LOCKED";//锁定

	/**
	 * Portal Page - types
	 */
	public static final String PORTAL_PAGE_TYPE_AUTH = "AUTH";
	public static final String PORTAL_PAGE_TYPE_LOGIN = "LOGIN";
	public static final String PORTAL_PAGE_TYPE_INSITE = "INSITE";
	
	/**
	 * PortalPage - status
	 */
	public static final String PORTAL_PAGE_STATUS_NORMAL = "NORMAL";
	public static final String PORTAL_PAGE_STATUS_DELETED = "DELETED";
	
	/**
	 * Portal Template - types
	 */
	public static final String PORTAL_TEMPLATE_TYPE_AUTH = "AUTH";
	public static final String PORTAL_TEMPLATE_TYPE_LOGIN = "LOGIN";
	public static final String PORTAL_TEMPLATE_TYPE_INSITE = "INSITE";
	
	/**
	 * 模板行业
	 */
	public static final String PORTAL_TEMPLATE__TRADE_TYPE_RESTAURANT = "restaurant";
	public static final String PORTAL_TEMPLATE__TRADE_TYPE_FINANCE = "finance";
	public static final String PORTAL_TEMPLATE__TRADE_TYPE_TRAVEL = "travel";
	public static final String PORTAL_TEMPLATE__TRADE_TYPE_OTHERS = "others";
	
	/**
	 * 
	 */
	public static final String PORTAL_TEMPLATE_TRADE_TYPE_ALL = "";
	
	/**
	 * 站点认证方式
	 */
	public static final String PORTAL_AUTH_TYPE_3RD_PART_MOBILE = "3RD_PART_MOBILE";
	public static final String PORTAL_AUTH_TYPE_CHINANET_MOBILE = "CHINANET_MOBILE";
	public static final String PORTAL_AUTH_TYPE_MOBILE = "MOBILE";
	public static final String PORTAL_AUTH_TYPE_WECHAT = "WECHAT";
	public static final String PORTAL_AUTH_TYPE_EMAIL = "EMAIL";
	public static final String PORTAL_AUTH_TYPE_USERPWD = "USERPWD";
	public static final String PORTAL_AUTH_TYPE_OPTION = "OPTION";
	public static final String PORTAL_AUTH_TYPE_EXTEND = "EXTEND";
	public static final String PORTAL_AUTH_TYPE_APPMOBILE = "APPMOBILE";
	
	/**
	 * 二级平台（第三方平台）认证方式
	 */
	public static final String APP_AUTH_TYPE_THIRD = "THIRD_AUTH";//二级平台认证-接口对接方式
	public static final String APP_AUTH_TYPE_AAA = "AAA_AUTH";//AAA认证
	public static final String APP_AUTH_TYPE_AP = "AP_AUTH";//胖AP认证
	public static final String APP_AUTH_TYPE_AC = "AC_AUTH";//AC直连认证
	
	public static final String PORTAL_AUTH_TYPE_3RD_PART_MOBILE_CN = "第三方短信";
    public static final String PORTAL_AUTH_TYPE_3RD_PART_MOBILE_DESC = "第三方接入手机短信";
	public static final String PORTAL_AUTH_TYPE_CHINANET_MOBILE_CN = "CHINANET短信认证";
    public static final String PORTAL_AUTH_TYPE_CHINANET_MOBILE_DESC = "用户通过手机申请上网验证码，并使用手机号与验证码登录完成验证上网";
	public static final String PORTAL_AUTH_TYPE_MOBILE_CN = "短信";
    public static final String PORTAL_AUTH_TYPE_MOBILE_DESC = "用户通过手机申请上网验证码，并使用手机号与验证码登录完成验证上网";
	public static final String PORTAL_AUTH_TYPE_WECHAT_CN = "微信";
    public static final String PORTAL_AUTH_TYPE_WECHAT_DESC = "用户进入微信，并通过微信扫描商户提供的上网二维码，完成微信关注后，实现上网";
	public static final String PORTAL_AUTH_TYPE_EMAIL_CN = "邮件";
    public static final String PORTAL_AUTH_TYPE_EMAIL_DESC = "";
	public static final String PORTAL_AUTH_TYPE_USERPWD_CN = "用户名密码";
    public static final String PORTAL_AUTH_TYPE_USERPWD_DESC = "通过接入系统平台会员通行证验证上网";
	public static final String PORTAL_AUTH_TYPE_OPTION_CN = "免认证";
    public static final String PORTAL_AUTH_TYPE_OPTION_DESC = "用户只须点击页面“免费上网”，即可实现上网";
	public static final String PORTAL_AUTH_TYPE_EXTEND_CN = "第三方";
    public static final String PORTAL_AUTH_TYPE_EXTEND_DESC = "第三方验证";
	public static final String PORTAL_AUTH_TYPE_APPMOBILE_CN = "手机APP";
    public static final String PORTAL_AUTH_TYPE_APPMOBILE_DESC = "手机APP验证";
	
	/**
	 * 第三方接入认证
	 */
	public static final String THIRD_PART_AUTH_STATUS_NORMAL = "NORMAL";
	public static final String THIRD_PART_AUTH_STATUS_LOCKED = "LOCKED";
	
	/**
	 * ChinaNet设备统一 设备ID
	 */
	public static final String THIRD_PART_DEVICE_ID_CHINA_NET = "0000369d-1111-1111-1111-111111111111";
	/**
	 * 西软设备统一 设备ID
	 */
	public static final String THIRD_PART_DEVICE_ID_WESTLAKE_SOFT = "0000369d-2222-2222-2222-222222222222";
	
	/**
	 * 第三方接入 虚拟设备
	 */
	public static final String THIRD_PART_DEVICE_NAME_PREFIX = "THIRD_PART_";
	public static final String THIRD_PART_DEVICE_BRAND = "THIRD_PART";
	public static final String THIRD_PART_DEVICE_MODEL = "THIRD_PART";
	public static final String THIRD_PART_DEVICE_FIRMWARE_VERSION = "THIRD_PART_FIRMWARE";
	public static final String THIRD_PART_DEVICE_COMPONENT_VERSION = "THIRD_PART_COMPONENT";

    /**
     * Radius 虚拟设备
     */
    public static final String RADIUS_DEVICE_NAME_PREFIX = "RADIUS_";
    public static final String RADIUS_DEVICE_BRAND = "RADIUS";
	public static final String RADIUS_DEVICE_MODEL = "RADIUS";
	public static final String RADIUS_DEVICE_FIRMWARE_VERSION = "RADIUS_FIRMWARE";
	public static final String RADIUS_DEVICE_COMPONENT_VERSION = "RADIUS_COMPONENT";
    public static final int RADIUS_DEVICE_NAME_RAND_STR_LEN = 8;
	
    /**
     * 非定制ap 虚拟设备
     */
    public static final String STANDARD_DEVICE_NAME_PREFIX = "STANDARD_";
    public static final String STANDARD_DEVICE_BRAND = "STANDARD";
	public static final String STANDARD_DEVICE_MODEL = "STANDARD";
	public static final String STANDARD_DEVICE_FIRMWARE_VERSION = "STANDARD_FIRMWARE";
	public static final String STANDARD_DEVICE_COMPONENT_VERSION = "STANDARD_COMPONENT";
    public static final int STANDARD_DEVICE_NAME_RAND_STR_LEN = 8;

    
    /**
     * 二级平台 虚拟设备
     * */
    public static final String THIRD_PLATFORM_DEVICE_NAME_PREFIX = "THIRD_PLATFORM_";
	public static final String THIRD_PLATFORM_DEVICE_BRAND = "THIRD_PLATFORM";
	public static final String THIRD_PLATFORM_DEVICE_MODEL = "THIRD_PLATFORM";
	public static final String THIRD_PLATFORM_DEVICE_FIRMWARE_VERSION = "THIRD_PLATFORM_FIRMWARE";
	public static final String THIRD_PLATFORM_DEVICE_COMPONENT_VERSION = "THIRD_PLATFORM_COMPONENT";
	public static final int THIRD_PLATFORM_DEVICE_NAME_RAND_STR_LEN = 8;
	
	public static final int AUTH_TOKEN_LENGTH = 10;
	public static final int AUTH_CODE_LENGTH = 6;
	
	public static final String USER_STATUS_ONLINE = "ONLINE";
	public static final String USER_STATUS_OFFLINE = "OFFLINE";
	
	/**
     * 广告平台JS脚本状态
     * */
	public static final String ADVERT_OPEN_CN = "使用中";
    public static final String ADVERT_OPEN = "OPEN";
    public static final String ADVERT_CLOSE_CN = "关闭";
    public static final String ADVERT_CLOSE = "CLOSE";
    public static final String ADVERT_CHECK_CN = "待审核";
    public static final String ADVERT_CHECK = "CHECK";
	
	/**
	 * 缩略图生成 成功
	 */
	public static final String THUMB_GENE_STD_RESULT ="wkhtmltoimage execution result: '0'";
	public static final String THUMB_RESIZE_SUCCESS = "resize thumbnail successfully";
	
	/**
	 * 系统默认站点
	 */
	public static final String DEFAULT_SITE_NAME = "系统默认站点-307A2275";
	public static final Long DEFAULT_SITE_OWNER_ID = new Long(1);
	public static final Date DEFAULT_SITE_CREATE_DATETIME = DateUtil.parseToDate("2000-12-01 12:01:01", DateUtil.YYYY_MM_DD_HH_MM_SS);
	
	/**
	 * 系统默认所有帐号都是超级管理员的子帐号
	 */
	public static final String DEFAULT_PARENTIDS= "{\"directParentIds\":[\"1\"], \"totalParentIds\":[\"1\"]}";
	
	/**
	 * 正则表达式
	 */
	//^(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])$
	//\\b((?!\\d\\d\\d)\\d+|0\\d\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|0\\d\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|0\\d\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|0\\d\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\b
	public static final Pattern IP_PATTERN = Pattern.compile("^(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])$");
	//邮箱
	public static final Pattern EMAIL_PATTERN = Pattern.compile("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$"); 
	//手机号码
	public static final Pattern CELLPHONE_PATTERN = Pattern.compile("^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\\d{8}$");
	//日期
	public static final Pattern DATE_PATTERN = Pattern.compile("^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\\s(((0?[0-9])|([1-2][0-3]))\\:([0-5]?[0-9])((\\s)|(\\:([0-5]?[0-9])))))?$");
	//UUID
	public static final Pattern UUID_PATTERN = Pattern.compile("^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$");
	//MAC
	public static final Pattern MAC_PATTERN = Pattern.compile("^[0-9A-F]{12}$");
	//HOUR
	public static final Pattern HOUR_PATTERN = Pattern.compile("^([1]?[0-9])|2[0-3]$");
	
	//Number
	public static final Pattern NUMBER_PATTERN = Pattern.compile("^[0-9]+$");
	//只能为英文、数字或半角字符
	public static final Pattern AC_NAME_PATTERN = Pattern.compile("^[a-zA-Z0-9]|[\u0000-\u00FF]+$");
	/**
	 * 电信- 手机号码段 （2G号段（CDMA网络）133、153， 3G号段（CDMA2000网络）180、181、189， 虚拟运营商-1700）
	 */
	public static final Pattern TELCOM_CELL_NUMBERS = Pattern.compile("^[1](33|53|8[0-1]|89)[0-9]{8}|[1](700)[0-9]{7}$");
	public static final String TELCOM_EN_NAME = "TELCOM";
	/**
	 * 联通- 手机号码段 （2G号段（GSM网络）130、131、132、155、156，3G号段（WCDMA网络）185、186， 4G号段 176， 虚拟运营商-1709）
	 */
	public static final Pattern UNICOM_CELL_NUMBERS = Pattern.compile("^[1](3[0-2]|5[5-6]|8[5-6]|76)[0-9]{8}|[1](709)[0-9]{7}$");
	public static final String UNICOM_EN_NAME = "UNICOM";
	/**
	 * 移动- 手机号码段 （139、138、137、136、135、134x（0-8）、159、158、152、151、150、182、183、184，3G号段（WCDMA网络）157、188、187， 4G号段 178， 虚拟运营商-1705）
	 */
	public static final Pattern MOBILE_CELL_NUMBERS = Pattern.compile("^[1](3[5-9]|5[0-2]|5[7-9]|8[2-4]|8[7-8]|78)[0-9]{8}|[1](34[0-8]|709)[0-9]{7}$");
	public static final String MOBILE_EN_NAME = "MOBILE";
	/**
	 * 默认短信网关
	 */
	public static final String SMS_GATEWAY = "http://122.224.104.155:8009/SMGPService.asmx/SendMsg?tell=%s&msg=%s";
	
	/**
	 * 短信网关系统配置 key
	 */
	public static final String SYS_CFG_SMSGW_KEY = "sms_gateway";
	
	/**
	 * 认证类型系统配置 key
	 */
	public static final String SYS_CFG_AUTHTYPE_KEY = "auth_types";
	
	/**
	 * 短信价格 key
	 */
	public static final String SYS_CFG_SMS_UNIT_PRICE_KEY = "sms_unit_price";
	
	/**
	 * 默认 门户站点id 系统配置 key
	 */
	public static final String SYS_CFG_DEFAULT_SITE_ID_KEY = "default_site_id";
	
	/**
	 * systemdata IP白名单系统配置 key
	 */
	public static final String SYS_CFG_SERVER_IP_VALIDATE_KEY = "server_ip_validate";
	
	/**
	 * wifi 门户显示时间窗最小单位
	 */
	public static final Float PORTAL_POLICY_ITEM_PRECISION = Float.parseFloat("1");
	
	//商户个人设置：短信验证次数key
	public static final String ACCOUNT_CONFIGS_KEY_SMS_AUTH_LIMIT = "SMS_AUTH_LIMIT";
	//商户个人设置：短信下限提醒设置
	public static final String ACCOUNT_CONFIGS_KEY_SMS_LOWER_LIMIT = "SMS_LOWER_LIMIT";
	//商户个人设置：可用短信条数
	public static final String ACCOUNT_CONFIGS_KEY_SMS_USABLE_COUNT = "SMS_USABLE_COUNT";
	//商户个人设置：是否已发送短信不足通知
	public static final String ACCOUNT_CONFIGS_KEY_SMS_LOWER_NOTIFY = "SMS_LOWER_NOTIFY";
	//商户个人设置：是否打开短信发送开关
	public static final String ACCOUNT_CONFIGS_KEY_SMS_SEND_WHETHER = "SMS_SEND_WHETHER";
    //商户个人设置：微信公众号
	public static final String ACCOUNT_CONFIGS_KEY_WEHCHAT_PUB_ACCOUNT = "WECHAT_PUB_ACCOUNT";
    //商户介入TOKEN
    public static final String ACCOUNT_CONFIGS_KEY_WECHAT_ACCESS_TOKEN = "WECHAT_ACCESS_TOKEN";

    public static final int ACCOUNT_CONFIGS_WECHAT_TOKEN_LENGTH = 8;

    /**
     *
     */
    public static final String DEVICE_CONFIG_SSID = "ssid";
    public static final String DEVICE_CONFIG_HOSTNAME = "hostname";
    public static final String DEVICE_CONFIG_ITEMS = "configItems";
    public static final String EMS_DEVICE_ID = "ems_dev_id";

	/**
	 * 组件上传
	 */
	//描述文件名
	public static final String COMPONENT_PKG_DESC_FILE_NAME = "description.ini";
	//描述section
	public static final String COMPONENT_INI_SECTION_NAME = "Component Description";
	
	/**
	 * 模板上传
	 */
	//描述文件名
	public static final String PORTAL_TEMPLATE_DESC_FILE_NAME = "description.ini";
	//描述section
	public static final String PORTAL_TEMPLATE_INI_SECTION_NAME = "Portal Template Description";
	
	/**
	 * 组件状态
	 */
	public static final String COMPONENT_STATUS_NORMAL = "NORMAL";
	public static final String COMPONENT_STATUS_LOCKED = "LOCKED";
	public static final String COMPONENT_STATUS_DELETED = "DELETED";
	public static final String COMPONENT_STATUS_DRAFT = "DRAFT";
	
	public static final String COMPONENT_TYPE_FIRMWARE = "FIRMWARE";
	public static final String COMPONENT_TYPE_COMPONENT_PORTAL = "COMPONENT_PORTAL";
	public static final String COMPONENT_TYPE_COMPONENT_TASK = "COMPONENT_TASK";

    public static final String DEVICE_SERVICE_NAME_PORTAL = "twifi-portal";
    public static final String DEVICE_SERVICE_NAME_TASK = "twifi-task";

	public static final String COMPONENT_SUPPORTED_BRAND = "brand";
	public static final String COMPONENT_SUPPORTED_MODEL = "model";

	/**
	 * 短信消费类型
	 */
	public static final String SMS_PURCHASE_TYPE_FREE = "FREE";
	public static final String SMS_PURCHASE_TYPE_PURCHASE = "PURCHASE";
	
	/**
	 * 短信消费状态
	 */
	public static final String SMS_PURCHASE_STATUS_NEW = "NEW";
	public static final String SMS_PURCHASE_STATUS_PROCESSING = "PROCESSING";
	public static final String SMS_PURCHASE_STATUS_FINISHED = "FINISHED";
	public static final String SMS_PURCHASE_STATUS_LOCKED = "LOCKED";

    /**
     * API device task code
     */
    public static final long API_DEVICE_TASK_REBOOT =           1000;
    public static final long API_DEVICE_TASK_PORTALSTART =      2000;
    public static final long API_DEVICE_TASK_PORTALSTOP =       2001;
    public static final long API_DEVICE_TASK_PORTALRESTART =    2002;
    public static final long API_DEVICE_TASK_SET_BASE_INFO =    2003;
    public static final long API_DEVICE_TASK_SYSUPGRADE =       3000;
    public static final long API_DEVICE_TASK_TER_REFUSE =       4001;
    public static final long API_DEVICE_TASK_SET_WHITE =        4002;
    public static final long API_DEVICE_TASK_SET_QOS =          5001; // TRAFFIC FLOW_CONTROL

    public static final String DEVICE_TASK_LOG_ID = "task_log_id";
	public static final String DEFAULT_EXPIRED_URL = "/device/taskexpired.htm";
	public static final String DEFAULT_CALLBACK_URL = "/device/taskfinished.htm";

    public static final String DEFAULT_API_EXPIRED_URL = "/api10/taskexpired.htm";
	public static final String DEFAULT_API_CALLBACK_URL = "/api10/taskfinished.htm";

    public static final Integer DEFAULT_DEVICE_TOTAL_MEM = Integer.valueOf(64);

    /**
     *
     */
    public static final String DHCP_INFO_STATUS_ONLINE = "ONLINE";
    public static final String DHCP_INFO_STATUS_OFFLINE = "OFFLINE";

	/**
	 * 是否类型
	 */

	public static final String WHETHER_YES = "YES";
	public static final String WHETHER_NO = "NO";
	
	/**
	 * 是否类型
	 */
	public static final int WHETHER_INT_YES = 1;
	public static final int WHETHER_INT_NO = 0;

	/**
	 * 未注册/激活设备状态
	 */
	public static final String PRODUCED_DEVICES_STATUS_WAITED = "WAITED";
	public static final String PRODUCED_DEVICES_STATUS_AUDITED = "AUDITED";

    /**
     * 短信类型
     */
    public static final String SMS_SOURCE_TYPE_AUTH_LOG = "AUTH_LOG ";
    public static final String SMS_SOURCE_TYPE_PHONE_BIND = "PHONE_BIND";

    /**
     * 商户帐号手机绑定验证码长度
     */
    public static final int ACCOUNT_PHONE_BINDING_CODE_LENGTH = 6;

    /**
     * 商户帐号手机验证码有效期-1小时，单位毫秒
     */
    public static final int ACCT_PHONE_BIND_CODE_EFF_SECONDS = 3600000;

    /**
     * 商户帐号绑定手机号码，返回码
     */
    public static final int ACCT_PHONE_BINDING_RET_CODE_SUCCESS = 0;
    public static final int ACCT_PHONE_BINDING_RET_CODE_EXPIRED = 1;
    public static final int ACCT_PHONE_BINDING_RET_CODE_ERROR = 2;
    public static final int ACCT_PHONE_BINDING_RET_CODE_INCORRECT_NUMBER = 3;
    
    /**
     * 消息类型
     */
    public static final String MESSAGE_TYPE_MEMBER_ALERT = "member_alert";
    public static final String MESSAGE_TYPE_DEVICE_ALERT = "device_alert";
    public static final String MESSAGE_TYPE_SYSTEM_NOTICE = "system_notice";
    
    /**
     * 查询最近8条系统消息
     */
    public static int TOP_SIZE = 8;
 	
 	/**
 	 * 系统信息发送时间
 	 */
    public static String SYSTEM_RESERVED_CREATE_DATETIME = "小时前";
    
    /**
     * 模糊查询用到的参数字段
     */
    public static String LIKE_PARAM_SITE_ID = "\"siteid\"";
    
	/**
	 * 
	 */
	public static final String SYSTEM_DATA_TYPE_SERVER_IP = "SERVERIP";
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
	}
	
	
	//---------------------access--------------------------------
		/**
	     * 默认品牌型号
	     */
	    public static final String DEFAULT_DEVICE_BRAND = "BRAND";
		public static final String DEFAULT_DEVICE_MODEL = "MODEL";
		
		/**
	     * AC 虚拟设备
	     * */
	    public static final String AC_DEVICE_NAME_PREFIX = "AC_";
	    public static final String AC_DEVICE_TYPE = "AC";
		public static final String AC_DEVICE_BRAND = "AC";
		public static final String AC_DEVICE_MODEL = "AC";
		public static final String AC_DEVICE_FIRMWARE_VERSION = "AC_FIRMWARE";
		public static final String AC_DEVICE_COMPONENT_VERSION = "AC_COMPONENT";
		public static final int AC_DEVICE_NAME_RAND_STR_LEN = 8;
		
		/**
	     * BAS 虚拟设备
	     * */
	    public static final String BAS_DEVICE_NAME_PREFIX = "BAS_";
	    public static final String BAS_DEVICE_TYPE = "BAS";
		public static final String BAS_DEVICE_BRAND = "BAS";
		public static final String BAS_DEVICE_MODEL = "BAS";
		public static final String BAS_DEVICE_FIRMWARE_VERSION = "BAS_FIRMWARE";
		public static final String BAS_DEVICE_COMPONENT_VERSION = "BAS_COMPONENT";
		public static final int BAS_DEVICE_NAME_RAND_STR_LEN = 8;
		
		/**
	     * FAT-AP 虚拟设备
	     * */
	    public static final String FAT_AP_DEVICE_NAME_PREFIX = "FAT_AP_";
	    public static final String FAT_AP_DEVICE_TYPE_EN = "FAT_AP";
		public static final String FAT_AP_DEVICE_BRAND_EN = "FAT_AP";
		public static final String FAT_AP_DEVICE_BRAND_CN = "胖AP";
		public static final String FAT_AP_DEVICE_MODEL_EN = "FAT_AP";
		public static final String FAT_AP_DEVICE_MODEL_CN = "胖AP";
		public static final String FAT_AP_DEVICE_FIRMWARE_VERSION = "FAT_AP_FIRMWARE";
		public static final String FAT_AP_DEVICE_COMPONENT_VERSION = "FAT_AP_COMPONENT";
		public static final int FAT_AP_DEVICE_NAME_RAND_STR_LEN = 8;
		
		/**
	     * 瘦AP 虚拟设备
	     * */
	    public static final String FIT_AP_DEVICE_NAME_PREFIX = "FIT_AP_";
	    public static final String FIT_AP_DEVICE_TYPE_EN = "FIT_AP";
		public static final String FIT_AP_DEVICE_BRAND_EN = "FIT_AP";
		public static final String FIT_AP_DEVICE_BRAND_CN = "瘦AP";
		public static final String FIT_AP_DEVICE_MODEL_EN = "FIT_AP";
		public static final String FIT_AP_DEVICE_MODEL_CN = "瘦AP";
		public static final String FIT_AP_DEVICE_FIRMWARE_VERSION = "FIT_AP_FIRMWARE";
		public static final String FIT_AP_DEVICE_COMPONENT_VERSION = "FIT_AP_COMPONENT";
		public static final int FIT_AP_DEVICE_NAME_RAND_STR_LEN = 8;
	    
		/**
	     * 热点
	     * */
	    public static final String VLAN_DEVICE_NAME_PREFIX = "VLAN_";
	    public static final String VLAN_DEVICE_TYPE = "VLAN";
		public static final String VLAN_DEVICE_BRAND = "VLAN";
		public static final String VLAN_DEVICE_MODEL = "VLAN";
		public static final String VLAN_DEVICE_FIRMWARE_VERSION = "VLAN_FIRMWARE";
		public static final String VLAN_DEVICE_COMPONENT_VERSION = "VLAN_COMPONENT";
		public static final int VLAN_DEVICE_NAME_RAND_STR_LEN = 8;
		
		/**
		 * 设备地址
		 */
		public static final String DEVICE_lOCATION_COUNTRY = "中国";
		
		/**
		 * AP设备操作类型
		 */
		public static final String AP_DEVICE_ACTION_TYPE_SIX = "6";
		public static final String AP_DEVICE_ACTION_TYPE_SEVEN = "7";
		
		/**
		 * 数据库操作类型
		 */
		public static final String OPT_TYPE_INSERT = "Insert";
		public static final String OPT_TYPE_UPDATE = "Update";
		public static final String OPT_TYPE_DELETE = "Delete";
		
		/**
		 * 表名
		 */
		public static final String AAA_VIRTUAL_DEVICE_TBL = "aaa_virtual_device";
		public static final String ACCOUNT_HAS_TERMINAL_USER_TBL = "account_has_terminal_user";
		public static final String COMPONENT_TBL = "component";
		public static final String DEVICE_TBL = "device";
		public static final String DEVICE_GROUP_TBL = "device_group";
		public static final String DEVICE_HAS_DEVICE_GROUP_TBL = "device_has_device_group";
		public static final String DEVICE_MODEL_TBL = "device_model";
		public static final String LOCATION_TBL = "location";
		public static final String PRODUCED_DEVICE_TBL = "produced_devices";
//		public static final String SSID_VIRTUAL_DEVICE_TBL = "ssid_virtual_device";
		public static final String TERMINAL_USER_TBL = "terminal_user";
		public static final String TERMINAL_USER_AUTHENTICATION_LOG_TBL = "terminal_user_authentication_log";
		public static final String TERMINAL_USER_HAS_DEVICE_TBL = "terminal_user_has_device";
		public static final String THIRD_PART_AUTH = "third_part_auth";
		public static final String THIRD_PLATFORM = "third_platform";
		public static final String USER_BLACKLIST = "user_blacklist";
		public static final String USER_WHITELIST = "user_whitelist";
//		public static final String VLAN_VIRTUAL_DEVICE_TBL = "vlan_virtual_device";
		
		public static final String RADIUS_VIRTUAL_DEVICE_TBL = "radius_virtual_device";
		public static final String FIT_AP_VIRTUAL_DEVICE_TBL = "fit_ap_virtual_device";
		public static final String TELECOM_VIRTUAL_DEVICE_TBL = "telecom_virtual_device";
		
		
		/**
		 * client_mq数据收集通道
		 */
		public static final String CLIENT_MQ_RECEVER = "S400";
		
		
}