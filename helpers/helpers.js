function getDateFromDayAndCycleType(day, cycletype) {
    var now = new Date();
    var date = new Date();
    switch (cycletype) {
        case "Monthly":
            date = new Date(date.setMonth(date.getMonth() + 1));
            break;
        case "Yearly":
            let year = now.getFullYear();
            if (year <= now.getFullYear())
                year++;

            date = new Date(year, 0);
            date = new Date(date.setDate(day - 1))
            return date;
        // TODO Add weekly
        default:
            break;
    }
    console.log(day + " " + cycletype);
    return date;
}

exports.getDateFromDayAndCycleType;