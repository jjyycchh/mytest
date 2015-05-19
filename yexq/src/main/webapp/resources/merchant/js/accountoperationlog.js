var accountOperationLogSearchHandler = null;
var log_list = null;
var _totalResult_log = 1;

accountOperationLogSearchHandler = new searchUtil(accountOperationLogListHtml, searchFailCallBack, searchErrorCallBack, null, onShowData,
                "log_list_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
                "/system/searchaccountoperationlog.htm", "");

var accountoperationlogApp = function() {
    
    var keywordsSearch = function() {        
        $("div.ChinaNet-Page-Table").show();
        accountOperationLogSearchHandler.clearResultSetpageNo();
        var keywords = accountOperationLogSearchHandler.convertKeywordsSearchable($("#keywords").val());
        accountOperationLogSearchHandler.setSearchParemeter('keywords', keywords);
        accountOperationLogSearchHandler.setSearchParemeter('type', $("#type_select").val());
        accountOperationLogSearchHandler.setSearchParemeter('module_name', $("#module_select").val());
        accountOperationLogSearchHandler.setSearchParemeter('service_name', $("#service_select").val());
        accountOperationLogSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
        accountOperationLogSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));                
        if(onCheckLength(keywords)) {
            accountOperationLogSearchHandler.searchWithPreload();
        } else {
            onAlertError('您输入的关键字太多，请重新输入');
        }
    }
    
    var onsearch = function(){
        $("#btn_search_log").click(function() {
            keywordsSearch();
        });
    }
    
    //初始化账户类型选择框
    var initTypeSelect = function() {
        $('#type_select').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'',text:'不限'},
        	data:[
        	      {value:'',text:'不限'},
        	      {value:'SUPER_MAN',text:'超级管理员'},
        	      {value:'ADMIN',text:'管理员'},
        	      {value:'REPRESENTATIVE',text:'代理商'},
        	      {value:'MERCHANT',text:'商户'},
        	      {value:'MANUFACTURER',text:'设备厂商'},
        	      {value:'DEVICE_ADMIN',text:'设备管理员'}]});
    }
    
    //初始化模块名称选择框
    var initModuleSelect = function() {
        $('#module_select').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'',text:'不限'},
        	data:[
        	      {value:'',text:'不限'},
        	      {value:'account',text:'ACCOUNT'},
        	      {value:'API10',text:'API'},
        	      {value:'device',text:'DEVICE'},
        	      {value:'merchant',text:'MERCHANT'},
        	      {value:'resource',text:'RESOURCE'},
        	      {value:'system',text:'SYSTEM'},
        	      {value:'user',text:'USER'}]});
    }
    
    //初始化Service选择框
    var initServiceSelect = function() {
        $('#service_select').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'',text:'不限'},
        	data:[
        	      {value:'',text:'不限'},
        	      {value:'com.twifi.service.account.AccountService',text:'ACCOUNT'},
        	      {value:'com.twifi.service.device.DeviceService',text:'DEVICE'},
        	      {value:'com.twifi.service.merchant.MerchantService',text:'MERCHANT'},
        	      {value:'com.twifi.service.resource.ResourceService',text:'RESOURCE'},
        	      {value:'com.twifi.service.system.SystemService',text:'SYSTEM'},
        	      {value:'com.twifi.service.user.UserService',text:'USER'}]});
    }
    
    var initDatepicker = function() {
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
        accountOperationLogSearchHandler.searchWithPreload();    
        $("#keywords").keypress(function(e) {
            if(e.which == 13) {
                keywordsSearch();
                return false;
            }
        });
        onsearch();
        initTypeSelect();
        initModuleSelect();
        initServiceSelect();
        initDatepicker();
    }}
}();

function accountOperationLogListHtml(logList) {
    var accountOperationLogListHtml = "";
    var accountOptLog = null;
    log_list = logList;
    if (logList.length > 0) {
    	_totalResult_log = logList.length;
        for (var i = 0; i < logList.length;i++) {
            var id = logList[i].id;
            var accountId = (logList[i].accountId == null) ? "游客" : logList[i].accountId;
            var username = logList[i].username;
            var type = logList[i].type
            var description = logList[i].description;
            var sourceIp = (logList[i].sourceIp == "0:0:0:0:0:0:0:1") ? "本地" : logList[i].sourceIp;
            var sourcePort = logList[i].sourcePort;
            var actionFunc = logList[i].actionFunc;
            var moduleName = logList[i].moduleName;
            var serviceName = logList[i].serviceName;
            var parameter = logList[i].parameter;
            var result = logList[i].result;
            var returnMessage = logList[i].returnMessage;
            var memo = logList[i].memo;
            var createDatetime = logList[i].createDatetime;
            
            accountOperationLogListHtml += "<tr class='ChinaNet-Table-Body'>"
            accountOperationLogListHtml +=     "<td id='log_ip_" + id + "'>" + sourceIp + "</td>";
            accountOperationLogListHtml +=     "<td id='log_action_func_" + id + "'>" + actionFunc + "</td>";
            accountOperationLogListHtml +=     "<td id='log_service_name_" + id + "'>" + serviceName + "</td>"; 
            accountOperationLogListHtml +=     "<td id='log_create_datetime_" + id + "'>" + createDatetime + "</td>"; 
            accountOperationLogListHtml +=     "<td class='ChinaNet-Form-Sheet Width-For-Button' id='btn_log_details_" + id + "'>";
            accountOperationLogListHtml +=     generateLogDetailsBtn(i);
            accountOperationLogListHtml += "</tr>";
        }
    }
    else{
        $(".ChinaNet-Page-Table").hide();
    }
    return accountOperationLogListHtml;
}

function generateLogDetailsBtn(i) {
    var logDetailsBtnHtml = "";
	if (log_list[i].id != null) {
		logDetailsBtnHtml += "<button class='Form-Primary' onclick='javascript:showLogDetails(" + i + ")'>";
		logDetailsBtnHtml += "<span>详情</span>";
		logDetailsBtnHtml += "</button> ";
	}
	return logDetailsBtnHtml;
}

function showLogDetails(i) {
	var logDetailsHtml="";
	logDetailsHtml+="<div style='overflow-y: scroll; height: 600px; width: 800px;' class='UserInfo-Settings-Body'>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>操作账户ID</label>";
	logDetailsHtml+="        <div id='id_details_account_id' class='Form-Item-Label ChinaNet-Col-8'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>操作账户名</label>";
	logDetailsHtml+="        <div id='id_details_username' class='Form-Item-Label ChinaNet-Col-8'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>操作账户类型</label>";
	logDetailsHtml+="        <div id='id_details_account_type' class='Form-Item-Label ChinaNet-Col-8'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>操作IP</label>";
	logDetailsHtml+="        <div id='id_details_source_ip'  class='Form-Item-Label ChinaNet-Col-8'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>操作端口号</label>";
	logDetailsHtml+="        <div id='id_details_source_port' class='Form-Item-Label ChinaNet-Col-8'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>模块名称</label>";
	logDetailsHtml+="        <div id='id_details_module_name'  class='Form-Item-Label ChinaNet-Col-8'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>Action方法</label>";
	logDetailsHtml+="        <div id='id_details_action_func'  class='Form-Item-Label ChinaNet-Col-8'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>Service名称</label>";
	logDetailsHtml+="        <div id='id_details_service_name' class='Form-Item-Label ChinaNet-Col-10'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>参数</label>";
	logDetailsHtml+="        <div id='id_details_paremeter' class='Form-Item-Label ChinaNet-Col-10'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>操作结果</label>";
	logDetailsHtml+="        <div id='id_details_result' class='Form-Item-Label ChinaNet-Col-10'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>返回信息</label>";
	logDetailsHtml+="        <div id='id_details_return_message' class='Form-Item-Label ChinaNet-Col-10'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>生成时间</label>";
	logDetailsHtml+="        <div id='id_details_create_datetime' class='Form-Item-Label ChinaNet-Col-10'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	logDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>操作描述</label>";
	logDetailsHtml+="        <div id='id_details_description'  class='Form-Item-Label ChinaNet-Col-10'></div>";
	logDetailsHtml+="    </div>";
	
	logDetailsHtml+="</div>";
		
	var d_logDetails = dialog({
		id: 'Dailogin:LogInfo',
	    title: '用户操作日志详情',
	    content: logDetailsHtml,
	         
	    okValue: '关闭',
	    ok: function () {},
	    button: [{
	    	value: '上一条',
	        display: (i == 0) ? false : true,
	        callback: function() {
	        	d_logDetails.close().remove();
	            showLogDetails(--i);
	            return false;
	        },
	        autofocus: false
	    }, {
	        display: (i == _totalResult_log-1) ? false : true,
	        value: '下一条',
	        callback: function() {
	        	d_logDetails.close().remove();
	            showLogDetails(++i);
	            return false;
	        },
	        autofocus: false
	    }],
	    width:800,
	    height:600,
	    skin:'ChinaNet-Dialog'
	});
	d_logDetails.showModal();
	setLogDetails(i);
}

function setLogDetails(i) {
	if(log_list[i].type != null) {
		$("#id_details_account_id").text(log_list[i].accountId);
		$("#id_details_username").text(log_list[i].username);
		$("#id_details_account_type").text(getAccountTypeCnName(log_list[i].type));
	} else {
		$("#id_details_account_id").text("未登录用户");
		$("#id_details_username").text("未登录用户");
		$("#id_details_account_type").text("未登录用户");
	}
	if(log_list[i].sourceIp == "0:0:0:0:0:0:0:1") {
		$("#id_details_source_ip").text("本地");
	} else {
		$("#id_details_source_ip").text(log_list[i].sourceIp);
	}
	$("#id_details_source_port").text(log_list[i].sourcePort);
	$("#id_details_module_name").text(log_list[i].moduleName);
	$("#id_details_action_func").text(log_list[i].actionFunc);
	$("#id_details_service_name").text(log_list[i].serviceName);
	$("#id_details_parameter").text(log_list[i].paremeter);
	$("#id_details_result").text(log_list[i].result);
	$("#id_details_return_message").text(log_list[i].returnMessage);
	$("#id_details_create_datetime").text(log_list[i].createDatetime);
	$("#id_details_description").text(log_list[i].description);

	if (i == 0) {
		$("#btn_prev").hide();
	} else if (i == _totalResult_log-1) {
		$("#btn_next").hide();
	} else {
		$("#btn_prev").show();
		$("#btn_next").show();
	}
}

function onShowData(){
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
    onAlertError('加载设备数据请求提交失败！');
    $(".ChinaNet-Page-Table").hide();
    return false;
}
        
function searchErrorCallBack(data, message) {
    onAlertError('加载设备数据请求提交失败！');
    $(".ChinaNet-Page-Table").hide();    
    return false;
}