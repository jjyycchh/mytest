/**
 * author: liuhualuo
 * date: 2014/8/28
 */
/*function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  // 匹配目标参数
	if ( r != null ){
		return unescape(r[2]);
	}
	return null; // 返回参数值
}*/

var _PolicyItemOn = [];
var _EditPolicyItem = null;
var _PolicyData   = null;
var _PolicyItemTemp = [];


var policyApp = function(){
    // load sub account list
    /**
     * 显示子帐号下拉框
     *
     */
    var initSelectAccount = function(){
        var owner = getSiteOwner();
        if((__CONTEXT_MERCHANT_CODE == 'MERCHANT' || __CONTEXT_MERCHANT_CODE == "SUPER_MAN") && owner.id == 0){
        	owner.id = __CONTEXT_MERCHANT_KEY;
        	owner.name = __CONTENT_MERCHANT_NAME;
        }

        $('#PolicyAccountID').xiSelect({
            offsetSize:[0,3,0,3],
            height:320,
            width:500,
            ajaxData:function(){
                return '<div class="ChinaNet-Free-Body">' +
                    '       <div class="Select-SubAccount-Search"></div>' +
                    '       <div class="Select-SubAccount-Body"></div>' +
                    '       <div class="Select-SubAccount-Page"></div>' +
                    '</div>' +
                    '<input type="hidden" id="AccountPage" value="1">' +
                    '<script type="text/javascript">getSelectAccountList();</script>';
            },
            skinClass:'Portal-Site-Editor-Account',
            disabled:((__CONTEXT_MERCHANT_CODE=='SUPER_MAN'||__CONTEXT_MERCHANT_CODE=='MERCHANT')?true:_isEdit),
            defaultData:{value:owner.id,text:owner.name}
        });
    }

    var onResetAccount = function(){
        var owner = getChangeAccountData(_PolicyData.accountId);
        $('#PolicyAccountID').xiSelect({
            offsetSize:[0,3,0,3],
            height:320,
            width:500,
            ajaxData:function(){
                return '<div class="ChinaNet-Free-Body">' +
                    '       <div class="Select-SubAccount-Search"></div>' +
                    '       <div class="Select-SubAccount-Body"></div>' +
                    '       <div class="Select-SubAccount-Page"></div>' +
                    '</div>' +
                    '<input type="hidden" id="AccountPage" value="1">' +
                    '<script type="text/javascript">getSelectAccountList();</script>'
            },
            skinClass:'Portal-Site-Editor-Account',
            disabled:((__CONTEXT_MERCHANT_CODE=='SUPER_MAN'||__CONTEXT_MERCHANT_CODE=='MERCHANT')?true:false),
            defaultData:owner
        });
    }

    var addPolicyDevice = function(){
        $('div#portalPolicyDeviceArea a').click(function(){
           if($(this).hasClass('Add-Device')){
               var content = '' +
                   '<div class="ChinaNet-Policy-Device-Sheet ChinaNet-Free-Body">' +
                   '    <div class="Policy-Device-Header-Search">' +
                   '        <div class="ChinaNet-Form-Sheet">' +
                   '            <div class="Form-Item-Input ChinaNet-Col-6">' +
                   '                <input type="text" id="DeviceKeywords" class="Input-Control">' +
                   '            </div>' +
                   '            <div class="ChinaNet-Left ChinaNet-Col-2">' +
                   '                <button type="button" class="Form-Primary" id="btnChangePolicyDevice"><span>查询</span></button>' +
                   '            </div>' +
                   '        </div>' +
                   '    </div>' +
                   '    <div class="Policy-Device-Sheet-Title Data-Adorn-Overly">' +
                   '        <div class="Overly-Top-Left"></div>' +
                   '        <div class="Overly-Top-Right"></div>' +
                   '        <span class="Device-Sheet-Checkbox">&nbsp;</span>' +
                   '        <span class="Device-Sheet-Name">设备名称</span>' +
                   '    </div>' +
                   '    <div class="Policy-Device-Sheet-Body">' +
                   '        <ul></ul>' +
                   '    </div>' +
                   '    <div class="Policy-Device-Page-Body"></div>' +
                   '</div>' +
                   '<input type="hidden" id="DevicePage" value="1">' +
                   '<script type="text/javascript">getAccountDeviceList()</script>';
               onOpenDialog('ChangePolicyDevice#Dialog','选择策略设备',content);
               $("button#btnChangePolicyDevice").bind("click",function(){
            	   getAccountDeviceList()
               });
           }
        });
        
    }

    var deletePolicyDevice = function(){
        $('div#portalPolicyDeviceArea a span').live('click', function(){
            var device = $(this);
            if(!device.parent().hasClass('Add-Device')){
                device.parent().fadeOut(100,function(){
                    device.parent().remove();
                });
            }
        });
    }

    var onChangeDevice = function(){
        $('div.Policy-Device-Sheet-Body ul li').die().live('click', function(){
            if($(this).hasClass('Active')){
                $(this).removeClass('Active');
                $(this).find('input').attr('checked', false);
                onRemoveDevicePolicy($(this).attr('data-deviceId'));
            }else{
                $(this).addClass('Active');
                $(this).find('input').attr('checked', true);
                onChangeDevicePolicy($(this).attr('data-deviceId'), $(this).attr('data-deviceName'));
            }
        });
    }

    var getPolicyData = function(){
        $.ajax({
            url:'/merchant/portalpolicydetails.htm',
            type:'GET',
            dataType:'JSON',
            data:{policyid:_PolicyID},
            async:false,
            success:function(data){
                if(data.result=='OK'){
                    $('div#PolicyDataTitle').html(data.portalpolicy.name);
                    $('div#PolicyDataInfoSite').html('计划包含 '+data.portalpolicy.devices.length +' 部设备');

                    // 规范策略数据
                    _PolicyData = data.portalpolicy;
                    _PolicyData.displayItems = JSON.parse(_PolicyData.displayItems);

                    // 整理时间优先级排序
                    onRefreshSortPolicy();

                    // 渲染策略时间轴
                    onRenderPolicyItem();
                }
            }
        })
    }

    var onSavePolicyBase = function(){
        $('form#SavePolicyBaseForm').submit(function(){
            var policy = {};
                policy.policyname = $.trim($('input#portalPolicyNameInput').val());
                policy.accountid  = $('input#PolicyAccountID').val();
                policy.deviceids  = [];
                if(_PolicyData!=null){
                    policy.policyid = _PolicyData.id;
                    policy.policyitems = JSON.stringify(_PolicyData.displayItems);
                }else{
                    policy.policyitems = JSON.stringify([]);
                }

                $('div#portalPolicyDeviceArea a').each(function(){
                    if(!$(this).hasClass('Add-Device')){
                        policy.deviceids.push($(this).attr('data-deviceId'));
                    }
                });
                policy.deviceids = JSON.stringify(policy.deviceids);

                if(!onCheckEmpty(policy.policyname)){
                    onAlertErrorTip('策略标题必须填写且不能包含空格', $('input#portalPolicyNameInput')[0]);
                    return false;
                }
                if(!onCheckMaxLength(policy.policyname,50)){
                    onAlertErrorTip('策略标题不能超过50个字符，请重新输入', $('input#portalPolicyNameInput')[0]);
                    return false;
                }

                if(!onCheckEmpty(policy.accountid)){
                    onAlertErrorTip('请选择商户', $('input#PolicyAccountID-text')[0]);
                    return false;
                }

                if(policy.deviceids==''){
                    onAlertErrorTip('请选择策略设备',$('div#portalPolicyDeviceArea')[0]);
                    return false;
                }


                showLoading();
                $.ajax({
                    url:'/merchant/saveportalpolicy.htm',
                    type:'POST',
                    dataType:'JSON',
                    data:policy,
                    async:false,
                    success:function(data){
                        if(data.result=='OK'){
                            $.ajax({
                                url:'/merchant/editportalpolicy26.htm',
                                type:'GET',
                                dataType:'HTML',
                                data:{policyId:data.policyid},
                                async:false,
                                success:function(datas){
                                    if(datas.result=='FAIL'){
                                        closeLoading();
                                        onAlertError('数据请求失败，请刷新页面');
                                        return false;
                                    }else{
                                        var policyTime = window.setTimeout(function(){
                                            $('div.ChinaNet-Free-Body').html(datas);
                                            closeLoading();
                                            clearTimeout(policyTime);
                                        },2000);

                                    }
                                }
                            });
                        }else{
                            closeLoading();
                            onAlertError('保存时出现错误，请稍后再试');
                            return false;
                        }
                    }
                });
                return false;
        });
    }

    var onMouseMoverPriority = function(){
        $('tbody.Policy-Plan-Item-List').sortable({
            helper: onRecoveryTable,
            delay: 1,
            axis:'y',
            stop:function(event,ui){
                // 设置排序后状态
                var tempItems = [];
                $('tbody.Policy-Plan-Item-List tr').each(function(x){
                    var id = $(this).attr('data-noId');
                    var temp = _PolicyData.displayItems[id-1];
                        temp.priority = (x+1);
                        tempItems.push(temp);
                });


                _PolicyData.displayItems = tempItems;
                //alert(JSON.stringify(_PolicyData.displayItems));

                onRefreshSortPolicy();
                //alert(JSON.stringify(_PolicyData.displayItems));
                onRenderPolicyItem();
                $('button#PolicyItemSaveButton').show();
            }
        });
    }

    var onAddPolicyItem = function(){
        $('button#PolicyItemAdd').click(function(){
             onShowEditPlanDialog();
        });
        $('button#PolicyItemSaveButton').click(function(){
            showLoading();
            onSavePolicyDisplayData();
            var policytime = window.setTimeout(function(){
                closeLoading();
                clearTimeout(policytime);
            }, 3000);
        });
    }

    var onChangePolicySite = function(){
        $('div.Policy-Site-Item').live('click', function(){
            $('div.Policy-Site-Item').each(function(p){
                $('div.Policy-Site-Item').eq(p).removeClass('Policy-Site-Changed');
            });

            if($(this).hasClass('Policy-Site-Changed')){
                $(this).removeClass('Policy-Site-Changed');
            }else {
                $(this).addClass('Policy-Site-Changed');
            }
        });
    }

    var onResetDevices = function(){
        for(var dx=0;dx<_PolicyData.devices.length;dx++){
        	var devmemo = isNotEmptyString(_PolicyData.devices[dx].name)?_PolicyData.devices[dx].name:_PolicyData.devices[dx].mac;
            $('div.Devices-List-Item-Body a.Add-Device').before('<a href="javascript:;" data-deviceId="'+_PolicyData.devices[dx].id+'"><span>&nbsp;</span>'+devmemo+'</a>');
        }
    }


    return {init:function(){
        initSelectAccount();
        addPolicyDevice();
        onChangeDevice();
        deletePolicyDevice();
        onSavePolicyBase();
    },
    edit:function(){
        getPolicyData();
        onMouseMoverPriority();
        addPolicyDevice();
        onAddPolicyItem();
        onChangePolicySite();
        onChangeDevice();
        onResetAccount();
        onResetDevices();
        $('input#portalPolicyNameInput').val(_PolicyData.name);
        $('a#PolicyBaseEdit').click(function(){
            $('div.Policy-Editor-Plan-Body').fadeOut(100);
            $('div.Policy-Editor-Base-Body').fadeIn(100);
        });

        $('button#CancelEditPolicyButton').click(function(){
            $('div.Policy-Editor-Base-Body').fadeOut(100);
            $('div.Policy-Editor-Plan-Body').fadeIn(100);
        });

        deletePolicyDevice();
        onSavePolicyBase();
    }}
}();


/**
 * 获取策略帐户关联站点
 *
 */
function onReloadPolicyItemData(){
    // 插入站点信息
    $.ajax({
        url:'/merchant/merchantsitelist.htm',
        type:'GET',
        dataType:'JSON',
        data:{ownerid:_PolicyData.accountId},
        async:false,
        success:function(data){
            if(data.result=='OK'){
                var siteHtml = '';
                for(var sx=0;sx<data.sites.length;sx++){
                    var siteData = data.sites[sx];
                    siteHtml +='' +
                        '<li>' +
                        '   <div class="Policy-Site-Item Data-Adorn-Overly" data-siteId="'+siteData.siteid+'" data-siteName="'+siteData.sitename.replace('<', '&lt;').replace('>', '&gt;')+'">' +
                        '       <div class="Overly-Top-Left"></div>' +
                        '       <div class="Overly-Top-Right"></div>' +
                        '       <div class="Overly-Bottom-Left"></div>' +
                        '       <div class="Overly-Bottom-Right"></div>' +
                        '       <div class="Policy-Site-Item-Title">'+siteData.sitename.replace('<', '&lt;').replace('>', '&gt;')+'</div>' +
                        '       <span class="Site-Changed-Icon"></span>' +
                        '       <img src="'+(siteData.thumbpath?siteData.thumbpath:'/statics/img/no-image.png')+'">' +
                        '   </div>' +
                        '</li>';
                }
                $('div.Policy-Item-Site-Body ul').html(siteHtml);
                if(_EditPolicyItem){
                    $('div.Policy-Site-Item').each(function(p){
                        if($('div.Policy-Site-Item').eq(p).attr('data-siteId')==_EditPolicyItem.siteid){
                            $('div.Policy-Site-Item').eq(p).addClass('Policy-Site-Changed');
                        }
                    });
                }

                refreshImage('div.Policy-Item-Site-Body');
            }
        }
    });


    // 时间下拉框
    var timeList  = [
        {value:'0',text:'00:00'},
        {value:'1',text:'01:00'},
        {value:'2',text:'02:00'},
        {value:'3',text:'03:00'},
        {value:'4',text:'04:00'},
        {value:'5',text:'05:00'},
        {value:'6',text:'06:00'},
        {value:'7',text:'07:00'},
        {value:'8',text:'08:00'},
        {value:'9',text:'09:00'},
        {value:'10',text:'10:00'},
        {value:'11',text:'11:00'},
        {value:'12',text:'12:00'},
        {value:'13',text:'13:00'},
        {value:'14',text:'14:00'},
        {value:'15',text:'15:00'},
        {value:'16',text:'16:00'},
        {value:'17',text:'17:00'},
        {value:'18',text:'18:00'},
        {value:'19',text:'19:00'},
        {value:'20',text:'20:00'},
        {value:'21',text:'21:00'},
        {value:'22',text:'22:00'},
        {value:'23',text:'23:00'}
    ]
    var startMenu = {offsetSize:[0,3,0,3],data:timeList};
    var endMenu = {offsetSize:[0,3,0,3],data:timeList};

    if(_EditPolicyItem!=null){
        startMenu.defaultData = getDefaultTimeData(_EditPolicyItem.starttime);
        endMenu.defaultData = getDefaultTimeData(_EditPolicyItem.endtime);
    }


    $('input#PolicyStartTime').xiSelect(startMenu);
    $('input#PolicyEndTime').xiSelect(endMenu);
}


/**
 * 恢复拖拽表格效果
 * @param e
 * @param ui
 * @returns {*}
 */
function onRecoveryTable(e,ui){
    ui.children().each(function(){
        $(this).width($(this).width());
    });
    return ui;
}


/**
 * 重新整理表格序号
 *
 */
function onReloadPolicyTable(){
    $('tbody.Policy-Plan-Item-List tr').each(function(x){
        var oldId = $(this).attr('data-noId');
            oldId = oldId!='undefined'?oldId:0;
            $(this).attr('data-noId', x+1)
            $(this).attr('data-priorityId', oldId);
            $(this).find('li.Item-Number').html('#'+(x>=9?(x+1):'0'+(x+1))+'');
    });
}


/**
 *  编辑策略计划后更新策略数据
 * @param item
 * @returns {*}
 */
function onUpdatePolicyDisplayItem(item){
    if(typeof _PolicyData.displayItems!='undefined'&&item){
        if(item.priority==0){
            item.priority = _PolicyData.displayItems.length+1;
            _PolicyData.displayItems.push(item);
        }else{
            for(var px=0;px<_PolicyData.displayItems.length;px++){
                if(_PolicyData.displayItems[px].priority==item.priority){
                    _PolicyData.displayItems[px] = item;
                }
            }
        }
        return onSavePolicyDisplayData();
    }

    return false;
}


/**
 * 渲染时间轴样式
 *
 */
function onRenderPolicyItem(){
    if(typeof _PolicyData.displayItems!='undefined'){
        var itemTable = '';
        _PolicyItemOn = [];

        // 清除原有信息
        $('tbody.Policy-Plan-Item-List').html('');

        // 插入策略时间轴
        for(var px=0;px<_PolicyData.displayItems.length;px++){
            var itemHtml = '';
            var itemArray= _PolicyData.displayItems[px];

            itemHtml += '<td class="Item-Site-Opera"><span>'+itemArray.sitename+'</span></td>';
            //itemHtml += '<td class="Item-Site-Opera"><a href="javascript:;" data-priorityId="'+itemArray.priority+'" class="Policy-Edit"></a></td>';
            itemHtml += '<td class="Item-No">' +
                '           <div class="Item-No-Edit">' +
                '               <ul>' +
                '                   <li class="Item-Number">#'+(itemArray.priority>=10?itemArray.priority:'0'+itemArray.priority)+'</li>' +
                '                   <li class="Item-Editor">' +
                '                       <a href="javascript:;" data-priorityId="'+itemArray.priority+'" class="Edit-Policy" title="编辑计划">&nbsp;</a>' +
                '                       <a href="javascript:;" data-priorityId="'+itemArray.priority+'" class="Move-Policy" title="删除计划">&nbsp;</a>' +
                '                   </li>' +
                '               </ul>' +
                '           </div>' +
                '        </td>';
            for(var tx=0;tx<24;tx++){
                if(tx>=itemArray.starttime&&tx<=itemArray.endtime){
                    if((','+(_PolicyItemOn.join(','))+',').indexOf(','+tx+',')>-1){
                        itemHtml += '<td class="Item-Repeat"><span></span></td>';
                    }else{
                        itemHtml += '<td class="Item-Normal"><span></span></td>';
                        _PolicyItemOn.push(tx);
                    }
                }else{
                    itemHtml += '<td class="Item-Disabled"><span></span></td>';
                }
            }

            itemHtml = '<tr data-noId="'+itemArray.priority+'" data-priorityId="'+itemArray.priority+'">'+itemHtml+'<tr>';
            itemTable+= itemHtml;
        }

        $('tbody.Policy-Plan-Item-List').html(itemTable);

        // 删除空行内容
        $('tbody.Policy-Plan-Item-List tr').each(function(){
            if($(this).html()=='') $(this).remove();
        });

        // 激活时间轴编辑
        $('div.Item-No-Edit a.Edit-Policy').click(function(){
            getPolicyItemData($(this).attr('data-priorityId'));
            onShowEditPlanDialog();
        });

        // 删除时间轴记录
        $('div.Item-No-Edit a.Move-Policy').click(function(){
            var priorityid = $(this).attr('data-priorityId');
                onConfirmDialog('你确定删除计划信息吗？', function(){
                    //alert(priorityid);
                    onRemovePriorityId(priorityid);
                    onRenderPolicyItem();
                    $('button#PolicyItemSaveButton').show();
                },function(){return true;});
        });


        $('tbody.Policy-Plan-Item-List tr').mouseenter(function(){
            $(this).find('div.Item-No-Edit').find('ul').stop().animate({marginTop:-32},100);
        });

        $('tbody.Policy-Plan-Item-List tr').mouseleave(function(){
            $(this).find('div.Item-No-Edit').find('ul').stop().animate({marginTop:0},100);
        });
    }
}

/**
 *
 */
function onShowEditPlanDialog() {
    // 弹出计划编辑窗口
    onOpenDialog('ChangePolicySite#Dialog', '设置策略站点和推送时间信息', '' +
        '<div class="ChinaNet-Free-Body">' +
        '   <div class="Policy-Item-Site-Body">' +
        '       <ul></ul>' +
        '   </div>' +
        '   <div class="ChinaNet-Form-Sheet Policy-Item-Time">' +
        '       <label class="Form-Item-Title ChinaNet-Col-2">开始时间</label>' +
        '       <div class="ChinaNet-Left ChinaNet-Col-3"><input type="text" id="PolicyStartTime"></div>' +
        '       <label class="Form-Item-Title ChinaNet-Col-2">结束时间</label>' +
        '       <div class="ChinaNet-Left ChinaNet-Col-3"><input type="text" id="PolicyEndTime"></div>' +
        '   </div>' +
        '</div>' +
        '<script type="text/javascript">onReloadPolicyItemData()</script>' +
        '', {ok: function () {
        var policyItem = {};
        $('div.Policy-Site-Item').each(function (p) {
            if ($('div.Policy-Site-Item').eq(p).hasClass('Policy-Site-Changed')) {
                policyItem.siteid = $('div.Policy-Site-Item').eq(p).attr('data-siteId');
                policyItem.sitename = $('div.Policy-Site-Item').eq(p).attr('data-siteName');
            }
        });

        if (typeof policyItem.siteid == 'undefined') {
            onAlertErrorTip('请选择策略计划站点', $('div.Policy-Item-Site-Body')[0]);
            return false;
        }

        if ($('input#PolicyStartTime').val() == '') {
            onAlertErrorTip('请选择策略计划开始时间', $('input#PolicyStartTime-text')[0]);
            return false;
        } else {
            policyItem.starttime = $('input#PolicyStartTime').val();
        }

        if ($('input#PolicyEndTime').val() == '') {
            onAlertErrorTip('请选择策略计划结束时间', $('input#PolicyEndTime-text')[0]);
            return false;
        } else {
            policyItem.endtime = $('input#PolicyEndTime').val();
        }

        if (parseInt(policyItem.starttime) > parseInt(policyItem.endtime)) {
            onAlertErrorTip('策略计划开始时间不能大于结束时间', $('input#PolicyEndTime-text')[0]);
            return false;
        }

        if (_EditPolicyItem != null) {
            policyItem.priority = _EditPolicyItem.priority;
        } else {
            policyItem.priority = 0;
        }


        showLoading();
        //保存计划
        if (onUpdatePolicyDisplayItem(policyItem)) {
            $.ajax({
                url: '/merchant/editportalpolicy26.htm',
                type: 'GET',
                dataType: 'HTML',
                data: {policyId: _PolicyData.id},
                async: false,
                success: function (data) {
                    if (data.result == 'FAIL') {
                        closeLoading();
                        onAlertError(data.message);
                        return false;
                    } else {
                        var policytime = window.setTimeout(function () {
                            $("div.ChinaNet-Free-Body").html(data);
                            closeLoading();
                            clearTimeout(policytime);
                        }, 2000);
                    }
                }
            });
        } else {
            closeLoading();
            onAlertError('策略计划保存错误，请稍后再试');
            return false;
        }

        // 清除编辑信息
        _EditPolicyItem = null;
    }, cancel: function () {
        _EditPolicyItem = null;
    }});
}

/**
 * 保存站点时间计划数据
 * @returns {boolean}
 */
function onSavePolicyDisplayData(){
    if(typeof _PolicyData!='undefined'&&_PolicyData!=null){
        var policy = {};
        var flag   = false;
            policy.policyid   = _PolicyData.id;
            policy.policyname = _PolicyData.name;
            policy.accountid  = _PolicyData.accountId;
            policy.deviceids  = [];
            policy.policyitems = JSON.stringify(_PolicyData.displayItems);
            for(var dx=0;dx<_PolicyData.devices.length;dx++){
                policy.deviceids.push(_PolicyData.devices[dx].id);
            }

            policy.deviceids = JSON.stringify(policy.deviceids);
            $.ajax({
                url:'/merchant/saveportalpolicy.htm',
                type:'POST',
                dataType:'JSON',
                data:policy,
                async:false,
                success:function(data){
                    if(data.result=='OK'){
                        flag =  true;
                    }
                }
            });

            return flag;
    }
    return false;
}

/**
 *
 * @param id
 */
function getPolicyItemData(id){
    if(typeof _PolicyData.displayItems!='undefined'&&_PolicyData!=null){
        for(var pv=0;pv<_PolicyData.displayItems.length;pv++){
            if(_PolicyData.displayItems[pv].priority==id){
                _EditPolicyItem = _PolicyData.displayItems[pv];
                break;
            }
        }
    }
}

/**
 *
 */
function getDefaultTimeData(time){
    switch (time){
        case '0':
            return {value:'0',text:'00:00'}
            break;
        case '1':
            return {value:'1',text:'01:00'}
            break;
        case '2':
            return {value:'2',text:'02:00'}
            break;
        case '3':
            return {value:'3',text:'03:00'}
            break;
        case '4':
            return {value:'4',text:'04:00'}
            break;
        case '5':
            return {value:'5',text:'05:00'}
            break;
        case '6':
            return {value:'6',text:'06:00'}
            break;
        case '7':
            return {value:'7',text:'07:00'}
            break;
        case '8':
            return {value:'8',text:'08:00'}
            break;
        case '9':
            return {value:'9',text:'09:00'}
            break;
        case '10':
            return {value:'10',text:'10:00'}
            break;
        case '11':
            return {value:'11',text:'11:00'}
            break;
        case '12':
            return {value:'12',text:'12:00'}
            break;
        case '13':
            return {value:'13',text:'13:00'}
            break;
        case '14':
            return {value:'14',text:'14:00'}
            break;
        case '15':
            return {value:'15',text:'15:00'}
            break;
        case '16':
            return {value:'16',text:'16:00'}
            break;
        case '17':
            return {value:'17',text:'17:00'}
            break;
        case '18':
            return {value:'18',text:'18:00'}
            break;
        case '19':
            return {value:'19',text:'19:00'}
            break;
        case '20':
            return {value:'20',text:'20:00'}
            break;
        case '21':
            return {value:'21',text:'21:00'}
            break;
        case '22':
            return {value:'22',text:'22:00'}
            break;
        case '23':
            return {value:'23',text:'23:00'}
            break;
    }

    return false;
}

/**
 * 整理计划排序
 *
 */
function onRefreshSortPolicy(){
    if(typeof _PolicyData.displayItems!='undefined'){
        _PolicyData.displayItems.sort(function(a, b) { return a.priority - b.priority;});
    }
}

/**
 * 删除时间计划
 * @param id
 */
function onRemovePriorityId(id){
    if(typeof _PolicyData.displayItems!='undefined'){
        var itemArray = [];
        for(var xi=0;xi<_PolicyData.displayItems.length;xi++){
            var item = _PolicyData.displayItems[xi];
            if(item.priority!=id) itemArray.push(item);
        }

        for(var nx=0;nx<itemArray.length;nx++){
            itemArray[nx].priority = (nx+1);
        }

        _PolicyData.displayItems = itemArray;
    }
}


/**
 *
 *
 */
function getAccountDeviceList(){
    var accountId = $('input#PolicyAccountID').val();
    var page      = $('input#DevicePage').val();
    var keywords  = $('input#DeviceKeywords').val();

        if(accountId!=''){
            $.ajax({
                url:'/device/searchmerchantsdevice.htm',
                type:'GET',
                dataType:'JSON',
                data:{merchantid:accountId,devicename:keywords},
                async:false,
                success:function(data){
                    if(data.result=='OK'){
                        var deviceHtml = '';
                        var devices    = getChangeDeviceList();
                            for(var dx=0;dx<data.records.length;dx++){
                                var deviceItem = data.records[dx];
                                var devname = deviceItem.name;
            					var devmac = isNotEmptyString(deviceItem.mac)?deviceItem.mac:'';
            					if (!isNotEmptyString(devname)) {
            						devname = devmac;
            					}
                                if(devices.indexOf(deviceItem.deviceId)>-1) {
                                    deviceHtml += '' +
                                        '<li class="Active" data-deviceId="'+deviceItem.deviceId+'" data-deviceName="'+devname+'">' +
                                        '   <span><input type="checkbox" checked value="'+deviceItem.deviceId+'"></span>' +
                                        '   '+devname+'' +
                                        '</li>';
                                }else{
                                    deviceHtml += '' +
                                        '<li data-deviceId="'+deviceItem.deviceId+'" data-deviceName="'+devname+'">' +
                                        '   <span><input type="checkbox" value="'+deviceItem.deviceId+'"></span>' +
                                        '   '+devname +
                                        '</li>';
                                }
                            }

                        $('div.Policy-Device-Sheet-Body ul').html(deviceHtml);
                    }
                }
            });
        }
}

/**
 *
 * @returns {string}
 */
function getChangeDeviceList(){
    var devices = [];
    $('div#portalPolicyDeviceArea a').each(function(){
        var deviceId = $(this).attr('data-deviceId');
        if(typeof deviceId!='undefined'){
            devices.push(deviceId);
        }
    });

    if(devices.length>0){
        return ','+devices.join(',')+',';
    }
    return '';
}

/**
 *
 * @param id
 * @param name
 */
function onChangeDevicePolicy(id, name){
    $('div.Devices-List-Item-Body a.Add-Device').before('<a href="javascript:;" data-deviceId="'+id+'"><span>&nbsp;</span>'+name+'</a>');
}


/**
 *
 * @param id
 */
function onRemoveDevicePolicy(id){
    $('div.Devices-List-Item-Body a').each(function(){
        if($(this).attr('data-deviceId')==id) $(this).remove();
    });
}
