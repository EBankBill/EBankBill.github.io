/**
 * @fileOverview 宣言活动
 * @author qinchunzhen  
 * @email chunzhen@leju.com
 * @date 2015-04-10
 * @template 2015/移动/A03_腾讯微信平台/4月8日%20I%20Watch%20You/A02-宣言页-01.html
 */
define(function(require, exports, modules) {
    var $ = require("zepto");
    require("./sound.js")
    //tips 提示     
    var showTip = function(txt) {
        var message = $('<p style="background: rgba(0,0,0,0.5);position: fixed;width: 126px;left: 50%;top: 50%;text-align: center;border-radius: 10px;padding: 10px;color: #fff" id="tips">' + txt + '</p>');
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
    $(".d-btn-1").on("click", function(){
        var txtlength = $(".d-textarea").val().length;
        if(txtlength == 0){
            showTip("请输入您的宣言！");
        }else{
            if(txtlength > 50){
                showTip("您的宣言已经超出"+(txtlength-50)+"个字！");
            }else{
                postXyText()
            }     
        }
    })

    function postXyText(){
        $.ajax({
            "type": "post",
            "url": $("#Sxy").val(),
            "data": {" content":$(".d-textarea").val()},
            "dataType": "json",
            "success": function(data) {
                if (data.code == 1) {
                    showTip(data.message);
                    setTimeout(function(){
                        window.location.reload()
                    }, 2000);
                }else{
                    showTip(data.message)
                }
            }
        })
    }

})