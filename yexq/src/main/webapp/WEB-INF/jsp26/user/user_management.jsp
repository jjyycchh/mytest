<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){location = '/account/home.htm';}</script>
<link type="text/css" href="/resources/merchant/css/device.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">用户管理</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/user/users26.htm" id="usermanagement" class="initAjax Active"><span>用户管理</span></a>
    <a href="/user/userauthlog26.htm" id="userlogmanagement" class="initAjax"><span>用户授权日志</span></a>
</div>
<div class="ChinaNet-Free-Body-Right">
	<div id="systemBody" class="Right-Body-Main">
		<!-- Search -->
		<div class="ChinaNet-Search-Body">
			<div class="ChinaNet-Form-Sheet">
				<!--<div class="Form-Item-Title ChinaNet-Col-2">OKOKOKOKOK</div>-->
				<div class="Form-Item-Input ChinaNet-Col-3">
					<input type="text" id="keywords" class="Input-Control"
						placeholder="输入用户名称、关键字">
				</div>
				<!-- <div class="ChinaNet-Left ChinaNet-Col-2">
					<input type="text" id="userStatus" name="userStatus">
				</div> -->
				<!--  
				<div class="ChinaNet-Left ChinaNet-Col-2">
					<input type="text" id="state" name="state">
				</div>-->
				<div class="ChinaNet-Col-2 ChinaNet-Left">
					<button id="btn_search_user" class="Form-Primary">
						<span>查询用户</span>
					</button>
				</div>
			</div>
		</div>
		<!--  Search -->
		<div id="userstab" class="ChinaNet-Free-Table">
			<table>
				<tr class="ChinaNet-Table-Title">
					<th width="18%">用户</th>
					<th width="28%">登录设备</th>
					<th width="14%">MAC</th>
					<th width="15%">登录时间</th>
					
					<th width="8%">状态</th>
					<th width="12%">流量</th>
					<th class="Width-For-Button">&nbsp;</th>
				</tr>
				<tbody id="tbl_user_lst">

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
			</a> <a id="a_pagination_next"> 
				<span class="Overly-Left"></span> 
				<span class="Overly-Right"></span> 
				<span>后一页</span>
			</a>
		</div>
	</div>
</div>
<!-- Page Line -->
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/user.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	userApp.init();
});
</script>



