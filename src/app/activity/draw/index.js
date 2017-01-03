/**
 * @fileOverview: 首页
 * @author: xiejiabin
 * @email: jiabin1@leju.com
 * @date: 2015-05-26
 * @template
 */
define(function(require, exports) {
    var $ = require("zepto");
    if(!pageConf.is_follow){
    	$('.show_mask').on('click',function(){
    		$('.maskfollow').show();
    		return false;
    	});
    	$('.maskfollow').on('click',function(){
    		$(this).hide();
    	});
    }
});
