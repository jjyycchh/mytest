<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ChinaNet-Free-Body">
	<div class="ChinaNet-Form-Sheet">
		<div class="Form-Item-Input ChinaNet-Col-3">
			<input id="synkeywords" class="Input-Control" type="text"
				placeholder="输入关键字">
		</div>
		<div class="ChinaNet-Left ChinaNet-Col-3">
			<input type="text" id="DeviceStatussyn" name="DeviceStatussyn">
		</div>
		<div class="ChinaNet-Col-2 ChinaNet-Left">
			<button id="btn_search_devicesyn" class="Form-Primary">
				<span>查询</span>
			</button>
		</div>
	</div>
	<div class="ChinaNet-Free-Table">
		<table>
			<tr class="ChinaNet-Table-Title">

              <th width="10%"></th>
              <th width="60%">设备ID</th>
              <th width="30%">设备名称</th>             
              
            </tr>
			<tbody id="devicelist_body">

			</tbody>
		</table>
	</div>
	<!-- Page Line -->
	<div class="ChinaNet-Page-Table">
		<a id="a_pagination_previous_syn"> 
			<span class="Overly-Left"></span>
			<span class="Overly-Right"></span> 
			<span>前一页</span>
		</a> 
		<a href="javascript:;" class="Active"> 
			<span class="Overly-Left"></span> 
			<span class="Overly-Right"></span> 
			<span id="lb_pagenumber_syn">0</span>
		</a> 
		<a id="a_pagination_next_syn"> 
			<span class="Overly-Left"></span> 
			<span class="Overly-Right"></span> 
			<span>后一页</span>
		</a>
	</div>
	<!-- Page Line -->
</div>



<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/devicelist.js"></script>
<script type="text/javascript">
	$(document).ready(function(){		
		devicelistApp.init();
	 });
</script>