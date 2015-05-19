var statisJS = function(){
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
		$('a.ajax-init').click(function(e){
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
		$('a.ajax-data').click(function(e){
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
	
	return {init: function(){
			menuUrl();
			//getDater();
			ajaxUrl();
			ajaxData();
		}
	}
}();

function mFormatResult(record) {
	var markup;
	if(record){
		markup = "<table class='movie-result'><tr>";
		   // if (records.posters !== undefined && records.posters.thumbnail !== undefined) {
		       // markup += "<td class='movie-image'><img src='" + records.posters.thumbnail + "'/></td>";
		   // }
		    markup += "<td class='movie-info'><div class='movie-title'>" + record.merchantName + "</div>";
		    markup += "</td></tr></table>";
	}    
    return markup;
}

function mFormatSelection(records) {
    return records.merchantName;
}

function mctFormatResult(record) {
	var markup;
	if(record){
		markup = "<table class='movie-result'><tr>";
		if(record.merchantName){
			markup += "<td class='movie-info'><div class='movie-title'>" + record.username + "(" + record.merchantName + ")</div>";
		}else {
			markup += "<td class='movie-info'><div class='movie-title'>" + record.username + "</div>";
		}
		    
		markup += "</td></tr></table>";
	}    
    return markup;
}

function mctFormatSelection(record) {
	if(record.merchantName){
    	return record.username + "(" + record.merchantName + ")"; 
	}else{
		return record.username;
	}
	
}
