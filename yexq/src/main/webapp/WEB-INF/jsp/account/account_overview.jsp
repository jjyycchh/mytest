<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<style>
hr {border-top:1px dashed #00F ; }
.account_detail_ul_li{
              border-bottom:1px dashed #86c9da;
              list-style-type:none;
              margin-top:12px;

                   }
.optlog_ul_li{
             border-top:1px solid #ccdff0;
             color:#2a60a0;
             padding-top:2px;
             padding-bottom:0px;
             font-size:12px
}

.panel_item{
	height:85px;
	padding-top:10px;
	font-size:15px;
	display: block;
	/*background: linear-gradient(to bottom, #FFFFFF 0%, #EEEEEE 100%) repeat-x scroll 0 0 #F3F3F3;
	border: 1px solid #DDDDDD;*/
    border-radius: 5px;
    color: #ffffff;
}
.panel_item:hover{
	/*background: linear-gradient(to bottom, #FaFaFa 0%, #E1E1E1 100%) repeat-x scroll 0 0 #F3F3F3;
	color: #e92d00;
	border-color: #e92d00 transparent;*/
	filter: progid:DXImageTransform.Microsoft.Shadow(color='#888888', Direction=135, Strength=5);/*for ie6,7,8*/
	-moz-box-shadow:2px 2px 2px 2px #888888;/*firefox*/
	-webkit-box-shadow:2px 2px 2px 2px #888888;/*webkit*/
	color: #ffffff;
	box-shadow: 2px 2px 2px 2px #888888;
}
#panel_1{
	background-color:#92cf68;
	text-decoration: none;
	cousor: pointer;
}
#panel_2{
	background-color:#58B5e1;
	text-decoration: none;
	cousor: pointer;
}
#panel_3{
	background-color:#fa6567;
	text-decoration: none;
	cousor: pointer;
}
#panel_4{
	background-color:#fda239;
	text-decoration: none;
	cousor: pointer;
}
#panel_5{
	background-color:#246bd3;
	text-decoration: none;
	cousor: pointer;
}
#panel_6{
	background-color:#d88dfe;
	text-decoration: none;
	cousor: pointer;
}
.panel_div_span{
text-align:center;
}
.panel_img{
margin-left:45px;
}
.badge-info {
    background-color: #89C4F4;
    background-image: none;
}
.statspanel {
    
    margin-bottom: 0px;
}
.portlet.grey-cararra {
    background-color: #FAFAFA;
    margin-bottom: 0px;
}
.demo-placeholder {
    font-size: 12px;
    height: 100%;
    line-height: 0.8em;
    width: 100%;
}
.statscaption {
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    margin: 0 0 8px;
    min-width: 150px;
    padding: 0;
}
.solid.portlet {
    padding: 5px 10px;
}
.bordered.solid.portlet > .portlet-title {
    margin-bottom: 2px;
}
.panel > .list-group .list-group-item:first-child{
	border: 0 none;
}
.opt_logstyle{
margin-bottom:5px;
margin-left:0px;
margin-right:0px;
border: 1px solid #c9dff4;
-webkit-border-radius: 6px;
-moz-border-radius: 6px;
border-radius: 6px
}
.account_infostyle{
margin-bottom:5px;
margin-left:3px;
border: 1px solid #c9dff4;
-webkit-border-radius: 6px;
-moz-border-radius: 6px;
border-radius: 6px
}
</style>
<div class="container-fluid">
	<div class="row-fluid">
		<div class="col-md-12">
			<div class="row" style="padding-top: 20px; padding-bottom: 15px">
				<div class="col-md-6">
					<div class="row account_infostyle">
						<div class="example avatar-images col-md-3"
							style="padding-top: 10px; padding-bottom: 20px">
							<a id="btn_show_upload_modal" style="cursor: pointer;"> <img
								id="acct_avatar"
								src="${pageContext.request.contextPath}/resources/img/touxiang.gif"
								data-src="holder.js/200x350/sky"
								style="width: 100px; height: 120px; max-width: 100px; max-height: 120px;"
								class="img-thumbnail">
							</a>
						</div>
						<div class="col-md-9" style="margin-bottom: 18px">
							<ul style="padding-left: 0px">
								<li class="account_detail_ul_li"><img
									src='${pageContext.request.contextPath}/resources/img/tu_menu1.gif'></img>创建时间：<span
									id="acct_create_datetime"></span></li>
								<li class="account_detail_ul_li"><img
									src='${pageContext.request.contextPath}/resources/img/tu_menu1.gif'></img>上次登录时间：<span
									id="acct_last_login_datetime"></span></li>
								<li class="account_detail_ul_li"><img
									src='${pageContext.request.contextPath}/resources/img/tu_menu1.gif'>所属区域：<span
									id="acct_geo_location"></span></li>
								<li class="account_detail_ul_li"><img
									src='${pageContext.request.contextPath}/resources/img/tu_menu1.gif'>分组标签：<span
									id="acct_tags" style="padding: 8px"></span></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="opt_logstyle">
						<div id="simple_self_opt_log" class="col-md-12">
							<!-- <p>最近操作记录：</p>
						<p>2014-09-09 08:10  创建新商户****</p>
						<p>2014-09-09 08:10  创建新商户****</p>
						<p>2014-09-09 08:10  创建新商户****</p>
						<a href="">更多>>></a> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row-fluid">
		<div class="col-md-12">
			<!-- BEGIN SAMPLE TABLE PORTLET-->
			<div class="portlet box yellow">
				<div class="portlet-title">
					<div class="caption">
						信息统计 <i class="glyphicon glyphicon-qrcode"></i>
					</div>
					<div class="tools"></div>
				</div>
				<div class="portlet-body">
					<div class="clearfix">
						<div class="col-md-8" style="padding-left: 0px;">
							<div class="portlet solid bordered grey-cararra">
								<div class="portlet-title">
									<div class="statscaption">
										<i class="glyphicon glyphicon-stats"></i> 最近24小时接入用户数
									</div>
									<div class="tools"></div>

								</div>
								<div class="portlet-body">
									<div id="chart_2" class="chart"
										style="height: 200px; padding: 0px; position: relative;">
										<div id="placeholder" class="demo-placeholder"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="panel statspanel panel-warning col-md-4">
							<ul class="list-group">
								<li class="list-group-item" id="li_stats_inc_user">最近24小时连接用户数
									<span class="badge badge-info" id="stats_inc_user"> </span>
								</li>
								<li class="list-group-item" id="li_stats_inc_merchant">最近24小时新增商户数<span
									class="badge badge-info" id="stats_inc_merchant"> </span>
								</li>
								<li class="list-group-item" id="li_stats_inc_account">最近24小时新增帐号数<span
									class="badge badge-info" id="stats_inc_account"> </span>
								</li>
								<li class="list-group-item" id="li_stats_sub_admin">下属管理帐号数
									<span class="badge badge-info" id="stats_sub_admin"> </span>
								</li>
								<li class="list-group-item" id="li_stats_sub_merchant">下属商户总数<span
									class="badge badge-info" id="stats_sub_merchant"> </span>
								</li>
								<li class="list-group-item" id="li_stats_sub_account">下属帐号总数<span
									class="badge badge-info" id="stats_sub_account"> </span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div
					style="height: 5px; border-radius: 5px; background-color: #ffffff"></div>
			</div>
			<!-- END SAMPLE TABLE PORTLET-->
		</div>
		<div class="col-md-2"></div>
	</div>

	<div class="row-fluid">
		<div class="col-md-12">
			<!-- BEGIN SAMPLE TABLE PORTLET-->
			<div class="portlet box blue">
				<div class="portlet-title">
					<div class="caption">
						快捷面板 <i class="glyphicon glyphicon-qrcode"></i>
					</div>
					<div class="tools"></div>
				</div>
				<div class="portlet-body">
					<div class="row" id="div_shortcuts_board">
						<div class="col-md-2">
							<a id="panel_1" class="panel_item"
								onMouseDown="javascript:selectedpanel(this);"
								onMouseUp="javascript:shortcutLaunch('${pageContext.request.contextPath}/device/devicelist.htm')"
								href='#'> <img class="panel_img"
								src="${pageContext.request.contextPath}/resources/img/biao_01.png" />
								<div class="panel_div_span">
									<span style="color: white">设备管理</span>
								</div>
							</a>
						</div>
						<div class="col-md-2">
							<a id="panel_2" class="panel_item"
								onMouseDown="javascript:selectedpanel(this);"
								onMouseUp="javascript:shortcutLaunch('${pageContext.request.contextPath}/merchant/sites.htm')"
								href='#'> <img class="panel_img"
								src="${pageContext.request.contextPath}/resources/img/biao_02.png" />
								<div class="panel_div_span">
									<span style="color: white">站点管理</span>
								</div>
							</a>
						</div>
						<div class="col-md-2">
							<a id="panel_3" class="panel_item"
								onMouseDown="javascript:selectedpanel(this);"
								onMouseUp="javascript:shortcutLaunch('${pageContext.request.contextPath}/merchant/addsite.htm')"
								href='#'> <img class="panel_img"
								src="${pageContext.request.contextPath}/resources/img/biao_03.png" />
								<div class="panel_div_span">
									<span style="color: white">新增站点</span>
								</div>
							</a>
						</div>
						<div class="col-md-2">
							<a id="panel_4" class="panel_item"
								onMouseDown="javascript:selectedpanel(this);"
								onMouseUp="javascript:shortcutLaunch('${pageContext.request.contextPath}/merchant/portalpolicies.htm')"
								href='#'> <img class="panel_img"
								src="${pageContext.request.contextPath}/resources/img/biao_04.png" />
								<div class="panel_div_span">
									<span style="color: white">推送策略管理</span>
								</div>
							</a>
						</div>
						<div class="col-md-2">
							<a id="panel_5" class="panel_item"
								onMouseDown="javascript:selectedpanel(this);"
								onMouseUp="javascript:shortcutLaunch('${pageContext.request.contextPath}/merchant/addportalpolicy.htm')"
								href='#'> <img class="panel_img"
								src="${pageContext.request.contextPath}/resources/img/biao_05.png" />
								<div class="panel_div_span">
									<span style="color: white">新增推送策略</span>
								</div>
							</a>
						</div>
						<div class="col-md-2">
							<a id="panel_6" class="panel_item"
								onMouseDown="javascript:selectedpanel(this);"
								onMouseUp="javascript:shortcutLaunch('${pageContext.request.contextPath}/user/users.htm')"
								href='#'> <img class="panel_img"
								src="${pageContext.request.contextPath}/resources/img/biao_06.png" />
								<div class="panel_div_span">
									<span style="color: white">用户管理</span>
								</div>
							</a>
						</div>
						<!-- END DASHBOARD STATS -->
					</div>
					<!-- BEGIN DASHBOARD STATS -->
				</div>
			</div>
		</div>
	</div>
</div>
<div id="div_acctOptDetailsLogs" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header modal-header-primary">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h4 class="modal-title" style="font-family: 微软雅黑;"><i class="glyphicon glyphicon-arrow-right"></i> 操作记录</h4>
			</div>
			<div class="modal-body">
				<!-- here is content of member info -->
				<div id="logtab" class="row">
					<div class="col-md-12">
						<table class="table table-hover table-strip">
							<!-- <thead id="thead_optlogs"></thead> -->
							<tbody id="tbody_optlogs"></tbody>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<h6>
							第 <span class="label label-info" id="lb_pagenumber"></span> 页
						</h6>
					</div>
					<div class="col-md-6">
						<div id="div_pagination" class="col-md-offset-3">
							<ul id="ul_pagination" class="pager">
							  <li><a id="a_pagination_previous" style="cursor:pointer;"> 前一页 </a></li>
							  <li><a id="a_pagination_next" style="cursor:pointer;"> 后一页 </a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer modal-footer-default">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->
	
<div id='div_upload_avatar' class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-body">
				<form role="form" id="form_upload_avatar" enctype="multipart/form-data" id="form_upload_avatar">
					<input id="input_avatar" name="image" type="file" style="margin-bottom: 5px;"
						class="form-control" required autofocus>
					<div id="div_avatar_progress" class="progress progress-striped active">
						<div id="div_avatar_progress_bar" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
							<span id="avatar_progress_precent" class="sr-only"></span>
						</div>
					</div>
					<div class="col-md-2 pull-right" style='margin-top: 10px;'>
						<button id="btn_change_avatar" class="btn btn-primary"
							type="submit">确定</button>
					</div>
					<div class="col-md-2 pull-right" style='margin-top: 10px;'>
						<a href="#" id='btn_cancel_avatar' class="btn btn-default"
							role="button"> <i class="icon ion-reply"></i> 取消
						</a>
					</div>
				</form>
			</div>
			<div class="modal-footer" style='margin-top:30px;'></div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog-->
</div>
<%-- <script src="${pageContext.request.contextPath}/resources/js/jquery.flot.min.js"></script> --%>

<script type="text/javascript">
	var logSearchHandler = null;
	
	var log_totalPages = null;
	var log_totalResult = null;
	var log_pageSize = null;
	var log_pageNo = null;
	
	var currLoginAccountId = null;

	$(document).ready(function() {
		currLoginAccountId = "${sessionScope.login_account_info.id}";
		logSearchHandler = new searchUtil(generateLogListHtml, searchFailCallBack, searchErrorCallBack, null, null,
				"tbody_optlogs", "lb_pagenumber", "a_pagination_previous", "a_pagination_next", 
				"${pageContext.request.contextPath}/account/account_log.htm", "logtab");
		
		logSearchHandler.addSearchParameter("display", "complex");
		logSearchHandler.addSearchParameter("accountid", currLoginAccountId);
		
		showAccountOverviewInfo();
		
		LoadAccountStats();
		
		LoadAccountTags();
		
		LoadAccountLog();
		
		LoadShortcuts();
		
		initialAvatarDlg();
		getUserStatisticsData(null);
		//initialResourceDlg();
		$("#btn_show_upload_modal").click(function() {
			showFileUploadDlg();
			//showResourceDlg();
		});

/* 		if (account_type == ACCOUNT_TYPE.MERCHANT) {
			$("#li_stats_sub_admin").hide();
			$("#li_stats_sub_merchant").hide();
			$("#li_stats_sub_account").hide();
			
		} */
	});

	function selectedpanel(obj) {
		$(".panel_item").removeClass("shadow");
		$(obj).addClass("shadow");
	}
	function LoadShortcuts() {
		$.ajax({
		    type: 'GET',
		    dataType: 'json',
			url: "${pageContext.request.contextPath}/account/accountshortcuts.htm",
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
			success : function (data) {
				if (data.result != "FAIL" && data.shortcuts.length > 0) {
					var shortcuts_board = $("#div_shortcuts_board");
					shortcuts_board.children().remove();
					shortcuts_board.html(generateShortcutsHtml(data.shortcuts));
				}
			}
		});
	}
	
	function shortcutLaunch(url) {
		var id_dest_div = "id_main_content";
		$.get(url, function (data) {
			var dest_div = $('#' + id_dest_div);
			dest_div.children().remove();
			dest_div.html(data);
		    $('html').unmask();
		});
	} 
	
	function generateShortcutsHtml(records) {
		if (records == null || records.length ==0) {
			return "";
		}
		
		records = records.sort(function(a, b) { return a.createdatetime - b.createdatetime;});

		var shortcutsHtml = "";
		var appUrl = "${pageContext.request.contextPath}";
		
		var limit = 6;
		if (records.length < 6) {
			limit = records.length;
		}
		for (var i=0; i < limit;i++) {
			var location = appUrl + SHORTCUT_REFS.getResourceLocationByRef(records[i].ref);
			var name = records[i].name;
			var url = appUrl + records[i].url;
			
			var shortcutHtml = "";
			
			shortcutHtml += "<div class='col-md-2'>";
			shortcutHtml += 	"<a id='panel_" + (i+1) + "' class='panel_item' onMouseUp=\"javascript:shortcutLaunch('" + url + "');\" onMouseDown=\"javascript:selectedpanel(this);\" href='#'>";
			shortcutHtml += 		"<img class='panel_img' src='" + location + "' />";
			shortcutHtml += 		"<div class='panel_div_span'>";
			shortcutHtml += 			"<span>" + name + "</span>";
			shortcutHtml += 		"</div>";
			shortcutHtml += 	"</a>";
			shortcutHtml += "</div>";

			shortcutsHtml += shortcutHtml;
		}
		
		return shortcutsHtml;
	}
	
	function showMoreOptLogs() {
	
		logSearchHandler.searchWithPreload();
		
		$('#div_acctOptDetailsLogs').modal('show');
	}
	
	function showAccountOverviewInfo() {
		var account_create_dt = "<s:date name='#session.login_account_info.createDatetime' format='yyyy-MM-dd HH:mm:ss' />";
		var account_last_login_dt = "<s:date name='#session.login_account_info.lastLoginDatetime' format='yyyy-MM-dd HH:mm:ss' />";
		var account_geo_location = '${sessionScope.login_account_info.geoLocation}';
		var account_avatar_url = "${pageContext.request.contextPath}" + "${sessionScope.login_account_info.avatarPath}";
		
		if (account_avatar_url != null && account_avatar_url != "") {
			$("#acct_avatar").attr('src', account_avatar_url);
		}
		$("#acct_create_datetime").html(account_create_dt);
		$("#acct_last_login_datetime").html(account_last_login_dt);
		
		var province = "";
		var city = "";
		var county = "";
		var address = "";
		
		if (account_geo_location != null && account_geo_location != undefined && account_geo_location != "") {
			account_geo_location = JSON.parse(account_geo_location);
			
			province = account_geo_location.province == undefined || account_geo_location.province == null ? "" : account_geo_location.province + " ";
			city = account_geo_location.city == undefined || account_geo_location.city == null ? "" : account_geo_location.city + " ";
			county = account_geo_location.county == undefined || account_geo_location.county == null ? "" : account_geo_location.county + " ";
			address = account_geo_location.address == undefined || account_geo_location.address == null ? "" : account_geo_location.address + " ";
		}
		
		$("#acct_geo_location").text(province + city + county + address);
	}
	
	function LoadAccountStats() {
		$.ajax({
		    type: 'GET',
		    dataType: 'json',
			url: '${pageContext.request.contextPath}/account/accountoverstats.htm',
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
			success : function (data) {
				if (data.result != 'FAIL') {
					var accountType = '${sessionScope.login_account_info.type}';
					if (accountType != ACCOUNT_TYPE.MERCHANT) {
						$("#stats_inc_user").html(data.userincrease);
						$("#stats_inc_merchant").html(data.merchantincrease);
						$("#stats_inc_account").html(data.acctincrease);
						$("#stats_sub_admin").html(data.subadminnum);
						$("#stats_sub_merchant").html(data.submerchantnum);
						$("#stats_sub_account").html(data.subacctnum);
					}
					else {
						$("#stats_inc_user").html(data.userincrease);
						$("#stats_inc_merchant").html("NA");
						$("#stats_inc_account").html("NA");
						$("#stats_sub_admin").html("NA");
						$("#stats_sub_merchant").html("NA");
						$("#stats_sub_account").html("NA");
					}
				}
				else {
		            $.pnotify({
		                title: "帐号统计信息加载失败",
		                type: 'error'
		            });
				}
			}
		});
	}
	
	function LoadAccountTags() {
		$.ajax({
		    type: 'GET',
		    dataType: 'json',
		    url: '${pageContext.request.contextPath}/account/account_tags.htm',
		    data: {
		    	'accountid': currLoginAccountId
		    },
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
		    success: function (data) {
		        if (data.result != 'FAIL' && data.tags != null) {
		        	var tags = data.tags;
		            if (tags.length > 0) {	
		            	var TAG_CHARACTAR_LENGTH_LIMIT = 14;
		            	var TAG_NUMBERS_LIMIT = 4;
		            	var characterNumber = 0;
		            	for(var i = 0; i < tags.length && i < TAG_NUMBERS_LIMIT;i++) {
		            		if(tags[i]!="" && characterNumber < TAG_CHARACTAR_LENGTH_LIMIT){
		            			characterNumber += tags[i].length;
		            			
		            			var tag = tags[i];
		            			if (characterNumber > TAG_CHARACTAR_LENGTH_LIMIT && tags[i].length > TAG_CHARACTAR_LENGTH_LIMIT / 2) {
		            				//tag = tag.substring(0, TAG_CHARACTAR_LENGTH_LIMIT / 3);
		            				break;
		            			}
			            		var acctTagsHtml = "<span class='label label-info' style='margin-right:5px;padding-bottom:0px'>" + tag + "</span>";
			            		$("#acct_tags").append(acctTagsHtml);
		            		}
		            	}
		            }
		        } else {
		            $.pnotify({
		                title: "帐号标签数据加载失败",
		                text: data.message,
		                type: 'error'
		            });
		            return false;
		        }
		    },
		    error: function (data) {
		        $.pnotify({
		            title: "无法连接服务器",
		            text: "查询帐号标签请求提交失败！",
		            type: 'error'
		        });
		        return false;
		    }
		});
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
            text: "加载日志数据请求提交失败！" + message,
            type: 'error'
        });
	}
	
	function generateLogListHtml(log_lst) {
		var optLogHtml = "";
		
    	for(var i = 0; i < log_lst.length;i++) {
    		optLogHtml += "<tr><td class='td-optlog' style='color:#2a60a0;padding-top:2px;padding-bottom:0px;font-size:12px' >" + log_lst[i].createDatetime + " " + log_lst[i].description + "</td></tr>";
    	}
    	
    	return optLogHtml;
	}
	
	function LoadAccountLog() {
		$.ajax({
		    type: 'GET',
		    dataType: 'json',
		    url: '${pageContext.request.contextPath}/account/account_log.htm',
		    data: {
		    	'display': 'simple',
		    	'accountid': currLoginAccountId
		    },
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
		    success: function (data) {
		        if (data.result != 'FAIL' && data.records != null) {
		        	var simpleOptLogHtml = generateSimpleSelfOptLogHtml(data.records);
		        	if (simpleOptLogHtml != null) {
		        		$("#simple_self_opt_log").children().remove();
		        		$("#simple_self_opt_log").html(simpleOptLogHtml);
		        		
		        		$("#a_more_logs").unbind('click');
		        		$("#a_more_logs").click(function() {
		        			showMoreOptLogs();
		        		});
		        	}
		        } else {
/* 		            $.pnotify({
		                title: "帐号操作日志数据加载失败",
		                text: data.message,
		                type: 'error'
		            }); */
		            return false;
		        }
		    },
		    error: function (data) {
/* 		        $.pnotify({
		            title: "无法连接服务器",
		            text: "加载帐号操作日志请求提交失败！",
		            type: 'error'
		        }); */

		        return false;
		    }
		});
	}
	
	function generateSimpleSelfOptLogHtml(records) {
		var optLogHtml = null;
		if (records.length > 0) {
			optLogHtml = "<div class='row'><div class='col-md-12'><p style='color:#2a60a0; font-size:15px;margin-top:3px;margin-bottom:0px'><img width='16px' height='20px' src='${pageContext.request.contextPath}/resources/img/tu_menu2.jpg'></img><span style='margin-left:5px'>最近操作记录：</span></p>";
			optLogHtml +="<ul style='margin-bottomo:0px;padding-left:25px'>";
			
			for (var i = 0; i < records.length ; i++) {
				optLogHtml += "<li class='optlog_ul_li'>" + records[i].createDatetime + " " + records[i].description + "</li>";
			}
			optLogHtml +="</ul></div></div>";
			optLogHtml += "<div class='row' style='background-color:#f8faed;height:20px;border-radius:5px'><div class='col-md-offset-9'  style='margin-bottom:2px'><a style='cursor:pointer;' id='a_more_logs'><img style='margin-top:4px' src='${pageContext.request.contextPath}/resources/img/more.png'></img></i></a> </div></div>";
		}
		
		return optLogHtml;
	}
    
	function initialAvatarDlg() {
		$("#input_upload_file").fileupload({
		    url: '${pageContext.request.contextPath}/account/uploadavatar.htm',
		    dataType: 'json',
		    submit: function (e, data) {
		    	var isValidFile = UPLOAD_FILE_VALIDATION(data);
		    	//var isValidFile = true;
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

		onUploadedCallBack(data);
		
		setTimeout ("closeFileUploadDlg();", 1000);

		if (data.result.result != 'FAIL' && isNotEmptyString(data.result.avatarpath)) {
			
			$("#acct_avatar").attr("src", '${pageContext.request.contextPath}' + data.result.avatarpath);
		}
	}
	function getUserStatisticsData(chkdate) {		
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/user/overviewusersstatis.htm',
			success : function(data) {
				//alert($("#dtp_input2").val());
				//data  = {"usersstatis":{"20":4,"22":11,"9":4,"13":1},"result":"OK","date":"date"};
				if (data.result != 'FAIL' && data.usersstatis != null) {
					 	//分析数据-----
					 	/* if(JSON.stringify(data.usersstatis)!="{}"){
					 		FlotlineChart(data.usersstatis);
					 	} */		
					 	//FlotlineChart(data.usersstatis);
					usersByday(data.usersstatis);
				} else {
/* 					$.pnotify({
						title : "数据加载失败",
						type : 'error'
					}); */
					return false;
				}
			},
			error : function(data) {
/* 				$.pnotify({
					title : "无法连接服务器",
					text : "加载数据请求提交失败！",
					type : 'error'
				}); */
				
				return false;
			}
		});
	}
	function usersByday(usersStatis){
		var sin = [];
		var d=new Date();
		var nowHour = d.getHours();
		var startHour = nowHour+1;
		for(var i=startHour;i<24;i++){
			if(typeof(usersStatis[i])=="undefined"){				
				sin.push([i,0]);
			}else{
				sin.push([i,usersStatis[i]]);
			}
		}
		for(var j=0;j<=nowHour;j++){
			if(typeof(usersStatis[j])=="undefined"){				
				sin.push([j,0]);
			}else{
				sin.push([j,usersStatis[j]]);
			}
		}
		

		var new_sin = [];
		var ticks = [];
		for(i=0;i<sin.length;i++){
			new_sin.push(sin[i][1]);
			ticks.push(sin[i][0]);
		}
		//console.log(ticks);
		//new_sin = [12,22,43,11,22,333,4,5,6,77,8,8,8,9,0,33,2,44,55,66,22,33,2,33];
		$('#placeholder').highcharts({
			credits:false,
    		chart: {
    			type: 'area',
                borderRadius:2,
                backgroundColor:'#fff'
    		},
    		
			title: { text: '' }, 
			subtitle: { text: '' }, 
			xAxis: { 
				categories:ticks,
				gridLineWidth:1,
				gridLineColor:'#eee'
			}, 
			yAxis: { 
				title: {
                    text: ''
                },
                min:0,
                gridLineWidth:1,
                gridLineColor:'#eee'
			}, 
			tooltip: { 
				//pointFormat: '接入用户数: <b>{point.y:,.0f}（人）</b>'
				formatter: function() { 
					return this.x +'点接入用户数: <b>'+ this.y +' </b>人'; } 
			},
			
			legend: { 
				 	align:'right',
	                verticalAlign:'top',
	                floating:true,
	                symbolRadius:2,
	                symbolHeight:12,
	                symbolWidth:12
			},
    		series: [{
    		name: '用户数',
    		data: new_sin
    		}]
    		}); 
	}
	function FlotlineChart(usersStatis)
	{
		
		
		//return false;
		//sin = [[0,12],[1,22],[2,43],[3,4],[4,55],[5,28],[6,19],[7,101],[8,3],[9,4],[10,6],[11,112],[12,32],[13,45],[14,76],[15,67],[16,89],[17,99],[18,33],[19,13],[20,2],[21,8],[22,0],[23,9]];
		var plot = $.plot("#placeholder", [{ data: new_sin, label: '用户数(个)'}],
		{
			series: {
                lines: {
                    show: true,
                    lineWidth: 0.5,
                    fill: true,
                    fillColor: {
                        colors: [{
                                opacity: 0.05
                            }, {
                                opacity: 0.01
                            }
                        ]
                    }
                },
                points: {
                    show: true
                },
                shadowSize: 1
            },
			grid: {
				tickColor: "#eee",
				borderColor: "#eee",
                borderWidth: 1,
				hoverable: true				 
			},
			colors: ["#37b7f3"],
			yaxis: {
				min:0,
				minTickSize:1,
				tickDecimals:0,
				tickColor: "#eee",
				tickFormatter: function (val, axis) {           
			        return val;}
			},
			
			xaxis: {
				tickColor: "#eee",
				tickFormatter: function (val, axis) {           
			        return val;},
			    ticks:ticks
			}
			
		});

		 $("<div id='tooltip'></div>").css({
			position: "absolute",
			display: "none",
			border: "1px solid #fdd",
			padding: "2px",
			"background-color": "#fee",
			opacity: 0.80
		}).appendTo("body");

		$("#placeholder").bind("plothover", function (event, pos, item) {
				if (item) {
					var x = item.datapoint[0],//,
						y = item.datapoint[1];//.toFixed(2);
					$("#tooltip").html("用户数" + " = " + y)
						.css({top: item.pageY+5, left: item.pageX+5})
						.fadeIn(200);
				} else {
					$("#tooltip").hide();
				}
			});
	}

</script>