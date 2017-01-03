define(function(require, exports, module) {
		var $ = require("zepto"),
		tips = require('simpleTips'); //简单提示框; tips(data.msg);
		$("#tjxg").click(function(){			
			if($(this).prop('disabled')) return false;
			$(this).prop('disabled',true);
			var $that = $(this);
			var story=$("#textarea").val();
			var vedio=$("#vedio").val();
			$.ajax({
				'type':'post',
				'dataType':'json',
				'data':{'story':story,'vedio':vedio},
				'url':pageConfig.post_url,
				'success':function(data){
					if(data.status =='succ'){
						tips(data.info.msg);
						setTimeout(function(){window.location.href=pageConfig.home_url},2000);
                    	return;
					}else{
						tips(data.reason.msg);
					}
				},
				'complete':function(xhr){
					$that.prop('disabled',false);
				}
			});
		});
});
		  