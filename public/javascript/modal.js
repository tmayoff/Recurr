$('document').ready(() => {
    $("#new-modal").click(toggleModal);
    $(".modal-background").click(toggleModal);
});

function toggleModal() {
    $(".modal").toggleClass("is-active");
}