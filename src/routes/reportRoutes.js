var express = require('express');
var reportRouter = express.Router();

var router = function(navigation){

	reportRouter.route('/')
		.get(function(req, res){

			res.render('timeEntryListView',
														{
														 title:'Books',
														 nav: navigation,
														 books: results
													 });


		});

		return reportRouter;
};

module.exports = router;
