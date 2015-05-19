package com.alipay.util.httpClient;

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

import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;


/* *
 *类名：HttpRequest
 *功能：Http请求对象的封装
 *详细：封装Http请求
 *版本：3.3
 *日期：2011-08-17
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class HttpRequest {

    /** HTTP GET method */
    public static final String METHOD_GET        = "GET";

    /** HTTP POST method */
    public static final String METHOD_POST       = "POST";

    /**
     * 待请求的url
     */
    private String             url               = null;

    /**
     * 默认的请求方式
     */
    private String             method            = METHOD_POST;

    private int                timeout           = 0;

    private int                connectionTimeout = 0;

    /**
     * Post方式请求时组装好的参数值对
     */
    private NameValuePair[]    parameters        = null;

    /**
     * Get方式请求时对应的参数
     */
    private String             queryString       = null;

    /**
     * 默认的请求编码方式
     */
    private String             charset           = "GBK";

    /**
     * 请求发起方的ip地址
     */
    private String             clientIp;

    /**
     * 请求返回的方式
     */
    private HttpResultType     resultType        = HttpResultType.BYTES;

    public HttpRequest(HttpResultType resultType) {
        super();
        this.resultType = resultType;
    }

    /**
     * @return Returns the clientIp.
     */
    public String getClientIp() {
        return clientIp;
    }

    /**
     * @param clientIp The clientIp to set.
     */
    public void setClientIp(String clientIp) {
        this.clientIp = clientIp;
    }

    public NameValuePair[] getParameters() {
        return parameters;
    }

    public void setParameters(NameValuePair[] parameters) {
        this.parameters = parameters;
    }

    public String getQueryString() {
        return queryString;
    }

    public void setQueryString(String queryString) {
        this.queryString = queryString;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public int getConnectionTimeout() {
        return connectionTimeout;
    }

    public void setConnectionTimeout(int connectionTimeout) {
        this.connectionTimeout = connectionTimeout;
    }

    public int getTimeout() {
        return timeout;
    }

    public void setTimeout(int timeout) {
        this.timeout = timeout;
    }

    /**
     * @return Returns the charset.
     */
    public String getCharset() {
        return charset;
    }

    /**
     * @param charset The charset to set.
     */
    public void setCharset(String charset) {
        this.charset = charset;
    }

    public HttpResultType getResultType() {
        return resultType;
    }

    public void setResultType(HttpResultType resultType) {
        this.resultType = resultType;
    }
    
    /*##########################################################*/
    private static Logger logger = LoggerFactory.getLogger(HttpRequest.class);
    private static int CONN_TIMEOUT = 3 * 1000; //连接延时
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
        for (Map.Entry<String, String> entry : params.entrySet()) {
            sb.append(entry.getKey()).append('=').append(
                      URLEncoder.encode(entry.getValue(), ENCODE_UTF8)).append('&');
        }
        int idx = path.indexOf("?");
        if( idx > -1){
        	sb.append(path.substring(idx+1));
        	path = path.substring(0,idx);
        }
//        if(sb.length() > 0){
//        	sb.deleteCharAt(sb.length() - 1);
//        }
        
        byte[] entityData = sb.toString().getBytes();
        logger.debug("http post send, url({}), params({})", path, sb);
        return sendPostRequest(path, entityData);
	}
	
	/**
	 * post请求json
	 * @param path
	 * @param params
	 * @return
	 * @throws IOException
	 */
	public static InputStream sendPostJsonRequest(String path, Map<String, String> params) throws IOException{
	    //
		String jsonParams = new Gson().toJson(params);
        StringBuilder sb = new StringBuilder();
        sb.append(jsonParams);
        int idx = path.indexOf("?");
        if( idx > -1){
        	sb.append(path.substring(idx+1));
        	path = path.substring(0,idx);
        }
//        if(sb.length() > 0){
//        	sb.deleteCharAt(sb.length() - 1);
//        }
        
        byte[] entityData = sb.toString().getBytes();
        logger.debug("http post send, url({}), params({})", path, sb);
        return sendPostRequest(path, entityData);
	}
	
	public static InputStream sendPostRequest(String path, byte[] body) throws IOException{
	    URL url = new URL(path);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type",
                "application/x-www-form-urlencoded");
        conn.setRequestProperty("Content-Length",
                String.valueOf(body.length));
        conn.setConnectTimeout(CONN_TIMEOUT);
        
        OutputStream outputStream = conn.getOutputStream();
        outputStream.write(body);
        outputStream.flush();
        outputStream.close();
        
        logger.debug("http response code ({})...", conn.getResponseCode());
        if (conn.getResponseCode() == 200) {
            return conn.getInputStream();
        }else{
            ByteBuffer buff = parseInputStream(conn.getErrorStream());
            logger.error("http request error. {}", new String(buff.array(), ENCODE_UTF8));
        }
        return null;
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
