/**
 * Created by hx on 2014/8/9.
 */



/**
 *
 *
 * GLOBAL VAR */


/**
 * main app
 *
 *
 **/
var chinanetApp = function(){
    var onMainMenu = function(){
        $('div.Header-Body-Menu a.menuAjax').unbind('click').click(function(e){
        	DEVICE_LIST_REFRESH_TIMER.stopTimer();
            var kMenu = $(this).prevAll().length;
            var mMenu = $(this);
            var action= $(this).attr('href');
                e.preventDefault();
            $('div.Header-Body-Menu a').each(function(x){
                var oMenu = $('div.Header-Body-Menu a').eq(x);
                if(kMenu==x){
                    if(!mMenu.hasClass('Active')&&!mMenu.hasClass('Focus')){
                        if(mMenu.hasClass('Has-Child')){
                            mMenu.addClass('Focus');
                        }else {
                            mMenu.addClass('Active');
                        }
                    }

                    $.ajax({
                        url:action,
                        type:'GET',
                        dataType:'HTML',
                        async:false,
                        success:function(data){
                        	try{
                        		var jsondata = JSON.parse(data);
                        		if(jsondata.result == 'OK' || jsondata.result == 'FAIL'){
                            		onAlertError(jsondata.message);
                            	}
                        	}catch(e){
                        		$('div.ChinaNet-Free-Body').html(data);
                        	}
                        }
                    });
                }else{
                    if(oMenu.hasClass('Active')){
                        oMenu.removeClass('Active');
                    }
                    if(oMenu.hasClass('Focus')){
                        oMenu.removeClass('Focus');
                    }
                }
            })
        })
    }

    var initCheckbox = function(){
        $('div.Form-Item-Checkbox').live('click', function(){
        	if(!$(this).hasClass('noread')){
		       if($(this).hasClass('Form-Checked')){
		           $(this).removeClass('Form-Checked').find('input').attr('checked', false);
		       }else{
		           $(this).addClass('Form-Checked').find('input').attr('checked', true);
		       }
        	}
        });
    }

    var onAccountDropdown = function(){
        if($('div.Header-Body-Account a').length>0) {
            $('div.Header-Body-Account a').xiMenu({menuElement:'ChinaNetAccountDropdown',align:'right',activeClass:'Open'});
        }
    }
    
    
    return {init:function(){
        initActionAjax();
        onMainMenu();
        onAccountDropdown();
        initCheckbox();
    }}
}();



/**
 * 加载首页信息
 *
 */
function loadHomePage(){
    if(__LOAD_HOME_PAGE==0){
        $.ajax({
            url:'/account/account_overview.htm',
            type:'GET',
            dataType:'HTML',
            async:false,
            success:function(data){
                if(data.result=='FAIL'){
                    onAlertError(data.message+'<br /> 请稍后刷新页面');
                }else{
                    $('div.ChinaNet-Free-Body').html(data);
                    __LOAD_HOME_PATH = 1;
                }
            }
        })
    }
}

/**
 * 设备厂商/管理员加载
 */
function loadDevicePage(){
	
    if(__LOAD_HOME_PAGE==0){
        $.ajax({
            url:'/system/searchdevicepage.htm',
            type:'GET',
            dataType:'HTML',
            async:false,
            success:function(data){
            	//var dataJson = $.parseJSON(data);
            	//console.log(data);
            	try{
            		//console.log('json');
            		var jsondata = JSON.parse(data);
            		if(jsondata.result == 'OK' || jsondata.result == 'FAIL'){
                		onAlertError(jsondata.message);
                	}
            	}catch(e){
            		//console.log('html');
            		$('div.ChinaNet-Free-Body').html(data);
            		__LOAD_HOME_PATH = 1;
            	}
            }
        })
    }
}

/**
 *
 *
 *
 *
 */
function getTemplateType(str){
    switch(str){
        case "AUTH":
            return "验证页";
            break;
        case "LOGIN":
            return "登录页";
            break;
        case "CONTENT":
            return "内容页";
            break;
        default:
            return "";
    }
}

//修正IE8及以下AJAX载入样式表无法生效
function fixIELoadCSS($obj){
	if($.browser.msie && !isNaN($.browser.version)){
		if(parseInt($.browser.version) < 9){
			var timestamp = (new Date()).valueOf();
			$obj.find('link').each(function(){
				var url = this.href;
				if(/\?/.test(url)){
					if(/&_t=\d+$/.test(href)){
						this.href = url.replace(/&_t=\d+$/, '&_t='+timestamp);
					}else{
						this.href = url+'&_t='+timestamp;
					}
				}else{
					this.href = url+'?_t='+timestamp;
				}
			});
		}
	}
}


/**
 *  PUBLIC FUNCTIONS
 *
 *
 *
 */

function initActionAjax(){
    $('a.initAjax').die().live('click',function(e){
        var loadForElement = $(this).attr('data-element');
        var action         = $(this).attr('href');
        var type           = $(this).attr('data-request');
        var clickId		   = $(this).attr('id');	
            type           = (typeof type=='undefined')?'HTML':'JSON';
            __DATA_PUBLIC_KEY  = $(this).attr('data-public-params');
            e.preventDefault();
            if(type=='HTML') {
                $.ajax({
                    url: action,
                    type: 'GET',
                    dataType: 'HTML',
                    data: {},
                    async: false,
                    success: function (data) {
                        if (data.result == 'FAIL') {
                            onAlertError(data.message);
                        } else {
                            //alert(data);
                            if (typeof loadForElement != 'undefined') {
                            	$("[data-element='"+loadForElement+"']").removeClass('Active');                            	
                                $('div#' + loadForElement).html(data);
                            } else {
                                $('div.ChinaNet-Free-Body').html(data);
                            	fixIELoadCSS($('div.ChinaNet-Free-Body'));
                            }
                            if (typeof clickId != 'undefined'){
                        		$('#' + clickId).addClass('Active');
                        	}
                        }
                    }
                });
            }else if(type=='JSON'){
                $.ajax({
                    url: action,
                    type: 'GET',
                    dataType: 'JSON',
                    data: {},
                    async: false,
                    success: function (data) {
                        if (data.result == 'FAIL') {
                            onAlertError(data.message);
                        } else {
                            if (typeof loadForElement != 'undefined') {
                                $('div#' + loadForElement).html(data);
                            } else {
                                $('div.ChinaNet-Free-Body').html(data);
                            }
                        }
                    }
                });
            }
    });
}

/**
 * 弹窗
 * @param id
 * @param title
 * @param content
 * @param params
 */
function onOpenDialog(id,title,content,params){
    var obj = {
            id:id,
            title:title,
            content:content,
            okValue:'确定',
            ok:function(){},
            cancelValue:'取消',
            cancel:function(){},
            width:720,
            height:420,
            skin:'ChinaNet-Dialog'
        }

        if(typeof params=='object') obj = jQuery.extend({},obj,params);
        dialog(obj).showModal();
}

/**
 * 上传|选择图片
 * @param selector
 * @param auth
 * @param width
 * @param height
 * @param params
 */
function onChangePicture(selector,auth,width,height,params){
    var d = {
        id:'ChangePictrue:Dialog',
        title:'选择图片',
        content:'',
        okValue:'确定',
        ok:function(){
            var path = '';
            $('div.Picture-Body-Modal').each(function(){
                if(!$(this).is(":hidden")){
                    var icon = $(this).find('.Img-Changed-Icon');
                    icon.each(function(x){
                        if(!icon.eq(x).is(':hidden')){
                            var parent = icon.eq(x).parent().find('img');
                            if(typeof parent.attr('data-src')!='undefined'){
                                path = parent.attr('data-src');
                            }else{
                                path = parent.attr('src');
                            }
                        }
                    });
                }
            });

            if(path==''){
                onAlertError('请选择一张图片或者上传图片');
                return false;
            }else{
                $($('input#TargetSelector').val()).attr('src', path);
                return true;
            }
        },
        cancelValue:'取消',
        cancel:function(){},
        width:720,
        height:420,
        skin:'ChinaNet-Dialog'
    }

    auth = auth?true:false;
    var text = '';
    if(width&&height){
        text = '当前图片上传仅限于PNG、JPG、GIF文件，图片大小 <font color="red">'+width+' x '+height+'</font>'
    }else{
        text = '当前图片上传仅限于PNG、JPG、GIF文件，图片大小 <font color="red">4M</font> 以内'
    }

    if(typeof params=='obj') obj = jQuery.extend({}, d, params);

    var content = '<div class="ChinaNet-Picture-Body">' +
        '   <div class="Picture-Body-Navigator">' +
        '       <a href="javascript:;" class="Active" data-code="ImageResources">图片资源库</a>' +
        (auth?'<a href="javascript:;" data-code="UrlByLink">外链图片</a>':'')+
        '       <a href="javascript:;" data-code="UploadImage">上传图片</a>' +
        '   </div>' +
        '   <div class="Picture-Body-Modal Picture-Body-Sheet">' +
        '       <div class="Picture-Body-Setting"></div>' +
        '       <div class="Picture-Body-Pager"></div>' +
        '   </div>' +
        (auth?'<div class="Picture-Body-Modal" style="display:none;"><div class="Picture-Body-Setting"></div></div>':'')+
        '   <div class="Picture-Body-Modal" style="display:none;">' +
        '       <div class="Picture-Body-Setting">' +
        '           <div class="Picture-Upload-Body">' +
        '               <div class="Upload-File-Body">' +
        '                   <div class="Upload-Button"><input type="file" id="uploadfile" name="file"></div>' +
        '                   <div class="Upload-File-Limit-Text">'+text+'</div>' +
        '                   <div class="ChinaNet-Form-Sheet">' +
        '                       <button type="button" class="Form-Primary"><span>选择上传文件</span></button>' +
        '                   </div>' +
        '               </div>' +
        '               <div class="Upload-File-Status-Body">' +
        '                   <div class="Upload-Report-Status">' +
        '                       <span class="Top-Left"></span>' +
        '                       <span class="Top-Right"></span>' +
        '                       <span class="Bottom-Left"></span>' +
        '                       <span class="Bottom-Right"></span>' +
        '                       <div>10%</div>' +
        '                   </div>' +
        '                   <div class="Upload-Report-Error">' +
        '                       <span class="Top-Left"></span>' +
        '                       <span class="Top-Right"></span>' +
        '                       <span class="Bottom-Left"></span>' +
        '                       <span class="Bottom-Right"></span>' +
        '                   </div>' +
        '                   <div class="Upload-File-Preview">' +
        '                       <span class="Top-Left"></span>' +
        '                       <span class="Top-Right"></span>' +
        '                       <span class="Bottom-Left"></span>' +
        '                       <span class="Bottom-Right"></span>' +
        '                       <div class="Img-Changed-Icon"></div>' +
        '                       <div class="Upload-File-Show"><img src="/statics/img/no-image.png"></div>' +
        '                   </div>' +
        '               </div>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '   <input type="hidden" id="TargetSelector" name="TargetSelector" value="'+selector+'">' +
        '   <input type="hidden" id="DefaultValue" name="DefaultValue" value="">' +
        '   <input type="hidden" id="LimitWidth" name="LimitWidth" value="">' +
        '   <input type="hidden" id="LimitHeight" name="LimitHeight" value="">' +
        '</div>';
    d.content = content;
    d.onshow = function(){
        var pic = onRenderResourceHtml(1);
        $('div.Picture-Body-Setting').eq(0).html('<ul>'+pic+'</ul>');
        refreshImage('.Picture-Body-Setting');
        onChangeImage();
        onChangeDataCode();
        onSetResourcePage(1);
        onChangePage();
        $('input#uploadfile').fileupload({
            url:'/resource/upload.htm',
            type:'POST',
            dataType:'JSON',
            autoUpload:true,
            formData:{width:(width?width:0),height:(height?height:0)},
            submit: function (e, data) {
        	var isValidFile = true;
	    	$.each(data.files, function (index, file) {
				var filePath =file.name;
				var fileType;
				if(filePath != '' && filePath != null && filePath != "undefined"){
					 fileType =filePath.substring(filePath.lastIndexOf("."),filePath.length).toLowerCase();
				}			
				if(fileType!= '.jpeg' && fileType != '.png' && fileType != '.jpg' && fileType != '.gif'){						
					isValidFile = false;
				}
				});
	    	
		    	if (isValidFile) {
			    	//onPreUploadCallBack();
			        $(this).fileupload('send', data);
		    	}else{
		    		$('div.Upload-Report-Status').hide();
	                $('div.Upload-Report-Error').html('<span class="Top-Left"></span><span class="Top-Right"></span><span class="Bottom-Left"></span><span class="Bottom-Right"></span>当前图片上传仅限于PNG、JPG、GIF文件').show();
	                var uptime = window.setTimeout(function(){
	                    $('div.Upload-Report-Error').fadeOut(100);
	                    clearTimeout(uptime);
	                },2000);
		    	}
	        	return false;
	    	},
            progressall:function(e, data){
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('div.Upload-Report-Status').show().find('div').css({width:progress+'%'}).html(progress+'%');
            },
            done:function(e, data){
                var result = data.result;
                if(result.result=='OK'){
                    var uptime = window.setTimeout(function(){
                        $('div.Upload-File-Preview img').attr('src', result.imgpath);
                        $('div.Upload-Report-Status').fadeOut(100);
                        $('div.Upload-File-Preview').fadeIn(100);
                        clearTimeout(uptime);
                    }, 1000);
                }else{
                    $('div.Upload-Report-Status').hide();
                    $('div.Upload-Report-Error').html('<span class="Top-Left"></span><span class="Top-Right"></span><span class="Bottom-Left"></span><span class="Bottom-Right"></span>'+result.message).show();
                    var uptime = window.setTimeout(function(){
                        $('div.Upload-Report-Error').fadeOut(100);
                        clearTimeout(uptime);
                    },2000);
                }
            }
        });
    }
    dialog(d).showModal();
}

/**
 * 获取资源列表
 * @param page
 * @returns {*}
 */
function getImageResource(page){
    var ResData = null;
    $.ajax({
        url:'/resource/resourcelist.htm',
        type:'GET',
        dataType:'JSON',
        data:{operation:'getdata',pageNo:page},
        async:false,
        success:function(data){
            if(data.result=='OK'){
                ResData = data.records;
            }
        }
    });

    return ResData;
}

/**
 * 整理图片资源显示在弹窗
 * @param page
 * @returns {string}
 */
function onRenderResourceHtml(page){
    var image = getImageResource(page);
    var html  = '';
        if(image.length>0){
            for(var i=0;i<image.length;i++){
                html += '<li>' +
                    '   <div class="Picture-Sheet">' +
                    '       <div class="Picture-Size">' +
                    '           <img src="'+image[i].resourcePath+'">' +
                    '           <span class="Img-Changed-Icon"></span>' +
                    '       </div>' +
                    '   </div>' +
                    '</li>';
            }
        }

    return html;
}

/**
 *
 * @param page
 */
function onSetResourcePage(page){
    page = parseInt(page);
    $('<div class="ChinaNet-Page-Table">' +
        '<a href="javascript:;" data-page="1">' +
        '<span class="Overly-Left"></span>' +
        '<span class="Overly-Right"></span> <</a>' +
        '<a href="javascript:;" class="Active">' +
        '<span class="Overly-Left"></span>' +
        '<span class="Overly-Right"></span>'+page+'</a>' +
        '<a href="javascript:;" data-page="3">' +
        '<span class="Overly-Left"></span>' +
        '<span class="Overly-Right"></span>></a> </div>').appendTo($('div.Picture-Body-Pager'));

    var data = getImageResource(page+1);
        if(data!=null&&data.length>0){
            $('div.Picture-Body-Pager a').eq(2).attr('data-page', page+1);
        }else{
            $('div.Picture-Body-Pager a').eq(2).attr('data-page', 1);
        }
}


/**
 *
 */
function onChangeImage(){
    $('div.Picture-Sheet').click(function(){
       $('div.Picture-Sheet').removeClass('Img-Changed');
       $(this).addClass('Img-Changed');
    });
}

/**
 * 选择图片资源并赋值
 */
function onChangeDataCode(){
    $('div.Picture-Body-Navigator a').click(function(){
        var mode = $(this).attr('data-code');
        var index= $(this).prevAll().length;
        $('div.Picture-Body-Modal').hide();
        $('div.Picture-Body-Modal').eq(index).show();
        $(this).addClass('Active').siblings().removeClass('Active');

        if(mode=='ImageResources'){
            var pic = onRenderResourceHtml(1);
            $('div.Picture-Body-Setting').eq(0).html('<ul>'+pic+'</ul>');
            refreshImage('.Picture-Body-Setting');
            onChangeImage();
            onSetResourcePage(1);
            $('div.Upload-File-Preview').hide();
        }else if(mode=='UploadImage'){

        }else{

        }
    });
}

/**
 * 图片资源弹窗分页
 */
function onChangePage(){
    $('div.Picture-Body-Pager a').die().click(function(){
        var page = parseInt($(this).attr('data-page'));
        var pic  = onRenderResourceHtml(page);
        var next = getImageResource(page+1);
            $('div.Picture-Body-Setting').eq(0).html('<ul>'+pic+'</ul>');
            refreshImage('.Picture-Body-Setting');
            onChangeImage();

            $('div.Picture-Body-Pager a').eq(1).html('<span class="Overly-Left"></span><span class="Overly-Right"></span>'+page)

            if(page>1) $('div.Picture-Body-Pager a').eq(0).attr('data-page', page-1);
            if(next!=null&&next.length>0){
                $('div.Picture-Body-Pager a').eq(2).attr('data-page', page+1);
            }else{
                $('div.Picture-Body-Pager a').eq(2).attr('data-page', page);
            }
        return false;
    });
}

/**
 * 检验内容长度是否超过50
 *
 * @param str
 */
function onCheckLength(str){
    if(str.length > 50){
    	return false;
    }
    else{
    	return true;
    }
   
}

/**
 * 检验长度是否超过指定大小
 * 
 * @param str
 * @param maxLength
 * */
function onCheckMaxLength(str, maxLength) {
	var strlen = getByteLen(str);
	if(strlen > maxLength) {
		return false;
	} else {
		return true;
	}
}
function getByteLen(val) {
	var len = 0;
	for (var i = 0; i < val.length; i++) {
	if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
	len += 2;
	else
	len += 1;
	}
	return len;
	}

/**
 * 检验内容是否为空
 *
 * @param str
 */
function onCheckEmpty(str){
    var reg = /\s+/ig;
    return (reg.test(str)?false:(str==''?false:true));
}

/**
 * 检验是否为十六进制数
 * 
 * @param str
 * */
function onCheckHexadecimal(str) {
	var hex = /^([0-9|a-f|A-F]*)$/;
	if(!hex.test(str)) {
		return false;
	} else {
		return true;
	}
}

function isNotEmptyString(str) {
	if (str != null && str != undefined && str != "") {
		return true;
	}
	
	return false;
}
/**
 * 错误提示框
 *
 * @param str
 * @param type
 */
function onAlertError(str, type){
    var s = type?'ChinaNet-Alert':'ChinaNet-Error';
    var d = dialog({
            title:'  ',
            content:str,
            quickClose:false,
            skin: s
        });

    d.showModal();
}

/**
 * 错误提示贴标
 *
 * @param str
 * @param obj
 */
function onAlertErrorTip(str,obj){
    var d = dialog({
            id:'LoginDialog',
            quickClose: true,
            skin:'ChinaNet-Error-Tip',
            align:'top',
            content:'<span class="Tip-Icon"></span>'+str
        });

        d.show(obj);
}


/**
 * 流量设置
 *
 * @param val
 */
function trafficFormatter(val) {
	if (val > 1024*1024*1024)
	  return Math.round(val / (1024*1024*1024)) + " GB";
	else if (val > 1024*1024)
      return Math.round(val / (1024*1024)) + " MB";
    else if (val > 1024)
      return Math.round(val / 1024) + " KB";
    else
      return val + " B";
}

/**
 * 认证类型
 *
 * @param
 */
var PORTAL_AUTH_TYPE = new function () {
	this.ALL_TYPES = [{"cn_name": "短信", "en_name":"MOBILE"},
	                  {"cn_name": "微信", "en_name":"WECHAT"},
	                  {"cn_name": "邮件", "en_name":"EMAIL"},
	                  {"cn_name": "用户名密码", "en_name":"USERPWD"},
	                  {"cn_name": "可选", "en_name":"OPTION"},
	                  {"cn_name": "第三方", "en_name":"EXTEND"},
	                  {"cn_name": "手机APP", "en_name":"APPMOBILE"}
	                  ];
	
	this.getAuthTypeByCnName = function(cnName) {
		var auth_type = null;
		
		if (isNotEmptyString(cnName)) {
			for (var i =0; i< this.ALL_TYPES.length;i++) {
				if (cnName == this.ALL_TYPES[i].cn_name) {
					auth_type = this.ALL_TYPES[i];
				}
			}
		}
	
		return auth_type;
	};
	this.getEnNameByCnName = function(cnName) {
		var auth_type = this.getAuthTypeByCnName(cnName);
		if(auth_type != null) return auth_type.en_name;
		return '--';
	}
	
	this.getAuthTypeByEnName = function(enName) {
		var auth_type = null;
		
		if (isNotEmptyString(enName)) {
			for (var i =0; i< this.ALL_TYPES.length;i++) {
				if (enName == this.ALL_TYPES[i].en_name) {
					auth_type = this.ALL_TYPES[i];
				}
			}
		}
	
		return auth_type;
	};
	this.getCnNameByEnName = function(enName) {
		var auth_type = this.getAuthTypeByEnName(enName);
		if(auth_type != null) return auth_type.cn_name;
		return '--';
	}
}


/**
 * 确认弹窗信息
 * @param text
 * @param ok
 * @param cancel
 */
function onConfirmDialog(text,ok,cancel){
    var s = 'ChinaNet-Alert';
    var d = dialog({
        title:'  ',
        content:text,
        quickClose:false,
        skin: s,
        ok:ok,
        okValue:'<a href="javascript:;" class="ChinaNet-OK">确定</a>',
        cancel:cancel,
        cancelValue:'<a href="javascript:;" class="ChinaNet-Cancel">取消</a>'
    });

    d.showModal();
}


/**
 * 显示 Loadmask
 */
function showLoading(){
    $.blockUI({
        message:'<div class="ChinaNet-LoadMask"><img src="/statics/img/loading.gif"></div>',
        css:{'border':0,'background':'none','width':'200px','height':'64px','left':'50%','margin-left':'-100px'}
    });
}

/**
 * 关闭 Loadmask
 */
function closeLoading(){
    $.unblockUI();
}

/**
 * 帐号类型
 *
 * @param
 */
var ACCOUNT_TYPE = {'SUPER_MAN': 'SUPER_MAN', 'ADMINISTRATOR': 'ADMINISTRATOR', 'REPRESENTATIVE': 'REPRESENTATIVE', 
		'MERCHANT': 'MERCHANT', 'MANUFACTURER': 'MANUFACTURER', 'DEVICE_ADMIN': 'DEVICE_ADMIN'};
var ACCOUNT_TYPE_CONST = [{'SUPER_MAN': 'SUPER_MAN', 			'en_name': 'SUPER_MAN', 'cn_name': '超级管理员'}, 
                       {'ADMINISTRATOR': 'ADMINISTRATOR', 	'en_name': 'ADMINISTRATOR', 'cn_name': '管理员'}, 
                       {'REPRESENTATIVE': 'REPRESENTATIVE', 	'en_name': 'REPRESENTATIVE', 'cn_name': '代理商'}, 
                       {'MERCHANT': 'MERCHANT', 				'en_name': 'MERCHANT', 'cn_name': '商户'},
                       {'MANUFACTURER': 'MANUFACTURER', 	'en_name': 'MANUFACTURER', 'cn_name': '设备厂商'},
                       {'DEVICE_ADMIN': 'DEVICE_ADMIN', 	'en_name': 'DEVICE_ADMIN', 'cn_name': '设备管理员'}];


/**
 * 获取帐号类型名称信息
 * @param cn_name
 * @returns {*}
 */
function getAccountTypeEnName(cn_name) {
	if (cn_name != null && typeof cn_name == 'string') {
		for (var i = 0; i < ACCOUNT_TYPE_CONST.length;i++) {
			if (cn_name == ACCOUNT_TYPE_CONST[i].cn_name) {
				return ACCOUNT_TYPE_CONST[i].en_name;
			}
		}
	}
	
	return null;
}

/**
 * 获取用户名称信息
 * @param en_name
 * @returns {*}
 */
function getAccountTypeCnName(en_name) {
	if (en_name != null && typeof en_name == 'string') {
		for (var i = 0; i < ACCOUNT_TYPE_CONST.length;i++) {
			if (en_name == ACCOUNT_TYPE_CONST[i].en_name) {
				return ACCOUNT_TYPE_CONST[i].cn_name;
			}
		}
	}
	
	return null;
}


function getDisplayableAccountTypes() {
	var displayableAcctTypes = ACCOUNT_TYPE_CONST.clone();
	
	displayableAcctTypes.removeOnIndex(0); // cannot set account to SUPER_MAN
	
	return displayableAcctTypes;
}

//geoLocation JSON 格式编码
function getObjectAddress(province, city, county, detailAddress) {
	detailAddress = detailAddress.replace("\r\n", " ").replace("\n", " ").replace("\r", " ");
	var address = {
			"province": province,
			"city": city,
			"county": county,
			"address": detailAddress
	};
	
	return address;
}


/**
 * 验证相关
 *
 * @param
 */
function isPasswd(s) {  
	var patrn=/^(.){6,20}$/;  
	if (!patrn.test(s)) return false
		return true
}

function checkEmail(str) {
   var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
   if (!re.test(str)) return false
   		return true   		
}

function checkMobile(str) {
   var re = /^1[3|4|5|7|8][0-9]\d{8}$/;
   if (!re.test(str)) return false
   		return true
}

function checkInt(str) {
	var re = /^\d+$/;
	if (!re.test(str)) return false
	   	return true
}

function checkPort(number) {
	if(number > 65535 || number < 1) {
		return false;
	}
	return true;
}

function checkUserName(str){
	var re=/^[A-Za-z0-9\._'\u4e00-\u9fa5]+$/ig;
	if (!re.test(str)) return false
   		return true 
}

function checkMac(str) {
	var re=/^[0-9A-F]{12}$/;
	if (!re.test(str)) return false
   		return true 
}

function checkPin(str) {
	var re=/^[0-9]{8}$/;
	if (!re.test(str)) return false
   		return true 
}

function istel(tel){
	var re = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
	return re.test(tel);   
}
function isIP(ip)   
{   
    var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;   
    return re.test(ip);   
}

function isChn(str){ 
	var re = /.*[\u4e00-\u9fa5]+.*$/; 
	return re.test(str);
} 

/**
 *字符限制--中文、英文、数字、下划线，不能有其它字符 
 * @param str
 * @returns
 */
function isStr(str){ 
	var re = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/; 
	return re.test(str);
}

function filterUrl(str){
	var filterUrlRe = /[~'!<>@#$%^*()-+,"]/g;
	return str.replace(filterUrlRe, '');
}
/**
 * array indexOf
 *
 * @param
 */
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
/**
 * array移除
 *
 * @param
 */
Array.prototype.remove = function(b) { 
	var a = this.indexOf(b); 
	if (a >= 0) { 
		
		this.splice(a, 1); 
		return true; 
	} 
	
	return false; 
};
/**
 * array包含判断
 *
 * @param
 */
Array.prototype.contains = function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
};
/**
 * 去除空格
 *
 * @param
 */
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};
/**
 * 检查错误图片
 * @param selector
 */
function refreshImage(selector){
    $(selector).find('img').each(function(){
        this.onerror = function(){
            $(this).attr('data-src', $(this).attr('src')).attr('src', '/statics/img/no-image.png');
        };
    });
}


/**
 * 获取省份数据列表 for xiSelect
 * @returns {Array}
 */
function getProviceList(){
    var city = [];
    for(var cx=0;cx<arrCity.length;cx++){
        city.push({value:arrCity[cx].name, text:arrCity[cx].name});
    }
    return city;
}

/**
 * 获取城市数据列表 for xiSelect
 * @param prov
 * @returns {Array}
 */
function getCityList(prov){
    var city = [];
    for(var cx=0;cx<arrCity.length;cx++){
        if(arrCity[cx].name==prov){
            for(var ix=0;ix<arrCity[cx].sub.length;ix++){
                city.push({value:arrCity[cx].sub[ix].name, text:arrCity[cx].sub[ix].name});
            }
            break;
        }
    }
    return city;
}


/**
 * 获取区县数据列表 for xiSelect
 * @param prov
 * @param city
 * @returns {Array}
 */
function getCountyList(prov, city){
    var countyObj = [];
    for(var cx=0;cx<arrCity.length;cx++){
        if(arrCity[cx].name==prov){
            var proObj = arrCity[cx].sub;
            for(var cv=0;cv<proObj.length;cv++){
                if(proObj[cv].name==city){
                    var cityObj = proObj[cv].sub;
                    if(typeof cityObj!='undefined') {
                        for (var cz = 0; cz < cityObj.length; cz++) {
                            countyObj.push({value: cityObj[cz].name, text: cityObj[cz].name});
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
    return countyObj;
}

function getSelectAccountList(){
    var page = $('input#AccountPage').val();
    var keyword = $('input#AccountKeyword').val();

    $.ajax({
        url:'/account/searchaccount.htm',
        type:'GET',
        dataType:'JSON',
        data:{pageNo:page,keywords:keyword},
        async:false,
        success:function(data){
            if(data.result=='OK'){
                if(data.records.length>0){
                    var listHtml = '';
                    for(var mx=0;mx<data.records.length;mx++){
                        var accountData = data.records[mx];
                        var geoLocation = JSON.parse(accountData.geoLocation);
                        listHtml += '<a href="javascript:;" data-value="'+accountData.id+'" data-text="'+(accountData.merchantName?accountData.merchantName:accountData.username)+'" class="xiSelectItem">' +
                            '    <div class="Template-For-Account-List">' +
                            '        <div class="Sub-Account-Thumb">' +
                            '            <img src="'+(accountData.avatarPath?accountData.avatarPath:'/statics/img/userimgbig.png')+'">' +
                            '        </div>' +
                            '        <div class="Account-Profile-Body">' +
                            '            <span class="Account-Name">'+(accountData.merchantName?accountData.merchantName:accountData.username)+'</span>' +((geoLocation.province||geoLocation.address)?
                            '            <span>'+(geoLocation.province!=null?geoLocation.province:'')+' '+(geoLocation.city!=null?geoLocation.city:'')+' '+(geoLocation.county!=null?geoLocation.county:'')+ ' ' +(geoLocation.address!=null?geoLocation.address:'')+'</span>':'') +
                            '        </div>' +
                            '    </div>' +
                            '</a>';
                    }

                    $('div.Select-SubAccount-Body').html(listHtml);
                    page = parseInt(page)+1;
                    $('input#AccountPage').val(page);
                }
            }
        }
    })
}


//全局的ajax访问，处理ajax清求时sesion超时
$.ajaxSetup({
	cache: false,
    contentType:"application/x-www-form-urlencoded;charset=utf-8", 
    complete:function(XMLHttpRequest,textStatus){ 
            var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，
            if(sessionstatus=="timeout"){ 
                //如果超时就处理 ，指定要跳转的页面
            	var session_timeout_text = "未操作时间超过30分钟,即将跳转到登录页...";
            	onAlertError(session_timeout_text);
            	setTimeout ("window.location.replace('" + __CONTEXT_PATH + "/account/logout.htm');", 2500);
            }
        }
    } 
);

function addoneday(datastr){	
	var d3='';
	if(isNotEmptyString(datastr)){
		var d= new Date(Date.parse(datastr.replace(/-/g,   "/")));
	    var d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	    d2.setDate(d2.getDate()+1);
	    var month = d2.getMonth()+1;
        if (parseInt(month) < 10)
            month = "0" + month;
        var day = d2.getDate();
        if (parseInt(day) < 10)
            day = "0" + day;
	    d3 = d2.getFullYear() + "-" + month + "-" + day; 
	}   
    return d3;
}

function string2Json(s) {     
    var newstr = "";  
    for (var i=0; i<s.length; i++) {  
        c = s.charAt(i);       
        switch (c) {    
            case '\'':       
            	newstr+=" ";       
            break;
            case '\"':       
                newstr+=" ";       
                break;       
            case '\\':       
                newstr+="\\\\";       
                break;       
            case '/':       
                newstr+="\\/";       
                break;       
            case '\b':       
                newstr+="\\b";       
                break;       
            case '\f':       
                newstr+="\\f";       
                break;       
            case '\n':       
                newstr+="\\n";       
                break;       
            case '\r':       
                newstr+="\\r";       
                break;       
            case '\t':       
                newstr+="\\t";       
                break;       
            default:       
                newstr+=c;       
        }  
   }  
   return newstr;       
}  

function banBackSpace(e) {
	var ev = e || window.event; //获取event对象   
	var obj = ev.target || ev.srcElement; //获取事件源   
	var t = obj.type || obj.getAttribute('type'); //获取事件源类型  
	//获取作为判断条件的事件类型
	var vReadOnly = obj.getAttribute('readonly');
	//处理null值情况
	vReadOnly = (vReadOnly == "") ? false : vReadOnly;
	//当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	//并且readonly属性为true或enabled属性为false的，则退格键失效
	var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && vReadOnly == "readonly") ? true : false;
	//当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;
	//判断
	if (flag2) {
		return false;
	}
	if (flag1) {
		return false;
	}
}