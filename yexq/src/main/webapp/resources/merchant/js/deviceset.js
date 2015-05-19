var devicesetApp = function(){
	
	var loadDeviceInfo = function() {
		
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/device/devicesettings.htm',
			data : {
				'deviceid' : __DATA_PUBLIC_KEY
			},			
			success : function(data) {
				if (data.result != 'FAIL' && data.device != null) {
					if (data.device != null) {
						DevDetails = data.device;
						refreshDeviceData(DevDetails);
					}
				} else {

					return false;
				}
				
			},
			error : function(data) {

				return false;
			}
		});
	}
	
	var refreshDeviceData = function(device) {
		 $("#inputSBName").val(device.name);

		 if(device.configItems != null && device.configItems != ""){
			var configItemsstr = JSON.parse(device.configItems);
		 	$("#inputSSID").val(configItemsstr.ssid); 
		 }		 
		 $("#inputconver").text(device.componentVersion);
		 $("#converid").val(device.componentId);
	}
	
	return {init:function(){
		$("#lbSBID").html(__DATA_PUBLIC_KEY);
		loadDeviceInfo();
		//onSetDevices();
	}}
}();