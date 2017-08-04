//向函数可以辅助向现有URL的末尾添加查询字符串参数
function addURLParam(url,name,value){
					url += (url.indexOf("?") == -1 ? "?" : "&");
					url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
					return url;
					console.log(url);
}
