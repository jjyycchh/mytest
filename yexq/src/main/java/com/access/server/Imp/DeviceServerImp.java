package com.access.server.Imp;

import com.access.server.DeviceServer;

public class DeviceServerImp implements DeviceServer {

	@Override
	public String deviceRegsiter(String device_id, String ip, String mac) {
		return device_id + "-" + ip + "-" + mac + " deviceRegsiter SUCCESS" ;
	}
}
