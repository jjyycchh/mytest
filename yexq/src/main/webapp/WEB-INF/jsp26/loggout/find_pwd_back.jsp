<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="keywords" content="">
    <meta name="description" content="">
    <title>接入系统平台3.0</title>
    <link type="text/css" href="/resources/merchant/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link type="text/css" href="/resources/merchant/js/artDialog/css/ui-dialog.css" rel="stylesheet" media="screen">
	<link type="text/css" href="/resources/merchant/css/chinanet-free.css" rel="stylesheet" media="screen">
</head>
<!--[if lt IE 9]>
<script>
    document.execCommand("BackgroundImageCache", false, true);
</script>
<![endif]-->
<body>
<div class="ChinaNet-Free-Content">
    <div class="ChinaNet-Free-Body ChinaNet-Free-Width">
        <div class="ChinaNet-Free-Title">
            <div class="Title-Name">找回密码</div>
        </div>
        <div class="Index-User-Body">
            <div class="ChinaNet-Search-Body">
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">用户名：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input id="username" name="username" class="Input-Control" type="text" placeholder="用户名不能为空，且必须由1-50位中英文、数字、下划线或.组成">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Item-Title ChinaNet-Col-4">&nbsp;</div>
                    <div class="ChinaNet-Col-1 Form-Index-User-Item-Top">
                        <button id="id_pwdbtn" class="Form-Primary" type="button">
                            <span>提交</span>
                        </button>
                    </div>
                    <div class="ChinaNet-Col-1 Form-Index-User-Item-Top">
                        <button id="id_logbtn" class="Form-Default" type="button">
                            <span>返回登录</span>
                        </button>
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4"></div>
                    <div class="Form-Index-User-Item-Title-Left ChinaNet-Col-8">
                        1、如果你想重置忘记的密码, 请填写你的帐号。<br>
                        2、如果你填写的信息是有效的, 你将通过电子邮件收到一个含有特殊验证码的网页链接，点击该链接即可修改你的密码。
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="ChinaNet-Free-Bottom">
    <div class="ChinaNet-Bottom-Body">
        <div id="frame_footer_text" class="Bottom-Copy-Right ChinaNet-Free-Width">版权所有 &copy; 中国电信爱WIFI运营中心</div>
    </div>
</div>
<script type="text/javascript" src="/resources/merchant/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/resources/merchant/js/artDialog/dist/dialog-min.js"></script>
<script type="text/javascript" src="/resources/merchant/js/md5.js"></script>
<script type="text/javascript" src="/resources/merchant/js/chinanet.js"></script>
<script type="text/javascript" src="/resources/merchant/js/findpwdback.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
    	$("#id_logbtn").click(function() {
			window.location.href = '${pageContext.request.contextPath}/account/login.htm';
		});
    	registerApp.init();
    });
</script>
</body>
</html>