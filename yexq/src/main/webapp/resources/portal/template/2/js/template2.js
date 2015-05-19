/** Template JS**/
var PTPL_MAX_WIDTH;
var MAX_WIDTH_INIT = 800;
var MAX_SCALE;

function MyTemplate(){
	this.SliderTime = null;
	this.SliderIndex = -1;
	this.sliderItem = 0;
	this.loadingTime = 5;
	this.loadingTimeAlert = null;

	
	this.PlaySlider = function(){
		this.SliderIndex++;
		if(this.SliderIndex>this.sliderItem-1) this.SliderIndex = 0;
		this.loadSlider(this.SliderIndex);
		this.SliderTime = window.setTimeout(this.PlaySlider, 5000);
	}
	
	this.loadSlider = function(k){
		$('div.sliderItem').each(function(x){
			if(x==k){
				$('div.sliderItem').eq(x).fadeIn();
				$('div#sliderNaviList a').eq(x).addClass('active');
			}else{
				$('div.sliderItem').eq(x).fadeOut();
				$('div#sliderNaviList a').eq(x).removeClass('active');
			}
		});
	}
	
	this.resetSlider = function(){
		var height = Math.ceil((PTPL_MAX_WIDTH/3)*2);
		var button = Math.ceil((height-120)/2);
		var naviwidth  = 0;
		this.SliderTime = null;
		this.SliderIndex = -1;
		    
		$('a.sliderBrowse').css({top:button,width:MAX_SCALE*58,height:MAX_SCALE*120,'background-size':MAX_SCALE*58+'px '+MAX_SCALE*120+'px'});
		$('div#siteSliderModuleBox').height(height);
		$('div#sliderNaviList').html('');
		for(i=0;i<sliderItem;i++){
			$('div#sliderNaviList').append('<a href="javascript:;">&nbsp;</a>');
			naviwidth +=21;
		}
		
		//
		$('div.sliderNavigator').width(naviwidth+10).css({left:(PTPL_MAX_WIDTH-naviwidth-10)/2});
		
		// 
		$('a#sliderToPrev').unbind('click');
		$('a#sliderToPrev').click(function(){
			window.clearTimeout(this.SliderTime);
			this.SliderIndex = this.SliderIndex-1;
			if(SliderIndex<0) SliderIndex = sliderItem-1;
			this.loadSlider(this.SliderIndex);
			this.SliderTime = window.setTimeout(this.PlaySlider, 5000);
		});
		
		$('a#sliderToNext').unbind('click');
		$('a#sliderToNext').click(function(){
			window.clearTimeout(this.SliderTime);
			this.SliderIndex = this.SliderIndex+1;
			if(this.SliderIndex>=this.sliderItem) this.SliderIndex = 0;
			this.loadSlider(this.SliderIndex);
			this.SliderTime = window.setTimeout(this.PlaySlider, 5000);
		})
		
		$('div#sliderNaviList a').unbind('click');
		$('div#sliderNaviList a').click(function(){
			window.clearTimeout(this.SliderTime);
			this.SliderIndex = $(this).prevAll().length;
			this.loadSlider(this.SliderIndex);
			this.SliderTime = window.setTimeout(this.PlaySlider, 5000);
		});
	}
	
	this.resetImageText = function(){
		var imwidth = 100*MAX_SCALE;
		var liwidth = Math.ceil(imwidth);
		var width   = $('div#siteImageTextModuleBox').width()/2;
			$('div#siteImageTextModuleBox img').css({width:imwidth,height:imwidth});
			$('div#siteImageTextModuleBox div').css({height:imwidth+20});
			$('div#siteImageTextModuleBox dd').width(width-imwidth-31);
			$('div#siteImageTextModuleBox span').width(width-imwidth-31);
			if(width-liwidth-31<160){
				$('div#siteImageTextModuleBox span').fadeOut();
			}else{
				$('div#siteImageTextModuleBox span').fadeIn();
			}
	}
	
	this.resetProductList = function(){
		var imwidth = 100*MAX_SCALE;
		var liwidth = Math.ceil(imwidth);
		var width   = $('div#siteProductListModuleBox').width()/2;
		$('div#siteProductListModuleBox img').css({width:imwidth,height:imwidth});
		$('div#siteProductListModuleBox div').css({height:imwidth+20});
		$('div#siteProductListModuleBox dd').width(width-imwidth-31);
		$('div#siteProductListModuleBox span').width(width-imwidth-31);
		if(width-liwidth-10<160){
			$('div#siteProductListModuleBox span').fadeOut();
		}else{
			$('div#siteProductListModuleBox span').fadeIn();
		}
	}
	
	this.loadingEnterTime = function(){
		window.clearTimeout(this.loadingTimeAlert);
		this.loadingTime = this.loadingTime-1;
		$('div#loadingTimeText').html('请等待'+this.loadingTime+'秒钟');
		this.loadingTimeAlert = window.setTimeout(this.loadingEnterTime, 1000);
	}
	
	this.loadingEnter = function(){
		if($('div#siteLoadingModuleBox').length>0&&$('div#siteLoadingModuleBox img').length>0){
			var height = $("div.portalTemplateBody").height();
			$('div.loadingTimeTip').css({left:(PTPL_MAX_WIDTH-100)/2,top:10})
			$('div#siteLoadingModuleBox').css({height:height,width:PTPL_MAX_WIDTH}).show();
			
			//
			this.loadingEnterTime();
			var overlyTime = window.setTimeout(function(){
				$('div#siteLoadingModuleBox').fadeOut();
				window.clearTimeout(this.loadingTimeAlert);
				window.clearTimeout(overlyTime);
			}, this.loadingTime*1000);
		}
	}
	
	this.userMenuList = function(){
		if($('div#siteHeaderModuleBox').length>0){
			$('body').unbind('mouseup');
			$('body').mouseup(function(){
				if(!$('div.userActiveMenu').is(':hidden')) $('div.userActiveMenu').fadeOut();
			});
			
			$('div#siteHeaderModuleBox a.siteMenu').unbind('click');
			$('div#siteHeaderModuleBox a.siteMenu').click(function(){
				if($('div.userActiveMenu').is(':hidden')){
					$('div.userActiveMenu').fadeIn();
				}else{
					$('div.userActiveMenu').fadeOut();
				}
			});
		}
	}
	
	this.imageSpanBlock = function(){
		if($('div#siteImageSpanModule').length>0){
			var width = $('div#siteImageSpanModule ul li').eq(0).width()-5;
			$('div#siteImageSpanModule img').height(width);
			$('div#siteImageSpanModule div.imageSpanTitle').width(width);
		}
	}
	
	this.contentImageside = function(){
		if($('div.contentImage').length>0){
			$('div.contentImage').height(PTPL_MAX_WIDTH/2)
		}
	}
	
	this.getMaxWidth = function(){
		PTPL_MAX_WIDTH = $('div.portalTemplateBody').width();
		MAX_SCALE  = PTPL_MAX_WIDTH/MAX_WIDTH_INIT;
		this.sliderItem = $('div.sliderItem').length;
	}
	
	init = function(){
		if(this.SliderTime!=null) window.clearTimeout(this.SliderTime);
		if(this.loadingTimeAlert!=null) window.clearTimeout(this.loadingTimeAlert);
		this.getMaxWidth();
		this.resetSlider();
		this.PlaySlider();
		this.loadingEnter();
		this.resetImageText();
		this.userMenuList();
		this.contentImageside();
		this.resetProductList();
		this.imageSpanBlock();
	}
}