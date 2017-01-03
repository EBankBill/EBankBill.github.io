/*******************************************
roulette.js
update:指针不转 20150126
*******************************************/

define(function(require, exports, module) {
    module.exports = roulette;
    var $ = require('zepto');
    var common = require('common');
    var tips = require('simpleTips');
    var Rotation = require('./rotation');

    function roulette(ele) {
        return new Roulette(ele);
    }

    function Roulette(ele) {
        $.extend(this, ele);
        this.init();
    }

    Roulette.prototype.init = function() {
        var that = this;
        var fnEmpty = function() {};
        this.fnClick = this.fnClick || fnEmpty; // 点击执行
        this.fnClickEnd = this.fnClickEnd || fnEmpty; // 点击结束后回调
        this.gameOver = this.gameOver || fnEmpty; // 游戏结束
        this.fnClickBefore = this.fnClickBefore || fnEmpty; // 点击之前
        this.dataFilter = this.dataFilter || function(data) { //ajax回调数据过滤
            return data;
        };

        this.evHand.__ready = true; // 是否可点击
        this.evHand.__clickTime = 0; // 已点击的次数
        this.evHand.addEventListener('click', function() {
            that.fnClickBefore();
            that.startGame();
        }, false);
        this.rotation = new Rotation(this.rot, this.hand);
    };

    Roulette.prototype.startGame = function() {

        // 运动结后才可再次点击
        if (this.evHand.__ready == false) {
            return false;
        }
        this.evHand.__ready = false;

        var that = this;
        if (this.clickTime <= this.evHand.__clickTime) {
            this.gameOver(); // 游戏结束
            this.evHand.__ready = true;
            return false;
        }

        that.waiting = 1; //ajax响应
        that.sumDeg = that.sumDeg || 0; //累积角度
        // that.rotation.init(); //归零 //fix:累加模式  归零卡顿
        that.setSameRotate(); //持续同步运动(指向0)

        $.ajax({
            type: 'post',
            url: that.ajaxUrl,
            success: function(data, status, xhr) {
                var n = that.dataFilter(data);
                that.evHand.__clickTime++;
                // 轮盘旋转角度
                that.setRouletteRotate(n); //按最终结果运动
            },
            error: function(xhr, errorType, error) {
                tips('出错了');
            },
            complete: function() {
                that.waiting = 0;
            }
        });
    };

    //转 n：几等奖
    Roulette.prototype.setRouletteRotate = function(n) {
        var oRotation = null;
        var that = this;

        this.fnClick && this.fnClick();


        var _deg = 0;
        if (n != -1) { //error
            _deg = common.random(360 / this.radius * (n - 1) + 3, 360 / this.radius * (n) - 3); //按指针算 顺时针偏移
            _deg = 360 - _deg; //转换为转盘偏移
        }
        _deg -= that.sumDeg % 360; //累加模式 差值计算

        // 轮盘转动的角度
        // var rotDeg = that.sumDeg + (common.random(3, 6) * 360); /*随机转圈*/

        that.sumDeg += (common.random(3, 6) * 360) + _deg; //累加角度

        // 指针转动的角度
        // var handDeg = common.random((rotDeg + 360 / this.radius * (n - 1)) + 3, (rotDeg + 360 / this.radius * (n)) - 3);

        // 指针转动的时间
        var rotTime = this.rotTime || common.random(1000, 2000);

        // 轮盘旋转的角度  
        oRotation = {
            // rotTime: rotTime * .6, // 旋转的时间
            rotTime: rotTime, // 旋转的时间
            rotDeg: that.sumDeg,
            // rotDeg: rotDeg, // 轮盘旋转的角度
            // handTime: rotTime, //指针时间
            // handDeg: handDeg // 指针旋转的角度
        };
        //等待[持续同步动画]完成
        var checker = setInterval(function() {
            if (!that.waiting) {
                clearInterval(checker);
                that.rotation.roll(oRotation); //非线性运动
                // 运动结束后才可再次点击
                setTimeout(function() {
                    that.fnClickEnd && that.fnClickEnd(n); // 点击结束
                    that.evHand.__ready = true;
                }, rotTime);
            }
        }, 100);
    };

    //持续同步旋转
    Roulette.prototype.setSameRotate = function() {
        var that = this;
        var opt = {
            rotTime: 500, // 旋转的时间 
            rotDeg: that.sumDeg, // 轮盘旋转的角度
            // handTime: 500, //指针时间
            // handDeg: that.sumDeg // 指针旋转的角度
        };
        var waiter = setInterval(function() {
            if (that.waiting) {
                that.sumDeg += 720;
                // opt.rotDeg = opt.handDeg = that.sumDeg;
                opt.rotDeg = that.sumDeg;
                that.rotation.roll(opt, 'linear'); //线性运动 保持连贯
            } else {
                clearInterval(waiter);
            }
        }, 400);
    }
});
