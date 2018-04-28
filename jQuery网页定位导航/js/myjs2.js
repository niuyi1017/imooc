
function getByClassName(obj,cls){
	var elements = obj.getElementsByTagName("*");
	var result = [];
	
	for (var i = 0; i <elements.length; i++) {
		if(elements[i].className==cls){
			result.push(elements[i]);
		}
	}return result;
	
}

function removeClass(obj,cls){
	obj.className = "";
	
}
function addClass(obj,cls){
	obj.className = cls;
}

window.onload = function(){
	window.onscroll = function(){
		var top = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
		var menu = document.getElementById("menu").getElementsByTagName("a");
		var items = getByClassName(document.getElementById("content"),"item");
		
		var currentId = '';
		
		for (var i = 0;i<items.length;i++) {
			var _item = items[i];
			var _itemTop = _item.offsetTop;
			if(top>_itemTop-300){
				currentId = _item.id;
			}else{
				break;
			}
		}
		
		
		if(currentId){
			for(var j = 0;j<menu.length;j++){
				var _menu = menu[j];
				var _menuHref = _menu.href.split('#');
				if(_menuHref[_menuHref.length-1]!=currentId){
					removeClass(_menu,"current");
				}else{
					addClass(_menu,"current");
				}
			}
		}
		
		
	}
}
