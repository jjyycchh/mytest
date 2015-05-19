package com.access.core.util.rules;

import com.access.core.util.PropertiesUtil;

public class Required extends Rule{
	
	public Required(){
		
	}
	
	public boolean valid(){
		if(this.getValue()==null || this.getValue().equals("")){
			this.setMessage(PropertiesUtil.confProperties.getProperty("rule.required"));
			return false;
		}else {
			return true;
		}
	}
}
