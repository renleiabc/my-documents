//获取CSS样式表中的属性的属性值
//(obj,attri)是形参，设置成什么其实并没有关系,obj意思是对象，attri意思是属性
function getStyle(obj,attri){
	//currentStyle IE特有的
	if(obj.currentStyle){
		return obj.currentStyle[attri];
	}else{
	//a:hover
	return window.getComputedStyle(obj,null)[attri];
    }
}


function $(idName){
	
return document.getElementById(idName);	
}

function randomColor(){
	//var colors = '0123456789ABCDEF';用字符串的形式也是可以的，因为
	//color.lenght也可表示字符串的长度；
var colors = ['0','1','2','3','4','5','6','7','8','9','A','B','C',
'D','E','F'];
var R = Math.floor( Math.random()*(colors.length - 1) );
var G = Math.floor( Math.random()*(colors.length - 1) );
var B = Math.floor( Math.random()*(colors.length - 1) );	
	return '#' + colors[R] + colors[G] + colors[B];
}

function randomColor2(){
	//toString(16)先换算成16进制 在变成字符串
	var R = Math.floor(Math.random()*255).toString(16);//#0a1234
	var G = Math.floor(Math.random()*255).toString(16);
	var B = Math.floor(Math.random()*255).toString(16);
	
	return '#'+minTen(R)+minTen(G)+minTen(B);
	
}
//小于10补0
function minTen(m){
	return m.length == 1 ? "0" + m:m;
}
 function getRandomColor(){
            var str="000000"+Math.floor(Math.random()*0x1000000).toString(16);
            return "#"+str.substr(-6);
        }
