define(function (require, exports, module) {
    var $ = require("zepto"),
    tips = require('simpleTips'); //简单提示框; tips(data.msg);
    
    var time = null;
    $("#sub").click(function () {
        var INTERVAL =30000; //
        var now = new Date();
        if (time == null || now - time >= INTERVAL) { 
            time =now;
            $(this).removeAttr('disabled');
            console.log(time);
        } else {
            $(this).attr('disabled','disabled');
            return false;
        }
        var truename = $('#truename').val();
        var telephone = $('#telephone').val();
        var address = $('#address').val();
        //var card = $('#card').val();
        //var id = $("#data_id").val();

        if (truename == '') {
            tips('领奖姓名不能为空！');
            return false;
        } else if (telephone == '' || !(/^1[3|4|5|7|8]\d{9}$/.test(telephone))) {
            tips('手机号格式不正确！');
            return false;
        } else if (address == '') {
            tips('领奖地址不能为空！');
            return false;
        }else if(truename.length<2 ||truename.length>20 ){
            tips('姓名2-20个字符！');
            return false;
        }else if(address.length<5 ||address.length>80 ){
            tips('地址5-80个字符！');           
            return false;
        }
        
        /*else if (card == '') {
            tips('领奖身份证ID不能为空！');
            return false;
        }*/

        $.ajax({
            type: 'post',
            dataType: 'json',
            data: {truename: truename, telephone: telephone, address: address},
            url: pageConfig.url,
            success: function (data) {
                if (data.status == 'succ') {
                    /*$('#prize_name').html(data.info.prize.name);
                    $('#prize_pic').attr('src',data.info.prize.pic);
                    $('#prize_url').attr('href',pageConfig.succurl+'&id='+data.info.id);
                    $('#share').show();*/
                    tips(data.info.msg);
                    setTimeout(function(){
                        //window.location.href=pageConfig.succurl+'&id='+data.info.id},2000);
                        window.location.href=pageConfig.succurl},2000);
                } else {
                    tips(data.reason.msg);
                }
            },
            complete: function (xhr) {
                //that.prop('disabled', false);
            }
        });
    });

});
