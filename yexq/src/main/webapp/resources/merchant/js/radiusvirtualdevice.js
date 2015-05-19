var deviceSearchHandler = null;
var device_list = null;

deviceSearchHandler = new searchUtil(deviceListHtml, searchFailCallBack, searchErrorCallBack, null, onShowData,
				"device_list_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchradiusvirtualdevice.htm", "");

var radiusvirtualdeviceApp = function() {
	
	var keywordsSearchDevice = function() {
		$("div.ChinaNet-Page-Table").show();
		deviceSearchHandler.clearResultSetpageNo();
		var keywords = deviceSearchHandler.convertKeywordsSearchable($("#keywords").val());
		deviceSearchHandler.setSearchParemeter('keywords', keywords);
		deviceSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		deviceSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));				
		if(onCheckLength(keywords)) {
			deviceSearchHandler.searchWithPreload();
		} else {
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	
	/**
	 * 初始化“查询”按钮
	 * */
	var initSearchRadiusBtn = function(){
		$("#btn_search_device").click(function() {
			keywordsSearchDevice();
		});
	}
	
	/**
	 * 初始化“添加”按钮
	 * */
	var initAddRadiusBtn = function(){
		$("#btn_add_radius").click(function() {
			addRadius();
		});
	}
	
	/**
	 * 初始化日期选择框
	 * */
	var initDatepicker = function(){
		var startDateTextBox = $('#startdate');
		var endDateTextBox = $('#enddate');
		startDateTextBox.datepicker({
			regional:"zh-CN",
			dateFormat: "yy-mm-dd",
			onClose: function(dateText, inst) {
				if (endDateTextBox.val() != '') {
					var testStartDate = startDateTextBox.datetimepicker('getDate');
					var testEndDate = endDateTextBox.datetimepicker('getDate');
					if (testStartDate > testEndDate)
						endDateTextBox.datetimepicker('setDate', testStartDate);
				}
				else {
					endDateTextBox.val(dateText);
				}
			},
			onSelect: function (selectedDateTime){
				endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate') );
			}
		});
		
		endDateTextBox.datepicker({
			regional:"zh-CN",
			dateFormat: "yy-mm-dd",
			onClose: function(dateText, inst) {
				if (startDateTextBox.val() != '') {
					var testStartDate = startDateTextBox.datetimepicker('getDate');
					var testEndDate = endDateTextBox.datetimepicker('getDate');
					if (testStartDate > testEndDate)
						startDateTextBox.datetimepicker('setDate', testEndDate);
				}
				else {
					startDateTextBox.val(dateText);
				}
			},
			onSelect: function (selectedDateTime){
				startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate') );
			}
		});
		$("div.ui-datepicker").hide();
	} 
	
	return {init:function(){
		deviceSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearchDevice();
				return false;
			}
		});
		initSearchRadiusBtn();
		initAddRadiusBtn();
		initDatepicker();
	}}
}();

function onCheckWlanacnameExits(wlanacname) {
	var result = false;
	$.ajax({
		url : '/device/wlanacnameisexits.htm',
		type : 'GET',
		data : {
			"wlanacname" : wlanacname,
		},
		dataType : 'json',
		async : false,
		success : function(data) {
			if(data.result == 'OK') {
				result = true;
			}
		}
	});
	return result;
}

/***************************** 添加Radius设备 ********************************/

function addRadius() {
	var addRadiusDetailsHtml = "";
	addRadiusDetailsHtml += "<div class='UserInfo-Settings-Body'>";
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>AC NAME</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_wlan_ac_name' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_wlan_ac_name' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>设备 IP</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_radius_ip' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_radius_ip' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>设备端口号</label>";
	addRadiusDetailsHtml += "	  <div class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_radius_port' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>AUTH 加密</label>";
	addRadiusDetailsHtml += "	  <div class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_auth_secret' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>ACCOUNT 加密</label>";
	addRadiusDetailsHtml += "	  <div class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_accounting_secret' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>设备名称</label>";
	addRadiusDetailsHtml += "	  <div class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_radius_name' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>设备描述</label>";
	addRadiusDetailsHtml += "	  <div class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_radius_description' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	
	addRadiusDetailsHtml += "</div>";
		
	var d_addRadiusDevice = dialog({
		id: 'Dailogin:addRadius',
		title: '添加Radius设备',
		content: addRadiusDetailsHtml,
		okValue: '提交',
		ok: function () {
			submitRadiusDevice();
			return false;
		},
		cancelValue: '关闭',
		cancel : function () {},
		width:600,
		height:400,
		skin:'ChinaNet-Dialog'
	});
	d_addRadiusDevice.showModal();
	
}

function submitRadiusDevice() {
	var wlanacname = $("#input_new_wlan_ac_name").val();
	var addrIp = $("#input_new_radius_ip").val();
	var port = $("#input_new_radius_port").val();
	var authSecret = $("#input_new_auth_secret").val();
	var accountingSecret = $("#input_new_accounting_secret").val();
	var name = $("#input_new_radius_name").val();
	var description = $("#input_new_radius_description").val();
	
	if(!isNotEmptyString(wlanacname)) { 
		onAlertErrorTip('AC NAME不能为空', document.getElementById('input_new_wlan_ac_name'));
		return false;
	} else if(isChn(wlanacname)) {
		onAlertErrorTip('AC NAME只能为英文、数字或半角字符', document.getElementById('input_new_wlan_ac_name'));
		return false;
	} else if(!onCheckMaxLength(wlanacname, 200)) {
		onAlertErrorTip('AC NAME不能超过200个字符', document.getElementById('input_new_wlan_ac_name'));
		return false;
	}else if(!onCheckWlanacnameExits(wlanacname)) {
		onAlertErrorTip('AC NAME已存在', document.getElementById('input_new_wlan_ac_name'));
		return false;
	}
	if(!isNotEmptyString(addrIp)) { 
		onAlertErrorTip('IP不能为空', document.getElementById('input_new_radius_ip'));
		return false;
	} else if(!isIP(addrIp)) {
		onAlertErrorTip('IP格式错误', document.getElementById('input_new_radius_ip'));
		return false;
	}
	if(!checkInt(port)) {
		onAlertErrorTip('端口号只能为数字', document.getElementById('input_new_radius_port'));
		return false;
	} else if(!checkPort(port)) {
		onAlertErrorTip('端口号不能大于65535或小于1', document.getElementById('input_new_radius_port'));
		return false;
	}
	if(isChn(authSecret)) {
		onAlertErrorTip('auth加密方式只能为英文、数字或半角符号', document.getElementById('input_new_auth_secret'));
		return false;
	} else if(!onCheckLength(authSecret, 64)) {
		onAlertErrorTip('auth加密方式不能超过64个字符', document.getElementById('input_new_auth_secret'));
		return false;
	}
	if(isChn(accountingSecret)) {
		onAlertErrorTip('accounting加密方式只能为英文、数字或半角符号', document.getElementById('input_new_accounting_secret'));
		return false;
	} else if(!onCheckLength(accountingSecret, 64)) {
		onAlertErrorTip('accounting加密方式不能超过64个字符', document.getElementById('input_new_accounting_secret'));
		return false;
	}
	if(!onCheckLength(name, 120)) {
		onAlertErrorTip('名称不能超过120个字符', document.getElementById('input_new_radius_name'));
		return false;
	}
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/device/addradiusserver.htm',
		data: {
			"wlanacname" : wlanacname,
			"ac_ip" : addrIp,
			"port" : port,
			"authSecret" : authSecret,
			"accountingSecret" : accountingSecret,
			"name" : name,
			"description" : description
		},
		success: function (data) {
			if (data.result == 'OK') {
				onAlertError('设备添加成功!',"ok");
				deviceSearchHandler.clearResultSetpageNo();
				deviceSearchHandler.searchWithPreload();
				dialog.list['Dailogin:addRadius'].remove().close();
			} else {				   
				onAlertError(data.message);
			}
		},
		error: function (data) {
			onAlertError('设备添加失败!');
		}
	});
}

/************************** Radius设备查询结果列表 *****************************/

function deviceListHtml(deviceList) {
	var deviceListHtml = "";
	device_list = deviceList;
	if (deviceList.length > 0) {
		for (var i = 0; i < deviceList.length;i++) {
			var deviceId = deviceList[i].deviceId;
			var deviceWlanAcName = deviceList[i].wlanacname;
			var deviceIp = deviceList[i].ipAddr;
			var devicePort = deviceList[i].port;
			var accountId = deviceList[i].accoutId;
			var accountUsername = deviceList[i].accountUsername;
			var accountMerchantName = (deviceList[i].accountMerchantName == null) ? "" : deviceList[i].accountMerchantName;
			var accountFullname = (deviceList[i].accountFullname == null) ? "" : deviceList[i].accountFullname;
			var accountType = deviceList[i].accountType;
			var deviceProvince = deviceList[i].deviceProvince;
			var deviceCity = deviceList[i].deviceCity;
			var deviceCountyDistrict = deviceList[i].deviceCountyDistrict;
			var deviceAddress = deviceList[i].deviceAddress;
			var deviceLocation = deviceProvince + " " + deviceCity + " " + deviceCountyDistrict;
			var deviceCreateDatetime = deviceList[i].createDatetime;
			
			deviceListHtml += "<tr class='ChinaNet-Table-Body'>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=     "<span class='Table-Data-Name' id='id_device_id_" + i + "'>" + deviceId + "</span>";
			deviceListHtml +=     "<div ><span style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 13em;' title='"+deviceWlanAcName+"' class='Table-Data-Text' id='id_device_wlanacname_" + i + "'>" + deviceWlanAcName + "</span></div>";
			deviceListHtml +=   "</td>";

			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_ip_" + i + "'>" + deviceIp + "</span>";
			deviceListHtml +=	  "<span class= 'Table-Data-Text' id='id_port_" + i + "'>" + devicePort + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_username_" + i + "'>" + accountUsername + "</span>";
			deviceListHtml +=	  "<span class= 'Table-Data-Text' id='id_merchant_name_" + i + "'>" + ((accountMerchantName == "") ? accountFullname : accountMerchantName) + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_location_" + i + "'>" + deviceLocation + "</span>";
			deviceListHtml +=	  "<span class= 'Table-Data-Text' id='id_create_datetime_" + i + "'>" + deviceCreateDatetime + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
			deviceListHtml +=	   "<a href='javascript:;' data-id='" + i + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
			deviceListHtml +=	 "</td>";
			deviceListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	deviceListHtml +=	 "</table>";	
	return deviceListHtml;
}

function loadComButton(i) {
	var jsonObj2 = {ComButton:[]};
	 var ComButton = jsonObj2.ComButton;
	 
	 jsonObj2.ComButton.push({url:'javascript:showDeviceDetails(\'' + i + '\');', text:'详情'});
	 jsonObj2.ComButton.push({url:'javascript:addFitAp(\'' + i + '\');', text:'添加FitAp'});
	 return ComButton;
}

/************************** 查看Radius设备详细信息 *****************************/

function showDeviceDetails(i) {
	var deviceDetailsHtml = "";
	deviceDetailsHtml += "<div class='UserInfo-Settings-Body'>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备ID</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled'>";
	deviceDetailsHtml += "      <input type='text' id='input_device_id' class='Input-Control' readonly>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>AC NAME</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8'>";
	deviceDetailsHtml += "      <input type='text' id='input_wlan_ac_name' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>IP</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8'>";
	deviceDetailsHtml += "      <input type='text' id='input_radius_ip' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>端口</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8'>";
	deviceDetailsHtml += "      <input type='text' id='input_radius_port' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>名称</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8'>";
	deviceDetailsHtml += "      <input type='text' id='input_radius_name' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>描述</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8'>";
	deviceDetailsHtml += "      <input type='text' id='input_radius_description' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>AUTH 加密</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8'>";
	deviceDetailsHtml += "      <input type='text' id='input_auth_secret' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>ACCOUNTING 加密</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8'>";
	deviceDetailsHtml += "      <input type='text' id='input_accounting_secret' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";

	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>所属账户名</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled'>";
	deviceDetailsHtml += "      <input type='text' id='input_account_username' class='Input-Control' readonly>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>所属商户名</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled'>";
	deviceDetailsHtml += "      <input type='text' id='input_account_merchant_name' class='Input-Control' readonly>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>所属账户类型</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled'>";
	deviceDetailsHtml += "      <input type='text' id='input_account_type' class='Input-Control' readonly>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备注册时间</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled'>";
	deviceDetailsHtml += "      <input type='text' id='input_device_create_datetime' class='Input-Control' readonly>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备所在地</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled'>";
	deviceDetailsHtml += "      <input type='text' id='input_device_location' class='Input-Control' readonly>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "</div>";
		
	var d_deviceDetails = dialog({
		id: 'Dailogin:RadiusDetails',
		title: '设备详情',
		content: deviceDetailsHtml,
		okValue: '确认编辑',
		ok: function () {
			submitRadius(i);
			return false;
		},
		cancelValue: '关闭',
		cancel: function () {},
		width:800,
		height:640,
		skin:'ChinaNet-Dialog'
	});
	d_deviceDetails.showModal();
	viewDeviceDetails(i);
}

function viewDeviceDetails(i) {
	var deviceProvince = device_list[i].deviceProvince;
	var deviceCity = device_list[i].deviceCity;
	var deviceCountyDistrict = device_list[i].deviceCountyDistrict;
	var deviceAddress = device_list[i].deviceAddress;
	var deviceLocation = deviceProvince + " " + deviceCity + " " + 
					deviceCountyDistrict + " " + deviceAddress;
	var deviceMerchantName = "";
	if (device_list[i].accountMerchantName != "") {
		deviceMerchantName = device_list[i].accountMerchantName;
	} else if(device_list[i].accountUserName != "") {
		deviceMerchantName = device_list[i].accountFullname;
	} else {
		deviceMerchantName = "";
	}
	$("#input_device_id").val(device_list[i].deviceId);
	$("#input_wlan_ac_name").val(device_list[i].wlanacname);
	$("#input_radius_ip").val(device_list[i].ipAddr);
	$("#input_radius_port").val(device_list[i].port);
	$("#input_radius_name").val(device_list[i].name);
	$("#input_radius_description").val(device_list[i].description);
	$("#input_auth_secret").val(device_list[i].authSecret);
	$("#input_accounting_secret").val(device_list[i].accountingSecret);
	$("#input_account_username").val(device_list[i].accountUsername);
	$("#input_account_merchant_name").val(deviceMerchantName);
	$("#input_account_type").val(getAccountTypeCnName(device_list[i].accountType));
	$("#input_device_create_datetime").val(device_list[i].createDatetime);
	$("#input_device_location").val(deviceLocation);
}

function submitRadius(i) {
	var wlanacname = $("#input_wlan_ac_name").val();
	var ipAddr = $("#input_radius_ip").val();
	var port = $("#input_radius_port").val();
	var authSecret = $("#input_auth_secret").val();
	var accountingSecret = $("#input_accounting_secret").val();
	var name = $("#input_radius_name").val();
	var description = $("#input_radius_description").val();
	
	if(wlanacname == device_list[i].wlanacname &&
			ipAddr == device_list[i].ipAddr &&
			port == device_list[i].port &&
			authSecret == device_list[i].authSecret &&
			accountingSecret == device_list[i].accountingSecret &&
			name == device_list[i].name &&
			description == device_list[i].description) {
		dialog.list['Dailogin:RadiusDetails'].remove().close();
		return false;
	}
	if(!onCheckEmpty(wlanacname)) { 
		onAlertErrorTip('AC NAME不能为空', document.getElementById('input_wlan_ac_name'));
		return false;
	} else if(isChn(wlanacname)) {
		onAlertErrorTip('AC NAME只能为英文、数字或半角字符', document.getElementById('input_wlan_ac_name'));
		return false;
	} else if(!onCheckMaxLength(wlanacname, 200)) {
		onAlertErrorTip('AC NAME不能超过200个字符', document.getElementById('input_wlan_ac_name'));
		return false;
	} else if((!onCheckWlanacnameExits(wlanacname)) && wlanacname != device_list[i].wlanacname) {
		onAlertErrorTip('AC NAME已存在', document.getElementById('input_wlan_ac_name'));
		return false;
	}
	if(!onCheckEmpty(ipAddr)) { 
		onAlertErrorTip('IP不能为空', document.getElementById('input_radius_ip'));
		return false;
	} else if(!isIP(ipAddr)) {
		onAlertErrorTip('IP格式错误', document.getElementById('input_radius_ip'));
		return false;
	}
	if(!checkInt(port)) {
		onAlertErrorTip('端口号只能为数字', document.getElementById('input_radius_port'));
		return false;
	} else if(!checkPort(port)) {
		onAlertErrorTip('端口号不能大于65535或小于1', document.getElementById('input_radius_port'));
		return false;
	}
	if(isChn(authSecret)) {
		onAlertErrorTip('auth加密方式只能为英文、数字或半角符号', document.getElementById('input_auth_secret'));
		return false;
	} else if(!onCheckLength(authSecret, 64)) {
		onAlertErrorTip('auth加密方式不能超过64个字符', document.getElementById('input_auth_secret'));
		return false;
	}
	if(isChn(accountingSecret)) {
		onAlertErrorTip('accounting加密方式只能为英文、数字或半角符号', document.getElementById('input_accounting_secret'));
		return false;
	} else if(!onCheckLength(accountingSecret, 64)) {
		onAlertErrorTip('accounting加密方式不能超过64个字符', document.getElementById('input_accounting_secret'));
		return false;
	}
	if(!onCheckLength(name, 120)) {
		onAlertErrorTip('名称不能超过120个字符', document.getElementById('input_radius_name'));
		return false;
	}
	
	$.ajax({
		url : '/device/updateradiusserver.htm',
		type : 'POST',
		data : {
			"deviceId" : device_list[i].deviceId,
			"wlanacname_old" : device_list[i].wlanacname,
			"wlanacname" : wlanacname,
			"ac_ip" : ipAddr,
			"port" : port,
			"authSerect" : authSecret,
			"accountingSecret" : accountingSecret,
			"name" : name,
			"description" : description
		},
		dataType : 'json',
		async : false,
		success : function(data) {
			if(data.result == 'OK') {
				onAlertError('修改成功！');
				deviceSearchHandler.clearResultSetpageNo();
				deviceSearchHandler.searchWithPreload();
				dialog.list['Dailogin:RadiusDetails'].remove().close();
			} else {
				onAlertError('修改失败！' + data.message);
				return false;
			}
		}
	});
}
/*
*//************************** 将Radius设备分配给商户 *****************************//*

function modifyDeviceAccount(i) {
	if(device_list[i].accountId != 1) {
		onConfirmDialog('<p>您确定要修改该设备的所属商户吗？</p><p>该设备已属于某一商户</p>', 
				function(){modifyDeviceAccountOK(i)}, function(){});
	} else {
		modifyDeviceAccountOK(i);
	}
}

function modifyDeviceAccountOK(i) {
	$.ajax({
		url : '/system/devicetomerchantpage.htm?deviceId='+device_list[i].deviceId,
		type : 'GET',
		data : device_list[i].deviceId,
		dataType : 'HTML',
		async : false,
		success : function(data) {
			if(data.result == 'FAIL') {
				error = data.message;
			} else {
				content = data;
			}
		}
	});
	var d = dialog({
		id: 'Dailogin:Device:toMerchant',
		title: '分配给商户',
		content: content,
		cancelValue: '取消',
		cancel: function () {},
		width:720,
		height:545,
		zIndex:20,
		skin:'ChinaNet-Dialog'
	});
		d.showModal();
}
*/

function addFitAp(i) {
	var fitApHtml = "";
	
	fitApHtml += "<div class='UserInfo-Settings-Body'>";
	
	fitApHtml += "  <div class='ChinaNet-Form-Sheet Form-Item-Required'>";
	fitApHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>SSID</label>";
	fitApHtml += "    <div class='Form-Item-Input ChinaNet-Col-8'>";
	fitApHtml += "      <input type='text' id='input_new_ssid' class='Input-Control'>";
	fitApHtml += "    </div>";
	fitApHtml += "  </div>";
	
	fitApHtml += "  <div class='ChinaNet-Form-Sheet'>";
	fitApHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>所属DeviceId</label>";
	fitApHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled'>";
	fitApHtml += "      <input type='text' id='input_ac_device_id' class='Input-Control' readOnly>";
	fitApHtml += "    </div>";
	fitApHtml += "  </div>";
	
	fitApHtml += "  <div class='ChinaNet-Form-Sheet Form-Item-Required'>";
	fitApHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>AP MAC</label>";
	fitApHtml += "    <div class='Form-Item-Input ChinaNet-Col-8'>";
	fitApHtml += "      <input type='text' id='input_new_mac' class='Input-Control'>";
	fitApHtml += "    </div>";
	fitApHtml += "  </div>";
	
	fitApHtml += "</div>";
	
	var d_fitApDetails = dialog({
		id: 'Dailogin:addFitAp',
		title: '添加Fit Ap',
		content: fitApHtml,
		okValue: '提交',
		ok: function () {
			submitFitAp(i);
			return false;
		},
		cancelValue: '关闭',
		cancel: function () {},
		width:600,
		height:200,
		skin:'ChinaNet-Dialog'
	});
	d_fitApDetails.showModal();
	viewFitApDetails(i);
}

function viewFitApDetails(i) {
	$("#input_ac_device_id").val(device_list[i].deviceId);
}

function submitFitAp(i) {
	var ssid = $("#input_new_ssid").val();
	var apMac = $("#input_new_mac").val();
	var acDeviceId = device_list[i].deviceId;
	
	if(!onCheckEmpty(ssid)) { 
		onAlertErrorTip('SSID不能为空', document.getElementById('input_new_ssid'));
		return false;
	}
	if(!onCheckEmpty(apMac)) { 
		onAlertErrorTip('AP MAC不能为空', document.getElementById('input_new_mac'));
		return false;
	} else if(!checkMac(apMac)) {
		onAlertErrorTip('MAC格式不正确', document.getElementById('input_new_mac'));
		return false;
	}
	if(!checkFitApExits(ssid, acDeviceId, apMac)) {
		onAlertErrorTip('Fit Ap已存在！', document.getElementById('input_new_ssid'));
		return false;
	}
	
	$.ajax({
		url : '/device/addfitap.htm',
		type : 'POST',
		data : {
			"ssid" : ssid,
			"ac_device_id" : acDeviceId,
			"ap_mac" : apMac,
			"location_id" : device_list[i].locationId,
			"wlanacname" : device_list[i].wlanacname
		},
		dataType : 'json',
		async : false,
		success : function(data) {
			if(data.result == 'OK') {
				onAlertError("添加成功！");
				dialog.list['Dailogin:addFitAp'].remove().close();
			} else {
				onAlertError("添加失败！" + data.message);
			}
		}
	});
}

function checkFitApExits(ssid, acDeviceId, apMac) {
	var result = false;
	$.ajax({
		url : '/device/fitapisexits.htm',
		type : 'GET',
		data : {
			"ssid" : ssid,
			"ac_device_id" : acDeviceId,
			"ap_mac" : apMac
		},
		dataType : 'json',
		async : false,
		success : function(data) {
			if(data.result == 'OK') {
				result = true;
			}
		}
	});
	return result;
}

/**************************************************************************/

function onShowData(){
	$('div.ChinaNet-Settings-Button a').each(function(x){
		var i = $(this).attr('data-id');
			$(this).attr('id', i);
			$('a#'+i).xiMenu({
			menuItem:loadComButton(i),
			skinClass:'public-Settings-MenuForXiMenu',
			activeClass:'Open',
			align:'right',
			paramAttr:['data-id']
		});
	});
}

function searchFailCallBack(data, message) {	
	onAlertError('加载设备数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载设备数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();	
	return false;
}