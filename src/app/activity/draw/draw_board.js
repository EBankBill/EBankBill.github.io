/**
 * @fileOverview: 涂鸦
 * @author: xiejiabin
 * @email: jiabin1@leju.com
 * @date: 2015-01-14
 * @template: weixin.leju.com/trunk/activity/templates/v1.0/draw/draw_board.html
 */ 
define(function(require, exports) {
    var $ = require("zepto");
    var tips = require('../../../mobile/utils/simple/simpleTips');

    //创建画布并置入页面,返回对象
    function createCVS(id) {
        return $('<canvas>', {
            id: id
        }).attr({
            width: $('.sDrawIn').width(),
            height: $('.sDrawIn').height()
        }).appendTo('.sDrawIn');
    }

    //画板类
    function Board($cvs) {
        this.$cvs = $cvs;
        this.cvs = this.$cvs.get(0);
        this.ctx = this.cvs.getContext("2d");
        this.history = [];
        this.background = $('<div/>');
        this.updateStyle();
        this.bind();
    }

    //兼容 强制触发更新canvas
    Board.prototype.hotfix = function() {
        /*这个费解的代码是为了兼容*/
        this.$cvs.parent().append(this.background).append(this.cvs);
    };
    //更新画笔参数
    Board.prototype.updateStyle = function() {
        this.style = {
            color: $('.selList a.cur').css('background-color'),
            width: $('.penList a.cur').attr('px')
        };
    };
    //画
    Board.prototype.draw = function(x, y, begin) {
        if (begin) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.style.color;
            this.ctx.arc(x, y, this.style.width / 2, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.strokeStyle = this.style.color;
            this.ctx.lineWidth = this.style.width;
        } else {
            this.ctx.lineCap = this.ctx.lineJoin = 'round';
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
        this.hotfix();
    };
    //记忆
    Board.prototype.store = function() {
        this.history.push(this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height));
    };
    //canvas事件绑定
    Board.prototype.bind = function() {
        var _this = this;
        // 判断是否为移动端
        var ISMOBILE = window.navigator.userAgent.toLowerCase().indexOf('mobile') != -1;
        var clickEvtName = ISMOBILE ? 'touchstart' : 'mousedown';
        var moveEvtName = ISMOBILE ? 'touchmove' : 'mousemove';
        var upEvtName = ISMOBILE ? 'touchend' : "mouseup";
        var isMouseDown = false;
        // start
        this.$cvs.on(clickEvtName, function(e) {
            e.preventDefault();
            // 记录开始move
            isMouseDown = true;
            var x = (ISMOBILE ? e.touches[0].pageX : e.pageX || e.x) - _this.$cvs.offset().left;
            var y = (ISMOBILE ? e.touches[0].pageY : e.pageY || e.y) - _this.$cvs.offset().top;
            _this.store();
            // 画点
            _this.draw(x, y, true);
        });
        //move
        this.$cvs.on(moveEvtName, function(e) {
            e.preventDefault();
            // 记录是否开始move
            if (!isMouseDown) return false;
            var x = (ISMOBILE ? e.touches[0].pageX : e.pageX || e.x) - _this.$cvs.offset().left;
            var y = (ISMOBILE ? e.touches[0].pageY : e.pageY || e.y) - _this.$cvs.offset().top;
            // 画点
            _this.draw(x, y, false);
        });
        //end
        this.$cvs.on(upEvtName, function(e) {
            e.preventDefault();
            isMouseDown = false;
        });
    };
    // 设置宽度
    $('.sDrawIn').height($('.sDrawIn').width());
    var board = new Board(createCVS());

    //笔触设置 并初始触发一次（对.cur纠错）
    $('.penList a').on('click', function() {
        if(!$(this).hasClass('b4')) {
            $('.penList a').removeClass('cur');
            $(this).addClass('cur');
        }
        board.updateStyle();
        return false;
    }).eq(0).trigger('click');

    //颜色设置 并初始触发一次（对.cur纠错）
    $('.selList a').on('click', function() {
        $('.selList a.cur').removeClass('cur');
        $(this).addClass('cur');
        board.updateStyle();
        $('.selBtn').css('background-color', board.style.color);
        $('.selList').hide();
        return false;
    }).eq(5).trigger('click');

    //调色板开关
    $('.selBtn').on('click', function() {
        var w = $(this).offset().left  - 195 * 0.7;
        $('.selList').css({
            left:  w
        });
        $('.selList').toggle();
        return false;
    });

    //清空canvas
    $('#cReset').on('click', function() {
        board.ctx.clearRect(0, 0, board.ctx.canvas.width, board.ctx.canvas.height);
        board.history.splice(0, board.history.length);
        board.hotfix();
        return false;
    });

    //上一步
    $('#cPrev').on('click', function() {
        board.ctx.clearRect(0, 0, board.ctx.canvas.width, board.ctx.canvas.height);
        if (board.history.length > 0) {
            var imgData = board.history.splice(-1, 1)[0];
            board.ctx.putImageData(imgData, 0, 0);
        }
        board.hotfix();
        return false;
    });

    //base64数据上传
    $('#cUploadPics').on('click', function() {
        if ($(this).hasClass('sBtn22')) return false;
        if (board.history.length < 3) {
            tips('作品太简单，上传失败~');
            return false;
        }

        $(this).addClass('sBtn22');
        var tp = tips('作品上传中...', 20000);
        var imgData = board.cvs.toDataURL("image/png");

        $.ajax({
            type: 'post',
            url: pageConf.uploadUrl,
            data: {
                imgData: imgData
            },
            success: function(data, status, xhr) {
                data = JSON.parse(data);
                tips(data.msg);
                if (data.type == 'succ') {
                    $('.sBtn06').off('click');
                    setTimeout(function() {
                        location.href = data.url;
                    }, 1000);
                }
            },
            error: function(xhr, errorType, error) {
                tips('出错了');
            },
            complete: function(xhr, status) {
                $('.sBtn06').removeClass('sBtn22');
                $(tp).remove();
            }
        });
        return false;
    });
});
