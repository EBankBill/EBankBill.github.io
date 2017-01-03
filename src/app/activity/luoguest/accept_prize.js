/**
 * @fileOverview  兑奖
 * @author xiejiabin
 * @email jiabin1@leju.com
 * @date 2015-1-28
 * @template
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    var tips = require('simpleTips');
    var validate = require('simpleValidate');
    validate.init('validate'); //注册验证函数

    var codeUrl = $('#vcode').attr('src'), //验证码地址
        waiting = 0; //请求等待

    //刷新验证码
    $('#vcode').on('click', function() {
        $('input[name="image_code"]').val('');
        $(this).attr('src', codeUrl + '&_=' + new Date().getTime());
    });

    //提交
    $('#linkSubmit').on('click', function() {
        $('form input').validate() && ajaxPrize();
    });

    //ajax请求
    function ajaxPrize() {
        if (waiting) return false; //等待中        
        waiting = 1;
        $.ajax({
            type: 'post',
            url: $('form').attr('action'),
            data: $('form').serialize(),
            success: function(data, status, xhr) {
                data = JSON.parse(data);
                if (data.code == 1) {
                    $('#success').show();
                } else if (data.code == 2) {
                    $('#fail').show();
                } else {
                    tips(data.message);
                    $('#vcode').trigger('click');
                }
            },
            error: function(xhr, errorType, error) {
                tips('出错了');
            },
            complete: function() {
                waiting = 0;
            }
        });
    }
});
