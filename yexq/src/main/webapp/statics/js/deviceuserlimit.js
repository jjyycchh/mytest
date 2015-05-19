
var optAcctId = null;
var deviceuserlimitApp = function(){
	var initSelectAccount = function(){
		$('a.dontClose').die().live('click', function(event){
	        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	        return false;
		});
		var keywords = '', page = 1;
        $('#inputmerchant').xiSelect({
            offsetSize:[0,3,0,3],
            height:320,
            ajaxData:function(){
                var accountHtml = '';
                return '<div class="ChinaNet-Free-Body">' +
                '       <div class="Select-SubAccount-Search"></div>' +
                '       <div class="Select-SubAccount-Body" id="AccountBody"></div>' +
                '       <div class="Select-SubAccount-Page" id="AccountMore"><a class="dontClose" data-value="" href="javascript:;" id="changeListPage">加载更多</a></div>' +
                '</div>' +
                '<input type="hidden" id="AccountKeyword" value="'+keywords+'" /><input type="hidden" id="AccountPage" value="'+page+'">' +
                '<script type="text/javascript">getSelectAccountData();</script>';
            },
            isCombo:true,
            skinClass:'Portal-Site-Editor-Account',
            changeClose:true,
            keySearch:function(k){
            	keywords = k;
            	page = 1;
            	$("#inputmerchant").val('');
            	$("#inputMaxTraffic").val('');
				$("#inputMaxTime").val('');
            },
            onChange:function(){optAcctId = $("#inputmerchant").val();if(optAcctId!='')LoadLimitationData(optAcctId);}
            //defaultData:{value:__CONTEXT_MERCHANT_KEY,text:__CONTEXT_MERCHANT_FULLNAME}
        });
        $('a#changeListPage').die().live('click',function(){
        	getSelectAccountData();
        });
    }
	var LoadLimitationData = function(accountid) {
		showLoading(); 
		$.ajax({
					type : 'GET',
					dataType : 'json',
					url : '/device/deviceuserlimitation.htm',
					data : {
						'accountid' : accountid
					},					
					success : function(data) {
						closeLoading();
						if (data.result != 'FAIL') {
							$("#inputMaxTraffic").val(data.trafficlimit);
							$("#inputMaxTime").val(data.minslimit);
							/*remove smslimit for version 2.1 **/
//							$("#inputMaxSms").val(data.smslimit);
						} else {
 							
 							$("#inputMaxTraffic").val('');
							$("#inputMaxTime").val('');
							/*remove smslimit for version 2.1 **/
//							$("#inputMaxSms").val('');
							return false;
						}
					},
					error : function(data) {
						closeLoading();
						return false;
					}
				});
	}
	return {init:function(){			
		if(__CONTEXT_MERCHANT_CODE==ACCOUNT_TYPE.MERCHANT){
			optAcctId = __CONTEXT_MERCHANT_KEY;
			$("div#divmerchant").hide();
			LoadLimitationData(optAcctId);
		}else{
			initSelectAccount();
		}
	}}
}();

function getSelectAccountData(){
    var page = $('input#AccountPage').val();
    var keyword = $('input#AccountKeyword').val();
    $.ajax({
        url:'/device/device_merchantlist.htm',
        type:'GET',
        dataType:'JSON',
        data:{pageNo:page,merchantname:keyword},
        async:false,
        success:function(data){
            if(data.totalResult>0){
            	
                if(data.records.length>0){
                    var listHtml = '';
                    var merchantName = '';
                    for(var mx=0;mx<data.records.length;mx++){
                        var accountData = data.records[mx];                                                
                        merchantName = isNotEmptyString(accountData.merchantName)?('('+accountData.merchantName+')'):"";
                        listHtml += '<a href="javascript:;" data-value="'+accountData.id+'" data-text="'+accountData.username+'" class="xiSelectItem">' +
                            '    <div class="Template-For-Account-List">' +
                            '        <div class="Account-Profile-Body">' +
                            '            <span class="Account-Name">'+accountData.username+merchantName+'</span>' +
                            '        </div>' +
                            '    </div>' +
                            '</a>';
                    }

                    $('div#AccountBody').append(listHtml);
                    page = parseInt(page)+1;
                    $('input#AccountPage').val(page);
                    
                }
                if(data.totalResult<10){
                	$("#AccountMore").empty();
                }
            }else{
            	$("#AccountMore").empty();
            	$("#AccountMore").html("没有找到关键字含"+keyword+"的商户");
            }
        }
    })
}
function getSubAccountData(){
    var AccountList = {};
    $.ajax({
        url:'/device/device_merchantlist.htm',
        type:'GET',
        dataType:'JSON',
        data:{},
        async:false,
        success:function(data){
            if(data.totalResult>0){
                for(i=0;i<data.records.length;i++){
                     AccountList = data.records;
                }
            }
        }
    });
    return AccountList;
}
function saveLimitation(){
	if(__CONTEXT_MERCHANT_CODE!=ACCOUNT_TYPE.MERCHANT){
    	if($('#inputmerchant').val()==''){
    		onAlertErrorTip('请选择商户', document.getElementById('divmerchants'));
			return false;
		}else{
			optAcctId = $('#inputmerchant').val();        			
		}
	}
	
	/*remove smslimit for version 2.1 **/
	/*if(!checkInt($("#inputMaxSms").val())){
		onAlertErrorTip('请输入一个整数', document.getElementById('inputMaxSms'));
        return false;
	}*/
	if(!checkInt($("#inputMaxTime").val())){
		onAlertErrorTip('请输入一个介于  10  和  2880  之间的整数值', document.getElementById('inputMaxTime'));
        return false;
	}else if($("#inputMaxTime").val()<10 || $("#inputMaxTime").val()>2880){
		onAlertErrorTip('请输入一个介于  10  和  2880  之间的整数值', document.getElementById('inputMaxTime'));
        return false;
	}
	if(!checkInt($("#inputMaxTraffic").val())){
		onAlertErrorTip('请输入一个介于  1 和  10240 之间的整数值', document.getElementById('inputMaxTraffic'));
        return false;
	}else if($("#inputMaxTraffic").val()<1 || $("#inputMaxTraffic").val()>10240){
		onAlertErrorTip('请输入一个介于  1 和  10240 之间的整数值', document.getElementById('inputMaxTraffic'));
        return false;
	}
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/device/devicesavelimitation.htm',
        data: {
			'accountid' : optAcctId,
			'minslimit' : $("#inputMaxTime").val(),
			'trafficlimit' : $("#inputMaxTraffic").val()
			/*remove smslimit for version 2.1 **/
			/*,
			'smslimit' : $("#inputMaxSms").val()*/
		},
        success: function (data) {
            if (data.result == 'OK') {
            	onAlertError('商户配置 成功',"ok");
            	dialog.list['Dailogin:Device:Userlimit'].remove().close();
			} else {
				onAlertError(data.message);
				return false;
			}
        },
        error: function (data) {
        	onAlertError('设置失败');
			return false;
        }
    });
}
	