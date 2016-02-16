var express = require('express');
var settingsRouter = express.Router();
var settingsModel = require('../models/settings');
var settingsRepository = require('../repository/settingsRepository')({
    settingsModel: settingsModel
});

var router = function(navigation){

  var settingsController = require('../controllers/settingsController')({
    navigation: navigation,
    settingsRepository: settingsRepository
  });

  settingsRouter.use(settingsController.middleware);

  settingsRouter.route('/')
    .get(settingsController.getIndex)
    .post(settingsController.postSaveSettings);

    return settingsRouter;
};

module.exports = router;
