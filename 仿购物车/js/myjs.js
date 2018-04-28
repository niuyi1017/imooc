$(function(){
	var input1 = $("#input1").val();
	
	$("#button").click(function(){
		if(input1 == 1){
			$("#input2").val(1);
		}
	});
});