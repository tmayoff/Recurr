$(document).ready(function () {
    $('.tabs li').on('click', (e) => {
        let current = $(e.currentTarget);

        let tabcontent = current.parent().parent().data("tabs-name");
        tabcontent = $(tabcontent.toString())

        var tab = current.data('tab-name');

        // Switch tab name highlight
        $(".tabs li").removeClass('is-active');
        current.addClass('is-active');

        // Switch visible tab
        tabcontent.find("div").removeClass("is-active");
        $(tab).addClass('is-active');
    });
});