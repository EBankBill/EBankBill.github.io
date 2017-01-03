/**
 *@auther mingxing
 */
define(function(require, exports, module) {
    var $ = require("zepto"),
        tips = require('simpleTips'); //¼òµ¥ÌáÊ¾¿ò;
    $(function() {
        $("body").append('<div class="Share J_share"><img src="http://7u2q05.com1.z0.glb.clouddn.com/gallery16/201601/1813018200.png" width="100%"></div>');
        $(".Share").click(function(){
            $(this).hide();
        });
        $(".J_showShare").click(function(e){
            e.preventDefault();
            $(".J_share").show();
        });
    });
});
