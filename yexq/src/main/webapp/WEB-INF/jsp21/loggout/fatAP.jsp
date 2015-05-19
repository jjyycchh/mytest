<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="/statics/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/statics/js/artDialog/dist/dialog-min.js"></script>
<script type="text/javascript" src="/statics/js/md5.js"></script>
<script type="text/javascript" src="/statics/js/chinanet.js"></script>
<script type="text/javascript" src="/statics/js/test.js"></script>

<title>胖AP注册和认证</title>
</head>
<body>
	<div>
		<div>
            <div>新设备注册</div>
        </div>
        <div>
        	MAC :　     	<input type="text" id = "mac" />(* mac地址,12位数字或字母,produced_devices和device表中的mac地址)<br>
			用户名 :　	<input type="text" id = "username" />(*商户的用户名，6到50位)<br>
			密码 :　         	<input type="text" id = "password" />(*商户的密码，6到20位)<br>
			上网账号 ：      <input type="text" id = "telcomAccount" />(*PPPoE上网账号或IP)<br>
			软件版本 ：      <input type="text" id = "ver" />(*软件版本，应该是组件版本)<br>
			注册新用户 ： <input type="checkbox" id = "registerAccount">(*是否注册新用户，选择此项，以下选项才能填写)<br>
			重复密码：  	<input type="text" id = "rePassword" />(*重复商户的密码)<br>
			邮箱 :　		<input type="text" id = "email" /><br>
			手机号： 　	<input type="text" id = "cellNumber" /><br>
			商户名：   	<input type="text" id = "merchantName" /><br>
			推荐码 :　	<input type="text" id = "recommendNumber" />(*客户经理手机号，可选)<br>
			商户描述 :　	<input type="text" id = "merchantDescription" />(*可选)<br>
			详细地址 :　	<input type="text" id = "geoLocation" />(*格式：{"province":"广东","city":"广州","county":"越秀区","address":"详细地址"}，实际上是由JS组合成这样的，并不是要求客户要这样写)<br>
			<button id = "fat_ap_register"><span>注册</span></button>
        </div>
     </div>
     <br><br><br>
     
     <div>
     	验证类型： <input type="text" id="auth_type"/>(*)<br>
     	authId： <input type="text" id="auth_id"/>(*)<br>
     	验证码： <input type="text" id="auth_code"/>(*)<br>
     	设备ID： <input type="text" id="dev_id"/>(*)<br>
     	mac地址： <input type="text" id="mac_auth"/>(*)<br>
     	浏览器类型： <input type="text" id="browser_type"/>(*)<br>
     	终端操作系统： <input type="text" id="terminal_type"/>(*)<br>
     	微博公众号： <input type="text" id="wechat_pub_acct"/>(*)<br>
     	商户ID： <input type="text" id="account_id"/>(*)<br>
     	<input type="button" id="fatApAuth" value="胖AP认证" />
     </div>
     
</body>
</html>