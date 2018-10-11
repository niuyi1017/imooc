var eventUtil={
         	// 添加句柄
         	addHandler:function(element,type,handler){
               if(element.addEventListener){
                 element.addEventListener(type,handler,false);
               }else if(element.attachEvent){
                 element.attachEvent('on'+type,handler);
               }else{
                 element['on'+type]=handler;
               }
         	},
         	// 删除句柄
         	removeHandler:function(element,type,handler){
               if(element.removeEventListener){
                 element.removeEventListener(type,handler,false);
               }else if(element.detachEvent){
                 element.detachEvent('on'+type,handler);
               }else{
                 element['on'+type]=null;
               }
         	},
          getEvent:function(event){
            return event?event:window.event;
          },
          getType:function(event){
            return event.type;
          },
          getElement:function(event){
            return event.target || event.srcElement;
          },
          preventDefault:function(event){
            if(event.preventDefault){
              event.preventDefault();
            }else{
              event.returnValue=false;
            }
          },
         stopPropagation:function(event){
           if(event.stopPropagation){
             event.stopPropagation();
           }else{
             event.cancelBubble=true;
           }
         }
  }