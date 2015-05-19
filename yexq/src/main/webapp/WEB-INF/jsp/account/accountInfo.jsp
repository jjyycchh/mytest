<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <title id="frame_title_text"></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8"/>
    <!-- Bootstrap -->
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet" media="screen"/>
    <link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.css" rel="stylesheet" media="screen"/>
    <link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.icons.css" rel="stylesheet" media="screen"/>
    <link href="${pageContext.request.contextPath}/resources/css/signin.css" rel="stylesheet" media="screen"/>

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
<div class="container">
	<div class="row">
		<div class="col-md-8">
			<div id="login_carousel" class="carousel slide">
	        	<ol class="carousel-indicators">
		          <li data-target="#login_carousel" data-slide-to="0" class="active"></li>
		          <li data-target="#login_carousel" data-slide-to="1"></li>
		          <li data-target="#login_carousel" data-slide-to="2"></li>
		        </ol>
		        <div class="carousel-inner">
					<div class="item active"> 
						<img src="${pageContext.request.contextPath}/resources/img/bootstrap-mdo-sfmoma-01.jpg" alt=""/> 
					</div>
					<div class="item">
						<img src="${pageContext.request.contextPath}/resources/img/bootstrap-mdo-sfmoma-02.jpg" alt=""/> 
					</div>
					<div class="item"> 
						<img src="${pageContext.request.contextPath}/resources/img/bootstrap-mdo-sfmoma-03.jpg" alt=""/>
						<div class="carousel-caption">
						    <h4>Third Thumbnail label</h4>
						    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
		    <form id="id_loginform" class="form-signin">
		        <h2 class="form-signin-heading" id="login_box_title"></h2>
		        <input id="id_username" name="username" type="text" class="form-control" placeholder="用户名" required autofocus />
		        <input id="id_password" name="password" type="password" class="form-control" placeholder="密码" required />
				<div class="row">
			        <div class="col-md-6">
			            <button id="id_loginbtn" class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
			        </div>
			        <div class="col-md-6">
			        	<a href="#" class="btn btn-default btn-lg btn-block" role="button">商户注册</a>
			        </div>
				</div>
		    </form>
		</div>
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
	MAIN_MENU.setActiveMenuItem("id_mm_account");
	
    $.pnotify.defaults.styling = "bootstrap";
    $.pnotify.defaults.history = false;
    
    $(document).ready(function (e) {
    	loadResources();
    	
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
            	$.post("${pageContext.request.contextPath}/account/login_validate.htm", 
        				{"account.username":$("#id_username").val(), "account.password":$("#id_password").val()}, 
        				function(r) {
        					if(r.result==0){
        						//alert(r.msg);
        					}else if(r.result==1){
        						window.location.href="${pageContext.request.contextPath}/account/home.htm"
        					}else{
        						//alert("系统异常……");
        					}
        				},"json");
            	/*
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: 'url to action',
                    data: {
                        username: $("#id_username").val(),
                        password: window.md5($("#id_password").val())
                    },
                    success: function (data) {
                        if (data.result != 'FAIL') {
                            window.location.href = 'url to home';
                        } else {
                            $.pnotify({
                                title: "验证失败",
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
                    
                });*/
            }
        });
    });

	function loadResources() {
		$("#login_box_title").text(login_box_title_text);
		$("#frame_title_text").text(frame_title_text);
	}
</script>
</body>
</html>
