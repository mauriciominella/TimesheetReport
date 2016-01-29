var express = require('express');
var reportRouter = express.Router();
var togglRepository = require('../repository/togglRepository')();
var dateService = require('../services/dateService')();

var timeEntryService = require('../services/timeEntryService')({
	togglRepository : togglRepository,
	dateService : dateService
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

			timeEntryService.getByDate(new Date(), getByDateCallBack);
		});

		return reportRouter;
};

module.exports = router;
