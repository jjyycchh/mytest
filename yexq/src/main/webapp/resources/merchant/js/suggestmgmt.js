var suggestSearchHandler = null;
suggestSearchHandler = new searchUtil(suggestListHtml, searchFailCallBack, searchErrorCallBack, null, null,
				"suggest_list_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchsuggest.htm", "");

var suggestsearchApp = function() {
	var keywordsSearch = function() {	
		$("div.ChinaNet-Page-Table").show();
		suggestSearchHandler.clearResultSetpageNo();
		var keywords = suggestSearchHandler.convertKeywordsSearchable($("#keywords").val());
		suggestSearchHandler.setSearchParemeter('keywords', keywords);
		suggestSearchHandler.setSearchParemeter('startdate', $("#startdate").val());
		suggestSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
		suggestSearchHandler.searchWithPreload();
		if(onCheckLength(keywords)) {
			suggestSearchHandler.searchWithPreload();
		} else {
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	
	var onSearchSuggest = function(){
		$("#btn_search_suggest").click(function() {
			//searchTotalDevices();
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
		suggestSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		initDatepicker();
		onSearchSuggest();
	}}
}();

function suggestListHtml(suggestList) {
	var suggestListHtml = "";
	if (suggestList.length > 0) {			
		for (var i = 0; i < suggestList.length;i++) {
			var description = suggestList[i].description;
			var mac = suggestList[i].mac;
			var cellphone = suggestList[i].cellphone;
			var createDatetime = suggestList[i].createDatetime;
			
			suggestListHtml += "<tr class='ChinaNet-Table-Body'>";
			/*
			suggestListHtml +=   "<td>" ;
			suggestListHtml +=     "<span class='Table-Data-Name' id='mac_" + i + "'>" + mac + "</span>";
			suggestListHtml +=   "</td>";
            */
			suggestListHtml +=   "<td>" ;
            suggestListHtml +=     "<span class='Table-Data-Text' id='cellphone_" + i + "'>" + (cellphone || "匿名") + "</span>";
			suggestListHtml +=   "</td>";
			
			suggestListHtml +=   "<td>" ;
			suggestListHtml +=     "<span class='Table-Data-Text' id='description_" + i + "'>" + description + "</span>";
			suggestListHtml +=   "</td>";
			
			suggestListHtml +=   "<td>" ;
			suggestListHtml +=     "<span class='Table-Data-Text' id='create_datetime_" + i + "'>" + createDatetime + "</span>";
			suggestListHtml +=   "</td>";
			
			suggestListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	suggestListHtml += "</table>";	
	return suggestListHtml;
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