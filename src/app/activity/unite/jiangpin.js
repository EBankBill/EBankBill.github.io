/**
 * @fileOverview  羊 奖品页
 * @author zoulingling
 * @email lingling6@leju.com
 * @date 2015-2-2
 * @template unite/lingqu.html
 */
define(function(require, exports, module) {
    var $ = require('zepto');

    //验证提示层
    var errorTip = function() {
            var $this = this;
            $this.$tip = $('#errorTip');
            $this.$btn = $('#errorTip i');
            $this.$img = $('#errorTip img');
            $this.$text = $('#errorTip p');
            $this.imgUrl = '/activity/resources/v1.0/unite/images/';

            $this.show = function(imgFlag, text, btnClass) {
                btnClass = btnClass || 'close';
                $this.$btn.addClass('none');
                $this.$btn.filter('.' + btnClass).removeClass('none');
                var imgSrc = imgFlag ? 'i-green.png' : 'i-end.png';
                $this.$img.attr("src", $this.imgUrl + imgSrc);
                $this.$text.html(text);
                $this.$tip.removeClass('none');
            };
            $this.hide = function() {
                $this.$tip.addClass('none');
            };
            $this.$btn.on('click', function() {
                $this.hide();
            })
        }
        //确认信息提示层
    var _confirm = function() {
        var $this = this;
        $this.$confirm = $('#confirm');
        // $this.$name = $this.$confirm.find('span[data-name=name]');
        $this.$phone = $this.$confirm.find('span[data-name=phone]');
        $this.$card = $this.$confirm.find('span[data-name=card]');
        $this.$btnYes = $this.$confirm.find('i[btn=yes]');
        $this.$btnNo = $this.$confirm.find('i[btn=no]');

        $this.show = function(phone, cardNumber) {
            //  $this.$name.html(name);
            $this.$phone.html(phone);
            $this.$card.html(cardNumber);
            $this.$confirm.removeClass("none");
        };
        this.hide = function() {
            // $this.$name.html("");
            $this.$phone.html("");
            $this.$card.html("");
            $this.$confirm.addClass("none");
        };
        $this.$btnYes.on("click", function() {
            var $fm = $('#fm');
            var ajaxUrl = $fm.attr('action');
            $.ajax({
                type: 'get',
                url: ajaxUrl,
                data: $fm.serialize(),
                success: function(data) {
                    var data = JSON.parse(data);
                    if (data.code == 1) {
                        ErrorTip.show(true, data.msg, 'back');
                        // setTimeout(function() {
                        //     location.href = $('#prizeurl').val();
                        // }, 1000);
                    } else {
                        ErrorTip.show(false, data.msg, 'back');
                    }
                },
                error: function(xhr, errorType, error) {
                    ErrorTip.show(false, '出错了', 'back');
                }
            });
            $this.hide();
        });
        $this.$btnNo.on("click", function() {
            $this.hide();
        });
    }
    var ErrorTip = new errorTip();
    var $btnSubmit = $('#btnSubmit');

    $btnSubmit.on("click", function() {
        //  var trueName = $('#truename').val();
        var phone = $('#telphone').val();
        var cardNumber = $('#card_number').val();
        var phoneRel = /^0?(1)[0-9]{10}$/; //手机号验证
        var cardRel = /^[0-9]{4}$/; //手机号验证

        if (phone.length === 0) {
            ErrorTip.show(false, '你输入你在建行预留的手机号');
        } else if (!phoneRel.test(phone)) {
            ErrorTip.show(false, '手机号码格式不正确');
        } else if (cardNumber == '') {
            ErrorTip.show(false, '请输入信用卡卡号后四位');
        } else if (!cardRel.test(cardNumber)) {
            ErrorTip.show(false, '信用卡卡号后四位格式不正确');
        } else {
            new _confirm().show(phone, cardNumber);
        }
    });

});
