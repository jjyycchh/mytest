<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){location = '/account/home.htm';}</script>
<link type="text/css" href="/resources/merchant/css/device.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">设备管理</a>

    <!-- <a href="/merchant/sites26.htm" class="Action-Button End-Button ChinaNet-Right">返回站点列表</a> -->
    <a href="javascript:;" id="Device-userlimit-Done"  class="Action-Primary ChinaNet-Right">用户流量时长管理</a>
</div>
<!-- ./Navigator -->

<div class="ChinaNet-Free-Menu-Left">
    <a href="/account/viewaccountdetails26.htm?accountId=${sessionScope.login_account_info.id}" id="sites" class="initAjax"><span>商户基本信息</span></a>
    <a href="/device/devicelist26.htm" class="initAjax Active"><span>AP设置</span></a>
    <a href="/system/get_message26.htm" class="initAjax"><span>消息中心</span></a>
</div>

<div class="ChinaNet-Free-Body-Right">
    <div class="Right-Body-Main">
        <!-- Device Search -->
          <div class="ChinaNet-Search-Body">
              <div class="ChinaNet-Form-Sheet">
                  <!--<div class="Form-Item-Title ChinaNet-Col-2">OKOKOKOKOK</div>-->
                  <div class="Form-Item-Input ChinaNet-Col-3"><input type="text" id="keywords" class="Input-Control" placeholder="输入设备名称、关键字"></div>

                  <div class="ChinaNet-Left ChinaNet-Col-2">
                      <input type="text" id="DeviceStatus" name="DeviceStatus">
                  </div>
                  <div class="ChinaNet-Col-2 ChinaNet-Left">
                      <button id="btn_search_device" class="Form-Primary"><span>查询设备</span></button>
                  </div>
              </div>
          </div>
          <!-- ./Device Search -->
          <!-- Device List -->
          <div class="ChinaNet-Free-Table ChinaNet-Form-Sheet">
              <table>
                  <!-- <tr class="ChinaNet-Table-Subject">
                      <td colspan="8">

                      </td>
                  </tr> -->
                  <tr class="ChinaNet-Table-Title">

                      <th width="35%">设备名称</th>
                      <th width="15%">设备属性</th>
                      <th width="15%">商户</th>
                      <th width="10%">状态</th>
                      <th width="15%">登记时间</th>
                      <th width="8%">&nbsp;</th>
                      <!-- <th class="Width-For-Button">&nbsp;</th> -->

                  </tr>
                  <tbody id="device_body">

                  </tbody>
              </table>
          </div>
          <!-- Device Page Line -->
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
          <!-- ./Device Page Line -->
        </div>
    </div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/device.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		deviceApp.init();
	 });
</script>


	