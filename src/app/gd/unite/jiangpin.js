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
    
        $this.$phone = $this.$confirm.find('span[data-name=phone]');
   
        $this.$btnYes = $this.$confirm.find('i[btn=yes]');
        $this.$btnNo = $this.$confirm.find('i[btn=no]');

        $this.show = function(phone) {
   
            $this.$phone.html(phone);
    
            $this.$confirm.removeClass("none");
        };
        this.hide = function() {
  
            $this.$phone.html("");
       
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

        var phone = $('#telphone').val();
        var phoneRel = /^0?(1)[0-9]{10}$/; //手机号验证
        if (phone.length === 0) {
            ErrorTip.show(false, '请输入你的手机号');
        } else if (!phoneRel.test(phone)) {
            ErrorTip.show(false, '手机号码格式不正确');
        } else {
            new _confirm().show(phone);
        }
        
    });

});
