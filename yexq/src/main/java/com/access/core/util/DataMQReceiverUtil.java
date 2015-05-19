package com.access.core.util;

import com.access.base.BaseAction;
import com.mq.client.MqReceiver;

public class DataMQReceiverUtil extends BaseAction{

	private static final long serialVersionUID = 1L;

	/**
	 * 启动本地DataMQ接收服务
	 */
	public void mqReceiverStart() {
		Thread localReceiver;
		try {
			localReceiver = new Thread(new MqReceiver(new DataMQProcess()));
			localReceiver.start();
			
		} catch (Exception e) {
			e.printStackTrace();
			saveExceptionLog("api device", this.getClass().toString(), e);
		}
		
	}
	
}
