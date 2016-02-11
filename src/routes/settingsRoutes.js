var express = require('express');
var settingsRouter = express.Router();

var router = function(navigation){

  var settingsController = require('../controllers/settingsController')({navigation: navigation});

  settingsRouter.use(settingsController.middleware);

  settingsRouter.route('/')
    .get(settingsController.getIndex)
    .post(settingsController.postSaveSettings);

    return settingsRouter;
};

module.exports = router;
