package com.access.core.util;

import org.apache.commons.lang.StringUtils;

public class MacUtil {
	
	/**
	 * 把 冒号，点号，下划线，中划线和空格（":._- "） 转换为空字符串 ("")
	 * @param org_mac
	 * @return
	 */
    public static String convertMacToTwifiFormat(String org_mac) {
        String formatted_mac = org_mac;

        if (StringUtils.isNotBlank(formatted_mac)) {
            formatted_mac = formatted_mac.toUpperCase().replace(":", "").replace("-", "").replace(".", "").replace("_", "").replace(" ","");

        }

        return formatted_mac;
    }
}
