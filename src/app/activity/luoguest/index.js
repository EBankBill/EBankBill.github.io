/**
 * @fileOverview  首页
 * @author xiejiabin
 * @email jiabin1@leju.com
 * @date 2015-1-21
 * @template
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    var roulette = require('roulette');
    var FakePage = require('./_fakepage');
    var tips = require('simpleTips');
    var common = require('common');
    require('./share');

    $(function() {
        $('#fpbox1').width((77 + 15) * $('#fpbox1 li').length);
        $('#fpbox2').width((60 + 15) * $('#fpbox2 li').length);

        var fakepage1 = new FakePage($('#fpwrap1'), $('#fpbox1'), Math.ceil($('#fpbox1 li').length / 3), (77 + 15) * 3);
        fakepage1.pageCount > 1 && fakepage1.init();

        var fakepage2 = new FakePage($('#fpwrap2'), $('#fpbox2'), Math.ceil($('#fpbox2 li').length / 4), (60 + 15) * 4);
        fakepage2.pageCount > 1 && fakepage2.init();

        $('#fail,#success').on('click', function() {
            $(this).hide();
        }).on('touchmove', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // return false;
        });


        // 轮盘赌
        (function rouletteGame() {
            // exe
            var radius = $('#rot .col').length; //分块儿
            var game = roulette({
                rot: $('#rot').get(0), //盘
                hand: $('.zz').get(0), //针
                evHand: $('.zz').get(0), //按钮
                ajaxUrl: $('#luoguest_draw').val(), //请求url
                clickTime: +$('#amount').text(), //次数
                radius: radius, //分块儿
                rotTime: 1000, //得到相应后的转盘动画时间 默认1000-2000
                dataFilter: function(data) {
                    data = JSON.parse(data);
                    if (data.code == 1) {
                        $('#prizeName').text(data.prize_name);
                        $('#prizeUrl').attr('href', data.url);
                        $('#prizePic').attr('src',data.prize_pic);
                        data = $('.prize' + data.prize_id).index() + 1; //取索引+1
                    } else {
                        if (data.code == 0) {
                            data = common.random(1, radius * .5) * 2; //偶数位未中奖
                        } else {
                            tips(data.message);
                            data = -1;
                        }
                    }
                    return data;
                },
                fnClickEnd: function(n) {
                    if (n != -1) {
                        $('#amount').text($('#amount').text() - 1);
                        var _id = n % 2 == 0 ? 'fail' : 'success';
                        $('#' + _id).show();
                        $(window).scrollTop(0); //回到顶部
                    }
                },
                gameOver: function() {
                    if (+$('#has_get_chance').val()) {
                        tips('您的抽奖次数已用完！');
                    } else {
                        tips('您还没有获取抽奖次数！');
                    }
                }
            });
        })();
    });

});
