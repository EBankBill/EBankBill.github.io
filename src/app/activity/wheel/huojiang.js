/**
 * @fileOverview: 分享弹层
 * @author: xiejiabin
 * @email: jiabin1@leju.com
 * @date: 2015-01-21
 * @template
 */
define(function(require, exports) {
    var $ = require("zepto");
    var V = require("simpleValidate");
    V.init('validate');
    $('#btnSubmit').on('click', function() {
        if($('form input').validate()){
            $('form').submit();
            return false;
        }
    });
});
