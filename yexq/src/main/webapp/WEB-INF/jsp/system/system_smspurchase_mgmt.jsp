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
<div id="mypurchaseModal" class="modal fade in" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width: 480px">
		<div class="modal-content">
			<div class="modal-header modal-header-primary">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title" style="font-family: 微软雅黑;">
					<span class="glyphicon glyphicon-arrow-right">购买短信</span> 
				</h4>
			</div>
			<form id="form_purchase" class="form-horizontal">
				<div class="modal-body" style="padding-bottom: 0px">
					<!-- here is content of member info -->
					<div class="form-body">
						<div class="form-group">
							<label class="col-md-3 control-label">短信条数</label>
							<div class="col-md-4">
								<input id="input_Msg_number" name="Msg_number" type="text"
									class="form-control" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="短信条数" />
							</div>
						</div>
						<p style="margin-left: 25px">单次购买短信条数不少于100条！</p>
					</div>
				</div>
				<div class="modal-footer modal-footer-default">
					<a id="a_purchase_msg" class="btn btn-primary" role="button">购买</a>
					<a class="btn btn-default" role="button" data-dismiss="modal">关闭
					</a>
				</div>
			</form>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dalog -->
</div>
<!-- /.modal -->
<div class="wifi-portal-body">
	<div class="portal-menu">
		<a href="${pageContext.request.contextPath}/merchant/smspurchasemgmt.htm" class="active">短信消费
			<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
		<a href="${pageContext.request.contextPath}/merchant/smsmanagement.htm">短信管理
			<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
		<%-- <a href="${pageContext.request.contextPath}/account/setwechatacct.htm">公众微信号设置
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
					<a class="btn btn-primary wp-right " data-toggle="modal"
						href="javascript:void(0)" onclick="javascript:purchase_Msg();">
						<span class="glyphicon glyphicon-shopping-cart"></span> 购买短信
					</a>
				</div>
			</form>
		</div>
		<div class="clear-line"></div>
		<div style="margin-bottom: 2px" class="portlet box yellow">
			<div class="portlet-title">
				<div class="caption">
					<i class="glyphicon glyphicon-qrcode"></i>消费列表
				</div>
				<div class="tools">
				</div>
			</div>
			<div id="Msgtab" class="portlet-body">
				<table class="table table-hover">
					<thead>
						<tr>
							<th width="20%">消费类型</th>
							<th width="15%">状态</th>
							<th width="18%">金额(元)</th>
							<th width="18%">数量(条)</th>
							<th>创建时间</th>
						</tr>
					</thead>
					<tbody id="tbl_Msg_lst">
						
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
		smsMgsSearchHandler = new searchUtil(generateSMSListHtml, searchFailCallBack, searchErrorCallBack, null, null,
				"tbl_Msg_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"${pageContext.request.contextPath}/merchant/searchsmspurchase.htm", "Msgtab");
	
		smsMgsSearchHandler.searchWithPreload();
				
		$("#btn_search_component").click(function() {
			keywordsSearch();
		});  
		
		$('#a_purchase_msg').on('click', function(event) {
			$('#mypurchaseModal').modal('hide');
			event.preventDefault();
			var sms_number = $("#input_Msg_number").val();
			var regu = /^[0-9]*[1-9][0-9]*$/; 
			var re = new RegExp(regu); 
			if(!re.test(sms_number)){
				$.pnotify({
					title : "",
					text : data.message,
					type : 'error'
				}); 
				
			}
			
			if($("#input_Msg_number").val() >= 100){
				$.ajax({
					type : 'GET',
					dataType : 'json',
					url : '${pageContext.request.contextPath}/merchant/purchasesms.htm',
					data : {
						'sms_number' : $("#input_Msg_number").val()				
					},
					success : function(data) {
						if (data.result != 'FAIL') {
							if(data.projectStatus == "TEST_RUN"){
								$.pnotify({
									title : "短信下单成功",
									text : "项目试运行阶段，短信免费",
									type : 'success',
									delay : 300,
									
									after_close: function(pnotify){
										smsMgsSearchHandler.searchWithPreload();
					                }
								});
							} else {
								$.pnotify({
									title : "短信下单成功",
									text : data.message,
									type : 'success',
									delay : 200,
									
									after_close: function(pnotify){
										smsMgsSearchHandler.searchWithPreload();
					                }
								});
								
								payment(data.smsPurchaseHx.id);
							}
							
						} else {
		 						$.pnotify({
								title : "短信下单失败",
								text : data.message,
								type : 'error'
							}); 
						}
					},
					error : function() {
		 					$.pnotify({
							title : "短信下单失败",
							text : data.message,
							type : 'error'
						}); 
					}
				  });				
			}			
			else{				
				if($("#input_Msg_number").val() != null && $("#input_Msg_number").val() != ""){
					$.pnotify({
						title : "添加短信失败",
						text : "输入的数量有误，请核对后重新输入",
						type : 'error'
					}); 				
				}
			}
	   });
					
		$("#mypurchaseModal").on("hide", function() {
			 $("#a_purchase_msg").off("click");
		});
	});
	function purchase_Msg(){
		$("#mypurchaseModal").modal('show');
	}
	function keywordsSearch() {		
		smsMgsSearchHandler.setSearchParemeter('startdate',  $("#startdate_input").val());
		smsMgsSearchHandler.setSearchParemeter('enddate', $("#enddate_input").val());				
		smsMgsSearchHandler.searchWithPreload();
	}
	
	/* function postPageChange() {
		var my_posts = $("[rel=tooltip]");
	    for(i=0;i<my_posts.length;i++){
	        the_post = $(my_posts[i]);	        
	        the_post.tooltip({ placement: 'bottom'});
	        the_post.css("cursor","pointer"); 
	    }
	} */

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
				var id = SMSList[i].id ;
				var type = SMSList[i].type;
				var status =SMSList[i].status;
				var amount = SMSList[i].amount;
				var smsNumber = SMSList[i].smsNumber;
				 
				var createtime=SMSList[i].createDatetime;
				
				SMSListHtml += "<tr>"
			    SMSListHtml +=     "<td id='Msg_type_" + id + "'>" + generate_cn_type(type) + "</td>";
				SMSListHtml +=     "<td id='Msg_status_" + id + "'>" + generate_cn_status(status) + "</td>";
				SMSListHtml +=     "<td id='Msg_amount_" + id + "'>" + amount + "</td>";
				SMSListHtml +=     "<td id='Msg_smsNumber_" + id + "'>" + smsNumber + "</td>";
				SMSListHtml +=     "<td id='Msg_time_" + id + "'>" + createtime + "</td>";
				SMSListHtml += "</tr>";
			}
		}

		return SMSListHtml;
	}
	function generate_cn_type(entype){
		var cn_typenamehtml="";
		if(entype=="PURCHASE"){
			cn_typenamehtml="购买";
		}		
		else{// FREE TEST
			cn_typenamehtml="赠送";
		}
		return cn_typenamehtml;	
	}
	function generate_cn_status(enstatus){
		var cn_namehtml="";
		if(enstatus=="NEW"){
			cn_namehtml="<span class='label label-sm label-info statulb'>新建</span>";
		}
		else if(enstatus=="PROCESSING"){
			cn_namehtml="<span class='label label-sm label-warning statulb'>处理中</span>";	
		}
		else if(enstatus=="FINISHED"){
			cn_namehtml="<span class='label label-sm label-success statulb'>完成</span>";
		}		
		else{// LOCKED 
			cn_namehtml="<span class='label label-sm label-default statulb'>锁定</span>";
		}
		return cn_namehtml;	
	}
	
	/**支付宝付款
	*/
	function payment(smsPurchaseHxId){
		$.pnotify({
			title : "正在创建支付宝链接......",
			text : "",
			type : 'success'
		});
		
		var payUrl = '${pageContext.request.contextPath}/merchant/payment.htm?smsPurchaseHxId='+smsPurchaseHxId;
		//$("#mypurchaseModal").load(payUrl);
		window.open(payUrl);
	}
</script>


	

