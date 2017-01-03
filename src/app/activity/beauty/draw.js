/**
 * 抽奖
 * @author mingxing
 * @email niemingxing@126.com
 * @date 2015-11-18
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    var tips = require('simpleTips');
    var common = require('common');
    require('./share');
    $(".J_drawPrize").click(function(e){
        e.preventDefault();
        var _this = this;
        if($(_this).is(".disabled"))
        {
            return;
        }
        if(pageConf.award_num<=0)
        {
            return;
        }
        $(_this).addClass('disabled');
        $("#js_prize").find(".myprize-wrap").removeClass("paused");
        $("#js_prize").attr("class","myprize-wrap " + $(e.target).attr("class").split(" ")array(2].split("-")array(1]);
        setTimeout(function(){
            $.post(pageConf.draw_url,null,function(data){
                $(_this).removeClass('disabled');
                $("#js_prize").attr("class","myprize-wrap");
                if(data.status == 'succ')
                {
                    pageConf.award_num-=1;
                    if(data.info.is_award == 'Y')
                    {
                        var panel = $("#winPrize");
                        $("#prize_pic",panel).attr('src',data.info.prize_pic);
                        $("#prize_name",panel).html(data.info.prize_name);
                    }
                    else
                    {
                        var panel = $("#noWinPrize");
                    }
                    $(".award_num").html(pageConf.award_num);
                    if(pageConf.award_num <=0)
                    {
                        $(".J_btn1",panel).hide();
                        $(".J_btn2",panel).show();
                    }
                    panel.removeClass("none");
                }
                else
                {
                    $("#tipPanel").removeClass('none');
                    $("#tipPanel .message").html(data.reason);
                }
            },'json');
        },2000);
        
    });
});
