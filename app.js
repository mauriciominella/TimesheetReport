//modules
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;

var navigation = [{Link:'/Books', Text: 'Book'},{Link:'/Authors', Text:'Author'}];

var bookRouter = require('./src/routes/bookRoutes')(navigation);
var adminRouter = require('./src/routes/adminRoutes')(navigation);
var authRouter = require('./src/routes/authRoutes')(navigation);

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

app.use(express.static('src/views'));
app.set('views', './src/views');

var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');


//routes
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res){
	res.render('index', {	title: 'Home', nav: navigation });
});


var togglRepository = require('./src/repository/togglRepository')();
//starting the server
app.listen(5000, function(err){
	console.log('running server on port ' + port);

	togglRepository.getGroupingByDescAndDayByDate(new Date(), function(response){
			console.log(response);
	});


});
