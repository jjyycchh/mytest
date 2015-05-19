<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>虚拟AP组管理</title>
<%@ include file="../../head.html" %>
<%@ include file="../../_layer.jsp"%>

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
.listTD02 a{
	margin: 0 5px 0 5px;
}
.pageP {
	float: right;
}
.bottom {
	margin-top: 10px;
}
</style>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/ap/accessApChart.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/ap/apGruop.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/chinanet.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	//初始化
  	initPageApGroup(1,bindAction);
  	initLocationSelect();
	$("#addGroup").bind('click',function(){
		layerKit.iframe('添加AP组','add_apgroup.htm',750,450);
	});
});
function bindAction(){
	$(".show").bind('click',function(){
		var thisId = $(this).attr("value");
		layerKit.iframe('虚拟AP组详情','show_apgroup.htm?thisId='+thisId,750,500);
	});
	
	$(".edit").bind('click',function(){
		var thisId = $(this).attr("value");
		layerKit.iframe('虚拟AP组编辑','edit_apgroup.htm?thisId='+thisId,750,500);
	});
		
	$(".delete").bind('click',function(){
		layerKit.confirm(function(){
			selected_subaccts = [];
			var group_id = $(".delete").attr("value");
			selected_subaccts.push(group_id);
			deleteGroup(selected_subaccts);
			
		},function(){
		});
	});
	
	$("#batchDeleteGroup").bind('click',function(){
  		layerKit.confirm(function(){
  			selected_subaccts = [];
	    	$('input[class="delete_check"]:checked').each(function(){    
	    		selected_subaccts.push(this.value);
	     	  }); 
	    	
	    	if (selected_subaccts.length == 0) {
	    		layer.msg('请至少选择一个AP组',1,3);
	    		return false;
	    	}
	    	deleteGroup(selected_subaccts);
  		},function(){
  		});
  	});
	
	$(".delete_check").bind('click',function(){
		if(!this.checked){
			$("#alldelete")[0].checked = false;
		}
	});
	
	$("#alldelete").bind('click',function(){
		//如果存在列表
		if($(".delete_check").length > 0){
			if(this.checked){
				for(var i = 0; i < $(".delete_check").length; i++)
					$(".delete_check")[i].checked = true;
			}else{
				for(var i = 0; i < $(".delete_check").length; i++)
					$(".delete_check")[i].checked = false;
			}
		}
	});
}
function deleteGroup(selected_subaccts) {
	$.ajax({
	type : 'GET',
	dataType : 'json',
	url : '/device/apgroupdelete.htm',
	data : {
		groupids:JSON.stringify(selected_subaccts)
	},
	success : function(data) {
		if(data.result == 'OK') {
			initPageApGroup(1,bindAction);
			layer.msg('删除成功', 1, 3);
		}else {
			alert(data.message);
		}
	},
	error : function(data) {
		layer.msg('删除失败', 1, 3);
	}
});
}
</script>
</head>
<body>
<div class="contentMain">
	<div class="nav_form">
	    	<div class="form-group">
		     	<label>关键字：</label>
		      	<input class="form-control" type="text" name="keywords" id="keywords" maxlength="40" styleId="keywords" size="20"  placeholder="请输入关键字"/>	
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
	   			<button onclick="initPageApGroup(1,bindAction)" class="btn btn-success" >搜索</button>
			</div>
			<div class="form-group">
	   			<button  onclick="reset()" class="btn btn-warning">重置</button>
			</div>
	   		<div class="form-group pageP">
	   			<button id="addGroup" class="btn btn-warning ">添加组</button>
			</div>
	</div>
	<div class="clear"></div>
	<table class="table" >
		<tr valign="top">
			<td height="243">
				<table id="data_group_list_div" class="table"></table>
				<div class="bottom">
					<button id="batchDeleteGroup">删除</button>
					<div id="page_div" class="pageP"></div>
				</div>
			</td>
		</tr>
	</table>
</div>

</body>
<script id="dataGroupList_template" type="text/x-dot-template">
	<tr>
		<td class="qryTDTitle1"><input id="alldelete" type="checkbox"></td>
		<td class="qryTDTitle1">虚拟AP组</td>
		<td class="qryTDTitle1">所在地</td>
		<td class="qryTDTitle1">操作</td>
	</tr>
	{{~it.records:Ap:index}}
		<tr class="ListTrStyle_2">
			 
			<td class="listTD02"><input class="delete_check" type="checkbox" value="{{=Ap.groupId}}"></td>
			
			<td class="listTD02">{{=Ap.groupName}}</td>			
			{{? Ap.province == ""}}
				<td class="listTD02"></td>
			{{?? Ap.city == ""}}
				<td class="listTD02">{{=Ap.province}}</td>
			{{??}}
				<td class="listTD02">{{=Ap.province}}--{{=Ap.city}}</td>
			{{?}}
			<td class="listTD02" style="cursor:pointer;">
				<a  class="show" value="{{=Ap.groupId}}">详情</a>
				<a  class="edit" value="{{=Ap.groupId}}">编辑</a>
				<a  class="delete" value="{{=Ap.groupId}}">删除</a>
			</td>
		</tr>
	{{~}}
</script>
</html>