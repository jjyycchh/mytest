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
</style>
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<div class="container-fluid" style="padding-top: 20px;">
	<div class="row-fluid">
		<div class="col-md-12">
			<ol class="breadcrumb">
				<li><a href="javascript:ListDevice();">全部设备</a></li>				 
				<li class="active">用户流量时长管理
				</li>
			</ol>
			<!--设备配置表单SSSSS-->
			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<div class="panel panel-default">
						<div id="limitbody" class="panel-body">
							<form id="form_limit_config" class="form-horizontal" role="form">
								<div id="divmerchant" class="form-group">
									<label for="inputmerchant" class="col-sm-3 control-label">
										所属商户</label>
									<div class="col-sm-9">
										<input type="hidden" id="inputmerchant" placeholder="选择商户" style="width: 230px;" /> 
									</div>
								</div>
								<div class="form-group">
									<label for="inputMaxTraffic" class="col-sm-3 control-label">
										最大流量</label>
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputMaxTraffic"
											name="inputMaxTraffic" placeholder="用户能使用的最大流量" required>(范围:1-10240的整数， 默认10240。单位：M)
									</div>
								</div>
								<div class="form-group">
									<label for="inputMaxTime" class="col-sm-3 control-label">
										最大时长</label>
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputMaxTime"
											name="inputMaxTime" placeholder="用户能使用的最长时间">(范围:10-2880的整数，默认2880 分钟。单位：分钟)
									</div>
								</div>
								<div class="form-group">
									<label for="inputMaxSms" class="col-sm-3 control-label">
										短信验证次数</label>
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputMaxSms"
											name="inputMaxSms" placeholder="用户短信验证最多次数">
									</div>
								</div>
																
								<div class="form-group">
									<div class="col-sm-offset-2 col-sm-3">
										<button id="btn_save_set" type="submit" class="btn btn-primary" style="margin-left:38px">确 定</button>
									</div>
									<div class="col-sm-5" style="margin-left:15px">
										<a href="javascript:ListDevice();" class="btn btn-default">取 消 </a>
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

function mFormatResult(record) {
	var markup;
	if(record){
		markup = "<table class='movie-result'><tr>";
		if(record.merchantName){
			markup += "<td class='movie-info'><div class='movie-title'>" + record.username + "(" + record.merchantName + ")</div>";
		}else {
			markup += "<td class='movie-info'><div class='movie-title'>" + record.username + "</div>";
		}
		    
		markup += "</td></tr></table>";
	}    
    return markup;
}

function mFormatSelection(record) {
	if(record.merchantName){
    	return record.username + "(" + record.merchantName + ")"; 
	}else{
		return record.username;
	}
	
}

var DevDetails = null;
var orgDeviceData = null;
var optAcctType = '${sessionScope.login_account_info.type}';
var optAcctId = null;
var el = $("#limitbody");
$(document).ready(function() {
		 
		if(optAcctType==ACCOUNT_TYPE.MERCHANT){
			optAcctId = '${sessionScope.login_account_info.id}';
			$("div#divmerchant").hide();
			$('#inputmerchant').select2('enable', false);		
			LoadLimitationData(optAcctId);
		}
		else{
			$('#inputmerchant').select2({
		   		 //minimumInputLength: 2,
		   		 allowClear: true,
		   		 ajax: {
		   			 type : 'GET',
		   			 dataType : 'json',
		   			 url: '${pageContext.request.contextPath}/device/device_merchantlist.htm',
		   			 quietMillis: 100,
		   			 data: function (term, pageNo) {
		   			 return {
		   				 merchantname: term, //search term
		   			 	 
		   			 	 pageNo: pageNo // page number
		   			 	 
		   			 };
		   			 },
		   			 results: function (data, pageNo) {
		   				var more = true;
		   			 
		   			 if(data.records.length==0){
		   				 more = false;
		   			 }
		   			 return {results: data.records, more: more};
		   			 }
		   			 },
		   			 formatResult: mFormatResult, // omitted for brevity, see the source of this page
		   			 formatSelection: mFormatSelection, // omitted for brevity, see the source of this page
		   			 dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
		   			 escapeMarkup: function (m) { return m; }
		   	});
		}
		$("#inputmerchant").on("change", function() {
			optAcctId = $('#inputmerchant').val();
			LoadLimitationData(optAcctId);
		});
			
		$("#inputmerchant").on("select2-clearing", function() {
			$("#inputMaxTraffic").val('');
			$("#inputMaxTime").val('');
			$("#inputMaxSms").val('');
	 	});
		$('#form_limit_config').validate({
            errorClass: "error-notification",
            errorElement: "div",
            rules: {
            	inputMaxTraffic: {
                    required: true,
                    range: [1,10240]
                },
                inputMaxTime: {
                    required: true,
                    range: [10,2880]
                },
                inputMaxSms: {
                    required: true,
                    digits: true
                }
            },
            messages: {
            	inputMaxTraffic: {
            		required: "请输入流量限制值",
            		range: "请输入一个介于  1 和  10240 之间的值"
                },
                inputMaxTime: {
                	required: "请输入时长限制值",
                	range: "请输入一个介于  10  和  2880  之间的值"
                },
                inputMaxSms: {
                	required: "请输入验证短信限制值",
                	digits: "请输入一个整数"
                }
            },
            submitHandler: function (form) {
            	if(optAcctType!=ACCOUNT_TYPE.MERCHANT){
	            	if($('#inputmerchant').val()==''){
	        			alert('请选择商户');
	        			return false;
	        		}else{
	        			optAcctId = $('#inputmerchant').val();        			
	        		}
            	}
            	//alert(optAcctId);
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: '${pageContext.request.contextPath}/device/devicesavelimitation.htm',
                    data: {
						'accountid' : optAcctId,
						'minslimit' : $("#inputMaxTime").val(),
						'trafficlimit' : $("#inputMaxTraffic").val(),
						'smslimit' : $("#inputMaxSms").val()
					},
                    success: function (data) {
                        if (data.result == 'OK') {
    						$.pnotify({
    							title : "商户配置设置 成功",
    							text : "商户配置设置 成功...",
    							type : 'success',
    							after_close: function(pnotify){								
    								
    								//ListDevice();
    			                }
    						});
    					} else {
/*     						$.pnotify({
    							title : msgTitle+"失败",
    							text : data.message,
    							type : 'error'
    						}); */
    						return false;
    					}
                    },
                    error: function (data) {
/*     					$.pnotify({
    						title : "无法连接服务器",
    						text : msgTitle+"失败！",
    						type : 'error'
    					}); */

    					return false;
                    }
                });
            }
        });
	});
	
	function LoadLimitationData(accountid) {
		App.blockUI({target: el, textOnly: true});
		$.ajax({
					type : 'GET',
					dataType : 'json',
					url : '${pageContext.request.contextPath}/device/deviceuserlimitation.htm',
					data : {
						'accountid' : accountid
					},					
					success : function(data) {
						App.unblockUI(el);
						if (data.result != 'FAIL') {
							$("#inputMaxTraffic").val(data.trafficlimit);
							$("#inputMaxTime").val(data.minslimit);
							$("#inputMaxSms").val(data.smslimit);
						} else {
 							$.pnotify({
								title : "提示：",
								text : data.message,
								type : 'error'
							}); 
 							$("#inputMaxTraffic").val('');
							$("#inputMaxTime").val('');
							$("#inputMaxSms").val('');
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
	
	function ListDevice() {
		$.get('${pageContext.request.contextPath}/device/devicelist.htm',

		function(data) {
			$('#id_main_content').html(data);
		});
	}
</script>