var shower = require('shower'),
    timeout = require('timeout');

// Пример с запросом на сервер
shower.one('slide:4', function (e, slide) {
    var $slide = $('#' + slide.id),
        $sandbox = $slide.find('.sandbox'),
        $h2 = $slide.find('h2');

    function renderPhotos(data) {
        var promises = data.entries.map(function (entry) {
            var $image = $('<div/>', {
                css: {
                    'background-image': 'url(' + entry.img.M.href + ')',
                    'background-size': 'cover',
                    width: '20%',
                    height: '20%',
                    display: 'inline-block',
                    visibility: 'hidden'
                }
            }).appendTo($sandbox);

            // Случайная задержка
            return timeout(Math.random() * 2000).then(function () {
                return $image.css('visibility', 'visible').hide().fadeIn();
            });
        });

        // Когда все таймеры отработали
        return $.when.apply($, promises);
    }

    $.getJSON('http://api-fotki.yandex.ru/api/top/?format=json&callback=?')
        .pipe(renderPhotos)
        .fail(function (error) {
            $h2.text(error);
        });
});
