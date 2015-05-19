var smsSearchHandler = null;

smsSearchHandler = new searchUtil(generateSMSListHtml, searchFailCallBack, searchErrorCallBack, null, onShowSMSData,
				"smslist_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchsmssent.htm", "");

var smssentmgmtApp = function() {
	
	var keywordsSearch = function() {		
		$("div.ChinaNet-Page-Table").show();
		smsSearchHandler.clearResultSetpageNo();
		var keywords = smsSearchHandler.convertKeywordsSearchable($("#keywords").val());
		smsSearchHandler.setSearchParemeter('keywords', keywords);
		smsSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		smsSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));				
		//smsSearchHandler.searchWithPreload();
		if(onCheckLength(keywords)){
			smsSearchHandler.searchWithPreload();
		}
		else{
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	
	var onsearchSMS = function(){
		$("#btn_Search_sms").click(function() {
			keywordsSearch();
		});
	}
	
	/*var initStatusSelect = function() {
        $('#statusSelect').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'active',text:'已激活设备'},
        	data:[
        	      {value:'active',text:'已激活设备'},
        	      {value:'unactive',text:'未激活设备'},]})
    }*/
	
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
		smsSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearchActive();
				return false;
		    }
		});
		
		initDatepicker();
		onsearchSMS();
		//initStatusSelect();
	}}
}();

function generateSMSListHtml(SMSList) {
	var SMSListHtml = "";		
	if (SMSList.length > 0) {			
		for (var i = 0; i < SMSList.length;i++) {
			var id = SMSList[i].id;
			var cellphone = SMSList[i].cellphone;
			var content = SMSList[i].content;
			var createDatetime = SMSList[i].createDatetime;
			var terminalUserAuthenticationLogId = (SMSList[i].terminalUserAuthenticationLogId == null) ? "--" : SMSList[i].terminalUserAuthenticationLogId;
			
			SMSListHtml += "<tr class='Device-State-Table-Body'>"
		    SMSListHtml +=     "<td id='sms_cellphone_" + id + "'>" + cellphone + "</td>";
			SMSListHtml +=     "<td id='sms_content_" + id + "'>" + content + "</td>";
			SMSListHtml +=     "<td id='sms_createDatetime_" + id + "'>" + createDatetime + "</td>"; 
			SMSListHtml +=     "<td id='sms_terminalUserAuthenticationLogId_" + id +"'>" + terminalUserAuthenticationLogId + "</td>";
			SMSListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	return SMSListHtml;
}

function onShowSMSData(){
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
	onAlertError('加载短信数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载短信数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();	
	return false;
}