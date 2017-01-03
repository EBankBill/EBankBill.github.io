define(function(require, exports, module) {
		var $ = require("zepto"),
		tips = require('simpleTips'); //简单提示框; tips(data.msg);
		$.ajax({
			'type':'post',
			'dataType':'json',
			'data':'',
			'url':post_url,
			'complete':function(xhr, textStatus){
				var data = $.parseJSON(xhr.responseText);
				if(textStatus == 'success'){
					if(data.status == 'succ'){
						json = data.info;
						json_city = json;
						var html = '<option value="0">省份</option>';
						$("#city").html('<option value="0">城市</option>');
						for(var i in json){
							html += '<option value="'+jsonarray(i].id+'">'+jsonarray(i].name+'</option>';
						}
						$("#province").html(html);
					}else{
						alert(data.reason);
					}
				}
			}
		});
		$("#province").change(function (){
					var id = $(this).val();
					$.ajax({
						'type':'post',
						'dataType':'json',
						'data':'fid='+id,
						'url':post_url,
						'complete':function(xhr, textStatus){
							var data = $.parseJSON(xhr.responseText);
							if(textStatus == 'success'){
								if(data.status == 'succ'){
									json = data.info;
									json_city = json;
									var html = '<option value="0">城市</option>';
									for(var i in json){
										html += '<option value="'+jsonarray(i].id+'">'+jsonarray(i].name+'</option>';
									}
									$("#city").html(html);
								}else{
									alert(data.reason);
								}
							}
						}
					});
					
				});
		$(".but").click(function(){
			var province_id = parseInt($("#province").val());
			var city_id = parseInt($("#city").val());
			if(province_id == 0 || city_id == 0){
				tips('请选择赛区')
			}else{
				window.location.href = entrance_url+'&province_id='+province_id+'&city_id='+city_id;
			}
		});
});
		  