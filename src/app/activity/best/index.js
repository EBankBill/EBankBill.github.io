/**
 *@auther mingxing
 */
define(function(require, exports, module) {
    var $ = require("zepto"),
        tips = require('simpleTips'); //简单提示框;
    require("simpleValidate").init('sv'); //注册验证函数
    require("./share");
    var Swiper = require('/activity/resources/v1.0/best/js/swiper.min.js');
    var ImgResize = require('./_imgResize.js');
    var $imgFile = $("#fileImg");
    var MAXSIZE = 1000000,
        MAXUPLOAD = 2;
    $(function() {
        //图片滑动初始化
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        });
        // 上传图片按钮
        $("#uploadImg").on("click", function(e) {
            e.preventDefault();
            if ($(".uploadImg").length >= MAXUPLOAD) {
                return false;
            }
            $imgFile.trigger("click");
        });
        
        // 选择上传文件
        $imgFile.on("change", handleFileSelect);

        //下一步
        $("#nextStep").click(function(e){
            var jq_img = $(".swiper-slide img").eq(swiper.activeIndex);
            e.preventDefault();
            if(jq_img.length == 0)
            {
                tips("请上传或选择一张图片");
                return;
            }
            location=pageConfig.jumpUrl+"&img="+$(jq_img).attr("src");
        });
        
        function handleFileSelect(evt) {
            var files = evt.target.files;
            var curImgNum = $(".uploadImg").length;
            if (files.length + curImgNum > MAXUPLOAD) {
                tips("最多只能上传"+MAXUPLOAD+"张");
                return;
            }
            for (var i = 0, f; f = files[i]; i++) {

                if (!f.type.match('image.*')) {
                    continue;
                }
                var reader = new FileReader();
                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    return function(e) {
                        var src = null;
                        if (e.total > MAXSIZE) {
                            lrz(theFile, {
                                width: 1024
                            }, function(results) {
                                // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
                                src = results.base64;
                                uploadImg(src);
                            });
                        } else {
                            src = e.target.result;
                            uploadImg(src);
                        }
                    };
                })(f);

                // Read in the image file as a data URL.
                reader.readAsDataURL(f);
            }
            //为了选择同样的图片清除file的值
            evt.target.value = "";
        }

        function uploadImg(src) {
            $(".J_loadingPanel").show();
            $.post(pageConfig.uploadUrl, {imgData: src},function(data) {
                    $(".J_loadingPanel").hide();
                    if(data.status == 'succ')
                    {
                        location=pageConfig.jumpUrl+"&img="+data.info.img_url;
                    }
                    else
                    {
                        tips(data.reason);
                    }
                },'json');
        }
    });
});
