const auth = require('../services/auth');
const passport = require('../services/passport');
const express = require('express');
const { User, RecurPay, hashPassword } = require('../models/model');

var router = express.Router();

/* GET home page. */
router.get('/', auth.isAuthenticated, (req, res, next) => {
  let promises = [];

  promises.push(RecurPay.findAll({
    where: {
      userId: req.user.id
    }
  }));

  promises.push(RecurPay.findAll({
    attributes: ['price', 'cycletype']
  }));


  Promise.all(promises).then((results) => {
    // Calculate summary
    let monthly = 0;
    let yearly = 0;
    results[1].forEach(obj => {
      switch (obj.cycletype) {
        case "Monthly":
          monthly += obj.price;
          break;
        case "Yearly":
          yearly += obj.price;
          break;
      }
    });

    monthly += yearly / 12;
    res.render('index', { user: req.user, list: results[0], monthly });
  });
});



module.exports = router;