package com.access.core.commons;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 类HttpRequest.java的实现描述：
 * http 请求工具类 
 * @author liuhualuo@163.com 2014-3-13 下午5:08:31
 */
public class HttpRequest {
    private static Logger logger = LoggerFactory.getLogger(HttpRequest.class);
    private static int CONN_TIMEOUT = 5 * 1000; //连接延时
    private static String ENCODE_UTF8 = "UTF-8";
    
	/**
	 * Post请求
	 * @param path
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public static boolean sendRequest(String requestMethod, String path, Map<String, String> params) throws Exception {
	    InputStream inputStream = null;
	    if(StringUtils.isBlank(requestMethod)){
	        logger.warn("request method is not null.({})", requestMethod);
	        return false;
	    }else if( "post".equals(requestMethod.toLowerCase()) ){
	        inputStream = sendPostRequest(path, params);
	    }else if( "get".equals(requestMethod.toLowerCase()) ){
//            inputStream = sendGetRequest(path, params);
        }else{
            logger.warn("request method must equal (post or get). but it's ({})", requestMethod);
            return false;
        }
		if (inputStream != null) {
		    ByteBuffer buff = parseInputStream(inputStream);
		    if(logger.isDebugEnabled()){
		        logger.debug(new String(buff.array(), ENCODE_UTF8));
		    }
			return true;
		}
		return false;
	}
	
	public static InputStream sendPostRequest(String path, Map<String, String> params) throws IOException{
	    //拼装请求参数
        StringBuilder sb = new StringBuilder();
        String paramString = "";
        for (Map.Entry<String, String> entry : params.entrySet()) {
            sb.append(entry.getKey()).append('=').append(
                      URLEncoder.encode(entry.getValue(), ENCODE_UTF8)).append('&');
        }
        int idx = path.indexOf("?");
        if( idx > -1){
        	sb.append(path.substring(idx+1));
        	path = path.substring(0,idx);
        }else {
        	if(sb.length() > 1) {
        		paramString = sb.substring(0, sb.length()-1);
        	}
        }
//        if(sb.length() > 0){
//        	sb.deleteCharAt(sb.length() - 1);
//        }
        
        byte[] entityData = paramString.getBytes();
        logger.debug("http post send, url({}), params({})", path, paramString);
        return sendPostRequest(path, entityData);
	}
	
	public static InputStream sendPostRequest(String path, byte[] body) throws IOException{
	    URL url = new URL(path);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("Content-Length", String.valueOf(body.length));
        conn.setConnectTimeout(CONN_TIMEOUT);
        
        OutputStream outputStream = conn.getOutputStream();
        outputStream.write(body);
        outputStream.flush();
        outputStream.close();
        
        InputStream inputStream = null;
        logger.debug("http response code ({})...", conn.getResponseCode());
        if (conn.getResponseCode() == 200) {
        	inputStream = conn.getInputStream();
        	
        }else{
        	if(conn.getErrorStream()!= null){
        		ByteBuffer buff = parseInputStream(conn.getErrorStream());
                logger.error("http request error. {}", new String(buff.array(), ENCODE_UTF8));
        	}else {
        		logger.error("http request error. {}", "向radius注册用户失败");
        	}
        }
        return inputStream;
	}
	
	/**
	 * 将inputStream 读取 成 ByteBuffer。
	 * @param inputStream
	 * @throws IOException 
	 */
	public static ByteBuffer parseInputStream(InputStream inputStream) throws IOException{
	    DataInputStream inStream = new DataInputStream(inputStream);
	    ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] byts = new byte[1024];
        int len = 0;
        while ( (len = inStream.read(byts)) >= 0 ) {
        	outStream.write(byts, 0, len);
        }
        inStream.close();
        return ByteBuffer.wrap(outStream.toByteArray());
	}
	
	/**
     * 客户端用Get方法向服务器提交请求,并获取服务器响应信息
     * @param path
     * @param params
     */
    public static ByteBuffer sendGetRequest(String path, Map<String, String> params) {
        try {
            StringBuilder sb = new StringBuilder();
            if(params != null && params.size() > 0){
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    sb.append(entry.getKey()).append('=').append(
                              URLEncoder.encode(entry.getValue(), ENCODE_UTF8)).append('&');
                }
                sb.deleteCharAt(sb.length() - 1);
            }
            URL url = (path.indexOf("?") > -1) ? new URL(path + "&" + sb.toString())
            						: new URL(path + "?" + sb.toString());
            HttpURLConnection httpUrlConn = (HttpURLConnection) url.openConnection();
            // 默认情况下是false;
            httpUrlConn.setDoOutput(false);
            // 设置是否从httpUrlConnection读入，默认情况下是true
            httpUrlConn.setDoInput(true);
            // Get 请求不能使用缓存
            httpUrlConn.setUseCaches(false);
            // 设定请求的方法为"GET"，默认是GET
            httpUrlConn.setRequestMethod("GET");
            return parseInputStream(httpUrlConn.getInputStream());
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return null;
    }
	
    /**
     * 从输入流中读入数据
     * @param in
     */
    public static String readBuffer(InputStreamReader in) {
        BufferedReader reader = new BufferedReader(in);
        try {
            String line = "";
            StringBuffer sb = new StringBuffer();
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            return StringUtils.trimToEmpty(sb.toString());
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }finally{
            try {
                reader.close();
            } catch (IOException e) {
                logger.error(e.getMessage(), e);
            }
        }
        return "";
    }
    
}
