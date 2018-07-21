let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('passport');
let flash = require('connect-flash');
let validator = require('express-validator');
var nStatic = require('node-static');


let config = require('./config/config');
// let http = require('http');
let path = require('path');

let app = express();
let User = require('./backend/routes/user/userRoute');
let Image = require('./backend/routes/imageRoutes/imageRoute');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser());
app.use(validator());
app.use(cookieParser());
app.use(session({secret:'secretServices', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'dist')));


//Routes
app.use('/user', User);
app.use('/image', Image);

app.use((data,req, res, next) => {
    const error = new Error(data);
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            message: error.message,
            status: error.status
        }
    })
})

app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

//server start
app.listen(config.port, function (err) {
    if (err) {
        console.log('error found in server start' + err);
    } else {
        console.log("connected to server at port " + config.port);
    }
});



//databse connectivity
mongoose.connect(config.database);
require('./config/passport');
mongoose.connection.on("connected", function (err) {
    if (err) {
        console.log("error in database connectivity" + err);
    } else {
        console.log('connected to database at port 27017');
    }
});



