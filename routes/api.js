const auth = require('../services/auth');
import passport from '../services/passport';
import { Router } from 'express';
import { RecurPay, hashPassword } from '../models/model';
const router = Router();

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

    RecurPay.create({
        name: req.body.name,
        normalized_name: req.body.name.toLowerCase().replace(" ", "_"),
        cycletype: cycle_type,
        dueday: day,
        price: req.body.price,
        userId: req.user.id
    }).then(res.redirect(req.body.redirectUrl)).catch(err => { next(err) });
});

export default router;