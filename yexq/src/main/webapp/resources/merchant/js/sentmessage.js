var msg_list=null;
var sentmessageApp = (function(){
	this.autoRefreshHintTimer = null;
	this.autoRefreshHintInterval = 10 * 1000;
	this.twinkleTimeOffSet = 10 * 1000;
	this.twinkleDuration = 60 * 1000;
	this.iconClass = "glyphicon glyphicon-envelope";
	this.hintContainerId = "showmsg";
	this.twinkleTimer = null;
	this.twinkleInterval = 1 * 1000;
	this.contextPath = null;
	this.isInited = false;
	var MsgSearchHandler = null;
	var search_Msg_keyword = null;
	
	MsgSearchHandler = new searchUtil(GetMsgLst, searchFailCallBack, showMsgErrorCallBack, null, null,
			"sentMsglist", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
			"/system/getmessages.htm","");
	
	var keywordsSearchsentMsg = function(isGetCount,isRead) {		
		MsgSearchHandler.setSearchParemeter('isgetcount', isGetCount);		
		MsgSearchHandler.setSearchParemeter('isread', isRead);
		MsgSearchHandler.setSearchParemeter('mailbox', 'out');
		MsgSearchHandler.setSearchParemeter('startdate', $("#startdate").val());
		MsgSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
		MsgSearchHandler.setSearchParemeter('isflaged', "");
		MsgSearchHandler.setSearchParemeter('keywords', "");
		MsgSearchHandler.searchWithPreload();
	}
	var showMsg = function(){
		 if(__CONTEXT_MERCHANT_CODE =="MERCHANT" || __CONTEXT_MERCHANT_CODE == "REPRESENTATIVE"){
			 $("#sentmsg").hide();
			 $("#savemsg").hide();
		 }		
		//SearchMessages(false, null, false, showSentBoxMsgSuccessCallBack,showMsgErrorCallBack);	// 发件箱	
		 keywordsSearchsentMsg(false,null);
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
            	"enddate" : $("#enddate").val(),
            	"isread" : isRead,
            	"isflaged" : "",
            	"isgetcount" : isGetCount
            },
            success: function (data) { successCallBack(data); },
            error: function (data) { errorCallBack(data); }
		});
	};
	var onsearchMessage = function(){
		$("#btn_search_smsMsg").click(function() {
		 // SearchMessages(false, null, false, showSentBoxMsgSuccessCallBack, showMsgErrorCallBack);
			keywordsSearchsentMsg(false,null);
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
	}; 
				
	return {init:function(){
		//alert('aaaaaaaaa');
		showMsg(); //发件箱
		initDatepicker();
		onsearchMessage();
	}}
})();

var deleteMsg = function(removeIcon) {
	var msgId = removeIcon.id.substring("delete_".length);
	DeleteMessage(msgId, deleteMsgSuccessCallBack, deleteMsgErrorCallBack);
};
var deleteMsgSuccessCallBack = function(data) {	
	$.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/system/getmessages.htm', 
        data: {
        	"mailbox" : "out",
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
var DeleteMessage = function(msgId, successCallBack, errorCallBack) {
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/system/deletemessage.htm", 
        data: {
        	"messageid" : msgId
        },
        success: function (data) {
        	successCallBack(data);
        },
        error: function (data) {
        	errorCallBack(data);
        }
	});
};

var showSentBoxMsgSuccessCallBack = function(data) {
	if (data.result == 'OK') {
	//	alert(JSON.stringify(data));
	//	return false;
		var msgLstHtml = GetMsgLst(data.records, true);		
		var divMsgLst = $("#sentMsglist");	
		divMsgLst.html(msgLstHtml);		
	}
};	
var showMsgErrorCallBack = function(data) {
	onAlertError(data.message);
	return false;
};
function searchFailCallBack(data, message) {
	onAlertError(data.message);
	return false;
}

function GetMsgLst(messages, isSentbox) {
	msg_list = messages;	
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
				briefTitle = briefTitle.substring(0,15);
			}
			
			var content = message.content;
						
			var briefContent = content;
			if (briefContent != null && briefContent.length > 30) {
				briefContent = briefContent.substring(0, 30);
			}
						
			var isFlaged = message.isFlaged;
			
			var createDatetime = message.createDatetime;
			var parentMsgId = message.parentMsgId;
			
			
			
		//	var senderName = "来自：" + (isNotEmptyString(message.senderFullName) ? message.senderFullName : message.senderUserName);
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
					receiverNames = receiverNames.substring(0, 12) + " ...";
				}
			}
			var oppositeAbbrName = receiverNames ;
			var oppositeFullName = receiverFullNames ;

			
			msgItemHtml += "<tr id='message_" +id+ "' class='ChinaNet-Table-Body'>";
			msgItemHtml +=     "<td>";
			msgItemHtml +=        "<a id='lnk_toggle_" + id + "' onclick='javascript:ReadMsg(this);' class='Table-Data-Name-Link'  href='#'><span class=''>" + oppositeAbbrName;
			
			msgItemHtml  +=       "</span></a></td>"
			msgItemHtml  +=    "<td><span class='Table-Data-Name'>" + briefTitle+ "</span></td>";			
			msgItemHtml  +=    "<td><span class='Table-Data-Name'>" + briefContent;
			if (content != null && content.length > 30){				
			    msgItemHtml += 	  "<i style='margin-left:5px;color:#17bd9b;' class='glyphicon glyphicon-comment' rel='tooltip' title='"+ content +"' id=''></i>";
			}
			msgItemHtml  +=    "</span></td>";
			msgItemHtml  +=    "<td><span class='Table-Data-Name-Nobold'>"+createDatetime+"</span></td>"
			
			msgItemHtml  +=    "<td class='ChinaNet-Form-Sheet Width-For-Button' id='msg_opt_btn_" + id + "'>";
			msgItemHtml  +=        generateDelOptBtn(id);
			msgItemHtml  +=    "</td>";
			msgItemHtml  += "</tr>";			
		}			
	}else{
		$(".ChinaNet-Page-Table").hide();
	}	
	return msgItemHtml;
};
function generateDelOptBtn(id) {
	var OptBtnHtml = "";
	if (id != null) {			
		OptBtnHtml += 	"<button class='Form-Primary delbtn' id='delete_" + id + "' onclick='javascript:deleteMsg(this);'>";
		OptBtnHtml +=    	"<span>删除</span>";
		OptBtnHtml +=    "</button>";
		} 

	return OptBtnHtml;
}
var ReadMsg = function(msgItemContainer) {
	var id = msgItemContainer.id;	
	var msgId = msgItemContainer.id.substring("lnk_toggle_".length);	
	showMsgDtails(msgId);
};

function showMsgDtails(i) {
	var msgDetailsHtml="";
	msgDetailsHtml+="<div class='System-Body'>";
	msgDetailsHtml+="<div class='System-Body-Guest'>";
	msgDetailsHtml+="    <div class='ChinaNet-Form-Sheet'>";
	msgDetailsHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>信息接收者</label>";
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
	for(var k=0;k<msg_list.length;k++){				
		if(msg_list[k].id==i){
			//var senderName = (isNotEmptyString(msg_list[j].senderFullName) ? msg_list[j].senderFullName : msg_list[j].senderUserName);
			var message = msg_list[k];
			if (message.receiverInfos != null && message.receiverInfos.length > 0) {
				receiverLst = [];
				for (var j = 0; j < message.receiverInfos.length;j++) {
					var receiverInfo = message.receiverInfos[j];
					var name = isNotEmptyString(receiverInfo.fullName) ? receiverInfo.fullName : receiverInfo.userName;
					receiverLst.push(name);
				}
			}
				
				receiverNames = receiverLst.join(", ");
			$("#id_msg_sender").text(receiverNames);
			$("#id_msg_title").text(msg_list[k].title)
			$("#id_msg_time").text(msg_list[k].createDatetime)
			$("#msg_content").text(msg_list[k].content)
				
		}
	}
	
}
