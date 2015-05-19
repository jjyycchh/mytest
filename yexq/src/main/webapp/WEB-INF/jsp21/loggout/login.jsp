<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta name="keywords" content="" />
<meta name="description" content="" />
<title>接入系统平台3.0</title>
<link type="text/css" href="/statics/css/bootstrap.min.css" rel="stylesheet" media="screen" />
<link type="text/css" href="/statics/js/artDialog/css/ui-dialog.css" rel="stylesheet" media="screen" />
<link type="text/css" href="/statics/css/login21.css" rel="stylesheet" media="screen" />
</head>
<body>
<div class="ChinaNet-Login-Header">
<div class="ChinaNet-Login-Header-Body">
<div class="ChinaNet-Login-Logo"><img src="/statics/img/login21/logo.jpg" alt="接入系统平台3.0" /></div>
<div class="ChinaNet-Login-Telephone"><img src="/statics/img/login21/telephone.gif" alt="" /></div>
<div class="ChinaNet-Login-Partners"><a href="/devicelist.html" target="_blank">联盟终端合作伙伴</a></div>
</div>
</div>
<div class="ChinaNet-Login-Form">
<form method="POST" action="/account/login_validate.htm" id="AccountSubmitForm">
<div class="ChinaNet-Login-Form-Box">
<div class="ChinaNet-Login-Form-Box-Header"><span>账户登录</span></div>
<div class="Login-Form-Body">
<ul>
<li><div class="Login-User"><input type="text" id="AccountName" name="AccountName" value="" placeholder="用户名" /></div></li>
<li><div class="Login-Pass"><input type="password" id="AccountPassword" name="AccountPassword" value="" placeholder="密码" /></div></li>
</ul>
</div>
<div class="Login-Register">
<div class="Forgot"><a href="#">忘记密码？</a></div>
<div class="Register"><a href="/account/register_account.htm?">商户注册</a></div>
</div>
<div class="Login-Button">
<button type="submit">登录</button>
</div>
</div>
</form>
</div>
<div class="ChinaNet-Login-Bottom">
<div class="ChinaNet-Login-Bottom-Body">
<ul>
<li class="Icon1"><span>强大的营销自助平台</span></li>
<li class="Icon2"><span>专业的信息统计分析</span></li>
<li class="Icon3"><span>安全的上网行为管理</span></li>
</ul>
</div>
</div>
<div class="ChinaNet-Login-Copyright">版权所有 &copy; 中国电信爱WiFi运营中心</div>

<script type="text/javascript" src="/statics/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/statics/js/artDialog/dist/dialog-min.js"></script>
<script type="text/javascript" src="/statics/js/md5.js"></script>
<script type="text/javascript" src="/statics/js/chinanet.js"></script>
<script type="text/javascript" src="/statics/js/login.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        chinanetApp.init();
        loginApp.init();
        
        //忘记密码
        $(".Forgot").bind("click",function(){
        	$.ajax({
                url:"/account/findpwdback.htm",
                type:"POST",
                success:function(data){
                    if(data.result=='FAIL'){
                    	onAlertError(data.message);
                    	return false;
                    }
                }
            })
        })
    });
</script>
</body>
</html>