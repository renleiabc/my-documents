//传入一个日期，判断是否是闰年, true闰年，false平年
function isLeapYear(d) {
    var _year = d.getFullYear();
    if ((_year % 4 == 0 && _year % 100 != 0) || (_year % 400 == 0)) {
        return true;
    }
    return false;
}

//根据日期获得的0-6，来返回星期几
function week(d) {
    switch (d) {
        case 0:
            return "星期日";
        case 1:
            return "星期一";
        case 2:
            return "星期二";
        case 3:
            return "星期三";
        case 4:
            return "星期四";
        case 5:
            return "星期五";
        case 6:
            return "星期六";
    }
}

//小于10补0
function minTen(m) {
    return m < 10 ? "0" + m : m;
}

//将日期格式化输出 2016-05-12 12:00:00
function printDate(d) {
    var str = "";
    var year = d.getFullYear();
    str += d.getFullYear() + "-";
    str += minTen(d.getMonth() + 1) + "-";
    str += minTen(d.getDate()) + " ";
    str += minTen(d.getHours()) + ":";
    str += minTen(d.getMinutes()) + ":";
    str += minTen(d.getSeconds());
    return str;
}
//2016-05-12 星期四 12:00:00
function printDate2(d) {
    var str = "";
    str += d.getFullYear() + "-";
    str += minTen(d.getMonth() + 1) + "-";
    str += minTen(d.getDate()) + " ";
    str += week(d.getDay()) + " ";
    str += minTen(d.getHours()) + ":";
    str += minTen(d.getMinutes()) + ":";
    str += minTen(d.getSeconds());
    return str;


}

//将日期格式化输出 12时0分0秒
function printDate3(d) {
    var str = "";
    str += d.getHours() + "时";
    str += d.getMinutes() + "分";
    str += d.getSeconds() + "秒";
    return str;
}

//获得某个月份的天数
function daysOfMonth(m, d) {
    switch (m) {
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if (isLeapYear(d)) {
                return 29;
            } else {
                return 28;
            }
        default:
            return 31;
    }

}

//判断两个日期相差的天数
function dayOfDate(t1, t2) {
    var mills1 = Date.parse(t1);
    var mills2 = Date.parse(t2);
    var d = Math.floor(Math.abs(mills1 - mills2) / 1000 / 60 / 60 / 24);
    return d;
}

//获得N天之后的日期
function getNewDate(d, num) {

    d.setTime(d.getTime() + num * 24 * 60 * 60 * 1000);

    return printDate(d);

}
/* 处理IE浏览器和标准浏览器在时间转化，兼容性的封装 */
function(date) {
    var seconds = 0;
    try {
        if (Date.parse(new Date(date))) {
            seconds = Date.parse(new Date(date)) / 1000;
            return seconds
        } else {
            seconds = Date.parse(new Date(date.replace(/-/g, "/"))) / 1000;
            return seconds;
        }

    } catch (e) {

    }
    return seconds;
}
