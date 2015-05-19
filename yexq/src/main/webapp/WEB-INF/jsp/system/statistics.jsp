<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<div class="clear-line"></div>
<div id="statistics_body" class="wifi-portal-body">
	<div id="statistics_menu" class="portal-menu">
		<a href="#" id="userstatistics" name="statistics_url" onclick="javascript:loadStatisPage(this, '${pageContext.request.contextPath}/user/userstatistics.htm');">用户分析
			<span class="glyphicon glyphicon-circle-arrow-right"></span></a> 
		<a href="#" id="trafficstatis" name="statistics_url" onclick="javascript:loadStatisPage(this, '${pageContext.request.contextPath}/merchant/trafficstatis.htm');">流量分析
			<span class="glyphicon glyphicon-circle-arrow-right"></span></a> 
		<a href="#" id="portalsstatis" name="statistics_url" onclick="javascript:loadStatisPage(this, '${pageContext.request.contextPath}/merchant/portalsstatis.htm');">wifi门户分析
			<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	</div>
	<div id="statis_main_div" class="portal-main">
	
	</div>
</div>
<div class="clear-line"></div>

<script src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script type="text/javascript">
MAIN_MENU.setActiveMenuItem("id_mm_statistics");
$(document).ready(function() {	
	//TODO: show menu with permission
	if("${hasUserManagePerm}" == "false"){
		$("#userstatistics").remove();
	}
	/* if("${hasMerchantPermission}" == "false"){
		$("#userstatistics").remove();
	} */
	if("${hasPortalPermission}" == "false"){
		$("#trafficstatis").remove();
		$("#portalsstatis").remove();
	}
	
	if($("[name='statistics_url']").length==0){
		$("#statistics_body").html("");
		$.pnotify({
            title: "提示",
            text: "您没有相关权限，请联系管理员！",
            type: 'error'
        });
	}else {
		if("${menu}" == ""){
			$("[name='statistics_url']").eq(0).click();
		}else {
			$("#${menu}").click();
		}
	}
	
});
	
function loadStatisPage(obj,url){
	$("[name='statistics_url']").removeClass('active');
	$(obj).addClass("active");
	$('html').mask('加载...');
	$("#statis_main_div").load(url);
	$('html').unmask();
	/* $.get(url, function(data){
		$('#statis_main_div').html(data);
		$('html').unmask();
		return false;
	}); */
}
</script>