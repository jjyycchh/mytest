package com.access.action.user;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.stereotype.Controller;

import com.access.base.BaseAction;

@Controller
@Namespace("/thirdpart")
public class ThirdpartAction extends BaseAction {

	private static final long serialVersionUID = 1901775331512886694L;
	Logger logger  =  Logger.getLogger(this.getClass());

}
