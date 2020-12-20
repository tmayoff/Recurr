$('document').ready(() => {
    $("#new-modal").click(() => toggleModal("new-recurr"));
    $("#new-recurr .modal-background").click(() => toggleModal("new-recurr"));

    $("#edit-recurr").children(".modal-background").click(() => toggleModal("edit-recurr"));
    $(".edit-recurr").click(e => {
        toggleModal("edit-recurr");
        let form = $("#edit-form");

        let id = $(e.currentTarget).attr('id');
        form.attr("action", form.attr("action") + "/" + id)

        let tr = $("#" + id);
        let name = tr.children("#name").text();
        let price = tr.children("#price").text();
        let duedate = new Date(tr.children("#dueday").attr("data"));
        let cycletype = tr.children("#cycletype").text();

        var day = ("0" + duedate.getDate()).slice(-2);
        var month = ("0" + (duedate.getMonth() + 1)).slice(-2);
        $("#edit-dueday-input").val(duedate.getFullYear() + "-" + (month) + "-" + (day));


        $("#edit-name-input").val(name);
        $("#edit-price-input").val(price.substring(1));
        $("#edit-cycletype-input").val(cycletype);
    })

    $("#delete-recurr-modal").children(".modal-background").click(() => toggleModal("delete-recurr-modal"));
    $(".delete-recurr").click(e => {
        let id = $(e.currentTarget).attr('id');
        let tr = $("#" + id);
        let name = tr.children("#name").text();
        $("#delete-recurr-modal").find("#delete-modal-subtitle").text("Are you sure you want to delete " + name);
        let btn = $("#delete-recurr-modal").find("#delete-recur-button");
        btn.attr("href", btn.attr("href") + id);

        toggleModal("delete-recurr-modal");
    })
});

function toggleModal(modalName) {
    console.log("toggling modal: " + modalName)
    $(".modal#" + modalName).toggleClass("is-active");
}