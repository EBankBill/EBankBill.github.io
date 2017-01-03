/**
 * @fileOverview 宣言活动
 * @author yuanlin    
 * @email yuanlin@leju.com
 * @date 2015-04-14
 * @phptemplate weixin.leju.com\trunk\activity\templates\v1.0\iwatch\huojiang.html
 */
define(function(require, exports, modules) {
    var $ = require("zepto");
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
    function uname(){
        var unameflag = false;
        var uname = $("#realName").val();
        if(uname==""){
            showTip("请输入姓名！")
        }else{
            unameflag = true
        }
        return unameflag
    };
    function tele(){
        var teleflag = false;
        var tele = $("#phone").val();
        var reg = /^0?(1)[0-9]{10}$/;
        if(tele==""){
            showTip("请输入手机号码！");
        }else if(!reg.test(tele)){
            showTip("请输入正确的手机号码！");
        }else{
            teleflag = true
        }
        return teleflag
    };
     $("#btn_submit").click(function(){
        if(uname()&&tele()){
            tijiaoajax()
        }
    });
    function tijiaoajax(){
        $.ajax({
            url:$("#form").attr("action"),
            type:"post",
            data:$("#form").serialize(),
            success:function(data){
                data = JSON.parse(data);
                if(data.status=="succ"){
                    showTip(data.msg);
                    setTimeout(function(){
                        window.location.href = data.info;
                    }, 1000);
                }else{
                    showTip(data.info)
                }
            }
        })
    }
})    