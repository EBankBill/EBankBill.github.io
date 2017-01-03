/**
 * @fileOverview 宣言活动
 * @author yuanlin  
 * @email yuanlin@leju.com
 * @date 2015-04-10
 * @template 2015/移动/A03_腾讯微信平台/4月8日%20I%20Watch%20You/B03-好友宣言-点赞.html
 */
define(function(require, exports, modules) {
    var $ = require("zepto");
    require("./sound.js");
    var Mustache = require("mustache");
    // var slider = require("slider");
    var windowW = $(window).width();
    $(".d-tab").width(windowW);
    //tips 提示     
    var showTip = function(txt) {
        var message = $('<p style="background: rgba(0,0,0,0.5);z-index:999999; position: fixed;width: 126px;left: 50%;top: 50%;text-align: center;border-radius: 10px;padding: 10px;color: #fff" id="tips">' + txt + '</p>');
        $('body').append(message);
        var mes = message.get(0);
        mes.style.WebkitTransform = 'translate(-50%, -50%)';
        mes.style.MozTransform = 'translate(-50%, -50%)';
        mes.style.msTransform = 'translate(-50%, -50%)';
        mes.style.OTransform = 'translate(-50%, -50%)';
        mes.style.transform = 'translate(-50%, -50%)';
        window.setTimeout(function() {
            message.remove();
        }, 2000);
    };
    //点赞效果
    function pointanmite(){
        $("#jqpraise").prev().removeClass("d-i1");
        $(".pointip").removeClass("none");
        setTimeout(function(){
            $(".pointip").attr("style","transition-duration:1s; opacity:0");    
        }, 2000);
        $("#jqpraise").html(parseInt($("#jqpraise").html())+1);
        setTimeout(function(){$(".pointip").remove()},2000)
    };
    //执行点赞
    $("#pointpraise").click(function(){
        if($("#jqpraise").prev().attr("class")!=""){
             pointajax()
        }else{
            showTip("您已参与过点赞")
        }
    });
    //点赞请求
    function pointajax(){
        $.ajax({
            url: $("#pointurl").val(),
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                if (data.code == 1) {
                  pointanmite();
                  setTimeout(function(){
                    window.location.reload();
                  },2000)
                }else{
                    showTip(data.message)
                }
            }
        })
    };
    // // 滑签滚动
    // new slider("#slider2",{
    //     wrap: "#scroller2",
    //     trigger: "#handler2",
    //     activeTriggerCls: "d-cur",
    //     hasTrigger: true,
    //     useTransform: !0,
    // });
    //点击滑动
    $("#handler2").find("li").click(function(){
        var num = $(this).index();
        $(this).addClass('d-cur').siblings().removeClass('d-cur');
        $("#scroller2").find(".d-tab").eq(num).removeClass('none').siblings().addClass('none');
    })
    //点击加载更多！
    $("#jquerymore").click(function(){
        loadingajax()
    })
    function loadingajax(){
        $(".d-loading").removeClass("none");
        $("#jquerymore").remove();
        $.ajax({
            url: $("#loadingurl").val(),
            type: 'POST',
            // dataType: 'JSON',
            success: function(data) {
                data = JSON.parse(data);
                $(".d-loading").addClass("none");
                $("#hdlist").append(Mustache.to_html($("#hdlist_template").html(), data)); 
            }
        }) 
    };
    //评论按钮
    $("#comments").click(function(){
        $("#commentsdialog").removeClass("none");

        $("body,html").attr("style","overflow:hidden");
    });
    $("#commentsdialog").bind("touchmove",function(){
        return false
    })
    //评论弹出框 关闭
    $("#dialogclosed").click(function(){
         $("#commentsdialog").addClass("none");
         $("body,html").removeAttr("style");
         $(".d-textarea").val("")
     });
     $(".d-textarea").bind("click",function(){
        $(this).focus();
    })
    //提交评论按钮
    $("#confirmation").click(function(){
        $("body").removeAttr("style");
        if($(".d-textarea").val()!=""){
            if($("#confirmation").attr("class")!="jquerycm"){
                commentajax()
            }
        }else{
            showTip("请输入评论内容")
        }
    })
    //评论请求
    function commentajax(){
        $("#confirmation").addClass("jquerycm")
        $.ajax({
            url: $("#commenturl").val(),
            type: 'POST',
            dataType: 'json',
            data: {"content":$(".d-textarea").val()},
            success: function(data) {
                if (data.code == 1) {
                   setTimeout(function(){
                     $("#confirmation").removeClass("none")
                    window.location.reload();
                  },2000)
                }else{
                    showTip(data.message)
                }
            }
        })   
    }
})