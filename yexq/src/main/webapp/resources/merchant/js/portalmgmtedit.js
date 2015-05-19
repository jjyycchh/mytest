
var _initAuthTypeID = null;
var _AuthTypeData = null;
var _initTemplateTypeID = null;
var _TemplateTypeData = null;

var portalmgmteditApp = function(){

    var LoadTemplateData = function() {
    	$.ajax({
    		type : 'GET',
    		dataType : 'json',
    		url : '/system/portaltemplate.htm',
    		data : {
    			'templateid' : __DATA_PUBLIC_KEY
    		},
    		async:false,
    		success : function(data) {
    			if (data.result != 'FAIL') {
    				if (isNotEmptyString(data.template)) {
    					$("#input_templatename").val(data.template.name);
    					$("#input_templatedescription").val(data.template.description);
    					$("#input_templateimg").val(data.template.thumbnailPath);
    					$("#input_templateframe").text(data.template.templateFrame);
    					$("#input_templatedata").text(data.template.defaultData);
    					_initAuthTypeID = data.template.authType;
    					_initTemplateTypeID = data.template.type;
    					//console.log('xxxxxxxxx');
    					if(_initAuthTypeID){
    						$('#input_authtype').xiSelect({offsetSize:[0,3,0,3],data:_AuthTypeData.dataList,defaultData:{value:_initAuthTypeID,text:_AuthTypeData.data[_initAuthTypeID]}});
    					}
    					if(_initTemplateTypeID){
    						$('#input_templatetype').xiSelect({offsetSize:[0,3,0,3],data:_TemplateTypeData.dataList,defaultData:{value:_initTemplateTypeID,text:_TemplateTypeData.data[_initTemplateTypeID]},onChange:function(){
    				    		if($("#input_templatetype").val() == 'AUTH'){
    				    			$("#authtype_div").show();
    				    		} else {
    				    			$("#authtype_div").hide();
    				    		}
    				    	}});
    					}
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

    var SaveTemplateData = function(){
    	$('#btn_save_pt').die().live('click',function(e){
    		var tpname = $("#input_templatename").val();
        	var tpimg = filterUrl($("#input_templateimg").val());
        	var tpdescription = $('#input_templatedescription').val();
        	var tpframe = $("#input_templateframe").val();
        	var tpdata = $("#input_templatedata").val();
        	var tptype = $("#input_templatetype").val();
        	var tpauthType = $("#input_authtype").val();
        	//console.log(tpname);
        	if(!isNotEmptyString(tpname)){
                onAlertErrorTip('请输入模板名称', document.getElementById('input_templatename'));
                return false;
            }
        	if(!onCheckLength(tpname)){
                onAlertErrorTip('模板名称不能超过50个字符，请重新输入', document.getElementById('input_templatename'));
                return false;
            }
        	if(isChn(tpimg)){
        		onAlertErrorTip('缩略图地址不能含有中文', document.getElementById('input_templateimg'));
                return false;
        	}
        	if(tpdescription.length > 100){
        		onAlertErrorTip('模板描述不能超过100个字符，请重新输入', document.getElementById('input_templatedescription'));
                return false;
        	}
            if(!isNotEmptyString($.trim(tpframe))){
                onAlertErrorTip('输入模板框架', document.getElementById('input_templateframe'));
                return false;
            }
        	if(!isNotEmptyString(tptype)){
        		onAlertErrorTip('请选择模板类型', document.getElementById('div_templatetype'));
                return false;
        	}
        	if(tptype == "AUTH" && tpauthType == ""){
        		onAlertErrorTip('请选择认证方式', document.getElementById('div_authtype'));
        		return false;
        	}
        	$.ajax({
                type: 'POST',
                dataType: 'json',
                url: "/system/saveportaltemplate.htm",
                data: { 
                		"templateid": __DATA_PUBLIC_KEY,
                		"name": tpname,
                		"type": tptype,
                		"authtype": tpauthType,
                		"defaultdata": tpdata,
                		"templateframe": tpframe,
                		"thumbfilename": tpimg,
                		"description": tpdescription
                	  },
                success: function (data) {
                    if (data.result == 'OK') {                    
                        onAlertError("保存模板成功","success");
                        //edittemplate(data.templateId);
                    } else {
                    	onAlertError(data.message);
                    }
                },
                error: function (data) {
                	onAlertError("保存模板失败");
                }
        	});
    		
    	});  	
    }
    var initPortalSelect = function(){
        _TemplateTypeData = {dataList:[{value:'AUTH',text:'验证页'},{value:'LOGIN',text:'登录页'},{value:'INSITE',text:'内容页'}], data:{AUTH:'验证页',LOGIN:'登录页',INSITE:'内容页'}};
        
    	_AuthTypeData = {dataList:[], data:{}};
		for(i=0;i<PORTAL_AUTH_TYPE.ALL_TYPES.length;i++){
			_AuthTypeData.dataList.push({value:PORTAL_AUTH_TYPE.ALL_TYPES[i].en_name,text:PORTAL_AUTH_TYPE.ALL_TYPES[i].cn_name});
			_AuthTypeData.data[PORTAL_AUTH_TYPE.ALL_TYPES[i].en_name] = PORTAL_AUTH_TYPE.ALL_TYPES[i].cn_name;
		}
		//console.log('2222222');
    }
    var fileUploadInit = function(){
		IFileUpload.init({
			 clickSelector: "#btn_upload_portals",//出发上传窗口打开的selector
			 fileInputSelector: "#input_upload_file",//input type=file 的文件选择器
			 typeSupportDesc: "支持的文件类型: zip",
			 filetype:".zip",
			 fileupload: {
				 url: "/system/portaltemplateupload.htm?templateid="+__DATA_PUBLIC_KEY,
				 done: function (e, data) {
					 if(data.result && data.result.result == "OK"){						 						
						 var uptime = window.setTimeout(function(){
							 IFileUpload.close();
							 clearTimeout(uptime);
			                },2000);
						 LoadTemplateData();
					 } else {
						 onAlertError(data.result.message);
						 IFileUpload.close();
					 }
				 }
			 }
		 });
		
    }
    return {init:function(){    	
    	$("#btn_upload_portals").hide();    	
    	initPortalSelect();    	
    	if(__DATA_PUBLIC_KEY != null){
    		LoadTemplateData();
    		$("#btn_upload_portals").show();
    		fileUploadInit();
    	}else{
    		$('#input_authtype').xiSelect({offsetSize:[0,3,0,3],data:_AuthTypeData.dataList});
    		$('#input_templatetype').xiSelect({offsetSize:[0,3,0,3],data:_TemplateTypeData.dataList,onChange:function(){
        		if($("#input_templatetype").val() == 'AUTH'){
        			$("#authtype_div").show();
        		} else {
        			$("#authtype_div").hide();
        		}
        	}});
    	}
    	SaveTemplateData();   	
    }}
}();