//var JSREQUESTURL = 'http://www.51iwifi.com/merchant/getadvertjs.htm';
//var JSREQUESTURL = 'http://wic2014-www.51iwifi.com/merchant/getadvertjs.htm';
//var JSREQUESTURL = 'http://192.168.10.146:8000/merchant/getadvertjs.htm';
var JSREQUESTURL = 'http://www.51iwifi.com/merchant/getadvertjs.htm';

if(typeof getRequestValue=='undefined'){
	function getRequestValue(key){
		var url=window.location.search.substring(1);
		var par=url.split('&');
		for(i=0;i<par.length;i++){
			var code=par[i].split('=');
			if(key==code[0]) return code[1]
		}
		return false;
	}
}

$(document).ready(function(){
	var $adbox = $('#adBox');
	if(!$adbox.parent().hasClass('portalTemplateBody')){            
		$adbox.css({'width':'100%','max-width':'480px','margin':'0 auto','overflow':'hidden'});
	}
	var devid = getRequestValue("dev_id");
	$.ajax({
		url: JSREQUESTURL,
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'callback',
		async: true,
		data: {deviceId:devid},
		success:function(data){
			if(data.result=='OK'){
				$('#adBox').addClass('theBanner').html(data.js);
			}
		},
		error: function(data){
			console.log('get adcode error');
		}
	});
});