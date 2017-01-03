/*************************************
rotation.js
update:指针不转 20150126
*************************************/

define(function(require, exports, module) {
    module.exports = Rotation;
    var common = require('common');

    function Rotation(rot, hand) {
        this.rot = rot;
        // this.hand = hand;
        this.init();
    }

    //转
    Rotation.prototype.roll = function(opt, transfn) {
        $.extend(this, opt);
        transfn = transfn || 'ease';
        this.setRotate(transfn);
        // this.setHand(transfn);//fix:指针不转
    };

    //初始化 归零
    Rotation.prototype.init = function() {
        this.rotDeg = this.handDeg = this.rotTime = this.handTime = 0;
        // 设置轮盘初始角度、运转为零
        common.prefixStyle(this.rot, 'transform', 'rotate(0)');
        common.prefixStyle(this.rot, 'transition', 'none');
        // 设置指针初始角度、运转为零 //fix：指针不转
        // common.prefixStyle(this.hand, 'transform', 'rotate(0)');
        // common.prefixStyle(this.hand, 'transition', 'none');
    };

    Rotation.prototype.setRotate = function(transfn) {
        var that = this;
        // 运动
        setTimeout(function() {
            common.prefixStyle(that.rot, 'transform', 'rotate(' + that.rotDeg + 'deg)');
            common.prefixStyle(that.rot, 'transition', that.rotTime + 'ms all ' + transfn);
        }, 0);
    };

    // Rotation.prototype.setHand = function(transfn) {
    //     var that = this;
    //     // 运动
    //     setTimeout(function() {
    //         common.prefixStyle(that.hand, 'transform', 'rotate(' + that.handDeg + 'deg)');
    //         common.prefixStyle(that.hand, 'transition', that.handTime + 'ms all ' + transfn);
    //     }, 0);
    // };
});
