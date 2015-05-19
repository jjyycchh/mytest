<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/system/get_message26.htm" class="initAjax">系统信息</a>
    <a href="#">收件箱</a>
</div>

<div class="ChinaNet-Free-Menu-Left">
	<a href="/account/viewaccountdetails26.htm?accountId=${sessionScope.login_account_info.id}" id="sites" class="initAjax"><span>商户基本信息</span></a>
	<a href="/device/devicelist26.htm" class="initAjax"><span>AP设置</span></a>
	<a href="/system/get_message26.htm" class="initAjax Active"><span>消息中心</span></a>
</div>

<div class="ChinaNet-Free-Body-Right">
	<div class="Right-Body-Main">
		<div class="ChinaNet-Search-Body">
			<div class="ChinaNet-Form-Sheet">
				<div class="Form-Item-Input ChinaNet-Col-2">
					<input id="startdate" class="Input-Control" type="text" value="" placeholder="选择起始日期" readonly="readonly" name="startdate">
				</div>
				<div class="Form-Item-Input ChinaNet-Col-2">
					<input id="enddate" class="Input-Control" type="text" value="" placeholder="选择截至日期" readonly="readonly" name="enddate">
				</div>
				<div class="ChinaNet-Left ChinaNet-Col-2">
					<input type="text" id="ReadStatus" name="ReadStatus">
				</div>
				<div class="ChinaNet-Col-2 ChinaNet-Left">
					<button id="btn_search_smsMsg" class="Form-Primary"><span>查询</span></button>
				</div>
			</div>
		</div>
		<div class="Statis-Body">
			<div class="Statis-Body-Guest">
				<!-- Working Statis -->
				<div class="ChinaNet-Free-Table">
					<table>
						<tr class="ChinaNet-Table-Title">
						   <th width="20%">信息发送者</th>
							<th width="20%">信息标题</th>
							<th width="30%">信息内容</th>
							<th width="25%">接收时间</th>
							<th class="Width-For-Button">&nbsp;</th>
						</tr>
						<tbody id="inMsglist">

						</tbody>
					</table>
				</div>

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
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/smsmessage.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		messageApp.init();
	 });
</script>