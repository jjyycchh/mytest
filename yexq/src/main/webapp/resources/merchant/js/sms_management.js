/**
 * Created by wj on 2014/8/16.
 */


var smsmanagementApp = function(){
	
	var smsmanagementList = function(){
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/merchant/searchsms.htm',
			data : {
				'pageNo' : 1,
				'keywords' : "",
				'status' : ""
			},
			success : function(data) {
				if (data.result != 'FAIL' && data.records != null) {
					$("#tbl_Msg_lst").html(generateSMSListHtml(data.records));
					
				} else {
					
					return false;
				}
			},
			error : function(data) {
				
				return false;
			}
		});
			
	}
	
	function generateSMSListHtml(SMSList) {
		var SMSListHtml = "";		
		if (SMSList.length > 0) {			
			for (var i = 0; i < SMSList.length;i++) {
				var id = SMSList[i].id;
				var cellphone = SMSList[i].cellphone;
				var content = SMSList[i].content;
				var iwifitext ="";
				var indexstart = content.indexOf("【");
				var indexend = content.indexOf("】");
				if(indexstart > 0){
					iwifitext = content.substring(indexstart,indexend+1);
					content = content.substring(0,indexstart-1);
				}
				
				var createDatetime = SMSList[i].createDatetime;
				
				SMSListHtml += "<tr class='ChinaNet-Table-Body'>"
			    SMSListHtml +=     "<td class='Table-Data-Name'>" + cellphone + "</td>";
				SMSListHtml +=     "<td class='Table-Data-Name'>" + content + "<span class='Table-Data-Text'>" + iwifitext + "</span></td>";
				SMSListHtml +=     "<td class='Table-Data-Name'>" + createDatetime + "</td>";
				SMSListHtml += "</tr>";
			}
		}

		return SMSListHtml;
	}
	
	
		
	return {init:function(){
		
		smsmanagementList();
		
        
	}}
}();