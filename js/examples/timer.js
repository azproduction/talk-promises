var shower = require('shower'),
    timeout = require('timeout');

// Пример с таймерами
shower.one('slide:7', function (e, slide) {
    var $slide = $('#' + slide.id),
        $sandbox = $slide.find('.sandbox'),
        $h2 = $slide.find('h2'),
        $ball = $slide.find('.ball');

    var size = -$ball.width() / 2 + 'px';

    function move() {
        var dfd = $.Deferred();

        $ball.animate({
            top: (100 * Math.random()) + '%',
            left: (100 * Math.random()) + '%',
            marginTop: size,
            marginLeft: size
        }, 'slow', dfd.resolve);

        return dfd.promise();
    }

    function grow() {
        var dfd = $.Deferred();

        $ball.animate({
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            margin: 0,
            borderRadius: 0,
            opacity: 0
        }, 'slow', dfd.resolve);

        return dfd.promise();
    }

    function shrink() {
        var dfd = $.Deferred();

        $ball.animate({
            width: '100px',
            height: '100px',
            left: '50%',
            top: '50%',
            margin: '-50px',
            borderRadius: '50px',
            opacity: 1
        }, 'slow', dfd.resolve);

        return dfd.promise();
    }

    function loop(times, promiseGenerator) {
        var dfd = $.Deferred();

        (function step() {
            times--;
            if (!times) {
                dfd.resolve();
                return;
            }
            promiseGenerator().pipe(step);
        })();

        return dfd.promise();
    }

    loop(5, move)
        .pipe(grow)
        .pipe(function () {
            return timeout(1000);
        })
        .pipe(shrink);
});
