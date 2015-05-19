<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){location = '/account/home.htm';}</script>
<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/thirdapp.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">我的应用</a>
</div>
<div class="ChinaNet-Free-Menu-Left">
    <a href="/authentication/merchanthasthirdapplicationpage26.htm" id="asthirdapp" class="initAjax Active"><span>我的应用</span></a>
    <a href="/authentication/merchantthirdapplicationpage26.htm" id="thirdapp" class="initAjax"><span>应用商城</span></a>
</div>
<!-- ./Navigator -->
<!-- Search -->
<div class="ChinaNet-Free-Body-Right">
	<div class="Right-Body-Main">
	  <!-- thirdApp List -->
	  <div class="App_list" id="App_body">
	  		
	  </div>	  
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
		thirdApplicationpageApp.MyApp();
	 });
</script>