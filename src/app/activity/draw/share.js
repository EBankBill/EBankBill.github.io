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
    var touchClick = (window.navigator.userAgent.toLowerCase().indexOf('mobile') != -1) ? 'touchstart' : 'click';
    $btn.on(touchClick, function() {
        $mask.show();
    });
    $mask.on(touchClick, function() {
        $(this).hide();
    });
});
