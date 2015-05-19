/*
 * author : liuhualuo
 * 
 */
IFileUpload = (function(){
	var opts = {};
		
	var defaultOpts = {
			clickSelector: "",//出发上传窗口打开的selector
			fileInputSelector: "",//input type=file 的文件选择器
			imgSelector: "",//图片上传成功后，替换src的路径图片选择器
			headImg:"",
			typeSupportDesc: "",
			filetype:"",
			fileupload: {
			    autoUpload: true,
			    dataType: 'json',
			    submit: function (e, data) {
			    	var ValidFile = true;
					if(isNotEmptyString(opts.filetype)){
						var arr = opts.filetype;
						$.each(data.files, function (index, file) {
							var filePath =file.name;
							var fileType;
							
							if(filePath != '' && filePath != null && filePath != "undefined"){
								fileType =filePath.substring(filePath.lastIndexOf("."),filePath.length).toLowerCase();
							}	
							//console.log(arr.indexOf(fileType));
							if(arr.indexOf(fileType) < 0){
								ValidFile = false;
							}
						});
					}
								    	
			    	if (ValidFile) {
			    		onPreUploadCallBack(data);
			    		$(this).fileupload('send', data);
			    	}else{
			    		$("#upload_error_info").html('');
			    		$("#upload_error_info").html('支持的文件类型:'+opts.filetype);
			    	}
			        return false;
			    },
			    done: function (e, data) {
			    	if(data.result && data.result.result == "OK"){
			    		onUploadCallBack(data);
			    	}else{
			    		onPreUploadCallBack(data);
			    		//上传失败
			    		$("#upload_error_info").html(data.result.message);
			    	}
			    },
			    progressall: function (e, data) {
			        var progress = parseInt(data.loaded / data.total * 100, 10);
			        var progressBar = $("#div_progress_bar");
			        progressBar.attr("aria-valuenow", "progress");
			        progressBar.css('width', progress + '%');
			        $("#span_progress_precent").html(progress + "% Complete");
			    }
			},
			dialog : {
				id: 'Dailogin:Upload',
		        title: '上传文件',
//		        content: uploadHtml,
		        okValue: '确定',
		        //ok: uploadAvatarDlg,
		         /*button: [{
	                      value: '确定',
	                      callback: function(){ChangePassWord();return false;},
	                      autofocus: true
	              }],*/
		        cancelValue: '取消',
		        cancel: function () {},
		        width:520,
		        height:220,
		        skin:'ChinaNet-Dialog'
			}
	};
	var uploadDialog = {};
	
	var uploadComponent = function(options){
	    $(options.clickSelector).live('click',function(){
	       	 
	       	 uploadDialog = dialog(options.dialog || {});
		     
	       	 uploadDialog.showModal();
		     
	       	 fileUploadBind(options);
	   });
	}

	var fileUploadBind = function(options){
		$(options.fileInputSelector).fileupload(options.fileupload || {})
			.prop('disabled', !$.support.fileInput)
	    	.parent().addClass($.support.fileInput ? undefined : 'disabled');
		
	}
	
	var onPreUploadCallBack = function(data){
		var filePath = (data || {}).fileInput.val();
		filePath = filePath ? filePath.split("\\") : undefined;
		if(filePath && filePath.length > 0){
			$("#file_name_show").html(filePath[filePath.length - 1]);
		}
		$("#span_progress_precent").html("0% Complete");
		$("#div_progress_bar").css('width', '0%');
		$('#upload_error_info').html("");
	}
	
	var onUploadCallBack = function(data){
		if (data.result.result != 'FAIL' && isNotEmptyString(data.result.avatarpath)) {
			if(opts.imgSelector){
				$(opts.imgSelector).attr("src", data.result.avatarpath);
				__CONTENT_AVATAR = data.result.avatarpath;
				setTimeout (function(){uploadDialog.close().remove();}, 2000);
			}
			if(opts.headImg){
				$(opts.headImg).attr("src", data.result.avatarpath);
			}
		}else{
			$("#upload_error_info").html('上传完成');
			setTimeout (function(){uploadDialog.close().remove();}, 1000);
		}
	}
	
	var close = function(){
		uploadDialog.close().remove();
	}
	
	var ValidFileType = function(data){
		
		
		
	}
	var init = function(options){
		
		opts = $.extend(true, {}, defaultOpts, options);
		
		var uploadHtml="";
		uploadHtml += "<div class='Password-Settings-Body'>";
		uploadHtml += "   <div class='ChinaNet-Form-Sheet'>";
		uploadHtml += "       <label class='Form-Item-Title ChinaNet-Col-2'>选择文件</label>";
		uploadHtml += "   	   <div class='Form-Item-Label ChinaNet-Col-5 fileInputContainer' style='text-align:center;color:#FFFFFF;'>选择<form role='form'><input type='file' class='fileInput' id='input_upload_file' name='file'></form></div>";
		uploadHtml += "   <span id='file_name_show' style='text-align:left;padding-left:10px;width:350px;' class='Form-Item-Title ChinaNet-Col-2'></span></div>";
		uploadHtml += "   <div class='ChinaNet-Form-Sheet'>";        	 
		uploadHtml += "     <div class='progress progress-striped active' id='div_progress'>";
		uploadHtml += "   	   <div id='div_progress_bar' class='progress-bar ' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%;'>";
		uploadHtml += "   		 <span id='span_progress_precent' style='position:inherit;' class='sr-only'></span>";
		uploadHtml += "   	   </div>";
		uploadHtml += "     </div>";
		uploadHtml += "   </div>";
		uploadHtml += "   <div id='upload_error_info' style='color:red;margin-left:20px;'>" + opts.typeSupportDesc + "</div>";
		uploadHtml += "</div>";
		
		opts.dialog.content = uploadHtml;
		
		uploadComponent(opts);
	}
	
	
	return {
		init : init,
		close: close
	}
})();