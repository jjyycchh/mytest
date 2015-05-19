package com.access.core.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.access.core.util.rules.Length;
import com.access.core.util.rules.Required;
import com.access.core.util.rules.Rule;

public class ValidateUtil {

	public Map<String, Rule[]> ruleMap = null;
	public Map<String, String> nameMap = null;
	public Map<String, String> valueMap = null;

	public ValidateUtil() {
		ruleMap = new HashMap<String,Rule[]>();
		nameMap = new HashMap<String, String>();
		valueMap = new HashMap<String, String>();
	}

	public Map<String, Object> validate(String key, String value, String name) throws Exception{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Rule[] rules = ruleMap.get(key);
		if(rules!=null && rules.length>0){
			for(Rule rule : rules){
				rule.setValue(value);
				if(!rule.valid()){
					resultMap.put("result", false);
					resultMap.put("message", name+rule.getMessage());
					break;
				}
			}
		}
		return resultMap;
	}
	
	public void init(){
		ruleMap = new HashMap<String,Rule[]>();
	}
	
	public void add(String key, String value, String name, Rule[] ruleArr){
		nameMap.put(key, name);
		valueMap.put(key, value);
		ruleMap.put(key, ruleArr);
	}

	
	public Map<String, Object> validateAll() throws Exception{
		Map<String, Object> resultMap = null;
		for (Entry<String, Rule[]> entry : ruleMap.entrySet()) {
		    String key = entry.getKey();
		    resultMap = validate(key);
		    boolean result = (Boolean)resultMap.get("result");
		    if(!result){
		    	resultMap.put("result", result);
		    	break;
		    }
		}
		return resultMap;
	}
	
	
	public String validateString() throws Exception{
		String message = null;
		Map<String, Object> resultMap = null;
		for (Entry<String, Rule[]> entry : ruleMap.entrySet()) {
		    String key = entry.getKey();
		    resultMap = validate(key);
		    boolean result = (Boolean)resultMap.get("result");
		    if(!result){
		    	message = (String)resultMap.get("message");
		    	break;
		    }
		}
    	this.clear();
		return message;
	}
	
	public Map<String, Object> validate(String key) throws Exception{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", true);
		Rule[] rules = ruleMap.get(key);
		if(rules!=null && rules.length>0){
			for(Rule rule : rules){
				rule.setValue(valueMap.get(key));
				if(!rule.valid()){
					resultMap.put("result", false);
					resultMap.put("message", nameMap.get(key)+rule.getMessage());
					break;
				}
			}
		}
		return resultMap;
	}
	
	public void clear(){
		ruleMap.clear();
		nameMap.clear();
		valueMap.clear();
		ruleMap = null;
		nameMap = null;
		valueMap = null;
	}
	public static void main(String[] args) throws Exception {
		ValidateUtil util = new ValidateUtil();
		util.add("username",null,"姓名",new Rule[]{new Required(), new Length(1,7)});
//		util.add("address","西湖","地址",new Rule[]{new Required(), new Length(1,6)});
//		util.add("email","1234@qq.com","邮箱",new Rule[]{new Required(), new Regex(Constants.EMAIL_PATTERN)});
		
		util.validateString();
		
//		System.out.println("中国".getBytes("UTF-8").length);
	}
}
