<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/system.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/system/system_management26.htm" class="initAjax">系统设置</a>
    <a href="#">模板设置</a>

    <!-- <a href="/merchant/sites26.htm" class="Action-Button End-Button ChinaNet-Right">返回站点列表</a> -->
    <a href="/system/portaltemplateedit26.htm" class="initAjax Action-Primary ChinaNet-Right">添加新模板</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/system/system_management26.htm" id="systemmanagement" class="initAjax"><span>平台设置</span></a>
    <a href="/system/portaltemplatemanagement26.htm" id="portaltemplatemanagement" class="initAjax"><span>模板设置</span></a>
    <a href="/system/systemthirdpartaccess26.htm" id="systemthirdpartaccess" class="initAjax"><span>第三方接入</span></a>
    <a href="/system/publishcomponent26.htm" id="publishcomponent" class="initAjax"><span>组件库</span></a>
    <a href="/system/searchexceptionlogpage26.htm" id="searchexceptionlogpage" class="initAjax"><span>异常日志管理</span></a>
    <a href="/system/searchauthenticationpage26.htm" id="searchauthenticationpage" class="initAjax"><span>用户认证记录</span></a>
	<a href="/system/searchsmssentpage26.htm" id="searchsmssentpage" class="initAjax"><span>短信发送记录</span></a>
	<a href="/system/applicationmanagementpage26.htm" id="applicationmanagementpage" class="initAjax"><span>客户端软件管理</span></a>
	<a href="/platform10/searchthirdplatformpage26.htm" id="searchthirdplatformpage" class="initAjax"><span>二级平台管理</span></a>
	<a href="/system/devicetasklogpage26.htm" id="searchdevicetasklogpage" class="initAjax"><span>设备任务日志管理</span></a>
    <a href="/system/accountoperationlogpage26.htm" id="accountoperationlogpage" class="initAjax"><span>操作日志记录</span></a>
    <a href="/system/searchreportpage26.htm" id="searchreportpage" class="initAjax"><span>举报记录管理</span></a>
    <a href="/system/searchsuggestpage26.htm" id="searchsuggestpage" class="initAjax"><span>投诉与建议管理</span></a>
</div>
<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
        <div class="System-Body">
            <div class="System-Body-Guest">
            	<!-- Working Statis -->
				<div class="ChinaNet-Free-Table">
					<table>						
						<tr class="ChinaNet-Table-Title">
							<th width="10%">模板ID号</th>
							<th width="25%">模板名称</th>
							<th width="35%">模板描述</th>
							<th width="10%">模板类型</th>
							<th width="15%">创建时间</th>
							<th width="5%">&nbsp;</th>
						</tr>
						<tbody id="portallist_body">
							
						</tbody>
					</table>
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
        </div>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/portalmgmt.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		portalmgmtApp.init();
	 });
</script>