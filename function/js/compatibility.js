 /*
 函数的封装 2016/05/22;
 
 在大多数的情况下都将事件处理程序添加到事件流的冒泡阶段，
 这样可以最大限度地兼容各种浏览器.最好只在事件到达浏览器之
 前截获它的时候将事件处理程序添加到捕获阶段。如果不是特别需要，
 不建议在事件捕获阶段注册事件处理程序
 */
 //跨浏览器事件处理程序；
 //addHandler()接受三个参数：要操作的元素、事件名称和事件处理程序函数；
 var EventUtill = {
        addHandler: function (element,type,handler) {
           if(element.addEventListener){
               element.addEventListener(type,handler,false);
           } else if(element.attachEvent){
               element.attachEvent("on"+type,handler,false);
           }else{
               element["on"+type] = handler;
           }
        }
        removeHandler: function(element,type,handler){
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);
            }else if(element.detachEvent){
                element.detachEvent("on"+type,handler);
            }else{
                element["on"+type] = null;
            }
        }
    }
//dom2级处理程序兼容性的封装；
//第一个参数  需要绑定事件监听的 dom对象
    //第二个参数  绑定的事件类型
    //第三个单数  事件处理程序
	//false为冒泡阶段；ture为捕获阶段
	function addEventListener(dom,type,fn){
	if(dom.addEventListener){
		dom.addEventListener(type,fn,false)
		  }else{
		   dom.attachEvent("on"+type,fn)
	   }
	}
  addEventListener(dom,type,fn);
	//dom2级解除绑定事件兼容性封装
	function removeEventListener(dom,type,fn){
	  if(dom.removeEventListener){
	   dom.removeEventListener(type,fn,false);//标准DOM事件模型
	  }else{
	  dom.detachEvent("on"+type,fn);
	  }
	}p
	//阻止默认行为兼容性的封装；
	function preventDefault(event) {
		event = event||window.event;
		if(event.preventDefault){
			event.preventDefault();//标准DOM事件模型
		}else{
			event.returnValue = false;//ie默认为true
		}
	}
	//阻止冒泡兼容性的封装
	function stopPropagation(event){
			event=event||window.event;
			//阻止冒泡
			if(event.stopPropagation){
				//非ie 标准
				event.stopPropagation();
			}else{
				//ie9 之前。
				event.cancelBubble=true;
			}
		}