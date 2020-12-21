var express = require('express');
const auth = require('../services/auth');
const UserModel = require('../models/User');
const FolderModel = require('../models/Folder');
const { relativeTimeThreshold } = require('moment');

var router = express.Router();

/* GET users listing. */
router.get('/', auth.isAuthenticated, (req, res, next) => {
  let promises = [];

  promises.push(UserModel.findOne({
    where: {
      id: req.user.id
    }
  }));

  promises.push(FolderModel.findAll({
    where: {
      userId: req.user.id
    }
  }));


  Promise.all(promises).then(results => {
    let folders = [];

    folders = folders.concat(results[1]);
    res.render('user', { user: results[0], folders });
  });
});

module.exports = router;
