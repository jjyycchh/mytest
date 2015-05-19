package com.access.core.util.rules;

import org.apache.commons.lang3.StringUtils;

import com.access.core.util.DateUtil;
import com.access.core.util.PropertiesUtil;

public class DateValue extends Rule {
	
	public DateValue() {
		
	}
	
	@Override
	public boolean valid() throws Exception {
		if (StringUtils.isBlank(this.getValue())) {
			return true;
		}
			
		java.util.Date dtValue = DateUtil.parseToDateTry(this.getValue());
		
		if (dtValue == null) {
			this.setMessage(PropertiesUtil.confProperties.getProperty("rule.dateValue"));
			return false;
		}
		else {
			return true;
		}
	}

}
