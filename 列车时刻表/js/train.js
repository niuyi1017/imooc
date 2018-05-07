var urlPre = "http://crossorigin.me/";

var url1 = "http://ws.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=";
var url2 = "http://ws.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeDataSetByTrainCode?UserID=";
var url3 = "http://ws.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?&UserID=";


var getTrainList = function(){
	
	if($("#startStation").val()&&$("#endStation").val()||$("#trainNo").val()){
		 var searchBtn = $("#search");
		 searchBtn.button("option","disabled",true);
		 
		 $.mobile.loading("show");
		 
		 var _data = {};
		 var _url = url1;
		 if(!$("#trainNo").val()){
		 	_data.StartStation = $("#startStation").val();
		 	_data.ArriveStation = $("#endStation").val();
		 }else{
		 	_data.TrainCode = $("#trainNo").val();
		 	_url = url2;
		 }
		 
		 $.get(urlPre+_url,_data,function(data){
		 	var list = $("#list");
		 	var $data = $(data);
		 	var timeTables = $data.find("TimeTable");
		 	
		 	var _arr = [];
		 	 timeTables.each(function(index,obj){
		 	 	var i = index;
		 	 	var that = $(this);
		 	 	
		 	 	if(that.find("FirstStation").text() == "数据没有被发现"){
		 	 		alert("数据没有被发现!");
		 	 		return false;
		 	 	}
		 	 	
		 	 	
		 	 	var _html ='<li><a href="#" data-no = "' + that.find("TrainCode").text()+'">'+
					'<h2>'+that.find("TrainCode").text()+'</h2>'+
					'<p>'+ that.find("FirstStation").text() + "-" + that.find("LastStation").text() +'</p>'+
					'<p>'+ that.find("StartTime").text()+ " - "+ that.find("ArriveTime").text()+'</p>'+
//					'<p> 用时：'+ that.find("UseDate").text()+'</p>'+
					'<p class="ui-li-aside">用时：'+that.find("UseDate").text()  +'</p>'+
				'</a></li>';
				
				_arr.push(_html);
		 	 	
		 	 });
		 	 
		 	 if(_arr.length>0){
		 	 	list.html(_arr.join(""));
		 	 	
		 	 	list.listview("refresh");
		 	 	
		 	 	
		 	 }
		 	 $.mobile.loading("hide");
		 	 searchBtn.button("option","disabled",false);
		 	
		 });
		
		
	}else{
		alert("请输入出发站和终点站，或者输入车次");
	}
	
	
};

var isAjax = false;


var getInfoByTrainCode = function(){
	if(isAjax)return;
	isAjax = true;
	
	$.mobile.loading("show");
	
	var trainCode = $(this).attr("data-no");
	$.get(urlPre+url3,{TrainCode:trainCode},function(data){
		$("#detial").find(".ui-content h2").first().html(trainCode + "次");
		
		var tbody = $("#detail").find(".ui-content tbody");
		tbody.html("");
		
		$(data).find("TrainDetailInfo").each(function(index,obj){
			
			var tr = $("<tr></tr>");
			var that = $(this);
			
			var _html = '<td>'+that.find("TrainStation").text() + '</td>' +
						'<td>'+that.find("ArriveTime").text() + '</td>' +
						'<td>'+that.find("StartTime").text() + '</td>' ;
			tr.html(_html);
			tbody.append(tr);
			
						
		});
	$.mobile.loading("hide");
	isAjax = false;
	$.mobile.changePage("#detail");
		
	});
};

var bindEvent = function(){
	
	$("#search").on("click",getTrainList);
	$("#list").on("click","a",getInfoByTrainCode);
	
	
};

$(document).on("pageinit","#index",function(){
	
	bindEvent();
	
});