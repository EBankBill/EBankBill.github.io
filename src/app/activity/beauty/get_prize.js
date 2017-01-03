/**
 * 领奖
 * @author mingxing
 * @email niemingxing@126.com
 * @date 2015-11-18
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    var tips = require('simpleTips');
    var common = require('common');
    require('./share');
    $(".J_getPrize").click(function(){
       var form = $("#form");
       var name = $("#name").val();
       var phone = $("#phone").val();
       if(name == '')
       {
            $("#tipPanel").removeClass('none');
            $("#tipPanel .message").html("姓名不可以为空");
            return;
       }
       else if(phone == '')
       {
            $("#tipPanel").removeClass('none');
            $("#tipPanel .message").html("电话号码不可以为空");
            return;
       }
       $.post(form.attr('action'),form.serialize(),function(data){
            if(data.status == 'succ')
            {
                location=data.info.url;
            }
            else
            {
                $("#tipPanel").removeClass('none');
                $("#tipPanel .message").html(data.reason);
            }
       },'json'); 
   }); 
});
