package action;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;


import org.apache.struts2.StrutsSpringTestCase;

public class AuthenticationActionTest extends StrutsSpringTestCase {
	
	/**
	 * 添加第三方应用测试
	 * *//*
	public void testNewThirdApplication() throws Exception {
		request.addParameter("name", "测试对接平台名称");
		request.addParameter("version", "1.0.0");
		request.addParameter("description", "测试对接平台描述");
		request.addParameter("app_id", "testAppId");
		request.addParameter("app_key", "testAppKey");
		request.addParameter("url", "测试平台地址");
		request.addParameter("interface_url", "测试平台接口地址");
		request.setMethod("POST");
		
		ActionProxy proxy = getActionProxy("/authentication/newthirdapplication.htm");
		AuthenticationAction action = (AuthenticationAction) proxy.getAction();
        assertNotNull(action);
        String result = proxy.execute();
        String data = response.getContentAsString();
        System.err.println(data);
        System.err.println("======="+result);
	}*/
	
	/**
	 * 修改第三方应用测试
	 * *//*
	public void testModifyThirdApplication() throws Exception {
		request.addParameter("id", "1");
		request.addParameter("name", "修改平台名称");
		request.addParameter("version", "1.0.0");
		request.addParameter("description", "修改对接平台描述");
		request.addParameter("app_id", "testAppId");
		request.addParameter("app_key", "testAppKey");
		request.addParameter("url", "测试平台地址");
		request.addParameter("interface_url", "测试平台接口地址");
		request.setMethod("POST");
		
		ActionProxy proxy = getActionProxy("/authentication/modifythirdapplication.htm");
		AuthenticationAction action = (AuthenticationAction) proxy.getAction();
        assertNotNull(action);
        String result = proxy.execute();
        String data = response.getContentAsString();
        System.err.println(data);
        System.err.println("======="+result);
	}*/
	
	/**
	 * 发布第三方应用测试
	 * *//*
	public void testPublishThirdApplication() throws Exception {
		request.addParameter("id", "1");
		request.setMethod("POST");
		
		ActionProxy proxy = getActionProxy("/authentication/publishthirdapplication.htm");
		AuthenticationAction action = (AuthenticationAction) proxy.getAction();
        assertNotNull(action);
        String result = proxy.execute();
        String data = response.getContentAsString();
        System.err.println(data);
        System.err.println("======="+result);
	}*/
	
/*	*//**
	 * 下架第三方应用测试
	 * *//*
	public void testDeleteThirdApplication() throws Exception {
		request.addParameter("id", "1");
		request.setMethod("POST");
		
		ActionProxy proxy = getActionProxy("/authentication/deletethirdapplication.htm");
		AuthenticationAction action = (AuthenticationAction) proxy.getAction();
        assertNotNull(action);
        String result = proxy.execute();
        String data = response.getContentAsString();
        System.err.println(data);
        System.err.println("======="+result);
	}*/
	
	/**
	 * 第三方应用删除测试方法
	 * 
	 * @throws Exception
	 *//*
	public void testDeleteThirdApplication() throws Exception {
		request.addParameter("thirdappid", "5");
		request.setMethod("POST");
		
		ActionProxy proxy = getActionProxy("/authentication/merchantdelthirdapplication.htm");
		AuthenticationAction action = (AuthenticationAction) proxy.getAction();
		assertNotNull(action);
        String result = proxy.execute();
        String data = response.getContentAsString();
        System.err.println(data);
        System.err.println("======="+result);
	}*/
	
	/**
	 * 测试DES加密
	 * *//*
	public void testEncryptByDes() {
		String data = "abcdefgh";
		String key = "abcdefgh";
		AuthenticationAction action = new AuthenticationAction();
		try {
			String encryptResult = action.encryptByDes(data, key);
			System.err.println(encryptResult);
			System.err.println(action.decryptByDes(encryptResult, key));
		} catch(Exception e) {
			e.printStackTrace();
		}
	}*/
	
	/**
	 * 测试token计算
	 * *//*
	public void testGenerateToken() {
		AuthenticationAction action = new AuthenticationAction();
		try {
			String param1 = "app_id";
			String param2 = "app_key";
			String param3 = "timestamp";
			System.err.println(action.generateToken(param1, param2, param3));
			System.err.println(action.generateToken(param1, param2, param3));
		} catch(Exception e) {
			e.printStackTrace();
		}
	}*/
	
	/**
	 * 测试方法——端到端的请求
	 * */
	public static void getResultFromUrl() {
		String strUrl = "http://localhost:9090/authentication/searchthirdapplication.htm";
		try {
			/*URL url = new URL(strUrl);
	        URLConnection conn = url.openConnection();
	        conn.setDoOutput(true);
	        //OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
	        //wr.write(data);
	        //wr.flush();
	        // Get the response
	        BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	        String line;
	        String returnMessage = "";
	        while ((line = rd.readLine()) != null) {
	        	returnMessage += line;
	        }*/
	        
			URL url = new URL("http://localhost:9090/authentication/searchthirdapplication.htm");  
//			URL url = new URL("http://localhost:9090");
            // URL对象的openStream() 方法返回的是一个InputStream输入流  
            InputStream is = url.openStream();  
  
            /* 
             * 读取输入流并且转化成为BufferedReader, 利用BufferedReader的rendLine()方法读出内容 
             */  
            InputStreamReader isr = new InputStreamReader(is);  
            BufferedReader bf = new BufferedReader(isr);  
            String str;  
            while ((str = bf.readLine()) != null) {  
                System.out.println(str);  
            }  
	        
	        
	        /*System.out.println("===============================");
	        System.out.println("URL: " + strUrl);
	        System.out.println("ret_str:" + returnMessage);
	        System.out.println("===============================");
			  //wr.close();
	        rd.close();*/
		} catch(Exception e) {
			e.printStackTrace();
		}
        
	}
	
	
	public static void main(String[] args) {
		getResultFromUrl();
	}
}
