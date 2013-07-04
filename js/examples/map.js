var shower = require('shower'),
    ymaps = require('ymaps');

var location = function () {
    var dfd = $.Deferred();

    if (!navigator.geolocation) {
        dfd.reject('No Geolocation Api');
    } else {
        navigator.geolocation.getCurrentPosition(function (position) {
            dfd.resolve(position.coords);
        });
    }

    return dfd.promise();
};

var maps = function () {
    var dfd = $.Deferred();

    ymaps.ready(function () {
        dfd.resolve(ymaps);
    });

    return dfd.promise();
};

// Пример с картой и GeoApi
shower.one('slide:5', function (e, slide) {
    var $slide = $('#' + slide.id),
        $sandbox = $slide.find('.sandbox'),
        $h2 = $slide.find('h2');

    $.when(location(), maps()).pipe(function (location, ymaps) {
        var center = [location.longitude, location.latitude];
        var map = new ymaps.Map($sandbox[0], {
            center: center,
            zoom: 17,
            behaviors: ['default', 'scrollZoom']
        });

        // Добавление метки на карту
        map.geoObjects.add(new ymaps.Placemark(center));

    }, function (error) {
        $h2.text(error);
    });
});
