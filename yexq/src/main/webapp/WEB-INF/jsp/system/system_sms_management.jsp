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
</style>

<div class="clear-line"></div>
<!-- /.modal -->
<div class="wifi-portal-body">
	<div class="portal-menu">
		<a href="${pageContext.request.contextPath}/merchant/smspurchasemgmt.htm">短信消费
		<span class="glyphicon glyphicon-circle-arrow-right"></span></a> 
		<a href="${pageContext.request.contextPath}/merchant/smsmanagement.htm" class="active">短信管理
		<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
<%-- 		<a href="${pageContext.request.contextPath}/account/setwechatacct.htm">公众微信号设置
		<span class="glyphicon glyphicon-circle-arrow-right"></span></a> --%>
	</div>
	<div class="portal-main">
		<div class="wifi-main-header">
			<form id="siteSearch" class="wp-site-search" role="search">
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
				</div>
			</form>
		</div>
		<div class="clear-line"></div>
		<div style="margin-bottom: 2px" class="portlet box yellow">
			<div class="portlet-title">
				<div class="caption">
					<i class="glyphicon glyphicon-qrcode"></i>短信列表
				</div>
				<div class="tools">
				</div>
			</div>
			<div id="Msgtab" class="portlet-body">
				<table class="table table-hover">
					<thead>
						<tr>
							<th  width="16%">手机号码</th>
							<th>短信内容</th>
							<th  width="24%">发送时间</th>

						</tr>
					</thead>
					<tbody id="tbl_Msg_lst">
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

<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script type="text/javascript">statisJS.init();</script>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript">
   //MAIN_MENU.setActiveMenuItem("id_mm_account");
	
	var smsMgsSearchHandler = null;	
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
			//setEndDate : myDate.toUTCString()
		});	
		smsMgsSearchHandler = new searchUtil(generateSMSListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_Msg_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"${pageContext.request.contextPath}/merchant/searchsms.htm", "Msgtab");
	
		smsMgsSearchHandler.searchWithPreload();
				
		$("#btn_search_component").click(function() {
			keywordsSearch();
		});  

	});
	
	function keywordsSearch() {		
		smsMgsSearchHandler.setSearchParemeter('startdate',  $("#startdate_input").val());
		smsMgsSearchHandler.setSearchParemeter('enddate', $("#enddate_input").val());				
		smsMgsSearchHandler.searchWithPreload();
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
            title: "短信数据加载失败",
            text: message,
            type: 'error'
        });
	}
	
	function searchErrorCallBack(result, message) {
        $.pnotify({
            title: "无法连接服务器",
            text: "加载短信数据请求提交失败！" + message,
            type: 'error'
        });
	}

	function generateSMSListHtml(SMSList) {
		var SMSListHtml = "";		
		if (SMSList.length > 0) {			
			for (var i = 0; i < SMSList.length;i++) {
				var id = SMSList[i].id;
				var cellphone = SMSList[i].cellphone;
				var content = SMSList[i].content;
				var createDatetime = SMSList[i].createDatetime;
				
				SMSListHtml += "<tr>"
			    SMSListHtml +=     "<td id='sms_cellphone_" + id + "'>" + cellphone + "</td>";
				SMSListHtml +=     "<td id='sms_content_" + id + "'>" + content + "</td>";
				SMSListHtml +=     "<td id='sms_createDatetime_" + id + "'>" + createDatetime + "</td>";
				SMSListHtml += "</tr>";
			}
		}

		return SMSListHtml;
	}

</script>


	

