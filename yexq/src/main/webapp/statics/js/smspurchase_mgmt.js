/**
 * Created by wj on 2014/8/16.
 */


var smspurchaseApp = function(){	
	var smsSearchHandler = null;
	var search_sms_keyword = null;
	
	smsSearchHandler = new searchUtil(generateSMSListHtml, searchFailCallBack, searchErrorCallBack, null, null,
			"tbl_Msg_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next", 
			"/merchant/searchsmspurchase.htm","");
	var keywordsSearch = function() {
		
		smsSearchHandler.setSearchParemeter('startdate', $("#startdate").val());
		smsSearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
		smsSearchHandler.searchWithPreload();		
	}
	var onsearchsms = function(){
		$("#btn_search_sms").click(function() {
			keywordsSearch();
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
	}  	
	var onPurchaseSMS = function(){        
    	$('a#PurchaseSMS').unbind('click').click(function(){
    		 var smsHtml="";
    		 smsHtml += "<div class='PurchaseSMS-Settings-Body'>";
    		 smsHtml += "   <div class='ChinaNet-Form-Sheet'>";
    		 smsHtml += "       <label class='Form-Item-Title ChinaNet-Col-2'>短信条数</label>";
    		 smsHtml += "   	<div class='Form-Item-Input ChinaNet-Col-5'><input type='text' id='input_Msg_number' placeholder='短信条数' class='Input-Control'></div>";
    		 smsHtml += "   </div>";
    		 smsHtml += "   <div class='ChinaNet-Form-Sheet'>";
    		 smsHtml += "       <label class='Form-Item-Title ChinaNet-Col-2'>&nbsp;</label>";
    		 smsHtml += "       <label class='Form-Item-Title ChinaNet-Col-5'>单次购买短信条数不少于100条！</label>";
    		 smsHtml += "	</div>";
				    
    		 smsHtml += "</div>";    		 
		     var d = dialog({
		     	 id: 'Dailogin:PurchaseSMS',
		         title: '购买短信',
		         content: smsHtml,
		         okValue: '确定',
		         ok: doPurchaseSMS,
		         cancelValue: '取消',
		         cancel: function () {},
		         width:520,
		         height:120,
		         skin:'ChinaNet-Dialog'
		     });
		     d.showModal();
    	});
    }
	var doPurchaseSMS = function(){
		var sms_number = $("#input_Msg_number").val();
		var regu = /^\d{3,}/;
		var re = new RegExp(regu); 
		if(!re.test(sms_number)){
			onAlertErrorTip('请输入不小于100的整数', document.getElementById('input_Msg_number'));
            return false;			
		}
		if($("#input_Msg_number").val() >= 100){
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/merchant/purchasesms.htm',
				data : {
					'sms_number' : $("#input_Msg_number").val()				
				},
				success : function(data) {
					if(data.result != 'FAIL'){
						if(data.projectStatus == "TEST_RUN"){
							onAlertError("短信下单成功,项目试运行阶段，短信免费","ok");
						} else {
							onAlertError("短信下单成功","ok");							
							payment(data.smsPurchaseHx.id);
						}						
					}else{
						 	onAlertError(data.message);
				            return false;
					}
				},
				error : function() { 
	 					onAlertError('短信下单失败');
			            return false;
					}
			  });				
		}			
		else{
			onAlertError('输入的数量有误，请核对后重新输入');
		}
		return false;
	}
	/**支付宝付款
	*/
	var payment = function(smsPurchaseHxId){
		$.pnotify({
			title : "正在创建支付宝链接......",
			text : "",
			type : 'success'
		});
		
		var payUrl = '/merchant/payment.htm?smsPurchaseHxId='+smsPurchaseHxId;
		//$("#mypurchaseModal").load(payUrl);
		window.open(payUrl);
	}
	return {init:function(){	
		smsSearchHandler.searchWithPreload();	
		initDatepicker();
		onsearchsms();
		//getsmspurchaseList();	
		//onPurchaseSMS();
	}}
}();

function generateSMSListHtml(SMSList) {
	var SMSListHtml = "";		
	if (SMSList.length > 0) {			
		for (var i = 0; i < SMSList.length;i++) {
			var id = SMSList[i].id ;
			var type = SMSList[i].type;
			var status =SMSList[i].status;
			var amount = SMSList[i].amount;
			var smsNumber = SMSList[i].smsNumber;				 
			var createtime=SMSList[i].createDatetime;				
			SMSListHtml += "<tr class='ChinaNet-Table-Body'>"
		    SMSListHtml +=     "<td class='Table-Data-Name'>" + generate_cn_type(type) + "</td>";
			SMSListHtml +=     "<td><span class='Table-Data-Name'>" + generate_cn_status(status) + "</span></td>";
			SMSListHtml +=     "<td><span class='Table-Data-Name'>" + amount + "</span></td>";
			SMSListHtml +=     "<td><span class='Table-Data-Name'>" + smsNumber + "</span></td>";
			SMSListHtml +=     "<td><span class='Table-Data-Name'>" + createtime + "</span></td>";
			SMSListHtml += "</tr>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	return SMSListHtml;
}
function generate_cn_type(entype){
	var cn_typenamehtml="";
	if(entype=="PURCHASE"){
		cn_typenamehtml="购买";
	}		
	else{// FREE TEST
		cn_typenamehtml="赠送";
	}
	return cn_typenamehtml;	
}

function generate_cn_status(enstatus){
	var cn_namehtml="";
	if(enstatus=="NEW"){
		cn_namehtml="新建";
	}
	else if(enstatus=="PROCESSING"){
		cn_namehtml="处理中";	
	}
	else if(enstatus=="FINISHED"){
		cn_namehtml="完成";
	}		
	else{// LOCKED 
		cn_namehtml="锁定";
	}
	return cn_namehtml;	
}
function searchFailCallBack(data, message) {
	onAlertError('加载短信数据请求提交失败！');
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载短信数据请求提交失败！');
	return false;
}