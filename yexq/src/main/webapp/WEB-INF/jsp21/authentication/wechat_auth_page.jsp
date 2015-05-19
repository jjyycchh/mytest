<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
<title>用户注册</title>
<link href="/statics/css/register.css" rel="stylesheet" media="screen" />
<script type="text/javascript" src="/statics/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/statics/js/jquery.client.js"></script>
<script type="text/javascript" src="/statics/js/wechatregister.js"></script>
</head>
<body>
<div class="main">
<input type="hidden" id="terminaluserid" value="${terminaluserid}" />
<input type="hidden" id="merchantopenid" value="${merchantopenid}" />
<input type="hidden" id="wechataccount" value="${wechataccount}" />
<div class="logo"><img src="/statics/img/wechatlogo.png" alt="iWiFi" /></div>
<div class="cellphone"><div class="ipt"><input type="text" id="cellphone" maxlength="20" value="" placeholder="请输入手机号码" /></div><div class="btn"><button id="btnauthcode">获取验证码</button></div></div>
<div class="authcode"><div class="ipt"><input type="text" id="authcode" maxlength="6" value="" placeholder="请输入验证码" /></div><div class="btn"><button id="btnlogin">马上登录</button></div></div>
</div>
</body>
</html>