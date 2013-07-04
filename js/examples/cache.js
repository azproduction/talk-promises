var consoleExample = require('consoleExample');

var cache;
function request() {
    return cache ? cache : cache = $.get('/?' + Math.random());
}

// Пример с request()
shower.one('slide:40', consoleExample(function runExample(console) {
    request().then(function (html) {
        console.log(html.length);
    });
}));
