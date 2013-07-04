var timeout = require('timeout'),
    consoleExample = require('consoleExample'),
    Attempt = require('attempt');

// Пример с when()
shower.one('slide:39', consoleExample(function runExample(console) {
    function ok() {
        console.log('Ok!');
    }

    function epicFail() {
        console.log('Epic fail!');
    }

    function progress(err, num) {
        console.log('№' + num + ' ' + err.status + ' ' + err.statusText);
    }

    function repeat3Times(err, num) {
        if (num < 4) return 1000;
    }

    function get404() {
        return $.get('/404');
    }

    new Attempt(get404, repeat3Times)
    .then(ok, epicFail, progress);
}));
