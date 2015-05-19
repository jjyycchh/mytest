
var selectedname="";
var acctidsArray = [];

var savemessageApp = function(){	
	  var onSaveMessage = function(){
	        $('#btn_save_msg').click(function(){
	           var title = $('input#msg_title').val();	           
	           var content = $("#msg_content").val();	        
	            if(!onCheckEmpty(title)){
	                onAlertErrorTip('请输入信息标题', document.getElementById('msg_title'));
	                return false;
	            }
	            if(!onCheckLength(title)){
	                closeLoading();
	                onAlertErrorTip('您输入的字数太多，请重新输入', $('input#msg_title')[0]);
	                return false;
	            }
	            if(acctidsArray.length == 0){
	                onAlertErrorTip('请选择信息接收者', document.getElementById('portalPolicyDeviceArea'));
	                return false;
	            }	            
	            saveMsg(acctidsArray, title, content);	            
	        })
	    }
	  var SendMessage = function(receiverids, title, content, successCallBack, errorCallBack) {		             
			if (receiverids.length > 0 && isNotEmptyString(title)) {			
				$.ajax({
		            type: 'POST',
		            dataType: 'json',
		            url: "/system/savemessage.htm", 
		            data: {
		            	"receiverids" : JSON.stringify(receiverids), //JSON
		            	"title": title,
		            	"content": content
		            },
		            success: function (data) {
		            	successCallBack(data);
		            },
		            error: function (data) {
		            	errorCallBack(data);
		            }
				});
				
			}

		};
		 /**
	     * 显示子帐号下拉框
	     *
	     */
	  var initSelectAccount = function(){	
	    	 $('#AccountID').xiSelect({
	             offsetSize:[0,3,0,3],
	             height:320,
	             //width:360,
	             defaultData:{value:"", text:""},
	             ajaxData:function(){	                
	             	return '<div class="ChinaNet-Free-Body">' +
	                 '       <div class="Select-SubAccount-Search"></div>' +
	                 '       <div class="Select-SubAccount-Body"></div>' +
	                 '       <div class="Select-SubAccount-Page"><a class="xiSelectItem" href="javascript:;" id="changeListPage">加载更多</a></div>' +
	                 '</div>' +
	                 '<input type="hidden" id="AccountPage" value="1">' +
	                 '<script type="text/javascript">getSelectAccountData();</script>'
	             },
	             
	             
	             onChange:function(){addSelectAccount($("#AccountID").val());},
	             changeClose:false
	            
	         });
	         
	         $('a#changeListPage').live('click',function(){
	         	getSelectAccountData();
	         });	       
	    }
	  
	  var getSelectAcctids = function(selectid){	    	
	    	if(selectid !="" && !acctidsArray.contains(selectid)){
	    	acctidsArray.push(selectid);
	    	showSelectedAcct(selectid);
	    	//alert(acctidsArray.length);
	    	}
	    }
	  var showSelectedAcct = function(selectid){	    		    
	    	$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/account/accountdetails.htm',
				data : {
					'accountId' : selectid
				},
				async:false,
				success : function(data) {			
					if (data.result != 'FAIL' && data.account != null) {
						if (data.account != null) {
							//selectedname += data.account.username + ',';
							//$("#msg_selected").val(selectedname);
							var fullname = isNotEmptyString(data.account.fullname)?('('+data.account.fullname+')'):"";
							$('div.Devices-List-Item-Body a.Add-Account').before('<a href="javascript:;" data-deviceId="'+selectid+'"><span>&nbsp;</span>'+data.account.username+fullname+'</a>');
						}
					} else {
						return false;
					}
				},
				error : function(data) {
					return false;
				}
			});	   
	    	
	    }
	  /*****************************/
	  var addSelectAccount = function(selectid){
		  if(selectid !="" && !acctidsArray.contains(selectid)){
		    	acctidsArray.push(selectid);
		    	showSelectedAcct(selectid);		    	
		  }
	  } 
	  var deletePolicyDevice = function(){
	        $('div#portalPolicyDeviceArea a span').live('click', function(){
	            var device = $(this);	
	            if(acctidsArray.indexOf(device.parent().attr('data-deviceId')) > -1)
	            	acctidsArray.splice(acctidsArray.indexOf(device.parent().attr('data-deviceId')),1);	            
	            if(!device.parent().hasClass('Add-Account')){
	                device.parent().fadeOut(100,function(){
	                    device.parent().remove();
	                });
	            }
	        });
	    }
	  /*****************************/	  
		//save new message 
	  var saveMsg = function (receiverIds, title, content) {		
			SendMessage(receiverIds, title, content, saveMsgSuccessCallBack, saveMsgErrorCallBack);			
		};
	  var saveMsgSuccessCallBack = function(data) {
			$("#msg_title").val("");
			$("#msg_content").val("");		
			onAlertError("发送信息成功!");	    
		};
	  var saveMsgErrorCallBack = function(data) {
			onAlertError("发送信息失败!");		
		};
		
		
	  return {init:function(){	
		initSelectAccount();
		onSaveMessage();
		deletePolicyDevice();
	}}
}();

function getSelectAccountData(){
    var page = $('input#AccountPage').val();
    var keyword = $('input#AccountKeyword').val();
    $.ajax({
        url:'/account/searchaccount.htm',
        type:'GET',
        dataType:'JSON',
        data:{pageNo:page,keywords:keyword},
        async:false,
        success:function(data){
            if(data.totalResult>0){
            	
                if(data.records.length>0){
                    var listHtml = '';
                    var merchantName = '';
                    for(var mx=0;mx<data.records.length;mx++){
                        var accountData = data.records[mx];                                                
                        merchantName = isNotEmptyString(accountData.fullname)?('('+accountData.fullname+')'):"";
                        listHtml += '<a href="javascript:;" data-value="'+accountData.id+'" data-text="'+accountData.username+'" class="xiSelectItem">' +
                            '    <div class="Template-For-Account-List">' +
                            '        <div class="Account-Profile-Body">' +
                            '            <span class="Account-Name">'+accountData.username+merchantName+'</span>' +
                            '        </div>' +
                            '    </div>' +
                            '</a>';
                    }

                    $('div.Select-SubAccount-Body').append(listHtml);
                    page = parseInt(page)+1;
                    $('input#AccountPage').val(page);
                    
                }
            }
        }
    })
}