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
    <link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/js/artDialog/css/ui-dialog.css" rel="stylesheet" media="screen">
	<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/xiSelect.css" rel="stylesheet" media="screen">
	<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/chinanet-free.css" rel="stylesheet" media="screen">
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
            <div class="Title-Name">注册商户帐号</div>
        </div>

        <div class="Index-User-Body">
            <div class="ChinaNet-Search-Body">
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">用户名：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input id="id_username" name="id_username" class="Input-Control" type="text" placeholder="请输入用户名。允许50位以内中英文、数字、下划线、单引号.">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">密码：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_password" name="id_password" type="password" placeholder="请输入密码">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">重复密码：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_repassword" name="id_repassword" type="password" placeholder="请输入重复密码">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">姓名 ：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input id="id_fullname" name="id_fullname" class="Input-Control" type="text" placeholder="请输入姓名。允许50位以内中英文、数字、下划线、单引号.">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">邮箱：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input id="id_email" name="id_email"  class="Input-Control" type="text" placeholder="请输入邮箱">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">手机号码：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input id="id_cellNumber" name="id_cellNumber" class="Input-Control" type="text" placeholder="请输入手机号码">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">商户名：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input id="id_merchantName" name="id_merchantName" class="Input-Control" type="text" placeholder="请输入商户名">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">用户描述：</div>
                    <div class="Form-Item-Textarea ChinaNet-Col-4">
                        <textarea id="id_merchantDescription" name="id_merchantDescription" placeholder="请输入商户描述"  name="Description"></textarea>
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">地区：</div>
                    <div class="Form-Item-Select ChinaNet-Col-2" id="AccountProviceList"><input type="text" id="AccountProvice" name="AccountProvice" placeholder=""></div>
                    <div class="Form-Item-Select ChinaNet-Col-2" id="AccountCityList"><input type="text" id="AccountCity" name="AccountCity" placeholder=""></div>
                    <div class="Form-Item-Select ChinaNet-Col-2" id="AccountCountyList"><input type="text" id="AccountCounty" name="AccountCounty" placeholder=""></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-User-Item-Title ChinaNet-Col-4">详细地址：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input type="text" id="id_address" name="id_address" placeholder="详细地址" class="Input-Control">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Item-Title ChinaNet-Col-4">&nbsp;</div>
                    <div class="ChinaNet-Col-1 Form-Index-User-Item-Top">
                        <button id="id_regbtn" class="Form-Primary" type="button">
                            <span>提交信息</span>
                        </button>
                    </div>
                    <div class="ChinaNet-Col-1 Form-Index-User-Item-Top">
                        <button id="id_loginbtn" class="Form-Default" type="button">
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

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/artDialog/dist/dialog-min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/md5.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery.select.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/address.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/chinanet.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/register.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
    	registerApp.init();
    	$("#id_loginbtn").click(function() {
			window.location.href = '${pageContext.request.contextPath}/account/login.htm';
		});
    });
</script>
</body>
</html>