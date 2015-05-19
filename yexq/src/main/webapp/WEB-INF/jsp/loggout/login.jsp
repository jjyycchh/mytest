<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setHeader("Cache-Control", "no-store");
response.setDateHeader("Expires", 0);
%>
<html>
<head>
    <title id="frame_title_text"></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="-1" />
	<meta http-equiv="pragma" content="no-cache" />
    <!-- Bootstrap -->
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet" media="screen"/>
    <link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.css" rel="stylesheet" media="screen"/>
    <link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.icons.css" rel="stylesheet" media="screen"/>   
	<link href="${pageContext.request.contextPath}/resources/css/css.css" rel="stylesheet" media="screen" />
	<link href="${pageContext.request.contextPath}/resources/css/default.css" rel="stylesheet" media="screen" />
	<link href="${pageContext.request.contextPath}/resources/css/font-awesome.min.css" rel="stylesheet" media="screen" />
	<link href="${pageContext.request.contextPath}/resources/css/plugins.css" rel="stylesheet" media="screen" />
	<link href="${pageContext.request.contextPath}/resources/css/print.css" rel="stylesheet" media="screen" />
	<link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet" media="screen" />
	<link href="${pageContext.request.contextPath}/resources/css/style-responsive.css" rel="stylesheet" media="screen"/>
	<link href="${pageContext.request.contextPath}/resources/css/tasks.css" rel="stylesheet" media="screen" />
	<link href="${pageContext.request.contextPath}/resources/css/uniform.default.css" rel="stylesheet" media="screen" />
	<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen" />
	<link href="${pageContext.request.contextPath}/resources/css/select2-metronic.css" rel="stylesheet" media="screen" />
    
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
        #login_form_div{
        background-color:#f0f3f5;
        margin-top:20px;
        border:solid #9eafbe 1px;
        padding-bottom:20px;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        }
        .error-notification {
            color: #dd1144;
        }
        #main_contain_pic{
        background: url(${pageContext.request.contextPath}/resources/img/den_07.jpg) no-repeat;
        repeat:repeat-x #ffffff;
        height:401px;       
        }
        #top_pic{
        height:100px;
        }
        #bottom_pic{
         height:105px;
        }
        .img_den03{
        margin-top:36px;
        } 
        #login_box_title_div{
        background-image: url(${pageContext.request.contextPath}/resources/img/dent_bei.jpg);
        background-repeat: repeat-x;
        height:38px;
        margin-left:0px;
        margin-right:0px;
        padding-left:0px;
        padding-right:0px;
        margin-top:3px;	
        } 
        #login_box_title{
        font-color:#909090;
        font-size:18px;
        margin-left:10px;
        padding-top:5px;
        }
        #loginbg1{
        background-image: url(${pageContext.request.contextPath}/resources/img/loginbg1.jpg);
        background-repeat: repeat-x;
        }   
        .fullscreen_bg {
    	repeat:repeat-x #ffffff;
        height:401px; 
    	background-image: url(${pageContext.request.contextPath}/resources/img/den_07.jpg);
  		}
  		.login_form_color{
  			background-color:#f0f3f5;
  		}
  		.login_box_title_div{
        background-image: url(${pageContext.request.contextPath}/resources/img/dent_bei.jpg);
        background-repeat: repeat-x;
        padding : 8px 15px;        
        }
        .footertext{
        	color: #777777;
        	margin:15px;
        	text-align: center;
        } 
    </style>
</head>
<body>
	<div class="container">
		<div class="row" id="login_container">
			<div id="top_pic" class="col-md-12">
				<div class="row">
					<div class="col-md-1"></div>
					<div class="col-md-3  img_den03">
						<img
							src="${pageContext.request.contextPath}/resources/img/den_03.png"></img>
					</div>
					<div class="col-md-4"></div>
					<div class="col-md-3 img_den03">
						<img
							src="${pageContext.request.contextPath}/resources/img/den_05.png"></img>
					</div>
					<div class="col-md-1"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="fullscreen_bg">
		<div class="container">
			<div class="row">
				<div class="col-md-offset-7 col-md-4">
					<div class="col-md-11">
						<div style="height: 40px;"></div>
						<div class="panel panel-default">
							<div class="panel-heading login_box_title_div">
								<span style="font-size: 18px; color: #555555">帐号登录</span>
							</div>
							<div class="panel-body login_form_color">
								<form id="id_loginform" role="form">
									<fieldset>
										<div style="height: 15px;"></div>
										<div class="form-group input-icon">
											<i class="glyphicon glyphicon-user"></i> <input type="text"
												id="id_username" name="username" class="form-control"
												placeholder="用户名" required autofocus />
										</div>
										<div style="height: 8px;"></div>
										<div class="form-group input-icon">

											<i class="glyphicon glyphicon-lock"></i> <input
												id="id_password" name="password" type="password"
												class="form-control" placeholder="密码" required />
										</div>
										<div class="form-group">
											<div class="row">
												<div class="col-md-8">
<%-- 													
													<div class="checkbox" style="margin-left: 20px">
														<label>
															<input type="checkbox" id="chk_remember_me" />
															<span style="color: #555555">记住我 </span>
														</label>
													</div> 

													<p class="text-left" style="margin-top: 10px">
														<a href="http://audit.51iwifi.com:8000">登录iWiFi审计管理平台</a>
													</p>
--%>
												</div>
												<div class="col-md-4">
													<p class="text-right" style="margin-top: 10px">
														<a href="${pageContext.request.contextPath}/account/findpwdback.htm">忘记密码？</a>
													</p>
												</div>
											</div>
										</div>
										<div class="form-group">
											<div class="row">
												<div class="col-md-6">
													<button id="id_loginbtn" class="btn btn-primary btn-block"
														type="submit">登录</button>
												</div>
												<div class="col-md-6">
													<%-- <a href="${pageContext.request.contextPath}/account/register_account.htm?account.type=MERCHANT" class="btn btn-default  btn-block" role="button">注册</a> --%>
													<a href="${pageContext.request.contextPath}/account/register_account.htm?" class="btn btn-default  btn-block" role="button">注册</a>
												</div>
											</div>
										</div>
									</fieldset>
								</form>
								<div style="height: 20px;"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-11" id="bottom_pic" style="margin-top: 30px">

				<div class="col-md-4">
					<img
						src="${pageContext.request.contextPath}/resources/img/den_12.png"></img><span
						style="color: #6a6a6a; font-size: 16px">强大的营销自助平台</span>
				</div>
				<div class="col-md-4">
					<img
						src="${pageContext.request.contextPath}/resources/img/den_10.png"></img><span
						style="color: #6a6a6a; font-size: 16px">专业的信息统计分析</span>
				</div>
				<div class="col-md-3">
					<img
						src="${pageContext.request.contextPath}/resources/img/den_14.png"></img><span
						style="color: #6a6a6a; font-size: 16px">安全的上网行为管理</span>
				</div>

			</div>
		</div>
	</div>
	<div class="navbar navbar-default navbar-fixed-bottom">
		<div class="container">
			<p id="frame_footer_text" class="footertext"></p>
		</div>
	</div>
	<!-- /container -->

	<script src="${pageContext.request.contextPath}/resources/js/jquery-1.11.0.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery.pnotify.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-validation/dist/jquery.validate.min.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-validation/localization/messages_zh.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/js/md5.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/js/resources.js" type="text/javascript"></script>

	<script type="text/javascript">
	var http_port = "${sessionScope.httpPort}";
	
    $.pnotify.defaults.styling = "bootstrap";
    $.pnotify.defaults.history = false;
    
    $(document).ready(function (e) {
    	
        $('#id_loginform').validate({
            errorClass: "error-notification",
            errorElement: "div",
            rules: {
                username: {
                    required: true,
                    maxlength: 64
                },
                password: {
                    required: true,
                    rangelength: [6, 20]
                }
            },
            messages: {
                username: {
                    maxlength: "用户名不得超过64个字符"
                },
                password: {
                    required: "请输入密码",
                    rangelength: "请输入6-20位长度的密码"
                }
            },
            submitHandler: function (form) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: '${pageContext.request.contextPath}/account/login_validate.htm',
                    data: {
                    	"account.username":$("#id_username").val(), 
                    	"account.password":window.md5($("#id_password").val())
                    },
                    success: function (data) {
                        if (data.result == 'OK') {
                        	
                        	//TODO: if checked rememberMe, save account id into cookie
                        	
                            window.location.href = getHttpConPath()+'${pageContext.request.contextPath}/account/home.htm';
                        } else {
                            $.pnotify({
                                title: "提示：",
                                text: data.message,
                                type: 'error'
                            });
                        }
                    },
                    error: function (data) {
                        $.pnotify({
                            title: "无法连接服务器",
                            text: "提交验证失败！",
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
