;$(function()
{
	'use strict';
	var sidebar = $('#sidebar'),
		mask=$('.mask'),
		backbutton=$('.back-to-top'),
		sidebar_trigger= $('#sidebar_trigger');
	
	function showSideBar()
	{
		mask.fadeIn();
		sidebar.css('right',0);
	}
	function hideSideBar()
	{
		mask.fadeOut();
		sidebar.css('right',-sidebar.width());
	}
	
	sidebar_trigger.on('click',showSideBar);
	mask.on('click',hideSideBar); 
	backbutton.on('click',function(){
		$('html,body').animate({
			scrollTop:0
		},1000);
	}) ;
	$(window).on('scroll',function(){
		if ($(window).scrollTop() > $(window).height())
		backbutton.fadeIn();
		else
		backbutton.fadeOut();
	});
//	$(window).trigger('scroll');
})

