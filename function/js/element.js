//getElementsByClassName兼容新旧浏览器的封装；
 function getElementsByClassName(node,classname){
           if(node.getElementsByClassName){
               //使用现有的方法；
               return node.getElementsByClassName(classname);
           }else{
               var results = new Array();
               var elemts = node.getElementsByTagName("*");
               for(var i = 0; i < elemts.length ; i++){
                   if(elemts[i].className.indexOf(classname) != -1){
                       results[results.length] = elemts[i];
                   }
               }
               return results;
           }
       }
//window.onload事件处理的封装；
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}	
//把一个节点元素放插到另一个节点之后的所有工具；
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChind(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
//获取外部样式表的兼容性方法；
  function getStyle(dom,styleName){
        if(dom.currentStyle){
            return dom.currentStyle[styleName];
        }else{
            return window.getComputedStyle(dom)[styleName];
        }
    }
//检测对象类型；
function isArray(value){
          	return Object.prototype.toString.call(value);
}
//返回布尔值；
 function isArray(value){
          	return Object.prototype.toString.call(value) == "[object Array]";
          }
// 获得元素的详细坐标；这其实是一个方法；
function getBoundingClientRect(element){
		if(typeof arguments.callee.offset != "number"){
			var scrollTop = document.documentElement.scrollTop;
			var temp = document.createElement("div");
			temp.style.cssText = "position: absolute;left:0;top:0;";
			document.body.appendChild(temp);
			arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
		document.body.removeChild(temp);
		temp = null;
		}
		var rect = element.getBoundingClientRect();
		var offset = arguments.callee.offset;
		return {
			left:rect.left + offset,//元素左边距离页面左边的距离；
			right:rect.right + offset,//元素右边距离页面左边的距离；
			top:rect.top + offset,//元素上边距离距离页面上边的距离；
			bottom:rect.bottom + offset //元素底边距离页面上边的距离；
		};
	}
