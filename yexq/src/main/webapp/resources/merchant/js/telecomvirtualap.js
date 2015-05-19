var deviceSearchHandler = null;
var device_list = null;

deviceSearchHandler = new searchUtil(deviceListHtml, searchFailCallBack, searchErrorCallBack, null, onShowData,
				"device_list_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchtelecomvirtualdevice.htm", "");

var telecomvirtualdeviceApp = function() {
	
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
		$("#btn_add_device").click(function() {
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

/*function onCheckWlanacnameExits(wlanacname) {
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
}*/

/***************************** 添加telecom设备 ********************************/

function addRadius() {
	var addTelecomDeviceHtml = "";
	addTelecomDeviceHtml += "<div class='UserInfo-Settings-Body'>";
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>用户名</label>";
	addTelecomDeviceHtml += "	  <div id='div_new_wlan_ac_name' class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_username' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>密码</label>";
	addTelecomDeviceHtml += "	  <div id='div_new_radius_ip' class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='password' id='input_password' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>邮箱</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_email' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>电话</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_cell_number' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>推荐码</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_recommend_number' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>";
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml+="    <div id='add_device_location' class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addTelecomDeviceHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>地区</label>";
	addTelecomDeviceHtml+="        <div class='Form-Item-Select  ChinaNet-Col-3' id='telecomDeviceProviceList'><input type='text' id='telecomDeviceProvice' name='telecomDeviceProvice' placeholder=''></div>";
	addTelecomDeviceHtml+="        <div class='Form-Item-Select  ChinaNet-Col-3' id='telecomDeviceCityList'><input type='text' id='telecomDeviceCity' name='telecomDeviceCity' placeholder=''></div>";
	addTelecomDeviceHtml+="        <div class='Form-Item-Select  ChinaNet-Col-3' id='telecomDeviceCountyList'><input type='text' id='telecomDeviceCounty' name='telecomDeviceCounty' placeholder=''></div>";
	addTelecomDeviceHtml+="    </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>地址</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_address' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>设备名称</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_name' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>宽带账号</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_telcomaccount' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>PVLAN</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_pvlanid' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>CVLAN</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_cvlanid' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet '>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>DOMAIN</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_domain' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "  <div class='ChinaNet-Form-Sheet '>";
	addTelecomDeviceHtml += "	<label class='Form-Item-Title ChinaNet-Col-2'>ETHPORT</label>";
	addTelecomDeviceHtml += "	  <div class='Form-Item-Input ChinaNet-Col-9'>";
	addTelecomDeviceHtml += "		<input type='text' id='input_ethport' class='Input-Control'>";
	addTelecomDeviceHtml += "	  </div>"
	addTelecomDeviceHtml += "  </div>";
	
	addTelecomDeviceHtml += "</div>";
		
	var d_addRadiusDevice = dialog({
		id: 'Dailogin:addRadius',
		title: '添加telecom设备',
		content: addTelecomDeviceHtml,
		okValue: '提交',
		ok: function () {
			submitTelecomDevice();
			return false;
		},
		cancelValue: '关闭',
		cancel : function () {},
		width:800,
		height:600,
		skin:'ChinaNet-Dialog'
	});
	d_addRadiusDevice.showModal();
	initLocationInfo();
	
}

//添加 初始化地区选择框
function initLocationInfo() {
	
	var provice = {
            offsetSize:[0,3,0,3],
            data:getProviceList(),
            onChange:function(obj){
                onChangeProvice($(obj).attr('data-value'));
            }
        };
    var city = {
    		offsetSize:[0,3,0,3],
            data:[],
            defaultData:{value:'',text:''},
            onChange:function(obj){
                onChangeCity($(obj).attr('data-value'));
            }
        };
    var county = {offsetSize:[0,3,0,3]};
        
    $('input#telecomDeviceProvice').xiSelect(provice);


    $('input#telecomDeviceCity').xiSelect(city);
        

    $('input#telecomDeviceCounty').xiSelect(county);
};

function submitTelecomDevice() {
	var username = $("#input_username").val();
	var password = $("#input_password").val();
	var email = $("#input_email").val();
	var cell_number = $("#input_cell_number").val();
	var recommend_number = $("#input_recommend_number").val();
	
	var province = $("#telecomDeviceProvice").val();
	var city = $("#telecomDeviceCity").val();
	var county = $("#telecomDeviceCounty").val();
	
	var address = $("#input_address").val();
	var name = $("#input_name").val();
	var telcomaccount = $("#input_telcomaccount").val();
	var pvlanid = $("#input_pvlanid").val();
	var cvlanid = $("#input_cvlanid").val();
	var domain = $("#input_domain").val();
	var ethport = $("#input_ethport").val();
	if(!onCheckEmpty(username)){
		onAlertErrorTip('账号名不能有空格', document.getElementById('input_username'));
		return false;
	}else if(username.length>50){
		onAlertErrorTip('账户名过长', document.getElementById('input_username'));
		return false;
	}else if(!chkUserName(username)){
		onAlertErrorTip('用户名不能为空，且必须由中英文、数字、下划线、单引号或.组成', document.getElementById('input_username'));
		return false;
	}
	
	if(!onCheckEmpty(password)){
		onAlertErrorTip('密码不能为空', document.getElementById('input_password'));
		return false;
	}else if(password.length<6||password.length>50){
		onAlertErrorTip('密码长度大于6且小于50', document.getElementById('input_password'));
		return false;
	}
	
	if(!isNotEmptyString(email)){
		onAlertErrorTip('邮箱不能为空', document.getElementById('input_email'));
		return false;
	}else if(!checkEmail(email)){
		onAlertErrorTip('邮箱格式不正确', document.getElementById('input_email'));
		return false;
	}
	
	if(!isNotEmptyString(cell_number)){
		onAlertErrorTip('电话不能为空', document.getElementById('input_cell_number'));
		return false;
	}else if(!checkMobile(cell_number)){
		onAlertErrorTip('电话格式不正确', document.getElementById('input_cell_number'));
		return false;
	}
	
	if(!isNotEmptyString(recommend_number)){
		onAlertErrorTip('推荐码不能为空', document.getElementById('input_recommend_number'));
		return false;
	}else if(!checkMobile(recommend_number)){
		onAlertErrorTip('推荐码格式不正确', document.getElementById('input_recommend_number'));
		return false;
	}
	
	if(!isNotEmptyString(province)){
		onAlertErrorTip('请选择省', document.getElementById('telecomDeviceProviceList'));
		return false;
	}
	
	if(!isNotEmptyString(city)){
		onAlertErrorTip('请选择市', document.getElementById('telecomDeviceCityList'));
		return false;
	}
	
	if(!isNotEmptyString(telcomaccount)){
		onAlertErrorTip('宽带账号不能为空', document.getElementById('input_telcomaccount'));
		return false;
	}else if(telcomaccount.length>50){
		onAlertErrorTip('宽带账号过长', document.getElementById('input_telcomaccount'));
		return false;
	}
	
	if(!isNotEmptyString(pvlanid)){
		onAlertErrorTip('PVLAN不能为空', document.getElementById('input_pvlanid'));
		return false;
	}else if(pvlanid.length>16){
		onAlertErrorTip('PVLAN过长', document.getElementById('input_pvlanid'));
		return false;
	}
	
	if(!isNotEmptyString(cvlanid)){
		onAlertErrorTip('CVLAN不能为空', document.getElementById('input_cvlanid'));
		return false;
	}else if(cvlanid.length>16){
		onAlertErrorTip('CVLAN过长', document.getElementById('input_cvlanid'));
		return false;
	}
	
	if(domain.length>80){
		onAlertErrorTip('DOMAIN过长', document.getElementById('input_domain'));
		return false;
	}
	
	if(ethport.length>20){
		onAlertErrorTip('宽带账号过长', document.getElementById('input_ethport'));
		return false;
	}
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/system/tcapregister.htm',
		data: {
			"username" : username,
			"password" : window.md5(password),
			"email" : email,
			"cell_number" : cell_number,
			"recommend_number" : recommend_number,
			"province" : province,
			"city" : city,
			"county" : county,
			"address" : address,
			"name" : name,
			"telcomaccount" : telcomaccount,
			"pvlanid" : pvlanid,
			"cvlanid" : cvlanid,
			"domain" : domain,
			"ethport" : ethport
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

/************************** 电信虚拟设备查询结果列表 *****************************/
function deviceListHtml(deviceList) {
	var deviceListHtml = "";
	device_list = deviceList;
	if (deviceList.length > 0) {
		for (var i = 0; i < deviceList.length;i++) {
			var deviceId = deviceList[i].deviceId;
			var pvlanId = deviceList[i].pvlanId;
			var cvlanId = deviceList[i].cvlanId;
			var domain = deviceList[i].domain;
			var ethPort = deviceList[i].ethPort;
			var name = deviceList[i].name;

			var createDatetime = deviceList[i].createDatetime;
			
			var accountId = deviceList[i].accoutId;
			var username = deviceList[i].username;
			var merchantName = (deviceList[i].merchantName == null) ? "" : deviceList[i].merchantName;
			var fullname = (deviceList[i].fullname == null) ? "" : deviceList[i].fullname;
			var accountType = deviceList[i].accountType;
			var province = deviceList[i].province;
			var city = deviceList[i].city;
			var countyDistrict = deviceList[i].countyDistrict?deviceList[i].countyDistrict:"";
			var address = deviceList[i].address;
			var deviceLocation = province + " " + city + " " + countyDistrict;
			
			deviceListHtml += "<tr class='ChinaNet-Table-Body'>";
			
			deviceListHtml +=   "<td>";
			deviceListHtml +=     "<span class='Table-Data-Name' id='id_device_id_" + i + "'>" + deviceId + "</span>";
			deviceListHtml +=   "</td>";
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_pvlanId_" + i + "'>" + pvlanId + "</span>";
			deviceListHtml +=   "</td>";
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_cvlanId_" + i + "'>" + cvlanId + "</span>";
			deviceListHtml +=   "</td>";
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_domain_" + i + "'>" + domain + "</span>";
			deviceListHtml +=   "</td>";
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_ethPort_" + i + "'>" + ethPort + "</span>";
			deviceListHtml +=   "</td>";
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_username_" + i + "'>" + username + "</span>";
			deviceListHtml +=	  "<span class= 'Table-Data-Text' id='id_merchant_name_" + i + "'>" + ((merchantName == "") ? fullname : merchantName) + "</span>";
			deviceListHtml +=   "</td>";
			deviceListHtml +=   "<td>";
			deviceListHtml +=	  "<span class= 'Table-Data-Name' id='id_location_" + i + "'>" + deviceLocation + "</span>";
			deviceListHtml +=	  "<span class= 'Table-Data-Text' id='id_create_datetime_" + i + "'>" + createDatetime + "</span>";
			deviceListHtml +=   "</td>";
			
//			deviceListHtml +=   "<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
//			deviceListHtml +=	   "<a href='javascript:;' data-id='" + i + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
//			deviceListHtml +=	 "</td>";
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
	 return ComButton;
}


/**
 * 根据地区获取城市列表
 * @param city
 */
function onChangeProvice(provice){
    $('div#telecomDeviceCityList').html('<input type="text" id="telecomDeviceCity" name="telecomDeviceCity">');
    $('div#telecomDeviceCountyList').html('<input type="text" id="telecomDeviceCounty" name="telecomDeviceCounty">');
    $('input#telecomDeviceCity').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCityList(provice),
        onChange:function(obj){
            onChangeCity($(obj).attr('data-value'));
        },
        defaultData:{value:'',text:''}
    });
    $('input#telecomDeviceCounty').xiSelect({offsetSize:[0,3,0,3],defaultData:{text:'',value:''}});
}

/**
 * 根据市名获取区/县列表
 * @param city
 */
function onChangeCity(city){
	$('div#telecomDeviceCountyList').html('<input type="text" id="telecomDeviceCounty" name="telecomDeviceCounty">');
    $('input#telecomDeviceCounty').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCountyList($('input#telecomDeviceProvice').val(),city),
        defaultData:{value:'',text:''}
    });
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

//检测用户名、姓名是否包含非法字符
function chkUserName(str){
	var reg = /^[A-Za-z0-9\._'\u4e00-\u9fa5]+$/ig;
	return (reg.test(str));
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