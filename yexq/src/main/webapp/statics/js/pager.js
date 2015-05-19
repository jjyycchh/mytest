

//////////////////////////////////////////////////////////
// pagination button enable / disable
function disableLnkBtn(btn) {
	if (btn.hasClass("pagination-btn-enable")) {
		btn.removeClass("pagination-btn-enable");
	}
	
	if (!btn.hasClass("pagination-btn-disable")) {
		btn.addClass("pagination-btn-disable");
	}
	//btn.hide();
	btn.css("visibility","hidden");
}

function enableLnkBtn(btn) {
	if (btn.hasClass("pagination-btn-disable")) {
		btn.removeClass("pagination-btn-disable");
	}
	
	if (!btn.hasClass("pagination-btn-enable")) {
		btn.addClass("pagination-btn-enable");
	}
	//btn.show();
	btn.css("visibility","visible");
}

/////////////////////////////////////////////////////////
//search with preload
/*
options_format = {
"listHtmlGeneratorCallBack":null,
"searchFailCallBack": null,
"searchErrorCallBack": null,
"listContainerId": null,
"lbPageNumberId":null,
"previousBtnId":null,
"nextBtnId":null,
"prev_page_ResultSet":null,
"next_page_ResultSet":null,
"curr_page_ResultSet":null,
"search_url": null,
"searchParameter":null //[{key :"", value: ""}]
}
*/

var searchUtil = function(para_listHtmlGeneratorCallBack, 
		para_searchFailCallBack, 
		para_searchErrorCallBack,
		para_preChangePage,
		para_postChangePage,
		para_listContainerId, 
		para_lbPageNumberId,
		para_previousBtnId,
		para_nextBtnId,
		para_searchUrl,
		para_refreshTab){
	var listHtmlGeneratorCallBack = para_listHtmlGeneratorCallBack;
	var searchFailCallBack = para_searchFailCallBack;
	var searchErrorCallBack = para_searchErrorCallBack;
	var preChangePage = para_preChangePage;
	var postChangePage = para_postChangePage;
	var listContainerId = para_listContainerId;
	var lbPageNumberId = para_lbPageNumberId;
	var previousBtnId = para_previousBtnId;
	var nextBtnId = para_nextBtnId;
	var searchUrl = para_searchUrl;
	var prev_page_ResultSet = {"pageNo": "", "records": ""};
	var next_page_ResultSet = {"pageNo": "", "records": ""};
    var curr_page_ResultSet = {"pageNo": "", "records": ""};
	
	var searchParameter = null;
	var isParameterChanged = false;
	
	var refreshTab = para_refreshTab;

	this.convertKeywordsSearchable = function (keywords) {
		if (!isNotEmptyString(keywords)) {
			return "";
		}
		
		var keyword_array = keywords.replace(/;/g, " ").replace(/；/g, " ").split(" ");
		for (var i = 0; i < keyword_array.length;i++){
			if (keyword_array[i].trim() == "")  {
				keyword_array.remove(keyword_array[i]);
			}
			else {
				i++;
			}
		}
		
		return keyword_array.join(" ");
	};
	
	this.setSearchParemeter = function (key, value) {
		if (searchParameter == null) {
			searchParameter = [];
		}
		
		var inParameter = false;
		for (var i = 0; i < searchParameter.length;i++) {
			if (searchParameter[i].key == key) {
				searchParameter[i].value = value;
				inParameter = true;
				break;
			}
		}
		
		if (!inParameter) {
			searchParameter.push({"key": key, "value": value});
		}
		
		isParameterChanged = true;
	};
	
	this.addSearchParameter = function(key, value) {
		if (searchParameter == null) {
			searchParameter = [];
		}
		searchParameter.push({"key": key, "value": value});
		isParameterChanged = true;
	};

	this.getCurrentPage = function() {
		if (curr_page_ResultSet != null) {
			return curr_page_ResultSet.pageNo;
		}
		return null;
	}
	
	function doRefreshCurrentPage() {
		if (curr_page_ResultSet != null && isNotEmptyString(curr_page_ResultSet.pageNo)) {
			doSearchWithPreload(curr_page_ResultSet.pageNo);
		}
		else {
			doSearchWithPreload(null);
		}
	}
	
	function doSearchWithPreload (pageNo) {
/*		if (pageNo == null || pageNo == "") {
			if (curr_page_ResultSet != null && isNotEmptyString(curr_page_ResultSet.pageNo)) {
				pageNo = curr_page_ResultSet.pageNo;
			} 
			else {
				pageNo = 1;
			}
		}*/
		
		if (pageNo == null || pageNo == "") {
			pageNo = 1;
		}
		if (searchParameter != null) {
			for (var i = 0; i < searchParameter.length; i++) {
				if (searchParameter[i].value == null) {
					searchParameter[i].value = "";
				}
			}
		}

		if (pageNo == prev_page_ResultSet.pageNo) {
			if (prev_page_ResultSet != null 
					&& prev_page_ResultSet.pageNo != null
					&& prev_page_ResultSet.records != null) {
				var a_pagination_prev = $("#" + previousBtnId);
				a_pagination_prev.unbind('click');
				disableLnkBtn(a_pagination_prev);
				
				if (preChangePage != null) preChangePage(prev_page_ResultSet, curr_page_ResultSet, next_page_ResultSet);
				
				next_page_ResultSet.pageNo = curr_page_ResultSet.pageNo;
				next_page_ResultSet.records = curr_page_ResultSet.records;
				curr_page_ResultSet.pageNo = prev_page_ResultSet.pageNo;
				curr_page_ResultSet.records = prev_page_ResultSet.records;
				prev_page_ResultSet.pageNo = null;
				prev_page_ResultSet.records = null;
				
				var a_pagination_next = $("#" + nextBtnId);
				a_pagination_next.unbind('click');
				a_pagination_next.click(function() {
					doSearchWithPreload(next_page_ResultSet.pageNo);
				});
				
				$("#" + listContainerId).html(listHtmlGeneratorCallBack(curr_page_ResultSet.records)); 
				$("#" + lbPageNumberId).text(curr_page_ResultSet.pageNo);
				
				if (pageNo-1 > 0) {
					enableLnkBtn(a_pagination_prev); //enable previous button
					doSearch(pageNo - 1, -1);
				}
				else {
					disableLnkBtn(a_pagination_prev); //disable previous button
					a_pagination_prev.unbind('click');
				}
				/*****add******/
				if(next_page_ResultSet.pageNo>1){
					enableLnkBtn(a_pagination_next);
				}
				/*****add******/
				if (postChangePage != null) postChangePage(prev_page_ResultSet, curr_page_ResultSet, next_page_ResultSet);
			}
		}
		else if (pageNo == next_page_ResultSet.pageNo) {
			if (next_page_ResultSet != null 
					&& next_page_ResultSet.pageNo != null
					&& next_page_ResultSet.records != null) {
				var a_pagination_next = $("#" + nextBtnId);
				a_pagination_next.unbind('click');
				disableLnkBtn(a_pagination_next);
				
				if (preChangePage != null) preChangePage(prev_page_ResultSet, curr_page_ResultSet, next_page_ResultSet);
				
				prev_page_ResultSet.pageNo = curr_page_ResultSet.pageNo;
				prev_page_ResultSet.records = curr_page_ResultSet.records;
				curr_page_ResultSet.pageNo = next_page_ResultSet.pageNo;
				curr_page_ResultSet.records = next_page_ResultSet.records;
				next_page_ResultSet.pageNo = null;
				next_page_ResultSet.records = null;
				
				var a_pagination_previous = $("#" + previousBtnId);
				a_pagination_previous.unbind('click');
				a_pagination_previous.click(function() {
					doSearchWithPreload(prev_page_ResultSet.pageNo);
				});
				
				$("#" + listContainerId).html(listHtmlGeneratorCallBack(curr_page_ResultSet.records)); 
				$("#" + lbPageNumberId).text(curr_page_ResultSet.pageNo);
				
				if (pageNo -1 > 0) {
					enableLnkBtn(a_pagination_previous); //enable previous button
				}
				else {
					disableLnkBtn(a_pagination_previous); //disable previous button
				}
				
				doSearch(pageNo + 1, 1);
				
				if (postChangePage != null) {
					postChangePage(prev_page_ResultSet, curr_page_ResultSet, next_page_ResultSet);
				}
			}
		}
		else {
			if (preChangePage != null) {
				preChangePage(prev_page_ResultSet, curr_page_ResultSet, next_page_ResultSet);
			}
			
			if (pageNo - 1 > 0) {
				doSearch(pageNo -1, -1);
			}
			
			doSearch(pageNo, 0);

			if (pageNo - 1 > 0) {
				enableLnkBtn($("#" + previousBtnId)); //enable previous button
				doSearch(pageNo - 1, -1);
			} else {
				disableLnkBtn($("#" + previousBtnId)); //disable previous button
			}
			
			doSearch(pageNo + 1, 1);
		}
		isParameterChanged = false;
	};
	
	this.searchWithPreload = doSearchWithPreload;
	this.refreshCurrentPage = doRefreshCurrentPage;  
	this.clearResultSetpageNo = doClearpageNo;
	function doClearpageNo(){
		/*prev_page_ResultSet.pageNo = null;
		prev_page_ResultSet.records = null;
		next_page_ResultSet.pageNo = null;
		next_page_ResultSet.records = null;
		curr_page_ResultSet.pageNo = null;
		curr_page_ResultSet.records = null;*/
		prev_page_ResultSet = {"pageNo": "", "records": ""};
		next_page_ResultSet = {"pageNo": "", "records": ""};
	    curr_page_ResultSet = {"pageNo": "", "records": ""};
	}
	function searchSuccessCallBack(data, preloadOffset, pageNo) {
		if (preloadOffset == null || preloadOffset == 0) {

			curr_page_ResultSet.pageNo = data.pageNo;
			curr_page_ResultSet.records = data.records;
			$("#" + listContainerId).html(listHtmlGeneratorCallBack(curr_page_ResultSet.records)); 
			$("#" + lbPageNumberId).text(pageNo);
			
			if (postChangePage != null) postChangePage(prev_page_ResultSet, curr_page_ResultSet, next_page_ResultSet);
		}
		else if (preloadOffset < 0) {
			prev_page_ResultSet.pageNo = data.pageNo;
			prev_page_ResultSet.records = data.records;
			
			var a_pagination_previous = $("#" + previousBtnId);
			a_pagination_previous.unbind('click');
			a_pagination_previous.click(function() {
				doSearchWithPreload(pageNo);
			});
			
			if (prev_page_ResultSet != null 
					&& prev_page_ResultSet.records != null
					&& prev_page_ResultSet.records.length > 0 ) {
				enableLnkBtn(a_pagination_previous); //enable previous button
			} else {
				disableLnkBtn(a_pagination_previous); //disable previous button
			}
		}
		else if (preloadOffset > 0) {
			next_page_ResultSet.pageNo = data.pageNo;
			next_page_ResultSet.records = data.records;
			
			var a_pagination_next = $("#" + nextBtnId);
			if (data.records != null && data.records.length > 0) {
				a_pagination_next.unbind('click');
				a_pagination_next.click(function() {
					doSearchWithPreload(pageNo);
				});
			}
			
			if (next_page_ResultSet != null 
					&& next_page_ResultSet.records != null
					&& next_page_ResultSet.records.length > 0) {
				enableLnkBtn(a_pagination_next); //enable previous button		
			} else {				
				disableLnkBtn(a_pagination_next); //disable previous button		
			}
		}
	};

	function doSearch (pageNo, preloadOffset) {
		if (pageNo == null || pageNo == "") {
			pageNo = 1;
		}
		
		if (searchParameter != null) {
			for (var i = 0; i < searchParameter.length; i++) {
				if (searchParameter[i].value == null) {
					searchParameter[i].value = "";
				}
			}
		}
		
		var submitSearchParas = {'pageNo': pageNo};
		if (searchParameter != null) {
			for (var i = 0; i < searchParameter.length; i++) {
				submitSearchParas[searchParameter[i].key] = searchParameter[i].value;
			}
		}

		showLoading();
		$.ajax({
		    type: 'GET',
		    dataType: 'json',
		    url: searchUrl,
		    data: submitSearchParas,
		    contenttype: "application/json; charset=utf-8",
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
		    success: function (data) {
		    	closeLoading();
		        if (data.result != 'FAIL') {
		        	searchSuccessCallBack(data, preloadOffset, pageNo);
		        } else {
		        	searchFailCallBack(data.result, data.message);
		            return false;
		        }
		    },
		    error: function (data) {
		    	closeLoading();
		    	searchErrorCallBack(data.result, data.message);
		        return false;
		    }
		});
	};
};