var schedule = require('node-schedule');
var Recurr = require('../models/Recurr');

schedule.scheduleJob("update-due-date", "0 0 * * *", () => {
    // Get all dates
    Recurr.findAll().then((list) => {
        list.forEach(r => {
            let type = r.duedate
        })
    });
});
