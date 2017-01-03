/**
 * @fileOverview 表单验证 提示方式、元素属性需在dom设置
 * @author xiejiabin
 * @email jiabin1@leju.com
 * @date 2014-12-18
 * @remark
 * @demo var sv=require('simpleValidate');
         sv.init('validate');
         $('form input').validate();//bool
 */
define(function(require, exports, module) {
    var $ = require('zepto');
    var tips = require('simpleTips'); //简单提示框模块


    //验证错误处理
    function errorHandle(b, msg) {
        if (!b) {
            msg = msg || $(this).attr('errormsg');
            msg && tips(msg);
            $(this).focus();
        }
        return b;
    };
    //正则验证闭包
    function getRegExpFn(exp) {
        return function() {
            var input = $(this).val();
            var pass = !input || exp.test(input); //空值 或者 符合验证
            return errorHandle.call(this, pass);
        }
    };

    var SV = {
        //属性
        attrs: {
            necessary: 'required',
            required: 'required',
            regexp: 'regexp'
        },
        //vtype属性值
        vtypes: {
            mobile: 'mobile',
            phone: 'mobile',
            zipcode: 'zipcode',
            identityid: 'identityid',
            idcard: 'identityid',
            integer: 'integer'
        },
        //规则
        rules: {
            mobile: /^1[3|4|5|7|8][0-9]\d{8}$/, //手机
            zipcode: /^\d{6}$/, //邮编
            identityid: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证号
            //规则：必填
            required: function() {
                if ($(this).attr('type') == 'checkbox') {
                    var pass = $(this).prop('checked');
                    return errorHandle.call(this, pass);
                } else if ($(this).attr('type') == 'radio') {
                    var pass = false;
                    $('input[name="' + $(this).attr('name') + '"]').each(function() {
                        if ($(this).prop('checked')) {
                            pass = true;
                            return errorHandle.call(this, pass);
                        }
                    });
                    return errorHandle.call(this, pass);
                }
                var pass = $(this).val().trim().length > 0;
                var msg = $(this).attr('emptymsg');
                return errorHandle.call(this, pass, msg);
            },
            regexp: function(val) { //正则表达式
                var reg = new RegExp(val);
                return getRegExpFn(reg).call(this);
            },
            integer: function(min, max) {
                if (typeof min == 'undefined') min = -Infinity;
                if (typeof max == 'undefined') max = Infinity;
                var txt = $(this).val().trim(),
                    num = ~~txt,
                    pass = (txt == num) && (num >= min) && (num <= max);
                return errorHandle.call(this, pass);
            }
        }
    };

    SV.init = function(fnName) {
        /*原型注册*/
        for (var key in SV.rules) {
            var exp = SV.rules[key];
            if (typeof exp == 'function') {
                $.fn[key] = exp;
            } else { //已定义的正则表达式
                $.fn[key] = getRegExpFn(exp);
            }
        }
        /*调用验证的入口函数*/
        function validate() {
            var len = 0;
            $(this).each(function() {
                if (!$(this).attr('vignore')) { //无跳过属性
                    for (var attr in SV.attrs) { //attr：属性名 func：内部方法名 1-n关系
                        var func = SV.attrs[attr];
                        var attrVal = $(this).attr(attr);
                        if (attrVal && func && !$(this)[func](attrVal)) return false; //验证未通过
                    }
                    var vtypeVal = $(this).attr('vtype'); //vtype值
                    if (vtypeVal) {
                        var vtypeArr = vtypeVal.split('|'),
                            vFunc = SV.vtypes[vtypeArr[0]],
                            vArgs = vtypeArr.slice(1);
                        if (vFunc && !$(this)[vFunc].apply(this, vArgs)) return false;
                    }
                };
                len++;
            });
            return len >= $(this).length;
        }

        //自定义方法名原型注入
        $.fn[fnName] = validate;
    };

    /*
     *调用时先用init(functionname)将自定义的方法名称注入到 $.fn
     *dom上配置后直接用zepto|jquery对象调用该方法即可验证
     *demo：属性用法 required='required'  regexp='\s+'
     *      vtype用法 vtype='mobile' 或者 vtype='int|1|10' 参数用‘|’隔开
     */
    module.exports = {
        init: function(nameOfExtend) {
            nameOfExtend = nameOfExtend || 'simpleValidate';
            SV.init(nameOfExtend);
        },
        fnTips: function(f) {
            tips = f;
        }
    }
});
