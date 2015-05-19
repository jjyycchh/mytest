/**
 * Created by wj on 2014/8/13.
 */
var userSearchHandler = null;
userSearchHandler = new searchUtil(generateUserListHtml, searchFailCallBack, searchErrorCallBack, null, null,
		"tbl_user_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next", 
		"/user/userauthlog.htm","");
var userauthlogApp = function(){
		
	var search_user_keyword = null;
	var user_status = "";
	var state ="";
	var keywordsSearch = function() {
		$("div.ChinaNet-Page-Table").show();
		userSearchHandler.clearResultSetpageNo();
		user_status = $("#userStatus").val();
		state = $("#state").val();
		userSearchHandler.setSearchParemeter('status', user_status);
		var keywords = userSearchHandler.convertKeywordsSearchable($("#keywords").val());
		userSearchHandler.setSearchParemeter('keywords', keywords);
		userSearchHandler.setSearchParemeter('state', state);
		//userSearchHandler.searchWithPreload();	
		if(onCheckLength(keywords)){
			userSearchHandler.searchWithPreload();
		}
		else{
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	
	var onsearchUser = function(){
		$("#btn_search_user").click(function() {
			keywordsSearch();
		});
	}
		
	var inituserSelect = function(){
        $('#userStatus').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:"",text:"全部"},data:[{value:'',text:'全部'},{value:'ONLINE',text:'在线'},{value:'OFFLINE',text:'离线'}]});
        $('#state').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:"",text:"全部"},data:[{value:'',text:'全部'},{value:'NORMAL',text:'正常'},{value:'LOCKED',text:'锁定'}]});
        
    }
	
	return {init:function(){	
		userSearchHandler.searchWithPreload();	
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		onsearchUser();	
		//inituserSelect();
	}}
}();

function generateUserListHtml(userList){		
	var userListHtml = "";
	if (userList.length > 0) {
		for ( var i = 0; i < userList.length; i++) {
			
			//var merchantname = userList[i].merchantName;
			//var deviceid = userList[i].deviceId;
			//var devicename = isNotEmptyString(userList[i].deviceName)?userList[i].deviceName:"";
			//var logindatetime = userList[i].loginDatetime;
			//var status = userList[i].status;
			//var onlineStatus = userList[i].onlineStatus;
			//var totalUpTraffic = userList[i].totalUpTraffic;
			//var totalDwTraffic = userList[i].totalDwTraffic;
			
			//var authId = userList[i].authId;
			//var usermemo = userList[i].memo;
           // var terminalType = isNotEmptyString(userList[i].terminalType)?userList[i].terminalType:"";
            //var browserType = isNotEmptyString(userList[i].browserType)?userList[i].browserType:"";
            //var mac = userList[i].mac;
            
            /***new start***/
            var authId ,totalUpTraffic=0 ,totalDwTraffic=0 ,mac='' ,browserType='' ,merchantname='' ,terminalType='' ,ip='';
            var logContentTemp = null;
            if(isNotEmptyString(userList[i].logContent)){
            	try{
            		logContentTemp = JSON.parse(userList[i].logContent);
            	}catch(e){
            		logContentTemp = {};
            	}
            	authId = logContentTemp.user_id;
            	totalUpTraffic = logContentTemp.outgoing;
            	totalDwTraffic = logContentTemp.incoming;
            	mac = (logContentTemp.mac || {}).toUpperCase();
            	ip = logContentTemp.ip;
            }
            merchantname = userList[i].merchantName || "";
            var userid = userList[i].id;
            var status = userList[i].status;
            var logindatetime = userList[i].loginDatetime;
            var deviceid = userList[i].deviceId;
            browserType = isNotEmptyString(userList[i].browserType)?userList[i].browserType:"";
            terminalType = isNotEmptyString(userList[i].terminalType)?userList[i].terminalType:"";
            if (userList[i].authType == "OPTION") {
                authId = "匿名用户";
            }
            authId = authId || userList[i].deviceName || "";
            
			userListHtml += "<tr class='ChinaNet-Table-Body' >";
			userListHtml += "<td><span class='Table-Data-Name'>" + authId + "</span>";
			userListHtml +="<span class='Table-Data-Text'>"+terminalType+" "+browserType+"</span>";
			userListHtml += "</td>";				
			userListHtml += "<td><span class='Table-Data-Name'>" + deviceid + "</span>";
			userListHtml +="<span class='Table-Data-Text'>"+merchantname+"</span></td>";
			
			userListHtml += "<td><span class='Table-Data-Name'>" + mac + "</span><span class='Table-Data-Text'>"+ip+"</span></td>";
			userListHtml += "<td>" + logindatetime + "</td>";
		
			/*userListHtml += "<td> <span class='Table-Data-Status "+ onlineStatusSpan(status) +"'></span></td>";*/
			/*userListHtml += "<td id='user_status_" + userid + "'>" + statusUserSpan(status) + "</td>";*/
			userListHtml += "<td><span class='Table-Data-Flow Table-Flow-Up'><span></span>"+ trafficFormatter(totalUpTraffic) +"</span>";
			userListHtml += "<span class='Table-Data-Flow Table-Flow-Down'><span></span>"+ trafficFormatter(totalDwTraffic) +"</span></td>";
			/*userListHtml += "<td class='ChinaNet-Form-Sheet Width-For-Button' id='user_opt_btn_" + userid + "'>";
			userListHtml += generateUserOptBtn(userid, deviceid, status); 
			userListHtml += "</td>";*/
			userListHtml += "</tr>";

		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	
	return userListHtml;		
}

function onlineStatusSpan(onlineStatus) {
	var statuscss="";
	if(onlineStatus != null){
		if (onlineStatus.toUpperCase() == "ONLINE") {
			statuscss += "Table-Status-Online";
		}
		else if(onlineStatus.toUpperCase() == "LOCKED"){
			statuscss += "Table-Status-Locked";
		}else{
			statuscss += "Table-Status-Offline";
		}
	}
	return statuscss;
}
function setstatus(userId,deviceId,type){
	  $.ajax({
			type:'POST',
			dataType:'json',
			url: '/user/clientblock.htm',
			data : {
				'userid' : userId,
				'deviceid' : deviceId,
				'type' : type
			},
			success: function(data) {
				if (data.result != 'FAIL') {
					//var userOptBtnHtml = generateUserOptBtn(userId,deviceId,data.status);
					//$("#user_status_" + userId).html(statusUserSpan(data.status));
					//$("#user_opt_btn_" + userId).html(userOptBtnHtml);	
					userSearchHandler.refreshCurrentPage();
				}
				else {
					onAlertError(data.message);
		            return false;
				}
			},
			error: function() {
				onAlertError("用户操作失败!");
	           return false;
			}									
		});		  
}
function generateUserOptBtn(userID, deviceId, status) {
	var userOptBtnHtml = "";
	if (userID != null) {
		if (status.toUpperCase() == "OFFLINE"){
			return userOptBtnHtml;
		}
		if (status.toUpperCase() == "LOCKED") {
			userOptBtnHtml += 	"<button class='Form-Default' id='user_active_" + userID + "' onclick='javascript:setstatus(\"" + userID +"\",\""+ deviceId + "\",\"UNBLOCK\")'>";
			userOptBtnHtml +=    	"<span>解锁</span>";
			userOptBtnHtml +=   "</button>";				 
		}else{
			userOptBtnHtml += 	"<button class='Form-Primary'  id='user_inactive_" + userID + "' onclick='javascript:setstatus(\"" + userID +"\",\""+deviceId + "\",\"BLOCK\")'>";
			userOptBtnHtml +=    	"<span>锁定</span>";
			userOptBtnHtml +=    "</button>";			 					
		}
	}
	return userOptBtnHtml;
}

function statusUserSpan(status)
{
	var statusHtml="";
	if(status != null){
		if (status == "LOCKED") {
			statusHtml += "<span class='Table-Data-Status-Photo Table-Flow-Locked'></span>";
		}
		else{
			statusHtml += "<span class='Table-Data-Status-Photo Table-Flow-Unlocked'></span>";
		}
	}
	return statusHtml;
}
function searchFailCallBack(data, message) {
	onAlertError('加载用户数据请求提交失败！');
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载用户数据请求提交失败！');
	return false;
}
