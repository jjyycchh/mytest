/**
 * Created by x on 2014/8/11.
 */
var _optAcctId = null;
var portalsstatisApp = function(){

    var get24HoursData = function(){
        showLoading();
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: __CONTENT_ADHOST + '/advert/thridInter/todayHour', // 当日推送次数分时统计
            data: {
                'account_id' : _optAcctId
            },
            timeout: 18000, // 限制18秒
            success: function(data){
                if (data.result == 'OK') {
                    initADChart(data.push_statis || []);
                } else {
                    onAlertError(data.message);
                }
            },
            complete: function() {
                closeLoading();
            }
        });
    }

    var getHistoryData = function(){
        var start = $("#ChoiceStartDate").datepicker('getDate');
        var end = $("#ChoiceEndDate").datepicker('getDate');
        var unit = $("#periodUnit").val();
        if(start > end){
            onAlertError('起始时间不能大于结束时间！');
            return;
        }
        if(start.getFullYear() != end.getFullYear() && unit != 'hour'){
            onAlertError('暂不支持跨年查询，请选择相同年份进行查询！');
            return;
        }
        showLoading();

        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: __CONTENT_ADHOST + '/advert/thridInter/timeQuery', // 指定时间指定单位推送次数分时统计
            data: {
                'account_id': _optAcctId,
                'start_date': $.datepicker.formatDate( "yy-mm-dd", start),
                'end_date': $.datepicker.formatDate( "yy-mm-dd", end),
                'statistics_unit': unit
            },
            timeout: 18000, // 限制18秒
            success: function(data){
                if (data.result == 'OK') {
                    initADChart(data.push_statis || []);
                } else {
                    onAlertError(data.message);
                }
            },
            complete: function() {
                closeLoading();
            }
        });
    }

    var initADChart = function(data){
        data = data || [];

        var adArr = [];
        var ticks= [];
        for(var i=0;i<data.length;i++){
            adArr.push(data[i].count);
            ticks.push(data[i].name);
        }

        var ti = null;
        if(ticks.length > 10){
            var idx = ticks.length;
            ti = 2;
            while((idx/ti)>10){
                ti++;
            }
        }

        if($('div.Statis-Chart-Body').length>0) {
            $('div.Statis-Chart-Body').highcharts({
                credits:false,
                title: { text: '' },
                subtitle: { text: '' },
                legend: {
                    itemStyle: {
                        color: '#666666',
                        fontWeight: 'normal'
                    }
                },
                colors: ['#ee7a55'],
                xAxis: {
                    categories:ticks,
                    tickInterval: ti,
                    lebels:{
                        style: {
                            color: '#666666',
                            fontWeight: 'bold'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: '推送次数'
                    },
                    min:0,
                    gridLineWidth:1,
                    allowDecimals:false,
                    gridLineColor:'#eee'
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0
                    },
                    series: {
                        marker: {
                            radius: 0
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return this.x +'点推送广告数量:<b>'+ this.y +'</b>个';
                    }
                },
                series: [{
                    type: 'area',
                    name: '广告推送情况',
                    data: adArr,
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#ee7a55'
                        }
                    }
                }]
            });
        }
    }

    var getADPushByAP = function(){
        var start = $("#ChoiceStartDate").datepicker('getDate');
        var end = $("#ChoiceEndDate").datepicker('getDate');
        if(start > end){
            onAlertError('起始时间不能大于结束时间！');
            return;
        }
        showLoading();

        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: __CONTENT_ADHOST + '/advert/thridInter/devGroup', // 指定时间指定账户按设备推送次数统计
            data: {
                'account_id': _optAcctId,
                'start_date': $.datepicker.formatDate( "yy-mm-dd", start),
                'end_date': $.datepicker.formatDate( "yy-mm-dd", end)
            },
            timeout: 18000, // 限制18秒
            success: function(data){
                if (data.result == 'OK') {
                    initADByAPChart(data.push_statis || []);
                } else {
                    onAlertError(data.message);
                }
            },
            complete: function() {
                closeLoading();
            }
        });
    }

    var initADByAPChart = function(data){
        data = data || [];

        for(var i=0; i<data.length; i++){
            data[i].y = data[i].pushs;
            data[i].name = data[i].name || data[i].dev_id;
        }

        if($('div.Statis-Chart-Body').length>0) {
            $('div.Statis-Chart-Body').highcharts({
                credits:false,
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    data: data
                }]
            });
        }
    }

    var onSearchUserstati = function(){
        $("#btn_query_userstati").click(function() {
            var val = $('#interfaceType').val();
            if(val == 'today'){
                get24HoursData();
            }else if(val == 'history'){
                getHistoryData();
            }else if(val == 'ap'){
                getADPushByAP();
            }
        });
    }
    var initTypeSelect = function(){
        $('#interfaceType').xiSelect({
            thirdappoffsetSize:[0,3,0,3],
            onChange:function(){
                var val = $("#interfaceType").val();
                if(val == 'today'){
                    $("#ChoiceStartDate").parent().hide();
                    $("#ChoiceEndDate").parent().hide();
                    $("#periodUnit").parents('.Form-Item-Select').hide();
                    $("#periodUnitLabel").hide();
                }else if(val == 'history'){
                    $("#ChoiceStartDate").parent().show();
                    if($("#periodUnit").val() != 'hour'){
                        $("#ChoiceEndDate").parent().show();
                    }else{
                        $("#ChoiceEndDate").parent().hide();
                    }
                    $("#periodUnit").parents('.Form-Item-Select').show();
                    $("#periodUnitLabel").show();
                }else if(val == 'ap'){
                    $("#ChoiceStartDate").parent().show();
                    $("#ChoiceEndDate").parent().show();
                    $("#periodUnit").parents('.Form-Item-Select').hide();
                    $("#periodUnitLabel").hide();
                }
            },
            defaultData:{value:'today', text:'当日24小时广告推送情况'},
            data:[
                {value:'today', text:'当日24小时广告推送情况'},
                {value:'history',text:'广告推送量日均变化情况'},
                {value:'ap',text:'各区域AP广告投放情况'}
            ]
        });
        $('#periodUnit').xiSelect({
            offsetSize:[0,3,0,3],
            defaultData:{value:'day',text:'日'},
            data:[
                {value:'hour',text:'小时'},
                {value:'day',text:'日'},
                {value:'week',text:'周'},
                {value:'month',text:'月'}
            ],
            onChange:function(){
                if($("#periodUnit").val() != 'hour'){
                    $("#ChoiceEndDate").parent().show();
                }else{
                    $("#ChoiceEndDate").parent().hide();
                }
            }
        });
    }

    return {
        init:function(){
            _optAcctId = __CONTEXT_MERCHANT_KEY;
            initTypeSelect();
            $("#periodUnit").parents('.Form-Item-Select').hide();
            get24HoursData();
            onSearchUserstati();
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
