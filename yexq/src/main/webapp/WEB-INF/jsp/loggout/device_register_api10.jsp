<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <title id="frame_title_text"></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="-1" />
	<meta http-equiv="pragma" content="no-cache" />
    <!-- Bootstrap -->
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/bootstrap-switch.css" rel="stylesheet" media="screen">
    <link href="${pageContext.request.contextPath}/resources/css/ionicons.min.css" rel="stylesheet" media="screen">
    <link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.css" rel="stylesheet" media="screen">
    <link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.icons.css" rel="stylesheet" media="screen">
    <link href="${pageContext.request.contextPath}/resources/css/signin.css" rel="stylesheet" media="screen">
    
	<link href="${pageContext.request.contextPath}/resources/css/css.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/default.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/font-awesome.min.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/plugins.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/print.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/style-responsive.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/tasks.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/uniform.default.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
	<link href="${pageContext.request.contextPath}/resources/css/select2-metronic.css" rel="stylesheet" media="screen">
	

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.6.2/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <style>
        body {
            font-family: '微软雅黑';
        }
        .error-notification {
            color: #dd1144;
        }
    </style>
</head>
<body>
<div id="content" class="container">
<div class="row">
 <div class="col-md-1"></div>
<div class="col-md-7 col-md-offset-3">
<img src="${pageContext.request.contextPath}/resources/img/den_03.png"></img>
</div>
<div class="col-md-1"></div>
</div>
 <div class="row">
 <div class="col-md-1"></div>
 <div class="col-md-10">
 <div class="portlet box yellow">
	<div class="portlet-title">
		<div class="caption">
			<i class="glyphicon glyphicon-user"></i>绑定设备
		</div>		
	</div>
 
 	<div class="portlet-body form">
		<!-- BEGIN FORM-->
		<form id="id_registerform" class="form-horizontal">
			<div class="form-actions top fluid">
				<div class="col-md-offset-3 col-md-9">
					<button id="id_regbtn" type="submit" class="btn btn-success">注册</button>
					<a href="${pageContext.request.contextPath}/account/login.htm" class="btn btn-default " role="button"> <i class="icon ion-reply"></i> 返回登录 </a>
					
				</div>
			</div>
			<div class="form-body">
				<div class="form-group">
					<label class="col-md-3 control-label">MAC </label>
					<div class="col-md-4">
					<div class="row">
						<div class="col-md-12" style="padding-top:6px">
							<span id="id_mac" style="font-family:黑体;font-size:15px"></span>
		                </div>
					</div>
				</div>
				</div>
				<div class="form-group">
					<label class="col-md-3 control-label">用户名  <i id="username_validation_result" class="" style="float:right"></i></label>
					<div class="col-md-4" >
			        	<input id="id_username" name="username" type="text" class="form-control" placeholder="用户名" required autofocus />
			        	<div id="username_result" class="error-notification"></div>
			        </div>
			        <div class="col-md-5">
			        	<p class="navbar-text" style="margin-top:8px"> 注册新用户</p>
						<div id="mapSwitch" class="makeswitch navbar-btn"  style="margin-top:6px" data-on="danger" data-off="primary">    					
    						<input style="margin-bottom:10px" id="checkbox-register" type="checkbox"/>					 
						</div>			
			        </div>
		          	<div class="col-md-2"></div>  			            			 
				</div>
				<div class="form-group">
					<label class="col-md-3 control-label">密码</label>
					<div class="col-md-4">
						<input id="id_password" name="password" type="password" class="form-control" placeholder="密码" required></input>
					</div>
				</div>
				<div class="form-group register-account">
					<label class="col-md-3 control-label">重复密码</label>
					<div class="col-md-4">
						<input id="id_repassword" name="repassword" type="password" class="form-control" placeholder="重复密码"></input>
					</div>
				</div>

                <div class="form-group">
					<label class="col-md-3 control-label">上网帐号</label>
					<div class="col-md-4">
						<input id="id_telcom_account" name="telcom_account" type="text" class="form-control" placeholder="PPPoE上网帐号或静态IP" required></input>
					</div>
				</div>

				<div class="form-group register-account">
					<label class="col-md-3 control-label">邮箱</label>
					<div class="col-md-4">
						<input id="id_email" name="email" type="text" class="form-control" placeholder="邮箱"></input>
					</div>
				</div>
				
				<div class="form-group register-account">
					<label class="col-md-3 control-label">手机号码</label>
					<div class="col-md-4">
						<input id="id_cellNumber" name="cellNumber" type="text" class="form-control" placeholder="手机号码（可选）"></input>
					</div>
				</div>
				
				<div class="form-group register-account">
					<label class="col-md-3 control-label">商户名</label>
					<div class="col-md-4">
						<input id="id_merchantName" name="merchantName" type="text" class="form-control" placeholder="商户名（可选）"></input>
					</div>
				</div>
				<div class="form-group register-account">
					<label class="col-md-3 control-label">推荐码</label>
					<div class="col-md-4">
						<input id="id_recommendNumber" name="recommendNumber" type="text" class="form-control" placeholder="输入后会有专门的客户经理提供技术支持"></input>
						<div id="recommendNumber_result" class="error-notification"></div>
					</div>
				</div>
				
				<div class="form-group register-account">
					<label class="col-md-3 control-label">商户描述</label>
					<div class="col-md-4">
						<TEXTAREA  id="id_merchantDescription" name="merchantDescription" type="text" class="form-control" placeholder="商户描述（可选）"></TEXTAREA>
					</div>
				</div>
				
				<div class="form-group register-account">
					<label class="col-md-3 control-label">地区</label>
					<div class="col-md-4">
						<div class="row">
						    <div class="col-md-4" style="padding-right: 0px;">
						        <select id="id_province" name="province" class="form-control"></select>
						        <div id="province_result" class="error-notification"></div>
						    </div>
						    <div class="col-md-4" style="padding-left:0px; padding-right: 0px;">
						        <select id="id_city" name="city" class="form-control"></select>
						        <div id="city_result" class="error-notification"></div>
						    </div>
						    <div class="col-md-4" style="padding-left:0px;">
						        <select id="id_county" name="county" class="form-control"></select>
						    </div>
						</div>
					</div>
				</div>
							
				<div class="form-group register-account">
					<label class="col-md-3 control-label">详细地址</label>
					<div class="col-md-4">
						<TEXTAREA id="id_address" name="Location" type="text" class="form-control" placeholder="详细地址（可选）" rows="3"></TEXTAREA>
					</div>
				</div>
			</div>
			<div class="form-actions fluid">
				<div class="col-md-offset-3 col-md-9">
					<button id="id_regbtn" type="submit" class="btn btn-success">注册</button>
					<%-- <a href="${pageContext.request.contextPath}/account/login.htm" class="btn btn-default " role="button"> <i class="icon ion-reply"></i> 返回登录 </a> --%>
				</div>
			</div>
		</form>
		<!-- END FORM-->
		 <s:fielderror fieldName="account.username"/>
	</div>
 </div>
 <div class="col-md-1"></div>
 </div>

</div>
</div>
<!-- /container -->

<script src="${pageContext.request.contextPath}/resources/js/jquery-1.11.0.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/bootstrap-switch.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery.pnotify.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery-validation/localization/messages_zh.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/md5.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/global.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/resources.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/address.js"></script>
<script type="text/javascript">
	var gw_address = "${gw_address}";
	var gw_port = "${gw_port}";
	var gw_mac = "${gw_mac}";
	var pin = "${pin}";
	var componentVer = "${ver}";
	var registeraccount = false;

    //alert("address: " + gw_address + " gw_port: " + gw_port + " mac: " + gw_mac + " pin_code: " + pin);
	$(".register-account").hide();
	
    $(document).ready(function (e) {
        $.pnotify.defaults.styling = "bootstrap";
        $.pnotify.defaults.history = false;
        $.pnotify.defaults.delay = 1500;

        addr_selector_create('id_province', 'id_city', 'id_county');
        addr_selector_set('id_province', "浙江", 'id_city', "杭州", "id_county", "上城区");
        
        $("#id_mac").text(gw_mac);
        
        $("#username_validation_result").hide();
        
        $("#id_username").blur(function() {
        	var username = $("#id_username").val();
        	if (isNotEmptyString(username) && registeraccount) {
        		validateUsername();
        	}
        });
        
        $("#id_recommendNumber").blur(function() {
        	validateRecommendNumber();
		});
        
        /*
    	$('#mapSwitch').on('click', function (e, data) {
    	    var $el = $(data.el), value = data.value;

    	    if(value){
    	    		$(".register-account").show();
    	    		registeraccount = true;
    	    		setAccountValidationRules();
    	    	}
    	    else{
    	    		$(".register-account").hide();
    	    		registeraccount = false;
    	    		removeAccountValidationRules();
    	    	}
    	});
        */
    	
    	$("#checkbox-register").bind("click", function () {
    		 if ($(this).is(":checked")) {
    			 $(".register-account").show();
 	    		registeraccount = true;
 	    		setAccountValidationRules();
             }
    		 else
    			{
    			   $(".register-account").hide();
 	    		   registeraccount = false;
 	    		   removeAccountValidationRules();
    			 }           
        });
    	
        $('#id_registerform').validate({
            errorClass: "error-notification",
            errorElement: "div",
            rules: {
                username: {
                    required: true,
                    maxlength: 64,
              	},
                password: {
                    required: true,
                    rangelength: [6, 20]
                },
                telcom_account: {
                    required: true,
                    maxlength: 200,
                }/* ,
                recommendNumber : {
    				required : true
                } */
            },
            messages: {
                username: {
                	required : "请填写用户名",
                    maxlength: "用户名不得超过64个字符",
                    remote:"用户名已被注册"
                },
                password: {
                    required: "请填写密码",
                    rangelength: "请输入6-20位长度的密码"
                },
                telcom_account: {
                	required : "请填写上网帐号(PPPoE上网帐号或静态IP)",
                	isMobile: "上网帐号不得超过200个字符"
                }/* ,
                recommendNumber : {
                	required : "请输入推荐码"
                } */
            },
            submitHandler: function (form) {
            	SubmitRegisterDevice();
            }
        });
    });
    
    function SubmitRegisterDevice() {
    	if(!locationValidate()){
    		return false;
    	}

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '${pageContext.request.contextPath}/api10/register.htm',
            data: {
            	"gw_mac": gw_mac,
            	"pin": pin,
            	"ver": componentVer,
            	"registeraccount": registeraccount,
                "username": $("#id_username").val(),
                "password": window.md5($("#id_password").val()),
                "email": $("#id_email").val(),
                "cellNumber": $("#id_cellNumber").val(),
                "merchantName": $("#id_merchantName").val(),
                "merchantDescription": $("#id_merchantDescription").val(),
                "geoLocation": JSON.stringify(getAddress()),
                "telcom_account": $("#id_telcom_account").val(),
                "recommendNumber":$("#id_recommendNumber").val()
            },
            success: function (data) {
                if (data.result == 'OK') {
                     $.pnotify({
                        title: "设备绑定成功",
                        type: 'success',
                        delay: 600
                    });
                     
                    var deviceid = data.dev_id;
                    setTimeout ("window.location.href = 'http://" + gw_address + ":" + gw_port + "/smartwifi/active?dev_id=" + deviceid + "';", 1000);
                } else {
                    $.pnotify({
                        title: "绑定失败",
                        text: data.message,
                        type: 'error',
                        delay: 20000
                    });
                }
            },
            error: function (data) {
                $.pnotify({
                    title: "无法连接服务器",
                    text: "设备绑定失败！" + data.message,
                    type: 'error'
                });
            }
        });
    }
    
 	function setAccountValidationRules() {
 		removeAccountValidationRules();

 		$("#id_cellNumber").rules("add", {rangelength: [7, 20]});
 		
 		$("#id_email").rules("add", {
        	required: true,
        	email: true,
        	maxlength: 100
 		});
 		
 		$("#id_repassword").rules("add", {
 			required: true,
 			equalTo: '#id_password'
 		});
 	}
 	
 	function removeAccountValidationRules() {
 		$("#id_cellNumber").rules("remove");
 		$("#id_email").rules("remove");
 		$("#id_repassword").rules("remove");
 	}
	
    function validateUsername() {
    	var username = $("#id_username").val();
    	
    	$("#username_validation_result").hide();
    	$("#username_validation_result").removeClass();
    	
		$.ajax({
			url: "${pageContext.request.contextPath}/account/usernamevalidation.htm", 
		    type: 'GET',
		    dataType: 'json',
		    data: {username: username},
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
		    success: function (data) {
				if (data.result == 'OK') {
					
					$("#username_validation_result").addClass("icon ion-checkmark-circled");
					$("#id_regbtn").removeClass("disabled");
					$("#username_result").html("");
				} 
				else {
					$("#username_validation_result").addClass("icon ion-close-circled");
					$("#id_regbtn").addClass("disabled");
					$("#username_result").html("该用户名已存在");
				}
				$("#username_validation_result").show();
		    },
		    error: function (data) {
		    }
		});
    }
    
    function getAddress() {
    	var province = addr_selector_field_get('id_province');
    	var city = addr_selector_field_get('id_city');
    	var county = addr_selector_field_get('id_county');
    	var detailAddress = $("#id_address").val();
    	
    	return getObjectAddress(province, city, county, detailAddress);
    }
    
	function loadResources() {
		$("#frame_title_text").text(frame_title_text);
	}
	
    function validateRecommendNumber() {
    	var recommendNumber = $("#id_recommendNumber").val();
    	if(recommendNumber != ""){
    		$.ajax({
    			url: "${pageContext.request.contextPath}/account/recommendNumbervalidation.htm", 
    		    type: 'GET',
    		    dataType: 'json',
    		    data: {recommendNumber: recommendNumber},
    		    beforeSend :function(xmlHttp){ 
    		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
    		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
    		    }, 
    		    success: function (data) {
    				if (data.result == 'OK') {
    					$("#recommendNumber_result").html("");
    				} 
    				else {
    					$("#recommendNumber_result").html("推荐码验证失败");
    				}
    		    },
    		    error: function (data) {
    		    }
    		});
    	} else {
    		$("#recommendNumber_result").html("");
    	}
    }
    
    function locationValidate (){
		var province = addr_selector_field_get('id_province');
    	var city = addr_selector_field_get('id_city');
    	if(province == null){
    		$("#province_result").html("请选择省");
    		$("#province_result").show();
    		return false;
    	} else {
    		$("#province_result").html("");
    		$("#province_result").hide();
    	}
    	
    	if(city == null){
    		$("#city_result").html("请选择市");
    		$("#city_result").show();
    		return false;
    	} else {

    		$("#city_result").html("");
    		$("#city_result").hide();
    	}
    	
    	return true;
	}
</script>
</body>
</html>