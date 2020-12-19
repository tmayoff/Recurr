$('document').ready(() => {
    $("#new-modal").click(() => toggleModal("new-recurr"));
    $("#new-recurr .modal-background").click(() => toggleModal("new-recurr"));

    $("#edit-recurr").children(".modal-background").click(() => toggleModal("edit-recurr"));
    $(".edit-recurr").click(e => {
        toggleModal("edit-recurr");
        let form = $("#edit-form");

        let id = $(e.currentTarget).attr('id');
        let tr = $("#" + id);
        let name = tr.children("#name").text();
        let price = tr.children("#price").text();
        let dueday = new Date(tr.children("#dueday").attr("data"));
        let cycletype = tr.children("#cycletype").text();

        var day = ("0" + dueday.getDate()).slice(-2);
        var month = ("0" + (dueday.getMonth() + 1)).slice(-2);


        form.attr("action", form.attr("action") + "/" + id)

        $("#edit-name-input").val(name);
        $("#edit-price-input").val(price.substring(1));
        $("#edit-dueday-input").val(dueday.getFullYear() + "-" + (month) + "-" + (day));
        $("#edit-cycletype-input").val(cycletype);
    })
});

function toggleModal(modalName) {
    $(".modal#" + modalName).toggleClass("is-active");
}

function getDateFromDayAndCycleType(day, cycletype) {
    var now = new Date();
    var date = new Date(now.getFullYear(), now.getMonth(), day, 0, 0, 0, 0);
    if (date < now) {
        switch (cycletype) {
            case "Monthly":
                date = new Date(date.setMonth(date.getMonth() + 1));
                break;
            case "Yearly":
                date = new Date(date.setFullYear(date.getFullYear() + 1));
                break;
            // TODO Add weekly
            default:
                break;
        }
    }
    return date;
}