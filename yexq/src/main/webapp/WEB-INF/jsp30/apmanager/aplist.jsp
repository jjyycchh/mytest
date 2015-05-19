<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../head.html" %>
<style>
.contentMain{
	margin: 0;
}
.form-group{
	float: left;
	margin: 0 5px 0 5px;
	font-size: 16px;
}
.form-group label{
	margin-top: 5px;
}
.clear{
	clear:both;
	float: none;
}
.table{
	width: 100%;
}
.nav_form{
	margin-top: 10px;
}
</style>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/ap/accessApChart.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/address.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/chinanet.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	initPage(1);
	initLocationSelect();
	enterSubmit();
});
</script>
<body>
<div class="contentMain">
	<div class="nav_form">
	    	<div class="form-group">
		     	<label>关键字：</label>
		      	<input class="form-control" type="text" name="keywords" id="keywords" maxlength="40" styleId="keywords" size="20"  placeholder="请输入关键字"/>	
	   		</div>
	   		<div class="form-group">
		     	<label>类型：</label>
				<select class="form-control" name="type" id="type" styleClass="textfield60"> 
					<option value="">请选择</option>
					<option value="FAT_AP">胖AP</option>
					<option value="FIT_AP">瘦AP</option>
					<option value="AC">AC</option>
					<option value="BAS">专用BAS</option>
				</select>	     	
	   		</div>
	   		<div class="form-group">
		     	<label>所属地：</label>
				<select class="form-control" name="SelectDeviceProviceList" id = "SelectDeviceProviceList"   onchange="loadCity();">
					<s:iterator value="userList">
					<!-- <option value=''><s:property value="userName"/></option> -->
					</s:iterator>
				</select>
				<select class="form-control" name="SelectDeviceCityList" id = "SelectDeviceCityList"  <%-- onchange="loadCountyList();" --%>>
					<s:iterator value="userList">
					<option value=''><s:property value="userName"/></option>
				</s:iterator>
				</select>
				<select class="form-control" name="SelectDeviceCountyList" id = "SelectDeviceCountyList">
					<s:iterator value="userList">
					<option value=''><s:property value="userName"/></option>
					</s:iterator>
				</select>    	
	   		</div>
	   		<div class="form-group">
	   			<button onclick="doSubmit(document.forms[0])" class="btn btn-success" >搜索</button>
			</div>
	   		<div class="form-group">
	   			<button  onclick="reset(1)" class="btn btn-warning">重置</button>
			</div>
	</div>
	<div class="clear"></div>
	<table class="table" >
		<tr valign="top">
			<td height="243">
				<table id="data_list_div" class="table"></table>
				<div id="page_div" style="float: right;margin-top: 10px;"></div>
			</td>
		</tr>
	</table>
	
</div>
</body>
<script type="text/javascript">
	var queryParams = {};
</script>
<script id="dataList_template" type="text/x-dot-template">
	<tr>
		<td class="qryTDTitle1">设备ID</td>
		<td class="qryTDTitle1">类型</td>
		<td class="qryTDTitle1">所属组</td>
		<td class="qryTDTitle1">所属帐号</td>
		<td class="qryTDTitle1">设备MAC地址</td>
		<td class="qryTDTitle1">所在地</td>
		<td class="qryTDTitle1">品牌/型号</td>
		<td class="qryTDTitle1">创建时间</td>
		<td class="qryTDTitle1">操作</td>
	</tr>
	{{~it.records:Ap:index}}
		<tr class="ListTrStyle_2""
			onMouseOver="this.className='ListTrStyle_1';"
			onMouseOut="this.className='ListTrStyle_2';">
			 
			<td class="listTD02">{{=Ap.deviceId}}</td>
			{{? Ap.type == "FIT_AP"}}
				<td class="listTD02">瘦AP</td>
			{{?? Ap.type == "FAT_AP"}}
				<td class="listTD02">胖AP</td>
			{{?? Ap.type == "BAS"}}
				<td class="listTD02">专用BAS</td>
			{{??}}
				<td class="listTD02">{{=Ap.type}}</td>
			{{?}}
			
			<td class="listTD02">{{=Ap.groupName}}</td>		
			<td class="listTD02">
				{{? Ap.manufacturerId != 0}}
					{{=Ap.manufacturerId}}
				{{?}}
			</td>	
			<td class="listTD02">{{=Ap.mac}}</td>
			{{? Ap.city == ""}}
				<td class="listTD02">{{=Ap.province}}</td
			{{??}}
				<td class="listTD02">{{=Ap.province}}--{{=Ap.city}}</td>
			{{?}}
			<td class="listTD02">{{=Ap.brand}}/{{=Ap.model}}</td>
			<td class="listTD02">{{=Ap.createDatetime}}</td>
			<td class="listTD02" style="cursor:pointer;"><a  id="{{=Ap.deviceId}}" name="{{=Ap.type}}" onclick="showhideinfo(this)">详情</a></td>
		</tr>
	{{~}}
</script>
</html>