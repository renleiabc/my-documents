/*
跨浏览器事件处理程序
*/
 var EventUtill = {
        //添加事件处理程序
        addHandler: function (element,type,handler) {
           if(element.addEventListener){
               element.addEventListener(type,handler,false);
           } else if(element.attachEvent){
               element.attachEvent("on"+type,handler);
           }else{
               element["on"+type] = handler;
           }
        },
        //返回对event对象的引用；
        getEvent: function(event){
            return event ? event : window.event;
        },
        //检测event对象target的属性；如果存在则返回该属性的值
        //否则，返回scrElement属性的值；
        getTarget: function(event){
            return event.target || event.srcElement;
        },
        //用于取消事件的默认行为；
        preventDefault: function(event){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        //删除事件处理程序；
        removeHandler: function(element,type,handler){
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);
            }else if(element.detachEvent){
                element.detachEvent("on"+type,handler);
            }else{
                element["on"+type] = null;
            }
        },
        //使用DOM方法阻止事件流；
        stopPropagation: function(event){
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        }
    };




//睡眠函数
function sleep(milliSeconds) {
var startTime = new Date().getTime();
while (new Date().getTime() < startTime + milliSeconds);
}
