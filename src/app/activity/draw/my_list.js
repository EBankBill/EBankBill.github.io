/**
 * @fileOverview: 涂鸦我的作品列表
 * @author: xiejiabin
 * @email: jiabin1@leju.com
 * @date: 2015-01-14 
 * @template: weixin.leju.com/trunk/activity/templates/v1.0/draw/my_list.html
 */
define(function(require, exports) {
    var $ = require("zepto");
    var tips = require('../../../mobile/utils/simple/simpleTips'); //提示tips
    var mustache = require('mustache'); //简单模板引擎

    var loadCtrl = {
        $refer: $('#loader'), //容器
        $btn: $('.moreList'), //加载更多按钮
        $loading: $('.sLoading'), //loading图
        isIdle: true,
        //转换为html
        toHtml: function(data) {
            var tmpl = $('#tmpl').html(); //模板字符串
            var html = mustache.render(tmpl, {
                result: data
            });
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
                        loadCtrl.$refer.before(html);
                    } else {
                        tips(data.msg);
                    }
                },
                error: function(xhr, errorType, error) {
                    tips('出错了');
                    loadCtrl.$btn.show();
                },
                complete: function(xhr, status) { //完成后解禁
                    loadCtrl.$loading.hide();
                    loadCtrl.isIdle = true;
                }
            });
        },
        init: function() {
            if (pageConf.pageOver) return false;
            loadCtrl.$btn.show().on('click', function() {
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
