---
layout: post
title: 一个简单的WEBAPP---列车时刻查询
date: 2018-04-22
categories: 前端
tags: 前端 WEBAPP 慕课网 jQueryMobile
author: 牛一 
subtitle: '一个可以查询列车车次信息的WEBAPP'
cover: 'http://p7kyjkmgh.bkt.clouddn.com/blue-train-dribbble_1x%20%281%29.jpg'
---  

## 效果图 

![Train](http://p7kyjkmgh.bkt.clouddn.com/Train.gif)  

## 框架  
* jquery.mobile-1.4.5  
* jQuery.2.0.0  

## 效果  
* 根据出发站和到达站查询车次列表  
* 根据车次查询详细信息  

## 代码 
已上传到[github]()  
  

## 总结  
1. 用到了JQ Mobile 的form 、ul 和 table 组件 

form 用来获取用户输入信息  

![form](http://p7kyjkmgh.bkt.clouddn.com/QQ%E6%88%AA%E5%9B%BE20180506215328.png)   
ul 用来承载查询后的车次列表  li 为脚本动态生成  
 ```javascript
 var _html ='<li><a href="#" data-no = "' + that.find("TrainCode").text()+'">'+
		'<h2>'+that.find("TrainCode").text()+'</h2>'+
		'<p>'+ that.find("FirstStation").text() + "-" + that.find("LastStation").text() +'</p>'+
		'<p>'+ that.find("StartTime").text()+ " - "+ that.find("ArriveTime").text()+'</p>'+
        '<p class="ui-li-aside">用时：'+that.find("UseDate").text()  +'</p>'+
        '</a></li>';  
```  
table 用来承载车次的详细信息  
```javascript
var tr = $("<tr></tr>");
	var that = $(this);
			
	var _html = '<td>'+that.find("TrainStation").text() + '</td>' +
		        '<td>'+that.find("ArriveTime").text() + '</td>' +
				'<td>'+that.find("StartTime").text() + '</td>' ;
	tr.html(_html);
	tbody.append(tr);
```  
2. 请求  
网络请求使用了jQuery中的封装好的Ajax的get方法  

根据出发站到达站获取车次列表  
```javascript
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
    
    }
```  
根据车次获取详情  
```javascript
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
```  







