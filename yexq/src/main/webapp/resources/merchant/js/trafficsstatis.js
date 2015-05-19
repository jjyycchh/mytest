/**
 * Created by x on 2014/8/11.
 */
var _optAcctId = null;
var trafficsstatisApp = function(){

    var initChartAllUser  = function(users){
        $('#StatisChartDetail').hide();
        $('#StatisChartAll').show();

        for(var i=0; i<users.length; i++){
            users[i].y = users[i].count;
            users[i].name = users[i].name || users[i].id;
        }

    	if($('div#StatisChartAll').length>0) {
            $('div#StatisChartAll').highcharts({
                credits:false,
                //colors:['#18bd9b', 'red'],
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
                    data: users
                }]
            });
        }
    }
    var initChartAllDetail  = function(users, nusers, ousers){
        $('#StatisChartAll').hide();
        $('#StatisChartDetail').show();

        for(var i=0; i<users.length; i++){
            users[i].y = users[i].count;
            users[i].name = users[i].name || users[i].id;
        }
        for(var i=0; i<nusers.length; i++){
            nusers[i].y = nusers[i].count;
            nusers[i].name = nusers[i].name || nusers[i].id;
        }
        for(var i=0; i<ousers.length; i++){
            ousers[i].y = ousers[i].count;
            ousers[i].name = ousers[i].name || ousers[i].id;
        }

        var $item = $('div#StatisChartDetail').find('.Statis-Chart-Body-Item');
    	if($item.eq(0).length>0) {
            $item.eq(0).highcharts({
                credits:false,
                //colors:['#18bd9b', 'red'],
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '总用户分布',
                    style: {
                        fontWeight: 'bold',
                        fontFamily:'Microsoft YaHei'
                    }
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
                    data: users
                }]
            });
        }
    	if($item.eq(1).length>0) {
            $item.eq(1).highcharts({
                credits:false,
                //colors:['#18bd9b', 'red'],
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '新用户分布',
                    style: {
                        fontWeight: 'bold',
                        fontFamily:'Microsoft YaHei'
                    }
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
                    data: nusers
                }]
            });
        }
    	if($item.eq(2).length>0) {
            $item.eq(2).highcharts({
                credits:false,
                //colors:['#18bd9b', 'red'],
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '老用户分布',
                    style: {
                        fontWeight: 'bold',
                        fontFamily:'Microsoft YaHei'
                    }
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
                    data: ousers
                }]
            });
        }
    }
     
    var trafficsstatis = function(){
        var start = $("#ChoiceStartDate").datepicker('getDate');
        var end = $("#ChoiceEndDate").datepicker('getDate');
        if(start > end){
            onAlertError('起始时间不能大于结束时间！');
            return;
        }
        showLoading();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/statis/user/apusersstatis.htm',
            data: {
                'merchantid' : _optAcctId,
                'startdate' : $("#ChoiceStartDate").val(),
                'enddate' : $("#ChoiceEndDate").val()
            },
            success: function(data){
                if (data.result == 'OK') {
                    initChartAllUser(data.users || []);
                } else {
                    onAlertError(data.message);
                }
            },
            complete: function() {
                //onAlertError(data.message);
                closeLoading();
            }
        });
    }

    var trafficsstatisDetail = function(){
        var start = $("#ChoiceStartDate").datepicker('getDate');
        var end = $("#ChoiceEndDate").datepicker('getDate');
        if(start > end){
            onAlertError('起始时间不能大于结束时间！');
            return;
        }
        showLoading();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/statis/user/apusersstatis.htm',
            data: {
                'merchantid' : _optAcctId,
                'startdate' : $("#ChoiceStartDate").val(),
                'enddate' : $("#ChoiceEndDate").val()
            },
            success: function(data){
                if (data.result == 'OK') {
                    initChartAllDetail(data.users || [], data.newusers || [], data.oldusers || []);
                } else {
                    onAlertError(data.message);
                }
            },
            complete: function() {
                //onAlertError(data.message);
                closeLoading();
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
            userstatis($("#ChoiceDate").val());
        });
        $("#btn_query_userstati").click(function() {
            var val = $('#interfaceType').val();
            if(val == 'all'){
                trafficsstatis();
            }else if(val == 'detail'){
                trafficsstatisDetail();
            }
        });
    }
    var initTypeSelect = function(){
        $('#interfaceType').xiSelect({
            thirdappoffsetSize:[0,3,0,3],
            defaultData:{value:'all', text:'各区域AP用户登录情况'},
            data:[
                {value:'all', text:'各区域AP用户登录情况'},
                {value:'detail',text:'各区域AP新老用户登录情况'}
            ]
        });
    }
    return {
    	init:function(){
            _optAcctId = __CONTEXT_MERCHANT_KEY;
            initTypeSelect();
    		trafficsstatis();
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
