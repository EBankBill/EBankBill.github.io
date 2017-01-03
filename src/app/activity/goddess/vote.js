define(function(require, exports, module) {
		var $ = require("zepto"),
		tips = require('simpleTips'); //简单提示框; tips(data.msg);
		$("#Afotbut").click(function(){			
			if($(this).prop('disabled')) return false;
			$(this).prop('disabled',true);
			var $that = $(this);
			$.ajax({
				'type':'post',
				'dataType':'json',
				//'data':{code:code},
				'url':pageConfig.getUrl,
				'success':function(data){
					if(data.status =='succ'){
						
						$("#fu").show();
						pageConfig.vote_draw_prize_url = pageConfig.vote_draw_prize_url+ "&dkey="+data.info.dkey;
						//alert(pageConfig.vote_draw_prize_url);
						setTimeout(function(){window.location.href=pageConfig.vote_draw_prize_url},2000);
                    	return;
					}else{
						if(data.reason.code == -4 || data.reason.code == -15 || data.reason.code ==-16){
							$("#vote_msg").html(data.reason.msg);
							$("#ready_vote").show();
						}else if(data.reason.code == -5){
							//有专门没有投票机会的浮层
							//$("#vote_msg").html(data.reason.msg);
							$("#no_change").show();
						}else {
							tips(data.reason.msg);
						}
						
					}
				},
				'complete':function(xhr){
					$that.prop('disabled',false);
				}
			});
		});
});
		  