/**
 * @fileOverview 重新计算图片大小工具.html
 * @author longxu
 * @email longxu@leju.com
 * @date 2015-05-27
 * @template
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    module.exports = ImgResize;

    function ImgResize(img, url, pHeight, pWidth) {
        this.img = img;
        $(img).width('auto').height('auto');
        this.url = url;
        this.pHeight = pHeight;
        this.pWidth = pWidth;
    }

    //图片加载处理
    function imgLoad(img, url, callback) {
        if (img.src != url) {
            img.src = url;
        }
        if (img.complete) {
            callback.call(img, img);
        } else {
            img.onload = img.onerror = function() {
                callback.call(this, this);
                img.onload = img.onerror = null;
            };
        }
    }

    //重新计算图片大小并居中显示
    function resizeImg(img, pHeight, pWidth) {
        if (img.width < img.height) {
            $(img).width('100%').height('auto');
        } else {
            $(img).height('100%').width('auto');
        }
        var delHeight = (img.height - pHeight) / 2;
        var delWidth = (img.width - pWidth) / 2;
        $(img).css("margin-top", -delHeight);
        $(img).css("margin-left", -delWidth);
    }

    ImgResize.prototype.init = function() {
        var pHeight = this.pHeight,
            pWidth = this.pWidth;

        imgLoad(this.img, this.url, function() {
            resizeImg(this, pHeight, pWidth);
        });
    };
});
