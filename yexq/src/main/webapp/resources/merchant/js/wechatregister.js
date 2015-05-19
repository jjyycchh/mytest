var BTNAUTHCODE = '';
var BTNLOGIN = '';
var tmrAuthCode = 0,
	tmrLogin = 0;
var terminal_userid = '',
	merchant_openid = '',
	wechat_account = '';

function getAuthCode(){
	if(tmrAuthCode <= 0){
		var cellphone = $('#cellphone').val();
		if(chkCellphone(cellphone)){
			tmrAuthCode = 99;
			$('#btnauthcode').html(BTNAUTHCODE+'('+tmrAuthCode+')').attr('disabled', true);
			$.ajax({
	 		url: '/authentication/wechatgetauthcode.htm',
				type: 'GET',
				dataType: 'JSON',
				data: {phone:cellphone, terminaluserid:terminal_userid, merchantopenid:merchant_openid, wechataccount:wechat_account},
				success: function(data){
					
				},
				error: function(){
					tmrAuthCode = 0;
					$('#btnauthcode').html(BTNAUTHCODE).attr('disabled', false);
					alert('系统错误');
				}
		 	});
			getAuthCode();
		}else{
			alert('手机号码有误，请重新输入');
		}
	}else{
		setTimeout(function(){
			tmrAuthCode--;
			if(tmrAuthCode <= 0){
				$('#btnauthcode').html(BTNAUTHCODE).attr('disabled', false);
			}else{
				$('#btnauthcode').html(BTNAUTHCODE+'('+tmrAuthCode+')');
				getAuthCode();
			}
		}, 1000);
	}
}

function Login(){
	if(tmrLogin <= 0){
		var cellphone = $('#cellphone').val();
		var authcode = $('#authcode').val();
		if(!chkCellphone(cellphone)){
			alert('手机号码有误，请重新输入');
		}else if(!chkAuthCode(authcode)){
			alert('验证码是6位数字，请重新输入');
		}else{
			tmrLogin = 5;
			$('#btnlogin').html(BTNLOGIN+'('+tmrLogin+')').attr('disabled', true);
			$.ajax({
	 		url: '/authentication/wechatauth.htm',
				type: 'GET',
				dataType: 'JSON',
				data: {phone:cellphone, wechataccount:wechat_account, terminaluserid:terminal_userid, merchantopenid:merchant_openid, auth_code:authcode, browser_type:$.client.browser, terminal_type:$.client.os},
				success: function(data){
					if(data.result == 'OK'){
						window.location.href = data.data.url + '?token=' + data.data.token;
					}else{
						tmrLogin = 0;
						$('#btnlogin').html(BTNLOGIN).attr('disabled', false);
		 				alert(data.message);
					}
				},
				error: function(){
					tmrLogin = 0;
					$('#btnlogin').html(BTNLOGIN).attr('disabled', false);
					alert('系统错误');
				}
		 	});
			Login();
		}
	}else{
		setTimeout(function(){
			tmrLogin--;
			if(tmrLogin <= 0){
				$('#btnlogin').html(BTNLOGIN).attr('disabled', false);
			}else{
				$('#btnlogin').html(BTNLOGIN+'('+tmrLogin+')');
				Login();
			}
		}, 1000);
	}
}

function chkCellphone(str){
	var re = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/ig;
	return re.test(str);
}

function chkAuthCode(str){
	var re = /^\d{6}$/ig;
	return re.test(str);
}

$.ajaxSetup({
	cache: false,
	contentType: 'application/x-www-form-urlencoded;charset=utf-8'
});

$(function(){
	BTNAUTHCODE = $('#btnauthcode').html();
	BTNLOGIN = $('#btnlogin').html();
	terminal_userid = $('#terminaluserid').val();
	merchant_openid = $('#merchantopenid').val();
	wechat_account = $('#wechataccount').val();
	$('#btnauthcode').click(function(){
		getAuthCode();
	});
	$('#btnlogin').click(function(){
		Login();
	});
});