define(function(require, exports, module) {
	var $ = require("jQuery"),
//		loaded = require("loaded"),
		imagesloaded = require("imagesloaded"),
		echarts = require("echarts"),
		DateFun = require("Date"),
		modernizr = require("modernizr"),
		turns = require("turn");

	//加载图片
	var loading_img_url = [
		"img/bgs.png",
		"img/day.png",
		"img/logo.png",
		"img/ren.png",
		"img/rl.png",
		"img/first0.png",
		"img/first1.png",
		"img/first2.png",
		"img/first3.png",
		"img/first4.png",
		"img/first5.png",
		"img/first6.png",
		"img/first7.png",
		"img/first8.png",
		"img/first9.png",
		"img/bottom-first.png",
		"img/bottom-next.png",
		"img/ren2.png",
		"img/ren3.png",
		"img/tz1.png",
		"img/sec3.png",
		"img/sec4h1.png",
		"img/sec4h2.png",
		"img/sec4h3.png",
		"img/sec4h4.png",
		"img/sec4star1.png",
		"img/sec4star2.png",
		"img/default1.png",
		"img/default1bottom.png",
		"img/yunbg1.png",
		"img/yuntitle.png",
		"img/yunulcard.png",
		"img/yunulcentral.png",
		"img/yunulcommunication.png",
		"img/yunulelectricity.png",
		"img/yunulfuelgas.png",
		"img/yunulhouse.png",
		"img/yunulinsurance.png",
		"img/yunulother.png",
		"img/yunultallage.png",
		"img/yunultv.png",
		"img/yunulwater.png",
		"img/ch1logo.png",
		"img/ch1xgj.png",
		"img/ch2logo.png",
		"img/ch2qlg.png",
		"img/ch2title.png",
		"img/ch3title.png",
		"img/ch3xdr.png",
		"img/chbg1.png",
		"img/chbg2.png",
		"img/chresultz.png",
		"img/endbg.png",
		"img/endbg2.png",
		"img/endhand.png",
		"img/newmz.png",
		"img/newyj.png",
		"img/newnone.png",
		"img/newshare.png",
		"img/newth.png",
	];
	
	var loader = new window.PxLoader();
       for (var i = 0; i < loading_img_url.length; i++) {
           loader.addImage(loading_img_url[i]);
       }
// 	loader.addImage(loading_img_url);
	loader.addImage("http://audio.src.jhmlink.com/mu.mp3");

    loader.addProgressListener(function (e) {
        var percent = Math.round((e.completedCount / e.totalCount) * 100);
        $("#loading_text").html("已加载 " + percent + " %");
        
    });
    loader.addCompletionListener(function () {
		
       /* $.ajax({
		type: "post",
		url: urlnum,
		async: true,
		dataType: "json",
		data: {

		},
		success: function(res) {


			
		}
	});*/
		var res ={
			"status": "succ",
			"user": 1,
			"data": {
				"first": {
					"data": 1,
					"numberDay": "0901",
					"numberUser": "121212"
				},
				"second": {
					"data": 1,
					"secondCharts": [
						{
							"value": 735,
							"name": "储蓄"
						},
						{
							"value": 310,
							"name": "理财"
						},
						{
							"value": 234,
							"name": "国债"
						},
						{
							"value": 135,
							"name": "基金"
						}
					],
					"curcorType": "积极型"
				},
				"incom": {
					"data": 1,
					"number": "9,000,002"
				},
				"mmoney": {
					"data": 1,
					"number": "9,000,000",
					"percent": "91%"
				},
				"yun": {
					"data": 1,
					"pay": {
						"yunulwater": {
							"fr": "16",
							"money": "180.8"
						},
						"yunulfuelgas": {
							"fr": "1",
							"money": "19990.8"
						},
						"yunultv": {
							"fr": "1",
							"money": "990.8"
						}
					}
				},
				"consume": {
					"data": 1,
					"money": "999,999",
					"consumeCharts": [
						{
							"value": 135,
							"name": "日常消费"
						},
						{
							"value": 110,
							"name": "生活缴费"
						},
						{
							"value": 134,
							"name": "经常差旅"
						},
						{
							"value": 135,
							"name": "资金转移"
						},
						{
							"value": 135,
							"name": "金融理财"
						},
						{
							"value": 135,
							"name": "高端消费"
						},
						{
							"value": 135,
							"name": "其他"
						}
					],
					"time": "0"
				},
				"chenghao": {
					"data": 1,
					"ch": "th"
				}
			}
		}
		$("#loading_bg").hide()
		if(typeof(res) != "object") {
			res = JSON.parse(res);
		}
		if(res.status == "succ") {
			if(res.user == 0) {
				$(".sec_index").css("display", "block");
			} else {
				$(".sec_index").css("display", "none");
				run(res);
			}
		}else {
			//报错
			$(".wrong").show();
		}
    });
    loader.start();

	//判断手机类型
	window.onload = function() {
			//alert($(window).height());
			var u = navigator.userAgent;
			if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
			} else if(u.indexOf('iPhone') > -1) { //苹果手机
				//屏蔽ios下上下弹性
				$(window).on('scroll.elasticity', function(e) {
					e.preventDefault();
				}).on('touchmove.elasticity', function(e) {
					e.preventDefault();
				});
			} else if(u.indexOf('Windows Phone') > -1) { //winphone手机
			}
		}
	
	var yunObj = {
		yunulcard: "加油卡充值",
		yunulcentral: "暖气费",
		yunulcommunication: "通讯费",
		yunulelectricity: "电费",
		yunulfuelgas: "燃气费",
		yunulhouse: "物业费",
		yunulinsurance: "保险费",
		yunulother: "其他",
		yunultallage: "税费",
		yunultv: "有线电视费",
		yunulwater: "水费"
	}
	
	function run(res) {
		var res_data = res.data;

		var d = new Date();
		d = d.Format("yyyy年MM月dd日");
		$(".first_date").html(d);

		var pagesArr = [];
		var have_first = res_data.first;
		var have_second = res_data.second;
		var have_incom = res_data.incom; //工资
		var have_mmoney = res_data.mmoney; //理财
		var have_yun = res_data.yun; //云缴费
		var have_chenghao = res_data.chenghao; //云缴费
		var have_consume = res_data.consume;//云支付
		if(res.user == 1) {
			//可生成账单用户
			//1
			if(have_first.data == 1) {
				var first_number_day = have_first.numberDay, //天数
					first_number_user = have_first.numberUser; //排名
				var first_number_dayArr = first_number_day.split('');
				pagesArr.push('<section class="sec_first" id="first">' +
					'<div class="logo"><img src="img/logo.png"/></div>' +
					'<div class="sec_con">' +
					'<div class="first_middle">' +
					'<div class="first_rl">' +
					'<img src="img/first' + first_number_dayArr[0] + '.png"/>' +
					'<img src="img/first' + first_number_dayArr[1] + '.png"/>' +
					'<img src="img/first' + first_number_dayArr[2] + '.png"/>' +
					'<img src="img/first' + first_number_dayArr[3] + '.png"/>' +
					'</div>' +
					'<img class="first_ren" src="img/ren.png"/>' +
					'</div>' +
					'<div class="first_bottom">' +
					'<p class="first_date">' + d + '</p>' +
					'<p class="first_number">您是第<span>' + first_number_user + '</span>名加入光大银行的用户。</p>' +
					'<p class="first_number first_number2">很高兴一路有您陪伴。</p>' +
					'</div>' +
					'</div>' +
					'<img src="img/bottom-first.png" class="sec_bottom"/>' +
					'</section>');
			}
			
			//2类型
			if(have_second.data == 1) {
				var second_curcor_type = have_second.curcorType; //积极 稳健
				var second_charts = have_second.secondCharts; //图表数据
				var option = {
					tooltip: {
						formatter: "{b} : {c} ({d}%)",
						textStyle: {
							fontSize: 24,
							fontWeight: 'bold',
							formatter: 'false'
						}
					},
					series: [{
						color: ['#ffd513', '#e75656', '#817bf3', '#ee8fff'],
						//					name: '访问来源',
						type: 'pie',
						center: ['50%', '50%'],
						data: second_charts, //data
						itemStyle: {
							emphasis: {
								shadowBlur: 50,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						label: {
							normal: {
								textStyle: {
									fontSize: 24,
									fontWeight: 'bold',
									formatter: 'false'
								}
							}
						}
					}]
				};
				pagesArr.push('<section class="sec_next">' +
					'<div class="logo"><img src="img/logo.png"/></div>' +
					'<div class="sec_con">' +
					'<p class="sec3_title">我的资产</p>' +
					'<div class="sec_two_charts_wrap">' +
					'<div id="sec_two_charts" style="width: 100%;height:450px;"><div/>' +
					'</div>' +
					'<div class="first_bottom">' +
					'<p class="first_number">您的资产配置是<span>' + second_curcor_type + '</span></p>' +
					'<p class="first_number"><span class="noneSpan"></span>祝您<span>2017</span>年资产迈向新台阶。</p>' +
					'</div>' +
					'<img class="second_ren ml20" src="img/ren2.png"/>' +
					'</div>' +
					'<img src="img/bottom-next.png" class="sec_bottom"/>' +
					'</section>');
			}
			//3工资
			if(have_incom.data == 1) {
				var have_incom_number = have_incom.number; //工资数

				var reg = new RegExp(",", "g");
				var have_incom_number_str = have_incom_number.replace(reg, "");

				var ham_y = parseInt(have_incom_number_str / 15 / 3 / 30 / 12), //汉堡
					ham_m = parseInt(have_incom_number_str / 15 / 3 % 365),
					cp = parseInt(have_incom_number_str / 2), //彩票
					zj = parseInt(have_incom_number_str / 50), //紫禁城
					move = parseInt(have_incom_number_str / 35); //电影
				pagesArr.push('<section class="sec_next">' +
					'<div class="logo"><img src="img/logo.png" /></div>' +
					'<div class="sec_con">' +
					'<p class="sec3_title">2016年我的工资</p>' +
					'<p class="sec4_number"><span>￥</span>' + have_incom_number + '</p>' +
					'<img class="sec4star1" src="img/sec4star1.png"/>' +
					'<img class="sec4star2" src="img/sec4star2.png"/>' +
					'<ul class="sec4_Ul">' +
					'<li class="sec4_li1">' +
					'<p class="sec4_li_p">您的工资收入每天三餐巨无霸，相当于<span>' + ham_y + '</span>年<span>' + ham_m + '</span>天的生活口粮。</p>' +
					'</li>' +
					'<li class="sec4_li2">' +
					'<p class="sec4_li_p">您的工资收入买两元一张的彩票，获得成为百万富翁的机会<span>' + cp + '</span>次。</p>' +
					'</li>' +
					'<li class="sec4_li3">' +
					'<p class="sec4_li_p">您的工资收入可以在紫禁城金銮殿上朝<span>' + zj + '</span>次。</p>' +
					'</li>' +
					'<li class="sec4_li4">' +
					'<p class="sec4_li_p">您的工资收入可以看<span>' + move + '</span>场电影，这个位置我包下了。</p>' +
					'</li>' +
					'</ul>' +
					'</div>' +
					'<img src="img/bottom-next.png" class="sec_bottom"/>' +
					'</section>');
			}

			//4理财金额
			if(have_mmoney.data == 1) {
				var have_mmoney_number = have_mmoney.number, //钱数
					have_mmoney_percent = have_mmoney.percent; //百分比
				var have_mmoney_percent_num = have_mmoney_percent.split('%');
				pagesArr.push('<section class="sec_next">' +
					'<div class="logo"><img src="img/logo.png" /></div>' +
					'<div class="sec_con">' +
					'<p class="sec3_title">2016年我的理财金额</p>' +
					'<p class="sec3_number"><span>￥</span>' + have_mmoney_number + '</p>' +
					'<div class="sec3_percent"><p>排名领先<span>' + have_mmoney_percent_num[0] + '<span>%</span></span>的理财用户</p></div>' +
					'<img class="sec3_tz1" src="img/tz1.png"/>' +
					'</div>' +
					'<img src="img/bottom-next.png" class="sec_bottom"/>' +
					'</section>');
			}
			
			//工资理财默认页
			if(have_second.data != 1 && have_incom.data != 1 && have_mmoney.data != 1) {
				pagesArr.push('<section class="sec_next">' +
					'<div class="logo"><img src="img/logo.png" /></div>' +
					'<div class="sec_con">' +
						'<p class="sec3_title">2016年我的资产配置情况</p>' +
						'<p class="sec_default1_p1">光大银行<span>丰富的理财</span>和<span>优质的服务</span>助您更合理的配置资产。</p>' +
						'<img class="sec_default1_img1" src="img/default1.png"/>' +
						'<div class="sec_default1_bottom">' +
							'<img src="img/ren3.png"/>' +
							'<img src="img/default1bottom.png"/>' +
						'</div>' +
					'</div>' +
					'<img src="img/bottom-next.png" class="sec_bottom"/>' +
				'</section>');
			}
			
			//5云缴费
			if(have_yun.data == 1) {
				var have_yun_pay = have_yun.pay;
				
				var have_yun_str = "";
				for(key in have_yun_pay) {
					have_yun_str += '<li class="sec5_li '+ key +'">' +
							'<ul>' +
								'<li class="sec5_li_title3"><span class="sec5_span1">'+ have_yun_pay[key].money +'</span><span class="sec5_span2">元</span></li>' +
								'<li class="sec5_li_title2"><span class="sec5_span1">'+ have_yun_pay[key].fr +'</span><span class="sec5_span2">次</span></li>' +
								'<li class="sec5_li_title">'+ yunObj[key] +'</li>' +
							'</ul>' +
						'</li>';
				}
				
				pagesArr.push('<section class="sec_next">' +
					'<div class="logo"><img src="img/logo.png" /></div>' +
					'<div class="sec_con yunbg">' +
					'<p class="sec5_title"><img src="img/yuntitle.png"/></p>' +
					'<ul class="sec4_Ul sec5_Ul">' +
					have_yun_str +
					'</ul>' +
					'</div>' +
					'<img src="img/bottom-next.png" class="sec_bottom"/>' +
					'</section>');
			}
			//无云缴费
			if(have_yun.data == 0) {
				pagesArr.push('<section class="sec_next">' +
					'<div class="logo"><img src="img/logo.png" /></div>' +
					'<div class="sec_con">' +
						'<p class="sec3_title">2016年我的云缴费</p>' +
						'<p class="sec_default1_p2">交通、水电、日常几百项生活费用，<br /><span>足不出户，一键解决。</span><br />光大云缴费，想你所想！<br />未来有云缴费的日子里，把更多的时间留给自己！</p>' +
						'<img class="sec_default1_img2" src="img/newyj.png"/>' +
					'</div>' +
					'<img src="img/bottom-next.png" class="sec_bottom"/>' +
				'</section>');
			}
			
			//云支付
			//2类型
			if(have_consume.data == 1) {
				var consume_charts = have_consume.consumeCharts; //图表数据
				var consume_time = have_consume.time;//时间
				var consume_money = have_consume.money;
				var option2 = {
					tooltip: {
						formatter: "{b} : {c} ({d}%)",
						textStyle: {
							fontSize: 24,
							fontWeight: 'bold',
							formatter: 'false'
						}
					},
					series: [{
						color: ['#ffd513', '#e75656', '#817bf3', '#ee8fff', '#88e8e9', '#62affe', '#a24bc6'],
						//					name: '访问来源',
						type: 'pie',
						center: ['50%', '50%'],
						data: consume_charts, //data
						itemStyle: {
							emphasis: {
								shadowBlur: 50,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						label: {
							normal: {
								textStyle: {
									fontSize: 24,
									fontWeight: 'bold',
									formatter: 'false'
								}
							}
						}
					}]
				};
				var consumeTimeStr = "";
				if(consume_time != 0) {
					consumeTimeStr = '<p class="yunpayTime">不仅如此，您使用云支付的时间长达:</p>' +
							'<p class="yunpayHaveTime"><span class="yunyear">'+ parseInt(consume_time / 12) +'</span>年<span class="yunmonth">'+ consume_time % 12 +'</span>月</p>'
				} else if(consume_time == 0) {
					consumeTimeStr = '<p class="yunpaynoTime">2016年您的消费<br />土豪起来真是连自己都怕啊</p>';
				}
				
				pagesArr.push('<section class="sec_next">' +
					'<div class="logo"><img src="img/logo.png" /></div>' +
					'<div class="sec_con">' +
						'<p class="sec3_title">2016年共支出金额</p>' +
						'<p class="sec3_number"><span>￥</span>' + consume_money + '</p>' +
						'<div class="sec_two_charts_wrap">' +
							'<div id="sec_consume_charts" style="width: 100%;height:450px;"></div>' +
						'</div>' +
						'<div class="yunpay">' +
							consumeTimeStr +
						'</div>' +
					'</div>' +
					'<img src="img/bottom-next.png" class="sec_bottom"/>' +
				'</section>');
			}
			
			//称号页
			if(have_chenghao.data == 1) {
				if(have_chenghao.ch == "gz") {
					pagesArr.push('<section class="sec_ch1">' +
						'<ul class="chlogo">' +
							'<li class="chlogo-img chlogo-border1"><img src="img/ch1logo.png"/></li>' +
							'<li class="chlogo-p"><p class="chlogo-c1">2016 · 我的年度对账单</p></li>' +
						'</ul>' +
						'<div class="sec_ch1_con pink">' +
							'<p class="ch1_title">剁手小公举</p>' +
							'<p class="ch1_content">2017做自己的女王，喜欢您就买买买，<span>光大 "购精彩"</span>,让您生活更精彩！</p>' +
							'<div class="sec_ch1_bottom">' +
								'<img src="img/ch1xgj.png"/>' +
								'<p class="ch1_mai">好喜欢，买买买...</p>' +
							'</div>' +
						'</div>' +
						'<img src="img/bottom-next.png" class="sec_bottom"/>' +
					'</section>');
				} else if(have_chenghao.ch == "dr") {
					pagesArr.push('<section class="sec_ch2">' +
						'<ul class="chlogo">' +
							'<li class="chlogo-img chlogo-border2"><img src="img/ch2logo.png"/></li>' +
							'<li class="chlogo-p"><p class="chlogo-c2">2016 · 我的年度对账单</p></li>' +
						'</ul>' +
						'<div class="sec_ch1_con purple">' +
							'<img class="dr_title" src="img/ch3title.png"/>' +
							'<p class="ch3_content textleft">2017你不理财，财不"理"你</p>' +
							'<p class="ch3_content textright">光大理财，理财小达人的首选</p>' +
							'<div class="sec_ch2_bottom">' +
								'<img src="img/ch3xdr.png"/>' +
							'</div>' +
						'</div>' +
						'<img src="img/bottom-next.png" class="sec_bottom"/>' +
					'</section>');
				} else if(have_chenghao.ch == "ql") {
					pagesArr.push('<section class="sec_ch2">' +
						'<ul class="chlogo">' +
							'<li class="chlogo-img chlogo-border2"><img src="img/ch2logo.png"/></li>' +
							'<li class="chlogo-p"><p class="chlogo-c2">2016 · 我的年度对账单</p></li>' +
						'</ul>' +
						'<div class="sec_ch1_con purple">' +
							'<img class="ql_title" src="img/ch2title.png"/>' +
							'<p class="ch2_content">掐指一算，您命里缺 <span>"光大"</span> <br />2017年从光大理财开始，实现人生梦想，走向人生巅峰。</p>' +
							'<div class="sec_ch2_bottom">' +
								'<img src="img/ch2qlg.png"/>' +
							'</div>' +
						'</div>' +
						'<img src="img/bottom-next.png" class="sec_bottom"/>' +
					'</section>');
				} else if(have_chenghao.ch == "th") {
					pagesArr.push('<section class="sec_ch1">' +
						'<ul class="chlogo">' +
							'<li class="chlogo-img chlogo-border1"><img src="img/ch1logo.png"/></li>' +
							'<li class="chlogo-p"><p class="chlogo-c1">2016 · 我的年度对账单</p></li>' +
						'</ul>' +
						'<div class="sec_ch1_con tuhao">' +
							'<p class="ch1_title">隐形小土豪</p>' +
							'<p class="ch1_content"> 2017成为土豪的路上，怎么能少<span>"光大 "</span>,光大理财，土豪必备！</p>' +
							'<div class="sec_ch1_bottom">' +
								'<img src="img/newth.png"/>' +
							'</div>' +
						'</div>' +
						'<img src="img/bottom-next.png" class="sec_bottom"/>' +
					'</section>');
				}
			}
			
			pagesArr.push( //end
				'<section class="sec_end" id="end">' +
					'<p class="end_open">打开礼包</p>' +
					'<p class="end_j">有惊喜呦！</p>' +
					'<div class="end_lb">' +
						'<img src="img/endlh.png"/>' +
					'</div>' +
					'<img class="endhand" src="img/endhand.png"/>' +
				'</section>');

			loading();

		} else if(res.user == 2) {
			pagesArr.push('<section class="sec_next" id="first">' +
					'<div class="logo"><img src="img/logo.png" /></div>' +
					'<div class="sec_con">' +
						'<p class="sec3_title">2016年我的资产配置情况</p>' +
						'<p class="sec_default1_p1">光大银行<span>丰富的理财</span>和<span>优质的服务</span>助您更合理的配置资产。</p>' +
						'<img class="sec_default1_img1" src="img/default1.png"/>' +
						'<div class="sec_default1_bottom">' +
							'<img src="img/ren3.png"/>' +
							'<img src="img/default1bottom.png"/>' +
						'</div>' +
					'</div>' +
					'<img src="img/bottom-first.png" class="sec_bottom"/>' +
				'</section>');
				pagesArr.push('<section class="sec_next">' +
					'<div class="logo"><img src="img/logo.png" /></div>' +
					'<div class="sec_con">' +
						'<p class="sec3_title">2016年我的云缴费</p>' +
						'<p class="sec_default1_p2">交通、水电、日常几百项生活费用，<br /><span>足不出户，一键解决。</span><br />光大云缴费，想你所想！<br />未来有云缴费的日子里，把更多的时间留给自己！</p>' +
						'<img class="sec_default1_img2" src="img/newyj.png"/>' +
					'</div>' +
					'<img src="img/bottom-next.png" class="sec_bottom"/>' +
				'</section>');
				
				pagesArr.push('<section class="sec_next">' +
					'<div class="logo"><img src="img/logo.png" /></div>' +
					'<div class="sec_con">' +
						'<p class="sec3_title"></p>' +
						'<p class="sec_default1_p2">由于我们对您的了解不够深刻，<br /><span>暂时无法生成账单。</span><br />欢迎多使用光大银行各项服务，<br />下次账单活动时期待看到您的精彩账单。</p>' +
						'<img class="sec_default1_img3" src="img/newnone.png"/>' +
					'</div>' +
					'<img src="img/bottom-next.png" class="sec_bottom"/>' +
				'</section>');
				
				pagesArr.push('<section class="sec_ch2">' +
						'<ul class="chlogo">' +
							'<li class="chlogo-img chlogo-border2"><img src="img/ch2logo.png"/></li>' +
							'<li class="chlogo-p"><p class="chlogo-c2">2016 · 我的年度对账单</p></li>' +
						'</ul>' +
						'<div class="sec_ch1_con purple">' +
							'<img class="ql_title" src="img/ch2title.png"/>' +
							'<p class="ch2_content">掐指一算，您命里缺 <span>"光大"</span> <br />2017年从光大理财开始，实现人生梦想，走向人生巅峰。</p>' +
							'<div class="sec_ch2_bottom">' +
								'<img src="img/ch2qlg.png"/>' +
							'</div>' +
						'</div>' +
						'<img src="img/bottom-next.png" class="sec_bottom"/>' +
					'</section>');
				pagesArr.push( //end
				'<section class="sec_end" id="end">' +
					'<p class="end_open">打开礼包</p>' +
					'<p class="end_j">有惊喜呦！</p>' +
					'<div class="end_lb">' +
						'<img src="img/endlh.png"/>' +
					'</div>' +
					'<img class="endhand" src="img/endhand.png"/>' +
				'</section>');
			loading();
		}

		var date_start;
		var date_end;
		date_start = getNowFormatDate();

		//预加载
		function loading() {
			var numbers = 0;
			var length = loading_img_url.length;

			for(var i = 0; i < length; i++) {
				var img = new Image();
				img.src = loading_img_url[i];
				img.onerror = function() {
					numbers += (1 / length) * 100;
				}
				img.onload = function() {
					numbers += (1 / length) * 100;
					$('.number').html(parseInt(numbers) + "%");
//						console.log(numbers);
					if(Math.round(numbers) == 100) {
						//$('.number').hide();
						date_end = getNowFormatDate();
						var loading_time = date_end - date_start;
						//预加载图片
						$(function progressbar() {
							//拼接图片
							$('.shade').hide();
							var tagHtml = "";
							for(var i = 0; i <= pagesArr.length; i++) {
								if(i == 0) {
									tagHtml += pagesArr[0];
								} else if(i == pagesArr.length - 1) {
									tagHtml += pagesArr[pagesArr.length - 1];
								} else {
									tagHtml += pagesArr[i];
								}
							}
							$(".flipbook").append(tagHtml);
							var w = $(".graph").width();
							$(".flipbook-viewport").show();
							//第二页图表
							if(have_second.data == 1) {
								var leftEcharts = echarts.init(document.getElementById("sec_two_charts"));
								leftEcharts.setOption(option);
							}
							//云支付图表
							if(have_consume.data == 1) {
								
								var leftEcharts2 = echarts.init(document.getElementById("sec_consume_charts"));
								leftEcharts2.setOption(option2);
								//console.log(option2)
							}
							//监听翻页
							$(".flipbook").bind("start", function(e, page, view) {
								$(".sec_bottom").css("display", "none");
							});
							$(".flipbook").bind("end", function(e, page, view) {
								$(".sec_bottom").show(100);
							});
							$(".return").bind("touchend", function() {
								$(".flipbook").turn('page', 1); //跳转页数
							});
						});
						//配置turn.js
						function loadApp() {
							var w = $(window).width();
							var h = $(window).height();
							$('.flipboox').width(w).height(h);
							$(window).resize(function() {
								w = $(window).width();
								h = $(window).height();
								$('.flipboox').width(w).height(h);
							});

							$('.flipbook').turn({
								// Width
								width: w,
								// Height
								height: h,
								// Elevation
								elevation: 50,
								display: 'single',
								// Enable gradients
								gradients: true,
								// Auto center this flipbook
								autoCenter: true,
								when: {
									turning: function(e, page, view) {
//										if(page == 1) {
//											$(".btnImg").css("display", "none");
//											$(".mark").css("display", "block");
//										} else {
//											$(".btnImg").css("display", "block");
//											$(".mark").css("display", "none");
//										}
//										if(page == pagesArr.length) {
//											$(".nextPage").css("display", "none");
//										} else {
//											$(".nextPage").css("display", "block");
//										}
									},
									turned: function(e, page, view) {
//										console.log(page);
										var total = $(".flipbook").turn("pages"); //总页数
//										if(page == 1) {
//											$(".return").css("display", "none");
//											$(".btnImg").css("display", "none");
//										} else {
//											$(".return").css("display", "block");
//											$(".btnImg").css("display", "block");
//										}
//										if(page == 2) {
//											$(".catalog").css("display", "block");
//										} else {
//											$(".catalog").css("display", "none");
//										}
										//抽奖
										if(page == pagesArr.length) {
											$(".end_lb").on("touchstart",function() {
												console.log($(this))
												$(".end_lb>img").addClass("animate");
												//摇礼盒
												setTimeout(function() {
													if(res.user == 2) {
														$(".flipbook-viewport").hide();
														$(".resultMZ").css("display","block");
													}else if(res.user == 1){
														//ajax
//														$(".resultZJ").css("display","block");
														//抽奖
														lottery();
													}
													$(".btn-share").click(function() {
														$(".shareWrap").show();
													});
													$(".shareWrap").click(function() {
														$(this).hide();
													});
												},1000);
											});
										}
									}
								}
							})
						}
						yepnope({
							test: modernizr.csstransforms,
							yep: [turns],
							complete: loadApp
						});
					};
				}
			}
		}
		//		loading();
		
		
		
		function getNowFormatDate() {
			var date = new Date();
			var seperator1 = "";
			var seperator2 = "";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
				"" + date.getHours() + seperator2 + date.getMinutes() +
				seperator2 + date.getSeconds();
			return currentdate;
		}

	}

});

