var modelSearchHandler = null;
var model_list = null;
modelSearchHandler = new searchUtil(deviceBrandModelListHtml, searchFailCallBack, searchErrorCallBack, null, onShowModelData,
				"modellist_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchdevicemodel.htm", "");

var devicemodelApp = function() {
	
	var keywordsSearch = function() {		
		$("div.ChinaNet-Page-Table").show();
		modelSearchHandler.clearResultSetpageNo();
		var keywords = modelSearchHandler.convertKeywordsSearchable($("#brandSelect").val());
		modelSearchHandler.setSearchParemeter('keywords', keywords);
		modelSearchHandler.setSearchParemeter('deviceManuId', __CONTEXT_MERCHANT_KEY);
		modelSearchHandler.searchWithPreload();
	}
	
	var onsearchModel = function(){
		$("#btn_Search_Model").click(function() {
			keywordsSearch();
		});
	}
	
	var onAddModel = function() {
		$("#btn_Add_Model").click(function() {
			addModel();
		});
	}
	
	var initBrandSelect = function(){		
        $('#brandSelect').xiSelect({
            offsetSize:[0,3,0,3],
            height:320,
            width:165,
            defaultData:{value:"", text:"全部品牌"},
            ajaxData:function(){
                var brandHtml = '';
                var brandList = getBrandData();	
                brandHtml += '<a href="javascript:;" data-value="" data-text="全部品牌" class="xiSelectItem">' +
                '    <div class="Template-For-Brand-List">' +
                '        <div class="Brand-Profile-Body">' +
                '            <span class="Brand-Name">全部品牌</span>' +
                '        </div>' +
                '    </div>' +
                '</a>';
                if(brandList.length>0) {
                    for(var i=0;i<brandList.length;i++) {
                    	brandHtml += '<a href="javascript:;" data-value="'+brandList[i].brand+'" data-text="'+brandList[i].brand+'" class="xiSelectItem">' +
                            '    <div class="Template-For-Brand-List">' +
                            '        <div class="Brand-Profile-Body">' +
                            '            <span class="Brand-Name">'+brandList[i].brand+'</span>' +
                            '        </div>' +
                            '    </div>' +
                            '</a>';
                    }
                }
                return brandHtml;
            },
            
            changeClose:true
        });
        
    }
	
	return {init:function(){
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		initBrandSelect();
		onAddModel();
		onsearchModel();
		keywordsSearch();
	}}
}();

function getBrandData(){
    var brandList = {};
    $.ajax({
        url:'/system/searchbrand.htm',
        type:'GET',
        dataType:'JSON',
        data:{'deviceManuId': __CONTEXT_MERCHANT_KEY},
        async:false,
        success:function(data){
            if(data.totalResult>0){
                for(i=0;i<data.records.length;i++){
                	brandList = data.records;
                }
            }
        }
    });
    return brandList;
}

function deviceBrandModelListHtml(modelList) {
	var modelListHtml = "";
	model_list = modelList;
	if (modelList.length > 0) {			
		for (var i = 0; i < modelList.length;i++) {
			var id = modelList[i].id;
			var brand = modelList[i].brand;
			var model = modelList[i].model;
			var deviceTotal = modelList[i].deviceTotal;
			var producedDevicesTotal = modelList[i].producedDevicesTotal;
			var fullname = modelList[i].fullname;
			
			modelListHtml += "<tr class='ChinaNet-Table-Body'>";	
			modelListHtml += 	"<td id='model_brand_" + i + "'>" + brand + "</td>";
			modelListHtml +=    "<td id='model_model_" + i + "'>" + model + "</td>";
			modelListHtml +=   	"<td id='model_deviceTotal" + i + "'>" + deviceTotal + "</td>"; 
			modelListHtml +=   	"<td id='model_producedDevicesTotal_" + i + "'>" + producedDevicesTotal + "</td>";
			modelListHtml += 	"<td id='model_fullname_" + i + "'>" + fullname + "</td>";
			modelListHtml +=   	"<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
			modelListHtml +=   	"<a href='javascript:;' data-id='" + i + "' data-device='" + deviceTotal + "' " +
					"data-producedDevices='" + producedDevicesTotal + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
			modelListHtml += "</tr>";
		}
	}
	else{
		//$(".ChinaNet-Page-Table").hide();
	}
	return modelListHtml;
}

function loadComButton(i, deviceTotal, producedDevicesTotal) {
	var jsonObj2 = {ComButton:[]};
 	var ComButton = jsonObj2.ComButton;
 	
 	jsonObj2.ComButton.push({url:'javascript:modifyModel(\'' + i + '\');', text:'修改'});
 	if(deviceTotal == 0 && producedDevicesTotal == 0){ 
 	 	jsonObj2.ComButton.push({url:'javascript:deleteModel(\'' + i + '\');', text:'删除'});
 	}
 	
 	return ComButton;
}

var modifyModel = function(i) {
	var deviceModelHtml="";
	deviceModelHtml+="<div class='UserInfo-Settings-Body'>";
	deviceModelHtml+="    <div class='ChinaNet-Form-Sheet'>";
	deviceModelHtml+="        <label class='Form-Item-Title ChinaNet-Col-4'>厂商（Manu）</label>";
	deviceModelHtml+="		  <div id='id_device_manu' class='Form-Item-Label ChinaNet-Col-6'></div>";
	deviceModelHtml+="    </div>";
	deviceModelHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceModelHtml+="        <label class='Form-Item-Title ChinaNet-Col-4'>品牌（Brand）</label>";
	deviceModelHtml+="		  <div id='edit_device_brand' class='Form-Item-Input ChinaNet-Col-6'><input type='text' id='input_device_brand' class='Input-Control'></div>";
	deviceModelHtml+="    </div>";
	deviceModelHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceModelHtml+="        <label class='Form-Item-Title ChinaNet-Col-4'>型号（Model）</label>";
	deviceModelHtml+="		  <div id='edit_device_model' class='Form-Item-Input ChinaNet-Col-6'><input type='text' id='input_device_model' class='Input-Control'></div>";
	deviceModelHtml+="    </div>";
	deviceModelHtml+="</div>";
	
	var d_ModelInfo_edit = dialog({
		id: 'Dailogin:ModelInfoedit',
		title: '修改设备品牌型号',
        content: deviceModelHtml,
        okValue: '完成修改',
        ok: function () {
         	SubmitDeviceModel(i);
         	return false;
         },
         
         cancelValue: '取消',
         cancel: function () {},
         width:400,
         height:240,
         skin:'ChinaNet-Dialog'
     });
	
	d_ModelInfo_edit.showModal();
	refreshModelInfo(i);
}

function refreshModelInfo(i) {
	$("#id_device_manu").text(model_list[i].fullname);
	$("#input_device_brand").val(model_list[i].brand);
	$("#input_device_model").val(model_list[i].model);
};

var SubmitDeviceModel = function(i) {
	var brand = $("#input_device_brand").val();
 	var model = $("#input_device_model").val();
 	if(brand == model_list[i].brand && 
 			model == model_list[i].model) {
 		onAlertError('品牌和型号没有改变');
		return false;
 	}
 	if(!onCheckEmpty(brand)) { 
		onAlertErrorTip('品牌不能为空', document.getElementById('input_device_brand'));
		return false;
	} else if(!onCheckMaxLength(brand, 64)) {
		onAlertErrorTip('品牌名不能超过64个字符', document.getElementById('input_device_brand'));
		return false;
	}
	if(!onCheckEmpty(model)) { 
		onAlertErrorTip('型号不能为空', document.getElementById('input_device_model'));
		return false;
	} else if(!onCheckMaxLength(model, 64)) {
		onAlertErrorTip('型号名不能超过64个字符', document.getElementById('input_device_model'));
		return false;
	}
	
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/system/setdevicemodel.htm',
        data: {
        	"id" : model_list[i].id,
        	"brand" : $("#input_device_brand").val(),
        	"model" : $("#input_device_model").val()
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('设备品牌型号修改成功!',"ok");
            	modelSearchHandler.searchWithPreload();
            	dialog.list['Dailogin:ModelInfoedit'].remove().close();
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError('设备品牌型号修改失败!');
        }
    });
}

function deleteModel(i){
	onConfirmDialog('<p>您确定删除该型号吗？</p><p>删除后将不能恢复！</p>', function(){deleteModelOK(i)}, function(){});	
}

var deleteModelOK = function(i) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/system/deletedevicemodel.htm',
        data: {
        	"id" : model_list[i].id,
        	"brand" : model_list[i].brand,
        	"model" : model_list[i].model
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('删除成功!',"ok");
            	modelSearchHandler.clearResultSetpageNo();
            	modelSearchHandler.searchWithPreload();
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError('删除失败!');
        }
    });
}

var addModel = function() {
	var deviceModelHtml="";
	deviceModelHtml+="<div class='UserInfo-Settings-Body'>";
	deviceModelHtml+="    <div class='ChinaNet-Form-Sheet'>";
	deviceModelHtml+="        <label class='Form-Item-Title ChinaNet-Col-4'>厂商（Manu）</label>";
	deviceModelHtml+="		  <div id='id_device_manu' class='Form-Item-Label ChinaNet-Col-7'></div>";
	deviceModelHtml+="		  <div id='edit_device_manu' class='ChinaNet-Left ChinaNet-Col-7'><input type='text' id='input_add_device_manu' name='input_add_device_manu'></div>";
	deviceModelHtml+="    </div>";
	deviceModelHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceModelHtml+="        <label class='Form-Item-Title ChinaNet-Col-4'>品牌（Brand）</label>";
	deviceModelHtml+="		  <div id='edit_device_brand' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_add_device_brand' class='Input-Control'></div>";
	deviceModelHtml+="    </div>";
	deviceModelHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	deviceModelHtml+="        <label class='Form-Item-Title ChinaNet-Col-4'>型号（Model）</label>";
	deviceModelHtml+="		  <div id='edit_device_model' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_add_device_model' class='Input-Control'></div>";
	deviceModelHtml+="    </div>";
	deviceModelHtml+="</div>";
	
	var d_ModelInfo_add = dialog({
    	id: 'Dailogin:ModelInfoAdd',
        title: '添加设备品牌型号',
        content: deviceModelHtml,
        okValue: '完成',
        ok: function () {
        	submitDeviceModelAdd();
        	return false;
        },
        
        cancelValue: '取消',
        cancel: function () {},
        width:400,
        height:240,
        skin:'ChinaNet-Dialog'
    });
	
	d_ModelInfo_add.showModal();
	getDeviceManuName();
}

var getDeviceManuName = function() {
	if(__CONTEXT_MERCHANT_CODE != 'SUPER_MAN' && __CONTEXT_MERCHANT_CODE != 'DEVICE_ADMIN') {
		$("#edit_device_manu").hide();
		$("#id_device_manu").text(__CONTEXT_MERCHANT_FULLNAME);
	} else {
		$("#id_device_manu").hide();
		initManuSelect();
	}
}

////////////////////////////////////
var initManuSelect = function(){		
    $('#input_add_device_manu').xiSelect({
        offsetSize:[0,3,0,3],
        defaultData:{value:"", text:"请选择"},
        ajaxData:function(){
            var manuHtml = '';
            var manuList = getManuData();	
            manuHtml += '<a href="javascript:;" data-value="" data-text="" class="xiSelectItem">' +
            '    <div class="Template-For-Brand-List">' +
            '        <div class="Brand-Profile-Body">' +
            '            <span class="Brand-Name"></span>' +
            '        </div>' +
            '    </div>' +
            '</a>';
            if(manuHtml.length>0) {
                for(var i=0;i<manuList.length;i++) {
                	manuHtml += '<a href="javascript:;" data-value="'+manuList[i].fullname+'" data-text="'+manuList[i].fullname+'" class="xiSelectItem">' +
                        '    <div class="Template-For-Brand-List">' +
                        '        <div class="Brand-Profile-Body">' +
                        '            <span class="Brand-Name">'+manuList[i].fullname+'</span>' +
                        '        </div>' +
                        '    </div>' +
                        '</a>';
                }
            }
            return manuHtml;
        },
        
        changeClose:true
    });
}
    
function getManuData(){
    var manuList = {};
    $.ajax({
        url:'/system/searchmanufacturerlist.htm',
        type:'GET',
        dataType:'JSON',
        data:{},
        async:false,
        success:function(data){
            if(data.records.length>0){
                for(i=0;i<data.records.length;i++){
                	manuList = data.records;
                }
            }
        }
    });
    return manuList;
}  
 /////////////////////////////////



var submitDeviceModelAdd = function() {
	var fullname = __CONTEXT_MERCHANT_CODE=='MANUFACTURER'?__CONTEXT_MERCHANT_FULLNAME : $("#input_add_device_manu").val();
	var brand = $("#input_add_device_brand").val();
	var model = $("#input_add_device_model").val();
	
	if(!onCheckEmpty(fullname)) { 
		onAlertErrorTip('请选择厂商', document.getElementById('edit_device_manu'));
		return false;
	} 
	if(!onCheckEmpty(brand)) { 
		onAlertErrorTip('品牌不能有空格', document.getElementById('edit_device_brand'));
		return false;
	} else if(!onCheckMaxLength(brand, 64)) {
		onAlertErrorTip('品牌名不能超过64个字符', document.getElementById('edit_device_brand'));
		return false;
	}
	if(!onCheckEmpty(model)) { 
		onAlertErrorTip('型号不能有空格', document.getElementById('edit_device_model'));
		return false;
	} else if(!onCheckMaxLength(model, 64)) {
		onAlertErrorTip('型号名不能超过64个字符', document.getElementById('edit_device_model'));
		return false;
	}
	
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/system/adddevicemodel.htm',
        data: {
        	"fullname" : ((__CONTEXT_MERCHANT_CODE == 'MANUFACTURER') ? (__CONTEXT_MERCHANT_FULLNAME) : fullname),
        	"brand" : brand,
        	"model" : model
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('设备品牌型号添加成功!',"ok");
            	modelSearchHandler.searchWithPreload();
            	dialog.list['Dailogin:ModelInfoAdd'].remove().close();
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError('设备品牌型号添加失败!');
        }
    });
}

function onShowModelData(){
	$('div.ChinaNet-Settings-Button a').each(function(x){
		var id = $(this).attr('data-id');
        var deviceTotal = $(this).attr('data-device');   
        var producedDevicesTotal = $(this).attr('data-producedDevices'); 
            $(this).attr('id', id);
            $('a#'+id).xiMenu({
            menuItem:loadComButton(id, deviceTotal, producedDevicesTotal),
            skinClass:'public-Settings-MenuForXiMenu',
            activeClass:'Open',
            align:'right',
            paramAttr:['data-id','data-device','data-producedDevices']
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