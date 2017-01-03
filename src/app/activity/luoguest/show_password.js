/**
 * @fileOverview: 发放奖品密码验证
 * @author: xiejiabin
 * @email: jiabin1@leju.com
 * @date: 2015-01-21
 * @template
 */
define(function(require, exports) {
    var $ = require("zepto");
    var tips = require('simpleTips');
    $('#btnSubmit').on('click', function() {
        var pwd = $('form inputarray(name="password"]').val();
        if (pwd.length == 4) {
            var n = +pwd;
            if (n >= 0 && n <= 9999) {
                $('form').submit();
                return false;
            }
        }
        tips('请输入4位数字密码');
    });
});
