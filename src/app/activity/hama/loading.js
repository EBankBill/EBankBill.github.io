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
   
    //点击加载更多！
    $("#more").click(function(){
        loadingajax()
    })
    function loadingajax(){
        $(".d-loading").removeClass("none");
        $("#more").remove();
        $.ajax({
            url: $("#windataurl").val(),
            type: 'POST',
            // dataType: 'JSON',
            success: function(data) {
                data = JSON.parse(data);
                $(".d-loading").addClass("none");
                $("#hdlist").append(Mustache.to_html($("#hdlist_template").html(), data)); 
            }
        }) 
    };
  
})