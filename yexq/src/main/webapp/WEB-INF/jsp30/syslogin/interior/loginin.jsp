<%--
  
  User: outuo2
  Date: 2008-12-16
  Time: 11:18:36 
--%>
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>爱WiFi接入系统平台</title>
<!-- container -->
<link href="${pageContext.request.contextPath}/statics/css/css3/container.css" type=text/css rel=stylesheet>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/lib/jquery/jquery-1.11.1.min.js"></script>
<!-- 导入Z-Tree相关文件 -->
<link href="${pageContext.request.contextPath}/statics/zTree_v3.x/css/zTreeStyle/zTreeStyle.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/zTree_v3.x/js/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/zTree_v3.x/js/jquery.ztree.excheck-3.5.js"></script>
<script type="text/javascript">
//加载树
var setting = {
		data: {
			simpleData: {
				enable: true
			},key: {
				url: "xUrl"
			}
		},callback: {
			onClick: zTreeOnClick
		}
};

var initTree = function() {
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '/system/searchtree.htm',
		success : function(data) {
			if(data.result == 'OK') {
				var nodes = data.records;
				$.fn.zTree.init($("#treeDate"), setting, nodes);
			}else {
				alert(data.message);
			}
		},
		error : function(data) {
			alert("失败");
		}
	});
};
function zTreeOnClick(event, treeId, treeNode) {
    if(treeNode.url != null){
    	$("#main").attr("src",treeNode.url);
    	event.stopPropagation();
    }
};
//获取登录帐号信息
function initAccountInfo() {
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '/system/getAccountInfo.htm',
		success : function(data) {
			if(data.result == 'OK') {
				var account = data.record;
				document.getElementById("toplogintime").innerHTML = "登录时间:"+account.lastLoginDatetime;
				document.getElementById("topusername").innerHTML = "操作员:"+account.username;
			}else {
				alert(data.message);
			}
		},
		error : function(data) {
			alert("失败");
		}
	});
}
//menu
function topMenu(url,target){
	if(target=='_parent'){
		var t = confirm("确定是否重新登录？");
		if(t== true) {
			window.parent.location.href=url;
		}
		
	}else{
		parent.document.getElementById(target).src=url;
	}
}
$(document).ready(function(){
	//init Z-Tree
	initTree();
//	initAccountInfo();	//初始化当前用户信息
	$("#main_th").width($(document.body).width()-220);
	$("#main").width($(document.body).width()-220);
	$("#system_center table").height($(document.body).height()-104);
});

//监听窗口变化动态改变iframe的宽度
$(window).resize(function() {
	$("#main").width($(document.body).width()-220);
});
</script>
</head>
<body>
<div id="container" class="">
	<div id="system_head">
		<ul class="backBlueImg">
			<li><img src="${pageContext.request.contextPath}/statics/images/syslogin/MainIndex_8.gif"></li>
			<li style="float: right;">
				<ul class="nav">
					<li><img src="${pageContext.request.contextPath}/statics/images/syslogin/ap.jpg"></li>
					<li><img src="${pageContext.request.contextPath}/statics/images/syslogin/juese.jpg"></li>
					<li><img src="${pageContext.request.contextPath}/statics/images/syslogin/taocan.jpg"></li>
					<li><img src="${pageContext.request.contextPath}/statics/images/syslogin/kehu.jpg"></li>
					<li><img src="${pageContext.request.contextPath}/statics/images/syslogin/logout.jpg" onclick="topMenu('/account/logout.htm','_parent')"></li>
				</ul>				
			</li>
		</ul>
		<div class="clear"></div>
		<!-- <ul class="backBlueImg2">
			<li>
				<span id="toplogintime" >登录时间:</span>
				<span id="topusername">操作员:</span>
			</li>
			<li style="float: right;">
				<span><a onclick="javascript: d.s(16);" target="mainFrame" title="修改密码" href="zzsoftSysUser.do?action=updatePwdQuery">修改密码</a></span>
				<span><a target="mainFrame" title="用户信息修改" href="zzsoftUserManager.do?action=queryUserManager&amp;USERID=&lt;bean:write name='SysUser' property='USERID' /&gt;">用户信息修改</a></span>
			</li>		
		</ul> -->
	</div>
	<div id="system_center" class="h100_per">
		<!-- 左侧导航 -->
		<table>
			<!-- 左侧菜单 -->
			<tr>
				<th class="w197" style="vertical-align:top;">
					<ul class="w197 clear_p_m">
						<li><img src="${pageContext.request.contextPath}/statics/images/syslogin/MainIndex_3.gif"></li>
						<li><img src="${pageContext.request.contextPath}/statics/images/syslogin/MainIndex_31.gif"></li>
						<!-- 使用Z-Tree -->
						<li><ul id="treeDate" class="ztree" style="vertical-align: top;"></ul></li>
					</ul>
				</th>	
				<!-- 左侧菜单过渡图标 -->
				<th><div class="backBlueImg3 h100_per"></div></th>
				<th id="main_th"><iframe id="main" class="h100_per" src="/system/main.htm" name="mainRightFrame"></iframe></th>		
			</tr>
			
		</table>
	</div>
	<div class="clear"></div>
	<div id="system_foot"></div>
</div>
</body>
</html>