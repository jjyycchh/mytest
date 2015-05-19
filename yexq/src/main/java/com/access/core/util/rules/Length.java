package com.access.core.util.rules;

import com.access.core.util.PropertiesUtil;

public class Length extends Rule{
	private int minLength;
	private int maxLength;
	
	public int getMinLength() {
		return minLength;
	}

	public void setMinLength(int minLength) {
		this.minLength = minLength;
	}

	public int getMaxLength() {
		return maxLength;
	}

	public void setMaxLength(int maxLength) {
		this.maxLength = maxLength;
	}


	public Length(int maxLength){
		this.minLength = 0;
		this.maxLength = maxLength;
	}
	
	public Length(int minLength, int maxLength){
		this.minLength = minLength;
		this.maxLength = maxLength;
	}

	@Override
	public boolean valid() throws Exception{
		if(this.getValue() != null && !this.getValue().equals("")){
			if(this.getValue().getBytes(charset).length<minLength 
					|| this.getValue().getBytes(charset).length>maxLength){
				message = PropertiesUtil.confProperties.getProperty("rule.length");
				return false;
			}else {
				return true;
			}
		}
		else {
			return true;
		}
	}
}
