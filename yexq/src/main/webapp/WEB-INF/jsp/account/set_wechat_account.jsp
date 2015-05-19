<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">

<div class="clear-line"></div>

<div class="wifi-portal-body">
	<div class="portal-menu">
		<a href="${pageContext.request.contextPath}/merchant/smspurchasemgmt.htm">短信消费
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a> 
		<a href="${pageContext.request.contextPath}/merchant/smsmanagement.htm">短信管理
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a>
		<%-- <a href="${pageContext.request.contextPath}/account/setwechatacct.htm" class="active">公众微信号设置
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a> --%>
	</div>
</div>

<form id="id_merchantwechat" method="post" action="savewechatacct.htm">
	<input type="text" id="id_wechatacct" name="wechatacct" class="form-control">
	<button id="btn_set_wechat" type="submit">设置</button>
</form>	

<script type="text/javascript">statisJS.init();</script>
<script type="text/javascript">
	$(document).ready(function(){
 		$('#id_merchantwechat').validate({
			errorClass: "error-notification",
        	errorElement: "div",
        	rules: {
            	wechatacct: {
                	required: true,
                	maxlength: 64,
          		}
        	},
       		messages: {
            	wechatacct: {
               		required: "微信号不能为空",
            		maxlength: "微信号不得超过64个字符",
                	remote:"微信号已被绑定"
            	}
        	}, 
        
        	submitHandler: function (form) {        	
            	$.ajax({
                	type: 'POST',
                	dataType: 'json',
                	url: '${pageContext.request.contextPath}/account/savewechatacct.htm',
                	data: {
                		"wechatacct":$("#id_wechatacct").val(),
                	},
                	success: function (data) {
                		if (data.result == 'OK') {
                        	$.pnotify({
                           		title: "设置成功",
                            	text: "",
                            	type: 'success'
                        	});

                    	} else {
                        	$.pnotify({
                            	title: "设置失败",
                            	text: data.message,
                            	type: 'error'
                        	});
                    	}  
                	},
                	error: function (data) {
                    	$.pnotify({
                       		title: "无法连接服务器",
                        	text: "设置失败！",
                        	type: 'error' 
                    	});
                	}
            	});
        	}  
 		});
        
        LoadWechat();
	});


	function LoadWechat() {
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/account/getWechatAccount.htm',
			data : {
			},
			success : function(data) {
				jQuery("#id_wechatacct").val(data.wechat);
			},
			error : function(data) {
				return false;
			}
		});
	}
</script>