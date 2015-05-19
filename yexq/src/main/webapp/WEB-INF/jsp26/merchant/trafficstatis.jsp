<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div class="ChinaNet-Search-Body">
	<div class="ChinaNet-Form-Sheet">
        <div class="Form-Item-Select  ChinaNet-Col-3" style="overflow: hidden;">
            <input type="text" id="interfaceType" name="interfaceType">
        </div>
        <div class="Form-Item-Input ChinaNet-Col-2">
            <input type="text" class="Input-Control"  name="ChoiceStartDate" id="ChoiceStartDate" readonly="readonly" placeholder="选择起始日期" value="" />
        </div>
        <div class="Form-Item-Input ChinaNet-Col-2">
            <input type="text" class="Input-Control"  name="ChoiceEndDate" id="ChoiceEndDate" readonly="readonly" placeholder="选择结束日期" value="" />
        </div>
        <div class="ChinaNet-Col-2 ChinaNet-Left">
            <button id="btn_query_userstati" class="Form-Primary"><span>查询</span></button>
        </div>
	</div>
</div>
<div class="Statis-Chart-Body" id="StatisChartAll">

</div>
<div class="Statis-Chart-Body" id="StatisChartDetail" style="display: none;">
    <div class="Statis-Chart-Body-Item"></div>
    <div class="Statis-Chart-Body-Item"></div>
    <div class="Statis-Chart-Body-Item"></div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/trafficsstatis.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        var d = new Date();
        $("#ChoiceStartDate").datepicker({
            regional:"zh-CN",
            dateFormat: "yy-mm-dd",
            //defaultDate: 0,
            maxDate: 0
        });
        $("#ChoiceStartDate").datepicker('setDate', (new Date(d - 1000*60*60*24*7)));
        $("#ChoiceEndDate").datepicker({
            regional:"zh-CN",
            dateFormat: "yy-mm-dd",
            maxDate: 0
        });
        $("#ChoiceEndDate").datepicker('setDate', d);
        $("div.ui-datepicker").hide();
        trafficsstatisApp.init();
    });
</script>