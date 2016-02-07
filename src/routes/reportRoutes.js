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

	var DATE_FORMAT = 'DD/MM/YYYY';

	//middleware
	reportRouter.use(function(req, res, next){
		next();
	});

	var getPreviousDate = function(date){
		return moment(date).subtract(1, 'days');
	};

	var getNextDate = function(date){
		return moment(date).add(1, 'days');
	};

	var renderTimeEntriesByDate = function(req, res, currentDate){

		var getByDateCallBack = function(timeEntries){

			res.render('timeEntryListView',
														{
														 title:'Toggl Report',
														 nav: navigation,
														 timeEntries: timeEntries,
														 currentDate: moment(currentDate).format(DATE_FORMAT)
													 });
		};

		timeEntryService.getByDate(currentDate, getByDateCallBack);
	};

	reportRouter.route('/')
		.get(function(req, res){
			renderTimeEntriesByDate(req, res, moment().subtract(1, 'days').toDate());
		})
		.post(function(req, res){

			var currentDate = moment(req.body.currentDate, DATE_FORMAT);
			console.log(currentDate.toDate());
			var render = function(currentDate, timeEntries){
				res.render('timeEntryListView',
															{
															 title:'Toggl Report',
															 nav: navigation,
															 timeEntries: timeEntries,
															 currentDate: currentDate.format(DATE_FORMAT)
														 });
			};

			var calculate = function(req){

				var selectedTimeEntries = JSON.parse('[' + unescape(req.body.selectedTimeEntries) + ']');
				selectedTimeEntries = timeEntryService.mapToTimeEntry(selectedTimeEntries);

				var result = calculationService.calculateItems(selectedTimeEntries, currentDate.toDate());

				render(currentDate, result.items);
			};

			var today = function(req){
				renderTimeEntriesByDate(req, res, moment().toDate());
			};

			var previousDay = function(req){
				renderTimeEntriesByDate(req, res, moment(currentDate).subtract(1, 'days'));
			};

			var nextDay = function(req){
				renderTimeEntriesByDate(req, res, moment(currentDate).add(1, 'days'));
			};

			switch (req.body.action.toLowerCase()) {
				case 'calculate':
											calculate(req);
											break;
				case 'today':
											today(req);
											break;
				case 'previousday':
											previousDay(req);
											break;
				case 'nextday':
											nextDay(req);
											break;
				default:
					console.log('Invalid operation: ' + req.body.action.toLowerCase());
			}

		});


		return reportRouter;
};

module.exports = router;
