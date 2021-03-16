const express = require('express');
const RecurrModel = require('../models/Recurr');
const FolderModel = require('../models/Folder');
const auth = require('../services/auth');
const router = express.Router();

router.get('/recurr/:id?', auth.isAuthenticated, (req, res, next) => {
    let where = { userId: req.user.id };
    if (req.params.id) {
        where.id = req.params.id
    }

    RecurrModel.findAll({
        where,
        include: [{ model: FolderModel }]
    }).then(list => {
        let now = new Date();
        list.forEach(r => {
            if (now > new Date(r.duedate))
                UpdateRecurr(r);
        });

        res.send(list);
    });
});

router.post('/recur/new', auth.isAuthenticated, (req, res, next) => {
    var now = new Date(req.body.date);
    var day = now.getDate() + 1;
    let month = now.getMonth() + 1;
    var cycle_type = req.body.cycle_type

    RecurrModel.create({
        name: req.body.name,
        normalized_name: req.body.name.toLowerCase().replace(" ", "_"),
        cycletype: cycle_type,
        dueday: day,
        duemonth: month,
        duedate: req.body.date,
        price: req.body.price,
        userId: req.user.id
    }).then(res.redirect(req.body.redirectUrl)).catch(err => { next(err) });
});

router.post('/recur/edit/:id', auth.isAuthenticated, (req, res, next) => {
    var now = new Date(req.body.date);
    var day = now.getDate() + 1;
    let month = now.getMonth() + 1;
    var cycle_type = req.body.cycle_type

    let folder = null;
    if (req.body.folder != "None") folder = req.body.folder;
    let paused = false;
    if (req.body.paused == "on") paused = true;

    RecurrModel.update({
        name: req.body.name,
        normalized_name: req.body.name.toLowerCase().replace(" ", "_"),
        cycletype: cycle_type,
        dueday: day,
        duemonth: month,
        duedate: req.body.date,
        price: req.body.price,
        paused: paused,
        folderId: folder
    }, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect("/");
    }).catch(err => next(err));
});

router.get('/recur/delete/:id', auth.isAuthenticated, (req, res, next) => {
    RecurrModel.destroy({
        where: {
            id: req.params.id
        },
        cascade: true
    }).then(() => {
        res.redirect('/');
    }).catch(err => next(err));
});

router.post('/folder/new', auth.isAuthenticated, (req, res, next) => {
    FolderModel.create({
        userId: req.user.id,
        name: req.body.name,
        normalized_name: req.body.name.toLowerCase().replace(" ", "_"),
    }).then(res.sendStatus(200));
});

router.delete('/folder/:id', auth.isAuthenticated, (req, res, next) => {
    FolderModel.destroy({
        where: {
            id: req.params.id
        }
    }).then(res.sendStatus(200));
});

async function UpdateRecurr(Recurr) {
    console.log(Recurr);
    let dueYear = new Date(Recurr.duedate).getFullYear();
    let dueMonth = Recurr.duemonth;
    let dueDay = Recurr.dueday;

    switch (Recurr.cycletype) {
        case "Yearly":
            dueYear++;
            break;
        case "Monthly":
            dueMonth++;
            break;
    }

    let newDueDate = new Date(dueYear, dueMonth - 1, dueDay, 0, 0, 0, 0);

    await RecurrModel.update({
        duedate: newDueDate
    }, {
        where: {
            id: Recurr.id
        }
    });
}

module.exports = router;
