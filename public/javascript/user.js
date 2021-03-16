$(document).ready(() => {

    $("#new-folder-form").on('submit', e => {

        console.log("Submitting");

        let name = $("#folder-name-input").val();
        let url = $("#new-folder-form").attr('action');
        console.log(url)

        $.post(url, { name }, () => {
            $("#folder-name-input").val("");
            window.location.reload();
        }).fail(() => {
            console.error("Error");
        });

        return false;
    })
});
