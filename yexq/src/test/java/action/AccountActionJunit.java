package action;

import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpSession;
import org.apache.struts2.StrutsSpringTestCase;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.util.DigestUtils;
import com.access.action.account.AccountAction;
import com.access.action.api10.ApiAction;
import com.access.core.constant.Constants;
import com.access.core.util.StringUtil;
import com.access.model.account.AccountWithBLOBs;
import com.access.model.account.Permission;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionProxy;
public class AccountActionJunit extends StrutsSpringTestCase{

	

//	public void atestLogin() throws Exception {
//		/*HttpSession  session = new MockHttpSession();
//		String sessionId = UUID.randomUUID().toString();
//		session.setAttribute("sessionId", sessionId);
//		request.setSession(session);
//		ActionProxy proxy = getActionProxy("/account/login.htm");
//		assertNotNull(proxy);
//		AccountAction action = (AccountAction) proxy.getAction();
//		assertNotNull(action);
//		String result = proxy.execute();
//		assertEquals(Action.SUCCESS, result);*/
//
//		
//
//      	AccountWithBLOBs account = new AccountWithBLOBs();
//		account.setId(1L);
//		account.setUsername("superadmin");
//		HttpSession  session = new MockHttpSession();
//		String sessionId = UUID.randomUUID().toString();
//		session.setAttribute("sessionId", sessionId);
//		session.setAttribute(Constants.LOGIN_ACCOUNT_INFO, account);
//		request.setSession(session);
//		ActionProxy proxy2 = getActionProxy("/account/login.htm");
//		assertNotNull(proxy2);
//		AccountAction action2 = (AccountAction) proxy2.getAction();
//		assertNotNull(action2);
//		String result2 = proxy2.execute();
//		String data = response.getContentAsString();
//        System.err.println(data);
////		assertEquals("redirect_main_base", result2);
//	}
//	
//
//	public void atestLoginValidate() throws Exception{
//		request.addParameter("account.username", "superadmin1");
//		request.addParameter("account.password", DigestUtils.md5DigestAsHex("superadmin".getBytes("UTF-8")));
//		ActionProxy proxy = getActionProxy("/account/login_validate.htm");
//		assertNotNull(proxy);
//        AccountAction action = (AccountAction) proxy.getAction();
//        assertNotNull(action);
//        String result = proxy.execute();
//        
//        String data = response.getContentAsString();
//        System.err.println(data);
//        
//        assertEquals(Action.SUCCESS, result);
//	}
//	
//	/**
//	 * 账户注册-验证用户名
//	 */
//	public void atestUsernameValidate() throws Exception{
//		request.addParameter("username", "zhangsan");
//		ActionProxy proxy = getActionProxy("/account/usernamevalidation.htm");
////		assertNotNull(proxy);
//        AccountAction action = (AccountAction) proxy.getAction();
//        assertNotNull(action);
//        String result = proxy.execute();
//        String data = response.getContentAsString();
//        System.err.println(data);
//        System.err.println("======="+result);
//	}
//
//	
//	/**
//	 * 账户注册
//	 */
//	public void atestSaveaccount() throws Exception{
//		request.addParameter("account.username", "wangwu");
//		request.addParameter("account.password", StringUtil.getMd5Str("123456"));
//		request.addParameter("account.email", "123123@qq.com");
//		request.addParameter("account.cellNumber", "15911111111");
//		request.addParameter("account.merchantName","新注册商户");
//		request.addParameter("account.merchantDescription", "新注册商户描述");
//		request.addParameter("account.geoLocation","");
//		
//		ActionProxy proxy = getActionProxy("/account/saveaccount.htm");
////		assertNotNull(proxy);
//        AccountAction action = (AccountAction) proxy.getAction();
//        assertNotNull(action);
//        String result = proxy.execute();
//        String data = response.getContentAsString();
//        System.err.println(data);
//        System.err.println("======="+result);
//	}
//	
//	
//	/**
//	 * 帐号查询帐号标签
//	 */
//	public void testAccountTags() throws Exception{
///*		AccountWithBLOBs account = new AccountWithBLOBs();
//		account.setId(1L);
//		account.setUsername("superadmin");
//		account.setPassword(StringUtil.getMd5Str("iwifi123!@#"));
//		account.setType(Constants.ACCOUNT_TYPE_SUPER_MAN_EN);
//		account.setPermissions(Constants.accountPermCodeMap.get(account.getType()));
//		
////		HttpSession  session = new MockHttpSession();  
////		String sessionId = UUID.randomUUID().toString();  
////		session.setAttribute(Constants.LOGIN_ACCOUNT_INFO, account);
////		request.setSession(session);
//		request.getSession().setAttribute(Constants.LOGIN_ACCOUNT_INFO, account);*/
//		
//		loginValidate();
//		request.addParameter("accountid", "1");
//		ActionProxy proxy = getActionProxy("/account/account_tags.htm");
////		assertNotNull(proxy);
//        AccountAction action = (AccountAction) proxy.getAction();
//        assertNotNull(action);
//        String result = proxy.execute();
//        String data = response.getContentAsString();
//        System.err.println(data);
//        System.err.println("======="+result);
//        
//        
//      //测试ajax的类，s为response里的输出数据，若没有返回值为空字符串
////      String s = executeAction("/account/usernamevalidation.htm");
////      System.err.println("------"+s);
////      String data = response.getContentAsString();
////      System.err.println(data);
////      assertEquals(Action.SUCCESS, result);
//	}
//	
//	
//	public void loginValidate() throws Exception{
//		request.addParameter("account.username", "superadmin");
//		request.addParameter("account.password", DigestUtils.md5DigestAsHex("iwifi123!@#".getBytes("UTF-8")));
//		ActionProxy proxy = getActionProxy("/account/login_validate.htm");
//		assertNotNull(proxy);
//        AccountAction action = (AccountAction) proxy.getAction();
//        assertNotNull(action);
//        String result = proxy.execute();
//        System.err.println("---------LOGIN:"+result);
////        String data = response.getContentAsString();
//	}
//	
//	public void testGetNewMerchantAccount() throws Exception {
//		request.addParameter("username", "a1111111111");
//		request.addParameter("email", "1@2.com");
//		request.addParameter("cell_number", "15305712912");
//		request.addParameter("merchant_name", "商户");
//		request.addParameter("merchant_description", "商户");
//		request.addParameter("province", "浙江");
//		request.addParameter("city", "杭州");
//		request.addParameter("county", "西湖");
//		request.addParameter("address", "");
//		request.addParameter("fullname", "商户");
//		ActionProxy proxy = getActionProxy("/account/getnewmerchantaccount.htm");
//		assertNotNull(proxy);
//        AccountAction action = (AccountAction) proxy.getAction();
//        assertNotNull(action);
//        String result = proxy.execute();
//        String data = response.getContentAsString();
//        System.err.println(data);
//        System.out.println("---------"+result);
//	}
//	/*
//	public void testssidlists() throws Exception{
//		ActionProxy proxy = getActionProxy("/api10/ssidlists.htm");
////		assertNotNull(proxy);
//        ApiAction action = (ApiAction) proxy.getAction();
//        assertNotNull(action);
//        String result = proxy.execute();
//        String data = response.getContentAsString();
//        System.err.println(data);
//        System.err.println("======="+result);
//	}
//
//	public void userPsdModify(){
//		System.out.println(StringUtil.getMd5Str("123456"));
//	}*/
//	
//	public static void main(String[] args){
//		System.out.println(StringUtil.getMd5Str("123456"));
//	}
//	
}
