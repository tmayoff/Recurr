const express = require('express');
const RecurrModel = require('../models/Recurr');
const FolderModel = require('../models/Folder');
const auth = require('../services/auth');
const router = express.Router();

router.post('/recur/new', auth.isAuthenticated, (req, res, next) => {
    var day = 0;
    var cycle_type = req.body.cycle_type
    switch (cycle_type) {
        case "Yearly":
            var now = new Date(req.body.date);
            var start = new Date(now.getFullYear(), 0, 0);
            var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
            var oneDay = 1000 * 60 * 60 * 24;
            day = Math.floor(diff / oneDay);
            break;
        case 'Monthly':
            var now = new Date(req.body.date);
            day = now.getDate() + 1;
            break;

        default:
            break;
    }

    RecurrModel.create({
        name: req.body.name,
        normalized_name: req.body.name.toLowerCase().replace(" ", "_"),
        cycletype: cycle_type,
        dueday: day,
        duedate: req.body.date,
        price: req.body.price,
        userId: req.user.id
    }).then(res.redirect(req.body.redirectUrl)).catch(err => { next(err) });
});

router.post('/recur/edit/:id', auth.isAuthenticated, (req, res, next) => {
    var day = 0;
    var cycle_type = req.body.cycle_type
    switch (cycle_type) {
        case "Yearly":
            var now = new Date(req.body.date);
            var start = new Date(now.getFullYear(), 0, 0);
            var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
            var oneDay = 1000 * 60 * 60 * 24;
            day = Math.floor(diff / oneDay);
            break;
        case 'Monthly':
            var now = new Date(req.body.date);
            day = now.getDate() + 1;
            break;

        default:
            break;
    }

    let folder = null;
    if (req.body.folder != "None") folder = req.body.folder;

    RecurrModel.update({
        name: req.body.name,
        normalized_name: req.body.name.toLowerCase().replace(" ", "_"),
        cycletype: cycle_type,
        dueday: day,
        duedate: req.body.date,
        price: req.body.price,
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

module.exports = router;