﻿define(function(require, exports, module) {
    var cvsSheep, //canvas
        ctxSheep, //2d对象
        imgSheeps, //图片集合
        imgIndex, //图片索引
        imgQueue, //队列
        drawArgs; //1:房子 2：雪  3：画布参数{sx, sy, sw, sh, dx, dy, dw, dh}

    var drawSheep = document.getElementById('an-sure') == null;

    function animate(draw, fps) {
        var that = this;
        requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame;
        fps = fps || 40;
        var then = Date.now(),
            interval = 1000 / fps,
            now = 0,
            delta = 0,
            goon = true;
        (function tick() {
            if (!goon) {
                return;
            }
            if (window.requestAnimationFrame) {
                requestAnimationFrame(tick);
                now += Date.now(); //加入上次循环的余
                delta = ~~((now - then) / interval); //取整数次数（忽略小数）
                now = (now - then) % interval; //取余 下次结算
                then = Date.now();
                if (delta > 0) { //for (var i = 0; i < delta; i++)
                    goon = draw.call(that);
                }
            } else {
                setTimeout(tick, interval);
                goon = draw.call(that);
            }
        })();
    }

    /*动画代码块*/
    function loop() { //循环
        ctxSheep.clearRect(0, 0, cvsSheep.width, cvsSheep.height);

        ctxSheep.drawImage(imgQueue[0], drawArgs[0].x, drawArgs[0].y);
        ctxSheep.drawImage(imgQueue[0], drawArgs[0].x - imgQueue[0].width, drawArgs[0].y);
        drawArgs[0].x += 2;
        if (drawArgs[0].x >= imgQueue[0].width) {
            drawArgs[0].x = 0;
        }

        ctxSheep.drawImage(imgQueue[1], drawArgs[1].x, drawArgs[1].y);
        ctxSheep.drawImage(imgQueue[1], drawArgs[1].x - imgQueue[1].width, drawArgs[1].y);
        drawArgs[1].x += 14;
        if (drawArgs[1].x >= imgQueue[1].width) {
            drawArgs[1].x = 0;
        }

        if (!drawSheep) return 1;

        var img = imgSheeps[imgIndex];
        ctxSheep.drawImage(img, drawArgs[2].sx, drawArgs[2].sy, drawArgs[2].sw, drawArgs[2].sh, drawArgs[2].dx, drawArgs[2].dy, drawArgs[2].dw, drawArgs[2].dh);
        if (imgIndex >= imgSheeps.length - 1) {
            imgIndex = 0;
        } else {
            imgIndex++;
        }
        return 1; //return false：停止动画 true：继续
    }

    /*消除devicePixelRatio差异 计算画图参数*/
    function setDrawArgs(imgWidth, imgHeight) {
        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStorePixelRatio = ctxSheep.webkitBackingStorePixelRatio ||
            ctxSheep.mozBackingStorePixelRatio ||
            ctxSheep.msBackingStorePixelRatio ||
            ctxSheep.oBackingStorePixelRatio ||
            ctxSheep.backingStorePixelRatio || 1;

        var ratio = devicePixelRatio / backingStorePixelRatio,
            width = cvsSheep.width,
            height = cvsSheep.height;

        if (ratio !== 1) {
            cvsSheep.width = width * ratio;
            cvsSheep.height = height * ratio;

            cvsSheep.style.width = width + 'px';
            cvsSheep.style.height = height + 'px';

            ctxSheep.scale(ratio, ratio);
        }

        drawArgs[0] = {
            x: 0,
            y: 0
        };
        drawArgs[1] = {
            x: 0,
            y: 163
        };

        //下面调整图片位置和大小
        var sx = 0,
            sy = 0,
            sw = imgWidth,
            sh = imgHeight,
            dw = width * pageConf.sWidth,
            dh = sh / sw * dw,
            dx = width * pageConf.sLeft,
            dy = -5;
        // if (dy < 0) {
        //     dh = height;
        //     dw = sw / sh * dh;
        //     dy = 0;
        //     dx = (width - dw) / 2;
        // }
        drawArgs[2] = {
            sx: sx.toFixed(),
            sy: sy.toFixed(),
            sw: sw.toFixed(),
            sh: sh.toFixed(),
            dx: dx.toFixed(),
            dy: dy.toFixed(),
            dw: dw.toFixed(),
            dh: dh.toFixed()
        };
    }

    (function init() {
        cvsSheep = document.getElementById('cvsSheep');
        cvsSheep.width = cvsSheep.parentNode.offsetWidth;
        cvsSheep.height = cvsSheep.parentNode.offsetHeight;
        ctxSheep = cvsSheep.getContext('2d');
        imgQueue = [];
        imgSheeps = [];
        drawArgs = [];


        var ready = 0;
        var imgHouse = new Image();
        var imgSnow = new Image();
        imgHouse.onload = function() {
            imgQueue[0] = this;
            ready++;
        };
        imgHouse.src = pageConf.housePic;

        imgSnow.onload = function() {
            imgQueue[1] = this;
            ready++;
        };
        imgSnow.src = pageConf.snowPic;

        for (var i = 1; i <= 9; i++) {
            var img = new Image();
            img.onload = function() {
                imgSheeps.push(this);
                ready++;
            };
            img.src = pageConf.sheepPath + 'i-' + i + '.png';
        }
        imgIndex = 0;
        var imgTimer = setInterval(function() {
            if (ready >= 11) {
                clearInterval(imgTimer);
                imgSheeps.sort(function(a, b) {
                    return b.src.slice(-5, -4) - a.src.slice(-5, -4);
                });
                var img = imgSheeps[0];
                setDrawArgs(img.width, img.height);
                animate(loop, 20); //20:帧数，可调整速度
            }
        }, 100);
    })();
});
