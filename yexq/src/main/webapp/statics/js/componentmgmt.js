var componentSearchHandler = null;
	componentSearchHandler = new searchUtil(generatecomponentListHtml, searchFailCallBack, searchErrorCallBack, null, onShowComData,
			"componentlist_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
			"/system/searchpackage.htm", "");
	
var componentmgmtApp = function(){
	
	var keywordsSearch = function() {
		$("div.ChinaNet-Page-Table").show();
		componentSearchHandler.clearResultSetpageNo();
		var keywords = componentSearchHandler.convertKeywordsSearchable($("#keywords").val());
		componentSearchHandler.setSearchParemeter('keywords', keywords);
		componentSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		componentSearchHandler.setSearchParemeter('endDate', addoneday($("#enddate").val()));
		//componentSearchHandler.searchWithPreload();
		if(onCheckLength(keywords)){
			componentSearchHandler.searchWithPreload();
		}
		else{
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	var onsearchCom = function(){
		$("#btn_search_com").click(function() {
			keywordsSearch();
		});
	}	
	var initDatepicker = function(){
		var startDateTextBox = $('#startdate');
		var endDateTextBox = $('#enddate');
		startDateTextBox.datepicker({
        	regional:"zh-CN",
			dateFormat: "yy-mm-dd",
			onClose: function(dateText, inst) {
				if (endDateTextBox.val() != '') {
					var testStartDate = startDateTextBox.datetimepicker('getDate');
					var testEndDate = endDateTextBox.datetimepicker('getDate');
					if (testStartDate > testEndDate)
						endDateTextBox.datetimepicker('setDate', testStartDate);
				}
				else {
					endDateTextBox.val(dateText);
				}
			},
			onSelect: function (selectedDateTime){
				endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate') );
			}
        });
		
		endDateTextBox.datepicker({
        	regional:"zh-CN",
			dateFormat: "yy-mm-dd",
			onClose: function(dateText, inst) {
				if (startDateTextBox.val() != '') {
					var testStartDate = startDateTextBox.datetimepicker('getDate');
					var testEndDate = endDateTextBox.datetimepicker('getDate');
					if (testStartDate > testEndDate)
						startDateTextBox.datetimepicker('setDate', testEndDate);
				}
				else {
					startDateTextBox.val(dateText);
				}
			},
			onSelect: function (selectedDateTime){
				startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate') );
			}
        });
		$("div.ui-datepicker").hide();
	}  
	var fileUploadInit = function(){
		IFileUpload.init({
			 clickSelector: "#btn_upload_component",//出发上传窗口打开的selector
			 fileInputSelector: "#input_upload_file",//input type=file 的文件选择器
			 //imgSelector: "#acct_avatar",//图片上传成功后，替换src的路径图片选择器
			 typeSupportDesc: "支持的文件类型: zip",
			 filetype:".zip",
			 fileupload: {
				 url: "/system/uploadcomponentpkg.htm"
			 }
		 });
		
    }
	
	return {init:function(){
		componentSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		fileUploadInit();
		initDatepicker();
		onsearchCom();
		//initialAvatarDlg();
	}}
}();

var isBSIE = false;
var isIE8 = false;
var isIE9 = false;
isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
if(isIE8 || isIE9){ 
	isBSIE = true;
}
function UPLOAD_ZIPFILE_VALIDATION(data) {
	var iszipValidFile = true;
	if(isBSIE){
		$.each(data.files, function (index, file) {
			var filePath =file.name;
			var fileType;
			if(filePath != '' && filePath != null && filePath != "undefined"){
				 fileType =filePath.substring(filePath.lastIndexOf("."),filePath.length).toLowerCase();
			}			
			if(fileType!= '.zip'){
				$.pnotify({
		            title: "不支持的类型文件",
		            text: "请使用Zip文件",
		            type: 'error',
		            delay: 1500
		        });
				iszipValidFile = false;
			}
		});
	}
	else{
		$.each(data.files, function (index, file) {
			
			if (file.type != 'application/zip') {
		        $.pnotify({
		            title: "不支持的类型文件",
		            text: "请使用ZIP文件",
		            type: 'error',
		            delay: 1500
		        });
		        iszipValidFile = false;
			}
		});	
	}
	return iszipValidFile;
}
function onShowComData(){
	$('div.ChinaNet-Settings-Button a').each(function(x){
		var id = $(this).attr('data-public-params');
        var status = $(this).attr('data-status');   
        var ispub = $(this).attr('data-ispub'); 
            $(this).attr('id', id);
            $('a#'+id).xiMenu({
            menuItem:loadComButton(id,status,ispub),
            skinClass:'public-Settings-MenuForXiMenu',
            activeClass:'Open',
            align:'right',
            paramAttr:['data-status','data-public-params','data-ispub']
        });
	});
}
function loadComButton(componentId,componentStatus,ispublished){
	var jsonObj2={ComButton:[]};
 	var ComButton=jsonObj2.ComButton;
 	if(componentStatus == "LOCKED"){
 		jsonObj2.ComButton.push({url:'javascript:unlockCompent(\'' + componentId + '\');',text:'解锁'});
 	}else{
 		jsonObj2.ComButton.push({url:'javascript:lockCompent(\'' + componentId + '\');',text:'锁定'});
 	}
 	
 	if(ispublished=='false'){ 		
 		jsonObj2.ComButton.push({url:'javascript:PubCom(\'' + componentId + '\');',text:'发布'});
 		jsonObj2.ComButton.push({url:'javascript:DelCom(\'' + componentId + '\');',text:'删除'});
 	}
 	return ComButton;
}
function lockCompent(pkg_id) {		 
	$.ajax({
		type:'GET',
		dataType:'json',
		url: '/system/packagelock.htm',
		data: {
			'pkg_id': pkg_id
		},
		success: function(data) {
			if (data.result != 'FAIL' && data.status != null) {
				onAlertError("组件锁定成功!","ok");	
				componentSearchHandler.refreshCurrentPage();
			}
			else {
				onAlertError(data.message);
			}
		},
		error: function() {
			onAlertError("组件锁定失败!");
		}									
	});
}

function unlockCompent(pkg_id) {		
	$.ajax({
		type:'GET',
		dataType:'json',
		url: '/system/packageunlock.htm',
		data: {
			'pkg_id': pkg_id
		},
		success: function(data) {
			if (data.result != 'FAIL') {
				onAlertError("组件解锁成功!","ok");	
				componentSearchHandler.refreshCurrentPage();
			}
			else {
				onAlertError("组件解锁失败!");	
			}
		},
		error: function() {
			onAlertError("组件解锁失败!");	
		}									
	});

}
function PubCom(id){
	$.ajax({
		type:'GET',
		dataType:'json',
		url: '/system/packagepublish.htm',
		data: {
			'pkg_id': id
		},
		success: function(data) {
			if (data.result != 'FAIL') {
				//var compentOptBtnHtml = generateComponentOptBtn(pkg_id, status ,true);
				//$("#component_opt_btn_" + pkg_id).html(compentOptBtnHtml);
				//$("#component_status_" + pkg_id).html(statuspubSpan(status,true));
				
				onAlertError("组件发布成功!","ok");
				componentSearchHandler.refreshCurrentPage();
			}
			else {
	            onAlertError("组件发布失败!");
	            return false;
			}
		},
		error: function() {
			onAlertError("组件发布失败!");
			return false;
		}									
	});
}
function DelCom(id){
	onConfirmDialog('<p>您确定删除该组件吗？</p><p>删除后将不能恢复！</p>',function(){DelComOk(id)},function(){});	
}
function DelComOk(comid){
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/system/packagedelete.htm',
		data : {
			'pkg_id' : comid
		},
		success : function(data) {
			if (data.result != 'FAIL') {
				componentSearchHandler.refreshCurrentPage();
			} else {
				onAlertError("组件删除失败!");
			}
		},
		error : function() {
			onAlertError("组件删除失败!");
		}
	});
}
function generatecomponentListHtml(componentList) {
	var componentListHtml = "";				
	if (componentList.length > 0) {			
		for (var i = 0; i < componentList.length;i++) {
			var id = componentList[i].id;
			var ref_counter=componentList[i].refCounter;
			var version = componentList[i].version;				
			var type = componentList[i].type;
			var status = componentList[i].status;
			var description=componentList[i].description;
			var device_supported=componentList[i].deviceSupported;
			var requirements=componentList[i].requirements;
			var is_mandatory=componentList[i].isMandatory;
			var is_published=componentList[i].isPublished;
			var create_datetime=componentList[i].createDatetime;				
				componentListHtml += "<tr class='ChinaNet-Table-Body'>"
				componentListHtml +=     "<td><span class='Table-Data-Name-Nobold'>" + id + "</span></td>";
				componentListHtml +=     "<td><span class='Table-Data-Name'>" + version + "</span></td>";
				componentListHtml +=     "<td id='component_type_" + id + "'><span class='Table-Data-Name'>" + generate_cn_type(type) + "</span></td>";
				componentListHtml +=     "<td><span class='Table-Data-Name-Nobold'>" + create_datetime + "</span></td>";
				componentListHtml += 	 "<td id='component_status_"+ id + "'><span class='Table-Data-Name-Nobold'>" + statuspubSpan(status,is_published) +"</span></td>";
				componentListHtml += 	 "<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
				componentListHtml += 		"<a href='javascript:;' data-public-params='"+id+"' data-status='"+status+"' data-ispub='"+is_published+"'><span><span class='Setting-Name'>设置</span><span>&nbsp;</span></span></a>";
				componentListHtml += 	 "</div></td>";
				componentListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
		}
	return componentListHtml;
}
function statuspubSpan(status,ispub){
	var statusHtml="";
	var pubstr="";
	if(status != null){
		pubstr = ispub?"|已发布":"";
		if (status == "LOCKED") {
			statusHtml += "锁定";
		}else{
			statusHtml += "正常";
		}
		statusHtml += pubstr;
	}
	return statusHtml;
}
function generate_cn_type(entype){
	var cn_typenamehtml="";
	if(entype=="FIRMWARE"){
		cn_typenamehtml="<span class='Table-Data-Status-Photo Table-Flow-Firmware'></span>";
	}
	else if(entype=="COMPONENT_PORTAL"){
			cn_typenamehtml="<span class='Table-Data-Status-Photo Table-Flow-Portal'></span>";	
	}
	else{//COMPONENT-TASK
		   cn_typenamehtml="<span class='Table-Data-Status-Photo Table-Flow-Task'></span>";
	}							
	return cn_typenamehtml;	
}
function searchFailCallBack(data, message) {
	onAlertError('加载组件数据请求提交失败！');
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载组件数据请求提交失败！');
	return false;
}