package com.access.core.util.rules;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.access.core.util.PropertiesUtil;

public class Regex extends Rule{
	private String reg;
	private Pattern pattern;
	public Regex(String reg){
		this.reg = reg;
	}
	public Regex(Pattern pattern){
		this.pattern = pattern;
	}

	public String getReg() {
		return reg;
	}
	public void setReg(String reg) {
		this.reg = reg;
	}

	public Pattern getPattern() {
		return pattern;
	}
	public void setPattern(Pattern pattern) {
		this.pattern = pattern;
	}
	
	
	@Override
	public boolean valid() throws Exception{
		if(value!=null && !value.equals("")){
			Matcher matcher = this.pattern.matcher(value);
			if(!matcher.matches()){
				message = PropertiesUtil.confProperties.getProperty("rule.regex");
				return false;
			}else {
				return true;
			}
		}else{
			return true;
		}
	}
}
