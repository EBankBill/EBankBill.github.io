/**
 * @fileOverview 宣言活动
 * @author yuanlin  
 * @email yuanlin@leju.com
 * @date 2015-04-10
 * @phptemplate:  
 */
define(function(require, exports, modules) {
    var $ = require("zepto");
    require("./sound.js");
    var windowH = $(window).height();
   $(".d-imgshow").find("img").height(windowH)
})