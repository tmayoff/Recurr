$(document).ready(() => {
    let urlSearchJson = getJsonFromUrl(window.location.search);
    if (urlSearchJson.folder) {
        $(`.menu-item[data-folder='${urlSearchJson.folder}']`).toggleClass('is-active')
    } else {
        $(`.menu-item[data-folder='all']`).toggleClass('is-active')
    }
});

function getJsonFromUrl(url) {
    if (!url) url = location.search;
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function (part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}