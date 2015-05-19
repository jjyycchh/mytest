var deviceSearchHandler = null;
var device_list = null;

deviceSearchHandler = new searchUtil(deviceListHtml, searchFailCallBack, searchErrorCallBack, null, onShowDevData,
				"device_list_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchfitapdevice.htm", "");

var fitapdeviceApp = function() {
	
	var keywordsSearch = function() {		
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
	
	var onsearchDev = function(){
		$("#btn_search_device").click(function() {
			keywordsSearch();
		});
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
				keywordsSearch();
				return false;
		    }
		});
		onsearchDev();
		initDatepicker();
	}}
}();

function deviceListHtml(deviceList) {
	var deviceListHtml = "";
	device_list = deviceList;
	if (deviceList.length > 0) {
		for (var i = 0; i < deviceList.length; i++) {
			var ssid = deviceList[i].ssid;
			var acDeviceId = deviceList[i].acDeviceId;
			var apMac = deviceList[i].apMac;
			var deviceId = deviceList[i].deviceId;
			var createDatetime = deviceList[i].createDatetime;
			var wlanacname = deviceList[i].wlanacname;

			if(wlanacname.length > 30) {
				wlanacname = wlanacname.substr(0, 30) + "...";
			}
			
			deviceListHtml += "<tr class='ChinaNet-Table-Body'>";

			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_ssid_" + i + "'>" + ssid + "</span>";
			deviceListHtml +=	  "<span class= 'Table-Data-Text' id='id_device_id_" + i + "'>" + deviceId + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_ap_mac_" + i + "'>" + apMac + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_create_datetime_" + i + "'>" + createDatetime + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_wlanacname_" + i + "'>" + wlanacname + "</span>";
			deviceListHtml +=	  "<span class= 'Table-Data-Text' id='id_ac_device_id_" + i + "'>" + acDeviceId + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
			deviceListHtml +=     "<a href='javascript:;' data-id='" + i + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml += "</tr>";
		} 
	} else {
		$(".ChinaNet-Page-Table").hide();
	}
	return deviceListHtml;
}

function loadComButton(i) {
	var jsonObj2 = {ComButton:[]};
 	var ComButton = jsonObj2.ComButton;
 	
 	jsonObj2.ComButton.push({url:'javascript:showFitApDetails(\'' + i + '\');', text:'编辑'});
 	
 	return ComButton;
}

function showFitApDetails(i) {
	var deviceDetailsHtml = "";
	deviceDetailsHtml += "<div class='UserInfo-Settings-Body'>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备 ID</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled' id='div_device_id'>";
	deviceDetailsHtml += "      <input type='text' id='input_device_id' class='Input-Control' readOnly>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备 MAC</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8' id='div_device_mac'>";
	deviceDetailsHtml += "      <input type='text' id='input_device_mac' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>设备 SSID</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8' id='div_device_ssid'>";
	deviceDetailsHtml += "      <input type='text' id='input_device_ssid' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>所属AC</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8' id='div_ac_device_id'>";
	deviceDetailsHtml += "      <input type='text' id='input_ac_device_id' class='Input-Control'>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>所属AC Name</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled' id='div_wlanacname'>";
	deviceDetailsHtml += "      <input type='text' id='input_wlanacname' class='Input-Control' readOnly>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>注册时间</label>";
	deviceDetailsHtml += "    <div class='Form-Item-Input ChinaNet-Col-8 Form-Item-Disabled' id='div_create_datetime'>";
	deviceDetailsHtml += "      <input type='text' id='input_create_datetime' class='Input-Control' readOnly>";
	deviceDetailsHtml += "    </div>";
	deviceDetailsHtml += "  </div>";
	
	deviceDetailsHtml += "</div>";
	
	var d_fitApDetails = dialog({
		id: 'Dailogin:FitApDetails',
		title: '编辑Fit Ap详细信息',
		content: deviceDetailsHtml,
		okValue:'提交',
		ok : function() {
			submitFitAp(i);
			return false;
		},
		cancelValue: '关闭',
		cancel: function () {},
		width:600,
		height:320,
		skin:'ChinaNet-Dialog'
	});
	d_fitApDetails.showModal();
	viewDeviceDetails(i);
}

function viewDeviceDetails(i) {
	$("#input_device_id").val(device_list[i].deviceId);
	$("#input_device_mac").val(device_list[i].apMac);
	$("#input_device_ssid").val(device_list[i].ssid);
	$("#input_ac_device_id").val(device_list[i].acDeviceId);
	$("#input_wlanacname").val(device_list[i].wlanacname);
	$("#input_create_datetime").val(device_list[i].createDatetime);
}

function submitFitAp(i) {
	var ssid = $("#input_device_ssid").val();
	var apMac = $("#input_device_mac").val();
	var acDeviceId = $("#input_ac_device_id").val();
	
	if(!onCheckEmpty(ssid)) { 
		onAlertErrorTip('SSID不能为空', document.getElementById('input_device_ssid'));
		return false;
	}
	if(!onCheckEmpty(apMac)) { 
		onAlertErrorTip('AP MAC不能为空', document.getElementById('input_device_mac'));
		return false;
	} else if(!checkMac(apMac)) {
		onAlertErrorTip('MAC格式不正确', document.getElementById('input_device_mac'));
		return false;
	} 
	if(!onCheckEmpty(acDeviceId)) { 
		onAlertErrorTip('AC不能为空', document.getElementById('input_ac_device_id'));
		return false;
	} else if(!onCheckAc(acDeviceId)) {
		onAlertErrorTip('AC不存在', document.getElementById('input_ac_device_id'));
		return false;
	}
	if(!checkFitApExits(ssid, acDeviceId, apMac)) {
		onAlertErrorTip('Fit Ap已存在', document.getElementById('input_device_ssid'));
		return false;
	}
	
	$.ajax({
		url : '/device/modifyfitap.htm',
		type : 'POST',
		data : {
			"device_id" : device_list[i].deviceId,
			"ssid" : ssid,
			"ac_device_id" : acDeviceId,
			"ap_mac" : apMac
		},
		dataType : 'json',
		async : false,
		success : function(data) {
			if(data.result == 'OK') {
				onAlertError("修改成功！");
				deviceSearchHandler.clearResultSetpageNo();
				deviceSearchHandler.searchWithPreload();
				dialog.list['Dailogin:FitApDetails'].remove().close();
			} else {
				onAlertError("修改失败！" + data.message);
			}
		}
	});
}

function onCheckAc(acDeviceId) {
	var result = false;
	$.ajax({
		url : '/device/acdeviceisexits.htm',
		type : 'GET',
		data : {
			"device_id" : acDeviceId
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