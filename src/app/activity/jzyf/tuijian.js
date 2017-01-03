define(function(require, exports, module) {
    var $ = require("zepto"),
        tips = require('simpleTips'); //简单提示框; tips(data.msg);
    $("#tj").click(function(){
        var bank_card_no = $("#bank_card_no").val();
        if(!bank_card_no){
            tips("卡号不能为空");
            return false;
        }
        var re = /^[\d]{4}$/;
        if(!re.test(bank_card_no)){
            tips("卡号格式不对!");
            return false;
        }
        var bank_mobile = $("#bank_mobile").val();
        if(!bank_mobile){
            tips("手机号不能为空");
            return false;
        }
        if(bank_mobile.length < 11){
            tips("手机号必须为11位");
            return false;
        }
        
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(bank_mobile))){
        	 tips("手机号格式不正确！");
             return false;
        }
        
        if($(this).prop('disabled')) return false;
        $(this).prop('disabled',true);

        var $that = $(this);
        $.ajax({
            'type':'post',
            'dataType':'json',
            'data':{bank_card_no:bank_card_no,bank_mobile:bank_mobile},
            'url':pageConfig.url,
            'success':function(data){
                if(data.status =='succ'){
                    tips(data.info.msg);
                    setTimeout(function(){window.location.href=pageConfig.succurl+'&tuijian_code='+data.info.tuijian_code},2000);
                    return;
                }else{
                    if(data.reason.code!=-1){
                        tips(data.reason.msg);
                    }else{
                        $("#share").show();
                    }
                }
            },
            'complete':function(xhr){
                $that.prop('disabled',false);
            }
        });
    });

    $('#btn').click(function(){
    	if(pageConfig.gt ==1){
    		 tips("推荐周期已结束");
    	}else{
    		window.location.href=pageConfig.succurl;
    	}
    });
});
