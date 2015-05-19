var elogSearchHandler = null;
var elog_list = null;
var _totalResult_log = 1;
elogSearchHandler = new searchUtil(generateElogListHtml, searchFailCallBack, searchErrorCallBack, null, onShowElogData,
				"eloglist_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchexceptionlog.htm", "");

var superelogsearchApp = function() {
	
	var keywordsSearch = function() {	
		$("div.ChinaNet-Page-Table").show();
		elogSearchHandler.clearResultSetpageNo();
		var keywords = ($("#moduleSelect").val() == "all") ? null : $("#moduleSelect").val();
		elogSearchHandler.setSearchParemeter('keywords',  keywords);
		elogSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		elogSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));				
		elogSearchHandler.searchWithPreload();
	}
	
	var elogExport = function() {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '/system/exportexceptionlog.htm',
			data : {
				'keywords' : ($("#moduleSelect").val() == "all") ? null : $("#moduleSelect").val(),
				'startdate' : $("#startdate").val(),
				'enddate' : addoneday($("#enddate").val())
			},
			success : function(data) {
				if (data.result == 'OK') {
					window.open('/system/downloadexceptionlog26.htm?message=' + data.message);
				} else {						
					searchFailCallBack(data, datamessage);
				}
			},
			error : function(data) {
				searchErrorCallBack(data, data.message);
			}
		});
	} 
	
	var onsearchElog = function() {
		$("#btn_Search_elog").click(function() {
			//searchTotalExceptionLogs();
			keywordsSearch();
		});
	}
	
	var onexportElog = function() {
		$("#btn_Export_elog").click(function() {
			elogExport();
		});
	}
	
	var initModuleSelect = function() {
        $('#moduleSelect').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'',text:'全部'},
        	data:[
        	      {value:'',text:'全部'},
        	      {value:'account',text:'account'},
        	      {value:'device',text:'device'},
        	      {value:'merchant',text:'merchant'},
        	      {value:'system',text:'system'},
        	      {value:'user',text:'user'},
        	      {value:'api',text:'api device'}]})
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
		$("#unactive_list").hide();
		elogSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		initDatepicker();
		onsearchElog();
		onexportElog();
		initModuleSelect();
	}}
}();

function searchTotalExceptionLogs() {
	var keywords = $("#moduleSelect").val();
	$.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/system/searchexceptionlogtotal.htm',
        data: {
        	"keywords" : keywords,
        	"startdate" : $("#startdate").val(),
        	"enddate" : addoneday($("#enddate").val())
        },
        success: function (data) {
        	if (data.result == 'OK') {
            	$("#total_exception_logs").text("共" + data.total + "条");
            } else {                   
                onAlertError(data.message);
            }
        },
        error: function (data) {
        	onAlertError(data.message);
        }
    });	
}

function generateElogListHtml(elogList) {
	elog_list = elogList;
	var elogListHtml = "";		
	if (elogList.length > 0) {		
		_totalResult_log = elogList.length;
		for (var i = 0; i < elogList.length;i++) {
			var id = elogList[i].id;
			var createDatetime = elogList[i].createDatetime;
			var moduleName = elogList[i].moduleName;
			var serviceName = elogList[i].serviceName;
			var parameter = elogList[i].parameter;
			var sysErrorMssage = elogList[i].sysErrorMssage;
			
			elogListHtml += "<tr class='ChinaNet-Table-Body'>"
			elogListHtml +=     "<td id='elog_id_" + id + "'>" + id + "</td>";
			elogListHtml +=     "<td id='elog_createDatetime_" + id + "'>" + createDatetime + "</td>";
			elogListHtml +=     "<td id='elog_moduleName_" + id + "'>" + moduleName + "</td>";
			elogListHtml +=     "<td id='elog_serviceName_" + id + "'>" + serviceName + "</td>";
			elogListHtml +=     "<td class='ChinaNet-Form-Sheet Width-For-Button' id='elog_details_btn_" + id + "'>";
			elogListHtml +=     generateElogDetailsBtn(i);
			elogListHtml += "</td></tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	return elogListHtml;
}

function generateElogDetailsBtn(i) {
	var elogDetailsBtnHtml = "";
	if (elog_list[i].id != null) {
		elogDetailsBtnHtml += "<button class='Form-Primary' onclick='javascript:showelogDetails(" + i + ")'>";
		elogDetailsBtnHtml += "<span>详情</span>";
		elogDetailsBtnHtml += "</button> ";
	}
	return elogDetailsBtnHtml;
}

function showelogDetails(i) {
	var elogDetailsHtml="";
	elogDetailsHtml+="<div style='overflow-y: scroll; height: 600px; width: 800px;' class='UserInfo-Settings-Body'>";
	elogDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>日志ID</label>";
	elogDetailsHtml+="        <div id='id_elog_id' class='Form-Item-Label ChinaNet-Col-8'></div>";
	elogDetailsHtml+="    </div>";
	elogDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>生成时间</label>";
	elogDetailsHtml+="        <div id='id_elog_create_datetime'  class='Form-Item-Label ChinaNet-Col-8'></div>";
	elogDetailsHtml+="    </div>";
	elogDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>模块名称</label>";
	elogDetailsHtml+="        <div id='id_elog_module_name' class='Form-Item-Label ChinaNet-Col-8'></div>";
	elogDetailsHtml+="    </div>";
	elogDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>服务名称</label>";
	elogDetailsHtml+="        <div id='id_elog_service_name'  class='Form-Item-Label ChinaNet-Col-8'></div>";
	elogDetailsHtml+="    </div>";
	elogDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>参数</label>";
	elogDetailsHtml+="        <div id='id_elog_parameter' class='Form-Item-Label ChinaNet-Col-10'></div>";
	elogDetailsHtml+="    </div>";
	elogDetailsHtml+="    <div id='div_merchantName' class='ChinaNet-Form-Sheet'>";
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>出错信息</label>";
	elogDetailsHtml+="        <div id='id_elog_message'  class='Form-Item-Label ChinaNet-Col-10'></div>";
	elogDetailsHtml+="    </div>";
	elogDetailsHtml+="</div>";
		
	var d_ElogDetails = dialog({
		id: 'Dailogin:UserInfo',
	    title: '日志详情',
	    content: elogDetailsHtml,
	         
	    okValue: '关闭',
	    ok: function () {},
	    button: [{
	    	value: '上一条',
	        display: (i == 0) ? false : true,
	        callback: function() {
	        	d_ElogDetails.close().remove();
	            showelogDetails(--i);
	            return false;
	        },
	        autofocus: false
	    }, {
	        display: (i == _totalResult_log-1) ? false : true,
	        value: '下一条',
	        callback: function() {
	        	d_ElogDetails.close().remove();
	            showelogDetails(++i);
	            return false;
	        },
	        autofocus: false
	    }],
	    width:800,
	    height:600,
	    skin:'ChinaNet-Dialog'
	});
	d_ElogDetails.showModal();
	viewElogDetails(i);
}

function viewElogDetails(i) {
	$("#id_elog_id").text(elog_list[i].id)
	$("#id_elog_create_datetime").text(elog_list[i].createDatetime)
	$("#id_elog_module_name").text(elog_list[i].moduleName)
	$("#id_elog_service_name").text(elog_list[i].serviceName)
	$("#id_elog_parameter").text(elog_list[i].parameter)
	$("#id_elog_message").text(elog_list[i].sysErrorMssage)

	if (i == 0) {
		$("#btn_prev").hide();
		//$("#btn_next").show();
	} else if (i == _totalResult_log-1) {
		//$("#btn_prev").show();
		$("#btn_next").hide();
	} else {
		$("#btn_prev").show();
		$("#btn_next").show();
	}
}

function onShowElogData(){
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