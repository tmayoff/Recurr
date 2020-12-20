var express = require('express');
const auth = require('../services/auth');
const UserModel = require('../models/User');

var router = express.Router();

/* GET users listing. */
router.get('/', auth.isAuthenticated, (req, res, next) => {
  let promises = [];

  promises.push(UserModel.findOne({
    where: {
      id: req.user.id
    }
  }));

  Promise.all(promises).then(results => {
    res.render('user', { user: results[0] });
  });
});

module.exports = router;
