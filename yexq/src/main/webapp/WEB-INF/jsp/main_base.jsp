<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setHeader("Cache-Control", "no-store");
response.setDateHeader("Expires", 0);
%>

<html>
<head>
<title id="frame_title_text"></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8">
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="-1" />
<meta http-equiv="pragma" content="no-cache" />
<!-- Bootstrap -->
<link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/ionicons.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-switch.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/jquery.loadmask.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.icons.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/js/jquery-file-upload/css/jquery.fileupload.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/tasks.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/uniform.default.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/plugins.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/print.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-editable.css" rel="stylesheet" media="screen">
<!--[if lt IE 9]>
      <script src="${pageContext.request.contextPath}/resources/js/html5shiv.min.js"></script>
      <script src="${pageContext.request.contextPath}/resources/js/respond.min.js"></script>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
<![endif]-->

<style>
html {
	position: relative;
	min-height: 100%;
}

body {
	font-family: '微软雅黑';
	margin: 0 0 50px;	
    background: url(/twifi-access/resources/img/index_07.jpg) repeat-x #EFF8FD;
}

a:focus {
	outline: 0;
}


.main_header {
	width:100%;	
	height:50px;	
	background-image: url(${pageContext.request.contextPath}/resources/img/index_04.jpg);
    background-repeat: repeat-x;
}
#id_nav {
    background-image: url(${pageContext.request.contextPath}/resources/img/index_11.gif);
    background-repeat: repeat-x;
    border-radius:8px 8px 0 0;
    height:43px;
}

#id_main_content {
	border: 1px solid #ddd;
	border-radius:0 0 8px 8px;
	background-color:#ffffff;
    border-top:0px;
    width:100%;
}

.main_footer {
	position: absolute;
	bottom: 0;
	height: 40px;	
	width:100%;	
	background-image: url(${pageContext.request.contextPath}/resources/img/bott_bei.gif);
    background-repeat: repeat-x;			
}
#frame_footer_text{
font-size:12px;
color: #FFFFFF;
line-height: 8px;
}

.main_footer_content {
	text-align: center;
	padding-top: 10px;
	margin-top: 10px;
	height:20px;
	line-height:20px;	
}
/*
#tc_left {
    background-image: url(${pageContext.request.contextPath}/resources/img/index_07.jpg);
    background-repeat: repeat-x;
    background-size: cover; 
    -moz-background-size: cover;
}
#tc_right {
    background-image: url(${pageContext.request.contextPath}/resources/img/index_07.jpg);
    background-repeat: repeat-x;
}
*/


.error-notification {
	color: #dd1144;
}

#id_nav i {
	font-size: 15px;
}

.pagination-btn-disable {
	color: grey;
}

.pagination-btn-enable {
	color: blue;
}

.shadow { 
    filter: progid:DXImageTransform.Microsoft.Shadow(color='#104e8b', Direction=135, Strength=5);/*for ie6,7,8*/
	background-color: #eee;
	-moz-box-shadow:3px 3px 3px 3px #104e8b;/*firefox*/
	-webkit-box-shadow:3px 3px 3px 3px #104e8b;/*webkit*/
	box-shadow:3px 3px 3px 3px #104e8b;/*opera或ie9*/
}
.pager{padding-left:0;margin:2px 0;text-align:center;list-style:none}

.btn.default {
    background-color: #E5E5E5;
    color: #333333;
    text-shadow: none;
}
.navbar{
	margin-bottom: 10px;
}
.modal-header-primary {
	color:#fff;
    padding:9px 15px;
    border-bottom:1px solid #eee;
    background-color: #428bca;
    -webkit-border-top-left-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-radius-topleft: 5px;
    -moz-border-radius-topright: 5px;
     border-top-left-radius: 5px;
     border-top-right-radius: 5px;
}
.modal-footer-default {
    margin-top: 0;
    padding: 10px 20px;
    background-color: #F5F5F5;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}
.table {
    margin-bottom: 0px;
    width: 100%;
}
table{
	sword-wrap: break-word;
	word-break: break-all;
}
.msg-receiver-input {
	z-index:1;
    background-color: #FFFFFF;
    background-image: none;
    border: 1px none #CCCCCC;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
    color: #555555;
    display: block;
    font-size: 14px;
    height: 34px;
    line-height: 1.42857;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    vertical-align: middle;
    width: 100%;
    font: 微软雅黑;
}
</style>

</head>

<body>
	<div class="container-fluid">
		<div id='div_change_pwd' class="modal fade" tabindex="-1"
			role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header modal-header-primary">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h4 class="modal-title" style="font-family: 微软雅黑;">
							<span class="glyphicon glyphicon-arrow-right"></span> 修改密码
						</h4>
					</div>
					<form role="form" id="id_registerform">
						<div class="modal-body" style="max-height: 580px;padding-right:200px">
							<input id="id_oldpassword" name="oldpassword" type="password"
								style="margin-bottom: 5px;" class="form-control"
								placeholder="密码" required autofocus /> <input id="id_password"
								name="password" type="password" style="margin-bottom: 5px;"
								class="form-control" placeholder="新密码" required /> <input
								id="id_repassword" name="repassword" type="password"
								class="form-control" placeholder="重复新密码" required />
						</div>
						<div class="modal-footer  modal-footer-default">
							<div class="col-md-offset-8 col-md-2">
								<button id="id_changepwd_btn" class="btn btn-primary" type="submit">修改</button>
							</div>
							<div class="col-md-1">
								<a href="#" id='id_changepwd_cancel' class="btn btn-default" role="button">取消
								</a>
							</div>
						</div>
					</form>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog-->
		</div>
		<div class="row-fluid">
			<nav id="id_topnav" class="navbar navbar-static-top"
				role="navigation">
			<div class="container-fluid  main_header"
				style="backgmargin-bottom: 5px" id="id_topnav_container">
				<ul class="nav nav-pills pull-right" style="padding-top: 0px">
					<li class="dropdown"><a id="logged_name"
						class="dropdown-toggle" data-toggle="dropdown" href="#"
						style="color: white"> </a>
						<ul class="dropdown-menu">
							<li><a id='id_menu_item_change_pwd'>更改密码</a></li>
							<li><a id='id_menu_item_account_info'>帐号信息</a></li>
						</ul></li>
					<%-- <li><a href="javascript:showMessage();" id="showmsg" style="color: white"><span class="glyphicon glyphicon-envelope"></span> 消息</a></li> --%>
				 	<li><a href="${pageContext.request.contextPath}/system/site_help.htm" style="color:white;cursor:pointer"><span class="glyphicon glyphicon-question-sign"></span> 帮助说明</a></li> 
					<li><a href="${pageContext.request.contextPath}/account/logout.htm" style="color: white; cursor:pointer;"><span class="glyphicon glyphicon-log-out"></span>
							退出</a></li>
				</ul>
				<img style="margin-left: 30px"
					src="${pageContext.request.contextPath}/resources/img/index_02.jpg"></img>
				<span class="navbar-brand" href="main_base.html"
					id="frame_header_placeholder"></span>
			</div>
			</nav>
			<!-- /navbar -->
		</div>
	</div>
	<div class="container" style="margin-bottom: 50px">
		<div class="row">
			<div class="col-md-12">
				<div class="centercontent">
					<div class="row">
						<div class="col-md-1"></div>
						<div class="col-md-10 col-xs-12 col-sm-12" class="centercontent">
							<ul id="id_nav" class="nav nav-tabs nav-justified"></ul>
						</div>
						<div class="col-md-1"></div>
					</div>
					<div class="row">
						<div class="col-md-1"></div>
						<div class="col-md-10">
							<div id="id_main_content"></div>
						</div>
						<div class="col-md-1"></div>
					</div>
				</div>
			</div>

		</div>
	</div>
	<div class="main_footer">
		<div class="container">
			<div class="main_footer_content" id="frame_footer_text"></div>
		</div>
	</div>

	<div id="id_acctInfoModal" class="modal fade" tabindex="-1" role="dialog" >
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header modal-header-primary">
					<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
					<h4 class="modal-title" style="font-family: 微软雅黑;"><span class="glyphicon glyphicon-arrow-right"></span> 个人信息</h4>
				</div>
				<form id="form_acct_profile" class="form-horizontal">
					<div class="modal-body" style="max-height: 580px; padding-bottom: 0px">
					<!-- here is content of member info -->
						<div id="id_modal_account_info" class="form-body">
							<div class="form-group">
								<label class="col-md-3 control-label">用户名</label>
								<div id="id_acct_info_username" class="col-md-4" style="margin-top:5px;"></div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">帐号类型</label>
								<div id="id_acct_info_type" class="col-md-4"  style="margin-top:6px;"></div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">姓名</label>
								<div id="id_acct_info_fullname" class="col-md-4" style="margin-top:6px;"></div>
								<div id="edit_acct_info_fullname" class="col-md-4">
									<input id="input_acct_fullname" name="fullName" type="text" class="form-control" placeholder="姓名" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">电子邮件</label>
								<div id="id_acct_info_email" class="col-md-4" style="margin-top:5px"></div>
								<div id="edit_acct_info_email" class="col-md-4">
									<input id="input_acct_email" name="email" type="text" class="form-control" placeholder="电子邮件" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">手机号码</label>
								<div id="id_acct_info_cellphone" class="col-md-4" style="margin-top:5px;"></div>
								<div id="edit_acct_info_cellphone" class="col-md-4">
									<input id="input_acct_cellphone" name="cellPhone" type="text" class="form-control" placeholder="手机号码(可选)" />
								</div>
							</div>
							<div id="div_merchantName" class="form-group">
								<label class="col-md-3 control-label">商户名称</label>
								<div id="id_acct_info_merchantName" class="col-md-4" style="margin-top:6px;"></div>
								<div id="edit_acct_info_merchantName" class="col-md-4">
									<input id="input_acct_merchantName" name="merchantName" type="text" class="form-control" placeholder="商户名称(可选)" />
								</div>
							</div>
							<div id="div_merchantDescription" class="form-group">
								<label class="col-md-3 control-label">商户描述</label>
								<div id="id_acct_info_merchantDescription" class="col-md-4" style="margin-top:6px;"></div>
								<div id="edit_acct_info_merchantDescription" class="col-md-4">
									<input id="input_acct_merchantDescription" name="merchantDescription" type="text" class="form-control" placeholder="商户描述(可选)" />
								</div>
							</div>
							<div id="div_acct_info_geoLocation" class="form-group">
								<label class="col-md-3 control-label" >地址</label>
								<div id="id_acct_info_geoLocation" class="col-md-4" style="margin-top:6px;"></div>
							</div>
							<div class="form-group">
								<div id="edit_address_container">
									<div class="form-group">
										<label class="col-md-3 control-label">地区</label>
										<div class="col-md-8" style="margin-left:5px">
											<div class="row">
											    <div class="col-md-4" style="padding-right:2px">
											        <select id="id_acct_profile_province" name="province" class="form-control"></select>
											    </div>
											    <div class="col-md-4" style="padding-right: 10px;padding-left:10px">
											        <select id="id_acct_profile_city" name="city" class="form-control"></select>
											    </div>
											    <div class="col-md-4" style="padding-left:2px;">
											        <select id="id_acct_profile_county" name="county" class="form-control"></select>
											    </div>
											</div>
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-3 control-label">详细地址</label>
										<div class="col-md-8" style="margin-left:5px">
											<TEXTAREA id="id_acct_profile_address" name="Location" type="text" class="form-control" placeholder="详细地址（可选）" rows="3"></TEXTAREA>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer modal-footer-default">
						<button id="submit_acct_profile" type="submit" class="btn btn-primary">完成</button>
						<a id="edit_acct_profile" class="btn btn-primary" role="button">编辑 </a>
						<a class="btn btn-default" role="button" data-dismiss="modal">关闭 </a>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->


	<div id="div_resource" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header modal-header-primary">
					<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
					<h4 class="modal-title" style="font-family: 微软雅黑;" id="voteLabel">
						<span class="glyphicon glyphicon-arrow-right"></span> 文件上传
					</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<form class="form-horizontal" role="form">
								<div class="form-group">
									<label class="col-md-2" style="margin-top: 5px">选择文件</label> 
									<input type="file" id="input_upload_file" name="file" class="col-md-8" style="margin-top: 5px">
									<p class="help-block" style="margin-top: 5px"></p>
								</div>
							</form>
						</div>
					</div>
					<div class="col-md-12">
						<div class="progress progress-striped active" id="div_progress">
							<div id="div_progress_bar" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
								<span id="span_progress_precent" class="sr-only">0% Complete</span>
							</div>
						</div>
					</div>
					<div id="div_resource_list">
<%-- 					<div class="row">
							<div class="col-sm-6 col-md-4">
								<div class="thumbnail shadow">
									<a><span style="float:right"><i class="glyphicon glyphicon-remove-sign"></i></span></a>
									<img data-src="holder.js/300x200" alt="...">
									<div class="caption">
										<label> <input type="checkbox">
										</label> <span>Thumbnail label</span>
									</div>
								</div>
							</div>
						</div> --%>
					</div>
					<div class="row" id="resource_list_footer">
						<div class="col-md-6">
							<h6>
								第 <span class="label label-info" id="lb_res_pagenumber"></span> 页
							</h6>
						</div>
						<div class="col-md-6">
							<div id="div_res_pagination">
								<ul id="ul_res_pagination" class="pager" style="margin-top: 0px">
									<li><a id="a_res_pagination_previous" style="cursor: pointer;"> 前一页 </a></li>
									<li><a id="a_res_pagination_next" style="cursor: pointer;"> 后一页 </a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer modal-footer-default">
					<button id="get_checked_resource" type="button" class="btn btn-success btn-vote">选定</button>
					<button type="button" class="btn btn-default btn-close" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	
	<div class="clear-line"></div>
	<div class="modal fade" role="dialog" id="systemMessageDialog"></div>
	
	<script src="${pageContext.request.contextPath}/resources/js/jquery-1.11.0.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>
	<!--[if lte IE 6]>
	
	<script src="${pageContext.request.contextPath}/resources/js/bootstrap-ie.js"></script>
	<![endif]-->
	<script src="${pageContext.request.contextPath}/resources/js/bootstrap-switch.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/bootstrap-editable.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/bootstrap-paginator.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery.json-2.4.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-file-upload/js/vendor/jquery.ui.widget.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-file-upload/js/jquery.iframe-transport.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-file-upload/js/jquery.fileupload.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery.plugin.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-validation/dist/jquery.validate.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-validation/localization/messages_zh.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery.loadmask.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery.pnotify.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/global.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/md5.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/resources.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/global.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/address.js"></script>
	<!-- <script src="${pageContext.request.contextPath}/resources/js/ajaxfileupload.js"></script> -->
	<script src="${pageContext.request.contextPath}/resources/js/app.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery.blockui.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/highcharts/highcharts.js"></script>
	<!--[if (gte IE 8)&(lt IE 10)]>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-file-upload/js/cors/jquery.xdr-transport.js"></script>
	<![endif]-->
	<script type="text/javascript">
		
		var contextPath = "${pageContext.request.contextPath}";
		var __ACCOUNT_CHECKED_COUNT = "${sessionScope.login_account_info.id}";
		
		$.pnotify.defaults.styling = "bootstrap";
		$.pnotify.defaults.history = false;
		$.pnotify.defaults.delay = 1500;
		var curid = "id_mm_overview";
		var permitted_main_menu = null; 
		var portalSvrHostName = "${portalSvrHostName}";
		MessageBundle.contextPath = contextPath;
		
		// account info	
		var account_id = "${sessionScope.login_account_info.id}";
		var username = "${sessionScope.login_account_info.username}";
		var full_name = "${sessionScope.login_account_info.fullname}";
		var geo_lv = "${sessionScope.login_account_info.geoLevel}" + " - " + "{$sessionScope.login_account_info.geoLocation}";
		var cell_phone = "${sessionScope.login_account_info.cellNumber}";
		var account_type = '${sessionScope.login_account_info.type}';//role matrix was defined in resources.js
		var acct_permissions = '${sessionScope.login_account_info.permissions}';
		
		var time = 0; // file uploader timer
		
		var selected_resource_relative_url = null;
		
		var DEFAULT_RESOURCE_PAGE_SIZE = 6;
		var resourceSearchHandler = null;
	
		$(document).ready(function() {
			resourceSearchHandler = new searchUtil(generateResourceListHtml, searchFailCallBack, searchErrorCallBack, null, null,
					"div_resource_list", "lb_res_pagenumber", "a_res_pagination_previous", "a_res_pagination_next",
					"${pageContext.request.contextPath}/resource/resourcelist.htm");
			resourceSearchHandler.setSearchParemeter("operation", "getdata");
			resourceSearchHandler.setSearchParemeter("pageSize", DEFAULT_RESOURCE_PAGE_SIZE);
			resourceSearchHandler.setSearchParemeter("accountid", "${sessionScope.login_account_info.id}");
			
			if (account_type == null || account_type == "") {
				window.location.href="${pageContext.request.contextPath}/account/logout.htm";
			}
			else {
				var loggedNameHtml = "<span class='glyphicon glyphicon-user'></span>&nbsp;&nbsp;";
				
				if (full_name != null && full_name != "") {
					loggedNameHtml += full_name;
				}
				else {
					loggedNameHtml += username;
				}

				loggedNameHtml += "&nbsp;&nbsp;<span class='caret'></span>";
				$("#logged_name").html(loggedNameHtml);
				
				MAIN_MENU.drawMainMenuForAccount(account_type);
				
				show_maincontent('id_main_content', curid);

				validateNewPassword();

				refreshAccountInfo();
				
				$("#edit_acct_profile").click(function() {
					editAccountProfile();
				});
				
				$('#id_menu_item_change_pwd').click(function() {
					showChangePassword();
				});

				$('#id_changepwd_cancel').click(function() {
					closeChangePassword();
				});

				$("#id_menu_item_account_info").click(function() {
					showAccountInfo();
				});
				
				initialAcctInfoDlg();

				//MessageBundle.refreshHint();
			}
			
			/* $("#logout_lnk").click(function() {
				$.get("${pageContext.request.contextPath}/account/logout.htm", function(data) {
					window.location.href="${pageContext.request.contextPath}/account/login.htm";
				});
			}); */
			
			
		});
		
		function show_maincontent(id_dest_div, id) {
			if (id != curid) {
				curid = id;
			}

			var destination_url = contextPath +  MAIN_MENU.getDestUrl(id);
			if (destination_url != null && destination_url != false) {
				$.get(destination_url, function (data) {
					var dest_div = $('#' + id_dest_div);
					dest_div.children().remove();
					dest_div.html(data);
				    $('html').unmask();
				});

				MAIN_MENU.setActiveMenuItem(id);
				$('html').mask('加载...');
			}
		}
		
		function initialAcctInfoDlg() {
	        $('#form_acct_profile').validate({
	            errorClass: "error-notification",
	            errorElement: "div",
	            rules: {
	            	fullName:{
	            		maxlength: 200
	            	},
	            	merchantName:{
	            		maxlength: 255
	            	},
	                email:{
	                	required: true,
	                	email: true,
	                	maxlength: 100
	                }/* ,
	                cellPhone: {
	                    rangelength: [7, 20]
	                } */
	            },
	            messages : {
	            	fullName : {
						maxlength : "姓名长度不能超过200"
					},
					merchantName: {
						maxlength: "商户名长度不得超过255"
	                },
					acct_email : {
						required : "请输入邮箱",
						email : "邮箱格式不正确"
					}/* ,
					acct_cellphone : {
						cellphone : "手机号码格式不正确"
					} */
				},
	            submitHandler: function (form) {
	            	SubmitAccountProfile();
	            }
	        });
		}
		
		function refreshAccountInfo(updatedAcctInfo) {
			// load current loged in account info
			var tmp_username = "${sessionScope.login_account_info.username}";
			var tmp_full_name = "${sessionScope.login_account_info.fullname}";
			var tmp_geoLv = "${sessionScope.login_account_info.geoLevel}";
			var tmp_cellPhone = "${sessionScope.login_account_info.cellNumber}";
			var tmp_accountType = '${sessionScope.login_account_info.type}';//role matrix was defined in resources.js
			var tmp_email = "${sessionScope.login_account_info.email}";
			var tmp_merchantName =  "${sessionScope.login_account_info.merchantName}";
			var tmp_merchantDesc =  "${sessionScope.login_account_info.merchantDescription}";
			var tmp_geoLocation =  '${sessionScope.login_account_info.geoLocation}';
			
			if (updatedAcctInfo != null) {
				account_id = updatedAcctInfo.id;
				username = updatedAcctInfo.username;
				full_name = updatedAcctInfo.fullname;
				geo_lv = updatedAcctInfo.geoLevel;
				cell_phone = updatedAcctInfo.cellNumber;
				account_type = updatedAcctInfo.type;//role matrix was defined in resources.js
				acct_permissions = updatedAcctInfo.permissions; 
				
				tmp_username = updatedAcctInfo.username;
				tmp_full_name = updatedAcctInfo.fullname;
				tmp_geoLv = updatedAcctInfo.geoLevel;
				tmp_cellPhone = updatedAcctInfo.cellNumber;
				tmp_accountType = updatedAcctInfo.type;//role matrix was defined in resources.js
				tmp_email = updatedAcctInfo.email;
				tmp_merchantName = updatedAcctInfo.merchantName;
				tmp_merchantDesc = updatedAcctInfo.merchantDescription;
				tmp_geoLocation = updatedAcctInfo.geoLocation;
			}
			
			$("#id_acct_info_username").text(tmp_username);
			$("#id_acct_info_type").text(getAccountTypeCnName(tmp_accountType));
			$("#id_acct_info_fullname").text(tmp_full_name);
			$("#id_acct_info_email").text(tmp_email);
			$("#id_acct_info_cellphone").text(tmp_cellPhone);
			$("#id_acct_info_merchantName").text(tmp_merchantName);
			$("#id_acct_info_merchantDescription").text(tmp_merchantDesc);
		
			$("#input_acct_fullname").val(tmp_full_name);
			$("#input_acct_email").val(tmp_email);
			$("#input_acct_cellphone").val(tmp_cellPhone);
			$("#input_acct_merchantName").val(tmp_merchantName);
			$("#input_acct_merchantDescription").val(tmp_merchantDesc);
			
			var province = "";
			var city = "";
			var county = "";
			var address = "";
			
			if (isNotEmptyString(tmp_geoLocation)) {
				tmp_geoLocation = JSON.parse(tmp_geoLocation);
				
				province = tmp_geoLocation.province == undefined || tmp_geoLocation.province == null ? "" : tmp_geoLocation.province;
				city = tmp_geoLocation.city == undefined || tmp_geoLocation.city == null ? "" : tmp_geoLocation.city;
				county = tmp_geoLocation.county == undefined || tmp_geoLocation.county == null ? "" : tmp_geoLocation.county;
				address = tmp_geoLocation.address == undefined || tmp_geoLocation.address == null ? "" : tmp_geoLocation.address;
			}
			
			$("#id_acct_info_geoLocation").text(province + " " + city + " " + county + " " + address);
			
			//initial address components
	        addr_selector_create('id_acct_profile_province', 'id_acct_profile_city', 'id_acct_profile_county');
			
			if (province != undefined && province != null && province != "") {
				addr_selector_set('id_acct_profile_province', province, 'id_acct_profile_city', city, "id_acct_profile_county", county);
			}
		        
	        $("#id_acct_profile_address").text(address);
	        
	        if (tmp_accountType != ACCOUNT_TYPE.MERCHANT) {
		        $("#div_merchantName").hide();
		        $("#div_merchantDescription").hide();
	        }
		}
		
		function editAccountProfile() {
			$("#id_acct_info_fullname").hide();
			$("#id_acct_info_email").hide();
			$("#id_acct_info_cellphone").hide();
			$("#id_acct_info_merchantName").hide();
			$("#id_acct_info_merchantDescription").hide();
			$("#id_address_container").hide();
			$("#id_acct_info_geoLocation").hide();
			$("#div_acct_info_geoLocation").hide();
			
			$("#edit_acct_info_fullname").show();
			$("#edit_acct_info_email").show();
			$("#edit_acct_info_cellphone").show();
			$("#edit_acct_info_merchantName").show();
			$("#edit_acct_info_merchantDescription").show();
			$("#edit_address_container").show();
			
			$("#edit_acct_profile").hide();
			$("#submit_acct_profile").show();
		}
		
		function viewAccountProfile() {
			$("#id_acct_info_fullname").show();
			$("#id_acct_info_email").show();
			$("#id_acct_info_cellphone").show();
			$("#id_acct_info_merchantName").show();
			$("#id_acct_info_merchantDescription").show();
			$("#id_address_container").show();
			$("#id_acct_info_geoLocation").show();
			$("#div_acct_info_geoLocation").show();
			
			$("#edit_acct_info_fullname").hide();
			$("#edit_acct_info_email").hide();
			$("#edit_acct_info_cellphone").hide();
			$("#edit_acct_info_merchantName").hide();
			$("#edit_acct_info_merchantDescription").hide();
			$("#edit_address_container").hide();
			
			$("#edit_acct_profile").show();
			$("#submit_acct_profile").hide();
		}
		
		function SubmitAccountProfile() {
			$.ajax({
                type: 'POST',
                dataType: 'json',
                url: '${pageContext.request.contextPath}/account/updateprofile.htm',
                data: {
                	"accountid" : "${sessionScope.login_account_info.id}",
                	"email" : $("#input_acct_email").val(),
                	"fullname" : $("#input_acct_fullname").val(),
                	"cellPhone" : $("#input_acct_cellphone").val(),
                	"merchantName" : $("#input_acct_merchantName").val(),
                	"merchantDescription" : $("#input_acct_merchantDescription").val(),
                	"geoLocation" : JSON.stringify(getProfileAddress())
                },
                success: function (data) {
                    if (data.result == 'OK') {
            			closeAccountInfo();
                        $.pnotify({
                            title: "个人信息更新成功",
                            type: 'success',
                            delay: 1500
                        });

                        refreshAccountInfo(data.account);
                    } else {
                        $.pnotify({
                            title: "个人信息更新失败",
                            text: data.message,
                            type: 'error',
                            delay: 1500
                        });
                    }
                },
                error: function (data) {
                    $.pnotify({
                        title: "无法连接服务器",
                        text: data.message,
                        type: 'error',
                        delay: 1500
                    });
                }
            });
		}

		function showAccountInfo() {
			$('#id_acctInfoModal').modal('show');
			viewAccountProfile();
		}

		function closeAccountInfo() {
			$("#id_acctInfoModal").modal('hide');
			viewAccountProfile();
		}

		function validateNewPassword() {
			$('#id_registerform').validate({
				errorClass : "error-notification",
				errorElement : "div",
				rules : {
					oldpassword : {
						required : true,
						rangelength : [ 6, 20 ]
					},
					password : {
						required : true,
						rangelength : [ 6, 20 ]
					},
					repassword : {
						equalTo : '#id_password'
					}
				},
				messages : {
					oldpassword : {
						required : "请输入原密码",
						rangelength : "请输入6-20位长度的密码"
					},
					password : {
						required : "请输入密码",
						rangelength : "请输入6-20位长度的密码"
					}
				},
				submitHandler : function(form) {
					$.ajax({
					    type: 'POST',
					    dataType: 'json',
					    url: '${pageContext.request.contextPath}/account/changepassword.htm',
					    data: {
					        oldPassword: window.md5($("#id_oldpassword").val()),
					        newPassword: window.md5($("#id_password").val())
					    },
					    success: function (data) {
					        if (data.result != 'FAIL') {
					            $.pnotify({
					                title: "密码修改成功",
					                text: "密码修改成功...",
					                type: 'success',
					                delay: 1500,
					                after_close: function(pnotify){
					                    window.location.href = '${pageContext.request.contextPath}/account/login.htm';
					                }
					            });
					        } else {
					            $.pnotify({
					                title: "密码修改失败",
					                text: data.message,
					                type: 'error',
					                delay: 1500
					            });
					            return false;
					        }
					    },
					    error: function (data) {
					        $.pnotify({
					            title: "无法连接服务器",
					            text: "密码修改请求提交失败！",
					            type: 'error',
					            delay: 1500
					        });

					        return false;
					    }
					});
					closeChangePassword();
				}
			});
			
		}

		function showChangePassword() {
			$('#div_change_pwd').modal('show');
		}

		function closeChangePassword() {
			$('#div_change_pwd').modal('hide');
		}
		
		function initialResourceDlg() {
			$("#input_upload_file").fileupload({
			    url: '${pageContext.request.contextPath}/resource/upload.htm',
			    dataType: 'json',
			    submit: function (e, data) {
			    	var isValidFile = UPLOAD_FILE_VALIDATION(data);
			    	
			    	if (isValidFile) {
				    	onPreUploadCallBack();
				        $(this).fileupload('send', data);
			    	}
			        return false;
			    },
			    done: function (e, data) {
		        	onUploadedResourceCallBack(data);
			    },
			    progressall: function (e, data) {
			        var progress = parseInt(data.loaded / data.total * 100, 10);
			        $("#div_progress_bar").css('width', progress + '%');
			    }
			}).prop('disabled', !$.support.fileInput)
	        	.parent().addClass($.support.fileInput ? undefined : 'disabled');
		}
		
		function onPreUploadCallBack() {
			$("#div_progress_bar").css("width", "0%"); 
			$("#div_progress").show();
			$("#span_progress_precent").text("0%");
		}
		
		function onUploadedResourceCallBack(data) {
			onUploadedCallBack(data);
			
			resourceSearchHandler.searchWithPreload();
		}
		
		function onUploadedCallBack(data) {
            if (data != null && data.result.result != 'FAIL') {
                $("#input_upload_file").val("");
                setTimeout ("$('#div_progress').hide();", 200);
            }
            else {
	            $.pnotify({
	                title: "文件上传失败",
	                text: data.result.message,
	                type: 'error',
	                delay: 2000
	            });
            }

		}
		
		function showFileUploadDlg() {
			$("#div_resource_list").html("");
			$('#div_resource').modal({
				backdrop: 'static'
			});
			
			$("#input_upload_file").val("");
			$("#div_progress_bar").css("width", "0%"); 
			$("#div_progress").hide(); 
			//$("#resource_list_footer").hide();
			
			$("#get_checked_resource").hide();
			$("#div_resource").modal("show");
		}
		
		function showResourceDlg() {
			//Load resources
			showFileUploadDlg();
			
			$("#get_checked_resource").show();
			//$("#resource_list_footer").show();
			
			selected_resource_relative_url = null;
			$("#get_checked_resource").click(function() {
				getCheckedResource();
			});
			
			resourceSearchHandler.searchWithPreload();
		}
		
		function closeFileUploadDlg() {
			$("#div_resource").modal("hide");
		}
		
		function searchFailCallBack(data, message) {
            $.pnotify({
                title: "资源数据加载失败",
                text: message,
                type: 'error',
                delay: 1500
            });
		}
		
		function searchErrorCallBack(data, message) {
	        $.pnotify({
	            title: "无法连接服务器",
	            text: "加载资源数据请求提交失败！",
	            type: 'error',
	            delay: 1500
	        });
		}
		
		function getCheckedResource() {
			var resource_path_id = $(".shadow").first().attr('id').replace("div_", "resource_path_");
			if (resource_path_id.length > 0) {
				selected_resource_relative_url = $("#" + resource_path_id).val();
				
				closeFileUploadDlg();
			}
			else {
				alert("选定前请选择资源");
			}
			return false;
		}
		
		function selectedResource(obj) {
			$("*").removeClass("shadow");
			$(obj).addClass("shadow");
		}
		
		function RemoveResource(resourceId) {
			var resourceId = resourceId;
			$.get('${pageContext.request.contextPath}/resource/removeresource.htm', 
					{"resourceid": resourceId}, 
					function (data) {
						if (data.result != 'FAIL') {
							resourceSearchHandler.searchWithPreload();
						}
						else {
		                    $.pnotify({
		                        title: "删除资源文件失败",
		                        type: 'error',
		                        delay: 1500
		                    });
						}
					}
			);
		}
		
		function generateResourceListHtml(resource_lst) {
			var DEFAULT_NUMBER_OF_RESOURCES = 3;
			var DEFAULT_RES_NAME_LENGTH = 15;
			var optResourceHtml = "";
			
	    	for(var i = 0; i < resource_lst.length;i++) {
	    		if (i % DEFAULT_NUMBER_OF_RESOURCES == 0) {
	    			optResourceHtml += "<div class='row'>"
	    		}

	    		var resourceName = resource_lst[i].name;
	    		if (isNotEmptyString(resourceName) && resourceName.length > DEFAULT_RES_NAME_LENGTH) {
	    			resourceName = resourceName.substr(1, DEFAULT_RES_NAME_LENGTH) + " ...";
	    		}
	    		
	    		optResourceHtml += 	"<div class='all-resources col-sm-6 col-md-4'>";
	    		optResourceHtml += 		"<div id='div_" + resource_lst[i].id + "' onclick='javascript:selectedResource(this);' class='thumbnail'>";
	    		optResourceHtml += 			"<a href='javascript:RemoveResource(" + resource_lst[i].id + ");' class='remove-resource' style='cursor:pointer;'><span style='float:right'><i class='glyphicon glyphicon-remove-sign'></i></span></a>";
	    		optResourceHtml += 			"<input id='resource_path_" + resource_lst[i].id + "' value='" + resource_lst[i].resourcePath + "' type='hidden' />";
	    		optResourceHtml += 			"<input id='ref_times_" + resource_lst[i].id + "' value='" + resource_lst[i].referenceTimes + "' type='hidden'/>";
	    		optResourceHtml += 			"<table width='100%'><tr><td width='60px' height='80px' align='center' valign='middle'>";
	    		optResourceHtml += 				"<img id='img_" + resource_lst[i].id + "' src='" + "${pageContext.request.contextPath}" + resource_lst[i].thumbnailPath + "' max-width='60px' max-height='80px' data-src='holder.js/300x200' alt='...'>";
	    		optResourceHtml += 			"</table></tr></td>";
	    		optResourceHtml += 			"<div class='caption'>";
	    		optResourceHtml += 				"<label>";
	    		optResourceHtml += 					"<input id='chk_" + resource_lst[i].id + "' class='resource-selector' type='checkbox' style='display:none;' />";
	    		optResourceHtml += 				"</label>";
	    		optResourceHtml += 				"<span id='name_" + resource_lst[i].id + "'>" + resourceName + "</span>";
	    		optResourceHtml += 				"<span id='ref_" + resource_lst[i].id + "'>有 " + resource_lst[i].referenceTimes + " 个门户页面正在使用该资源</span>";
	    		optResourceHtml += 			"</div>";
	    		optResourceHtml += 		"</div>";
	    		optResourceHtml += 	"</div>";
	    		
	    		if ((i+1) % DEFAULT_NUMBER_OF_RESOURCES == 0) {
	    			optResourceHtml += "</div>"
	    		}
	    	}
	    	
	    	return optResourceHtml;
		}
		
	    function getProfileAddress() {
	    	var province = addr_selector_field_get('id_acct_profile_province');
	    	var city = addr_selector_field_get('id_acct_profile_city');
	    	var county = addr_selector_field_get('id_acct_profile_county');
	    	var detailAddress = $("#id_acct_profile_address").val();
	    	
			return getObjectAddress(province, city, county, detailAddress);
	    }
	    
	    function showMessage() {
			MessageBundle.showMsgDlg();
		}
	</script>
	<%-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=cSwrtcS0guWuQywNXb69XAAF"></script> --%>
</body>
</html>
