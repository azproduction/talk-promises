var timeout = require('timeout'),
    consoleExample = require('consoleExample');

// Пример с when()
shower.one('slide:38', consoleExample(function runExample(console) {
    // $.when - агрегатор Promise
    // Результат не раньше чем через 1с
    $.when($.get('/'), $.get('/?'), timeout(1000))
    .then(function (res) {
        console.log(res[0].length + res[1].length);
    });
}));
