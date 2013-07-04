$(function () {
    require.match(/.*Example$/);
    $('pre code').each(function(i, e) {
        hljs.highlightBlock(e);
    });
});
