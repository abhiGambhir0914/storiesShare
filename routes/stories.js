const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

//Stories Index
router.get('/',ensureAuthenticated,(req,res)=>{
  res.render('stories/index',{ layout:'layout2' });
});

//Add Story Form
router.get('/add',ensureAuthenticated,(req,res)=>{
  res.render('stories/add',{ layout:'layout2' });
});


module.exports = router;
