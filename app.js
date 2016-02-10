//modules
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;

var navigation = [{Link:'/Reports', Text: 'Report'},{Link:'/Authors', Text:'Author'}];

var reportRouter = require('./src/routes/reportRoutes')(navigation);
var adminRouter = require('./src/routes/adminRoutes')(navigation);
var authRouter = require('./src/routes/authRoutes')(navigation);
var settingsRouter = require('./src/routes/settingsRoutes')(navigation);

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
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/Settings', settingsRouter);

app.get('/', function(req, res){
	res.render('index', {	title: 'Home', nav: navigation });
});

//starting the server
app.listen(5000, function(err){
	console.log('running server on port ' + port);
});
