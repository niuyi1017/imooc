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
			})
		}
		
		console.log(this.config);
		
	}
	Tab.prototype = {
		getConfig :function(){
			var config = this.tab.attr("data-config");
			console.log(config);
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
			
		}
		
	};
	window.Tab = Tab; 
})(jQuery);
