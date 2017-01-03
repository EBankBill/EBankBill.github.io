/**
 * 分享
 * @author mingxing
 * @email niemingxing@126.com
 * @date 2015-11-18
 */
define(function(require, exports) {
    var $ = require("zepto");
    $(".J_share").click(function(e){
        e.preventDefault();
        $("#cShare").removeClass('none');
    });
    $(".cShare").click(function(){
        $(this).addClass('none');
    });
});
