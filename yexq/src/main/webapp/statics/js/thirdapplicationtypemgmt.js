
var thirdApplicationTypeMgmtApp = function(){
	
	var searchthirdappType = function(){	
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/authentication/getthirdapplicationtype.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL' && data.data != null) {
					$("#third_applicationtype_list_body").html(generateThirdAppTypeHtml(data.data));
					$('div.ChinaNet-Settings-Button a').each(function(x){
						var id = $(this).attr('data-id');
						var name = $(this).attr('data-name');
                            $(this).attr('id', id);
                            $('a#'+id).xiMenu({
	                        menuItem:[
	                            {url:'javascript:showthirdapptypeedit(\''+id+'\',\''+name+'\');',text:'编辑'},
	                            {url:'javascript:void(0);',text:'删除'}
	                        ],
	                        skinClass:'public-Settings-MenuForXiMenu',
	                        activeClass:'Open',
	                        align:'right',
	                        paramAttr:['data-id','data-name']
	                    });
					});
					
				} else {
					onAlertError(data.message);
					return false;
				}
				closeLoading();
			},
			error : function(data) {
				closeLoading();
				onAlertError(data.message);
				return false;
			}
		});
	}
	
	var generateThirdAppTypeHtml = function(datalist) {
		var thirdAppTypeHtml = "";		
		if (datalist != null && datalist.length > 0) {
			for (var i = 0; i < datalist.length; i++) {
				var thirdapp_type_id = datalist[i].id;
				var thirdapp_type_name = datalist[i].type;
				var thirdapp_type_memo = isNotEmptyString(datalist[i].memo)?datalist[i].memo:'';				
				var thirdapp_type_createdatetime = datalist[i].createDatetime.replace("T"," ");		
				thirdAppTypeHtml += "<tr class='ChinaNet-Table-Body'>";
				thirdAppTypeHtml += 	"<td><span class='Table-Data-Name'>" + thirdapp_type_id + "</span></td>";
				thirdAppTypeHtml += 	"<td><span class='Table-Data-Name'>" + thirdapp_type_name + "</span></td>";
				//thirdAppTypeHtml += 	"<td><span class='Table-Data-Name'>" + thirdapp_type_memo + "</span></td>";
				thirdAppTypeHtml += 	"<td><span class='Table-Data-Name'>" + thirdapp_type_createdatetime + "</span></td>";
				thirdAppTypeHtml += 	"<td class='ChinaNet-Form-Sheet Width-For-Button'>";
				thirdAppTypeHtml +=   	"<div class='ChinaNet-Settings-Button'>";
				thirdAppTypeHtml +=     "<a href='javascript:;' data-id='" + thirdapp_type_id + "' data-name='" + thirdapp_type_name + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
				thirdAppTypeHtml += 	"</td>";
				thirdAppTypeHtml += "</tr>";
				
			}
		}		
		return thirdAppTypeHtml;
	}
	
	var onAddType = function(){		
		$("#btn_Add_apptype").click(function() {
			var reFilterHTML = /<[\d\D]*?>/g;
			var app_type = $('input#apptype_name').val().replace(reFilterHTML, '');
			//var app_memo = $('input#apptype_memo').val().replace(reFilterHTML, '');
			
			if(!onCheckEmpty(app_type)){
				onAlertErrorTip('第三方接入类型名称为必填项,且不能含有空格', document.getElementById('apptype_name'));
	            return false;
			}
			if(!onCheckMaxLength(app_type,20)){
				onAlertErrorTip('类型名称不能超过20个字符，请重新输入', document.getElementById('apptype_name'));
	            return false;
			}
			/*if(!onCheckMaxLength(app_memo,50)){
				onAlertErrorTip('类型简介不能超过50个字符，请重新输入', document.getElementById('apptype_memo'));
	            return false;
			}*/
			$.ajax({
                type: 'POST',
                dataType: 'json',
                url:'/authentication/addthirdapplicationtype.htm',
                data: {
                	type: app_type
                },
                success: function (data) {
                    if (data.result == 'OK') {
                    	onAlertError('添加第三方应用类型成功!',"ok");
                    	searchthirdappType();
                    } else {
                    	onAlertError('添加第三方应用类型名称已经存在');
                    	return false;
                    }
                },
                error: function (data) {
                	onAlertError('添加第三方应用类型失败');
                	return false;
                }
            });
		});
	}
	
	return {init:function(){
		searchthirdappType();
		onAddType();
	}}
}();

function showthirdapptypeedit(id,name){
	var thirdAppTypeHtml = "";
	
	thirdAppTypeHtml += "<div class='UserInfo-Settings-Body'>";
	thirdAppTypeHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
	thirdAppTypeHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>类型名称</label>";
	thirdAppTypeHtml += "    <div id='div_appType_name' class='Form-Item-Input ChinaNet-Col-7'><input type='text' id='input_appType_name' class='Input-Control'></div>";
	thirdAppTypeHtml += "  </div>";
	thirdAppTypeHtml += "</div>";
	var d_ThirdAppType_Edit = dialog({
	   	 id: 'Dailogin:ThirdAppTypeModify',
	       title: '编辑第三方应用类型',
	       content: thirdAppTypeHtml,
	       okValue: '完成',
	       ok: function(){
	    	   ModifyThirdAppType(id,name);
	    	   return false;
	       },
	       cancelValue: '取消',
	       cancel: function(){},
	       width:600,
	       height:120,
	       skin:'ChinaNet-Dialog'
	   });
	$("#input_appType_name").val(name);
	d_ThirdAppType_Edit.showModal();
}
function ModifyThirdAppType(id,name){
	var reFilterHTML = /<[\d\D]*?>/g;
	var nametype = $("#input_appType_name").val().replace(reFilterHTML, '');
	if(name == nametype) {
		onAlertError('您没有修改任何内容');
		return false;
	}
	if(!onCheckEmpty(nametype)){
		onAlertErrorTip('第三方接入类型名称为必填项,且不能含有空格', document.getElementById('input_appType_name'));
        return false;
	}
	if(!onCheckMaxLength(nametype,20)){
		onAlertErrorTip('类型名称不能超过20个字符，请重新输入', document.getElementById('input_appType_name'));
        return false;
	}
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url:'/authentication/updatethirdapplicationtype.htm',
        data: {
        	id: id,
        	type: nametype
        },
        success: function (data) {
            if (data.result == 'OK') {
            	onAlertError('修改第三方应用类型成功!',"ok");
            	dialog.list['Dailogin:ThirdAppTypeModify'].remove().close();
            	thirdApplicationTypeMgmtApp.init();
            } else {
            	onAlertError('修改第三方应用类型失败');
            	return false;
            }
        },
        error: function (data) {
        	onAlertError('修改第三方应用类型失败');
        	return false;
        }
    });
}