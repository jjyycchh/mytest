package com.access.core.exception;

import java.util.HashMap;
import java.util.Map;

public class BusinessException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String errorCode;
	private String errorMsg;
	
	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public BusinessException(String errorCode) {
		super();
		this.errorCode = errorCode;
		System.err.println(getErrorMsg(errorCode));
	}

	public BusinessException(String errorCode, String errorMsg) {
		super();
		this.errorCode = errorCode;
		this.errorMsg = errorMsg;
		System.err.println(getErrorMsg(errorCode)+"： "+errorMsg);
	}

	public static final Map<String,String> EXCEP_CODE_MSG_MAP = new HashMap<String,String>();
	static{
		EXCEP_CODE_MSG_MAP.put("00001", "General Exception msg");
	    EXCEP_CODE_MSG_MAP.put("00002", "Permission denied");
	    EXCEP_CODE_MSG_MAP.put("00003", "用户已经存在");
	    EXCEP_CODE_MSG_MAP.put("00004", "model 写入数据库错误");
	}

	
	public static String getErrorMsg(String key){
		if(key == null || "".equals(key)){
			return "";
		}else{
			return EXCEP_CODE_MSG_MAP.get(key)==null?"":EXCEP_CODE_MSG_MAP.get(key);
		}
	}
	
	
}
