<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>

<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/merchant/sites26.htm" class="initAjax">Portal设置</a>

    <a href="/merchant/addsite26.htm" class="Action-Primary ChinaNet-Right End-Button initAjax">添加新站点</a>
</div>
<!-- ./Navigator -->


<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/portal.css" rel="stylesheet" media="screen">
<div class="ChinaNet-Free-Menu-Left">
    <a href="/merchant/sites26.htm" id="sites" class="initAjax Active"><span>Portal设置</span></a>
    <a href="/merchant/portalpolicies26.htm" id="portalpolicies" class="initAjax"><span>广告推送</span></a>
</div>


<div class="ChinaNet-Free-Body-Right">
	<div class="Right-Body-Main">
		<div class="ChinaNet-Search-Body">
			<div class="ChinaNet-Form-Sheet">
				<!--<div class="Form-Item-Title ChinaNet-Col-2">OKOKOKOKOK</div>-->
				<div class="Form-Item-Input ChinaNet-Col-3">
					<input type="text" id="keywords" class="Input-Control" placeholder="输入站点名称、关键字">
				</div>
				<div class="Form-Item-Input ChinaNet-Col-2">
					<input type="text" class="Input-Control"  name="startdate" id="startdate" readonly="readonly" placeholder="选择起始日期" value="" />
				</div>
				<div class="Form-Item-Input ChinaNet-Col-2">
					<input type="text" class="Input-Control"  name="enddate" id="enddate" readonly="readonly" placeholder="选择截至日期" value="" />
				</div>
				<!-- <div class="ChinaNet-Left ChinaNet-Col-2">
					<input type="text" id="SiteStatus" name="SiteStatus">
				</div> -->
				<div class="ChinaNet-Col-2 ChinaNet-Left">
					<button id="btn_search_site" class="Form-Primary">
						<span>查询站点</span>
					</button>
				</div>
			</div>
		</div>

		<div class="ChinaNet-Free-Table">
			<table>
				<!-- <tr class="ChinaNet-Table-Subject">
					<td>&nbsp;</td>
				</tr> -->
				<tr class="ChinaNet-Table-Title-Interval">
					<th> </th>
				</tr>
			</table>
		</div>
		<div class="ChinaNet-Portal-Sheet">
			<ul id="Portal-Site-ul">

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
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/portal.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        portalApp.init();
    });
</script>