var reportApp = function(){
	var newReportDialog = function() {
		$('a#Report').unbind('click').click(function(){
			var reportHtml = "";
			reportHtml += "<div class='UserInfo-Settings-Body'>";
		
			reportHtml += "  <div class='ChinaNet-Form-Sheet'>";
			reportHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>举报类型</label>";
			reportHtml += "    <div id='div_report_type'  class='Form-Item-Select ChinaNet-Col-8'>";
			reportHtml += "      <input type='text' id='select_report_type' name='select_report_type' class='Input-Control' />";
			reportHtml += "    </div>";
			reportHtml += "  </div>";
		
			reportHtml += "  <div class='ChinaNet-Form-Sheet'>";
			reportHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>被举报账号</label>";
			reportHtml += "    <div id='div_visious_account'  class='Form-Item-Input ChinaNet-Col-8'>";
			reportHtml += "      <input id='input_visious_account' name='input_visious_account' class='Input-Control' />";
			reportHtml += "    </div>";
			reportHtml += "  </div>";
		
			reportHtml += "  <div class='ChinaNet-Form-Sheet'>";
			reportHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>被举报网址</label>";
			reportHtml += "    <div id='div_visious_url'  class='Form-Item-Input ChinaNet-Col-8'>";
			reportHtml += "      <input id='input_visious_url' name='input_visious_url' class='Input-Control' />";
			reportHtml += "    </div>";
			reportHtml += "  </div>";
		
			reportHtml += "  <div class='ChinaNet-Form-Sheet ChinaNet-Form-Reqiured'>";
			reportHtml += "    <label class='Form-Item-Title ChinaNet-Col-2'>举报说明</label>";
			reportHtml += "    <div id='div_description'  class='Form-Item-Textarea ChinaNet-Col-8'>";
			reportHtml += "      <Textarea id='input_description' name='input_description' />";
			reportHtml += "    </div>";
			reportHtml += "  </div>";
		
			reportHtml += "</div>";
		
			var d_Report = dialog({
				id: 'Dailogin:Report',
				title: '举报',
				content: reportHtml,
				okValue: '确定',
				ok: function () {
					//this.close().remove();
					submitReport();
					return false;
				},
	         
				cancelValue: '取消',
				cancel: function () {},
				width:600,
				height:300,
				skin:'ChinaNet-Dialog'
			});
			initTypeSelect();
			d_Report.showModal();
		});
	}
	
	// 初始化举报类型选择框
	var initTypeSelect = function() {
        $('#select_report_type').xiSelect({
        	offsetSize:[0,3,0,3],defaultData:{value:'1',text:'举报恶意账号'},
        	data:[
        	      {value:'1',text:'举报恶意账号'},
        	      {value:'2',text:'举报恶意网址'},
        	      {value:'3',text:'举报恶意操作'},
        	      {value:'9',text:'举报其它'}]});
    }
	
	var submitReport = function() {
		var type = $("#select_report_type").val();
		var visiousAccount = $("#input_visious_account").val();
		var visiousUrl = $("#input_visious_url").val();
		var description = $("#input_description").val();
		
		if((!onCheckEmpty(visiousAccount)) && (type == 1 || type == 3)) {
			onAlertErrorTip('举报恶意账号或恶意操作时，账号不能为空', document.getElementById('input_visious_account'));
			return false;
		}
		if(!onCheckMaxLength(visiousAccount, 50)) {
			onAlertErrorTip('账号名不能超过50个字符', document.getElementById('input_visious_account'));
			return false;
		} else if(onCheckEmpty(visiousAccount) && (!checkAccountUsername(visiousAccount))) {
			onAlertErrorTip('账号不存在', document.getElementById('input_visious_account'));
			return false;
		}
		if((!onCheckEmpty(visiousUrl)) && type == 2) {
			onAlertErrorTip('举报恶意网址时，网址不能为空', document.getElementById('input_visious_url'));
			return false;
		} 
		if(!onCheckMaxLength(visiousUrl, 500)) {
			onAlertErrorTip('网址不能超过500个字符', document.getElementById('input_visious_url'));
			return false;
		} else if(isChn(visiousUrl)) {
			onAlertErrorTip('网址不能含有中文', document.getElementById('input_visious_url'));
			return false;
		}
		if(!onCheckEmpty(description)) {
			onAlertErrorTip('举报说明不能为空', document.getElementById('input_description'));
			return false;
		} else if(!onCheckMaxLength(description, 600)) {
			onAlertErrorTip('举报说明不能超过600个字符', document.getElementById('input_description'));
			return false;
		}
		
		$.ajax({
	        type: 'POST',
	        dataType: 'json',
	        async : false,
	        url: '/system/reportvisious.htm',
	        data: {
	        	"jb_type" : type,
	        	"visious_account" : visiousAccount,
	        	"visious_url" : visiousUrl,
	        	"jb_description" : description
	        },
	        success: function (data) {
	            if (data.result == 'OK') {
	            	onAlertError('举报成功!',"ok");
	            	dialog.list['Dailogin:Report'].remove().close();
	            } else {                   
	                onAlertError('举报失败!' + data.message);
	            }
	        },
	        error: function (data) {
	        	onAlertError('举报失败!' + data.message);
	        }
		});
	}
	
	return {init:function(){
		newReportDialog();
	}}
}();

function checkAccountUsername(username) {
	var result = false;
	$.ajax({
        type: 'GET',
        dataType: 'json',
        async : false,
        url: '/account/visiousaccount.htm',
        data: {
        	"username" : username
        },
        success: function (data) {
            if (data.result == 'OK') {
            	result = true;
            }
        }
	});
	return result;
}