package com.access.base;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;

import com.google.gson.Gson;
import com.access.core.util.StringUtil;
import com.access.dao.system.ExceptionLogMapper;
import com.access.model.system.ExceptionLogWithBLOBs;

public class BaseService {
	@Resource(name="baseDao")
	private BaseDao baseDao; 
	
	@Resource(name="exceptionLogMapper")
	protected ExceptionLogMapper exceptionLogMapper;
	
	public Gson gson = new Gson();
	/**
	 * 默认sql执行结果影响记录数
	 */
	protected int result = 0;
	
	/**
	 * 记录异常日志
	 * @param moduleName
	 * @param serviceName
	 * @param paramMap
	 * @param sysErrorMssage
	 */
	public void saveExceptionLog(String moduleName, String serviceName, Map<String, Object> paramMap, Exception e, String memo){
		ExceptionLogWithBLOBs log = new ExceptionLogWithBLOBs();
		log.setModuleName(moduleName);
		log.setServiceName(serviceName);

		log.setParameter(new Gson().toJson(paramMap));
		String errorMsg = e.toString() + "  " + StringUtil.getExceptionStackTrace(e);
		if (StringUtils.isNotBlank(memo)) {
			errorMsg = "Memo: " + memo + " ========== " + errorMsg;
		}
		log.setSysErrorMssage(errorMsg);
		exceptionLogMapper.insertSelective(log);
	}
	
	protected Map<String, Object> getResult(String message, String result){
        Map<String, Object> rltMap = new HashMap<String, Object>();
        rltMap.put("message", message);
        rltMap.put("result", result);
    	return rltMap;
    }
    
    protected Map<String, Object> getResult(String message){
        Map<String, Object> rltMap = new HashMap<String, Object>();
        rltMap.put("message", message);
        rltMap.put("result", "FAIL");
    	return rltMap;
    }
    
    protected Map<String, Object> getResult(){
    	Map<String, Object> rltMap = new HashMap<String, Object>();
        rltMap.put("result", "OK");
    	return rltMap;
    }
    
    /**
	 * 保存异常信息
	 * @param moduleName
	 * @param serviceName
	 * @param errorMessage
	 */
	public void saveExecptionLog(String moduleName, String serviceName, String errorMessage) {
		ExceptionLogWithBLOBs log = new ExceptionLogWithBLOBs();
		log.setModuleName(moduleName);
		log.setServiceName(serviceName);
		log.setSysErrorMssage(errorMessage);
		log.setCreateDatetime(new Date());
		
		exceptionLogMapper.insertSelective(log);
	}
}
