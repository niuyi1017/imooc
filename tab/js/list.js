function $(id){
	return typeof id ==='string'?document.getElementById(id):id;
}
window.onload = function(){
	var ps = $('menu').getElementsByTagName('p'),
		uls = $('menu').getElementsByTagName('ul'),
		lis = $('menu').getElementsByTagName('li'),
		spans=$('menu').getElementsByTagName('span');
	 
	for(var i=0;i<ps.length;i++){
			ps[i].id=i;
			ps[i].onclick = function(){

			if(this.className=='select'){
				this.className='none';
			}
			else
				this.className='select';
			if(uls[this.id].style.display=='none')
				{
					uls[this.id].style.display='block';
					for(var p= 0;p<lis.length;p++){
						lis[p].id=p;
						lis[p].onmouseover = function(){
							spans[this.id].style.display='block';
						}
						lis[p].onmouseout = function(){
							spans[this.id].style.display='none';
					}
				}
			}	
			else
				uls[this.id].style.display='none';
			}
		}
}
