define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
	function Window(){
		this.cfg = {
			width:500,
			height:300,
			content:'',
			btnContent:"确定",
			text4ConfirmBtn:'确定',
			text4CancelBtn:'取消',
			text4PromptBtn:'确定',
			isPromptInputPassword:false,
			defaultValue4PromptInput:'',
			maxLength4PromptInput:10,
			handler4promptBtn:null,
			handler4closeBtn:null,
			handler4alertBtn:null,
			handle4cofirmBtn:null,
			handle4cancelBtn:null,
			hasClosebtn:true,
			skinClass:null,
			hasMask:true,
			isDraggable:true,
			dragHandle:null
		}

	}
	Window.prototype = $.extend({},new widget.Widget(),{
		renderUI:function(){
			
			var footerContent = "";
			switch(this.cfg.winType){
				case 'alert' :
					footerContent = '<button class="btn window-btn">'+this.cfg.btnContent+'</button>';
					break;
				case 'confirm':
					footerContent ='<button class="btn window-confirmBtn">'+this.cfg.text4ConfirmBtn+'</button>'+
									'<button class="btn window-cancelBtn">'+this.cfg.text4CancelBtn+'</button>';
					break;
				case 'prompt':
						this.cfg.content +='<p class ="window_promptInputWrapper"><input type = "'+
						(this.cfg.isPromptInputPassword?"password":"text")+'" value = "'
						+this.cfg.defaultValue4PromptInput+
						'" maxlength= "'+ this.cfg.maxLength4PromptInput+'" class = '+'"window_promptInput"></p>';
						footerContent ='<button class="btn window-promptBtn">'+this.cfg.text4PromptBtn+'</button>'+
									'<button class="btn window-cancelBtn">'+this.cfg.text4CancelBtn+'</button>';
						break;
				
			}
			this.boundingBox = $(
				'<div class="window_boundingBox">'+
					'<div class = "window-head">'+this.cfg.title+"</div>"+
				'</div>');
			if(this.cfg.winType !='common'){
				this.boundingBox.append(
					'<div class = "window-content">'+this.cfg.content+"</div>"+
					'<div class="window-footer">'+footerContent+'</div>'
				)
			}
			if(this.cfg.hasMask){
				this._mask = $("<div class='window-mask'></div>")
				this._mask.appendTo('body').fadeIn(500)
			}if(this.cfg.hasClosebtn){
				var closeBtn = $('<span class="window-closeBtn">X</span>')
				closeBtn.appendTo(this.boundingBox)
			}
			this.boundingBox.appendTo('body').fadeIn(500);
			this._promptInput = this.boundingBox.find('.window_promptInput');
		},
		bindUI:function(){
			var that = this;
			this.boundingBox.on('click',".window-btn",function(){
				that.fire("alert");
				that.destory();
			}).on('click',".window-closeBtn",function(){
				that.fire("close");
				that.destory();
			}).on('click','.window-confirmBtn',function(){
				that.fire("confirm");
				that.destory();
			}).on('click','.window-cancelBtn',function(){
				that.fire("cancel");
				that.destory();
			}).on('click','.window-promptBtn',function(){
				that.fire("prompt",that._promptInput.val());
				that.destory();
			});
			
			if(this.cfg.handler4alertBtn){
				this.on("alert",this.cfg.handler4alertBtn)
			}
			if(this.cfg.handler4closeBtn){
				this.on("close",this.cfg.handler4closeBtn);
			}
			if(this.cfg.handler4confirmBtn){
				this.on("confirm",this.cfg.handler4confirmBtn)
			}
			if(this.cfg.handler4cancelBtn){
				this.on("close",this.cfg.handler4cancelBtn);
			}
			if(this.cfg.handler4promptBtn){
				this.on("prompt",this.cfg.handler4promptBtn);
			}
		},
		syncUI:function(){
			this.boundingBox.css({
				width:this.cfg.width+"px",
				height:this.cfg.height+'px',
				left:(this.cfg.x||(window.innerWidth-this.cfg.width)/2)+'px',
				top:(this.cfg.y||(window.innerHeight-this.cfg.height)/2)+"px"
			});
			if(this.cfg.skinClass){
				this.boundingBox.addClass(this.cfg.skinClass)
			}if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					this.boundingBox.draggable({handle:this.cfg.dragHandle})
				}else{
					this.boundingBox.draggable()
				}
				
			}
		},
		destructor:function(){
			this._mask&&this._mask.remove();
		},

		alert:function(cfg){

			$.extend(this.cfg,cfg,{winType:'alert'});
			this.render();
			console.log("alert组件...")
			return this;
		},
		confirm:function(cfg){
			$.extend(this.cfg,cfg,{winType:'confirm'});
			this.render();
			console.log("confirm组件...")
			return this;
		},
		prompt:function(cfg){
			$.extend(this.cfg,cfg,{winType:'prompt'});
			this.render();
			this._promptInput.focus();
			console.log("prompt组件...")
			return this;
		},
		common:function(cfg){
			$.extend(this.cfg,cfg,{winType:'common'});
			this.render();
			console.log("common组件...")
			return this;
		}
		
	})
	return {Window:Window}
})