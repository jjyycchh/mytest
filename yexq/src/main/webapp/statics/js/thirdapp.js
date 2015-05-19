
var thirdApplicationpageApp = function() {
	var thirdAppSearchHandler = null;
	var search_thirdApp_keyword = null;
	
	thirdAppSearchHandler = new searchUtil(generateAppListHtml, searchFailCallBack, searchErrorCallBack, null, null,
			"App_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next", 
			"/authentication/merchantthirdapplication.htm","");
	var keywordsSearch = function() {
		
		thirdAppSearchHandler.setSearchParemeter('startdate', $("#startdate").val());
		thirdAppSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
		thirdAppSearchHandler.searchWithPreload();
	}
	var onsearchApplog = function(){
		$("#btn_search_thirdapp").click(function() {
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
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});		
		initDatepicker();
		thirdAppSearchHandler.searchWithPreload();
		onsearchApplog();
	}}
}();

function generateAppListHtml(AppList) {
	var AppListHtml = "";		
	if (AppList.length > 0) {	
		console.table(AppList);
		/*for (var i = 0; i < AppList.length;i++) {
			var id = AppList[i].id;
			var cellphone = AppList[i].cellphone;
			var content = AppList[i].content;
			var createDatetime = AppList[i].createDatetime;
			
			SMSListHtml += "<tr class='ChinaNet-Table-Body'>"
		    SMSListHtml +=     "<td><span class='Table-Data-Name'>" + cellphone + "</span></td>";
			SMSListHtml +=     "<td><span class='Table-Data-Name'>" + content + "</span></td>";
			SMSListHtml +=     "<td><span class='Table-Data-Name'>" + createDatetime + "</span></td>";
			SMSListHtml += "</tr>";
		}*/
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}

	return AppListHtml;
}
function searchFailCallBack(data, message) {
	onAlertError('加载短信数据请求提交失败！');
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载短信数据请求提交失败！');
	return false;
}