$(document).ready(() => {
    $(".navbar-burger").click(e => {
        let current = $(e.currentTarget);
        current.toggleClass("is-active");
        $("#" + current.data("target")).toggleClass("is-active");
    });
});