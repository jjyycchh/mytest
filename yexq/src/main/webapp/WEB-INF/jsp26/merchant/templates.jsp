<!DOCTYPE HTML>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    response.setHeader("Pragma","No-cache");
    response.setHeader("Cache-Control","no-cache");
    response.setHeader("Cache-Control", "no-store");
    response.setDateHeader("Expires", 0);
%>
<html>
<head>
    <title id="frame_title_text">CHINANET PROTAL模板中心</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8">
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="-1" />
    <meta http-equiv="pragma" content="no-cache" />
    <link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link type="text/css" href="/resources/merchant/js/artDialog/css/ui-dialog.css" rel="stylesheet" media="screen">
    <link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/chinanet-free.css" rel="stylesheet" media="screen">
    <link type="text/css" href="/resources/merchant/css/editpage.css" rel="stylesheet" media="screen">
    <!--[if lt IE 9]>
    <script>
        document.execCommand("BackgroundImageCache", false, true);
    </script>
    <![endif]-->
</head>
<body class="Page-Edit-Template">
<div class="ChinaNet-Free-Body">
    <div class="ChinaNet-Portal-Templates">
        <ul id="Portal-Template-ul">

        </ul>
    </div>
		<!-- Page Line -->
		<div class="ChinaNet-Page-Table">
			<a id="a_pagination_previous"> 
				<span class="Overly-Left"></span>
				<span class="Overly-Right"></span> 
				<span>前一页</span>
			</a> 
			<a href="javascript:;" class="Active"> 
				<span class="Overly-Left"></span> 
				<span class="Overly-Right"></span> 
				<span id="lb_pagenumber">1</span>
			</a> 
			<a id="a_pagination_next"> 
				<span class="Overly-Left"></span> 
				<span class="Overly-Right"></span> 
				<span>后一页</span>
			</a>
		</div>
		<!-- Page Line -->
</div>
<div class="Edit-Page-Bar">
    <a href="javascript:;" class="Active View" title="浏览状态">
        <span class="View-Button"></span>
    </a>
    <a href="javascript:;" class="Edit" title="编辑状态">
        <span class="Edit-Button"></span>
    </a>
    <a href="javascript:;" class="Template Active" title="更换模板">
        <span class="Template-Button"></span>
    </a>
    <a href="javascript:;" class="Cancel" title="取消">
        <span class="Cancel-Button"></span>
    </a>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/json2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/artDialog/dist/dialog-min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/pager.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/templates.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    templatesApp.init();
});
</script>
</body>
</html>
