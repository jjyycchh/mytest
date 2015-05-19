
var deviceregisterApp = function(){
	var initRegDiv = function(){
		$("#checkbox-register").live("click", function () {
   		 if ($(this).is(":checked")) {
   			 $(".register-account").show();
	    		registeraccount = true;
         }else{
   			   $(".register-account").hide();
	    		   registeraccount = false;
   			 }           
       });
		$("#id_username").blur(function() {
        	var username = $("#id_username").val();
        	if (isNotEmptyString(username) && registeraccount) {
        		validateUsername();
        	}
        });
        
        $("#id_recommendNumber").blur(function() {
        	validateRecommendNumber();
		});	
	}
	var validateUsername = function() {
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
					$("#id_regbtn").removeClass("disabled");
					$("#id_regbtn").removeAttr('disabled'); 
				} 
				else {
					$("#id_regbtn").attr("disabled","true"); 
					$("#id_regbtn").addClass("disabled");					
					onAlertErrorTip('该用户名已存在', document.getElementById('id_username'));
				}
				
		    },
		    error: function (data) {
		    }
		});
    }
	var validateRecommendNumber = function() {
    	var recommendNumber = $("#id_recommendNumber").val();
    	if(recommendNumber != ""){
    		$.ajax({
    			url: "/api10/recommendNumbervalidation.htm", 
    		    type: 'GET',
    		    dataType: 'json',
    		    data: {recommendNumber: recommendNumber},
    		    beforeSend :function(xmlHttp){ 
    		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
    		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
    		    }, 
    		    success: function (data) {
    				if (data.result == 'OK') {
    					
    				} 
    				else {
    					onAlertErrorTip('推荐码验证失败', document.getElementById('id_recommendNumber'));
    				}
    		    },
    		    error: function (data) {
    		    }
    		});
    	} 
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
	var initDevReg = function(){
		$("#id_regbtn").click(function() {
			var newpwd = $("#id_password").val();
	    	var repwd  = $("#id_repassword").val();
			if(!checkUserName($("#id_username").val())){
	            onAlertErrorTip('用户名不能为空，且必须由中英文、数字、下划线或.组成', document.getElementById('id_username'));
	            return false;
	        }else if($("#id_username").val().length > 50){
            	onAlertErrorTip('用户名不能超过50个字符', document.getElementById('id_username'));
            	return false;
            }
			if(!isPasswd(newpwd)){
	            onAlertErrorTip('请输入6-20位长度的密码', document.getElementById('id_password'))
	            return false;
	        }
			if(!onCheckEmpty($("#id_telcom_account").val())){
				onAlertErrorTip('请填写上网帐号(PPPoE上网帐号或静态IP)', document.getElementById('id_telcom_account'))
				return false;
			}
			if(registeraccount){//新注册
				if(newpwd !== repwd){
		            onAlertErrorTip('2次密码输入不一致', document.getElementById('id_repassword'))
		            return false;
		        }
		        
		        if(!checkEmail($("#id_email").val())){
		            onAlertErrorTip('邮箱格式不正确', document.getElementById('id_email'));
		            return false;
		        }
		        if(!checkMobile($("#id_cellNumber").val())){
		            onAlertErrorTip('手机号码格式不正确', document.getElementById('id_cellNumber'));
		            return false;
		        }
		        if(!onCheckEmpty($("#id_merchantName").val())){
		        	onAlertErrorTip('商户名不能为空', document.getElementById('id_merchantName'))
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
			}
			$.ajax({
	            type: 'POST',
	            dataType: 'json',
	            url: '/device/register.htm',
	            data: {
	            	"gw_mac": gw_mac,
	            	"pin": pin,
	            	"ver": componentVer,
	            	"registeraccount": registeraccount,
	                "username": $("#id_username").val(),
	                "password": window.md5($("#id_password").val()),
	                "email": $("#id_email").val(),
	                "cellNumber": $("#id_cellNumber").val(),
	                "merchantName": $("#id_merchantName").val().replace(/[~'!<>]/g, ''),
	                "merchantDescription": string2Json($("#id_merchantDescription").val().replace(/[~'!<>]/g, '')),
	                "geoLocation": '{"province":"'+$('input#AccountProvice').val()+'","city":"'+$('input#AccountCity').val()+'","county":"'+$('input#AccountCounty').val()+'","address":"'+string2Json($('#id_address').val().replace(/[~'!<>]/g, ''))+'"}',
	                "telcom_account": $("#id_telcom_account").val(),
	                "recommendNumber":$("#id_recommendNumber").val()
	            },
	            success: function (data) {
	                if (data.result == 'OK') {
	                	onAlertError("设备绑定成功！","ok"); 
	                     
	                    var deviceid = data.dev_id;
	                    setTimeout ("window.location.href = 'http://" + gw_address + ":" + gw_port + "/twifi/active?dev_id=" + deviceid + "';", 1000);
	                } else {
	                	onAlertError("设备绑定失败！"+data.message);
	                }
	            },
	            error: function (data) {
	            	onAlertError("设备绑定失败！"+data.message);
	            }
	        });
		});
    }
	var initDevRegAPI = function(){
		$("#id_regbtn").click(function() {
			var newpwd = $("#id_password").val();
	    	var repwd  = $("#id_repassword").val();
			if(!checkUserName($("#id_username").val())){
	            onAlertErrorTip('用户名不能为空，且必须由中英文、数字、下划线或.组成', document.getElementById('id_username'));
	            return false;
	        }else if($("#id_username").val().length > 50){
            	onAlertErrorTip('用户名不能超过50个字符', document.getElementById('id_username'));
            	return false;
            }	
			if(!isPasswd(newpwd)){
	            onAlertErrorTip('请输入6-20位长度的密码', document.getElementById('id_password'))
	            return false;
	        }
			if(!onCheckEmpty($("#id_telcom_account").val())){
				onAlertErrorTip('请填写上网帐号(PPPoE上网帐号或静态IP)', document.getElementById('id_telcom_account'))
				return false;
			}
			if(registeraccount){//新注册
				if(newpwd !== repwd){
		            onAlertErrorTip('2次密码输入不一致', document.getElementById('id_repassword'))
		            return false;
		        }
		        
		        if(!checkEmail($("#id_email").val())){
		            onAlertErrorTip('邮箱格式不正确', document.getElementById('id_email'));
		            return false;
		        }
		        if(!checkMobile($("#id_cellNumber").val())){
		            onAlertErrorTip('手机号码格式不正确', document.getElementById('id_cellNumber'));
		            return false;
		        }
		        if(!onCheckEmpty($("#id_merchantName").val())){
		        	onAlertErrorTip('商户名不能为空', document.getElementById('id_merchantName'))
					return false;
		        }
		        if(!onCheckEmpty($("#AccountProvice").val())){
		        	onAlertErrorTip('请选择省', document.getElementById('AccountProviceList'))
					return false;
		        }
		        if(!onCheckEmpty($("#AccountCity").val())){
		        	onAlertErrorTip('请选择市', document.getElementById('AccountCityList'))
					return false;
		        }
			}
			$.ajax({
	            type: 'POST',
	            dataType: 'json',
	            url: '/api10/register.htm',
	            data: {
	            	"gw_mac": gw_mac,
	            	"pin": pin,
	            	"ver": componentVer,
	            	"registeraccount": registeraccount,
	                "username": $("#id_username").val(),
	                "password": window.md5($("#id_password").val()),
	                "rePassword": window.md5($("#id_repassword").val()),
	                "email": $("#id_email").val(),
	                "cellNumber": $("#id_cellNumber").val(),
	                "merchantName": $("#id_merchantName").val().replace(/[~'!<>]/g, ''),
	                "merchantDescription": string2Json($("#id_merchantDescription").val().replace(/[~'!<>]/g, '')),
	                "geoLocation": '{"province":"'+$('input#AccountProvice').val()+'","city":"'+$('input#AccountCity').val()+'","county":"'+$('input#AccountCounty').val()+'","address":"'+string2Json($('#id_address').val().replace(/[~'!<>]/g, ''))+'"}',
	                "telcom_account": $("#id_telcom_account").val(),
	                "recommendNumber":$("#id_recommendNumber").val()
	            },
	            success: function (data) {
	                if (data.result == 'OK') {
	                	onAlertError("设备绑定成功！","ok"); 
	                     
	                    var deviceid = data.dev_id;
	                    setTimeout ("window.location.href = 'http://" + gw_address + ":" + gw_port + "/smartwifi/active?dev_id=" + deviceid + "';", 1000);
	                } else {
	                	onAlertError("设备绑定失败！"+data.message);
	                }
	            },
	            error: function (data) {
	            	onAlertError("设备绑定失败！"+data.message);
	            }
	        });
		});
    }
	return {init:function(){
				initRegDiv();
				initLocationSelect();
				
			},
			regapi:function(){
				initDevRegAPI();
			},
			regnormal:function(){
				initDevReg();
			}
		}
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