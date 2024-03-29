package com.access.core.util.rules;

import com.access.core.util.PropertiesUtil;

public class BooleanValue extends Rule {
	
	@Override
	public boolean valid() throws Exception {
        if (this.getValue() == null) {
            return true;
        }

		if (this.getValue() != null && 
				(this.getValue().equalsIgnoreCase(Boolean.TRUE.toString()) 
						|| this.getValue().equalsIgnoreCase(Boolean.FALSE.toString()))){
			return true;
		}
		else {
			this.setMessage(PropertiesUtil.confProperties.getProperty("rule.booleanValue"));
			return false;			
		}
	
	}
}
