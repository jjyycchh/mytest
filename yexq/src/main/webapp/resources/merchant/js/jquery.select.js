/**
 * Created by huanghanxian on 14-8-18.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */


(function($){
    $.xiSelect = function(elm, options){
        var _this = this;
            _this.$elm = $(elm);
            _this.params = $.extend({}, $.xiSelect.defaults, options);
            _this.arrowName = 'xiSelectArrowName';
            _this.idCode    = 'XIS'+(Math.random()+'').replace('.','');
            _this.elmId     = null;
            _this.elmName   = null;
            _this.openClass = 'xiSelectOpen';
            _this.elementName = 'xiSelectElementName';
            _this.currData = $.extend({}, _this.params.defaultData);
            _this.selectItem = 'xiSelectItem';
            _this.prefixName = 'xiSelect-';
            _this.inputVisable = null;
            _this.selectBody = null;
            _this.inputHidden = null;
            _this.arrowBody = null;
            _this.arrowIcon = null;
            _this.oldElement = null;
            _this.elementAlign = "xiSelect-Align-Left";
            _this.elementValign = "xiSelect-Valign-Bottom";
            _this.selectPanelClass = 'xiSelectPanelElementName';
            _this.selectPanelIframe = null;
            _this.selectPanelList = null;
            _this.selectPanelBody = null;
            _this.selectPanelMain = null;
            _this.selectPanelHome = null;
            _this.adornTop        = null;
            _this.adornBottom     = null;
            _this.selectItemHtml  = '';
            _this.openEnter = true;
            _this.disabledClass   = '';
            _this.isPanelOpen = false;

        _this.init = function(event){
            if(_this.$elm.length<1) return false;
            _this.openxiSelect();
            _this.openSelectList();
            _this.isComboClick();
            _this.moveMouseOver();
            _this.changeSelect();
            _this.onClick();
            return false;
        }
        
        _this.openxiSelect = function(){
            var selectHtml = '';
            var objName    = _this.$elm.attr("name");
            var objID      = _this.$elm.attr('id');
            var parentElement = _this.$elm.parent();
            var elementHtml = '';
            _this.elmId = objID;
            _this.elmName = objName;

            // hidden self
            _this.$elm.css({display:'none'});
            _this.$elm.attr('id', _this.prefixName+objID);
            _this.$elm.attr('name', _this.prefixName+objName);
            elementHtml = $('<p>').append(_this.$elm.clone()).html();
            $('#'+_this.prefixName+objID).remove();



            _this.disabledClass     = _this.params.disabled?' xiSelect-Disabled':'';
            _this.selectBody = $('<div class="xiSelect-Element-Body'+_this.disabledClass+'" id="'+_this.elementName+_this.idCode+'"></div>').appendTo(parentElement);
            _this.arrowBody  = $('<div class="xiSelect-Element-Arrow"></div>').appendTo(_this.selectBody);
            _this.arrowIcon = $('<span class="xiSelect-Arrow-Icon"></span>').appendTo(_this.arrowBody);
            var InputArea = $('<div class="xiSelect-Input-Body"></div>').appendTo(_this.selectBody);
            var defaultData = _this.params.defaultData;
            _this.inputVisable = $('<input type="text" id="'+objID+'-text" class="xiSelect-Input-Text" name="'+objName+'-text" value="'+(defaultData.text ? defaultData.text:"")+'">').appendTo(InputArea);
            _this.inputHidden  = $('<input type="hidden" id="'+objID+'" name="'+objName+'" value="'+(defaultData.value ? defaultData.value:"")+'">').appendTo(_this.selectBody);
            _this.oldElement   = $(elementHtml).appendTo(_this.selectBody);

            if(!_this.params.isCombo){
                _this.inputVisable.attr('readonly', 'readonly').css({'cursor':'pointer','_cursor':'hand'});
            }else{
            	if(typeof _this.params.keySearch == 'function'){
            		var keywords = '';
            		_this.inputVisable.keyup(function(event){
            			_this.params.keySearch($.trim(this.value));
            			if(keywords != $.trim(this.value)){
            				keywords = $.trim(this.value);
            				if(keywords.length > 1){
            					if(!_this.isPanelOpen){
            						_this.openSelectPanel(event);
            					}else{
            						_this.close();
            						_this.openSelectPanel(event);
            					}
            				}else{
            					_this.close();
            				}
            			}
            		});
            	}
            }
        }



        _this.selectList = function(){
             if(_this.params.ajaxData!=''&&typeof _this.params.ajaxData=='function'){
                 if(typeof _this.params.ajaxData=='function'){
                     _this.selectItemHtml = _this.params.ajaxData(1,1);
                 }else{
                     _this.selectItemHtml = _this.params.ajaxData;
                 }
             }else{
                 var selectItemData = [];
                 if(_this.params.data.length>0){
                     selectItemData = _this.params.data;
                 }else{
                     var elementTag = _this.$elm[0];
                     if(elementTag.tagName=='SELECT'){
                         _this.$elm.find('option').each(function(xixi){
                             var value = _this.$elm.find('option').eq(xixi).attr('value');
                             var text  = _this.$elm.find('option').eq(xixi).text();
                                 value = (typeof value!='undefined')?value:text;
                             selectItemData.push({value:value,text:text});
                         });
                     }
                 }

                 var itemHtml = '', selFlag = false;
                 
                 for(var ix=0;ix<selectItemData.length;ix++){
                     if(_this.currData.value!=''&&_this.currData.value==selectItemData[ix].value){
                         itemHtml += '<a href="javascript:;" data-value="' + selectItemData[ix].value + '" data-text="' + selectItemData[ix].text + '" class="' + _this.selectItem + ' Active">' + selectItemData[ix].text + '</a>'
                         selFlag = true;
                     }else {
                         itemHtml += '<a href="javascript:;" data-value="' + selectItemData[ix].value + '" data-text="' + selectItemData[ix].text + '" class="' + _this.selectItem + '">' + selectItemData[ix].text + '</a>'
                     }
                 }
                 //如果selFlag=false 未有选中项，则根据text匹配。 add for liuhualuo
                 if(!selFlag){
                	 itemHtml = '';
                	 for(var ix=0;ix<selectItemData.length;ix++){
                         if(_this.currData.text!='' && _this.currData.text==selectItemData[ix].text){
                             itemHtml += '<a href="javascript:;" data-value="' + selectItemData[ix].value + '" data-text="' + selectItemData[ix].text + '" class="' + _this.selectItem + ' Active">' + selectItemData[ix].text + '</a>'
                             selFlag = true;
                         }else {
                             itemHtml += '<a href="javascript:;" data-value="' + selectItemData[ix].value + '" data-text="' + selectItemData[ix].text + '" class="' + _this.selectItem + '">' + selectItemData[ix].text + '</a>'
                         }
                     }
                 }
                 
                 _this.selectItemHtml = itemHtml;
             }
        }


        _this.openSelectList = function() {
            if (_this.arrowIcon != null&&!_this.params.disabled) {
                _this.arrowIcon.click(function (event) {
                    _this.openSelectPanel(event);
                });
            }
        }

        _this.openSelectPanel = function(event){
            var scrollTop   =  document.documentElement.scrollTop || document.body.scrollTop;
            var elmWidth = _this.selectBody.outerWidth();
            var elmHeight = _this.selectBody.outerHeight();
            var inpWidth = _this.inputVisable.outerWidth();
            var inpHeight = _this.inputVisable.outerHeight();
            var elmPosition = _this.selectBody.offset()
            var inpPosition = _this.inputVisable.offset();
            var winWidth = $(window).width();
            var winHeight = $(window).height();

            var offsetLeft  = 0;
            var offsetRight = 0;
            var offsetTop   = 0;
            var offsetBottom= 0;
            if(_this.params.offsetSize.length==4){
                offsetTop    = _this.params.offsetSize[0];
                offsetRight  = _this.params.offsetSize[1];
                offsetBottom = _this.params.offsetSize[2];
                offsetLeft   = _this.params.offsetSize[3];
            }


            event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
            if(_this.selectBody.hasClass(_this.openClass)){
                _this.close();
                return false;
            }

            // 检查页面上是否已经打开
            if($('.'+_this.openClass).length>0&&$('.'+_this.selectPanelClass).length>0){
                _this.close();
                return false;
            }

            _this.selectList();
            if(_this.selectItemHtml=='') return false;

            _this.params.skinClass  = _this.params.skinClass!=''?' '+_this.params.skinClass:'';

            /**
             * new select panel
             */
            _this.selectPanelMain   = $('<div class="'+_this.selectPanelClass+_this.params.skinClass+'" id="'+_this.selectPanelClass+_this.idCode+'"></div>').appendTo($('body'));
            _this.selectPanelHome   = $('<div class="'+_this.selectPanelClass+'-MainBody"></div>').appendTo(_this.selectPanelMain);
            _this.selectPanelIframe = $('<iframe frameborder="0"></iframe>').appendTo(_this.selectPanelHome);
            _this.selectPanelBody   = $('<div class="'+_this.selectPanelClass+'-Body"></div>').appendTo(_this.selectPanelHome);
            _this.adornTop          = $('<div class="'+_this.selectPanelClass+'-AdornTop"></div>').appendTo(_this.selectPanelBody);
            _this.selectPanelList   = $('<div class="'+_this.selectPanelClass+'-SelectList"></div>').appendTo(_this.selectPanelBody);
            _this.adornBottom       = $('<div class="'+_this.selectPanelClass+'-AdornBottom"></div>').appendTo(_this.selectPanelBody);


            var setWidth  = elmWidth;
            if(_this.params.width>0) setWidth = _this.params.width;

            // set width
            setWidth = setWidth - offsetLeft -offsetRight;
            $(_this.selectItemHtml).appendTo(_this.selectPanelList);
            _this.selectPanelMain.css({width:setWidth});

            // position
            var linWidth  = _this.selectPanelList.innerWidth();
            var louWidth  = _this.selectPanelList.outerWidth(true);
            var linHeight = _this.selectPanelList.innerHeight();
            var louHeight = _this.selectPanelList.outerHeight(true);
            var panHeight = _this.selectPanelList.outerHeight(true);
            var lisWidth  = _this.selectPanelList.width();
            var lisHeight = _this.selectPanelList.height();

            var setHeight = panHeight;
            if(panHeight>_this.params.height) setHeight = _this.params.height;
            setHeight = setHeight-offsetTop-offsetBottom;

            _this.selectPanelMain.css({height:setHeight});
            _this.selectPanelIframe.css({width:setWidth+6,height:setHeight+10});
            _this.selectPanelBody.css({width:setWidth,height:setHeight});

            if($.browser.msie){
                if($.browser.version=='6.0'){
                    setWidth = setWidth - (louWidth-lisWidth);
                    setHeight = setHeight - (louHeight-lisHeight);
                }else if($.browser.version=='7.0'){
                    setWidth = setWidth - (louWidth-lisWidth) + (louWidth-linWidth);
                    setHeight = setHeight - (louHeight-lisHeight);
                    _this.selectPanelBody.css({width:_this.selectPanelBody.width()+2});
                    _this.selectPanelMain.css({width:_this.selectPanelMain.width()+2});
                }
            }

            _this.selectPanelList.css({width:setWidth,height:setHeight});

            if(setHeight+elmPosition.top+elmHeight+offsetTop>scrollTop+winHeight && elmPosition.top>setHeight) _this.elementValign = "xiSelect-Valign-Top";
            if(_this.params.align=='right'){
                _this.elementAlign = "xiSelect-Align-Right";
                if(elmPosition.left+setWidth<_this.params.width) _this.elementAlign = "xiSelect-Align-Left";
            }else{
                if(_this.params.width>winWidth) _this.elementAlign = "xiSelect-Align-Right";
            }

            _this.selectPanelMain.addClass(_this.elementAlign).addClass(_this.elementValign);
            if(!_this.params.arrowIcon){
                _this.adornTop.css({display:'none'});
                _this.adornBottom.css({display:'none'});
            }

            var left = elmPosition.left;
            var top  = elmPosition.top;
            if(_this.elementAlign=='xiSelect-Align-Left'){
                left = left+offsetLeft;
            }else{
                left = left+offsetRight+elmWidth-_this.params.width;
            }

            if(_this.elementValign=='xiSelect-Valign-Bottom'){
                top = top+elmHeight-offsetTop;
            }else{
                top = top-setHeight-offsetBottom;
            }


            _this.selectPanelMain.css({left:left,top:top});
            if(_this.params.styleCSS.length>0) _this.selectPanelMain.css(_this.params.sytleCSS);
            if(_this.elementValign=='xiSelect-Valign-Bottom'){
                _this.selectPanelMain.slideDown(100);
            }else{
                //alert('OK');
                //_this.selectPanelMain.slideUp(100);
            }
            _this.selectBody.addClass(_this.openClass);
            if(_this.params.activeClass!='') _this.selectBody.addClass(_this.params.activeClass);
            _this.isPanelOpen = true;
        }

        _this.moveMouseOver = function(){
            $('#'+_this.selectPanelClass+_this.idCode).live('mouseenter', function(){
                _this.openEnter = false;
            });

            $('#'+_this.selectPanelClass+_this.idCode).live('mouseleave',function(){
                _this.openEnter = true;
            });
        }

        _this.isComboClick = function(){
            if(!_this.params.isCombo&&!_this.params.disabled){
                _this.inputVisable.click(function(event){
                    _this.openSelectPanel(event);
                })
            }
        }

        _this.changeSelect = function(){
            $('a.'+_this.selectItem).live('click',function(event){
                event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
                var parentsID = $(event.target).parents().map(function(){return this.id;}).get().join(",")+'';
                if(parentsID.indexOf(_this.idCode)>-1) {
                	_this.currData.value = $(this).attr('data-value');
                	_this.currData.text = $(this).attr('data-text');
                    $('#' + _this.elementName + _this.idCode).find('#' + _this.elmId + '-text').val(_this.currData.text);
                    $('#' + _this.elementName + _this.idCode).find('#' + _this.elmId).val(_this.currData.value);
                    if(typeof _this.params.onChange=='function'){
                        _this.params.onChange(this);
                    }
                    if(_this.params.changeClose) _this.close();
                }

                return false;
            });
        }
        
        _this.getCurrData = function(){
        	return _this.currData;
        }

        _this.close = function(){
            $('.'+_this.selectPanelClass).remove();
            $('.'+_this.openClass).removeClass(_this.openClass);
            if(_this.params.activeClass!='') $('.'+_this.params.activeClass).removeClass(_this.params.activeClass);
            _this.isPanelOpen = false;
        }

        _this.onClick = function(){
            if(_this.params.changeClose){
                $(document).click(function(){
                    _this.close();
//                    return false;
                });
            }else{
                if(_this.openEnter){
                    $(document).click(function(){
                        _this.close();
//                        return false;
                    });
                }
            }
        }

        _this.init();
    }

    $.xiSelect.defaults = {
        align:'left',
        width:0,
        data:[],
        defaultData:{value:null,text:null},
        ajaxData:{},
        skinClass:'',
        activeClass:'',
        followElement:'',
        offsetSize:[],
        clickClass:'xiSelectItem',
        height:240,
        styleCSS:{},
        isCombo:false,
        arrowIcon:false,
        changeClose:true,
        disabled:false,
        onChange:function(){},
        keySearch:null
    }

    $.fn.xiSelect = function(options){
        return this.each(function(){
            new $.xiSelect(this, options);
        });

        //return new $.xiSelect(this, options);
    }
})(jQuery);