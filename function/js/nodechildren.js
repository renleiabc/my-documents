/**
 * Created by CC on 2016/5/16.
 */
//���ݵĵڶ���д����if else
	//��ȡԪ�ص�һ��Ԫ�ؽڵ㣻
function getFirstChildEX(node){
    if(node.firstElementChild){
        return node.firstElementChild;
    }else{
        return node.firstChild;
    }
}
//��ȡ���һ��Ԫ�ؽڵ�
function getLastChild(node){
    return node.lastElementChild||node.lastChild;
}
//��ȡ��һ���ֵ�Ԫ�ؽڵ�
function getNextSibling(node){
    return node.nextElementSibling||node.nextSibling;
}
//��ȡ��һ���ֵ�Ԫ�ؽڵ�
function getPreviousSibling(node){
    return node.previousElementSibling||node.previousSibling;
}

//��ȡ������Ԫ�ؽڵ�
function getChildren(node){
    var arrChild=[];
    //��Ԫ�ؽ׶η��뵽 ���� arrChild�С���󷵻أ�return �� ������� arrChild
    var children=node.childNodes;//������ Ԫ�ؽڵ� ���ı��ڵ�� ���顣
    for(var i=0;i<children.length;i++){
        if(children[i].nodeType==1)//Ԫ�ؽڵ�
        {
            arrChild.push(children[i]);
        }
    }
    return arrChild;
}

//��һ���ڵ�Ԫ�طŲ嵽��һ���ڵ�֮��ĺ�����װ��
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(getLastChild(parent) == targetElement){
		parent.appendChind(newElement);
	}else{
		parent.insertBefore(newElement,getNextSibling(targetElement));
	}
}

//getElementsByClassName�����¾�������ķ�װ��
 function getElementsByClassName(node,classname){
           if(node,getElementsByClassName){
               //ʹ�����еķ�����
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
//window.onload�¼�����ķ�װ��
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
//������һ��Ԫ�ؽڵ㣻
function getNextElement(node){
	if(node.nodeType == 1){
		return node;
	}
	if(node.nextSibling){
		return getNextElement(node.nextSibling);
	}
	return null;
}
