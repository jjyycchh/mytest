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
        		onAlertError("保存成功！");
            } else {                   
                onAlertError("保存失败！" + data.message);
            }
        },
        error: function (data) {
        	onAlertError("保存失败！" + data.message);
        }
    });	
}