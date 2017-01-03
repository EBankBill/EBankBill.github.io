/**
 * @fileOverview  羊
 * @author zoulingling
 * @email lingling6@leju.com
 * @date 2015-2-2
 * @template activity/templates/v1.0/unite/bangdian.html
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    var SV = require('simpleValidate');
    var tips = require('simpleTips')
    var waiting = 0;;
    SV.init('sv');

    $('#success .close').on('click', function() {
        $('#success').hide();
    });

    $('#btnSubmit').on('click', function() {
        $('form input').sv() && ajax();
    });

    function ajax() {
        if (waiting) return false; //等待中        
        waiting = 1;
        $.ajax({
            type: 'post',
            url: $('form').attr('action'),
            data: $('form').serialize(),
            success: function(data, status, xhr) {
                data = JSON.parse(data);
                if (data.code == 1) {
                	$('#btnSubmit').off('click');
                    $('#success').show();
                } else {
                    tips(data.message);
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
