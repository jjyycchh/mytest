<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/statis.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">统计分析</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/user/userstatistics.htm" id="userstatistics" data-element="statisticsBody" class="initAjax"><span>用户分析</span></a>
    <a href="/merchant/trafficstatis.htm" id="trafficstatis" data-element="statisticsBody" class="initAjax"><span>流量分析</span></a>
    <a href="/merchant/portalsstatis.htm" id="portalsstatis" data-element="statisticsBody" class="initAjax"><span>WIFI门户分析</span></a>
</div>

<div class="ChinaNet-Free-Body-Right">
    <div id="statisticsBody" class="Right-Body-Main">
        <div class="ChinaNet-Search-Body">
            <!--<div class="ChinaNet-Form-Sheet">
                <div class="Form-Item-Title ChinaNet-Col-2">OKOKOKOKOK</div>
                <div class="Form-Item-Input ChinaNet-Col-3"><input type="text" class="Input-Control" placeholder="输入设备名称、关键字"></div>
            </div>-->
        </div>
        <div class="Statis-Body">
            <div class="Statis-Body-Guest"></div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/statis.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
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
		
		if($("[data-element='statisticsBody']").length==0){
			$("#statisticsBody").html("");
			onAlertError('您没有相关权限，请联系管理员！');
		}else {
			if("${menu}" == ""){
				$("[data-element='statisticsBody']").eq(0).click();
			}else {
				$("#${menu}").click();
			}
		}
		//防止select div遮挡
		$('div.ChinaNet-Free-Menu-Left a').on('click',function(){
			$("div.xiSelectPanelElementName-MainBody").css("display", "none");
        });
	 });
</script>