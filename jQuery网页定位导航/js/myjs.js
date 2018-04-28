$(function(){
	$(window).scroll(function(){
			
		
		
		var top = $(document).scrollTop();
		var menu = $('#menu');
		var items = $('#content').find(".item");
		
		
		
		
		var currentId = "";
		items.each(function(){
			var that = $(this);
			var itemTop = that.offset().top;
			
			if (top>itemTop-300) {
				currentId = '#'+that.attr("id");
			} else{
				return false;
			}
		});
		 var currentLink = menu.find('.current');
		 if(currentId&&currentLink.attr('href')!=currentId){
		 	currentLink.removeClass('current');
		 	menu.find('[href ='+currentId+']').addClass('current');
		 }
		
	});
});