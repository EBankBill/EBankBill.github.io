define(function(a, b) {
    b.prefixStyle = prefixStyle;
    b.random = random;
    function prefixStyle(obj, name, value) {
        var bigName = name.charAt(0).toUpperCase() + name.substring(1);
        obj.style['Webkit' + bigName] = value;
        obj.style['Moz' + bigName] = value;
        obj.style['ms' + bigName] = value;
        obj.style[name] = value;
    }

    // 随机函数
    function random(iMin, iMax) {
        return Math.floor(Math.random() * (iMax - iMin + 1)) + iMin;
    }
});
