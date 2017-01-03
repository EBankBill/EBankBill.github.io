define(function(require, exports, module) {
		var $ = require("zepto"),
		tips = require('simpleTips'); //简单提示框; tips(data.msg);
		$("#draw_prize").click(function(){			
			if($(this).prop('disabled')) return false;
			$(this).prop('disabled',true);
			var $that = $(this);
			$.ajax({
				'type':'get',
				'dataType':'json',
				//'data':{code:code},
				'url':pageConfig.getUrl,
				'success':function(data){
					if(data.status =='succ'){
						$("#fuu").show();
					}else{
						tips(data.reason);
					}
				},
				'complete':function(xhr){
					$that.prop('disabled',false);
				}
			});
			
			$("#fusucc").click(function(){
				$(this).hide();
			});
			$("#fufail").click(function(){
				$(this).hide();
			});
		});
});
		  