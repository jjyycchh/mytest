<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css"
	rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css"
	rel="stylesheet" media="screen">
<style>
.modal-dialog {width:380px;}

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
.tooltip.bottom .tooltip-arrow {
    border-bottom-color: #000000;
    border-width: 0 5px 5px;
    left: 50%;
    margin-left: -5px;
    top: -5px;
}
h5 {
    font-family: "微软雅黑";
    font-weight: 300 !important;
}
</style>	
<div class="clear-line"></div>
<!-- portal body -->

<div class="wifi-portal-body">
	<div id="mydelModal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a class="btn" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
                    <h5 class="modal-title" id="myModalLabel"> &nbsp;删除站点</h5>
                    <hr class="modal-inner-separator">
                </div>
                <div class="modal-body">
                	<span style="font-size: 48px;float:left;padding-right:20px;padding-left:10px;color:#428BCA" >
                		<i class="glyphicon glyphicon-info-sign"></i>
                	</span>                  
                    <p style="font-weight: bold;">您确定删除该站点吗？</p><p>站点删除后将不能恢复！</p>
                </div>
                <div class="modal-footer">                     
                    <button id="delsite" class="btn btn-primary  btn-sm">确 认</button>
                    <button class="btn btn-success  btn-sm" data-dismiss="modal">取 消</button>                 
                </div> 
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dalog -->
	</div><!-- /.modal -->
	<div class="portal-menu">
		<a href="${pageContext.request.contextPath}/merchant/sites.htm"
			class="active">站点管理<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/merchant/portalpolicies.htm">推送策略<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a>
	</div>

	<div class="portal-main">
		<div class="wifi-main-header">
			<form id="siteSearch"  class="wp-site-search" role="search">
				<div class="col-xs-3">
					<input type="text" class="form-control" name="keywords"
						id="keywords" placeholder="输入关键字">
				</div>
				<div class="col-xs-3 col-dx-5">
					<div class="input-group date form-datetime col-md-10" data-date=""
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
					<div class="input-group date form-datetime col-md-10" data-date=""
						data-date-format="yyyy-mm-dd" data-link-field="enddate_input"
					data-link-format="yyyy-mm-dd">
						<input class="form-control" name="enddate" id="enddate" size="16"
							type="text" value="" readonly> <span class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
					<input type="hidden" id="enddate_input" value="" />
				</div>
				<div class="col-xs-3 col-bx-3">
					<button id="btn_search_site"  type="button" class="btn btn-info"><span class="glyphicon glyphicon-search"></span> 查询</button>
					<a class="btn btn-primary wp-right ajax-init"
						href="${pageContext.request.contextPath}/merchant/addsite.htm"><span
						class="glyphicon glyphicon-list"></span> 添加站点</a>
				</div>
			</form>
		</div>
		
		<div class="clear-line"></div>
		<!-- site item -->
		<div style="margin-bottom: 2px" class="portlet box yellow">
			<div class="portlet-title">
				<div class="caption">
					<i class="glyphicon glyphicon-qrcode"></i>站点列表
				</div>
				<div class="tools"></div>
			</div>
			<div id="sitetab" class="portlet-body wp-no-padding">
				<!-- portal site -->
				<div class="wifi-main-site" id="tbl_site_lst">

				</div>
				<!-- ./site -->
				<div class="clear-line"></div>
			</div>
			<div class="panel-footer">
				<div class="row">
					<div class="col-md-6">
						<h6>
							第 <span id="lb_pagetotal_site" class="label label-info">1</span> 页
						</h6>
					</div>
					<div class="col-md-6">
						<div class="col-md-offset-3" id="div_pagination">
							<!-- 
                             <ul id="ul_pagination_dev"></ul>
                             -->
							<ul class="pager" id="ul_pagination">
								<li><a style="cursor: pointer;" id="a_pagination_previous"
									class="pagination-btn-disable"> 前一页 </a></li>
								<li><a style="cursor: pointer;" id="a_pagination_next"
									class="pagination-btn-enable"> 后一页 </a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--  -->

<div class="clear-line"></div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/portal.js"></script>
<script type="text/javascript">
	portalJS.init();
</script>

<script type="text/javascript">
	MAIN_MENU.setActiveMenuItem("id_mm_portal");
	var siteSearchHandler = null;
	var __ACCOUNT_LOGIN_ID = "${sessionScope.login_account_info.id}";

	var search_site_keyword = null;
	var site_id = null;
	$(document).ready(function() {
		siteSearchHandler = new searchUtil(	generateSiteListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"tbl_site_lst", "lb_pagetotal_site", "a_pagination_previous", "a_pagination_next",
				'${pageContext.request.contextPath}/merchant/searchsite.htm', "sitetab");
		
		siteSearchHandler.searchWithPreload();

		$("#btn_search_site").click(function() {
			var keywords = siteSearchHandler.convertKeywordsSearchable($("#keywords").val());
			siteSearchHandler.setSearchParemeter('keywords', keywords);
			siteSearchHandler.setSearchParemeter('startdate',  $("#startdate_input").val());
			siteSearchHandler.setSearchParemeter('endDate', $("#enddate_input").val());

			siteSearchHandler.searchWithPreload();
		});
		
			$('#delsite').on('click', function(event) {
				$('#mydelModal').modal('hide');
				event.preventDefault();
				//alert(site_id);
				$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '${pageContext.request.contextPath}/merchant/sitedelete.htm',
				data : {
					'siteid' : site_id				
				},
				success : function(data) {
					if (data.result != 'FAIL') {					
						
						$.pnotify({
							title : "站点删除成功",
							text : data.message,
							type : 'success',
							delay : 50,
							
							after_close: function(pnotify){
								siteSearchHandler.searchWithPreload();
			                }
						});
					} else {
/* 						$.pnotify({
							title : "站点删除失败",
							text : data.message,
							type : 'error'
						}); */
					}
				},
				error : function() {
/* 					$.pnotify({
						title : "站点删除失败",
						text : data.message,
						type : 'error'
					}); */
				}
			  });
		   });
		
		$("#mydelModal").on("hide", function() {
			 $("#delsite").off("click");
		});
		
	});
	function searchFailCallBack(result, message) {

/* 		$.pnotify({
			title : "站点数据加载失败",
			text : message,
			type : 'error'
		}); */
	}
	function searchErrorCallBack(result, message) {
/* 	    $.pnotify({
			title : "无法连接服务器",
			text : "加载站点数据请求提交失败！",
			type : 'error'
		}); */
	}
	//填充 Div
	function generateSiteListHtml(siteList) {
		var siteListHtml = "";
	    
		if(siteList==null) return false;
	    
		if (siteList.length > 0) {
			for ( var i = 0; i < siteList.length; i++) {
				var siteid = siteList[i].siteid;
				var sitename = siteList[i].sitename;
				var merchantname = siteList[i].merchant_name;
				var createtime = siteList[i].createtime.replace('T', ' ');
				var type = siteList[i].status;
				var thumburl = isNotEmptyString(siteList[i].thumb_url)?siteList[i].thumb_url : "/resources/img/no-image.png";								
				siteListHtml += "<div class='site-item' id='site_opt_" + siteid + "'>";
				siteListHtml += "<img src='${pageContext.request.contextPath}" + thumburl + "'>";				
				//siteListHtml += "<div id = 'site_img_" + siteid + "'>"+isCanEdit(siteid, type,thumburl)+"</div>";
				//siteListHtml += "<a href='${pageContext.request.contextPath}/merchant/editsite.htm?siteid="+siteid+"' class='ajax-init'><img src='${pageContext.request.contextPath}" + thumburl + "'></a>";
				//siteListHtml += "<a href='javascript:;' class='st-text'>" + sitename + "</a>";
				//siteListHtml += "<a href='javascript:;' class='st-text'>" + merchantname + "</a>";
				if(sitename.length>10){
					siteListHtml += "<span  class='st-text'>" +sitename.substring(0,9) +"&nbsp;<i class='glyphicon glyphicon-comment' style='color:#0D638F' rel='tooltip' title='"+sitename+"' ></i></span>";
					}
				else{
				siteListHtml += "<span class='st-text'>" +sitename + "</span>";					
				}
				if(merchantname.length>10){
					siteListHtml += "<span class='st-text'>" +merchantname.substring(0,9)+"&nbsp;<i class='glyphicon glyphicon-comment'  style='color:#0D638F' rel='tooltip' title='"+merchantname+"' ></i></span>";
					}
				else{
				siteListHtml += "<span class='st-text'>" +merchantname + "</span>";					
				}
				siteListHtml += "<span class='st-text'>" + createtime + "</span>";
				siteListHtml += "<div style='text-align: right;padding-right:5px' id = 'site_opt_btn_" + siteid + "'>"+generateSiteOptBtn(siteid, type)+"</div>";
				siteListHtml += "</div>";

			}
		}

		return siteListHtml;
	}
	function isCanEdit(siteId,Type,thumburl)
	{
		var siteeditHtml = "";
		 
		if (siteId != null) {
			
			if (Type == "LOCKED") {
				 
				siteeditHtml += "<a href='javascript:void(0);'><img src='${pageContext.request.contextPath}" + thumburl + "'></a>";
			} else {
				siteeditHtml += "<a href='${pageContext.request.contextPath}/merchant/editsite.htm?siteid="+siteId+"' class='ajax-init'><img src='${pageContext.request.contextPath}" + thumburl + "'></a>";
			}		
		}
		return siteeditHtml;
	}
	function postPageChange() {
		var my_posts = $("[rel=tooltip]");
	    for(i=0;i<my_posts.length;i++){
	        the_post = $(my_posts[i]);	        
	        the_post.tooltip({ placement: 'bottom'});
	        the_post.css("cursor","pointer"); 
	    }
	}
	function generateSiteOptBtn(siteId,Type)
	{
		var siteOptBtnHtml = "";
		//return "";
		if (siteId != null) {
			
			if (Type == "LOCKED") {
				siteOptBtnHtml += "<a id='site_unlock_" + siteId
						+ "'  href='javascript:unlockSite(\"" + siteId + "\")' class='' style='cursor:pointer;' >";
				siteOptBtnHtml += "<i class='glyphicon glyphicon-open' rel='tooltip' title='解锁站点,站点解锁后可以编辑'></i>";
				siteOptBtnHtml += "</a>&nbsp;&nbsp;";

			} else {
				siteOptBtnHtml += "<a id='site_edit_" + siteId
				+ "'  href='${pageContext.request.contextPath}/merchant/editsite.htm?siteid="+siteId+"' class='ajax-init' style='cursor:pointer;'>";
				siteOptBtnHtml += "<span class='glyphicon glyphicon-edit' rel='tooltip' title='编辑站点'></span>";
				siteOptBtnHtml += "</a>&nbsp;&nbsp;";						
				siteOptBtnHtml += "<a id='site_lock_" + siteId
						+ "'  href='javascript:lockSite(\"" + siteId + "\")' class='' style='cursor:pointer;'>";
				siteOptBtnHtml += "<span class='glyphicon glyphicon-lock' rel='tooltip' title='锁定站点,站点锁定后将不能编辑'></span>";
				siteOptBtnHtml += "</a>&nbsp;&nbsp;";

			}
			siteOptBtnHtml += "<a id='site_del_" + siteId
					    + "'  data-toggle='modal' href='javascript:void(0)' onclick='javascript:delSite(\"" + siteId + "\")'  style='cursor:pointer;'>";
			siteOptBtnHtml += "<span class='glyphicon glyphicon-trash' rel='tooltip' title='删除站点'></span>";
			siteOptBtnHtml += "</a>";
			
		}
		return siteOptBtnHtml;
	}
	function editSite(siteID) {
		site_id = siteID;
		$.get('${pageContext.request.contextPath}/merchant/editsite.htm',
				{}, function(data) {
					//alert(data);
					$('#id_main_content').html(data);
				});
	}
	function lockSite(siteID) {
		updateSiteStatus(siteID, "LOCK");
	}
	
	function unlockSite(siteID) {

		updateSiteStatus(siteID, "UNLOCK");
	}
	
	function delSite(siteID) {
		site_id = siteID;
		$('#mydelModal').modal('show');
		
	}
	function updateSiteStatus(siteID, type) {
		var cntype="解锁";
		var cnmsg="";
		if(type == "LOCK"){
			cntype="锁定";
			cnmsg="该站点不能编辑!";
		}
			
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/merchant/sitelock.htm',
			data : {
				'siteid' : siteID,
				'type' : type
			},
			success : function(data) {
				if (data.result != 'FAIL') {				
					var siteOptBtnHtml = generateSiteOptBtn(siteID,data.sitestatus);
					$("#site_opt_btn_" + siteID).html(siteOptBtnHtml);
					postPageChange();
					$.pnotify({
						title : "站点["+cntype+"]操作成功",
						text : cnmsg,
						type : 'success'
					});
				} else {
/* 					$.pnotify({
						title : "站点["+cntype+"]操作失败",
						text : data.message,
						type : 'error'
					}); */
				}
			},
			error : function() {
/* 				$.pnotify({
					title : "站点["+cntype+"]操作失败",
					text : data.message,
					type : 'error'
				}); */
			}
		});
	}
</script>	
