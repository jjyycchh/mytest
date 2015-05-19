var thirdPlatformRegisterApp = function() {
	
	//初始化“完成”按钮单击事件
	var initRegisterButton = function() {
		$("#button_third_platform_submit").click(function() {
			thirdPlatformValidation();
		});
	}
	
	//初始化认证类型选择框
	var initAuthTypeSelect = function() {
        $('#third_platform_auth_type').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'THIRD_AUTH',text:'二级平台'},
        	data:[
        	      {value:'THIRD_AUTH',text:'二级平台'},
        	      {value:'AAA_AUTH',text:'AAA认证'},
        	      {value:'AP_AUTH',text:'AP认证'},
        	      {value:'AC_AUTH',text:'AC认证'}]});
    }
	
	//初始化提交类型选择框
	var initSubmitTypeSelect = function() {
        $('#select_submit_type_1').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'POST',text:'POST'},
        	data:[
        	      {value:'POST',text:'POST'},
        	      {value:'GET',text:'GET'}]});
        $('#select_submit_type_2').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'POST',text:'POST'},
        	data:[
        	      {value:'POST',text:'POST'},
        	      {value:'GET',text:'GET'}]});
    }
	
	//初始化地区选择框
	var initLocationSelect = function(){
		$('input#third_platform_province').xiSelect({
            offsetSize:[0,3,0,3],
            data:getProviceList(),
            defaultData:{value:'',text:''},
            onChange:function(obj){
            	onChangeProvice($(obj).attr('data-value')); 
            }
        });
		$('input#third_platform_city').xiSelect();
        $('input#third_platform_county').xiSelect();
    }
	
	//提示初始化
	var inittips = function(){
		$('input#third_platform_online_url').focus(function(){
			interfacetips(this,1);
		});
		$('input#third_platform_online_url').blur(function(){
			interfacetips(this,0);
		});
		$('input#third_platform_offline_url').focus(function(){
			interfacetips(this,1);
		});
		$('input#third_platform_offline_url').blur(function(){
			interfacetips(this,0);
		});
	};
	return {init:function() {
		initLocationSelect();
		initRegisterButton();
		initSubmitTypeSelect();
		initAuthTypeSelect();
		inittips();
		}
	}
}();

function interfacetips(obj, type){
	var $line = $(obj).parent().parent();
	var hasTips = $line.next().hasClass('Tips');
	if(type){
		if(!hasTips) $line.after('<div class="ChinaNet-Form-Sheet Tips"><label class="Form-Item-Title ChinaNet-Col-2">&nbsp;</label><div class="ChinaNet-Col-6" style="float:left">提供变量：${authId}手机号码，${terMac}终端MAC地址，${terType}终端类型。例如：www.iwifi.com?phone=${authId},${authId}将替换为手机号</div></div>');
	}else{
		if(hasTips) $line.next('.Tips').remove();
	}
}

/**
 * 校验注册信息是否合法
 * 
 * */
var thirdPlatformValidation = function() {
	var thirdPlatform = {
			name : $("#third_platform_name").val(),
			domain : $("#third_platform_domain").val(),
			ipAddr : $("#third_platform_ip_addr").val(),
			ipPort : $("#third_platform_ip_port").val(),
			phone : $("#third_platform_phone").val(),
			authType : $("#third_platform_auth_type").val(),
			onlineURL : $("#third_platform_online_url").val(),
			offlineURL : $("#third_platform_offline_url").val(),
			welcomeURL : $("#third_platform_welcome_url").val(),
			province : ($("#third_platform_province").val() == '请选择') ? "" : $("#third_platform_province").val(),
			city : ($("#third_platform_city").val() == '请选择') ? "" : $("#third_platform_city").val(),
			county : ($("#third_platform_county").val() == '请选择') ? "" : $("#third_platform_county").val(),
			description : $("#third_platform_description").val()
	};
	
	if (!onCheckEmpty(thirdPlatform.name)) {
		onAlertErrorTip('二级平台名称不能为空', document.getElementById('third_platform_name'));
		return false;
	} else if(!onCheckMaxLength(thirdPlatform.name, 30)) {
		onAlertErrorTip('二级平台名称不能超过30个字符', document.getElementById('third_platform_name'));
		return false;
	}
	if (!onCheckEmpty(thirdPlatform.domain)) {
		onAlertErrorTip('域名不能为空', document.getElementById('third_platform_domain'));
		return false;
	} else if(!onCheckMaxLength(thirdPlatform.domain, 80)) {
		onAlertErrorTip('域名不能超过80个字符', document.getElementById('third_platform_domain'));
		return false;
	}
	if (!onCheckEmpty(thirdPlatform.ipAddr)) {
		onAlertErrorTip('IP不能为空', document.getElementById('third_platform_ip_addr'));
		return false;
	}else if(!isIP(thirdPlatform.ipAddr)){
		onAlertErrorTip('IP格式错误', document.getElementById('third_platform_ip_addr'));
		return false;
	}
	if (!onCheckEmpty(thirdPlatform.ipPort)) {
		onAlertErrorTip('端口号不能为空', document.getElementById('third_platform_ip_port'));
		return false;
	}else if(!checkInt(thirdPlatform.ipPort)){
		onAlertErrorTip('端口号只能为数字', document.getElementById('third_platform_ip_port'));
		return false;
	} else if(!checkPort(thirdPlatform.ipPort)) {
		onAlertErrorTip('端口号不能大于65535或小于1', document.getElementById('third_platform_ip_port'));
		return false;
	}
	if (!onCheckEmpty(thirdPlatform.phone)) {
		onAlertErrorTip('电话不能为空', document.getElementById('third_platform_phone'));
		return false;
	}else if(!istel(thirdPlatform.phone)&&!checkMobile(thirdPlatform.phone)){
		onAlertErrorTip('电话格式不正确', document.getElementById('third_platform_phone'));
		return false;
	}
	if (!onCheckEmpty(thirdPlatform.onlineURL)) {
		onAlertErrorTip('二级平台放行接口不能为空', document.getElementById('third_platform_online_url'));
		return false;
	}
	if (!onCheckEmpty(thirdPlatform.offlineURL)) {
		onAlertErrorTip('二级平台下线接口不能为空', document.getElementById('third_platform_offline_url'));
		return false;
	}
	if (!onCheckEmpty(thirdPlatform.province)) {
		onAlertErrorTip('请选择所在省', document.getElementById('third_platform_province_list'));
		return false;
	}
	if (!onCheckEmpty(thirdPlatform.city)) {
		onAlertErrorTip('请选择所在市', document.getElementById('third_platform_city_list'));
		return false;
	}
	if(!onCheckMaxLength(thirdPlatform.description, 330)) {
		onAlertErrorTip('描述不能超过330个字符', document.getElementById('third_platform_description'));
		return false;
	}
	
	$("#third_platform_province_readonly").val(thirdPlatform.province);
	$("#third_platform_city_readonly").val(thirdPlatform.city);
	$("#third_platform_county_readonly").val(thirdPlatform.county);
	if($("#select_submit_type_1").val() == "POST") {
		if(thirdPlatform.onlineURL.indexOf("?") > 0) {
			thirdPlatform.onlineURL += "&post=1";
		} else {
			thirdPlatform.onlineURL += "?&post=1";
		}
	}
	if($("#select_submit_type_2").val() == "POST") {
		if(thirdPlatform.offlineURL.indexOf("?") > 0) {
			thirdPlatform.offlineURL += "&post=1";
		} else {
			thirdPlatform.offlineURL += "?&post=1";
		}
	}
	thirdPlatformRegister(thirdPlatform);
	
}

/**
 * 提交注册信息
 * 
 * */
var thirdPlatformRegister = function(thirdPlatform) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/platform10/register.htm',
        data: {
        	"name" : thirdPlatform.name,
        	"domain" : thirdPlatform.domain,
        	"ip_addr" : thirdPlatform.ipAddr,
        	"ip_port" : thirdPlatform.ipPort,
        	"phone" : thirdPlatform.phone,
        	"auth_type" : thirdPlatform.authType,
        	"user_online_url" : thirdPlatform.onlineURL,
        	"user_offline_url" : thirdPlatform.offlineURL,
        	"province" : thirdPlatform.province,
        	"city" : thirdPlatform.city,
        	"district" : thirdPlatform.county,
        	"description" : thirdPlatform.description,
        	"welcome_url" : thirdPlatform.welcomeURL
        },
        success: function (data) {
            if (data.result == 'OK') {
            	onAlertError('二级平台注册成功!',"ok");
            	switchToView();
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError('二级平台注册失败!');
        }
    });
}

/**
 * 切换到详情视图
 * @param
 * */
var switchToView = function() {
	document.getElementById('third_platform_name').disabled = "disabled";
	document.getElementById('third_platform_domain').disabled = "disabled";
	document.getElementById('third_platform_ip_addr').disabled = "disabled";
	document.getElementById('third_platform_ip_port').disabled = "disabled";
	document.getElementById('third_platform_phone').disabled = "disabled";
	document.getElementById('third_platform_online_url').disabled = "disabled";
	document.getElementById('third_platform_offline_url').disabled = "disabled";
	document.getElementById('third_platform_welcome_url').disabled = "disabled";
	document.getElementById('third_platform_description').disabled = "disabled";
	document.getElementById('third_platform_province_list').style.display = "none";
	document.getElementById('third_platform_city_list').style.display = "none";
	document.getElementById('third_platform_county_list').style.display = "none";
	document.getElementById('button_third_platform_submit').style.display = "none";
	document.getElementById('third_platform_province_text').style.display = "";
	document.getElementById('third_platform_city_text').style.display = "";
	document.getElementById('third_platform_county_text').style.display = "";
	//document.getElementById('third_platform_domain').enabled;
}

/**
 * 根据省名获取城市列表
 * @param province
 */
function onChangeProvice(provice){
	$('div#third_platform_city_list').html('<input type="text" id="third_platform_city" name="third_platform_city">');
    $('div#third_platform_county_list').html('<input type="text" id="third_platform_county" name="third_platform_county">');
    $('input#third_platform_city').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCityList(provice),
        onChange:function(obj){
            onChangeCity($(obj).attr('data-value'));
        },
        defaultData:{value:'',text:''}
    });
    $('input#third_platform_county').xiSelect({offsetSize:[0,3,0,3],defaultData:{text:'',value:''}});
}

/**
 * 根据市名获取区/县列表
 * @param city
 */
function onChangeCity(city){
    $('div#third_platform_county_list').html('<input type="text" id="third_platform_county" name="third_platform_county">');
    $('input#third_platform_county').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCountyList($('input#third_platform_province').val(),city),
        defaultData:{value:'',text:''}
    });
}