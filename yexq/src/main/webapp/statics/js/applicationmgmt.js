var appSearchHandler = null;
var app_list = null;
appSearchHandler = new searchUtil(generateAppListHtml, searchFailCallBack, searchErrorCallBack, null, onShowAppData,
				"applist_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchapplication.htm", "");

var applicationmgmtApp = function() {
	
	var keywordsSearch = function() {	
		$("div.ChinaNet-Page-Table").show();
		appSearchHandler.clearResultSetpageNo();
		var keywords = $("#platformSelect").val();
		appSearchHandler.setSearchParemeter('keywords',  keywords);
		appSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		appSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));				
		appSearchHandler.searchWithPreload();
	}
	
	
	var onsearchApp = function() {
		$("#btn_Search_app").click(function() {
			keywordsSearch();
		});
	}
	
	var initplatformSelect = function() {
        $('#platformSelect').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'',text:'全部'},
        	data:[
        	      {value:'',text:'全部'},
        	      {value:'Android',text:'Android'},
        	      {value:'iOS',text:'iOS'}
        	]})
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
	
	return {init:function(){
		appSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		initDatepicker();
		onsearchApp();
		initplatformSelect();
	}}
}();

function generateAppListHtml(appList) {
	app_list = appList;
	var applicationListHtml = "";		
	if (appList.length > 0) {		
		for (var i = 0; i < appList.length;i++) {
			var platform = appList[i].platform;
			var version = appList[i].version;
			var uploadDatetime = appList[i].uploadDatetime;
			var publishedDatetime = (appList[i].publishedDatetime == null) ? "" : appList[i].publishedDatetime;
			var isPublished = (appList[i].isPublished == 0) ? "未发布" : "已发布";
			var downloadCount = appList[i].downloadCount;
			
			applicationListHtml += "<tr class='ChinaNet-Table-Body'>"
			applicationListHtml +=     "<td id='app_platform_" + i + "'>" + platform + "</td>";
			applicationListHtml +=     "<td id='app_version_" + i + "'>" + version + "</td>";
			applicationListHtml +=     "<td id='app_uploadDatetime_" + i + "'>" + uploadDatetime + "</td>";
			applicationListHtml +=     "<td id='app_publishedDatetime_" + i + "'>" + publishedDatetime + "</td>";
			applicationListHtml +=     "<td id='app_downloadCount_" + i + "'>" + isPublished + "</td>";
			applicationListHtml +=     "<td id='app_downloadCount_" + i + "'>" + downloadCount + "</td>";
			applicationListHtml +=		 "<td style='padding-left:9px;'><div class='ChinaNet-Settings-Button'>";
			applicationListHtml +=   	 "<a href='javascript:;' data-id='" + i + "'><span><span class='Setting-Name'>操作</span><span>&nbsp;</span></span></a>";
			applicationListHtml += "</td></tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	return applicationListHtml;
}

function loadComButton(i) {
	var jsonObj2 = {ComButton:[]};
 	var ComButton = jsonObj2.ComButton;
 	
 	jsonObj2.ComButton.push({url:'javascript:editApp(\'' + i + '\');', text:'详情'});
 	if(app_list[i].isPublished == 0) {
 		jsonObj2.ComButton.push({url:'javascript:publishApp(\'' + i + '\');', text:'发布'});
 	}
 	return ComButton;
}

function editApp(i) {
	showAppEdits(i);
}

var publishApp = function(i) {
	var version = null;
	$.ajax({
        url:'/system/searchappexists.htm',
        type:'GET',
        dataType:'JSON',
        data:{"platform": app_list[i].platform},
        async:false,
        success:function(data){
            if(data.version != null) {
                version = data.version;
            }
        }
    });
	
	if(version != null) {
		onConfirmDialog('<p>您确定发布版本'+ app_list[i].version + '吗？</p>' + 
				'<p>现在已发布版本：'+ version + '将被替换</p>', 
				function() {
					publishAppOK(i)
				}, function(){});	
	} else {
		publishAppOK(i)
	}
	
}

function publishAppOK(i) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/system/publishapp.htm',
        data: {
        	"id" : app_list[i].id,
        	"platform": app_list[i].platform
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	onAlertError('发布成功!',"ok");
            	appSearchHandler.clearResultSetpageNo();
            	appSearchHandler.searchWithPreload();
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError('发布失败!');
        }
    });	
}

var showAppEdits = function(i) {
	var appDetailsHtml="";
	appDetailsHtml+="<div class='UserInfo-Settings-Body'>";
	appDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	appDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>平台</label>";
	appDetailsHtml+="			<div id='edit_app_platform' class='Form-Item-Input ChinaNet-Col-4 Disabled'><input type='text' id='input_app_platform' class='Input-Control' readonly></div>";
	appDetailsHtml+="    </div>";
	
	appDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	appDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>版本号</label>";
	appDetailsHtml+="			<div id='edit_app_version' class='Form-Item-Input ChinaNet-Col-4'><input type='text' id='input_app_version' class='Input-Control' readonly></div>";
	appDetailsHtml+="    </div>";
	
	appDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	appDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>上传时间</label>";
	appDetailsHtml+="			<div id='edit_app_uploadDatetime' class='Form-Item-Input ChinaNet-Col-4'><input type='text' id='input_app_uploadDatetime' class='Input-Control' readonly></div>";
	appDetailsHtml+="    </div>";
	
	appDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	appDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>发布时间</label>";
	appDetailsHtml+="			<div id='edit_app_publishedDatetime' class='Form-Item-Input ChinaNet-Col-4'><input type='text' id='input_app_publishedDatetime' class='Input-Control' readonly></div>";
	appDetailsHtml+="    </div>";
	
	appDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	appDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>发布状态</label>";
	appDetailsHtml+="			<div id='edit_app_isPublished' class='Form-Item-Input ChinaNet-Col-4'><input type='text' id='input_app_isPublished' class='Input-Control' readonly></div>";
	appDetailsHtml+="    </div>";
	
	appDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	appDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>下载次数</label>";
	appDetailsHtml+="			<div id='edit_app_downloadCount' class='Form-Item-Input ChinaNet-Col-4'><input type='text' id='input_app_downloadCount' class='Input-Control' readonly></div>";
	appDetailsHtml+="    </div>";
	
	appDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	appDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>存储路径</label>";
	appDetailsHtml+="			<div id='edit_app_path' class='Form-Item-Input ChinaNet-Col-8'><input type='text' id='input_app_path' class='Input-Control' readonly></div>";
	appDetailsHtml+="    </div>";

	appDetailsHtml+="</div>";
	
	var d_AppInfo_edit = dialog({
     	 id: 'Dailogin:AppInfoedit',
         title: 'APP详细信息',
         content: appDetailsHtml,
         
         cancelValue: '关闭',
         cancel: function () {},
         width:600,
         height:360,
         skin:'ChinaNet-Dialog'
     });
	
	d_AppInfo_edit.showModal();
	refreshAppInfo(i);
}

function refreshAppInfo(i) {
	$("#input_app_platform").val(app_list[i].platform);
	$("#input_app_version").val(app_list[i].version);
	$("#input_app_uploadDatetime").val(app_list[i].uploadDatetime);
	$("#input_app_publishedDatetime").val(app_list[i].publishedDatetime);
	$("#input_app_downloadCount").val(app_list[i].downloadCount);
	$("#input_app_path").val(app_list[i].path);
	
	var isPublished = null;
	if(app_list[i].isPublished == 0) {
		isPublished = "未发布";
	} else if (app_list[i].isPublished == 1) {
		isPublished = "已发布";
	}
	
	$("#input_app_isPublished").val(isPublished);
	
}

function onShowAppData(){
	$('div.ChinaNet-Settings-Button a').each(function(x){
		var id = $(this).attr('data-id');
            $(this).attr('id', id);
            $('a#'+id).xiMenu({
            menuItem:loadComButton(id),
            skinClass:'public-Settings-MenuForXiMenu',
            activeClass:'Open',
            align:'right',
            paramAttr:['data-id']
        });
	});
}

function searchFailCallBack(data, message) {
	onAlertError('加载日志数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载日志数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();
	return false;
}