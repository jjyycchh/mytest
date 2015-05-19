<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){location = '/account/home.htm';}</script>
<link type="text/css" href="/statics/css/device.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">设备管理</a>

    <!-- <a href="/merchant/sites.htm" class="Action-Button End-Button ChinaNet-Right">返回站点列表</a> -->
    <a href="javascript:;" id="Device-userlimit-Done"  class="Action-Primary ChinaNet-Right">用户流量时长管理</a>
</div>
<!-- ./Navigator -->
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
  <div class="ChinaNet-Free-Table">
      <table>
          <!-- <tr class="ChinaNet-Table-Subject">
              <td colspan="8">

              </td>
          </tr> -->
          <tr class="ChinaNet-Table-Title">

              <th width="25%">设备名称</th>
              <th width="20%">设备属性</th>
              <th width="16%">商户</th>             
              <th width="6%">状态</th>
              <th width="8%">CPU负载</th>
              <th width="8%">空闲内存</th>
              <th width="10%">流量</th>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/device.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		deviceApp.init();
	 });
</script>


	