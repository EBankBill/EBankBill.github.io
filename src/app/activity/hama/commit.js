/**
 * @fileOverview 宣言活动
 * @author qinchunzhen  
 * @email chunzhen@leju.com
 * @date 2015-04-13
 * @template 2015/移动/A03_腾讯微信平台/4月8日%20I%20Watch%20You/D02_领取奖品.html
 */
define(function(require, exports, modules){
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

   $("#name").on("blur", function(){
        uname()
    })

   $("#telephoneno").on("blur", function(){
        tele()
   })
   $("#commit").on("blur", function(){
        telecommit()
   })
   $("#image_code").on("blur", function(){
        imagcommit()
   })

    function uname(){
        var unameflag = false;
        var uname = $("#name").val();
        if(uname==""){
            showTip("请输入姓名！")
        }else{
            unameflag = true
        }
        return unameflag
    };
    function tele(){
        var teleflag = false;
        var tele = $("#telephoneno").val();
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
    function telecommit(){
        var telecommitflag = false;
        var telecommit = $("#commit").val();
        if(telecommit==""){
            showTip("请输入验证码！");
        }else{
            return telecommitflag = true;
        }
        return telecommitflag
    }
    function imagcommit(){
        var imagcommitflag = false;
        var imagcommit = $("#image_code").val();
        if(imagcommit==""){
            showTip("请输入验证码！");
        }else{
            return imagcommitflag = true;
        }
        return imagcommitflag
    }


    var src = $("#imgCodePic").attr("src");
    $("#getNewImgCode").on("click", function(){       
        $("#imgCodePic").attr("src", src+ "&data="+new Date().getTime());
    })


    $("#submit").on("click", function(){
        // console.log($("#address").length?$("#address").val():"");
        if(uname()&&tele()&&telecommit()&&imagcommit()){
            if($("#submit").attr("jquery")!="jquery"){
                $("#submit").attr("jquery","jquery")
                $.ajax({
                 type: "post",
                 url: $("#form").attr("action"),
                 datatype: "json",
                 data: {"truename": $("#name").val(),
                        "telphone": $("#telephoneno").val(),
                        "address": $("#address").length?$("#address").val():"",
                        "phone_code": $("#commit").val(),
                        "image_code": $("#image_code").val(),
                        "sn": $("#sn").val(),
                        "iwid": $("#iwid").val()
                        },
                     success: function(data){
                       var data = JSON.parse(data)
                         if(data.code==1){  
                            $("#submit").removeAttr('jquery');
                            window.location.href = data.jump_url                     
                         }else{
                             $("#submit").removeAttr('jquery');
                            showTip(data.message)
                         }
                     }
                })         
            }
        }
    });

    var count = 59;
    function CountDown(){
        $("#code").val(count + "秒后重新获取");
        count--;
        if( count < 0 ){
            count = 59;
            $("#code").val("获取验证码");
            $("#code").removeAttr("disabled");
            $("#code").removeAttr("isclick")
            return;
        }else{
            window.setTimeout(CountDown, 1000);
        }
    }

    $("#code").click(function(){
        var phoneval = $("#telephoneno").val();
        if($("#code").attr("isclick")=="true"){
            return false;
        }else{  
            if(tele()){  
                $("#code").attr("isclick","true"); 
                $("#code").val("发送中..");  
                $("#code").attr("disabled",""); 
                $.ajax({
                    url:$("#sms_api").val(),
                    type:"post",
                    data:{"telphone":phoneval},
                    dataType:"json",
                    success: function(msg){
                        if(msg.code==1){
                             window.setTimeout(CountDown, 1000);
                        }else{
                            showTip(msg.message);
                            $("#code").removeAttr("disabled");
                            $("#code").removeAttr("isclick");
                            $("#code").val("获取验证码")
                        }
                    }
                })
            }
        }
    })

})