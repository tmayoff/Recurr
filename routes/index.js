const auth = require('../services/auth');
const passport = require('../services/passport');
const express = require('express');
const { User, RecurPay, hashPassword } = require('../models/model');

var router = express.Router();

/* GET home page. */
router.get('/', auth.isAuthenticated, (req, res, next) => {

  RecurPay.findAll({
    where: {
      userId: req.user.id
    }
  }).then(list => {
    res.render('index', { user: req.user, list });
  });
});



module.exports = router;