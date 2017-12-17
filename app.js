const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Passport config
require('./config/passport')(passport);

//Load Routes
const auth = require('./routes/auth');

const app = express();

// '/' route
app.get('/',(req,res)=>{
  res.send('It Works!');
});

//Use routes
app.use('/auth',auth);

const port = process.env.PORT || 9000; //process.env.PORT for production port


app.listen(port,()=>console.log(`Server set at ${port}`));
