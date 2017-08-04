//封装一个做减速运动的函数,
//其中dom是元素，property是元素属性，target索要达到的目标值;
function varyingMove(dom,property,target){
	//首先清除之前的定时器；
	clearInterval(dom[property + "Timer"]);
	//为运动的元素添加定时器；
	dom[property + "Timer"] = setInterval(function (){
    //透明透明度和其他定位，宽高等px为单位的获取方式的差异；
			if(property == "opacity"){
	//如果是透明度，则根据现有的值转换成100以内的整数；
			var current = Math.round(parseFloat(getStyle(dom, property))*100);
		}else{
    //px为单位的属性直接转化为正整数；
			var current = parseInt(getStyle(dom, property));
		}
    //当元素的属性值达到预期以后清除定时器；
		if( current === target){
			clearInterval(dom[property+"Timer"]);
			return;
		}
		var dis = target - current;
		var speed = dis > 0 ? Math.ceil(dis/10) : Math.floor(dis/10);
		if(property == "opacity"){
			dom.style[property] = (current + speed)/100;
			dom.style.filter = "alpha(opacity=" + (current + speed) + ")";
		}else{
			dom.style[property] = current + speed + "px";
		}
	
	},30);
}
//获取元素的样式；
function getStyle(dom, property){
	if(dom.currentStyle){
		return dom.currentStyle[property];
	} else {
		return getComputedStyle(dom)[property];
	}
}