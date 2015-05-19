var reportSearchHandler = null;
var report_list = null;
var _totalResult = 1;
reportSearchHandler = new searchUtil(generateReportListHtml, searchFailCallBack, searchErrorCallBack, null, null,
				"report_list_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchreport.htm", "");

var reportsearchApp = function() {
	var keywordsSearch = function() {	
		$("div.ChinaNet-Page-Table").show();
		reportSearchHandler.clearResultSetpageNo();
		var keywords = reportSearchHandler.convertKeywordsSearchable($("#keywords").val());
		reportSearchHandler.setSearchParemeter('keywords', keywords);
		reportSearchHandler.setSearchParemeter('type', $("#type_select").val());
		reportSearchHandler.setSearchParemeter('startdate', $("#startdate").val());
		reportSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
		reportSearchHandler.searchWithPreload();
		if(onCheckLength(keywords)) {
			reportSearchHandler.searchWithPreload();
		} else {
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	
	var onSearchReport = function(){
		$("#btn_search_report").click(function() {
			//searchTotalDevices();
			keywordsSearch();
		});
	}
	
	var initTypeSelect = function() {
        $('#type_select').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'',text:'全部'},
        	data:[
        	      {value:'',text:'全部'},
        	      {value:'1',text:'恶意账号'},
        	      {value:'2',text:'恶意网址'},
        	      {value:'3',text:'恶意操作'},
        	      {value:'9',text:'其它'}]})
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
		reportSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		initDatepicker();
		onSearchReport();
		initTypeSelect();
	}}
}();

function generateReportListHtml(reportList) {
	var generateReportListHtml = "";
	report_list = reportList;
	if (reportList.length > 0) {			
		for (var i = 0; i < reportList.length;i++) {
			var visiousId = reportList[i].id;
			var visiousType = reportList[i].jbType;
			var visiousTypeCn = "";
			var visiousAccount = reportList[i].visiousAccount;
			var visiousUrl = reportList[i].visiousUrl;
			var visiousDescription = reportList[i].jbDescription;
			var visiousCreateDatetime = reportList[i].createDatetime;
			var reportAccountId = reportList[i].reportAccountId;
			var reportAccountUsername = reportList[i].reportAccountUsername;
			var reportAccountMerchantName = reportList[i].reportAccountMerchantName;
			var reportAccountFullname = reportList[i].reportAccountFullname;
			var reportAccountType = reportList[i].reportAccountType;
			
			if(visiousType == 1) {
				visiousTypeCn = "恶意账号举报";
			} else if(visiousType == 2) {
				visiousTypeCn = "恶意网址举报";
			} else if(visiousType == 3) {
				visiousTypeCn = "恶意操作举报";
			} else {
				visiousTypeCn = "其他举报";
			}
			
			if(visiousDescription.length > 25) {
				visiousDescription = visiousDescription.substr(0, 25) + "...";
			}
			
			generateReportListHtml += "<tr class='ChinaNet-Table-Body'>";
			
			generateReportListHtml += 	"<td>" ;
			generateReportListHtml +=     "<span class='Table-Data-Name' id='report_account_" + i + "'>" + reportAccountUsername + "</span>";
			generateReportListHtml +=   "</td>";
			
			generateReportListHtml += 	"<td>" ;
			generateReportListHtml +=     "<span class='Table-Data-Name' id='report_type_" + i + "'>" + visiousTypeCn + "</span>";
			generateReportListHtml +=   "</td>";
			
			generateReportListHtml += 	"<td>" ;
			generateReportListHtml +=     "<span class='Table-Data-Name' id='report_description_" + i + "'>" + visiousDescription + "</span>";
			generateReportListHtml +=   "</td>";
			
			generateReportListHtml += 	"<td>" ;
			generateReportListHtml +=     "<span class='Table-Data-Name' id='create_datetime" + i + "'>" + visiousCreateDatetime + "</span>";
			generateReportListHtml +=   "</td>";
			
			generateReportListHtml +=   "<td class='ChinaNet-Form-Sheet Width-For-Button' id='details_btn_" + i + "'>";
			generateReportListHtml +=     "<button class='Form-Primary' onclick='javascript:showReportDetails(" + i + ")'>";
			generateReportListHtml +=       "<span>详情</span>";
			generateReportListHtml +=     "</button>";
			generateReportListHtml +=   "</td>";
			
			generateReportListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	generateReportListHtml += 	"</table>";	
	return generateReportListHtml;
}

function showReportDetails(i) {
	var reportDetailsHtml = "";
	reportDetailsHtml += "<div style='overflow-y: scroll; height: 600px; width: 800px;' class='UserInfo-Settings-Body'>";
	
	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>举报类型</label>";
	reportDetailsHtml += "      <div id='details_report_type' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";
	
	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>举报日期</label>";
	reportDetailsHtml += "      <div id='details_report_create_datetime' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";

	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>举报人</label>";
	reportDetailsHtml += "      <div id='details_report_report_username' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";
	
	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>举报人名称</label>";
	reportDetailsHtml += "      <div id='details_report_report_fullname' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";
	
	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>举报人角色</label>";
	reportDetailsHtml += "      <div id='details_report_report_account_type' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";
	
	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>被举报账号</label>";
	reportDetailsHtml += "      <div id='details_report_visious_username' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";
	
	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>被举报账号名称</label>";
	reportDetailsHtml += "      <div id='details_report_visious_fullname' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";
	
	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>被举报账号类型</label>";
	reportDetailsHtml += "      <div id='details_report_visious_account_type' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";
	
	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>被举报网址</label>";
	reportDetailsHtml += "      <div id='details_report_visious_url' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";
	
	reportDetailsHtml += "  <div class='ChinaNet-Form-Sheet'>";
	reportDetailsHtml += "      <label class='Form-Item-Title ChinaNet-Col-2'>举报说明</label>";
	reportDetailsHtml += "      <div id='details_report_visious_description' class='Form-Item-Label ChinaNet-Col-8'></div>";
	reportDetailsHtml += "  </div>";
	
	reportDetailsHtml += "</div>";
	
	var d_ReportDetails = dialog({
		id: 'Dailogin:ReportDetails',
	    title: '举报详情',
	    content: reportDetailsHtml,
	    okValue: '关闭',
	    ok: function () {},
	    width:800,
	    height:600,
	    skin:'ChinaNet-Dialog'
	});
	d_ReportDetails.showModal();
	viewReportDetails(i);
}

function viewReportDetails(i) {
	var reportType = report_list[i].jbType;
	var reportTypeCn = "";
	var reportCreateDatetime = report_list[i].createDatetime;
	var reportUsername = report_list[i].reportAccountUsername;
	var reportMerchantName = "";
	var reportAccountType = report_list[i].reportAccountType;
	var visiousUsername = report_list[i].visiousAccount;
	var visiousFullname = "";
	var visiousAccountType = "";
	var visiousUrl = report_list[i].visiousUrl;
	var visiousDescription = report_list[i].jbDescription;
	
	if(report_list[i].reportAccountMerchantName != "") {
		reportFullname = report_list[i].reportAccountMerchantName;
	} else if(report_list[i].reportFullname != "") {
		reportFullname = report_list[i].reportAccountFullname;
	}
	
	if(reportType == 1) {
		reportTypeCn = "恶意账号举报";
	} else if(reportType == 2) {
		reportTypeCn = "恶意网址举报";
	} else if(reportType == 3) {
		reportTypeCn = "恶意操作举报";
	} else {
		reportTypeCn = "其他举报";
	}
	
	$("#details_report_type").text(reportTypeCn);
	$("#details_report_create_datetime").text(reportCreateDatetime);
	$("#details_report_report_username").text(reportUsername);
	$("#details_report_report_fullname").text(reportFullname);
	$("#details_report_report_account_type").text(getAccountTypeCnName(reportAccountType));
	$("#details_report_visious_username").text(visiousUsername);
	$("#details_report_visious_url").text(visiousUrl);
	$("#details_report_visious_description").text(visiousDescription);
	
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