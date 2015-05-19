/**
 * Created by wj on 2014/8/13.
 */
var userOnlineHandler = null;
var userOfflineHandler= null;
var userVipHandler    = null;
var userBlackHandler  = null;
var userWhiteHandler  = null;

// online user
userOnlineHandler = new searchUtil(getOnlineUserListHtml, searchFailCallBack, searchErrorCallBack, null, null, 'tbl_user_lst', 'lb_pagenumber', 'a_pagination_previous', 'a_pagination_next',
	'/user/users.htm', '');

// offline user
userOfflineHandler = new searchUtil(getOfflineUserListHtml, searchFailCallBack, searchErrorCallBack, null, null, 'tbl_user_lst', 'lb_pagenumber', 'a_pagination_previous', 'a_pagination_next',
	'/user/users.htm', '');

// vip user
userVipHandler = new searchUtil(geVipUserListHtml, searchFailCallBack, searchErrorCallBack, null, null, 'tbl_user_lst', 'lb_pagenumber', 'a_pagination_previous', 'a_pagination_next',
	'/user/getmembers.htm', '');

//black user
userBlackHandler = new searchUtil(getBlackUserListHtml, searchFailCallBack, searchErrorCallBack, null, null, 'tbl_user_lst', 'lb_pagenumber', 'a_pagination_previous', 'a_pagination_next',
	'/user/blacklist.htm', '');

// white user
userWhiteHandler = new searchUtil(getWhiteUserListHtml, searchFailCallBack, searchErrorCallBack, null, null, 'tbl_user_lst', 'lb_pagenumber', 'a_pagination_previous', 'a_pagination_next',
    '/user/whitelist.htm', '');

var userApp = function(){

    var _model = null;
    var _handler = null;

	var keywordsSearch = function() {
		$("div.ChinaNet-Page-Table").show();
        _handler.clearResultSetpageNo();
		var keywords = _handler.convertKeywordsSearchable($("#keywords").val());
        _handler.setSearchParemeter('keywords', keywords);
		//
		if(onCheckLength(keywords)){
			_handler.searchWithPreload();
		}else{
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}

	var onSearchUser = function(){

        $("#keywords").keypress(function(e) {
            if(e.which == 13) {
                keywordsSearch();
                return false;
            }
        });

		$("#btn_search_user").click(function() {
			keywordsSearch();
		});
	}

	var onSetUserType = function(){

		$("#tbl_user_lst").on('click', '.Form-Primary', function(e) {
            var isVip, isWhite, isBlack;
            isVip = isWhite = isBlack = false;
            var btn = $(this);
            var $tr = btn.parent().parent();
            var setElement = $('.User-Type-List');
            var offset = btn.offset();
            var top = offset.top;
            var left = offset.left;
            var uid = btn.attr('data-user-id');
            var mac = btn.attr('data-user-mac');
            setElement.attr('data-uid', uid);
            setElement.attr('data-mac', mac);

            top = top + this.clientHeight;
            left = left + this.clientWidth/2 - 46;
            setElement.css({
                top: top,
                left: left
            });

            if($tr.find('.User-Member-Tag-Vip').length > 0){
                isVip = true;
                setElement.find('li:eq(0)').addClass('Select');
            }else{
                setElement.find('li:eq(0)').removeClass('Select');
            }
            if($tr.find('.User-Member-Tag-White').length > 0){
                isWhite = true;
                setElement.find('li:eq(1)').addClass('Select');
            }else{
                setElement.find('li:eq(1)').removeClass('Select');
            }
            if($tr.find('.User-Member-Tag-Black').length > 0){
                isBlack = true;
                setElement.find('li:eq(2)').addClass('Select');
            }else{
                setElement.find('li:eq(2)').removeClass('Select');
            }
            setElement.show();

		});
        // 隐藏
        $('.User-Type-List').on('mouseleave', function(e) {
            $(this).hide();
		});
        // 点击...
        $('.User-Type-List li').off('click').on('click', function(e){
            showLoading();
            var $li = $(this);
            var $ut = $('.User-Type-List');
            var uid = $ut.attr('data-uid');
            var mac = $ut.attr('data-mac');

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: ($li.hasClass('Select') ? $li.attr('removeurl') : $li.attr('addurl')),
                data: {
                    account_id: __CONTEXT_MERCHANT_KEY,
                    user_id: uid,
                    mac: mac
                },
                async: false,
                success: function(data) {
                    if (data.result == 'OK') {
                        if('vip|black|white'.indexOf(_model) > -1){ // online|offline|vip|black|white
                            $("div.ChinaNet-Page-Table").show();
                            _handler.clearResultSetpageNo();
                            _handler.setSearchParemeter('keywords', '');
                            _handler.searchWithPreload();
                            return;
                        }
                        $li.toggleClass('Select');
                        //var clz = 'User-Member-Tag-' + $li.attr('tag');
                        var $tags = $('td[data-user-tags=' + uid + ']');
                        $tags.find('label').remove();

                        var html = [];
                        html.push(data.is_member ? '<label class="User-Member-Tag-Vip"></label>' : '');
                        html.push(data.is_in_white_list ? '<label class="User-Member-Tag-White"></label>' : '');
                        html.push(data.is_in_black_list ? '<label class="User-Member-Tag-Black"></label>' : '');
                        $tags.html(html.join(''));
                    }else{
                        onAlertError(data.message || '系统异常');
                    }
                },
                complete: function() {
                    closeLoading();
                }
            });

            $ut.hide();
		});
	}

	var onPreloadOnlineList = function(){
        _handler = userOnlineHandler;

		userOnlineHandler.setSearchParemeter('account_id', __CONTEXT_MERCHANT_KEY);
		userOnlineHandler.setSearchParemeter('is_online_user_only', "true");
		userOnlineHandler.searchWithPreload();
	}

	var onPreloadOfflineList = function(){
        _handler = userOfflineHandler;

        userOfflineHandler.setSearchParemeter('account_id', __CONTEXT_MERCHANT_KEY);
        userOfflineHandler.searchWithPreload();
	}

    var onPreloadVipList = function(){
        _handler = userVipHandler;

        userVipHandler.setSearchParemeter('account_id', __CONTEXT_MERCHANT_KEY);
        userVipHandler.searchWithPreload();
    }

    var onPreloadBlackList = function(){
        _handler = userBlackHandler;

        userBlackHandler.setSearchParemeter('account_id', __CONTEXT_MERCHANT_KEY);
        userBlackHandler.searchWithPreload();
    }

    var onPreloadWhiteList = function(){
        _handler = userWhiteHandler;

        userWhiteHandler.setSearchParemeter('account_id', __CONTEXT_MERCHANT_KEY);
        userWhiteHandler.searchWithPreload();
    }

	return {
        init:function(model){
            _model = model;

            switch(model){
                case 'online':
                    onPreloadOnlineList();
                    break;
                case 'offline':
                    onPreloadOfflineList();
                    break;
                case 'vip':
                    onPreloadVipList();
                    break;
                case 'black':
                    onPreloadBlackList();
                    break;
                case 'white':
                    onPreloadWhiteList();
                    break;
                default:
                    break;
            }
            onSearchUser();
            onSetUserType();
        }
    }
}();

function generateUserListHtml(userList){
	var userListHtml = "";
	if (userList.length > 0) {
		for ( var i = 0; i < userList.length; i++) {

			/***new start***/
			var authId, totalUpTraffic=0 ,totalDwTraffic=0 ,mac='' ,browserType='' ,merchantname='' ,terminalType='' ,ip='';
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
				//mac = (logContentTemp.mac || {}).toUpperCase();
				mac = isNotEmptyString(logContentTemp.mac)?logContentTemp.mac.toUpperCase():"";
				ip = isNotEmptyString(logContentTemp.ip)?logContentTemp.ip:"";
			}
			mac = mac || userList[i].mac || "";
			var userid = userList[i].id;
			var status = userList[i].status;
			var logindatetime = userList[i].loginDatetime;
			var deviceid = userList[i].deviceId;
			browserType = isNotEmptyString(userList[i].browserType)?userList[i].browserType:"";
			terminalType = isNotEmptyString(userList[i].terminalType)?userList[i].terminalType:"";
			if (userList[i].authType == "OPTION") {
				authId = "匿名用户";
			}

			authId = authId || userList[i].authId;
			userListHtml += "<tr class='ChinaNet-Table-Body' >";
			userListHtml += "<td><span class='Table-Data-Name'>" + authId + "</span>";
			userListHtml +="<span class='Table-Data-Text'> "+terminalType+" "+browserType+"</span>";
			userListHtml += "</td>";
			userListHtml += "<td><span class='Table-Data-Name'>" + deviceid + "</span>";
			userListHtml +="<span class='Table-Data-Text'>"+merchantname+"</span></td>";

			userListHtml += "<td><span class='Table-Data-Name'>" + mac + "</span><span class='Table-Data-Text'>"+ip+"</span></td>";
			userListHtml += "<td>" + logindatetime + "</td>";

			userListHtml += "<td> <span class='Table-Data-Status "+ onlineStatusSpan(status) +"'></span></td>";
			/*userListHtml += "<td id='user_status_" + userid + "'>" + statusUserSpan(status) + "</td>";*/
			userListHtml += "<td><span class='Table-Data-Flow Table-Flow-Up'><span></span>"+ trafficFormatter(totalUpTraffic) +"</span>";
			userListHtml += "<span class='Table-Data-Flow Table-Flow-Down'><span></span>"+ trafficFormatter(totalDwTraffic) +"</span></td>";
			userListHtml += "<td class='ChinaNet-Form-Sheet Width-For-Button' id='user_opt_btn_" + userid + "'>";
			userListHtml += generateUserOptBtn(userid, deviceid, status);
			userListHtml += "</td>";
			userListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}

	return userListHtml;
}

// Search Online User
function getOnlineUserListHtml(userList){

	var userListHtml = "";
	if (userList.length > 0) {
		for ( var i = 0; i < userList.length; i++) {
			userListHtml += "<tr class='ChinaNet-Table-Body'>";
			userListHtml += "	<td>";
			userListHtml += "		<span class='Table-Data-Name'>" + (userList[i].cellphoneNumber || '匿名') + "</span>";
            if(userList[i].mac){
                userListHtml += "   <span class='Table-Data-Name-Nobold'>" + (userList[i].mac || '匿名') + "</span>";
            }
			userListHtml += "	</td>";
			userListHtml += "	<td>";
			userListHtml += "		<span class='Table-Data-Text'>" + (userList[i].loginDatetime || '') + "</span>";
			userListHtml += "	</td>";
			userListHtml += "	<td data-user-tags='" + userList[i].id + "'>";
			userListHtml += "	    " + (userList[i].is_member ? '<label class="User-Member-Tag-Vip"></label>' : '');
			userListHtml += "	    " + (userList[i].is_in_white_list ? '<label class="User-Member-Tag-White"></label>' : '');
			userListHtml += "	    " + (userList[i].is_in_black_list ? '<label class="User-Member-Tag-Black"></label>' : '');
            userListHtml += "	</td>";
			userListHtml += "	<td><button class='Form-Primary' data-user-id='"+userList[i].id+"' data-user-mac='" + userList[i].mac + "'><span>设置</span></button></td>";
			userListHtml += "</tr>";
		}
	}else{
		$(".ChinaNet-Page-Table").hide();
	}

	return userListHtml;
}

// Search Offline User
function getOfflineUserListHtml(userList){

	var userListHtml = "";
	if (userList.length > 0) {
		for ( var i = 0; i < userList.length; i++) {
			userListHtml += "<tr class='ChinaNet-Table-Body' >";
			userListHtml += "	<td>";
			userListHtml += "		<span class='Table-Data-Name'>" + (userList[i].cellphoneNumber || '匿名') + "</span>";
            if(userList[i].mac){
                userListHtml += "   <span class='Table-Data-Name-Nobold'>" + (userList[i].mac || '匿名') + "</span>";
            }
			userListHtml += "	</td>";
			userListHtml += "	<td>";
			userListHtml += "		<span class='Table-Data-Text'>" + (userList[i].first_login_time || '') + "</span>";
			userListHtml += "	</td>";
			userListHtml += "	<td>";
			userListHtml += "		<span class='Table-Data-Text'>" + (userList[i].loginDatetime || '') + "</span>";
			userListHtml += "	</td>";
            userListHtml += "	<td data-user-tags='" + userList[i].id + "'>";
            userListHtml += "	    " + (userList[i].is_member ? '<label class="User-Member-Tag-Vip"></label>' : '');
            userListHtml += "	    " + (userList[i].is_in_white_list ? '<label class="User-Member-Tag-White"></label>' : '');
            userListHtml += "	    " + (userList[i].is_in_black_list ? '<label class="User-Member-Tag-Black"></label>' : '');
            userListHtml += "	</td>";
			userListHtml += "	<td><button class='Form-Primary' data-user-id='"+userList[i].id+"' data-user-mac='" + userList[i].mac + "'><span>设置</span></button></td>";
			userListHtml += "</tr>";
		}
	}else{
		$(".ChinaNet-Page-Table").hide();
	}

	return userListHtml;
}
// Search VIP User
function geVipUserListHtml(userList){

	var userListHtml = "";
	if (userList.length > 0) {
		for ( var i = 0; i < userList.length; i++) {
			userListHtml += "<tr class='ChinaNet-Table-Body' >";
			userListHtml += "	<td>";
			userListHtml += "		<span class='Table-Data-Name'>" + (userList[i].phone_number || '匿名') + "</span>";
            if(userList[i].mac){
                userListHtml += "   <span class='Table-Data-Name-Nobold'>" + (userList[i].mac || '匿名') + "</span>";
            }
			userListHtml += "	</td>";
			userListHtml += "	<td>";
			userListHtml += "		<span class='Table-Data-Text'>" + (userList[i].first_login_time || '') + "</span>";
			userListHtml += "	</td>";
			userListHtml += "	<td>";
			userListHtml += "		<span class='Table-Data-Text'>" + (userList[i].last_login_time || '') + "</span>";
			userListHtml += "	</td>";
            userListHtml += "	<td data-user-tags='" + userList[i].terminal_user_id + "'>";
            userListHtml += '	    <label class="User-Member-Tag-Vip"></label>';
            userListHtml += "	    " + (userList[i].is_in_white_list ? '<label class="User-Member-Tag-White"></label>' : '');
            userListHtml += "	    " + (userList[i].is_in_black_list ? '<label class="User-Member-Tag-Black"></label>' : '');
            userListHtml += "	</td>";
			userListHtml += "	<td><button class='Form-Primary' data-user-id='"+userList[i].terminal_user_id+"' data-user-mac='" + userList[i].mac + "'><span>设置</span></button></td>";
			userListHtml += "</tr>";
		}
	}else{
		$(".ChinaNet-Page-Table").hide();
	}

	return userListHtml;
}
// Search Black User
function getBlackUserListHtml(userList){

    var userListHtml = "";
    if (userList.length > 0) {
        for ( var i = 0; i < userList.length; i++) {
            userListHtml += "<tr class='ChinaNet-Table-Body' >";
            userListHtml += "	<td>";
            userListHtml += "		<span class='Table-Data-Name'>" + (userList[i].phone_number || '匿名') + "</span>";
            if(userList[i].mac){
                userListHtml += "   <span class='Table-Data-Name-Nobold'>" + (userList[i].mac || '匿名') + "</span>";
            }
            userListHtml += "	</td>";
            userListHtml += "	<td>";
            userListHtml += "		<span class='Table-Data-Text'>" + (userList[i].first_login_date || '') + "</span>";
            userListHtml += "	</td>";
            userListHtml += "	<td>";
            userListHtml += "		<span class='Table-Data-Text'>" + (userList[i].last_login_date || '') + "</span>";
            userListHtml += "	</td>";
            userListHtml += "	<td data-user-tags='" + userList[i].terminal_user_id + "'>";
            userListHtml += "	    " + (userList[i].is_member ? '<label class="User-Member-Tag-Vip"></label>' : '');
            userListHtml += "	    " + (userList[i].is_in_white_list ? '<label class="User-Member-Tag-White"></label>' : '');
            userListHtml += '	    <label class="User-Member-Tag-Black"></label>';
            userListHtml += "	</td>";
            userListHtml += "	<td><button class='Form-Primary' data-user-id='"+userList[i].terminal_user_id+"' data-user-mac='" + userList[i].mac + "'><span>设置</span></button></td>";
            userListHtml += "</tr>";
        }
    }else{
        $(".ChinaNet-Page-Table").hide();
    }

    return userListHtml;
}
// Search White User
function getWhiteUserListHtml(userList){

    var userListHtml = "";
    if (userList.length > 0) {
        for ( var i = 0; i < userList.length; i++) {
            userListHtml += "<tr class='ChinaNet-Table-Body' >";
            userListHtml += "	<td>";
            userListHtml += "		<span class='Table-Data-Name'>" + (userList[i].phone_number || '匿名') + "</span>";
            if(userList[i].mac){
                userListHtml += "   <span class='Table-Data-Name-Nobold'>" + (userList[i].mac || '匿名') + "</span>";
            }
            userListHtml += "	</td>";
            userListHtml += "	<td>";
            userListHtml += "		<span class='Table-Data-Text'>" + (userList[i].first_login_date || '') + "</span>";
            userListHtml += "	</td>";
            userListHtml += "	<td>";
            userListHtml += "		<span class='Table-Data-Text'>" + (userList[i].last_login_date || '') + "</span>";
            userListHtml += "	</td>";
            userListHtml += "	<td data-user-tags='" + userList[i].terminal_user_id + "'>";
            userListHtml += "	    " + (userList[i].is_member ? '<label class="User-Member-Tag-Vip"></label>' : '');
            userListHtml += '	    <label class="User-Member-Tag-White"></label>';
            userListHtml += "	    " + (userList[i].is_in_black_list ? '<label class="User-Member-Tag-Black"></label>' : '');
            userListHtml += "	</td>";
            userListHtml += "	<td><button class='Form-Primary' data-user-id='"+userList[i].terminal_user_id+"' data-user-mac='" + userList[i].mac + "'><span>设置</span></button></td>";
            userListHtml += "</tr>";
        }
    }else{
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
		/*if (status.toUpperCase() == "OFFLINE"){
		 return userOptBtnHtml;
		 }*/
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
