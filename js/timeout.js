module.exports = function (timeout) {
    var dfd = $.Deferred();
    setTimeout(dfd.resolve, timeout);
    return dfd.promise();
};
