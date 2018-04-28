function $(id){
	return typeof id ==='string'?document.getElementById(id):id;
}
window.onload = function(){
	var tits = $('notice-tit').getElementsByTagName('li'),
		divs = $('notice-con').getElementsByTagName('div');
	
	if(tits.length!=divs.length)
	return;
	for(var i=0;i<tits.length;i++){
			tits[i].id=i;
			tits[i].onmouseover = function(){
			for(var j=0;j<tits.length;j++){
				tits[j].className='';
				divs[j].style.display='none'
				
			}
			this.className='select';
			divs[this.id].style.display='block';
			}
		}
}

