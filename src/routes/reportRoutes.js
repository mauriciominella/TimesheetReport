var express = require('express');
var reportRouter = express.Router();
var dateService = require('../services/dateService')();
var configService = require('../services/configService')();
var togglRepository = require('../repository/togglRepository')();
var moment = require('moment');
moment.locale('pt-br');

var timeEntryService = require('../services/timeEntryService')({
	togglRepository : togglRepository,
	dateService : dateService
});

var calculationService = require('../services/calculationService')({
	configService : configService
});

var router = function(navigation){

	var reportController = require('../controllers/reportController')({
		timeEntryService : timeEntryService,
		calculationService : calculationService,
		navigation: navigation
	});

	reportRouter.use(reportController.middleware);

	reportRouter.route('/')
		.get(reportController.getIndex)
		.post(reportController.postActions);

		return reportRouter;
};

module.exports = router;
