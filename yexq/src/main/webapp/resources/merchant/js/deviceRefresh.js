/////////////////////////////////////////////////
//device module constants definition

var DEVICE_LIST_REFRESH_TIMER = new function() {
	this.REFRESH_INTERVAL = 30*1000; //30 seconds
	this.contextPath = null;
	this.timer_handler = null;
	this.stopSign = false;
	this.refreshCallBack = null;
	this.deviceIds = null;

	this.errorStack = [];
	this.failStack = [];
	
	this.stopTimer = function () {
		this.stopSign = true;
	}
	this.initialTimer = function(refreshCallBackFunc) {
		if (this.timer_handler == null) {
			if (refreshCallBackFunc != null  && refreshCallBackFunc != undefined && typeof(refreshCallBackFunc) == "function") {
				this.refreshCallBack = refreshCallBackFunc;
				
				DEVICE_LIST_REFRESH_TIMER.setRefreshTimer();
				return true;
			}
			return false;
		}

		return true;
	};
	this.setRefreshTimer = function () {
		if (this.stopSign) {
			if (this.timer_handler != null && this.timer_handler != undefined) {
				clearTimeout(this.timer_handler);
				this.timer_handler = null;
				this.stopSign = false;
			}
		}
		else {
			clearTimeout(this.timer_handler);
			this.refreshDevice();
			
			var actionJs = "DEVICE_LIST_REFRESH_TIMER.setRefreshTimer();";
			this.timer_handler = setTimeout(actionJs, DEVICE_LIST_REFRESH_TIMER.REFRESH_INTERVAL);
		}
	};
	
	this.refreshDevice = function () {
		if (isNotEmptyString(DEVICE_LIST_REFRESH_TIMER.deviceIds)) {
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : __CONTEXT_PATH + '/device/refereshdevices.htm',
				data : {
					'deviceids' : DEVICE_LIST_REFRESH_TIMER.deviceIds
				},
				success : function(data) {
					if (data.result != 'FAIL') {
						DEVICE_LIST_REFRESH_TIMER.refreshCallBack(data);
					} else {
						DEVICE_LIST_REFRESH_TIMER.failStack.push(data);
					}
				},
				error : function(data) {
					DEVICE_LIST_REFRESH_TIMER.errorStack.push(data);
				}
			});
		}
	};
};