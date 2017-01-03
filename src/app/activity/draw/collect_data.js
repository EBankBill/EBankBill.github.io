/**
 * @fileOverview: 首页
 * @author: xiejiabin
 * @email: jiabin1@leju.com
 * @date: 2015-05-26
 * @template
 */
define(function(require, exports) {
    var $ = require("zepto");
    var tips = require('simpleTips');
    require('simpleValidate').init();
    
    $('#collect_submit').on('click', function() {
        if (!$('form input').simpleValidate()) {
            return false;
        }
        $.post($('form').attr('action'), $('form').serialize(), function(data) {
            data = JSON.parse(data);
            if (data.type === 'succ') {
                history.go(-1);
            } else {
                tips(data.msg);
            }
        });
        return false;
    });
});
