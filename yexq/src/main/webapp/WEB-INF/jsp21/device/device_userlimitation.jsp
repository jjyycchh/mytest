<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="Device-Settings-Body">
    <div id="divmerchant" class="ChinaNet-Form-Sheet">
        <label class="Form-Item-Title ChinaNet-Col-2">所属商户</label>
        <div id="divmerchants" class="Form-Item-Select ChinaNet-Col-4">
        	<input type="text" id="inputmerchant" name="inputmerchant">
        </div>
    </div>
    <div class="ChinaNet-Form-Sheet">
        <label class="Form-Item-Title ChinaNet-Col-2">最大流量</label>
        <div class="Form-Item-Input ChinaNet-Col-4"><input type="text" id="inputMaxTraffic" class="Input-Control" placeholder="用户能使用的最大流量"></div>
        <label class="Form-Item-Info ChinaNet-Col-5">(范围:1-10240的整数， 默认10240。单位：M) </label>
    </div>
    <div class="ChinaNet-Form-Sheet">
        <label class="Form-Item-Title ChinaNet-Col-2">最大时长</label>
        <div class="Form-Item-Input ChinaNet-Col-4"><input type="text" id="inputMaxTime" class="Input-Control" placeholder="用户能使用的最长时间"></div>
        <label class="Form-Item-Info ChinaNet-Col-5">(范围:10-2880的整数，默认2880。单位：分钟)</label>
    </div>
   <!--  <div class="ChinaNet-Form-Sheet">
        <label class="Form-Item-Title ChinaNet-Col-2">短信验证次数</label>
        <div class="Form-Item-Input ChinaNet-Col-4"><input type="text" id="inputMaxSms" class="Input-Control" placeholder="用户短信验证最多次数"></div>
    </div> -->
</div>


<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/deviceuserlimit.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		//if(__DATA_PUBLIC_KEY != null)
            //deviceApp.init();
		//getSubAccountData();
		deviceuserlimitApp.init();
	 });
</script>