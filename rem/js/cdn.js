!function(){
	var body = $('body');
	var mask = $('<div></div>')
	mask.css({
		"position":'absolute',
		"background":"rgba(0,0,0,0.5)",
		"top":"0",
		"bottom":"0",
		"left":"0",
		"right":"0",
		"color":'red',
		"font-size":'48px',
		"z-index":"100"
		
	});
	mask.html("警告12346546");
	body.append(mask);
	
}()
