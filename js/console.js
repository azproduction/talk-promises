var Console = function (el) {
    this.$el = $(el);
};

Console.prototype.log = function (data) {
    $('<code/>').text('> ' + data).appendTo(this.$el);
};

Console.prototype.hide = function () {
    this.$el.slideUp();
};

Console.prototype.show = function () {
    this.$el.slideDown();
};

module.exports = Console;
