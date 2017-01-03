/**
 * @fileOverview 宣言活动
 * @author yuanlin  
 * @email yuanlin@leju.com
 * @date 2015-04-10
 * @template 2015/移动/A03_腾讯微信平台/4月8日%20I%20Watch%20You/A01-活动首页.html
 */
define(function(require, exports, modules) {
    var $ = require("zepto");
    var Cookie =require("cookie");
    var audio = $(".d-music").find("audio")[0];
  // audio.play();
   $(".d-music").click(function(){
        if (audio.paused) {
            audio.play();
            $(".d-music").removeClass('d-music-off');
            Cookie.remove("soundname");
        } else {
            audio.pause();
            $(".d-music").addClass('d-music-off');
            Cookie.set("soundname","sound",7)
        }
    });
   if(Cookie.get("soundname")=="sound"){
     $(".d-music").addClass('d-music-off');
     // alert("关闭声音")
   }else{
    if(audio){
    audio.play();
    }
      // alert("开启声音")
   };
})