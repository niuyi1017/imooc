function g(selector){
	var method = selector.substr(0,1) == '.' ? 'getElementsByClassName':'getElementById';
	
	return document[method](selector.substr(1));
}

function random(range){
	var max = Math.max(range[0],range[1]);
	var min = Math.min(range[0],range[1]);
	var diff = max-min;
	var number = Math.ceil( (Math.random()*diff + min ));
	
	return number;
}
var data = data;

function addPhotos(){
	var template = g('#wrap').innerHTML;
	var html = [];
	var nav = [];
	
	for ( s in data){
		var _html = template
							.replace('{{index}}',s)
							.replace('{{img}}',data[s].img)
							.replace('{{caption}}',data[s].caption)
							.replace('{{desc}}',data[s].desc);
		html.push(_html);
		
		nav.push('<span id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))" class="i fa fa-2x fa-heart fa-fw"></span>');
		
	}
	html.push('<div class="nav">'+nav.join('')+'</div>');
	g('#wrap').innerHTML = html.join("");
	rsort( random([0,data.length]) )
}
addPhotos();

function range(){
	
	var range = { left: { x:[] , y:[] } , right: { x:[] , y:[] }};
	var wrap={
		
		w:g('#wrap').clientWidth,
		h:g('#wrap').clientHeight
	}
	var photo = {
		w:g('.photo')[0].clientWidth,
		h:g('.photo')[0].clientHeight
	}
	range.wrap = wrap;
	range.photo = photo;
	range.left.x = [0-photo.w, wrap.w/2-photo.w/2 ];
	range.left.y = [0-photo.h,wrap.h];
	range.right.x = [wrap.w/2+photo.w/2 , wrap.w+photo.w];
	range.right.y = range.left.y;
	
	return range;
}

function rsort( n ){
	var _photos = g('.photo');
	var photos=[];
	
	for (var s=0;s<_photos.length;s++){
		_photos[s].className=_photos[s].className.replace(/\s*photo_center\s*/,'');
		_photos[s].className=_photos[s].className.replace(/\s*photo_front\s*/,'');
		_photos[s].className=_photos[s].className.replace(/\s*photo_back\s*/,'');
		_photos[s].className+=' photo_front';
		_photos[s].style.left='';
		_photos[s].style.top='';
		_photos[s].style['-webkit-transform']='rotate(0deg) scale(1.2)';
		
		photos.push(_photos[s]);
	}
	
	var photo_center = g('#photo_'+n);
	photo_center.className +=' photo_center' 
	photo_center = photos.splice(n,1)[0];
	var photos_left = photos.splice(0,Math.ceil(photos.length/2));
	var photos_right = photos;
	var ranges =range();
	for (s in photos_left){
		var photo = photos_left[s];
		photo.style.left=random(ranges.left.x) + 'px';
		photo.style.top=random(ranges.left.y) + 'px';
		photo.style['-webkit-transform'] = 'rotate('+random([-360,360])+'deg) scale(1)';
		
	}
	
	for (s in photos_right){
		var photo = photos_right[s];
		photo.style.left=random(ranges.right.x) + 'px';
		photo.style.top=random(ranges.right.y) + 'px';
		photo.style['-webkit-transform'] = 'rotate('+random([-360,360])+'deg) scale(1)';
		
		
	}
	
	var navs = g('.i');
	for(var s=0;s<navs.length; s++ ){
		navs[s].className = navs[s].className.replace(/\s*i_current\s*/,' ');
		navs[s].className = navs[s].className.replace(/\s*i_back\s*/,' ');
		
	}
	g('#nav_'+n).className+= ' i_current ';
	
	//	console.log(photos_left.length,photos_rght.length);
}


function turn (elem){
	var cls = elem.className;
	var n = elem.id.split('_')[1];
	if(!/photo_center/.test(cls)){
		return rsort(n);
	}
	if(/photo_front/.test(cls)){
		cls = cls.replace(/photo_front/,'photo_back');
		g('#nav_'+n).className+='i_back';
	}
	else{
		cls = cls.replace(/photo_back/,'photo_front');
		g('#nav_'+n).className=g('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
	}
	return elem.className = cls
}
