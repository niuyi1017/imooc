function getByClass(clsName,parent){
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');

  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}

window.onload=drag;

function drag(){
   var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
   // 拖曳
   oTitle.onmousedown=fnDown;
   // 关闭
   var oClose=document.getElementById('ui_boxyClose');
   oClose.onclick=function(){
   	  document.getElementById('loginPanel').style.display='none';
   }
   // 切换状态
   var loginState=document.getElementById('loginState'),
       stateList=document.getElementById('loginStatePanel'),
       lis=stateList.getElementsByTagName('li'),
       stateTxt=document.getElementById('login2qq_state_txt'),
       loginStateShow=document.getElementById('loginStateShow');

   loginState.onclick=function(e){
   	 e = e || window.event;
     if(e.stopPropagation){
          e.stopPropagation();
     }else{
          e.cancelBubble=true;
     }
   	 stateList.style.display='block';
   }

   // 鼠标滑过、离开和点击状态列表时
   for(var i=0,l=lis.length;i<l;i++){
      lis[i].onmouseover=function(){
      	this.style.background='#567';
      }
      lis[i].onmouseout=function(){
      	this.style.background='#FFF';
      }
      lis[i].onclick=function(e){
      	e = e || window.event;
      	if(e.stopPropagation){
          e.stopPropagation();
      	}else{
          e.cancelBubble=true;
      	}
      	var id=this.id;
      	stateList.style.display='none';
        stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
        loginStateShow.className='';
        loginStateShow.className='login-state-show '+id;
      }
   }
   document.onclick=function(){
   	  stateList.style.display='none';
   }
}

function fnDown(event){
  event = event || window.event;
  var oDrag=document.getElementById('loginPanel'),
      // 光标按下时光标和面板之间的距离
      disX=event.clientX-oDrag.offsetLeft,
      disY=event.clientY-oDrag.offsetTop;
  // 移动
  document.onmousemove=function(event){
  	event = event || window.event;
  	fnMove(event,disX,disY);
  }
  // 释放鼠标
  document.onmouseup=function(){
  	document.onmousemove=null;
  	document.onmouseup=null;
  }
}

function fnMove(e,posX,posY){
  var oDrag=document.getElementById('loginPanel'),
      l=e.clientX-posX,
      t=e.clientY-posY,
      winW=document.documentElement.clientWidth || document.body.clientWidth,
      winH=document.documentElement.clientHeight || document.body.clientHeight,
      maxW=winW-oDrag.offsetWidth-10,
      maxH=winH-oDrag.offsetHeight;
  if(l<0){
    l=0;
  }else if(l>maxW){
    l=maxW;
  }
  if(t<0){
    t=10;
  }else if(t>maxH){
    t=maxH;
  }
  oDrag.style.left=l+'px';
  oDrag.style.top=t+'px';
}