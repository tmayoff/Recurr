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
    console.log(day + " " + cycletype);
    return date;
}

export { getDateFromDayAndCycleType }