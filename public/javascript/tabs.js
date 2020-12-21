$(document).ready(function () {
    $('.menu a').on('click', (e) => {
        let current = $(e.currentTarget);

        let tabcontent = current.parents('.menu').data("tabs-name");
        tabcontent = $(tabcontent.toString())

        var tab = current.data('tab-name');

        // Switch tab name highlight
        $(".menu a").removeClass('is-active');
        current.addClass('is-active');

        // Switch visible tab
        tabcontent.find("div").removeClass("is-active");
        $(tab).addClass('is-active');
    });
});