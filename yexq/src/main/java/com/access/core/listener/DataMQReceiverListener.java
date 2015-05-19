package com.access.core.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.access.core.util.DataMQProcess;
import com.mq.client.MqReceiver;

public class DataMQReceiverListener implements ServletContextListener{

	@Override
	public void contextInitialized(ServletContextEvent sce) {

		// 启动dataMQReceiver监听
		Thread localReceiver = null;
		try {
			localReceiver = new Thread(new MqReceiver(new DataMQProcess()));
			localReceiver.start();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		
	}

}
