<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div class="ChinaNet-Search-Body">
	<div class="ChinaNet-Form-Sheet">
		<div class="Form-Item-Input ChinaNet-Col-2">
			<input type="text" class="Input-Control"  name="ChoiceDate" id="ChoiceDate" readonly="readonly" placeholder="选择日期" value="" />
		</div>
		<div id="divmerlist" class="Form-Item-Select  ChinaNet-Col-3">
			<input type="text" id="merchantList" name="merchantList">			
		</div>
		<div id="divdevlist" class="Form-Item-Select  ChinaNet-Col-3">
			<input type="text" id="deviceList" name="deviceList">			
		</div>
		<div class="ChinaNet-Col-2 ChinaNet-Left">
            <button id="btn_search_userstati" class="Form-Primary"><span>查询</span></button>
        </div>
	</div>
</div>

<div class="Statis-Body">
	<div class="Statis-Body-Guest"></div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/trafficsstatis.js"></script>        
<script type="text/javascript">
    $(document).ready(function(){
        trafficsstatisApp.init();
        $("#ChoiceDate").datepicker({
        	regional:"zh-CN",
        	/* showOn: "button",
        	buttonImage: "./css/images/icon_calendar.gif",
			buttonImageOnly: true, */
			dateFormat: "yy-mm-dd"
        });
        $("div.ui-datepicker").hide();
        $("#ChoiceDate").datepicker('setDate', (new Date()));
    });
</script>