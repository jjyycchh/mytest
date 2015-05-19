
var MAX_WIDTH_SET  = 800;
var SLIDER_SCALE   = 300/MAX_WIDTH_SET;
var DOCUMENT_WIDTH = $('div.siteBody').width();
var SLIDER_BORDER  = 0;
var SLIDER_TIME;
var SLIDER_INDEX = -1;


function playSlider(){
	var len = $('#siteSliderModule').find('div.sliderItem').length;
	SLIDER_INDEX++;
	if(SLIDER_INDEX>=len) SLIDER_INDEX =0;
	onChangeImage(SLIDER_INDEX);
	SLIDER_TIME = window.setTimeout("playSlider()", 5000);
}

function onChangeImage(k){
	var len = $('#siteSliderModule').find('div.sliderItem').length;
	$('#siteSliderModule').find('div.sliderItem').eq(k).fadeIn('slow').siblings().fadeOut();
}

var template = function(){
	var resizeSlider = function(){
		var swidth     = Math.ceil(SLIDER_SCALE*DOCUMENT_WIDTH);
		$('#siteSliderModule').each(function(x){
			$('#siteSliderModule').eq(x).height(swidth);
		});
	}
	
	var showEditBar = function(){
		$(document).on('mouseenter', 'div.siteModule', function(){
			$(this).find('div.editBar').show();
		})
		$(document).on('mouseleave', 'div.siteModule', function(){
			$(this).find('div.editBar').hide();
		})
	}
	
	var resizeImageLine = function(){
		var scale = 120/MAX_WIDTH_SET;
		var minwidth = DOCUMENT_WIDTH;
		var width = Math.ceil(minwidth*scale);
		
		$('div.ImageItem').each(function(x){
			$(this).find('img').css({'width':width, 'height':width});
			$('div.ImageItem').eq(x).find('div').width(minwidth-width-30);
			$(this).height(width);
		});
	}
	
	var resizeImageSpan = function(){
		var scale = 134/MAX_WIDTH_SET;
		var minwidth = DOCUMENT_WIDTH;
		var width  = (100/6)+'%';
		$('div.ImageSpan ul li').css({'width':width});
		$('div.ImageSpan ul li').css({'height':$('div.ImageSpan ul li').eq(0).width()});
		$('div.ImageSpan ul li div').css({'height':$('div.ImageSpan ul li').eq(0).width(),'width':$('div.ImageSpan ul li').eq(0).width()});
		$('div.ImageSpan ul li div span').css({'width':$('div.ImageSpan ul li').eq(0).width()-5,'top':$('div.ImageSpan ul li').eq(0).width()-30});		
	}
	
	var resizeImageArea = function(){
		var scale = 500/MAX_WIDTH_SET;
		var minwidth = DOCUMENT_WIDTH;
			$('div.ImageArea').height(minwidth*scale);
	}
	
	var resizeTextLine = function(){
		var scale = 120/MAX_WIDTH_SET;
		var minwidth = DOCUMENT_WIDTH;
		$('div.TextBody ul li').height(minwidth*scale);
	}
	
	var resizeLoginButton = function(){
		if($('input.AuthInputText').length>0){
			var main = $('input.AuthInputText').eq(0).parent().width();
			
			//$('button.AuthSubmitID').width($('input.AuthInputText').eq(0).width()+6);
		}
	}
	
	var showSliderContent = function(){
		$(document).on('mouseenter', 'div.sliderImage', function(){
			$(this).find('div.sliderContent').animate({'bottom':0},100);
		});
	}
	
	var hideSliderContent = function(){
		$(document).on('mouseleave', 'div.sliderImage', function(){
			$(this).find('div.sliderContent').animate({'bottom':-52},100);
		});
	}
	
	var getSiteWidth = function(){
		var swidth = $('div.siteBody').width();
		var pwidth = $('div.siteBody').parent().width();
			DOCUMENT_WIDTH = Math.min(swidth,pwidth);
			SLIDER_BORDER  = parseInt($('div.siteModule').css('border-left-width'))*2;
			DOCUMENT_WIDTH = DOCUMENT_WIDTH-SLIDER_BORDER;
			$('div.siteBody').width(DOCUMENT_WIDTH);
	}
	
	var onRefreshData = function(){
		$('div#portalModuleSliderID').on('show.bs.modal', function(e){
			if(!$('div#portalModuleSliderID').find('ul.wifi-portal-tabnav li').eq(0).find('a').hasClass('active')){
				$('div#portalModuleSliderID').find('ul.wifi-portal-tabnav li').eq(0).find('a').addClass('active');
				$('div#portalModuleSliderID').find('ul.wifi-portal-tabnav li').eq(1).find('a').removeClass('active');
				$('div#portalModuleSliderID').find('div.editor-data-body').eq(0).show();
				$('div#portalModuleSliderID').find('div.editor-data-body').eq(1).hide();
				$('div#portalModuleSliderID').find('input#SliderID').val('');
				$('div#portalModuleSliderID').find('input#SliderThumb').val('');
				$('div#portalModuleSliderID').find('input#SliderTitle').val('');
				$('div#portalModuleSliderID').find('input#SliderDescription').val('');
				$('div#portalModuleSliderID').find('input#SliderUrl').val('');
			}
		});
	}
	
	var onUploadThumb = function(){
		$(document).on('click','button#ComponentUpload', function(e){
			if($('input#siteimagethumb').val()!=''){
				uploadStarter(2*1024*1024, // 2M
						'${pageContext.request.contextPath}/resource/upload.htm', 
						"siteimagethumb", 
						onPreUploadCallBack,
						onUploadedResourceCallBack);
			}
		});
	}
	
	return {init:function(){
		getSiteWidth();
		resizeSlider();
		showSliderContent();
		hideSliderContent();
		resizeLoginButton();
		resizeImageLine();
		resizeImageSpan();
		resizeTextLine();
		resizeImageArea();
		showEditBar();
		onRefreshData();
		onUploadThumb();
	}}
}();


function onChangePage(obj){
	//__edit_pageid = obj.pageid;
	$('div.editor-page-main').html('');
	for(i=0;i<obj.template.layout.script.length;i++){
		if(obj.template.layout.script[i].indexOf('jquery-1.11.0.min')<0){
			$('div.editor-page-main').append('<script type="text/javascript" src="'+__base_path+obj.template.layout.script[i]+'"></script>');
		}
	}
	for(i=0;i<obj.template.layout.css.length;i++){
		$('div.editor-page-main').append('<link type="text/css" rel="stylesheet" href="'+__base_path+obj.template.layout.css[i]+'" media="screen" />');
	}
	
	// 显示当前编辑页面的标题和模板标题
	$('div.editor-header div.editor-main').eq(0).html('<span>标题</span>'+obj.title);
	$('div.editor-header div.editor-main').eq(1).html('<span>模板</span>'+obj.template.name);
	
	
	// 如果ID包含NP，视为新增的页面
	if(__edit_pageid==''){
		if(__portal_sitedata==null) __portal_sitedata = {};
		//在portal站点页面数据中增加新页面
		if(typeof __portal_sitedata.pages=='undefined'){
			__portal_sitedata.pages = [obj];
		}else{
			if(typeof __portal_sitedata.pages=='object'&&__portal_sitedata.pages.length>0){
				__portal_sitedata.pages.push(obj);
			}else{
				__portal_sitedata.pages = [obj];
			}
		}
		onAddNewPage(obj.pageid);
		onActivePage(obj.pageid);
	}else{
		var resetpages = [];
		for(i=0;i<__portal_sitedata.pages.length;i++){
			if(__portal_sitedata.pages[i].pageid==obj.pageid){
				resetpages.push(obj);
			}else{
				resetpages.push(__portal_sitedata.pages[i]);
			}
		}
		
		__portal_sitedata.pages = resetpages;
		onActivePage(obj.pageid);
	}
	
	__edit_sitepage = obj;
	__edit_pageid = obj.pageid;
	$('div.editor-page-main').append(loadPageHtml(obj));
	loadPermission(obj);
	
	// 加载JS模板
	loadPageDefault();
	
}

// 读取模板Module的HTML内容
function loadPageHtml(data){
	var pagetemplate = data.template;
	var htmlbody = pagetemplate.layout.body;
	var htmlModule = '';
	var modules   = data.template.modules;
	var defaultdata = data.data;
	
	for(i=0;i<modules.length;i++){
		var modulehtml = modules[i].layout;
		var componenthtml = '';
		var components   = modules[i].components;
		var moduleid = modules[i].moduleid;
		var regmodule= new RegExp('{{'+modules[i].moduleid+'}}', 'ig');
		
		if(modules[i].type=='general'){
			for(j=0;j<components.length;j++){
				var content = getComponentData(defaultdata, moduleid, components[j].componentid);
				var comhtml = components[j].content;
				var regexp  = new RegExp('{{'+components[j].componentid+'}}','ig');
				
				if(comhtml.indexOf('{%=title%}')>-1&&typeof content.title!='undefined') comhtml = comhtml.replace(/{%=title%}/ig, content.title);
				if(comhtml.indexOf('{%=url%}')>-1&&typeof content.url!='undefined') comhtml = comhtml.replace(/{%=url%}/ig, content.url);
				if(comhtml.indexOf('{@=thumb@}')>-1&&typeof content.thumb!='undefined') comhtml = comhtml.replace(/{@=thumb@}/ig, __base_path+content.thumb);
				if(comhtml.indexOf('{%=description%}')>-1&&typeof content.description!='undefined') comhtml = comhtml.replace(/{%=description%}/ig, content.description);
				// module html
				modulehtml = modulehtml.replace(regexp, comhtml);
			}
		}else{
			var content = getAuthModuleData(defaultdata, moduleid);
			if(modulehtml.indexOf('{%=auth_html_code%}')>-1&&typeof content.auth_html_code!='undefined') modulehtml = modulehtml.replace(/{%=auth_html_code%}/ig, content.auth_html_code);
			if(modulehtml.indexOf('{%=platSrvAddr%}')>-1&&typeof content.platSrvAddr!='undefined') modulehtml = modulehtml.replace(/{%=platSrvAddr%}/ig, content.platSrvAddr);
		}
		
		
		htmlbody = htmlbody.replace(regmodule, modulehtml);
	}
	
	return htmlbody;
}

function getAuthModuleData(data,moduleid){
	//var html = '';
		for(i=0;i<data.modules.length;i++){
			if(data.modules[i].moduleid==moduleid){
				return data.modules[i].layout;
				break;
			}
		}
		
		return false;
}

function getComponentData(data, moduleid, componentid){
	var m = {};
	
	for(i=0;i<data.modules.length;i++){
		if(data.modules[i].moduleid==moduleid){
			var components = data.modules[i].components;
			for(j=0;j<components.length;j++){
				if(components[j].componentid==componentid){
					m = components[j].content;
					break;
				}
			}
			break;
		}
	}
	
	return m;
}


// 给显示当前编辑页面添加背景
function onActivePage(id){
	$("div.portal-site-page").each(function(x){
		if($("div.portal-site-page").eq(x).find('a').eq(0).attr('pageid')==id){
			$("div.portal-site-page").eq(x).addClass('active');
		}else{
			$('div.portal-site-page').eq(x).removeClass('active');
		}
	});
}


function onAddNewPage(id){
	var data = getSitePage(id);
	
	var img  = (data&&typeof data.thumb!='undefined'&&data.thumb!='')?data.thumb:'/resources/img/no-image.png';
	var html = '<div class="portal-site-page">'
			  +'    <img src="'+__base_path+img+'">'
              +'    <div class="mark-frame"></div>'
              +'    <div class="mark-opera">'
              +'    	<table>'
              +'            <tr>'
              +'                <td>'
              +'                    <a href="javascript:;" class="pageeditid" pageid="'+id+'">编辑</a>'
              +'    	            <a href="javascript:;" class="pagedeleteid" pageid="'+id+'">删除</a>'
              +'                </td>'
              +'            </tr>'
              +'        </table>'
              +'    </div>'
              +'</div>';
	$('div.editor-page-list').prepend(html);
}

function onDeletePage(id){
	if(typeof __portal_sitedata.pages!='undefined'){
		var reset_portalpage = [];
		for(i=0;i<__portal_sitedata.pages.length;i++){
			if(__portal_sitedata.pages[i].pageid!=id) reset_portalpage.push(__portal_sitedata.pages[i]); 
		}
		
		__portal_sitedata.pages = reset_portalpage;
		return true;
	}
	return false;
}


// 检查模块编辑权限
function loadPermission(data){
	var modules = data.template.modules;
	for(i=0;i<modules.length;i++){
		if(modules[i].moduleid=='siteSliderModule'&&modules[i].permission=='true'){
			$('div#'+modules[i].moduleid).prepend('<div class="editBar"><a href="'+__base_path+'/merchant/slider_management.htm" data-toggle="modal" data-target="#portalModuleSliderID">编辑</a><a href="javascript:;">清空</a></div>');
		}else if(modules[i].moduleid=='siteImageLineModule'&&modules[i].permission=='true'){
			$('div#'+modules[i].moduleid).prepend('<div class="editBar"><a href="'+__base_path+'/merchant/imagetext_management.htm" data-toggle="modal" data-target="#portalModuleImagetextID">编辑</a><a href="javascript:;">清空</a></div>');
		}else if(modules[i].moduleid=='siteImageSpanModule'&&modules[i].permission=='true'){
			$('div#'+modules[i].moduleid).prepend('<div class="editBar"><a href="'+__base_path+'/merchant/imageblock_management.htm" data-toggle="modal" data-target="#portalModuleImageblockID">编辑</a><a href="javascript:;">清空</a></div>');
		}else if(modules[i].moduleid=='siteTextLineModule'&&modules[i].permission=='true'){
			$('div#'+modules[i].moduleid).prepend('<div class="editBar"><a href="'+__base_path+'/merchant/contentblock_management.htm" data-toggle="modal" data-target="#portalModuleContentblockID">编辑</a><a href="javascript:;">清空</a></div>');
		}else if(modules[i].moduleid=='siteImageAreaModule'&&modules[i].permission=='true'){
			$('div#'+modules[i].moduleid).prepend('<div class="editBar"><a href="'+__base_path+'/merchant/image_management.htm" data-toggle="modal" data-target="#portalModuleImageID">编辑</a><a href="javascript:;">清空</a></div>');
		}else if(modules[i].moduleid=='siteContentModule'&&modules[i].permission=='true'){
			$('div#'+modules[i].moduleid).prepend('<div class="editBar"><a href="'+__base_path+'/merchant/content_management.htm" data-toggle="modal" data-target="#portalModuleContentID">编辑</a><a href="javascript:;">清空</a></div>');
		}else if(modules[i].moduleid=='siteLinkModule'&&modules[i].permission=='true'){
			$('div#'+modules[i].moduleid).prepend('<div class="editBar"><a href="'+__base_path+'/merchant/link_management.htm" data-toggle="modal" data-target="#portalModuleLinkID">编辑</a><a href="javascript:;">清空</a></div>');
		}
	}
	$('div.siteBody').append(data.template.layout.modal);
}

function getSitePage(id){
	if(typeof __portal_sitedata.pages!='undefined'){
		var data = __portal_sitedata.pages;
		for(i=0;i<data.length;i++){
			if(data[i].pageid==id) return data[i];
		}
	}
	
	return false;
}

function setComponentData(moduleid, componentid, content){
	var modules = __edit_sitepage.data.modules;
	for(i=0;i<modules.length;i++){
		if(modules[i].moduleid==moduleid){
			var components = modules[i].components;
			for(j=0;j<components.length;j++){
				if(components[j].componentid==componentid){
					components[j].content = content;
					return true;
				}
			}
		}
	}
	return false;
}

function loadPageDefault(){
	window.clearTimeout(SLIDER_TIME);
	template.init();
	playSlider();
}
