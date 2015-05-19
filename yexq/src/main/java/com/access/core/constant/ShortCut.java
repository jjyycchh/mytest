package com.access.core.constant;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ShortCut {
	/**
	 * shortcut references
	 */
	public static final String SHORTCUT_DEVICE_LIST_REFS = "DeviceAction.devicelist";
	public static final String SHORTCUT_DEVICE_LIST_NAME = "设备管理";
	public static final String SHORTCUT_DEVICE_LIST_PERM = "";
	public static final String SHORTCUT_DEVICE_LIST_URL = "/device/devicelist.htm";
	
	public static final String SHORTCUT_SITE_LIST_REFS = "MerchantAction.siteList";
	public static final String SHORTCUT_SITE_LIST_NAME = "站点管理";
	public static final String SHORTCUT_SITE_LIST_PERM = "";
	public static final String SHORTCUT_SITE_LIST_URL = "/merchant/sites.htm";
	
	public static final String SHORTCUT_ADD_SITE_REFS = "MerchantAction.addSite";
	public static final String SHORTCUT_ADD_SITE_NAME = "新增站点";
	public static final String SHORTCUT_ADD_SITE_PERM = "";
	public static final String SHORTCUT_ADD_SITE_URL = "/merchant/addsite.htm";
	
	public static final String SHORTCUT_POLICY_LIST_REFS = "MerchantAction.portalPoliciesManagement";
	public static final String SHORTCUT_POLICY_LIST_NAME = "推送策略管理";
	public static final String SHORTCUT_POLICY_LIST_PERM = "";
	public static final String SHORTCUT_POLICY_LIST_URL = "/merchant/portalpolicies.htm";
	
	public static final String SHORTCUT_ADD_POLICY_REFS = "MerchantAction.addPortalPolicy";
	public static final String SHORTCUT_ADD_POLICY_NAME = "新增推送策略";
	public static final String SHORTCUT_ADD_POLICY_PERM = "";
	public static final String SHORTCUT_ADD_POLICY_URL = "/merchant/addportalpolicy.htm";
	
	public static final String SHORTCUT_USER_LIST_REFS = "UserAction.userlist";
	public static final String SHORTCUT_USER_LIST_NAME = "用户管理";
	public static final String SHORTCUT_USER_LIST_PERM = "";
	public static final String SHORTCUT_USER_LIST_URL = "/user/users.htm";
	
	public static final String SHORTCUT_USER_STATIS_REFS = "SystemAction.statistics";
	public static final String SHORTCUT_USER_STATIS_NAME = "用户统计分析";
	public static final String SHORTCUT_USER_STATIS_PERM = "";
	public static final String SHORTCUT_USER_STATIS_URL = "/system/statistics.htm?menu=userstatistics";
	
	public static final String SHORTCUT_TRAFFIC_STATIS_REFS = "MerchantAction.trafficstatis";
	public static final String SHORTCUT_TRAFFIC_STATIS_NAME = "流量统计分析";
	public static final String SHORTCUT_TRAFFIC_STATIS_PERM = "";
	public static final String SHORTCUT_TRAFFIC_STATIS_URL = "/system/statistics.htm?menu=trafficstatis";
	
	public static final String SHORTCUT_PORTAL_STATIS_REFS = "MerchantAction.portalsstatis";
	public static final String SHORTCUT_PORTAL_STATIS_NAME = "WiFi门户统计分析";
	public static final String SHORTCUT_PORTAL_STATIS_PERM = "";
	public static final String SHORTCUT_PORTAL_STATIS_URL = "/system/statistics.htm?menu=portalsstatis";
	
	public static final String SHORTCUT_ACCOUNT_LIST_REFS = "AccountAction.accountmanage";
	public static final String SHORTCUT_ACCOUNT_LIST_NAME = "帐号管理";
	public static final String SHORTCUT_ACCOUNT_LIST_PERM = "";
	public static final String SHORTCUT_ACCOUNT_LIST_URL = "/account/account_management.htm";
	
	public static final String SHORTCUT_ADD_ACCOUNT_REFS = "AccountAction.editAccount";
	public static final String SHORTCUT_ADD_ACCOUNT_NAME = "新增帐号";
	public static final String SHORTCUT_ADD_ACCOUNT_PERM = "";
	public static final String SHORTCUT_ADD_ACCOUNT_URL = "/account/editaccount.htm";
	
	public static final String SHORTCUT_COMPONENTS_REFS = "SystemAction.releaseComponent";
	public static final String SHORTCUT_COMPONENTS_NAME = "组件发布";
	public static final String SHORTCUT_COMPONENTS_PERM = "";
	public static final String SHORTCUT_COMPONENTS_URL = "/system/releaseComponent.htm";
	
	public static final String SHORTCUT_SYSTEM_CONFIGS_REFS = "SystemAction.platformSettings";
	public static final String SHORTCUT_SYSTEM_CONFIGS_NAME = "系统配置";
	public static final String SHORTCUT_SYSTEM_CONFIGS_PERM = "";
	public static final String SHORTCUT_SYSTEM_CONFIGS_URL = "/system/platformsettings.htm";
	
	public String refs;
	public String name;
	public String perm;
	public String url;
	
	public static List<Map<String, String>> GET_ALL_SHORTCUTS() {
		List<Map<String, String>> ShortCuts = new ArrayList<Map<String, String>>();

		Map<String, String> deviceListMap = new HashMap<String, String>();
		deviceListMap.put("refs", SHORTCUT_DEVICE_LIST_REFS);
		deviceListMap.put("name", SHORTCUT_DEVICE_LIST_NAME);
		deviceListMap.put("perm", SHORTCUT_DEVICE_LIST_PERM);
		deviceListMap.put("url", SHORTCUT_DEVICE_LIST_URL);
		ShortCuts.add(deviceListMap);
		
		Map<String, String> siteListMap = new HashMap<String, String>();
		siteListMap.put("refs", SHORTCUT_SITE_LIST_REFS);
		siteListMap.put("name", SHORTCUT_SITE_LIST_NAME);
		siteListMap.put("perm", SHORTCUT_SITE_LIST_PERM);
		siteListMap.put("url", SHORTCUT_SITE_LIST_URL);
		ShortCuts.add(siteListMap);
		
		Map<String, String> addSiteMap = new HashMap<String, String>();
		addSiteMap.put("refs", SHORTCUT_ADD_SITE_REFS);
		addSiteMap.put("name", SHORTCUT_ADD_SITE_NAME);
		addSiteMap.put("perm", SHORTCUT_ADD_SITE_PERM);
		addSiteMap.put("url", SHORTCUT_ADD_SITE_URL);
		ShortCuts.add(addSiteMap);
		
		Map<String, String> policyListMap = new HashMap<String, String>();
		policyListMap.put("refs", SHORTCUT_POLICY_LIST_REFS);
		policyListMap.put("name", SHORTCUT_POLICY_LIST_NAME);
		policyListMap.put("perm", SHORTCUT_POLICY_LIST_PERM);
		policyListMap.put("url", SHORTCUT_POLICY_LIST_URL);
		ShortCuts.add(policyListMap);
		
		Map<String, String> addPolicyMap = new HashMap<String, String>();
		addPolicyMap.put("refs", SHORTCUT_ADD_POLICY_REFS);
		addPolicyMap.put("name", SHORTCUT_ADD_POLICY_NAME);
		addPolicyMap.put("perm", SHORTCUT_ADD_POLICY_PERM);
		addPolicyMap.put("url", SHORTCUT_ADD_POLICY_URL);
		ShortCuts.add(addPolicyMap);

		Map<String, String> userListMap = new HashMap<String, String>();
		userListMap.put("refs", SHORTCUT_USER_LIST_REFS);
		userListMap.put("name", SHORTCUT_USER_LIST_NAME);
		userListMap.put("perm", SHORTCUT_USER_LIST_PERM);
		userListMap.put("url", SHORTCUT_USER_LIST_URL);
		ShortCuts.add(userListMap);

		Map<String, String> userStatisMap = new HashMap<String, String>();
		userStatisMap.put("refs", SHORTCUT_USER_STATIS_REFS);
		userStatisMap.put("name", SHORTCUT_USER_STATIS_NAME);
		userStatisMap.put("perm", SHORTCUT_USER_STATIS_PERM);
		userStatisMap.put("url", SHORTCUT_USER_STATIS_URL);
		ShortCuts.add(userStatisMap);

		Map<String, String> trafficStatisMap = new HashMap<String, String>();
		trafficStatisMap.put("refs", SHORTCUT_TRAFFIC_STATIS_REFS);
		trafficStatisMap.put("name", SHORTCUT_TRAFFIC_STATIS_NAME);
		trafficStatisMap.put("perm", SHORTCUT_TRAFFIC_STATIS_PERM);
		trafficStatisMap.put("url", SHORTCUT_TRAFFIC_STATIS_URL);
		ShortCuts.add(trafficStatisMap);

		Map<String, String> portalStatisMap = new HashMap<String, String>();
		portalStatisMap.put("refs", SHORTCUT_PORTAL_STATIS_REFS);
		portalStatisMap.put("name", SHORTCUT_PORTAL_STATIS_NAME);
		portalStatisMap.put("perm", SHORTCUT_PORTAL_STATIS_PERM);
		portalStatisMap.put("url", SHORTCUT_PORTAL_STATIS_URL);
		ShortCuts.add(portalStatisMap);
		
		Map<String, String> accountListMap = new HashMap<String, String>();
		accountListMap.put("refs", SHORTCUT_ACCOUNT_LIST_REFS);
		accountListMap.put("name", SHORTCUT_ACCOUNT_LIST_NAME);
		accountListMap.put("perm", SHORTCUT_ACCOUNT_LIST_PERM);
		accountListMap.put("url", SHORTCUT_ACCOUNT_LIST_URL);
		ShortCuts.add(accountListMap);
		
		Map<String, String> addAccountMap = new HashMap<String, String>();
		addAccountMap.put("refs", SHORTCUT_ADD_ACCOUNT_REFS);
		addAccountMap.put("name", SHORTCUT_ADD_ACCOUNT_NAME);
		addAccountMap.put("perm", SHORTCUT_ADD_ACCOUNT_PERM);
		addAccountMap.put("url", SHORTCUT_ADD_ACCOUNT_URL);
		ShortCuts.add(addAccountMap);
		
		Map<String, String> releaseComponentMap = new HashMap<String, String>();
		releaseComponentMap.put("refs", SHORTCUT_COMPONENTS_REFS);
		releaseComponentMap.put("name", SHORTCUT_COMPONENTS_NAME);
		releaseComponentMap.put("perm", SHORTCUT_COMPONENTS_PERM);
		releaseComponentMap.put("url", SHORTCUT_COMPONENTS_URL);
		ShortCuts.add(releaseComponentMap);
		
		Map<String, String> platformSettingsMap = new HashMap<String, String>();
		platformSettingsMap.put("refs", SHORTCUT_SYSTEM_CONFIGS_REFS);
		platformSettingsMap.put("name", SHORTCUT_SYSTEM_CONFIGS_NAME);
		platformSettingsMap.put("perm", SHORTCUT_SYSTEM_CONFIGS_PERM);
		platformSettingsMap.put("url", SHORTCUT_SYSTEM_CONFIGS_URL);
		ShortCuts.add(platformSettingsMap);
		
		return ShortCuts;
	}
	
	public static String[] GET_SHORTCUT_SET() {
		return new String[]{SHORTCUT_DEVICE_LIST_REFS, SHORTCUT_SITE_LIST_REFS, SHORTCUT_ADD_SITE_REFS,
				SHORTCUT_POLICY_LIST_REFS, SHORTCUT_ADD_POLICY_REFS, SHORTCUT_USER_LIST_REFS,
				SHORTCUT_USER_STATIS_REFS, SHORTCUT_TRAFFIC_STATIS_REFS, SHORTCUT_PORTAL_STATIS_REFS,
				SHORTCUT_ACCOUNT_LIST_REFS, SHORTCUT_ADD_ACCOUNT_REFS, SHORTCUT_COMPONENTS_REFS, SHORTCUT_SYSTEM_CONFIGS_REFS};
	}
	
	public static List<ShortCut> GET_SHORTCUT_LIST() {
		List<ShortCut> returnSet = new ArrayList<ShortCut>();
		
		for(Map<String, String> map : GET_ALL_SHORTCUTS()) {
			returnSet.add(new ShortCut(map));
		}
		
		return returnSet;
	}
	
	public ShortCut(Map<String, String> map) {
		if (map != null) {
			this.refs = map.get("refs");
			this.name = map.get("name");
			this.perm = map.get("perm");
			this.url = map.get("url");
		}
	}
	
	public Map<String, String> serialize() {
		Map<String, String> map = new HashMap<String, String>();
		map.put("refs", this.refs == null ? "" : this.refs);
		map.put("name", this.name == null ? "" : this.name);
		map.put("perm", this.perm == null ? "" : this.perm);
		map.put("url", this.url == null ? "" : this.url);
		return map;
	}
	
}
