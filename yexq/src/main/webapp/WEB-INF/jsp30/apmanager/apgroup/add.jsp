<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../../_ajaxKit.html"%>

<meta http-equiv="x-ua-compatible" content="IE=8" >
<title>查看AP组</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/lib/jquery/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/lib/dot/doT.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/address.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/ap/accessApChart.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/ap/apGruop.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/chinanet.js"></script>
<link media="screen" rel="stylesheet" href="${pageContext.request.contextPath}/statics/js/js3/artDialog/css/ui-dialog.css" type="text/css">
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/js3/artDialog/dist/dialog-min.js" ></script>
<%@ include file="../../_layer.jsp"%>
<script type="text/javascript">
var index = parent.layer.getFrameIndex(window.name);

$(document).ready(function() {
	//初始化
  	initLocationSelect();
  	initUnGroupAp();
  	bindAction();
});

function bindAction(){
	$("#backButton").bind('click',function(){
		parent.layer.close(index);
	});
	
	$("#unHaveRole").bind('dblclick',function(){
		copySelect('unHaveRole','haveRole');
	});
	
	$("#haveRole").bind('dblclick',function(){
		copySelect('haveRole','unHaveRole');
	});


}
function saveGroup(type){
	
	var group_name = document.getElementById("new_group_name").value;
	var note = document.getElementById("new_group_note").value;
	var province = document.getElementById("SelectDeviceProviceList").value;
	var city = document.getElementById("SelectDeviceCityList").value;
	var apids=[];
	var obj = document.getElementById("haveRole");
	var options = obj.options;
	for(var i=0,len=options.length;i<len;i++){
	    var opt = options[i];
	    apids.push(opt.value);
	}
	if (apids.length > 50) {
		layer.msg('设备添加不能超过50条',1,3);
		return false;
	}
	if(!isStr(group_name)){
		onAlertErrorTip('组名只能由中文、英文、数字、下划线组成', $('input#new_group_name')[0]);
        return false;
	}
	if(!onCheckMaxLength(group_name, 20)) {
        onAlertErrorTip('组名不能超过20个字符', $('input#new_group_name')[0]);
        return false;
    }
	if(!onCheckMaxLength(note, 200)) {
        onAlertErrorTip('备注不能超过200个字符', $('input#new_group_note')[0]);
        return false;
    }
	if(!isNotEmptyString(group_name)){
		onAlertErrorTip('组名不能为空', $('input#new_group_name')[0]);
        return false;
	}
	//加载层
	var index2 = parent.layer.load("数据保存中。。。", 0);
	 $.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/device/saveGroupInfo.htm',
		data : {
			group_name:group_name,
			note:note,
			province:province,
			city:city,
			device_ids:JSON.stringify(apids),
			type:type
		},
		
		success : function(data) {
			if(data.result == 'OK') {
				parent.initPageApGroup(1,parent.bindAction);
				parent.layer.msg('新增成功',1,3);
				parent.layer.close(index2);
				parent.layer.close(index);
			}else {
				parent.layer.msg(data.message,1,3);
				parent.layer.close(index2);
			}
		},
		error : function(data) {
			parent.layer.msg('提交失败',1,3);
		}
	}); 
}

function searchUnGroup() {
	var groupId = document.getElementById("search_groupId").value;
	initUnGroupAp(groupId);
	checkHasRepeat();
	$("#unHaveRole").bind('dblclick',function(){
		copySelect('unHaveRole','haveRole');
	});
}
</script>
<style type="text/css">
.addTd td{
	vertical-align:	middle;
	text-align: center;
	border: 0px none #FFFFFF;
	font-size: 12px;
	color: #003366;
}
.w50_per td{
	width: 50%;
}
.w48_per td{
	width: 48%;
}
table {
	width: 100%;
}
.addTd tr{
	background-color: #E2F2FD;
}
.inputshow{
	float: left;
}
ul, li{
	list-style-type:none;
	margin: 0;
	padding: 0;
}
li{
	float: left;
}
.selectAP{
	width: 340px;
	height: 150px;
}
</style>
</head>
<body>
<div>
	<div>
		<table class="addTd">
			<tr>
				<td style="width: 33%">组名</td>
				<td class="inputshow"><input name="group_name" id="new_group_name" type="text" ></td>
			</tr>
			<tr>
				<td>地区</td>
				<td class="inputshow">
				<select class="form-control" name="province" id = "SelectDeviceProviceList"   onchange="loadCity();">
					<s:iterator value="userList">
					</s:iterator>
				</select>
				<select class="form-control" name="city" id = "SelectDeviceCityList">
					<s:iterator value="userList">
					<option value=''><s:property value="userName"/></option>
				</s:iterator>
				</select>
				<select class="form-control" name="county" id = "SelectDeviceCountyList">
					<s:iterator value="userList">
					<option value=''><s:property value="userName"/></option>
					</s:iterator>
				</select>					
				</td>
			</tr>
			<tr>
				<td>备注</td>
				<td  class="inputshow"><textarea name="note" id ="new_group_note" rows="3" cols="22"></textarea></td>
			</tr>
		</table>
	</div>
	<div>
		<table class="w50_per">
		<tr>
			<td>未拥有虚拟AP组</td>
			<td>已拥有虚拟AP组</td>
		</tr>
		<tr>
			<td><input id="search_groupId" type="text"><button style="margin-left: 10px;" onclick="searchUnGroup();">搜索</button></td>
		</tr>
		</table>
	</div>
	<ul style="height: 150px;">
			<li id="apUnGroup_div"></li>
			</li>
			<li style="width: 34px;margin: 0 10px 0 10px;position: relative;">
				<input type="button" value=" >> " onclick="copySelect('unHaveRole','haveRole')" name="B1" style="padding:0px;width:34px">
				</br></br>
				<input type="button" value=" << " onclick="copySelect('haveRole','unHaveRole')" name="B2"style="padding:0px;width:34px">
			</li>	
			<li>
				<select multiple style="height: 150px; width:330px;" id="haveRole" name="deviceIds">
				</select>
			</li>
			</ul>
	<div>
		<input id="submitButton" name="submit" type="button" onclick="saveGroup('add')" value="保存"/>
		<input id="backButton" name="back" type="button" value="取消" />
	</div>
</div>
</body>
<script id="apUnGroup" type="text/x-dot-template">
	<select multiple style="height: 150px; width:330px;"  id="unHaveRole" name="unHaveRole">
	{{~it.records:Ap:index}}
		<option value='{{=Ap.deviceId}}'>
			<span>
			{{=Ap.deviceId}}
</span><span>【
			{{? Ap.type == "FIT_AP"}}
				瘦AP
			{{?? Ap.type == "FAT_AP"}}
				胖AP
			{{?? Ap.type == "BAS"}}
				专用BAS
			{{??}}
				{{=Ap.type}}
			{{?}}】</span>
		</option>
	{{~}}
	</select>			
</script>
</html>