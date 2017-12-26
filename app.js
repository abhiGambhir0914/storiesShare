const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

var path = require("path");


// var path = require("path");

//jade
// const jade = require('jade');

//Load User Model
require('./models/User');

//Passport config
require('./config/passport')(passport);

//Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//Load Keys
const keys = require('./config/keys');

//Load Global Promise
mongoose.Promise = global.Promise;

//Mongoose Connect
mongoose.connect(keys.mongoURI,{
  useMongoClient: true
})
.then(()=>console.log('MongoDB Connected............'))
.catch(err => console.log(err))

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.use(express.static(path.join(__dirname, '/public')));


// app.set('view engine', 'jade');

//Session n cookieParser Middleware
app.use(cookieParser());
app.use(session({
  secret: 'secrethaibc',
  resave: false,
  saveUninitialized: false,
  // cookie: {secure: true}  //if using https only
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set Global vars
app.use((req,res,next) => {
  res.locals.user = req.user || null;
  next();
});

//Use routes
app.use('/',index);
app.use('/auth',auth);
app.use('/stories',stories);

const port = process.env.PORT || 9000; //process.env.PORT for production port


app.listen(port,()=>console.log(`Server set at ${port}`));
