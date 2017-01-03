define(function(require, exports, module) {
	var $ = require("zepto"),
	tips = require('simpleTips'); //简单提示框; tips(data.msg);
	$("#ujia").click(function(){
		var that = $("#ujia");
		if(!that.hasClass('button-b')){
			that.addClass('button-b');
		}
		if($(this).prop('disabled')) return false;
		$(this).prop('disabled',true);
		$.ajax({
			'type':'get',
			'dataType':'json',
			'data':{share_u:pageConfig.share_u},
			'url':pageConfig.getUrl,
			'success':function(data){
				if(data.status == 'succ'){
					// tips(data.info, 2000);
					document.getElementById('fu').style.display='block';
					// setTimeout(function(){window.location.href=pageConfig.nextUrl;}, 2000);
					return;
				}else{
					// tips(data.reason, 2000);
					setTimeout(function(){window.location.href=pageConfig.nextUrl;}, 2000);
					return;
				}
			},
			// 'complete':function(xhr){
			// 	that.prop('disabled',false);
			// }
		});
	});
});
