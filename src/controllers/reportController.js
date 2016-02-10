var reportController = function(options){

	var dateHelper = options.dateHelper;
	var moment = dateHelper.moment();
	var DATE_FORMAT = dateHelper.getDateFormat();

	var VIEW_NAME = 'ReportView';
	var PAGE_TITLE = 'Toggl Report';

  var middleware = function(req, res, next){
    next();
  };

	var renderTimeEntriesByDate = function(req, res, currentDate){

		var getByDateCallBack = function(timeEntries){

			res.render(VIEW_NAME,
														{
														 title: PAGE_TITLE,
														 nav: options.navigation,
														 timeEntries: timeEntries,
														 currentDate: moment(currentDate).format(DATE_FORMAT)
													 });
		};

		options.timeEntryService.getByDate(currentDate, getByDateCallBack);
	};


	var getIndex = function(req, res){
		renderTimeEntriesByDate(req, res, moment().subtract(1, 'days').toDate());
	};


	var postActions = function(req, res){

			var currentDate = moment(req.body.currentDate, DATE_FORMAT);

			var render = function(currentDate, timeEntries){
				res.render(VIEW_NAME,
															{
															 title: PAGE_TITLE,
															 nav: options.navigation,
															 timeEntries: timeEntries,
															 currentDate: currentDate.format(DATE_FORMAT)
														 });
			};

			var calculate = function(req){

				var selectedTimeEntries = JSON.parse('[' + unescape(req.body.selectedTimeEntries) + ']');
				selectedTimeEntries = options.timeEntryService.mapToTimeEntry(selectedTimeEntries);

				var result = options.calculationService.calculateItems(selectedTimeEntries, currentDate.toDate());

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
			};
		};

    return {
        getIndex : getIndex,
        postActions : postActions,
        middleware : middleware
    };
};
module.exports = reportController;
