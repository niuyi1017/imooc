;(function($){
	
	var Tab = function(tab){
		
		var _this = this;
		this.tab = tab;
		this.config = {
			"triggerType":"click",
			"effect":"default",
			"invoke":2,
			"auto":5000
		}
		if(this.getConfig()){
			$.extend(true, this.config,this.getConfig());
		}
		
		this.tabItems = this.tab.find(".ui-tab-nav li");
		this.contentItems = this.tab.find(".ui-tab-content-wrap .ui-tab-content-item");
		
		var config = this.config;
		
		if(config.triggerType === "click"){
			this.tabItems.bind("click",function(){
				_this.invoke($(this));
//				console.log($(this));
			})
		}else if(config.triggerType === "mouseover"||config.triggerType != "click"){
			this.tabItems.on("mouseover",function(){
				_this.invoke($(this));
			});
		}
		
		
		if(config.auto){
			this.timer  = null;
			this.loop = 0;
			this.autoPlay();
			
			this.tab.hover(function(){
				window.clearInterval(_this.timer);
			},function(){
				_this.autoPlay();
			});
		}
		
		if(config.invoke>1){
			this.invoke(this.tabItems.eq(config.invoke-1));
		}
		
		
		
	}
	Tab.prototype = {
		getConfig :function(){
			var config = this.tab.attr("data-config");
			
			if(config&&config!=""){
				return $.parseJSON(config);
			}else{
				return null;
			}
		},
		invoke:function(currentTab){
			var _this = this;
			currentTab.addClass("ui-tab-nav-actived").siblings().removeClass("ui-tab-nav-actived");
			var index = currentTab.index();
			var effect = this.config.effect;
			var conItems = this.contentItems;
			if(effect === "default"||effect != "fade"){
//				alert(conItems.eq(index))
				conItems.eq(index).addClass("current").siblings().removeClass("current");
			}else if(effect === "fade"){
				conItems.eq(index).fadeIn().siblings().fadeOut();
			}
			
			if(this.config.auto){
				this.loop = index;
			}
			
		},
		autoPlay:function(){
			var _this = this;
			var tabItems = this.tabItems;
			var tabLength = tabItems.length;
			var config = this.config;
			
			this.timer = window.setInterval(function(){
				_this.loop++;
				if(_this.loop>=tabLength){
					_this.loop = 0;
				}
				tabItems.eq(_this.loop).trigger(config.triggerType);
			},config.auto);
		}
		
		
		
	};
	Tab.init = function(tabs){
			var _this = this;
			tabs.each(function(){
				new _this($(this));
			});
	}
	
	$.fn.extend({
		tab:function(){
			this.each(function(){
				new Tab($(this));
			});
			return this;
		}
	});
	
	window.Tab = Tab; 
})(jQuery);
