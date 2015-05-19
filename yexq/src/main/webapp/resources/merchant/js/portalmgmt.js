
var portalSearchHandler = null;
	portalSearchHandler = new searchUtil(generateTpListHtml, searchFailCallBack, searchErrorCallBack, null, onShowBtn,
			"portallist_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
			"/system/portaltemplate.htm", "");
var portalmgmtApp = function(){
	var searchportal = function(){		
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/system/portaltemplate.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL' && data.template != null) {
					$("#portallist_body").html(generateTpListHtml(data.template));	
					$('div.ChinaNet-Settings-Button a').each(function(x){
						var id = $(this).attr('data-public-params');
                        var tempimg = $(this).attr('data-imgsrc');
                        var tempname = $(this).attr('data-title');	
                            $(this).attr('id', id);
                            $('a#'+id).xiMenu({
	                        menuItem:[
	                            {url:'/system/portaltemplateedit26.htm',className:'initAjax',text:'编辑'},
	                            {url:'javascript:BrowserPage(\'' + tempimg + '\',\'' + tempname + '\');',text:'预览'}
	                        ],
	                        skinClass:'public-Settings-MenuForXiMenu',
	                        activeClass:'Open',
	                        align:'right',
	                        paramAttr:['data-title','data-imgsrc','data-public-params']
	                    });
					});
				} else {
					closeLoading();
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
	
	
	
	
	return {init:function(){
		//searchportal();
		portalSearchHandler.searchWithPreload();	
	}}
}();
function generateTpListHtml(tpList) {
	var tempListHtml = "";		
	if (tpList.length > 0) {			
		for (var i = 0; i < tpList.length; i++) {
			var tempid = tpList[i].id; 
			var tempname = tpList[i].name;
			var tempdescription = tpList[i].description ? tpList[i].description : '';
			var temptype = tpList[i].type;
			var tempauthtype = tpList[i].authType;
			var tempaddtime = tpList[i].createDatetime;
			var tempimg = tpList[i].thumbnailPath;
			
			tempListHtml += "<tr class='ChinaNet-Table-Body' id='tempid_" + tempid + "'>";
			tempListHtml += "<td><span class='Table-Data-Name-Nobold'>" + tempid + "</span></td>";
			tempListHtml += "<td><span class='Table-Data-Name Table-Text'>" + tempname + "</span></td>";
			tempListHtml += "<td><span class='Table-Data-Name Table-Text'>" + tempdescription + "</span></td>";
			tempListHtml += "<td><span class='Table-Data-Name'>" + gettypecn(temptype) + "</span></td>";
			tempListHtml += "<td><span class='Table-Data-Name-Nobold'>" + tempaddtime + "</span></td>";
			tempListHtml += "<td style='padding-left:20px;'><div class='ChinaNet-Settings-Button'>";
			tempListHtml += "<a href='javascript:;' data-public-params='"+tempid+"' data-title='"+tempname+"' data-imgsrc='"+tempimg+"'><span><span class='Setting-Name'>设置</span><span>&nbsp;</span></span></a>";
			tempListHtml += "</div></td>";
			tempListHtml += "</tr>";
		}
	}
	return tempListHtml;
}
function gettypecn(temptype){
	var typecn="";
	if(temptype == "AUTH"){
		typecn="<span class='Table-Data-Status-Photo Table-Flow-Verification'></span>";
	}
	else if(temptype == "LOGIN"){
		typecn="<span class='Table-Data-Status-Photo Table-Flow-Login'></span>";
	}
	else{
		typecn="<span class='Table-Data-Status-Photo Table-Flow-Content'></span>";
	}
	return typecn;
}
function onShowBtn(){
	
	$('div.ChinaNet-Settings-Button a').each(function(x){
		var id = $(this).attr('data-public-params');
        var tempimg = $(this).attr('data-imgsrc');
        var tempname = $(this).attr('data-title');	
            $(this).attr('id', id);
            $('a#'+id).xiMenu({
            menuItem:[
                {url:'/system/portaltemplateedit26.htm',className:'initAjax',text:'编辑'},
                {url:'javascript:BrowserPage(\'' + tempimg + '\',\'' + tempname + '\');',text:'预览'}
            ],
            skinClass:'public-Settings-MenuForXiMenu',
            activeClass:'Open',
            align:'right',
            paramAttr:['data-title','data-imgsrc','data-public-params']
        });
	});
}
function BrowserPage(tempImg,tempName){
	var content = "<img id='tbimg' src='"+__CONTEXT_PATH+tempImg+"' class='img-responsive img-rounded center-block'  alt=''>";
	var d = dialog({
    	id: 'Dailogin:Device:Setting',
        title: tempName,
        content: content,
        //okValue: '确定',
        //ok: onSetDevice,       
        cancelValue: '关闭',
        cancel: function () {},
        width:720,
        //height:420,
        skin:'ChinaNet-Dialog'
    });
    d.showModal();
}
function searchFailCallBack(data, message) {
	onAlertError('加载模板数据请求提交失败！');
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载模板数据请求提交失败！');
	return false;
}