<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<title>测试页面</title>
<style type="text/css">
.table_work {border:#dbdbdb 1px solid;width:1200px;height:auto;margin:0px auto 0px auto;/*margin:0px auto 0px auto;标签本身居中*/border-collapse:collapse;}
.table_work tbody tr td {width:300px;height:22px;line-height:22px;border:#dbdbdb 1px solid;text-align:center;}
.table_work tfoot tr td {height:22px;line-height:22px;border:#dbdbdb 1px solid;text-align:right;padding-right:6px;}
.table_work input_text {width:200px;height:22px;}
</style>
<link type="text/css" href="/statics/css/bootstrap.min.css" rel="stylesheet" media="screen" />
<link type="text/css" href="/statics/js/artDialog/css/ui-dialog.css" rel="stylesheet" media="screen" />
<link type="text/css" href="/statics/css/login21.css" rel="stylesheet" media="screen" />
</head>
<body>
<!-- *******************************************无关测试***************************************************************  -->
	<button id="btn_test" class="Form-Primary"><span>点我呀</span></button>
<!-- ***************************************************** AC/BAS添加and注册*****************************************************-->

<div align=center >
<span>AC/BAS注册</span>
<div>说明：注册必填（ip,name,类型,密钥）设备名称不能重复</div>
	<table class="table_work">
		<tr >
			<td ><span >设备类型：</span><input type="text" id="new_raduisdevice_type" name="new_raduisdevice_type" placeholder="AC/BAS" ></td>
			<%-- <td ><span  >网元编号：</span><input type="text" id="new_raduisdevice_ems_dev_id" name="new_raduisdevice_ems_dev_id" placeholder=""></td>
			 --%><td ><span >设备名称：</span><input type="text" class="inprt_text" id="new_raduisdevice_name" name="new_raduisdevice_name" placeholder="60位"></td>
		</tr>
		<%-- <tr >
			<td ><span >固件版本：</span><input type="text" id="new_raduisdevice_firmware_version" name="new_device_firmware_version" placeholder=""></td>
			<td ><span >设备品牌：</span><input type="text" id="new_raduisdevice_brand" name="new_raduisdevice_brand" placeholder=""></td>
			<td><span >设备型号： </span><input type="text" id="new_raduisdevice_model" name="new_raduisdevice_model" placeholder="" ></td>
		</tr> --%>
		<tr >
			<%-- <td ><span >div_mac：            </span><input type="text" id="new_raduisdevice_mac" name="new_raduisdevice_mac" placeholder="" ></td>
			<td ><span >添加时间：</span><input type="text" id="new_raduisdevice_create_datetime" name="new_raduisdevice_create_datetime" placeholder="" ></td>
			 --%></tr>
		<%-- <tr >
			<td ><span >网元AcId：</span><input type="text" id="new_raduisdevice_parentemsdevid" name="new_raduisdevice_parentemsdevid" placeholder=""></td>
			<td ><span >div_ssid：    </span><input type="text" id="new_raduisdevice_ssid" name="new_raduisdevice_ssid" placeholder=""></td>
			<td><span >port端口： </span><input type="text" id="new_raduisdevice_port" name="new_raduisdevice_port" placeholder=""></td>
		</tr> --%>
		<tr >
			<td><span >devIp地址：</span><input type="text" id="new_raduisdevice_devIp" name="new_raduisdevice_devIp" placeholder="" ></td>
			<td ><span >共享密钥：</span><input type="text" id="new_raduisdevice_secret" name="new_raduisdevice_secret" placeholder="60位"></td>
		</tr>
	</table>

	<div class="ChinaNet-Col-1 ChinaNet-Left">
	  		<%-- <button id="btn_add_raduisdevice" class="Form-Primary"><span>添 加</span></button> --%>
	  		<button id="btn_regist_raduisdevice" class="Form-Primary"><span>注 册</span></button>
	</div>
</div> 

<!-- ***************************************************** 设备虚拟化 *****************************************************-->

<div align=center >
<span>设备虚拟化</span>
<div>说明：ac/bas：(ip唯一标识)fit-ap:(ssid+mac唯一标识)fat-ap：(网元编号唯一标识)</div>
	<table class="table_work">
		<tr >
			<td ><span >设备类型：</span><input type="text" id="new_device_type" name="new_device_type" placeholder="BAS,AC,FIT_AP,FAT_AP" ></td>
			<td ><span  >网元编号：</span><input type="text" id="new_device_ems_dev_id" name="new_device_ems_dev_id" placeholder="数字，50位"></td>
			<td ><span >设备名称：</span><input type="text" class="inprt_text" id="new_device_name" name="new_device_name" placeholder="60位"></td>
		</tr>
		<tr >
			<td ><span >固件版本：</span><input type="text" id="new_device_firmware_version" name="new_device_firmware_version" placeholder="50位，例1.0.0"></td>
			<td ><span >设备品牌：</span><input type="text" id="new_device_brand" name="new_device_brand" placeholder="例：RIXIN,INTERTEST  60位"></td>
			<td><span >设备型号： </span><input type="text" id="new_device_model" name="new_device_model" placeholder="RXMAR30,WD-1411 60位" ></td>
		</tr>
		<tr >
			<td ><span >div_mac：            </span><input type="text" id="new_device_mac" name="new_device_mac" placeholder="0~9,A~F,12位" ></td>
			<td ><span >添加时间：</span><input type="text" id="new_device_create_datetime" name="new_device_create_datetime" placeholder="2013-02-01 05:12:02" ></td>
			<td><span >devIp地址：</span><input type="text" id="new_device_devIp" name="new_device_devIp" placeholder="15位" ></td>
		</tr>
		<tr >
			<td ><span >AC网元编号：</span><input type="text" id="new_device_parentemsdevid" name="new_device_parentemsdevid" placeholder="AC虚拟id，数字，50位"></td>
			<td ><span >div_ssid：    </span><input type="text" id="new_device_ssid" name="new_device_ssid" placeholder="100位"></td>
			<td><span >port端口： </span><input type="text" id="new_device_port" name="new_device_port" placeholder="数字，10位"></td>
		</tr>
		<tr >
			<td ><span >经度：</span><input type="text" id="new_device_xPos" name="new_device_parentemsdevid" placeholder="经度,9位"></td>
			<td ><span >维度：    </span><input type="text" id="new_device_yPos" name="new_device_ssid" placeholder="维度，9位"></td>
			<td><span >详细地址： </span><input type="text" id="new_device_fixAddr" name="new_device_port" placeholder="详细地址，200位"></td>
		</tr>
		<tr >
			<td ><span >组件版本：</span><input type="text" id="new_device_component_version" name="new_device_component_version" placeholder="组件版本，50位"></td>
			<td ><span >pinCode：</span><input type="text" id="new_device_pin_code" name="new_device_pin_code" placeholder="数字，20位"></td>
		</tr>
	</table>

	<div class="ChinaNet-Col-1 ChinaNet-Left">
	  		<button id="btn_add_device" class="Form-Primary"><span>添 加</span></button>
	</div>
</div> 
<div align=center >






<!-- ***************************************************** L S C *****************************************************-->
<br>
<br>
<br>


<span>获取验证码</span>
<table class="table_work">
		<tr >
			<td ><span>auth_id：</span><input type="text" id="new_sendcode_auth_id" name="auth_id" placeholder="11位数字手机号" ></td>
			<td ><span>ter_mac：</span><input type="text" id="new_sendcode_ter_mac" name="ter_mac" placeholder="设备mac地址"></td>
			<td ><span>auth_type：</span><input type="text"  id="new_sendcode_auth_type" name="auth_type" placeholder="MOBILE 或 APPMOBILE"></td>
		</tr>
	</table>

	<div class="ChinaNet-Col-1 ChinaNet-Left">
	  		<button id="btn_getAuthCode" class="Form-Primary"><span>获取验证码</span></button>
	</div>
<textarea id="message_getAuthCode"  rows="2" cols="100"></textarea><br>
<textarea id="message_userAuth"  rows="1" cols="100"></textarea><br>
<textarea id="message_getToken"  rows="1" cols="100"></textarea><br>
<textarea id="message_appAuth"  rows="1" cols="100"></textarea><br>

<br>
<br>
<br>

<span>免费登陆</span>
<table class="table_work">
		<tr >
			<td ><span>auth_id：</span><input type="text" id="new_three_auth_id" name="auth_id" placeholder="获取过验证码的手机号" ></td>
			<td ><span>auth_code：</span><input type="text" id="new_three_auth_code" name="auth_code" placeholder="与手机号对应的验证码"></td>
			<td ><span>ter_mac：</span><input type="text" id="new_three_ter_mac" name="ter_mac" placeholder="设备mac地址" ></td>
		</tr>
		<tr>
			<td ><span>auth_type：</span><input type="text" id="new_three_auth_type" name="auth_type" placeholder="MOBILE 或 APPMOBILE"></td>
			<td ><span>terminal_type：</span><input type="text" id="new_three_terminal_type" name="terminal_type" placeholder="终端操作系统"></td>
		</tr>
	</table>

	<div class="ChinaNet-Col-1 ChinaNet-Left">
	  		<button id="btn_appAuth" class="Form-Primary"><span>免费登陆</span></button>
	</div>

</div>
<div>
	token:<input type="text" id = "access_token_token"/><br>
	appauth_type:<input type="text" id = "access_token_appauth_type"/><br>
	platform_code:<input type="text" id = "access_token_platform_code"/><br>
	authid:<input type="text" id = "access_token_authid"/><br>
</div>




<%-- <button id="btn_add_radius" class="Form-Important">
        <span>Ac/base添加</span>
    </button> --%>
<script type="text/javascript" src="/statics/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/statics/js/artDialog/dist/dialog-min.js"></script>
<script type="text/javascript" src="/statics/js/md5.js"></script>
<script type="text/javascript" src="/statics/js/chinanet.js"></script>
<script type="text/javascript" src="/statics/js/test.js"></script>
</body>
</html>