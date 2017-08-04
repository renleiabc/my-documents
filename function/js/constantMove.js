//让元素匀速运动的函数封装；
//dom元素；property属性；target所要达到的目标值；time是每次调用函数的时间间隔(毫秒数)；
function constantMove(dom, property, target,time){
		clearInterval(dom[property + "Timer"]);
		dom[property + "Timer"] = setInterval(function(){
			var current = parseInt(getStyle(dom, property));
			if(current > target){
				speed = -5;
			}else {
				speed = 5;
			}
			if(Math.abs(current - target) < Math.abs(speed)){
				clearInterval(dom[property + "Timer"]);
				dom.style[property] = target + "px";
				return;
			}
			dom.style[property] = current + speed + "px";
		}, time);
	}
function getStyle(dom, property){
		if(dom.currentStyle){
			return dom.currentStyle[property];
		} else {
			return window.getComputedStyle(dom)[property];
		}
	}