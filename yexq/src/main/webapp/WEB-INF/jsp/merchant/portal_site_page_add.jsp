<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<style>
.modal-dialog {
    width: 820px;
}
.policy-form-dialog {
    height: 540px;
    margin: 0 auto;
    overflow: hidden;
    width: 760px;
}
.col-dx-4{
	width: 20%;
}
.portalimg{
	max-width:200px;
}
#div_portalimg_list{
	height:500px;
	overflow-y:scroll;
	overflow-x:hidden;
}

</style>
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header wp-dialog-title">
			<!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
			<h4 class="modal-title" id="myModalLabel">添加新页面</h4>
			<a href="javascript:;" class="wpd-close" data-dismiss="modal"><span
				class="glyphicon glyphicon-remove"></span></a>
		</div>
		<form class="form-horizontal" role="form" id="portalPageFormID">
			<div class="modal-body">
				<div class="policy-form-dialog">
					<div class="form-group">
						<label for="inputPassword3" class="col-sm-2 control-label">页面标题</label>
						<div class="col-xs-4 col-dx-5">
							<input type="text" id="pagetitle" name="pagetitle"
								class="form-control" placeholder="...">
						</div>
						<label for="pagetype" class="col-sm-1 control-label">类型</label>
						<div class="col-xs-3 col-dx-4">
							<input type="text" id="pagetype" name="pagetype"
								placeholder="...">
						</div>
						<!-- <label for="templateid" class="col-sm-1 control-label">模板</label>
						<div class="col-xs-3 col-dx-5">
							<input type="text" id="templateid" name="templateid"
								placeholder="...">
						</div> -->
					</div>
					<div id="div_portalimg_list">
						
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<input type="hidden" name="PortalPageID" id="PortalPageID" value="0">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn btn-primary"
					id="SetPageTemplateButton">保存页面</button>
			</div>
		</form>
	</div>
	<!-- /.modal-content -->
</div>
<!-- /.modal-dialog -->

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script type="text/javascript">$(document).ready(function(){onEditPageDialog.init();});</script>