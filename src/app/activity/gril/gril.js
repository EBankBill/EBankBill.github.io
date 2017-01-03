/**
 * Created by ly on 2016/8/17.
 */
define(function(require, exports, module) {
    var $ = require("zepto"),
        tips = require('simpleTips'); //简单提示框; tips(data.msg);
    var but = $(".Zbut");
    but.click(function(){
        var final_user_id= $(this).attr("final_user_id");
        if($(this).prop('disabled')) return false;
        $(this).prop('disabled',true);
        var that = $(this);

        $.ajax({
            'type':'post',
            'dataType':'json',
            'data':{final_user_id:final_user_id},
            'url':pageConfig.url,
            'success':function(data){

                if(data.status =='succ'){
                    var num = parseInt($('.numpiao').text());
                    var wx_num = parseInt($('.wx_num').text());
                    $('.numpiao').text(num+1);
                    $('.wx_num').text(wx_num+1);
                    $('#huatch').css('display','block');
                    $('#huatch').find('img').css('display','none');
                    $('#huatch').find('img').eq(2).css("display","block");
                }else{
                    if(data.reason.code == -5){
                        $('#huatch').css('display','block');
                        $('#huatch').find('img').css('display','none');
                        $('#huatch').find('img').eq(1).css("display","block");
                    }else if(data.reason.code == -6){
                        $('#huatch').css('display','block');
                        $('.linkgzh').remove();
                        $('#huatch').find('img').css('display','none');
                        $('#huatch').find('img').eq(0).css("display","block");
                    }else{
                        tips(data.reason.msg);
                        return;
                    }


                }
            },
            'complete':function(xhr){
                that.prop('disabled',false);
            }
        });
    });

});
