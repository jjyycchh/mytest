package com.access.filter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;

import com.alipay.util.httpClient.HttpRequest;

public class TwifiRequestWrapper extends HttpServletRequestWrapper{

	private HttpServletRequest request = null;
	private HttpServletResponse response = null;
	
	public TwifiRequestWrapper(HttpServletRequest request) {
		super(request);
		this.request = request;
	}

	public void setResponse(HttpServletResponse response) { 
		this.response = response;
	}

	public HttpSession getSession(){
		HttpSession session = super.getSession();
		processSessionCookie(session);
		return session;
	}
	
	public HttpSession getSession(boolean create){
		HttpSession session = super.getSession(create);
		processSessionCookie(session);
		return session;
	}
	
	public String getParameter(String name){
		String value = this.request.getParameter(name);
		if(StringUtils.isBlank(value)){
			return value;
		} else {
			if(request.getMethod().equals(HttpRequest.METHOD_POST)){
				return htmlEscape(value);
			} else {
				return value;
			}
		}
	}
	
	public static String htmlEscape(String str){
		if(StringUtils.isBlank(str)){
			return str;
		} else {
//			return str.replaceAll("\\>", "&#62;")
//					.replaceAll("\\<", "&#60;");
			return str.replaceAll("<!--", "");
		}
	}
	
	private void processSessionCookie(HttpSession session){
		if (null == response || null == session) {
			// No response or session object attached, skip the pre processing
			return;
		}

		// cookieOverWritten - 用于过滤多个Set-Cookie头的标志
		Object cookieOverWritten = getAttribute("COOKIE_OVERWRITTEN_FLAG");
		if (null == cookieOverWritten && isSecure() && isRequestedSessionIdFromCookie() && session.isNew()) {
			
			// 当是https协议，且新session时，创建JSESSIONID cookie以欺骗浏览器
			
			Cookie cookie = new Cookie("JSESSIONID", session.getId());
			cookie.setMaxAge(-1); // 有效时间为浏览器打开或超时
			String contextPath = getContextPath();
			
			if ((contextPath != null) && (contextPath.length() > 0)) {
				cookie.setPath(contextPath);
			}
			else {
				cookie.setPath("/");
			}
			
			response.addCookie(cookie); // 增加一个Set-Cookie头到response
			setAttribute("COOKIE_OVERWRITTEN_FLAG", "true");// 过滤多个Set-Cookie头的标志
		}
	}

}
