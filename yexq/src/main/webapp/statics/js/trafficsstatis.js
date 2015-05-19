/**
 * Created by x on 2014/8/11.
 */
var _optAcctId = null;
var trafficsstatisApp = function(){

    var initChartData  = function(usersStatis){
    	var sin = [];
    	var ticks= [];
    	if (usersStatis != null) {
    		for(var i=0;i<24;i++){
    			if(typeof(usersStatis[i])=="undefined"){				
    				sin.push(0);
    			}else{
    				sin.push(Math.round(usersStatis[i]/1024/1024));
    			}
    			ticks.push(i);	
    		}
    	}
    	if($('div.Statis-Body-Guest').length>0) {
            $('div.Statis-Body-Guest').highcharts({
            	credits:false,
        		chart: {
        			type: 'area',
                    borderRadius:2,
                    backgroundColor:'#fff'
        		},
        		
        		title: { text: '' }, 
        		subtitle: { text: '' }, 
        		xAxis: { 
        			categories:ticks,
        			gridLineWidth:1,
        			gridLineColor:'#eee',
        			labels: {
                        style:{
                            color:'#17bd9b',
                            fontFamily:'Microsoft YaHei'
                        }
                    }
        		}, 
        		yAxis: { 
        			title: {
                        text: ''
                    },
                    min:0,
                    gridLineWidth:1,
                    allowDecimals:false,
                    gridLineColor:'#eee'
        		}, 
        		tooltip: {  			
        			formatter: function() { return this.x +'点 流量: <b>'+ this.y +' </b>M'; },
        			style:{fontFamily:'Microsoft YaHei'}
        		},
        		
        		legend: { 
        			 	align:'right',
                        verticalAlign:'top',
                        floating:true,
                        symbolRadius:2,
                        symbolHeight:12,
                        symbolWidth:12,
                        itemStyle:{
                            fontFamily:'Microsoft YaHei'
                        }
        		},
        		plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        lineWidth: 1,                        
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    },
                    series:{events:{legendItemClick : false }}
                },
        		series: [{
        			name: '流量(M)',
        			data: sin
        			}]
            });
		}
    }
     
    var trafficsstatis = function(chkdate){
    	showLoading();
    	$.ajax({
    		type : 'GET',
    		dataType : 'json',
    		url : '/merchant/trafficanalyse.htm',
    		data : {
    			
    			'date' : chkdate,
    			'deviceId' : $("#deviceList").val(),
    			'accountId' : _optAcctId
    		},   		
    		success : function(data) {
    			if (data.result != 'FAIL' && data.trafficstatis != null) {
    				initChartData(data.trafficstatis);
    				
    			} else {
    				onAlertError(data.message);	
    				closeLoading();
    				return false;
    			}
    			closeLoading();
    		},
    		error : function(data) {
    			closeLoading();
    			return false;
    		}
    	});
    }
    var initSelectAccount = function(){
		$('a.dontClose').die().live('click', function(event){
	        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	        return false;
		});
		var keywords = '', page = 1;
        $('#merchantList').xiSelect({
            offsetSize:[0,3,0,3],
            height:320,
            defaultData:{value:"", text:"全部商户"},
            ajaxData:function(){
                var accountHtml = '';
                //var accountList = getSubAccountData();
                var merchantName ='';	
                accountHtml += '<a href="javascript:;" data-value="" data-text="全部商户" class="xiSelectItem">' +
                '    <div class="Template-For-Account-List">' +
                '        <div class="Account-Profile-Body">' +
                '            <span class="Account-Name">全部商户</span>' +
                '        </div>' +
                '    </div>' +
                '</a>';
                return '<div class="ChinaNet-Free-Body">' +
                '       <div class="Select-SubAccount-Search"></div>' +
                '       <div class="Select-SubAccount-Body" id="AccountBody">'+accountHtml+'</div>' +
                '       <div class="Select-SubAccount-Page" id="AccountMore"><a class="dontClose" data-value="00" href="javascript:;" id="changeListPage">加载更多</a></div>' +
                '</div>' +
                '<input type="hidden" id="AccountKeyword" value="'+keywords+'" /><input type="hidden" id="AccountPage" value="'+page+'">' +
                '<script type="text/javascript">getSelectAccountData();</script>';
            },
            isCombo:true,
            onChange:function(){_optAcctId=$("#merchantList").val();if(_optAcctId!='00')initSelectDevice();},
            changeClose:true,
            keySearch:function(k){
            	keywords = k;
            	page = 1;
            }
        });
        $('#merchantList-text').focus(function(){
        	if(this.value == '全部商户') this.value = '';
        });
        $('a#changeListPage').die().live('click',function(){
        	getSelectAccountData();
        });
    }
	var initSelectDevice = function(){		
		$("#divdevlist").show();
		$("#divdevlist").empty();
		$("#divdevlist").html("<input type='text' id='deviceList' name='deviceList'>");
        $('#deviceList').xiSelect({
            offsetSize:[0,3,0,3],
            height:320,
            defaultData:{value:"", text:"全部设备"},
            ajaxData:function(){
                var deviceHtml = '';
                //var deviceList = getSubDeviceData();
                deviceHtml += '<a href="javascript:;" data-value="" data-text="全部设备" class="xiSelectItem">' +
                '    <div class="Template-For-Account-List">' +
                '        <div class="Account-Profile-Body">' +
                '            <span class="Account-Name">全部设备</span>' +
                '        </div>' +
                '    </div>' +
                '</a>';
                return '<div class="ChinaNet-Free-Body">' +
                '       <div class="Select-SubAccount-Search"></div>' +
                '       <div class="Select-SubAccount-Body" id="DeviceBody">'+deviceHtml+'</div>' +
                '       <div class="Select-SubAccount-Page" id="DeviceMore"><a class="xiSelectItem" href="javascript:;" id="devchangeListPage">加载更多</a></div>' +
                '</div>' +
                '<input type="hidden" id="DevicePage" value="1">' +
                '<script type="text/javascript">getSelectDeviceData();</script>';
            },
            
            changeClose:true
        });
        $('a#devchangeListPage').die().live('click',function(){
        	getSelectDeviceData();
        });
    }
	var onSearchtrafficstati = function(){
		$("#btn_search_userstati").click(function() {
			trafficsstatis($("#ChoiceDate").val());
		});
	}
    return {
    	init:function(){
    		if(__CONTEXT_MERCHANT_CODE == ACCOUNT_TYPE.MERCHANT){
    			_optAcctId = __CONTEXT_MERCHANT_KEY;
    			$("#divmerlist").hide();
    			$("#divdevlist").show();
    			initSelectDevice();
    		}else{
    			$("#divmerlist").show();
    			$("#divdevlist").hide();
    			initSelectAccount();
    		}
    		trafficsstatis(null);
    		onSearchtrafficstati();
    	}    	
    }
}();

function getSubAccountData(){
    var AccountList = {};
    $.ajax({
        url:'/merchant/merchant_merchantlist.htm',
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

function getSubDeviceData(){
    var DeviceList = {};
    $.ajax({
        url:'/merchant/merchant_devicelist.htm',
        type:'GET',
        dataType:'JSON',
        data:{accountid: _optAcctId},
        async:false,
        success:function(data){
            if(data.totalResult>0){
                for(i=0;i<data.records.length;i++){
                	DeviceList = data.records;
                }
            }
        }
    });
    return DeviceList;
}

function getSelectAccountData(){
    var page = $('input#AccountPage').val();
    var keyword = $('input#AccountKeyword').val();
    $.ajax({
        url:'/merchant/merchant_merchantlist.htm',
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
            }
        }
    })
}

function getSelectDeviceData(){
    var page = $('input#DevicePage').val();
    var keyword = $('input#DeviceKeyword').val();
    $.ajax({
        url:'/merchant/merchant_devicelist.htm',
        type:'GET',
        dataType:'JSON',
        data:{pageNo:page,devicename:keyword,accountid: _optAcctId},
        async:false,
        success:function(data){
            if(data.totalResult>0){            	
                if(data.records.length>0){
                    var listHtml = '';
                    var devname = '';                   
                    for(var mx=0;mx<data.records.length;mx++) {     
                    	var deviceList = data.records[mx];
                    	devname = isNotEmptyString(deviceList.name)?deviceList.name+'('+deviceList.mac+')':deviceList.mac;
                    	listHtml += '<a href="javascript:;" data-value="'+deviceList.deviceId+'" data-text="'+devname+'" class="xiSelectItem">' +
                            '    <div class="Template-For-Account-List">' +
                            '        <div class="Account-Profile-Body">' +
                            '            <span class="Account-Name">'+devname+'</span>' +
                            '        </div>' +
                            '    </div>' +
                            '</a>';
                    }	
                    $('div#DeviceBody').append(listHtml);
                    page = parseInt(page)+1;
                    $('input#DevicePage').val(page);
                    
                }
                if(data.totalResult<10){
                	$("#DeviceMore").empty();
                }
            }else{
            	$("#DeviceMore").empty();
            }
        }
    })
}
