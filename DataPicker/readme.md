---
layout: post
title: 前端组件————datePicker 日期选择器
date: 2018-04-22
categories: 前端
tags: 前端 组件化 慕课网 datePicker 
author: niuyi  
cover: 'http://p7kyjkmgh.bkt.clouddn.com/58df52310001cf4506000338-240-135.jpg'
---  


> 一个简单的前端组件 —— datePicker 日期选择器   
 
  
    


### 效果图 


![test image size](http://p7kyjkmgh.bkt.clouddn.com/xiaoguo.gif)  

### 使用方法  
1. 引入datePicker.css 文件  
```html
<link rel="stylesheet" type="text/css" href="css/datePicker.css"/>
```  
2. 引入 date.js文件、datePicker.js 文件  
```html
<script src="js/date.js" type="text/javascript" charset="utf-8"></script>  
<script src="js/datePicker.js" type="text/javascript" charset="utf-8"></script>
```  
3. 在html里创建一个input，在js里调用datePicker.init()，参数为你的input
```html
<h3>请选择日期</h3>
<input type="text" class="datepicker" />
```  
```html
<script type="text/javascript">
	datepicker.init('.datepicker');
</script>
```  

### 主要过程 
1. 使用HTML和CSS编写组件静态UI
2. 使用原生javascript完成日历数据获取
3. 使用原生javascript实现静态UI和动态数据结合，完成日历数据渲染
4. 事件绑定处理

##### 使用HTML和CSS编写组件的静态UI
 承载日历数据的主要结构为table
 确定了配色和扁平化的效果
 ```css
color:#ccc;    //文字颜色
color: #1abc9c; //主题色
background: #E63946; //前景色

box-shadow: 2px 2px 8px 2px rgba(128,128,128,.3);//阴影效果
 ```  
 ##### 使用原生JavaScript完成日历数据获取  (date.js部分)
生成7*6的日期数据
Date()对象有自动进退位的机制，例如2018.4.0表示2018年3月的最后一天  
特殊处理上一个月、下一个月的数据
 ```javascript
 
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

 ```  
将结果对象push到数组  
date 为全部未处理的数据，包含上一个月的末尾（负数），本月的全部，下月的开始 （大于本月最后一天的整数） 
month 为当前月份  
showDate 为处理完毕正常显示的数据
```javascript
ret.push({
	date:date,
	month:thisMonth,
	showDate:showDate
});		
```  
讲包含年份，月份，储存有7*6个日期的数组作为对象返回
```javascript
return {
	year:year,
	month:month,
	days:ret
};
```

 ##### 使用原生javascript实现静态UI和动态数据结合，完成日历数据渲染    
 将原来的静态模板界面改造为脚本动态生成  
 特殊处理上一个月月末、当前天、下一个月月初的日期显示  
 拼接成字符串并返回  

 ```javascript
 datepicker.buildUI = function(year ,month){
		monthDate = datepicker.getMonthDate(year,month);
		var html = '<div class="ui-datePicker-header">'+
				'<a href="#" class="ui-datePicker-btn ui-datePicker-prev-btn">&lt;</a>'+
				'<a href="#" class="ui-datePicker-btn ui-datePicker-next-btn">&gt;</a>'+
				'<span class="ui-datePicker-curr-month">'+ monthDate.year+'-'+monthDate.month + '</span>'+
			'</div>'+
			'<div class="ui-datePicker-body">'+
				'<table >'+
					'<thead>'+
						'<tr>'+
							'<th>一</th>'+
							'<th>二</th>'+
							'<th>三</th>'+
							'<th>四</th>'+
							'<th>五</th>'+
							'<th>六</th>'+
							'<th>七</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody>';	
		for(var i = 0;i<monthDate.days.length;i++){
			var date = monthDate.days[i];
						
			if(i%7 === 0){
				html += '<tr>';
			}
			if(date.date<=0){
				html += '<td data-date = ' + date.date+' class = "notThisMonth">'+ date.showDate +'</td>'
			}else if(date.date>date.showDate){
					html += '<td data-date = ' + date.date+' class = "notThisMonth">'+ date.showDate +'</td>'
			}else if(date.showDate == today.getDate()&&monthDate.month == today.getMonth()+1&&monthDate.year == today.getFullYear()){
					html += '<td data-date = ' + date.date+' class = "on">'+ date.showDate +'</td>'
			}else{
				html += '<td data-date = ' + date.date+'>'+ date.showDate +'</td>'
			}
						
			if(i%7 === 6){
			    html += '</tr>';
			}					
		}
							
		html += '</tbody>'+
				'</table>'+
			'</div>';
		return html;
	};

 ```  
 ##### 事件绑定处理    
 由于日期数据（包括上一月、下一月的按钮）均为动态生成，所以将事件绑定在外层 datePicker—wrapper上 ，否则的话每生成一次新的数据，都要进行事件绑定  

 1. 为inpute 添加事件绑定 获取其位置坐标，为 datePicker 参考，展示datePicker  
 2. 为$wrapper 添加绑定事件，代理ui-datePicker-next-btn、ui-datePicker-prev-btn 控制数据的获取及重新渲染  
 3. 为$wrapper 添加绑定事件，代理td单元格的点击事件，获取当前单元格的日期  



 ```javascript
 $input.addEventListener('click',function(){
	if(isOpen){
		$wrapper.classList.remove('ui-datePicker-wrapper-show');
		isOpen = false;
	}else{
		$wrapper.classList.add('ui-datePicker-wrapper-show');
		var left = $input.offsetLeft;
		var top = $input.offsetTop;
		var height = $input.offsetHeight;
		
		$wrapper.style.top = top + height + 8 + 'px';
		$wrapper.style.left = left + 2 +'px';
		
		isOpen = true;
	}
},false);
		
$wrapper.addEventListener('click',function(e){
	var $target = e.target;
	if(!$target.classList.contains('ui-datePicker-btn')) return;
	if($target.classList.contains('ui-datePicker-prev-btn')){
		
		datepicker.render('prev');
		
	}else if($target.classList.contains('ui-datePicker-next-btn')){
		datepicker.render('next');
	}
},false);
$wrapper.addEventListener('click',function(e){
	var $target = e.target;
	
	if($target.tagName.toLowerCase() !=='td')return;
	
	var date = new Date(monthDate.year,monthDate.month-1,$target.dataset.date);
	
	$input.value = format(date);
	$wrapper.classList.remove('ui-datePicker-wrapper-show');
	isOpen = false;
		
},false);
		
 ```  

 ##### one more thing   
 这个组件是根据慕课网[DatePicker组件开发](https://www.imooc.com/learn/820)一课做的demo，用了一晚上的时间实现了课程中的功能，课程中并未特殊处理非本月日期的数据渲染
 第二天优化了一下 ，处理了上述问题，并添加了鼠标滑过的动画特效  

 已投食[GitHub](https://github.com/niuyi1017/imooc/tree/master/DataPicker)  
 欢迎star

