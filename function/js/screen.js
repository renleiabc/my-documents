//上下滚动距离兼容性的封装；
function screenTop(){
	var toTop = document.body.scrollTop || document.documentElement.scrollTop || 0;
     return toTop ;
}
//左右滚动距离兼容性的封装；
function screenLeft(){
	var toLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	return toLeft;
}
//得到某个元素在页面上左偏移量；
 function getElementLeft(element){
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            while(current !== null){
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return actualLeft;
        }
//得到某个元素在页面上偏移量；
	function getElementTop(element){
		var actualTop = element.offsetTop;
		var current = element.offsetParent;
		while(current !== null){
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}
		return actualTop;
	}
			
			
			
			
			
			
			