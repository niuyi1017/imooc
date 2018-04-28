function focus1 (){
	var name = document.getElementById("username").value;
	if(name =="用户名/手机号")
	document.getElementById("username").value="";
	
}
function blur1(){
	var name=document.getElementById("username").value;
	if(name=="")
	document.getElementById("username").value="用户名/手机号";
	else if(name.substr(0,7)!="1785353"||isNaN(name)||name.length!=11){
		alert("格式错误");
		document.getElementById("username").value="";
		document.getElementById("username").focus();
	}
	
}