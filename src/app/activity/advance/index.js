/**
 * Created by ly on 2016/10/31.
 */
define(function(require, exports, module) {
    var $ = require("zepto"),
        tips = require('simpleTips'); //简单提示框; tips(data.msg);

        $(".xian li").bind("click", function () {
            var index = $(this).index();
            console.log(index)//0 1 2 ...
            $.ajax({
                type: 'GET',
                dataType: 'json',
                data: {id: index + 1},
                async:false,
                url: pageConfig.url,
                'success': function (data) {
                    if (data.status == 'succ') {
                        if (window.localStorage) {
                            localStorage.setItem("name", index);
                            localStorage.getItem("name");
                            console.log(localStorage.getItem("name"))
                        }
                        setTimeout(function () {
                            window.location.href = pageConfig.sucurl;
                        }, 800)
                    } else {
                        tips(data.reason.message);
                        return false;
                    }

                },
                'complete': function (xhr) {

                }
            })
        })

})
