/**
 * 投票
 * @author mingxing
 * @email niemingxing@126.com
 * @date 2015-11-18
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    var tips = require('simpleTips');
    var common = require('common');
    var imagePreview = require('./wx_image_preview');
    require('./share');
    //图片预览
    $(".J_imageView").click(function(){
        pageConf.cur_pic = $(this).data('src');
        var srcList = new Array();
        for(var i=0;i<$(".wx_image").length;i++)
        {
             srcList.push($(".wx_image").eq(i).data('src'));  
        }
        imagePreview.init(pageConf.cur_pic,srcList);
    });
    $(".J_doVote").click(function(e){
        e.preventDefault();
        var _this = this;
        if($(_this).is(".disabled"))
        {
            return;
        }
        var dot_id = $(_this).data('id');
        var share_u  = pageConf.share_u;
        if(dot_id == '') return;
        $(_this).addClass('disabled');
        $.post(pageConf.vote_url,{dot_id:dot_id,share_u:share_u},function(data){
            $(_this).removeClass('disabled');
            if(data.status == 'succ')
            {
                location.href=data.info.url;
            }
            else
            {
                if(data.error_code && data.error_code == 1001)
                {
                    $("#repeatVoteError").removeClass('none');
                }
                else
                {
                    $("#tipPanel").removeClass('none');
                    $("#tipPanel .message").html(data.reason);
                }
                
            }
        },'json');
    });
});
