<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link type="text/css" href="/resources/merchant/css/account.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">帐号管理</a>
     <a href='/account/addaccount.htm' class="Action-Primary ChinaNet-Right End-Button initAjax">创建新帐号</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Search-Body">
	<div class="ChinaNet-Form-Sheet">
		<!--<div class="Form-Item-Title ChinaNet-Col-2">OKOKOKOKOK</div>-->
		<div class="Form-Item-Input ChinaNet-Col-3">
			<input type="text" id="accountkeywords" class="Input-Control"
				placeholder="输入帐号名称、关键字">
		</div>
		<div class="ChinaNet-Left ChinaNet-Col-2">
			<input type="text" id="accountStatus" name="accountStatus">
		</div>
		<div id="account_type_select" class="ChinaNet-Left ChinaNet-Col-2">
			<input type="text" id="accountType" name="accountType">
		</div>
		<div class="ChinaNet-Col-2 ChinaNet-Left">
			<button id="btn_search_account" class="Form-Primary">
				<span>查询帐号</span>
			</button>
		</div>
	</div>
</div>
<div id="accounttab" class="ChinaNet-Free-Table">
	<table>
		<tr class="ChinaNet-Table-Title">
			<th width="20%">帐户</th>
			<th width="15%">角色</th>
			<th width="24%">通讯</th>
			<th width="10%">设备数量</th>
			<th width="15%">创建时间</th>
			<th width="10%">状态</th>
			<th class="Width-For-Button">&nbsp;</th>
		</tr>
		<tbody id="tbl_account_lst">

		</tbody>
	</table>
</div>

<div class="ChinaNet-Page-Table" id="accountlistpage">
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

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/account.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		accountApp.init();
	});
</script>
