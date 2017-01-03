/**
 * @fileOverview: 涂鸦作品详情
 * @author: xiejiabin
 * @email: jiabin1@leju.com
 * @date: 2015-01-14
 * @template: weixin.leju.com/trunk/activity/templates/v1.0/draw/draw_detail.html
 */
define(function(require, exports) {
    var $ = require("zepto");
    require('./share'); //分享
    var tips = require('../../../mobile/utils/simple/simpleTips'); //提示tips
    var mustache = require('mustache'); //简单模板引擎
    var touchClick = (window.navigator.userAgent.toLowerCase().indexOf('mobile') != -1) ? 'touchstart' : 'click';

    //评论加载控制
    var loadCtrl = {
        $box: $('.sComment ul'), //容器
        $btn: $('.moreList'), //加载更多按钮
        $loading: $('.sLoading'), //loading图
        $amount: $('#commentAmount'),
        isIdle: true,
        toHtml: function(data) {
            var tmpl = $('#tmplComment').html(); //模板字符串
            if (!('push' in data)) data = [data];
            var html = mustache.render(tmpl, {
                result: data
            });
            return html; //转html//转html
        },
        fake: function(content, toNickname) { //js控制插入当前发送的消息，在提交评论成功后调用 content:评论内容
            pageConf.user.content = content;
            pageConf.user.to_nickname = toNickname;
            var html = loadCtrl.toHtml(pageConf.user);
            loadCtrl.$box.prepend(html);
        },
        load: function() { //从后台加载数据
            if (pageConf.more.over || !loadCtrl.isIdle) return false;
            loadCtrl.isIdle = false;
            var that = loadCtrl;
            that.$btn.hide();
            that.$loading.show();
            $.ajax({
                type: 'get',
                url: pageConf.more.url,
                data: {
                    offset: pageConf.more.offset,
                    page: pageConf.more.page
                },
                success: function(data, status, xhr) {
                    data = JSON.parse(data);
                    that.$btn.show();
                    if (data.type == 'succ') {
                        pageConf.more.page = data.next_page;
                        if (data.next_page == -1) {
                            pageConf.more.over = 1;
                            that.$btn.hide();
                        }
                        var html = that.toHtml(data.result);
                        that.$box.append(html);
                    } else {
                        tips(data.msg);
                    }
                },
                error: function(xhr, errorType, error) {
                    tips('出错了');
                    that.$btn.show();
                },
                complete: function(xhr, status) { //完成后解禁
                    that.$loading.hide();
                    loadCtrl.isIdle = true;
                }
            });
        },
        init: function() {
            if (pageConf.more.over) return false;
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

    //提交评论相关
    function DetailWinBox(selector) {
        this.divBox = $(selector || '.sDetailWinBox');
        this.btnSubmit = this.divBox.find('.submit');
        this.btnCancel = this.divBox.find('.cancel');
        this.areaComment = this.divBox.find('textarea');
        this.isIdle = true;
    }

    //初始化
    DetailWinBox.prototype.init = function() {
        var that = this;
        this.btnCancel.on(touchClick, function() {
            that.hide();
            return false;
        });
        this.btnSubmit.on(touchClick, function() {
            that.submit();
            return false;
        });
    };

    //显示评论框
    DetailWinBox.prototype.show = function(placeholder) {
        this.divBox.show();
        this.areaComment.attr('placeholder', (placeholder || '请尽情的吐槽吧~') + '（最多30个字）');
    };

    //隐藏并【重置】评论框
    DetailWinBox.prototype.hide = function() {
        this.divBox.hide();
        this.areaComment.val('');
        this.attach(null, null);
    };

    //提交评论
    DetailWinBox.prototype.submit = function() {
        var that = this,
            content = that.areaComment.val();
        if (!that.isIdle) return false;
        if (!content.trim()) {
            var msg = that.toOpenid ? '评论不能为空' : '吐槽不能为空';
            tips(msg);
            return false;
        }
        if (content.length > +that.areaComment.attr('maxlength')) {
            var msg = '超过字符长度限制';
            tips(msg);
            return false;
        }
        that.isIdle = false; //禁止重复提交
        that.areaComment.prop('readonly', true);
        var formData = {
            content: content
        };
        if (that.toNickname) formData.to_nickname = that.toNickname;
        if (that.toOpenid) formData.to_openid = that.toOpenid;
        $.ajax({
            type: 'post',
            url: pageConf.commentUrl,
            data: formData,
            success: function(data, status, xhr) {
                data = JSON.parse(data);
                if (data.type == 'succ') {
                    that.hide();
                    pageConf.more.offset++;
                    loadCtrl.fake(formData.content, formData.to_nickname);
                    loadCtrl.$amount.text(+loadCtrl.$amount.text() + 1);
                } else {
                    tips(data.msg);
                }
            },
            error: function(xhr, errorType, error) {
                tips('出错了');
            },
            complete: function(xhr, status) { //完成后解禁
                that.isIdle = true;
                that.areaComment.prop('readonly', false);
            }
        });
    };

    //评论附加信息（被评论者） 昵称、openid
    DetailWinBox.prototype.attach = function(toNickname, toOpenid) {
        this.toNickname = toNickname;
        this.toOpenid = toOpenid;
    };

    var detailWinBox = new DetailWinBox();
    detailWinBox.init();

    //回复之评论
    $('.sComment').on(touchClick, '.commentBtn', function() {
        var _toNickname = $(this).data('from_nickname'),
            _toOpenid = $(this).data('from_openid');
        detailWinBox.show('回复 ' + _toNickname + ':');
        detailWinBox.attach(_toNickname, _toOpenid);
        return false;
    });

    if (!pageConf.is_follow) {
        $('.show_mask').on('click', function() {
            $('.maskfollow').show();
            return false;
        });
        $('.maskfollow').on('click', function() {
            $(this).hide();
        });
    } else {
        //吐槽
        $('#fight').on(touchClick, function() {
            detailWinBox.show();
            return false;
        });
        //点赞
        $('#support').on(touchClick, function() {
            if ($(this).hasClass('cBtn03_b')) {
                return false;
            }
            if ($(this).prop('disabled')) return false;
            $(this).prop('disabled', true);
            $.ajax({
                type: 'get',
                url: pageConf.supportUrl,
                success: function(data, status, xhr) {
                    data = JSON.parse(data);
                    if (data.type == 'succ') {
                        $('#support').removeClass('cBtn01_b').addClass('cBtn03_b').text('已赞过').off(touchClick); //解除事件
                        $('#supportAmount').text(+$('#supportAmount').text() + 1); //赞+1
                        //触发动画
                        $('#cUp').css({
                            display: 'block',
                            opacity: 0
                        });
                        $('#cUp').animate({
                            opacity: 1
                        }, function() {
                            $(this).animate({
                                translate3d: '0, -30px, 0',
                                opacity: 0
                            }, 200, 'ease', function() {
                                $(this).css({
                                    display: 'none'
                                })
                            }, 100);
                            if (!pageConf.is_collect) {
                                location.href = pageConf.collect_data_url;
                            }
                        })
                    } else {
                        tips(data.msg);
                    }
                },
                error: function(xhr, errorType, error) {
                    tips('出错了');
                    $('#support').removeClass('cBtn03_b');
                },
                complete: function(xhr, status) {
                    $('#support').prop('disabled', false);
                }
            });
            return false;
        });
    }

});
