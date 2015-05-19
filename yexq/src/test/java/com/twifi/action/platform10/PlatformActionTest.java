package com.twifi.action.platform10;

import java.net.URLEncoder;

import org.junit.Test;

import action.StrutsBaseTest;

import com.opensymphony.xwork2.ActionProxy;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;

public class PlatformActionTest extends StrutsBaseTest{
	
//	@Test
//	public void testSendCode() throws Exception {
//        request.setParameter("auth_id", "15158881212");
//        request.setParameter("ter_mac", "00:21:cc:69:6f:62");
//        request.setParameter("dev_id", "0187e2fe-dc2e-4f32-b0ed-1567af076bfb");
//        request.setParameter("auth_type", "APPMOBILE");
//    	
////    	String result =  executeAction("/com/access/action/platform10!appheartbeat.action");
//    	ActionProxy proxy = getActionProxy("/platform10/sendcode-p.htm"); //action url，可以写扩展名".action"也可以干脆不写  
//    	proxy.execute();
//    	PlatformAction action = (PlatformAction) proxy.getAction();
//    	System.out.println(action.getResultMap());
//	}
//	
//	@Test
//	public void testUserAuth() throws Exception {
//        request.setParameter("auth_id", "15158881212");
//        request.setParameter("auth_code", "499081");
//        request.setParameter("auth_type", "APPMOBILE");
//        request.setParameter("ter_mac", "00:21:cc:69:6f:62");
//        request.setParameter("dev_id", "0187e2fe-dc2e-4f32-b0ed-1567af076bfb");
//        request.setParameter("browser_type", "UC");
//        request.setParameter("terminal_type", "IOS");
//    	
////    	String result =  executeAction("/com/access/action/platform10!appheartbeat.action");
//    	ActionProxy proxy = getActionProxy("/platform10/login-p.htm"); //action url，可以写扩展名".action"也可以干脆不写  
//    	PlatformAction action = (PlatformAction) proxy.getAction();
//    	proxy.execute();
//    	System.out.println(action.getResultMap());
//	}
//	
//	@Test
//    public void testAccessToken() throws Exception {
//    	request.setParameter("auth_id", "15158881212");
//    	request.setParameter("app_unqid", "2.1");
//    	request.setParameter("auth_type", "APPMOBILE");
//    	request.setParameter("ter_mac", "00:21:cc:69:6f:62");
//    	request.setParameter("ter_ip", "192.168.4.111");
//    	request.setParameter("imei", "123456");
//    	request.setParameter("terminal_type", "ios");
//    	request.setParameter("platform_code", "RADIUS-RADIUS-20141023-0f17d60f");
//    	
////    	String result =  executeAction("/com/access/action/platform10!appheartbeat.action");
//    	ActionProxy proxy = getActionProxy("/platform10/token.htm"); //action url，可以写扩展名".action"也可以干脆不写  
//    	PlatformAction action = (PlatformAction) proxy.getAction();
//    	proxy.execute();
//    	System.out.println(action.getResultMap());
//    }
//	
//	@Test
//    public void testAppAuth() throws Exception {
//    	request.setParameter("auth_id", "15158881212");
//    	request.setParameter("app_unqid", "2.1");
//    	request.setParameter("auth_type", "APPMOBILE");
//    	request.setParameter("ter_mac", "00:21:cc:69:6f:62");
//    	request.setParameter("ter_ip", "192.168.4.111");
//    	request.setParameter("imei", "123456");
//    	request.setParameter("terminal_type", "ios");
//    	request.setParameter("appauth_type", "THIRD_AUTH");
//    	request.setParameter("platform_code", "RADIUS-RADIUS-20141023-0f17d60f");
//    	request.setParameter("token", "/rU9D8+w1/61eA6TXY5jpw++");
//    	request.setParameter("redirect_params", URLEncoder.encode("a=123&b=345&c=567"));
//    	
////    	String result =  executeAction("/com/access/action/platform10!appheartbeat.action");
//    	ActionProxy proxy = getActionProxy("/platform10/appauth.htm"); //action url，可以写扩展名".action"也可以干脆不写  
//    	PlatformAction action = (PlatformAction) proxy.getAction();
//    	proxy.execute();
//    	System.out.println(action.getResultMap());
//    }
//	
//    @Test
//    public void testAppheartbeat() throws Exception {
//    	request.setParameter("auth_id", "15158881212");
//    	request.setParameter("app_unqid", "2.1");
//    	request.setParameter("auth_type", "MOBILE");
//    	request.setParameter("platform_code", "RADIUS-RADIUS-20141023-0f17d60f");
//    	request.setParameter("token", "token");
//    	request.setParameter("seq", "143535");
////    	String result =  executeAction("/com/access/action/platform10!appheartbeat.action");
//    	ActionProxy proxy = getActionProxy("/platform10/appheartbeat.htm"); //action url，可以写扩展名".action"也可以干脆不写  
//    	PlatformAction action = (PlatformAction) proxy.getAction();
//    	proxy.execute();
//    	System.out.println(action.getResultMap());
//    }
//    
//    @Test
//    public void testUseroffline() throws Exception {
//    	request.setParameter("auth_type", "APPMOBILE");
//    	request.setParameter("appauth_type", "THIRD_AUTH");
//    	request.setParameter("platform_code", "RADIUS-RADIUS-20141023-0f17d60f");
//    	request.setParameter("token", "/rU9D8+w1/61eA6TXY5jpw++");
//    	request.setParameter("redirect_params", URLEncoder.encode("a=123&b=345&c=567"));
////    	String result =  executeAction("/com/access/action/platform10!appheartbeat.action");
//    	ActionProxy proxy = getActionProxy("/platform10/useroffline.htm"); //action url，可以写扩展名".action"也可以干脆不写  
//    	PlatformAction action = (PlatformAction) proxy.getAction();
//    	proxy.execute();
//    	System.out.println(action.getResultMap());
//    }
//    
//    @Test
//    public void testSsidlists() throws Exception {
//    	ActionProxy proxy = getActionProxy("/platform10/ssidlists.htm"); //action url，可以写扩展名".action"也可以干脆不写  
//    	PlatformAction action = (PlatformAction) proxy.getAction();
//    	proxy.execute();
//    	System.out.println(action.getResultMap());
//    }
//    
//    @Test
//    public void testAppAuthRun() throws Exception {
//    	request.setParameter("auth_id", "15158881212");
//        request.setParameter("ter_mac", "00:21:cc:69:6f:62");
//        request.setParameter("dev_id", "0187e2fe-dc2e-4f32-b0ed-1567af076bfb");
//        request.setParameter("auth_type", "MOBILE");
//    	
////    	String result =  executeAction("/com/access/action/platform10!appheartbeat.action");
//    	ActionProxy proxy = getActionProxy("/platform10/sendcode-p.htm"); //action url，可以写扩展名".action"也可以干脆不写  
//    	proxy.execute();
//    	PlatformAction action = (PlatformAction) proxy.getAction();
//    	System.out.println(action.getResultMap());
//    	
//    	request.clearAttributes();
//    	request.setParameter("auth_id", "15158881212");
//        request.setParameter("auth_code", "");
//        request.setParameter("auth_type", "MOBILE");
//        request.setParameter("ter_mac", "00:21:cc:69:6f:62");
//        request.setParameter("dev_id", "0187e2fe-dc2e-4f32-b0ed-1567af076bfb");
//        request.setParameter("browser_type", "UC");
//        request.setParameter("terminal_type", "IOS");
//    	
////    	String result =  executeAction("/com/access/action/platform10!appheartbeat.action");
//    	proxy = getActionProxy("/platform10/login-p.htm"); //action url，可以写扩展名".action"也可以干脆不写  
//    	action = (PlatformAction) proxy.getAction();
//    	proxy.execute();
//    	System.out.println(action.getResultMap());
//    }
}
