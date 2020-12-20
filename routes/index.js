const auth = require('../services/auth');
const express = require('express');
const RecurrModel = require('../models/Recurr');
const FolderModel = require('../models/Folders');

var router = express.Router();

/* GET home page. */
router.get('/', auth.isAuthenticated, (req, res, next) => {
  let promises = [];

  promises.push(RecurrModel.findAll({
    where: {
      userId: req.user.id
    }
  }));

  promises.push(RecurrModel.findAll({
    attributes: ['price', 'cycletype']
  }));

  promises.push(FolderModel.findAll({
    where: {
      userId: req.user.id
    }
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
    let tmp = monthly;
    monthly += yearly / 12;
    yearly += tmp * 12;
    res.render('index', { user: req.user, list: results[0], folders: results[2], yearly, monthly });
  });
});



module.exports = router;