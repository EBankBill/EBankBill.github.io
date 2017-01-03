define(function(require, exports, module) {
	var $ = require("zepto"),
	tips = require('simpleTips'); //简单提示框; tips(data.msg);
	$("#td").click(function(){
		// var that = $("#draw_prize");
		// that.attr("disabled","disabled");
		if($(this).prop('disabled')) return false;
		$(this).prop('disabled',true);
		$.ajax({
			'type':'get',
			'dataType':'json',
			'data':{},
			'url':pageConfig.getUrl,
			'success':function(data){
				if(data.status =='succ'){
					if(data.info.is_award == 'Y'){
						// tips("恭喜你！获得" + data.info.win, 2000);
						setTimeout(function(){window.location.href=pageConfig.guideUrl + data.info.prize_id + "&sn=" + data.info.sn;}, 0);
						return;
					}else{
						setTimeout(function(){window.location.href=pageConfig.guideUrl;}, 0);
						return;
					}
				}else{
					if(data.reason.is_award == 'N'){
						tips("网络异常", 0);
						// setTimeout(function(){window.location.href=data.reason.url;}, 2000);
					}else{
						tips("网络异常", 0);
						// setTimeout(function(){window.location.href=data.reason.url;}, 2000);
					}
					return;
				}
			},
		});
	});
});