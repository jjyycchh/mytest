/**
 * Created by cx on 2014/8/13.
 */

var smssendApp = function(){
	var smssendSearchHandler = null;
	var search_smssend_keyword = null;
	
	smssendSearchHandler = new searchUtil(generateSMSListHtml, searchFailCallBack, searchErrorCallBack, null, null,
			"smssendlog_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next", 
			"/merchant/searchsms.htm","");
	var keywordsSearch = function() {
		
		smssendSearchHandler.setSearchParemeter('startdate', $("#startdate").val());
		smssendSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
		smssendSearchHandler.searchWithPreload();		
	}
	var onsearchsmslog = function(){
		$("#btn_search_smslog").click(function() {
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
	return {init:function(){
		smssendSearchHandler.searchWithPreload();	
		initDatepicker();
		onsearchsmslog();
		//searchsmssendlog();
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
			
			SMSListHtml += "<tr class='ChinaNet-Table-Body'>"
		    SMSListHtml +=     "<td><span class='Table-Data-Name'>" + cellphone + "</span></td>";
			SMSListHtml +=     "<td><span class='Table-Data-Name'>" + content + "</span></td>";
			SMSListHtml +=     "<td><span class='Table-Data-Name'>" + createDatetime + "</span></td>";
			SMSListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}

	return SMSListHtml;
}
function searchFailCallBack(data, message) {
	onAlertError('加载短信数据请求提交失败！');
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载短信数据请求提交失败！');
	return false;
}