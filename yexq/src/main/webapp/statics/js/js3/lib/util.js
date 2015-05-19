(function($) {
	jQuery.msgBox = {
		alert : function(msg) {
			showDialog(msg,'alert');
		},
		info : function(msg) {
			showDialog(msg,'info');
		},
		error : function(msg) {
			showDialog(msg,'error');
		},
		question : function(msg,callback) {
			showQuestion(msg,callback);
		},
		confirm : function(msg,callback) {
			showConfirm(msg,callback);
		},
		confirmOK:function(msg,callback){
			showConfirmOK(msg,callback);
		}
	};
	var dialogDiv = function(msg){
		var $div = $("#_dialog_message");
		if($div.length==0){
			$div = $("<div id='_dialog_message' style='display: none;'  title='消息'><p></p></div>");
			$div.appendTo($('body'));
		}
		$div.find('p').html(msg);
		return $div;
	}
	
	var showDialog = function(msg,type){
		dialogDiv(msg).dialog({
			modal: true,
			width : 300,
			height:185,
			position :'center',
			buttons: {
				'确定': function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}
	
	var showConfirm = function(msg, callback) {
		dialogDiv(msg).dialog({
					width : 300,
					modal : true,
					position :'center',
					buttons : {
						"确定" : function() {
							$(this).dialog('close');
							callback(true);
						},"取消" : function() {
							$(this).dialog('close');
							callback(false);
						}
					}
				});
	}
	var showQuestion = function(msg, callback) {
		dialogDiv(msg).dialog({
					width : 300,
					modal : true,
					position :'center',
					buttons : {
						"是" : function() {
							$(this).dialog('close');
							callback(true);
						},"否" : function() {
							$(this).dialog('close');
							callback(false);
						}
					}
				});
	}
	var showConfirmOK = function(msg,callback){
		dialogDiv(msg).dialog({
				width : 300,
				modal : true,
				position :'center',
				beforeClose:function(){
					callback();
				},
				buttons : {
					"确定" : function() {
						$(this).dialog('close');
					}
				}
			});
	}
	var dateFormateUtil =function(val) {
		if (typeof(val) == 'string') {
			return val;
		} else {
			var date = new Date();
			date.setTime(val.time);
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
	
			if (month < 10 && day < 10) {
				return year + "-0" + month + "-0" + day;
			}
			if (month < 10 && day >= 10) {
				return year + "-0" + month + "-" + day;
			}
			if (month >= 10 && day < 10) {
				return year + "-" + month + "-0" + day;
			} else {
				return year + "-" + month + "-" + day;
			}
		}
	};
	jQuery.apply = function(o, c, defaults){
	    // no "this" reference for friendly out of scope calls
	    if(defaults){
	        $.apply(o, defaults);
	    }
	    if(o && c && typeof c == 'object'){
	        for(var p in c){
	            o[p] = c[p];
	        }
	    }
	    return o;
	};
	jQuery.pageSize= 20;  // 每页几条数据
	
	jQuery.formatMoney= function(number, places, symbol, thousand, decimal) {
        number = number || 0;
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "￥";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    }
    
    //加载数据
    jQuery.loadData= function(url,params,callback){
		$.ajax({
				url : url,
				cache : false,
				type: "POST",
				data :params,
				dataType:"json",
		        beforeSend:function(XMLHttpRequest){
		        },
				success : function(data) {
					callback(data.succ,data.option,data.msg);
				},
	           complete:function(XMLHttpRequest,textStatus){
	           },
	           error:function(XMLHttpRequest,textStatus,errorThrown){
	           }
			});
	}
	//判断是否是整数     
	 jQuery.isNum= function(number) {    
	 	if(!number){
	 		return false;
	 	}
        if (!/^\d+$/.test(number)) { 
            return false;    
        }    
	    return true;    
	} 
	 jQuery.isPosNum= function(number) {    
	 	if(!number){
	 		return false;
	 	}
        if (! /^\+?[1-9][0-9]*$/.test(number)) { 
            return false;    
        }    
	    return true;    
	} 
	 jQuery.praseQueryUrl= function(obj) {
	 	var queryString="";
	 	var i=0;
	 	for(var key in obj){
	 		if(i==0){
	 			queryString +=key+"="+obj[key];
	 		}else{
	 			queryString +="&"+key+"="+obj[key];
	 		}
	 		i++;
	 	}
	 	return queryString;
	}
	jQuery.pageX=null;//鼠标x位置
	jQuery.pageY=null;//鼠标y位置
	var originOpen = $.ui.dialog.prototype.open 
	$.ui.dialog.prototype.open = function() { 
		//var event= window.event || arguments.callee.caller.arguments[0]; 
		//var event = event || window.event; 
		var position ="point";
		if(this.options.position){
			position = this.options.position;
		}
		var event = getEvent(); 
		//alert(event) // ie 和 ff下，都显示 "[object]" 
		var PosX = document.body.scrollWidth/2; 
		var PosY = document.body.scrollHeight/2;
		
		var availHeight = window.screen.availHeight;
		if($.pageX){
			PosX = $.pageX; 
			PosY = $.pageY; 
		}else if (event.pageX || event.pageY) { 
			PosX = event.pageX; 
			PosY = event.pageY; 
		} 
		else { 
			if(event.clientX){
				PosX = event.clientX + document.body.scrollLeft - document.body.clientLeft;	
			}
			if(event.clientY){
				PosY = event.clientY + document.body.scrollTop - document.body.clientTop;	
			}
		};
		if(this.options.width){
			PosX = PosX - this.options.width/2;
		}
		if(position=='center'){
			PosX = window.screen.availWidth/2- this.options.width;
			PosY = window.screen.availHeight/2+getRootScrollTop()-150;
		}
		this.options.position = [PosX, PosY]; 
		originOpen.apply(this, arguments); 
	}; 

	function getEvent() { //同时兼容ie和ff的写法 
		if (document.all) return window.event; 
		func = getEvent.caller; 
		while (func != null) { 
			var arg0 = func.arguments[0]; 
			if (arg0) { 
				if ((arg0.constructor == Event || arg0.constructor == MouseEvent) 
				|| (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) { 
					return arg0; 
				} 
			} 
			func = func.caller; 
		}
		return null; 
	}
	jQuery.compareDate=function(date1,date2,differ,unit){
		var datetime1;
		var datetime2;
		if(!date1 || date1 == undefined){
			return "";
		}
		
		if(!date2 || date2 == undefined){
			return "";
		}
		if($.type(date1) === "number"){
			datetime1 = date1;
		}else{
			datetime1 = date1.getTime();
		}
		
		if($.type(date2) === "number"){
			datetime2 = date2;
		}else{
			datetime2 = date2.getTime();
		}
		
		if(differ){
			if(unit=='day'){
				datetime2 +=differ*24*60*60*1000;
			}else if(unit=='hour'){
				datetime2 +=differ*60*60*1000;
			}else {
				//默认秒
				datetime2 +=differ*1000;
			}
		}
		if(datetime1>datetime2){
			return 1;
		}else if(datetime1==datetime2){
			return 0;
		}else{
			return -1;
		}
	}
})(jQuery);

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//加载数据字典
function loadDicCache(listkey,listparentid,callback){
		$.ajax({
				url : BASE_PATH + "/dic/getDicList.action",
				cache : false,
				type: "POST",
				data :{
					listkey : listkey,
					listparentid : listparentid
				},
				dataType:"json",
				success : function(data) {
					callback(data.succ,data.option,data.msg);
				}
			});
}

$.extend({
	tmpl: function(template, data){
	        return doT.template(template).apply(null,[data]);
	},
	tmplDiv: function(div,tpl, data){
			$('#'+div).html($.tmpl($('#'+tpl).html(),data));
	}
});

$(document).bind("mouseover",function(e){
	//这里可得到鼠标X坐标
	var pointX = e.pageX;
	//这里可以得到鼠标Y坐标
	var pointY = e.pageY;
	$.pageX = pointX;
	$.pageY = pointY;
});

function getRootWin(){  
     var win = window;  
     while (win != win.parent){  
         win = win.parent;  
     }  
     return win;  
} 
function getRootScrollTop(){
	var win = getRootWin();
	var scrollTop;
	if(typeof win.pageYOffset != 'undefined'){//pageYOffset指的是滚动条顶部到网页顶部的距离
        scrollTop = win.pageYOffset; 
    }else if(typeof win.document.compatMode != 'undefined' && win.document.compatMode != 'BackCompat'){ 
        scrollTop = win.document.documentElement.scrollTop; 
    }else if(typeof win.document.body != 'undefined'){ 
        scrollTop = win.document.body.scrollTop; 
    }
    return scrollTop
}