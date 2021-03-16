$(document).ready(() => {

    // Edit folder
    $(".folder-edit-button").click(e => {
        let editBtn = $(e.currentTarget);
        let td = editBtn.parents("td");
        editBtn.parent().toggleClass("is-hidden");
        let c = td.children(".folder-save-button").parent()
        console.log(c);
        c.toggleClass("is-hidden");
    });

    // Delete folder
    $(".folder-delete").click(e => {
        let id = $(e.currentTarget).data("id");
        $.ajax({
            type: "delete",
            url: "api/folder/" + id,
            success: () => {
                window.location.reload();
            },
            error: () => {
                console.log("error")
            }
        });
    });

    $("#new-folder-form").on('submit', e => {

        let name = $("#folder-name-input").val();
        let url = $("#new-folder-form").attr('action');

        $.post(url, { name }, () => {
            $("#folder-name-input").val("");
            window.location.reload();
        }).fail(() => {
            console.error("Error");
        });
        return false;
    })
});
