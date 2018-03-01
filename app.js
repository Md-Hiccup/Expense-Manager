var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var env = require('dotenv').load();
var flash = require('connect-flash');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/expense-manager', { promiseLibrary: require('bluebird')})
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    cookieName: 'session',
    resave : true ,
    saveUninitialized: true,
    secret: 'express-session'
    // duration: 30 * 60 * 1000,
    // activeDuration: 5 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());   // persistent login sessions
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

// allowing cross origin resource sharing permission
app.use(cors({origin: '*'}));

// var auth = require('./routes/authjwt')(passport);
// var routes = require('./routes/index')(passport);
var auth = require('./routes/auth');
var routes = require('./routes/item');
app.use('/auth', auth);
app.use('/', routes);

//Models
// var models = require("./models");

//load passport strategies
// require('./config/passport.js')(passport, models.User, models.GoogleUser, models.FacebookUser);

//Sync Database   [ for forcefully delete previous value in DB use .sync({force:true}.then(..) ]
// models.sequelize.sync({force: false}).then(function(){
//     console.log('Nice! Database looks fine')
// }).catch(function(err){
//     console.log(err,"Something went wrong with the Database Update!")
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3005, function () {
    console.log('Example app listening on port 3005!');
});

module.exports = app;
