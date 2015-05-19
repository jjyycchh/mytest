package com.access.core.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import org.apache.commons.lang3.StringUtils;

import com.access.core.constant.Constants;

public class SmsSendUtil {
	
	
	/**
	 * 发送短信*l*
	 * @param phoneNumber
	 * @param content
	 * @param sms_gateway
	 * @return
	 * @throws IOException
	 */
	public static String sendSms(String phoneNumber, String content, String sms_gateway) throws IOException {
		String returnMessage = "";
		
		if (StringUtils.isNotBlank(phoneNumber) && StringUtils.isNotBlank(content)) {
			
			// 短信网关为空时，设置默认网关
			if (StringUtils.isBlank(sms_gateway)) {
				sms_gateway = Constants.SMS_GATEWAY;
			}
			
			// 构建短信请求网络路径
			String strUrl = String.format(sms_gateway, phoneNumber, URLEncoder.encode(content, "UTF-8"));

	        URL url = new URL(strUrl);
	        URLConnection conn = url.openConnection();
	        conn.setDoOutput(true);
	        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	        String line;
	        
	        while ((line = br.readLine()) != null) {
	        	returnMessage += line;
	        }
	        br.close();
//	        OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
//	        wr.write(data);
//	        wr.flush();
//	        System.out.println("===============================");
//	        System.out.println("URL: " + strUrl);
//	        System.out.println("ret_str:" + returnMessage);
//	        System.out.println("===============================");
			  //wr.close();
	        
		}
		
		return returnMessage;
	}
}
