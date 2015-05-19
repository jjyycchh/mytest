<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">

<style>
.wifi-portal-body{
padding-bottom:50px;
}
.tp-label-LOGIN{
	background-color: #89C4F4;
}
.statulb{border-radius: 0 !important;font-size: 85%;}
.table > tbody > tr > td{
vertical-align: middle;
}

.modal-dialog {width:600px;}
.modal-dialog-del {width:380px;}
.modal .modal-header {
  border-bottom: none;
  position: relative;
  padding:10px;
}
.modal .modal-header .btn {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
}
.modal .modal-footer {
  padding: 10px 20px;
}
.modal .modal-body {
  padding: 5px 20px;
}
hr.modal-inner-separator
{
    clear: both;
    margin-top: 10px;
    margin-bottom: 13px;
    border: 0;
    height: 1px;
    background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
    background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
    background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
    background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}

</style>

<div class="clear-line"></div>
<div class="wifi-portal-body">
	<div class="portal-menu">
		<a
			href="${pageContext.request.contextPath}/system/system_management.htm">平台设置<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/system/portaltemplatemanagement.htm">模板设置<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/system/systemthirdpartaccess.htm">第三方接入<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/system/publishcomponent.htm">组件库<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/system/super_searchsms.htm">短信查询<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/user/super_authen_mgmt.htm">用户认证记录<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/system/super_exception_log.htm">异常日志导出<span 
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/system/super_device_status.htm" 
			class="active">设备状态查询<span class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/system/letsmakeitinaneasyway.htm" >设备导入<span 
			class="glyphicon glyphicon-circle-arrow-right"></span>		
		</a>
	</div>
	<div class="portal-main">
		<div class="wifi-main-header">
			<form id="siteSearch" class="wp-site-search" role="search">
				<div class="col-xs-3">
                	<input type="text" class="form-control" name="keywords"
						id="keywords" placeholder="输入关键字查询">
            	</div>
				<div class="col-xs-3 col-dx-5">
					<div class="input-group date form_date col-md-10" data-date=""
						data-date-format="yyyy-mm-dd" data-link-field="startdate_input"
						data-link-format="yyyy-mm-dd">
						<input class="form-control" name="startdate" id="startdate"
							size="16" type="text" value="" readonly> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
					<input type="hidden" id="startdate_input" value="" />
				</div>
				<div class="col-xs-3 col-dx-5">
					<div class="input-group date form_date col-md-10" data-date=""
						data-date-format="yyyy-mm-dd" data-link-field="enddate_input"
						data-link-format="yyyy-mm-dd">
						<input class="form-control" name="enddate" id="enddate" size="16"
							type="text" value="" readonly> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
					<input type="hidden" id="enddate_input" value="" />
				</div>
				<div class="form-group col-xs-2 col-bx-1">
					<select id="device_status" name="status" class="form-control">
						<option value="none">全部</option>   
        				<option value="active">已激活</option>   
        				<option value="unactive">未激活</option>
					</select>
				</div>
				<div class="col-xs-1 col-bx-1">
					<button id="btn_search_device" type="button"
						class="btn btn-info">
						<span class="glyphicon glyphicon-search"></span> 查询
					</button>
				</div>
			</form>
		</div>
		<div class="clear-line"></div>
		<div id="active_device_list" style="margin-bottom: 2px" class="portlet box green">
			<div class="portlet-title">
				<div class="caption">
					<i class="glyphicon glyphicon-qrcode"></i>已激活设备列表
				</div>
				<div class="tools">
				</div>
			</div>
			<div id="Devicetab" class="portlet-body">
				<table class="table table-hover">
					<thead>
						<tr>
							<th  width="18%">MAC</th>
							<th  width="12%">品牌</th>
							<th  width="16%">型号</th>
							<th  width="16%">固件版本</th>
							<th  width="20%">所在地</th>
							<th>激活时间</th>
						</tr>
					</thead>
					<tbody id="tbl_Active_Device_lst">
					</tbody>
				</table>
			</div>
			<div class="panel-footer">
				<div class="row">
					<div class="col-md-6">
						<h6>
							第 <span class="label label-info" id="lb_pagenumber"></span> 页
						</h6>
					</div>
					<div class="col-md-6">
						<div id="div_pagination" class="col-md-offset-3">
							<ul id="ul_pagination" class="pager">
								<li><a id="a_pagination_previous" style="cursor: pointer;">
										前一页 </a></li>
								<li><a id="a_pagination_next" style="cursor: pointer;">
										后一页 </a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="clear_line" class="clear-line"></div>
		<div id="unactive_device_list" style="margin-bottom: 2px" class="portlet box red">
			<div class="portlet-title">
				<div class="caption">
					<i class="glyphicon glyphicon-qrcode"></i>未激活设备列表
				</div>
				<div class="tools">
				</div>
			</div>
			<div id="Devicetab_unactive" class="portlet-body">
				<table class="table table-hover">
					<thead>
						<tr>
							<th  width="18%">MAC</th>
							<th  width="12%">品牌</th>
							<th  width="16%">型号</th>
							<th  width="16%">固件版本</th>
							<th  width="20%">所在地</th>
							<th>入库时间</th>
						</tr>
					</thead>
					<tbody id="tbl_Unactive_Device_lst">
					</tbody>
				</table>
			</div>
			<div class="panel-footer">
				<div class="row">
					<div class="col-md-6">
						<h6>
							第 <span class="label label-info" id="lb_pagenumber_unactive"></span> 页
						</h6>
					</div>
					<div class="col-md-6">
						<div id="div_pagination" class="col-md-offset-3">
							<ul id="ul_pagination" class="pager">
								<li><a id="a_pagination_previous_unactive" style="cursor: pointer;">
										前一页 </a></li>
								<li><a id="a_pagination_next_unactive" style="cursor: pointer;">
										后一页 </a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
</div>
<!-- /.modal -->

<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script type="text/javascript">statisJS.init();</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript">
   //MAIN_MENU.setActiveMenuItem("id_mm_account");
	
	var deciveSearchHandler = null;
	var unactiveDeciveSearchHandler = null;
	var search_smsMgs_keyword = null;
	var smsMsg_id = null;
	var sms_mumber = null;

	$(document).ready(function() {
		var myDate = new Date();
		
		$('.form_date').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0,
			pickerPosition:"bottom-left"
		});	
		activeDeciveSearchHandler = new searchUtil(generateDeviceListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_Active_Device_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"${pageContext.request.contextPath}/system/super_device_search.htm", "Devicetab");
		
		unactiveDeciveSearchHandler = new searchUtil(generateDeviceListHtmlUnactive, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_Unactive_Device_lst", "lb_pagenumber_unactive", "a_pagination_previous_unactive", "a_pagination_next_unactive",
				"${pageContext.request.contextPath}/system/super_unactive_device_search.htm", "Devicetab_unactive");
		
	
		activeDeciveSearchHandler.searchWithPreload();
		unactiveDeciveSearchHandler.searchWithPreload();
				
		$("#btn_search_device").click(function() {
			var options=$("#device_status option:selected"); 
			if (options.val() == "none") {
				$("#active_device_list").show();
				$("#clear_line").show();
				$("#unactive_device_list").show();
				keywordsSearch();
				keywordsSearchUnactive();
			} else if(options.val() == "active") {
				$("#active_device_list").show();
				$("#clear_line").hide();
				$("#unactive_device_list").hide();
				keywordsSearch();
			} else if(options.val() == "unactive") {
				$("#active_device_list").hide();
				$("#clear_line").hide();
				$("#unactive_device_list").show();
				keywordsSearchUnactive();
			}
		});  

	});
	
	function keywordsSearch() {		
		var keywords = activeDeciveSearchHandler.convertKeywordsSearchable($("#keywords").val());
		activeDeciveSearchHandler.setSearchParemeter('keywords', keywords);
		activeDeciveSearchHandler.setSearchParemeter('startdate',  $("#startdate_input").val());
		activeDeciveSearchHandler.setSearchParemeter('enddate', $("#enddate_input").val());				
		activeDeciveSearchHandler.searchWithPreload();
	}
	
	function keywordsSearchUnactive() {		
		var keywords = unactiveDeciveSearchHandler.convertKeywordsSearchable($("#keywords").val());
		unactiveDeciveSearchHandler.setSearchParemeter('keywords', keywords);
		unactiveDeciveSearchHandler.setSearchParemeter('startdate',  $("#startdate_input").val());
		unactiveDeciveSearchHandler.setSearchParemeter('enddate', $("#enddate_input").val());				
		unactiveDeciveSearchHandler.searchWithPreload();
	}
	
	function postPageChange() {
		var my_posts = $("[rel=tooltip]");
	    for(i=0;i<my_posts.length;i++){
	        the_post = $(my_posts[i]);	        
	        the_post.tooltip({ placement: 'bottom'});
	        the_post.css("cursor","pointer"); 
	    }
	}

	function searchFailCallBack(result, message) {
        $.pnotify({
            title: "设备数据加载失败",
            text: message,
            type: 'error'
        });
	}
	
	function searchErrorCallBack(result, message) {
        $.pnotify({
            title: "无法连接服务器",
            text: "加载设备数据请求提交失败！" + message,
            type: 'error'
        });
	}

	function generateDeviceListHtml(deviceList) {
		var deviceListHtml = "";		
		if (deviceList.length > 0) {			
			for (var i = 0; i < deviceList.length;i++) {
				var id = deviceList[i].deviceId;
				var mac = deviceList[i].mac;
				var brand = deviceList[i].brand;
				var model = deviceList[i].model;
				var framewareVersion = deviceList[i].framewareVersion;
				var location = deviceList[i].country + " " + 
						deviceList[i].province + " " + 
						deviceList[i].city;
				var createDatetime = deviceList[i].createDatetime;
				
				deviceListHtml += "<tr>"
				deviceListHtml +=     "<td id='device_mac_" + id + "'>" + mac + "</td>";
				deviceListHtml +=     "<td id='device_brand_" + id + "'>" + brand + "</td>";
				deviceListHtml +=     "<td id='device_model_" + id + "'>" + model + "</td>"; 
				deviceListHtml +=     "<td id='device_framewareVersion_" + id + "'>" + framewareVersion + "</td>"; 
				deviceListHtml +=     "<td id='device_location_" + id + "'>" + location + "</td>"; 
				deviceListHtml +=     "<td id='device_createDatetime_" + id + "'>" + createDatetime + "</td>"; 
				deviceListHtml += "</tr>";
			}
		}
		return deviceListHtml;
	}
	
	function generateDeviceListHtmlUnactive(deviceList) {
		var deviceListHtml = "";		
		if (deviceList.length > 0) {			
			for (var i = 0; i < deviceList.length;i++) {
				var id = deviceList[i].id;
				var mac = deviceList[i].mac;
				var brand = deviceList[i].brand;
				var model = deviceList[i].model;
				var framewareVersion = deviceList[i].framewareVersion;
				var location = deviceList[i].country + " " + 
						deviceList[i].province + " " + 
						deviceList[i].city;
				var createDatetime = deviceList[i].createDatetime;

				deviceListHtml += "<tr>"
				deviceListHtml +=     "<td id='device_mac_" + id + "'>" + mac + "</td>";
				deviceListHtml +=     "<td id='device_brand_" + id + "'>" + brand + "</td>";
				deviceListHtml +=     "<td id='device_model_" + id + "'>" + model + "</td>"; 
				deviceListHtml +=     "<td id='device_framewareVersion_" + id + "'>" + framewareVersion + "</td>"; 
				deviceListHtml +=     "<td id='device_location_" + id + "'>" + location + "</td>"; 
				deviceListHtml +=     "<td id='device_createDatetime_" + id + "'>" + createDatetime + "</td>"; 
				deviceListHtml += "</tr>";
			}
		}
		return deviceListHtml;
	}

</script>