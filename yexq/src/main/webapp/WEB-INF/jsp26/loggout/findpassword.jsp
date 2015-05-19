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
            <div class="Title-Name">重新设置密码</div>
        </div>
        <div class="Index-User-Body">
            <div class="ChinaNet-Search-Body">
                <!-- <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">当前用户：</div>
                    <div class="Form-Index-User-Item-Title-Left-Current ChinaNet-Col-4"></div>
                </div> -->
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">新密码：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input name="newpwd" id="newpwd" class="Input-Control" type="password" placeholder="请输入新密码">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">确认密码：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input name="rnewpwd" id="rnewpwd" class="Input-Control" type="password" placeholder="请输入确认密码">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Item-Title ChinaNet-Col-4">&nbsp;</div>
                    <div class="ChinaNet-Col-1 Form-Index-User-Item-Top">
                        <button id="id_chgpwdbtn"  class="Form-Primary" type="button">
                            <span>确认修改</span>
                        </button>
                    </div>
                    <div class="ChinaNet-Col-1 Form-Index-User-Item-Top">
                        <button id="id_logbtn"  class="Form-Default" type="button">
                            <span>返回登录</span>
                        </button>
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
    	$("#id_chgpwdbtn").click(function() {
			var newpwd = $("#newpwd").val();
	    	var repwd  = $("#rnewpwd").val();
	    	if(!isPasswd(newpwd)){
	            onAlertErrorTip('请输入6-20位长度的密码', document.getElementById('newpwd'))
	            return false;
	        }
	        if(newpwd !== repwd){
	            onAlertErrorTip('2次密码输入不一致', document.getElementById('rnewpwd'))
	            return false;
	        }
	        $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/account/resetpassword.htm',
                data: {
                	"password":window.md5($("#newpwd").val()),
                	"token":'${token}'
                },
                success: function (data) {
                    if (data.result == 'OK') {
                    	onAlertError("密码修改成功！即将跳转到登录页...","ok");
                    	setTimeout ("window.location.href = '${pageContext.request.contextPath}/account/login.htm';", 2500);                    	
                    } else {
                    	onAlertError("密码修改失败！");
                    }
                },
                error: function (data) {
                    onAlertError("密码修改失败！");
                }
            });
		});
    });
</script>
</body>
</html>