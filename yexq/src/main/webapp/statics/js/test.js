$(document).ready(function(){
	 
//        initAddRadiusBtn();//初始化“添加”按钮
        initAddDeviceBtn();//初始化“添加”按钮
        initRegistDeviceBtn();//初始化“注册”按钮
        initAddRaduisDeviceBtn();//初始化“添加”按钮
        initRegistRaduisDeviceBtn();//初始化“注册”按钮
        initSendcodeBtn();//初始化“发送验证码”按钮
        
     // test
		$("#btn_test").click(function(){
			selected_subaccts = [];
	    	/*$('input[name="add_redirect_account"]:checked').each(function(){    
	    		selected_subaccts.push(this.value);
	     	  }); */
	    	for (var i = 0; i < 5;i++) {
	    		selected_subaccts.push(i);
			}
	    	
	    	if (selected_subaccts.length == 0) {
	    		onAlertError("请至少选择一个子账号");
	    		return false;
	    	}
			
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/device/saveGroupInfo.htm',
				data : {
					group_id:"111",
					group_name:"111",
					note:"222",
					province:"浙江",
					city:"宁波",
					type:"edit"
				},
				success : function(data) {
					if(data.result == 'OK') {
						alert('成功');
					}else {
						alert(data.message);
					}
				},
				error : function(data) {
					alert("失败");
				}
			});
		});
        
        // 胖AP激活
		$("#fat_ap_register").click(function(){
			var mac = $("#mac").val();
			var username = $("#username").val();
			var password = $("#password").val();
			var registerAccount = $("#registerAccount").val();
			var ver = $("#ver").val();
			var rePassword = $("#rePassword").val();
			var email = $("#email").val();
			var cellNumber = $("#cellNumber").val();
			var merchantName = $("#merchantName").val();
			var recommendNumber = $("#recommendNumber").val();
			var merchantDescription = $("#merchantDescription").val();
			var geoLocation = $("#geoLocation").val();
			var telcomAccount = $("#telcomAccount").val();
			
			if($("#registerAccount").attr("checked")) {
				registerAccount = 'true';
			}else {
				registerAccount = 'false';
			}
			
			$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '/api10/register.htm',
				data : {
					'mac' : mac,
					'username' : username,
					'password' : password,
					'telcomAccount' : telcomAccount,
					'ver' : ver,
					'registerAccount' : registerAccount,
					'rePassword' : rePassword,
					'email' : email,
					'cellNumber' : cellNumber,
					'merchantName' : merchantName,
					'recommendNumber' : recommendNumber,
					'merchantDescription' : merchantDescription,
					'geoLocation' : geoLocation
				},
				success : function(data) {
					if(data.result == 'OK') {
						alert('激活成功');
					}else {
						alert(data.message);
					}
				},
				error : function(data) {
					alert("设备激活失败");
				}
			});
		});
		
		
		// 胖AP认证
		$("#fatApAuth").click(function() {
			var auth_type = $("#auth_type").val();
			var auth_id = $("#auth_id").val();
			var auth_code = $("#auth_code").val();
			var dev_id = $("#dev_id").val();
			var mac = $("#mac_auth").val();
			var browser_type = $("#browser_type").val();
			var terminal_type = $("#terminal_type").val();
			var wechat_pub_acct = $("#wechat_pub_acct").val();
			var account_id = $("#account_id").val();
			
			$.ajax({
				type : "POST",
				dataType : "json",
				url : "/api10/userAuth.htm",
				data : {
					"auth_type" : auth_type,
					"auth_id" : auth_id,
					"auth_code" : auth_code,
					"dev_id" : dev_id,
					"mac" : mac,
					"browser_type" : browser_type,
					"terminal_type" : terminal_type,
					"wechat_pub_acct" : wechat_pub_acct,
					"account_id" : account_id
				},
				success : function(data){
					if(data.result == 'OK'){
						alert("认证成功");
					}else {
						alert(data.message);
					}
				},
				error : function(data){
					alert(data.message);
				}
			});
		});
		
		
		
    });

 	
/***************************** 添加AC/BASE设备 ********************************/

/**
	 * 初始化“添加”按钮
	 * */
 var initAddRadiusBtn = function(){
		$("#btn_add_radius").click(function() {
			addRadius();
		});
	}
 /**
	 * 初始化“添加”按钮
	 * */
 var initAddDeviceBtn = function(){
	 $("#btn_add_device").click(function() {
			submitAddDevice();
		});
 }
 /**
	 * 初始化“注册”按钮
	 * */
 var initRegistDeviceBtn = function(){
	 $("#btn_regist_device").click(function() {
			submitRegistDevice();
		});
 }
 
 /**
	 * 初始化“添加”按钮
	 * */
var initAddRaduisDeviceBtn = function(){
	 $("#btn_add_raduisdevice").click(function() {
			submitAddRaduisDevice();
		});
}

/**
	 * 初始化“注册”按钮
	 * */
var initRegistRaduisDeviceBtn = function(){
	 $("#btn_regist_raduisdevice").click(function() {
			submitRegistRaduisDevice();
		});
}
 /**
	 * 初始化“发送验证码”按钮
	 * */
var initSendcodeBtn = function(){
	 $("#btn_sendcode").click(function() {
			submitSendcode();
		});
}
 
function addRadius() {
	var addRadiusDetailsHtml = "";
	//type
	addRadiusDetailsHtml += "<div class='UserInfo-Settings-Body'>";
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>设备类型</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_device_type' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_device_type' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	//ems_dev_id
	/*addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>ems_dev_id</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_ems_dev_id' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_ems_dev_id' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";*/
	//name
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>AC NAME</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_device_name' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_device_name' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	//firmware_version
	/*addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>firmware_version</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_firmware_version' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_firmware_version' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	//brand
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>brand</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_brand' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_brand' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	//model
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>model</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_model' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_model' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	//mac
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>mac</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_mac' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_mac' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	//create_datetime
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>create_datetime</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_create_datetime' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_create_datetime' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";*/
	//ip
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>设备 IP</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_radius_ip' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_radius_ip' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	//parentemsdevid
	/*addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>parentemsdevid</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_parentemsdevid' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_parentemsdevid' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	//ssid
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>ssid</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_ssid' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_ssid' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";*/
	//######注册
	//secret
	addRadiusDetailsHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addRadiusDetailsHtml += "	<label class='Form-Item-Title ChinaNet-Col-3'>secret</label>";
	addRadiusDetailsHtml += "	  <div id='div_new_secret' class='Form-Item-Input ChinaNet-Col-7'>";
	addRadiusDetailsHtml += "		<input type='text' id='input_new_secret' class='Input-Control'>";
	addRadiusDetailsHtml += "	  </div>"
	addRadiusDetailsHtml += "  </div>";
	addRadiusDetailsHtml += "</div>";
	//###
	var d_addRadiusDevice = dialog({
		id: 'Dailogin:addRadius',
		title: '添加设备',
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
	var type = $("#input_new_device_type").val();
//	var ems_dev_id = $("#input_new_ems_dev_id").val();
	var name = $("#input_new_device_name").val();
//	var firmware_version = $("#input_new_firmware_version").val();
//	var device_model_id = $("#input_new_accounting_secret").val();
//	var brand = $("#input_new_brand").val();
//	var model = $("#input_new_model").val();
//	var mac = $("#input_new_mac").val();
//	var create_datetime = $("#input_new_create_datetime").val();
	var devIp = $("#input_new_radius_ip").val();
//	var parentemsdevid = $("#input_new_parentemsdevid").val();
//	var ssid = $("#input_new_ssid").val();
	
	var secret = $("#input_new_secret").val();
	/* if(!onCheckEmpty(name)) { 
		onAlertErrorTip('AC NAME不能为空', document.getElementById('input_new_device_name'));
		return false;
	} else if(isChn(name)) {
		onAlertErrorTip('AC NAME只能为英文、数字或半角字符', document.getElementById('input_new_device_name'));
		return false;
	} else if(!onCheckMaxLength(name, 200)) {
		onAlertErrorTip('AC NAME不能超过200个字符', document.getElementById('input_new_device_name'));
		return false;
	} else if(!onCheckWlanacnameExits(wlanacname)) {
		onAlertErrorTip('AC NAME已存在', document.getElementById('input_new_wlan_ac_name'));
		return false;
	}
	if(!onCheckEmpty(addrIp)) { 
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
	} */
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/device/radiusRegister.htm',
		data: {
			"type" : type,
			"ems_dev_id" : "1",
			"ac_name" : name,
			"firmware_version" : "1",
			"device_model_id" : "1",
			"brand" : "1",
			"model" : "1",
			"mac" : "1",
			"ems_create_datetime" : "1",
			"dev_ip" : devIp,
			"parentemsdevid" : "1",
			"ssid" : "1",
			"secret" : secret
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

function submitAddDevice() {
	var type = $("#new_device_type").val();
	var ems_dev_id = $("#new_device_ems_dev_id").val();
	var name = $("#new_device_name").val();
	var firmware_version = $("#new_device_firmware_version").val();
//	var device_model_id = $("#new_device_brand").val();
	var brand = $("#new_device_brand").val();
	var model = $("#new_device_model").val();
	var mac = $("#new_device_mac").val();
	var create_datetime = $("#new_device_create_datetime").val();
	var devIp = $("#new_device_devIp").val();
	var parentemsdevid = $("#new_device_parentemsdevid").val();
	var ssid = $("#new_device_ssid").val();
	var port = $("#new_device_port").val();
	var secret = $("#new_device_secret").val();
	var xPos = $("#new_device_xPos").val();
	var yPos = $("#new_device_yPos").val();
	var fixAddr = $("#new_device_fixAddr").val();
	var component_version = $("#new_device_component_version").val();
	var pinCode = $("#new_device_pin_code").val();
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/device/addDevice.htm',
		data: {
			"type" : type,
			"ems_dev_id" : ems_dev_id,
			"ac_name" : name,
			"firmware_version" : firmware_version,
			"device_model_id" : "",
			"brand" : brand,
			"model" : model,
			"mac" : mac,
			"ems_create_datetime" : create_datetime,
			"dev_ip" : devIp,
			"parent_ems_dev_id" : parentemsdevid,
			"ssid" : ssid,
			"port" : port,
			"secret" : secret,
			"xPos" : xPos,
			"yPos" : yPos,
			"fix_addr" : fixAddr,
			"component_version" : component_version,
			"pin_code" : pinCode
		},
		success: function (data) {
			if (data.result == 'OK') {
				alert("设备同步成功");
			} else {				   
				alert(data.message);
			}
		},
		error: function (data) {
			alert('设备添加失败!');
		}
	});
}

function submitRegistDevice() {
	var type = $("#new_device_type").val();
	var ems_dev_id = $("#new_device_ems_dev_id").val();
	var name = $("#new_device_name").val();
	var firmware_version = $("#new_device_firmware_version").val();
//	var device_model_id = $("#new_device_brand").val();
	var brand = $("#new_device_brand").val();
	var model = $("#new_device_model").val();
	var mac = $("#new_device_mac").val();
	var create_datetime = $("#new_device_create_datetime").val();
	var devIp = $("#new_device_devIp").val();
	var parentemsdevid = $("#new_device_parentemsdevid").val();
	var ssid = $("#new_device_ssid").val();
	var port = $("#new_device_port").val();
	var secret = $("#new_device_secret").val();
	
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/device/radiusRegister.htm',
		data: {
			"type" : type,
			"ac_name" : name,
			"dev_ip" : devIp,
			"secret" : secret
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
	
function submitAddRaduisDevice() {
	var type = $("#new_raduisdevice_type").val();
	var ems_dev_id = $("#new_raduisdevice_ems_dev_id").val();
	var name = $("#new_raduisdevice_name").val();
	var firmware_version = $("#new_raduisdevice_firmware_version").val();
//	var device_model_id = $("#new_raduisdevice_brand").val();
	var brand = $("#new_raduisdevice_brand").val();
	var model = $("#new_raduisdevice_model").val();
	var mac = $("#new_raduisdevice_mac").val();
	var create_datetime = $("#new_raduisdevice_create_datetime").val();
	var devIp = $("#new_raduisdevice_devIp").val();
	var parentemsdevid = $("#new_raduisdevice_parentemsdevid").val();
	var ssid = $("#new_raduisdevice_ssid").val();
	var port = $("#new_raduisdevice_port").val();
	var secret = $("#new_raduisdevice_secret").val();
	
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/device/addDevice.htm',
		data: {
			"type" : type,
			"ems_dev_id" : ems_dev_id,
			"ac_name" : name,
			"firmware_version" : firmware_version,
			"device_model_id" : "",
			"brand" : brand,
			"model" : model,
			"mac" : mac,
			"ems_create_datetime" : create_datetime,
			"dev_ip" : devIp,
			"parentemsdevid" : parentemsdevid,
			"ssid" : ssid,
			"port" : port,
			"secret" : secret
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

function submitRegistRaduisDevice() {
	var type = $("#new_raduisdevice_type").val();
	var ems_dev_id = $("#new_raduisdevice_ems_dev_id").val();
	var name = $("#new_raduisdevice_name").val();
	var firmware_version = $("#new_raduisdevice_firmware_version").val();
//	var device_model_id = $("#new_device_brand").val();
	var brand = $("#new_raduisdevice_brand").val();
	var model = $("#new_raduisdevice_model").val();
	var mac = $("#new_raduisdevice_mac").val();
	var create_datetime = $("#new_raduisdevice_create_datetime").val();
	var devIp = $("#new_raduisdevice_devIp").val();
	var parentemsdevid = $("#new_raduisdevice_parentemsdevid").val();
	var ssid = $("#new_raduisdevice_ssid").val();
	var port = $("#new_raduisdevice_port").val();
	var secret = $("#new_raduisdevice_secret").val();
	
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/device/radiusRegister.htm',
		data: {
			"type" : type,
			"ac_name" : name,
			"dev_ip" : devIp,
			"secret" : secret
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











	/******************************************************L S C ********************************************************/
	
		// 获取验证码
		$("#btn_getAuthCode").click(function() {
			var auth_id = $("#new_sendcode_auth_id").val();
			var ter_mac = $("#new_sendcode_ter_mac").val();
			var auth_type = $("#new_sendcode_auth_type").val();
			
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: '/platform10/sendCode.htm',
				data: {
					"auth_id" : auth_id,
					"ter_mac" : ter_mac,
					"auth_type" : auth_type
				},
				success: function (data) {
					if (data.result == 'OK') {
//						onAlertError(data.message,"ok");
//						deviceSearchHandler.clearResultSetpageNo();
//						deviceSearchHandler.searchWithPreload();
//						dialog.list['Dailogin:addRadius'].remove().close();
						
						$("#message_getAuthCode").val((data.message));
						
					} else {				   
						alert.val(data.message);
					}
				},
				error: function (data) {
					alert('获取验证码失败!');
				}
			});

		});
		
		
		// 免费登陆
		$("#btn_appAuth").click(function() {
//			$("#new_three_auth_id").val($("#new_sendcode_auth_id").val());
			var auth_id = $("#new_three_auth_id").val();
			var auth_code = $("#new_three_auth_code").val();
			var ter_mac = $("#new_three_ter_mac").val();
			var auth_type = $("#new_three_auth_type").val();
			var terminal_type = $("#new_three_terminal_type").val();
			
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/platform10/userAuth.htm',
				data : {
					'auth_id' : auth_id,
					'auth_code' : auth_code,
					'ter_mac' : ter_mac,
					'auth_type' : auth_type,
					'terminal_type' : terminal_type
				},
				success : function(data) {
					if(data.result == 'OK'){
						$("#message_userAuth").val('验证码通过,正在获取访问token');
						// 获取token
						getToken();
					}else{
						$("#message_userAuth").val(data.message);
					}
				},
				error: function (data) {
					onAlertError('验证码校验失败!');
				}
			});
		});
		
		
		// 获取token
		function getToken() {
//			var auth_id = $("#new_four_auth_id").val();
//			var auth_type = $("#new_four_auth_type").val();
//			var ter_mac = $("#new_four_ter_mac").val();
//			var ter_ip = $("#new_four_ter_ip").val();
//			var terminal_type = $("#new_four_terminal_type").val();
//			var imei = $("#new_four_imei").val();
//			var appUnqid = $("#new_four_app_unqid").val();
//			var dev_id = $("#new_four_dev_id").val();
//			var ac_name = $("#new_four_ac_name").val();
//			var app_id = $("#new_four_app_id").val();
//			var platform_code = $("#new_four_platform_code").val();
//			var portal_url = $("#new_four_portal_url").val();
			
			var auth_id = $("#new_three_auth_id").val();
			var ter_mac = $("#new_three_ter_mac").val();
			var auth_type = $("#new_three_auth_type").val();
			var terminal_type = $("#new_three_terminal_type").val();
			var ter_ip = '115.206.4.194';
			var imei = 'phone type';
			var dev_id = 'RADIUS-RADIUS-20141105-30be2107';
			var ac_name = 'ZJ-HZ-JF-M6000-B1';
			var app_id = '';
			var platform_code = '';
			var appUnqid = 'appUnqid';
//			var portal_url = $("#").val();
			
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/platform10/token.htm',
				data : {
					'auth_id' : auth_id,
					'auth_type' : auth_type,
					'ter_mac' : ter_mac,
					'ter_ip' : ter_ip,
					'terminal_type' : terminal_type,
					'imei' : imei,
					'app_unqid' : appUnqid,
					'dev_id' : dev_id,
					'ac_name' : ac_name,
					'app_id' : app_id,
					'platform_code' : platform_code,
					'portal_url' : 'http%3A%2F%2Ftest-portal2.51iwifi.com%2Fsite%2Flogin%2F%3Fdev_id%3DRADIUS-RADIUS-20141010-d91068fa%26user_ip%3D115.206.4.194%26user_mac%3Db4%3A30%3A52%3A98%3A86%3A2c%26client_mac%3Db4%3A30%3A52%3A98%3A86%3A2c%26ac_name%3DZJ-HZ-JF-M6000-B1%26ac_ip%3D61.164.17.160%26ap_mac%3D%26nasid%3D%26ssid%3D%26domain%3D%26from%3Daci'
				},
				success : function(data) {
					if(data.result == 'OK'){
						// app 认证
						$("#message_getToken").val('token已获取，正在进行app认证');
						$("#access_token_token").val(data.token);
						$("#access_token_appauth_type").val(data.appauth_type);
						$("#access_token_platform_code").val(data.platform_code);
						$("#access_token_authid").val(data.authid);
						appAuth();
					}else {
						$("#message_getToken").val(data.message);
					}
				},
				error: function (data) {
					onAlertError('获取token失败!');
				}
					
			});
			
		};
		
		// app认证
		function appAuth() {
//			var auth_id = $("#new_five__auth_id").val();
//			var ter_mac = $("#new_five__ter_mac").val();
//			var ter_ip = $("#new_five_ter_ip").val();;
//			var auth_type = $("#new_five__auth_type").val();
//			var terminal_type = $("#new_five_terminal_type").val();
//			var appauth_type = $("#access_token_appauth_type").val();
			var platform_code = $("#access_token_platform_code").val();
			var token = $("#access_token_token").val();
//			var redirectParams = $("#new_five_redirectParams").val();
//	        var thirdAuthRequest = $("#new_five_thirdAuthRequest").val(); // true or other 
			
	        var auth_id = $("#access_token_authid").val();
			var ter_mac = $("#new_three_ter_mac").val();
			var auth_type = $("#new_three_auth_type").val();
			var terminal_type = $("#new_three_ter_mac").val();
			var appauth_type = 'THIRD_AUTH';
//			var platform_code = 'RADIUS-RADIUS-20141105-30be2107';
//			var token = '';
			var redirectParams = '';
	        var thirdAuthRequest = 'true'; // true or other 
	        var ter_ip = '115.206.4.194';
	        
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/platform10/appAuth.htm',
				data : {
					'auth_id' : auth_id,
					'ter_mac' : ter_mac,
					'ter_ip' : ter_ip,
					'auth_type' : auth_type,
					'terminal_type' : terminal_type,
					'appauth_type' : appauth_type,
					'platform_code' : platform_code,
					'token' : token,
					'redirectParams' : redirectParams,
					'thirdAuthRequest' : thirdAuthRequest
				},
				success : function(data) {
					if(data.result == 'OK'){
						$("#message_appAuth").val('访问请求通过');
					}else {
						$("#message_appAuth").val(data.message);
					}
				},
				error: function (data) {
					onAlertError('访问请求(appAuthId)失败!');
				}
			});
		};
		
		
		
		