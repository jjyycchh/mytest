var msg_list=null;
var _preMsgCount = 0;
var messageApp = function(){
	this.autoRefreshHintTimer = null;
	this.autoRefreshHintInterval = 10 * 1000;
	this.twinkleTimeOffSet = 10 * 1000;
	this.twinkleDuration = 60 * 1000;	
	this.hintContainerId = "showmsg";
	this.twinkleTimer = null;
	this.twinkleInterval = 1 * 1000;
	this.contextPath = null;
	this.isInited = false;
	var MsgSearchHandler = null;
	var search_Msg_keyword = null;
	
	MsgSearchHandler = new searchUtil(renderMsgLst, searchFailCallBack, showMsgErrorCallBack, null, null,
			"inMsglist", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
			"/system/getmessages.htm","");
	
	var keywordsSearch = function(isGetCount,isRead,isInbox) {		
		MsgSearchHandler.clearResultSetpageNo();
		$("div.ChinaNet-Page-Table").show();
		MsgSearchHandler.setSearchParemeter('isgetcount', isGetCount);		
		MsgSearchHandler.setSearchParemeter('isread', $("#ReadStatus").val());
		MsgSearchHandler.setSearchParemeter('mailbox', 'in');
		MsgSearchHandler.setSearchParemeter('startdate', $("#startdate").val());
		MsgSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
		MsgSearchHandler.setSearchParemeter('isflaged', "");
		MsgSearchHandler.setSearchParemeter('keywords', "");
		MsgSearchHandler.searchWithPreload();
	}
	var initReadSelect = function(){
        $('#ReadStatus').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:"",text:"全部信息"},data:[{value:'',text:'全部信息'},{value:'true',text:'已读信息'},{value:'false',text:'未读信息'}]})
    }
	var refreshHint = function() {
		SearchMessages(true, false, true, refreshHintSuccessCallBack, refreshHintErrorCallBack);
	//	keywordsSearch(true,false,true)
				
	};
	var showMsg = function(){
		 if(__CONTEXT_MERCHANT_CODE =="MERCHANT" || __CONTEXT_MERCHANT_CODE == "REPRESENTATIVE"){
			 $("#sentmsg").hide();
			 $("#savemsg").hide();
		 }
		// SearchMessages(false, null, true, showMsgSuccessCallBack, showMsgErrorCallBack);// 收件箱	
		 keywordsSearch(false,null,true);
	}
	var onsearchMessage = function(){
		$("#btn_search_smsMsg").click(function() {
		 // SearchMessages(false, null, true, showMsgSuccessCallBack, showMsgErrorCallBack);
			keywordsSearch(false,null,true);
		});
	}	
	var showMsgErrorCallBack = function(data,message) {
		onAlertError(message);
		return false;
	};
	function searchFailCallBack(result, message) {
		onAlertError(message);
		return false;
	}
	var SearchMessages = function(isGetCount, isRead, isInbox, successCallBack, errorCallBack) {
		$.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/system/getmessages.htm', 
            data: {
            	"mailbox" : isInbox ? "in" : "out",
            	"keywords" : "",
            	"startdate" : $("#startdate").val(),
            	"enddate" : addoneday($("#enddate").val()),
            	"isread" : isRead,
            	"isflaged" : "",
            	"isgetcount" : isGetCount
            },
            success: function (data) { successCallBack(data); },
            error: function (data) { errorCallBack(data); }
		});
	};
	
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
		//alert('aaaaaaaaa');
		refreshHint();
		showMsg(); //收件箱
		initDatepicker();
		onsearchMessage();
		initReadSelect();
	},
	getmailcount:function(){
		//alert('aaaaaaaaaaaa');
		refreshHint();
	}}
}();

var deleteMsg = function(removeIcon,isread) {
	var msgId = removeIcon.id.substring("delete_".length);
	DeleteMessage(msgId, deleteMsgSuccessCallBack, deleteMsgErrorCallBack, isread);
};
var deleteMsgSuccessCallBack = function(data) {	
	$.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/system/getmessages.htm', 
        data: {
        	"mailbox" : "in",
        	"keywords" : "",
        	"startdate" : "",
        	"enddate" : "",
        	"isread" : null,
        	"isflaged" : "",
        	"isgetcount" : false
        },
        success: function (data) { showSentBoxMsgSuccessCallBack(data); },
        error: function (data) { showMsgErrorCallBack(data); }
	});
};
var deleteMsgErrorCallBack = function(data) {};
var DeleteMessage = function(msgId, successCallBack, errorCallBack, isread) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/system/deletemessage.htm", 
        data: {
        	"messageid" : msgId
        },
        success: function (data) {        	
        	if(!isread){
        		//console.log(isread);
        		showMessageHint(_preMsgCount - 1);
        		_preMsgCount = _preMsgCount - 1;
        	}
        	successCallBack(data);
        	
        },
        error: function (data) {
        	errorCallBack(data);
        }
	});
};

var showSentBoxMsgSuccessCallBack = function(data) {
	if (data.result == 'OK') {	
		var msgLstHtml = renderMsgLst(data.records, false);		
		var divMsgLst = $("#inMsglist");	
		divMsgLst.html(msgLstHtml);		
	}
};	
var showMsgErrorCallBack = function(data) {
	//do nothing
};

var renderMsgLst = function (messages, isSentbox) {	
	msg_list =messages;	
	var msgItemHtml = "";
	if (messages != null && messages.length > 0) {
		for (var i =0; i < messages.length; i++) {
			var message = messages[i];
			var id = message.id;
			var senderId = message.senderId;
			var receiverId = message.receiverId;
			var title = message.title;
			
			var briefTitle = title;
			if (briefTitle != null && briefTitle.length > 15) {
				briefTitle = briefTitle.substring(0,15) ;
			}
			
			var content = message.content;
							
			var briefContent = content;
			if (briefContent != null && briefContent.length > 30) {
				briefContent = briefContent.substring(0, 30);
			}
			
			var isRead = message.isRead;
			var isFlaged = message.isFlaged;
			
			var createDatetime = message.createDatetime;
			var parentMsgId = message.parentMsgId;
			var fontWeight = !isRead ? "bold" : "normal";
			var color = !isRead ? "#666666" : "#999999";
			var senderName = (isNotEmptyString(message.senderFullName) ? message.senderFullName : message.senderUserName);
			var receiverNames = "";
			var receiverFullNames = "";
			var isAbbreviation = false;
			if (message.receiverInfos != null && message.receiverInfos.length > 0) {
				receiverLst = [];
				for (var j = 0; j < message.receiverInfos.length;j++) {
					var receiverInfo = message.receiverInfos[j];
					var name = isNotEmptyString(receiverInfo.fullName) ? receiverInfo.fullName : receiverInfo.userName;
					receiverLst.push(name);
				}
				
				receiverNames = receiverLst.join(", ");
				receiverFullNames = receiverNames;
				if (receiverNames.length > 15) {
					isAbbreviation = true;
					receiverNames = receiverNames.substring(0, 12) ;
				}
			}
			var oppositeAbbrName = isSentbox ? receiverNames : senderName;
			var oppositeFullName = isSentbox ? receiverFullNames : senderName;

			
			msgItemHtml += "<tr id='message_" +id+ "' class='ChinaNet-Table-Body'>";
			msgItemHtml +=     "<td>";
			if(isRead){
				msgItemHtml +=        "<a id='lnk_toggle_" + id + "' onclick='javascript:setMsgRead(this);' class='Table-Data-Text' href='#'><span>" + oppositeFullName;	
			}
			else{
				msgItemHtml +=        "<a id='lnk_toggle_" + id + "' onclick='javascript:setMsgRead(this);' class='Table-Data-Name-Link' href='#'><span>" + oppositeFullName;
			}
					
			msgItemHtml  +=        "</span></a></td>"
			msgItemHtml  +=    "<td><span class='Table-Data-Name'>" + briefTitle+ "</span></td>";			
			msgItemHtml  +=    "<td><span class='Table-Data-Name'>" + briefContent;
			if (content != null && content.length > 30){
			    msgItemHtml += 	  "<i style='margin-left:5px;color:#17bd9b;' class='glyphicon glyphicon-comment' rel='tooltip' title='"+ content +"' id=''></i>";
			}
			msgItemHtml  +=         "</span></td>";
			msgItemHtml  +=    "<td><span class='Table-Data-Name-Nobold'>"+createDatetime+"</span></td>"
			
			msgItemHtml  +=    "<td class='ChinaNet-Form-Sheet Width-For-Button' id='msg_opt_btn_" + id + "'>";
			msgItemHtml  +=        generateDelOptBtn(id,isRead);
			msgItemHtml  +=    "</td>";
			msgItemHtml  += "</tr>";			
		}			
	}else{
		$(".ChinaNet-Page-Table").hide();
	}	
	return msgItemHtml;
};
function generateDelOptBtn(id,isRead) {
	var OptBtnHtml = "";
	if (id != null) {			
		OptBtnHtml += 	"<button class='Form-Primary delbtn' id='delete_" + id + "' onclick='javascript:deleteMsg(this,"+isRead+");'>";
		OptBtnHtml +=    	"<span>删除</span>";
		OptBtnHtml +=    "</button>";
		} 
	return OptBtnHtml;
}
//set message read
var setMsgRead = function(msgItemContainer) {
	var id = msgItemContainer.id;	
	var msgId = msgItemContainer.id.substring("lnk_toggle_".length);	
	var a_msgItemContainer = $(msgItemContainer);
	
	if (a_msgItemContainer.hasClass("Table-Data-Name-Link")){
		a_msgItemContainer.removeClass("Table-Data-Name-Link");
		a_msgItemContainer.addClass("Table-Data-Text");
		SetMessageRead(true, msgId, setMsgReadSuccessCallBack, setMsgReadErrorCallBack);
		showMessageHint(_preMsgCount - 1);
		_preMsgCount = _preMsgCount - 1; 
		//console.log(_preMsgCount);
	}
	
	/*if (a_msgItemContainer.css("font-weight") == "700") { // bolded
		a_msgItemContainer.css("font-weight", "normal");
		$("#"+id+" span").removeClass("Table-Data-Text");
		$("#"+id+" span").addClass("Table-Data-Text-Blod");
		//todo call action set from unread to read
			
		SetMessageRead(true, msgId, setMsgReadSuccessCallBack, setMsgReadErrorCallBack);
	}*/
	showMsgDtails(msgId);
};
var setMsgReadSuccessCallBack = function(data) { /*MessageHint will be refreshed every "this.autoRefreshHintInterval"*/ };
var setMsgReadErrorCallBack = function(data) {};

var SetMessageRead = function(isRead, msgId, successCallBack, errorCallBack) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/system/setmessageread.htm", 
        data: {
        	"messageid" : msgId,
        	"read" : isRead
        },
        success: function (data) {
        	successCallBack(data);
        },
        error: function (data) {
        	errorCallBack(data);
        }
	});
};
//refreshHint

var refreshHintSuccessCallBack = function(data) {
	var newMsgNumber = 0;
    if (data.result == 'OK') {
    	if (isNotEmptyString(data.totalRecord)) {
    		newMsgNumber = data.totalRecord;
    		_preMsgCount = data.totalRecord;
    	}
    }
    showMessageHint(newMsgNumber);
};
var refreshHintErrorCallBack = function(data) {
	showMessageHint(0);
};

var showMessageHint = function (newMsgNum) {
	var hintContainer = $("#" + this.hintContainerId);
	if (hintContainer != null && hintContainer.length > 0) {
		hintContainer.children().remove();
		hintContainer.html('');	
		//hintContainer.html("系统信息&nbsp;<span id='span_icon' class='" + this.iconClass + "'></span> &nbsp;");
		$(".Avatar-Overly").children().remove();
		if (newMsgNum != null && newMsgNum > 0) {
			hintContainer.html("<div><span class='Adpats-Left'></span><span class='Adpats-Right'></span>"+newMsgNum+"</div>系统信息");
			$(".Avatar-Overly").append("<div class='Avatar-Message'></div>");
			//$(".Avatar-Overly").append("<div class='Avatar-Message'>"+newMsgNum+"</div>");
			/*if(newMsgNum >= 9)
			$(".Avatar-Overly").append("<div class='Avatar-Message'></div>");*/		
			twinkleIcon(this.twinkleTimeOffSet, this.twinkleDuration);
		}
		else{
			hintContainer.html("系统信息");
			//(".Avatar-Message").remove();
		}
	}
}

var twinkleIcon = function (offSet, duration) {
	
	if (this.twinkleTimer != null || this.twinkleTimer != undefined){
		clearTimeout(this.twinkleTimer);
		this.twinkleTimer = null;
	}
	var spanIcon = $('#span_icon');
	if (duration <= 0) {
		if (!spanIcon.hasClass(this.iconClass)) {
			spanIcon.addClass(this.iconClass);
		}
		return false;
	}

	if (duration < this.twinkleDuration ) {
	//	spanIcon.hasClass(this.iconClass) ? spanIcon.removeClass(this.iconClass) : spanIcon.addClass(this.iconClass); 
	}
	
	var actionJs = "twinkleIcon(twinkleInterval, (" + duration + " - twinkleInterval));";
	
	twinkleTimer = setTimeout(actionJs, offSet);
}



function showMsgDtails(i) {
	var msgDetailsHtml="";
	msgDetailsHtml+="<div class='System-Body'>";
	msgDetailsHtml+="<div class='System-Body-Guest'>";
	msgDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	msgDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>信息发送者</label>";
	msgDetailsHtml+="        <div id='id_msg_sender' class='Form-Item-Label ChinaNet-Col-8'></div>";
	msgDetailsHtml+="    </div>";
	msgDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	msgDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>信息标题</label>";
	msgDetailsHtml+="        <div id='id_msg_title'  class='Form-Item-Label ChinaNet-Col-8'></div>";
	msgDetailsHtml+="    </div>";
	msgDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	msgDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>接收时间</label>";
	msgDetailsHtml+="        <div id='id_msg_time' class='Form-Item-Label ChinaNet-Col-8'></div>";
	msgDetailsHtml+="    </div>";
	msgDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	msgDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>信息内容</label>";
	msgDetailsHtml+="        <div id='id_msg_content'  class='Form-Item-Textarea ChinaNet-Col-8'>";
	msgDetailsHtml+="            <TEXTAREA id='msg_content' name='msg_content' type='text' placeholder='' rows='6' disabled='disabled'></TEXTAREA>";
	msgDetailsHtml+="        </div>";
	msgDetailsHtml+="    </div>";	
	msgDetailsHtml+="</div>";
	msgDetailsHtml+="</div>"
		
	var d_MsgDetails = dialog({
		id: 'Dailogin:MsgInfo',
	    title: '信息详情',
	    content: msgDetailsHtml,
	         
	    okValue: '关闭',
	    ok: function () {},
	    width:600,
	    height:300,
	    skin:'ChinaNet-Dialog'
	});
	d_MsgDetails.showModal();
	viewMsgDetails(i);
}

function viewMsgDetails(i) {		
	for(var j =0;j<msg_list.length;j++){
		//var msgId = msg_list[j].id.substring("lnk_toggle_".length);
		//alert(msg_list[j].id);		
		if(msg_list[j].id==i){
			var senderName = (isNotEmptyString(msg_list[j].senderFullName) ? msg_list[j].senderFullName : msg_list[j].senderUserName);
			
			$("#id_msg_sender").text(senderName);
			$("#id_msg_title").text(msg_list[j].title)
			$("#id_msg_time").text(msg_list[j].createDatetime)
			$("#msg_content").text(msg_list[j].content)
				
		}
	}
	
}

