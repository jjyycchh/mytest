<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
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

h5 {
    font-family: "微软雅黑";
    font-weight: 300 !important;
}
</style>	
<div class="clear-line"></div>

<div id="mydelModal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a class="btn" data-dismiss="modal" style="display:block;float:right"><span class="glyphicon glyphicon-remove"></span></a>
                    <h5 class="modal-title" id="myModalLabel"> &nbsp; 删除策略</h5>
                    <hr class="modal-inner-separator">
                </div>
                <div class="modal-body">   
                	<span style="font-size: 48px;float:left;padding-right:20px;padding-left:10px;color:#428BCA" >
                		<i class="glyphicon glyphicon-info-sign"></i>
                	</span>                
                    <p style="font-weight: bold;">您确定删除该推送策略吗？</p><p>删除后将不能恢复！</p>
                </div>
                <div class="modal-footer">                   
                    <button id="delpolicy" class="btn btn-primary btn-sm">确 认</button>
                    <button class="btn btn-success  btn-sm" data-dismiss="modal">取 消</button>
                </div> 
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dalog -->
	</div><!-- /.modal -->
<!-- portal body -->
<div class="wifi-portal-body">
    <div class="portal-menu">
        <a href="${pageContext.request.contextPath}/merchant/sites.htm">站点管理<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
        <a href="${pageContext.request.contextPath}/merchant/portalpolicies.htm" class="active">推送策略<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
    </div>
    
    <div class="portal-main">
        <div class="wifi-main-header">
            <div class="col-xs-3">
                <input type="text" class="form-control" name="keywords"
						id="keywords" placeholder="输入关键字">
            </div>
            <div class="col-xs-3 col-dx-5">
                <div class="input-group date form-datetime col-md-10" data-date="" data-date-format="yyyy-mm-dd" data-link-field="startdate_input"
					data-link-format="yyyy-mm-dd">
                    <input class="form-control" size="16" type="text" value="" readonly>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                </div>
                <input type="hidden" id="startdate_input" value="" />
            </div>
            <div class="col-xs-3 col-dx-5">
                <div class="input-group date form-datetime col-md-10" data-date="" data-date-format="yyyy-mm-dd" data-link-field="enddate_input"
					data-link-format="yyyy-mm-dd">
                    <input class="form-control" size="16" type="text" value="" readonly>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                </div>
                <input type="hidden" id="enddate_input" value="" />
            </div>
            <div class="col-xs-3 col-bx-3">
                 <button id="btn_search_pp" type="button" class="btn btn-info"><span class="glyphicon glyphicon-search"></span>查询</button>
                 <a class="btn btn-primary wp-right ajax-init" href="${pageContext.request.contextPath}/merchant/addportalpolicy.htm"><span class="glyphicon glyphicon-list"></span> 增加策略</a>
            </div>
        </div>
        
        <div class="clear-line"></div>
        
        <div style="margin-bottom: 2px" class="portlet box yellow">
            <div class="portlet-title">                 
                <div class="caption">
                    <i class="glyphicon glyphicon-qrcode"></i>策略列表
                </div>
                <div class="tools"></div>
            </div>
            <div id="portaltab" class="portlet-body">
                <!-- policy item -->
		        <div class="wifi-policy-site">
		            <table class="table table-hover">
		                <thead>
			                <tr>
			                    <th width="295">标题</th>
			                    <th width="50">状态</th>
			                    <th width="150">最近更新</th>
			                    <th>操作</th>
			                </tr>
		                </thead>
		                <tbody id="pp_list_tbr" class="pp-list">
		                    <%-- <tr>
		                        <td><a href="${pageContext.request.contextPath}/merchant/editportalpolicy.htm?policyid=23" class="ajax-init">2014春季推送策略</a></td>
		                        <td>正常</td>
		                        <td>04/23/2014 23:02:32</td>
		                        <td class="wp-operas">
		                            <a href="${pageContext.request.contextPath}/merchant/editportalpolicy.htm?policyid=23" class="ajax-init"><span class="glyphicon glyphicon-list"></span> 编辑</a>
		                            <a href="${pageContext.request.contextPath}/merchant/policyblock.htm?policyid=23&type=lock" class="ajax-data"><span class="glyphicon glyphicon-lock"></span> 上锁</a>
		                            <a href="${pageContext.request.contextPath}/merchant/policydelete.htm?policyid=23&type=delete" class="ajax-data"><span class="glyphicon glyphicon-trash"></span> 删除</a>
		                        </td>
		                    </tr> --%>
		                </tbody>
		            </table>
		        </div>
		        <!-- ./policy -->
            </div>
            <div class="panel-footer">
                <div class="row">
                     <div class="col-md-6">
                         <h6>
                             第 <span id="lb_pagenumber" class="label label-info">1</span> 页
                         </h6> 
                     </div>
                     <div class="col-md-6">
                         <div class="col-md-offset-3" id="div_pagination">
                             <!-- 
                             <ul id="ul_pagination_dev"></ul>
                             -->
                             <ul class="pager" id="ul_pagination">
                               <li><a style="cursor:pointer;" id="a_pagination_previous" class="pagination-btn-disable"> 前一页 </a></li>
                               <li><a style="cursor:pointer;" id="a_pagination_next" class="pagination-btn-enable"> 后一页 </a></li>
                             </ul>
                         </div> 
                     </div>
                 </div>
            </div>
        </div>
    </div>
</div>
<!--  ./portal -->

<div class="clear-line"></div>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/portal.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.dragdiv.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.tablednd.js"></script>
<script type="text/javascript">portalJS.init();</script>
<script type="text/javascript">
	MAIN_MENU.setActiveMenuItem("id_mm_portal");

	var policySearchHandler = null;

	var search_pp_keyword = null;
	var policy_id = null;
	$(document).ready(function() {
		policySearchHandler = new searchUtil(generatePortalListHtml, searchFailCallBack, searchErrorCallBack, null, postPageChange,
				"pp_list_tbr", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				'${pageContext.request.contextPath}/merchant/searchportalpolicies.htm', "portaltab");
		
		policySearchHandler.searchWithPreload();
		$("#btn_search_pp").click(function() {
			var keywords = policySearchHandler.convertKeywordsSearchable($("#keywords").val());
			policySearchHandler.setSearchParemeter('keywords', keywords);
			policySearchHandler.setSearchParemeter('startdate', $("#startdate_input").val());
			policySearchHandler.setSearchParemeter('enddate', $("#enddate_input").val());

			policySearchHandler.searchWithPreload();
		});
		$("#delpolicy").click(function(){
			$('#mydelModal').modal('hide');
			//event.preventDefault();
			DelPPMethod(policy_id);			
		});
	});
	
	function searchFailCallBack(result, message) {
/* 		$.pnotify({
			title : "推送策略数据加载失败",
			text : message,
			type : 'error'
		}); */
	}
	function searchErrorCallBack(result, message) {
/* 	    $.pnotify({
			title : "无法连接服务器",
			text : "加载推送策略数据请求提交失败！",
			type : 'error'
		}); */
	}
	function generatePortalListHtml(ppList) {
		var ppListHtml = "";
		  
		if (typeof ppList!='undefined'&&ppList!=null&&ppList.length>0) {
			for ( var i = 0; i < ppList.length; i++) {
				var policyid = ppList[i].policyid; 
				var merchantname = ppList[i].name;
				var location = ppList[i].location;
				var updatetime = '';
				//var type = 'LOCKED';
				var status  = ppList[i].status;
				updatetime  = ppList[i].updatetime == undefined || ppList[i].updatetime == null ? "":ppList[i].updatetime.replace('T', ' ');	
            	ppListHtml += "<tr>";
            	if(status == "LOCKED"){
            		ppListHtml += "<td><a>" + merchantname + "</a></td>";
            	}
            	else{
            	ppListHtml += "<td><a>" + merchantname + "</a></td>";
            	}
            	ppListHtml += "<td id='status_" + policyid + "'>" + statusPPSpan(status) + "</td>";
            	ppListHtml += "<td>" + updatetime + "</td>";
            	ppListHtml += "<td class='wp-operas' id='pp_opt_btn_" + policyid + "'>" + generatePPOptBtn(policyid,status) + "</td>";
				ppListHtml += "</tr>";
				
			}
		}
		return ppListHtml;
	}
	function statusPPSpan(status)
	{
		var statusHtml="";
		if(status != null){
			if (status == "LOCKED") {
				statusHtml += "<span class='label label-sm label-warning'>锁定</span>";
			}
			
			else{
				statusHtml += "<span class='label label-sm label-info'>正常</span>";
			}
		}
		return statusHtml;
	}
	function postPageChange() {
		var my_posts = $("[rel=tooltip]");
	    for(i=0;i<my_posts.length;i++){
	        the_post = $(my_posts[i]);	        
	        the_post.tooltip({ placement: 'bottom'});
	        the_post.css("cursor","pointer"); 
	    }
	}
	function generatePPOptBtn(policyId, status) {
		var ppOptBtnHtml = "";
		if (policyId != null) {
             if(status=="LOCKED"){
            	 
			ppOptBtnHtml += "<a class='disabled' id='pp_edit_" + policyId +" '  rel='tooltip' title='锁定状态下无法编辑策略，请解锁之后进行操作'>";
             }
             else{
            	 ppOptBtnHtml += "<a id='pp_edit_" + policyId
					+ "' href='javascript:EditPP(\"" + policyId
					+ "\");'  style='cursor:pointer;'>"; 
             }
             
            	 
			ppOptBtnHtml += "<span class='glyphicon glyphicon-edit'></span>编辑";
			ppOptBtnHtml += "</a> ";
			ppOptBtnHtml += "<a id='pp_del_" + policyId
					+ "'  href='javascript:DelPP(\"" + policyId
					+ "\");'  style='cursor:pointer;'>";
			ppOptBtnHtml += "<span class='glyphicon glyphicon-trash'></span>删除";
			ppOptBtnHtml += "</a> ";

			if (status == "LOCKED") {
				ppOptBtnHtml += "<a id='pp_unlock_" + policyId
						+ "'  href='javascript:unlockPP(\"" + policyId
						+ "\")'  style='cursor:pointer;'>";
				ppOptBtnHtml += "<span class='glyphicon glyphicon-open'></span>解锁";
				ppOptBtnHtml += "</a>";

			} else {

				ppOptBtnHtml += "<a id='pp_lock_" + policyId
						+ "'  href='javascript:lockPP(\"" + policyId
						+ "\");'  style='cursor:pointer;'>";
				ppOptBtnHtml += "<span class='glyphicon glyphicon-lock'></span>锁定";
				ppOptBtnHtml += "</a>";
			}
		}
		return ppOptBtnHtml;
	}
	function EditPP(policyId) {
		policy_id = policyId;
		$.get('${pageContext.request.contextPath}/merchant/editportalpolicy.htm',
				{"policyId": policyId}, 
				function(data) {
					//alert(data);
					$('#id_main_content').html(data);
				});
	}
	function DelPP(policyId) {
		policy_id = policyId;
		$('#mydelModal').modal('show');
		
	}
	function DelPPMethod(policyId) {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/merchant/policydelete.htm',
			data : {
				'policyid' : policyId,
				'type' : ''
			},
			success : function(data) {

				if (data.result != 'FAIL') {
					
					//var ppOptBtnHtml = generatePPOptBtn(policyId,data.policystatus);
					//$("#status_" + policyId).html(statusPPSpan(data.policystatus));
					//$("#pp_opt_btn_" + policyId).html(ppOptBtnHtml);
					$.pnotify({
						title : "删除推送策略操作成功",
						text : "删除成功...",
						type : 'success',
						delay : 1000,
						after_close: function(pnotify){								
							policySearchHandler.refreshCurrentPage();							
		                }
						
					});
				} else {
/* 					$.pnotify({
						title : "删除推送策略操作失败",
						text : data.message,
						type : 'error'
					}); */
				}
			},
			error : function() {
/* 				$.pnotify({
					title : "删除推送策略操作失败",
					text : data.message,
					type : 'error'
				}); */
			}
		});
	}
	function lockPP(policyId) {
		updatePPStatus(policyId, "LOCK");
	}
	function unlockPP(policyId) {
		updatePPStatus(policyId, "UNLOCK");
	}
	//锁定or解
	function updatePPStatus(policyId, type) {
		
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '${pageContext.request.contextPath}/merchant/policyblock.htm',
			data : {
				'policyid' : policyId,
				'type' : type
			},
			success : function(data) {

				if (data.result != 'FAIL') {
					//alert(data.devicestatus);
					var message="";
					if(data.portalpolicystatus =="LOCKED")
						{
						 message="锁定操作成功,在锁定状态下不能进行编辑操作";
						}
					if(data.portalpolicystatus =="NORMAL")
					{
					 message="解锁操作成功，该策略状态恢复正常，可进行编辑操作";
					}
					var ppOptBtnHtml = generatePPOptBtn(policyId,
							data.portalpolicystatus);
					$("#status_" + policyId).html(statusPPSpan(data.portalpolicystatus));
					$("#pp_opt_btn_" + policyId).html(ppOptBtnHtml);
					postPageChange();
					$.pnotify({
						title : "修改策略状态操作成功",
						text:message,
						type : 'success'
					});
				} else {
/* 					$.pnotify({
						title : "修改策略状态操作失败",
						text : data.message,
						type : 'error'
					}); */
				}
			},
			error : function() {
/* 				$.pnotify({
					title : "推送策略操作失败",
					text : data.message,
					type : 'error'
				}); */
			}
		});
	}
	
	
</script>	