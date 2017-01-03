/**
 * @fileOverview  羊 人气页
 * @author xiejiabin
 * @email jiabin1@leju.com
 * @date 2015-1-30
 * @template unite/myrenqi.html
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    var mustache = require('mustache');
    var tips = require('simpleTips');

    var loadCtrl = {
        $wrap: $('#loadWrap'), //最外层
        $box: $('#loadBox'), //容器
        $btn: $('#loadBtn'), //加载更多按钮
        $pic: $('#loadPic'), //loading图
        isIdle: true,

        load: function() { //从后台加载数据
            if (pageConf.pageOver || !loadCtrl.isIdle) return false;
            loadCtrl.isIdle = false;
            loadCtrl.$btn.addClass('none');
            loadCtrl.$pic.removeClass('none');
            $.ajax({
                type: 'get',
                url: pageConf.pageUrl,
                data: {
                    page: pageConf.pageIndex
                },
                success: function(data, status, xhr) {
                    data = JSON.parse(data);
                    loadCtrl.$btn.removeClass('none');
                    if (data.myrenqi.length > 0 ) {
                        pageConf.pageIndex = data.next_page;
                        if (data.next_page == 0) {
                            pageConf.pageOver = 1;
                            loadCtrl.$btn.addClass('none');
                        }
                        var html = mustache.to_html($('#tmpl').html(), data);
                        loadCtrl.$box.append(html);
                    } else {
//                        tips(data.msg);
                    }
                },
                error: function(xhr, errorType, error) {
                    tips('出错了');
                    loadCtrl.$btn.removeClass('none');
                },
                complete: function(xhr, status) { //完成后解禁                    
                    loadCtrl.isIdle = true;
                    loadCtrl.$pic.removeClass('none');
                }
            });
        },
        init: function() {
            if (pageConf.pageOver) return false;
            loadCtrl.$btn.removeClass('none').on('click', function() {
                loadCtrl.load();
                return false;
            });
            //滚动加载
            $(window).on('scroll touchend', function() {
                var limit = loadCtrl.$wrap.height() - $(this).height();
                if ($(this).scrollTop() >= limit){
                    loadCtrl.load();
                    $(this).scrollTop(limit - 10);
                }
            });
        }
    };
    loadCtrl.init();
});
