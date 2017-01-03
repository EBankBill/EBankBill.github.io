/**
 *@auther mingxing
 */
define(function(require, exports, module) {
    var $ = require("zepto");
    var Swiper = require('/activity/resources/v1.0/houyi/js/swiper.min.js');
    $(function() {
        //图片滑动初始化
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            loop: true
        });
        //指纹图标点击
        $(".J_startMatch").click(function(e){
            e.preventDefault();
            //动画3秒消失
            var box=document.getElementById("divbox");
            box.style.display="block";
            setTimeout(function(){
                box.style.display="none";
                var jq_img = $(".swiper-slide img").eq(swiper.activeIndex);
                location=pageConfig.jumpUrl+"&img_index="+jq_img.data("id");
            },1500);//3秒消失
        })
    });
});
