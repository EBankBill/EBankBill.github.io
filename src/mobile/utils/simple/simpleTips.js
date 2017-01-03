/**
 * @fileOverview 简单提示层，不需要页面dom支持
 * @author xiejiabin
 * @email jiabin1@leju.com
 * @date 2014-12-18
 * @remark require('...')(msg);
 */
define(function(require, exports, module) {
    module.exports = createTips;
    /*弹出层*/
    function createTips(msg, duration) {
        duration = duration || 1500;
        var css = "width:200px;line-height:36px;padding:8px 0; font-size:24px; color:#fff; text-align:center; background:rgba(0,0,0,.5); position:fixed; left:50%; margin-left:-100px; top:35%; z-index:1999; -webkit-border-radius:5px;-moz-border-radius:5px;-ms-border-radius:5px;border-radius:5px;";
        var ctl = document.createElement('div');
        ctl.setAttribute('style', css);
        ctl.innerHTML = msg;
        document.body.appendChild(ctl);
        setTimeout(function() {
            ctl.parentNode && ctl.parentNode.removeChild(ctl);
        }, duration);
        console.log(ctl)
        return ctl;
    }
});
