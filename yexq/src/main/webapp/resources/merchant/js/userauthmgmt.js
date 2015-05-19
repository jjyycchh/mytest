var authSearchHandler = null;
var auth_list = null;
var _totalResult_auth = 1;
authSearchHandler = new searchUtil(generateAuthListHtml, searchFailCallBack, searchErrorCallBack, null, onShowAuthData,
				"authenlist_body", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				"/system/searchauthentication.htm", "");

var userauthmgmtApp = function() {
	
	var keywordsSearch = function() {		
		//var keywords = ($("#moduleSelect").val() == "all") ? null : $("#moduleSelect").val();
		$("div.ChinaNet-Page-Table").show();
		authSearchHandler.clearResultSetpageNo();
		var keywords = authSearchHandler.convertKeywordsSearchable($("#keywords").val());
		authSearchHandler.setSearchParemeter('keywords', keywords);
		authSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		authSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));				
		//authSearchHandler.searchWithPreload();
		if(onCheckLength(keywords)){
			authSearchHandler.searchWithPreload();
		}
		else{
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	
	var onsearchAuth = function() {
		$("#btn_Search_authen").click(function() {
			keywordsSearch();
		});
	}
	
	/*var initModuleSelect = function() {
        $('#moduleSelect').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'all',text:'全部'},
        	data:[
        	      {value:'all',text:'全部'},
        	      {value:'account',text:'account'},
        	      {value:'device',text:'device'},
        	      {value:'merchant',text:'merchant'},
        	      {value:'system',text:'system'},
        	      {value:'user',text:'user'},
        	      {value:'api',text:'api device'},]})
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
		authSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		
		initDatepicker();
		onsearchAuth();
		//initModuleSelect();
	}}
}();

function generateAuthListHtml(authList) {
	auth_list = authList;
	var authListHtml = "";		
	if (authList.length > 0) {			
		_totalResult_auth = authList.length;
		for (var i = 0; i < authList.length;i++) {
			var authid = authList[i].id;
			var offlineDatetime = authList[i].offlineDatetime;
			var totalUpTraffic = authList[i].totalUpTraffic;
			var totalDwTraffic = authList[i].totalDwTraffic;
         	var mac = authList[i].mac;

			authListHtml += "<tr class='ChinaNet-Table-Body'>";
			authListHtml += "<td id='user_mac_" + authid + "'>" + mac + "</td>";
			authListHtml += "<td id='user_offline_datetime" + authid + "'>" + offlineDatetime + "</td>"; 
			authListHtml += "<td id='user_up_traffic_" + authid + "'>" + trafficFormatter(totalUpTraffic) + "</td>";
			authListHtml += "<td id='user_dw_traffic_" + authid + "'>" + trafficFormatter(totalDwTraffic) + "</td>";
			authListHtml += "<td id='auth_opt_btn_" + authid + "' class='ChinaNet-Form-Sheet Width-For-Button'>";
			authListHtml += generateAuthDetailsBtn(i);
			authListHtml += "</td>";
			authListHtml += "</tr>";
		}
	}else{
		$(".ChinaNet-Page-Table").hide();
	}
	return authListHtml;
}

function generateAuthDetailsBtn(i) {
	var authDetailsBtnHtml = "";
	if (auth_list[i].id != null) {
		authDetailsBtnHtml += "<button class='Form-Primary' onclick='javascript:showauthDetails(" + i + ")'>";
		authDetailsBtnHtml += "<span>详情</span>";
		authDetailsBtnHtml += "</button> ";
	}
	return authDetailsBtnHtml;
}

function showauthDetails(i) {
	var authDetailsHtml="";
	authDetailsHtml+="<div class='UserInfo-Settings-Body'>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>MAC地址</label>";
	authDetailsHtml+="        <div id='id_auth_mac' class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>终端类型</label>";
	authDetailsHtml+="        <div id='id_auth_term_type'  class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>浏览器类型</label>";
	authDetailsHtml+="        <div id='id_auth_brow_type' class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>认证类型</label>";
	authDetailsHtml+="        <div id='id_auth_type'  class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>手机号码</label>";
	authDetailsHtml+="        <div id='id_auth_cellphone' class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>短信内容</label>";
	authDetailsHtml+="        <div id='id_auth_sms'  class='Form-Item-Label ChinaNet-Col-10'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>上行流量</label>";
	authDetailsHtml+="        <div id='id_auth_up_traffic'  class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>下行流量</label>";
	authDetailsHtml+="        <div id='id_auth_dw_traffic'  class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>创建时间</label>";
	authDetailsHtml+="        <div id='id_create_datetime'  class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>下线时间</label>";
	authDetailsHtml+="        <div id='id_offline_datetime'  class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>更新时间</label>";
	authDetailsHtml+="        <div id='id_modified_datetime'  class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>当前状态</label>";
	authDetailsHtml+="        <div id='id_status'  class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	authDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>token</label>";
	authDetailsHtml+="        <div id='id_auth_token'  class='Form-Item-Label ChinaNet-Col-5'></div>";
	authDetailsHtml+="    </div>";
	authDetailsHtml+="</div>";
		
	var d_AuthDetails = dialog({
		id: 'Dailogin:AuthenInfo',
	    title: '认证详情',
	    content: authDetailsHtml,
	         
	    okValue: '关闭',
	    ok: function () {},
	    button: [{
	    	value: '上一条',
	        display: (i == 0) ? false : true,
	        callback: function() {
	        	d_AuthDetails.close().remove();
	        	showauthDetails(--i);
	            return false;
	        },
	        autofocus: false
	    }, {
	        display: (i == _totalResult_auth-1) ? false : true,
	        value: '下一条',
	        callback: function() {
	        	d_AuthDetails.close().remove();
	        	showauthDetails(++i);
	            return false;
	        },
	        autofocus: false
	    }],
	    width:800,
	    height:600,
	    skin:'ChinaNet-Dialog'
	});
	d_AuthDetails.showModal();
	viewAuthDetails(i);
}

function viewAuthDetails(i) {
	$("#id_auth_mac").text(auth_list[i].mac)
	$("#id_auth_term_type").text(auth_list[i].terminalType)
	$("#id_auth_brow_type").text(auth_list[i].browserType)
	$("#id_auth_type").text(auth_list[i].authType)
	$("#id_auth_cellphone").text(auth_list[i].cellphone)
	$("#id_auth_sms").text(auth_list[i].content)
	$("#id_auth_up_traffic").text(trafficFormatter(auth_list[i].totalUpTraffic))
	$("#id_auth_dw_traffic").text(trafficFormatter(auth_list[i].totalDwTraffic))
	$("#id_create_datetime").text(auth_list[i].createDatetime)
	$("#id_offline_datetime").text(auth_list[i].offlineDatetime)
	$("#id_modified_datetime").text(auth_list[i].modifiedDatetime)
	$("#id_status").text(auth_list[i].status)
	$("#id_auth_token").text(auth_list[i].token)
}

function onShowAuthData(){
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

function trafficFormatter(val) {
	if (val > 1024*1024*1024)
	  return Math.round(val / (1024*1024*1024)) + " GB";
	else if (val > 1024*1024)
      return Math.round(val / (1024*1024)) + " MB";
    else if (val > 1024)
      return Math.round(val / 1024) + " KB";
    else
      return val + " B";
}

function searchFailCallBack(data, message) {
	onAlertError('加载认证数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载认证数据请求提交失败！');
	$(".ChinaNet-Page-Table").hide();
	return false;
}