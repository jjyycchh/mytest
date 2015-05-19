/**
 * Created by cx on 2014/8/13.
 */

var deviceApp = function(){
	var deviceSearchHandler = null;
	var search_dev_keyword = null;
	var dev_status = "";
	deviceSearchHandler = new searchUtil(generateDeviceListHtml, searchFailCallBack, searchErrorCallBack, null, postChagePage,
			"device_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
			"/device/searchbypage.htm","");
	
	var keywordsSearch = function() {
		deviceSearchHandler.clearResultSetpageNo();
		$("div.ChinaNet-Page-Table").show();
		dev_status = $("#DeviceStatus").val();
		deviceSearchHandler.setSearchParemeter('status', dev_status);
		var deviceSearchKeywords = deviceSearchHandler.convertKeywordsSearchable($("#keywords").val());
		deviceSearchHandler.setSearchParemeter('keywords', deviceSearchKeywords);
		if(onCheckLength(deviceSearchKeywords)){
			deviceSearchHandler.searchWithPreload();
		}
		else{
			onAlertError('您输入的关键字太多，请重新输入');
		}
		
	}
	var onsearchDevice = function(){
		$("#btn_search_device").click(function() {
			keywordsSearch();
		});
	}
	var deviceuserlimitation = function(){
        $('a#Device-userlimit-Done').click(function(){
            var content = '';
            var error   = '';            
            $.ajax({
                url:'/device/deviceuserlimitation.htm',
                type:'GET',
                dataType:'HTML',
                async:false,
                success:function(data){
                    if(data.result=='FAIL'){
                        error = data.message;
                    }else{
                        content = data;
                    }
                }
            });

            if(content!=''){
                onOpenDialog('Dailogin:Device:Userlimit', '用户流量时长管理', content,{ok:function(){saveLimitation();return false;}});
                
            }else {
                onAlertError(error);
                return false;
            }
        });
    }
			
    var initDeviceSelect = function(){
        $('#DeviceStatus').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:"",text:"全部"},data:[{value:'',text:'全部'},{value:'ONLINE',text:'在线'},{value:'OFFLINE',text:'离线'},{value:'LOCKED',text:'锁定'}]})
    }
	
	return {init:function(){
		deviceSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		onsearchDevice();
        initDeviceSelect();
        deviceuserlimitation();
		onSettingsDevice();
	}}
}();
function updateStatuscss(deviceId,devstatus){
	if($("#status_" + deviceId).hasClass('Table-Status-Locked')){
		$("#status_" + deviceId).removeClass('Table-Status-Locked');
    }else if($("#status_" + deviceId).hasClass('Table-Status-Offline')){
    	$("#status_" + deviceId).removeClass('Table-Status-Offline')
    }else if($("#status_" + deviceId).hasClass('Table-Status-Online')){
    	$("#status_" + deviceId).removeClass('Table-Status-Online')
    }
	$("#status_" + deviceId).addClass(deviceStatus(devstatus));
}

function generateDeviceListHtml(deviceList){
	var devListHtml = "";
	if (deviceList.length > 0) {			
		for ( var i = 0; i < deviceList.length; i++) {
			var device_id = deviceList[i].deviceId;
			var device_brand = deviceList[i].brand;
			var device_model = deviceList[i].model;
			var device_ssid = null;
			var device_config = deviceList[i].configItems;
			if (isNotEmptyString(device_config)) {
				var objConfig = JSON.parse(device_config);
				device_ssid = objConfig.ssid;
			}
			var device_name = deviceList[i].name;
			if (!isNotEmptyString(device_name)) {
				device_name = "&nbsp;";
			}
			else {
				if (isNotEmptyString(device_ssid)) {
					device_name += " (" + device_ssid + ")";
				}
			}				
			var latitude = deviceList[i].latitude;
			var longitude = deviceList[i].longitude;
			var merchant_name = isNotEmptyString(deviceList[i].merchantName) ? deviceList[i].merchantName : "";
			var status = deviceList[i].status;
			var upTraffic = deviceList[i].upTraffic;
			var downTraffic = deviceList[i].downTraffic;
			var mac =  deviceList[i].mac;
			var geoLocation = deviceList[i].geoLocation;				
			var province = "";
			var city = "";
			var county = "";
			var address = "";
			var sysMemfree = isNotEmptyString(deviceList[i].sysMemfree)?MemfreeFormatter(deviceList[i].sysMemfree):"";
			var sysLoad = isNotEmptyString(deviceList[i].sysLoad)?deviceList[i].sysLoad:"";
			if (geoLocation != null && geoLocation != undefined && geoLocation != "") {
				geoLocation = JSON.parse(geoLocation);					
				province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province + " ";
				city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city + " ";
				county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county + " ";
				address = geoLocation.address == undefined || geoLocation.address == null ? "" : geoLocation.address + " ";
			}
			
			devListHtml += "<tr class='ChinaNet-Table-Body'>";
			//devListHtml += "<td><a href='/device/deviceinfo26.htm' data-public-params='"+device_id+"' class='initAjax Table-Data-Name-Link'>"+ device_id +"</a>";
			devListHtml += "<td><span class='Table-Data-Name'> "+ device_id +" </span>";
			devListHtml += "<span class='Table-Data-Text'>"+ device_name +"</span></td>";
			devListHtml += "<td><span class='Table-Data-Name'>"+ mac +"</span>";
			devListHtml += "<span class='Table-Data-Text'>"+ device_model +"</span></td>";
			devListHtml += "<td><span class='Talbe-Data-Name'>" + merchant_name + "</span>";
			devListHtml += "<span class='Table-Data-Text'>" + province + city + county + "</span></td>";
			devListHtml += "<td><span id='status_" + device_id + "' class='Table-Data-Status Table-Status-Offline'></span></td>";
			devListHtml += "<td><span class='Table-Data-Text'>2014-08-08 23:22:21</span></td>";
			devListHtml += "<td><button class='Device-Settings-Done Form-Primary' data-device-id='"+device_id+"'><span>编辑</span></button></td>";
			devListHtml += "</tr>";
		}			
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	return devListHtml;		
}
function generateDeviceOptBtn(deviceID, status) {
	var deviceOptBtnHtml = "";
	if (deviceID != null) {
		if (status == "LOCKED") {
			deviceOptBtnHtml += "<button class='Form-Default' onclick='javascript:unlockDevice(\"" + deviceID + "\")'>";
			deviceOptBtnHtml += "<span>解锁</span>";
			deviceOptBtnHtml += "</button>";
		} else {
			deviceOptBtnHtml += "<button class='Form-Primary' onclick='javascript:lockDevice(\"" + deviceID + "\")'>";
			deviceOptBtnHtml += "<span>锁定</span>";
			deviceOptBtnHtml += "</button>";
		}
	}
	return deviceOptBtnHtml;
}

function deviceStatus(devstatus){
	var statuscss="";
	if(devstatus != null){
		if (devstatus == "LOCKED") {
			statuscss += "Table-Status-Locked";
		}
		else if(devstatus == "OFFLINE"){
			statuscss += "Table-Status-Offline";
		}
		else{
			statuscss += "Table-Status-Online";
		}
	}
	return statuscss;
}

function lockDevice(deviceId) {
	updateDeviceStatus(deviceId, "LOCK");
}

function unlockDevice(deviceId) {

	updateDeviceStatus(deviceId, "UNLOCK");
}

//锁定or解
function updateDeviceStatus(deviceId, type) {
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/device/devicelock.htm',
		data : {
			'deviceid' : deviceId,
			'type' : type
		},
		success : function(data) {
			if (data.result != 'FAIL') {
				
				if($("#status_" + deviceId).hasClass('Table-Status-Locked')){
					$("#status_" + deviceId).removeClass('Table-Status-Locked');
                }else if($("#status_" + deviceId).hasClass('Table-Status-Offline')){
                	$("#status_" + deviceId).removeClass('Table-Status-Offline')
                }else if($("#status_" + deviceId).hasClass('Table-Status-Online')){
                	$("#status_" + deviceId).removeClass('Table-Status-Online')
                }
				$("#status_" + deviceId).addClass(deviceStatus(data.status));
				//console.log(deviceButton(data.status,deviceId));
				var deviceOptBtnHtml = generateDeviceOptBtn(deviceId,data.status);
				$("#dev_opt_btn_" + deviceId).html(deviceOptBtnHtml);
				
			} else {
				onAlertError(data.message);
				return false;
			}
		},
		error : function() {
			onAlertError("设备操作失败!");
			return false;
		}
	});
}
function searchFailCallBack(data, message) {
	onAlertError(data.message);
	return false;
}
		
function searchErrorCallBack(data, message) {
	c
	return false;
}

function postChagePage(prev_page_ResultSet, curr_page_ResultSet, next_page_ResultSet) {
	
	if (curr_page_ResultSet != null) {
		var deviceList = curr_page_ResultSet.records;
		if (deviceList != null && deviceList.length > 0){
			var deviceIds = [];
			for (var i = 0; i < deviceList.length;i++) {
				deviceIds.push(deviceList[i].deviceId);
			}
			
			if (deviceIds != null && deviceIds.length > 0) {
				//update parameter (deviceIds json) deviceRefreshTimer
				DEVICE_LIST_REFRESH_TIMER.deviceIds = JSON.stringify(deviceIds);
				setTimeout("DEVICE_LIST_REFRESH_TIMER.initialTimer(refreshCallBack)", 0);
			}
		}
	}
}

function refreshCallBack(data) {
	if (data.records != null && data.records.length > 0) {
		var deviceInfoLst = data.records;
		
		for (var i = 0; i < deviceInfoLst.length; i++) {
			var device_ssid = null;
			var device_config = deviceInfoLst[i].configItems;
			var device_name = null;
			if (isNotEmptyString(device_config)) {
				var objConfig = JSON.parse(device_config);
				device_ssid = objConfig.ssid;
			}
			var device_name = deviceInfoLst[i].name;
			if (!isNotEmptyString(device_name)) {
				device_name = "";
			}
			

			device_name = !isNotEmptyString(device_name) ? "" : device_name;
			var status = deviceInfoLst[i].status;
			
			var upTraffic = deviceInfoLst[i].upTraffic;
			upTraffic = upTraffic == null || upTraffic == undefined ? "0 MB" : trafficFormatter(upTraffic);
			
			var downTraffic = deviceInfoLst[i].downTraffic;
			downTraffic = downTraffic == null || downTraffic == undefined ? "0 MB" : trafficFormatter(downTraffic);
			
			var deviceId = deviceInfoLst[i].deviceId;
			var deviceStatus = deviceInfoLst[i].status;
			
			var sysMemfree = isNotEmptyString(deviceInfoLst[i].sysMemfree)?MemfreeFormatter(deviceInfoLst[i].sysMemfree):"";
			var sysLoad = isNotEmptyString(deviceInfoLst[i].sysLoad)?deviceInfoLst[i].sysLoad:"";
			
			updateStatuscss(deviceId,status);
			//$("#dev_name_" + deviceId).html(device_name);
			$("#up_" + deviceId).html(upTraffic);
			$("#down_" + deviceId).html(downTraffic);
			$("#dev_opt_btn_" + deviceId).html(generateDeviceOptBtn(deviceId,status));
			$("#sysmemfree_" + deviceId).html(sysMemfree);
			$("#sysload_" + deviceId).html(sysLoad);
		}
		
	}
}
function MemfreeFormatter(val) {
	if (val == '--')
		return val;
	else if (val > 1024*1024)
		return Math.round(val / (1024*1024)) + " GB";
	else if (val > 1024)
	      return Math.round(val / 1024) + " MB";
    else
    	return val + " KB";
}
////////////////////////////////////////////////
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
		}else{
			//刷新一次
			this.refreshDevice();
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




function onSettingsDevice(){
	$('button.Device-Settings-Done').live('click', function(){
		var content = '';
		var error   = '';
		var id      = $(this).attr('data-device-id');
		__DATA_PUBLIC_KEY = id;
		$.ajax({
			url:'/device/devicesettings.htm',
			type:'GET',
			dataType:'HTML',
			async:false,
			//data:{'deviceid':id},
			success:function(data){
				if(data.result=='FAIL'){
					error = data.message;
				}else{
					content = data;
				}
			}
		});

		if(content!=''){
			onOpenDialog('Dailogin:Device:Setting', '设备设置', content, {ok:function(){onSetDevice();return false;}});

		}else {
			onAlertError(error);
			return false;
		}
	});
}

function onSetDevice(){
	var configitemsjs = {ssid: $("#inputSSID").val(), password: $("#inputpwd").val()};
	var param = null;

	if(!onCheckEmpty($("#inputSBName").val())){
		onAlertErrorTip('请输入设备名称', document.getElementById('inputSBName'));
		return false;
	}

	if(!onCheckEmpty($("#inputSSID").val())){
		onAlertErrorTip('请输入SSID', document.getElementById('inputSSID'))
		return false;
	}
	_devicename = $("#inputSBName").val();
	_configitemsjs = configitemsjs;
	param = {
		'deviceid' : __DATA_PUBLIC_KEY,
		'devicename' : $("#inputSBName").val(),
		'configitems': JSON.stringify(configitemsjs),
		'component_id': $("#converid").val()
	};

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/device/devicesettings.htm',
		data: param,
		success: function (data) {
			if (data.result == 'OK') {
				onAlertError("设备配置成功","ok");
				dialog.list['Dailogin:Device:Setting'].remove().close();
				loadDeviceInfo();
				//关闭Modal-刷新设备详情---
				__DATA_PUBLIC_KEY = '';
			} else {
				onAlertError(data.message);
				return false;
			}

		},
		error: function (data) {
			onAlertError("设备配置失败!");
			return false;
		}
	});

}