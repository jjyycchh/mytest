var thirdApplicationSearchHandler = null;
var third_application_list = null;
thirdApplicationSearchHandler = new searchUtil(thirdApplicationListHtml, searchFailCallBack, searchErrorCallBack, null, onShowData,
				"third_application_list_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/authentication/searchthirdapplication.htm", "");
var _typeData = {dataList:[], data:{}};
var thirdApplicationMgmtApp = function() {
	var keywordsSearch = function() {	
		$("div.ChinaNet-Page-Table").show();
		thirdApplicationSearchHandler.clearResultSetpageNo();
		var keywords = thirdApplicationSearchHandler.convertKeywordsSearchable($("#keywords").val());
		thirdApplicationSearchHandler.setSearchParemeter('keywords', keywords);
		thirdApplicationSearchHandler.setSearchParemeter('startdate', $("#startdate").val());
		thirdApplicationSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
		if(onCheckLength(keywords)) {
			thirdApplicationSearchHandler.searchWithPreload();
		} else {
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	
	var onSearchThirdApplication = function(){
		$("#btn_search_third_application").click(function() {
			keywordsSearch();
		});
	}
	
	var onAddThirdApplication = function(){
		$("#btn_add_third_application").click(function() {
			addThirdApplication();
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
	var initAppTypeSelect = function(){
		$.ajax({
			url:'/authentication/getthirdapplicationtype.htm',
			type:'GET',
			dataType:'json',
			async:false,
			success:function(data){				
				if(data.result=='OK'){
					//_typeData = {dataList:[{'value':0,'text':'全部'}], data:{}};
					for(i=0;i<data.data.length;i++){
						_typeData.dataList.push({value:data.data[i].id,text:data.data[i].type});
						_typeData.data[data.data[i].id] = data.data[i].type;
					}
					//console.log(_typeData);
					//$('#appType').xiSelect({offsetSize:[0,3,0,3],data:_typeData.dataList,defaultData:{value:0,text:'全部'}});
					/*if(_initSiteID){
						$('#siteid').xiSelect({offsetSize:[0,3,0,3],data:_siteData.dataList,defaultData:{value:_initSiteID,text:_siteData.data[_initSiteID]}});
					}*/
				}
			}
		});
	}
	return {init:function(){
		thirdApplicationSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		initAppTypeSelect();
		initDatepicker();
		onSearchThirdApplication();
		onAddThirdApplication();
	}}
}();

function thirdApplicationListHtml(thirdApplicationList) {
	var thirdApplicationListHtml = "";
	third_application_list = thirdApplicationList;
	if (thirdApplicationList.length > 0) {			
		for (var i = 0; i < thirdApplicationList.length; i++) {
			var name = thirdApplicationList[i].name;
			var version = thirdApplicationList[i].version;
			var description = thirdApplicationList[i].description;
			var createDatetime = thirdApplicationList[i].createDatetime;
			var type = thirdApplicationList[i].type;
			var status = null;
			if(thirdApplicationList[i].status == "UNPUBLISHED") {
				status = "待上架";
			} else if(thirdApplicationList[i].status == "PUBLISHED") {
				status = "已上架";
			} else if(thirdApplicationList[i].status == "DELETED") {
				status = "已下架";
			}
			
			thirdApplicationListHtml += "<tr class='ChinaNet-Table-Body'>";
			
			thirdApplicationListHtml +=   "<td>" ;
			thirdApplicationListHtml +=     "<span class='Table-Data-Name' id='name_" + i + "'>" + name + "</span>";
			thirdApplicationListHtml +=   "</td>";
			
			thirdApplicationListHtml +=   "<td>" ;
			thirdApplicationListHtml +=     "<span class='Table-Data-Text' id='version_" + i + "'>" + version + "</span>";
			thirdApplicationListHtml +=   "</td>";
			
			thirdApplicationListHtml +=   "<td>" ;
			thirdApplicationListHtml +=     "<span class='Table-Data-Name' id='status_" + i + "'>" + status + "</span>";
			thirdApplicationListHtml +=   "</td>";
			
			thirdApplicationListHtml +=   "<td>" ;
			thirdApplicationListHtml +=     "<span class='Table-Data-Name' id='type_" + i + "'>" + type + "</span>";
			thirdApplicationListHtml +=   "</td>";
			
			thirdApplicationListHtml +=   "<td>" ;
			thirdApplicationListHtml +=     "<span class='Table-Data-Text' id='create_datetime_" + i + "'>" + createDatetime + "</span>";
			thirdApplicationListHtml +=   "</td>";
			
			thirdApplicationListHtml +=   "<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
			thirdApplicationListHtml +=     "<a href='javascript:;' data-id='" + i + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
			thirdApplicationListHtml +=   "</td>";
			
			thirdApplicationListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	//thirdApplicationListHtml += "</table>";	
	return thirdApplicationListHtml;
}

function loadComButton(i) {
	var jsonObj2 = {ComButton:[]};
 	var ComButton = jsonObj2.ComButton;
 	
 	jsonObj2.ComButton.push({url:'javascript:showThirdApplicationEdit(\'' + i + '\');', text:'编辑'});
 	if(third_application_list[i].status == "UNPUBLISHED" || third_application_list[i].status == "DELETED") {
 		jsonObj2.ComButton.push({url:'javascript:publishThirdApplication(\'' + i + '\');', text:'发布'});
 	} else {
 		jsonObj2.ComButton.push({url:'javascript:deleteThirdApplication(\'' + i + '\');', text:'下架'});
 	}
 	return ComButton;
}

// 生成一个新的APP Id和APP Key
function generateNewAppId() {
	$.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/authentication/generatenewappid.htm',
        success: function (data) {
        	if (data.result == 'OK') {
        		$("#div_new_app_id").text(data.app_id);
        		$("#div_new_app_key").text(data.app_key);
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError(data.message);
        }
    });
}

function generateNewAppKey() {
	$.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/authentication/generatenewappkey.htm',
        success: function (data) {
        	if (data.result == 'OK') {
        		$("#div_modify_app_key").text(data.app_key);
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError(data.message);
        }
    });
}

// 添加第三方应用的页面
function addThirdApplication() {
	var thirdApplicationHtml = "";
	
	thirdApplicationHtml += "<div class='UserInfo-Settings-Body'>";
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>应用名称</label>";
	thirdApplicationHtml += "    <div id='div_new_name' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_new_name' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>应用版本</label>";
	thirdApplicationHtml += "    <div id='div_new_version' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_new_version' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>应用分类</label>";
	thirdApplicationHtml += "    <div id='div_new_type' class='ChinaNet-Col-7 Form-Item-Select'><input type='text' id='input_new_type'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>联系电话</label>";
	thirdApplicationHtml += "    <div id='div_new_phone' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_new_phone' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>登录接口</label>";
	thirdApplicationHtml += "    <div id='div_new_url' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_new_url' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>数据接口</label>";
	thirdApplicationHtml += "    <div id='div_new_interface' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_new_interface' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>缩略图路径</label>";
	thirdApplicationHtml += "    <div id='div_new_thumb' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_new_thumb' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>应用描述</label>";
	thirdApplicationHtml += "    <div id='div_new_description' class='Form-Item-Textarea ChinaNet-Col-7'><Textarea type='text' id='input_new_description' class='Input-Control' /></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>APP ID</label>";
	thirdApplicationHtml += "    <div id='div_new_app_id' class='Form-Item-Label ChinaNet-Col-2'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>APP KEY</label>";
	thirdApplicationHtml += "    <div id='div_new_app_key' class='Form-Item-Label ChinaNet-Col-2'></div>";
	thirdApplicationHtml += "    <button id='btn_refresh_app_id' class='Form-Important'><span>重新生成</span></button>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "</div>";
	
	var d_ThirdApplication_Add = dialog({
    	 id: 'Dailogin:ThirdApplicationAdd',
        title: '添加第三方应用',
        content: thirdApplicationHtml,
        okValue: '完成',
        ok: function () { 	 
        	SubmitThirdApplication();
        	return false;
        },
        cancelValue: '取消',
        cancel: function () {},
        width:600,
        height:480,
        skin:'ChinaNet-Dialog'
    });
	$("#btn_refresh_app_id").click(function() {
		generateNewAppId();
	});
	d_ThirdApplication_Add.showModal();
	generateNewAppId();
	$('#input_new_type').xiSelect({offsetSize:[0,3,0,3],data:_typeData.dataList});
}

// 添加第三方应用
function SubmitThirdApplication() {
	var name = $("#input_new_name").val();
	var version = $("#input_new_version").val();
	var url = $("#input_new_url").val();
	var interfaceUrl = $("#input_new_interface").val();
	var description = $("#input_new_description").val();
	var appId = $("#div_new_app_id").text();
	var appKey = $("#div_new_app_key").text();
	var phone = $("#input_new_phone").val();
	var thumbPath = $("#input_new_thumb").val();
	var apptype = $("#input_new_type").val();
	if(!onCheckEmpty(name)) { 
		onAlertErrorTip('应用名称不能为空', document.getElementById('input_new_name'));
		return false;
	} else if(!onCheckMaxLength(name, 20)) {
		onAlertErrorTip('应用名称不能超过20个字符', document.getElementById('input_new_name'));
		return false;
	}
	if(!onCheckEmpty(version)) { 
		onAlertErrorTip('应用版本不能为空', document.getElementById('input_new_version'));
		return false;
	} else if(!onCheckMaxLength(version, 15)) {
		onAlertErrorTip('应用版本不能超过15个字符', document.getElementById('input_new_version'));
		return false;
	}
	if(!onCheckEmpty(apptype)) { 
		onAlertErrorTip('应用分类不能为空', document.getElementById('div_new_type'));
		return false;
	}	
	if(!onCheckEmpty(phone)) { 
		onAlertErrorTip('联系电话不能为空', document.getElementById('div_new_phone'));
		return false;
	} else if(!onCheckMaxLength(phone, 45)) {
		onAlertErrorTip('联系电话不能超过45个字符', document.getElementById('div_new_phone'));
		return false;
	} else if (isChn(phone)) {
		onAlertErrorTip('联系电话不能为中文', document.getElementById('div_new_phone'));
		return false;
	}
	if(!onCheckEmpty(url)) { 
		onAlertErrorTip('登录接口不能为空', document.getElementById('input_new_url'));
		return false;
	} else if(!onCheckMaxLength(url, 500)) {
		onAlertErrorTip('登录接口不能超过500个字符', document.getElementById('input_new_url'));
		return false;
	} else if(isChn(url)) {
		onAlertErrorTip('登录接口不能包含汉字', document.getElementById('input_new_url'));
		return false;
	}
	if(!onCheckEmpty(interfaceUrl)) { 
		onAlertErrorTip('数据接口不能为空', document.getElementById('input_new_interface'));
		return false;
	} else if(!onCheckMaxLength(interfaceUrl, 500)) {
		onAlertErrorTip('数据接口不能超过500个字符', document.getElementById('input_new_interface'));
		return false;
	} else if(isChn(interfaceUrl)) {
		onAlertErrorTip('数据接口不能包含汉字', document.getElementById('input_new_interface'));
		return false;
	}
	if(!onCheckMaxLength(thumbPath, 300)) {
		onAlertErrorTip('缩略图路径不能超过300个字符', document.getElementById('input_new_thumb'));
		return false;
	}
	if(!onCheckMaxLength(description, 1000)) {
		onAlertErrorTip('应用描述不能超过1000个字符', document.getElementById('input_new_description'));
		return false;
	}
	
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/authentication/newthirdapplication.htm',
        data: {
        	"name" : name,
        	"version" : version,
        	"url" : url,
        	"interface_url" : interfaceUrl,
        	"description" : description,
        	"phone" : phone,
        	"app_id" : appId,
        	"app_key" : appKey,
        	"thumb_path" : thumbPath,
        	"type_id" : apptype
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('添加成功！',"ok");
            	thirdApplicationSearchHandler.clearResultSetpageNo();
            	thirdApplicationSearchHandler.searchWithPreload();
            } else {                   
                onAlertError('添加失败!' + data.message);
            }
        },
        error: function (data) {
        	onAlertError('添加失败!' + data.message);
        }
    });
}

// 展示与修改第三方应用信息的页面
function showThirdApplicationEdit(i) {
	var thirdApplicationHtml = "";
	
	thirdApplicationHtml += "<div class='UserInfo-Settings-Body'>";
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>应用名称</label>";
	thirdApplicationHtml += "    <div id='div_modity_name' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_modify_name' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>应用版本</label>";
	thirdApplicationHtml += "    <div id='div_modify_version' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_modify_version' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>应用分类</label>";
	thirdApplicationHtml += "    <div id='div_modify_type' class='Form-Item-Select ChinaNet-Col-7'><input type='text' id='input_modify_type'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>联系电话</label>";
	thirdApplicationHtml += "    <div id='div_modify_phone' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_modify_phone' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>登录接口</label>";
	thirdApplicationHtml += "    <div id='div_modify_url' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_modify_url' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>数据接口</label>";
	thirdApplicationHtml += "    <div id='div_modify_interface' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_modify_interface' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>应用描述</label>";
	thirdApplicationHtml += "    <div id='div_modify_description' class='Form-Item-Textarea ChinaNet-Col-7'><Textarea type='text' id='input_modify_description' class='Input-Control' /></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>缩略图路径</label>";
	thirdApplicationHtml += "    <div id='div_modify_thumb' class='Form-Item-Input ChinaNet-Col-7'><Input type='text' id='input_modify_thumb' class='Input-Control'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>APP ID</label>";
	thirdApplicationHtml += "    <div id='div_modify_app_id' class='Form-Item-Label ChinaNet-Col-2'></div>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "  <div class='ChinaNet-Form-Sheet'>";
	thirdApplicationHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>APP KEY</label>";
	thirdApplicationHtml += "    <div id='div_modify_app_key' class='Form-Item-Label ChinaNet-Col-2'></div>";
	thirdApplicationHtml += "    <button id='btn_refresh_app_key' class='Form-Important'><span>重新生成</span></button>";
	thirdApplicationHtml += "  </div>";
	
	thirdApplicationHtml += "</div>";
	
	var d_ThirdApplication_Add = dialog({
   	 id: 'Dailogin:ThirdApplicationModify',
       title: '编辑第三方应用',
       content: thirdApplicationHtml,
       okValue: '完成',
       ok: function () {
    	   ModifyThirdApplication(i);
    	   return false;
       },
       cancelValue: '取消',
       cancel: function () {},
       width:600,
       height:480,
       skin:'ChinaNet-Dialog'
   });
	$("#btn_refresh_app_key").click(function() {
		generateNewAppKey();
	});
	d_ThirdApplication_Add.showModal();
	thirdApplicationRefresh(i);
}

// 填充现有的第三方应用的信息
function thirdApplicationRefresh(i) {
	$("#input_modify_name").val(third_application_list[i].name);
	$("#input_modify_version").val(third_application_list[i].version);
	$("#input_modify_phone").val(third_application_list[i].phone);
	$("#input_modify_url").val(third_application_list[i].url);
	$("#input_modify_interface").val(third_application_list[i].interfaceUrl);
	$("#input_modify_description").val(third_application_list[i].description);
	$("#input_modify_thumb").val(third_application_list[i].thumbPath);
	$("#div_modify_app_id").text(third_application_list[i].appId);
	$("#div_modify_app_key").text(third_application_list[i].appKey);
	var _initTypeID = isNotEmptyString(third_application_list[i].typeid)?third_application_list[i].typeid : '0';
	if(_initTypeID){
		$('#input_modify_type').xiSelect({offsetSize:[0,3,0,3],data:_typeData.dataList,defaultData:{value:_initTypeID,text:_typeData.data[_initTypeID]}});
	}
}

// 修改第三方应用的信息
function ModifyThirdApplication(i) {
	var name = $("#input_modify_name").val();
	var version = $("#input_modify_version").val();
	var phone = $("#input_modify_phone").val();
	var url = $("#input_modify_url").val();
	var interfaceUrl = $("#input_modify_interface").val();
	var description = $("#input_modify_description").val();
	var thumbPath = $("#input_modify_thumb").val();
	var appKey = $("#div_modify_app_key").text();
	//var thumbPath = null;
	var typeid = $('#input_modify_type').val();
	if(name == third_application_list[i].name && 
			version == third_application_list[i].version && 
			url == third_application_list[i].url &&
			interfaceUrl == third_application_list[i].interfaceUrl &&
			description == third_application_list[i].description &&
			appKey == third_application_list[i].appKey &&
			typeid == third_application_list[i].typeid) {
		onAlertError('您没有修改任何内容');
		return false;
	}
	if(!onCheckEmpty(name)) { 
		onAlertErrorTip('应用名称不能为空', document.getElementById('input_modify_name'));
		return false;
	} else if(!onCheckMaxLength(name, 20)) {
		onAlertErrorTip('应用名称不能超过20个字符', document.getElementById('input_modify_name'));
		return false;
	}
	if(!onCheckEmpty(version)) { 
		onAlertErrorTip('应用版本不能为空', document.getElementById('input_modify_version'));
		return false;
	} else if(!onCheckMaxLength(version, 15)) {
		onAlertErrorTip('应用版本不能超过15个字符', document.getElementById('input_modify_version'));
		return false;
	}
	if(!onCheckEmpty(phone)) { 
		onAlertErrorTip('联系电话不能为空', document.getElementById('div_modify_phone'));
		return false;
	} else if(!onCheckMaxLength(phone, 45)) {
		onAlertErrorTip('联系电话不能超过45个字符', document.getElementById('div_modify_phone'));
		return false;
	} else if (isChn(phone)) {
		onAlertErrorTip('联系电话不能为中文', document.getElementById('div_modify_phone'));
		return false;
	}
	if(!onCheckEmpty(url)) { 
		onAlertErrorTip('登录接口不能为空', document.getElementById('input_modify_url'));
		return false;
	} else if(!onCheckMaxLength(url, 500)) {
		onAlertErrorTip('登录接口不能超过500个字符', document.getElementById('input_modify_url'));
		return false;
	} else if(isChn(url)) {
		onAlertErrorTip('登录接口不能包含汉字', document.getElementById('input_modify_url'));
		return false;
	}
	if(!onCheckEmpty(interfaceUrl)) { 
		onAlertErrorTip('数据接口不能为空', document.getElementById('input_modify_interface'));
		return false;
	} else if(!onCheckMaxLength(interfaceUrl, 500)) {
		onAlertErrorTip('数据接口不能超过500个字符', document.getElementById('input_modify_interface'));
		return false;
	} else if(isChn(interfaceUrl)) {
		onAlertErrorTip('数据接口不能包含汉字', document.getElementById('input_modify_interface'));
		return false;
	}
	if(!onCheckMaxLength(thumbPath, 300)) {
		onAlertErrorTip('缩略图路径不能超过300个字符', document.getElementById('input_modify_thumb'));
		return false;
	}
	if(!onCheckMaxLength(description, 1000)) {
		onAlertErrorTip('应用描述不能超过1000个字符', document.getElementById('input_modify_description'));
		return false;
	}
	
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/authentication/modifythirdapplication.htm',
        data: {
        	"id" : third_application_list[i].id,
        	"name" : name,
        	"version" : version,
        	"url" : url,
        	"interface_url" : interfaceUrl,
        	"description" : description,
        	"app_key" : appKey,
        	"thumb_path" : thumbPath,
        	"phone" : phone,
        	"type_id" : typeid
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('修改成功！',"ok");
            	thirdApplicationSearchHandler.clearResultSetpageNo();
            	thirdApplicationSearchHandler.searchWithPreload();
            } else {                   
                onAlertError('修改失败!' + data.message);
            }
        },
        error: function (data) {
        	onAlertError('修改失败!' + data.message);
        }
    });
}


// 发布第三方应用
function publishThirdApplication(i) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/authentication/publishthirdapplication.htm',
        data: {
        	"id" : third_application_list[i].id
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('发布成功！',"ok");
            	thirdApplicationSearchHandler.clearResultSetpageNo();
            	thirdApplicationSearchHandler.searchWithPreload();
            } else {                   
                onAlertError('发布失败!' + data.message);
            }
        },
        error: function (data) {
        	onAlertError('发布失败!' + data.message);
        }
    });
}

// 下架第三方应用
function deleteThirdApplication(i) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/authentication/deletethirdapplication.htm',
        data: {
        	"id" : third_application_list[i].id
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('下架成功！',"ok");
            	thirdApplicationSearchHandler.clearResultSetpageNo();
            	thirdApplicationSearchHandler.searchWithPreload();
            } else {                   
                onAlertError('下架失败!' + data.message);
            }
        },
        error: function (data) {
        	onAlertError('下架失败!' + data.message);
        }
    });
}

function onShowData(){
	$('div.ChinaNet-Settings-Button a').each(function(x){
		var i = $(this).attr('data-id');
            $(this).attr('id', i);
            $('a#'+i).xiMenu({
            menuItem:loadComButton(i),
            skinClass:'public-Settings-MenuForXiMenu',
            activeClass:'Open',
            align:'right',
            paramAttr:['data-id']
        });
	});
}

function searchFailCallBack(data, message) {	
	onAlertError('加载设备数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载设备数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();	
	return false;
}