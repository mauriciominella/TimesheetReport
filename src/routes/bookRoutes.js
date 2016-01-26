var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function(navigation){

	bookRouter.route('/')
		.get(function(req, res){

			var url = 'mongodb://localhost:27017/libraryApp';

			mongodb.connect(url, function(err, db){
					var collection = db.collection('books');

					collection.find({}).toArray(
						function(err, results){
								res.render('bookListView',
																			{
																			 title:'Books',
																			 nav: navigation,
																			 books: results
																		 });
								db.close();
					});

			});


		});

	bookRouter.route('/:id')
		.get(function (req, res) {
	    var id = new objectId(req.params.id);

			var url = 'mongodb://localhost:27017/libraryApp';

			mongodb.connect(url, function(err, db){
					var collection = db.collection('books');

					collection.findOne({_id: id},
						function(err, results){
								res.render('bookView',
																			{
																			 title:'Books',
																			 nav: navigation,
																			 book: results
																		 });
								db.close();
					});

			});

			//res.render('bookView', {title:'Books', nav: navigation, book: books[id] });
		});

		return bookRouter;
};

module.exports = router;
