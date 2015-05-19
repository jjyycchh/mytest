package com.access.core.util;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.access.core.constant.Constants;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import redis.clients.jedis.Jedis;

import java.io.File;
import java.io.IOException;
import java.util.*;

public class DeviceTaskUtil {
	private static Logger logger  =  Logger.getLogger(DeviceTaskUtil.class);
	
    public static final String TASK_TYPE_SET_SERVICE_RESTART = "SET_SERVICE_RESTART";
    public static final String PARAM_SET_SERVICE_RESTART_NAME = "SERVICE_RESTART_NAME";
    public static final String PARAM_SET_SERVICE_RESTART_DELAY = "SERVICE_RESTART_DELAY";

    public static final String TASK_TYPE_SET_AUTO_REBOOT = "SET_AUTO_REBOOT";
    public static final String PARAM_SET_REBOOT_HOUR = "hour";
    public static final String PARAM_SET_REBOOT_MINUTE = "minute";

	public static final String TASK_TYPE_UPGRADE_COMPONENT = "UPGRADE_COMPONENT";
	public static final String PARAM_UPGRADE_COMPONENT_VERSION = "COMPONENT_VERSION";
	public static final String PARAM_UPGRADE_PACKAGE_BASE_URL = "PACKAGE_BASE_URL";
	public static final String PARAM_UPGRADE_PACKAGE_RELATIVE_URL = "PACKAGE_RELATIVE_URL";
	public static final String PARAM_UPGRADE_SCRIPT_RELATIVE_PATH = "SCRIPT_RELATIVE_PATH";
	public static final String PARAM_UPGRADE_COMPONENT_TYPE = "UPGRADE_COMPONENT_TYPE";
	
	public static final String TASK_TYPE_SET_WL_CONFIG = "SET_WL_CONFIG";
	public static final String PARAM_SET_SSID = "ssid";
	public static final String PARAM_SET_WLKEY = "wlkey";
	
	public static final String TASK_TYPE_SET_DEVICE_NAME = "SET_DEVICE_NAME";
	public static final String PARAM_SET_DEVICE_NAME = "hostname";
	
	private static final Long DEFAULT_EXPIRED_SEC = Long.parseLong(PropertiesUtil.confProperties.getProperty("task.defaultExpireSec"));
	
	private static final String TASK_STATUS_INIT = "INIT";
	private static final String TASK_STATUS_DELIVERED = "DELIVERED";
	private static final String TASK_STATUS_RETURNED = "RETURNED";
	
	private static final String TASK_INFO_HASH_KEY = "TWIFI_TASKINFO";
	private static final String DEVICE_INFO_KEY = "TWIFI_DEVICEINFO";
	private static final String STARTUP_TASK_HASH_KEY = "TWIFI_DEVICESTART";
    private static final String API_DEVICE_ACTIVE = "API_DEVICE_ACTIVE";
    private static final String RAD_USER_ID_TOKEN_HASH_KEY = "TWIFI_USERTOKEN";
	private static final String STATIS_CACHE_KEY = "STATIS_CACHE";
	
	private static final String USER_INFO_KEY = "TWIFI_USERINFO";
	public static final String USER_PARAM_INCOMING = "incoming";
	public static final String USER_PARAM_OUTGOING = "outgoing";
	
	private static final String AUTH_TOKEN_KEY = "TWIFI_AUTH_TOKEN";
	
    public static final String API_DEVICE_BASE_INFO_HOSTNAME = "hostname";
    public static final String API_DEVICE_BASE_INFO_SSID = "ssid";

    //TER_REFUSE
    public static final String API_DEVICE_TER_REFUSE_TOKENS = "tokens";

    //SET WHITE LIST
    public static final String API_DEVICE_SET_WHITE_MACS = "mac";

    //FLOW CONTROL / QOS
    public static final String API_DEVICE_SET_QOS_IN = "inbound";
    public static final String API_DEVICE_SET_QOS_OUT = "outbound";
	
	private static final String TASK_THUMBNAIL_ARRAY_KEY = "THUMBNAIL_ARRAY";
	
	private static Jedis jedis = null;
	
	private static Jedis GET_REDIS_HANDLER() {
		if (jedis == null ) {
			jedis = new Jedis(PropertiesUtil.confProperties.getProperty("task.memdb.ip"));			
		}
		else {
			if (!jedis.isConnected()) {
				DeviceTaskUtil.CLOSE_REDIS(jedis);
				jedis =  new Jedis(PropertiesUtil.confProperties.getProperty("task.memdb.ip"));
			}
		}
		return jedis;
	}
	
	private static void CLOSE_REDIS(Jedis jedis) {
		if (jedis != null) {
            jedis.close();
		}
	}

    public static String assemblyDefaultPlatContextUrl(String relativeUrl) {
        String portalSvrHostName = PropertiesUtil.confProperties.getProperty("server.plat.hostname");
        String isUseSSL = PropertiesUtil.confProperties.getProperty("server.plat.usessl");
        String port;
        String protocol;
        if (StringUtils.isNotBlank(isUseSSL) && isUseSSL.equalsIgnoreCase("no")) {
            port = PropertiesUtil.confProperties.getProperty("server.plat.httpport");
            protocol = "http://";
        }
        else {
            port = PropertiesUtil.confProperties.getProperty("server.plat.sslport");
            protocol = "https://";
        }
        portalSvrHostName += ":" + port;

        relativeUrl = (StringUtils.isNotBlank(relativeUrl) ? relativeUrl : StringUtils.EMPTY);
        return protocol + portalSvrHostName + relativeUrl;
    }

    public static String getDefaultCallbackUrl() {
        return DeviceTaskUtil.assemblyDefaultPlatContextUrl(Constants.DEFAULT_CALLBACK_URL);
    }

    public static String getDefaultApiCallbackUrl() {
        return DeviceTaskUtil.assemblyDefaultPlatContextUrl(Constants.DEFAULT_API_CALLBACK_URL);
    }

    public static String getDefaultExpiredUrl() {
        return DeviceTaskUtil.assemblyDefaultPlatContextUrl(Constants.DEFAULT_EXPIRED_URL);
    }

    public static String getDefaultApiExpiredUrl() {
        return DeviceTaskUtil.assemblyDefaultPlatContextUrl(Constants.DEFAULT_API_EXPIRED_URL);
    }

/*	 Task format:
		{dev_id:xxx, desc:{task_id:xx, task_code:xx, task_signxx}, status: INIT|DELIVERED|RETURNED
		            callback:{expired_url:xxx, expired_time:xxx,
		                   callback_url:xxx, callback_data:xxx},
		            result:xxx}*/
	/**
	 * 
	 * @param devId
	 * @param contextURL
	 * @param callBackPara JSON data
	 * @return
	 * @throws IOException 
	 */
	public static Map<String, Object> initialTask(String devId, String taskId, 
			String contextURL, String callBackUrl, String expiredUrl, Map<String, String> callBackPara, 
			String taskType, Map<String, String> taskPara) throws IOException {
		Map<String, Object> taskObj = null;
		
		if (StringUtils.isNotBlank(devId) && StringUtils.isNotBlank(contextURL) && StringUtils.isNotBlank(taskType)) {
			taskObj = new HashMap<String, Object>();
			
			taskObj.put("dev_id", devId);
			taskObj.put("status", TASK_STATUS_INIT);
			
			Map<String, Object> callbackObj = new HashMap<String, Object>();
			callbackObj.put("expired_url", contextURL + (StringUtils.isNotBlank(expiredUrl) ? expiredUrl : DeviceTaskUtil.getDefaultCallbackUrl()));
			callbackObj.put("callback_url", contextURL + (StringUtils.isNotBlank(callBackUrl) ? callBackUrl : DeviceTaskUtil.getDefaultExpiredUrl()));

			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			calendar.set(Calendar.SECOND, calendar.get(Calendar.SECOND) + DEFAULT_EXPIRED_SEC.intValue());
			
			callbackObj.put("expired_time", DateUtil.formatToString(calendar.getTime(), DateUtil.YYYY_MM_DD_HH_MM));
			callbackObj.put("callback_data", callBackPara);
			taskObj.put("callback", callbackObj);
			
			String scriptString = DeviceTaskUtil.generateExecutableScript(taskType, taskPara);
			
			Map<String, Object> descObj = new HashMap<String, Object>();
			descObj.put("task_id", taskId);
			descObj.put("task_code", scriptString);
			descObj.put("task_sign", "");
			taskObj.put("desc", descObj);
		}

		return taskObj;
	}
	
	public static String generateExecutableScript(String taskType, Map<String, String> params) throws IOException {
		if (params == null) {
			return null;
		}
		
		String executableScript = null;
		String scriptTemp = null;
		
		if (taskType.equalsIgnoreCase(TASK_TYPE_UPGRADE_COMPONENT)) {
			String componentType = params.get(DeviceTaskUtil.PARAM_UPGRADE_COMPONENT_TYPE);
			String scriptRelativePath = params.get(DeviceTaskUtil.PARAM_UPGRADE_SCRIPT_RELATIVE_PATH);
			String scriptFullPath = PropertiesUtil.confProperties.getProperty("resource.root.componentScriptFilePath")
					+ File.separator + scriptRelativePath;

			String packageBaseUrl = params.get(DeviceTaskUtil.PARAM_UPGRADE_PACKAGE_BASE_URL);
			
			String packageRelativeUrl = params.get(DeviceTaskUtil.PARAM_UPGRADE_PACKAGE_RELATIVE_URL);
			// extract package file name from packageRelativeUrl
			String packageRelativeUrlWithoutPara = null;
			if (packageRelativeUrl.indexOf("?") > 0) {
				packageRelativeUrlWithoutPara = packageRelativeUrl.substring(0, packageRelativeUrl.indexOf("?"));
			}
			else {
				packageRelativeUrlWithoutPara = packageRelativeUrl;
			}
			
			String[] urlfragment = packageRelativeUrlWithoutPara.split("/");
			//remove empty item from array;
			List<String> urlFragmentLst = new ArrayList<String>();

			urlFragmentLst = Arrays.asList(urlfragment);
			Collections.reverse(urlFragmentLst);
			List<String> formatedUrlFragmentLst = new ArrayList<String>();
			for (String urlFragment : urlFragmentLst) {
				if (StringUtils.isNotBlank(urlFragment)) {
					formatedUrlFragmentLst.add(urlFragment);
				}
			}
			
			String packageFileName = formatedUrlFragmentLst.get(0);
			String packageFileUrlPath = packageRelativeUrlWithoutPara.replace(packageFileName, "");
			
			System.out.println("===============================");
			System.out.println("script path: " + scriptFullPath);
			System.out.println("package file name: " + packageFileName);
			System.out.println("packageFileUrlPath: " + packageFileUrlPath);
			System.out.println("===============================");
			
			scriptTemp = IoUtil.getBlockStringFromFile(scriptFullPath);
			executableScript = scriptTemp;
			
			if (componentType.equalsIgnoreCase(Constants.COMPONENT_TYPE_FIRMWARE)) {
				executableScript = executableScript.replace("{%=" + "file_path" + "%}", packageBaseUrl + packageFileUrlPath);
				executableScript = executableScript.replace("{%=" + "file_name" + "%}", packageFileName);
			}
			else if (componentType.equalsIgnoreCase(Constants.COMPONENT_TYPE_COMPONENT_TASK)) {
				executableScript = executableScript.replace("{%=" + "pkg_path" + "%}", packageBaseUrl + packageFileUrlPath);
				executableScript = executableScript.replace("{%=" + "pkg_name" + "%}", packageFileName);
			}
			else if (componentType.equalsIgnoreCase(Constants.COMPONENT_TYPE_COMPONENT_PORTAL)) {
				executableScript = executableScript.replace("{%=" + "pkg_path" + "%}", packageBaseUrl + packageFileUrlPath);
				executableScript = executableScript.replace("{%=" + "pkg_name" + "%}", packageFileName);
			}
			else {
				executableScript = StringUtils.EMPTY;
			}
			
		}
		else if (taskType.equalsIgnoreCase(TASK_TYPE_SET_WL_CONFIG)) {
			String scriptFullPath = PropertiesUtil.confProperties.getProperty("task.script.path") 
					+ File.separator + PropertiesUtil.confProperties.getProperty("task.script.setWireless.filename");
			scriptTemp = IoUtil.getBlockStringFromFile(scriptFullPath);
			
			executableScript = scriptTemp;
			executableScript = executableScript.replace("{%=" + "devicename" + "%}", params.get(PARAM_SET_DEVICE_NAME) == null ? "" : params.get(PARAM_SET_DEVICE_NAME));
			executableScript = executableScript.replace("{%=" + "ssid" + "%}", params.get(PARAM_SET_SSID) == null ? "" : params.get(PARAM_SET_SSID));
			executableScript = executableScript.replace("{%=" + "wkly" + "%}", params.get(PARAM_SET_WLKEY) == null ? "" : params.get(PARAM_SET_WLKEY));
		}
		else if (taskType.equalsIgnoreCase(TASK_TYPE_SET_DEVICE_NAME)) {
			String scriptFullPath = PropertiesUtil.confProperties.getProperty("task.script.path") 
					+ File.separator + PropertiesUtil.confProperties.getProperty("task.script.setDeviceName.filename");
			scriptTemp = IoUtil.getBlockStringFromFile(scriptFullPath);
			
			executableScript = scriptTemp;
			executableScript = executableScript.replace("{%=" + "devicename" + "%}", params.get(PARAM_SET_DEVICE_NAME));
		}
        else if (taskType.equalsIgnoreCase(TASK_TYPE_SET_AUTO_REBOOT)) {
			String scriptFullPath = PropertiesUtil.confProperties.getProperty("task.script.path")
					+ File.separator + PropertiesUtil.confProperties.getProperty("task.script.autoReboot.filename");
			scriptTemp = IoUtil.getBlockStringFromFile(scriptFullPath);

			executableScript = scriptTemp;
			executableScript = executableScript.replace("{%=" + "oclock" + "%}", params.get(PARAM_SET_REBOOT_HOUR));
            executableScript = executableScript.replace("{%=" + "minute" + "%}", params.get(PARAM_SET_REBOOT_MINUTE));
        }
        else if (taskType.equalsIgnoreCase(TASK_TYPE_SET_SERVICE_RESTART)) {
            			String scriptFullPath = PropertiesUtil.confProperties.getProperty("task.script.path")
					+ File.separator + PropertiesUtil.confProperties.getProperty("task.script.serviceRestart.filename");
			scriptTemp = IoUtil.getBlockStringFromFile(scriptFullPath);

			executableScript = scriptTemp;
			executableScript = executableScript.replace("{%=" + "service_name" + "%}", params.get(PARAM_SET_SERVICE_RESTART_NAME));
            executableScript = executableScript.replace("{%=" + "restart_delay" + "%}", params.get(PARAM_SET_SERVICE_RESTART_DELAY));
        }
		else {
			return null;
		}
		
		System.out.println(executableScript);
		System.out.println("----------------------------------------------");
		System.out.println("----------------------------------------------");
		System.out.println(executableScript.indexOf('\n'));
		
		return executableScript;
	}


    public static Map<String, Object> generateApiDeviceTaskData(String devId, long taskId, long taskCode,
                                                                Map<String, Object> taskParams, String callBackUrl,
                                                                Map<String, Object> callbackParams, String expiredUrl) {
        Map<String, Object> taskInfoMap = null;

        if (StringUtils.isNotBlank(devId)) {
            taskInfoMap = new HashMap<String, Object>();
            taskInfoMap.put("dev_id", devId);
			taskInfoMap.put("status", TASK_STATUS_INIT);

			Map<String, Object> callbackObj = new HashMap<String, Object>();
			callbackObj.put("expired_url", StringUtils.isNotBlank(expiredUrl) ? expiredUrl : DeviceTaskUtil.getDefaultApiExpiredUrl());
			callbackObj.put("callback_url", StringUtils.isNotBlank(callBackUrl) ? callBackUrl : DeviceTaskUtil.getDefaultApiCallbackUrl());

			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			calendar.set(Calendar.SECOND, calendar.get(Calendar.SECOND) + DEFAULT_EXPIRED_SEC.intValue());

			callbackObj.put("expired_time", DateUtil.formatToString(calendar.getTime(), DateUtil.YYYY_MM_DD_HH_MM));
			callbackObj.put("callback_data", callbackParams);
			taskInfoMap.put("callback", callbackObj);

            Map<String, Object> apiDeviceTaskMap = new HashMap<String, Object>();
            apiDeviceTaskMap.put("task_id", Long.toString(taskId));
            apiDeviceTaskMap.put("task_code", taskCode);
            apiDeviceTaskMap.put("task_params", taskParams == null ? StringUtils.EMPTY : taskParams);

            taskInfoMap.put("desc", apiDeviceTaskMap);
        }

        return taskInfoMap;
    }

	public static void taskPush(String devId, Long taskId, Map<String, Object> taskObj) {
		Jedis jedis = GET_REDIS_HANDLER();
        try {
            String taskParamStr = new Gson().toJson(taskObj);
            jedis.hset(TASK_INFO_HASH_KEY, taskId.toString(), taskParamStr);
            jedis.rpush(devId, taskId.toString());
            System.out.println("TWIFI_TASKINFO set result: " + taskParamStr);
        }
        finally {
            CLOSE_REDIS(jedis);
        }
	}
	///////////////////////////////////////////////////////////////
	// startup task
	// Task Format: {'dev_id':xx, active_task:{task_id, task_code}, start_tasks:[{task_id, task_code},…]}
	
	private static Map<String, Object> initialDeviceStartupTask(String deviceId) {

		Map<String, Object> taskInfo = new HashMap<String, Object>();
		taskInfo.put("dev_id", deviceId);
		taskInfo.put("active_task", new HashMap<String, String>());
		taskInfo.put("start_tasks", new ArrayList<Map<String, String>>());
		
		return taskInfo;
	}
    public static String generateAcitveApiTaskData(String devId, Long deviceOwnerId, Date activateDate) throws IOException {
		Map<String, Object> apiDeviceActiveMap = null;

        if (StringUtils.isNotBlank(devId) && deviceOwnerId != null && activateDate != null) {
            apiDeviceActiveMap = new HashMap<String, Object>();

            apiDeviceActiveMap.put("device_id", devId);
            apiDeviceActiveMap.put("account", deviceOwnerId.toString());
            apiDeviceActiveMap.put("active_date", DateUtil.formatToString(activateDate, DateUtil.YYYY_MM_DD_HH_MM_DASH));

            Map<String, Object> serversMap = new HashMap<String, Object>();

            List<Map<String, Object>> portals = new ArrayList<Map<String, Object>>();
            Map<String, Object> portal = new HashMap<String, Object>();
            portal.put("hostname", PropertiesUtil.confProperties.getProperty("server.portal.hostname"));
            portal.put("ssl_available", PropertiesUtil.confProperties.getProperty("server.portal.usessl"));
            portal.put("ssl_port", PropertiesUtil.confProperties.getProperty("server.portal.sslport"));
            portal.put("http_port", PropertiesUtil.confProperties.getProperty("server.portal.httpport"));
            portal.put("path", PropertiesUtil.confProperties.getProperty("server.portal.api10.path"));
            portals.add(portal);
            serversMap.put("portals", portals);

            List<Map<String, Object>> platforms = new ArrayList<Map<String, Object>>();
            Map<String, Object> platform = new HashMap<String, Object>();
            platform.put("hostname", PropertiesUtil.confProperties.getProperty("server.plat.hostname"));
            platform.put("ssl_available", PropertiesUtil.confProperties.getProperty("server.plat.usessl"));
            platform.put("ssl_port", PropertiesUtil.confProperties.getProperty("server.plat.sslport"));
            platform.put("http_port", PropertiesUtil.confProperties.getProperty("server.plat.httpport"));
            platform.put("path", PropertiesUtil.confProperties.getProperty("server.plat.api10.path"));
            platforms.add(platform);
            serversMap.put("platforms", platforms);

            List<Map<String, Object>> auths = new ArrayList<Map<String, Object>>();
            Map<String, Object> auth = new HashMap<String, Object>();
            auth.put("hostname", PropertiesUtil.confProperties.getProperty("server.auth.hostname"));
            auth.put("ssl_available", PropertiesUtil.confProperties.getProperty("server.auth.usessl"));
            auth.put("ssl_port", PropertiesUtil.confProperties.getProperty("server.auth.sslport"));
            auth.put("http_port", PropertiesUtil.confProperties.getProperty("server.auth.httpport"));
            auth.put("path", PropertiesUtil.confProperties.getProperty("server.auth.api10.path"));
            auths.add(auth);
            serversMap.put("auths", auths);
            apiDeviceActiveMap.put("servers", serversMap);
        }

		return new Gson().toJson(apiDeviceActiveMap);
    }

	@SuppressWarnings("unchecked")
	public static String setAcitveTask(/*String startupTasksString,*/ String taskId, String devId, Long deviceOwnerId, Date activateDate) throws IOException {
		Map<String, Object> startupTaskMap = null;
		Map<String, String> activeTaskMap = null;
        String startupTasksString = StringUtils.EMPTY;

		if (StringUtils.isBlank(startupTasksString)) {
			startupTaskMap = initialDeviceStartupTask(devId);
			activeTaskMap = (Map<String, String>) startupTaskMap.get("active_task");
		}
        // Deprecated
		else {
			startupTaskMap = new Gson().fromJson(startupTasksString, new TypeToken<Map<String, Object>>(){}.getType());
			
			String activeTaskString = startupTaskMap.get("active_task").toString();
			activeTaskMap = new Gson().fromJson(activeTaskString, new TypeToken<Map<String, String>>(){}.getType());

            startupTaskMap.put("active_task", activeTaskMap);

            // remove device startup task
//			String startTaskString = startupTaskMap.get("start_tasks").toString();
//			List<Map<String, String>> startTasksMap = new Gson().fromJson(startTaskString, new TypeToken<List<Map<String, String>>>(){}.getType());
//          startupTaskMap.put("start_tasks", startTasksMap);
		}

		// prepare task_code
		String scriptFullPath = PropertiesUtil.confProperties.getProperty("task.script.path") 
				+ File.separator + PropertiesUtil.confProperties.getProperty("task.script.activeDevice.filename");
		String scriptTemp = IoUtil.getBlockStringFromFile(scriptFullPath);
		
		scriptTemp = scriptTemp.replace("{%=" + "dev_id" + "%}", devId);
		scriptTemp = scriptTemp.replace("{%=" + "account_id" + "%}", deviceOwnerId.toString());
		scriptTemp = scriptTemp.replace("{%=" + "active_date" + "%}", DateUtil.formatToString(activateDate, DateUtil.YYYY_MM_DD_HH_MM));
		
		scriptTemp = scriptTemp.replace("{%=" + "auth_hostname" + "%}", PropertiesUtil.confProperties.getProperty("server.auth.hostname"));
		scriptTemp = scriptTemp.replace("{%=" + "auth_usessl" + "%}", PropertiesUtil.confProperties.getProperty("server.auth.usessl"));
		scriptTemp = scriptTemp.replace("{%=" + "auth_sslport" + "%}", PropertiesUtil.confProperties.getProperty("server.auth.sslport"));
		scriptTemp = scriptTemp.replace("{%=" + "auth_httpport" + "%}", PropertiesUtil.confProperties.getProperty("server.auth.httpport"));
		scriptTemp = scriptTemp.replace("{%=" + "auth_path" + "%}", PropertiesUtil.confProperties.getProperty("server.auth.path"));

		scriptTemp = scriptTemp.replace("{%=" + "plat_hostname" + "%}", PropertiesUtil.confProperties.getProperty("server.plat.hostname"));
		scriptTemp = scriptTemp.replace("{%=" + "plat_usessl" + "%}", PropertiesUtil.confProperties.getProperty("server.plat.usessl"));
		scriptTemp = scriptTemp.replace("{%=" + "plat_sslport" + "%}", PropertiesUtil.confProperties.getProperty("server.plat.sslport"));
		scriptTemp = scriptTemp.replace("{%=" + "plat_httpport" + "%}", PropertiesUtil.confProperties.getProperty("server.plat.httpport"));
		scriptTemp = scriptTemp.replace("{%=" + "plat_path" + "%}", PropertiesUtil.confProperties.getProperty("server.plat.path"));

		scriptTemp = scriptTemp.replace("{%=" + "portal_hostname" + "%}", PropertiesUtil.confProperties.getProperty("server.portal.hostname"));
		scriptTemp = scriptTemp.replace("{%=" + "portal_usessl" + "%}", PropertiesUtil.confProperties.getProperty("server.portal.usessl"));
		scriptTemp = scriptTemp.replace("{%=" + "portal_sslport" + "%}", PropertiesUtil.confProperties.getProperty("server.portal.sslport"));
		scriptTemp = scriptTemp.replace("{%=" + "portal_httpport" + "%}", PropertiesUtil.confProperties.getProperty("server.portal.httpport"));
		scriptTemp = scriptTemp.replace("{%=" + "portal_path" + "%}", PropertiesUtil.confProperties.getProperty("server.portal.path"));
		
		activeTaskMap.put("task_id", taskId);
		activeTaskMap.put("task_code", scriptTemp);
		startupTaskMap.put("active_task", activeTaskMap);
		
		System.out.println(scriptTemp);
		System.out.println("----------------------------------------------");
		System.out.println("----------------------------------------------");
		System.out.println(scriptTemp.indexOf('\n'));
		
		return new Gson().toJson(startupTaskMap);
	}

	public static void apiDeviceActivePush(String deviceId, String deviceInfoString){
        Jedis jedis = GET_REDIS_HANDLER();
        try {
            long result = jedis.hset(API_DEVICE_ACTIVE, deviceId, deviceInfoString);
            System.out.println("API_DEVICE_ACTIVE set result: " + deviceInfoString);
        }
        finally {
            CLOSE_REDIS(jedis);
        }
	}

	public static void startupTaskPush(String deviceId, String startupTaskString) {
		Jedis jedis = GET_REDIS_HANDLER();
        try {
            long result = jedis.hset(STARTUP_TASK_HASH_KEY, deviceId, startupTaskString);
		    System.out.println("STARTUP_TASK set result: " + result);
        } finally {
            CLOSE_REDIS(jedis);
        }
	}
	
	public static void userInfoPush(String token, String userInfo) {
		Jedis jedis = GET_REDIS_HANDLER();
        try {
            long result = jedis.hset(USER_INFO_KEY, token, userInfo);
            logger.info("result: " + result + " TWIFI_USERINFO set userInfo: " + userInfo);
        } finally {
            CLOSE_REDIS(jedis);
        }
	}
	
	/**
	 * 删除缓存中的用户信息。
	 * @param token
	 */
	public static void userInfoDel(String token){
		Jedis jedis = GET_REDIS_HANDLER();
        try {
            long result = jedis.hdel(USER_INFO_KEY, token);
            logger.info("result: " + result + " TWIFI_USERINFO del token: " + token);
        } finally {
            CLOSE_REDIS(jedis);
        }
	}
	
	////////////////////////////////////////////////////////////////////////////////
	// get info from redis
	
	public static Map<String, Object> getUserInfo(String userToken) {
		Map<String, Object> userInfo = null;
		String strUserInfo = StringUtils.EMPTY;
		if (StringUtils.isNotBlank(userToken)) {
			Jedis jedis = GET_REDIS_HANDLER();
			try {
                strUserInfo = jedis.hget(USER_INFO_KEY, userToken);
            } finally {
                CLOSE_REDIS(jedis);
            }
        }
		if(StringUtils.isNotBlank(strUserInfo)){
			userInfo = new Gson().fromJson(strUserInfo, new TypeToken<Map<String, Object>>(){}.getType());
		}
		return userInfo;
	}
	
	public static Map<String, Object> getDeviceInfo(String deviceId) {
		Map<String, Object> deviceInfo = null;
		String strDeviceInfo = StringUtils.EMPTY;

		if (StringUtils.isNotBlank(deviceId)) {
			Jedis jedis = GET_REDIS_HANDLER();
            try {
                strDeviceInfo = jedis.hget(DEVICE_INFO_KEY, deviceId);
            } finally {
                CLOSE_REDIS(jedis);
            }
            if(StringUtils.isNotBlank(strDeviceInfo)){
            	deviceInfo = new Gson().fromJson(strDeviceInfo, new TypeToken<Map<String, Object>>(){}.getType());
            }
			
		}
		return deviceInfo;
	}
	
	/**
	 * 把设备信息从数据库更新到redis
	 * @param deviceId
	 * @param deviceInfoNew
	 */
	public static void setDeviceInfo(String deviceId, String deviceJsonInfoNew) {
		if (StringUtils.isNotBlank(deviceId)) {
			Jedis jedis = GET_REDIS_HANDLER();
            try {
                jedis.hset(DEVICE_INFO_KEY, deviceId, deviceJsonInfoNew);
            } finally {
                CLOSE_REDIS(jedis);
            }
		}
	}
	
	public static void taskLpush(String portalPageId) {
        if (StringUtils.isNotBlank(portalPageId)) {
            Jedis jedis = GET_REDIS_HANDLER();
            try {
                jedis.lpush(TASK_THUMBNAIL_ARRAY_KEY, portalPageId);
            }
            finally {
                CLOSE_REDIS(jedis);
            }
        }
	}
	/**
	 * 添加授权token缓存。
	 * @param authId
	 * @param token
	 */
	public static void authTokenPush(String authId, String token) {
		Jedis jedis = GET_REDIS_HANDLER();
        try {
            long result = jedis.hset(AUTH_TOKEN_KEY, authId, token);
            logger.info("result: " + result + " TWIFI_AUTH_TOKEN set token: " + token);
        } finally {
            CLOSE_REDIS(jedis);
        }
	}
	/**
	 * 获取授权token。
	 * @param authId
	 * @return
	 */
	public static String getAuthToken(String authId) {
		String strAuthToken = StringUtils.EMPTY;

		if (StringUtils.isNotBlank(authId)) {
			Jedis jedis = GET_REDIS_HANDLER();
            try {
                strAuthToken = jedis.hget(AUTH_TOKEN_KEY, authId);
            } finally {
                CLOSE_REDIS(jedis);
            }
		}
		return strAuthToken;
	}
	/**
	 * 删除授权token缓存。
	 * @param authId
	 */
	public static void authTokenDel(String authId){
		Jedis jedis = GET_REDIS_HANDLER();
        try {
            long result = jedis.hdel(AUTH_TOKEN_KEY, authId);
            logger.info("result: " + result + " TWIFI_AUTH_TOKEN del authid: " + authId);
        } finally {
            CLOSE_REDIS(jedis);
        }
	}
	
	/**
	 * 存放缓存数据
	 * @param key
	 * @param obj
	 */
	public static void setStatisCache(String key, Map<String, Object> dataMap) {
		if (StringUtils.isNotBlank(key)) {
			Jedis jedis = GET_REDIS_HANDLER();
            try {
//              jedis.hset(STATIS_CACHE_KEY, key, new Gson().toJson(obj));
                jedis.setex(STATIS_CACHE_KEY+key, 86400, new Gson().toJson(dataMap));
            } finally {
                CLOSE_REDIS(jedis);
            }
		}
	}
	
	/**
	 * 获取缓存数据
	 * @param key
	 * @return
	 */
	public static Map<String,Object> getStatisCache(String key) {
		String objStr = null;
		Map<String,Object> cacheMap = null;
		if (StringUtils.isNotBlank(key)) {
			Jedis jedis = GET_REDIS_HANDLER();
            try {
                objStr = jedis.get(STATIS_CACHE_KEY+key);
                cacheMap = new Gson().fromJson(objStr, new TypeToken<Map<String, Object>>(){}.getType());
            } finally {
                CLOSE_REDIS(jedis);
            }
		}
		return cacheMap;
	}
	
	public static void main(String[] args) {
		 Jedis jedis = new Jedis("192.168.3.196");
//		 List list = jedis.lrange(TASK_THUMBNAIL_ARRAY_KEY, 0, -1);
//       for(int i=0; i<list.size();i++){
//       	jedis.rpop(TASK_THUMBNAIL_ARRAY_KEY);
//       }
//       System.out.println(list.size());
		 

		 jedis.hget(DEVICE_INFO_KEY, "sdfsdfssfd");
		 getDeviceInfo("sdfsdfssfd");
	}
}
