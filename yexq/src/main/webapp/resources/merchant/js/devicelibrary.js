var deviceSearchHandler = null;
var device_list = null;

deviceSearchHandler = new searchUtil(deviceListHtml, searchFailCallBack, searchErrorCallBack, null, onShowDevData,
				"device_list", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchdevice.htm", "");

var deviceLibraryApp = function() {
	
	var keywordsSearchDevice = function() {		
		$("div.ChinaNet-Page-Table").show();
		deviceSearchHandler.clearResultSetpageNo();
		var keywords = deviceSearchHandler.convertKeywordsSearchable($("#keywords").val());
		deviceSearchHandler.setSearchParemeter('keywords', keywords);
		deviceSearchHandler.setSearchParemeter('type', $("#device_type_select").val());
		deviceSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		deviceSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));				
		if(onCheckLength(keywords)) {
			deviceSearchHandler.searchWithPreload();
		} else {
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	
	var onsearchDev = function(){
		$("#btn_Search_device").click(function() {
			//searchTotalDevices();
			keywordsSearchDevice();
		});
	}
	
	var onTypeSelect = function() {
		$('#device_type_select').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'',text:'全部设备'},
        	data:[
        	      {value:'',text:'全部设备'},
        	      {value:'CUSTOMIZED_AP',text:'CUSTOMIZED_AP'},
        	      {value:'FIT_AP',text:'FIT_AP'},
        	      {value:'NAS',text:'NAS'},
        	      {value:'P2',text:'P2'},
        	      {value:'STANDARD_AP',text:'STANDARD_AP'},
        	      {value:'THIRD_ACCESS',text:'THIRD_ACCESS'}]});
	}
	
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
		onsearchDev();
		initDatepicker();
		onTypeSelect();
	}}
}();

function searchTotalDevices() {
	var keywords = deviceSearchHandler.convertKeywordsSearchable($("#keywords").val());
	$.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/system/searchdevicetotal.htm',
        data: {
        	"keywords" : keywords,
        	"type" : $("#device_type_select").val(),
        	"startdate" : $("#startdate").val(),
        	"enddate" : addoneday($("#enddate").val())
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	$("#total_devices").text("共" + data.total + "条");
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError(data.message);
        }
    });	
}

function deviceListHtml(deviceList) {
	var deviceListHtml = "";
	device_list = deviceList;
	deviceListHtml += 	"<table>";				
	deviceListHtml += 		"<tr class='ChinaNet-Table-Title'>";
	deviceListHtml +=			"<th  width='25%'>MAC/品牌型号</th>";
	deviceListHtml +=			"<th  width='25%'>固件/组件版本</th>"	;
	deviceListHtml +=			"<th  width='20%'>所在地/注册时间</th>"	;
	deviceListHtml +=			"<th  width='25%'>所属商户</th>";
	//deviceListHtml +=			"<th  width='10%'>所在地</th>";
	deviceListHtml +=			"<th></th>";		
	deviceListHtml += 		"</tr>";
			
	if (deviceList.length > 0) {			
		for (var i = 0; i < deviceList.length;i++) {
			var id = deviceList[i].deviceId;
			var mac = "";
			var brand = deviceList[i].brand;
			var model = deviceList[i].model;
			var firmwareVersion = deviceList[i].framewareVersion;
			var componentVersion = deviceList[i].componentVersion;
			var accountUsername = deviceList[i].accountUsername;
			var accountMerchantName = "";
			if(deviceList[i].accountMerchantName != "") {
				accountMerchantName = deviceList[i].accountMerchantName;
			} else if(deviceList[i].accountFullname != "") {
				accountMerchantName = deviceList[i].accountFullname;
			}
			if(accountUsername.length > 30) {
				accountUsername = accountUsername.substr(0, 30) + "...";
			}
			if(accountMerchantName.length > 30) {
				accountMerchantName = accountMerchantName.substr(0, 30) + "...";
			}
			var location =  ((deviceList[i].province == null || deviceList[i].province == '请选择') ? "" : deviceList[i].province) + " " + 
					((deviceList[i].city == null || deviceList[i].city == '请选择') ? "" : deviceList[i].city) + " " +
					((deviceList[i].countyDistrict == null || deviceList[i].countyDistrict == '请选择') ? "" : deviceList[i].countyDistrict);
			var createDatetime = deviceList[i].createDatetime;
			if(deviceList[i].brand == 'RADIUS' && deviceList[i].model == 'RADIUS') {
				mac = "RADIUS（虚拟设备）";
			} else if(deviceList[i].brand == 'THIRD_PLATFORM' && deviceList[i].model == 'THIRD_PLATFORM') {
				mac = "二级平台（虚拟设备）";
			} else if(deviceList[i].brand == 'THIRD_PART' && deviceList[i].model == 'THIRD_PART') {
				mac = "第三方接入（虚拟设备）";
			} else {
				mac = deviceList[i].mac;
			}
			
			
			deviceListHtml += "<tr class='ChinaNet-Table-Body'>";
			
			deviceListHtml += 	"<td>" ;
			deviceListHtml +=     "<span class='Table-Data-Name' id='device_mac_" + id + "'>" + mac + "</span>";
			deviceListHtml +=     "<span class='Table-Data-Text' id='device_brand_model_" + id + "'>" + brand + " " + model + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml += 	"<td>" ;
			deviceListHtml +=     "<span class='Table-Data-Name' id='device_firmware_" + id + "'>" + firmwareVersion + "</span>";
			deviceListHtml +=     "<span class='Table-Data-Text' id='device_component_" + id + "'>" + componentVersion + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml += 	"<td>" ;
			deviceListHtml +=     "<span class='Table-Data-Name' id='device_location_" + id + "'>" + location + "</span>";
			deviceListHtml +=     "<span class='Table-Data-Text' id='device_create_datetime_" + id + "'>" + createDatetime + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml += 	"<td>" ;
			deviceListHtml +=     "<span class='Table-Data-Name' id='device_account_username_" + id + "'>" + accountUsername + "</span>";
			deviceListHtml +=     "<span class='Table-Data-Text' id='device_account_merchant_" + id + "'>" + accountMerchantName + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
			deviceListHtml +=     "<a href='javascript:;' data-id='" + i + "' data-brand='" + brand + "' " +
					"data-model='" + model + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
			deviceListHtml +=   "</td>";
			deviceListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	deviceListHtml += 	"</table>";	
	return deviceListHtml;
}

function loadComButton(i) {
	var jsonObj2 = {ComButton:[]};
 	var ComButton = jsonObj2.ComButton;
 	
 	jsonObj2.ComButton.push({url:'javascript:showDeviceDetails(\'' + i + '\');', text:'详情'});
 	
 	return ComButton;
}

/***************************** 查看设备详细信息 *****************************/

function showDeviceDetails(i) {
	var deviceDetailsHtml = "";
	deviceDetailsHtml += "<div class='UserInfo-Settings-Body'>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备 ID</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Label ChinaNet-Col-8' id='div_device_id'></div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备 MAC</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Label ChinaNet-Col-8' id='div_device_mac'></div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>品牌型号</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Label ChinaNet-Col-8' id='div_brand_model'></div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>固件版本</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Label ChinaNet-Col-8' id='div_firmware_version'></div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>组件版本</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Label ChinaNet-Col-8' id='div_component_version'></div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>所属帐号</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Label ChinaNet-Col-8' id='div_account_username'></div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>所属商户名</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Label ChinaNet-Col-8' id='div_merchant_name'></div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备所在地</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Label ChinaNet-Col-8' id='div_device_location'></div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备注册时间</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Label ChinaNet-Col-8' id='div_create_datetime'></div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "</div>";
	
	var d_deviceDetails = dialog({
		id: 'Dailogin:DeviceDetails',
		title: '设备详情',
		content: deviceDetailsHtml,
		cancelValue: '关闭',
		cancel: function () {},
		width:600,
		height:480,
		skin:'ChinaNet-Dialog'
	});
	d_deviceDetails.showModal();
	viewDeviceDetails(i);
}

function viewDeviceDetails(i) {
	var deviceId = device_list[i].deviceId;
	var brand = device_list[i].brand;
	var model = device_list[i].model;
	var firmware = device_list[i].framewareVersion;
	var component = device_list[i].componentVersion;
	var username = device_list[i].accountUsername;
	var merchantName = "";
	var mac = "";
	if (device_list[i].accountMerchantName != "") {
		merchantName = device_list[i].accountMerchantName;
	} else if(device_list[i].accountFullname != "") {
		merchantName = device_list[i].accountFullname;
	}
	if(device_list[i].brand == 'RADIUS' && device_list[i].model == 'RADIUS') {
		mac = "RADIUS（虚拟设备）";
	} else if(device_list[i].brand == 'THIRD_PLATFORM' && device_list[i].model == 'THIRD_PLATFORM') {
		mac = "二级平台（虚拟设备）";
	} else if(device_list[i].brand == 'THIRD_PART' && device_list[i].model == 'THIRD_PART') {
		mac = "第三方接入（虚拟设备）";
	} else {
		mac = device_list[i].mac;
	}
	var location =  ((device_list[i].province == '请选择') ? "" : device_list[i].province) + " " + 
			((device_list[i].city == '请选择') ? "" : device_list[i].city) + " " +
			((device_list[i].countyDistrict == '请选择') ? "" : device_list[i].countyDistrict) + " " +
			device_list[i].address;
	var createDatetime = device_list[i].createDatetime;
	
	
	$("#div_device_id").text(deviceId);
	$("#div_device_mac").text(mac);
	$("#div_brand_model").text(brand + " " + model);
	$("#div_firmware_version").text(firmware);
	$("#div_component_version").text(component);
	$("#div_account_username").text(username);
	$("#div_merchant_name").text(merchantName);
	$("#div_device_location").text(location);
	$("#div_create_datetime").text(createDatetime);
}

/**************************************************************************/

function onShowDevData(){
	$('div.ChinaNet-Settings-Button a').each(function(x){
		var i = $(this).attr('data-id');
        var brand = $(this).attr('data-brand');   
        var model = $(this).attr('data-model'); 
            $(this).attr('id', i);
            $('a#'+i).xiMenu({
            menuItem:loadComButton(i, brand, model),
            skinClass:'public-Settings-MenuForXiMenu',
            activeClass:'Open',
            align:'right',
            paramAttr:['data-id','data-brand','data-model']
        });
	});
}

function searchFailCallBack(data, message) {	
	onAlertError(message);
	$(".ChinaNet-Page-Table").hide();
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError(message);
	$(".ChinaNet-Page-Table").hide();	
	return false;
}