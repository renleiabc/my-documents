function move(dom, porperty, target) {
    clearInterval(dom[porperty + "timer"]);
    dom[porperty + "timer"] = setInterval(function() {
        if (porperty == "opacity") {
            var current = Math.round(parseFloat(getStyle(dom, porperty) * 100));
        } else {
            var current = parseInt(getStyle(dom, porperty));
        }
        if (target == current) {
            clearInterval(dom[porperty + "timer"]);
            return;
        }
        var dis = target - current;
        var speed = dis > 0 ? Math.ceil(dis / 10) : Math.floor(dis / 10);

        if (porperty == "opacity") {
            dom.style[porperty] = (current + speed) / 100;
            dom.style.filter = "alpha(opacity=" + current + speed + ")";
        } else {
            dom.style[porperty] = current + speed + "px";
        }
    }, 30)
}

//获取元素的样式；
function getStyle(dom, property) {
    if (dom.currentStyle) {
        return dom.currentStyle[property];
    } else {
        return getComputedStyle(dom)[property];
    }
}
