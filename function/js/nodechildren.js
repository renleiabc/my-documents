/**
 * Created by CC on 2016/5/16.
 */
//兼容的第二种写法，if else
	//获取元素第一个元素节点；
function getFirstChildEX(node){
    if(node.firstElementChild){
        return node.firstElementChild;
    }else{
        return node.firstChild;
    }
}
//获取最后一个元素节点
function getLastChild(node){
    return node.lastElementChild||node.lastChild;
}
//获取下一个兄弟元素节点
function getNextSibling(node){
    return node.nextElementSibling||node.nextSibling;
}
//获取上一个兄弟元素节点
function getPreviousSibling(node){
    return node.previousElementSibling||node.previousSibling;
}

//获取所有子元素节点
function getChildren(node){
    var arrChild=[];
    //把元素阶段放入到 数组 arrChild中。最后返回（return ） 这个数组 arrChild
    var children=node.childNodes;//包含了 元素节点 和文本节点的 数组。
    for(var i=0;i<children.length;i++){
        if(children[i].nodeType==1)//元素节点
        {
            arrChild.push(children[i]);
        }
    }
    return arrChild;
}

//把一个节点元素放插到另一个节点之后的函数封装；
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(getLastChild(parent) == targetElement){
		parent.appendChind(newElement);
	}else{
		parent.insertBefore(newElement,getNextSibling(targetElement));
	}
}

//getElementsByClassName兼容新旧浏览器的封装；
 function getElementsByClassName(node,classname){
           if(node,getElementsByClassName){
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
//查找下一个元素节点；
function getNextElement(node){
	if(node.nodeType == 1){
		return node;
	}
	if(node.nextSibling){
		return getNextElement(node.nextSibling);
	}
	return null;
}
