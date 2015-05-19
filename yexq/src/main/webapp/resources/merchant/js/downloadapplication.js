/**
 * 获取下载链接，统计下载次数
 * */

var downloadApplicationApp = function() {
	
	
	var getAndroidDownloadURL = function() {
		$.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: '/app/getandroiddownloadurl.htm',
	        data: {},
	        success: function (data) {
	        	if (data.result == 'OK') {
	        		window.open(data.url);
	            } else {                   
	                onAlertError(data.message);
	            }
	        },
	        error: function (data) {
	        	onAlertError('下载失败!');
	        }
	    });
	}
}