/**
 * @fileOverview: 涂鸦作品列表
 * @author: xiejiabin
 * @email: jiabin1@leju.com
 * @date: 2015-01-14
 * @template: weixin.leju.com/trunk/activity/templates/v1.0/draw/draw_list.html
 */
define(function(require, exports) {
    var $ = require("zepto");
    var tips = require('../../../mobile/utils/simple/simpleTips'); //提示tips
    var mustache = require('mustache'); //简单模板引擎
    var touchClick = (window.navigator.userAgent.toLowerCase().indexOf('mobile') != -1) ? 'touchstart' : 'click';
    if(!pageConf.is_follow){
    	$('.show_mask').on('click',function(){
    		$('.maskfollow').show();
    		return false;
    	});
    	$('.maskfollow').on('click',function(){
    		$(this).hide();
    	});
    }
    //搜索控制
    var searchCtrl = {
        isIdle: true,
        getId: function() {
            return $('#txtSearch').val().trim();
        },
        showBox: function() {
            $('.sDetailWinBox').show();
            $('#txtSearch').focus();
        },
        hideBox: function() {
            $('.sDetailWinBox').hide();
            $('#txtSearch').val('');
        },
        showLoading: function() {
            $('.sPublicWin').eq(0).show();
        },
        hideLoading: function() {
            $('.sPublicWin').eq(0).hide();
        },
        failTips: function() {
            $('.sPublicWin').eq(1).show();
            setTimeout(function() {
                $('.sPublicWin').eq(1).hide();
            }, 1000);
        },
        search: function() {
            var msg = '',
                workId = searchCtrl.getId();
            if (!searchCtrl.isIdle) msg = '搜索太频繁哦';
            if (!msg && !workId) msg = '请输入作品编号'; //empty
            if (msg) {
                tips(msg);
                $('#txtSearch').focus();
                return false;
            }
            searchCtrl.isIdle = false;
            searchCtrl.hideBox();
            searchCtrl.showLoading();
            $.ajax({
                type: 'get',
                url: pageConf.searchUrl,
                data: {
                    works_id: workId
                },
                success: function(data, status, xhr) {
                    data = JSON.parse(data);
                    if (data.type == 'succ') {
                        location.href = data.url;
                    } else {
                        searchCtrl.failTips();
                    }
                },
                error: function(xhr, errorType, error) {
                    tips('出错了');
                },
                complete: function(xhr, status) { //完成后解禁
                    searchCtrl.isIdle = true;
                    searchCtrl.hideLoading();
                }
            });
        },
        init: function() {
            //弹层
            $('.searchBox').on(touchClick, function() {
                searchCtrl.showBox();
                return false;
            });
            $('.sDetailWinBox .apply').on(touchClick, function() {
                searchCtrl.search();
                return false;
            });
            $('.sDetailWinBox .close').on(touchClick, function() {
                searchCtrl.hideBox();
                return false;
            });
            //回车事件
            $('#txtSearch').on('keyup', function(e) {
                if (e.keyCode == 13) {
                    searchCtrl.search();
                    return false;
                }
            });
        }
    };
    searchCtrl.init();


    var loadCtrl = {
        $refer: $('#loader'), //容器
        $btn: $('.moreList'), //加载更多按钮
        $loading: $('.sLoading'), //loading图
        isIdle: true,
        //转换为html
        toHtml: function(data) {
            var tmpl = $('#tmpl').html(); //模板字符串
            /*
            var arrMain = [],
                arrSub = [];
            for (var i = 0; i < data.length; i++) {
                arrSub.push(data[i]);
                ((i + 1) % 3 == 0) && arrMain.push({
                    arr: arrSub.splice(0, arrSub.length)
                });
            }
            arrSub.length && arrMain.push({
                arr: arrSub.splice(0, arrSub.length)
            });
            */
            var html = mustache.render(tmpl, data);
            return html; //转html//转html
        },
        load: function() { //从后台加载数据
            if (pageConf.pageOver || !loadCtrl.isIdle) return false;
            loadCtrl.isIdle = false;
            loadCtrl.$btn.hide();
            loadCtrl.$loading.show();
            $.ajax({
                type: 'get',
                url: pageConf.pageUrl,
                data: {
                    page: pageConf.pageIndex
                },
                success: function(data, status, xhr) {
                    data = JSON.parse(data);
                    loadCtrl.$btn.show();
                    if (data.type == 'succ') {
                        pageConf.pageIndex = data.next_page;
                        if (data.next_page == -1) {
                            pageConf.pageOver = 1;
                            loadCtrl.$btn.hide();
                        }
                        var html = loadCtrl.toHtml(data.result);
                        loadCtrl.$refer.append(html);
                    } else {
                        tips(data.msg);
                    }
                },
                error: function(xhr, errorType, error) {
                    tips('出错了');
                    loadCtrl.$btn.show();
                }, 
                complete: function(xhr, status) { //完成后解禁                    
                    loadCtrl.isIdle = true;
                    loadCtrl.$loading.hide();
                }
            });
        },
        init: function() {
            if (pageConf.pageOver) return false;
            loadCtrl.$btn.show().on(touchClick, function() {
                loadCtrl.load();
                return false;
            });
            //滚动加载
            $(window).on('scroll touchmove', function() {
                var limit = $('body').height() - $(this).height();
                if ($(this).scrollTop() >= limit) loadCtrl.load();
            });
        }
    };
    loadCtrl.init();
});
