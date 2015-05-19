/** PORTAL SITE AUTHORIZE **/
var SMSTIME = null;
var SMSSECO = 120;
var AUTHTYPE = 'mobile';

$(document).ready(function(){
	if(SMSTIME!=null) window.clearTimeout(SMSTIME);
	$(document).on('click', 'button.AuthMobileSMS', function(){
		if($(this).hasClass('disabled')){
			alert('短信已经发送，请稍等...');
			return false;
		}

		var mobile = $('input#MobileNumber').val();
		if(!(/^((13[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/ig).test(mobile)){
			alert('请填写正确的手机号码.');
			return false;
		}

		var authurl = $('div#siteLoginModuleBox').attr('platSvrAddr');

		// platSrvAddr - authPlatAddr

		$.ajax({
			url:authurl+'/user/userlogin.htm',
			type:'GET',
			dataType:'JSONP',
			jsonp:"getResultRequest",
			async:false,
			data:{auth_id:mobile,auth_type:'mobile',dev_id:getRequestValue('dev_id')},
			success:function(data){
				if(data.result=='OK'){
					$('button.AuthMobileSMS').addClass('disabled');
					resetSendSMS();
				}else{
					alert(data.message);
				}
			}
		});
	});

	if(typeof(__show_editer)=="undefined"){
		var clientmac;
		if(getRequestValue('client_mac')){
			clientmac = getRequestValue('client_mac').replace(/:/g,"").toUpperCase();
			$.ajax({
		        url:$('div#siteLoginModuleBox').attr('platSvrAddr')+'/user/validateusermac.htm',
		        type:'GET',
		        dataType:'JSONP',
		        jsonp:"getResultRequest",
		        async:false,
		        data:{mac:clientmac,dev_id:getRequestValue('dev_id'),authtype:AUTHTYPE},
		        success:function(data){
		        	if(data.result=='OK'){
		        		if($('div.bottombutton').length>0){
		        			$('div.bottombutton').css({'padding':0}).html('<button type="button" class="AuthSubmitID ValidateInMobile optionbutton">点击上网</button>');
		        		}else{
		        			if($('div.auth-type-body').length>0){
		        				$('div.auth-type-body').css({'text-align':'center'}).html('<button type="button" class="AuthSubmitID ValidateInMobile optionbutton" style="width:80%">点击上网</button>');
		        			}else{
		        				if($('div.loginAPI-Form').length>0) $('div.loginAPI-Form').css({'text-align':'center'}).html('<button type="button" class="AuthSubmitID ValidateInMobile optionbutton" style="width:80%">点击上网</button>');
		        			}
		        		} 
		        	}
		        }
			});
		}


        /**
         * 插入 jqueyr.client.js
         * @type {boolean}
         */
        if(typeof $.client=='undefined'){
            $('body').append('<script type="text/javascript" src="'+($('div#siteLoginModuleBox').attr('platSvrAddr')!='undefined'?$('div#siteLoginModuleBox').attr('platSvrAddr'):'')+'/resources/portal/auth_module/js/jquery.client.js"></script>');
        }
	}

    if($('div.auth-type-components').length>0){
        //显示验证方式
        onShowAuthTypeForm();
    }


    // 投诉举报
});

/**
 * 重置验证码按钮
 *
 */
function resetSendSMS(){
	if(SMSSECO>0){
		SMSSECO = SMSSECO-1;
		$('button.AuthMobileSMS').html('请等待'+SMSSECO+'秒');
		SMSTIME = window.setTimeout('resetSendSMS()', 1000);
	}else{
		window.clearTimeout(SMSTIME);
		SMSSECO = 120;
		$('button.AuthMobileSMS').removeClass('disabled');
		$('button.AuthMobileSMS').html('获取验证码');
	}
}

function onShowAuthTypeForm(){
    var type = $('div#siteLoginModuleBox div.auth-type-body');
    if(type.length>1){
        var pos = $('div#siteLoginModuleBox').css('position').toLowerCase();
        if(pos=='absolute'||pos=='fixed'){
            $('div.auth-component-button').show().find('button').attr('class', 'auth-wifi-config');
        }else{
            $('div.auth-type-components-view').show();
        }
        $('div.auth-type-components-view a.close').show();
    }else{
        if(type.length==1) {
            if (type.attr('id').toLowerCase() == 'option') {
                $('div.auth-component-button').show().find('button').attr('class', 'fee-wifi-config').html('点击免费上网');
                $('div.auth-type-components-view').removeAttr('style');
            } else {
                $('div.auth-type-components-view').show().find('div.auth-type-body').show();
                $('div.auth-component-button').hide();
            }
        }
    }

    // 页面交互事件
    $('div.auth-type-list-item li a').click(function(){
        var auth_type_id = $(this).attr('id')
        $('div.auth-type-body').each(function(x){
            if($('div.auth-type-body').eq(x).attr('id').toLowerCase()==auth_type_id){
                $('div.auth-type-body').eq(x).show();
            }else{
                $('div.auth-type-body').eq(x).hide();
            }
        });

        $('div.auth-type-components-view').fadeIn();
        $('div.auth-type-list-item').fadeOut();
    });


    $('div.auth-type-components-view a.close').click(function(){
        $('div.auth-type-components-view').fadeOut();
        $('div.auth-type-list-item').fadeIn();
    });

    $('button.auth-wifi-config').click(function(){
        if($('div.auth-type-list-item').is(':hidden')) {
            $('div.auth-type-list-item').slideUp();
        }else{
            $('div.auth-type-list-item').slideDown();
        }
    });

    $('button.fee-wifi-config').click(function(){
        onValidatorOption();
    });
}

/**
 * 获取URL地址REQUEST参数值
 * @param key
 * @returns
 */
function getRequestValue(key){
	var url = window.location.search.substring(1);
	var par = url.split('&');
	for(i=0;i<par.length;i++){
		var code = par[i].split('=');
		if(key==code[0]) return code[1];
	}
	return false;
}

/**
 *
 */
function getReqeust2Obj(){
	var url = window.location.search.substring(1);
	var par = url.split('&');
	for(i=0;i<par.length;i++){
		var code = par[i].split('=');
		//if(key==code[0])
	}
}

function getAuthModule(type){
	type = type.toLowerCase();
	switch(type){
		case 'mobile':
			return AUTH_TYPE_MODULE.mobile;
			break;
		case 'email':
			return AUTH_TYPE_MODULE.email;
			break;
		case 'userpwd':
			return AUTH_TYPE_MODULE.userpwd;
			break;
		case 'option':
			return AUTH_TYPE_MODULE.option;
			break;
		case 'extend':
			return AUTH_TYPE_MODULE.extend;
			break;
		default:
			return AUTH_TYPE_MODULE.mobile;
	}
}

$(function(){
	$(document).off('button.AuthSubmitID');
	$(document).on('click', 'button.AuthSubmitID', function(e){
		if($(this).hasClass('ValidatorMobile')){
			onValidatorMobile();
		}else if($(this).hasClass('ValidatorEmail')){

		}else if($(this).hasClass('ValidatorUserpwd')){

		}else if($(this).hasClass('ValidatorOption')){
			onValidatorOption();   // 已改为用 button.(fee-wifi-config|auth-wifi-config)
		}else if($(this).hasClass('ValidatorExtend')){

		}else if($(this).hasClass('ValidateInMobile')){
            onValidatorInMobile();
        }
	});
});

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function authRequest(param_data, destUrl, onSuccessLocation){
	if (((window.location)+'').indexOf('api10')>-1) {
		//destUrl += '/api10/userauth.htm';
		$.ajax({
			//url: 'http://'+location.hostname+':'+location.port+ "/user/userauth",
            url: destUrl + "/user/userauth.htm",
			type:'POST',
            dataType:'JSONP',
            jsonp:'getResultRequest',
			async:false,
			data: param_data,
			success:function(data){
				if(data.result=='OK'){
					if(!getRequestValue('gw_address')||getRequestValue('gw_address')==''){
						window.location = 'http://'+location.hostname+':'+location.port+'/api10/portal?'+location.search.substr(1);
					}else{
						onSuccessLocation = 'http://' + getRequestValue('gw_address') + ':' + getRequestValue('gw_port') + '/smartwifi/auth?url=' + encodeURIComponent(getRequestValue('url')) + '&token=';
						window.location = onSuccessLocation + data.token;
					}
				}else{
					//alert('用户验证失败，请重新验证');
					alert(data.message);
				}
			}
		});
		//onSuccessLocation = 'http://' + getRequestValue('gw_address') + ':' + getRequestValue('gw_port') + '/smartwifi/auth?url=' + encodeURIComponent(getRequestValue('url')) + '&token=';
	} else {
		destUrl += '/user/userauth.htm';
		$.ajax({
			url: destUrl,
			type:'POST',
			dataType:'JSONP',
			jsonp:'getResultRequest',
			async:false,
			data: param_data,
			success:function(data){
				if(data.result=='OK'){
					if(!getRequestValue('gw_address')||getRequestValue('gw_address')==''){
						window.location = 'http://'+location.hostname+':'+location.port+'/site/portal/?'+location.search.substr(1);
					}else{
						onSuccessLocation = 'http://' + getRequestValue('gw_address') + ':' + getRequestValue('gw_port') + '/twifi/auth?url=' + encodeURIComponent(getRequestValue('url')) + '&token=';
						window.location = onSuccessLocation + data.token;
					}
				}else{
					//alert('用户验证失败，请重新验证');
					alert(data.message);
				}
			}
		});
		//onSuccessLocation = 'http://' + getRequestValue('gw_address') + ':' + getRequestValue('gw_port') + '/twifi/auth?url=' + encodeURIComponent(getRequestValue('url')) + '&token=';
	}
}


function aciAuthRequest(mobile, captcha, auth_type){
	param_data = {
		//csrfmiddlewaretoken: '{{ csrf_token }}',
		csrfmiddlewaretoken: getCookie('csrftoken'),
		auth_id:mobile,
		dev_id:getRequestValue('dev_id'),
		auth_code: captcha,
		auth_type:auth_type,
		user_ip: getRequestValue('user_ip'),
		user_mac: getRequestValue('user_mac'),
		ac_name: getRequestValue('ac_name'),
		ac_ip: getRequestValue('ac_ip'),
		ap_mac: getRequestValue('ap_mac'),
		nasid: getRequestValue('nasid'),
		ssid: getRequestValue('ssid'),
		browser_type: $.client.browser,
		terminal_type: $.client.os,
		auth_gw_type: 'RADIUS'
	};

	$.ajax({
		url: 'http://'+location.hostname+':'+location.port+ "/auth/login",
		type:'POST',
		dataType:'JSON',
        headers : { "cache-control": "no-cache" },
		async:false,
		data: param_data,
		success:function(data){
			if(data.result=='OK'){
				window.location = 'http://'+location.hostname+':'+location.port+ "/aci10/portal?dev_id=" + data.dev_id;
			}else{
				alert('用户验证失败，请重新验证');
			}
		},
		error: function(data){
			var code = '<form id="hidform" action="/auth/ioslogin" method="post" style="display:none">' +
				'<input type="hidden" name="csrfmiddlewaretoken" value="'+param_data.csrfmiddlewaretoken+'" />' +
				'<input type="hidden" name="auth_id" value="'+param_data.auth_id+'" />' +
				'<input type="hidden" name="dev_id" value="'+param_data.dev_id+'" />' +
				'<input type="hidden" name="auth_code" value="'+param_data.auth_code+'" />' +
				'<input type="hidden" name="auth_type" value="'+param_data.auth_type+'" />' +
				'<input type="hidden" name="user_ip" value="'+param_data.user_ip+'" />' +
				'<input type="hidden" name="user_mac" value="'+param_data.user_mac+'" />' +
				'<input type="hidden" name="ac_name" value="'+param_data.ac_name+'" />' +
				'<input type="hidden" name="ac_ip" value="'+param_data.ac_ip+'" />' +
				'<input type="hidden" name="ap_mac" value="'+param_data.ap_mac+'" />' +
				'<input type="hidden" name="nasid" value="'+param_data.nasid+'" />' +
				'<input type="hidden" name="ssid" value="'+param_data.ssid+'" />' +
				'<input type="hidden" name="browser_type" value="'+param_data.browser_type+'" />' +
				'<input type="hidden" name="terminal_type" value="'+param_data.terminal_type+'" />' +
				'<input type="hidden" name="auth_gw_type" value="'+param_data.auth_gw_type+'" />' +
				'</form>';
			$('body').append(code);
			$('#hidform').submit();
		}
	});
}

function onValidatorOption(){
	var authurl= $('div#siteLoginModuleBox').attr('platSvrAddr');
    var destUrl = authurl;
    var onSuccessLocation = "";
    var param_data = null;

    if (getRequestValue('from') + '' == 'aci') {
		aciAuthRequest('', '', 'option');
    }
    else {

		param_data = {
            mac: (getRequestValue('client_mac')+'').replace(/:/g,"").toUpperCase(),
            auth_type:'option',
            dev_id:getRequestValue('dev_id'),
            browser_type: $.client.browser,
            terminal_type: $.client.os
        };
		
        authRequest(param_data, destUrl, onSuccessLocation);        
    }

}

function onValidatorMobile(){
	var mobile = $('input#MobileNumber').val();
	var captcha= $('input#SMSCodeNumber').val();
	var authurl= $('div#siteLoginModuleBox').attr('platSvrAddr');
		captcha= captcha.replace(/\s+/ig, '');

    var destUrl = authurl;
    var onSuccessLocation = "";
    var param_data = null;

    if(!(/^((13[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/ig).test(mobile)){
		alert('请填写正确的手机号码.');
		return false;
	}

	if(captcha==''){
		alert('请输入有效的验证码.');
		return false;
	}

    if (getRequestValue('from') + '' == 'aci') {
        aciAuthRequest(mobile, captcha, 'mobile');
    } else {
		param_data = {
            auth_id:mobile,
            auth_type:'mobile',
            dev_id:getRequestValue('dev_id'),
            auth_code:captcha,
            mac:getRequestValue('client_mac').replace(/:/g,"").toUpperCase(),
            site_id:getRequestValue('site_id'),
            browser_type: $.client.browser,
            terminal_type: $.client.os
        };
		
        authRequest(param_data, destUrl, onSuccessLocation);
    }

}

function onValidatorInMobile(){
    var destUrl = $('div#siteLoginModuleBox').attr('platSvrAddr');
    var onSuccessLocation = "";
    var param_data = null;

    if (getRequestValue('from') + '' == 'aci') {
        aciAuthRequest("", "", "mobile");
    } else {

		param_data = {
            auth_id:'',
            auth_type:'mobile',
            dev_id:getRequestValue('dev_id'),
            auth_code:'',
            mac:getRequestValue('client_mac').replace(/:/g,"").toUpperCase(),
            site_id:getRequestValue('site_id'),
            browser_type: $.client.browser,
            terminal_type: $.client.os
        };
		
        authRequest(param_data, destUrl, onSuccessLocation);
      
    }
}