<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<style>
.wifi-portal-body{
padding-bottom:50px;
}
.tp-label-AUTH {
    background-color: #F3565D;
}
.tp-label-LOGIN{
	background-color: #89C4F4;
}
.tp-label-INSITE{
	background-color: #45B6AF;
}
.statulb{border-radius: 0 !important;font-size: 85%;}
.table > tbody > tr > td{
vertical-align: middle;
}
.modal-dialog {width:600px;}
</style>

<div class="clear-line"></div>
<div class="modal fade" id="BrowserPageModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="myLargeModalLabel-1">Mixer Board</h4>
        </div>
        <div class="modal-body">
        <img id="tbimg" src="#" class="img-responsive img-rounded center-block" alt="">
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal mixer image -->
<div class="wifi-portal-body">
	<div class="portal-menu">
		<a href="${pageContext.request.contextPath}/system/system_management.htm">平台设置<span class="glyphicon glyphicon-circle-arrow-right"></span></a> 
		<a href="${pageContext.request.contextPath}/system/portaltemplatemanagement.htm" class="active">模板设置<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/systemthirdpartaccess.htm">第三方接入<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/publishcomponent.htm">组件库<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/super_searchsms.htm">短信查询<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/user/super_authen_mgmt.htm">用户认证记录<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
		<a href="${pageContext.request.contextPath}/system/super_exception_log.htm">异常日志导出<span　class="glyphicon glyphicon-circle-arrow-right"></span></a>
	</div>
	<div class="portal-main">
		<div style="margin-bottom: 2px" class="portlet box yellow">
			<div class="portlet-title">
				<div class="caption">
					<i class="glyphicon glyphicon-qrcode"></i>模板列表
				</div>
				<div class="tools">
					<a class="ajax-init" href="${pageContext.request.contextPath}/system/portaltemplateedit.htm">
						<span class="glyphicon glyphicon-list">添加模板</span>
					</a>
					<%-- <a id="btn_upload_portal" style="cursor: pointer;">
						<span class="glyphicon glyphicon-cloud-upload">上传模板</span>
					</a> --%>
				</div>
			</div>
			<div id="templatetab" class="portlet-body">
					<table class="table table-hover">
						<thead>
							<tr>
								<th width="11%">模板ID号</th>
								<th width="30%">模板名称</th>
								<th width="10%">模板类型</th>
								<th width="15%">创建时间</th>
								<th width="16%" class="text-center">操作</th>
							</tr>
						</thead>
						<tbody id="tbl_template_lst">
							
						</tbody>
					</table>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script type="text/javascript">statisJS.init();</script>
	
<script type="text/javascript">		
//MAIN_MENU.setActiveMenuItem("id_mm_account");
var template_id = null;
$(document).ready(function() {
	 
	LoadTemplateData();
	initialAvatarDlg();
	$("#btn_upload_portal").click(function() {
		showFileUploadDlg();
	});
});

function initialAvatarDlg() {
	$("#input_upload_file").fileupload({
	    url: '${pageContext.request.contextPath}/system/portaltemplateupload.htm',
	    dataType: 'json',
	    submit: function (e, data) {
	    	var isValidFile = UPLOAD_ZIPFILE_VALIDATION(data);
	    	
	    	if (isValidFile) {
		    	onPreUploadCallBack();
		        $(this).fileupload('send', data);
	    	}
	        return false;
	    },
	    done: function (e, data) {
	    	onUploadAvatarCallBack(data);
	    },
	    progressall: function (e, data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $("#div_progress_bar").css('width', progress + '%');
	    }
	}).prop('disabled', !$.support.fileInput)
    	.parent().addClass($.support.fileInput ? undefined : 'disabled');
	
	$("#resource_list_footer").hide();
}

function onUploadAvatarCallBack(data) {
	setTimeout ("closeFileUploadDlg();", 1000);
	if (data.result.result != 'FAIL') {
		$.pnotify({
            title: "模板上传成功",	           
            type: 'success'
        });
		LoadTemplateData();
	} else {
		$.pnotify({
            title: "模板上传失败",
            text: data.result.message,
            type: 'error'
        });
	}
}
function generateTpListHtml(tpList) {
	var tempListHtml = "";
	
	if (tpList.length > 0) {
		
		for (var i = 0; i < tpList.length; i++) {
			var tempid = tpList[i].id; 
			var tempname = tpList[i].name;
			var temptype = tpList[i].type;
			var tempauthtype = tpList[i].authType;
			var tempaddtime = tpList[i].createDatetime.substring(0,10);
			var tempimg = tpList[i].thumbnailPath;
			
			tempListHtml += "<tr id='tempid_" + tempid + "'>";
			tempListHtml += "<td class='text-center'>" + tempid + "</td>";
			tempListHtml += "<td>" + tempname + "</td>";
			tempListHtml += "<td>" + gettypecn(temptype) + "</td>";
			tempListHtml += "<td>" + tempaddtime + "</td>";
			
			tempListHtml += "<td id='temp_opt_btn_" + tempid + "' class='text-center'>";
			tempListHtml += generateTemplateOptBtn(tempid,tempimg,tempname);
			tempListHtml += "</td>";
			tempListHtml += "</tr>";
			
		}
	}

	return tempListHtml;
}
function gettypecn(temptype){
	var typecn="";
	if(temptype == "AUTH"){
		typecn="<span class='label label-sm tp-label-AUTH statulb'>验证页</span>";
	}
	else if(temptype == "LOGIN"){
		typecn="<span class='label label-sm tp-label-LOGIN statulb'>登录页</span>";
	}
	else{
		typecn="<span class='label label-sm tp-label-INSITE statulb'>内容页</span>";
	}
	return typecn;
}
function generateTemplateOptBtn(tempId,tempimg,tempname){
	var tempOptBtnHtml = "";
	if (tempId != null) {
		tempOptBtnHtml += "<a id='temp_edit_" + tempId + "' class='btn btn-default btn-xs' href='javascript:edittemplate(\"" + tempId
		+ "\");' style='cursor:pointer;'>";
		tempOptBtnHtml += "<span class='glyphicon glyphicon-edit'></span>编辑";
		tempOptBtnHtml += "</a> ";
		 
		tempOptBtnHtml += "<a id='temp_prev_" + tempId + "' data-toggle='modal' href='javascript:void(0)' onclick='javascript:BrowserPage(\"" + tempimg + "\",\"" + tempname + "\")' class='btn btn-default btn-xs' style='cursor:pointer;'>";
		tempOptBtnHtml += "<span class='glyphicon glyphicon-search'></span>预览";
		tempOptBtnHtml += "</a>";
	}

	return tempOptBtnHtml;
}
function BrowserPage(tempImg,tempName){
	//alert('${pageContext.request.contextPath}'+ tempImg);
	//window.open(portalSvrHostName+'/site/page/?page_id=' + tempId);
	$("#myLargeModalLabel-1").html(tempName);
	$("#tbimg").attr("src",'${pageContext.request.contextPath}'+ tempImg); 
	$('#BrowserPageModal').modal('show');
}
function edittemplate(tempId){
	template_id = tempId;
	$.get('${pageContext.request.contextPath}/system/portaltemplateedit.htm', {},
			function(data) {
				$('#id_main_content').html(data);
			});
}

function LoadTemplateData(){
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '${pageContext.request.contextPath}/system/portaltemplate.htm',
		data : {},
		success : function(data) {
			if (data.result != 'FAIL' && data.template != null) {
				var templatehtml = generateTpListHtml(data.template);
				$("#tbl_template_lst").html(templatehtml);
			} else {

				return false;
			}
		},
		error : function(data) {

			return false;
		}
	});
}

</script>

