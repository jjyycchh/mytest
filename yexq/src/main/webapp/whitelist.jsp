<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>白名单</title>
<script type="text/javascript" src="/statics/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript">

	// 删除白名单
	function deleteWhite(mac){
		$.ajax({
			type :"POST",
			url :"/user/removefromwhite.htm",
			data :{
				mac : mac
			},
			dataType:"json",
			success:function(data) {
				if("OK"==data.result){
					alert(data.result);
				}else {
					alert(data.message);
				}
			}
		})
	}
		
	//删除黑名单
	function deleteBlack(mac, userId) {
		$.ajax({
			type :"POST",
			url :"/user/removefromblack.htm",
			data :{
				mac : mac,
				terminal_user_id : userId
			},
			dataType:"json",
			success:function(data) {
				if("OK"==data.result){
					alert(data.result);
				}else {
					alert(data.message);
				}
			}
		})
	}
	
	$(function(){
		
		// 检索白名单
		$("#selectWhite").click(function(){
			$.ajax({
				type :"GET",
				url :"/user/whitelist.htm",
				data :{
					keywords : $("#accountId").val() 
				},
				dataType:"json",
				success:function(data) {
					var html = [];
					var whitelist = data.records;
					for(var i=0; i<whitelist.length; i++){
						html.push('<tr>');
							html.push('<td width="150px">', whitelist[i].accountId, '</td>');
							html.push('<td width="150px">', whitelist[i].phone_number, '</td>');
							html.push('<td width="150px">', whitelist[i].mac, '</td>');
							html.push('<td width="150px">', whitelist[i].create_datetime, '</td>');
							html.push('<td width="150px">', whitelist[i].last_login_date, '</td>');
							html.push('<td width="150px">', whitelist[i].is_member, '</td>');
							html.push('<td width="150px"><button onclick="deleteWhite(\'',whitelist[i].mac,'\')">删除</button></td>');
						html.push('</tr>');
					}
					$('table tbody').append(html.join(''));
					if("OK"==data.result){
						alert(data.result);
					}else {
						alert(data.message);
					}
					
				},
				error:function() {
					
				}
			})
		})
		
		// 添加白名单
		$("#addWhite").click(function(){
			$.ajax({
				type :"POST",
				url :"/user/addmactowhite.htm",
				data :{
					mac : $("#mac").val(),
					phone_number : $("#phoneNumber").val(),
					terminal_user_id : $("#termanilUerId").val()
				},
				dataType:"json",
				success:function(data){
					if("OK"==data.result){
						alert(data.result);
					}else {
						alert(data.message);
					}
				},
				error:function(){
					
				}
			})
		})

		// 添加所有设备到白名单adduserdevstowhite
		$("#addAllWhite").click(function(){
			$.ajax({
				type :"POST",
				url :"/user/adduserdevstowhite.htm",
				data :{
					phone_number : $("#phoneNumber").val(),
					terminal_user_id : $("#termanilUerId").val()
				},
				dataType:"json",
				success:function(data){
					if("OK"==data.result){
						alert(data.result);
					}else {
						alert(data.message);
					}
				},
				error:function(){
					
				}
			})
		})
		
		// 检索黑名单
		$("#selectBlack").click(function(){
			$.ajax({
				type :"GET",
				url :"/user/blacklist.htm",
				data :{
					keywords : $("#accountId").val() 
				},
				dataType:"json",
				success:function(data) {
					var html = [];
					var blacklist = data.records;
					for(var i=0; i<blacklist.length; i++){
						html.push('<tr>');
							html.push('<td width="150px">', blacklist[i].accountId, '</td>');
							html.push('<td width="150px">', blacklist[i].phone_number, '</td>');
							html.push('<td width="150px">', blacklist[i].mac, '</td>');
							html.push('<td width="150px">', blacklist[i].create_datetime, '</td>');
							html.push('<td width="150px">', blacklist[i].last_login_time, '</td>');
							html.push('<td width="150px">', blacklist[i].is_member, '</td>');
							html.push('<td width="150px"><button onclick="deleteBlack(\'',blacklist[i].mac,'\',\'',blacklist[i].terminal_user_id,'\')">删除</button></td>');
						html.push('</tr>');
					}
					$('table tbody').append(html.join(''));
					if("OK"==data.result){
						alert(data.result);
					}else {
						alert(data.message);
					}
				},
				error:function() {
					
				}
			})
		})
		
		// 添加黑名单
		$("#addBlack").click(function(){
			$.ajax({
				type :"POST",
				url :"/user/addmactoblack.htm",
				data :{
					mac : $("#mac").val(),
					phone_number : $("#phoneNumber").val(),
					terminal_user_id : $("#termanilUerId").val()
				},
				dataType:"json",
				success:function(data) {
					if("OK"==data.result){
						alert(data.result);
					}else {
						alert(data.message);
					}
				},
				error:function() {
					
				}
			})
		})
		
		
		// 添加所有设备到黑名单adduserdevtoblack
		$("#addAllBlack").click(function(){
			$.ajax({
				type :"POST",
				url :"/user/adduserdevtoblack.htm",
				data :{
					phone_number : $("#phoneNumber").val(),
					terminal_user_id : $("#termanilUerId").val()
				},
				dataType:"json",
				success:function(data){
					if("OK"==data.result){
						alert(data.result);
					}else {
						alert(data.message);
					}
				},
				error:function(){
					
				}
			})
		})
	})
</script>
</head>
<body>
	<button id="selectWhite">查询白名单</button>   <button id="selectBlack">查询黑名单</button><br><br>
	名单列表<br>
	<table>
		<tr>
			<td width="150px">accountId</td>
			<td width="150px">phoneNumber</td>
			<td width="150px">mac</td>
			<td width="150px">createDateTime</td>
			<td width="150px">lastLoginTime</td>
			<td width="150px">isMember</td>
			<td width="150px">action</td>
		</tr>
	</table>
	
	<form>
		accountId:<input id="accountId" type="text"/><br>
		mac:<input id="mac" type="text"/><br>
		phoneNumber:<input id="phoneNumber" type="text"/><br>
		termanilUerId:<input id="termanilUerId" type="text"/><br>
		<input id="addWhite" type="submit" value="添加白名单">
		<input id="addBlack" type="submit" value="添加黑名单">
		<input id="addAllWhite" type="submit" value="添加所有到白名单">
		<input id="addAllBlack" type="submit" value="添加所有到黑名单">
		
	</form>
	
</body>
</html>