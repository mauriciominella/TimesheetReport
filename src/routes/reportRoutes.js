var express = require('express');
var reportRouter = express.Router();
var dateService = require('../services/dateService')();
var configService = require('../services/configService')();
var togglRepository = require('../repository/togglRepository')();
var moment = require('moment');

var timeEntryService = require('../services/timeEntryService')({
	togglRepository : togglRepository,
	dateService : dateService
});

var calculationService = require('../services/calculationService')({
	configService : configService
});

var router = function(navigation){

	reportRouter.route('/')
		.get(function(req, res){

			var getByDateCallBack = function(timeEntries){

				//res.send(timeEntries);
				res.render('timeEntryListView',
															{
															 title:'Toggl Report',
															 nav: navigation,
															 timeEntries: timeEntries
														 });
			};

			timeEntryService.getByDate(moment().subtract(1, 'days'), getByDateCallBack);
		})
		.post(function(req, res){

			var selectedTimeEntries = JSON.parse('[' + unescape(req.body.selectedTimeEntries) + ']');
			selectedTimeEntries = timeEntryService.mapToTimeEntry(selectedTimeEntries);

			var result = calculationService.calculateItems(selectedTimeEntries, new Date());

			res.render('timeEntryListView',
														{
														 title:'Toggl Report',
														 nav: navigation,
														 timeEntries: result.items
													 });

		});


		return reportRouter;
};

module.exports = router;
