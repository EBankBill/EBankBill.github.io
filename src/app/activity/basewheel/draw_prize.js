define(function(require, exports, module) {
    var $ = require("zepto"),
        tips = require('simpleTips'); //简单提示框; tips(data.msg);
    var but = $(".luck");

		but.click(function(){

			if(pageConfig.msg != ''){
				tips(pageConfig.msg);
				return;
			}

			if(pageConfig.remain_num <=0){
				tips('抽奖次数不足！');
				return;
			}

			$(this).unbind('click'); //取消绑定的点击事件
			var that = $(this);
			$.ajax({
				'type':'post',
				'dataType':'json',
				//'data':{b_product_id:b_product_id,b_open_id:b_open_id},
				'url':pageConfig.url,
				'success':function(data){
					if(data.status =='succ'){
						$("#prize_name").html(data.info.prize_info.name);
						$("#prize_pic").attr({'src':data.info.prize_info.pic});
						$("#accept_prize").attr({'href':pageConfig.succurl+'&data_id='+data.info.data_id});
						alink(pageConfig.block_num,true);
					}else{

						if(data.reason.code == -7){
							tips(data.reason.message);
							return;
						}

						if(data.reason.code == -4){
							tips(data.reason.message);
							return;
						}

						$("#no_prize_name").html(data.reason.message);
						alink(pageConfig.block_num,false);

					}
				},
				'complete':function(xhr){
					that.prop('disabled',false);
				}
			});
		});



    function alink(block_num,win){
    	
        if (block_num==6){
        	var round = Math.round(Math.random()*3);
        }
        if (block_num==8){
        	var round = Math.round(Math.random()*4);
        }
        if (block_num==12){
        	var round = Math.round(Math.random()*6);
        }
       // alert(block_num);alert(round);
		//转盘分6份
		if (block_num==6){
			if(win){
				if(round == 0) {
					$("#js_prize").attr("class", "myprize-wrap Winning"); //中奖1
				}
				if(round==1){
					$("#js_prize").attr("class","myprize-wrap Winning-a"); //中奖2
				}
				if(round==2){
					$("#js_prize").attr("class","myprize-wrap Winning-b"); //中奖3
				}	
			}else{
				$("#js_prize").attr("class", "myprize-wrap Nowinning"); //转盘6份没有中奖
			}
				
		}
		//转盘分8份
		if (block_num == 8){
			if(win){
				if(round == 0) {
					$("#js_prize").attr("class", "myprize-wrap Winning8a"); //中奖1
				}
				if(round == 1) {
					$("#js_prize").attr("class", "myprize-wrap Winning8b"); //中奖2
				}
				if(round == 2) {
					$("#js_prize").attr("class", "myprize-wrap Winning8c"); //中奖3
				}
				if(round == 3) {
					$("#js_prize").attr("class", "myprize-wrap Winning8d"); //中奖4
				}
			}else{
				$("#js_prize").attr("class", "myprize-wrap Nowinning8"); //转盘8份没有中奖
			}
		}
			//转盘分12份
		if(block_num == 12){
			if(win){
				if(round == 0){
					$("#js_prize").attr("class", "myprize-wrap Winning12a"); //中奖1
				}
				if(round == 1){
					$("#js_prize").attr("class", "myprize-wrap Winning12b"); //中奖1
				}
				if(round == 2){
					$("#js_prize").attr("class", "myprize-wrap Winning12c"); //中奖1
				}
				if(round == 3){
					$("#js_prize").attr("class", "myprize-wrap Winning12d"); //中奖1
				}
				if(round == 4){
					$("#js_prize").attr("class", "myprize-wrap Winning12e"); //中奖1
				}
				if(round == 5){
					$("#js_prize").attr("class", "myprize-wrap Winning12f"); //中奖1
				}
			}else{
				$("#js_prize").attr("class", "myprize-wrap Nowinning12"); //转盘12份没有中奖
			}
		}
	    
		if(win){
			setTimeout(function() {
	            $("#prize_tc").show();
	        }, 2000);
		}else{
			setTimeout(function() {
	            $("#no_prize_tc").show();
	        }, 2000);
		}   
    }

	//点击确认领奖 执行
   $("#sub").click(function(){
        var truename = $('#truename').val();
        var telephone = $('#telephone').val();
        var address = $('#address').val();
        var id=$("#data_id").val();
		
       if(truename == ''){
           tips('领奖姓名不能为空！');
           return false;
       }else if(telephone == '' || !/^[\d]{11}$/.test(telephone)){
           tips('手机号格式不正确！');
           return false;
       }else if(address == ''){
           tips('领奖地址不能为空！');
           return false;
       }

       $.ajax({
           'type':'post',
           'dataType':'json',
           'data':{truename:truename,telephone:telephone,address:address,id:id},
           'url':pageConfig.url,
		   'async':'false',
           'success':function(data){

               if(data.status =='succ'){
                   tips(data.info.msg);
                   setTimeout(function(){
                       window.location.href=pageConfig.succurl},1000);
               }else{
				   if(data.reason.code != -10){
					   tips(data.reason.msg);
				   }
               }
           },
           'complete':function(xhr){
               //$that.prop('disabled',false);
           }
       });

   });
});
