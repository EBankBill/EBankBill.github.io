/**
 * @fileOverview: 分享弹层
 * @author: xiejiabin
 * @email: jiabin1@leju.com
 * @date: 2015-01-21
 * @template
 */
define(function(require, exports) {
    var $ = require("zepto");
    var $mask = $(".maskshare");
    var $btn = $("#shareBtn,.shareBtn");
    // var touchClick = (winow.navigator.userAgent.toLowerCase().indexOf('mobile') != -1) ? 'touchstart' : 'click';
    var touchClick = 'click';
    $btn.on(touchClick, function() {
        $(window).scrollTop(0);//滚回顶部
        $mask.show();
    });
    $mask.on(touchClick, function() {
        $(this).hide();
    }).on('touchmove', function(e) {
        e.preventDefault();//阻止默认行为
        e.stopPropagation();//阻止冒泡
        // return false;
    });
});
