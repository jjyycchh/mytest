<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">

<div class="container-fluid" style="padding-top: 20px;">
	<div class="row-fluid">
		<div class="col-md-12">
			<ol class="breadcrumb">
				<li><a href="javascript:ListDevice();">全部设备</a></li>
				<li class="active">设备绑定</li>
			</ol>
		</div>

		<!--设备配置表单SSSSS-->
		<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-success">
					<div class="panel-body">
						<form class="form-horizontal" role="form">
							<div class="form-group">
								<label for="SBName" class="col-sm-3 control-label"> 设备名称</label>
								<div class="col-sm-7">
									<input type="text" class="form-control" id="SBName"
										name="SBName" placeholder="设备名称" required>
								</div>
							</div>
							<div class="form-group">
								<label for="SBMac" class="col-sm-3 control-label"> 设备MAC</label>
								<div class="col-sm-7">
									<input type="text" class="form-control" id="SBMac" name="SBMac"
										placeholder="设备MAC">
								</div>
							</div>
							<div class="form-group">
								<label for="inputpwd" class="col-sm-3 control-label">
									所在地址</label>
								<div class="col-sm-7">
									<input type="text" id="country" style="width: 250px"
										placeholder="选择已有地址" />
									<!-- <a href="#" id="country" data-type="select2" data-pk="1" data-value="" data-title="选择所在区域" class="editable editable-click">从列表中选择</a> -->
								</div>
							</div>
							<div class="form-group">
								<label for="inputver" class="col-sm-3 control-label">
									所在地址</label>
								<div class="col-sm-7">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">
												<a data-toggle="collapse" data-toggle="collapse"
													data-parent="#accordion" href="#collapseOne"> 添加新地址 </a>
											</h3>
										</div>
										<div id="collapseOne" class="panel-collapse collapse">
											<div class="panel-body">
												<div class="form-group">
													<label for="acct_geo_province"
														class="col-sm-2 control-label">省</label>
													<div class="col-sm-10">
														<select id="acct_geo_province" name="province"
															class="form-control"></select>
													</div>
												</div>
												<div class="form-group">
													<label for="acct_geo_city" class="col-sm-2 control-label">市</label>
													<div class="col-sm-10">
														<select id="acct_geo_city" name="city"
															class="form-control"></select>
													</div>
												</div>
												<div class="form-group">
													<label for="acct_geo_county" class="col-sm-2 control-label">县</label>
													<div class="col-sm-10">
														<select id="acct_geo_county" name="county"
															class="form-control"></select>
													</div>
												</div>
												<div class="form-group">
													<label for="acct_geo_address"
														class="col-sm-2 control-label">地址</label>
													<div class="col-sm-10">
														<textarea id="acct_geo_address" name="acct_geo_location"
															class="form-control" rows="3"></textarea>
													</div>
												</div>
											</div>
										</div>
									</div>

									<!-- <a href="#" id="address" data-type="address" data-pk="1" data-title="输入所在区域" class="editable editable-click">手动输入</a> -->
								</div>
							</div>
							<div class="form-group">
								<div class="col-sm-offset-2">
									<button id="btn_save" type="button"
										class="col-sm-offset-1 col-md-3 btn btn-success"  data-loading-text="保存中...">保存</button>
									<button id="btn_return_dev_lst" type="button"
										class="col-sm-offset-1 col-md-3 btn btn-default">返回</button>
									<div class="col-sm-6"></div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!--设备配置表单EEEEE-->
		<div style="height: 40px;"></div>
	</div>
</div>
<script src="${pageContext.request.contextPath}/resources/js/address.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<%-- <script src="${pageContext.request.contextPath}/resources/js/address2.js"></script> --%>
<script src="${pageContext.request.contextPath}/resources/js/typeahead.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/typeaheadjs.js"></script>
<script type="text/javascript">
MAIN_MENU.setActiveMenuItem("id_mm_device");

var countries = [];
$(document).ready(function() {
	
	getActivateData();
	addr_selector_create('acct_geo_province', 'acct_geo_city', 'acct_geo_county');//地区联动
	//$.fn.editable.defaults.mode = 'inline';
	//$('#address').editable();
   
    
    /* $('#country').editable({
        source: countries,
        select2: {
            width: 250,
            placeholder: '选择地区',
            closeOnSelect: false,
            allowClear: true
        } 
    });
     */
    $("#country").select2({
    	allowClear: true,
    	data:countries
    	});
  
    $("#btn_save").click(function() {
		SaveSBData();
	});
    $("#btn_return_dev_lst").click( function() {
    	$.get('${pageContext.request.contextPath}/device/devicelist.htm',
			function(data) {
			    $('#id_main_content').html(data);
		});
	});
});
function getActivateData() {
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '${pageContext.request.contextPath}/device/activatedata.htm',
		data : {
			'operation' : 'getdata'
		},
		success : function(data) {
			
			if (data.locationlist != null) {
				 	
					select2BindData(data.locationlist); 
					
			} else {
/* 				$.pnotify({
					title : "设备数据加载失败",
					text : data.message,
					type : 'error'
				}); */
				return false;
			}
		},
		error : function(data) {
/* 			$.pnotify({
				title : "无法连接服务器",
				text : "加载设备数据请求提交失败！",
				type : 'error'
			}); */

			return false;
		}
	});
}
function getAddress() {
	var province = addr_selector_field_get('acct_geo_province');
	var city = addr_selector_field_get('acct_geo_city');
	var county = addr_selector_field_get('acct_geo_county');
	var detailAddress = $("#acct_geo_address").val();
	
	return getObjectAddress(province, city, county, detailAddress);
}

function select2BindData(locationList)
{
	var dqstr='';
	
	if (locationList != null && locationList.length > 0) {
		
		for ( var i = 0; i < locationList.length; i++) {
			
			var id1 = locationList[i].id;
			var country = locationList[i].country;
			var province = locationList[i].province;
			var city = locationList[i].city;
			var countyDistrict = locationList[i].countyDistrict;
			var address = locationList[i].address;
			dqstr = country + "-" + province + "-" + city + "-" + countyDistrict + "-" + address;
			
			countries.push({id: id1, text: dqstr});
			
		}		
	}
	//alert(countries);
}
function SaveSBData() {
	
	//alert($('#address').html());
	
	//alert(":"+$("#country").select2("val"));
	//alert(":"+$("#country").select2("data").text);
	//alert(addr_selector_field_get('acct_geo_province'));
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '${pageContext.request.contextPath}/device/deviceactivate.htm',
		data : {
			'devicename' : $("#SBName").val(),
			'mac' : $("#SBMac").val(),
			'locationid': $("#country").select2("val"),
			'country': '中国',
			'province': addr_selector_field_get('acct_geo_province'),
			'city': addr_selector_field_get('acct_geo_city'),
			'county': addr_selector_field_get('acct_geo_county'),
			'address': $("#acct_geo_address").val() 
			//'ssid' : DevDetails.ssid,
			//'wlkey' : DevDetails.wlkey,
			//'component_ver' : DevDetails.component_ver
		},
		beforeSend:function(XMLHttpRequest){
            //alert('远程调用开始...');
            $('#btn_save').button('loading');
        },
		success : function(data) {
			$('#btn_save').button('reset');
			if (data.result == 'OK') {
				$.pnotify({
					title : "设备绑定成功",
					text : "设备绑定成功...",
					type : 'success'
				});
				//setTimeout("window.location.href = '${pageContext.request.contextPath}/device/devicelist.htm';", 2500);
			} else {
/* 				$.pnotify({
					title : "设备绑定失败",
					text : data.message,
					type : 'error'
				}); */
				return false;
			}
		},
		error : function(data) {
			$('#btn_save').button('reset');
/* 			$.pnotify({
				title : "无法连接服务器",
				text : "设备绑定失败！",
				type : 'error'
			}); */

			return false;
		}
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


