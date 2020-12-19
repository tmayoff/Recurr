$('document').ready(() => {
    $("#new-modal").click(toggleModal);
    $(".modal-background").click(toggleModal);

    $("input-number").on('change', () => {

    })
});

function toggleModal() {
    $(".modal").toggleClass("is-active");
}