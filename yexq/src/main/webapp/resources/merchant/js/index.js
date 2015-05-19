/**
 * Created by hx on 2014/8/7.
 */

var indexApp = function(){
    var initUserPhone = function(){
        var bindPhoneHTML = [
            '<div class="Phone-Binded-Body">',
                '<div class="Phone-Binded-Title">',
                    '欢迎登录爱wifi商户服务系统<br/>为了您的账号安全，请您先绑定手机号码',
                '</div>',
                '<div class="Phone-Binded-Sheet">',
                    '<label>手机号码：</label>',
                    '<div class="Phone-Binded-Input"><input id="input_bdphone_cellphone" type="text" placeholder="请输入手机号码" value=""/></div>',
                    '<input id="btn_bdphone_submitPhone" class="Phone-Binded-Button" type="button" value="获取验证码" timer="60"/>',
                '</div>',
                '<div class="Phone-Binded-Sheet">',
                    '<label>&emsp;验证码：</label>',
                    '<div class="Phone-Binded-Input"><input id="input_bdphone_verification" type="text" placeholder="请输入验证码" value=""/></div>',
                '</div>',
            '</div>'
        ];

        var bindPhoneShow = dialog({
            id: 'Dailogin:BindPhoneShow',
            title: '重要提示',
            content: bindPhoneHTML.join(''),
            okValue: '确定',
            ok: function(){
                return BindPhone();
            },
            cancelValue: '取消',
            cancel: function(){ },
            width: 620,
            height: 260,
            skin: 'ChinaNet-Dialog'
        });
        bindPhoneShow.showModal();

        // 获取验证码按钮事件
        $('input#btn_bdphone_submitPhone').off('click').on('click', function(){
            var phone  = $("#input_bdphone_cellphone").val();
            if(!onCheckEmpty(phone)){
                onAlertErrorTip('请输入手机号码', document.getElementById('input_bdphone_cellphone'));
                return;
            }

            $.ajax({
                type : 'GET',
                dataType : 'json',
                url : '/account/sendbindingcode.htm',
                data : {
                    account_id: __CONTEXT_MERCHANT_KEY,
                    cell_number: $('#input_bdphone_cellphone').val()
                },
                async:false,
                success:function(data) {
                    console.log(data);
                    if (data.result == 'OK') {
                        //  请求成功，限制60秒后重发
                        getMsgcodeTimer();
                    }else{
                        onAlertErrorTip(data.message || '系统异常', document.getElementById('input_bdphone_cellphone'));
                    }
                }
            });
        });
    }
    // 验证码获取60秒计时
    var getMsgcodeTimer  = function(){
        var btn  = document.getElementById('btn_bdphone_submitPhone');
        btn.disabled = true;

        var getMsgcodeTimerHandle = setInterval(function(){
            var $btn  = $("#btn_bdphone_submitPhone");
            if($btn.length == 0){
                clearInterval(getMsgcodeTimerHandle);
            }
            var timer = (parseInt($btn.attr('timer'), 10) || 0) - 1;
            $btn.attr('timer', timer);
            $btn.val('（' + timer + '秒）');
            if(timer == 0){
                clearInterval(getMsgcodeTimerHandle);
                $btn.val('重新获取').attr('timer', 60);
                $btn[0].disabled = false;
            }
        }, 1000);
    }
    // 绑定手机
    var BindPhone = function(){
        var flag = false;
        var phone  = $("#input_bdphone_cellphone").val();
        var msgcode  = $("#input_bdphone_verification").val();

        if(!onCheckEmpty(phone)){
            onAlertErrorTip('请输入手机号码', document.getElementById('input_bdphone_cellphone'));
            return flag;
        }
        if(!onCheckEmpty(msgcode)){
            onAlertErrorTip('请输入验证码', document.getElementById('input_bdphone_verification'));
            return flag;
        }
        showLoading();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/account/bindcellnumber.htm',
            data: {
                account_id: __CONTEXT_MERCHANT_KEY,
                cell_number: phone,
                binding_code: msgcode
            },
            async: false,
            success: function(data) {
                if (data.result == 'OK') {
                    // 绑定成功
                    __CONTENT_PHONEBINDED = 'true';
                    flag = true;
                }else{
                    onAlertError(data.message || '系统异常');
                }
            },
            complete: function() {
                closeLoading();
            }
        });
        return flag;
    }
    var initUsers = function(){
        showLoading();
        $.ajax({
            type : 'GET',
            dataType : 'json',
            url : '/statis/user/usernumstatistics.htm',
            data : {
                merchantid: __CONTEXT_MERCHANT_KEY
            },
            success : function(data) {
                if (data.result == 'OK') {
                    $("#userNewUserCount").html(data.newusercount);
                    $("#userOldUserCount").html(data.oldusercount);
                    $("#userOnLineCount").html(data.useronlinecount);
                    var userCount = [['新用户', data.newusercount],['老用户', data.oldusercount]];
                    initPieChartUsers(userCount);
                }
            },
            complete : function() {
                closeLoading();
            }
        });
    }
    var initPieChartUsers = function(userCount){
        $('div.Chart-Online-Guest').highcharts({
            chart: {
                reflow:false,
                height:200,
                backgroundColor:'#fafafa'
            },
            colors: ['#ec7b53', '#999999'],
            credits:true,
            title:{text:'',floating:true},
            tooltip: {
                pointFormat: '{series.name}<b>{point.percentage:.1f}%</b>',
                style:{
                    fontFamily:'Microsoft YaHei'
                }
            },
            plotOptions: {
                pie: {
                    startAngle: 0,
                    endAngle:360,
                    allowPointSelect: true,
                    borderWidth:0,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    innerSize:118
                }
            },
            series: [{
                type: 'pie',
                name: ' ',
                data: userCount
            }]
        });
    }
    var initADInfo = function(){
        showLoading();
        $.ajax({
            type : 'GET',
            dataType:'jsonp',
            url : __CONTENT_ADHOST + '/advert/thridInter/showcount',
            data : {
                account_id: __CONTEXT_MERCHANT_KEY
            },
            success : function(data) {
                if (data.result == 'OK') {
                    $("#adPushTimeToday").html(data.today_push);
                    $("#adPushTimeHistory").html(data.total_push);
                    var adCount = [['今日广告投放次数',   data.today_push],['历史广告投放次数',   data.total_push]];
                    initPieChartAD(adCount);
                }
            },
            complete : function() {
                closeLoading();
            }
        });
    }
    var initPieChartAD = function(adCount){
        $('div.Chart-Online-AD').highcharts({
            chart: {
                reflow:false,
                height:200,
                backgroundColor:'#fafafa'
            },
            colors: ['#ec7b53', '#999999'],
            credits:true,
            title:{text:'',floating:true},
            tooltip: {
                pointFormat: '{series.name}<b>{point.percentage:.1f}%</b>',
                style:{
                    fontFamily:'Microsoft YaHei'
                }
            },
            plotOptions: {
                pie: {
                    startAngle: 0,
                    endAngle:360,
                    allowPointSelect: true,
                    borderWidth:0,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    innerSize:118
                }
            },
            series: [{
                type: 'pie',
                name: ' ',
                data: adCount
            }]
        });
    }
    var initTPInfo = function(){
        showLoading();
        $.ajax({
            type : 'GET',
            dataType : 'json',
            url : '/system/get_top_message.htm',
            data : {
                account_id: __CONTEXT_MERCHANT_KEY
            },
            success : function(data, textStatus, jqXHR) {
                if (data.result != 'FAIL') {
                    initTPInfosList(data.messages);
                } else {
                    //onAlertError(data.message);
                    return false;
                }
                closeLoading();
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                closeLoading();
                //onAlertError('数据加载失败!');
                return false;
            }
        });
    }

    var initTPInfosList = function(data){
        var clsMap = {
            'member_alert':'Info-User-Icon',
            'device_alert':'Info-List-Icon',
            'system_msg':'Info-Msg-Icon'
        }
        var html = [];
        for(var i=0; i<data.length; i++){
            html.push('<li class="', clsMap[data[i].type], '">',
                '<div class="Index-TP-Info-Time">', data[i].create_datetime, '</div>',
                '<a href="javascript:;" class="Index-TP-Info-Title" infoid="', data[i].id, '">', data[i].title, '</a><span class="Index-TP-Info-Intro">', data[i].content, '</span>',
            '</li>');
        }
        $('ul#Index-TP-Infos-List').html(html.join(''));
    }

    var onTPInfoClick = function(){
        $('ul#Index-TP-Infos-List').off('click', 'a').on('click', 'a', function(e){
            var $el = $(this).parent();

            var infoHtml = [
                '<div class="TP-Info-Body">',
                    '<table cellspacing=0>',
                        '<tbody>',
                            '<tr>',
                                '<td class="TP-Info-Title">消息标题：</td>',
                                '<td>', $el.find('.Index-TP-Info-Title').text(), '</td>',
                            '</tr>',
                            '<tr>',
                                '<td class="TP-Info-Title">消息类型：</td>',
                                '<td><div class="', $el.attr('class'), '"></div></td>',
                            '</tr>',
                            '<tr>',
                                '<td class="TP-Info-Title">接收时间：</td>',
                                '<td>', $el.find('.Index-TP-Info-Time').text(), '</td>',
                            '</tr>',
                            '<tr>',
                                '<td class="TP-Info-Title" valign="top">消息内容：</td>',
                                '<td>', $el.find('.Index-TP-Info-Intro').text(), '</td>',
                            '</tr>',
                        '</tbody>',
                    '</table>',
                '</div>'
            ];

            var infoShow = dialog({
                id: 'Dailogin:InfoShow',
                title: '消息详情',
                content: infoHtml.join(''),
                okValue: '关闭',
                ok: function(){ },
                width: 630,
                //height: 300,
                skin: 'ChinaNet-Dialog'
            });
            infoShow.showModal();
            //refreshAccountInfo(_dataTemp);
            //editUserInfo();
        });
    }
    /*
	var initUsers = function(){
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/homeusers.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL') {
					$("#userOnLineCount").html(data.userOnLineCount);
					$("#userOffLineCount").html(data.userOffLineCount);
					$("#userAllCount").html(data.userAllCount);
					var userCount = [['在线用户数',   data.userOnLineCount],['离线用户数',   data.userOffLineCount]];
					initPieChartUsers(userCount); 	
				} else {					
					//onAlertError(data.message);
					return false;
				}
				closeLoading();
			},
			error : function(data) {
				closeLoading();
				//onAlertError('数据加载失败!');
				return false;
			}
		});
	}
	*/
	var initdevices = function(){
		showLoading();
		//var el = $("div.Index-Statis-Chart-Item-Device"); 
		//LocalBlockUI({target: el, textOnly: true});
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/homedevices.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL') {
					$("#deviceOnLineCount").html(data.deviceOnLineCount);
					$("#deviceOffLineCount").html(data.deviceOffLineCount);
					$("#deviceAllCount").html(data.deviceAllCount);
					var deviceCount = [['在线设备数',   data.deviceOnLineCount],['离线设备数',   data.deviceOffLineCount]];
					initPieChartDevices(deviceCount); 			
				} else {					
					//onAlertError(data.message);
					return false;
				}
				closeLoading();
				//LocalUnBlockUI(el);
			},
			error : function(data) {
				closeLoading();
				//onAlertError('数据加载失败!');
				//LocalUnBlockUI(el);
				return false;
			}
		});
	}
	var inithometraffic = function(){
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/hometraffic.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL') {
					if(data.trafficDetails != null){
						initFlowChart(data.trafficDetails);
					}
				} else {					
					//onAlertError(data.message);
					return false;
				}
				closeLoading();
			},
			error : function(data) {
				closeLoading();
				//onAlertError('数据加载失败!');
				return false;
			}
		});
	}
	var inithomeauthtypes = function(){
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/homeauthtypes.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL') {
					if(data.authDetails != null){
						initAuthDetails(data.authDetails);
					}
				} else {					
					//onAlertError(data.message);
					return false;
				}
				closeLoading();
			},
			error : function(data) {
				closeLoading();
				//onAlertError('数据加载失败!');
				return false;
			}
		});
	}
	var inithometermtypes = function(){
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/hometermtypes.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL') {
					if(data.terminalDetails != null){
						initTerminalDetails(data.terminalDetails);
					}
				} else {					
					//onAlertError(data.message);
					return false;
				}
				closeLoading();
			},
			error : function(data) {
				closeLoading();
				//onAlertError('数据加载失败!');
				return false;
			}
		});
	}
	var inithomebrowsers = function(){
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/homebrowsers.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL') {
					if(data.browserDetails != null){
						initBrowserDetails(data.browserDetails);
					}
				} else {					
					//onAlertError(data.message);
					return false;
				}
				closeLoading();
			},
			error : function(data) {
				closeLoading();
				//onAlertError('数据加载失败!');
				return false;
			}
		});
	}
	/*var initIndexData = function(){
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/homestatis.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL') {
					$("#userOnLineCount").html(data.userOnLineCount);
					$("#userOffLineCount").html(data.userOffLineCount);
					$("#userAllCount").html(data.userAllCount);
					$("#deviceOnLineCount").html(data.deviceOnLineCount);
					$("#deviceOffLineCount").html(data.deviceOffLineCount);
					$("#deviceAllCount").html(data.deviceAllCount);
					
					//console.log(data.trafficDetails);
					if(data.trafficDetails != null){
						initFlowChart(data.trafficDetails);
					}
					//data.authDetails=[{authType:'google',authCount:'100'},{authType:'baidu',authCount:'80'},{authType:'sogo',authCount:'70'}];
					if(data.authDetails != null){
						initAuthDetails(data.authDetails);
					}
					//data.terminalDetails=[{terminalType:'google',terminalCount:'100'},{terminalType:'baidu',terminalCount:'80'},{terminalType:'sogo',terminalCount:'70'}];
					if(data.terminalDetails != null){
						initTerminalDetails(data.terminalDetails);
					}
					//data.browserDetails=[{browserType:'google',browserCount:'100'},{browserType:'baidu',browserCount:'80'},{browserType:'sogo',browserCount:'70'}];
					if(data.browserDetails != null){
						initBrowserDetails(data.browserDetails);
					}
					var userCount = [['在线用户数',   data.userOnLineCount],['离线用户数',   data.userOffLineCount]];
					var deviceCount = [['在线设备数',   data.deviceOnLineCount],['离线设备数',   data.deviceOffLineCount]];
					initPieChart(userCount,deviceCount); 					
				} else {
					closeLoading();
					onAlertError(data.message);
					return false;
				}
				closeLoading();
			},
			error : function(data) {
				closeLoading();
				onAlertError('数据加载失败!');
				return false;
			}
		});
	}*/
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
				AuthDetailsHtml += "<tr class='ChinaNet-Table-Body'>";
				AuthDetailsHtml += "	<td width='42'></td>";
				AuthDetailsHtml += "	<td><span class='Table-Data-Name'>"+auth_Type+"</span></td>";
				AuthDetailsHtml += "	<td width='50'>"+auth_Count+"</td>";
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
				TerminalDetailsHtml += "<tr class='ChinaNet-Table-Body'>";
				TerminalDetailsHtml += "	<td width='42'></td>";
				TerminalDetailsHtml += "	<td><span class='Table-Data-Name'>"+terminal_Type+"</span></td>";
				TerminalDetailsHtml += "	<td width='50'>"+terminal_Count+"</td>";
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
				BrowserDetailsHtml += "<tr class='ChinaNet-Table-Body'>";
				BrowserDetailsHtml += "	<td width='42'></td>";
				BrowserDetailsHtml += "	<td><span class='Table-Data-Name'>"+browser_Type+"</span></td>";
				BrowserDetailsHtml += "	<td width='50'>"+browser_Count+"</td>";
				BrowserDetailsHtml += "</tr>";
				Num++;
				if (Num == 6) break;
			}
		}
		$("#BrowserDetails_body").html(BrowserDetailsHtml);
	}
    /*
    var initPieChartUsers = function(userCount){
        $('div.Chart-Online-Guest').highcharts({
            chart: {
                reflow:false,
                height:120,
                backgroundColor:'#fafafa'
            },
            credits:true,
            title:{text:'',floating:true},
            tooltip: {    
            	pointFormat: '{series.name}<b>{point.percentage:.1f}%</b>',
                style:{
                    fontFamily:'Microsoft YaHei'
                }
            },
            plotOptions: {
                pie: {
                    startAngle: 0,
                    endAngle:360,
                    allowPointSelect: true,
                    borderWidth:0,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    innerSize:60
                }
            },
            series: [{
                type: 'pie',
                name: ' ',
                data: userCount
            }]
        });
    }
    */
    var initPieChartDevices = function(deviceCount){
	    $('div.Chart-Online-Device').highcharts({
	        chart: {
	            reflow:false,
	            height:120,
	            backgroundColor:'#fafafa'
	        },
	        credits:true,
	        title:{text:'',floating:true},
	        tooltip: {    
	        	pointFormat: '{series.name}<b>{point.percentage:.1f}%</b>',
	            style:{
	                fontFamily:'Microsoft YaHei'
	            }
	        },
	        plotOptions: {
	            pie: {
	                startAngle: 0,
	                endAngle:360,
	                allowPointSelect: true,
	                borderWidth:0,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: false
	                },
	                innerSize:60
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: ' ',
	            data: deviceCount
	        }]
	    });
    }
    var initFlowChart = function(usersStatis){
    	var sin = [];//total_up_traffic
    	var cos = [];//total_dw_traffic
    	var ticks= [];
    	var d=new Date();
		var nowHour = d.getHours();
		var startHour = nowHour+1;
		for(var i=startHour;i<24;i++){
			if(typeof(usersStatis[i])=="undefined"){				
				sin.push([i,0]);
				cos.push([i,0]);
			}else{
				sin.push([i,Math.round((usersStatis[i].total_up_traffic)/1024/1024)]);
				cos.push([i,Math.round((usersStatis[i].total_dw_traffic)/1024/1024)]);
			}
		}
		for(var j=0;j<=nowHour;j++){
			if(typeof(usersStatis[j])=="undefined"){				
				sin.push([j,0]);
				cos.push([j,0]);
			}else{
				sin.push([j,Math.round((usersStatis[j].total_up_traffic)/1024/1024)]);
				cos.push([j,Math.round((usersStatis[j].total_dw_traffic)/1024/1024)]);
			}
		}
		var new_sin = [];
		var new_cos = [];
		for(i=0;i<sin.length;i++){
			new_sin.push(sin[i][1]);
			new_cos.push(cos[i][1]);
			ticks.push(sin[i][0]);
		}
    	/*if (usersStatis != null) {
    		for(var i=0;i<24;i++){
    			if(typeof(usersStatis[i])=="undefined"){				
    				sin.push(0);
    				cos.push(0);
    			}else{
    				sin.push(Math.round((usersStatis[i].total_up_traffic)/1024/1024));
    				cos.push(Math.round((usersStatis[i].total_dw_traffic)/1024/1024));
    			}
    			ticks.push(i);	
    		}
    	} */   	
    	//new_sin = [190,18,211,333,24,5,6,700,8,9,200,11,12,23,140,15,16,17,12,83,20,24,61,22];
    	//new_cos = [140,138,21,33,244,52,61,70,8,9,20,110,102,203,14,150,136,127,112,83,20,284,61,221];
        $('div.Flow-Statis-Chart').highcharts({
        	chart: { type: 'areaspline' },
        	colors: ["#52c6ae", "#ec7b53"],
            credits:true,
            title: {
                text: '24小时所有设备流量表',
                align:'left',
                style:{
                    color:'#17bd9b',
                    fontWeight:'bold',
                    fontSize:14,
                    fontFamily:'Microsoft YaHei'
                }
            },
            legend:{
                //layout: 'vertical',
                align:'right',
                verticalAlign:'top',
                floating:true,
                symbolRadius:6,
                symbolHeight:12,
                symbolWidth:12,
                itemMarginBottom:6,
                itemStyle:{
                    fontFamily:'Microsoft YaHei'
                }
            },
            xAxis: {
            	categories:ticks,
                labels: {
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    },
                    style:{
                        color:'#17bd9b',
                        fontFamily:'Microsoft YaHei'
                    }
                },
                gridLineColor:'#f0f0f0'
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function() {
                        return this.value +'M';
                    },
                    style:{
                        fontFamily:'Microsoft YaHei'
                    }
                },
                gridLineColor:'#f0f0f0'
            },
            tooltip: {
            	formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+this.x +'点: '+ this.y +'M';
                },
                style:{
                    fontFamily:'Microsoft YaHei'
                }
            },
            plotOptions: {
            	areaspline: { fillOpacity: 0.1 }
            },
            series: [{
        		name: '上行流量(M)',
        		data: new_sin
        		},{
            		name: '下行流量(M)',
            		data: new_cos
            		}]
        });
    }

    return {init:function(){
        /*
    	if(__CONTEXT_MERCHANT_CODE != 'MANUFACTURER' && __CONTEXT_MERCHANT_CODE != 'DEVICE_ADMIN') {
    		initUsers();//用户
        	inithometraffic();//设备流量
        	inithomeauthtypes();//认证方式
        	inithometermtypes();//用户终端
        	inithomebrowsers();//用户浏览器
        	initdevices();//设备
    	}
    	*/
        initUsers();//用户
        initADInfo();//广告
        initTPInfo();//运营信息
        if(__CONTENT_PHONEBINDED == 'false'){
            initUserPhone();//绑定手机
        }
        onTPInfoClick();
    }}
}();
function LocalBlockUI(options){
	var options = $.extend(true, {}, options);
    var html = '';
    if (options.iconOnly) {
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '')+'"><img style="" src="/statics/img/loading-spinner-grey.gif" align=""></div>';
    } else if (options.textOnly) {
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '')+'"><span>&nbsp;&nbsp;' + (options.message ? options.message : '加载中...') + '</span></div>';
    } else {    
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '')+'"><img style="" src="/statics/img/loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : '加载中...') + '</span></div>';
    }
    if (options.target) { // element blocking
        var el = jQuery(options.target);
        if (el.height() <= ($(window).height())) {
            options.cenrerY = true;
        }       
        
        el.block({
            message: html,
            baseZ: options.zIndex ? options.zIndex : 1000,
            centerY: options.cenrerY != undefined ? options.cenrerY : false,
            css: {
                top: '10%',
                border: '0',
                padding: '0',
                backgroundColor: 'none',
                left: '20%'
            },
            overlayCSS: {
                backgroundColor: options.overlayColor ? options.overlayColor : '#000',
                opacity: options.boxed ? 0.05 : 0.1, 
                cursor: 'wait'
            }
        });
        //console.log(options.cenrerY);
    } else { // page blocking
        $.blockUI({
            message: html,
            baseZ: options.zIndex ? options.zIndex : 1000,
            css: {
                border: '0',
                padding: '0',
                backgroundColor: 'none'
            },
            overlayCSS: {
                backgroundColor: options.overlayColor ? options.overlayColor : '#000',
                opacity: options.boxed ? 0.05 : 0.1,
                cursor: 'wait'
            }
        });
    }  
}
function LocalUnBlockUI(target){
	if (target) {
        jQuery(target).unblock({
            onUnblock: function () {
                jQuery(target).css('position', '');
                jQuery(target).css('zoom', '');
            }
        });
    } else {
        $.unblockUI();
    }
}
