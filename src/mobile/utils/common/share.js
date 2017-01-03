define(function(require, exports, module) {
    var $ = require('zepto');

    var $btn = $('#btnShare,.btnShare');
    var $div = $('#divShare,.divShare').eq(0);

    $btn.on('click', function() {
        $(window).scrollTop(0);
        $div.show();
        if (!$div.hasClass('selfHeight')) {
            $div.addClass('selfHeight').height(Math.max($div.height(), $(window).height()));
        }
    });

    $div.on('click touchmove', function(e) {
        $(window).scrollTop(0);//滚回顶部
        e.preventDefault(); //阻止默认行为
        e.stopPropagation(); //阻止冒泡
        $(this).hide();
    });
});
