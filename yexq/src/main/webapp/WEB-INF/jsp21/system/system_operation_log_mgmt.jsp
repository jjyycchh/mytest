<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/system.css" rel="stylesheet" media="screen">

<script type="text/javascript">
    if(typeof __IS_INIT_CHINANET=='undefined') {
        location = '/account/home.htm';
}
</script>
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/system/system_management.htm" class="initAjax">系统设置</a>
    <a href="#">操作日志查询</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">      
    <a href="/system/system_management.htm" id="systemmanagement" class="initAjax"><span>平台设置</span></a>
    <a href="/system/portaltemplatemanagement.htm" id="portaltemplatemanagement" class="initAjax"><span>模板设置</span></a>
    <a href="/system/systemthirdpartaccess.htm" id="systemthirdpartaccess" class="initAjax"><span>第三方接入</span></a>
    <a href="/system/publishcomponent.htm" id="publishcomponent" class="initAjax"><span>组件库</span></a>  
    <a href="/system/searchexceptionlogpage.htm" id="searchexceptionlogpage" class="initAjax"><span>异常日志管理</span></a>
    <a href="/system/searchauthenticationpage.htm" id="searchauthenticationpage" class="initAjax"><span>用户认证记录</span></a>
    <a href="/system/searchsmssentpage.htm" id="searchsmssentpage" class="initAjax"><span>短信发送记录</span></a>
    <a href="/system/applicationmanagementpage.htm" id="applicationmanagementpage" class="initAjax"><span>客户端软件管理</span></a>
    <a href="/platform10/searchthirdplatformpage.htm" id="searchthirdplatformpage" class="initAjax"><span>二级平台管理</span></a>
    <a href="/system/devicetasklogpage.htm" id="searchdevicetasklogpage" class="initAjax"><span>设备任务日志管理</span></a>
    <a href="/system/accountoperationlogpage.htm" id="accountoperationlogpage" class="initAjax Active"><span>操作日志记录</span></a>
    <a href="/system/searchreportpage.htm" id="searchreportpage" class="initAjax"><span>举报记录管理</span></a>
    <a href="/system/searchsuggestpage.htm" id="searchsuggestpage" class="initAjax"><span>投诉与建议管理</span></a>
    <a href="/authentication/thirdapplicationsearchpage.htm" id="thirdapplicationsearchpage" class="initAjax"><span>第三方应用管理</span></a>
</div>
<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
        <div class="ChinaNet-Search-Body">
            <div class="ChinaNet-Form-Sheet">
                <div class="Form-Item-Input ChinaNet-Col-6">
                    <input type="text" id="keywords" class="Input-Control" placeholder="查询关键字，如操作IP、方法名、操作描述内容等，多个关键字请用空格隔开">
                </div>
                <div class="Form-Item-Input ChinaNet-Col-2">
                    <input id="startdate" class="Input-Control" type="text" value="" placeholder="选择起始日期" readonly="readonly" name="startdate">
                </div>
                <div class="Form-Item-Input ChinaNet-Col-2">
                    <input id="enddate" class="Input-Control" type="text" value="" placeholder="选择截止日期" readonly="readonly" name="enddate">
                </div>
                <div class="ChinaNet-Col-1 ChinaNet-Left">
                    <button id="btn_search_log" class="Form-Primary">
                        <span>查询</span>
                    </button>
                </div>
            </div>
            <div class="ChinaNet-Form-Sheet">
				<div class="ChinaNet-Left">
					<span class="Form-Item-Label">账户类型</span>
				</div>
				<div id="div_type_select" class="ChinaNet-Left ChinaNet-Col-2">
					<input type="text" id="type_select" class="Input-Control">
				</div>
				<div class="ChinaNet-Left">
					<span class="Form-Item-Label">模块名称</span>
				</div>
				<div id="div_module_select" class="ChinaNet-Left ChinaNet-Col-2">
					<input type="text" id="module_select" class="Input-Control">
				</div>
				<div class="ChinaNet-Left">
					<span class="Form-Item-Label">Service名称</span>
				</div>
				<div id="div_service_select" class="ChinaNet-Left ChinaNet-Col-2">
					<input type="text" id="service_select" class="Input-Control">
				</div>
        </div>
        </div>
        <div class="Statis-Body">
            <div class="Statis-Body-Guest">
                <div id="log_list" class="ChinaNet-Free-Table">
                    <table>
                        <tr class="ChinaNet-Table-Title">
                            <th  width="15%">操作IP</th>
                            <th  width="30%">Action方法</th>
                            <th  width="30%">Service名称</th>
                            <th  width="16%">生成时间</th>
                            <th class="Width-For-Button">&nbsp;</th>
                        </tr>
                        <tbody id="log_list_body"></tbody>
                    </table>
                </div>
                <div id="page_info" class="ChinaNet-Page-Table">
                    <a id="a_pagination_previous"> 
                        <span class="Overly-Left"></span>
                        <span class="Overly-Right"></span> 
                        <span>前一页</span>
                    </a> 
                    <a href="javascript:;" class="Active"> 
                        <span class="Overly-Left"></span> 
                        <span class="Overly-Right"></span> 
                        <span id="lb_pagenumber">0</span>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/accountoperationlog.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/chinanet.js"></script>
<script type="text/javascript">
  $(document).ready(function(){
    accountoperationlogApp.init();
   });
</script>