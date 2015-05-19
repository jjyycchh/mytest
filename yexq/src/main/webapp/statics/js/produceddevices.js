var producedDevicesSearchHandler = null;
var produced_devices_list = null;

producedDevicesSearchHandler = new searchUtil(producedDevicesListHtml, searchFailCallBack, searchErrorCallBack, onNewPage, onShowDevData,
		"producedDevices_list_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
		"/system/searchproduceddevices.htm", "");

var producedDevicesMgmtApp = function() {
	
	var keywordsSearchProducedDevices = function() {	
		$("div.ChinaNet-Page-Table").show();
		producedDevicesSearchHandler.clearResultSetpageNo();
		var keywords = producedDevicesSearchHandler.convertKeywordsSearchable($("#keywords").val());
		if ($("#SelectDeviceProvice").val() != "请选择" && $("#SelectDeviceProvice").val() != " ") {
			producedDevicesSearchHandler.setSearchParemeter('province', $("#SelectDeviceProvice").val());
			if ($("#SelectDeviceCity").val() != "请选择" && $("#SelectDeviceCity").val() != " ") {
				producedDevicesSearchHandler.setSearchParemeter('city', $("#SelectDeviceCity").val());
				if ($("#SelectDeviceCounty").val() != "请选择" && $("#SelectDeviceCounty").val() != " ") {
					producedDevicesSearchHandler.setSearchParemeter('county', $("#SelectDeviceCounty").val());					
				} else {
					producedDevicesSearchHandler.setSearchParemeter('county', "");
				}
			} else {
				producedDevicesSearchHandler.setSearchParemeter('city', "");
			}
		} else {
			producedDevicesSearchHandler.setSearchParemeter('province', "");
		}
		producedDevicesSearchHandler.setSearchParemeter('keywords', keywords);
		producedDevicesSearchHandler.setSearchParemeter('status', $("#statusSelect").val());
		producedDevicesSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		producedDevicesSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));				
		if(onCheckLength(keywords)) {
			producedDevicesSearchHandler.searchWithPreload();
		} else {
			onAlertError('您输入的关键字太多，请重新输入');
		}	
	}
	
	var onsearchDev = function(){
		$("#btn_Search_device").click(function() {
			$("#producedDevices_list").show();
			$("#importErr_list").hide();
			keywordsSearchProducedDevices();
			document.getElementById('checkbox_all').style.display = "none";
			for (var i = 0; i < produced_devices_list.length; i++) {
				document.getElementById('checkbox_' + i).style.display = "none";
			}
			$("#btn_multi_option").show();
			document.getElementById('cancel_multi').style.display = "none";
			document.getElementById('multi_audit').style.display = "none";
			document.getElementById('multi_delete').style.display = "none";
		});
	}
	
	//开始批量操作
	var multiOption = function() {
		$("#btn_multi_option").click(function() {
			document.getElementById('checkbox_all').style.display = "";
			for (var i = 0; i < produced_devices_list.length; i++) {
				document.getElementById('checkbox_' + i).style.display = "";
			}
			$("#btn_multi_option").hide();
			document.getElementById('cancel_multi').style.display = "";
			document.getElementById('multi_audit').style.display = "";
			document.getElementById('multi_delete').style.display = "";
		});
	}
	
	//取消批量操作
	var multiCancel = function() {
		$("#btn_multi_option_cancel").click(function() {
			document.getElementById('checkbox_all').style.display = "none";
			for (var i = 0; i < produced_devices_list.length; i++) {
				document.getElementById('checkbox_' + i).style.display = "none";
			}
			$("#btn_multi_option").show();
			document.getElementById('cancel_multi').style.display = "none";
			document.getElementById('multi_audit').style.display = "none";
			document.getElementById('multi_delete').style.display = "none";
		});
	}
	
	//全选与全不选
	var multiSelectAll = function() {
		$("#select_all").live('click', function() {
			if(document.getElementById("select_all").checked) {
				for(var i=0;i<produced_devices_list.length;i++) {
					document.getElementsByName('checkbox')[i].checked = true;
				} 
			} else {
				for(var i=0;i<produced_devices_list.length;i++) {
					document.getElementsByName('checkbox')[i].checked = false;
				}
			}
		});
	}
	
	//批量审批
	var multiAudited = function() {
		$("#btn_multi_audit").click(function() {
			var obj = document.getElementsByName('checkbox');
			var mac = "";
			for(var i=0; i<obj.length; i++){    
				if(obj[i].checked && produced_devices_list[i].status == "WAITED") {
					mac += produced_devices_list[i].mac;
					mac += " ";
				}   
			}
			
			if(mac == "") {
				onAlertError('没有可审批的设备');
			} else {
				auditDeviceOK(mac);
			}
		});
	}
	
	//批量删除
	var multiDelete = function() {
		$("#btn_multi_delete").click(function() {
			var obj = document.getElementsByName('checkbox');
			var mac = "";
			for(var i=0; i<obj.length; i++){    
				if(obj[i].checked) {
					mac += produced_devices_list[i].mac;
					mac += " ";
				}   
			}
			
			if(mac == "") {
				onAlertError('没有选择要删除的设备');
			} else {
				deleteDevice(mac);
			}
		});
	}	
	
	
	
	//初始化状态选择框
	var initStatusSelect = function() {
        $('#statusSelect').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'',text:'不限'},
        	data:[
        	      {value:'',text:'不限'},
        	      {value:'audited',text:'已审批'},
        	      {value:'waited',text:'未审批'}]});
    }
	
	//初始化地区选择框
	var initLocationSelect = function(){
		$("#SelectDeviceProvinceList").show();
		$("#SelectDeviceCityList").hide();
		$("#SelectDeviceCountyList").hide();
		$('input#SelectDeviceProvice').xiSelect({
            offsetSize:[0,3,0,3],
            data:getProviceList(),
            defaultData:{value:'',text:''},
            onChange:function(obj){
            	if ($('input#SelectDeviceProvice').val() != "请选择") {
            		$("#SelectDeviceCityList").show();
            	}
            	$("#SelectDeviceCountyList").hide();
            	onChangeProviceSelect($(obj).attr('data-value'));         	            	
            }
        });
    }
	
	//初始化日期选择框
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
	
	//初始化文件上传窗口
	var fileUploadInit = function(){
		IFileUpload.init({
			 clickSelector: "#btn_Import_device",
			 fileInputSelector: "#input_upload_file",
			 typeSupportDesc: "支持的文件类型: csv(确保使用UTF8编码)",
			 filetype:".csv",
			 fileupload: {
				 url: "/system/fileuploadandvalidation.htm",
				 done: function (e, data) {
					 if(data.result && data.result.result == "OK"){
						 showErrInfo(data);
						 setTimeout(function() {
							 IFileUpload.close();
							 }, 800);						 
					 } else {
						 onAlertError(data.result.message);
						 IFileUpload.close();
					 }
				 }
			 }
		 });
		
		var showErrInfo = function(data) {
    		$("#producedDevices_list").hide();
    		$("#importErr_list").show();
    		$("#page_info").hide();
    		var errList = data.result.message; 
    		var errListHtml = "";
    		errListHtml += 	"<tr class='ChinaNet-Table-Title'>";
    		errListHtml += 		"<th width='25%'>未导入设备出错信息</th>";
    		errListHtml += 		"<th width='25%'></th>";
    		errListHtml += 		"<th width='25%'></th>";
    		errListHtml += 		"<th width='25%'></th>";
    		errListHtml += 	"</tr>";
    		for (var i = 0; i < errList.length; i += 4) {
    			errListHtml += "<tr class='Device-State-Table-Body'>";
    			for (var j = 0; j < 4; j++) {
    				errListHtml += 	"<td>" + ((errList[i+j] == null)?"":errList[i+j]) + "</td>";
    			}
    			errListHtml += "</tr>";
    		}
    		$('#importErr_list_body').html(errListHtml);
		}
    }
	
	return {init:function(){
		$("#importErr_list").hide();
		producedDevicesSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearchDevice();
				return false;
		    }
		});
		
		fileUploadInit();
		initDatepicker();
		onsearchDev();
		initStatusSelect();
		initLocationSelect();
		multiAudited();
		multiCancel();
		multiOption();
		multiDelete();
		multiSelectAll();
	}}
}();

function producedDevicesListHtml(deviceList) {
	var deviceListHtml = "";
	produced_devices_list = deviceList;
	deviceListHtml += 	"<table>";				
	deviceListHtml += 		"<tr class='ChinaNet-Table-Title'>";
	deviceListHtml +=			"<th  width='2%'>";
	deviceListHtml +=			"<div id='checkbox_all' style='display: none'><input type='checkbox' id='select_all' name='select_all'>";
	deviceListHtml +=			"</div></th>"
	deviceListHtml +=			"<th  width='25%'>MAC/品牌型号</th>";
	deviceListHtml +=			"<th  width='20%'>固件/组件版本</th>"	;
	deviceListHtml +=			"<th  width='20%'>所在地/入库时间</th>"	;
	deviceListHtml +=			"<th  width='18%'>厂商/Pin码</th>";
	deviceListHtml +=			"<th  width='10%'>审批状态</th>";
	deviceListHtml +=			"<th></th>";		
	deviceListHtml += 		"</tr>";
	
	if (deviceList.length > 0) {			
		for (var i = 0; i < deviceList.length;i++) {
			var mac = (deviceList[i].mac == null) ? "虚拟设备" : deviceList[i].mac;
			var brand = deviceList[i].dmBrand;
			var model = deviceList[i].dmModel;
			var framewareVersion = deviceList[i].framewareVersion;
			var componentVersion = deviceList[i].componentVersion;
			var pinCode = deviceList[i].pinCode;
			var location =  ((deviceList[i].province == null || deviceList[i].province == '请选择') ? "" : deviceList[i].province) + " " + 
						((deviceList[i].city == null || deviceList[i].city == '请选择') ? "" : deviceList[i].city) + " " +
						((deviceList[i].county == null || deviceList[i].county == '请选择') ? "" : deviceList[i].county);
			var createDatetime = deviceList[i].createDatetime;
			var status = null;
			var manufacturerName = deviceList[i].fullname;
			
			if(deviceList[i].status == "AUDITED") {
				status = "已审批";
			} else if(deviceList[i].status == "WAITED") {
				status = "未审批";
			} else {
				status = "其他";
			}
			
			deviceListHtml += "<tr class='ChinaNet-Table-Body'>"	;
			
			deviceListHtml +=   "<td><div style='display: none' id='checkbox_" + i + "'>";
			deviceListHtml +=   	"<input type='checkbox' value='" + i + "' class='Input-Control' name='checkbox'>";
			deviceListHtml +=   "</div></td>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=   	"<span class='Table-Data-Name'>" + mac + "</span>";
			deviceListHtml +=   	"<span class='Table-Data-Text'>" + brand + " " + model + "</span>";
			deviceListHtml +=   "</td>";	
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=   	"<span class='Table-Data-Name'>" + framewareVersion + "</span>";
			deviceListHtml +=   	"<span class='Table-Data-Text'>" + componentVersion + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=   	"<span class='Table-Data-Name'>" + location + "</span>";
			deviceListHtml +=   	"<span class='Table-Data-Text'>" + createDatetime + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=   	"<span class='Table-Data-Name'>" + manufacturerName + "</span>";
			deviceListHtml +=   	"<span class='Table-Data-Text'>" + pinCode + "</span>";
			deviceListHtml +=   "</td>";
			
			deviceListHtml +=   "<td id='device_status_" + mac + "'>" + status + "</td>";
			deviceListHtml +=   "<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
			deviceListHtml +=   "<a href='javascript:;' data-id='" + i + "' data-brand='" + brand + "' " +
			"data-model='" + model + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
			deviceListHtml += "</td></tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	deviceListHtml += 	"</table>";	
	return deviceListHtml;
}

function loadComButton(i, brand, model) {
	var jsonObj2 = {ComButton:[]};
 	var ComButton = jsonObj2.ComButton;
 	
 	jsonObj2.ComButton.push({url:'javascript:showDeviceEdit(\'' + i + '\');', text:'编辑'});
 	if((produced_devices_list[i].status == "WAITED") 
 			&& (__CONTEXT_MERCHANT_CODE != 'MANUFACTURER')) {
 		jsonObj2.ComButton.push({url:'javascript:auditDeviceOK(\'' + produced_devices_list[i].mac + '\');', text:'审批'});
 	}
 	jsonObj2.ComButton.push({url:'javascript:deleteDevice(\'' + produced_devices_list[i].mac + '\');', text:'删除'});
 	return ComButton;
}

var deleteDevice = function(mac) {
	onConfirmDialog('<p>您确定删除该设备吗？</p><p>删除后将不能恢复！</p>', function(){DeleteDeviceOK(mac)}, function(){});	
}

//删除操作
var DeleteDeviceOK = function(mac) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/system/deleteproduceddevices.htm',
        data: {
        	"mac" : mac
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('删除成功!',"ok");
            	document.getElementById('checkbox_all').style.display = "none";
    			for (var i = 0; i < produced_devices_list.length; i++) {
    				document.getElementById('checkbox_' + i).style.display = "none";
    			}
    			$("#btn_multi_option").show();
    			document.getElementById('cancel_multi').style.display = "none";
    			document.getElementById('multi_audit').style.display = "none";
    			document.getElementById('multi_delete').style.display = "none";
            	producedDevicesSearchHandler.clearResultSetpageNo();
    			producedDevicesSearchHandler.searchWithPreload();
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError('删除失败!');
        }
    });
}

//审批操作
var auditDeviceOK = function(mac) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/system/auditproduceddevices.htm',
        data: {
        	"mac" : mac
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('审批成功!',"ok");
            	document.getElementById('checkbox_all').style.display = "none";
    			for (var i = 0; i < produced_devices_list.length; i++) {
    				document.getElementById('checkbox_' + i).style.display = "none";
    			}
    			$("#btn_multi_option").show();
    			document.getElementById('cancel_multi').style.display = "none";
    			document.getElementById('multi_audit').style.display = "none";
    			document.getElementById('multi_delete').style.display = "none";
    			producedDevicesSearchHandler.clearResultSetpageNo();
    			producedDevicesSearchHandler.searchWithPreload();
            	//keywordsSearchProducedDevices();
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError('审批失败!');
        }
    });	
}

var showDeviceEdit = function(i) {
	var deviceDetailsHtml="";
	deviceDetailsHtml+="<div class='UserInfo-Settings-Body'>";
	deviceDetailsHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>MAC地址</label>";
	deviceDetailsHtml+="		<div id='edit_device_mac' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_device_mac' class='Input-Control'></div>";
	deviceDetailsHtml+="    </div>";
	
	deviceDetailsHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>设备品牌</label>";
	deviceDetailsHtml+="		<div id='edit_device_brand' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_device_brand' class='Input-Control'></div>";
	deviceDetailsHtml+="    </div>";
	
	deviceDetailsHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>设备型号</label>";
	deviceDetailsHtml+="		<div id='edit_device_model' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_device_model' class='Input-Control'></div>";
	deviceDetailsHtml+="    </div>";
	
	deviceDetailsHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>固件版本</label>";
	deviceDetailsHtml+="		<div id='edit_device_frameware' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_device_frameware' class='Input-Control'></div>";
	deviceDetailsHtml+="    </div>";
	
	deviceDetailsHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>组件版本</label>";
	deviceDetailsHtml+="		<div id='edit_device_component' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_device_component' class='Input-Control'></div>";
	deviceDetailsHtml+="    </div>";
	
	deviceDetailsHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>PIN码</label>";
	deviceDetailsHtml+="		<div id='edit_device_pin' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_device_pin' class='Input-Control'></div>";
	deviceDetailsHtml+="    </div>";

	deviceDetailsHtml+="    <div id='edit_device_location' class='ChinaNet-Form-Sheet'>";
	deviceDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>地区</label>";
	deviceDetailsHtml+="        <div class='Form-Item-Select  ChinaNet-Col-3' id='DeviceProviceList'><input type='text' id='DeviceProvice' name='DeviceProvice' placeholder=''></div>";
	deviceDetailsHtml+="        <div class='Form-Item-Select  ChinaNet-Col-3' id='DeviceCityList'><input type='text' id='DeviceCity' name='DeviceCity' placeholder=''></div>";
	deviceDetailsHtml+="        <div class='Form-Item-Select  ChinaNet-Col-3' id='DeviceCountyList'><input type='text' id='DeviceCounty' name='DeviceCounty' placeholder=''></div>";
	deviceDetailsHtml+="    </div>";
	deviceDetailsHtml+="</div>";
	
	var d_DeviceInfo_edit = dialog({
     	 id: 'Dailogin:DeviceInfoedit',
         title: '编辑设备',
         content: deviceDetailsHtml,
         okValue: '完成',
         ok: function () { 	 
        	SubmitDeviceDetails(i);
        	return false;
         },
         
         cancelValue: '取消',
         cancel: function () {},
         width:600,
         height:360,
         skin:'ChinaNet-Dialog'
     });
	
	d_DeviceInfo_edit.showModal();
	refreshDeviceInfo(i);
}

var SubmitDeviceDetails = function(i) {
	var mac = ($("#input_device_mac").val()).toUpperCase();
	var brand = $("#input_device_brand").val();
	var model = $("#input_device_model").val();
	var framewareVersion = $("#input_device_frameware").val();
	var componentVersion = $("#input_device_component").val();
	var pinCode = $("#input_device_pin").val();
	var province = $("#DeviceProvice").val();
	var city = $("#DeviceCity").val();
	var county = $("#DeviceCounty").val();
	
	if(!onCheckEmpty(mac)) { 
		onAlertErrorTip('MAC地址不能为空', document.getElementById('input_device_mac'));
		return false;
	} else if(!checkMac(mac)) {
		onAlertErrorTip('MAC地址格式不正确', document.getElementById('input_device_mac'));
		return false;
	}
	if(!onCheckEmpty(brand)) { 
		onAlertErrorTip('品牌不能为空', document.getElementById('input_device_brand'));
		return false;
	} else if(!onCheckMaxLength(brand, 60)) {
		onAlertErrorTip('品牌名不能超过60个字符', document.getElementById('input_device_brand'));
		return false;
	}
	if(!onCheckEmpty(model)) { 
		onAlertErrorTip('型号不能为空', document.getElementById('input_device_model'));
		return false;
	} else if(!onCheckMaxLength(model, 60)) {
		onAlertErrorTip('型号名不能超过60个字符', document.getElementById('input_device_model'));
		return false;
	}
	if(!onCheckEmpty(framewareVersion)) { 
		onAlertErrorTip('固件版本不能为空', document.getElementById('input_device_frameware'));
		return false;
	} else if(!onCheckMaxLength(framewareVersion, 125)) {
		onAlertErrorTip('固件版本不能超过125个字符', document.getElementById('input_device_frameware'));
		return false;
	}
	if(!onCheckEmpty(componentVersion)) { 
		onAlertErrorTip('组件版本不能为空', document.getElementById('input_device_component'));
		return false;
	} else if(!onCheckMaxLength(componentVersion, 125)) {
		onAlertErrorTip('组件版本不能超过125个字符', document.getElementById('input_device_component'));
		return false;
	}
	if(!onCheckEmpty(pinCode)) { 
		onAlertErrorTip('PIN码不能为空', document.getElementById('input_device_pin'));
		return false;
	} else if(!checkPin(pinCode)) {
		onAlertErrorTip('PIN码格式不正确', document.getElementById('input_device_pin'));
		return false;
	}
	if(!onCheckEmpty(province) || province == '请选择') { 
		onAlertErrorTip('请选择省', document.getElementById('DeviceProviceList'));
		return false;
	}
	if(!onCheckEmpty(city) || city == '请选择') { 
		onAlertErrorTip('请选择市', document.getElementById('DeviceCityList'));
		return false;
	}
	
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/system/setproduceddevices.htm',
        data: {
        	"mac_old" : produced_devices_list[i].mac.toUpperCase(),
        	"mac_new" : mac,
        	"brand" : brand,
        	"model" : model,
        	"framewareVersion" : framewareVersion,
        	"componentVersion" : componentVersion,
        	"pinCode" : pinCode,
        	"province" : province,
        	"city" : city,
        	"county" : (county == '请选择') ? '' : county
        },
        success: function (data) {
            if (data.result == 'OK') {
            	onAlertError('设备信息修改成功!',"ok");
            	producedDevicesSearchHandler.clearResultSetpageNo();
            	producedDevicesSearchHandler.searchWithPreload();
            	dialog.list['Dailogin:DeviceInfoedit'].remove().close();
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError('设备信息修改失败!');
        }
    });
}

function refreshDeviceInfo(i) {
	$("#input_device_mac").val(produced_devices_list[i].mac);
	$("#input_device_brand").val(produced_devices_list[i].dmBrand);
	$("#input_device_model").val(produced_devices_list[i].dmModel);
	$("#input_device_frameware").val(produced_devices_list[i].framewareVersion);
	$("#input_device_component").val(produced_devices_list[i].componentVersion);
	$("#input_device_pin").val(produced_devices_list[i].pinCode);
	
	var curProvince = produced_devices_list[i].province;
	var curCity = produced_devices_list[i].city;
	var curCounty = produced_devices_list[i].county;
	
	var provice = {
            offsetSize:[0,3,0,3],
            data:getProviceList(),
            onChange:function(obj){
                onChangeProvice($(obj).attr('data-value'));
            }
        };
    var city = {
    		offsetSize:[0,3,0,3],
            onChange:function(obj){
                onChangeCity($(obj).attr('data-value'));
            }
        };
    var county = {offsetSize:[0,3,0,3]};
        
    if(curProvince!='undefined'&&curProvince!=''){
        provice.defaultData = {value:curProvince,text:curProvince}
        city.data = getCityList(curProvince);
    }
    $('input#DeviceProvice').xiSelect(provice);

    if(curCity!='undefined'&&curCity!=''){
        city.defaultData = {value:curCity,text:curCity}
        county.data = getCountyList(curProvince, curCity);
    }
    $('input#DeviceCity').xiSelect(city);
        
    if(curCounty!='undefined'&&curCounty!=''){
        county.defaultData = {value:curCounty, text:curCounty};
    }
    $('input#DeviceCounty').xiSelect(county);
};

function onNewPage() {
	$("#btn_multi_option").show();
	document.getElementById('cancel_multi').style.display = "none";
	document.getElementById('multi_audit').style.display = "none";
	document.getElementById('multi_delete').style.display = "none";
}

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

/**
 * 根据地区获取城市列表（查询用）
 * @param city
 */
function onChangeProviceSelect(provice){
    $('div#SelectDeviceCityList').html('<input type="text" id="SelectDeviceCity" name="SelectDeviceCity">');
    $('div#SelectDeviceCountyList').html('<input type="text" id="SelectDeviceCounty" name="SelectDeviceCounty">');
    $('input#SelectDeviceCity').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCityList(provice),
        onChange:function(obj){
        	/*if ($('input#SelectDeviceProvice').val() != "请选择") {
        		$("#SelectDeviceCityList").show();
        	}
        	else */
        		if ($('input#SelectDeviceProvice').val() != "北京" &&
        				$('input#SelectDeviceProvice').val() != "上海" &&
        				$('input#SelectDeviceProvice').val() != "天津" &&
        				$('input#SelectDeviceProvice').val() != "重庆" &&
        				$('input#SelectDeviceProvice').val() != "香港" &&
        				$('input#SelectDeviceProvice').val() != "澳门" &&
        				$('input#SelectDeviceProvice').val() != "台湾" &&
        				$('input#SelectDeviceProvice').val() != "其他" &&
        				$('input#SelectDeviceProvice').val() != "请选择") {
        			$("#SelectDeviceCityList").show();
        			$("#SelectDeviceCountyList").show();
        		}
        	
            onChangeCitySelect($(obj).attr('data-value'));
        },
        defaultData:{value:'',text:''}
    });
    $('input#SelectDeviceCounty').xiSelect({offsetSize:[0,3,0,3],defaultData:{text:'',value:''}});
}

/**
 * 根据市名获取区/县列表（查询用）
 * @param city
 */
function onChangeCitySelect(city){
	$('div#SelectDeviceCountyList').html('<input type="text" id="SelectDeviceCounty" name="SelectDeviceCounty">');
    $('input#SelectDeviceCounty').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCountyList($('input#SelectDeviceProvice').val(),city),
        defaultData:{value:'',text:''}
    });
}

/**
 * 根据地区获取城市列表（编辑用）
 * @param city
 */
function onChangeProvice(provice){
    $('div#DeviceCityList').html('<input type="text" id="DeviceCity" name="DeviceCity">');
    $('div#DeviceCountyList').html('<input type="text" id="DeviceCounty" name="DeviceCounty">');
    $('input#DeviceCity').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCityList(provice),
        onChange:function(obj){
            onChangeCity($(obj).attr('data-value'));
        },
        defaultData:{value:'',text:''}
    });
    $('input#DeviceCounty').xiSelect({offsetSize:[0,3,0,3],defaultData:{text:'',value:''}});
}

/**
 * 根据市名获取区/县列表（编辑用）
 * @param city
 */
function onChangeCity(city){
	$('div#DeviceCountyList').html('<input type="text" id="DeviceCounty" name="DeviceCounty">');
    $('input#DeviceCounty').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCountyList($('input#DeviceProvice').val(),city),
        defaultData:{value:'',text:''}
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