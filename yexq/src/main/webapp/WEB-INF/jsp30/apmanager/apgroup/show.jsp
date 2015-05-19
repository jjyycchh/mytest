<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>虚拟AP组详情</title>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/css3/zzsoft.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/lib/jquery/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/lib/dot/doT.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/address.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/ap/accessApChart.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/ap/apGruop.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	//初始化
  	initLocationSelect();
	var groupId =${groupId};
  	initgroupdetail(groupId);
  	if($(".inputshow select option")[0].text == "")
  		$("#province").css('display', 'none');
  	if($(".inputshow select option")[1].text == "")
  		$("#city").css('display', 'none');
});

</script>
<style type="text/css">
table td{
	vertical-align:	middle;
	text-align: center;
	border: 0px none #FFFFFF;
	font-size: 12px;
	color: #003366;
}
.w50_per td{
	width: 50%;
}
table {
	width: 100%;
}
table tr{
	background-color: #E2F2FD;
}
.inputshow{
	float: left;
}
</style>
</head>
<body>
<div>
	<div id="data_group_content_div"></div>
	<div><table  class="table"><tr><td class="qryTDTitle1left">虚拟AP列表</td></tr></table></div>
	<div id="data_group_show_div"></div>
</div>
</body>
<!-- doT.js模板-设备列表 -->
<script id="deviceList" type="text/x-dot-template">
<table>
	<tr>
		<td>设备ID</td>
		<td>类型</td>
		<td>所属组</td>
		<td>所属账号</td>
		<td>设备MAC</td>
		<td>所属地</td>
		<td>品牌型号</td>
		<td>创建时间</td>
	</tr>
	{{~it.records:Ap:index}}
	<tr>
		<td>{{=Ap.deviceId}}</td>
		<td>{{=Ap.type}}</td>
		<td>{{=Ap.groupName}}</td>
		<td>
			{{? Ap.manufacturerId != 0}}
				{{=Ap.manufacturerId}}
			{{?}}
		</td>
		<td>{{=Ap.mac}}</td>
		{{? Ap.city == ""}}
			<td>{{=Ap.province}}</td>
		{{??}}
			<td>{{=Ap.province}}--{{=Ap.city}}</td>
		{{?}}		
		<td>{{=Ap.brand}}/{{=Ap.model}}</td>
		<td>{{=Ap.createDatetime}}</td>
	</tr>
	{{~}}
</table>
</script>
<script id="apGroupShow" type="text/x-dot-template">
<table class="w50_per">
	<tr>
		<td>组名</td>
		<td class="inputshow"><input type="text" value="{{=it.record.groupName}}" disabled="true"></td>
	</tr>
	<tr>
		<td>地区</td>
		<td class="inputshow">
		<select onchange="loadCity();" disabled="true" id="province">
			<option value=''>{{=it.record.province}}</option>
		</select>
		<select disabled="true" id="city">
			<option value=''>{{=it.record.city}}</option>
		</select>
		</td>
		</tr>
		<tr>
		<td>备注</td>
			<td class="inputshow"><textarea rows="3" cols="22" disabled="true">{{=it.record.note}}</textarea></td>
		</tr>
</table>
</script>
</html>