define(function(require, exports, module) {
		var $ = require("zepto"),
		tips = require('simpleTips'); //简单提示框; tips(data.msg);
		$("#lingqu").click(function(e){
			if($(this).prop('disabled')) return false;
			e.preventDefault();
			var truename = $("#truename").val();
			var telphone = $("#telphone").val();
			var idcard = $("#idcard").val();
			var address = $("#address").val();
			if(truename == ''){
				tips('请填写姓名');
				return;
			}
			if(telphone == ''){
				tips('手机号格式不对');
				return;
			}
			if(pageConfig.prizeType == 'swlp'){
				if(idcard == ''){
					tips('请填写身份证');
					return;
				}
				if(address == ''){
					tips('请填写地址');
					return;
				}
			}
			$(this).prop('disabled',true);
			var $that = $(this);
			$.ajax({
				'type':'post',
				'dataType':'json',
				'data':{sn:pageConfig.sn,truename:truename,telphone:telphone,idcard:idcard,address:address},
				'url':pageConfig.getUrl,
				'success':function(data){
					if(data.status =='succ'){
						tips(data.info.message,2000);
						setTimeout(function(){window.location.href=data.info.url;},2000);
					}else{
						tips(data.reason,1000);
					}
				},
				'complete':function(xhr){
					$that.prop('disabled',false);
				}
			});
		});
	}); 
		