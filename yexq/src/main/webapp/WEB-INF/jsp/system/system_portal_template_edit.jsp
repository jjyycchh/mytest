<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<style>
.modal-dialog {width:600px;}
</style>
<div class="clear-line"></div>
<div class="wifi-portal-body">
	<div class="portal-menu">
		<a href="${pageContext.request.contextPath}/system/system_management.htm">平台设置
		<span class="glyphicon glyphicon-circle-arrow-right"></span></a> 
		<a href="${pageContext.request.contextPath}/system/portaltemplatemanagement.htm" class="active">模板设置
		<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
		<a href="${pageContext.request.contextPath}/system/systemthirdpartaccess.htm">第三方接入<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/publishcomponent.htm">组件库<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	</div>
	<div class="portal-main">
        <div class="wifi-main-navigator" >        
            <ol class="breadcrumb">
                <li><a href="${pageContext.request.contextPath}/system/portaltemplatemanagement.htm" class="ajax-init">模板列表</a></li>
                <li class="active" id="pagetype">添加模板</li>
            </ol>                     
        </div>
        <div class="wifi-policy-site">
        	<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-body">
							<form id="tpform" class="form-horizontal" role="form">
								<div class="form-body">
									<div class="form-group">
										<label class="col-md-2 control-label">模板名称</label>
										<div class="col-md-7">
											<input id="input_templatename" name="input_templatename"
												type="text" class="form-control" placeholder="模板名称" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-2 control-label">缩略图地址</label>
										<div class="col-md-7">
											<input id="input_templateimg" name="input_templateimg" type="text" class="form-control"
												placeholder="缩略图地址" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-2 control-label">模板类型</label>
										<div  class="col-md-4">
											<select id="input_templatetype" class="form-control">
												<option value="AUTH">验证页</option>
												<option value="LOGIN">登录页</option>
												<option value="INSITE">内容页</option>									
									    	</select>
										</div>
									</div>
									<div id="authtype_div" class="form-group">
										<label class="col-md-2 control-label">认证方式</label>
										<div  class="col-md-4">
											<select id="input_authtype"  class="form-control">								
									    	</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-2 control-label">模板框架</label>
										<div class="col-md-8">
											<TEXTAREA id="input_templateframe" name="input_templateframe" type="text" class="form-control"
												placeholder="模板框架" rows="5"></TEXTAREA>
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-2 control-label">默认数据</label>
										<div class="col-md-8">
											<TEXTAREA id="input_templatedata" name="input_templatedata" type="text" class="form-control"
												placeholder="默认数据" rows="5"></TEXTAREA>
										</div>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-offset-3 col-sm-8">
										<button id="btn_save_pt" type="submit" class="btn btn-primary" >保存模板</button>
										<a id="btn_upload_portals" class="btn btn-success">
											<span class="glyphicon glyphicon-cloud-upload">重新上传模板文件</span>
										</a>
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

<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script type="text/javascript">statisJS.init();</script>
<script type="text/javascript">
var curtemplateid  = template_id;

$(document).ready(function(){

	for(var i=0; i<PORTAL_AUTH_TYPE.ALL_TYPES.length; i++){
		$("#input_authtype").append("<option value='"+PORTAL_AUTH_TYPE.ALL_TYPES[i].en_name+"'>"+PORTAL_AUTH_TYPE.ALL_TYPES[i].cn_name+"</option>");
	}
	
	$('#input_templatetype').change(function(){
		if(this.value == 'AUTH'){
			$("#authtype_div").show();
		} else {
			$("#authtype_div").hide();
		}
	});
	
	
	initialAvatarDlg();
	$("#btn_upload_portals").click(function() {
		showFileUploadDlg();
	});
	
	if(curtemplateid){
		LoadTemplateData(curtemplateid);		
		$("li#pagetype").html("编辑模板");
	}
	else{
		$("a#btn_upload_portals").hide();
	}
	
	$('#tpform').validate({
        errorClass: "error-notification",
        errorElement: "div",
        rules: {
        	input_templatename: {
                required: true,
                maxlength: 200
            },
            input_templateframe: {
                required: true
            }
        },
        messages: {
        	input_templatename: {
        		required: "请输入模板名称",
        		range: "模板名称不得超过200个字符"
            },
            input_templateframe: {
            	required: "请输入模板框架"           	 
            },
        },
        submitHandler: function (form) {       	 
        	SaveTemplateData();
        }
    });	
});

function initialAvatarDlg() {
	
	$("#input_upload_file").fileupload({
	    url: '${pageContext.request.contextPath}/system/portaltemplateupload.htm?templateid='+curtemplateid,
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
	//onUploadedCallBack(data);
	
	setTimeout ("closeFileUploadDlg();", 1000);
	if (data.result.result != 'FAIL') {
		$.pnotify({
            title: "模板上传成功",	           
            type: 'success'
        });
		LoadTemplateData(curtemplateid);
	}else {
		$.pnotify({
            title: "模板上传失败",
            text: data.result.message,
            type: 'error'
        });
	}
}
function LoadTemplateData(templateId) {
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '${pageContext.request.contextPath}/system/portaltemplate.htm',
		data : {
			'templateid' : templateId
		},
		success : function(data) {
			if (data.result != 'FAIL') {
				if (isNotEmptyString(data.template)) {
					$("#input_templatename").val(data.template.name);
					$("#input_templateimg").val(data.template.thumbnailPath);
					$("#input_templateframe").text(data.template.templateFrame);
					$("#input_templatedata").text(data.template.defaultData);
					$("#input_templatetype").val(data.template.type); 
					$("#input_authtype").val(data.template.authType);
					if(data.template.type == 'AUTH'){
						$("#authtype_div").show();
					} else {
						$("#authtype_div").hide();
					}
				}
			} else {

				return false;
			}
		},
		error : function(data) {

			return false;
		}
	});
}
function SaveTemplateData() {
	var tpname = $("#input_templatename").val();
	var tpimg = $("#input_templateimg").val();
	var tpframe = $("#input_templateframe").val();
	var tpdata = $("#input_templatedata").val();
	var tptype = $("#input_templatetype").val();
	var tpauthType = $("#input_authtype").val();
	
	if(tptype == "AUTH" && tpauthType == ""){
		$.pnotify({
            title: "认证方式为不能为空",
            text: '',
            type: 'error'
        });
		return false;
	}
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: "${pageContext.request.contextPath}/system/saveportaltemplate.htm",
        data: { 
        		"templateid": curtemplateid,
        		"name": tpname,
        		"type": tptype,
        		"authtype": tpauthType,
        		"defaultdata": tpdata,
        		"templateframe": tpframe,
        		"thumbfilename": tpimg
        	  },
        success: function (data) {
            if (data.result == 'OK') {
                $.pnotify({
                    title: "保存模板成功",
                    type: 'success'
                });
                edittemplate(data.templateId);
            } else {
                $.pnotify({
                    title: "保存模板失败",
                    text: data.message,
                    type: 'error'
                });
            }
        },
        error: function (data) {
            $.pnotify({
                title: "无法连接服务器",
                text: "模板 保存失败",
                type: 'error'
            });
        }
	});
}
</script>