

var registerApp = function(){
	
	var initregister = function(){
		addr_selector_create('id_province', 'id_city', 'id_county');
        addr_selector_set('id_province', "浙江", 'id_city', "杭州", "id_county", "上城区");
        
        $("#id_username").blur(function() {
        	var username = $("#id_username").val();        	
        		if(!checkUserName(username)){
    	            onAlertErrorTip('用户名不能为空，且必须由中英文、数字、下划线或.组成', document.getElementById('id_username'));
    	            //return false;
    	        }else if($("#id_username").val().length > 50){
                	onAlertErrorTip('用户名不能超过50个字符', document.getElementById('id_username'));
                	return false;
                }else{
    	        	validateUsername();
    	        }
        });
    }
	var initLocationSelect = function(){
        $('input#AccountProvice').xiSelect({
            offsetSize:[0,3,0,3],
            data:getProviceList(),
            defaultData:{value:'',text:''},
            onChange:function(obj){
                onChangeProvice($(obj).attr('data-value'));
            }
        });
        $('input#AccountCity').xiSelect({
            offsetSize:[0,3,0,3],
            data:[],
            defaultData:{value:'',text:''},
            onChange:function(obj){
                onChangeCity($(obj).attr('data-value'));
            }
        });
        $('input#AccountCounty').xiSelect({
            offsetSize:[0,3,0,3],
            data:[],
            defaultData:{value:'',text:''}
        });
    }
	var initBtn = function(){
		$("#id_regbtn").click(function() {
			if(!checkUserName($("#id_username").val())){
	            onAlertErrorTip('用户名不能为空，且必须由中英文、数字、下划线或.组成', document.getElementById('id_username'));
	            return false;
	        }
			if($("#id_username").val().length > 50){
            	onAlertErrorTip('用户名不能超过50个字符', document.getElementById('id_username'));
            	return false;
            }
			var newpwd = $("#id_password").val();
	    	var repwd  = $("#id_repassword").val();
	    	var acctemail = $("#id_email").val();
	    	var acctphone  = $("#id_cellNumber").val();
	    	var detailAddress = $('#id_address').val();
	    	
	    	//detailAddress = detailAddress.replace(/\r\n/ig, " ").replace(/\n/ig, " ").replace(/\r/ig, " ");
	    	//detailAddress = detailAddress.replace(new RegExp('(["\"])', 'g'),"\\\"");
	    		    
	    	if(!isPasswd(newpwd)){
	            onAlertErrorTip('请输入6-20位长度的密码', document.getElementById('id_password'))
	            return false;
	        }
	        if(newpwd !== repwd){
	            onAlertErrorTip('2次密码输入不一致', document.getElementById('id_repassword'))
	            return false;
	        }
	        if(!checkUserName($("#id_fullname").val())){
	            onAlertErrorTip('姓名不能为空，且必须由中英文、数字、下划线或.组成', document.getElementById('id_fullname'));
	            return false;
	        }
			if($("#id_fullname").val().length > 50){
            	onAlertErrorTip('姓名不能超过50个字符', document.getElementById('id_fullname'));
            	return false;
            }
			if(!isNotEmptyString(acctemail)){
	        	onAlertErrorTip('邮箱不能为空', document.getElementById('id_email'));
	            return false;
	        }else if(!checkEmail(acctemail)){
	            onAlertErrorTip('邮箱格式不正确', document.getElementById('id_email'));
	            return false;
	        }
	        if(!isNotEmptyString(acctphone)){
	        	onAlertErrorTip('手机号码不能为空', document.getElementById('id_cellNumber'));
	            return false;
	        }else if(!checkMobile(acctphone)){
	            onAlertErrorTip('手机号码格式不正确', document.getElementById('id_cellNumber'));
	            return false;
	        }
	        if(!isNotEmptyString($("#id_merchantName").val())){
	        	onAlertErrorTip('商户名不能为空', document.getElementById('id_merchantName'));
	            return false;
	        }else if($("#id_merchantName").val().length > 50){
                onAlertErrorTip('商户名不能超过50个字符', $('input#id_merchantName')[0]);
                return false;
            }
	    	if(!onCheckEmpty($("#AccountProvice").val()) || $("#AccountProvice").val()=='请选择'){
	        	onAlertErrorTip('请选择省', document.getElementById('AccountProviceList'))
				return false;
	        }
	        if(!onCheckEmpty($("#AccountCity").val()) || $("#AccountCity").val()=='请选择'){
	        	onAlertErrorTip('请选择市', document.getElementById('AccountCityList'))
				return false;
	        }
	        var filterHtmlRe = /<script[\d\D]*>[\d\D]*<\/script>/g;
	        //detailAddress = detailAddress.replace(filterHtmlRe, '');
	        detailAddress = string2Json(detailAddress.replace(/[~'!<>]/g, ''));
	    	$.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/account/saveaccount.htm',
                data: {
                    "account.username": $("#id_username").val(),
                    "account.password": window.md5($("#id_password").val()),
                    "account.fullname": $("#id_fullname").val(),
                    "account.email": $("#id_email").val(),
                    "account.cellNumber": $("#id_cellNumber").val(),
                    "account.merchantName": $("#id_merchantName").val().replace(filterHtmlRe, '').replace(/[~'!<>]/g, ''),
                    "account.merchantDescription": string2Json($("#id_merchantDescription").val().replace(filterHtmlRe, '').replace(/[~'!<>]/g, '')),
                    "account.geoLocation": '{"province":"'+$('input#AccountProvice').val()+'","city":"'+$('input#AccountCity').val()+'","county":"'+$('input#AccountCounty').val()+'","address":"'+detailAddress+'"}'
                },
                success: function (data) {
                    if (data.result == 'OK') {                        
                        onAlertError('注册成功!即将跳转到登录页...',"ok");
                        setTimeout ("window.location.href = '/account/login.htm';", 2000);
                    } else {
                    	onAlertError("注册失败:"+data.message);
                        
                    }
                },
                error: function (data) {
                	onAlertError("注册失败");
                }
            });
		});
	}
	var validateUsername = function(){
		var username = $("#id_username").val();
    	
		$.ajax({
			url: "/account/usernamevalidation.htm", 
		    type: 'GET',
		    dataType: 'json',
		    data: {username: username},
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
		    success: function (data) {
				if (data.result == 'OK') {			
					//$("#id_regbtn").removeClass("disabled");
					$("#id_regbtn").removeAttr('disabled'); 					
				} 
				else {					
					//$("#id_regbtn").addClass("disabled");
					$("#id_regbtn").attr("disabled","true"); 
					onAlertErrorTip(data.message, document.getElementById('id_username'));					
				}
		    },
		    error: function (data) {
		    }
		});
	}
	return {init:function(){
		initBtn();
		initLocationSelect();
		initregister();		
    }}
}();

/**
 * 获取地区列表
 * @param provice
 */
function onChangeProvice(provice){
    $('div#AccountCityList').html('<input type="text" id="AccountCity" name="AccountCity">');
    $('div#AccountCountyList').html('<input type="text" id="AccountCounty" name="AccountCounty">');
    $('input#AccountCity').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCityList(provice),
        onChange:function(obj){
            onChangeCity($(obj).attr('data-value'));
        },
        defaultData:{value:'',text:''}
    });
    $('input#AccountCounty').xiSelect({offsetSize:[0,3,0,3],defaultData:{text:'',value:''}});
}


/**
 * 根据地区获取城市列表
 * @param city
 */
function onChangeCity(city){
    $('div#AccountCountyList').html('<input type="text" id="AccountCounty" name="AccountCounty">');
    $('input#AccountCounty').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCountyList($('input#AccountProvice').val(),city),
        defaultData:{value:'',text:''}
    });
}