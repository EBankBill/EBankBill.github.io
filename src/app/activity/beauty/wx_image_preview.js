/**
 * 微信图片预览插件
 * @author mingxing
 * @email niemingxing@126.com
 * @date 2015-11-19
 */
define(function(require, exports, module) {
    exports.init = function(cur_pic,urls){
        WeixinJSBridge.invoke('imagePreview', {
            // 需要播放的图片src list
            'current': cur_pic,
            'urls': urls
        });
    }
});
