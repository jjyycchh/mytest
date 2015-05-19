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
			href="${pageContext.request.contextPath}/system/publishcomponent.htm"
			class="active">组件库<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a 
			href="${pageContext.request.contextPath}/system/super_searchsms.htm">短信查询<span 
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a 
			href="${pageContext.request.contextPath}/user/super_authen_mgmt.htm">用户认证记录<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a 
			href="${pageContext.request.contextPath}/system/super_exception_log.htm">异常日志导出<span 
			class="glyphicon glyphicon-circle-arrow-right"></span>
		</a>

	</div>
	<div class="portal-main">
		<div class="wifi-main-header">
			<form id="siteSearch" class="wp-site-search" role="search">
				<div class="col-xs-3">
					<input type="text" class="form-control" name="keywords"
						id="keywords" placeholder="输入关键字">
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
				<div class="col-xs-3 col-bx-3">
					<button id="btn_search_component" type="button"
						class="btn btn-info">
						<span class="glyphicon glyphicon-search"></span> 查询
					</button>
					<a id="btn_show_upload_modal" class="btn btn-primary wp-right">
						<span class="glyphicon glyphicon-list"></span> 上传组件
					</a>
				</div>
			</form>
		</div>
		<div class="clear-line"></div>
		<div style="margin-bottom: 2px" class="portlet box yellow">
			<div class="portlet-title">
				<div class="caption">
					<i class="glyphicon glyphicon-qrcode"></i>组件列表
				</div>
				<div class="tools">
					<%--	<a class="ajax-init"
						href="${pageContext.request.contextPath}/system/portaltemplateedit.htm"><span
						class="glyphicon glyphicon-list"></span> 添加组件</a>   --%>
				</div>
			</div>
			<div id="componenttab" class="portlet-body">
				<table class="table table-hover">
					<thead>
						<tr>
							<th width="15%">组件编号</th>
							<th width="15%">版本号</th>
							<th width="20%">类型</th>
							<th width="15%">状态</th>
							<th class="text-center">操作</th>
						</tr>
					</thead>
					<tbody id="tbl_component_lst">
						
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
	</div>
</div>
<div id="mydelModal" class="modal fade in" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-del">
		<div class="modal-content">
			<div class="modal-header">
				<a class="btn" data-dismiss="modal"><span
					class="glyphicon glyphicon-remove"></span></a>
				<h5 class="modal-title" id="myModalLabel">&nbsp;删除组件</h5>
				<hr class="modal-inner-separator">
			</div>
			<div class="modal-body">
				<span
					style="font-size: 48px; float: left; padding-right: 20px; padding-left: 10px; color: #428BCA">
					<i class="glyphicon glyphicon-info-sign"></i>
				</span>
				<p style="font-weight: bold;">您确定删除该组件吗？</p>
				<p>组件删除后将不能恢复！</p>
			</div>
			<div class="modal-footer">
				<button id="del_btn_compent" class="btn btn-primary  btn-sm">确
					认</button>
				<button class="btn btn-success  btn-sm" data-dismiss="modal">取
					消</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dalog -->
</div>
<!-- /.modal -->

<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script type="text/javascript">statisJS.init();</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript">
   //MAIN_MENU.setActiveMenuItem("id_mm_account");
	
	var componentSearchHandler = null;	
	var search_component_keyword = null;
	var component_id = null;
	
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
			//setEndDate : myDate.toUTCString()
		});
		componentSearchHandler = new searchUtil(generatecomponentListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_component_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"${pageContext.request.contextPath}/system/searchpackage.htm", "componenttab");
				
		componentSearchHandler.searchWithPreload();
		
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		$("#btn_search_component").click(function() {
			keywordsSearch();
		});
		initialAvatarDlg();
		$("#btn_show_upload_modal").click(function() {
			showFileUploadDlg();
		});
		

		
		$('#del_btn_compent').on('click', function(event) {
			$('#mydelModal').modal('hide');
			event.preventDefault();
			//alert(component_id);
			$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/system/packagedelete.htm',
			data : {
				'pkg_id' : component_id				
			},
			success : function(data) {
				if (data.result != 'FAIL') {					
					
					$.pnotify({
						title : "组件删除成功",
						text : data.message,
						type : 'success',
						delay : 50,
						
						after_close: function(pnotify){
							componentSearchHandler.searchWithPreload();
		                }
					});
				} else {
					/*	$.pnotify({
						title : "组件删除失败",
						text : data.message,
						type : 'error'
					}); */
				}
			},
			error : function() {
				/*	$.pnotify({
					title : "组件删除失败",
					text : data.message,
					type : 'error'
				}); */
			}
		  });
	   });
		
		$("#mydelModal").on("hide", function() {
			 $("#del_btn_compent").off("click");
		});
		
	});
	function keywordsSearch() {
		var keywords = componentSearchHandler.convertKeywordsSearchable($("#keywords").val());
		componentSearchHandler.setSearchParemeter('keywords', keywords);
		componentSearchHandler.setSearchParemeter('startdate',  $("#startdate_input").val());
		componentSearchHandler.setSearchParemeter('endDate', $("#enddate_input").val());
		componentSearchHandler.searchWithPreload();
	}
	function convertKeywordsSearchable(keywords) {
		if (keywords == null) {
			keywords = "";
		}
		
		var keyword_array = keywords.replace(/;/g, " ").replace(/；/g, " ").split(" ");
		for (var i = 0; i < keyword_array.length;i++){
    		if (keyword_array[i].trim() == "")  {
    			keyword_array.remove(keyword_array[i]);
    		}
    		else {
    			i++;
    		}
		}		
		return keyword_array.join(" ");
	}
	
	function initialAvatarDlg() {
		$("#input_upload_file").fileupload({
		    url: '${pageContext.request.contextPath}/system/uploadcomponentpkg.htm',
		    dataType: 'json',
		    submit: function (e, data) {
		    	var isValidFile = UPLOAD_ZIPFILE_VALIDATION(data);
		    	
		    	if (isValidFile) {
			    	onPreUploadCallBack();
			        $(this).fileupload('send', data);
		    	}
		        return false;
		    },
		    done: function (e, data) {
		    	onUploadAvatarCallBack(data);
		    },
		    progressall: function (e, data) {
		        var progress = parseInt(data.loaded / data.total * 100, 10);
		        $("#div_progress_bar").css('width', progress + '%');
		    }
		}).prop('disabled', !$.support.fileInput)
        	.parent().addClass($.support.fileInput ? undefined : 'disabled');
		
		$("#resource_list_footer").hide();
	}
	
	function onUploadAvatarCallBack(data) {
		setTimeout ("closeFileUploadDlg();", 1000);
		if (data.result.result != 'FAIL') {
			$.pnotify({
	            title: "组件上传成功",	           
	            type: 'success'
	        });
			componentSearchHandler.searchWithPreload();
		} else {
			$.pnotify({
	            title: "组件上传失败",
	            text: data.result.message,
	            type: 'error'
	        });
		}
	}
	
	function searchFailCallBack(result, message) {
        $.pnotify({
            title: "组件数据加载失败",
            text: message,
            type: 'error'
        });
	}
	
	function searchErrorCallBack(result, message) {
        $.pnotify({
            title: "无法连接服务器",
            text: "加载组件数据请求提交失败！" + message,
            type: 'error'
        });
	}
	function generatecomponentListHtml(componentList) {
		var componentListHtml = "";		
		
		if (componentList.length > 0) {			
			for (var i = 0; i < componentList.length;i++) {
				var id = componentList[i].id;
				var ref_counter=componentList[i].refCounter;
				var version = componentList[i].version;				
				var type = componentList[i].type;
				var status = componentList[i].status;
				var description=componentList[i].description;
				var device_supported=componentList[i].deviceSupported;
				var requirements=componentList[i].requirements;
				var is_mandatory=componentList[i].isMandatory;
				var is_published=componentList[i].isPublished;
				var create_datetime=componentList[i].createDatetime;				
					componentListHtml += "<tr>"
					componentListHtml +=     "<td id='component_number_" + id + "'>" + id + "</td>";
					componentListHtml +=     "<td id='component_version_" + id + "'>" + version + "</td>";
					componentListHtml +=     "<td id='component_type_" + id + "'>" + generate_cn_type(type) + "</td>";			
					componentListHtml += 	 "<td id='component_status_"+ id + "'>" + statuspubSpan(status,is_published) +"</td>";
					componentListHtml +=     "<td id='component_opt_btn_" + id + "' class='text-center'>";
					componentListHtml += generateComponentOptBtn(id,status,is_published);				
					componentListHtml +=     "</td>";
					componentListHtml += "</tr>";
			}
		}
		return componentListHtml;
	}
	function generateComponentOptBtn(componentId,componentStatus,ispublished) {
		var componentOptBtnHtml = "";
		if (componentId != null) {			 			
			if (componentStatus == "LOCKED") {
				componentOptBtnHtml += 	"<a class='btn btn-default btn-xs' style='margin-right:3px' id='comp_unlock_" + componentId + "' href='javascript:unlockCompent(" + componentId + "," + ispublished + ")'>";
				componentOptBtnHtml +=    	"<span class='glyphicon glyphicon-open'></span>解锁";
				componentOptBtnHtml +=  "</a>";
				 				
			} else {
				componentOptBtnHtml += 	"<a class='btn btn-default btn-xs' style='margin-right:3px' id='comp_lock_" + componentId + "' href='javascript:lockCompent(" + componentId + "," + ispublished + ")'>";
				componentOptBtnHtml +=    	"<span class='glyphicon glyphicon-lock'></span>锁定";
				componentOptBtnHtml +=  "</a>";				 
			}		
			if(!ispublished){//未发布
				componentOptBtnHtml += 	" <a class='btn btn-default btn-xs' style='margin-right:3px' id='comp_publish_" + componentId + "' href='javascript:publishCompent(" + componentId + ",\""+componentStatus+"\");'>";
				componentOptBtnHtml +=    	"<span class='glyphicon glyphicon-share'></span>发布";
				componentOptBtnHtml +=    "</a>";
				
				componentOptBtnHtml += 	"<a class='btn btn-default btn-xs' id='comp_del_" + componentId + "' href='javascript:delCompent(" + componentId + ");'>";
				componentOptBtnHtml +=    	"<span class='glyphicon glyphicon-trash'></span>删除";
				componentOptBtnHtml +=    "</a>";
            }            
		}		
		return componentOptBtnHtml;
	} 
	function delCompent(pkg_id) {
		component_id = pkg_id;
		$('#mydelModal').modal('show');
		
	}
	
	function postPageChange() {
		var my_posts = $("[rel=tooltip]");
	    for(i=0;i<my_posts.length;i++){
	        the_post = $(my_posts[i]);	        
	        the_post.tooltip({ placement: 'bottom'});
	        the_post.css("cursor","pointer"); 
	    }
	}

	
	function publishCompent(pkg_id,status){
		$.ajax({
			type:'GET',
			dataType:'json',
			url: '${pageContext.request.contextPath}/system/packagepublish.htm',
			data: {
				'pkg_id': pkg_id
			},
			success: function(data) {
				if (data.result != 'FAIL') {
					var compentOptBtnHtml = generateComponentOptBtn(pkg_id, status ,true);
					$("#component_opt_btn_" + pkg_id).html(compentOptBtnHtml);
					$("#component_status_" + pkg_id).html(statuspubSpan(status,true));
					$.pnotify({
			                title: "组件发布成功",
			                type: 'success'
			            });	
				}
				else {
		            $.pnotify({
		                title: "组件发布失败",
		                type: 'error'
		            });
				}
			},
			error: function() {
	            $.pnotify({
	                title: "组件发布失败",
	                type: 'error'
	            });
			}									
		});

	}
		
	function lockCompent(pkg_id,ispubed) {		 
		$.ajax({
			type:'GET',
			dataType:'json',
			url: '${pageContext.request.contextPath}/system/packagelock.htm',
			data: {
				'pkg_id': pkg_id
			},
			success: function(data) {
				if (data.result != 'FAIL' && data.status != null) {
					var compentOptBtnHtml = generateComponentOptBtn(pkg_id, data.status,ispubed);
					$("#component_opt_btn_" + pkg_id).html(compentOptBtnHtml);
					$("#component_status_" + pkg_id).html(statuspubSpan(data.status,ispubed));
					//$().html();
					
				}
				else {
		            $.pnotify({
		                title: "组件锁定失败",
		                type: 'error'
		            });
				}
			},
			error: function() {
	            $.pnotify({
	                title: "组件锁定失败",
	                type: 'error'
	            });
			}									
		});
	}
	
	function unlockCompent(pkg_id,ispubed) {		
		$.ajax({
			type:'GET',
			dataType:'json',
			url: '${pageContext.request.contextPath}/system/packageunlock.htm',
			data: {
				'pkg_id': pkg_id
			},
			success: function(data) {
				if (data.result != 'FAIL') {
					var compentOptBtnHtml = generateComponentOptBtn(pkg_id, data.status,ispubed);
					$("#component_opt_btn_" + pkg_id).html(compentOptBtnHtml);
					$("#component_status_" + pkg_id).html(statuspubSpan(data.status,ispubed));
				}
				else {
		            $.pnotify({
		                title: "组件解锁失败",
		                type: 'error'
		            });
				}
			},
			error: function() {
	            $.pnotify({
	                title: "组件解锁失败",
	                type: 'error'
	            });
			}									
		});

	}
	
	function statuspubSpan(status,ispub)
	{
		var statusHtml="";
		var pubstr="";
		if(status != null){
			pubstr = ispub?"|已发布":"";
			if (status == "LOCKED") {
				statusHtml += "锁定";
			}else{
				statusHtml += "正常";
			}
			statusHtml += pubstr;
		}
		return statusHtml;
	}
	function generate_cn_type(entype){
		var cn_typenamehtml="";
		if(entype=="FIRMWARE"){
			cn_typenamehtml="<span class='label label-sm label-danger statulb'>固件</span>";
		}
		else if(entype=="COMPONENT_PORTAL"){
				cn_typenamehtml="<span class='label label-sm label-success statulb'>门户组件</span>";	
		}
		else{//COMPONENT-TASK
			   cn_typenamehtml="<span class='label label-sm label-info statulb'>任务组件</span>";
		}							
		return cn_typenamehtml;	
	}	
</script>


	

