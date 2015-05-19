<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ChinaNet-Free-Body">
    <div class="ChinaNet-Form-Sheet">
        <div class="Form-Item-Input ChinaNet-Col-3">
            <input id="locationKeywords" class="Input-Control" type="text"
                placeholder="输入关键字">
        </div>
        <!-- <div class="ChinaNet-Left ChinaNet-Col-3">
            <input type="text" id="DeviceStatussyn" name="DeviceStatussyn">
        </div> -->
        <div class="ChinaNet-Col-2 ChinaNet-Left">
            <button id="btn_search_location" class="Form-Primary">
                <span>查询</span>
            </button>
        </div>
    </div>
    <div class="ChinaNet-Form-Sheet">
		<div id="div_new_province" class="Form-Item-Select ChinaNet-Col-1.5">
			<input type="text" id="select_new_province" name="select_new_province" placeholder="请选择省">
		</div>
		<div id="div_new_city" class="Form-Item-Select ChinaNet-Col-1.5">
			<input type="text" id="select_new_city" name="select_new_city" placeholder="请选择市">
		</div>
		<div id="div_new_county" class="Form-Item-Select ChinaNet-Col-1.5">
			<input type="text" id="select_new_county" name="select_new_county" placeholder="请选择区县">
		</div>
		<div id="div_new_address" class="Form-Item-Input ChinaNet-Col-3">
			<input type="text" class="Input-Control" id="input_new_address" placeholder="请输入街道名">
		</div>
		<div class="ChinaNet-Col-1 ChinaNet-Left">
              <button id="btn_new_location" class="Form-Important"><span>添加新地址</span></button>
        </div>
    </div> 
    <div class="ChinaNet-Free-Table">
        <table>
            <tr class="ChinaNet-Table-Title">
              <th width="90%">所在地</th>
              <th></th>
            </tr>
            <tbody id="location_list_body">
            </tbody>
        </table>
    </div>
    <!-- Page Line -->
    <div class="ChinaNet-Page-Table">
        <a id="a_pagination_previous_location"> 
            <span class="Overly-Left"></span>
            <span class="Overly-Right"></span> 
            <span>前一页</span>
        </a> 
        <a href="javascript:;" class="Active"> 
            <span class="Overly-Left"></span> 
            <span class="Overly-Right"></span> 
            <span id="lb_pagenumber_location">0</span>
        </a> 
        <a id="a_pagination_next_location"> 
            <span class="Overly-Left"></span> 
            <span class="Overly-Right"></span> 
            <span>后一页</span>
        </a>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/devicemerchantlocation.js"></script>
<script type="text/javascript">
	var _AccountID='${accountId}';
	var _DeviceID='${deviceId}';
    $(document).ready(function(){        
        devicemerchantlocationApp.init();
     });
</script>