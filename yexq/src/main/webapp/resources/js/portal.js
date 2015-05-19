var portalJS = function(){
	var menuUrl = function(){
		$('div.portal-menu a').click(function(e){
			e.preventDefault();
			$(this).addClass('active').siblings().removeClass('active');
			$('html').mask('加载...');
			$.get($(this).attr('href'), function(data){
				$('div#id_main_content').html(data);
				$('html').unmask();
				return false;
			});
			return false;
		});
	}
	
	var ajaxUrl = function(){
		$(document).off('click','a.ajax-init');
		$(document).on('click','a.ajax-init',function(e){
			// 清除A标签默认事件
			e.preventDefault();

			$('html').mask('加载...');
			$.get($(this).attr('href'), function(data){
				$('div#id_main_content').html(data);
				$('html').unmask();
				return false;
			});
			return false;
		});
	}
	
	var ajaxData = function(){
		$(document).on('click', 'a.ajax-data', function(e){
			// 清除A标签默认事件
			e.preventDefault();
			
			$('html').mask('加载...');
			$.get($(this).attr('href'), function(data){
				//$('div#id_main_content').html(data);
				$('html').unmask();
				return false;
			});
			return false;
		});
	}
	
	var ajaxDialog = function(){
		$('a.ajax-dialog').click(function(e){
			// 清除A标签默认事件
			e.preventDefault();
			
			return false;
		});
	}

    var getAuthType = function(){
        $('#pageAuthorizeDialog').on('show.bs.modal', function(){
            var tag = '';
            var auth_sets = '';
            $('div.auth-type-body').each(function(x){
                auth_sets += tag+$('div.auth-type-body').eq(x).attr('id');
                tag = ',';
            })

            __auth_sets = auth_sets;


            $.ajax({
                url:__base_path+'/merchant/siteauthtype.htm',
                type:'GET',
                dataType:'json',
                async:false,
                success:function(data){
                    if(data.result=='OK'){
                        __auth_list = data.authtype;
                        var authitem = '';
                        for(var i=0;i<__auth_list.length;i++){
                            if(__auth_list[i].type=='MOBILE') authitem += __auth_mobile_item;
                            if(__auth_list[i].type=='OPTION') authitem += __auth_option_item;
                            if(__auth_list[i].type=='WECHAT') authitem += __auth_wechat_item;
                            if(__auth_list[i].type=='EMAIL') authitem += __auth_email_item;
                            if(__auth_list[i].type=='USERPWD') authitem += __auth_userpwd_item;
                            if(__auth_list[i].type=='EXTEND') authitem += __auth_extend_item;
                        }

                        $('div#pageAuthorizeDialog').find('div.modal-body').html(authitem);
                        $('input#AuthTypeID').each(function(k){
                            if(__auth_sets.indexOf($('input#AuthTypeID').eq(k).val())>-1) $('input#AuthTypeID').eq(k).attr('checked', true);
                        })
                    }
                }
            })
        });
    }
	
	var getDater = function(){
		// 日期插件
	    $('.form-datetime').datetimepicker({
	        language : 'zh-CN',
	        weekStart : 1,
	        todayBtn : 1,
	        autoclose : 1,
	        todayHighlight : 1,
	        startView : 2,
	        minView : 2,
	        forceParse : 0,
	        pickerPosition:"bottom-left"
	    });
	}
	
	var onSearchSite = function(){
		$("form.wp-site-search").submit(function(){
			$('html').mask('正在加载...');
			$.ajax({
				url:$(this).attr('action'),
				type:'GET',
				dataType:'json',
				data:$(this).serialize(),
				async:false,
				success:function(data){
					$('div.wifi-main-site').html(siteManagementHtml(data.records));
					$('html').unmask();
				}
			});
			return false;
		});
	}
	
	var siteManagementHmlt = function(data){
		var html = '';
		for(i=0;i<data;i++){
			var item = data[i];
			html += '<div class="site-item">'
	                +'	<a href="javascript:;"><img src="'+contextPath+'/resources/img/no-image.png"></a>'
	                +'	<a href="javascript:;" class="st-text">'+item.site_name+'</a>'
	                +'	<a href="javascript:;" class="st-text">'+item.fullname+'</a>'
	                +'	<span class="st-text">'+item.last_update_time+'</span>'
	                +'	<div>'
	                +(item.status=='NORMAL'?'	<a href="'+contextPath+'/merchant/sitelock.htm?siteid='+item.id+'&type=lock" class="st-icon ajax-data"><span class="glyphicon glyphicon-lock"></span> 冻结</a>':'	<a href="'+contextPath+'/merchant/sitelock.htm?siteid='+item.id+'&type=unlock" class="st-icon ajax-data"><span class="glyphicon glyphicon-open"></span> 解冻</a>')
	                +'	</div>'
	            +'</div>';
		}
		
		return html;
	}

    var onConfigAuthType = function(){
        $('button#configAuthSettings').click(function(){
            var auth_html = '';
            var auth_item = ''
            var auth_sets = '';
            $('input#AuthTypeID').each(function(x){
                if($(this)[0].checked){
                    //alert($(this).val());
                    if($(this).val()=='MOBILE'){
                        auth_sets += auth_sets!=''?',MOBILE':'MOBILE';
                        auth_html += __auth_mobile;
                        auth_item += '<li><a href="javascript:;" class="mobile">&nbsp;</a></li>';
                    }
                    if($(this).val()=='OPTION'){
                        auth_sets += auth_sets!=''?',OPTION':'OPTION';
                        auth_html += __auth_option;
                        auth_item += '<li><a href="javascript:;" class="option">&nbsp;</a></li>';
                    }
                    if($(this).val()=='WECHAT'){
                        auth_sets += auth_sets!=''?',WECHAT':'WECHAT';
                        auth_html += __auth_wechat;
                        auth_item += '<li><a href="javascript:;" class="wechat">&nbsp;</a></li>';
                    }
                    if($(this).val()=='EMAIL'){
                        auth_sets += auth_sets!=''?',EMAIL':'EMAIL';
                        auth_html += __auth_email;
                        auth_item += '<li><a href="javascript:;" class="email">&nbsp;</a></li>';
                    }
                    if($(this).val()=='USERPWD'){
                        auth_sets += auth_sets!=''?',USERPWD':'USERPWD';
                        auth_html += __auth_userpwd;
                        auth_item += '<li><a href="javascript:;" class="userpwd">&nbsp;</a></li>';
                    }
                    if($(this).val()=='EXTEND'){
                        auth_sets += auth_sets!=''?',EXTEND':'EXTEND';
                        auth_html += __auth_extend;
                        auth_item += '<li><a href="javascript:;" class="extend">&nbsp;</a></li>';
                    }
                }
            });

            if(auth_html==''){
                alert('至少选择一种验证方式');
                return false;
            }else{
                __auth_sets = auth_sets;
                $('div#siteLoginModuleBox').find('div.auth-type-components-view').html(auth_html);
                $('div#siteLoginModuleBox').find('div.auth-type-list-item').find('ul').html(auth_item);
                setAuthPageHtml();// 更新当前编辑站点验证页数据
                onAuthTypeForm();
                $('div#pageAuthorizeDialog').modal('hide');
            }
        });
    }

    var onCheckOptioner = function(){
        $(document).off('click', 'div.checkbox input[type=checkbox]');
        $(document).on('click', 'div.checkbox input[type=checkbox]', function(){
           if($(this)[0].checked){
               if($(this).val()=='OPTION'){
                   $('input#AuthTypeID').each(function(x){
                       if($('input#AuthTypeID').eq(x).val()!='OPTION') $('input#AuthTypeID').eq(x).attr('checked', false);
                   })
               }else{
                   $('input#AuthTypeID').each(function(x){
                       if($('input#AuthTypeID').eq(x).val()=='OPTION') $('input#AuthTypeID').eq(x).attr('checked', false);
                   })
               }
           }
        });
    }
	
	var onChangeTab = function(){
		/*$(document).on('click', 'ul.wifi-portal-tabnav a', function(){
			var len = $(this).parent().prevAll().length;
			var dom = $(this).parent().parent().parent().parent().parent();
			$(this).addClass('active').parent().siblings().find('a').removeClass('active');
			$('div.editor-data-body').each(function(x){
				if(x==len){
					dom.find('div.editor-data-body').eq(x).show();
				}else{
					dom.find('div.editor-data-body').eq(x).hide();
				}
			})
		})*/
	}
	
	return {init: function(){
			menuUrl();
			getDater();
			ajaxUrl();
			ajaxData();
			onSearchSite();
			onChangeTab();
            getAuthType();
            onConfigAuthType();
            onCheckOptioner();
			//ajaxDialog();
		}
	}
}();

var uploadImagePreview = function(input){
	var image = input.parentNode.getElementsByTagName('img');
		image = image[0];

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) { 
        	image.src=e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        var imgSrc = document.selection.createRange().text;
        
        input.select();
        input.blur();
        
        try {
            image.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        } catch (e) {
            alert("no picture");
            return false;
        }
        image.style.display = 'none';
        document.selection.empty();
    }
}

var __Account_Merchants = [];
var __portal_policyId = null;
var __portal_policyOwnerId = null;
var __portal_policyItems = null;
var __portal_deviceIds = null;
var __policy_editItem = null;
var __show_editBar = 0;  // Module 编辑状态条
var __portal_sitedata={}; // 当前站点的数据对象
var __edit_sitepage={}; // 当前编辑页面的数据对象
var __default_data ={}; // 当前编辑页面的默认数据
var __portalid = 0;
var __edit_pageid='';  //当前编辑的PAGEID
var __edit_pagenew = false;
var __edit_tempage = {};
var __show_editer  = 0;
var __auth_list = [];
var __auth_sets = 'MOBILE';
var __auth_mobile = "<div class='auth-type-body auth-mobile' id='MOBILE'>" +
                    "<div class='loginAPI-Form'>" +
                        "<table align='center'>" +
                            "<tbody>" +
                                "<tr>" +
                                    "<td><input type='text' name='MobileNumber' id='MobileNumber' placeholder='输入手机号码...'></td>" +
                                    "<td width='20'>&nbsp;</td>" +
                                    "<td><button class='AuthMobileSMS' type='button'>获取验证码</button></td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td><input type='text' name='SMSCodeNumber' id='SMSCodeNumber' placeholder='验证码...'></td>" +
                                    "<td width='20'>&nbsp;</td>" +
                                    "<td>&nbsp;</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td colspan='3'><button class='AuthSubmitID ValidatorMobile' type='button'>马上登录</button></td>" +
                                "</tr>" +
                            "</tbody>" +
                        "</table>" +
                    "</div>"+
                    "</div>"

var __auth_option = "<div class='auth-type-body auth-option' id='OPTION'></div>";
var __auth_wechat = "<div class='auth-type-body auth-wechat' id='WECHAT'></div>";
var __auth_email  = "<div class='auth-type-body auth-email' id='EMAIL'></div>";
var __auth_userpwd= "<div class='auth-type-body auth-userpwd' id='USERPWD'></div>";
var __auth_extend = "<div class='auth-type-body auth-userpwd' id='EXTEND'></div>";


var __auth_mobile_item = "<div class='checkbox'>" +
                            "<label><input type='checkbox' id='AuthTypeID' name='AuthTypeID' class='auth-checkbox-com' value='MOBILE'> 短信认证</label>" +
                            "<p class='help-block'>用户通过手机申请上网验证码，并使用手机号与验证码登录完成验证上网</p>" +
                         "</div>";
var __auth_option_item = "<div class='checkbox'>" +
                            "<label><input type='checkbox' id='AuthTypeID' name='AuthTypeID' class='auth-checkbox-com' value='OPTION'> 免认证登录</label>" +
                            "<p class='help-block'>用户只须点击页面“免费上网”，即可实现上网</p>" +
                         "</div>";
var __auth_wechat_item = "<div class='checkbox'>" +
                            "<label><input type='checkbox' id='AuthTypeID' name='AuthTypeID' class='auth-checkbox-com' value='WECHAT'> 关注微信公众帐号</label>" +
                            "<p class='help-block'>用户进入微信，并通过微信扫描商户提供的上网二维码，完成微信关注后，实现上网</p>" +
                         "</div>";
var __auth_email_item = "<div class='checkbox'>" +
                            "<label><input type='checkbox' id='AuthTypeID' name='AuthTypeID' class='auth-checkbox-com' value='EMAIL'> 邮箱激活认证</label>" +
                            "<p class='help-block'></p>" +
                         "</div>";
var __auth_userpwd_item = "<div class='checkbox'>" +
                            "<label><input type='checkbox' id='AuthTypeID' name='AuthTypeID' class='auth-checkbox-com' value='USERPWD'> 接入系统平台会员认证</label>" +
                            "<p class='help-block'>通过接入系统平台会员通行证验证上网</p>" +
                         "</div>";
var __auth_extend_item = "<div class='checkbox'>" +
                            "<label><input type='checkbox' id='AuthTypeID' name='AuthTypeID' class='auth-checkbox-com' value='EXTEND'> 第三方验证</label>" +
                            "<p class='help-block'>第三方验证</p>" +
                         "</div>";



function setAuthPageHtml(){
    if(typeof __edit_sitepage.pageid!='undefined'){
        if(__edit_sitepage.type=='AUTH'){
            for(var i=0;i<__edit_sitepage.data.modules.length;i++){
                if(__edit_sitepage.data.modules[i].moduleid=='siteLoginModuleBox'){
                    $('div.auth-type-components-view').removeAttr('style');
                    $('div.auth-component-button').removeAttr('style');
                    $('div.auth-type-body').removeAttr('style');
                    $('div.auth-type-list-item').removeAttr('style');
                    __edit_sitepage.data.modules[i].layout.auth_html_code = "<div class='auth-type-components'>"+$('div#siteLoginModuleBox div.auth-type-components').html().replace(/\"/ig,"'")+'</div>';
                    //alert((__edit_sitepage.data.modules[i].layout.auth_html_code));
                    //alert(__edit_sitepage.data.modules[i].layout.auth_html_code);
                }
            }
            resetPortalSiteData(__edit_sitepage);
        }
    }
}



function onAuthTypeForm(){
    var type = $('div#siteLoginModuleBox div.auth-type-body');
    if(type.length>1){
        var pos = $('div#siteLoginModuleBox').css('position').toLowerCase();
        if(pos=='absolute'||pos=='fixed'){
            $('div.auth-component-button').show().find('button').attr('class', 'wifi-auth-config');
        }else{
            $('div.auth-type-components-view').show();
        }
        $('div.auth-type-components-view a.close').show();
    }else{
        if(type.length==1) {
            if (type.attr('id').toLowerCase() == 'option') {
                $('div.auth-component-button').show().find('button').attr('class', 'fee-wifi-config').html('点击免费上网');
                $('div.auth-type-components-view').removeAttr('style');
            } else {
                $('div.auth-type-components-view').show().find('div.auth-type-body').show();
                $('div.auth-component-button').hide();
            }
        }
    }
}

function getAccountList(){
	__Account_Merchants = [];
	$.ajax({
		url:contextPath+'/account/getsubmerchant.htm',
		type:'GET',
		dataType:'JSON',
		data:{accountId:__ACCOUNT_CHECKED_COUNT},
		async:false,
		success:function(data){
			if(data.result=='OK'){
	            for(i=0;i<data.merchants.length;i++){
	                var account = data.merchants[i];
	                __Account_Merchants.push({id:data.merchants[i].id,text:data.merchants[i].merchantname});
	            }
	        }
		}
	});
}



//
function LoadPolicyAssociatedSites(siteIds) {
	//alert(siteIds);
	if (siteIds != null && siteIds.length > 0) {
    	$.ajax({
			type : 'GET',
			dataType : 'json',
			url : contextPath+'/merchant/portalsites.htm',
			data : {
				"siteids": siteIds
			},
			success : function(data) {
				if (data.result != "FAIL") {
					
					if (data.siteinfos != null) {
						renderSiteThumbs(data.siteinfos);
					}
				} else {
					$.pnotify({
						title : "显示策略加载失败",
						text : data.message,
						type : 'error'
					});
					return false;
				}
			},
			error : function(data) {
				$.pnotify({
					title : "无法连接服务器",
					text : "加载显示策略请求提交失败！",
					type : 'error'
				});

				return false;
			}
		});
	}
}

/**
 * 
 * 
 * @param v
 * @param arr
 * @returns {Boolean}
 */
function inArray(v,arr){
	for(var i = 0;i<arr.length;i++){
		if(arr[i]==v) return true;
	}
	return false;
}

/**
 * 
 * @param n
 * @returns
 */
function setPolicyTime(n){
	return (parseInt(n)<10?'0'+parseInt(n)+":00":parseInt(n)+':00');
}

/**
 * 
 * @param timeStr
 * @returns {___anonymous9134_9165}
 */
function convertTimeStrToFloat(timeStr) {
    var separatorIndex = timeStr.indexOf(':');
    
    var hour = timeStr.substring(0, separatorIndex);
    
    var minute = timeStr.substring(separatorIndex + 1);
    
    return {"hour": hour, "minute": minute};
}

/**
 * 
 * 
 */
function getDeviceIdsform(){
	var device = []
	
	$('div.wifi-portal-device a').each(function(){
		device.push($(this).attr('deviceid'));
	});
	
	__portal_deviceIds = device;
}


/**
 * 保存策略信息
 * @returns {Boolean}
 */
function SavePortalPoilcy() {
	var policyname = $('input#PolicyTitle').val();
	var merchantid = $('input#MerchantID').val();
	getDeviceIdsform();
	
	if(policyname==''){
		alert('请填写策略标题');
		return false;
	}
	if(__portal_policyOwnerId==null&&__Account_Merchants.length>0){
		if(merchantid==''){
			alert('请选择策略商家');
			return false;
		}else{
			__portal_policyOwnerId = merchantid;
		}
	}
	
	if(__portal_deviceIds.length<=0){
		alert('请选择策略包含设备')
		return false;
	}
	
	if(__portal_policyItems==null||__portal_policyItems.length==0){
		alert('请添加策略时间计划');
		return false;
	}
	
	
	
	if (__portal_policyItems != null && __portal_policyItems.length > 0 
			&& __portal_deviceIds != null && __portal_deviceIds.length > 0) {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : contextPath+'/merchant/saveportalpolicy.htm',
			data : {
				"policyid": __portal_policyId == null? "" : __portal_policyId,
				"policyname": policyname,
				"accountid": __portal_policyOwnerId,
				"deviceids": JSON.stringify(__portal_deviceIds),
				"policyitems": JSON.stringify(__portal_policyItems)
			},
			success : function(data) {
				if(data.result=='OK'){
					$.pnotify({
						title : "策略保存成功",
						text : '',
						type : 'success'
					});
				}else{
					$.pnotify({
						title : "策略保存失败",
						text : '',
						type : 'error'
					});
				}
			},
			error : function(data) {
				$.pnotify({
					title : "保存显示策略请求提交失败！",
					text : "",
					type : 'error'
				});
	
				return false;
			}
		});
	}
}

var mouseTime = null;
function onInitPortalPolicyForm(){
    // 删除策略设备
    $(document).on('click', 'span.delete-device', function(e){
        $(this).parent().remove();
    });

	
	$(document).on('mouseenter','tbody#tb_policy_timesheet tr',function(){
        var pre = $(this).offset();
        var width = $(this).width();
        clearTimeout(mouseTime);
        if($('div#policyItemLineEditBar').length>0){
        	$('div#policyItemLineEditBar').css({top:pre.top,left:pre.left+width-70}).attr('itemKey', $(this).attr('id')).show();
        }else{
        	$('body').append('<div class="policy-edit-bar" id="policyItemLineEditBar" itemKey="'+$(this).attr('id')+'"><a href="javascript:;" Class="deletePolicyItem"><span class=" glyphicon glyphicon-remove">&nbsp;</span></a><a href="javascript:;" Class="editPolicyItem"><span class="glyphicon glyphicon-list">&nbsp;</span></a></div>');
        	$('div#policyItemLineEditBar').css({top:pre.top,left:pre.left+width-70}).show();
        }
        //__show_editbar = 1;
    });
	
	$(document).on('mouseleave','tbody#tb_policy_timesheet tr',function(){
		if(!$('div#policyItemLineEditBar').is(":hidden")&&__show_editer==0){
			mouseTime = setTimeout(function(){
				if(__show_editer==0){
					$('div#policyItemLineEditBar').hide();
					clearTimeout(mouseTime);
				}
			}, 200)
		}
    });
	
	$(document).on('mouseenter', 'div#policyItemLineEditBar', function(){
		clearTimeout(mouseTime);
		__show_editer = 1;
	});
	
	$(document).on('mouseleave', 'div#policyItemLineEditBar', function(){
		__show_editer = 0;
		$('div#policyItemLineEditBar').hide();
	});
	
    
    $("#btn_save_policy").click(function() {
    	//validate device list and policy Item list
    	SavePortalPoilcy();
    }); 
    
    $(document).off('click', 'div#policyItemLineEditBar a');
    $(document).on('click', 'div#policyItemLineEditBar a', function(){
    	var edititem = $(this).parent().attr('itemkey').replace(/.*?([0-9]).*?/ig, '$1');
    	
    	if($(this).hasClass('deletePolicyItem')){
    		if(confirm('你确定要删除时间计划吗？')){
	    		deletePolicyItem(edititem);
	    		refreshAllItems();
	    		onDragPolicyLine();
    		}
    	}else if($(this).hasClass('editPolicyItem')){
    		__policy_editItem = getPolicyItemByKey(edititem);
    		$.ajax({
    	        url:__base_path+'/merchant/getpolicysite.htm',
    	        type:'GET',
    	        dataType:'html',
    	        async:false,
    	        success:function(data){
    	        	$('#ChangePortalSiteList').html('');
    	        	$('#ChangePortalSiteList').html(data)
    	            $('#ChangePortalSiteList').modal('show');
    	        }
    	    });
    		//$('div#ChangePortalSiteList').modal('show');
    	}
    });
}


/**
 * 通过优先级ID获取策略信息
 * 
 * @param id
 * @returns
 */
function getPolicyItemByKey(id){
	var temp = null;
	if(__portal_policyItems!=null){
		for(i=0;i<__portal_policyItems.length;i++){
			if(__portal_policyItems[i].priority==id){
				temp = __portal_policyItems[i];
				break;
			}
		}
	}
	
	return temp;
}

/**
 * 增加__portal_policyItems项目
 * 
 * @param obj
 */
function addPolicyItem(obj){
	if(__portal_policyItems!=null){
		__portal_policyItems.push(obj);
	}else{
		__portal_policyItems = [obj];
	}
	
	//alert(JSON.stringify(__portal_policyItems));
	//portalPolicyDisplay();
}


/**
 * 编辑策略记录
 * 
 * @param obj
 */
function editPolicyItem(obj){
	var reset_timeItems = [];
	if(__portal_policyItems!=null){
		for(i=0;i<__portal_policyItems.length;i++){
			var tempObj = __portal_policyItems[i];
			if(tempObj.priority==obj.priority){
				obj.priority = tempObj.priority;
				reset_timeItems.push(obj);
			}else{
				reset_timeItems.push(tempObj);
			}
		}
		
		__portal_policyItems = reset_timeItems;
	}
	portalPolicyDisplay();
}


/**
 * 删除__portal_policyItems项目
 * 
 * @param priority
 */
function deletePolicyItem(priority){
	var reset_timeItems = [];
	if(__portal_policyItems!=null){
		for(i=0;i<__portal_policyItems.length;i++){
			if(__portal_policyItems[i].priority!=priority) reset_timeItems.push(__portal_policyItems[i]);
		}
	}
	
	for(i=0;i<reset_timeItems.length;i++){
		reset_timeItems[i].priority = i+1;
	}
	__portal_policyItems = reset_timeItems;
	portalPolicyDisplay();
}


function refreshPolicyItems(){
	var template_items = [];
	var myhours = [];
	$('tbody#tb_policy_timesheet tr').each(function(x){
		var keyid = $(this).attr('id').replace(/.*?([0-9]+).*?/ig,'$1');
		template_items.push(getPolicyItemByKey(keyid));
	});

	for(var ti=0;ti<template_items.length;ti++){
		var myitem = template_items[ti];
		var start  = parseFloat(myitem.starttime);
		var end    = parseFloat(myitem.endtime);
		template_items[ti].priority = ti+1;
		
		$('tbody#tb_policy_timesheet tr').eq(ti).attr('id', 'lineno_'+(ti+1)).find('td').eq(0).html(ti+1);
		for(var tm=0;tm<24;tm++){
			if(tm>=start&&tm<=end){
				if(inArray(tm,myhours)){
					$('tbody#tb_policy_timesheet tr').eq(ti).find('td').eq(tm+1).attr('class', 'disabled-bgcolor').attr('id', 'cell_'+(ti+1)+'_'+tm);
				}else{
					$('tbody#tb_policy_timesheet tr').eq(ti).find('td').eq(tm+1).attr('class', 'enabled-bgcolor').attr('id', 'cell_'+(ti+1)+'_'+tm);
					myhours.push(tm);
				}
			}else{
				$('tbody#tb_policy_timesheet tr').eq(ti).find('td').eq(tm+1).attr('class', '').attr('id', 'cell_'+(ti+1)+'_'+tm);
			}
		}
	}
	__portal_policyItems = template_items;
}


function refreshPolicyDisplayItemLine(items){
    var inHour = [];
    //
    for(var i=0;i<items.length;i++){
        var policyItemHtml = '<tr id="lineno_'+items[i].priority+'"><td class="wpp-list-number">'+items[i].priority+'</td></tr>';
        var newTrLine = $('#tb_policy_timesheet').append(policyItemHtml);
        var min_hour = parseFloat(items[i].starttime);
        var max_hour = parseFloat(items[i].endtime);
        //
        for(var t=0;t<TIMESHEET_COL_NUMBER;t++){
            if(t>=min_hour&&t<=max_hour){
                if(inArray(t,inHour)){
                    $("#lineno_" + items[i].priority).append('<td class="disabled-bgcolor"></td>');
                }else{
                    inHour.push(t);
                    $("#lineno_" + items[i].priority).append('<td class="enabled-bgcolor"></td>');
                }
            }else{
                $("#lineno_" + items[i].priority).append('<td></td>');
            }
        }
    }
}

function inArray(v,arr){
    for(var i = 0;i<arr.length;i++){
        if(arr[i]==v) return true;
    }
    return false;
}

function refreshPolicyDisplayItem(priority, startTime, endTime) {
    var inHour = [];
    var policyItemHtml = "<tr id='lineno_" + priority + "'></tr>";
    var tdHtml = '';
    $("#tb_policy_timesheet").append(policyItemHtml);
    //alert(priority);
    for (var i = 0; i < TIMESHEET_COL_NUMBER; i++) {
        var nStartTime = typeof startTime == 'number' ? startTime : parseFloat(startTime);//convertTimeStrToFloat(startTimeStr);
        var nEndTime = typeof endTime == 'number' ? endTime : parseFloat(endTime);//convertTimeStrToFloat(endTimeStr);

        var timeBaseLine = i * PRECISION;

        var bgColorCls = "";
        if ((nStartTime < timeBaseLine || nStartTime == timeBaseLine)
            && (timeBaseLine < nEndTime || timeBaseLine == nEndTime )) {
            bgColorCls = "enabled-bgcolor";

            if (nStartTime == timeBaseLine) {
                bgColorCls += " display-start-cell"
            }
            else if (timeBaseLine == nEndTime) {
                bgColorCls += " display-end-cell"
            }
        }

        tdHtml += "<td id='cell_" + priority + "_" + i + "' class='" + bgColorCls + "'></td>";

    }
    $("#lineno_" + priority).append('<td class="wpp-list-number">'+priority+'</td>'+tdHtml);
}

function suppressor() {
    var suppressedCol = [];

    for (var i = 0; i < TIMESHEET_COL_NUMBER;i++) {
        suppressedCol.push(false);
    }

    if (__portal_policyItems != null ) {
        for (var i =0; i < __portal_policyItems.length; i++){
            for(var j = 0; j < TIMESHEET_COL_NUMBER;j++) {
                if (!suppressedCol[j] && $("#cell_" + i + "_" + j).hasClass("enabled-bgcolor")) {

                    for (var k = i + 1; k < __portal_policyItems.length + 1; k++) {
                        if ($("#cell_" + k + "_" + j).hasClass("enabled-bgcolor")) {
                            $("#cell_" + k + "_" + j).removeClass("enabled-bgcolor");
                            $("#cell_" + k + "_" + j).addClass("disabled-bgcolor");
                        }
                    }

                    suppressedCol[j] = true;
                }
            }
        }
    }

}

function refreshAllItems() {
    $("#tb_policy_timesheet").children().remove();
    if (__portal_policyItems != null && __portal_policyItems.length > 0) {
        refreshPolicyDisplayItemLine(__portal_policyItems);
        for (var i = 0; i < __portal_policyItems.length; i++) {
            //refreshPolicyDisplayItem(__portal_policyItems[i].priority, __portal_policyItems[i].starttime, __portal_policyItems[i].endtime);
            $("#tb_policy_timesheet tr").eq(i).attr('data-placement','top').attr('data-toggle','tooltip').attr('data-original-title',__portal_policyItems[i].sitename+' : '+setPolicyTime(__portal_policyItems[i].starttime)+' - '+setPolicyTime(__portal_policyItems[i].endtime));
        }
        $("#tb_policy_timesheet tr").tooltip();
        suppressor();
    }
}

/**
 * 渲染策略记录效果
 * 
 */
function portalPolicyDisplay(){
	var inHours = [];
	
	// 重新整理顺序
	reSortPolicyItems();
	//alert(JSON.stringify(__portal_policyItems));
	if(__portal_policyItems!=null){
		for(var i=0;i<__portal_policyItems.length;i++){
			var thisitem = __portal_policyItems[i];
			var mino = parseFloat(thisitem.starttime);
			var maxo = parseFloat(thisitem.endtime);
			var id   = 'lineno_'+thisitem.priority;
			
			if($('#tb_policy_timesheet tr').eq(i).length>0){
				$('#tb_policy_timesheet tr').eq(i).attr('id', id);
				$('#tb_policy_timesheet tr').eq(i).find('td').eq(0).html(thisitem.priority);
				
				for(var ti=0;ti<24;ti++){
					if(ti>=mino&&ti<=maxo){
						if(inArray(ti,inHours)){
							$('#tb_policy_timesheet tr').eq(i).find('td').eq(ti+1).attr('id','cell_'+thisitem.priority+'_'+ti).attr('class', "disabled-bgcolor");
						}else{
							$('#tb_policy_timesheet tr').eq(i).find('td').eq(ti+1).attr('id','cell_'+thisitem.priority+'_'+ti).attr('class', "enabled-bgcolor");
							inHours.push(ti);
						}
					}else{
						$('#tb_policy_timesheet tr').eq(i).find('td').eq(ti+1).attr('id','cell_'+thisitem.priority+'_'+ti).attr('class', "");
					}
				}
			}else{
				$('#tb_policy_timesheet').append('<tr id="'+id+'" data-placement="top" data-toggle="tooltip" data-original-title="'+thisitem.sitename+' : '+setPolicyTime(thisitem.starttime)+' - '+setPolicyTime(thisitem.endtime)+'"></tr>');
				$('#tb_policy_timesheet tr#'+id).append('<td class="wpp-list-number">'+thisitem.priority+'</td>');
				for(var ti=0;ti<24;ti++){
					if(ti>=mino&&ti<=maxo){
						if(inArray(ti,inHours)){
							$('#tb_policy_timesheet tr#'+id).append('<td id="cell_'+thisitem.priority+'_'+ti+'" class="disabled-bgcolor">&nbsp;</td>');
						}else{
							$('#tb_policy_timesheet tr#'+id).append('<td id="cell_'+thisitem.priority+'_'+ti+'" class="enabled-bgcolor">&nbsp;</td>');
							inHours.push(ti);
						}
					}else{
						$('#tb_policy_timesheet tr#'+id).append('<td id="cell_'+thisitem.priority+'_'+ti+'">&nbsp;</td>');
					}
				}
			}
		}
	}
	
	$('#tb_policy_timesheet tr').tooltip();
	$('#tb_policy_timesheet').sortable({
		helper:resetRowWidth,
		delay:1,
		stop:function(){
			refreshPolicyItems();
		}
	});
}



function reSortPolicyItems(){
	if(__portal_policyItems!=null){
		__portal_policyItems = __portal_policyItems.sort(function(a, b) { return a.priority - b.priority;});
	}
}

function resetRowWidth(e,ui){
	ui.children().each(function(){
		$(this).width($(this).width());
	});
	return ui;
}


// 重新加载页面编辑信息
function reloadEditSitePage(){
	if(typeof __edit_sitepage.template!='undefined'){
		$('div.editor-page-main').html('');
		
		var script = __edit_sitepage.template.layout.script;
		var css    = __edit_sitepage.template.layout.css;
		for(i=0;i<script.length;i++){
			if(script[i].indexOf('jquery')>-1){
				if(typeof jQuery=='undefined') $('div.editor-page-main').append('<script type="text/javascript" src="'+__base_path+script[i]+'"></script>');
			}else{
				$('div.editor-page-main').append('<script type="text/javascript" src="'+__base_path+script[i]+'?ver='+Math.random()+'"></script>');
			}
		}
		
		for(i=0;i<css.length;i++){
			$('div.editor-page-main').append('<link type="text/css" rel="stylesheet" href="'+__base_path+css[i]+'" media="screen">');
		}
		
		$('div.editor-header div.editor-main').eq(0).html('<span>页面标题</span>'+__edit_sitepage.title);
		$('div.editor-header div.editor-main').eq(1).html('<span>模板名称</span>'+__edit_sitepage.template.name);
		if($('div.editor-header a.editSitePageid').length==0){
			$('div.editor-header').append('<a href="javascript:;" class="editSitePageid">编辑页面</a>');
			$('div.editor-header').append('<a href="javascript:;" class="viewSitePageid">预览页面</a>');
		}
		
		// loadPageTemplate() 模板JS通用方法，在template.js里
		// 将页面状态还原并打印到编辑框里
		$('div.editor-page-main').append(loadPageTemplate());
		loadDefaultJavascript();
        if(__edit_sitepage.type=='AUTH'){
            var auth_sets= '';
            var tag      = '';
            $('div#siteLoginModuleBox div.auth-type-body').each(function(k){
                auth_sets += tag+$('div#siteLoginModuleBox div.auth-type-body').eq(k).attr('id');
                tag = ',';
            });
            __auth_sets = auth_sets;
            onAuthTypeForm();
        }
	}
}

// 更新站点指定页面
function resetPortalSiteData(page){
	if(typeof __portal_sitedata.pages!='undefined'&&typeof page.pageid!='undefined'){
		var temp_data = [];
		for(i=0;i<__portal_sitedata.pages.length;i++){
			if(__portal_sitedata.pages[i].pageid==page.pageid){
				temp_data.push(page);
			}else{
				temp_data.push(__portal_sitedata.pages[i]);
			}
		}
		
		__portal_sitedata.pages = temp_data;
	}
}

function addPageListItem(m,page){
	if(m!=''){
		return '<a href="javascript:;" pageid="'+page.pageid+'" class="active"><img src="'+__base_path+(page.thumb!=''?page.thumb:'/resources/img/no-image.png')+'"><div></div></a>';
	}else{
		return '<a href="javascript:;" pageid="'+page.pageid+'"><img src="'+__base_path+(page.thumb!=''?page.thumb:'/resources/img/no-image.png')+'"><div></div></a>';
	}
}

// 更新整个站点所有页面
function reloadSiteData(){
	if(typeof __portal_sitedata.pages!='undefined'){
		var mypages = [];
		
		$('div.editor-page-list').html('');
		for(i=0;i<__portal_sitedata.pages.length;i++){
			if(__portal_sitedata.pages[i].pageid==__edit_sitepage.pageid){
				mypages.push(__edit_sitepage);
				$('div.editor-page-list').append(addPageListItem('active', __edit_sitepage));
			}else{
				mypages.push(__portal_sitedata.pages[i]);
				$('div.editor-page-list').append(addPageListItem('', __portal_sitedata.pages[i]));
			}
		}
		
		__portal_sitedata.pages = mypages;
	}
}


// 显示编辑条
function getModuleEditorBar(){
    if(typeof __edit_sitepage.template.modules!='undefined'){
        for(i=0;i<__edit_sitepage.template.modules.length;i++){
            if(__edit_sitepage.template.modules[i].type!='auth'){
                if(__edit_sitepage.template.modules[i].moduleid!='siteHeaderModuleBox'){
                    var id = __edit_sitepage.template.modules[i].moduleid;
                    $('div#'+id).append('<div class="ModuleEditBar"></div><div class="ModuleEditBar ModuleEditBarText"><span>'+$('div#'+id).attr('title')+'</span><a href="javascript:;" class="resetModule">重置</a><a href="javascript:;" class="editorModule">编辑</a></div>');
                }
            }else{
                if(__edit_sitepage.template.modules[i].moduleid=='siteLoginModuleBox'){
                    var id = __edit_sitepage.template.modules[i].moduleid;
                    $('div#'+id).append('<div class="ModuleEditBar"></div><div class="ModuleEditBar ModuleEditBarText"><span>'+$('div#'+id).attr('title')+'</span><!--<a href="javascript:;" class="resetLoginModule">重置</a>--><a href="javascript:;" class="editorLoginModule" data-toggle="modal" data-target="#pageAuthorizeDialog">编辑</a></div>');
                }
            }
        }
    }
}


var onPortalSiteEditor = function(){
	var getMerchantList = function(){
		__Account_Merchants = [];
		$.ajax({
			url:contextPath+'/account/getsubmerchant.htm',
			type:'GET',
			dataType:'JSON',
			data:{accountId:__ACCOUNT_CHECKED_COUNT},
			async:false,
			success:function(data){
				if(data.result=='OK'){
		            for(i=0;i<data.merchants.length;i++){
		                var account = data.merchants[i];
		                __Account_Merchants.push({id:data.merchants[i].id,text:data.merchants[i].merchantname});
		            }
		        }
			}
		});

		$('input#AccountID').select2({width:190,data:__Account_Merchants});
		if(__OwnerType=='MERCHANT'){
			$('input#AccountID').select2('enable', false);
			$('div.editor-page-list').css("visibility","hidden");
		}
        if(__OwnerType=='SUPER_MAN'){
            $('input#AccountID').select2('enable', false);
        }
	}
	
	var getPageTemplateAjax = function (){
		$('a#siteAddNewPageButton').click(function(){
			$.ajax({
				url:__base_path+'/merchant/addsitepage.htm',
				type:'get',
				dataType:'html',
				async:false,
				success:function(data){
					__edit_pagenew = true;
					$('div#sitePageTemplateDialog').html('');
					$('div#sitePageTemplateDialog').html(data);
					$('div#sitePageTemplateDialog').modal('show');
				}
			});
		});
	}
	
	var getTemplateById = function(id){
		var temp = null;
		$.ajax({
			url:__base_path+'/merchant/portaltemplate.htm',
			type:'get',
			dataType:'json',
			async:false,
			data:{templateid:id},
			success:function(data){
				if(data.result=='OK') temp = data;
			}
		});
		
		return temp;
	}
	
	var refreshSiteData= function(){
		var data = __portal_sitedata;
		var page = [];
		
		if(typeof data.pages!='undefined'){
			for(i=0;i<data.pages.length;i++){
				var nameid = data.pages[i].pageid+'';
				if(nameid.indexOf('NP')>-1){
					var temp = data.pages[i];
						temp.pageid = '';
					page.push(temp);
				}else{
					page.push(data.pages[i]);
				}
			}
		}
		
		data.pages = page;
		return page;
	}
	
	var getSitePageDataById = function (id){
		if(typeof __portal_sitedata.pages!='undefined'){
			for(i=0;i<__portal_sitedata.pages.length;i++){
				if(id==__portal_sitedata.pages[i].pageid) return __portal_sitedata.pages[i];
			}
		}
		return false;
	}
	
	var savePortalSite = function(){
		$('button#SavePortalSiteButton').unbind('click');
		$('button#SavePortalSiteButton').click(function(){
			var title = $("input#SiteName").val();
				title = title.replace(/\s+/,'');
			var accountid = $("input#AccountID").val();
			var siteid    = $('input#SiteID').val();
			
			if(title==''){
				alert('请填写站点名称！');
				return false;
			}
			
			if(__OwnerType!='MERCHANT'&&__OwnerType!='SUPER_MAN'){
				if(accountid==''){
					alert('请选择站点所属商家！');
					return false;
				}
			}else{
				accountid = __ACCOUNT_CHECKED_COUNT;
			}
			
			if(__OwnerType=='MERCHANT'){
				var loginpage = null;
				savesite = {siteid:siteid,sitename:title,accountId:accountid,pages:refreshSiteData()};
				$.ajax({
					url:__base_path+'/merchant/getdefaultloginpage.htm',
					type:'get', 
					dataType:'JSON',
					async:false,
					success:function(data){
						loginpage = data.page;
					}				
				});
				savesite.pages.push(loginpage);
			}else{
				savesite = {siteid:siteid,sitename:title,accountId:accountid,pages:refreshSiteData()};
			}
			$('html').mask('站点正在保存...');
			$.ajax({
				url:__base_path+'/merchant/sitedetails.htm',
				type:'POST',
				dataType:'JSON',
				async:false,
				data:{refreshthumb:true,sitedata:JSON.stringify(savesite)},
				success:function(data){
					if(typeof data.siteid!='undefined'){
		                $('input#SiteID').val(data.siteid);
		                __SITE_NAME='';
		                $.pnotify({
		                    title : "站点保存成功！",
		                    text : '',
		                    type : 'success'
		                });
		                $('html').unmask();
		                $('html').mask('正在加载站点信息');
		                $.get(__base_path+'/merchant/editsite.htm?siteid='+data.siteid, function(data){
		    				$('div#id_main_content').html(data);
		    				$('html').unmask();
		    				return false;
		    			});
		            }else{
		            	$.pnotify({
			                title : data.message,
			                text : '',
			                type : 'error'
			            });
		            }
				}
			});
		});
	}
	
	var savePortalSiteAs = function(){
		$('button#SavePortalSiteButtonAS').unbind('click');
		$('button#SavePortalSiteButtonAS').click(function(){
			$('input#SiteID').val('');
			$('input#SiteName').val($('input#SiteName').val()+'的拷贝');
			$('button#SavePortalSiteButton').click();
		});
	}
	
	var onClickEditPage = function(){
		$(document).off('click', 'div.editor-header a.editSitePageid');
		$(document).on('click', 'div.editor-header a.editSitePageid', function(){
			if(typeof __edit_sitepage.pageid!='undefined'){
				var id = __edit_sitepage.pageid;
				$.ajax({
					url:__base_path+'/merchant/addsitepage.htm',
					type:'get',
					dataType:'html',
					async:false,
					success:function(data){
						__edit_tempage = getSitePageDataById(id);
						$('div#sitePageTemplateDialog').html('');
						$('div#sitePageTemplateDialog').html(data);
						$('div#sitePageTemplateDialog').modal('show');
					}
				});
			}else{
				alert('当前没有可编辑的页面');
			}
		});
	}
	
	var onClickBrowserPage = function(){
		$(document).off('click', 'div.editor-header a.viewSitePageid');
		$(document).on('click', 'div.editor-header a.viewSitePageid', function(){
			
			if(typeof __edit_sitepage.pageid!='undefined'&&(__edit_sitepage.pageid+'').indexOf('NP')>-1){
				alert('当前为临时页面，无法预览');
			}else{
				//alert(portalSvrHostName+'/site/page/?page_id='+__edit_sitepage.pageid);
				window.open(portalSvrHostName+'/site/page/?page_id='+__edit_sitepage.pageid);
			}
		});
	}
	
	var onChangeEditPage = function(){
		$(document).off('click', 'div.editor-page-list a');
		$(document).on('click', 'div.editor-page-list a', function(){
			var id = $(this).attr('pageid');
			__edit_sitepage = getSitePageDataById(id);
			reloadSiteData();
			reloadEditSitePage();
			getModuleEditorBar();
		});
	}
	
	return {init:function(){
		getMerchantList();
		getPageTemplateAjax();
		onClickEditPage();
		onChangeEditPage();
		savePortalSite();
		onClickBrowserPage();
		savePortalSiteAs();
	}}
}();


// 进入编辑站点时排还原所有页面
function getSiteAllData(id){
	$.ajax({
		url:__base_path+'/merchant/sitedetails.htm',
		type:'GET',
		dataType:'JSON',
		async:false,
		data:{siteid:id},
		success:function(data){
			if(data.result=='OK'){
				var activepage  = {};
				var sitedata = data.sitedetails;
				__protal_sitedata = {};
				__portal_sitedata.pages = sitedata.pages;
				$('input#SiteName').val(sitedata.sitename);
				$('input#SiteID').val(sitedata.siteid);
				$('input#AccountID').select2('val', sitedata.owner);
		        $('#AccountID').select2('enable', false);
				
		        if(sitedata.pages!=null&&sitedata.pages.length>0){
		        	__edit_sitepage = __portal_sitedata.pages[0];
		        	reloadSiteData();
		        	reloadEditSitePage();
					getModuleEditorBar();
		        }
		        
			}
		}
	});
}

// 添加、编辑页面弹窗
var onEditPageDialog = function(){
	var getPageTemplateList = function (){
		$.ajax({
			url:__base_path+'/merchant/portaltemplate.htm',
			type:'get',
			dataType:'json',
			async:false,
			success:function(data){
				if(data.result=='OK'){
				    var tmp_list = [];
				    for(i=0;i<data.templates.length;i++){
				    	if(typeof __edit_tempage.type!='undefined'&&data.templates[i].type==__edit_tempage.type){
				    		//tmp_list.push({id:data.templates[i].id,text:data.templates[i].name});
				    		tmp_list.push({id:data.templates[i].id,text:data.templates[i].name,imgsrc:data.templates[i].thumbnailPath});
				    	}
				    }
				    var portalimghtml = generatePortalImgListHtml(tmp_list);
				    $("#div_portalimg_list").html(portalimghtml);
				    //$('input#templateid').select2({data:tmp_list,width:180,minimumResultsForSearch: -1});
				    if(typeof __edit_tempage.templateid!='undefined'&&!__edit_pagenew){
				    	//$('input#templateid').select2('val', __edit_tempage.templateid);
				    	$("*").removeClass("shadow");
						$("#div_"+__edit_tempage.templateid).addClass("shadow");
				    }
				}
			}
		});
	}
	
	var getTemplatePageType = function(){
		var pagetype_list = [];
		pagetype_list =[{id:PORTAL_PAGE_TYPE_AUTH,text:'验证页'},{id:PORTAL_PAGE_TYPE_LOGIN,text:'登录页'}];
		if(__OwnerType=='MERCHANT'){
			pagetype_list.pop();
		}		
		$('input#pagetype').select2({
			//data:[/*{id:PORTAL_PAGE_TYPE_INSITE,text:'内容页'},*/{id:PORTAL_PAGE_TYPE_AUTH,text:'验证页'},{id:PORTAL_PAGE_TYPE_LOGIN,text:'登录页'}],
			data:pagetype_list,
			width:180,
			minimumResultsForSearch: -1});	
		// 更新模板列表
		$('input#pagetype').on('change', function(){
			var value = $('input#pagetype').val();
			$.ajax({
				url:__base_path+'/merchant/portaltemplate.htm',
				type:'get',
				dataType:'json',
				async:false,
				success:function(data){
					if(data.result=='OK'){						
					    var tmp_list = [];
					    for(i=0;i<data.templates.length;i++){
					    	if(data.templates[i].type==value) tmp_list.push({id:data.templates[i].id,text:data.templates[i].name,imgsrc:data.templates[i].thumbnailPath});
					    }
					    //----------------加载图片
					    var portalimghtml = generatePortalImgListHtml(tmp_list);
					    $("#div_portalimg_list").html(portalimghtml);
					    //$('input#templateid').select2({data:tmp_list,width:180,minimumResultsForSearch: -1});
					    if(typeof __edit_tempage.templateid!='undefined'&&!__edit_pagenew){
					    	//$('input#templateid').select2('val', __edit_tempage.templateid);
					    	$("*").removeClass("shadow");
							$("#div_"+__edit_tempage.templateid).addClass("shadow");
					    }
					}
				}
			});
		});
		if(typeof __edit_tempage.type!='undefined'&&!__edit_pagenew){
			$('input#pagetype').select2('val', __edit_tempage.type);
		}
	}
	
	var getEditPageTemplateTitle = function(){
		if(typeof __edit_tempage.title!='undefined'&&!__edit_pagenew){
			$('input#pagetitle').val(__edit_tempage.title);
		}
	}
	
	var getTemplateById = function(id){
		var temp = null;
		$.ajax({
			url:__base_path+'/merchant/portaltemplate.htm',
			type:'get',
			dataType:'json',
			async:false,
			data:{templateid:id},
			success:function(data){
				if(data.result=='OK') temp = data;
			}
		});
		
		return temp;
	}
	
	var getSitePageDataById = function (id){
		if(typeof __portal_sitedata.pages!='undefined'){
			for(i=0;i<__portal_sitedata.pages.length;i++){
				if(id==__portal_sitedata.pages[i].pageid) return __portal_sitedata.pages[i];
			}
		}
		return false;
	}
	
	var onAddNewPage = function(obj){
		if(typeof __portal_sitedata.pages!='undefined'){
			__portal_sitedata.pages.push(obj);
		}else{
			__portal_sitedata.pages = [obj];
		}
	}
	
	
	var refreshNewPageVar = function(){
		$('div#sitePageTemplateDialog').on('hide.bs.modal', function(){
			__edit_pagenew = false;
		});
	}
	
	var onSetPageTemplate = function(){
		$('button#SetPageTemplateButton').click(function(){
			var title = $('input#pagetitle').val().replace(/\s+/ig,'');
			var type  = $('input#pagetype').val();
			var id    = '';
			var temp  = null;
			if($('div.shadow').length>0){
				id = $(".shadow").first().attr('id').replace("div_", "");
			}else{
				alert('请选择页面模板')
				return false;
			}			
			if(title==''){
				alert('请填写页面标题');
				return false;
			}
			
			if(type==''){
				alert('请选择页面类型');
				return false;
			}
			
			if(id==''){
				alert('请选择页面模板')
				return false;
			}else{
				temp   = getTemplateById(id);
				if(temp==null){
					alert('模板已经过期，请选择有效的模板');
					return false;
				}
			}
			
			if(type=='LOGIN'||type=='AUTH'){
				if(!isInType(type)){
					alert('此类页面已经存在，请重新选择页面类型');
					return false;
				}
			}
			
			if(__edit_pagenew){
				var pageid = 'NP'+Math.random()*1000000;
				var newpageobj = {
						pageid:pageid,
						title:title,
						name:title,
						type:type,
						templateid:id,
						template:eval('('+temp.templateframe+')'),
						data:eval('('+temp.defaultdata+')'),
						thumb:temp.thumb};
				onAddNewPage(newpageobj);
				__edit_sitepage = newpageobj;
				__edit_pageid   = pageid;
				__edit_pagenew  = false;
				__edit_tempage  = {};
				
				
				reloadSiteData();
			}else{
				//__edit_tempage = __edit_sitepage;
				__edit_tempage.title = title;
				__edit_tempage.name  = title;
				if(__edit_tempage.templateid!=id){
					__edit_tempage.type = type;
					__edit_tempage.templateid = id;
					__edit_tempage.template = eval('('+temp.templateframe+')');
					__edit_tempage.data = eval('('+temp.defaultdata+')');
				}
				__edit_sitepage = __edit_tempage;
				__edit_tempage = {};
				reloadSiteData();
			}
			
			$('div.editor-header div.editor-main').eq(0).html('<span>页面标题</span>'+title);
			$('div.editor-header div.editor-main').eq(1).html('<span>模板名称</span>'+__edit_sitepage.template.name);
			if($('div.editor-header a.delSitePageid').length==0){
				//$('div.editor-header').append('<a href="javascript:;" class="delSitePageid">删除页面</a>');
			}
			
			reloadEditSitePage();
			getModuleEditorBar();
			$('div#sitePageTemplateDialog').modal('hide');
		});
	}
	
	return {init:function(){
		getTemplatePageType();
		getPageTemplateList();
		onSetPageTemplate();
		refreshNewPageVar();
		getEditPageTemplateTitle();
	}}
}();

function isInType(type){
	var check = false;
	var pageid = '';

	if(typeof __portal_sitedata.pages!='undefined'&&typeof __edit_tempage.pageid!='undefined'){
		
		for(i=0;i<__portal_sitedata.pages.length;i++){
			if(__portal_sitedata.pages[i].type==type){
				check = true;
				pageid = __portal_sitedata.pages[i].pageid;
				break;
			}
		}
		
		if(check){
			if(__edit_tempage.pageid!=pageid){
				check = false;
			}
		}else{
			check = true;
		}
	}else if(typeof __edit_tempage.pageid=='undefined'&&__edit_pagenew){
		if(typeof __portal_sitedata.pages=='undefined'){
			check = true;
		}else{
			check = true;
			for(i=0;i<__portal_sitedata.pages.length;i++){
				if(__portal_sitedata.pages[i].type==type){
					check = false;
					break;
				}
			}
		}
	}
	
	return check;
}

function generatePortalImgListHtml(resource_lst) {
	var DEFAULT_NUMBER_OF_RESOURCES = 3;
	var DEFAULT_RES_NAME_LENGTH = 15;
	var optResourceHtml = "";
	
	for(var i = 0; i < resource_lst.length;i++) {
		if (i % DEFAULT_NUMBER_OF_RESOURCES == 0) {
			optResourceHtml += "<div class='row'>"
		}

		var resourceName = resource_lst[i].text;
		if (isNotEmptyString(resourceName) && resourceName.length > DEFAULT_RES_NAME_LENGTH) {
			//resourceName = resourceName.substr(1, DEFAULT_RES_NAME_LENGTH) + " ...";
		}
		
		optResourceHtml += 	"<div class='all-resources col-sm-6 col-md-4'>";
		optResourceHtml += 		"<div id='div_" + resource_lst[i].id + "' onclick='javascript:selectedResource(this);' class='thumbnail'>";
		//optResourceHtml += 			"<a href='javascript:RemoveResource(" + resource_lst[i].id + ");' class='remove-resource' style='cursor:pointer;'><span style='float:right'><i class='glyphicon glyphicon-remove-sign'></i></span></a>";
		//optResourceHtml += 			"<input id='resource_path_" + resource_lst[i].id + "' value='" + resource_lst[i].imgsrc + "' type='hidden' />";
		//optResourceHtml += 			"<input id='ref_times_" + resource_lst[i].id + "' type='hidden'/>";
		optResourceHtml += 			"<table width='100%'><tr><td width='60px' height='80px' align='center' valign='middle'>";
		optResourceHtml += 				"<img id='img_" + resource_lst[i].id + "' src='" + contextPath + resource_lst[i].imgsrc + "' class='portalimg' data-src='holder.js/300x200' alt='...'>";
		optResourceHtml += 			"</table></tr></td>";
		optResourceHtml += 			"<div class='caption'>";
		optResourceHtml += 				"<label>";
		optResourceHtml += 					"<input id='chk_" + resource_lst[i].id + "' class='resource-selector' type='checkbox' style='display:none;' />";
		optResourceHtml += 				"</label>";
		optResourceHtml += 				"<span id='name_" + resource_lst[i].id + "'>" + resourceName + "</span>";
		
		optResourceHtml += 			"</div>";
		optResourceHtml += 		"</div>";
		optResourceHtml += 	"</div>";
		
		if ((i+1) % DEFAULT_NUMBER_OF_RESOURCES == 0) {
			optResourceHtml += "</div>"
		}
	}
	
	return optResourceHtml;
}



