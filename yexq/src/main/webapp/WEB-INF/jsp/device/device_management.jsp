<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<style>
    .panel-footer .pagination
    {
        margin: 0;
    }
#devmap {width: 100%;height: 370px;overflow: hidden;margin:0;}
#l-map{height:100%;width:78%;float:left;border-right:2px solid #bcbcbc;}
#r-result{height:100%;width:20%;float:left;}
.statulb{border-radius: 0 !important;padding: 0.2em 1em;font-size: 85%;}
.table > tbody > tr > td{
vertical-align: middle;
}
</style>
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-switch.css" rel="stylesheet" media="screen">
<div class="container-fluid"
	style="padding-top: 20px">
	<div class="row-fluid">
		<!-- seach 栏 -->
		<div class="col-md-12 col-xs-12">
			<nav class="navbar navbar-default" role="navigation">
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse"
					id="bs-example-navbar-collapse-1">
					<form id="deviceSearch" class="navbar-form navbar-left"
						role="search">
						<div class="form-group">
							<input type="text" id="keywords" class="form-control"
								placeholder="输入关键字">
						</div>
						<div class="form-group" style="margin-left: 28px">
							<div class="radio-list">
								<label class="radio-inline"> <input type="radio"
									name="optionsRadios" id="Radio1" value="ONLINE"> 在线
								</label> <label class="radio-inline"> <input type="radio"
									name="optionsRadios" id="Radio2" value="" checked> 全部
								</label>
							</div>
						</div>
						&nbsp;&nbsp;
						<button id="btn_search_dev" type="button" class="btn btn-info"><span class="glyphicon glyphicon-search"></span> 查询</button>
					</form>
					<!--<p class="navbar-text">
						<a class='btn btn-info btn-xs' href="javascript:bindDevice();">设备绑定</a>
					</p> -->
					<!-- <p class="navbar-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分布地图 </p>
					<div id="mapSwitch" class="make-switch navbar-btn" data-on="danger"
						data-off="primary">
						<input type="checkbox" />
					</div> -->
					<ul class="nav navbar-nav navbar-right">
						<li><a href="javascript:trafficSetting();">用户流量时长管理</a></li>
					</ul>
				</div>
				<!-- /.navbar-collapse -->
			</nav>
		</div>
		<!-- seach 栏 -->
		<div class="row-fluid">
			<div class="col-md-12">
				<!-- BEGIN SAMPLE TABLE PORTLET-->
				<div class="portlet box yellow" style="margin-bottom: 2px">
					<div class="portlet-title">
						<div class="caption">
							<i class="glyphicon glyphicon-qrcode"></i>设备列表
						</div>
						<div class="tools">
							<a id="reloaddev" class="reload" href="javascript:;">
							
							</a>
						</div>
					</div>
					<div id="devmap" class="">
						
					</div>
					<div id="dev_list" class="portlet-body">
						<table class="table table-hover">
							<thead>
								<tr>
									<th width="10%">设备型号</th>
									<th width="11%">设备名称</th>
									<th width="11%">设备MAC</th>
									<!-- <th width="15%">所在区域</th> -->
									<th width="12%">商户名称</th>
									<th width="8%">设备状态</th>
									<th width="9%">上行流量<span style="color:#0D638F"><i class="glyphicon glyphicon-cloud-upload"></i></span></th>
									<th width="9%">下行流量<span style="color:#0D638F"><i class="glyphicon glyphicon-cloud-download"></i></span></th>
									<th width="18%" class="text-center">操作</th>
								</tr>
							</thead>
							<tbody id="tbl_device_lst">
							</tbody>
						</table>
					</div>
					<div class="panel-footer">
						<div style="display: none" id="ddddd"></div>
						<div class="row">
							<div class="col-md-6">
								<h6>
									第 <span class="label label-info" id="lb_pagenumber"></span> 页
								</h6>
							</div>
							<div class="col-md-6">
								<div id="div_pagination" class="col-md-offset-3">
									<!-- 
								<ul id="ul_pagination_dev"></ul>
								-->
									<ul id="ul_pagination" class="pager">
										<li><a id="a_pagination_previous"
											style="cursor: pointer;"> 前一页 </a></li>
										<li><a id="a_pagination_next" style="cursor: pointer;">
												后一页 </a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="${pageContext.request.contextPath}/resources/js/bootstrap-switch.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/map.js"></script>

<script type="text/javascript">
	MAIN_MENU.setActiveMenuItem("id_mm_device");
	
	var deviceSearchHandler = null;
	var search_dev_keyword = null;

	var dev_status = "";
	
	var device_id = null;
	var userpods = [];//map data
	var map = null;
	 
	$(document).ready(function() {
		
		//loadScript();
		deviceSearchHandler = new searchUtil(generateDevListHtml, searchFailCallBack, searchErrorCallBack, null, postChagePage,
			"tbl_device_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
			"${pageContext.request.contextPath}/device/searchdevice.htm","dev_list");
		dev_status = $('input[name="optionsRadios"]').filter(':checked').val();
		
		deviceSearchHandler.setSearchParemeter('status', dev_status);
		deviceSearchHandler.searchWithPreload();
		
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		$("#btn_search_dev").click(function() {
			keywordsSearch();
		});
		//handlePortletToolsDev();
		$("#reloaddev").click(function(e){
			e.preventDefault();
            //var el = jQuery(this).closest(".portlet").children("#dev_list");                    
            //App.blockUI({target: el, textOnly: true});
         	 //reload data  这里需要修改, imgsrc: '${pageContext.request.contextPath}'
         	 //alert("xxxx");
			deviceSearchHandler.refreshCurrentPage();
			//reload data
           // window.setTimeout(function () {
               // App.unblockUI(el);
            //}, 1000); 
		});
		$("#dev_list").show();
		$("#devmap").hide();
		//initMap();
		$('#mapSwitch').on('switch-change', function (e, data) {
		    var $el = $(data.el), value = data.value;

		    if(value){
	    		$("#dev_list").hide();
	    		$("#devmap").show();

	    		initMap();
	    	}
		    else{
	    		$("#dev_list").show();
    			$("#devmap").hide();
		    }
		});
		DEVICE_LIST_REFRESH_TIMER.contextPath = "${pageContext.request.contextPath}";
	});
	
	function keywordsSearch() {
		dev_status = $('input[name="optionsRadios"]').filter(':checked').val();
		deviceSearchHandler.setSearchParemeter('status', dev_status);
		var deviceSearchKeywords = deviceSearchHandler.convertKeywordsSearchable($("#keywords").val());
		deviceSearchHandler.setSearchParemeter('keywords', deviceSearchKeywords);
		deviceSearchHandler.searchWithPreload();
	}
	
	function searchFailCallBack(data, message) {
/* 		$.pnotify({
			title : "设备数据加载失败",
			text : message,
			type : 'error'
		}); */
		
		return false;
	}
	
	function searchErrorCallBack(data, message) {
/* 		$.pnotify({
			title : "无法连接服务器",
			text : "加载设备数据请求提交失败！" + message,
			type : 'error'
		}); */
		
		return false;
	}
	function trafficSetting(){
		$.get('${pageContext.request.contextPath}/device/deviceuserlimitation.htm',
				{}, function(data) {
					$('#id_main_content').html(data);
				});
	}
	function EditDevice(deviceId) {
		device_id = deviceId;
		$.get('${pageContext.request.contextPath}/device/devicesettings.htm',
				{}, function(data) {
					//alert(data);
					$('#id_main_content').html(data);
				});
	}
	function InfoDevice(deviceId) {
		device_id = deviceId;
		$.get('${pageContext.request.contextPath}/device/deviceinfo.htm', {},
				function(data) {
					$('#id_main_content').html(data);
				});
	}

	function bindDevice() {
		$.get('${pageContext.request.contextPath}/device/activatedata.htm', {},
				function(data) {
					$('#id_main_content').html(data);
				});
	}
	function lockDevice(deviceId) {
		updateDeviceStatus(deviceId, "LOCK");
	}

	function unlockDevice(deviceId) {

		updateDeviceStatus(deviceId, "UNLOCK");
	}
	
	//锁定or解
	function updateDeviceStatus(deviceId, type) {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/device/devicelock.htm',
			data : {
				'deviceid' : deviceId,
				'type' : type
			},
			success : function(data) {

				if (data.result != 'FAIL') {
					//alert(data.devicestatus);
					var deviceOptBtnHtml = generateDeviceOptBtn(deviceId,
							data.status);
					$("#status_" + deviceId).html(statusDevSpan(data.status));
					$("#dev_opt_btn_" + deviceId).html(deviceOptBtnHtml);
				} else {
/* 					$.pnotify({
						title : "设备操作失败",
						text : data.message,
						type : 'error'
					}); */
					return false;
				}
			},
			error : function() {
/* 				$.pnotify({
					title : "帐号操作失败",
					text : data.message,
					type : 'error'
				}); */
				return false;
			}
		});
	}

	function generateDevListHtml(deviceList) {
		var devListHtml = "";
		
		userpods = [];
		if (deviceList.length > 0) {
			
			for ( var i = 0; i < deviceList.length; i++) {
				var deviceid = deviceList[i].deviceId;
				var device_brand = deviceList[i].brand;
				var device_model = deviceList[i].model;
				var device_ssid = null;
                var device_mac = isNotEmptyString(deviceList[i].mac) ? deviceList[i].mac : "";
				var device_config = deviceList[i].configItems;
				if (isNotEmptyString(device_config)) {
					var objConfig = JSON.parse(device_config);
					device_ssid = objConfig.ssid;
				}
				var device_name = deviceList[i].name;
				if (!isNotEmptyString(device_name)) {
					device_name = device_mac;
				}
				/* else {
					if (isNotEmptyString(device_mac)) {
						device_name += " (" + device_mac + ")";
					}
				} */

				var location = deviceList[i].locationName;
				var latitude = deviceList[i].latitude;
				var longitude = deviceList[i].longitude;
				var merchant_name = isNotEmptyString(deviceList[i].merchantName) ? deviceList[i].merchantName : "";
				var status = deviceList[i].status;
				var upTraffic = deviceList[i].upTraffic;
				var downTraffic = deviceList[i].downTraffic;
				var mac = deviceList[i].mac;
				//var islocked = deviceList[i].islocked;
				location = location == undefined || location == null ? "" : location;
				devListHtml += "<tr>";
				devListHtml += "<td id='dev_brand_" + deviceid + "'>"
						+ device_model + "</td>";
			    /* if(device_name.length > 15){
			        devListHtml += "<td id='dev_name_" + deviceid + "'> "
				    + device_name.substring(0,14) + "&nbsp;<i class='glyphicon glyphicon-comment' style='color: #0D638F' rel='tooltip' title='"+device_name+"' id=''></i></td>";
			    }
			    else{ */
			        devListHtml += "<td id='dev_name_" + deviceid + "'>"
					    + device_name + "</td>";
			    //}
				
			     devListHtml += "<td id='mac_" + deviceid + "'>"
					+ mac + "</td>";
			     
				/* devListHtml += "<td id='dev_location_" + deviceid + "'>"
						+ location + "</td>"; */
				if(merchant_name.length > 9){
				    devListHtml += "<td id='merchant_name_" + deviceid + "'>"
					    + merchant_name.substring(0,8) + "&nbsp;<i class='glyphicon glyphicon-comment' style='color: #0D638F' rel='tooltip' title='"+merchant_name+"' id=''></i></td>";
				}
				else{
				    devListHtml += "<td id='merchant_name_" + deviceid + "'>"
					    + merchant_name + "</td>";
				}
				
				devListHtml += "<td id='status_" + deviceid + "'>" + statusDevSpan(status)
						+ "</td>";
				devListHtml += "<td id='upstream_" + deviceid + "'>" + trafficFormatter(upTraffic)
						+ "</td>";
				devListHtml += "<td id='downstream_" + deviceid + "'>"
						+ trafficFormatter(downTraffic) + "</td>";
				devListHtml += "<td id='dev_opt_btn_" + deviceid + "' class='text-center'>";
				devListHtml += generateDeviceOptBtn(deviceid, status);
				devListHtml += "</td>";
				devListHtml += "</tr>";
				
				userpods.push({deviceid: deviceid, longitude: longitude, latitude: latitude, ip: device_name, memo: merchant_name});
			}
			//alert(userpods[0]['deviceid']);
		}
		
		return devListHtml;
	}
	function postPageChange() {
		var my_posts = $("[rel=tooltip]");
	    for(i=0;i<my_posts.length;i++){
	        the_post = $(my_posts[i]);	        
	        the_post.tooltip({ placement: 'bottom'});
	        the_post.css("cursor","pointer"); 
	    }
	}
	function refreshCallBack(data) {
		if (data.records != null && data.records.length > 0) {
			var deviceInfoLst = data.records;
			
			for (var i = 0; i < deviceInfoLst.length; i++) {
				var device_ssid = null;
				var device_config = deviceInfoLst[i].configItems;
                var device_mac = isNotEmptyString(deviceInfoLst[i].mac)?deviceInfoLst[i].mac:"";
				var device_name = null;
				if (isNotEmptyString(device_config)) {
					var objConfig = JSON.parse(device_config);
					device_ssid = objConfig.ssid;
				}
				var device_name = deviceInfoLst[i].name;
				if (!isNotEmptyString(device_name)) {
					device_name = device_mac;
				}
				/* else {
					if (isNotEmptyString(device_mac)) {
						device_name += " (" + device_mac + ")";
					}
				} */

				device_name = !isNotEmptyString(device_name) ? "" : device_name;
				var status = deviceInfoLst[i].status;
				
				var upTraffic = deviceInfoLst[i].upTraffic;
				upTraffic = upTraffic == null || upTraffic == undefined ? "0 MB" : trafficFormatter(upTraffic);
				
				var downTraffic = deviceInfoLst[i].downTraffic;
				downTraffic = downTraffic == null || downTraffic == undefined ? "0 MB" : trafficFormatter(downTraffic);
				
				var deviceId = deviceInfoLst[i].deviceId;
				var deviceStatus = deviceInfoLst[i].status;
				
				$("#status_" + deviceId).html(statusDevSpan(status));
				$("#dev_name_" + deviceId).html(device_name);
				$("#upstream_" + deviceId).html(upTraffic);
				$("#downstream_" + deviceId).html(downTraffic);
			}
		}
	}
	function trafficFormatter(val) {
		if (val > 1024*1024*1024)
		  return Math.round(val / (1024*1024*1024)) + " GB";
		else if (val > 1024*1024)
	      return Math.round(val / (1024*1024)) + " MB";
	    else if (val > 1024)
	      return Math.round(val / 1024) + " KB";
	    else
	      return val + " B";
	}
	function statusDevSpan(status)
	{
		var statusHtml="";
		if(status != null){
			if (status == "LOCKED") {
				statusHtml += "<span class='label label-sm label-warning statulb'>锁定</span>";
			}
			else if(status == "OFFLINE"){
				statusHtml += "<span class='label label-sm label-default statulb'>离线</span>";
			}
			else{
				statusHtml += "<span class='label label-sm label-info statulb'>在线</span>";
			}
		}
		return statusHtml;
	}
	function generateDeviceOptBtn(deviceID, status) {
		var deviceOptBtnHtml = "";
		if (deviceID != null) {

			deviceOptBtnHtml += "<a id='dev_info_" + deviceID
					+ "' href='javascript:InfoDevice(\"" + deviceID
					+ "\");' class='btn btn-default btn-xs' style='cursor:pointer;'>";
			deviceOptBtnHtml += "<span class='glyphicon glyphicon-comment'></span>详情";
			deviceOptBtnHtml += "</a> ";
			deviceOptBtnHtml += "<a id='dev_edit_" + deviceID
					+ "'  href='javascript:EditDevice(\"" + deviceID
					+ "\");' class='btn btn-default btn-xs' style='cursor:pointer;'>";
			deviceOptBtnHtml += "<span class='glyphicon glyphicon-edit'></span>配置";
			deviceOptBtnHtml += "</a> ";

			if (status == "LOCKED") {
				deviceOptBtnHtml += "<a id='dev_unlock_" + deviceID
						+ "'  href='javascript:unlockDevice(\"" + deviceID
						+ "\")' class='btn btn-default btn-xs' style='cursor:pointer;'>";
				deviceOptBtnHtml += "<span class='glyphicon glyphicon-open'></span>解锁";
				deviceOptBtnHtml += "</a>";

			} else {

				deviceOptBtnHtml += "<a id='dev_lock_" + deviceID
						+ "'  href='javascript:lockDevice(\"" + deviceID
						+ "\")' class='btn btn-default btn-xs' style='cursor:pointer;'>";
				deviceOptBtnHtml += "<span class='glyphicon glyphicon-lock'></span>锁定";
				deviceOptBtnHtml += "</a>";

			}

		}

		return deviceOptBtnHtml;
	}
	
	function postChagePage(prev_page_ResultSet, curr_page_ResultSet, next_page_ResultSet) {
		initMap();
		postPageChange();
		if (curr_page_ResultSet != null) {
			var deviceList = curr_page_ResultSet.records;
			if (deviceList != null && deviceList.length > 0){
				var deviceIds = [];
				for (var i = 0; i < deviceList.length;i++) {
					deviceIds.push(deviceList[i].deviceId);
				}
				
				if (deviceIds != null && deviceIds.length > 0) {
					//update parameter (deviceIds json) deviceRefreshTimer
					DEVICE_LIST_REFRESH_TIMER.deviceIds = JSON.stringify(deviceIds);
					setTimeout("DEVICE_LIST_REFRESH_TIMER.initialTimer(refreshCallBack)", 10000);
				}
			}
		}
	}
	/*---------------baidu Map-----------------*/
	// center coordinate of hangzhou
	var mapcenter_lng = 120.158;
	var mapcenter_lat = 30.279;
	//pods data	
	var userpods_markers = null;	
	var userpods_temp = null;
	 
    function initMap(){
    	/* //if (!map) {
    		map = null;
			map = initialMapSelector("devmap", mapcenter_lng, mapcenter_lat);
		//}
    	//map.reset();
		LoadDate();
    	//initialize(); */
    }
	function LoadDate() {
		
		CreateMapSelector();
	}
	
	function CreateMapSelector() {
		userpods_markers = [];
		userpods_temp = [];
		//alert("gomap");
		var marker_counter = 0;
		if (!map) {
			map = initialMapSelector("devmap", mapcenter_lng, mapcenter_lat);
		}
		map.clearOverlays();
		for (var index = 0;index < userpods.length;index++ ) {
			
			if (userpods[index]['longitude'] == 0 || userpods[index]['latitude'] == 0
					|| !userpods[index]['longitude'] || !userpods[index]['latitude'] || userpods[index]['latitude'] == undefined || userpods[index]['longitude'] == undefined) {
				//alert("remove");
				//userpods.splice(index,1);
			}
			else
				{
				userpods_temp.push(userpods[index]);
				
				}
		}
		for (var index = 0;index < userpods_temp.length;index++ ) {

			var marker;			
			if (userpods_temp[index]['longitude'] == 0 || userpods_temp[index]['latitude'] == 0
				|| !userpods_temp[index]['longitude'] || !userpods_temp[index]['latitude']) {
				
				marker = GenerateRandomPoint(map, 1, map.getCenter().lng, map.getCenter().lat);
				//marker = showDevice(map, userpods_temp[index]['longitude'], userpods_temp[index]['latitude']);
			}
			else {
				marker = showDevice(map, userpods_temp[index]['longitude'], userpods_temp[index]['latitude']);
				
			}

			var userpods_markers_vertical = [];
			userpods_markers_vertical['deviceid'] = userpods_temp[index]['deviceid'];
			userpods_markers_vertical['userpod'] = userpods_temp[index];
			userpods_markers_vertical['marker'] = marker;
			
			userpods_markers.push(userpods_markers_vertical);
		}

		//地图选择器对话框 - 挂载事件处理入口 
		    $('#devmap').ready(function() {
			var markers = [];
			//alert("aaa");
			for (var i = 0;i < userpods_markers.length;i++) {
				markers.push(userpods_markers[i]['marker']);
				
			}					
			autoResizeMapView(map, markers);
			
			map.addEventListener("tilesloaded",function(){
	            //map.clearOverlays();
	            for(i=0;i<userpods_markers.length;i++){
	                if(userpods_markers[i]!=null)
	                {
	                    addMakerPoint(userpods_markers[i]);
	                }
	            }
	        });
			function addMakerPoint(_dataJson)
			{
				var marker = _dataJson['marker'];
				var point = marker.getPosition();
				
				var html_infoWindow = "商户:" + _dataJson['userpod']['memo'] + "<br>位于: " + point.lng + " " + point.lat;
				var title = "设备: "+_dataJson['userpod']['ip'];
				
				marker.addEventListener("mouseover", function(e) {
					this.openInfoWindow(new BMap.InfoWindow(html_infoWindow, {enableMessage: false, title: title, enableCloseOnClick:true}));
				});
				marker.addEventListener("mouseout", function(e) {
					this.closeInfoWindow();
				});
			}
		});  
	}

</script>


	