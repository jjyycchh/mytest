var devicelogSearchHandler = null;
var devicelog_list = null;
var _totalResult_log = 1;
devicelogSearchHandler = new searchUtil(generateDevlogListHtml, searchFailCallBack, searchErrorCallBack, null, onShowElogData,
				"deviceloglist_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchdevicelog.htm", "");

var devicetasklogsearchApp = function() {
	
	var keywordsSearch = function() {	
		$("div.ChinaNet-Page-Table").show();
		devicelogSearchHandler.clearResultSetpageNo();
		var devtask_status = ($("#moduleSelect").val() == "all") ? null : $("#moduleSelect").val();
		devicelogSearchHandler.setSearchParemeter('status',  devtask_status);
		var deviceSearchKeywords = devicelogSearchHandler.convertKeywordsSearchable($("#keywords").val());
		devicelogSearchHandler.setSearchParemeter('keywords', deviceSearchKeywords);
		devicelogSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		devicelogSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));		
		if(onCheckLength(deviceSearchKeywords)){
			devicelogSearchHandler.searchWithPreload();
		}
		else{
			onAlertError('您输入的关键字太多，请重新输入');
		}	
	}
	
	
	var onsearchDevlog = function() {
		$("#btn_Search_devicelog").click(function() {
			keywordsSearch();
		});
	}
	
	
	var initModuleSelect = function() {
        $('#moduleSelect').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'all',text:'全部'},
        	data:[
        	      {value:'all',text:'全部'},
        	      {value:true,text:'执行成功'},
        	      {value:false,text:'执行失败'}        	     
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
		devicelogSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		initDatepicker();
		onsearchDevlog();		
		initModuleSelect();
	}}
}();

function generateDevlogListHtml(logList) {
	devicelog_list = logList;
	var logListHtml = "";		
	if (logList.length > 0) {		
		_totalResult_log = logList.length;
		for (var i = 0; i < logList.length;i++) {
			var id = logList[i].id;
			var createDatetime = logList[i].createDatetime;
			var deviceid = logList[i].deviceId;
			var successflag = null;
			if(logList[i].isSuccess == true){
				successflag = '执行成功'
			}else if(logList[i].isSuccess == false){
				successflag = '执行失败';
			}
			else{
				successflag = '';
			}
	        if(logList[i].command != "" && typeof logList[i].command !='undefined'){	        	
	        	var command =JSON.parse(logList[i].command);
	        	if(command != null && typeof command == 'object'){
	        		if(command.active_task != null && typeof command.active_task != 'undefined' ){
	        			var acctive_task = command.active_task;
						var taskid = acctive_task.task_id;
						var taskcode = acctive_task.task_code;
	        		}
	        		if(command.desc != null && typeof command.desc != 'undefined' ){
	        			var desc = command.desc;
						var taskid = desc.task_id;
						var taskcode = desc.task_code;
	        		}
	        		
	        	}
				
	        }	
			
			logListHtml += "<tr class='ChinaNet-Table-Body'>"
			logListHtml +=     "<td id='elog_id_" + id + "'>" + id + "</td>";
			logListHtml +=     "<td id='elog_createDatetime_" + id + "'>" + createDatetime + "</td>";
			logListHtml +=     "<td id='elog_deviceid_" + id + "'>" + deviceid + "</td>";
			logListHtml +=     "<td id='elog_taskid_" + id + "'>" + taskid + "</td>";
			logListHtml +=     "<td id='elog_taskflag_" + id + "'>" + successflag + "</td>";
			logListHtml +=     "<td class='ChinaNet-Form-Sheet Width-For-Button' id='elog_details_btn_" + id + "'>";
			logListHtml +=     generatelogDetailsBtn(i);
			logListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	return logListHtml;
}

function generatelogDetailsBtn(i) {
	var logDetailsBtnHtml = "";
	if (devicelog_list[i].id != null) {
		logDetailsBtnHtml += "<button class='Form-Primary' onclick='javascript:showelogDetails(" + i + ")'>";
		logDetailsBtnHtml += "<span>详情</span>";
		logDetailsBtnHtml += "</button> ";
	}
	return logDetailsBtnHtml;
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
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>设备ID</label>";
	elogDetailsHtml+="        <div id='id_elog_device_id' class='Form-Item-Label ChinaNet-Col-8'></div>";
	elogDetailsHtml+="    </div>";
	elogDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>任务ID</label>";
	elogDetailsHtml+="        <div id='id_elog_task_id'  class='Form-Item-Label ChinaNet-Col-8'></div>";
	elogDetailsHtml+="    </div>";
	elogDetailsHtml+="    <div id='div_merchantName' class='ChinaNet-Form-Sheet'>";
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>执行状态</label>";
	elogDetailsHtml+="        <div id='id_elog_success_flag'  class='Form-Item-Label ChinaNet-Col-10'></div>";
	elogDetailsHtml+="    </div>";
	elogDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	elogDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-1'>任务代码</label>";
	elogDetailsHtml+="        <div id='id_elog_task_code' class='Form-Item-Label ChinaNet-Col-10'></div>";
	elogDetailsHtml+="    </div>";
	
	elogDetailsHtml+="</div>";
		
	var d_ElogDetails = dialog({
		id: 'Dailogin:UserInfo',
	    title: '设备任务日志详情',
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
			var successflag = null;
			var taskcode =null;
			var taskid=null;
			if(devicelog_list[i].isSuccess == true){
				successflag = '执行成功'
			}else if(devicelog_list[i].isSuccess == false){
				successflag = '执行失败'
			}
			else{
				successflag = '';
			}
	        if(devicelog_list[i].command != "" && typeof devicelog_list[i].command !='undefined'){
	        	var command =JSON.parse(devicelog_list[i].command);
	        	if(command != null && typeof command == 'object'){
	        		if(command.active_task != null && typeof command.active_task != 'undefined' ){
	        			var acctive_task = command.active_task;
						    taskid = acctive_task.task_id;
						    taskcode = acctive_task.task_code;
	        		}
	        		if(command.desc != null && typeof command.desc != 'undefined' ){
	        			var desc = command.desc;
						    taskid = desc.task_id;
						    taskcode = desc.task_code;
	        		}
	        		
	        	}
				
	        }	
	$("#id_elog_id").text(devicelog_list[i].id);
	$("#id_elog_create_datetime").text(devicelog_list[i].createDatetime);
	$("#id_elog_device_id").text(devicelog_list[i].deviceId);
	if(taskid !=null){
		$("#id_elog_task_id").text(taskid)	;
	}
	
	$("#id_elog_success_flag").text(successflag);
	if(taskcode !=null){
	   $("#id_elog_task_code").text(taskcode);
	}
	

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


