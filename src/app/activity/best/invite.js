/**
 * mingxing
 */
define(function(require, exports, module) {
    var $ = require("zepto"),
        tips = require('simpleTips'); //简单提示框; tips(data.msg);
    require("./share");
    $(function() {
        $("#tag_name").click(function(e){
            e.stopPropagation();
        });
        $(".tag").click(function(e){
            e.preventDefault();
            $(".tag").removeClass("Csel");
            $(this).addClass("Csel");
            pageConfig.tagId = $(this).data("id");
            pageConfig.tagName = $(this).data("name");
            $("#doVote").click();
        });
        $(".J_showCustomTag").click(function(){
            $(".J_customTag").show();
        });
        $("#doVote").click(function(e){
            e.preventDefault();
            var _this =this;
            if($(_this).is(".disabled"))
            {
                return;
            }
            var tagName = $.trim($("#tag_name").val());
            if(tagName!='')
            {
                pageConfig.tagId='';
                pageConfig.tagName = tagName;
            }
            if(pageConfig.tagName=='')
            {
                tips("请选择最人标签"); 
                return;
            }
            $(_this).addClass('disabled');
            $.post(pageConfig.voteUrl,{tag_id:pageConfig.tagId,tag_name:pageConfig.tagName},function(data){
                $(_this).removeClass('disabled');
                if(data.status == 'succ')
                {
                    location.href=data.info.url;
                }
                else
                {
                    tips(data.reason);  
                }
            },'json');
        });
    });
});
