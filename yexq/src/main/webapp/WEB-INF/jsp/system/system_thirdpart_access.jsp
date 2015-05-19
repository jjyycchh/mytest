<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<style>
.wifi-portal-body {
	padding-bottom: 50px;
}

.tp-label-AUTH {
	background-color: #F3565D;
}

.tp-label-LOGIN {
	background-color: #89C4F4;
}

.tp-label-INSITE {
	background-color: #45B6AF;
}

.statulb {
	border-radius: 0 !important;
	font-size: 85%;
}

.table>tbody>tr>td {
	vertical-align: middle;
}

#add_access_div {
	margin-bottom: 2px;
}

a#addaccess,a#retlist {
	color: white;
}
</style>

<div class="clear-line"></div>
<div class="wifi-portal-body">
	<div class="portal-menu">
		<a href="${pageContext.request.contextPath}/system/system_management.htm">平台设置
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a> 
		<a href="${pageContext.request.contextPath}/system/portaltemplatemanagement.htm">模板设置
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a>
		<a class="active" href="${pageContext.request.contextPath}/system/systemthirdpartaccess.htm">第三方接入
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a>
		<a href="${pageContext.request.contextPath}/system/publishcomponent.htm">组件库
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a>
		<a href="${pageContext.request.contextPath}/system/super_searchsms.htm">短信查询
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a>
		<a href="${pageContext.request.contextPath}/user/super_authen_mgmt.htm">用户认证记录
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a> 
		<a href="${pageContext.request.contextPath}/system/super_exception_log.htm">异常日志导出
			<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a>
	</div>
	<div class="portal-main">
		<div style="margin-bottom: 2px" class="portlet box yellow">
			<div class="portlet-title" style="margin-top: 0px">
				<div class="caption">
					<form id="new_third_part_access" class="form-inline" role="form">
						<div class="form-group">
							<label class="sr-only" for="input_name">名称</label> 
							<input id="new_name" name="new_name" type="text" class="form-control" placeholder="名称" />
						</div>
			            <div class="form-group">
			                <label for="siteid" class="sr-only">默认门户站点(短信验证)</label>
			                <input type="text" id="siteid" name="SiteID">
			            </div>
						<div class="form-group">
							<button id="btn_save" type="submit" class="btn btn-default btn-primary" style="margin-left: 5px; margin-right: 10px">新增设备</button>

						</div>
					</form>
				</div>
			</div>

			<div id="templatetab" class="portlet-body">
				<!-- portal site -->
				<!-- <div class="wifi-main-site"> -->
				<table id="tb_dev" class="table table-hover">
					<thead>
						<tr>
							<th>名称</th>
							<th>虚拟设备id</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody id="tbl_vir_devicelst">
<%-- 						<tr>
							<td id='name_id'>qqqq</td>
							<td id='v_deviceid_id'>qqqqqqqqqqqq</td>
							<td><a class="btn btn-default btn-xs"
								href="javascript:blockauthaccess('id');"
								style="cursor: pointer; text-align: center"> <span
									class='glyphicon glyphicon-trash'></span> 删除
							</a></td>
						</tr> --%>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<script src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script type="text/javascript">statisJS.init();</script>
<script type="text/javascript">
	var template_id = null;
	$(document).ready(function() {
		//	$("#add_access_div").hide();
		//	$("#retlist").hide();

		LoadThirdParts();
		
		LoadThirdPartSites();
		
		$("#new_name").blur(function() {
			//generate vdeviceid on 
		});
		
		$("#new_third_part_access").validate({
            errorClass: "error-notification",
            errorElement: "div",
            rules: {
            	new_name: {
                    required: true,
                    maxlength: 200,
              	},
              	SiteID: {
              		required: true
              	}
            },
            messages: {
            	new_name: {
                    maxlength: "第三方认证名称不得超过200个字符",
                    remote:"第三方认证名称已被注册"
                },
                SiteID: {
                    required: "请选择默认站点"
                }
            },
            submitHandler: function (form) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url:'${pageContext.request.contextPath}/system/addthirdpartaccess.htm',
                    data: {
        				name: $("#new_name").val(),
        				siteid: $('input#siteid').val()
                    },
                    success: function (data) {
                        if (data.result == 'OK') {
                            $.pnotify({
                                title: "添加第三方认证成功",
                                type: 'success'
                            });
                            LoadThirdParts();
                        } else {
                            $.pnotify({
                                title: "添加第三方认证失败",
                                text: "第三方认证名称已经存在",
                                type: 'warning'
                            });
                        }
                    },
                    error: function (data) {
                        $.pnotify({
                            title: "无法连接服务器",
                            text: "提交第三方认证注册失败！",
                            type: 'warning'
                        });
                    }
                });
            }
		});
	});


	function AddAccessShow() {
		$("#tb_dev").hide();
		$("#addaccess").hide();
		$("#add_access_div").show();
		$("#retlist").show();

	}
	function RetlistDevice() {
		$("#tb_dev").show();
		$("#add_access_div").hide();
		$("#addaccess").show();
		$("#retlist").hide();
	}
	
	function LoadThirdParts() {
		$.ajax({
			type:'GET',
			dataType:'json',
			url: '${pageContext.request.contextPath}/system/thirdpartinfos.htm',
			success: function(data) {
				if (data.result != 'FAIL') {
					if (data.thirdparts != null) {
						var lstHtml = generateThirdPartsHtml(data.thirdparts);
						$("#tbl_vir_devicelst").children().remove();
						$("#tbl_vir_devicelst").html("");
						$("#tbl_vir_devicelst").html(lstHtml);
					}
				}
			},
			error: function() {
			}									
		});
	}
	
	function LoadThirdPartSites() {
		$.ajax({
			url:'${pageContext.request.contextPath}/merchant/thirdpartsites.htm',
			type:'GET',
			dataType:'json',
			async:false,
			success:function(data){
				if(data.result=='OK'){
					var temp = [];
					for(i=0;i<data.records.length;i++){
						temp.push({id:data.records[i].id,text:data.records[i].name});
					}
					$('input#siteid').select2({data:temp,width:180});
				}
			}
		});
	}
	
	function generateThirdPartsHtml(thirdParts) {
		var thirdPartsLstHtml = "";
		
		if (thirdParts != null && thirdParts.length > 0) {
			for (var i = 0; i < thirdParts.length; i++) {
				var third_part_id = thirdParts[i].id;
				var business_name = thirdParts[i].name;
				var virtual_device_id = thirdParts[i].vdeviceid;
				var site_id = thirdParts[i].siteid;
				var status = thirdParts[i].status;
				var create_datetime = thirdParts[i].createdatetime;
				
				var thirdPartsItemHtml = "";
				
				thirdPartsItemHtml += "<tr>";
				thirdPartsItemHtml += 	"<td id='name_" + third_part_id + "'>" + business_name + "</td>";
				thirdPartsItemHtml += 	"<td id='v_deviceid_" + third_part_id + "'>" + virtual_device_id + "</td>";
/* 				thirdPartsItemHtml += 	"<td>";
				thirdPartsItemHtml += 		"<a class='btn btn-default btn-xs' href='javascript:deleteaccess(" + third_part_id + ");' style='cursor: pointer; text-align: center'>"; 
				thirdPartsItemHtml += 			"<span class='glyphicon glyphicon-trash'></span> 删除";
				thirdPartsItemHtml += 		"</a>";
				thirdPartsItemHtml += 	"</td>"; */
				thirdPartsItemHtml += 	"<td id='status_" + third_part_id + "'>" + THIRD_PART_ACCESS_STATUS.convertStatusToCn(status) + "</td>";
				thirdPartsItemHtml += 	"<td id='lock_" + third_part_id + "'>";
				thirdPartsItemHtml += 		generateLockBtn(third_part_id, status);
				thirdPartsItemHtml += 	"</td>";
				thirdPartsItemHtml += "</tr>";
				
				thirdPartsLstHtml += thirdPartsItemHtml;
			}
		}
		
		return thirdPartsLstHtml;
	}
	
	function generateLockBtn(third_part_id, status) {
		var lockBtnHtml = "";
		if (status == THIRD_PART_ACCESS_STATUS.NORMAL) {
			lockBtnHtml += 		"<a class='btn btn-default btn-xs' href='javascript:blockaccess(" + third_part_id + ");' style='cursor: pointer; text-align: center'>"; 
			lockBtnHtml += 			"<span class='glyphicon glyphicon-trash'></span> 锁定";
			lockBtnHtml += 		"</a>";
		}
		else {
			lockBtnHtml += 		"<a class='btn btn-default btn-xs' href='javascript:unblockaccess(" + third_part_id + ");' style='cursor: pointer; text-align: center'>"; 
			lockBtnHtml += 			"<span class='glyphicon glyphicon-trash'></span> 解锁";
			lockBtnHtml += 		"</a>";
		}
		
		return lockBtnHtml;
	}
	
	function deleteaccess(id) {
		$.ajax({
			type:'GET',
			dataType:'json',
			url: '${pageContext.request.contextPath}/system/deletethirdpart.htm',
			data: {
				'id': id
			},
			success: function(data) {
				if (data.result != 'FAIL') {
					LoadThirdParts();
				}
			},
			error: function() {
	            $.pnotify({
	                title: "删除第三方接入失败",
	                type: 'warning'
	            });
			}									
		});
	}
	function blockaccess(id) {
		$.ajax({
			type:'POST',
			dataType:'json',
			url: '${pageContext.request.contextPath}/system/blockthirdpartstatus.htm',
			data: {
				'id': id
			},
			success: function(data) {
				if (data.result != 'FAIL') {
					if (data.thirdpart != null) {
						var third_part_id = data.thirdpart.id;
						var status = data.thirdpart.status;
						
						var lockbtnHtml = generateLockBtn(third_part_id, status);
						
						$("#lock_" + third_part_id).children().remove();
						$("#lock_" + third_part_id).html("");
						$("#lock_" + third_part_id).html(lockbtnHtml);
						
						$("#status_" + third_part_id).children().remove();
						$("#status_" + third_part_id).html("");
						$("#status_" + third_part_id).html(THIRD_PART_ACCESS_STATUS.convertStatusToCn(status));
					}
				}
			},
			error: function() {
	            $.pnotify({
	                title: "第三方接入锁定失败",
	                type: 'warning'
	            });
			}									
		});
	}
	function unblockaccess(id) {
		$.ajax({
			type:'POST',
			dataType:'json',
			url: '${pageContext.request.contextPath}/system/unblockthirdpartstatus.htm',
			data: {
				'id': id
			},
			success: function(data) {
				if (data.result != 'FAIL') {
					if (data.thirdpart != null) {
						var third_part_id = data.thirdpart.id;
						var status = data.thirdpart.status;
						
						var lockbtnHtml = generateLockBtn(third_part_id, status);
						
						$("#lock_" + third_part_id).children().remove();
						$("#lock_" + third_part_id).html("");
						$("#lock_" + third_part_id).html(lockbtnHtml);
						
						$("#status_" + third_part_id).children().remove();
						$("#status_" + third_part_id).html("");
						$("#status_" + third_part_id).html(THIRD_PART_ACCESS_STATUS.convertStatusToCn(status));
					}
				}
			},
			error: function() {
	            $.pnotify({
	                title: "第三方接入解锁失败",
	                type: 'warning'
	            });
			}									
		});
	}
</script>
