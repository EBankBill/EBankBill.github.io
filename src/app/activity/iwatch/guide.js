/**
 * @fileOverview 宣言活动
 * @author qinchunzhen  
 * @email chunzhen@leju.com
 * @date 2015-04-10
 * @template 2015/移动/A03_腾讯微信平台/4月8日%20I%20Watch%20You/B-01-我的宣言-进行中-集赞排行.html
 */
define(function(require, exports, modules){
    var $ = require("zepto");
    require("./sound.js");
    var Mustache = require("mustache");
    // var slider = require("slider");
    var windowW = $(window).width();
    $(".d-tab").width(windowW);
    var div = $(".d-popup");;
    var btn = $(".d-btn-1");
    btn.on("click", function(){
        if(!btn.length || !div.length){
            return;
        }
        div.removeClass("none");
    });
    div.on("click", function(){
        div.addClass("none");
    });
    // //滑签
    //  new slider("#slider2",{
    //     wrap: "#scroller2",
    //     trigger: "#handler2",
    //     activeTriggerCls: "d-cur",
    //     hasTrigger: true,
    //     useTransform: !0
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
            url: $("#commenturl").val(),
            type: 'get',
            dataType: 'json',
            success: function(data) {
                // data = JSON.parse(data);
                $(".d-loading").addClass("none");
                $("#hdlist").append(Mustache.to_html($("#hdlist_template").html(), data)); 
               
            }
        }) 
    };
})
