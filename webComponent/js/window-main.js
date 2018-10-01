require.config({
	paths:{
		jquery:'jquery-3.3.1',
		jqueryUI:"https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui"
	}
})
require(['jquery','window'],function($,w){
	$('#a').click(function(){
		new w.Window().alert(
		{	
			title:'系统消息',
			content:"hello world",
			btnContent:"朕已阅~",
			width:300,
			height:150,
			y:50,
			skinClass:"window-skin-a",
			isDraggable:true,
			dragHandle:".window-head",
			handler4closeBtn:function(){
				console.log("closeBtn clicked")
			},
			handler4alertBtn:function(){
			console.log("btn clicked")},
		});
	})
	
})
