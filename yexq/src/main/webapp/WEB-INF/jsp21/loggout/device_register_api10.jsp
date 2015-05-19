<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="-1" />
    <meta name="keywords" content="">
    <meta name="description" content="">
    <title>接入系统平台3.0</title>
    <link type="text/css" href="${pageContext.request.contextPath}/statics/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link type="text/css" href="${pageContext.request.contextPath}/statics/js/artDialog/css/ui-dialog.css" rel="stylesheet" media="screen">
    <link type="text/css" href="${pageContext.request.contextPath}/statics/css/xiSelect.css" rel="stylesheet" media="screen">
    <link type="text/css" href="${pageContext.request.contextPath}/statics/css/chinanet-free.css" rel="stylesheet" media="screen">
    <link type="text/css" href="${pageContext.request.contextPath}/statics/css/devreg.css" rel="stylesheet" media="screen">
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
            <div class="Title-Name">新设备注册</div>
        </div>
        <div class="Index-Device-Body">
            <div class="ChinaNet-Search-Body">
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">MAC：</div>
                    <div class="Form-Index-Device-Item-Title-Left ChinaNet-Col-4" id="id_mac"></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">用户名：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_username" type="text" placeholder="请输入用户名。允许50位以内中英文、数字、下划线、单引号.">
                    </div>
                    <div  class="Form-Index-Device-Item-Title-Right ChinaNet-Col-1">注册新用户</div>
                    <div class="Device-Type-Item ChinaNet-Col-1">
                        <input type="checkbox" id="checkbox-register">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">密码：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_password" type="password" placeholder="请输入密码">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet register-account">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">重复密码：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_repassword" type="password" placeholder="请输入重复密码">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">上网帐号：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_telcom_account" type="text" placeholder="PPPoE上网帐号或静态IP">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet register-account">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">邮箱：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_email" type="text" placeholder="请输入邮箱">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet register-account">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">手机号：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_cellNumber" type="text" placeholder="请输入手机号">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet register-account">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">商户名：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_merchantName" type="text" placeholder="请输入商户名">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet register-account">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">推荐码：</div>
                    <div class="Form-Item-Input ChinaNet-Col-4">
                        <input class="Input-Control" id="id_recommendNumber" type="text" placeholder="输入后会有专门的客户经理提供技术支持">
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet register-account">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">商户描述：</div>
                    <div class="Form-Item-Textarea ChinaNet-Col-4">
                        <textarea placeholder="请输入商户描述（可选）" id="id_merchantDescription" name="Description"></textarea>
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet register-account">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">地区：</div>
                    <div class="Form-Item-Select ChinaNet-Col-2" id="AccountProviceList"><input type="text" id="AccountProvice" name="AccountProvice" placeholder="输入商户名称"></div>
                    <div class="Form-Item-Select ChinaNet-Col-2" id="AccountCityList"><input type="text" id="AccountCity" name="AccountCity" placeholder="输入商户名称"></div>
                    <div class="Form-Item-Select ChinaNet-Col-2" id="AccountCountyList"><input type="text" id="AccountCounty" name="AccountCounty" placeholder="输入商户名称"></div>
                </div>
                <div class="ChinaNet-Form-Sheet register-account">
                    <div class="Form-Index-Device-Item-Title ChinaNet-Col-4">详细地址：</div>
                    <div class="Form-Item-Textarea ChinaNet-Col-4">
                        <textarea id="id_address" placeholder="详细地址（可选）"  name="Description"></textarea>
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <div class="Form-Item-Title ChinaNet-Col-4">&nbsp;</div>
                    <div class="ChinaNet-Col-1 Form-Index-Device-Item-Top">
                        <button class="Form-Primary" id="id_regbtn" type="button">
                            <span>注册</span>
                        </button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</div>



<div class="ChinaNet-Free-Bottom">
    <div class="ChinaNet-Bottom-Body">
        <div class="Bottom-Copy-Right ChinaNet-Free-Width">版权所有 &copy; 中国电信爱WIFI运营中心</div>
    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/artDialog/dist/dialog-min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/md5.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/jquery.select.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/address.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/chinanet.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/deviceregister.js"></script>

<script type="text/javascript">
	var gw_address = "${gw_address}";
	var gw_port = "${gw_port}";
	var gw_mac = "${gw_mac}";
	var pin = "${pin}";
	var componentVer = "${ver}";
	var registeraccount = false;
	$(".register-account").hide();
    $(document).ready(function(){  
    	$("#id_mac").html(gw_mac);
    	deviceregisterApp.init();
    	deviceregisterApp.regapi();    	
    });
</script>
</body>
</html>