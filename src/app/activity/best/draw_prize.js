define(function(require, exports, module) {
		var $ = require("zepto"),
		tips = require('simpleTips'); //简单提示框; tips(data.msg);
		$("#draw_prize").click(function(){
			if($(this).prop('disabled')) return false;
			var code = $("#code").val();
			if(code ==''){
				tips("兑奖码不能为空");
				return;
			}
			$(this).prop('disabled',true);
			var $that = $(this);
			$.ajax({
				'type':'get',
				'dataType':'json',
				'data':{code:code},
				'url':pageConfig.getUrl,
				'success':function(data){
					//alert(data.reason);
					if(data.status =='succ'){
						if(data.info.is_award == 'Y'){
							//中奖
							$("#fufail").hide();
							$("#fusucc").show();
						}else{
							$("#fufail").show();
							$("#fusucc").hide();
						}
					}else{
						$("#fufail").show();
						$("#fusucc").hide();
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
		  