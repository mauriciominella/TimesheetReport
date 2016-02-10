var express = require('express');
var settingsRouter = express.Router();

var router = function(navigation){

  var settingsController = require('../controllers/settingsController')();

  settingsRouter.use(settingsController.middleware);

  settingsRouter.route('/')
    .get(settingsController.getIndex)

    return settingsRouter;
};

module.exports = router;
