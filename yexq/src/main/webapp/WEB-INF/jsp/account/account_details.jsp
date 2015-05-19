<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<style>
	.tagspan{font-size: 85% !important;line-height:25px;padding: 0.3em 0.6em !important;}
	.table > tbody > tr > td{vertical-align: middle;}
	span{border-radius: 0 !important;}
.dl-horizontal dt {
width:80px;
}
.dl-horizontal dd {
width:200px;
margin-left: 100px;
}
.panel-heading {
padding-top:：4px;
padding-bottom:4px;
}

.dl-horizontal {

}
</style>
<div class="container-fluid"
	style="padding-top: 10px; margin-bottom: 50px">
	<div class="row-fluid">
	    <div style="margin-left:15px;margin-right:15px" class="panel panel-info">
              <div class="panel-heading">
                <h3 class="panel-title" id="acct_username" style="maring-top: 0px; font-size: 20px;"></h3>
              </div>
        <div class="panel-body">
       <div class="row">
		<div class="col-md-8">
			
<dl class="dl-horizontal" style="margin-bottom:0px;margin-top:0px">
  <dt style="padding-bottom:5px">帐号类型</dt>
  <dd id="acct_type"></dd>
 <dt style="padding-bottom:5px">姓名</dt>
  <dd  id="acct_fullname"></dd>
 <dt id="acct_merchant_name_dt" style="padding-bottom:5px">商户名</dt>
  <dd id="acct_merchant_name"></dd>
<dt style="padding-bottom:5px">手机</dt>
  <dd id="acct_cellphone"></dd>
<dt style="padding-bottom:5px">邮箱</dt>
  <dd id="acct_email" ></dd>
<dt style="padding-bottom:5px">所属区域</dt>
  <dd id="acct_geo_location" ></dd>
</dl>
<div style="margin-top:0px">
<div style="display:inline;margin-left:25px;margin-right:10px;font-weight:bold">分组标签</div>
  <div id="acct_tags" style="display:inline" ></div>
</div>
</div>			
		
		<div class="avatar-images col-md-2"
			style="float: left;padding-bottom: 20px">
			<img id="acct_avatar"
				src="${pageContext.request.contextPath}/resources/img/touxiang.gif"
				data-src="holder.js/200x350/sky"
				style="width:100px;height:120px;max-width: 100px; max-height: 120px;" class="img-thumbnail">
			
		</div>
		<div class="col-md-2">
		  	
			<button type="button" class="btn btn-warning btn-large"  id="btn_edit_account" style="margin-top:15px;width:100px">编 辑</button>
			<button type="button" class="btn btn-primary btn-large"  id="btn_return_acct_lst" style="margin-top: 20px;width:100px">返 回</button>
		</div>
		
		
	</div>
        </div>
       </div>
   </div>
	
	<div class="row"></div>
	<div style="height:10px;"></div>
	<div class="row-f">
		<div class="col-md-12">			 
			<div class="portlet box blue">
				<div class="portlet-title">
					<div class="caption">
						操作记录 <i class="glyphicon glyphicon-qrcode"></i>
					</div>
					<div class="tools"></div>
				</div>
				<div id="logstab" class="portlet-body">
					<table class="table table-hover">
						<thead>
							<tr>
								<th width="40%">时间</th>
								<th width="60%">操作类型</th>
							</tr>
						</thead>
						<tbody id="simple_self_opt_log">
						</tbody>
					</table>
				</div>
				<div class="panel-footer">
					<div class="row">
						<div class="col-md-6">
							<h6>
								第<span id="lb_log_pagenumber" class="label label-info">1</span> 页
							</h6>
						</div>
						<div class="col-md-6">
							<div class="col-md-offset-3" id="div_log_pagination">
								<ul class="pager" id="ul_log_pagination">
									<li><a style="cursor: pointer;" id="a_log_pagination_previous" class="pagination-btn-disable"> 前一页 </a></li>
									<li><a style="cursor: pointer;" id="a_log_pagination_next" class="pagination-btn-enable"> 后一页 </a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4"></div>
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">
				<div id="div_log_pagination" class="col-md-offset-8">
					<ul id="ul_log_pagination"></ul>
				</div>
			</div>
			<div class="col-md-1"></div>
		</div>

		<div class="col-md-4"></div>
	</div>

	<div class="row-fluid">
		<div class="col-md-12">
			<!-- BEGIN SAMPLE TABLE PORTLET-->
			<div class="portlet box yellow" style="margin-bottom: 0px">
				<div class="portlet-title">
					<div class="caption">
						直属下级帐号 <i class="glyphicon glyphicon-qrcode"></i>
					</div>
				</div>
				<div id="subaccttab" class="portlet-body">
					<table class="table table-hover">
						<thead>
							<tr>
								<th width="10%">帐号</th>
								<th width="10%">名称</th>
								<th width="8%">类型</th>
								<th width="20%">所属区域</th>
								<th width="20%">分组标签</th>
								<th width="15%">创建时间</th>
							</tr>
						</thead>
						<tbody id="subacct_lst">
							
						</tbody>
					</table>
				</div>
				<div class="panel-footer">
					<div class="row">
						<div class="col-md-6">
							<h6>
								第<span id="lb_pagenumber" class="label label-info">1</span> 页
							</h6>
						</div>
						<div class="col-md-6">
							<div class="col-md-offset-3" id="div_pagination">
								<!-- 
	                             <ul id="ul_pagination_dev"></ul>
	                             -->
								<ul class="pager" id="ul_pagination">
									<li><a style="cursor: pointer;" id="a_pagination_previous" class="pagination-btn-disable"> 前一页 </a></li>
									<li><a style="cursor: pointer;" id="a_pagination_next" class="pagination-btn-enable"> 后一页 </a></li>
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

	<div class="row-fluid">
		<div class="col-md-4"></div>
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">
				<div id="div_subacct_pagination" class="col-md-offset-8">
					<ul id="ul_subacct_pagination" class="pager"
						style="margin-top: 3px; cursor: pointer"></ul>
				</div>
			</div>
			<div class="col-md-1"></div>
		</div>

		<div class="col-md-4"></div>
	</div>
</div>

<script type="text/javascript">
	MAIN_MENU.setActiveMenuItem("id_mm_account");

	var curAccountId = null;
	var acctDetails = null;
	
	var subacctSearchUtil = null;
	var logSearchUtil = null;
	$(document).ready(function() {
		curAccountId = "${accountId}";
		
		subacctSearchUtil = new searchUtil(	generateAcctListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"subacct_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				'${pageContext.request.contextPath}/account/search_direct_sub.htm', "subaccttab");
		
		logSearchUtil = new searchUtil(	generateSimpleSelfOptLogHtml, searchLogFailCallBack, searchLogErrorCallBack, null, null,
				"simple_self_opt_log", "lb_log_pagenumber", "a_log_pagination_previous", "a_log_pagination_next",
				'${pageContext.request.contextPath}/account/account_log.htm', "logstab");

		LoadAccountData(curAccountId);

    	logSearchUtil.setSearchParemeter('accountid', curAccountId);
		logSearchUtil.setSearchParemeter('display', 'complex');
		logSearchUtil.searchWithPreload();
	
		subacctSearchUtil.setSearchParemeter('directParentId', curAccountId);
		subacctSearchUtil.setSearchParemeter('display', 'complex');
		subacctSearchUtil.searchWithPreload();
	
		$("#btn_return_acct_lst").click(function() {
			$.get(
					'${pageContext.request.contextPath}/account/account_management.htm',	
					function(data) {
					    $('#id_main_content').html(data);
			});
		});
	
		$("#btn_edit_account").click(function() {
			$.get(
					'${pageContext.request.contextPath}/account/editaccount.htm',	
					{ 'accountId': curAccountId },
					function(data) {
					    $('#id_main_content').html(data);
			});
		});
	
	});
	function postPageChange() {
		var my_posts = $("[rel=tooltip]");
	    for(i=0;i<my_posts.length;i++){
	        the_post = $(my_posts[i]);	        
	        the_post.tooltip({ placement: 'bottom'});
	        the_post.css("cursor","pointer"); 
	    }
	}
	function searchLogFailCallBack(result, message) {
	    $.pnotify({
	        title: "帐号操作日志数据加载失败",
	        type: 'error'
	    });
	}

    function searchLogErrorCallBack(result, message) {
        $.pnotify({
            title: "无法连接服务器",
            text: "加载帐号操作日志请求提交失败！",
            type: 'error'
        });
    }
	
	function searchFailCallBack(result, message) {
/* 		$.pnotify({
			title : "下属子帐号数据加载失败",
			text : message,
			type : 'error'
		}); */
	}

	function searchErrorCallBack(result, message) {
/* 		$.pnotify({
			title : "无法连接服务器",
			text : "加载下属子帐号数据请求提交失败！",
			type : 'error'
		}); */
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
								refreshAccountData(acctDetails);

							}
						} else {
							$.pnotify({
								title : "帐号数据加载失败",
								text : data.message,
								type : 'error'
							});
							return false;
						}
					},
					error : function(data) {
						$.pnotify({
							title : "无法连接服务器",
							text : "加载帐号请求提交失败！",
							type : 'error'
						});

						return false;
					}
				});
	}

	function refreshAccountData(account) {
		if (account.avatarPath != null) {
			$("#acct_avatar").attr('src', account.avatarPath);
		}
		if (account.type == ACCOUNT_TYPE.MERCHANT) {
			$("#acct_merchant_name_dt").show();
			$("#acct_merchant_name").show();
		} else {
			$("#acct_merchant_name_dt").hide();
			$("#acct_merchant_name").hide();
		}
		
		if (account.type != null && account.type.toLowerCase() != 'null') {
			for(var i = 0; i < ACCOUNT_TYPE_CONST.length; i++) {
				if (ACCOUNT_TYPE_CONST[i].en_name.toUpperCase() == account.type.toUpperCase()) {
					$("#acct_type").text(ACCOUNT_TYPE_CONST[i].cn_name);
					break;
				}
			}
		}
		if (account.username != null && account.username.toLowerCase() != 'null') {
			$("#acct_username").text(account.username);
		}
		if (account.fullname != null && account.fullname.toLowerCase() != 'null') {
			$("#acct_fullname").text(account.fullname);
		}
		if (account.merchantName != null && account.merchantName.toLowerCase() != 'null') {
			$("#acct_merchant_name").text(account.merchantName);
		}
		if (account.email != null && account.email.toLowerCase() != 'null') {
			$("#acct_email").text(account.email);
		}
		if (account.cellNumber != null && account.cellNumber.toLowerCase() != 'null') {
			$("#acct_cellphone").text(account.cellNumber);
		}
		if (account.email != null && account.email.toLowerCase() != 'null') {
			$("#acct_email").text(account.email);
		}
		if (account.geoLocation != undefined && account.geoLocation != null && account.geoLocation.toLowerCase() != 'null') {
			var geoLocation=eval("("+account.geoLocation+")"); 
			province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province + " ";
			city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city + " ";
			county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county + " ";
			address = geoLocation.address == undefined || geoLocation.address == null ? "" : geoLocation.address + " ";
			
			$("#acct_geo_location").text(province + city + county + address);
		}

		if (account != null && account.tags != null && account.tags.length > 0
				&& account.tags != 'null' && account.tags != 'empty') {

			var accounttags = account.tags;
			//var accounttagsarr = accounttags.split(' ');
			var tagsHtml="";
			for(var i = 0 ;i< accounttags.length; i++ )
			{
				tagsHtml+=" <span class='label label-info tagspan'>"+accounttags[i]+"</span>";
				
				}
			$("#acct_tags").html(tagsHtml);
			//$("#acct_tags").editable('setValue', account.tags.join(", "), true);
		}
	}

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

				acctListItemHtml += "<td>" + account_lst[i].username + "</td>";
				if (account_lst[i].type == ACCOUNT_TYPE.MERCHANT) {
					acctListItemHtml += "<td>" + account_lst[i].merchantName
							+ "</td>";
				} else {
					acctListItemHtml += "<td>" + account_lst[i].fullname
							+ "</td>";
				}
				acctListItemHtml += "<td>"
						+ generate_cn_typename(getAccountTypeCnName(account_lst[i].type)) + "</td>";
				
				var tags = "";
				var tags1 = "";
				if(account_lst[i].tags){
					tags = account_lst[i].tags.join(", ");
					tags1 = account_lst[i].tags.join(", ");
					
					if (tags.length > 15) {
						tags = tags.substring(0, 15);
					}		
				}
				
				var wholeAddress = province + city + county + address;
				var wholeAddress1 = province + city + county + address;
				if (wholeAddress.length > 15) {
					wholeAddress = wholeAddress.substring(0, 15);
				}
				acctListItemHtml += "<td>";
				acctListItemHtml += wholeAddress;
				if (wholeAddress1.length > 15){
					acctListItemHtml += 	" <a><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+wholeAddress1+"' id=''></i></a>";				
				}
				acctListItemHtml += 	"</td>";
				acctListItemHtml += "<td>";
				acctListItemHtml += tags;
				if (tags1.length > 15){
					acctListItemHtml += 	" <a><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+tags1+"' id=''></i></a>";				
				}		
				acctListItemHtml += 	"</td>";
				acctListItemHtml += "<td>" + account_lst[i].createDatetime
						+ "</td>";
				acctListItemHtml += "</tr>"
				acctListHtml += acctListItemHtml;
			}
		}

		$("#subacct_lst").html(acctListHtml);
	}

	function generateSimpleSelfOptLogHtml(records) {
		var optLogHtml = null;
		if (records.length > 0) {
			optLogHtml = "";
			
			for (var i = 0; i < records.length ; i++) {
				optLogHtml += "<tr><td>" + records[i].createDatetime + "</td><td> " + records[i].description + "</td><tr>";
			}
		}
		
		return optLogHtml;
	}
	
	
	
</script>
