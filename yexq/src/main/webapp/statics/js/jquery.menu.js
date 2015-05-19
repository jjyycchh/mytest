/**
 * Created by huanghanxian on 14-6-18.
 *
 * create xiMenu CSS class
 * example: .xiMenu-Controll-LabelName {...} Or
 *
 * private Skin CSS
 * example: .myxiMenuBody {...}
 *
 *
 */



(function($){

    var xiXopenClass = '';

    // xiMenu Object
    $.xiMenu = function(elm, options){
        var _this = this;
            _this.elm = elm;
            _this.$elm = $(elm);
            _this.params = $.extend({}, $.xiMenu.defaults, options);
            _this.elementName = 'xiMenu-Controll-LabelName';
            _this.idCode      = 'xiMENUElementBODYATTRIdCodeXIM'+(Math.random()+'').replace('.','');
            _this.time = null;
            _this.openClass='xiMenu-Open';
            _this.overMenu = false;
            _this.menuPanel = null;
            _this.menuBody = null;
            _this.targetObj = null;
            _this.autoMenu = null;




            _this.init = function(){
                if(_this.$elm.length==0) return false;

                if(_this.params.menuEvent=='click') {
                    _this.$elm.click(function(event){
                        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
                        _this.targetObj = $(event.target);
                        _this.openMenu();
                        _this.onClick();
                        return false;
                    });
                }else{
                    _this.$elm.mouseenter(function(event){
                        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
                        _this.targetObj = $(event.target);
                        _this.openMenu();
                        _this.onClick();
                        _this.onMouseOut();
                        return false;
                    });
                }
            }

            _this.openMenu = function(){
                var scrollTop   =  document.documentElement.scrollTop || document.body.scrollTop;
                var elmPosition = _this.$elm.offset();
                var elmWidth    = _this.$elm.outerWidth();
                var elmHeight   = _this.$elm.outerHeight();
                var winWidth    = $(window).width();
                var winHeight   = $(window).height();
                var alignClass  = _this.params.align=='left'?'xiMenu-Align-Left':'xiMenu-Align-Right';
                var valignClass = 'xiMenu-Align-Bottom';

                // 清理计时器
                if(_this.time!=null) clearTimeout(_this.time);


                // 检查是否菜单是否已经打开
                if(_this.$elm.hasClass(_this.openClass)){
                    if(_this.params.menuElement!=''&&$('#'+_this.params.menuElement).length>0){
                        $('#'+_this.params.menuElement).fadeOut(_this.params.time,function(){
                            $('#'+_this.params.menuElement).removeClass(alignClass).removeClass(valignClass);
                            if(_this.params.activeClass!='') _this.$elm.removeClass(_this.params.activeClass);
                        });
                    }else{
                        $('.'+_this.elementName).fadeOut(_this.params.time, function(){
                           $('.'+_this.elementName).remove();
                           if(_this.params.activeClass!='') _this.$elm.removeClass(_this.params.activeClass);
                        });
                    }
                    _this.$elm.removeClass(_this.openClass);

                    return false;
                }

                // 打开新菜单之前
                if($('.'+_this.elementName).length>0){
                    _this.close();
                }

                // 打开新菜单
                if(_this.params.menuElement!=''&&$('#'+_this.params.menuElement).length>0){
                    _this.menuPanel = $('#'+_this.params.menuElement);
                    _this.menuPanel.addClass(_this.elementName);
                }else{
                    if(typeof _this.params.menuItem=='function'){
                        var menuItem = _this.params.menuItem(1,1);
                    }else{
                        var menuItem = _this.params.menuItem;
                    }

                    if(menuItem.length==0) return false;

                    // 创建菜单HTML
                    _this.menuPanel = $('<div class="'+_this.elementName+'" style="display:none;" data-autoximenu="true"></div>').appendTo($('body'));

                    var itemList = '';
                    var itemAttr = '';
                    var paramAttr = _this.params.paramAttr;
                    for(var pi=0;pi<paramAttr.length;pi++){
                        itemAttr += ' '+paramAttr[pi]+'="'+_this.$elm.attr(paramAttr[pi])+'"';
                    }

                    for(var mi=0;mi<menuItem.length;mi++){
                        var menuID    = menuItem[mi].id?menuItem[mi].id:'';
                        var menuClass = menuItem[mi].className?menuItem[mi].className:'';
                        var menuAttr  = menuItem[mi].dataAttr?menuItem[mi].dataAttr:'';

                            menuID    = menuID!=''?' id="'+menuID+'"':'';
                            menuClass = menuClass!=''?' class="'+menuClass+'"':'';
                            itemList += '<a href="'+menuItem[mi].url+'"'+menuID+menuClass+menuAttr+_this.params.menuAttr+itemAttr+'>'+menuItem[mi].text+'</a>';
                    }

                    $('<div class="xiMenu-Content-Adorn-Top"></div>').appendTo(_this.menuPanel);
                    _this.menuBody = $('<div class="xiMenu-Content-Body"></div>').appendTo(_this.menuPanel);
                    //$(itemList).appendTo(_this.menuBody);
                    $('.xiMenu-Content-Body a').click(function(){
                    	_this.close();
                    });
                    $('<div class="xiMenu-Content-Adorn-Bottom"></div>').appendTo(_this.menuPanel);
                    $(itemList).appendTo(_this.menuBody);
                }

                _this.menuPanel.addClass(alignClass);
                if(_this.params.skinClass!='') _this.menuPanel.addClass(_this.params.skinClass);

                var left = 0;
                var top  = 0;

                if(_this.params.menuElement!=''&&$('#'+_this.params.menuElement).length>0){
                    if(_this.params.align=='left'){
                        left = elmPosition.left;
                        top  = elmPosition.top + elmHeight;
                    }else{
                        left = elmPosition.left + elmWidth - $('.'+_this.elementName).width();
                        top  = elmPosition.top + elmHeight;
                    }
                }else{
                    $('.'+_this.elementName).css({'width':_this.params.width});
                    if(_this.params.align=='left'){
                        left = elmPosition.left;
                        top  = elmPosition.top + elmHeight;
                    }else{
                        left = elmPosition.left + elmWidth - _this.params.width;
                        top  = elmPosition.top  + elmHeight;
                    }
                }

                _this.menuPanel.css({'left':left,'top':top,'position':'absolute','z-index':999});
                _this.menuPanel.fadeIn(0).slideDown(_this.params.time, function(){
                    _this.menuPanel.show();
                    _this.$elm.addClass(_this.openClass);
                    xiXopenClass = _this.params.activeClass;
                    if(_this.params.activeClass!=''){
                        _this.$elm.addClass(_this.params.activeClass);
                    }
                });

                _this.menuPanel.mouseenter(function(){
                    _this.overMenu = true;
                });

                _this.menuPanel.mouseleave(function(){
                    _this.overMenu = false;
                });

            }


            _this.close = function(){
                if($('.'+_this.elementName).length>0){
                    var oldElement = $('.'+_this.elementName).attr('data-autoximenu');

                    if(typeof oldElement!='undefined'){
                        $('.'+_this.elementName).remove();
                    }else{
                        $('.'+_this.elementName).removeClass(_this.elementName).fadeOut(0);
                    }

                    $('.'+_this.openClass).removeClass(xiXopenClass).removeClass(_this.openClass);
                }
            }

            _this.onClick = function(){
                $(document).click(function(){
                    _this.close();
                })
            }

            _this.onMouseOut = function(){

            }

            // instantiation xiMenu
            _this.init();
    }

    $.xiMenu.defaults = {
        align:'left',
        menuEvent:'click',
        menuElement:'', // Element ID
        time: 100,      // Flash Time
        menuItem:[],
        hide:true,
        position:[],    // [left, top]
        width:120,
        border:0,
        radius:0,       // int | []
        color:'#000',
        background:'#fff',
        overBackgroundColor:'#fff',
        menuAttr:'',
        activeClass:'',
        skinClass:'',
        menuClose:true,
        paramAttr:[],
        onChange:function(){}
    }


    $.fn.xiMenu = function (options) {
        //return new $.xiMenu(this, options);
        return this.each(function(){
            new $.xiMenu(this, options);
        });
    };
})(jQuery);
