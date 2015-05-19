<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/portal.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/merchant/portalpolicies.htm" class="initAjax">站点推送策略管理</a>

    <a href="/merchant/addportalpolicy.htm" class="Action-Primary ChinaNet-Right End-Button initAjax">添加新策略</a>
</div>
<!-- ./Navigator -->

<div class="ChinaNet-Free-Menu-Left">
    <a href="/merchant/sites.htm" id="sites" class="initAjax"><span>门户站点管理</span></a>
    <a href="/merchant/portalpolicies.htm" id="portalpolicies" class="initAjax Active"><span>站点推送策略</span></a>
</div>

<div class="ChinaNet-Free-Body-Right">
	<div class="Right-Body-Main">
		<div class="ChinaNet-Search-Body">
			<div class="ChinaNet-Form-Sheet">
                <div class="Form-Item-Input ChinaNet-Col-3"><input type="text" id="keywords" class="Input-Control" placeholder="输入关键字"></div>
                <div class="Form-Item-Input ChinaNet-Col-2">
                    <input id="startdate" class="Input-Control" type="text" value="" placeholder="选择起始日期" readonly="readonly" name="startdate">
                </div>
                <div class="Form-Item-Input ChinaNet-Col-2">
                    <input id="enddate" class="Input-Control" type="text" value="" placeholder="选择截至日期" readonly="readonly" name="enddate">
                </div>
                <div class="ChinaNet-Col-2 ChinaNet-Left">
                    <button id="btn_search_policy" class="Form-Primary"><span>查询</span></button>
                </div>
			</div>
		</div>
		<div class="Statis-Body">
			<div class="Statis-Body-Guest">
                <div class="ChinaNet-Free-Table">
                    <table>
                        <tr class="ChinaNet-Table-Title">
                            <th width="20%">策略主题</th>
                            <th width="10%">时间计划数</th>
                            <th width="20%">最近修改人</th>
                            <th width="20%">所属人</th>
                            <th width="10%">设备数量</th>
                            <th width="10%">状态</th>
                            <th class="Width-For-Button">&nbsp;</th>
                        </tr>
                        <tbody id="pp_list_tbr">
                                                
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

<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/portalpolicy.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			portalpolicyApp.init();
		});
	</script>