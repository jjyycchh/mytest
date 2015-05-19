<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/system.css" rel="stylesheet" media="screen">

<script type="text/javascript">
    if(typeof __IS_INIT_CHINANET=='undefined') {
        location = '/account/home.htm';
}
</script>
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/system/searchdevicemodelpage26.htm" class="initAjax">厂商设备</a>
    <a href="#">电信虚拟设备管理</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">      
    <a href="/system/searchdevicepage26.htm" id="deviceSearchPage" class="initAjax"><span>已注册设备查询</span></a>
	<a href="/system/searchproduceddevicespage26.htm" id="producedDevicesSearchPage" class="initAjax"><span>在库设备管理</span></a>
    <a href="/system/searchdevicemodelpage26.htm" id="deviceModelPage" class="initAjax"><span>品牌型号管理</span></a>
    <s:if test="#session.login_account_info.type != 'MANUFACTURER'">
        <a href="/system/radiusvirtualdevicepage26.htm" id="radiusvirtualdevicepage" class="initAjax"><span>AAA认证设备管理</span></a>
        <a href="/system/fitapdevicepage26.htm" id="fitapdevicepage" class="initAjax"><span>Fit-Ap设备管理</span></a>
    	<a href="/system/tcappage26.htm" id="tcappage" class="initAjax Active"><span>电信虚拟设备管理</span></a>
    </s:if>
</div>
<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
        <div class="ChinaNet-Search-Body">
            <div class="ChinaNet-Form-Sheet">
                <div class="Form-Item-Input ChinaNet-Col-6">
                    <input type="text" id="keywords" class="Input-Control" placeholder="查询关键字，如设备ID、pvlan、cvlan等，多个关键字请用空格隔开">
                </div>
                <div class="Form-Item-Input ChinaNet-Col-2">
                    <input id="startdate" class="Input-Control" type="text" value="" placeholder="选择起始日期" readonly="readonly" name="startdate">
                </div>
                <div class="Form-Item-Input ChinaNet-Col-2">
                    <input id="enddate" class="Input-Control" type="text" value="" placeholder="选择截止日期" readonly="readonly" name="enddate">
                </div>
                <div class="ChinaNet-Col-1 ChinaNet-Left">
                    <button id="btn_search_device" class="Form-Primary">
                        <span>查询</span>
                    </button>
                </div>
                <div class="ChinaNet-Col-1 ChinaNet-Left">
                    <button id="btn_add_device" class="Form-Important">
                        <span>添加</span>
                    </button>
                </div>
            </div>
        </div> 
        <div class="Statis-Body">
            <div class="Statis-Body-Guest">
                <div id="device_list" class="ChinaNet-Free-Table">
                    <table>
                        <tr class="ChinaNet-Table-Title">
                            <th  width="20%">设备ID</th>
                            <th  width="10%">pvlan</th>
                            <th  width="10%">cvlan</th>
                            <th  width="10%">domain</th>
                            <th  width="10%">ethport</th>
                            <th  width="15%">所属帐号</th>
                            <th  width="20%">所在地</th>
                            <th class="Width-For-Button">&nbsp;</th>
                        </tr>
                        <tbody id="device_list_body"></tbody>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/telecomvirtualap.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/chinanet.js"></script>
<script type="text/javascript">
  $(document).ready(function(){
    telecomvirtualdeviceApp.init();
   });
</script>