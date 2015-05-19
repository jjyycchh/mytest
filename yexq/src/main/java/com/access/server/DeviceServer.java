package com.access.server;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@Path(value = "wsapi/device")  
public interface DeviceServer {
	@GET  
    @Path(value = "/deviceRegsiter/{device_id}/{ip}/{mac}")  
	public String deviceRegsiter(@PathParam("device_id") String device_id, @PathParam("ip") String ip, @PathParam("mac") String mac);
}
