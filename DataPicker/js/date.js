(function(){
	var datepicker = {};
	datepicker.getMonthDate = function(year ,month){
		
		var ret = [];
		if(!year&&!month){
			var today =  new  Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
		
		var firstDay = new Date(year ,month-1, 1);
		var firstDayWeekDay = firstDay.getDay();
		
		if(firstDayWeekDay === 0)firstDayWeekDay = 7;
		
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;
		
		var lastDayofLastMonth = new Date(year,month-1,0);
		var lastDateofLastMonth = lastDayofLastMonth.getDate();
		var preMonthDayCount = firstDayWeekDay-1;
		
		
		var lastDay = new Date(year,month,0);
		var lastData = lastDay.getDate();
		
		
		for (var i = 0;i<6*7;i++){
			var date = i+1-preMonthDayCount;
			var showDate = date;
			var thisMonth = month;
			
			if(date<= 0){
				thisMonth = month-1;
				showDate = lastDateofLastMonth + date;
			}else if(date>lastData){
				thisMonth = month+1;
				showDate = showDate - lastData;
			}
			
			
			if(thisMonth === 13) thisMonth = 1;
			if(thisMonth === 0)thisMonth = 12;
			
			ret.push({
				date:date,
				month:thisMonth,
				showDate:showDate
			});
			
		}
		return {
			year:year,
			month:month,
			days:ret
		};

	}
	
	
	
	window.datepicker = datepicker;
})();
