var data = ['靳悦是猪','靳悦很二','靳悦250','靳悦很萌'];
var timer = null;
var flag = 0;
window.onload = function(){
	var play = document.getElementById('play'),
		stop = document.getElementById('stop');
		
	play.onclick = playFun;
	stop.onclick = stopFun;
	document.onkeyup = function(event){
		event = event||window.event;
		if(event.keyCode==13){
			if(flag==0){
				playFun();
				flag = 1;
			}
			else{
				stopFun();
				flag = 0;
			}
		}
	}
	
}
function playFun(){
	var title = document.getElementById('title');
	var play = document.getElementById('play');
	clearInterval(timer);
	timer = setInterval(function(){
		var random = Math.floor(Math.random()*data.length);
		title.innerHTML = data[random];
	},50);
	play.style.background = '#999';
}
function stopFun(){
	clearInterval(timer);
	var play= document.getElementById('play');
	play.style.background = '#003366'
}
