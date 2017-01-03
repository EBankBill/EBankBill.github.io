/**
 * @fileOverview 简易模板引擎nano 不支持下标
 * @author xiejiabin
 * @email jiabin1@leju.com
 * @date 2014-12-18
 * @remark nano('<a>{a.b}</a>',{a:{b:'123'}});
 */
define(function(require, exports, module) {
    module.exports = nano;
    /*简易模板引擎*/
    function nano(template, data) {
        return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
            var keys = key.split("."),
                v = data[keys.shift()];
            for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
            return (typeof v !== "undefined" && v !== null) ? v : "";
        });
    }
});