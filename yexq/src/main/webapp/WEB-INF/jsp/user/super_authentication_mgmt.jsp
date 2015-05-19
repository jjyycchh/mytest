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
			href="${pageContext.request.contextPath}/user/super_authen_mgmt.htm"
			class="active">用户认证记录<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a 
			href="${pageContext.request.contextPath}/system/super_exception_log.htm">异常日志导出<span 
			class="glyphicon glyphicon-circle-arrow-right"></span>
		</a>

	</div>
	<div class="portal-main">
		<div class="wifi-main-header">
			<form id="siteSearch" class="wp-site-search" role="search">
				<div class="col-xs-4">
                	<input type="text" class="form-control" name="keywords"
						id="keywords" placeholder="根据MAC地址查询">
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
				<div class="col-xs-2 col-bx-1">
					<button id="btn_search_auth" type="button"
						class="btn btn-info">
						<span class="glyphicon glyphicon-search"></span> 查询
					</button>
				</div>
			</form>
		</div>
		<div class="clear-line"></div>
		<div style="margin-bottom: 2px" class="portlet box yellow">
			<div class="portlet-title">
				<div class="caption">
					<i class="glyphicon glyphicon-qrcode"></i>认证记录
				</div>
				<div class="tools">
				</div>
			</div>
			<div id="Msgtab" class="portlet-body">
				<table class="table table-hover">
					<thead>
						<tr>
							<th  width="20%">终端MAC地址</th>
							<th  width="30%">下线时间</th>
							<th  width="20%">上行流量</th>
							<th  width="20%">下行流量</th>
							<th class="text-center">操作</th>
						</tr>
					</thead>
					<tbody id="tbl_auth_lst">
						<!-- <tr>
							<td>1111</td>
							<td>1111</td>
							<td>111</td>
						</tr> -->
					</tbody>
				</table>
			</div>
			<div class="panel-footer">
				<div class="row">
					<div class="col-md-6">
						<h6>
							第 <span class="label label-info" id="lb_pagetotal_auth"></span> 页
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
	var authSearchHandler = null;
	var auth_log_list = null;
	var item = 0;
	
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
		
		authSearchHandler = new searchUtil(generateAuthListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_auth_lst", "lb_pagetotal_auth", "a_pagination_previous", "a_pagination_next", 
				"${pageContext.request.contextPath}/user/super_authen.htm","authstab");
		
		authSearchHandler.searchWithPreload();
	
		$("#btn_search_auth").click(function() {
			keywordsSearch();
		});
		
		$("#btn_prev").click(function() {
			btnPrev();
		});
		
		$("#btn_next").click(function() {
			btnNext();
		});
		
	});
	
	function keywordsSearch() {
		var keywords = authSearchHandler.convertKeywordsSearchable($("#keywords").val());
		authSearchHandler.setSearchParemeter('keywords', keywords);
		authSearchHandler.setSearchParemeter('startdate',  $("#startdate_input").val());
		authSearchHandler.setSearchParemeter('enddate', $("#enddate_input").val());		
		authSearchHandler.searchWithPreload();
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
			title : "认证数据加载失败",
			text : message,
			type : 'error'
		}); 
	}
	function searchErrorCallBack(result, message) {
 		$.pnotify({
			title : "无法连接服务器",
			text : "加载认证数据请求提交失败！" + message,
			type : 'error'
		}); 
	}
	
	function generateAuthListHtml(authList) {
		auth_log_list = authList;
		var authListHtml = "";

		if (authList.length > 0) {
			for (var i = 0; i < authList.length; i++) {
				var authid = authList[i].id;
				var offlineDatetime = authList[i].offlineDatetime;
				var totalUpTraffic = authList[i].totalUpTraffic;
				var totalDwTraffic = authList[i].totalDwTraffic;
             	var mac = authList[i].mac;

				authListHtml += "<tr class='Device-State-Table-Body'>";
 				authListHtml += "<td id='user_mac_" + authid + "'>" + mac + "</td>";
 				authListHtml += "<td id='user_offline_datetime" + authid + "'>" + offlineDatetime + "</td>"; 
				authListHtml += "<td id='user_up_traffic_" + authid + "'>" + trafficFormatter(totalUpTraffic) + "</td>";
				authListHtml += "<td id='user_dw_traffic_" + authid + "'>" + trafficFormatter(totalDwTraffic) + "</td>";
				authListHtml += "<td id='auth_opt_btn_" + authid + "' class='text-center'>";
				authListHtml += generateAuthOptBtn(i);
				authListHtml += "</td>";
				authListHtml += "</tr>";
			}
		}
		return authListHtml;
	}

	function generateAuthOptBtn(i) {
		var authOptBtnHtml = "";
		if (auth_log_list[i].id != null) {
			authOptBtnHtml += "<a class='btn btn-default btn-xs' id='auth_details_" + auth_log_list[i].id + "' href='javascript:showAuthInfo(" + i + ")'>";
			authOptBtnHtml += "<span class='glyphicon glyphicon-edit'></span>详情";
			authOptBtnHtml += "</a> ";
			}
		return authOptBtnHtml;
	}
	
	function showAuthInfo(i) {
		item = i;
		$('#id_authInfoModal').modal('show');
		viewAuthProfile(i);
	}
	
	function viewAuthProfile(i) {
		$("#id_auth_mac").text(auth_log_list[i].mac);
		$("#id_auth_mac").show();
		
		$("#id_auth_term_type").text(auth_log_list[i].terminalType);
		$("#id_auth_term_type").show();
		
		$("#id_auth_brow_type").text(auth_log_list[i].browserType);
		$("#id_auth_brow_type").show();
		
		$("#id_auth_type").text(auth_log_list[i].authType);
		$("#id_auth_type").show();
		
		$("#id_auth_cellphone").text(auth_log_list[i].cellphone);
		$("#id_auth_cellphone").show();
		
		$("#id_auth_sms").text(auth_log_list[i].content);
		$("#id_auth_sms").show();
		
		$("#id_auth_up_traffic").text(trafficFormatter(auth_log_list[i].totalUpTraffic));
		$("#id_auth_up_traffic").show();
		
		$("#id_auth_dw_traffic").text(trafficFormatter(auth_log_list[i].totalDwTraffic));
		$("#id_auth_dw_traffic").show();
		
		$("#id_create_datetime").text(auth_log_list[i].createDatetime);
		$("#id_create_datetime").show();
		
		$("#id_offline_datetime").text(auth_log_list[i].offlineDatetime);
		$("#id_offline_datetime").show();
		
		$("#id_modified_datetime").text(auth_log_list[i].modifiedDatetime);
		$("#id_modefied_datetime").show();
		
		$("#id_status").text(auth_log_list[i].status);
		$("#id_status").show();
		
		$("#id_auth_token").text(auth_log_list[i].token);
		$("#id_auth_token").show();
		
		if (i == 0) {
			$("#btn_prev").hide();
			$("#btn_next").show();
		} else if (i == 9) {
			$("#btn_prev").show();
			$("#btn_next").hide();
		} else {
			$("#btn_prev").show();
			$("#btn_next").show();
		}
	}
	
	function btnPrev()
	{
		showAuthInfo(item - 1);
	}
	
	function btnNext()
	{
		showAuthInfo(item + 1);
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
	
</script>