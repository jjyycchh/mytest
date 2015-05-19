<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setHeader("Cache-Control", "no-store");
response.setDateHeader("Expires", 0);
%>


<!-- <html>
<head>
<title id="frame_title_text"></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8">
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="-1" />
<meta http-equiv="pragma" content="no-cache" /> -->

<!-- Bootstrap -->
<link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<!--[if lte IE 6]>
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-ie6.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/ie.css" rel="stylesheet" media="screen">
<![endif]-->
<%-- <link href="${pageContext.request.contextPath}/resources/css/ionicons.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-switch.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/jquery.loadmask.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/jquery.pnotify.default.icons.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/js/jquery-file-upload/css/jquery.fileupload.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/tasks.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/uniform.default.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/plugins.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/print.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-editable.css" rel="stylesheet" media="screen">

</head> --%>




<div class="clear-line"></div>
	<div class="wifi-portal-body">
		<div class="portal-menu">
			<a
				href="${pageContext.request.contextPath}/system/system_management.htm">平台设置<span
				class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
				href="${pageContext.request.contextPath}/system/portaltemplatemanagement.htm">模板设置<span
				class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
				href="${pageContext.request.contextPath}/system/systemthirdpartaccess.htm">第三方接入<span
				class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
				href="${pageContext.request.contextPath}/system/publishcomponent.htm">组件库<span
				class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
				href="${pageContext.request.contextPath}/system/super_searchsms.htm">短信查询<span
				class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
				href="${pageContext.request.contextPath}/user/super_authen_mgmt.htm">用户认证记录<span
				class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
				href="${pageContext.request.contextPath}/system/super_exception_log.htm">异常日志导出<span 
				class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
				href="${pageContext.request.contextPath}/system/super_device_status.htm" >设备状态查询<span 
				class="glyphicon glyphicon-circle-arrow-right"></span></a> <a
				href="${pageContext.request.contextPath}/system/letsmakeitinaneasyway.htm" 
				class="active">设备导入<span class="glyphicon glyphicon-circle-arrow-right"></span>		
			</a>
		</div>
		<div class="portal-main">
			<div class="wifi-main-header">
				<div class="row col-xs-1 col-bx-1">
        			<a id="btn_show_upload_modal" class="btn btn-primary">
            			<span class="glyphicon glyphicon-list"></span> 上传
            		</a>
        		</div>
				<div class="row">
           			<table class="table" id="import_result"></table>
        		</div>
			</div>
		</div>
	</div> 
	<div id="div_resource" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header modal-header-primary">
					<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
					<h4 class="modal-title" style="font-family: 微软雅黑;" id="voteLabel">
						<span class="glyphicon glyphicon-arrow-right"></span> 文件上传
					</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<form class="form-horizontal" role="form">
								<div class="form-group">
									<label class="col-md-2" style="margin-top: 5px">选择文件</label>
									<input type="file" id="input_upload_file" name="file" class="col-md-8" style="margin-top: 5px">
									<p class="help-block" style="margin-top: 5px"></p>
								</div>
							</form>
						</div>
					</div>
					<div class="col-md-12">
						<div class="progress progress-striped active" id="div_progress">
							<div id="div_progress_bar" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
								<span id="span_progress_precent" class="sr-only">0% Complete</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script type="text/javascript">statisJS.init();</script>




<script type="text/javascript">
    $(document).ready(function() {

        initialFileUploadDlg();

		$("#btn_show_upload_modal").click(function() {
			showFileUploadDlg();
		});
    });

    function showFileUploadDlg() {
        $('#div_resource').modal({
            backdrop: 'static'
        });

        $("#input_upload_file").val("");
        $("#div_progress_bar").css("width", "0%");
        $("#div_progress").hide();

        $("#div_resource").modal("show");
    }

    function closeFileUploadDlg() {
        $("#div_resource").modal("hide");
    }

	function initialFileUploadDlg() {
		$("#input_upload_file").fileupload({
		    url: '${pageContext.request.contextPath}/system/fileuploadandvalidation.htm',
		    dataType: 'json',
		    submit: function (e, data) {
		    	var isValidFile = UPLOAD_CSVFILE_VALIDATION(data);

		    	if (isValidFile) {
			    	onPreUploadCallBack();
			        $(this).fileupload('send', data);
		    	}
		        return false;
		    },
		    done: function (e, data) {
		    	onUploadFileCallBack(data);
		    },
		    progressall: function (e, data) {
		        var progress = parseInt(data.loaded / data.total * 100, 10);
		        $("#div_progress_bar").css('width', progress + '%');
		    }
		}).prop('disabled', !$.support.fileInput)
        	.parent().addClass($.support.fileInput ? undefined : 'disabled');

		$("#resource_list_footer").hide();
	}

    function onPreUploadCallBack() {
        $("#div_progress_bar").css("width", "0%");
        $("#div_progress").show();
        $("#span_progress_precent").text("0%");
    }

	function onUploadFileCallBack(data) {
		setTimeout ("closeFileUploadDlg();", 1000);
		if (data.result.result != 'FAIL') {
            var retMessage = renderImportResult(data.result.message);

            var tbl_import_reslt = $("#import_result");
            tbl_import_reslt.children().remove();
            tbl_import_reslt.html("");

            tbl_import_reslt.html(retMessage);

			$.pnotify({
	            title: "设备文件上传成功",
	            type: 'success'
	        });
		} else {
			$.pnotify({
	            title: "设备文件上传失败",
	            text: data.result.message,
	            type: 'error'
	        });
		}
	}

    function renderImportResult(records) {
        var resultMapHtml = "";

        if (records != null && records.length > 0) {
            for (var i=0; i < records.length; i++) {
                var resultItemHtml = "";

                resultItemHtml += "<tr><td>" + records[i] + "</td></tr>";

                resultMapHtml += resultItemHtml;
            }
        }

        return resultMapHtml;
    }

    function UPLOAD_CSVFILE_VALIDATION(data) {
        var iscsvValidFile = true;
        $.each(data.files, function (index, file) {
            if (file.type != 'application/vnd.ms-excel') {
                $.pnotify({
                    title: "不支持的类型文件",
                    text: "请使用CSV文件",
                    type: 'error',
                    delay: 1500
                });
                iscsvValidFile = false;
            }
        });

        return iscsvValidFile;
    }

</script>
