window.onload=function(){
	waterfall('main','box');
	var dataInt = {"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]}
	window.onscroll = function(){
		if(checkScrollSlide()){
			var oParent = document.getElementById('main');
			for (var i= 0;i<dataInt.data.length;i++) {
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "img/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
		}
		waterfall('main','box');
	}
	
}
function waterfall(parent,box){
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	
	oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto';
	
	var hArr = [];
	for (var i=0;i<oBoxs.length;i++) {
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}
		else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinIndex(hArr,minH);
			
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			oBoxs[i].style.left = index*oBoxW + 'px';
			
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
//	console.log(minH)
}

function getByClass(parent,clsName){
	var boxArr = new Array,
		oElements = parent.getElementsByTagName('*');
		
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
function getMinIndex(arr,val){
	for (var i=0;i<arr.length;i++) {
		if(arr[i]==val){
			return i;
		}
	}
}
function checkScrollSlide(){
	
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	
	return (lastBoxH<scrollTop+height)?true:false;
//	console.log(height);
}
