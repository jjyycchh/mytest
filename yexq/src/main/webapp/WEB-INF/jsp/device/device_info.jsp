<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<style>
.tabtitle {
	font-weight: bold;
}
</style>
<div class="container-fluid" style="padding-top: 20px;">
	<div class="row-fluid">
		<div class="col-md-12">
			<ol class="breadcrumb">
				<li><a href="javascript:ListDevice();">全部设备</a></li>
				<li class="active">设备<span id="sp_deviceid"></span>详细信息</li>
			</ol>
			
			<h4 style="display:inline-block">
				<span class="label pull-right" id="lb_devStatus">在线</span>
				当前状态&nbsp;
			</h4>
			<div class="panel panel-success">
				<!--设备信息---------字体需要改成 黑体加粗-->
				<table class="table table-bordered table-condensed">
					<tbody id="dev_info_tab">
						<tr>
							<td class="warning tabtitle">设备型号</td>
							<td id="lb_devType"></td>
							<td class="warning tabtitle">设备ID</td>
							<td id="lb_devID"></td>
						</tr>
						<tr>
							<td class="warning tabtitle">设备名称</td>
							<td id="lb_devName"></td>
							<td class="warning tabtitle">SSID</td>
							<td id="lb_devSSID"></td>
						</tr>
						<tr>
							<td class="warning tabtitle">注册时间</td>
							<td id="lb_devRegtime"></td>
							<td class="warning tabtitle">连线时长</td>
							<td id="lb_devUptime"></td>
						</tr>
						<tr>
							<td class="warning tabtitle">所属区域</td>
							<td id="lb_devFAddr"></td>
							<td class="warning tabtitle">设备固件版本</td>
							<td id="lb_devComversion"></td>
						</tr>
						<tr>
							<td class="warning tabtitle">商户</td>
							<td id="lb_devMerName"></td>
							<td class="warning tabtitle">公网IP地址</td>
							<td id="lb_devPubIp"></td>
						</tr>
						<tr>
							<td class="warning tabtitle">代理商</td>
							<td id="lb_devrepresentitiveName"></td>
							<td class="warning tabtitle">MAC地址</td>
							<td id="lb_devMac"></td>
						</tr>
						<tr>
							<td class="warning tabtitle">管理员</td>
							<td id="lb_devAdmin"></td>
							<td class="warning tabtitle">上行流量</td>
							<td id="lb_devUpstream"></td>
						</tr>
						<tr>
							<td class="warning tabtitle">网络连接方式</td>
							<td id="lb_devwanprotocol"></td>
							<td class="warning tabtitle">下行流量</td>
							<td id="lb_devdownstream"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-8"></div>
		<div class="col-md-4">
			<a id="devsethref" href="javascript:Devsetting();"
				class="btn btn-primary active"
				style="margin-left: 125px; margin-bottom: 30px" role="button">进入设备配置管理</a>
		</div>
	</div>
</div>
<script type="text/javascript">
	MAIN_MENU.setActiveMenuItem("id_mm_device");

	var curDeviceId = null;
	$(document).ready(function() {
		curDeviceId = device_id;
		//alert(curDeviceId);
		
		showDeviceOverviewInfo(curDeviceId);
	});

	function showDeviceOverviewInfo(deviceID) {
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/device/deviceinfo.htm',
			data : {
				'deviceId' : deviceID
			},
			//contenttype: "application/json; charset=utf-8",
			success : function(data) {
				if (data.result != 'FAIL' && data.deviceinfo != null) {
					if (data.deviceinfo != null) {
						generateDevInfoHtml(data.deviceinfo);//填充数据
					}
				} else {
/* 					$.pnotify({
						title : "设备数据加载失败",
						text : data.message,
						type : 'error'
					}); */
					return false;
				}
			},
			error : function(data) {
/* 				$.pnotify({
					title : "无法连接服务器",
					text : "加载设备数据请求提交失败！",
					type : 'error'
				});
 */
				return false;
			}
		});
	}
	function generateDevInfoHtml(deviceInfo) {
		var devInfoHtml = "";

		if (deviceInfo != null) {
			var deviceid = deviceInfo.deviceId;
			var devicemodel = deviceInfo.model;
			var devicename = deviceInfo.name;
			var registertime = deviceInfo.registerationDate;
			var location_full_address = deviceInfo.locationAdress;
			var merchant_name = deviceInfo.merchantName;
			var representitive_name = deviceInfo.representitiveName;
			var administrator = deviceInfo.administrator;
			var wanprotocol = deviceInfo.wanProtocol;
			var ssid = deviceInfo.ssid;
			var uptime = deviceInfo.uptime;
			var comversion = deviceInfo.componentVersion;
			var pubip = deviceInfo.publicIp;
			var mac = deviceInfo.mac;
			var upstream = deviceInfo.upTraffic;
			var downstream = deviceInfo.downTraffic;
			var status = deviceInfo.status;

			if (status == "LOCKED") {
				$("#lb_devStatus").addClass("label-warning");
				status="锁定";
			}
			else if(status == "OFFLINE"){				
				$("#lb_devStatus").addClass("label-default");
				status="离线";
			}
			else{
				$("#lb_devStatus").addClass("label-info");
				status="在线";
			}			
			$("#lb_devType").text(devicemodel);
			$("#lb_devID").text(deviceid);
			$("#lb_devName").text(devicename);
			$("#lb_devSSID").text(ssid);
			$("#lb_devRegtime").text(registertime);
			$("#lb_devUptime").text(uptime);
			$("#lb_devFAddr").text(location_full_address);
			$("#lb_devComversion").text(comversion);
			$("#lb_devMerName").text(merchant_name);
			$("#lb_devPubIp").text(pubip);
			$("#lb_devrepresentitiveName").text(representitive_name);
			$("#lb_devMac").text(mac);
			$("#lb_devAdmin").text(administrator);
			$("#lb_devUpstream").text(upstream);
			$("#lb_devwanprotocol").text(wanprotocol);
			$("#lb_devdownstream").text(downstream);
			$("#lb_devStatus").text(status);

			$("#devsethref").attr("href",
					"javascript:Devsetting('" + deviceid + "')");
			$("#sp_deviceid").html(devicename);
		}
	}

	function Devsetting(deviceId) {
		$.get('${pageContext.request.contextPath}/device/devicesettings.htm',
		//{ 'deviceId': deviceId },
		function(data) {
			//alert(data);
			$('#id_main_content').html(data);
		});
	}
	function ListDevice() {
		$.get('${pageContext.request.contextPath}/device/devicelist.htm',

		function(data) {
			//alert(data);
			$('#id_main_content').html(data);
		});
	}
</script>
