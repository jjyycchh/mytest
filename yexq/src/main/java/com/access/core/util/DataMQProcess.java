package com.access.core.util;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.mq.client.ServiceProcess;

public class DataMQProcess implements ServiceProcess{

	@Override
	public boolean process(Object returnValue) {

		Logger logger = Logger.getLogger(this.getClass());
		
		Gson gson = new Gson();
		logger.info(gson.toJson(returnValue));
		logger.info("dataMq本地接收服务启动");
		System.out.println("dataMq本地接收服务启动");
		return false;
	}

}
