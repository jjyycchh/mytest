var _AUTH_TYPE = [
    //{'ACCOUNT_KEY': 'SUPER_MAN', 	   'en_name': 'SUPER_MAN',     'cn_name': '超级管理员'},
    {'AUTH_KEY': 'THIRD_AUTH',   'en_name': 'THIRD_AUTH',  'cn_name': '二级平台'},
    {'AUTH_KEY': 'AAA_AUTH',     'en_name': 'AAA_AUTH',    'cn_name': 'AAA认证'},
    {'AUTH_KEY': 'AP_AUTH', 	 'en_name': 'AP_AUTH',     'cn_name': 'AP认证'},
    {'AUTH_KEY': 'AC_AUTH',      'en_name': 'AC_AUTH',     'cn_name': 'AC认证'}];


var thirdPlatformSearchHandler = null;
var third_platform_list = null;
var _totalResult_log = 1;
thirdPlatformSearchHandler = new searchUtil(thirdPlatformListHtml, searchFailCallBack, searchErrorCallBack, null, onShowData,
		"third_platform_list_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
		"/platform10/searchthirdplatform.htm", "");

var thirdPlatformMgmtApp = function() {
	var keywordsSearch = function() {
		$("div.ChinaNet-Page-Table").show();
		thirdPlatformSearchHandler.clearResultSetpageNo();
		var keywords = thirdPlatformSearchHandler.convertKeywordsSearchable($("#keywords").val());
		thirdPlatformSearchHandler.setSearchParemeter('keywords', keywords);			
		if(onCheckLength(keywords)) {
			thirdPlatformSearchHandler.searchWithPreload();
		} else {
			onAlertError('您输入的关键字太多，请重新输入');
		}	
	}
	
	var onsearchDev = function() {
		$("#btn_search_third_platform").click(function() {
			keywordsSearch();
		});
	}
	
	return { init : function() {
		thirdPlatformSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		onsearchDev();
	}}
}();

/**
 * 显示查询结果
 * 
 * */
function thirdPlatformListHtml(thirdPlatformList) {
	var thirdPlatformHtml = "";
	third_platform_list = thirdPlatformList;
	if (thirdPlatformList.length > 0) {			
		for (var i = 0; i < thirdPlatformList.length; i++) {
			var id = thirdPlatformList[i].id;
			var name = thirdPlatformList[i].name;
			var domain = thirdPlatformList[i].domain;
			var ipAddr = thirdPlatformList[i].ipAddr;
			var ipPort = thirdPlatformList[i].ipPort;
			var phone = thirdPlatformList[i].phone;
			var province = thirdPlatformList[i].province;
			var city =  thirdPlatformList[i].city;
			var county =  (thirdPlatformList[i].county == null) ? "" : thirdPlatformList[i].county;
			var userOnlineURL =  thirdPlatformList[i].userOnlineUrl;
			var userOfflineURL =  thirdPlatformList[i].userOfflineUrl;
			var welcomeURL =  thirdPlatformList[i].welcomeUrl;
			var description =  thirdPlatformList[i].description;
			var platformCode =  thirdPlatformList[i].platformCode;
			var createDatetime = thirdPlatformList[i].createDatetime;
		
			thirdPlatformHtml += "<tr class='ChinaNet-Table-Body'>";
			
			thirdPlatformHtml +=   "<td>";
			thirdPlatformHtml +=   	"<span id='id_name_" + i + "'>" + name + "</span>";
			thirdPlatformHtml +=   "</td>";	
			
			thirdPlatformHtml +=   "<td>";
			thirdPlatformHtml +=   	"<span id='id_domain_" + i + "'>" + domain + "</span>";
			thirdPlatformHtml +=   "</td>";
			
			thirdPlatformHtml +=   "<td>";
			thirdPlatformHtml +=   	"<span id='id_ip_addr_" + i + "'>" + ipAddr + "</span>";
			thirdPlatformHtml +=   "</td>";
			
			thirdPlatformHtml +=   "<td>";
			thirdPlatformHtml +=   	"<span id='id_ip_port_" + i + "'>" + ipPort + "</span>";
			thirdPlatformHtml +=   "</td>";
			
			thirdPlatformHtml +=   "<td>";
			thirdPlatformHtml +=   	"<span id='id_location_" + i + "'>" + province + " " + city + " " + county + " " + "</span>";
			thirdPlatformHtml +=   "</td>";
			
			thirdPlatformHtml +=   "<td>";
			thirdPlatformHtml +=   	"<span id='id_phone_" + i + "'>" + phone + "</span>";
			thirdPlatformHtml +=   "</td>";
			
			thirdPlatformHtml +=   "<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
			thirdPlatformHtml +=   "<a href='javascript:;' data-id='" + i + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
			thirdPlatformHtml += "</td></tr>";
		}
	} else {
		$(".ChinaNet-Page-Table").hide();
	}
	return thirdPlatformHtml;
}

function loadComButton(i) {
	var jsonObj2 = {ComButton:[]};
 	var ComButton = jsonObj2.ComButton;
 	
 	jsonObj2.ComButton.push({url:'javascript:showThirdPlatformDetails(\'' + i + '\');', text:'详情'});
 	//jsonObj2.ComButton.push({url:'javascript:deleteThirdPlatform(\'' + i + '\');', text:'删除'});
 	return ComButton;
}

/**
 * 显示二级平台详情
 * */
var showThirdPlatformDetails = function(i) {
	var thirdPlatformDetailsHtml = "";
	
	thirdPlatformDetailsHtml += "	<div class='UserInfo-Settings-Body'>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>平台ID</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_id' class='Form-Item-Input ChinaNet-Col-9 Form-Item-Disabled'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_id' class='Input-Control' readOnly/>";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>平台名称</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_name' class='Form-Item-Input ChinaNet-Col-9'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_name' class='Input-Control' />";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>域名</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_domain' class='Form-Item-Input ChinaNet-Col-9'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_domain' class='Input-Control' />";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>公网IP</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_ip_addr' class='Form-Item-Input ChinaNet-Col-9'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_ip_addr' class='Input-Control' />";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>端口号</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_ip_port' class='Form-Item-Input ChinaNet-Col-9'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_ip_port' class='Input-Control' />";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>电话</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_phone' class='Form-Item-Input ChinaNet-Col-9'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_phone' class='Input-Control' />";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>认证类型</label>";
	thirdPlatformDetailsHtml += "        	<div class='Form-Item-Select ChinaNet-Col-9' id='div_auth_type'><input type='text' id='select_auth_type' name='select_auth_type' class='Input-Control'></div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>放行接口</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_online_url' class='Form-Item-Input ChinaNet-Col-9'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_online_url' class='Input-Control' />";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>下线接口</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_offline_url' class='Form-Item-Input ChinaNet-Col-9'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_offline_url' class='Input-Control' />";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>欢迎页面</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_welcome_url' class='Form-Item-Input ChinaNet-Col-9'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_welcome_url' class='Input-Control' />";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>平台编码</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_platform_code' class='Form-Item-Input ChinaNet-Col-9 Form-Item-Disabled'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_platform_code' class='Input-Control' readOnly/>";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>创建时间</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_create_datetime' class='Form-Item-Input ChinaNet-Col-9 Form-Item-Disabled'>";
	thirdPlatformDetailsHtml += "        		<input type='text' id='input_details_create_datetime' class='Input-Control' readOnly/>";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>所在地区</label>";
	thirdPlatformDetailsHtml += "        	<div class='Form-Item-Select ChinaNet-Col-3' id='div_details_province'><input type='text' id='select_details_province' name='select_details_province'></div>";
	thirdPlatformDetailsHtml += "       	<div class='Form-Item-Select ChinaNet-Col-3' id='div_details_city'><input type='text' id='select_details_city' name='select_details_city'></div>";
	thirdPlatformDetailsHtml += "        	<div class='Form-Item-Select ChinaNet-Col-3' id='div_details_county'><input type='text' id='select_details_county' name='select_details_county'></div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "    	<div class='ChinaNet-Form-Sheet'>";
	thirdPlatformDetailsHtml += "        	<label class='Form-Item-Title ChinaNet-Col-2'>描述信息</label>";
	thirdPlatformDetailsHtml += "        	<div id='div_details_description' class='Form-Item-Textarea ChinaNet-Col-9'>";
	thirdPlatformDetailsHtml += "        		<Textarea type='text' id='input_details_description' />";
	thirdPlatformDetailsHtml += "			</div>";
	thirdPlatformDetailsHtml += "		</div>";
	
	thirdPlatformDetailsHtml += "	</div>";
	
	var d_thirdPlatformDetails = dialog({
		id: 'Dailogin:thirfPlatformDetails',
	    title: '二级平台详情',
	    content: thirdPlatformDetailsHtml,
	         
	    okValue: '确认修改',
	    ok: function () {
	    	thirdPlatformModify(i);
	    	return false;
	    },
	    cancelValue: '关闭',
	    cancel: function() {},
	    width:800,
	    height:720,
	    skin:'ChinaNet-Dialog'
	});
	d_thirdPlatformDetails.showModal();
	viewThirdPlatformDetails(i);
}

function getAppAuthTypeCnName(appAuthType) {
	for(var i = 0;i < _AUTH_TYPE.length; i++){
        if(_AUTH_TYPE[i].AUTH_KEY == appAuthType){
            return _AUTH_TYPE[i].cn_name;
        }
    }
}

/**
 * 显示详情
 * */
var viewThirdPlatformDetails = function(i) {
	$("#input_details_id").val(third_platform_list[i].id);
	$("#input_details_name").val(third_platform_list[i].name);
	$("#input_details_domain").val(third_platform_list[i].domain);
	$("#input_details_ip_addr").val(third_platform_list[i].ipAddr);
	$("#input_details_ip_port").val(third_platform_list[i].ipPort);
	$("#input_details_phone").val(third_platform_list[i].phone);
	$("#input_details_online_url").val(third_platform_list[i].userOnlineUrl);
	$("#input_details_offline_url").val(third_platform_list[i].userOfflineUrl);
	$("#input_details_welcome_url").val(third_platform_list[i].welcomeUrl);
	$("#input_details_platform_code").val(third_platform_list[i].platformCode);
	$("#input_details_description").val(third_platform_list[i].description);
	$("#input_details_create_datetime").val(third_platform_list[i].createDatetime);
	
	var curProvince = third_platform_list[i].province;
	var curCity = third_platform_list[i].city;
	var curCounty = third_platform_list[i].county;
	var appAuthType = third_platform_list[i].appAuthType;
	
	var authType = {
    	offsetSize:[0,3,0,3],defaultData:{value:appAuthType,text:getAppAuthTypeCnName(appAuthType)},
    	data:[
    	      {value:'THIRD_AUTH',text:'二级平台'},
    	      {value:'AAA_AUTH',text:'AAA认证'},
    	      {value:'AP_AUTH',text:'AP认证'},
    	      {value:'AC_AUTH',text:'AC认证'}
              ]
    	};
	$('input#select_auth_type').xiSelect(authType);
	
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
    $('input#select_details_province').xiSelect(provice);

    if(curCity!='undefined'&&curCity!=''){
        city.defaultData = {value:curCity,text:curCity}
        county.data = getCountyList(curProvince, curCity);
    }
    $('input#select_details_city').xiSelect(city);
        
    if(curCounty!='undefined'&&curCounty!=''){
        county.defaultData = {value:curCounty, text:curCounty};
    }
    $('input#select_details_county').xiSelect(county);
}

/**
 * 二级平台修改信息验证与提交
 * */
var thirdPlatformModify = function(i) {
	var id = $("#input_details_id").val();
	var name = $("#input_details_name").val();
	var domain = $("#input_details_domain").val();
	var ipAddr = $("#input_details_ip_addr").val();
	var ipPort = $("#input_details_ip_port").val();
	var phone = $("#input_details_phone").val();
	var appAuthType = $("#select_auth_type").val();
	var userOnlineUrl = $("#input_details_online_url").val();
	var userOfflineUrl = $("#input_details_offline_url").val();
	var welcomeUrl = $("#input_details_welcome_url").val();
	var description = $("#input_details_description").val();
	var province = ($("#select_details_province").val() == "请选择") ? "" : $("#select_details_province").val();
	var city = ($("#select_details_city").val() == "请选择") ? "" : $("#select_details_city").val();
	var county = $("#select_details_county").val();
	
	if(!onCheckEmpty(name)) { 
		onAlertErrorTip('平台名称不能为空', document.getElementById('input_details_name'));
		return false;
	} else if(!onCheckMaxLength(name, 30)) {
		onAlertErrorTip('平台名称不能超过30个字符', document.getElementById('input_details_name'));
		return false;
	}
	if(!onCheckEmpty(domain)) { 
		onAlertErrorTip('域名不能为空', document.getElementById('input_details_domain'));
		return false;
	} else if(!onCheckMaxLength(domain, 80)) {
		onAlertErrorTip('域名不能超过80个字符', document.getElementById('input_details_domain'));
		return false;
	}
	if(!onCheckEmpty(ipAddr)) { 
		onAlertErrorTip('公网IP不能为空', document.getElementById('input_details_ip_addr'));
		return false;
	}else if(!isIP(ipAddr)){
		onAlertErrorTip('IP格式错误', document.getElementById('input_details_ip_addr'));
		return false;
	}
	if(!onCheckEmpty(ipPort)) { 
		onAlertErrorTip('端口号不能为空', document.getElementById('input_details_ip_port'));
		return false;
	}else if(!checkInt(ipPort)){
		onAlertErrorTip('端口号只能为数字', document.getElementById('input_details_ip_port'));
		return false;
	}
	if(!onCheckEmpty(phone)) { 
		onAlertErrorTip('电话不能为空', document.getElementById('input_details_phone'));
		return false;
	}else if(!istel(phone)&&!checkMobile(phone)){
		onAlertErrorTip('电话格式不正确', document.getElementById('input_details_phone'));
		return false;
	}
	if(!onCheckEmpty(userOnlineUrl)) { 
		onAlertErrorTip('放行接口不能为空', document.getElementById('input_details_online_url'));
		return false;
	}
	if(!onCheckEmpty(userOfflineUrl)) { 
		onAlertErrorTip('下线接口不能为空', document.getElementById('input_details_offline_url'));
		return false;
	}
	if(!onCheckEmpty(province)) { 
		onAlertErrorTip('请选择所在省', document.getElementById('div_details_province'));
		return false;
	}
	if(!onCheckEmpty(city)) { 
		onAlertErrorTip('请选择所在市', document.getElementById('div_details_city'));
		return false;
	}
	if(!onCheckMaxLength(description, 330)) {
		onAlertErrorTip('描述不能超过330个字符', document.getElementById('input_details_description'));
		return false;
	}
	
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/platform10/setthirdplatform.htm',
        data: {
        	"id" : third_platform_list[i].id,
        	"name" : name,
        	"domain" : domain,
        	"ip_addr" : ipAddr,
        	"ip_port" : ipPort,
        	"phone" : phone,
        	"auth_type" : appAuthType,
        	"user_online_url" : userOnlineUrl,
        	"user_offline_url" : userOfflineUrl,
        	"welcome_url" : welcomeUrl,
        	"province" : province,
        	"city" : city,
        	"district" : (county == '请选择') ? '' : county,
        	"description" : description
        },
        success: function (data) {
            if (data.result == 'OK') {
            	onAlertError('二级平台信息修改成功!',"ok");
            	thirdPlatformSearchHandler.clearResultSetpageNo();
            	thirdPlatformSearchHandler.searchWithPreload();
            	//dialog.list['Dailogin:thirfPlatformDetails'].remove().close();
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError('二级平台信息修改失败!');
        }
    });
}

var deleteThirdPlatform = function(i) {
	return thirdPlatformDetailsHtml;
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

/**
 * 根据地区获取城市列表（编辑用）
 * @param city
 */
function onChangeProvice(provice){
    $('div#div_details_city').html('<input type="text" id="select_details_city" name="select_details_city">');
    $('div#div_details_county').html('<input type="text" id="select_details_county" name="select_details_county">');
    $('input#select_details_city').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCityList(provice),
        onChange:function(obj){
            onChangeCity($(obj).attr('data-value'));
        },
        defaultData:{value:'',text:''}
    });
    $('input#select_details_county').xiSelect({offsetSize:[0,3,0,3],defaultData:{text:'',value:''}});
}

/**
 * 根据市名获取区/县列表（编辑用）
 * @param city
 */
function onChangeCity(city){
	$('div#div_details_county').html('<input type="text" id="select_details_county" name="select_details_county">');
    $('input#select_details_county').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCountyList($('input#select_details_province').val(),city),
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