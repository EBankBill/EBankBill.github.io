define(function(require, exports, module) {
    var $ = require("zepto"),
        tips = require('simpleTips'); //简单提示框; tips(data.msg);
        var but = $(".Zbut");
    but.click(function(){

    	var b_product_id= $(this).attr("b_product_id");
    	var b_open_id= $(this).attr("b_open_id");
        if($(this).prop('disabled')) return false;
        $(this).prop('disabled',true);

        //exit;
        var $that = $(this);
        $.ajax({
            'type':'post',
            'dataType':'json',
            'data':{b_product_id:b_product_id,b_open_id:b_open_id},
            'url':pageConfig.url,
            'success':function(data){

                if(data.status =='succ'){
                        if(data.info.platform == 'icbce'){
                            $(".cur_icbce").css({"display":"block"});
                            $('#remain_num').text(data.info.remain_num);
                            if(data.info.remain_vote_num == 2){
                                $("#desc").html('您今天还剩'+data.info.remain_vote_num+'次点赞机会 <br> 您获得了1次抽奖机会,快去抽奖吧！');
                            }else{
                                $("#desc").html('还剩'+data.info.remain_vote_num+'次点赞机会 <br>明天再投还可获得机会哦');
                                // $("#txt").html('恭喜您点赞成功 <br />您今天还剩余'+data.info.remain_vote_num+'次点赞机会');
                            }

                        }else{
                            $(".no_icbce").css({"display":"block"});
                            $("#zan").text('恭喜您点赞成功!');
                        }
                        var vote_num = parseInt($("#vote_num").text());
                        $("#vote_num").text(vote_num+1+'票');
                }else{
                     if(data.reason.code == -2){
                        tips('该活动已结束!');
                         return ;
                     }
                    if(data.reason.platform == 'icbce'){
                        $(".cur_icbce").css({"display":"block"});
                        $("#cur_zan").html('今日点赞机会已用完');
                        $("#desc").text('明天再来吧！');
                        $('.Nbut').css({"display":"block"});
                    }else{
                        $(".no_icbce").css({"display":"block"});
                        $("#zan").text('该投票方式暂时关闭!');
                    }
                }
            },
            'complete':function(xhr){
                $that.prop('disabled',false);
            }
        });
    });

    $('.Mbut').click(function(){
        if($(this).prop('disabled')) return false;
        $(this).prop('disabled',true);

        //exit;
        var $that = $(this);
        $.ajax({
            'type':'post',
            'dataType':'json',
            'url':pageConfig.urls,
            'success':function(data){
                if(data.status =='succ'){
                    window.location.href=pageConfig.succurl+'&win_data_id='+data.info.win_data_id;
                    return;
                }else{
                    tips(data.reason.msg);
                }

            }
        });

})


    $('.selink').click(function(){
        var search_val = $('.Search-inp').val();
    	if(search_val == ''){
    		 tips("搜索ID不能为空！");
             return false;
    	}

        var re = /^\d+$/;
        if(!re.test(search_val)){
            tips("输入格式不对!");
            return false;
        }
        window.location.href=pageConfig.succurl+search_val;

    });

    $(".Abut").click(function(){
    	if('icbce' == pageConfig.platform){
    		var num = parseInt(pageConfig.num);
	        var day_max_production_count = parseInt(pageConfig.day_max_production_count);
	        if(num >= day_max_production_count){
	            tips('您今天上传作品次数已用完！请明天再来吧！');
	            return;
	        }
	        $("#share").css({'display':'block'});
	        setTimeout(function(){window.location.href=pageConfig.locurl},2000);
	        return false;
    	}
    	window.location.href=pageConfig.locurl;
    });

    $('#zlbut').click(function(){
        var name=$('#name').val();
        var iphone=$('#iphone').val();
        var add=$('#add').val();

        if(name==""){
            tips("姓名不能为空");
            return false;
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(iphone))){
            tips("手机号码有误，请重填");
            return false;
        }else if(!(/^\d{4}$/.test(add))){
            tips("江湖密令有误,请重填");
            return false;
        }

        $.ajax({
            'type':'get',
            'dataType':'json',
            'data':{truename:name,telephone:iphone,address:add},
            'url':pageConfig.url,
            'success':function(data){

                if(data.status =='succ'){
                    tips('提交成功！');
                    setTimeout(function(){window.location.href=pageConfig.succurl},2000);
                    return;
                }else{
                    tips(data.reason);
                }

            }
        });
    })
});
