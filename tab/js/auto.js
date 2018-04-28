function $(id){
	return typeof id ==='string'?document.getElementById(id):id;
}
window.onload=tab;

function tab(){
	var index =0;
	var timer = null;
	
	var lis = $('notice-tit').getElementsByTagName("li"),
		divs = $('notice-con').getElementsByTagName("div");
		
	if(lis.length!=divs.length) return;
	
	for (var i = 0; i < lis.length; i++) {
		lis[i].id=i;
		lis[i].onmouseover=function(){
			clearInterval(timer);
			changeOption(this.id);
		}
		lis[i].onmouseout = function(){
			timer = setInterval(autoPlay,1000);
		}
	}
	if(timer){
		clearInterval(timer);
		timer=null;
	}
		
	timer = setInterval(autoPlay,1000);
	
	function autoPlay(){
		
			index++;
			if(index>=lis.length)
				index=0;
			changeOption(index);
			
	}
	
	function changeOption(curIndex){
		for (var i=0;i<lis.length;i++) {
			lis[i].className='';
			divs[i].style.display='none';
		}
		lis[curIndex].className='select';
		divs[curIndex].style.display='block';
		index=curIndex;
	}
}

