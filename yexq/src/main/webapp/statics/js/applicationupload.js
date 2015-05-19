var platform_global = null;
var path_global = null;

var applicationuploadApp = function() {
	
	var appUploadInit = function() {
		IFileUpload.init({
			 clickSelector: "#btn_upload_app",
			 fileInputSelector: "#input_upload_file",
			 typeSupportDesc: "支持的文件类型: apk（Android）、ipa（iOS）",
			 filetype:".apk .ipa",
			 fileupload: {
				 url: "/system/appuploadvalidation.htm",
				 done: function (e, data) {
					 if(data.result && data.result.result == "OK") {
						 platform_global = data.result.platform;
						 path_global = data.result.path;
						 refreshApplicationDetails(data.result.path, data.result.platform, null);
						 setTimeout(function() {IFileUpload.close();}, 800);
					 } else {
						 onAlertError(data.result.message);
						 IFileUpload.close();
					 }
				 }
			 }
		 });
	}
    
    var onSaveApplicationUpload = function() {
    	$("#button_application_upload_submit").click(function() {
        	var applicationPlatform = $('input#application_platform').val();
        	var applicationVersion = $('input#application_version').val();
        	var path = $('input#application_path').val();
        	var applicationDescription = $('input#application_description').val();
        	
        	if(path_global == null) {
        		closeLoading();
                onAlertErrorTip('请先上传APP', $('input#application_path')[0]);
                return false;
        	}
        	if(!onCheckEmpty(applicationVersion)) {
                closeLoading();
                onAlertErrorTip('请填写版本号', $('input#application_version')[0]);
                return false;
            } else if(!onCheckMaxLength(applicationVersion, 15)) {
            	closeLoading();
                onAlertErrorTip('版本号不能超过15个字符', $('input#application_version')[0]);
                return false;
            } else if(isChn(applicationVersion)) {
            	closeLoading();
                onAlertErrorTip('版本号不能为中文', $('input#application_version')[0]);
                return false;
            }
        	if(!onCheckMaxLength(applicationDescription, 330)) {
        		closeLoading();
                onAlertErrorTip('描述不能超过330个字符', $('input#application_description')[0]);
                return false;
        	}
        	
        	$.ajax({
                url:'/system/saveapplication.htm',
                type:'POST',
                dataType:'JSON',
                data:{
                    'platform': platform_global,
                    'version' : applicationVersion,
                    'path' : path_global,
                    'description' : applicationDescription
                },
                async:false,
                success:function(data){
                    if(data.result == 'OK') {
                    	refreshApplicationDetails(data.path, null, data.uploadDatetime);
                    	$("#button_application_upload_submit").hide();
                    	$("#btn_upload_app").hide();
                    	onAlertError("保存成功！");
                    	path_global = null;
                    	platform_global = null;
                    } else {
                        closeLoading();
                        onAlertError(data.message);
                        return false;
                    }
                }
            })
            return false;
        });
    }   		


	return {init:function(){
		appUploadInit();
		onSaveApplicationUpload();
	}}
}();


var refreshApplicationDetails = function(path, platform, uploadDatetime) {
	if(path != null) {
		$('input#application_path').val(path);
	}
	if(platform != null) {
		$('input#application_platform').val(platform);
	}
	if(uploadDatetime != null) {
		$('input#application_upload_datetime').val(uploadDatetime);
	}
	$('input#application_download_count').val(0);
	$('input#application_is_published').val("未发布");
	
}