require.config({
	paths:{
		jquery:'jquery-3.3.1',
		jqueryUI:"https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui"
	}
})
require(['jquery','window'],function($,w){
	$('#alert').click(function(){
		var win =  new w.Window()		
		win.alert(
		{
			title:'系统消息',
			content:"hello world",
			btnContent:"朕已阅~",
			width:300,
			height:150,
			y:50,
			skinClass:"window-skin-b",
			isDraggable:true,
			dragHandle:".window-head",
			handler4closeBtn:function(){
				console.log("handler4closeBtn：closeBtn clicked")
			},
			handler4alertBtn:function(){
				console.log("handler4alertBtn：alter btn clicked")},
		});
		win.on("alert",function(){
			console.log("Win on:alert btn clicked ")
		}).on("close",function(){
			console.log("Win on:alert close btn clicked")
		})
	});
	
	$('#confirm').click(function(){
		var win = new w.Window();
		win.confirm({
			title:'系统消息',
			content:"hello world",
			btnContent:"朕已阅~",
			width:300,
			height:150,
			y:50,
			skinClass:"window-skin-b",
			isDraggable:true,
			dragHandle:".window-head",
			handler4closeBtn:function(){
				console.log("handler4closeBtn：confirm closeBtn clicked")
			},
			
		}).on('confirm',function(){
			console.log("confirmed!");
		}).on('cancel',function(){
			console.log("canceled!")
		});
	});
	
	$('#prompt').click(function(){
		var win = new w.Window();
		win.prompt({
			title:'系统消息',
			content:"hello world",
			btnContent:"朕已阅~",
			width:300,
			height:150,
			y:50,
			defaultValue4PromptInput:'niuyi',
			skinClass:"window-skin-a",
			isDraggable:true,
			dragHandle:".window-head",
			
			handler4promptBtn:function(inputValue){
				console.log("handler4promptBtn：你输入的值为 "+inputValue)
			},
			
		}).on('confirm',function(){
			console.log("prompt confirmed!");
		}).on('cancel',function(){
			console.log("prompt canceled!")
		});
	});
	
	
	$('#common').click(function() {
		
		var win = new w.Window()
		win.common ({
			title:'系统消息',
			content:"hello world",
			width:300,
			height:150,
			y:50,
		})
	})
	
})
