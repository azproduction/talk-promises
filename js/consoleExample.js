var timeout = require('timeout'),
    Console = require('console');

function createExample(slide, runExample) {
    var $slide = $('#' + slide.id),
        $console = $slide.find('.console'),
        $run = $slide.find('.run');

    // fake console
    var console = new Console($console);

    $slide.click(function () {
        console.hide();
    });

    $run.click(function () {
        console.show();
        runExample(console);
        return false;
    });
}

module.exports = function (runExample) {
    return function (e, slide) {
        createExample(slide, runExample);
    };
};
