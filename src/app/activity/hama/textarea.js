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
        var message = $('<p style="background: rgba(0,0,0,0.5);font-size:18px;position: fixed;width: 250px;left: 50%;top: 50%;text-align: center;border-radius: 10px;padding: 10px;color: #fff" id="tips">' + txt + '</p>');
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
            showTip("请输入您的狠话！");
        }else{
            if(txtlength > 20){
                showTip("您的狠话已经超出"+(txtlength-20)+"个字！");
            }else{
                postXyText($(this));
            }     
        }
    })

    function postXyText(a){
    	if(a.attr('class').indexOf('disabled') >= 0){    		
    		return;
    	}
    	a.addClass('disabled');
        $.ajax({
            "type": "post",
            "url": $("#Sxy").val(),
            "data": {" content":$(".d-textarea").val()},
            "dataType": "json",
            "success": function(data) {
                if (data.code == 1 ||　data.code == -2) {
                    showTip(data.message);
                    setTimeout(function(){
                    	window.location.href = $("#succ-url").val();                        
                    }, 2000);
                }else{
                    showTip(data.message);
                    $(".d-btn-1").removeClass('disabled');
                }
            }
        })
    }
    
    $("#submit-user").on("click", function(){
        var tl = $("#truename").val().length;
        var ml = $("#mobile").val().length;
        if(tl == 0){
            showTip("请输入您的姓名！");
        }else if(ml == 0){
        	showTip("请输入您的手机号！");
        }else{
        	postXyWin();  
        }
    })

    function postXyWin(){
        $.ajax({
            "type": "post",
            "url": $("#submit-url").val(),
            "data": {truename:$("#truename").val(),mobile:$("#mobile").val(),mailing_address:$("#mailing_address").val()},
            "dataType": "json",
            "success": function(data) {
                if (data.code == 1) {
                    showTip(data.message);
                    setTimeout(function(){
                    	window.location.href = $("#succ-url").val();                        
                    }, 2000);
                }else{
                    showTip(data.message);
                }
            }
        })
    }

})