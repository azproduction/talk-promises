/**
 * Эта функция пытается заставить Promise отрезолвьться
 *
 * @example
 *
 * new Attempt(function () {
 *    return $.getJSON('/json');
 *
 * }, function (err, attemptNo) {
 *    if (err.status < 500) return;
 *
 *    return attemptNo * 2000;
 * })
 * .then(function (data) {
 *     yourStuff(data);
 *
 * }, function (error) {
 *     console.log('I tried several times... and fail :(', error);
 *
 * }, function (error, attemptNo) {
 *     console.log('Failed to load, retrying...', error, attemptNo);
 *
 * });
 *
 * @param {Function} promiseGenerator      (): Promise                 генератор промисов, который должен отрезолвится
 * @param {Function} [repeatTimeGenerator] (error, attemptNo): Number  генератор интервелов перезапроса промиса
 *
 * @return {Promise}
 */
function Attempt(promiseGenerator, repeatTimeGenerator) {
    this.deferred = $.Deferred();
    this.promiseGenerator = promiseGenerator;
    this.repeatTimeGenerator = repeatTimeGenerator || $.noop;
    this.currentAttemptNumber = 0;

    this._attempt();

    return this.deferred;
}

Attempt.prototype = {
    _attempt: function() {
        var self = this;
        if (self.isFulfilled()) {
            return;
        }

        self.promiseGenerator().then(function (data) {
            if (self.isFulfilled()) {
                return;
            }
            self.deferred.resolve(data);

        }, function (error) {
            if (self.isFulfilled()) {
                return;
            }
            self.currentAttemptNumber++;

            var timeout = self.repeatTimeGenerator(error, self.currentAttemptNumber);
            if (timeout === Infinity || typeof timeout === "undefined") {
                self.deferred.reject(error);
                return;
            }

            self.deferred.notify(error, self.currentAttemptNumber);
            setTimeout(function () {
                self._attempt();
            }, timeout);
        });
    },

    isFulfilled: function () {
        return this.deferred.state() !== "pending";
    }
};

module.exports = Attempt;
