const auth = require('../services/auth');
const express = require('express');
const RecurrModel = require('../models/Recurr');
const FolderModel = require('../models/Folder');

var router = express.Router();

/* GET home page. */
router.get('/', auth.isAuthenticated, (req, res, next) => {
  let promises = [];
  let filter = req.query.folder;

  if (filter) {
    promises.push(RecurrModel.findAll({
      where: {
        userId: req.user.id,
        folderId: filter
      },
      include: [FolderModel]
    }));
  } else {
    promises.push(RecurrModel.findAll({
      where: {
        userId: req.user.id
      },
      include: [FolderModel]
    }));
  }

  promises.push(FolderModel.findAll({
    where: {
      userId: req.user.id
    },
    include: [RecurrModel]
  }));

  promises.push(RecurrModel.count({
    where: { userId: req.user.id }
  }))

  Promise.all(promises).then((results) => {
    // Calculate summary
    let monthly = 0;
    let yearly = 0;
    results[0].forEach(obj => {
      let now = new Date();
      if (now > obj.duedate)
        UpdateRecurr(obj);

      if (obj.paused) return;

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

    res.render('index', { user: req.user, total: results[2], list: results[0], folders: results[1], yearly, monthly });
  });
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
