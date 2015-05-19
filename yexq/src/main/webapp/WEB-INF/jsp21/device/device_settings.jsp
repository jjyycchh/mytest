<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="Device-Settings-Body">
    <div class="ChinaNet-Form-Sheet">
        <label class="Form-Item-Title ChinaNet-Col-2">设备ID</label>
        <div id="lbSBID"  class="Form-Item-Label ChinaNet-Col-8">
        	
        </div>
    </div>
    <div class="ChinaNet-Form-Sheet">
        <label class="Form-Item-Title ChinaNet-Col-2">设备名称</label>
        <div class="Form-Item-Input ChinaNet-Col-5"><input type="text" id="inputSBName" class="Input-Control"></div>
    </div>
    <div class="ChinaNet-Form-Sheet">
        <label class="Form-Item-Title ChinaNet-Col-2">无线SSID</label>
        <div class="Form-Item-Input ChinaNet-Col-5"><input type="text" id="inputSSID" class="Input-Control"></div>
    </div>
    <div class="ChinaNet-Form-Sheet">
        <label class="Form-Item-Title ChinaNet-Col-2">组件版本</label>
        <div id="inputconver"  class="Form-Item-Label ChinaNet-Col-3">
        	
        </div>     
        <input type="text" class="Input-Control" id="converid" name="converid"> 
    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/deviceset.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$("#converid").hide();
		if(__DATA_PUBLIC_KEY != null)
			//alert(__DATA_PUBLIC_KEY);
			devicesetApp.init();
	 });
</script>