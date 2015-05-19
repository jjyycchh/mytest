/**
 * Created by huanghanxian on 14-8-24.
 */
var _TempRecords = null;

var siteSearchHandler = new searchUtil(generateTemplateListHtml, searchFailCallBack, searchErrorCallBack, null, pageLoad,
		"Portal-Template-ul", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
		'/merchant/templatelist.htm', "");

var templatesApp = function(){
    var getTemplates = function(){
        if($.browser.msie){
            var type = $(window.parent.document.getElementById('PageTemplateType'));
            var tradeType = $(window.parent.document.getElementById('PageTradeType'));
        }else{
            var type = window.top.$('#PageTemplateType');
            var tradeType = window.top.$('#PageTradeType');
        }
        var str_type = $(type).val();
        var str_tradeType = $(tradeType).val();
        if(str_type){
        	siteSearchHandler.setSearchParemeter('type', str_type);
        }
        if(str_tradeType){
            siteSearchHandler.setSearchParemeter('tag', str_tradeType);
        }
        siteSearchHandler.searchWithPreload();
        return false;

        /*
        $.ajax({
            url:'/merchant/templatelist.htm',
            type:'GET',
            dataType:'JSON',
            async:false,
            data:{type:$(type).val(),pageNo:1},
            success:function(data){
                if(data.result=="OK"){
                    var html = '';
                    _TempRecords = data.records;
                    for(var tx=0;tx<data.records.length;tx++){
                        html += '<li>' +
                            '   <div class="Page-Template-Body Data-Adorn-Overly">' +
                            '       <div class="Overly-Top-Left"></div>' +
                            '       <div class="Overly-Top-Right"></div>' +
                            '       <div class="Overly-Bottom-Left"></div>' +
                            '       <div class="Overly-Bottom-Right"></div>' +
                            '       <img src="' +(data.records[tx].thumbnailPath?data.records[tx].thumbnailPath:'/statics/img/no-image.png')+'">' +
                            '       <div class="Template-Select-Line">' +
                            '           <span>'+data.records[tx].name+'</span>' +
                            '       </div>' +
                            '       <a href="javascript:;" data-templateid="'+data.records[tx].id+'">选用</a>'
                            '   </div>' +
                            '</li>';
                    }
                    $('div.ChinaNet-Portal-Templates ul').html(html);
                    if($.browser.msie){
                        var type = $(window.parent.document.getElementById('PageEditorIframeID')).height($('body').height());
                            $(window.parent.document).find('div.Page-Editor-Header').removeClass('Page-Edit-Show').addClass('Page-Edit-Template');
                    }else{
                        var type = window.top.$('#PageEditorIframeID').height($('body').height());
                            window.top.$('div.Page-Editor-Header').removeClass('Page-Edit-Show').addClass('Page-Edit-Template');
                    }

                    $('div.Page-Template-Body a').click(function(){
                       var page = onChangeTemplate($(this).attr('data-templateid'));
                           window.parent.onChangePageTemplate(page);
                    });
                }
            }
        })
*/
    }

    var onCancelChange = function(){
        $('div.Edit-Page-Bar a').click(function(){
            if($(this).hasClass('Cancel')){
                if(typeof window.parent._EditPageData.data=='undefined') {
                    window.parent.onCancelEditPage();
                }else{
                    if ($.browser.msie) {
                        $(window.parent.document.getElementById('RefreshEditPage')).click();
                    } else {
                        window.top.$('a#RefreshEditPage').click();
                    }
                }
            }
        })
    }

    return {init:function(){
        getTemplates();
        onCancelChange();
    }}
}();

function showLoading(){
	//blank
}

function closeLoading(){
	//blank
}

function pageLoad(){
    if($.browser.msie){
        var type = $(window.parent.document.getElementById('PageEditorIframeID')).height($('body').height());
            $(window.parent.document).find('div.Page-Editor-Header').removeClass('Page-Edit-Show').addClass('Page-Edit-Template');
    }else{
        var type = window.top.$('#PageEditorIframeID').height($('body').height());
            window.top.$('div.Page-Editor-Header').removeClass('Page-Edit-Show').addClass('Page-Edit-Template');
    }

    $('div.Page-Template-Body a').click(function(){
       var page = onChangeTemplate($(this).attr('data-templateid'));
           window.parent.onChangePageTemplate(page);
    });
}

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

function generateTemplateListHtml(data) {
	var html = '';
    if(data.length > 0){
        _TempRecords = data;
        for(var tx=0;tx<data.length;tx++){
            html += '<li>' +
                '   <div class="Page-Template-Body Data-Adorn-Overly">' +
                '       <div class="Overly-Top-Left"></div>' +
                '       <div class="Overly-Top-Right"></div>' +
                '       <div class="Overly-Bottom-Left"></div>' +
                '       <div class="Overly-Bottom-Right"></div>' +
                '       <img src="' +(data[tx].thumbnailPath?data[tx].thumbnailPath:'/statics/img/no-image.png')+'">' +
                '       <div class="Template-Select-Line">' +
                '           <span>'+data[tx].name+'</span>' +
                '       </div>' +
                '       <a href="javascript:;" data-templateid="'+data[tx].id+'">选用</a>'
                '   </div>' +
                '</li>';
        }
    }
    return html;
}

function searchFailCallBack(data, message) {
	onAlertError('加载模板数据请求提交失败！');
	return false;
}

function searchErrorCallBack(data, message) {
	onAlertError('加载模板数据请求提交失败！');
	return false;
}

function onChangeTemplate(id){
    var page = {};
    if(typeof _TempRecords!='undefined'&&_TempRecords!=null){
        for(var tx=0;tx<_TempRecords.length;tx++){
            if(_TempRecords[tx].id==id){
                page.templateid = id;
                page.title = _TempRecords[tx].name;
                page.name  = page.title;
                page.thumb = _TempRecords[tx].thumbnailPath;
                page.type  = _TempRecords[tx].type;
                page.data  = JSON.parse(_TempRecords[tx].defaultData);
                page.template = JSON.parse(_TempRecords[tx].templateFrame);
                break;
            }
        }
    }

    return page;
}