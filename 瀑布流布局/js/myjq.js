$(window).on('load',function(){
	
	waterfall();
	var dataInt = {"data":[
		{ "src":'http://imooc.niuy.xyz/%E7%85%A7%E7%89%87%E5%A2%99/blog648ac377gy1fw3cjyhh57j21kw1bob29.jpg'},
		{ "src":'http://imooc.niuy.xyz/%E7%85%A7%E7%89%87%E5%A2%99/blog648ac377gy1fw3cjxy8e9j21kw0w0kfb.jpg'},
		{ "src":'http://imooc.niuy.xyz/%E7%85%A7%E7%89%87%E5%A2%99/blog648ac377gy1fw3ck0h513j21jk0v9kjl.jpg'}
						]
					}
	$(window).on('scroll',function(){
		if(checkScrollSlide()){
			$.each(dataInt.data, function(key,value) {
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo(oBox);
				var oImg = $('<img>').attr('src',$(value).attr('src')).appendTo(oPic)
			});
			waterfall();
		}
	})
	window.resize = function(){
		waterfall();
	}
})

function waterfall(){
	var $boxs = $('#main>div');
	var w = $boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');
	
	var hArr = [];
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index] = h;
			$(value).css({"position":"absolute","top":0,"left":index*w})
		}
		else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);
			
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w + 'px'
			})
		}hArr[minHIndex]+=$boxs.eq(index).outerHeight();
	})
}
function checkScrollSlide(){
	var $lastBox = $('#main>div').last();
	var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	
	return(lastBoxDis<scrollTop+documentH)?true:false;
}
