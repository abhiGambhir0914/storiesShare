const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// var path = require("path");
//
// router.use(express.static(path.join(__dirname, '/public')));


// '/' route
router.get('/',ensureGuest,(req,res)=>{
  // res.sendFile('login.html', { root: __dirname });
  res.render('login');
});

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
  Story.find({user: req.user.id})
    .sort({date:'desc'})
    .then(stories => {
      res.render('dashboard',{ layout: 'layout2', stories: stories });
    });
});


module.exports = router;
