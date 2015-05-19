package com.access.filter;

import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.access.core.constant.Constants;
import com.access.model.account.AccountWithBLOBs;


/**
 * @description 权限控制过滤器
 * @ClassName ACLFilter
 * @CreateDate 2014-3-27
 */
public class ACLFilter implements Filter {
	private static String CONTEXT_PATH = "/access_cloud";
	private static List<String> EXCEPT_URIS = null;
	private Logger log = Logger.getLogger(ACLFilter.class);  
	
	/**
	 * Ajax请求header中的标识名和值
	 */
	private static String AJAX_REQUEST_HEADER_NAME = "x-requested-with";
	private static String AJAX_REQUEST_HEADER_VALUE = "XMLHttpRequest";

	public void init(FilterConfig filterConfig) throws ServletException {
		CONTEXT_PATH = filterConfig.getServletContext().getContextPath();
		String[] exceptUris = filterConfig.getInitParameter("exceptUrls").split(",");
		
		if(exceptUris!=null && exceptUris.length>0){
			EXCEPT_URIS = java.util.Arrays.asList(exceptUris);
		}
		
	}

	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
		// 请求和响应对象转换
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		
		TwifiRequestWrapper accessRequest = new TwifiRequestWrapper(request);
		accessRequest.setResponse(response);
		
		//请求URI【如： /account/login】
		String uri = request.getRequestURI();
		uri = uri.startsWith("//") ? uri.substring(1) : uri;
		boolean  isAuthUri = isAuthUri(uri, EXCEPT_URIS);//是否为验证uri
		HttpSession session = request.getSession();
		AccountWithBLOBs account = (AccountWithBLOBs) session.getAttribute(Constants.LOGIN_ACCOUNT_INFO);
//		log.error("===uri: "+uri);
		if(isAuthUri){
			if(account == null){
				if (isAjaxRequest(accessRequest)) {
					//response.setStatus(HttpServletResponse.SC_FORBIDDEN);
					response.setHeader("sessionstatus", "timeout");
				} else {
					response.sendRedirect(CONTEXT_PATH + "/account/logout.htm");
				}
				return;
			}else {
				chain.doFilter(accessRequest, response);
			}
		}else {
			chain.doFilter(accessRequest, response);
		}
		
	}

	public void destroy() {
		
	}
	
	
	/**
	 * 是否非验证URI
	 * @param uri		请求URI
	 * @param exceptUtiList	非验证uri
	 * @return
	 */
	private boolean isAuthUri(String uri, List<String> exceptUtiList) {
		boolean isAuthUri = true;
		if(exceptUtiList != null && exceptUtiList.size()>0){
			
			String reg = null;
			Pattern pattern = null;
			Matcher matcher = null;
			for(String u : exceptUtiList){
				reg = u.replace("/", "[/]").replace("*", "[-_0-9A-Za-z]+");
				pattern = Pattern.compile("^"+reg+"([.]htm)?$");
				matcher = pattern.matcher(uri);
				if(matcher.matches()){
					isAuthUri = false;
					break;
				}
				
//				if(uri.indexOf(u+".htm") != -1){
//					isAuthUri = false;
//					break;
//				}
			}
		}
		return isAuthUri;
	}
	
	/**
	 * 是否ajax请求
	 * @param request
	 * @return
	 */
	private static boolean isAjaxRequest(HttpServletRequest request) {
		String val = request.getHeader(AJAX_REQUEST_HEADER_NAME);
		val = val == null ? "" : val.toLowerCase();
		return AJAX_REQUEST_HEADER_VALUE.toLowerCase().equals(val);
	}
	
	public static void main(String[] args) {
		String u = "/api10/*/*";
		String uri = "/api10/aaa/a_df.htm";
//		Pattern pattern = Pattern.compile("^[/]api10[/]([/-_0-9A-Za-z]+)+[.]htm$");
//		Matcher matcher = pattern.matcher(uri);
		
		String reg = u.replace("/", "[/]").replace("*", "[/-_0-9A-Za-z]+");
		Pattern pattern = Pattern.compile("^"+reg+"([.]htm)?$");
		Matcher matcher = pattern.matcher(uri);
		System.out.println(matcher.matches());
	}
	
}
