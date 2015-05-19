/**
 * Created by huanghanxian on 14-8-26.
 */

var editpageApp = function (){
    var resiteFrameHeight = function (){
        var height = $('body').height();
        if($.browser.msie){
            var type = $(window.parent.document.getElementById('PageEditorIframeID')).height($('body').height());
            $(window.parent.document).find('div.Page-Editor-Header').removeClass('Page-Edit-Template').addClass('Page-Edit-Show');
        }else{
            var type = window.top.$('#PageEditorIframeID').height($('body').height());
            window.top.$('div.Page-Editor-Header').removeClass('Page-Edit-Template').addClass('Page-Edit-Show');
        }
    }

    var initEditBar  = function(){
        $('body').append('<div class="Edit-Page-Bar">' +
            '<a href="javascript:;" class="Active View" title="浏览状态">' +
            '<span class="View-Button"></span>' +
            '</a>' +
            '<a href="javascript:;" class="Edit" title="编辑状态">' +
            '<span class="Edit-Button"></span>' +
            '</a>' +
            '<a href="javascript:;" class="Template" title="更换模板">' +
            '<span class="Template-Button"></span>' +
            '</a>' +
            '<a href="javascript:;" class="Cancel" title="取消">' +
            '<span class="Cancel-Button"></span>' +
            '</a>' +
            '</div>');

        $('div.Edit-Page-Bar a').click(function(){

            // change edit or view mode
            /**
             * 点击切换页面浏览或编辑模式
             */
            if($(this).hasClass('Edit')){
                $('div.siteModules').each(function(x){
                    var dom = $(this);
                    var height = dom.height();
                    var width  = dom.outerWidth();
                    var id     = $(this).attr('id');
                    var title  = $(this).attr('title');
                    if(dom.find('Page-Module-Edit-Body').length==0){
                        dom.append('<div class="Page-Module-Edit-Body" style="width:'+width+'px;height:'+height+'px;">' +
                                   '    <div class="Page-Module-Edit-Body-Frame">' +
                                   '        <div class="Edit-Module-Overly" style="width:'+width+'px;height:'+height+'px;"></div>' +
                                   '        <a href="javascript:;" data-module="'+id+'" data-title="'+title+'">编辑模块内容</a>' +
                                   '    </div>' +
                                   '</div>');
                    }
                });
                $('body').addClass('Page-Edit-Mode');
            }else if($(this).hasClass('Template')) {
                if($.browser.msie){
                    var win = $(window.parent.document.getElementById('PageEditorIframeID'));
                }else{
                    var win = window.top.$('#PageEditorIframeID');
                }

                win.attr('src', '/merchant/templates.htm');
            }else if($(this).hasClass('Cancel')) {
                if($.browser.msie){
                    var win = $(window.parent.document.getElementById('PageEditorIframeID'));
                }else{
                    var win = window.top.$('#PageEditorIframeID');
                }

                win.attr('src', '/merchant/load_pagedata.htm');
            }else{
                $('body').removeClass('Page-Edit-Mode');
            }
            $(this).addClass('Active').siblings().removeClass('Active');


            // mouse enter show edit button
            /**
             * 进入编辑模式时，鼠标移动显示编辑按钮
             */
            $('div.Page-Module-Edit-Body').mouseenter(function(){
               $(this).find('.Edit-Module-Overly').fadeIn(100);
               $(this).find('a').fadeIn(100);
            });

            $('div.Page-Module-Edit-Body').mouseleave(function(){
               $(this).find('.Edit-Module-Overly').fadeOut(100);
               $(this).find('a').fadeOut(100);
            });

            // click edit module
            $('div.Page-Module-Edit-Body-Frame a').click(function(){
                var module = $(this).attr('data-module');
                var title  = $(this).attr('data-title')
                    window.parent.openEditModuleDialog(module,title);
            })
        });
    }

    return {init:function(){
        resiteFrameHeight();
        initEditBar();
    }}
}();

$(document).ready(function(){
    editpageApp.init();
})
