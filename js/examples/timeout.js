var timeout = require('timeout'),
    consoleExample = require('consoleExample');

// Пример с timeout()
shower.one('slide:34', consoleExample(function runExample(console) {
    timeout(1000)
    .then(function () {
        console.log('first');
        return timeout(1000);
    })
    .then(console.log.bind(console, 'second!'));
}));

// Пример с timeout()
shower.one('slide:35', consoleExample(function runExample(console) {
    function randomLog() {
        var rnd = Math.random();
        console.log(rnd);
        if (rnd < 0.5) return timeout(2000);
    }
    timeout(1000)
    .then(randomLog)
    .then(console.log.bind(console, 'done!'));
}));