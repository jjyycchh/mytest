<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<style>
#account_edit_info {
   margin-right:195px;
   margin-left:2px;
   -webkit-border-radius: 6px;
   -moz-border-radius: 6px;
   width:80%;
}
.popover{
width:275px;
}

.badge{
background-color:white;
color: #FFB848;
width:20px;
height:12px;
border:solid white;
border-radius:5px;
font-size:12px;
}
.panel-heading {
padding:5px 15px;
}
#div_set_subaccount_modal .form-control {
    background-color: #FFFFFF;
    background-image: none;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
    color: #555555;
    display: block;
    font-size: 14px;
    height: 30px;
    line-height: 1.42857;
    padding: 2px 1px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    vertical-align: middle;
    width: 70px;
    
}
#input_search_subaccount {width:100%;display:inline-block;}

.table > tbody > tr > td{vertical-align: middle;}
span{border-radius: 0 !important;}
</style>
<div class="container" style="padding-top: 20px;">
	<div class="row" id="breadcrumb"></div>
 <div class="row" id="account_edit_info" >
 <div class="panel panel-info">
              <div class="panel-heading">
                 <i class="glyphicon glyphicon-qrcode"></i> <span style="font-size:18px">基本信息</span>
              </div>
        <div class="panel-body">
       <div class="row">
		<div class="col-md-12">
  <div class="col-md-11">
  <div class="row">
		<div class="avatar-images col-md-2"	style="padding-bottom: 20px">
            <img id="acct_avatar" src="${pageContext.request.contextPath}/resources/img/touxiang.gif" data-src="holder.js/200x350/sky" style="width:100px;height:120px;max-width:100px; max-height:120px;" class="img-thumbnail">
		</div>
		<div class="col-md-6" >
			<form id="id_edit_acct_form" class="form-horizontal" role="form">
				<div class="form-group">
					<label for="acct_username" class="col-sm-3 control-label">
						用户名：<i id="username_validation_result" class="" style="float:right;color:#66cc99"></i>
					</label>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="acct_username" name="acct_username" placeholder="用户名">
						<div id="username_result" class="error-notification"></div>
					</div>
				</div>
				<div class="form-group">
					<label for="acct_fullname" class="col-sm-3 control-label">姓名：</label>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="acct_fullname" name="acct_fullname" placeholder="姓名">
					</div>
				</div>
				<div class="form-group">
					<label for="acct_type" class="col-sm-3 control-label">帐号类型:</label>
					<div class="col-sm-6">
						<div class="btn-group">
							<button id="acct_type" type="button" class="btn btn-default dropdown-toggle form-control" data-toggle="dropdown">
								帐号类型 <span class="caret"></span>
							</button>
							<ul id="acct_type_dropdown" class="dropdown-menu dropdown-block" role="menu">
							</ul>
						</div>
					</div>
				</div>
				<div class="form-group" id="div_merchant_name">
					<label for="merchant_name" class="col-sm-3 control-label">商户名称:</label>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="acct_merchant_name" name="acct_merchant_name" placeholder="商户名称">
					</div>
				</div>
				<div class="form-group" id="div_admin_geo_level">
					<label for="adminstrator_level" class="col-sm-3 control-label">管理员级别:</label>
					<div class="col-sm-6">
						<div class="btn-group">
							<button id="acct_admin_geo_lv" type="button" class="btn btn-default dropdown-toggle form-control" data-toggle="dropdown">
								管理员级别 <span class="caret"></span>
							</button>
							<ul id="acct_admin_geo_lv_dropdown" class="dropdown-menu dropdown-block" role="menu">
							</ul>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="acct_email" class="col-sm-3 control-label">邮箱：</label>
					<div class="col-sm-6">
						<input type="email" class="form-control" id="acct_email" name="acct_email" placeholder="邮箱">
					</div>
				</div>

				<div class="form-group">
					<label for="acct_cellphone" class="col-sm-3 control-label">手机：</label>
					<div class="col-sm-6">
						<input type="input" class="form-control" id="acct_cellphone" name="acct_cellphone" placeholder="手机">
					</div>
				</div>
				
				<div class="form-group">
					<label for="acct_geo_province" class="col-sm-3 control-label">所属区域：</label>
					<div class="col-sm-6">
						<select id="acct_geo_province" name="province" class="form-control"></select>
						<div id="acct_geo_province_result" class="error-notification"></div>
					</div>
				</div>
				<div class="form-group">
					<label for="acct_geo_city" class="col-sm-3 control-label"></label>
					<div class="col-sm-6">
						<select id="acct_geo_city" name="city" class="form-control"></select>
						<div id="acct_geo_city_result" class="error-notification"></div>
					</div>
				</div>
				<div class="form-group">
					<label for="acct_geo_county" class="col-sm-3 control-label"></label>
					<div class="col-sm-6">
						<select id="acct_geo_county" name="county" class="form-control"></select>
					</div>
				</div>
				<div class="form-group">
					<label for="acct_geo_address" class="col-sm-3 control-label"></label>
					<div class="col-sm-6">
						<textarea id="acct_geo_address" name="acct_geo_address" class="form-control" rows="3"></textarea>
					</div>
				</div>
				<div class="form-group">
					<label for="acct_tags" class="col-sm-3 control-label">分组标签：</label>
					<div class="col-sm-6">
						<input id="acct_tags" name="acct_tags" type="text" class="form-control">
					</div>
				</div>            
				<div class="form-group">
					<div class="row">
						<button id="btn_save_account" type="submit" class="col-md-offset-2 col-md-4 btn btn-primary">保存</button>
						<button id="btn_return_acct_lst" type="button" class="col-sm-offset-1 col-md-4 btn btn-default">返回</button>
					</div>
				</div>			
			</form>
		</div>
		<div class="col-md-3">
			<div id="acct_permissions" class="list-group">
			</div>
		</div>
		<div class="col-md-2"></div>
	</div> 
  </div>
  <div class="col-md-1"></div>
  </div>
  </div>
  </div>
  </div>
   
 </div>
	<div class="row" id="direct_sub_account" style="margin-top:7px;padding-right:38px;">
		<div class="col-md-10">
			<!-- BEGIN SAMPLE TABLE PORTLET-->
			<div class="portlet box yellow" style="margin-bottom:0px">
				<div class="portlet-title">				             
					<div class="caption">					
						 
						 <div style="display:inline;"><a href="javascript:void(0)" id="account_span_popover" data-toggle="tooltip"><i class="glyphicon glyphicon-question-sign" style="color:white"></i></a></div>
					直属下级帐号</div>
					<div class="tools">					   
						<button id="remove_sub_acct" type="button" class="btn btn-default btn-xs">
                           <span class="glyphicon glyphicon-remove-sign" style="margin-right: 0px;"></span>
                           		解除直属关系
                        </button>
					</div>
				</div>
				<div class="portlet-body" id="div_subacct">
					<table id="tbl_subacct" class="table table-hover">
						<thead>
							<tr>
								<th width="5%">操 作</th>
								<th width="10%">帐号</th>
								<th width="10%">名称</th>
								<th width="8%">类型</th>
								<th width="20%">所属区域</th>
								<!-- <th width="20%">分组标签</th> -->
								<th width="15%">创建时间</th>
							</tr>
						</thead>
						<tbody id="tbl_direct_subacct_lst">
						</tbody>
					</table>
				</div>
				<div class="panel-footer">
				<div class="row">
					<div class="col-md-6" style="padding-left: 25px">
						<h6>第 <span class="label label-info" id="lb_dir_subacct_pagenumber"></span> 页</h6>
					</div>
					<div class="col-md-6">
						<div id="div_dir_subacct_pagination" class="col-md-offset-3">
							<ul id="ul_dir_pagination" class="pager">
								<li><a id="a_dir_subacct_pagination_previous"style="cursor: pointer;"> 前一页 </a></li>
								<li><a id="a_dir_subacct_pagination_next" style="cursor: pointer;"> 后一页 </a></li>
							</ul>
						</div>
					</div>
				</div>
				</div>
			</div>
			<!-- END SAMPLE TABLE PORTLET-->
		</div>
		<div class="col-md-2"></div>
	</div>
	<div class="row" id="sub_account_set_btn">
		<div class="pull-left">
			<button id="btn_open_sub_acct" type="button" class="btn btn-info" style="margin-bottom: 3px;margin-left:12px;margin-top:3px">添加直属下级帐号</button>
		</div>
	</div>
</div>

<div id="div_set_subaccount_modal" class="modal fade" tabindex="-1" role="dialog">
	<div class="modal-dialog" style="width: 850px">
		<div class="panel panel-primary">
			<div class="panel-heading" style="padding-top: 10px">
				
					
				
				<div class="row">
				    <div class="col-md-2">
						<h4 class="panel-title" style="padding-top:5px;">
							<span class="glyphicon glyphicon-arrow-right"></span>添加子帐号
						</h4>
					</div>
					<div class="col-md-4">
						<div class="col-md-4">
					        <select id="id_province" name="province" class="form-control"></select>
					    </div>
					    <div class="col-md-4">
					        <select id="id_city" name="city" class="form-control"></select>
					    </div>
					    <div class="col-md-4">
					        <select id="id_county" name="county" class="form-control"></select>
					    </div>
					</div>
					
					
					<div class="col-md-5" style="padding-left:0px;">
						<input type="text" id="input_search_subaccount" style="width:330px;" class="form-control" placeholder="关键字">
						
					</div>
					<div class="col-md-1" style="padding-left:0px;">
						
						<input id="btn_search_subaccount" type="button" class="btn btn-default" style="width:50px;height:30px;padding:5px 12px" value="过滤" >
					</div>
					
				</div>
				
				
			</div>
			<div class="panel-body" style="padding-bottom: 0px; max-height: 600px">
				<div class="row">
					<div class="col-md-12">
						<div style="padding-bottom: 0px">
							<!-- BEGIN SAMPLE TABLE PORTLET-->
							<div class="portlet box white" style="margin-bottom: 2px">
								<div id="modaltab" class="portlet-body">
									<table class="table table-hover" style=" margin-bottom: 0px;">
										<thead>
											<tr>
												<th width="5%">操 作</th>
												<th width="10%">帐号</th>
												<th width="10%">名称</th>
												<th width="7%">类型</th>
												<th width="20%">所属区域</th>
												<!-- <th width="20%">分组标签</th> -->
											</tr>
										</thead>
										<tbody id="tbl_subaccount_lst">
										</tbody>
									</table>
								</div>
								<div class="row">
									<div class="col-md-6" style="padding-left: 25px">
										<h6>第 <span class="label label-info" id="lb_subacct_pagenumber"></span> 页</h6>
									</div>
									<div class="col-md-6">
										<div id="div_subacct_pagination" class="col-md-offset-3">
											<ul id="ul_pagination" class="pager">
												<li><a id="a_subacct_pagination_previous"style="cursor: pointer;"> 前一页 </a></li>
												<li><a id="a_subacct_pagination_next" style="cursor: pointer;"> 后一页 </a></li>
											</ul>
										</div>
									</div>
								</div>
							</div><!-- END SAMPLE TABLE PORTLET-->
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer" style="max-height: 80px; margin-top: 0px">
				<button id="btn_set_sub_acct" type="button" class="btn btn-success btn-vote">选定</button>
				<button type="button" class="btn btn-default btn-close" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>

<div style="height:60px;"></div>

<script type="text/javascript">
	MAIN_MENU.setActiveMenuItem("id_mm_account");

	var curAccountId = "${accountId}";
	var curAccountType = null;
	var curAcctGeoLevel = null;
	var curAccountPermissions = null;
	var curAccountTags = null;
	var acctDetails = null;
	
	var optAcctType = '${sessionScope.login_account_info.type}';
	var optAcctGeoLevel = '${sessionScope.login_account_info.geoLevel}';

	var selected_subaccts = null;
	var removed_subaccts = null;
	var subacctSearchHandler = null;
	
	var directSubSearchHandler = null;
	
	$(document).ready(function() {
		// tooltip 提示
		var options={placement:"top",title:"<span>直属下级帐号说明直属下级帐号</br>直属下级帐号说明直属下级帐号说明</span>",trigger:"hovel",html:true};
			$("#account_span_popover").tooltip(options);
		
		//查询所有未添加的下级用户
		subacctSearchHandler = new searchUtil(generateSubacctListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_subaccount_lst", "lb_subacct_pagenumber", "a_subacct_pagination_previous", "a_subacct_pagination_next", 
				"${pageContext.request.contextPath}/account/search_all_sub.htm", "modaltab");
		subacctSearchHandler.setSearchParemeter("totalParentId", curAccountId);
		
		//查询已有的直属下级用户
		directSubSearchHandler = new searchUtil(generateAcctListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_direct_subacct_lst", "lb_dir_subacct_pagenumber", "a_dir_subacct_pagination_previous", "a_dir_subacct_pagination_next",
				"${pageContext.request.contextPath}/account/search_direct_sub.htm", "tbl_subacct");
		directSubSearchHandler.setSearchParemeter("directParentId", curAccountId);
		
		addr_selector_create('acct_geo_province', 'acct_geo_city', 'acct_geo_county');

		addr_selector_create('id_province', 'id_city', 'id_county');
		
		if(curAccountId){
			// edit account
			LoadAccountData(curAccountId);
			
			/* if(curAccountType == ACCOUNT_TYPE.MERCHANT){
				$("#direct_sub_account").hide();
				$("#sub_account_set_btn").hide();
			}else {
				directSubSearchHandler.searchWithPreload();
			} */
		}
		else {
			//TODO 隐藏列表和添加按钮
			$("#direct_sub_account").hide();
			$("#sub_account_set_btn").hide();
			// initial permission box for create new account
			refreshPermissionBox(curAccountType, curAccountPermissions, WHOLE_PERMISSIONS);
		}
		
		drawAcctTypeDropDown();
		drawAcctAdminLevelDropDown();
		
     	//LoadAllCurrentSubacctIds();
		
		$("#acct_username").blur(function() {
			validateUsername();
		});

		$("#btn_return_acct_lst").click( function() {
			$.get('${pageContext.request.contextPath}/account/account_management.htm',	
				function(data) {
				    $('#id_main_content').html(data);
			});
		});
		/***---解除直属关系--***/
		$("#remove_sub_acct").click(function() {
			RemoveSubAccount();
		});
		/***-----***/
		$("#btn_open_sub_acct").click(function() {
			showSetSubAcctModal();
		});

		$("#id_edit_acct_form").validate({
			errorClass : "error-notification",
			errorElement : "div",
			rules : {
				acct_username : {
					required : true,
					maxlength : 64
				},
				acct_fullname : {
					maxlength : 200
				},
				acct_merchant_name : {
					maxlength: 255
                },
				acct_email : {
                	required: true,
                	email: true,
                	maxlength: 100
                }/* ,
				acct_cellphone : {
					required : true, 
					isMobile : true 
				} */
			},
			messages : {
				acct_username : {
					required : "请输入用户名",
					maxlength : "用户名不得超过64个字符",
					remote : "用户名已被注册"
				},
				acct_fullname: {
					maxlength: "姓名长度不得超过200"
                },
				acct_merchant_name: {
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
			submitHandler : function(form) {
				var cellNumber = $("#acct_cellphone").val();
				if(curAccountType == ACCOUNT_TYPE.REPRESENTATIVE && cellNumber==""){
					$.pnotify({
			            title: "提示：代理商的手机号码不能为空",
			            text: "",
			            type: 'error'
			        });
					return false;
				}
				
				SaveAccountData();
			}
		});

		$('#acct_tags').on('save', function(e, params) {
			var tags = params.newValue.replace(/;/g, ",").replace(/，/g, ",").replace(/；/g, ",").replace(/, /g, ",").replace(" ",",");
			var tag_array = tags.split(",");

			for ( var i = 0; i < tag_array.length;) {
				if (tag_array[i].trim() == "") {
					tag_array.remove(tag_array[i]);
				} 
				else {
					i++;
				}
			}
			
			// update tags array to unique;
			var uniqueTags = [];
			$.each(tag_array, function(i, el){
			    if($.inArray(el, uniqueTags) === -1) uniqueTags.push(el);
			});

			if (acctDetails != null) {
				acctDetails.tags = uniqueTags;
			}
			curAccountTags = uniqueTags;
			$("#acct_tags").val(tag_array.join(", "));
		});

		$.fn.editable.defaults.mode = 'popup';
		$("#acct_tags").editable();

	});
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
            title: "子帐号数据加载失败",
            text: message,
            type: 'error'
        });
	}
	
	function searchErrorCallBack(result, message) {
        $.pnotify({
            title: "无法连接服务器",
            text: "加载子帐号数据请求提交失败！ " + message,
            type: 'error'
        });
	}
	
	function SaveAccountData() {
		if (acctDetails == null) {
			acctDetails = {};
		}
		acctDetails.username = $("#acct_username").val();
		//acctDetails.avatarPath = $("#acct_avatar").attr('src');
		acctDetails.fullname = $("#acct_fullname").val();
		acctDetails.type = curAccountType;
		acctDetails.geoLevel = curAcctGeoLevel;
		acctDetails.merchantName = $("#acct_merchant_name").val();
		acctDetails.email = $("#acct_email").val();
		acctDetails.cellNumber = $("#acct_cellphone").val();
		acctDetails.geoLocation = JSON.stringify(getAddress());
		
		//curAccountPermissions = acctTypePermCodeFilter(curAccountType, curAccountPermissions);
		if(!locationValidate()){
			return false;
		}
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/account/editaccount.htm',
			data : {
				'account.id' : acctDetails.id,
				'account.username' : acctDetails.username,
				'account.avatarPath' : acctDetails.avatarPath,
				'account.fullname' : acctDetails.fullname,
				'account.type' : acctDetails.type,
				'account.merchantName' : acctDetails.merchantName,
				'account.email' : acctDetails.email,
				'account.cellNumber' : acctDetails.cellNumber,
				'account.geoLevel' : acctDetails.geoLevel,
				'account.geoLocation' : acctDetails.geoLocation,
				'tags' : curAccountTags == null ? "" : curAccountTags.join(","),
				'permissions' : curAccountPermissions == null ? "" : curAccountPermissions.join(",")
			},
			success : function(data) {
				if (data.result != 'FAIL') {
					/* if(!acctDetails.id){
						acctDetails.id = data.accountId;
					}
					LoadAccountData(acctDetails.id); */
					
					reloadEditPage(data.accountId);
					
					$.pnotify({
						title : "帐号保存成功",
						text : data.message,
						type : 'success'
					});
				} else {
/* 					$.pnotify({
						title : "帐号信息保存失败",
						text : data.message,
						type : 'error'
					}); */
					return false;
				}
			},
			error : function(data) {
/* 				$.pnotify({
					title : "无法连接服务器",
					text : "帐号信息保存失败！",
					type : 'error'
				}); */

				return false;
			}
		});
	}

	function LoadAccountData(accountId) {
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/account/accountdetails.htm',
			data : {
				'accountId' : accountId
			},
			success : function(data) {
				if (data.result != 'FAIL' && data.account != null) {
					if (data.account != null) {
						acctDetails = data.account;
						curAccountType = acctDetails.type;
						curAcctGeoLevel = acctDetails.geoLevel;
						curAccountPermissions = acctDetails.permissions;
						curAccountTags = acctDetails.tags;
						refreshAccountData(acctDetails);
						refreshPermissionBox(curAccountType, curAccountPermissions, WHOLE_PERMISSIONS);
						
						
						if (acctDetails.type == ACCOUNT_TYPE.MERCHANT) {
							$("#div_merchant_name").show();
							$("#direct_sub_account").hide();
							$("#sub_account_set_btn").hide();
						} else {
							$("#div_merchant_name").hide();
							directSubSearchHandler.searchWithPreload();
						}
						
						if (acctDetails.type == ACCOUNT_TYPE.ADMINISTRATOR) {
							$("#div_admin_geo_level").show();
						} else {
							$("#div_admin_geo_level").hide();
						}
						
					}
				} else {
/* 					$.pnotify({
						title : "帐号数据加载失败",
						text : data.message,
						type : 'error'
					}); */
					return false;
				}
			},
			error : function(data) {
/* 				$.pnotify({
					title : "无法连接服务器",
					text : "加载帐号请求提交失败！",
					type : 'error'
				}); */

				return false;
			}
		});
	}

	function refreshAccountData(account) {
		if (account.avatarPath != null) {
			$("#acct_avatar").attr('src', account.avatarPath);
		}

		$("#acct_username").val(account.username);
		$("#acct_fullname").val(account.fullname);
		$("#acct_merchant_name").val(account.merchantName)
		$("#acct_email").val(account.email);
		$("#acct_cellphone").val(account.cellNumber);

		if (account != null && account.tags != null) {
			$("#acct_tags").val(account.tags.join(", "));
			$("#acct_tags").editable('setValue', account.tags.join(", "), true);
		}
		
		if (account != null && isNotEmptyString(account.type)) { 
			$("#acct_type").html(getAccountTypeCnName(account.type) + "&nbsp;&nbsp;<span class='caret'></span>");
		}else {
			
		}
		
		if (account != null && isNotEmptyString(account.geoLevel)){
			//alert(getGeoCnNameByGeoLevel(account.geoLevel) + "&nbsp;&nbsp;<span class='caret'></span>");
			$("#acct_admin_geo_lv").html(getGeoCnNameByGeoLevel(account.geoLevel) + "&nbsp;&nbsp;<span class='caret'></span>");
		}else {
			if(curAcctGeoLevel == null){
				var acctLevelCnName = $(".acctLevelItem").eq(0).text();
				$("#acct_admin_geo_lv").html(acctLevelCnName);
				curAcctGeoLevel = getGeoLevelByCnName(acctLevelCnName);
				acctDetails.geoLevel = curAcctGeoLevel;
			}
		}

		var geoLocation = account.geoLocation;

		var province = "";
		var city = "";
		var county = "";
		var address = "";
		
		if (geoLocation != null && geoLocation != undefined && geoLocation != "") {
			geoLocation = JSON.parse(geoLocation);
			
			province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province;
			city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city;
			county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county;
			address = geoLocation.address == undefined || geoLocation.address == null ? "" : geoLocation.address;
		} 

		if (province != undefined && province != null && province != "") {
			addr_selector_set('acct_geo_province', province, 'acct_geo_city', city, "acct_geo_county", county);
			if(account != null && isNotEmptyString(account.geoLevel)){
				loadSubSearchLocation(account.geoLevel, province, city, county);
			}
		}
		$("#acct_geo_address").val(address);

	}

/* 	function LoadSubAccount(pageNo, accountId) {
		if (pageNo == null || pageNo == "") {
			pageNo = 1;
		}

		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/account/searchaccount.htm',
			data : {
				'pageNo' : pageNo,
				'directParentAcctId' : accountId
			},
			success : function(data) {
				if (data.result != 'FAIL' && data.records != null) {
					if (data.records.length > 0) {
						var accountListHtml = generateAcctListHtml(data.records);
					}
				} else {
					$.pnotify({
						title : "下属子帐号数据加载失败",
						text : data.message,
						type : 'error'
					});
					return false;
				}
			},
			error : function(data) {
				$.pnotify({
					title : "无法连接服务器",
					text : "加载下属子帐号数据请求提交失败！",
					type : 'error'
				});

				return false;
			}
		});
	} */

	function generateAcctListHtml(account_lst) {
		var acctListHtml = "";

		if (account_lst != null) {
			for ( var i = 0; i < account_lst.length; i++) {
				var acctListItemHtml = "<tr>";
				var geoLocation = account_lst[i].geoLocation;
				
				var province = "";
				var city = "";
				var county = "";
				var address = "";
				
				if (geoLocation != null && geoLocation != undefined && geoLocation != "") {
					geoLocation = JSON.parse(geoLocation);
					
					province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province + " ";
					city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city + " ";
					county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county + " ";
					address = geoLocation.address == undefined || geoLocation.address == null ? "" : geoLocation.address + " ";
				}
				
				acctListItemHtml += 	"<td style='padding-top:0px;padding-bottom:0px;'>";
				acctListItemHtml += 		"<div class='checkbox'>";
				acctListItemHtml += 			"<label><input id='acct_remove_" + account_lst[i].id + "' class='remove-subacct' name='removecheck' value='"+account_lst[i].id+"' type='checkbox'> </label>";
				acctListItemHtml += 		"</div>";
				acctListItemHtml += 	"</td>";
				acctListItemHtml += "<td>" + account_lst[i].username + "</td>";
				if (account_lst[i].type == ACCOUNT_TYPE.MERCHANT) {
					acctListItemHtml += "<td>" + account_lst[i].merchantName + "</td>";
				} else {
					acctListItemHtml += "<td>" + account_lst[i].fullname + "</td>";
				}
				acctListItemHtml += "<td>" + generate_cn_typename(getAccountTypeCnName(account_lst[i].type)) + "</td>";					
				var wholeAddress = province + city + county + address;
				var wholeAddress1 = province + city + county + address;
				if (wholeAddress.length > 15) {
					wholeAddress = wholeAddress.substring(0, 15);
				}
				var tags = "";
				var tags1 = "";
				if(account_lst[i].tags){
					tags = account_lst[i].tags.join(", ");
					tags1 = account_lst[i].tags.join(", ");
					if (tags.length > 15) {
						tags = tags.substring(0, 15);
					}	
				}
				acctListItemHtml += "<td>";
				acctListItemHtml += wholeAddress;
				if (wholeAddress1.length > 15){
					acctListItemHtml += 	" <a><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+wholeAddress1+"' id=''></i></a>";				
				}
				acctListItemHtml += 	"</td>";
				/* acctListItemHtml += "<td>";
				acctListItemHtml += tags;
				if (tags1.length > 15){
					acctListItemHtml += 	" <a><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+tags1+"' id=''></i></a>";				
				}		
				acctListItemHtml += 	"</td>"; */
				
				acctListItemHtml += "<td>" + account_lst[i].createDatetime + "</td>";
				acctListItemHtml += "</tr>"

				acctListHtml += acctListItemHtml;
			}
		}
		
		return acctListHtml;

	}

	function refreshPermissionBox(accountType, accountPermissions, whole_perm_lst_type) {

		var opt_acct_perm_lst = accountPermissions == null ? null : accountPermissions.clone();
		var whole_perm_lst_type_filted = AcctTypeFilterForWholePermission(accountType);

		var permissionBoxHtml = "<a href='#' class='list-group-item active'><strong>权限选择:</strong></a>";
		for ( var i = 0; i < whole_perm_lst_type_filted.length; i++) {
			var hasPermission = false;
			if (opt_acct_perm_lst != null) {
				for ( var j = 0; j < opt_acct_perm_lst.length; j++) {
					if (whole_perm_lst_type_filted[i].perm_code == opt_acct_perm_lst[j]) {
						permissionBoxHtml += "<a id='" + whole_perm_lst_type_filted[i].id + "' class='list-group-item perm-item' style='cursor:pointer;'><i class='ion-checkmark-round size-32'></i>&nbsp;&nbsp;"
								+ whole_perm_lst_type_filted[i].cn_name
								+ "</a>";
						hasPermission = true;
						break;
					}
				}
			}

			if (!hasPermission) {
				permissionBoxHtml += "<a id='" + whole_perm_lst_type_filted[i].id + "' class='list-group-item perm-item' style='cursor:pointer;'><i style='padding-left: 11px;'></i>&nbsp;&nbsp;" + whole_perm_lst_type_filted[i].cn_name + "</a>";
			}
		}

		$("#acct_permissions").html(permissionBoxHtml);
		$(".perm-item").click(function() {
			for ( var i = 0; i < WHOLE_PERMISSIONS.length; i++) {
				if (this.id == WHOLE_PERMISSIONS[i].id) {
					onCheckPermission(WHOLE_PERMISSIONS[i].perm_code);
					break;
				}
			}
		});
	}
	
	function drawAcctAdminLevelDropDown() {
		if (ACCOUNT_GEO_LEVEL != null) {
			var adminLevels = null;
			
			adminLevels = getEditableGeoLevel(optAcctGeoLevel, optAcctType);
			
			var dropdownItemsHtml = "";
			for (var i = 0; i < adminLevels.length; i++) {
				dropdownItemsHtml += "<li role='presentation'><a class='acctLevelItem' role='menuitem' tabindex='-1' style='cursor:pointer;'>" + adminLevels[i].cn_name + "</a></li>";
			}
			$("#acct_admin_geo_lv_dropdown").html(dropdownItemsHtml);
			
			if (acctDetails != null && isNotEmptyString(acctDetails.geoLevel)) {
				$("#acct_admin_geo_lv").html(getGeoCnNameByGeoLevel(acctDetails.geoLevel) + "&nbsp;&nbsp;<span class='caret'></span>");	
			}else {
				if($(".acctLevelItem").length>0){
					var acctLevelCnName = $(".acctLevelItem").eq(0).text();
					$("#acct_admin_geo_lv").html(acctLevelCnName+ "&nbsp;&nbsp;<span class='caret'></span>");
					curAcctGeoLevel = getGeoLevelByCnName(acctLevelCnName);
				}else {
					$("#div_admin_geo_level").hide();
				}
				
			}
			
			$(".acctLevelItem").click(function() {
				var acctLevelCnName = $(this).text();
				
				$("#acct_admin_geo_lv").html(acctLevelCnName + "&nbsp;&nbsp;<span class='caret'></span>");

				curAcctGeoLevel = getGeoLevelByCnName(acctLevelCnName);
				 
				if (acctDetails != null) {
					acctDetails.geoLevel = curAcctGeoLevel;
				}
			});
		}
	}

	function drawAcctTypeDropDown() {
		var displayableAcctTypes = getDisplayableAccountTypes();
		
		if (displayableAcctTypes != null) {
			var dropdownItemsHtml = "";
			
			//若当前操作用户为管理员且等级等于4，则不能创建管理员
			if(optAcctType==ACCOUNT_TYPE.ADMINISTRATOR && optAcctGeoLevel==ACCOUNT_GEO_LEVEL[3].level){
				displayableAcctTypes.removeOnIndex(0); 
			}
			
			for ( var i = 0; i < displayableAcctTypes.length; i++) {
				dropdownItemsHtml += "<li role='presentation'><a class='acctTypeItem' role='menuitem' tabindex='-1' style='cursor:pointer;'>" + displayableAcctTypes[i].cn_name + "</a></li>";
			}

			$("#acct_type_dropdown").html(dropdownItemsHtml);
			if (acctDetails != null) {
				$("#acct_type").html(getAccountTypeEnName(acctDetails.type) + "&nbsp;&nbsp;<span class='caret'></span>");
			}else {
				var currAcctType_cn = $(".acctTypeItem").eq($(".acctTypeItem").length-1).text();
				$("#acct_type").html(currAcctType_cn+ "&nbsp;&nbsp;<span class='caret'></span>");
				curAccountType = getAccountTypeEnName(currAcctType_cn);
				$("#div_admin_geo_level").hide();
				refreshPermissionBox(curAccountType, curAccountPermissions, WHOLE_PERMISSIONS);
			}

			$(".acctTypeItem").click(function() {
				var currAcctType_cn = $(this).text();

				$("#acct_type").html(currAcctType_cn + "&nbsp;&nbsp;<span class='caret'></span>");
				
				var currAcctType_en = getAccountTypeEnName(currAcctType_cn);
				curAccountType = currAcctType_en;
				if (acctDetails != null) {
					acctDetails.type = currAcctType_en;
				}
				
				if (currAcctType_cn == getAccountTypeCnName(ACCOUNT_TYPE.MERCHANT)) {
					$("#div_merchant_name").show();
				} else {
					$("#div_merchant_name").hide();
				}
				
				if (currAcctType_cn == getAccountTypeCnName(ACCOUNT_TYPE.ADMINISTRATOR)) {
					$("#div_admin_geo_level").show();
				} else {
					$("#div_admin_geo_level").hide();
				}
				
				drawAcctAdminLevelDropDown(); 
				
				refreshPermissionBox(curAccountType, curAccountPermissions, WHOLE_PERMISSIONS);

			});
		}
	}
	
	function onCheckPermission(permCode) {
		/////////////////////
		// permCode validation
		var isValidPermCode = false;

		for ( var i = 0; i < WHOLE_PERMISSIONS.length; i++) {
			if (permCode == WHOLE_PERMISSIONS[i].perm_code) {
				isValidPermCode = true;
				break;
			}
		}

		if (!isValidPermCode) {
			return;
		}

		/////////////////////
		// change local permission
		if (curAccountPermissions == null || curAccountPermissions.length == 0) {
			curAccountPermissions = [];
		}
		
		var hasPermission = curAccountPermissions.remove(permCode);
		
		if (!hasPermission) {
			curAccountPermissions.push(permCode);
		}
		
		if (acctDetails != null) {
			acctDetails.permissions = curAccountPermissions.clone();
		}

		refreshPermissionBox(curAccountType, curAccountPermissions, WHOLE_PERMISSIONS);
	}
	
    function validateUsername() {
    	var username = $("#acct_username").val();
    	
    	$("#username_validation_result").hide();
    	$("#username_validation_result").removeClass();
    	
		$.ajax({
			url: "${pageContext.request.contextPath}/account/usernamevalidation.htm", 
		    type: 'GET',
		    dataType: 'json',
		    data: {id: acctDetails==null?"":acctDetails.id, username: username},
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
		    success: function (data) {
				if (data.result == 'OK') {
					$("#username_validation_result").addClass("icon ion-checkmark-circled");
					$("#btn_save_account").removeClass("disabled");
					$("#username_result").html("");
				} 
				else {
					$("#username_validation_result").addClass("icon ion-close-circled");
					$("#btn_save_account").addClass("disabled");
					$("#username_result").html("该用户名已存在");
				}
				$("#username_validation_result").show();
		    },
		    error: function (data) {
		    }
		});
    }
    
    function getAddress() {
    	var province = addr_selector_field_get('acct_geo_province');
    	var city = addr_selector_field_get('acct_geo_city');
    	var county = addr_selector_field_get('acct_geo_county');
    	var detailAddress = $("#acct_geo_address").val();
    	
    	return getObjectAddress(province, city, county, detailAddress);
    }
    
    function SubmitSubAccount() {
    	selected_subaccts = [];
    	$('input[name="add_redirect_account"]:checked').each(function(){    
    		selected_subaccts.push(this.value);
     	  }); 
		$.ajax({
			url: "${pageContext.request.contextPath}/account/updateparentid.htm", 
		    type: 'POST',
		    dataType: 'json',
		    data: {
		    	operation: "add",
		    	accountId: curAccountId,
		    	directsubaccountids: JSON.stringify(selected_subaccts)
		    	},
		    success: function (data) {
		    	if (data.result != 'FAIL') {
		    		closeSetSubAcctModal();
		    		directSubSearchHandler.searchWithPreload();
		    		
					$.pnotify({
						title : "添加直属子帐号完成",
						text : "",
						type : 'success',
						delay : 2000
					});
		    	}
		    },
		    error: function (data) {
/* 				$.pnotify({
					title : "添加直属子帐号失败",
					type : 'error'
				}); */
				return false;
		    }
		});
    }
    function RemoveSubAccount() {
    		removed_subaccts = [];
    	var checkedStr = "";
    	$('input[name="removecheck"]:checked').each(function(){    
    		removed_subaccts.push(this.value);
     	   //checkedStr +=$(this).val();
     	   //checkedStr +=",";
     	  }); 
    	//checkedStr = checkedStr.substring(0,checkedStr.length-1);
    	
		$.ajax({
			url: "${pageContext.request.contextPath}/account/updateparentid.htm", 
			operation: 'POST',
		    dataType: 'json',
		    data: {
		    	operation: "remove",
		    	accountId: curAccountId,
		    	directsubaccountids: JSON.stringify(removed_subaccts)
		    	},
		    success: function (data) {
		    	if (data.result != 'FAIL') {
					directSubSearchHandler.searchWithPreload();
		    		
					$.pnotify({
						title : "子帐号关系解除完成",
						text : "",
						type : 'success',
						delay : 2000
					});
		    	}
		    },
		    error: function (data) {
/* 				$.pnotify({
					title : "子帐号解除关系失败",
					text : "",
					type : 'error'
				}); */
		    }
		});
    }
    
    
    function setSubAccount() {
    	SubmitSubAccount();
    }
    
    function showSetSubAcctModal() {
    	$('#div_set_subaccount_modal').modal('show');
    	
		if (selected_subaccts == null) {
			selected_subaccts = [];
		}
		
		subacctSearchHandler.setSearchParemeter("province", addr_selector_field_get('id_province'));
		subacctSearchHandler.setSearchParemeter("city", addr_selector_field_get('id_city'));
		subacctSearchHandler.setSearchParemeter("county", addr_selector_field_get('id_county'));
     	subacctSearchHandler.searchWithPreload();
		
		$("#btn_set_sub_acct").unbind("click");
		$("#btn_set_sub_acct").click(function() {
			setSubAccount();
		});
		
		$("#btn_search_subaccount").unbind("click");
		$("#btn_search_subaccount").click(function() {
			var keywords = $("#input_search_subaccount").val();
			keywords = subacctSearchHandler.convertKeywordsSearchable(keywords);

			subacctSearchHandler.setSearchParemeter("keywords", keywords);
			subacctSearchHandler.setSearchParemeter("province", addr_selector_field_get('id_province'));
			subacctSearchHandler.setSearchParemeter("city", addr_selector_field_get('id_city'));
			subacctSearchHandler.setSearchParemeter("county", addr_selector_field_get('id_county'));
			subacctSearchHandler.searchWithPreload();
		});
    }
    
    function LoadAllCurrentSubacctIds() {
		$.ajax({
			url: "${pageContext.request.contextPath}/account/subaccountids.htm", 
		    type: 'GET',
		    dataType: 'json',
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
		    success: function (data) {
		    	if (data.result != 'FAIL') {
		    		var nSubAccountIds = data.allsubacctids;
		    		if (selected_subaccts == null) {
		    			selected_subaccts = [];
		    		}
		    		
		    		for (var i = 0; i<nSubAccountIds.length;i++) {
		    			selected_subaccts.push(nSubAccountIds[i] + "");
		    		}
		    	}
		    },
		    error: function (data) {
/* 				$.pnotify({
					title : "加载所有子帐号ID 失败",
					type : 'error'
				}); */
				return false;
		    }
		});
    }
    
    function closeSetSubAcctModal() {
    	$('#div_set_subaccount_modal').modal('hide');
    }
    	
	function postSubaccountRenderCallBack() {
		$(".selectable-subacct").each(function() {
 			var subacct_id = this.id.substring('acct_selector_'.length);
			if (selected_subaccts != null 
					&& selected_subaccts.length > 0 
					&& selected_subaccts.contains(subacct_id)) {
				this.checked = true;
			}
		});
		
		$(".selectable-subacct").click(function() {
			if (this.checked) {
				// add id into selected_subaccts
				selected_subaccts.push(this.id.substring('acct_selector_'.length));
			}
			else {
				selected_subaccts.remove(this.id.substring('acct_selector_'.length) );
			}
		});
	}
	
	function generateSubacctListHtml(subaccount_lst){
		var acctListHtml = "";
		
		if (subaccount_lst.length > 0) {
			
			for (var i = 0; i < subaccount_lst.length;i++) {
				var id = subaccount_lst[i].id;
				var username = subaccount_lst[i].username;
				var fullname = subaccount_lst[i].fullname;
				var cellphone = subaccount_lst[i].cellNumber;
				var type = subaccount_lst[i].type;
				var cn_type_name = getAccountTypeCnName(subaccount_lst[i].type);
				var status = subaccount_lst[i].status;
				var geoLocation = subaccount_lst[i].geoLocation;
				
				var province = "";
				var city = "";
				var county = "";
				var address = "";
				
				if (geoLocation != null && geoLocation != undefined && geoLocation != "") {
					geoLocation = JSON.parse(geoLocation);
					
					province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province + " ";
					city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city + " ";
					county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county + " ";
					address = geoLocation.address == undefined || geoLocation.address == null ? "" : geoLocation.address + " ";
				}

				var tags = "";
				if (subaccount_lst[i].tags) {
					var tag_array = subaccount_lst[i].tags.clone();
					if (subaccount_lst[i].tags.length > 2) {
						tag_array = tag_array.slice(0, 2);
					}
					
 					tags = tag_array.join(", ");
 					
					if (subaccount_lst[i].tags.length > 2) {
						tags += "...";
					}
				}
				var createDatetime = subaccount_lst[i].createDatetime;
				var wholeAddress = province + city + county + address;
				var wholeAddress1 = province + city + county + address;
				if (wholeAddress.length > 14) {
					wholeAddress = wholeAddress.substring(0, 14);
				}
				acctListHtml += "<tr>";
				acctListHtml += 	"<td style='padding-top:0px;padding-bottom:0px;'>";
				acctListHtml += 		"<div class='checkbox'>";
				acctListHtml += 			"<label><input id='acct_selector_" + id + "' name='add_redirect_account' value='"+id+"' class='selectable-subacct' type='checkbox'> </label>";
				acctListHtml += 		"</div>";
				acctListHtml += 	"</td>";
				acctListHtml += 	"<td style='padding-top:0px;padding-bottom:0px;vertical-align: middle'>" + username + "</td>";
				acctListHtml += 	"<td style='padding-top:0px;padding-bottom:0px;vertical-align: middle'>" + fullname + "</td>";
				acctListHtml += 	"<td style='padding-top:0px;padding-bottom:0px;vertical-align: middle'>" + generate_cn_typename(cn_type_name)+ "</td>";
				acctListHtml += 	"<td style='padding-top:0px;padding-bottom:0px;vertical-align: middle'>";
				acctListHtml += wholeAddress;
				if (wholeAddress1.length > 14){
					acctListHtml += 	" <a><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+wholeAddress1+"' id=''></i></a>";				
				}
				acctListHtml +=     "</td>";
				/* acctListHtml += 	"<td style='padding-top:0px;padding-bottom:0px;vertical-align: middle'>" + tags + "</td>"; */
				acctListHtml += "</tr>";
			}
		}

		return acctListHtml;
	}
	
	function reloadEditPage(accountid){
		$.get(
				'${pageContext.request.contextPath}/account/editaccount.htm',	
				{ 'accountId': accountid },
				function(data) {
				    $('#id_main_content').html(data);
			});
	}
	
	function locationValidate (){
		var province = addr_selector_field_get('acct_geo_province');
    	var city = addr_selector_field_get('acct_geo_city');
    	
    	if(province == null){
    		$("#acct_geo_province_result").html("请选择省");
    		$("#acct_geo_province_result").show();
    		return false;
    	} else {
    		$("#acct_geo_province_result").html("");
    		$("#acct_geo_province_result").hide();
    	}
    	
    	if(city == null){
    		$("#acct_geo_city_result").html("请选择市");
    		$("#acct_geo_city_result").show();
    		return false;
    	} else {

    		$("#acct_geo_city_result").html("");
    		$("#acct_geo_city_result").hide();
    	}
    	
    	return true;
	}
	
	function loadSubSearchLocation(geoLevel, province, city, county){
		if(geoLevel == "2"){
			addr_selector_set("id_province", province, "id_city", "请选择", "id_county", "请选择");
		} else if(geoLevel == "3"){
			addr_selector_set("id_province", province, "id_city", city, "id_county", "请选择");
		} else if(geoLevel == "4"){
			addr_selector_set("id_province", province, "id_city", city, "id_county", county);
		}
	}
</script>
