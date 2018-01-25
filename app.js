const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var path = require("path");

// var path = require("path");

//jade
// const jade = require('jade');

//Load Models
require('./models/User');
require('./models/Story');

//Passport config
require('./config/passport')(passport);

//Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//Load Keys
const keys = require('./config/keys');

//handlebars helpers
const {
  truncate,
  stripTags,
  formatDate,
  select
} = require('./helpers/hbs');

//Load Global Promise
mongoose.Promise = global.Promise;

//Mongoose Connect
mongoose.connect(keys.mongoURI,{
  useMongoClient: true,
})
.then(()=>console.log('MongoDB Connected............'))
.catch(err => console.log(err))

const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', exphbs({
  helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formatDate: formatDate,
    select: select
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// app.use(express.static(path.join(__dirname, '/public')));


// app.set('view engine', 'jade');

//Session n cookieParser Middleware
app.use(cookieParser());
app.use(session({
  secret: 'secrethaibc',
  resave: true,
  saveUninitialized: true,
  // cookie: {secure: true}  //if using https only
  cookie: {maxAge: 5*60*60*1000 },               //5 hours of inactivity
  rolling: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//method-override Middleware
app.use(methodOverride('_method'));

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
