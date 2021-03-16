$('document').ready(() => {
    $("#new-recurr-modal").children(".modal-background").click(() => toggleModal("new-recurr-modal"));
    $(".new-recurr").click(() => toggleModal("new-recurr-modal"));

    $("#edit-recurr-modal").children(".modal-background").click(() => toggleModal("edit-recurr-modal"));
    $(".edit-recurr").click(e => {
        let form = $("#edit-form");

        let id = $(e.currentTarget).attr('id');
        form.attr("action", form.attr("action") + "/" + id);

        $.get("api/recurr/" + id, Recurr => {
            toggleModal("edit-recurr-modal");

            Recurr = Recurr[0];
            console.log(Recurr);

            $("#edit-name-input").val(Recurr.name);
            $("#edit-price-input").val(Recurr.price);
            $("#edit-cycletype-input").val(Recurr.cycletype);
            $("#edit-paused-input").prop("checked", Recurr.paused);

            if (Recurr.folder)
                $("#edit-folder-input").val(Recurr.folder.id);
            else
                $("#edit-folder-input").val("None");

            let duedate = new Date(Recurr.duedate);
            var day = ("0" + duedate.getDate()).slice(-2);
            var month = ("0" + (duedate.getMonth() + 1)).slice(-2);
            $("#edit-dueday-input").val(duedate.getFullYear() + "-" + (month) + "-" + (day));
        });
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
