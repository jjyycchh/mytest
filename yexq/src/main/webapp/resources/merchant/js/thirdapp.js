var thirdAppSearchHandler = null;
var mythirdAppSearchHandler = null;
var search_thirdApp_keyword = null;
	
thirdAppSearchHandler = new searchUtil(generateAppListHtml, searchFailCallBack, searchErrorCallBack, null, null,
			"App_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next", 
			"/authentication/merchantthirdapplication.htm","");
mythirdAppSearchHandler = new searchUtil(generatemyAppListHtml, searchFailCallBack, searchErrorCallBack, null, null,
		"App_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next", 
		"/authentication/merchanthasthirdapplication.htm","");
var thirdApplicationpageApp = function() {
	
	var keywordsSearch = function() {
		$("div.ChinaNet-Page-Table").show();
		thirdAppSearchHandler.clearResultSetpageNo();
        var keywords = thirdAppSearchHandler.convertKeywordsSearchable($("#keywords").val());       
        thirdAppSearchHandler.setSearchParemeter('keywords', keywords);
		thirdAppSearchHandler.setSearchParemeter('startdate', $("#startdate").val());
		thirdAppSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
		app_Type = $("#appType").val();
		thirdAppSearchHandler.setSearchParemeter('type', app_Type);
		if(onCheckLength(keywords)){
        	thirdAppSearchHandler.searchWithPreload();
        }else{
            onAlertError('您输入的关键字太多，请重新输入');
        }		
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
	var initAppTypeSelect = function(){
		$.ajax({
			url:'/authentication/getthirdapplicationtype.htm',
			type:'GET',
			dataType:'json',
			async:false,
			success:function(data){				
				if(data.result=='OK'){
					_typeData = {dataList:[{'value':0,'text':'全部'}], data:{}};
					for(i=0;i<data.data.length;i++){
						_typeData.dataList.push({value:data.data[i].id,text:data.data[i].type});
						_typeData.data[data.data[i].id] = data.data[i].type;
					}
					//console.log(_typeData);
					$('#appType').xiSelect({offsetSize:[0,3,0,3],data:_typeData.dataList,defaultData:{value:0,text:'全部'}});
					/*if(_initSiteID){
						$('#siteid').xiSelect({offsetSize:[0,3,0,3],data:_siteData.dataList,defaultData:{value:_initSiteID,text:_siteData.data[_initSiteID]}});
					}*/
				}
			}
		});
	}
	return {init:function(){	
		thirdAppSearchHandler.searchWithPreload();
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});		
		initDatepicker();
		initAppTypeSelect();
		onsearchApplog();
	},
	MyApp:function(){
		mythirdAppSearchHandler.searchWithPreload();
	}}
}();

function generateAppListHtml(AppList) {
	var AppListHtml = "";		
	if (AppList.length > 0) {	
		//console.table(AppList);
		for (var i = 0; i < AppList.length;i++) {
			var name = AppList[i].name;
			var version  = AppList[i].version;
			var description  = AppList[i].description ;
			var createDatetime = AppList[i].createDatetime;
			var id = AppList[i].id;
			var status =  AppList[i].merchantStatus;
			/*var statusStr = '';
			if (status == "1"){
				statusStr = '已开通';
			}else{
				statusStr = '未开通';
			}*/
			var phone = AppList[i].phone;
			//phone='18888888888';
			if(isNotEmptyString(phone)){
				phone = "(服务电话："+phone+")";
			}
			var thumbpath = isNotEmptyString(AppList[i].thumbPath)?AppList[i].thumbPath:'/statics/img/no-image.png';
			AppListHtml +='<div class="App-list-Body">' +
		  					' <div class="App-Thumb">'+
		  					' 	<div class="Overly-Top-Left"></div>' +
		  					' 	<div class="Overly-Top-Right"></div>' +
		  					' 	<div class="Overly-Bottom-Left"></div>' +
		  					' 	<div class="Overly-Bottom-Right"></div>' +
		  					' 	<img id="AppThumbID" src="'+thumbpath+'">' +
		  					' </div>' +
		
		  					' <div class="App-content">' +
		  					' 	<p>' +description+'</p>' +		  					               
		  					' </div>' +
		  					' <div class="App-Button">' +
		  					' 	<span class="pull-right buttons">' + generateOptBtn(id, status,0) +
		  					/*' 	<button class="btn btn-sm btn-success"> 一键开通</button>' +
		  					' 	<button class="btn btn-sm btn-primary"> 进入应用</button>' +
		  					' 	<button class="btn btn-sm btn-warning"> 卸载应用</button>' +*/
		  					' 	</span>' +
		  					' 	<span class="pull-left Data-Name">' +
		  					name +
		  					' 	&nbsp;&nbsp;</span>' +
		  					' 	<span class="Data-phone">' +
		  					phone +
		  					'  	</span>' +
		  					'  </div>' +
		  					' </div>';
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}

	return AppListHtml;
}
function generatemyAppListHtml(AppList) {
	var AppListHtml = "";		
	if (AppList.length > 0) {	
		//console.table(AppList);
		for (var i = 0; i < AppList.length;i++) {
			var name = AppList[i].name;
			var version  = AppList[i].version;
			var description  = AppList[i].description ;
			var createDatetime = AppList[i].createDatetime;
			var id = AppList[i].id;
			var status =  AppList[i].merchantStatus;
			/*var statusStr = '';
			if (status == "1"){
				statusStr = '已开通';
			}else{
				statusStr = '未开通';
			}*/
			var phone = AppList[i].phone;
			//phone='18888888888';
			if(isNotEmptyString(phone)){
				phone = "(服务电话："+phone+")";
			}
			var thumbpath = isNotEmptyString(AppList[i].thumbPath)?AppList[i].thumbPath:'/statics/img/no-image.png';			
			AppListHtml +='<div class="App-list-Body">' +
		  					' <div class="App-Thumb">'+
		  					' 	<div class="Overly-Top-Left"></div>' +
		  					' 	<div class="Overly-Top-Right"></div>' +
		  					' 	<div class="Overly-Bottom-Left"></div>' +
		  					' 	<div class="Overly-Bottom-Right"></div>' +
		  					' 	<img id="AppThumbID" src="'+thumbpath+'">' +
		  					' </div>' +
		
		  					' <div class="App-content">' +
		  					' 	<p>' +description+'</p>' +		  					               
		  					' </div>' +
		  					' <div class="App-Button">' +
		  					' 	<span class="pull-right buttons">' + generateOptBtn(id, status,1) +
		  					' 	</span>' +
		  					' 	<span class="pull-left Data-Name">' +
		  					name +
		  					' 	&nbsp;&nbsp;</span>' +
		  					' 	<span class="Data-phone">' +
		  					phone +
		  					'  	</span>' +
		  					'  </div>' +
		  					' </div>';
		}
	}
	else{
		AppListHtml += '您还没有开通任何应用,'+'<a href="/authentication/merchantthirdapplicationpage26.htm" class="initAjax">进入应用商城</a>';
		$(".ChinaNet-Page-Table").hide();
	}

	return AppListHtml;
}
function generateOptBtn(appID, status, flag) {
	var OptBtnHtml = "";
	if (appID != null) {
		if (status == "1") {			
			//OptBtnHtml += "<button class='btn btn-sm btn-primary' onclick='javascript:openAppUrl(\"" + appID + "\");'> 进入应用</button>";
			OptBtnHtml += '<a href="about:blank" class="Action-Primary" target="'+appID+'" onclick="openAppUrl(\''+appID+'\');">进入应用</a>';
			OptBtnHtml += '<a href="javascript:void(0)" class="Action-disable" onclick="javascript:merchantDelthirdApp(\'' + appID + '\',\'' + flag + '\');">卸载应用</a>';
		}/*else if(status == "2"){
			OptBtnHtml += "<button class='Form-Primary' onclick='javascript:merchantAddthirdApp(0);'><span>登录</span></button>";
		}*/else {
			OptBtnHtml += '<a href="javascript:void(0)" class="Action-wrang" onclick="javascript:merchantAddthirdApp(\'' + appID + '\');"> 一键开通</a>';
			//OptBtnHtml += "<button class='Form-Important' ><span>开通</span></button>";
		}
	}
	return OptBtnHtml;
}
function openAppUrl(Appid){
	$.ajax({
        type : 'GET',
        dataType : 'json',
        url : '/authentication/getloginurl.htm',
        data : {
            'id' : Appid
        },
        success : function(data) {
            if (data.result != 'FAIL') {
            	var goUrl = data.dataurl;
                if(goUrl.indexOf('?')>-1){
                	goUrl += '&';                	
                }else{
                	goUrl += '?';
                }
                goUrl += 'merchantid='+data.merchantid;
            	goUrl += '&type='+data.type;
            	goUrl += '&timestamp='+data.timestamp;
            	goUrl += '&token='+data.token;
            	window.open(goUrl, Appid);
            	//document.getElementById('openAppWin').href = goUrl;
            	//window.open(goUrl, 'test');
                //console.log(goUrl);
            } else {
                onAlertError("登录失败!");
            }
        },
        error : function() {
            onAlertError("登录失败!");
        }
    });
}
function confirmAddthirdApp(Appid){
	showLoading();
    $.ajax({
        type : 'POST',
        dataType : 'json',
        url : '/authentication/merchantaddthirdapplication.htm',
        data : {
            'id' : Appid
        },
        success : function(data) {
            if (data.result != 'FAIL') {
                thirdAppSearchHandler.refreshCurrentPage();
            } else {
                onAlertError("开通应用失败!");
            }
            closeLoading();
        },
        error : function() {
            onAlertError("开通应用失败!");
            closeLoading();
        }
    });
}
function confirmDelthirdApp(Appid,flag){
	showLoading();
    $.ajax({
        type : 'POST',
        dataType : 'json',
        url : '/authentication/merchantdelthirdapplication.htm',
        data : {
            'thirdappid' : Appid
        },
        success : function(data) {
            if (data.result != 'FAIL') {
            	onAlertError("卸载应用成功!");
            	console.log(flag);
            	if(flag==0){
            		thirdAppSearchHandler.refreshCurrentPage();
            	}else{
            		mythirdAppSearchHandler.refreshCurrentPage();
            	}
                
            } else {
                onAlertError("卸载应用失败!");
            }
            closeLoading();
        },
        error : function() {
            onAlertError("卸载应用失败!");
            closeLoading();
        }
    });
}
function merchantAddthirdApp(Appid){
	onConfirmDialog('<p>您确定开通该第三方应用吗？</p>',function(){confirmAddthirdApp(Appid)},function(){});
}
function merchantDelthirdApp(Appid,flag){
	onConfirmDialog('<p>您确定卸载该第三方应用吗？</p>',function(){confirmDelthirdApp(Appid,flag)},function(){});
}
function searchFailCallBack(data, message) {
	onAlertError('加载第三方应用数据请求提交失败！');
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载第三方应用数据请求提交失败！');
	return false;
}