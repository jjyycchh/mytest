<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){location = '/account/home.htm';}</script>
<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/thirdapp.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">应用商城</a>
</div>
<div class="ChinaNet-Free-Menu-Left">
    <a href="/authentication/merchanthasthirdapplicationpage26.htm" id="asthirdapp" class="initAjax"><span>我的应用</span></a>
    <a href="/authentication/merchantthirdapplicationpage26.htm" id="thirdapp" class="initAjax Active"><span>应用商城</span></a>
</div>
<!-- ./Navigator -->
<!-- Search -->
<div class="ChinaNet-Free-Body-Right">
	<div class="Right-Body-Main">
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
			<div class="ChinaNet-Left ChinaNet-Col-2">
              <input type="text" id="appType" name="appType">
          	</div>
			<div class="ChinaNet-Col-2 ChinaNet-Left">
	              <button id="btn_search_thirdapp" class="Form-Primary"><span>查询</span></button>
	          </div>
	      </div>
	  </div>
	  <!-- Search -->
	  <!-- thirdApp List -->
	  <div class="App_list" id="App_body">
	  	<%-- <div class="App-list-Body">
	  		<div class="App-Thumb">
				<div class="Overly-Top-Left"></div>
				<div class="Overly-Top-Right"></div>
				<div class="Overly-Bottom-Left"></div>
				<div class="Overly-Bottom-Right"></div>
				<img id="AppThumbID" src="/resources/merchant/img/no-image.png">
			</div>
			
			<div class="App-content">
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat
                </p>
            </div>
            <div class="App-Button">
                <span class="pull-right buttons">
                    <button class="btn btn-sm btn-success"> 一键开通</button>
                    <button class="btn btn-sm btn-primary"> 进入应用</button>
                    <button class="btn btn-sm btn-warning"> 卸载应用</button>
                </span>
                <span class="pull-left Data-Name">
                	微通宝 微通宝微通宝微通宝 &nbsp;&nbsp;
                </span>
                <span class="Data-phone">
                	(服务电话:18989898989)
                </span>
            </div>
	  	</div> --%>	  	
	  </div>
	  <!-- <div class="ChinaNet-Free-Table">
	      <table>
	          <tr class="ChinaNet-Table-Title">
	              <th width="23%">应用名称</th>
	              <th width="8%">版本号</th>
	              <th width="40%">应用描述</th>             
	              <th width="15%">创建时间</th>    
	              <th width="8%">状态</th>          
	              <th width="10%"></th>
	          </tr>
	          <tbody id="App_body">
	              
	          </tbody>
	      </table>
	  </div> -->
	  <!-- thirdApp List -->	
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

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/thirdapp.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		thirdApplicationpageApp.init();
	 });
</script>