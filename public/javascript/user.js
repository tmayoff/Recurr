$(document).ready(() => {
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

        console.log("Submitting");

        let name = $("#folder-name-input").val();
        let url = $("#new-folder-form").attr('action');
        console.log(url)

        $.post(url, { name }, () => {

            //TODO Done
            $("#folder-name-input").val("");
            window.location.reload();
        }).fail(() => {
            console.error("Error");
        });



        return false;
    })
});