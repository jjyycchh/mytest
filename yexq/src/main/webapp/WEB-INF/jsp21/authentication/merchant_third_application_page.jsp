<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){location = '/account/home.htm';}</script>

<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">第三方接入</a>
</div>
<!-- ./Navigator -->
<!-- Search -->
  <div class="ChinaNet-Search-Body">
      <div class="ChinaNet-Form-Sheet">
        <div class="Form-Item-Input ChinaNet-Col-3"><input type="text" id="keywords" class="Input-Control" placeholder="输入名称、关键字"></div>
		<div class="Form-Item-Input ChinaNet-Col-2">
			<input id="startdate" class="Input-Control" type="text" value=""
				placeholder="选择起始日期" readonly="readonly" name="startdate">
		</div>
		<div class="Form-Item-Input ChinaNet-Col-2">
			<input id="enddate" class="Input-Control" type="text" value=""
				placeholder="选择截止日期" readonly="readonly" name="enddate">
		</div>

		<div class="ChinaNet-Col-2 ChinaNet-Left">
              <button id="btn_search_thirdapp" class="Form-Primary"><span>查询</span></button>
          </div>
      </div>
  </div>
  <!-- Search -->
  <!-- thirdApp List -->
  <div class="ChinaNet-Free-Table">
      <table>
          <tr class="ChinaNet-Table-Title">
              <th width="30%">应用名称</th>
              <th width="10%">版本号</th>
              <th width="40%">应用描述</th>             
              <th width="15%">创建时间</th>              
              <th width="5%"></th>
          </tr>
          <tbody id="App_body">
              
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
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/thirdapp.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		thirdApplicationpageApp.init();
	 });
</script>