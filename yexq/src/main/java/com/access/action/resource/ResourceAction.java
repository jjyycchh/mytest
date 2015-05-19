package com.access.action.resource;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.stereotype.Controller;

import com.access.base.BaseAction;

@Controller
@Namespace("/resource")
public class ResourceAction extends BaseAction {

	private static final long serialVersionUID = -7027627123484101507L;
	Logger logger  =  Logger.getLogger(this.getClass());
	
	
}
