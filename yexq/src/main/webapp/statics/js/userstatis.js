/**
 * Created by x on 2014/8/11.
 */
var _optAcctId = null;
var userstatisApp = function(){	
    var initChartData  = function(usersStatis){
    	var sin = [];
    	var ticks= [];
    	if (usersStatis != null) {
    		for(var i=0;i<24;i++){
    			if(typeof(usersStatis[i])=="undefined"){				
    				sin.push(0);
    			}else{
    				sin.push(usersStatis[i]);
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
        			formatter: function() { return this.x +'点接入用户数: <b>'+ this.y +' </b>人'; },
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
                        //point: { events: { 'mouseOver': function() { alert('a') } } }, 
                        point: { events: { 'click': function(e) { inituserpoint(this.x, e.pageX,e.pageY); } } }, 
                        threshold: null
                    },
                    series:{events:{legendItemClick : false }}
                },
        		series: [{
        		name: '用户数(个)',
        		data: sin
        		}]
            });
		}
    }
    var inituserpoint = function(chkhour,pagex,pagey){
    	showLoading();
    	$.ajax({
    		type : 'GET',
    		dataType : 'json',
    		url : '/user/userpoint.htm',
    		data : {
    			'date' : $("#ChoiceDate").val(),
    			'hour' : chkhour,
    			'deviceid' : $("#deviceList").val(),
    			'accountid' : _optAcctId
    		},   		
    		success : function(data) {
    			if (data.result != 'FAIL') {    				
    				var pointHtml = "";
    				var authtypeNum = 0;
    				var siterandNum = 0;
    				pointHtml += '<div class="ChinaNet-Form-Sheet">'+
    							 '	<label class="Form-Item-Title-Right ChinaNet-Col-3">新用户数：</label>'+
    							 '	<label class="Form-Item-Title-Left ChinaNet-Col-3">'+ data.userCountNew +'</label>'+
    							 '	<label class="Form-Item-Title-Right ChinaNet-Col-3">老用户数：</label>'+
    							 '  <label class="Form-Item-Title-Left ChinaNet-Col-3">'+ (data.userCountAll-data.userCountNew)+'</label>'+
    							 '  <label class="Form-Item-Title-Center Form-Item-Background ChinaNet-Col-6">用户认证方式排行</label>'+
    							 '  <label class="Form-Item-Title-Center Form-Item-Background ChinaNet-Col-6">推送站点排行</label>'+
    							 '</div>'+
    							 '<div class="ChinaNet-Form-List">'+
    							 '	<ul>'+
    							 '		<li class="ChinaNet-Form-List-One" >';    				
								 for(var i=0;i<data.authTypeList.length;i++){	
									pointHtml += '<label class="Form-Item-Title-List-Right ChinaNet-Col-6">'+PORTAL_AUTH_TYPE.getCnNameByEnName(data.authTypeList[i].auth_type)+'：</label>'+
											   	 '<label class="Form-Item-Title-List-Left ChinaNet-Col-6">'+data.authTypeList[i].auth_count+'</label>';
								 	authtypeNum++;
									if (authtypeNum == 3) break;	
								 }
    							 
    				pointHtml += '		</li>'+
    							 '		<li class="ChinaNet-Form-List-One" >';
    							 for(var i=0;i<data.siteRankList.length;i++){
    								 pointHtml += '<label class="Form-Item-Title-List-Right ChinaNet-Col-6">'+data.siteRankList[i].site_name+'：</label>'+
									              '<label class="Form-Item-Title-List-Left ChinaNet-Col-6">'+data.siteRankList[i].site_count+'</label>'; 
    							 	 siterandNum++;
    							 	 if (siterandNum == 3) break;	
    							 }
    							 
    				pointHtml += 		'</li>'+
    							 '	</ul>'+
    							 '</div>';
    							     							     				
    				var d = dialog({
    		            id:'UserPoint',
    		            title: chkhour+'点详细数据',
    		            quickClose: true,
    		            top:pagey,
    		            left:pagex,
    		            width:400,
    		            height:220,
    		            content:pointHtml
    		        });
    		        d.show();
    				    				
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
    var userstatis = function(chkdate){
    	showLoading();
    	$.ajax({
    		type : 'GET',
    		dataType : 'json',
    		url : '/user/useranalyse.htm',
    		data : {
    			'date' : chkdate,
    			'deviceid' : $("#deviceList").val(),
    			'accountid' : _optAcctId
    		},
    		success : function(data) {
    			if (data.result != 'FAIL') {
    				initChartData(data.usersstatis);   	
    				initAuthDetails(data.authDetails);
    				initTerminalDetails(data.terminalDetails);
    				initBrowserDetails(data.browserDetails);
    				initUserDetail(data.userPreDayDetail,data.userCurDayDetail,data.userDetailNewPre,data.userDetailOldPre);   				
    				initUserDetailPie(data.userPreDayDetail,data.userCurDayDetail);
    			} else {
    				onAlertError(data.message);	
    				closeLoading();
    				return false;
    			}
    			closeLoading();
    		},
    		error : function(data) {
    			//onAlertError(data.message);
    			closeLoading();
    			return false;
    		}
    	});
    }
    var initUserDetailPie = function(userPreDayDetail,userCurDayDetail){
    	var userCount = [['老用户',userPreDayDetail.usercount],['新用户',userCurDayDetail.usercount]];
    	$('#Statistic-User-Body').highcharts({
            credits:false,
            colors: ["#52c6ae", "#ec7b53"],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                style:{fontFamily:'Microsoft YaHei'}
            },
            plotOptions: {
            	pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                    	enabled: true, color: '#fff',distance: -25, connectorColor: '#000000',style:{fontFamily:'Microsoft YaHei'}, format: '{point.percentage:.1f} %'
                    },
                    showInLegend: false
                }
            },
            //legend: { layout: 'vertical', align: 'left', verticalAlign: 'middle', borderWidth: 0 },
            series: [{
                type: 'pie',
                name: '占比',
                data: userCount
            }]
        });
    }
    var initUserDetail = function(userPreDayDetail,userCurDayDetail,userDetailNewPre,userDetailOldPre){
    	var UserDetailHtml = "";
    	var preonlinetime=formatTime(isNotEmptyString(userPreDayDetail.onlinetime)?new Number(userPreDayDetail.onlinetime):0);    	
    	var curonlinetime=formatTime(isNotEmptyString(userCurDayDetail.onlinetime)?new Number(userCurDayDetail.onlinetime):0);
    	var newcount = Math.abs(userCurDayDetail.usercount - userDetailNewPre.usercount);
    	var userCurDayDetailolt,userDetailNewPreolt,userPreDayDetailolt,userDetailOldPreolt;
    	userCurDayDetailolt = isNotEmptyString(userCurDayDetail.onlinetime)?userCurDayDetail.onlinetime:0;
    	userDetailNewPreolt = isNotEmptyString(userDetailNewPre.onlinetime)?userDetailNewPre.onlinetime:0;
    	userPreDayDetailolt = isNotEmptyString(userPreDayDetail.onlinetime)?userPreDayDetail.onlinetime:0;
    	userDetailOldPreolt = isNotEmptyString(userDetailOldPre.onlinetime)?userDetailOldPre.onlinetime:0;
    	var newtime = formatTime(Math.abs(userCurDayDetailolt - userDetailNewPreolt));
    	var oldcount = Math.abs(userPreDayDetail.usercount - userDetailOldPre.usercount);
    	var oldtime = formatTime(Math.abs(userPreDayDetailolt - userDetailOldPreolt));
    	
    	UserDetailHtml +="<tr class='ChinaNet-Table-Body-High'>";
    	UserDetailHtml +=" <td><span class='Table-Data-Text-Link'>新用户</span></td>";
    	UserDetailHtml +=" <td><span class='Table-Data-Text'>"+userCurDayDetail.usercount+"</span></td>";
    	UserDetailHtml +=" <td><span class='Table-Data-Flow "+setUpClass(userCurDayDetail.usercount,userDetailNewPre.usercount)+"'><span></span>"+newcount+"</span></td>";
    	UserDetailHtml +=" <td><span class='Table-Data-Text'>"+curonlinetime+"</span></td>";
    	UserDetailHtml +=" <td><span class='Table-Data-Flow "+setUpClass(userCurDayDetailolt,userDetailNewPreolt)+"'><span></span>"+newtime+"</span></td>";
    	UserDetailHtml +="</tr>";
    	UserDetailHtml +="<tr class='ChinaNet-Table-Body-High'>";
    	UserDetailHtml +=" <td><span class='Table-Data-Text-Link'>老用户</span></td>";
    	UserDetailHtml +=" <td><span class='Table-Data-Text'>"+userPreDayDetail.usercount+"</span></td>";
    	UserDetailHtml +=" <td><span class='Table-Data-Flow "+setUpClass(userPreDayDetail.usercount,userDetailOldPre.usercount)+"'><span></span>"+oldcount+"</span></td>";
    	UserDetailHtml +=" <td><span class='Table-Data-Text'>"+preonlinetime+"</span></td>";
    	UserDetailHtml +=" <td><span class='Table-Data-Flow "+setUpClass(userPreDayDetailolt,userDetailOldPreolt)+"'><span></span>"+oldtime+"</span></td>";
    	UserDetailHtml +="</tr>";
    	$("#UserDetail_body").html(UserDetailHtml);
    }
    var setUpClass = function(a,b){
    	if(a<b){
    		return 'Table-Flow-Down';
    	}else{
    		return 'Table-Flow-Up';
    	}
    }
    var initAuthDetails = function(authDetails){
		var AuthDetailsHtml = "";
		var Num = 0;
		if (authDetails.length > 0) {
			authDetails.sort(function (a, b) {
	    		  return b.authCount- a.authCount;
	    		});
			for ( var i = 0; i < authDetails.length; i++) {
				var auth_Type = isNotEmptyString(authDetails[i].authType)?PORTAL_AUTH_TYPE.getCnNameByEnName(authDetails[i].authType):"";
				var auth_Count = authDetails[i].authCount;
				AuthDetailsHtml += "<tr class='ChinaNet-Table-Body-High'>";
				AuthDetailsHtml += "	<td><span class='Table-Data-Name'>"+auth_Type+"</span></td>";
				AuthDetailsHtml += "	<td width='50'><span class='Table-Data-Name-Number'>"+auth_Count+"</span></td>";
				AuthDetailsHtml += "</tr>";
				Num++;
				if (Num == 6) break;
			}
		}
		$("#AuthDetails_body").html(AuthDetailsHtml);
	}
    var initTerminalDetails = function(terminalDetails){
		var TerminalDetailsHtml = "";
		var Num = 0;
		if (terminalDetails.length > 0) {
			terminalDetails.sort(function (a, b) {
	    		  return b.terminalCount- a.terminalCount;
	    		});
			for ( var i = 0; i < terminalDetails.length; i++) {
				var terminal_Type = isNotEmptyString(terminalDetails[i].terminalType)?terminalDetails[i].terminalType:"";
				var terminal_Count = terminalDetails[i].terminalCount;
				TerminalDetailsHtml += "<tr class='ChinaNet-Table-Body-High'>";
				TerminalDetailsHtml += "	<td><span class='Table-Data-Name'>"+terminal_Type+"</span></td>";
				TerminalDetailsHtml += "	<td width='50'><span class='Table-Data-Name-Number'>"+terminal_Count+"</span></td>";
				TerminalDetailsHtml += "</tr>";
				Num++;
				if (Num == 6) break;
			}
		}
		$("#TerminalDetails_body").html(TerminalDetailsHtml);
	}
	var initBrowserDetails = function(browserDetails){
		var BrowserDetailsHtml = "";
		var Num = 0;
		if (browserDetails.length > 0) {
			browserDetails.sort(function (a, b) {
	    		  return b.browserCount- a.browserCount;
	    		});
			for ( var i = 0; i < browserDetails.length; i++) {
				var browser_Type = isNotEmptyString(browserDetails[i].browserType)?browserDetails[i].browserType:"";
				var browser_Count = browserDetails[i].browserCount;
				BrowserDetailsHtml += "<tr class='ChinaNet-Table-Body-High'>";
				BrowserDetailsHtml += "	<td><span class='Table-Data-Name'>"+browser_Type+"</span></td>";
				BrowserDetailsHtml += "	<td width='50'><span class='Table-Data-Name-Number'>"+browser_Count+"</span></td>";
				BrowserDetailsHtml += "</tr>";
				Num++;
				if (Num == 6) break;
			}
		}
		$("#BrowserDetails_body").html(BrowserDetailsHtml);
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
        $('a#changeListPage').die().live('click',function(event){
        	getSelectAccountData();
        });
    }
	var initSelectDevice = function(){		
		$("#divdevlist").show();
		$("#divdevlist").empty();
		$("#divdevlist").html("<input type='text' id='deviceList' name='deviceList'>");
		//$(".xiSelect-Element-Body:eq(1)").empty();
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
	var onSearchUserstati = function(){
		$("#btn_search_userstati").click(function() {
			userstatis($("#ChoiceDate").val());
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
    		userstatis(null);   		
    		onSearchUserstati();
    	}    	
    }
}();

function getSubAccountData(){
    var AccountList = {};
    $.ajax({
        url:'/user/user_merchantlist.htm',
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
        url:'/user/user_devicelist.htm',
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
        url:'/user/user_merchantlist.htm',
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
        url:'/user/user_devicelist.htm',
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
function formatTime(second) {
	return [parseInt(second / 60 / 60 / 24) +'天',parseInt(second / 60 / 60 %24 )+'小时' , parseInt(second / 60 % 60)+'分', second % 60+'秒'].join(" ").replace(/\b(\d)\b/g, "0$1");
}