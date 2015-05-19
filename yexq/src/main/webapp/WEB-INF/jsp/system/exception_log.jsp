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
			href="${pageContext.request.contextPath}/system/super_exception_log.htm" 
			class="active">异常日志导出<span class="glyphicon glyphicon-circle-arrow-right"></span>
		</a>
	</div>
	<div class="portal-main">
		<div class="wifi-main-header">
			<form id="siteSearch" class="wp-site-search" role="search">
				<!-- <div class="col-xs-4">
                	<input type="text" class="form-control" name="keywords"
						id="keywords" placeholder="根据手机号或短信内容查询">
            	</div> -->
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
				<div class="col-xs-2 col-bx-1">
					<button id="btn_search_elog" type="button" class="btn btn-info">
						<span class="glyphicon glyphicon-search"></span> 查询 </button>
				</div>
				
				<div class="col-xs-2 col-bx-1">
					<button id="btn_to_txt" type="button" class="btn btn-info">
					导出为txt文件</button>
				</div>
			</form>
		</div>
		<div class="clear-line"></div>
		<div style="margin-bottom: 2px" class="portlet box yellow">
			<div class="portlet-title">
				<div class="caption">
					<i class="glyphicon glyphicon-qrcode"></i>日志列表
				</div>
				<div class="tools">
				</div>
			</div>
			<div id="Msgtab" class="portlet-body">
				<table class="table table-hover">
					<thead>
						<tr>
							<th  width="10%">日志ID</th>
							<th  width="24%">生成时间</th>
							<th  width="16%">模块名称</th>
							<th>服务名称</th>
						</tr>
					</thead>
					<tbody id="tbl_Elog_lst" />
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

<!-- /.modal -->

<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script type="text/javascript">statisJS.init();</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript">
   //MAIN_MENU.setActiveMenuItem("id_mm_account");
	
	var elogSearchHandler = null;	

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
		});	
		elogSearchHandler = new searchUtil(generateElogListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_Elog_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"${pageContext.request.contextPath}/system/super_exception_log_search.htm", "Elogtab");
	
		elogSearchHandler.searchWithPreload();
				
		$("#btn_search_elog").click(function() {
			keywordsSearch();
		}); 
		
 		$("#btn_to_txt").click(function() {
			elogExport();
		});   
	});
	
	function elogExport() {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/system/super_to_txt.htm',
			data : {
				'startdate' : $("#startdate_input").val(),
				'enddate' : $("#enddate_input").val()
			},
			success : function(data) {
				if (data.result == 'OK') {
					window.open('${pageContext.request.contextPath}/system/download_txt.htm?message=' 
							+ data.message);
				} else {						
					$.pnotify({
						title : "失败",
						text : data.message,
						type : 'error'
					}); 
				}
			},
			error : function(data) {
				$.pnotify({
					title : "无法连接服务器",
					text : data.message,
					type : 'error'
				}); 
			}
		});
	}
	
	function keywordsSearch() {		
		var keywords = elogSearchHandler.convertKeywordsSearchable($("#keywords").val());
		elogSearchHandler.setSearchParemeter('startdate',  $("#startdate_input").val());
		elogSearchHandler.setSearchParemeter('enddate', $("#enddate_input").val());				
		elogSearchHandler.searchWithPreload();
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
            title: "日志数据加载失败",
            text: message,
            type: 'error'
        });
	}
	
	function searchErrorCallBack(result, message) {
        $.pnotify({
            title: "无法连接服务器",
            text: "日志请求提交失败！" + message,
            type: 'error'
        });
	}

	function generateElogListHtml(elogList) {
		var elogListHtml = "";		
		if (elogList.length > 0) {			
			for (var i = 0; i < elogList.length;i++) {
				var id = elogList[i].id;
				var createDatetime = elogList[i].createDatetime;
				var moduleName = elogList[i].moduleName;
				var serviceName = elogList[i].serviceName;
				
				elogListHtml += "<tr>"
				elogListHtml +=     "<td id='elog_id_" + id + "'>" + id + "</td>";
			    elogListHtml +=     "<td id='elog_createDatetime_" + id + "'>" + createDatetime + "</td>";
				elogListHtml +=     "<td id='elog_moduleName_" + id + "'>" + moduleName + "</td>";
				elogListHtml +=     "<td id='elog_serviceName_" + id + "'>" + serviceName + "</td>"; 
				elogListHtml += "</tr>";
			}
		}

		return elogListHtml;
	}

</script>