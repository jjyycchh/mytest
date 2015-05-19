var setwechatacctApp = function() {

	var onSubmitWechat = function(){
		$("#btn_submit_wechat").click(function() {
			submitWechat();
		});
	}
	
	var getWechatAccount = function() {
		$.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: '/authentication/getmerchantwechatname.htm',
	        success: function (data) {
	        	if (data.result == 'OK') {
	            	$("#wechat_account").val(data.message);
	            } else {                   
	                onAlertError(data.message);
	            }
	        },
	        error: function (data) {
	        	onAlertError(data.message);
	        }
	    });	
	}
	
	return {init:function(){
		onSubmitWechat();
		getWechatAccount();
	}}
}();

function submitWechat() {
	if(!chkTitle($("#wechat_account").val(),4,32)){
		onAlertErrorTip('公众号可以使用由字母、中文、数字组成的4—32个字符', document.getElementById('wechat_account'));
        return false;
	}
	var wechatAccount = $("#wechat_account").val();
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/authentication/setwechataccount.htm',
        data: {
        	"wechat_account" : wechatAccount
        },
        success: function (data) {
        	if (data.result == 'OK') {
        		onAlertError("微信公众号保存成功！");
            } else {                   
                onAlertError("微信公众号保存失败！" + data.message);
            }
        },
        error: function (data) {
        	onAlertError("微信公众号保存失败！" + data.message);
        }
    });	
}

//只允许中文、英文、数字
function chkTitle(str, minlen, maxlen){
	var re = /^[A-Za-z0-9\u4e00-\u9fa5]+$/ig;
	if(re.test(str)){
		var ret = true;
		if(typeof minlen == 'number'){
			if(getLength(str) < minlen) ret = false;
		}
		if(typeof maxlen == 'number'){
			if(getLength(str) > maxlen) ret = false;
		}
		return ret;
	}else{
		return false;
	}
}
///<summary>获得字符串实际长度，中文2，英文1</summary>
function getLength(str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}