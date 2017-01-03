/**
 * @fileOverview  单屏翻页
 * @author xiejiabin
 * @email jiabin1@leju.com
 * @date 2015-1-21
 * @template
 */
define(function(require, exports, module) {
    module.exports = FakePage;

    var $ = require("zepto");
    var ISMOBILE = window.navigator.userAgent.toLowerCase().indexOf('mobile') != -1;
    var winHeight = $(window).height();
    var winWidth = $(window).width();

    function FakePage($wrap, $box, pageCount, singleWidth, callback) {
        this.$wrap = $wrap;
        this.$box = $box;
        this.pageCount = pageCount;
        this.singleWidth = singleWidth || that.$wrap.width(); //单屏宽
        this.callback = callback;
    };
    //初始化 单屏宽度
    FakePage.prototype.init = function() {
        var that = this;
        that.startX = 0; //触点全局变量 坐标
        that.startLeft = 0;

        that.limit = 20; //that.singleWidth * 0.1; //阈值 即超过页面的比例则触发动画
        that.vector = 0; //本次事件总位移负数：上 正数：下
        that.pageIndex = 0; //当前屏索引
        
        that.isStarted = 0;
        var startEvent = ISMOBILE ? 'touchstart' : 'mousedown';
        var moveEvent = ISMOBILE ? 'touchmove' : 'mousemove';
        var endEvent = ISMOBILE ? 'touchend' : "mouseup";

        that.$wrap.on(startEvent, function(e) {
            that.touchSatrtFunc(e, that);
        });
        that.$wrap.on(moveEvent, function(e) {
            that.touchMoveFunc(e, that);
        });
        that.$wrap.on(endEvent, function(e) {
            that.touchEndFunc(e, that);
        });
        that.page(0, true);
    };
    //位移 是否启用动画
    FakePage.prototype.move = function(val, trans) {
        if (trans) {
            this.$box.addClass('trans');
        } else {
            this.$box.removeClass('trans');
        }
        if (!isNaN(val)) {
            this.$box.css('left', val);
        } else {
            val = +this.$box.css('left').slice(0, -2);
        }
        return val;
    };
    //翻页 是否改变了当前页
    FakePage.prototype.page = function(index, change) {
        var trans = true;
        if (isNaN(index)) { //未传参数取值
            trans = false;
            index = this.pageIndex;
        }
        if (index < 0 || index > this.pageCount - 1) { //限定范围
            index = Math.min(this.pageCount - 1, Math.max(0, index));
            change = false;
        }
        var move = index * this.singleWidth;
        var pageIndex = ~~(-this.move(-move, trans) / this.singleWidth);
        if (change) {
            this.callback && this.callback(pageIndex);
        }
        return pageIndex;
    };
    //touchstart事件
    FakePage.prototype.touchSatrtFunc = function(e, that) {
        that.isStarted = 1;
        that.vector = 0;
        that.startX = ISMOBILE ? e.touches[0].pageX : e.pageX || e.x; //页面触点x坐标 
        that.startLeft = that.move();
        that.pageIndex = that.page();
    };
    //touchmove事件
    FakePage.prototype.touchMoveFunc = function(e, that) {
        e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        if (!that.isStarted) return false;
        var x = ISMOBILE ? e.touches[0].pageX : e.pageX || e.x; //页面触点y坐标 
        that.vector = x - that.startX; //负数：上 正数：下
        var left = that.vector + that.startLeft;
        that.move(left);
    };
    //touchend事件  
    FakePage.prototype.touchEndFunc = function(e, that) {
        that.isStarted = 0;
        var pIndex = that.pageIndex;
        if (that.vector > that.limit) {
            pIndex--;
        } else if (that.vector < -that.limit) { //兼容min-height差值
            pIndex++;
        }
        that.pageIndex = that.page(pIndex, pIndex != that.pageIndex);
    }
});
