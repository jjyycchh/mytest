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
    <link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.css" rel="stylesheet" media="screen"/>
    <link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.icons.css" rel="stylesheet" media="screen"/>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.6.2/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <style>
        body {
            font-family: '微软雅黑';
            background-attachment: fixed;
    		background-image: url(${pageContext.request.contextPath}/resources/img/noise.png);
        }
        .error-notification {
            color: #dd1144;
        }
        .footertext{
        	color: #777777;
        	margin:15px;
        	text-align: center;
        }
    </style>
</head>
<body>
<div style="height: 80px"></div>
	<div class="container">
		<div class="row">
			<div class="col-sm-6 col-sm-offset-4">
				<img
					src="${pageContext.request.contextPath}/resources/img/wifilogo.png"></img>
			</div>
		</div>
		<div style="height: 20px"></div>
		<div class="row">
			<div class="col-sm-6 col-sm-offset-3">
				<div class="panel panel-default">
					<div class="panel-heading">找回密码</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form" id="chgpwdForm">

							<!-- <div class="form-group ">
								<label for="username" class="col-sm-3 control-label"> 帐号</label>
								<div class="col-md-6">
									<input type="text" class="form-control" name="username"
										id="username" placeholder="您的帐号" autocomplete="off" />
								</div>
							</div> -->
							<div class="form-group ">
								<label for="newpwd" class="col-sm-3 control-label"> 密码</label>
								<div class="col-md-6">
									<input type="password" class="form-control" name="newpwd"
										id="newpwd" placeholder="您的新密码" required autocomplete="off" />
								</div>
							</div>
							<div class="form-group ">
								<label for="rnewpwd" class="col-sm-3 control-label"> 确认密码</label>
								<div class="col-md-6">
									<input type="password" class="form-control" name="rnewpwd"
										id="rnewpwd" placeholder="再输一遍密码" required autocomplete="off" />
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class=" col-md-offset-4 col-md-2 ">
										<button id="id_chgpwdbtn" class="btn btn-primary btn-block"
											type="submit">确认修改</button>
									</div>
									<div class=" col-md-2">
										<button id="id_logbtn" class="btn btn-default btn-block"
											type="button">返回登录</button>
									</div>
								</div>
							</div>

						</form>
					</div>
					<div class="panel-footer">
						
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="navbar navbar-default navbar-fixed-bottom">
		<div class="container">
			<p id="frame_footer_text" class="footertext"></p>
		</div>
	</div>


<script src="${pageContext.request.contextPath}/resources/js/jquery-1.11.0.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery.pnotify.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery-validation/localization/messages_zh.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/resources.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/global.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/md5.js"></script>
<script type="text/javascript">
$.pnotify.defaults.styling = "bootstrap";
$.pnotify.defaults.history = false;

$(document).ready(function (e) {

	$("#id_logbtn").click(function() {
		window.location.href = '${pageContext.request.contextPath}/account/login.htm';
	});
	
    $('#chgpwdForm').validate({
        errorClass: "error-notification",
        errorElement: "div",
        rules: {
            newpwd: {
                required: true,
                rangelength : [ 6, 20 ]
            },
            rnewpwd: {
            	equalTo : '#newpwd'
            }
        },
        messages: {
        	newpwd: {
        		required : "请输入原密码",
				rangelength : "请输入6-20位长度的密码"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '${pageContext.request.contextPath}/account/resetpassword.htm',
                data: {
                	"password":window.md5($("#newpwd").val()),
                	"token":'${token}'
                },
                success: function (data) {
                    if (data.result == 'OK') {
                    	$.pnotify({
			                title: "密码修改成功",
			                text: "密码修改成功...",
			                type: 'success',
			                after_close: function(pnotify){
			                    window.location.href = '${pageContext.request.contextPath}/account/login.htm';
			                }
			            });
                    } else {
                        $.pnotify({
                            title: "密码修改失败",
                            text: data.message,
                            type: 'error'
                        });
                    }
                },
                error: function (data) {
                    $.pnotify({
                        title: "无法连接服务器",
                        text: "密码修改失败！",
                        type: 'error'
                    });
                }
            });
        }
    });
});
</script>
</body>
</html>