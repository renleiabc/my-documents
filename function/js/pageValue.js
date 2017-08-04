//自定义方法  获取时间
        function changedate() {
            //静态页面参数接收,解析数据对象的查询字串（? 符号及后面的部分）
            var url = location.search;
            console.log(url);
            var request = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1)　 //去掉?号
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    request[strs[i].split("=")[0]] = strs[i].split("=")[1];
                }
            }
            var datetime = 1000;
            if (null != request["datetime"]) {
                //数据健值获取
                datetime = parseInt(request["datetime"].split(",").toString());
                console.log(typeof datetime)
            }
            //输出时间
            return datetime;
        }
