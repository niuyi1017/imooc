var WINDOW_HEIGHT = 500
var WINDOW_WIDTH = 1024
var RADIUS = 8

var D_RADIUS = 8
var MARGIN_TOP = 200
var MARGIN_LEFT = 30
const endTime = new Date(2018,11,22,09,00)
var curShowTimeSeconeds = 0

var balls = []
var colors = ["#1abc9c",'#33B5E5','#0099CC','#AA66CC','#99CC00','#690','#FB3','#F80','#F44',"#C00",'#93C']
var Timer =null;

window.onload = function(){
	
	WINDOW_HEIGHT = document.body.clientHeight
	WINDOW_WIDTH = document.body.clientWidth
	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10)
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1
	
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/12)
	var day = document.getElementById('day');
	D_RADIUS = Math.round(day.offsetWidth*4/5/30);
	console.log(D_RADIUS)
	var canvas = document.getElementById('canvas')
	var context = canvas.getContext('2d')
	
	var dayCan = document.getElementById('day');
	var dayCanCxt = dayCan.getContext('2d')
	
	
	canvas.height = WINDOW_HEIGHT
	canvas.width = WINDOW_WIDTH
	curShowTimeSeconeds = getCurrentShowTimeSeconds()
	
   	Timer = setInterval(function(){
	  		render( context,dayCanCxt);
	 		update();
		},50);
		
	window.onfocus = function(){
		clearInterval(Timer);
		Timer = setInterval(function(){
	  		render( context ,dayCanCxt);
	 		update();
		},50);
	}
	window.onblur = function(){
	   clearInterval(Timer);
	   
	}
	window.onresize = function(){
		 window.location.reload();
	}
	
}
	




function update(){
	var nextShowTime = getCurrentShowTimeSeconds()
	
	var nextHours = parseInt(nextShowTime /3600) 
	var nextMinutes = parseInt((nextShowTime- nextHours*3600)/60)
	var nextSeconds = parseInt(nextShowTime %60) 
	var hour = parseInt(curShowTimeSeconeds /3600) 
	var minutes = parseInt((curShowTimeSeconeds- hour*3600)/60)
	var seconds = parseInt(curShowTimeSeconeds %60) 
	
	if(nextSeconds !=seconds){
		if(parseInt(hour/10) != parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(hour/10))
		}
		if(parseInt(hour%10) != parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10))
		}
		if(parseInt(minutes/10) != parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10))
		}
		if(parseInt(minutes%10) != parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10))
		}
		if(parseInt(seconds/10) != parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10))
		}
		if(parseInt(seconds%10) != parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10))
		}
		
		curShowTimeSeconeds = nextShowTime
	}
	updateBalls()
	
}
function updateBalls(){
	for(var i= 0;i<balls.length;i++){
		balls[i].x +=balls[i].vx
		balls[i].y +=balls[i].vy
		balls[i].vy += balls[i].g
		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS
			balls[i].vy = -balls[i].vy*(6.5+Math.random()*2)/10
		}
	}
	
	var cut = 0;
	for (var i = 0;i<balls.length;i++) {
		if(balls[i].x+ RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH){
			balls[cut++] = balls[i]
		}
	}
	while(balls.length>cut){
		balls.pop()
	}
	
}

function addBalls(x,y,num){
	for(var i = 0;i<digit[num].length;i++){
		for(var j= 0;j<digit[num][i].length;j++){
			if(digit[num][i][j] ==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*(4+Math.random()*5),
					vy:-8+(Math.pow(-1,Math.ceil(Math.random()*1000))*(2+Math.random())),
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}
function getCurrentShowTimeSeconds(){
	var curTime = new Date()
	var ret = endTime.getTime()-curTime.getTime()
	ret =  Math.round(ret/1000)
	return ret>=0?ret:0
}
function render(cxt,dcc){
	
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var days = parseInt(curShowTimeSeconeds/(3600*24))
	
	
	var hour = parseInt((curShowTimeSeconeds -days*24*3600)/3600) 
	var minutes = parseInt((curShowTimeSeconeds- hour*3600-days*24*3600)/60)
	var seconds = parseInt(curShowTimeSeconeds %60) 
	
	renderDigit(10,20,parseInt(days/10),dcc,D_RADIUS)
//	console.log(D_RADIUS)
	renderDigit(100,20,parseInt(days%10),dcc,D_RADIUS)
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt,RADIUS)
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),cxt,RADIUS)
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt,RADIUS)
	
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt,RADIUS)
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt,RADIUS)
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt,RADIUS)
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt,RADIUS)
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt,RADIUS)
	
	
	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true)
		cxt.closePath()
		cxt.fill()
		
	}
	
}
function renderDigit(x,y,num,cxt,r){
	cxt.fillStyle = "#1abc9c"
	
	for (var i = 0; i < digit[num].length; i++) {
		for (var j=0;j<digit[num][i].length;j++) {
			if(digit[num][i][j] == 1){
				
				cxt.beginPath();
				cxt.arc(x+2*j*(r+1)+(r+1),y+i*2*(r+1)+(r+1),r, 0,2*Math.PI)
				
				cxt.closePath()
				cxt.fill();
				
			}
		}
	}
	
}
