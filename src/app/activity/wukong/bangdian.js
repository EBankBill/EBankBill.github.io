/**
 * @fileOverview  大圣 mod lbh
 * @author zoulingling
 * @email lingling6@leju.com
 * @date 2015-2-2
 * @template activity/templates/v1.0/unite/bangdian.html
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    require('share');
    tips = require('simpleTips'); //简单提示框; tips(data.msg);

    var ajaxUrl = pageConf.bangdianAjax;
    var $helpHim = $("#helpHim");
    var $helpHimTip = $("#helpHimTip");

    $helpHim.on("click", function() {
        $.ajax({
            type: 'get',
            url: ajaxUrl,
            success: function(data) {
                var data = JSON.parse(data);
                if (data.code == 1) {
                    $(window).scrollTop(0); //滚回顶部
                    $helpHimTip.show();
                }else{
                	tips(data.msg);return;
                    //$('#errorTip').show().find('.txt').text(data.msg);
                }
            },
            error: function(xhr, errorType, error) {
            	tips('出错了');return;
                //$('#errorTip').show().find('.txt').text('出错了');
            }
        });
        $(this).off('click');
    });

    $helpHimTip.on('click', function() {
        $helpHimTip.hide();
        location.reload();
    }).on('touchmove', function(e) {
        e.preventDefault(); //阻止默认行为
        e.stopPropagation(); //阻止冒泡
        $helpHimTip.hide();
        location.reload();
    });
    //关闭按钮
    $helpHimTip.find('.close-btn').on('click', function() {
        $helpHimTip.hide();
        location.reload();
    });

    $('#errorTip .close').on('click',function(){
        $('#errorTip').hide();
    });

    if ($('.winRecord').length > 5) {
        $('#loadMore').show().on('click', function() {
            $('.winRecord').show();
            $(this).remove();
        });
    }
});
