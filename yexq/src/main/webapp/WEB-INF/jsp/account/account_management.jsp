<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<style>
span{border-radius: 0 !important;}
.table > tbody > tr > td{
vertical-align: middle;
}
</style>
<div class="container-fluid" style="padding-top: 20px" >
	<div class="row-fluid" >
		<div class="col-md-12" >
			
				<nav class="navbar navbar-default col-md-12" role="navigation">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header" >
						<button type="button" class="navbar-toggle" data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span> 
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
					</div>

					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse col-md-12" id="bs-example-navbar-collapse-1" style="padding-left:0px;">
						<div class="col-md-1" style="padding-left:0px;">
							<ul class="nav navbar-nav">
								<li class="active"><button type="button" id="new_account"
										style="margin-right: 8px; margin-top: 8px"
										class="btn btn-info ">创建帐号</button></li>
								<!-- <li><button type="button"
										style="margin-right: 50px; margin-top: 8px"
										class="btn btn-info ">分组标签</button></li> -->
	
							</ul>
						</div>
						<div class="col-md-11" style="padding-right:0px;">
							<form id="accountSearch" class="navbar-form navbar-left" style="width:100%;"
								role="search">
								<div class="form-group col-md-11">
									<input type="text" id="keywords" class="form-control" placeholder="关键字...对用户名、邮箱、姓名、手机号码、商户名、商户描述内容进行模糊匹配">
								</div>
								<div class="col-md-1" style="padding-right:0px;">
									<button id="btn_search_account" type="button" class="btn btn-info"><span class="glyphicon glyphicon-search"></span> 查询</button>
								</div>
							</form>
						</div>
					</div>
					<!-- /.navbar-collapse -->
				</nav>
			
		</div>	
		 <div class="row-fluid">
			<div class="col-md-12">
				<div style="padding-bottom:0px">
					<!-- BEGIN SAMPLE TABLE PORTLET-->
					<div class="portlet box yellow" style="margin-bottom:2px" >
						<div class="portlet-title">							
							<div class="caption">
								<i class="glyphicon glyphicon-qrcode"></i>帐号列表
							</div>
							<div class="tools">
								
							</div>
						</div>
						<div id="accounttab" class="portlet-body">
							<table class="table table-hover">
								<thead>
									<tr>
										<th width="10%">帐号</th>
										<th width="10%">名称</th>
										<th width="5%">类型</th>
										<th width="15%">所属区域</th>
										<th width="17%">分组标签</th>
										<th width="9%">创建时间</th>
										<th width="16%" class="text-center">操    作</th>
									</tr>
								</thead>
								<tbody id="tbl_account_lst">
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
								  <li><a id="a_pagination_previous" style="cursor:pointer;"> 前一页 </a></li>
								  <li><a id="a_pagination_next" style="cursor:pointer;"> 后一页 </a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
						
					</div>
					<!-- END SAMPLE TABLE PORTLET-->
					
				</div>
				
			</div>	
			</div>			
	</div>				
</div>

<script type="text/javascript">
	MAIN_MENU.setActiveMenuItem("id_mm_account");
	
	var acctSearchHandler = null;	
	var search_acct_keyword = null;
	
	$(document).ready(function() {
		acctSearchHandler = new searchUtil(generateAcctListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_account_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"${pageContext.request.contextPath}/account/searchaccount.htm", "accounttab");
		
		$("#new_account").click(function(){
			$.get('${pageContext.request.contextPath}/account/editaccount.htm', function(data) {
				$('#id_main_content').html(data);
			});
		});
		
		acctSearchHandler.searchWithPreload();
		
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		$("#btn_search_account").click(function() {
			keywordsSearch();
		});
	});
	
	function keywordsSearch() {
			var searchableKeywords = acctSearchHandler.convertKeywordsSearchable($("#keywords").val());
			
 			acctSearchHandler.setSearchParemeter("keywords", searchableKeywords);
 			acctSearchHandler.searchWithPreload(); 
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
            title: "帐号数据加载失败",
            text: message,
            type: 'error'
        });
	}
	
	function searchErrorCallBack(result, message) {
        $.pnotify({
            title: "无法连接服务器",
            text: "加载帐号数据请求提交失败！" + message,
            type: 'error'
        });
	}

	function generateAcctListHtml(accountList) {
		var acctListHtml = "";
		
		if (accountList.length > 0) {
			
			for (var i = 0; i < accountList.length;i++) {
				var id = accountList[i].id;
				var username = accountList[i].username;
				var fullname = accountList[i].fullname;
				fullname = !isNotEmptyString(fullname) ? "": fullname;
				var cellphone = accountList[i].cellNumber;
				var type = accountList[i].type;
				var cn_type_name = getAccountTypeCnName(accountList[i].type);
				var status = accountList[i].status;
				var geoLocation = accountList[i].geoLocation;
				
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

				/* if (accountList[i].tags != null) {
					var tag_array = accountList[i].tags.clone();
					if (accountList[i].tags.length > 2) {
						tag_array = tag_array.slice(0, 2);
					}
					
 					var tags = tag_array.join(", ");
 					
					if (accountList[i].tags.length > 2) {
						tags += "...";
					}
				} */
				var tags = accountList[i].tags.join(", ");
				var tags1 = accountList[i].tags.join(", ");
				
				if (tags.length > 12) {
					//tags = tags.substring(0, tags.indexOf(",", 9));
					tags = tags.substring(0, 12);
				}
				
				var createDatetime = accountList[i].createDatetime;
				createDatetime = createDatetime.substring(0,10);
				acctListHtml += "<tr>";
				acctListHtml +=     "<td id='account_username_" + id + "'>" + username + "</td>";
				acctListHtml +=     "<td id='account_fullname_" + id + "'>" + fullname + "</td>";
				acctListHtml +=     "<td id='account_type_" + id + "'>" + generate_cn_typename(cn_type_name)+ "</td>";
				var wholeAddress = province + city + county + address;
				var wholeAddress1 = province + city + county + address;
				if (wholeAddress.length > 10) {
					wholeAddress = wholeAddress.substring(0, 10);
				}				
				acctListHtml += 	"<td id='account_location_" + id + "'>";				
				acctListHtml += wholeAddress;
				if (wholeAddress1.length > 10){
					acctListHtml += 	" <a><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+province + city + county + address+"' id=''></i></a>";				
				}
				acctListHtml += 	"</td>";
				acctListHtml +=     "<td id='account_tags_" + id + "'>";
				acctListHtml += tags;
				if (tags1.length > 10){
					acctListHtml += 	" <a><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+tags1+"' id=''></i></a>";				
				}
				acctListHtml += 	"</td>";
				acctListHtml +=     "<td id='account_create_date_" + id + "'>" + createDatetime + "</td>";
				acctListHtml +=     "<td id='account_opt_btn_" + id + "'>";

				acctListHtml += generateAccountOptBtn(id,status);
				
				acctListHtml +=     "</td>";
				acctListHtml += "</tr>";
			}
		}

		return acctListHtml;
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
	
	function editAccount(accountId) {
		$.get(
			'${pageContext.request.contextPath}/account/editaccount.htm',	
			{ 'accountId': accountId },
			function(data) {
				//alert(data);
			    $('#id_main_content').html(data);
		});
	}
	
	function viewAccount(accountId) {
		$.get(
			'${pageContext.request.contextPath}/account/viewaccountdetails.htm',	
			{ 'accountId': accountId },
			function(data) {
			    $('#id_main_content').html(data);
		});
	}
	
	function blockAccount(accountId) {
		updateAccountStatus(accountId, ACCOUNT_STATUS_OPT_LOCK);
	}
	
	function unblockAccount(accountId) {
		updateAccountStatus(accountId, ACCOUNT_STATUS_OPT_UNLOCK);
	}
	
	function updateAccountStatus(accountId, type) {
		$.ajax({
			type:'POST',
			dataType:'json',
			url: '${pageContext.request.contextPath}/account/accountlock.htm',
			data: {
				'accountid': accountId,
				'type': type
			},
			success: function(data) {
				if (data.result != 'FAIL' && data.accountstatus != null) {
					var accountOptBtnHtml = generateAccountOptBtn(accountId, data.accountstatus);
					$("#account_opt_btn_" + accountId).html(accountOptBtnHtml);
				}
				else {
		            $.pnotify({
		                title: "帐号锁定失败",
		                type: 'warning'
		            });
				}
			},
			error: function() {
	            $.pnotify({
	                title: "帐号锁定失败",
	                type: 'warning'
	            });
			}									
		});
	}
	
	function generate_cn_typename(cn_type_name){
		var cn_typenamehtml="";
		if(cn_type_name=="管理员")
		{
			cn_typenamehtml="<span class='label label-sm label-danger'>"+cn_type_name+"</span>";
		}
		else if(cn_type_name=="商户"){
				cn_typenamehtml="<span class='label label-sm label-success'>"+cn_type_name+"</span>";	
			}
		else{
			   cn_typenamehtml="<span class='label label-sm label-info'>"+cn_type_name+"</span>";
		}
					
		
	return cn_typenamehtml;
	
	}
	
	
	function generateAccountOptBtn(accountId, accountStatus) {
		var accountOptBtnHtml = "";
		if (accountId != null) {

			accountOptBtnHtml += 	" <a class='btn btn-default btn-xs' style='margin-right:3px' id='acct_edit_" + accountId + "' href='javascript:editAccount(" + accountId + ");'>";
			accountOptBtnHtml +=    	"<span class='glyphicon glyphicon-edit'></span>编辑";
			accountOptBtnHtml +=    "</a>";
			 
			
			if (accountStatus == ACCOUNT_STATUS_NORMAL) {
				accountOptBtnHtml += 	"<a class='btn btn-default btn-xs' style='margin-right:3px' id='acct_inactive_" + accountId + "' href='javascript:blockAccount(" + accountId + ")'>";
				accountOptBtnHtml +=    	"<span class='glyphicon glyphicon-lock'></span>锁定";
				accountOptBtnHtml +=    "</a>";
				 
				
			} else if (accountStatus == ACCOUNT_STATUS_INACTIVE) {
				accountOptBtnHtml += 	"<a class='btn btn-default btn-xs' style='margin-right:3px' id='acct_active_" + accountId + "' href='javascript:unblockAccount(" + accountId + ")'>";
				accountOptBtnHtml +=    	"<span class='glyphicon glyphicon-open'></span>解锁";
				accountOptBtnHtml +=    "</a>";
				 
			}

			
            accountOptBtnHtml += 	"<a class='btn btn-default btn-xs' id='acct_details_" + accountId + "' href='javascript:viewAccount(" + accountId + ");'>";
			accountOptBtnHtml +=    	"<span class='glyphicon glyphicon-comment'></span>详情";
			accountOptBtnHtml +=    "</a>";
			 
			

		}
		
		return accountOptBtnHtml;
	} 
</script>

