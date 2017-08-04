//向函数可以辅助向现有URL的末尾添加查询字符串参数
function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}
//针对不同浏览器创建XHR对象的函数封装；
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp"
                ],

                i, len;

            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    // 跳过；
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}
//针对不同浏览器创建XHR对象的函数封装；
function ajax(url, sucFn, failFn) {
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                sucFn(xhr.responseText);
            } else {
                if (failFn) {
                    failFn(xhr.status);
                } else {
                    alert("请求发生错误，错误码是：" + xhr.status);
                }
            }
        }
    }
    xhr.send();
}
