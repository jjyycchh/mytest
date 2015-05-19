<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<style>

.panel-body { padding:10px; }
.panel-footer .pagination { margin: 0; }
.panel .glyphicon,.list-group-item .glyphicon { margin-right:5px; }
.panel-body .radio, .checkbox { display:inline-block;margin:0px; }
.panel-body input[type=checkbox]:checked + label { text-decoration: line-through;color: rgb(128, 144, 160); }
.list-group-item:hover, a.list-group-item:focus {text-decoration: none;background-color: rgb(245, 245, 245);}
.list-group { margin-bottom:0px; }
.mtext-info {
    color: #3A87AD;
    float: left;
}
</style>
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<div class="container-fluid" style="padding-top: 20px;">
	<div class="row-fluid">
		<div class="modal fade" id="vote" tabindex="-1" role="dialog"
			aria-labelledby="voteLabel">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header modal-header-primary">
						<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>

						<h4 class="modal-title" style="font-family: 微软雅黑;" id="voteLabel">
							<span class="glyphicon glyphicon-arrow-right"></span> 选择设备
						</h4>
					</div>
					<div class="modal-body" style="max-height: 450px;">

						<input type="hidden" id="e24" placeholder="选择设备" style="width: 350px;" />

					</div>
					<div class="modal-footer  modal-footer-default">
					<p class="mtext-info">说明：同步保存其他设备的无线SSID</p>
						<button id="get-checked-data" type="button"
							class="btn btn-success btn-vote">提交</button>
						<button type="button" class="btn btn-default btn-close"
							data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-12">
			<ol class="breadcrumb">
				<li><a href="javascript:ListDevice();">全部设备</a></li>
				<li><a href="javascript:InfoDevice();">设备<span
						id="sp_deviceid"></span>详细信息
				</a></li>
				<li class="active">设备<span id="sp_deviceid2"></span>配置管理
				</li>
			</ol>

			<!--设备配置表单SSSSS-->
			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<div class="panel panel-default">
						<div id="setbody" class="panel-body">
							<form id="form_device_config" class="form-horizontal" role="form">
								<div class="form-group">
									<label for="lbSBID" class="col-sm-3 control-label">
										设备ID</label>
									<div class="col-sm-9">
										<label id="lbSBID" class="control-label">
										</label>
									</div>
								</div>
								<div class="form-group">
									<label for="inputSBName" class="col-sm-3 control-label">
										设备名称</label>
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputSBName"
											name="inputSBName" placeholder="设备名称" required>
									</div>
								</div>
								<div class="form-group">
									<label for="inputSSID" class="col-sm-3 control-label">
										无线SSID</label>
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputSSID"
											name="inputSSID" placeholder="无线SSID">
									</div>
								</div>
								<div class="form-group hide">
									<label for="inputpwd" class="col-sm-3 control-label">
										无线密码</label>
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputpwd"
											name="inputpwd" placeholder="无线密码">
									</div>
								</div>
								<div class="form-group">
									<label for="inputver" class="col-sm-3 control-label">
										组件版本</label>
									<div class="col-sm-1">
										<label class="control-label" id="inputconver"
											name="inputconver"> </label> <input type="text"
											class="form-control" id="converid" name="converid">
									</div>
                                    <!--
									<div class="col-sm-1">
										<a id="btn_component_upgrade" class='btn btn-info' data-toggle="modal" href="#">点击升级新版本</a>
									</div>
									-->
								</div>
                                <div class="form-group">
                                    <div class="col-sm-offset-3 col-sm-3">
                                        <a id="btn_device_reboot" class='btn btn-info' data-toggle="modal" href="#">&nbsp;设备重启&nbsp;</a>
                                    </div>
                                    <div class="col-sm-3">
                                        <a id="btn_device_portal_restart" class='btn btn-info' data-toggle="modal" href="#">Portal重启</a>
                                    </div>
                                </div>
								<div class="form-group">
									<div class="col-sm-offset-2 col-sm-3">
										<button id="btn_save_set" type="submit" class="btn btn-success" style="margin-left:38px">保存配置</button>
									</div>
									<div class="col-sm-5" style="margin-left:15px">
										<a class="btn btn-primary" data-toggle="modal"
											data-target="#vote" data-original-title> 同步保存到其他设备 </a>
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
</div>
<script src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script type="text/javascript">
MAIN_MENU.setActiveMenuItem("id_mm_device");

$(document).ready(function(){
	$('#vote').on('show.bs.modal', function(){
		$('#e24').select2('val','');
	});
});

function mFormatResult(record) {
	var markup;
	if(record){
		markup = "<table class='movie-result'><tr>";
		    markup += "<td class='movie-info'><div class='movie-title'>" + record.merchantName + "</div>";
		    markup += "</td></tr></table>";
	}    
    return markup;
}

function mFormatSelection(records) {
    return records.merchantName;
}
	var preload_data = [];
	 
	var curDeviceId = null;

	var DevDetails = null;
	var orgDeviceData = null;
	var isSyncToDevices = false;
	var el = $("#setbody");
	$(document).ready(function() {
		//$("a#btn_component_upgrade").hide();
		
		$("#converid").hide();
		curDeviceId = device_id;

		LoadDeviceData(curDeviceId);
		$("#lbSBID").html(curDeviceId);
		
		/*-----------------------设备选择-----------------start*/
		$('#e24').select2({
			 minimumInputLength: 2,
			 multiple: true,
			 allowClear: true,
			 ajax: {
				 type : 'GET',
				 dataType : 'json',
				 url: '${pageContext.request.contextPath}/device/searchdevice.htm',
				 quietMillis: 100,
				 data: function (term, pageNo) { // page is the one-based page number tracked by Select2
				 return {
					 keywords: term, //search term
					 status: '', //
				 	 pageNo: pageNo // page number
				 	 
				 };
				 },
				 results: function (data, pageNo) {
					var more = true;
				 //var more = (pageNo * 10) < data.totalRecord; // whether or not there are more results available
				 //alert(more);
				 // notice we return the value of more so Select2 knows if more results can be loaded
				 if(data.records.length==0){
					 more = false;
				 }
				 preload_data = [];
				 if (data.records != null && data.records.length > 0) {	
					 for ( var i = 0; i < data.records.length; i++) {
							preload_data.push({id: data.records[i].deviceId, merchantName: data.records[i].name});
						}
				 }
				 
				 return {results: preload_data, more: more};
				 }
				 },
				 formatResult: mFormatResult, // omitted for brevity, see the source of this page
				 formatSelection: mFormatSelection, // omitted for brevity, see the source of this page
				 dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
				 escapeMarkup: function (m) { return m; }
			}); 
		
		/*-----------------------设备选择-----------------start*/
		
		//searchDevice(null, null, null);
		/*-----------------------设备选择框样式-----------------start*/
/*		$('#form_device_config').validate({
            errorClass: "error-notification",
            errorElement: "div",
            rules: {
            	inputSSID: {
                    required: true,
                    maxlength: 32
                },
                inputSBName: {
                    required: true,
                    maxlength: 32
                }
            },
            messages: {
            	inputSSID: {
                    maxlength: "SSID不得超过32个字母、符号或 10个汉字"
                },
                inputSBName: {
                    maxlength: "设备名称不得超过32个字母、符号或 10个汉字"
                },
            },
            submitHandler: function (form) {
            	var param = null;
            	var msgTitle = "";
				if (isSyncToDevices) {
            		// sync to devices
            		msgTitle = "同步设备";
            		param = {
    					'dev_id' : ""+ $("#e24").select2("val"),
    					'hostname' : $("#inputSBName").val(),
    					'ssid': $("#inputSSID").val()
               		};
            	}
            	else {
            		msgTitle = "设备配置";
            		param = {
               			'dev_id' : curDeviceId,
       					'hostname' : $("#inputSBName").val(),
       					'ssid': $("#inputSSID").val()
                   	};
            	}
				App.blockUI({target: el, textOnly: true});
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: '${pageContext.request.contextPath}/api10/devicebaseinfosaving.htm',
                    data: param,
                    success: function (data) {

                        if (data.result == 'OK') {
    						$.pnotify({
    							title : msgTitle+"成功",
    							text : msgTitle+"成功...",
    							type : 'success',
    							after_close: function(pnotify){
    								$('#vote').modal('hide');
    								//ListDevice();
    			                }
    						});
    					} else {
     						$.pnotify({
    							title : msgTitle+"失败",
    							text : data.message,
    							type : 'notice'
    						});
    						return false;
    					}
                        App.unblockUI(el);
                    },
                    error: function (data) {
    					$.pnotify({
    						title : "无法连接服务器",
    						text : msgTitle+"失败！",
    						type : 'notice'
    					});
    					App.unblockUI(el);
    					return false;
                    }
                });
            }
        });*/

		$('#form_device_config').validate({
            errorClass: "error-notification",
            errorElement: "div",
            rules: {
            	inputSSID: {
                    required: true,
                    maxlength: 32
                },
                inputSBName: {
                    required: true,
                    maxlength: 32
                }
            },
            messages: {
            	inputSSID: {
                    maxlength: "SSID不得超过32个字母、符号或 10个汉字"
                },
                inputSBName: {
                    maxlength: "设备名称不得超过32个字母、符号或 10个汉字"
                },
            },
            submitHandler: function (form) {
            	var configitemsjs = {ssid: $("#inputSSID").val(), password: $("#inputpwd").val()};
            	var param = null;
            	var msgTitle = "";
				if (isSyncToDevices) {
            		// sync to devices
            		msgTitle = "同步设备";
            		param = {
    					'devicelist' : ""+ $("#e24").select2("val"),
    					'devicename' : $("#inputSBName").val(),
    					'configitems': JSON.stringify(configitemsjs),//json
    					'component_id':$("#converid").val()
               		};
            	}
            	else {
            		msgTitle = "设备配置";
            		param = {
               			'deviceid' : curDeviceId,
       					'devicename' : $("#inputSBName").val(),
       					'configitems': JSON.stringify(configitemsjs),//json
       					'component_id':$("#converid").val()
                   	};
            	}
				App.blockUI({target: el, textOnly: true});
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: '${pageContext.request.contextPath}/device/devicesettings.htm',
                    data: param,
                    success: function (data) {

                        if (data.result == 'OK') {
    						$.pnotify({
    							title : msgTitle+"成功",
    							text : msgTitle+"成功...",
    							type : 'success',
    							after_close: function(pnotify){
    								$('#vote').modal('hide');
    								//ListDevice();
    			                }
    						});
    					} else {
     						$.pnotify({
    							title : msgTitle+"失败",
    							text : data.message,
    							type : 'notice'
    						});
    						return false;
    					}
                        App.unblockUI(el);
                    },
                    error: function (data) {
    					$.pnotify({
    						title : "无法连接服务器",
    						text : msgTitle+"失败！",
    						type : 'notice'
    					});
    					App.unblockUI(el);
    					return false;
                    }
                });
            }
        });

 	    $('#get-checked-data').on('click', function(event) {
 	    	event.preventDefault(); 
 	    	isSyncToDevices = true;
 	    	$("#form_device_config").submit();
	    }); 
	  /*-----------------------设备选择框样式-----------------end*/

        $("#btn_device_reboot").click(function() {
 			$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '${pageContext.request.contextPath}/api10/devicereboot.htm',
				data : {
					'dev_id' : curDeviceId
				},
				success : function(data) {
					if (data.result != 'FAIL') {
						$.pnotify({
							title : "设备正在重启......",
							type : 'success'
						});
					} else {
 					    $.pnotify({
							title : "设备暂时无法重启",
							type : 'notice'
						});
						return false;
					}

				},
				error : function(data) {
 					$.pnotify({
						title : "设备暂时无法重启",
						text : "网络连接异常",
						type : 'notice'
					});
					return false;
				}
			});
        });

        $("#btn_device_portal_start").click(function() {
 			$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '${pageContext.request.contextPath}/api10/deviceportalstart.htm',
				data : {
					'dev_id' : curDeviceId
				},
				success : function(data) {
					if (data.result != 'FAIL') {
						$.pnotify({
							title : "设备Portal正在启动......",
							type : 'success'
						});
					} else {
 					    $.pnotify({
							title : "设备Portal暂时无法启动",
							type : 'notice'
						});
						return false;
					}

				},
				error : function(data) {
 					$.pnotify({
						title : "设备Portal暂时无法启动",
						text : "网络连接异常",
						type : 'notice'
					});
					return false;
				}
			});
        });

        $("#btn_device_portal_stop").click(function() {
 			$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '${pageContext.request.contextPath}/api10/deviceportalstop.htm',
				data : {
					'dev_id' : curDeviceId
				},
				success : function(data) {
					if (data.result != 'FAIL') {
						$.pnotify({
							title : "设备Portal正在关闭......",
							type : 'success'
						});
					} else {
 					    $.pnotify({
							title : "设备Portal暂时无法关闭",
							type : 'notice'
						});
						return false;
					}

				},
				error : function(data) {
 					$.pnotify({
						title : "设备Portal暂时无法关闭",
						text : "网络连接异常",
						type : 'notice'
					});
					return false;
				}
			});
        });

        $("#btn_device_portal_restart").click(function() {
 			$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '${pageContext.request.contextPath}/api10/deviceportalrestart.htm',
				data : {
					'dev_id' : curDeviceId
				},
				success : function(data) {
					if (data.result != 'FAIL') {
						$.pnotify({
							title : "设备Portal正在重启......",
							type : 'success'
						});
					} else {
 					    $.pnotify({
							title : "设备Portal暂时无法重启",
							type : 'notice'
						});
						return false;
					}

				},
				error : function(data) {
 					$.pnotify({
						title : "设备Portal暂时无法重启",
						text : "网络连接异常",
						type : 'notice'
					});
					return false;
				}
			});
        });

 	    $("#btn_component_upgrade").click(function() {
 			$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '${pageContext.request.contextPath}/device/componentupgrade.htm',
				data : {
					'dev_id' : curDeviceId
				},
				
				success : function(data) {
					//alert(data.device.configItems);
					App.unblockUI(el);
					if (data.result != 'FAIL') {
						$.pnotify({
							title : "设备正在升级......",
							type : 'success'
						});
					} else {
/* 							$.pnotify({
							title : "设备数据加载失败",
							text : data.message,
							type : 'error'
						}); */
						return false;
					}
					
				},
				error : function(data) {
/* 						$.pnotify({
						title : "无法连接服务器",
						text : "加载设备请求提交失败！",
						type : 'error'
					}); */
					return false;
				}
			});
 	    });
	});
	
	//填充设备列表
	function generateDevListHtml(deviceList) {	
		var devListHtml = "";
		if (deviceList.length > 0) {
			for ( var i = 0; i < deviceList.length; i++) {
				var deviceid = deviceList[i].deviceId;
				devListHtml += "<li class='list-group-item'>";
				devListHtml += "<div class='checkbox'>";
				devListHtml += "<input type='checkbox' name='devcheck' value='"+deviceid+"' id='checkbox_" + deviceid + "' />";
				devListHtml += "<label for='checkbox_" + deviceid + "'>";
				devListHtml +=  deviceid;
				devListHtml += "</label></div></li>";
			}
		}
		return devListHtml;
	}
	
	function LoadDeviceData(deviceId) {
		App.blockUI({target: el, textOnly: true});
		$.ajax({
					type : 'GET',
					dataType : 'json',
					url : '${pageContext.request.contextPath}/device/devicesettings.htm',
					data : {
						'deviceid' : deviceId
					},
					
					success : function(data) {
						//alert(data.device.configItems);
						App.unblockUI(el);
						if (data.result != 'FAIL' && data.device != null) {
							if (data.device != null) {
								DevDetails = data.device;
								refreshDeviceData(DevDetails);

							}
						} else {
/* 							$.pnotify({
								title : "设备数据加载失败",
								text : data.message,
								type : 'error'
							}); */
							return false;
						}
						
					},
					error : function(data) {
/* 						$.pnotify({
							title : "无法连接服务器",
							text : "加载设备请求提交失败！",
							type : 'error'
						}); */
						App.unblockUI(el);
						return false;
					}
				});
	}
	function refreshDeviceData(device) {
		 $("#inputSBName").val(device.name);

		 if(device.configItems != null && device.configItems != ""){
 			var configItemsstr = JSON.parse(device.configItems);
		 	$("#inputSSID").val(configItemsstr.ssid); 
		 	$("#inputpwd").val("");
		 }
		 //$("#inputconver").text(device.componentId);
		 $("#converid").val(device.componentId);
		 $("#inputconver").text(device.componentVersion);
		 $("#sp_deviceid").html(device.name);
		 $("#sp_deviceid2").html(device.name);
		 
		 orgDeviceData = device;
	}

	function UpgradeDevice() {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/device/deviceupgrade.htm',
			data : {
				'deviceid' : deviceId,
				'component_version': ''
			},
			success : function(data) {
				//alert(data.device.configItems);
				App.unblockUI(el);
				if (data.result != 'FAIL') {
					//升级命令正常下发，do nothing
				} else {
 					$.pnotify({
						title : "设备当前无法进行组件/固件升级",
						type : 'warning'
					});
					return false;
				}
				
			},
			error : function(data) {
 				$.pnotify({
					title : "无法连接服务器",
					text : "加载设备请求提交失败！",
					type : 'warning'
				}); 
				App.unblockUI(el);
				return false;
			}
		});
	}
	
	function InfoDevice() {
		$.get('${pageContext.request.contextPath}/device/deviceinfo.htm',

		function(data) {
			$('#id_main_content').html(data);
		});
	}
	function ListDevice() {
		$.get('${pageContext.request.contextPath}/device/devicelist.htm',

		function(data) {
			$('#id_main_content').html(data);
		});
	}
</script>

