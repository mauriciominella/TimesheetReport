//modules
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 5000;

var navigation = [{Link:'/Reports', Text: 'Report'},{Link:'/Settings', Text:'Settings'}];

var reportRouter = require('./src/routes/reportRoutes')(navigation);
var authRouter = require('./src/routes/authRoutes')(navigation);
var settingsRouter = require('./src/routes/settingsRoutes')(navigation);

mongoose.connect('mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + ':27017/timesheetreport');

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

app.use(express.static('src/views'));
app.set('views', './src/views');

var handlebarsConfig = require('./src/config/handlebarsConfig')({app: app});

//routes
app.use('/Reports', reportRouter);
app.use('/Auth', authRouter);
app.use('/Settings', settingsRouter);

app.get('/', function(req, res){
	res.render('index', {	title: 'Home', nav: navigation });
});

//starting the server
app.listen(5000, function(err){
	console.log('running server on port ' + port);
});
