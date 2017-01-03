define(function(require, exports, module) {
	var $ = require("zepto"),
	tips = require('simpleTips'); //简单提示框; tips(data.msg);
	$("#init_batch").click(function(){
		// var that = $("#ujia");
		// if(!that.hasClass('button-b')){
		// 	that.addClass('button-b');
		// }
		// if($(this).prop('disabled')) return false;
		// $(this).prop('disabled',true);
		$.ajax({
			'type':'get',
			'dataType':'json',
			'data':{},
			'url':pageConfig.getUrl,
			'success':function(data){
				if(data.status == 'succ'){
					// alert(data.info);
					setTimeout(function(){window.location.href=data.info.url;}, 0);
					return;
				}else{
					// tips('网络异常', 2000);
					setTimeout(function(){window.location.href=data.reason.url;}, 0);
					return;
				}
			},
		});
	});
});
