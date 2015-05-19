package com.access.action.system;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.access.base.BaseAction;
import com.access.core.constant.Constants;
import com.access.core.util.JsonUtil;
import com.access.core.util.PropertiesUtil;
import com.access.core.util.SmsSendUtil;
import com.access.core.util.StringUtil;
import com.access.core.util.ValidateUtil;
import com.access.core.util.rules.Length;
import com.access.core.util.rules.Numeric;
import com.access.core.util.rules.Regex;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;
import com.access.model.system.Menu;
import com.alipay.util.httpClient.HttpRequest;

@Controller
@Namespace("/system")
public class SystemAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
	Logger logger  =  Logger.getLogger(this.getClass());

	//******************************主页面查询start********************************
	
	@Action(value="main",results = {
			@Result(name=SUCCESS, location="/WEB-INF/jsp30/apmanager/main.jsp")
	})
	public String main() {
		return SUCCESS;
	}
	@Action(value="aplist",results = {
			@Result(name=SUCCESS, location="/WEB-INF/jsp30/apmanager/aplist.jsp")
	})
	public String aplist() {
		return SUCCESS;
	}
	@Action(value="apgrouplist",results = {
			@Result(name=SUCCESS, location="/WEB-INF/jsp30/apmanager/apgroup/list.jsp")
	})
	public String apgrouplist() {
		return SUCCESS;
	}
	
	@Action(value="page", results={
			@Result(name=SUCCESS, location="/WEB-INF/jsp30/page.html")
	})
	public String page(){
		return SUCCESS;
	}
	
	@Action(value="show_apgroup", results={
			@Result(name=SUCCESS, location="/WEB-INF/jsp30/apmanager/apgroup/show.jsp")
	})
	public String showApGroup(){
		String groupId = StringUtil.fromGetRequest(this.request.getParameter("thisId"));
		this.request.setAttribute("groupId", groupId);
		return SUCCESS;
	}
	
	@Action(value="edit_apgroup", results={
			@Result(name=SUCCESS, location="/WEB-INF/jsp30/apmanager/apgroup/edit.jsp")
	})
	public String editApGroup(){
		String groupId = StringUtil.fromGetRequest(this.request.getParameter("thisId"));
		this.request.setAttribute("groupId", groupId);
		return SUCCESS;
	}
	
	@Action(value="add_apgroup", results={
			@Result(name=SUCCESS, location="/WEB-INF/jsp30/apmanager/apgroup/add.jsp")
	})
	public String addApGroup(){
		return SUCCESS;
	}
	
	/**
	 * 通过短信网关发送消息
	 * @return
	 */
	@Action(value = "sendCode", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	public String sendMessage() {
		
		try {
			String cellNumber = StringUtil.fromGetRequest(this.request.getParameter("cellNumber"));
			String content = StringUtil.fromGetRequest(this.request.getParameter("content"));
			String smsGW= StringUtil.fromGetRequest(this.request.getParameter("smsGW"));
			
			ValidateUtil vu = new ValidateUtil();
			vu.add("cellNumber", cellNumber, PropertiesUtil.confProperties.getProperty("account.param.cellNumber"), 
					new Rule[]{new Required(), new Numeric(), new Length(11,11), new Regex(Constants.CELLPHONE_PATTERN)});
			vu.add("content", content, PropertiesUtil.confProperties.getProperty("system.param.smsContent"), 
					new Rule[]{new Required()});
		
			String validStr = vu.validateString();
            
            if (validStr != null) {
                resultMap = this.getResult(validStr);
                return SUCCESS;
            }
		
			SmsSendUtil.sendSms(cellNumber, content, smsGW);
			resultMap = this.getResult();
			
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("sendCode 请求错误：", e);
            saveExceptionLog("system", this.getClass().toString(), e);
            resultMap = this.getResult(PropertiesUtil.confProperties.getProperty("user.msg.sendMsgError"));
		}
		return SUCCESS;
	}
	
	/**
	 * lzm测试用
	 * @return
	 */
	@Action(value="lzm", results = {
			@Result(name = SUCCESS, type = "json", params = {"root", "resultMap"})
	})
	public String lzm() {
		resultMap = this.getResult();
		
		return SUCCESS;
	}
	
	/**
	 * 查询树
	 * 
	 * @return
	 */
	@Action(value = "searchtree", 
			results = { @Result(name = SUCCESS, type = "json", params = {"root", "resultMap" }) })
	@SuppressWarnings("unchecked")
	public String searchTree() {
//		AccountWithBLOBs curAccount = this.getCurLoginAccount();
		resultMap = new HashMap<String, Object>();
		try {
			if(request.getMethod().equals(HttpRequest.METHOD_GET)) {
					//查询树
				List<Menu> dev_tree = this.systemService.selectAllTree();
				List<Object> dev_treeObjTypeList = null;

				if (dev_tree != null && dev_tree.size() > 0) {
					for (Menu node : dev_tree) {
						if (dev_treeObjTypeList == null){
							dev_treeObjTypeList = new ArrayList<Object>();
						}
						
						dev_treeObjTypeList.add((Object) node);
					}
				}

				resultMap.put("records", dev_treeObjTypeList == null ? "" : JsonUtil.listToJson(dev_treeObjTypeList));
				resultMap.put("result", "OK");
					
			} else {
				resultMap.put("result", "FAIL");
				resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.illegalRequest"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "FAIL");
			resultMap.put("message", PropertiesUtil.confProperties.getProperty("message.exception"));
			saveExceptionLog("system", systemService.getClass().toString(), e);
		}
		return SUCCESS;
	}
}


