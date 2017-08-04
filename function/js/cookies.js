//<script src = "js/cookie.js" type = "text/javascript" charset = "utf-8"></script> 引用外部样式
//设置cookie

function setCookie(name, value, expiresdays){
	var exp = new Date();
	exp.setDate(exp.getDate() + expiresdays);
	document.cookie = name + "=" + value + ";expires=" + exp.toGMTString(); 
}
//获取cookie
function getCookie(name){
	var myCookie = document.cookie;
	var data = myCookie.split("; ");
	for(var i = 0; i < data.length; i++){
		var co = data[i].split("=");
		if (co[0] == name) {
			return co[1];
		}
	}
	return "";
}

function getCookie2(name){
	
	var myCookie = document.cookie;
	
	var data = myCookie.split("; ");
	
	var cookies = {};
	for(var i = 0; i < data.length; i++){
		var co = data[i].split("=");
		cookies[co[0]] = co[1];
	}
	
	if(name in cookies){
		return cookies[name];
	} else {
		return "";
	}
}

function getCookie3(name){
	var myCookie = document.cookie;
	
	var exists = myCookie.indexOf(name);
	if(exists != -1){
		var start = exists + name.length + 1;
		var end = myCookie.indexOf(";", start);
		return myCookie.substring(start , end);
	}
	return "";
}
//删除cookie
function delCookie(name){
	var exp = new Date();
	exp.setDate(exp.getDate() - 1);
	
	document.cookie = name + "=xx;expires=" + exp.toGMTString(); 
}
//获取非行内样式
function getstyle (obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj)[attr]; 
}

//图片抖动函数
 function shake ( ){   //参数自定义
					
	clearInterval(timer);
					
	var num = 0;
	//开定时器
	timer = setInterval(function(){
		//让原有的加上数组里面的；
		oimg.style.left = parseInt( getstyle(oimg ,'left')) + arr[num] + 'px';
		//oimg.style.top = parseInt( getstyle(oimg ,'top')) + arr[num] + 'px';
		num++;   //  注意累加
		if(num > arr.length){
			clearInterval(timer);
		} 
	},50);
				
};