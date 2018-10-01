define(['jquery','jqueryUI'],function($,$UI){
	function Window(){
		this.cfg = {
			width:500,
			height:300,
			content:'',
			btnContent:"确定",
			handler4closeBtn:null,
			handler4alertBtn:null,
			hasClosebtn:true,
			skinClass:null,
			hasMask:true,
			isDraggable:true,
			dragHandle:null
		}
	}
	Window.prototype = {
		alert:function(cfg){
			var CFG = $.extend(this.cfg,cfg);
			var mask = null;
			if(CFG.hasMask){
				mask = $("<div class='window-mask'></div>")
				mask.appendTo('body')
			}
			var boundingBox = $(
				'<div class="window_boundingBox">'+
					'<div class = "window-head">'+CFG.title+"</div>"+
					'<div class = "window-content">'+CFG.content+"</div>"+
					'<button class="window-btn">'+CFG.btnContent+'</button>'+
			'</div>')
			
			boundingBox.appendTo('body')
			if(CFG.hasClosebtn){
				var closeBtn = $('<span class="window-closeBtn">X</span>')
				closeBtn.appendTo(boundingBox)
				closeBtn.click(function(){
					CFG.handler4closeBtn&&CFG.handler4closeBtn();
					mask.remove()
					boundingBox.remove()
				})
			}
			if(CFG.skinClass){
				boundingBox.addClass(CFG.skinClass)
			}
			if(CFG.isDraggable){
				if(CFG.dragHandle){
					boundingBox.draggable({handle:CFG.dragHandle})
				}else{
					boundingBox.draggable()
				}
				
			}
			var btn = boundingBox.find("button");
			btn.click(function(){
				CFG.handler4alertBtn&&CFG.handler4alertBtn();
				mask.remove()
				boundingBox.remove()
			})
			$.extend(this.cfg,cfg);
			boundingBox.css({
				width:this.cfg.width+"px",
				height:this.cfg.height+'px',
				left:(this.cfg.x||(window.innerWidth-this.cfg.width)/2)+'px',
				top:(this.cfg.y||(window.innerHeight-this.cfg.height)/2)+"px"
			})
			
			console.log("alert...")
		},
		confirm:function(){},
		prompt:function(){}
	}
	return {Window:Window}
})