<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<style>
.nav-tabs .glyphicon:not(.no-margin) { margin-right:10px; }
.tab-pane .list-group-item:first-child {border-top-right-radius: 0px;border-top-left-radius: 0px;}
.tab-pane .list-group-item:last-child {border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;}
.tab-pane .list-group .checkbox { display: inline-block;margin: 0px; }
.tab-pane .list-group input[type="checkbox"]{ margin-top: 2px; }
.tab-pane .list-group .glyphicon { margin-right:5px; }
.tab-pane .list-group .glyphicon:hover { color:#FFBC00; }
a.list-group-item.read { color: #222;background-color: #F3F3F3; }
hr { margin-top: 5px;margin-bottom: 10px; }
/* .nav-pills>li>a {padding: 5px 10px;} */
.tab-pane .list-group .well{ margin-bottom:5px;}
#tabs> .nav-tabs > li.active {
    border-top: 3px solid #F3565D;
    margin-top: 0;
    position: relative;
    
}
#tabs> .nav-tabs > li.active > a {
    border-top: medium none;
    margin-right: 0;
    border-radius: 0 !important;  
    
}
#tabs > .tab-content {
    background-color: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 0;
    padding: 3px;
    border-top: 0px;
    min-height: 360px;
}
.list-group-item{
	border: 0px;
}
.panel-group > .msgpanel{
	border-radius: 0;
}
</style>
<div class="clear-line"></div>
<div class="modal-dialog">
  <div class="modal-content">
  	<div class="modal-header wp-dialog-title">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-top:-10px;">×</button>
  	</div>
	<div class="row">
		<div class="col-md-12" id="tabs">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs">
				<li id="li_in_box" class="active"><a href="#tab_in_box" data-toggle="tab"><span class="glyphicon glyphicon-inbox"> </span>收信箱</a></li>
				<li id="li_out_box"><a href="#tab_sent_box" data-toggle="tab"><span class="glyphicon glyphicon-user"></span>已发消息</a></li>
				<li id="li_new_msg"><a href="#tab_new_message" data-toggle="tab"><span class="glyphicon glyphicon-tags"></span>发送消息</a></li>
			</ul>
			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane fade in active" id="tab_in_box">
					<div class="list-group" id="inMsglist">
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
				<div class="tab-pane fade in" id="tab_sent_box">
					<div class="list-group" id="sentMsglist">
					</div>
					
				</div>
				<div class="tab-pane fade in" id="tab_new_message">
					<div class="list-group">
						<div class="list-group-item">
							<div class="row">
								<div class="col-md-12">
									<div class="well well-sm">
										<form id="form_new_message" class="form-horizontal" role="form">
											<!-- Message title-->
											<div class="form-group">
												<label class="col-md-3 control-label" for="msg_title">消息主题</label>
												<div class="col-md-8">
													<input id="msg_title" name="msg_title" type="text" placeholder="主题" class="form-control">
												</div>
											</div>
											<!-- Message receivers -->
											<div class="form-group">
												<label class="col-md-3 control-label" for="msg_receivers">收件人</label>
												<div class="col-md-8">
													<input id="msg_receivers" name="msg_receivers" type="text" placeholder="添加收件人" class="msg-receiver-input">
												</div>
											</div>
											<div class="form-group"><!-- Message body -->
												<label class="col-md-3 control-label" for="msg_content">内容</label>
												<div class="col-md-8">
													<textarea class="form-control" id="msg_content" name="msg_content"
														placeholder="消息内容......" rows="5"></textarea>
												</div>
											</div>
											<!-- Form actions -->
											<div class="form-group">
												<div class="col-md-11 text-right">
													<button id="btn_save_msg" type="button" class="btn btn-primary">发送</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>
</div>
<div class="clear-line"></div>
<script src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script type="text/javascript">
	preload_data = [];
</script>		
		