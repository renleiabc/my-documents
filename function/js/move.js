function move(dom, target, fn){ // target : { width:200, height:200, left:300}
	clearInterval(dom.timer);
	dom.timer = setInterval(function (){
		var isOk = true;
		for(var attr in target){
			// if区分透明度和其他定位和宽高等px为单位的属性， 获取方式略有差异
			if(attr == "opacity"){
				// 如果是透明度，则根据现有值转换成一个100以内的整数
				var current = Math.round(parseFloat(getStyle(dom, attr))*100);
			} else {
				// px为单位的属性直接转换为一个整数
				var current = parseInt(getStyle(dom, attr));
			}
			
			if(current !== target[attr]){
				isOk = false;
			}
			
			var dis = target[attr] - current;
			var speed = dis > 0? Math.ceil(dis/10) : Math.floor(dis/10);
			
			// 透明度和其他属性的设置方式不同
			if(attr == "opacity"){
				// 透明度需要做一个兼容处理
				dom.style[attr] = (current + speed) / 100;
				dom.style.filter = "alpha(opacity=" + (current + speed) + ")";
			} else {
				dom.style[attr] = current + speed + 'px';
			}
		}
		if(isOk){
			clearInterval(dom.timer);
			if(fn){
				fn();
			}
			return;
		}
		
	}, 30);
}

function getStyle(dom, property){
	if(dom.currentStyle){
		return dom.currentStyle[property];
	} else {
		return getComputedStyle(dom)[property];
	}
}

