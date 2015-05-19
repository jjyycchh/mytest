<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">

<style>
.wifi-portal-body{
padding-bottom:150px;
}
</style>

<div class="clear-line"></div>
<div class="wifi-portal-body">
	<div class="portal-menu">
		<a href="${pageContext.request.contextPath}/system/system_management.htm">平台设置<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
			href="${pageContext.request.contextPath}/system/system_firmware_publish.htm"
			class="active">固件发布<span
			class="glyphicon glyphicon-circle-arrow-right"></span></a>
	</div>
	<div class="portal-main">
		<div class="col-md-12">
			<form class="form-horizontal bs-example bs-example-form" role="form">
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-3 control-label">当前版本</label>
					<div class="col-sm-8" style="padding-top: 8px">
						<span>V1.1.0</span>
					</div>
				</div>

				<div class="form-group">
					<label for="inputEmail3" class="col-sm-3 control-label">固件名称</label>
					<div class="col-sm-8" style="padding-top: 8px">
						<span>TWIFI_PROTAL_COM build140307</span>
					</div>
				</div>
				
				<div class="form-group">
					<div class="col-sm-offset-3 col-sm-7">					 
							<button type="button" class="btn btn-warning">发布新版本</button>
							<button type="button" class="btn btn-info" style="margin-left: 10px; margin-right: 10px">回滚老版本</button>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-3 col-sm-7">
						<input type="checkbox" /><span>停用老版本，强制客户端升级</span>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>


<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script type="text/javascript">statisJS.init();</script>
 	
	<script type="text/javascript">
		
		{
			//demo data section
			var username = 'test_admin';
			var full_name = '测试-管理员用户';
			var admin_lv = '管理员 L2 - 浙江省';
			var cell_phone = '13312344321';
		}

		$(document).ready(function() {

		});

	</script>

