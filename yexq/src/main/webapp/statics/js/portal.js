/**
 * Created by huanghanxian on 14-8-12.
 */
/**
 *  PORTAL GLOBAL VAR
 *
 *
 */
var _SiteData = null;
var _EditPageData = null;
var _TempPageData = null;
var _TempSiteData = null;
var _EditPageID = null;
var _TempPageID = null;
var _EditPageTemplateType = null;
var _EditPageTemplateID = null;
var siteSearchHandler = null;
var search_site_keyword = null;
siteSearchHandler = new searchUtil(generateSiteListHtml, searchFailCallBack, searchErrorCallBack, null, pageLoad,
		"Portal-Site-ul", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
		'/merchant/searchsite.htm', "");

var portalApp = function(){
		
	var keywordsSearch = function() {
		$("div.ChinaNet-Page-Table").show();
		siteSearchHandler.clearResultSetpageNo();
		var keywords = siteSearchHandler.convertKeywordsSearchable($("#keywords").val());
		siteSearchHandler.setSearchParemeter('keywords', keywords);
		siteSearchHandler.setSearchParemeter('startdate',  $("#startdate").val());
		siteSearchHandler.setSearchParemeter('endDate', addoneday($("#enddate").val()));
		//siteSearchHandler.searchWithPreload();	
		if(onCheckLength(keywords)){
			siteSearchHandler.searchWithPreload();
		}
		else{
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	
	var onsearchSite = function(){
		$("#btn_search_site").click(function() {
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
    // site status
    /**
     * 站点状态下拉框
     *
     */
    var initSelectElement = function(){
        $('#SiteStatus').xiSelect({
            data:[
                {value:'0',text:'锁定'},
                {value:'1',text:'正常'}
            ],
            offsetSize:[0,3,0,3]
        })
    }

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
        $('#AccountID').xiSelect({
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
            disabled:((__CONTEXT_MERCHANT_CODE=='SUPER_MAN'||__CONTEXT_MERCHANT_CODE=='MERCHANT'||(typeof _SiteID!='undefined'&&_SiteID!=''))?true:false),
            defaultData:{value:owner.id,text:owner.name}
        });
    }

    // open template type
    /**
     * 显示模板分类菜单
     *
     */
    var initTemplateTypeMenu = function(){
        $('a.Page-Template-Type').xiMenu({
            menuElement:'PortalTemplateTypeMenu',
            activeClass:'Portal-Type-Open'
        });
    }
    /**
     * 显示行业分类菜单
     *
     */
    var initTradeTypeMenu = function(){
        $('a.Page-Trade-Type').xiMenu({
            menuElement:'PortalTradeTypeMenu',
            activeClass:'Portal-Type-Open'
        });
    }

    var getSiteDataByID = function(){
        showLoading();
        if(typeof _SiteID!='undefined'&&_SiteID!=''){
            $.ajax({
                url:'/merchant/sitedetails.htm',
                type:'GET',
                dataType:'JSON',
                data:{siteid:_SiteID},
                async:false,
                success:function(data){
                    if(data.result=="OK"){
                        $('#SiteNameView').html(data.sitedetails.sitename);
                        $('#SiteLastUpdate').html(data.sitedetails.updatetime);                        
                        $('#sitename').val(data.sitedetails.sitename);
                        $('#SiteInitPagesNubmer').html(data.sitedetails.pages.length);
                        $('#SiteRelationDevices').html(data.sitedetails.deviceCount);
                        $('#SiteResponseNumber').html(data.sitedetails.sitePushCount);
                        $('#Description').val(data.sitedetails.description);

                        // load site pages
                        /**
                         * 加载当前站点页面列表
                         *
                         */
                        _SiteData = data.sitedetails;
                        if(data.sitedetails.pages.length>0){
                            for(var pa=0;pa<data.sitedetails.pages.length;pa++){
                                var pageHtml = '';
                                var page     = data.sitedetails.pages[pa];
                                    pageHtml+= '' +
                                        '<li>' +
                                        '<div class="Portal-Page-Body Data-Adorn-Overly" data-pageId="'+page.pageid+'" data-templateType="'+page.type+'" data-templateId="'+page.templateid+'">'+
                                            '<div class="Overly-Top-Left"></div>'+
                                            '<div class="Overly-Top-Right"></div>'+
                                            '<div class="Overly-Bottom-Left"></div>'+
                                            '<div class="Overly-Bottom-Right"></div>'+
                                            '<img src="'+(page.thumb?page.thumb:'/statics/img/no-image.png')+'">'+
                                            '<div class="Page-Detail-Body-Text"><span>'+page.title+'</span></div>'+
                                            '<div class="Page-Detail-Body">'+
                                                '<div class="Page-Detail-Body-Name"></div>'+
                                                '<div class="Page-Detail-Body-Button">'+
                                                    '<a href="javascript:;" data-pageid="'+page.pageid+'" data-templateType="'+page.type+'" data-templateId="'+page.templateid+'" class="Portal-PageEdit-Class">编辑</a>'+
                                                    '<!--<a href="javascript:;" data-pageid="'+page.pageid+'" data-templateType="'+page.type+'" data-templateId="'+page.templateid+'" class="Portal-PageDelete-Class">删除</a>-->'+
                                                '</div>'+
                                                '<div class="Page-Detail-Body-Date">'+_SiteData.updatetime+'</div>'+
                                            '</div>'+
                                            '<div class="Page-Detail-Template-Type">'+getTemplateType(page.type)+'</div>'+
                                            '<div class="Page-Edit-Status"></div>'+
                                            '<div class="Page-Edit-Status-Icon"></div>'+
                                        '</div>'+
                                        '</li>';

                                $('li#ButtonForNewPage').before(pageHtml);
                            }
                        }
                        closeLoading();
                    }else{
                        closeLoading();
                        onAlertError(data.message);
                    }
                }
            });
        }
    }

    // 处理页面编辑、添加、取消等相关点击事件
    var changeEditData = function(){

        // click button
        /**
         * 编辑站点页面
         * 编辑站点信息
         */
        $('a.Edit-Site-Button').click(function(){
            if(!$('div.ChinaNet-Portal-Editor-Page').is(':hidden')){
                onConfirmDialog('当前编辑页面信息尚未保存，是否确定取消保存编辑',function(){
                    showLoading();
                    var load = window.setTimeout(function(){
                        $('div.Portal-Detail-Body-Action').addClass('Portal-Detail-Edit').removeClass('Portal-Detail-View');
                        onCancelEditPage();
                        closeLoading();
                        clearTimeout(load);
                    },2000);
                },function(){});
            }else{
                showLoading();
                var load = window.setTimeout(function(){
                    $('div.Portal-Detail-Body-Action').addClass('Portal-Detail-Edit').removeClass('Portal-Detail-View');
                    onCancelEditPage();
                    closeLoading();
                    clearTimeout(load);
                },2000);
                //$('div.Portal-Detail-Body-Action').addClass('Portal-Detail-Edit').removeClass('Portal-Detail-View');
            }
        });

        $('button.Edit-Site-Page-Button').click(function(){
            showLoading();
            var load = window.setTimeout(function(){
                $('div.Portal-Detail-Body-Action').addClass('Portal-Detail-View').removeClass('Portal-Detail-Edit');
                closeLoading();
                clearTimeout(load);
            }, 2000);
        });

        // mouse enter && leave
        /**
         * 移动鼠标显示页面标题
         *
         */
        $('div.Portal-Page-Body').live('mouseenter', function(){
            $(this).find('div.Page-Detail-Body-Text').stop().addClass('Page-Detail-Body-Text-Show').animate({bottom:95},100);
        });
        $('div.Portal-Page-Body').live('mouseleave', function(){
            $(this).find('div.Page-Detail-Body-Text').stop().removeClass('Page-Detail-Body-Text-Show').animate({bottom:0},100);
        });

        // change edit page
        /**
         * 点击编辑页面
         *
         */
        $('a.Portal-PageEdit-Class').live('click', function(){
            var pageid = $(this).attr('data-pageId');
                if(!isNaN(pageid)) {
                    if(onSetPageDataValue(pageid)){
                        showLoading();
                        var html = onRenderPage(_EditPageData);
                        if(html.length>0){
                            var dom = document.getElementById('PageEditorIframeID').contentWindow.document;
                            $('iframe#PageEditorIframeID').attr('src', '/merchant/load_pagedata.htm?sid='+Math.random());
                            dom.write(html);
                            dom.close();
                            if($('div.ChinaNet-Portal-Detail-Body').height()>80){
                                $('div.ChinaNet-Portal-Detail-Body').stop().animate({height:80},100);
                            }
                        }

                        var load = window.setTimeout(function(){
                            closeLoading();
                            clearTimeout(load);
                        },3000);
                    }
                }else{
                    onAlertError('页面数据加载失败，你重新加载页面');
                }
            return false;
        });

        // cancel
        /**
         * 取消编辑页面
         *
         */
        $('a#CancelEditPage').click(function(){
            if(!$('div.ChinaNet-Portal-Editor-Page').is(':hidden')){
                onConfirmDialog('当前编辑页面信息尚未保存，是否确定取消保存编辑',function(){
                    showLoading();
                    //onCancelEditPage();
                    var load = window.setTimeout(function(){
                        //$('div.Portal-Detail-Body-Action').addClass('Portal-Detail-Edit').removeClass('Portal-Detail-View');
                        onCancelEditPage();
                        closeLoading();
                        clearTimeout(load);
                    },2000);
                },function(){});
            }else{
                //$('div.Portal-Detail-Body-Action').addClass('Portal-Detail-Edit').removeClass('Portal-Detail-View');
                showLoading();
                var load = window.setTimeout(function(){
                    $('div.Portal-Detail-Body-Action').addClass('Portal-Detail-Edit').removeClass('Portal-Detail-View');
                    onCancelEditPage();
                    closeLoading();
                    clearTimeout(load);
                },2000);
            }
            //onCancelEditPage();
        });

        // refresh page
        /**
         * 刷新当前页面
         */
        $('a#RefreshEditPage').click(function(){
            var html = onRenderPage(_EditPageData);
            if(html.length>0){
                showLoading();
                $('input#PageTemplateType').val(_EditPageData.type);
                $('input#PageTemplateId').val(_EditPageData.templateid);
                $('input#PageTitle').val(_EditPageData.title);
                $('a.Page-Template-Type').each(function(){
                    $(this).attr('class', 'ChinaNet-Left Page-Template-Type Template-Type-'+_EditPageData.type);
                    $(this).find('span').eq(1).html(getTemplateType(_EditPageData.type));
                });

                var dom = document.getElementById('PageEditorIframeID').contentWindow.document;
                $('iframe#PageEditorIframeID').attr('src', '/merchant/load_pagedata.htm?sid='+Math.random());
                dom.write(html);
                dom.close();
                var load = window.setTimeout(function(){
                    closeLoading();
                    clearTimeout(load);
                },3000);
            }
        });

        // save site edit page
        /**
         * 保存站点当前编辑页面
         */
        $('a#SaveEditorOnPage').click(function(){
            if($('iframe#PageEditorIframeID').attr('src')=='/merchant/templates.htm'){
                onAlertError('当前选择模板状态，页面无法保存');
                return false;
            }

            var PageTitle = $('input#PageTitle').val();
            if(PageTitle.length>50){
                onAlertErrorTip('页面标题长度不能超过50个字节', $('input#PageTitle')[0]);
                return false;
            }else if(hasInvalidChar(PageTitle)){
				onAlertErrorTip('页面标题不能含有引号、尖括号、&等特殊字符', $('input#PageTitle')[0]);
				return false;
			}

            if(typeof _EditPageData!='undefined'&&_EditPageData!=null){
                showLoading();
                if(typeof _TempPageData!='undefined'&&_TempPageData!=null) {
                    _EditPageData.data = _TempPageData.data;
                    _EditPageData.template = _TempPageData.template;
                    _TempPageData = null;
                    _TempPageID   = null;
                }

                if(typeof _SiteData!='undefined'&&_SiteData!=null){
                    if(onCheckPageType({pageid:_EditPageData.pageid,type:$('input#PageTemplateType').val()})){
                        _EditPageData.type = $('input#PageTemplateType').val();
                        _EditPageData.title = $('input#PageTitle').val();
                        _EditPageData.name  = _EditPageData.title;
                        _EditPageData.templateid = $('input#PageTemplateId').val();

                        var result = onSaveSiteData();
                        if(result.result=="OK"){
                            $.ajax({
                                url:'/merchant/editsite.htm?siteid='+result.siteid,
                                type:'GET',
                                dataType:'HTML',
                                async:false,
                                success:function(data){
                                    if(data.result=='FAIL'){
                                        closeLoading();
                                        onAlertError(data.message);
                                    }else{
                                        $('div.ChinaNet-Free-Body').html(data);
                                        closeLoading();
                                    }
                                }
                            });

                            //初使化页面变量
                            _EditPageData = null;
                            _TempPageData = null;
                            _TempSiteData = null;
                            _EditPageID   = null;
                            _TempPageID   = null;
                        }else{
                            closeLoading();
                            onAlertError(data.message);
                            return false;
                        }
                    }else{
                        closeLoading();
                        onAlertError('当前页面类型已经已经存在！');
                        return false;
                    }
                }
            }
        });

        // add new page
        /**
         * 点击添加新页面
         *
         */
        $('a#AddNewPageForSite').click(function(){
            showLoading();
            var load = window.setTimeout(function(){
                onAddNewPageForSite();
                closeLoading();
                clearTimeout(load);
            },3000);
        });

        // select title focus
        /**
         * 焦点自动选定标题
         *
         */
        $('input#PageTitle').focus(function(){
            $('input#PageTitle').select();
        })
    }

    var onChangeTemplateType = function(){
        $('div#PortalTemplateTypeMenu a').click(function(){
            showLoading();
            var type = $(this).attr('data-templateType');
            $('input#PageTemplateType').val(type);
            $('a.Page-Template-Type').each(function(){
                $(this).attr('class', 'ChinaNet-Left Page-Template-Type Template-Type-'+type);
                $(this).find('span').eq(1).html(getTemplateType(type));
            });

            $('#PageEditorIframeID').attr('src', '/merchant/templates.htm');

            var load = window.setTimeout(function(){
                closeLoading();
                clearTimeout(load);
            },3000);
            //return false;
        });
    }

    var onChangeTradeType = function(){
        $('div#PortalTradeTypeMenu a').click(function(){
            showLoading();
            var name = $(this).text();
            var type = $(this).attr('data-tradeType');
            $('input#PageTradeType').val(type);
            $('a.Page-Trade-Type').each(function(){
                $(this).find('span').eq(0).html(name);
            });

            $('#PageEditorIframeID').attr('src', '/merchant/templates.htm');

            var load = window.setTimeout(function(){
                closeLoading();
                clearTimeout(load);
            }, 3000);
            //return false;
        });
    }
    //保存站点
    var onSubmitSiteData = function(){
        $('form#FormSiteDetialSave').submit(function(){
            if(!onCheckEmpty($('input#sitename').val())){
                onAlertErrorTip('请填写站点标题,不能含有空格', $('input#sitename')[0]);
                return false;
            }else if(hasInvalidChar($('input#sitename').val())){
				onAlertErrorTip('标题中不能含有引号、尖括号、&等特殊字符', $('input#sitename')[0]);
				return false;
            }else if(($('input#sitename').val()+'').length>50){
                onAlertErrorTip('站点标题长度不能超过50个字符', $('input#sitename')[0]);
                return false;
            }

            if(__CONTEXT_MERCHANT_CODE=='REPRESENTATIVE'||__CONTEXT_MERCHANT_CODE=='ADMINISTRATOR'){
                if($('input#AccountID').val()==''){
                    onAlertError('请选择站点所属商户');
                    return false;
                }
            }else{
                $('input#AccountId').val(__CONTEXT_MERCHANT_KEY);
            }

            if(($('textarea#Description').val()+'').length>300){
                onAlertErrorTip('站点描述信息长度不能超过300个字符', $('textarea#Description')[0]);
                return false;
            }else if(hasInvalidChar($('textarea#Description').val()+'')){
				onAlertErrorTip('站点描述信息中不能含有引号、尖括号、&等特殊字符', $('textarea#Description')[0]);
				return false;
			}


            _SiteData = _SiteData==null?{}:_SiteData;
            _SiteData.siteid = '';
            _SiteData.sitename = $('input#sitename').val();
            _SiteData.accountId= $('input#AccountID').val();
            _SiteData.description = $('textarea#Description').val();

            // save site data
            /**
             * 保存站点
             *
             **/
            showLoading();
            var result = onSaveSiteData();
            if(result.result=="OK"){
                $.ajax({
                    url:'/merchant/editsite.htm?siteid='+result.siteid,
                    type:'GET',
                    dataType:'HTML',
                    async:false,
                    success:function(data){
                        if(data.result=='FAIL'){
                            closeLoading();
                            onAlertError(data.message);
                        }else{
                            $('div.ChinaNet-Free-Body').html(data);
                            closeLoading();
                        }
                    }
                });


                //初使化页面变量
                _EditPageData = null;
                _TempPageData = null;
                _TempSiteData = null;
                _EditPageID   = null;
                _TempPageID   = null;
            }else{
                closeLoading();
                onAlertError(result.message);
                return false;
            }

            return false;
        });
    }
    
    return {init:function(){
            siteSearchHandler.searchWithPreload();
            $("#keywords").keypress(function(e) {
    			if(e.which == 13) {
    				keywordsSearch();
    				return false;
    		    }
    		});
            onsearchSite();	
            onShowPortalData();
            initDatepicker();
        },
        edit:function(){
            getSiteDataByID();
            initSelectAccount();
            initTemplateTypeMenu();
            initTradeTypeMenu();
            changeEditData();
            onSubmitSiteData();
            onChangeTemplateType();
            onChangeTradeType();
        },
        add:function(){
            initSelectAccount();
            initTemplateTypeMenu();
            initTradeTypeMenu();
            changeEditData();
            onSubmitSiteData();
            onChangeTemplateType();
            onChangeTradeType();
        }
    }
}();

//检测输入的字符是否含有特殊符号
function hasInvalidChar(str){
	var re = /[<>&"']+/ig;
	return re.test(str);
}

/**
 * 获取子帐号列表
 *
 * @returns {{}}
 */
function getSubAccountData(){
    var AccountList = {};
    $.ajax({
        url:'/account/getsubmerchant.htm',
        type:'GET',
        dataType:'JSON',
        data:{accountId:__CONTEXT_MERCHANT_KEY},
        async:false,
        success:function(data){
            if(data.result=='OK'){
                for(i=0;i<data.merchants.length;i++){
                     AccountList = data.merchants;
                }
            }
        }
    });

    return AccountList;
}


/**
 * 设备当前编辑页面信息
 * @param id
 * @returns {boolean}
 */
function onSetEditPortalPage(id){
    if(typeof _SiteData.pages!='undefined'){
        for(var i=0;i<_SiteData.pages.length;i++){
            var page = _SiteData.pages[i];
            if(page.pageid==id){
                _EditPageID = id;
                _EditPageData = page;
                _EditPageTemplateType = page.type;
                _EditPageTemplateID   = page.templateid;
                break;
            }
        }
        return true;
    }
    return false;
}

/**
 * 设置编辑页面状态
 *
 */
function onSetPageDataValue(pageid){
    if(onSetEditPortalPage(pageid)) {
        $('div.Portal-Page-Body').each(function (x) {
            var editid = $('div.Portal-Page-Body').eq(x).attr('data-pageId');
            if (editid == pageid) {
                $('div.Portal-Page-Body').eq(x).addClass('Portal-Page-Edit');
            } else {
                $('div.Portal-Page-Body').eq(x).removeClass('Portal-Page-Edit');
            }
        });

        $('input#PageTemplateType').val(_EditPageTemplateType);
        $('input#PageTemplateId').val(_EditPageTemplateID);
        $('input#PageTitle').val(_EditPageData.title);
        $('a.Page-Template-Type').each(function(){
            $(this).attr('class', 'ChinaNet-Left Page-Template-Type Template-Type-'+_EditPageTemplateType);
            $(this).find('span').eq(1).html(getTemplateType(_EditPageTemplateType));
        });

        $('iframe#PageEditorIframeID').attr('src', '/merchant/load_pagedata.htm');
        $('div.ChinaNet-Portal-Editor-Page').slideDown(100);
        return true;
    }

    return false;
}


/**
 * 取消页面编辑
 *
 *
 */
function onCancelEditPage(){
    var height = $('div.Portal-Detail-Body-Action').height();
    _EditPageID = null;
    _EditPageData = null;
    _EditPageTemplateType = null;
    _EditPageTemplateID = null;
    _TempPageData = null;
    _TempPageID = null;

    $('div.Portal-Page-Body').removeClass('Portal-Page-Edit');
    $('div.ChinaNet-Portal-Editor-Page').slideUp(100);

    $('div.ChinaNet-Portal-Detail-Body').stop().animate({height:height+20},100);
}


/**
 * 创建新页面
 *
 */
function onAddNewPageForSite(){
    var pageid = 'NPX'+((Math.random()+'').replace('.',''));
    _EditPageID= pageid;
    _EditPageData = {};
    _EditPageData.pageid = _EditPageID;
    _EditPageData.type   = 'AUTH';
    $('input#PageTemplateType').val('AUTH');
    $('input#PageTemplateId').val('');
    $('input#PageTitle').val('请填写页面标题');
    $('a.Page-Template-Type').each(function(){
        $(this).attr('class', 'ChinaNet-Left Page-Template-Type Template-Type-AUTH');
        $(this).find('span').eq(1).html(getTemplateType('AUTH'));
    });

    $('iframe#PageEditorIframeID').attr('src', '/merchant/templates.htm');
    $('div.ChinaNet-Portal-Editor-Page').slideDown(100);
    $('div.ChinaNet-Portal-Detail-Body').stop().animate({height:80},100);
    return true;
}


/**
 * 保存站点
 * @param site
 * @returns {boolean}
 */
function onSaveSiteData(){
    if(typeof _SiteData!='undefined'&&_SiteData!=null){
        var siteObj = {};
            siteObj.siteid = _SiteID;
            siteObj.sitename  = _SiteData.sitename;
            siteObj.accountId = _SiteData.accountId+'';
            siteObj.description = _SiteData.description;
            if(typeof _EditPageData!='undefined'&&_EditPageData!=null){
                if((_EditPageData.pageid+'').indexOf('NPX')>-1) _EditPageData.pageid='';
                _EditPageData.data.layout.header.title = _EditPageData.title;
            }

            // refresh site page data
            /**
             * 整理站点页面内容
             * @type {Array}
             */
            var pages = [];
            if(typeof _SiteData.pages!='undefined') {
                for (var px = 0; px < _SiteData.pages.length; px++) {
                    if (typeof _EditPageData != 'undefined' && _EditPageData != null) {
                        if (_SiteData.pages[px].pageid == _EditPageData.pageid) {
                            pages.push({pageid: _EditPageData.pageid,
                                data: _EditPageData.data,
                                name: _EditPageData.name,
                                title: _EditPageData.title,
                                type: _EditPageData.type,
                                templateid: _EditPageData.templateid});
                        } else {
                            var page = _SiteData.pages[px];
                            pages.push({pageid: page.pageid,
                                data: page.data,
                                name: page.name,
                                title: page.title,
                                type: page.type,
                                templateid: page.templateid});
                        }
                    } else {
                        var page = _SiteData.pages[px];
                        pages.push({pageid: page.pageid,
                            data: page.data,
                            name: page.name,
                            title: page.title,
                            type: page.type,
                            templateid: page.templateid});
                    }
                }
            }
            // 如果是新增页面
            if(typeof _EditPageData!='undefined'&&_EditPageData!=null) {
                if(_EditPageData.pageid==''){
                	pages.push({pageid:_EditPageData.pageid,
                        data:_EditPageData.data,
                        name:_EditPageData.name,
                        title:_EditPageData.title,
                        type:_EditPageData.type,
                        templateid:_EditPageData.templateid});
                }
            }

            siteObj.pages = pages;
        var reportdata = {};
            $.ajax({
                url:'/merchant/sitedetails.htm',
                type:'POST',
                dataType:'JSON',
                data:{refreshthumb:true,sitedata:JSON.stringify(siteObj)},
                async:false,
                success:function(data){
                    reportdata = data;
                }
            });
        return reportdata;
    }else{
        return {result:'FAIL',message:'不能提交空页面数据'}
    }

    //return {result:'FAIL',message:'业务处理失败'}
}


function onCheckPageType(page){
    if(typeof _SiteData!='undefined'&&_SiteData!=null){
        if(page.type=='LOGIN'||page.type=='AUTH'){
            var pages = _SiteData.pages;
            if(!isNaN(page.pageid)){
                for (var px = 0; px < _SiteData.pages.length; px++) {
                    if (_SiteData.pages[px].type == page.type) {
                        if(_SiteData.pages[px].pageid==page.pageid){
                            return true;
                        }else{
                            return false;
                        }
                    }
                }
            }else {
                for (var px = 0; px < _SiteData.pages.length; px++) {
                    if (_SiteData.pages[px].type == page.type) {
                        return false;
                    }
                }
            }
            return true;
        }else{
            return true;
        }
    }
    return false;
}


/**
 * 渲染并打印页面
 *
 */
function onRenderPage(page){
    var pageHtml = '';
    var replaceText = null;
    if(page!=null){
        pageHtml += page.template.layout.header;
        pageHtml += page.template.layout.body;
        pageHtml += page.template.layout.footer;


        // replace page title
        /**
         * 替换页面标题
         *
         */
        var title = '';
        if(typeof page.data.layout.header.title!='undefined'&&page.data.layout.header.title!=''){
            title = page.data.layout.header.title;
        }else{
            title = page.title;
        }
        var replaceText = new RegExp('{%=title%}', 'ig');
        pageHtml = pageHtml.replace(replaceText, title);

        // page load css file
        /**
         * 加载页面样式文件
         * @type {string}
         */
        var linkcss = '';
        var pagecss = page.template.layout.css;
        for(var i=0;i<pagecss.length;i++){
            linkcss+= "<link type=\"text/css\" rel=\"stylesheet\" media=\"screen\" href=\""+pagecss[i]+"\">\n";
        }

        linkcss += '<link type="text/css" rel="stylesheet" media="screen" href="/statics/css/editpage.css">';
        pageHtml = pageHtml.replace(/{#css#}/ig, linkcss);

        // page load js file
        var jsfile = '';
        var pagejs = page.template.layout.script;
        for(var i=0;i<pagejs.length;i++){
            jsfile += "<script type=\"text/javascript\" src=\""+pagejs[i]+"\"></script>\n";
        }

        jsfile  += '<script type="text/javascript" src="/statics/js/editpage.js"></script>'
        pageHtml = pageHtml.replace(/{#script#}/ig, jsfile);

        // page load modules
        /**
         * 载入页面模块数据
         * @type {PNotify.modules|*|modules}
         */
        var modules = page.template.modules;
        for(var i=0;i<modules.length;i++) {
            var moduleName = modules[i].moduleid;
            var moduleHtml = modules[i].layout;
            var components = modules[i].components;

            if (moduleName != 'siteLoginModuleBox') {
                for (var j = 0; j < components.length; j++) {
                    var componentHtml = components[j].content;
                    var componentData = getComponentDataByComponentID(modules[i].moduleid, components[j].componentid, page);

                    // replace resources
                    /**
                     * 替换URL资源
                     */
                    if (typeof componentData.url != 'undefined' &&
                        (componentHtml.indexOf('{%=url%}') > -1 || componentHtml.indexOf('{@#url@}') > -1)) {
                        componentHtml = componentHtml.replace(/{%=url%}/ig, componentData.url);
                        componentHtml = componentHtml.replace(/{@#url@}/ig, componentData.url);
                    }

                    // replace title
                    /**
                     * 替换标题文本
                     */
                    if (typeof componentData.title != 'undefined' &&
                        (componentHtml.indexOf('{%=title%}') > -1 || componentHtml.indexOf('{@#title@}') > -1)) {
                        componentHtml = componentHtml.replace(/{%=title%}/ig, componentData.title);
                        componentHtml = componentHtml.replace(/{@#title@}/ig, componentData.title);
                    }

                    // replace text
                    /**
                     * 替换长文本
                     */
                    if (typeof componentData.description != 'undefined' &&
                        (componentHtml.indexOf('{%=description%}') > -1 || componentHtml.indexOf('{@=description@}') > -1)) {
                        componentHtml = componentHtml.replace(/{%=description%}/ig, componentData.description);
                        componentHtml = componentHtml.replace(/{@=description@}/ig, componentData.description);
                    }

                    // replace image url
                    /**
                     * 替换图片地址
                     */
                    if (typeof componentData.thumb != 'undefined' &&
                        (componentHtml.indexOf('{%=thumb%}') > -1 || componentHtml.indexOf('{@#thumb@}') > -1 || componentHtml.indexOf('{@=thumb@}') > -1)) {
                        componentHtml = componentHtml.replace(/{%=thumb%}/ig, componentData.thumb)
                        componentHtml = componentHtml.replace(/{@#thumb@}/ig, componentData.thumb)
                        componentHtml = componentHtml.replace(/{@=thumb@}/ig, componentData.thumb);
                    }


                    // replace module component html
                    /**
                     * 替换模块组件数据
                     *
                     */
                    var replaceText = new RegExp('{{' + components[j].componentid + '}}', 'ig');
                    moduleHtml = moduleHtml.replace(replaceText, componentHtml);
                }

                var replaceText = new RegExp('{{' + modules[i].moduleid + '}}', 'ig');
                pageHtml = pageHtml.replace(replaceText, moduleHtml);
            }else{
                // auth login form
                /**
                 * 验证页表单
                 *
                 */
                var authData = getComponentDataByComponentID('siteLoginModuleBox','',page);
                    if(typeof authData.auth_html_code!='undefined'&&moduleHtml.indexOf('{%=auth_html_code%}')>-1){
                        moduleHtml = moduleHtml.replace(/{%=auth_html_code%}/ig, authData.auth_html_code);
                    }
                    if(typeof authData.platSvrAddr!='undefined'&&moduleHtml.indexOf('{@=platSvrAddr@}')>-1){
                        moduleHtml = moduleHtml.replace(/{@=platSvrAddr@}/ig, authData.platSvrAddr);
                    }
                pageHtml = pageHtml.replace(/{{siteLoginModuleBox}}/ig, moduleHtml);
            }
        }
    }
    return pageHtml;
}

/**
 * 获取模块某个组件数据
 * @param module
 * @param component
 * @param page
 * @constructor
 */
function getComponentDataByComponentID(module,component,page){
    if(typeof page!='undefined'){
        var modules = page.data.modules;
        for(var mx=0;mx<modules.length;mx++){
            if(modules[mx].moduleid==module){
                if(module=='siteLoginModuleBox'){
                    return modules[mx].layout;
                }else {
                    var components = modules[mx].components;
                    for (var cx = 0; cx < components.length; cx++) {
                        if (components[cx].componentid == component) {
                            return components[cx].content;
                        }
                    }
                }
            }
        }
    }
    return false;
}

/**
 * 弹窗编辑页面模块组件数据
 *
 * @param id
 * @param title
 */
function openEditModuleDialog(id,title){
    var page = _TempPageData!=null?_TempPageData:_EditPageData;
    if(typeof page=='object') {
        var dialogHtml = getModuleDataHtml(id, page);
            dialogHtml = '<div class="Portal-Module-Component-Body"><div class="Component-Data-Body">'+dialogHtml+'</div></div>';
        onOpenDialog('Edit_Module_Dialog_ID', '编辑' + title + '模块内容', dialogHtml, {ok:function(){
            var components = [];
            var module     = '';
            var component  = '';
            $('div.Component-Data-Item').each(function(){
                var content = {};
                if($(this).find('.Component-Thumb').length>0){
                    content.thumb = $(this).find('.Component-Thumb').find('img').attr('src');
                }
                if($(this).find('.Component-Title').length>0){
                    content.title = $(this).find('.Component-Title').html();
                }
                if($(this).find('.Component-Url').length>0){
                    content.url = $(this).find('.Component-Url').html();
                }
                if($(this).find('.Component-Description').length>0){
                    content.description = $(this).find('.Component-Description').html();
                }
                if($(this).find('button').length>0){
                    module = $(this).find('button').attr('data-moduleid');
                    component = $(this).find('button').attr('data-componentid');
                }

                components.push({componentid:component,content:content});
            });

            if($('div.Portal-Auth-Type-List').length>0){
                var authType = [];
                $('div.Portal-Auth-Type-List').each(function(){
                    if($(this).hasClass('Auth-Type-Changed')) authType.push($(this).attr('data-authType'));
                });
                setAuthTypeModule(authType.join(','));
            }

            if(typeof _TempPageData!='undefined'&&_TempPageData!=null&&module!=''){
                var page =onSaveModuleData(module, _TempPageData, components)
                if(page){
                	var pageid = _EditPageData.pageid;
                    _EditPageData = page;
                    if(typeof _EditPageData.pageid == 'undefined') _EditPageData.pageid = pageid; //新增时，_EditPageData.pageid不存在时沿用分配的pageid
                    _TempPageData = null;
                    _TempPageID   = null;
                    var html = onRenderPage(_EditPageData);
                    if(html.length>0) {
                        var dom = document.getElementById('PageEditorIframeID').contentWindow.document;
                        $('iframe#PageEditorIframeID').attr('src', '/merchant/load_pagedata.htm?sid=' + Math.random());
                        dom.write(html);
                        dom.close();
                    }
                }
            }

            return true;
        }});
        $('div.Component-Data-Item button').click(function(){
            var module = $(this).attr('data-moduleid');
            var component = $(this).attr('data-componentid');
            var page = _TempPageData!=null?_TempPageData:_EditPageData;
            getEditComponentForm(component, module, page);
        });

        $('div.Portal-Auth-Type-List').click(function(){
            var type = $(this).attr('data-authType');
            if(type=='OPTION'){
                if($(this).hasClass('Auth-Type-Changed')){
                    $(this).removeClass('Auth-Type-Changed');
                }else{
                    $('div.Portal-Auth-Type-List').each(function(x){
                        $('div.Portal-Auth-Type-List').eq(x).removeClass('Auth-Type-Changed');
                    });
                    $(this).addClass('Auth-Type-Changed');
                }
            }else {
                if ($(this).hasClass('Auth-Type-Changed')) {
                    $(this).removeClass('Auth-Type-Changed');
                } else {
                    $('div.Portal-Auth-Type-List').each(function(x){
                        if($('div.Portal-Auth-Type-List').eq(x).attr('data-authType')=='OPTION'){
                            $('div.Portal-Auth-Type-List').eq(x).removeClass('Auth-Type-Changed');
                        }
                    });
                    $(this).addClass('Auth-Type-Changed');
                }
            }
        });

    }
}

/**
 * 重新加载模块内容
 *
 * @param module
 * @param page
 */
function onReloadEditModule(module, page){
    var html = getModuleDataHtml(module, page);
    $('div.ui-dialog-content').html('<div class="Portal-Module-Component-Body"><div class="Component-Data-Body">'+html+'</div></div>');
    $('div.Component-Data-Item button').click(function(){
        var module = $(this).attr('data-moduleid');
        var component = $(this).attr('data-componentid');
        var page = _TempPageData!=null?_TempPageData:_EditPageData;
        getEditComponentForm(component, module, page);
    });

    $('div.Portal-Auth-Type-List').click(function(){
        var type = $(this).attr('data-authType');
        if(type=='OPTION'){
            if($(this).hasClass('Auth-Type-Changed')){
                $(this).removeClass('Auth-Type-Changed');
            }else{
                $('div.Portal-Auth-Type-List').each(function(x){
                    $('div.Portal-Auth-Type-List').eq(x).removeClass('Auth-Type-Changed');
                });
                $(this).addClass('Auth-Type-Changed');
            }
        }else {
            if ($(this).hasClass('Auth-Type-Changed')) {
                $(this).removeClass('Auth-Type-Changed');
            } else {
                $('div.Portal-Auth-Type-List').each(function(x){
                    if($('div.Portal-Auth-Type-List').eq(x).attr('data-authType')=='OPTION'){
                        $('div.Portal-Auth-Type-List').eq(x).removeClass('Auth-Type-Changed');
                    }
                });
                $(this).addClass('Auth-Type-Changed');
            }
        }
    });

}


function setAuthTypeModule(type){
    var html = '';
    var icon = '';

    if(type=='OPTION'){
        html = '<div class="Portal-Auth-Body">' +
            '       <div class="Auth-Type-Free">' +
            '           <button type="button" class="AuthSubmitID ValidatorOption">点击免费上网</button>' +
            '       </div>' +
            '   </div>';
    }else{

        // 手机验证方式
        if(type.indexOf('MOBILE')>-1){
            html += '<div style="display:block;" class="Auth-Type-Item Auth-Type-MOBILE">' +
                '        <div class="Auth-Input-Row"><input type="text" placeholder="请输入手机号码" id="MobileNumber" name="MobileNumber"></div>' +
                '        <div class="Auth-Input-Captcha"><input type="text" placeholder="请输入验证码" id="SMSCodeNumber" name="SMSCodeNumber"></div>' +
                '        <div class="Auth-Input-Button"><button type="button" class="AuthMobileSMS">获取验证码</button></div>' +
                '        <div class="Auth-Button-Row"><button type="button" class="AuthSubmitID ValidatorMobile">马上登录</button></div>' +
                '    </div>';
            icon += '<a href="javascript:;" class="Auth-Type-MOBILE">&nbsp;</a>';
        }

        // 整理验证方式
        if(type.indexOf(',')>-1){
            html = '<div class="Portal-Auth-Body">' +
                '       <div class="Auth-Type-Body">' +
                '           <div class="Auth-Type-Icon">'+icon+'</div>' + html +
                '       </div>' +
                '</div>';
        }else{
            html = '<div class="Portal-Auth-Body">' +
                '       <div class="Auth-Type-Body Auth-Single">' +
                '           <div class="Auth-Type-Icon">'+icon+'</div>' + html +
                '       </div>' +
                '</div>';
        }
    }

    if(_TempPageData!=null){
        if(typeof _TempPageData.data!='undefined'){
            for(var mk=0;mk<_TempPageData.data.modules.length;mk++){
                if(_TempPageData.data.modules[mk].moduleid=='siteLoginModuleBox'){
                    _TempPageData.data.modules[mk].layout.auth_html_code = html;
                }
            }
        }
    }else if(_EditPageData!=null){
        if(typeof _EditPageData.data!='undefined'){
            for(var mk=0;mk<_EditPageData.data.modules.length;mk++){
                if(_EditPageData.data.modules[mk].moduleid=='siteLoginModuleBox'){
                    _EditPageData.data.modules[mk].layout.auth_html_code = html;
                }
            }
        }
    }

    if($.browser.msie){
        var win = $(window.parent.document.getElementById('PageEditorIframeID').contentWindow.document.body).find('div#siteLoginModuleBox');
    }else{
        var win = window.top.$('#PageEditorIframeID').contents().find('div#siteLoginModuleBox');
    }

    win.find('div.auth-type-components').remove();
    win.find('div.Portal-Auth-Body').remove();
    win.prepend(html);

    // 整理编辑框
    var height = win.find('div.Portal-Auth-Body').outerHeight();
    win.find('div.Page-Module-Edit-Body').height(height);
    win.find('div.Edit-Module-Overly').height(height);
}


/**
 * 获取模块数据HTML
 * @param module
 * @param page
 */
function getModuleDataHtml(module, page){
    var moduleListHtml = '';
        if(module=='siteLoginModuleBox'){

            moduleListHtml = '' +
                '<div class="Portal-Auth-Type-List" data-authType="MOBILE">' +
                '   <div class="Portal-Auth-Type-Body">' +
                '       <div class="Auth-Type-Icon Auth-Mobile"></div>' +
                '       <div class="Auth-Type-Text">' +
                '           <span class="Auth-Type-Name">短信验证登录</span>' +
                '           <span>通过手机获取验证码后，登录使用免费WIFI</span>' +
                '       </div>' +
                '   </div>' +
                '</div>' + /*
                '<div class="Portal-Auth-Type-List" data-authType="WECHAT">' +
                '   <div class="Portal-Auth-Type-Body">' +
                '       <div class="Auth-Type-Icon Auth-Wechat"></div>' +
                '       <div class="Auth-Type-Text">' +
                '           <span class="Auth-Type-Name">微信验证登录</span>' +
                '           <span>......<a href="javascript:;" id="ShowDeviceForWechatList">查看头当前支持微信验证列表</a></span>' +
                '       </div>' +
                '   </div>' +
                '</div>' + */
                '<div class="Portal-Auth-Type-List" data-authType="OPTION">' +
                '   <div class="Portal-Auth-Type-Body">' +
                '       <div class="Auth-Type-Icon Auth-Free"></div>' +
                '       <div class="Auth-Type-Text">' +
                '           <span class="Auth-Type-Name">免验证登录</span>' +
                '           <span>用户只需要点击页面“免费上网”按钮即可使用免费WIFI</span>' +
                '       </div>' +
                '   </div>' +
                '</div>';

        }else {
            if (typeof page != 'undefined') {
                var modules = page.data.modules;
                for (var mx = 0; mx < modules.length; mx++) {
                    if (modules[mx].moduleid == module) {
                        var components = modules[mx].components;
                        for (var cx = 0; cx < components.length; cx++) {
                            var contentObj = components[cx].content;
                            if (typeof contentObj.thumb != 'undefined') {
                                moduleListHtml += '<div class="Component-Data-Item Component-Data-Thumb">' +
                                    '<div class="Component-Data-Item-Thumb Data-Adorn-Overly Component-Thumb">' +
                                    '<div class="Overly-Top-Left"></div>' +
                                    '<div class="Overly-Top-Right"></div>' +
                                    '<div class="Overly-Bottom-Left"></div>' +
                                    '<div class="Overly-Bottom-Right"></div>' +
                                    '<img src="' + (contentObj.thumb ? contentObj.thumb : '/statics/img/no-image.png') + '">' +
                                    '</div>' +
                                    '<div class="Component-Data-Item-Text">' +
                                    ((typeof contentObj.title != 'undefined') ?
                                        ('<div class="Component-Data-Name Component-Title">' + contentObj.title + '</div>') : '') +
                                    ((typeof contentObj.url != 'undefined') ?
                                        ('<div Class="Component-Url">' + contentObj.url + '</div>') : '') +
                                    ((typeof contentObj.description != 'undefined') ?
                                        ('<div Class="Component-Description">' + contentObj.description + '</div>') : '') +
                                    '</div>' +
                                    '<button href="javascript:;" class="Form-Primary Edit-Button" data-componentid="' + components[cx].componentid + '" data-moduleid="' + module + '"><span>编辑内容</span></button>' +
                                    '</div>';
                            } else {
                                moduleListHtml += '<div class="Component-Data-Item">' +
                                    '<div class="Component-Data-Item-Thumb">' +
                                    '   <div class="Data-Number">' +
                                    '       <span class="Number-Right"></span>' +
                                    '       <span class="Number-Left"></span>' +
                                    (cx + 1) +
                                    '   </div>' +
                                    '</div>' +
                                    '<div class="Component-Data-Item-Text">' +
                                    ((typeof contentObj.title != 'undefined') ?
                                        ('<div class="Component-Data-Name Component-Title">' + contentObj.title + '</div>') : '') +
                                    ((typeof contentObj.url != 'undefined') ?
                                        ('<div class="Component-Url">' + contentObj.url + '</div>') : '') +
                                    ((typeof contentObj.description != 'undefined') ?
                                        ('<div Class="Component-Description">' + contentObj.description + '</div>') : '') +
                                    '</div>' +
                                '<button class="Form-Primary Edit-Button" data-componentid="' + components[cx].componentid + '" data-moduleid="' + module + '"><span>编辑内容</span></button>' +
                                '</div>';
                            }
                        }
                    }
                }
            }
        }

    return moduleListHtml;
}

/**
 * 获取编辑组件数据表单
 * @param component
 * @param module
 * @param page
 */
function getEditComponentForm(component, module, page){
    if($('div.Portal-Module-Component-Body .Module-Component-Edit-Overly').length==0) $('div.Portal-Module-Component-Body').append('<div class="Module-Component-Edit-Overly"></div>');
    if($('div.Portal-Module-Component-Body .Module-Component-Edit-Form').length==0) $('div.Portal-Module-Component-Body').append('<div class="Module-Component-Edit-Form"></div>');

    var formHtml = '<div class="Portal-Component-Thumb-View Data-Adorn-Overly Component-Input-Thumb">' +
        '   <div class="Overly-Top-Left"></div>' +
        '   <div class="Overly-Top-Right"></div>' +
        '   <div class="Overly-Bottom-Left"></div>' +
        '   <div class="Overly-Bottom-Right"></div>' +
        '   <div class="Thumb-Edit-Overly"></div>' +
        '   <a href="javascript:;" data-moduleid="'+module+'" data-componentid="'+component+'">更新内容图片</a>' +
        '</div>' +
        '<div class="Portal-Component-Edit-Body">' +
        '   <div class="ChinaNet-Form-Sheet Component-Input-Title">' +
        '       <label class="Form-Item-Title">标题</label>' +
        '       <div class="Form-Item-Input"><input type="text" class="Input-Control" id="ComponentTitle" name="ComponentTitle"></div>' +
        '   </div>' +
        '   <div class="ChinaNet-Form-Sheet Component-Input-Url">' +
        '       <label class="Form-Item-Title">链接地址(URL)</label>' +
        '       <div class="Form-Item-Input"><input type="text" class="Input-Control" id="ComponentURL" name="ComponentURL"></div>' +
        '   </div>' +
        '   <div class="ChinaNet-Form-Sheet Component-Input-Description">' +
        '       <label class="Form-Item-Title">描述</label>' +
        '       <div class="Form-Item-Textarea"><textarea class="Input-Control" id="ComponentDescription" name="ComponentDescription"></textarea></div>' +
        '   </div>' +
        '   <div class="ChinaNet-Form-Sheet">' +
        '       <lable class="Form-Item-Title">&nbsp;&nbsp;&nbsp;</lable>' +
        '       <div class="ChinaNet-Left">' +
        '           <button class="Form-Primary" type="button" id="ConfirmComponent" data-moduleid="'+module+'" data-componentid="'+component+'"><span>保存</span></button>' +
        '           <button class="Form-Default" type="button" id="CancelComponent"><span>取消</span></button>' +
        '       </div>' +
        '   </div>' +
        '</div>';


    // insert form html
    /**
     *
     */
        $('div.Module-Component-Edit-Form').html(formHtml);
    var contentObj = getComponentDataByComponentID(module,component,page);
        if(typeof contentObj.thumb!='undefined'){
            $('div.Module-Component-Edit-Form').addClass('Component-Edit-Thumb');
            if(contentObj.thumb!=''){
                $('div.Portal-Component-Thumb-View').append('<img src="'+contentObj.thumb+'" id="ComponentThumbIMG">');
            }else{
                $('div.Portal-Component-Thumb-View').append('<img src="/statics/img/no-image.png">');
            }
        }

        if(typeof contentObj.title!='undefined'){
            $('div.Module-Component-Edit-Form').addClass('Component-Edit-Title');
            $('input#ComponentTitle').val(contentObj.title);
        }
        if(typeof contentObj.url!='undefined'){
            $('div.Module-Component-Edit-Form').addClass('Component-Edit-Url');
            $('input#ComponentURL').val(contentObj.url);
        }
        if(typeof contentObj.description!='undefined'){
            $('div.Module-Component-Edit-Form').addClass('Component-Edit-Description');
            $('#ComponentDescription').val(contentObj.description);
        }


    // display edit form
    /**
     * 进入组件内容编辑状态
     */
    $('div.Module-Component-Edit-Overly').fadeIn(100);
    $('div.Module-Component-Edit-Form').animate({right:0},100);
    $('div.Portal-Component-Thumb-View').mouseenter(function(){
        $(this).find('div.Thumb-Edit-Overly').fadeIn(100);
        $(this).find('a').fadeIn(100);
    });
    $('div.Portal-Component-Thumb-View').mouseleave(function(){
        $(this).find('div.Thumb-Edit-Overly').fadeOut(100);
        $(this).find('a').fadeOut(100);
    });

    // change thumb
    /**
     * 更换图片
     */
    $('div.Component-Input-Thumb a').click(function(){
        onChangePicture('#ComponentThumbIMG',false);
    });


    // disable config button
    $('button.ui-dialog-autofocus').attr('disabled', true);

    // cancel edit component
    /**
     * 取消组件内容编辑
     */
    $('button#CancelComponent').click(function(){
        $('div.Module-Component-Edit-Overly').fadeOut(100,function(){
            $('div.Module-Component-Edit-Overly').remove();
        });
        $('div.Module-Component-Edit-Form').fadeOut(100,function(){
            $('div.Module-Component-Edit-Form').remove();
        });
        $('button.ui-dialog-autofocus').attr('disabled', false);
    });


    // save component edit
    /**
     * 保存组件内容
     */
    $('button#ConfirmComponent').click(function(){
        var module = $(this).attr('data-moduleid');
        var component = $(this).attr('data-componentid');
        var contentObj= {};

        if(_TempPageData == null) _TempPageData = _EditPageData;
        _TempPagaID   = _EditPageID;

        var reFilterHTML = /<[\d\D]*?>/g;
        if($('div.Module-Component-Edit-Form').hasClass('Component-Edit-Thumb')){
            contentObj.thumb = $('div.Component-Input-Thumb').find('img').attr('src');
        }
        if($('div.Module-Component-Edit-Form').hasClass('Component-Edit-Title')){
            //contentObj.title = $('div.Component-Input-Title').find('input').val().replace(reFilterHTML, '').replace('<', '&lt;').replace('>', '&gt;');
        	contentObj.title = $('div.Component-Input-Title').find('input').val().replace('<', '&lt;').replace('>', '&gt;');
        }
        if($('div.Module-Component-Edit-Form').hasClass('Component-Edit-Url')){
        	if(isChn($('div.Component-Input-Url').find('input').val())){
        		onAlertErrorTip('链接地址(URL)不能含有汉字', $('div.Component-Input-Url').find('input')[0]);
                return false;
        	}
            contentObj.url = filterUrl($('div.Component-Input-Url').find('input').val());
        }
        if($('div.Module-Component-Edit-Form').hasClass('Component-Edit-Description')){
            contentObj.description = $('div.Component-Input-Description').find('textarea').val().replace('<', '&lt;').replace('>', '&gt;');
        }

       var tmpPage = onSaveComponentData(component, module, _TempPageData, contentObj);
        if(tmpPage){
            _TempPageData = tmpPage;
            $('div.Module-Component-Edit-Overly').fadeOut(100,function(){
                $('div.Module-Component-Edit-Overly').remove();
            });
            $('div.Module-Component-Edit-Form').fadeOut(100,function(){
                $('div.Module-Component-Edit-Form').remove();
            });
            onReloadEditModule(module, _TempPageData);
            $('button.ui-dialog-autofocus').attr('disabled', false);
        }
    });

}

/**
 * 临时保存组件编辑数据
 * @param component
 * @param module
 * @param page
 * @param content
 * @returns {*}
 */
function onSaveComponentData(component, module, page, content){
    if(typeof page!='undefined'){
        var modules = page.data.modules;
        for(var mx=0;mx<modules.length;mx++){
            if(modules[mx].moduleid==module){
                var components = modules[mx].components;
                for(var cx=0;cx<components.length;cx++){
                    if(components[cx].componentid==component){
                        page.data.modules[mx].components[cx].content = content;
                        break;
                    }
                }
            }
        }

        return page;
    }

    return false;
}

/**
 * 临时保存模块数据
 * @param module
 * @param page
 */
function onSaveModuleData(module,page, data){
    if(typeof page!='undefined'){
        var modules = page.data.modules;
        for(var mx=0;mx<modules.length;mx++){
            if(modules[mx].moduleid==module){
                page.data.modules[mx].components = data;
                break;
            }
        }

        return page;
    }

    return false;
}


function onChangePageTemplate(page){
    var html = onRenderPage(page);
    if(html.length>0){
        $('#PageTemplateId').val(page.templateid);
        $('#PageTitle').val(page.title);
        var dom = document.getElementById('PageEditorIframeID').contentWindow.document;
        $('iframe#PageEditorIframeID').attr('src', '/merchant/load_pagedata.htm?sid='+Math.random());
        dom.write(html);
        dom.close();
        _TempPageData = page;
        if($('div.ChinaNet-Portal-Detail-Body').height()>80){
            $('div.ChinaNet-Portal-Detail-Body').stop().animate({height:80},100);
        }
    }
}

/**
 *
 *
 * @param siteList
 * @returns {*}
 */
function generateSiteListHtml(siteList) {
	var siteListHtml = "";
    
	if(siteList==null){
		$(".ChinaNet-Page-Table").hide();
		return false;
	}
    
	if (siteList.length > 0) {
		for ( var i = 0; i < siteList.length; i++) {
			var siteid = siteList[i].siteid;
			var sitename = siteList[i].sitename;
			var merchantname = siteList[i].merchant_name;
			var createtime = isNotEmptyString(siteList[i].createtime)?siteList[i].createtime.replace('T', ' '):'';
			var type = siteList[i].status;
			var pushtime=isNotEmptyString(siteList[i].push_datetime)?siteList[i].push_datetime.replace('T', ' '):' ';
			var pushcount = isNotEmptyString(siteList[i].push_cout)?siteList[i].push_cout:'0';
			var deviceid=isNotEmptyString(siteList[i].device_id)?siteList[i].device_id:' ';
				
			var thumburl = isNotEmptyString(siteList[i].thumb_url)?siteList[i].thumb_url : "/statics/img/no-image.png";
                siteListHtml += "<li>";
                siteListHtml += "<div class='Portal-Site-Thumb-Body Data-Adorn-Overly'>";
                siteListHtml += "	<span class='Overly-Top-Left'></span>";
                siteListHtml += "	<span class='Overly-Top-Right'></span>";
                siteListHtml += "	<span class='Overly-Bottom-Left'></span>";
                siteListHtml += "	<span class='Overly-Bottom-Right'></span>";
                siteListHtml += "	<div class='Site-Data-Device'>";
                siteListHtml += "		<ul>";
                siteListHtml += "			<li><span class='In-Mobile-Icon'></span></li>";
                siteListHtml += "    		<!--<li><span class='In-Pad-Icon'></span></li>";
                siteListHtml += "    		<li><span class='No-LCD-Icon'></span></li>-->";
                siteListHtml += "		</ul>";
                siteListHtml += "	</div>";
                siteListHtml += "	<div class='Portal-Site-Data'>";
                siteListHtml += "		<div class='Site-Data-Abstract'>";
                siteListHtml += "    		<div class='Data-Content-Body'>";
                siteListHtml += "        		<span class='Data-Name'><a href='javascript:;'>"+sitename+"</a></span>";
                siteListHtml += "        		<span>"+createtime+"</span>";
                siteListHtml += "    		</div>";
                siteListHtml += "		</div>";
                siteListHtml += "		<div class='Site-Data-EditBar' id='site_opt_btn_" + siteid + "'>";
                siteListHtml +=             generateSiteOptBtn(siteid, type);
                //siteListHtml += "    		<a href='javascript:;'>冻结</a>";
                //siteListHtml += "    		<a href='/merchant/editsite.htm?siteid="+siteid+"' class='initAjax'>编辑</a>";
                //siteListHtml += "    		<a href='javascript:DelPortal("+siteid+");'>删除</a>";
                siteListHtml += "		</div>";
                siteListHtml += "		<div class='Site-Data-Groom'>";
                siteListHtml += "    		<ul>";
                siteListHtml += "        	<li>&nbsp; "+deviceid+"</li>";
                siteListHtml += "        	<li>&nbsp; "+pushtime+"</li>";
                siteListHtml += "        	<li><span></span>"+pushcount+"</li>";
                siteListHtml += "    		</ul>";
                siteListHtml += "		</div>";
                siteListHtml += "	</div>";
                siteListHtml += "	<a href='javascript:;'><img src='"+thumburl+"'></a>";
                siteListHtml += "</div>";
                siteListHtml += "</li>";
		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	return siteListHtml;
}


/**
 *
 * @param siteId
 * @param Type
 * @returns {string}
 */
function generateSiteOptBtn(siteId,Type)
{
	var siteOptBtnHtml = "";
	if (siteId != null) {		
		if (Type == "LOCKED") {
			siteOptBtnHtml += "<a id='site_unlock_" + siteId + "'  href='javascript:unlockSite(\"" + siteId + "\")'>解锁</a>";
		} else {
			siteOptBtnHtml += "<a id='site_lock_" + siteId + "'  href='javascript:lockSite(\"" + siteId + "\")'>锁定</a>";
			siteOptBtnHtml += "<a href='/merchant/editsite.htm?siteid="+siteId+"' class='initAjax'>编辑</a>";
		}
		siteOptBtnHtml += "<a href='javascript:DelPortal("+siteId+");'>删除</a>";		
	}
	return siteOptBtnHtml;
}

/**
 * 锁定站点
 * @param siteID
 */
function lockSite(siteID) {
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/merchant/sitelock.htm',
		data : {
			'siteid' : siteID,
			'type' : 'LOCK'
		},
		success : function(data) {
			if (data.result != 'FAIL') {				
				var siteOptBtnHtml = generateSiteOptBtn(siteID,data.sitestatus);
				$("#site_opt_btn_" + siteID).html(siteOptBtnHtml);				
			} else {
				onAlertError(data.message);
			}
		},
		error : function() {
			onAlertError("站点锁定失败!");
		}
	});
}

/**
 * 站点解锁
 * @param siteID
 */
function unlockSite(siteID) {
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/merchant/sitelock.htm',
		data : {
			'siteid' : siteID,
			'type' : 'UNLOCK'
		},
		success : function(data) {
			if (data.result != 'FAIL') {				
				var siteOptBtnHtml = generateSiteOptBtn(siteID,data.sitestatus);
				$("#site_opt_btn_" + siteID).html(siteOptBtnHtml);
								
			} else {
				onAlertError("站点解锁失败!");
			}
		},
		error : function() {
			onAlertError("站点解锁失败!");
		}
	});
}

/**
 * 删除站点
 * @param PortalId
 * @constructor
 */
function DelPortal(PortalId){
	onConfirmDialog('<p>您确定删除该站点吗？</p><p>删除后将不能恢复！</p>',function(){DelPortalOk(PortalId)},function(){});	
}

/**
 * 确定删除站点
 * @param PortalId
 * @constructor
 */
function DelPortalOk(PortalId){
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/merchant/sitedelete.htm',
		data : {
			'siteid' : PortalId
		},
		success : function(data) {
			if (data.result != 'FAIL') {
				//onAlertError("站点删除成功!","ok");
				siteSearchHandler.refreshCurrentPage();
			} else {
				onAlertError(data.message);
			}
		},
		error : function() {
			onAlertError("站点删除失败!");
		}
	});
}

/**
 *
 * @param data
 * @param message
 * @returns {boolean}
 */
function searchFailCallBack(data, message) {
	onAlertError('加载站点数据请求提交失败！');
	return false;
}

/**
 *
 * @param data
 * @param message
 * @returns {boolean}
 */
function searchErrorCallBack(data, message) {
	onAlertError('加载站点数据请求提交失败！');
	return false;
}

/**
 * 加载站点信息
 *
 */
function pageLoad(){
	onShowPortalData();
	checkImageError();
}

/**
 *浏览站点页面
 */
function onShowPortalData(){
    $('div.Portal-Site-Thumb-Body').mouseenter(function(){
        var site = $(this);
        site.find('div.Portal-Site-Data').stop().animate({'bottom':0}, 100, function(){
            site.find('div.Site-Data-Device').stop().show().animate({'bottom':168}, 300);
        });
    });
    $('div.Portal-Site-Thumb-Body').mouseleave(function(){
        var site = $(this);
            site.find('div.Portal-Site-Data').stop().animate({'bottom':-115}, 100);
            site.find('div.Site-Data-Device').stop().animate({'bottom':53}, 100, function(){
                site.find('div.Site-Data-Device').stop().animate({'bottom':0}, 300);
            });
    });
}

/**
 * 检查错误图片
 *
 */
function checkImageError(){
    $('div.Portal-Site-Thumb-Body img').each(function(){
        $(this)[0].onerror = function(){
            $(this).attr('data-src', $(this).attr('src')).attr('src', '/statics/img/no-image.png');
        }
    });
}

function getSiteOwner(){
    var owner = {id:0,name:''}
    //if(__CONTEXT_MERCHANT_CODE=='REPRESENTATIVE'||__CONTEXT_MERCHANT_CODE=='ADMINISTRATOR') {
        if(_SiteData!=null&&typeof _SiteData.owner!='undefined') {
            $.ajax({
                url: '/account/accountdetails.htm',
                type: 'GET',
                dataType: 'JSON',
                data: {accountId: _SiteData.owner},
                async: false,
                success: function (data) {
                    if (data.result == 'OK') {
                        owner = {id: data.account.id, name: data.account.username}
                    }
                }
            });
        }
    //}else{
        //owner = {id:__CONTEXT_MERCHANT_KEY,name:__CONTEXT_MERCHANT_FULLNAME}
    //}
    return owner;
}

function getChangeAccountData(id){
    var owner = {value:'',text:''}
    $.ajax({
        url: '/account/accountdetails.htm',
        type: 'GET',
        dataType: 'JSON',
        data: {accountId: id},
        async: false,
        success: function (data) {
            if (data.result == 'OK') {
                owner = {value: data.account.id, text: data.account.username}
            }
        }
    });

    return owner;
}



