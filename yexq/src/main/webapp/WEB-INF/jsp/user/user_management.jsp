<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<style>
.panel-footer .pagination {
	margin: 0;
}
.statulb{border-radius: 0 !important;padding: 0.2em 1em;font-size: 85%;}
.table > tbody > tr > td{
vertical-align: middle;
}
</style>

<div class="container-fluid" style="padding-top: 20px;">
	<div class="row-fluid">
		<!-- /.modal -->
		<div class="modal fade in" id="clientmemoModal" tabindex="-1"
			role="dialog" aria-labelledby="voteLabel">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header modal-header-primary">
						<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>

						<h4 class="modal-title" style="font-family: 微软雅黑;" id="voteLabel">
							<span class="glyphicon glyphicon-arrow-right"></span> 用户备注
						</h4>
					</div>
					<form class="form-horizontal" action="#" method="post" accept-charset="utf-8">
						<div class="modal-body" style="max-height: 450px;">
							<div class="form-group">
								<label for="memostr" class="col-sm-3 control-label">
										用户备注</label>							
								<div class="col-md-6">
									<input class="form-control" id="memostr" name="memostr"
										placeholder="用户备注" type="text" required />
								</div>
							</div>
						</div>
						<div class="modal-footer modal-footer-default">
							<button id="get-data" type="button"
								class="btn btn-success btn-vote">提交</button>
							<button type="button" class="btn btn-default btn-close"
								data-dismiss="modal">关闭</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- /.modal -->
		<div class="col-md-12">
			<nav class="navbar navbar-default" role="navigation">
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse"
					id="bs-example-navbar-collapse-1">
					<form id="usersearch" class="navbar-form navbar-left" role="search">
						<div class="form-group">
							<input type="text" id="keywords" class="form-control"
								placeholder="输入关键字">
						</div>
						
						<div class="form-group" style="margin-left: 28px">
							<div class="radio-list">
								<label class="radio-inline"> <input type="radio"
									name="optionsRadios" id="Radio1" value="ONLINE"> 在线用户
								</label> <label class="radio-inline"> <input type="radio"
									name="optionsRadios" id="Radio2" value="" checked> 所有用户
								</label>
							</div>
						</div>
						<button id="btn_search_user" type="button" class="btn btn-info"><span class="glyphicon glyphicon-search"></span> 查询</button>
					</form>
				</div>
			</nav>
		</div>
		<div class="col-md-12">
			<div class="portlet box yellow" style="margin-bottom: 2px">
				<div class="portlet-title">
					<div class="caption">
						<i class="glyphicon glyphicon-qrcode"></i>用户列表
					</div>
					<div class="tools">
						<a id="reloaduser" class="reload" href="javascript:;">
							
						</a>
					</div>
				</div>
				<div id="userstab" class="portlet-body">
					<table class="table table-hover">
						<thead>
							<tr>
								<th width="20%">用户</th>
								<!-- <th width="13%">商户</th> -->
								<th width="15%">登录设备</th>
								<th width="8%">MAC</th>
								<th width="9%">登录时间</th>
								<th width="8%">在线状态</th>
								<th width="6%">状态</th>
								<th width="7%">流量</th>
								<th width="12%" class="text-center">操作</th>
							</tr>
						</thead>
						<tbody id="tbl_user_lst">

						</tbody>
					</table>
				</div>
				<div class="panel-footer">
					<div class="row">
						<div class="col-md-6">
							<h6>
								第 <span class="label label-info" id="lb_pagetotal_user"></span>
								页
							</h6>
						</div>
						<div class="col-md-6">
							<div id="div_pagination" class="col-md-offset-3">
								<ul id="ul_pagination_user" class="pager">
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
</div>
<script type="text/javascript">
	MAIN_MENU.setActiveMenuItem("id_mm_user");
	var userSearchHandler = null;

	var search_user_keyword = null;
	var user_status = "";
	var user_id = "";
	var device_id = null;
	
	$(document).ready(function() {
		
		userSearchHandler = new searchUtil(generateUserListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_user_lst", "lb_pagetotal_user", "a_pagination_previous", "a_pagination_next", 
				"${pageContext.request.contextPath}/user/users.htm","userstab");
		
		user_status = $('input[name="optionsRadios"]').filter(':checked').val();
		userSearchHandler.setSearchParemeter('status', user_status);
		userSearchHandler.searchWithPreload();
		 
		//handlePortletToolsUser();
		$("#reloaduser").click(function(e){
			e.preventDefault();
			//var el = jQuery(this).closest(".portlet").children(".portlet-body");                   
            
            //App.blockUI({target: el, textOnly: true});
			userSearchHandler.refreshCurrentPage();
            //window.setTimeout(function () {
                //App.unblockUI(el);
            //}, 1000); 
		});
		
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		$("#btn_search_user").click(function() {
			keywordsSearch();
		});
		
		//PNotify.prototype.options.styling = "bootstrap";
		$('#get-data').on('click', function(event) {
			event.preventDefault();
			//alert(user_id);
			if(!isNotEmptyString($("#memostr").val())){
				return false;
			}
			$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '${pageContext.request.contextPath}/user/usermemo.htm',
				data : {
					'userid' : user_id,
					'deviceid' : device_id,
					'memo' : $("#memostr").val()
				},
				success : function(data) {
					//alert(data.result);
					if (data.result == 'OK') {
						$.pnotify({
							title : "用户备注成功",
							text : "",
							type : 'success',
							delay : 1000,
							after_close: function(pnotify){
								$('#clientmemoModal').modal('hide');
			                }
						});
						if(isNotEmptyString($("#memostr").val())){
							$("#tip_" + user_id).html(" <a><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+$("#memostr").val()+"' id=''></i></a>");
							postPageChange();
						}
						
					} else {
/* 						$.pnotify({
							title : "用户备注失败",
							text : data.message,
							type : 'error'
						}); */
						return false;
					}
				},
				error : function(data) {
/* 					$.pnotify({
						title : "无法连接服务器",
						text : "用户备注失败！",
						type : 'error'
					}); */

					return false;
				}
			});
		});
	});
	
	function keywordsSearch() {
		user_status = $('input[name="optionsRadios"]').filter(':checked').val();
		userSearchHandler.setSearchParemeter('status', user_status);
		var keywords = userSearchHandler.convertKeywordsSearchable($("#keywords").val());
		userSearchHandler.setSearchParemeter('keywords', keywords);
		userSearchHandler.searchWithPreload();
	}
	
	function handlePortletToolsUser() {        
        jQuery('body').on('click', '#reloaduser', function (e) {
            e.preventDefault();
            var el = jQuery(this).closest(".portlet").children(".portlet-body");
            var url = jQuery(this).attr("data-url");
            var error = $(this).attr("data-error-display");           
            
            App.blockUI({target: el, iconOnly: true, imgsrc: '${pageContext.request.contextPath}'});
         	 //reload data  这里需要修改
            //alert("user_man....");
            userSearchHandler.refreshCurrentPage();
			//reload data
            window.setTimeout(function () {
                App.unblockUI(el);
            }, 1000);         
        });
    }
	
	function ListUser() {
		$.get('${pageContext.request.contextPath}/user/users.htm',

		function(data) {
			//alert(data);
			$('#id_main_content').html(data);
		});
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
/* 		$.pnotify({
			title : "用户数据加载失败",
			text : message,
			type : 'error'
		}); */
	}
	function searchErrorCallBack(result, message) {
/* 		$.pnotify({
			title : "无法连接服务器",
			text : "加载用户数据请求提交失败！" + message,
			type : 'error'
		}); */
	}
	//填充 tr
	function generateUserListHtml(userList) {
		var userListHtml = "";

		if (userList.length > 0) {
			for ( var i = 0; i < userList.length; i++) {
				var userid = userList[i].id;
				var merchantname = userList[i].merchantName;
				var deviceid = userList[i].deviceId;
				var devicename = userList[i].deviceName;
				var logindatetime = userList[i].loginDatetime;
				var status = userList[i].status;
				var onlineStatus = userList[i].onlineStatus;
				var traffic = Number(userList[i].totalUpTraffic) + Number(userList[i].totalDwTraffic);
				var authId = userList[i].authId;
                var authType = userList[i].authType;
				var usermemo = userList[i].memo;
                var terminalType = userList[i].terminalType;
                var browserType = userList[i].browserType;
                var mac = userList[i].mac;

                var additionalAuthInfo = "";
                if (isNotEmptyString(terminalType)) {
                    additionalAuthInfo += terminalType;
                }

                if (isNotEmptyString(browserType)) {
                    if (isNotEmptyString(terminalType)) {
                        additionalAuthInfo += " ";
                    }
                    additionalAuthInfo += browserType;
                }

                if (authType == "OPTION") {
                    authId = "匿名用户";
                }

                if (isNotEmptyString(additionalAuthInfo)) {
                    additionalAuthInfo = "(" + additionalAuthInfo + ")";
                    authId += additionalAuthInfo;
                }

				userListHtml += "<tr>";
				userListHtml += "<td id='user_userid_" + userid + "'>" + authId + "<span id='tip_" + userid + "'>";
				if (isNotEmptyString(usermemo)) {
					userListHtml += " <a><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+usermemo+"' id=''></i></a>";
				}
				userListHtml += "</span></td>";
/* 				userListHtml += "<td id='user_merchantname_" + userid + "'>" + merchantname + "</td>"; */
				if (isNotEmptyString(merchantname)) {
					userListHtml += "<td id='user_devicename_" + userid + "'>" + devicename + "(" + merchantname + ")" + "</td>";
				}
				else {
					userListHtml += "<td id='user_devicename_" + userid + "'>" + devicename + "</td>";
				}

				userListHtml += "<td id='user_mac_" + userid + "'>" + mac + "</td>";
				userListHtml += "<td id='user_logindatetime_" + userid + "'>" + logindatetime + "</td>";
				userListHtml += "<td id='online_status_" + userid + "'>" + onlineStatusSpan(onlineStatus) + "</td>";
				userListHtml += "<td id='user_status_" + userid + "'>" + statusUserSpan(status) + "</td>";
				userListHtml += "<td id='user_traffic_" + userid + "'>" + trafficFormatter(traffic) + "</td>";
				userListHtml += "<td id='user_opt_btn_" + userid + "' class='text-center'>";
				userListHtml += generateUserOptBtn(userid, deviceid, status);
				userListHtml += "</td>";
				userListHtml += "</tr>";

			}
		}

		return userListHtml;
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
	function onlineStatusSpan(onlineStatus) {
		var statusHtml="";
		if(onlineStatus != null){
			if (onlineStatus == "ONLINE" || onlineStatus == "online") {
				statusHtml += "<span class='label label-sm label-info statulb'>在线</span>";
			}
			else{
				statusHtml += "<span class='label label-sm label-default statulb'>离线</span>";
			}
		}
		return statusHtml;
	}
	function statusUserSpan(status)
	{
		var statusHtml="";
		if(status != null){
			if (status == "LOCKED") {
				statusHtml += "<span class='label label-sm label-warning statulb'>锁定</span>";
			}
			else{
				statusHtml += "<span class='label label-sm label-success statulb'>正常</span>";
			}
		}
		return statusHtml;
	}
	
	function generateUserOptBtn(userID, deviceId, status) {
		var userOptBtnHtml = "";
		if (userID != null) {
			userOptBtnHtml += "<a id='user_edit_" + userID + "' class='btn btn-default btn-xs' data-toggle='modal' href='javascript:void(0)' onclick='javascript:EditUser(\"" + userID + "\",\"" + deviceId + "\")'  style='cursor:pointer;'>";
			userOptBtnHtml += "<span class='glyphicon glyphicon-edit'></span>备注";
			userOptBtnHtml += "</a> ";

			if (status == "LOCKED") {
				userOptBtnHtml += "<a id='user_unlock_" + userID
						+ "'  href='javascript:unlockUser(\"" + userID + "\",\"" + deviceId + "\")' class='btn btn-default btn-xs' style='cursor:pointer;'>";
				userOptBtnHtml += "<span class='glyphicon glyphicon-open'></span>解锁";
				userOptBtnHtml += "</a>";

			} else {

				userOptBtnHtml += "<a id='user_lock_" + userID
						+ "'  href='javascript:lockUser(\"" + userID + "\",\"" + deviceId + "\")' class='btn btn-default btn-xs' style='cursor:pointer;'>";
				userOptBtnHtml += "<span class='glyphicon glyphicon-lock'></span>锁定";
				userOptBtnHtml += "</a>";
			}
		}
		return userOptBtnHtml;
	}
	function EditUser(userId, deviceId) {
		user_id = userId;
		device_id = deviceId;
		$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '${pageContext.request.contextPath}/user/getmemo.htm',
				data : {
					'userid' : user_id
				},
				success : function(data) {
					$("#memostr").val(data.memo);
				},
				error : function(data) {
/* 					$.pnotify({
						title : "无法连接服务器",
						text : "用户备注失败！",
						type : 'error'
					}); */

					return false;
				}
			});
		
		$('#clientmemoModal').modal('show');
	}
	
	function lockUser(userId, deviceId) {
		updateUserStatus(userId, deviceId, "BLOCK");
	}

	function unlockUser(userId, deviceId) {
		updateUserStatus(userId, deviceId, "UNBLOCK");
	}
	function updateUserStatus(userId, deviceId, type) {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/user/clientblock.htm',
			data : {
				'userid' : userId,
				'deviceid' : deviceId,
				'type' : type
			},
			success : function(data) {
				if (data.result != 'FAIL') {
					//alert(data.devicestatus);
					var userOptBtnHtml = generateUserOptBtn(userId,deviceId,data.status);
					//alert(data.status);
					$("#user_status_" + userId).html(statusUserSpan(data.status));
					$("#user_opt_btn_" + userId).html(userOptBtnHtml);
				} else {
/* 					$.pnotify({
						title : "设备操作失败",
						text : data.message,
						type : 'error'
					}); */
				}
			},
			error : function() {
/* 				$.pnotify({
					title : "帐号操作失败",
					text : data.message,
					type : 'error'
				}); */
			}
		});
	}
</script>




