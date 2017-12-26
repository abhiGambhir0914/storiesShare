const express = require('express');
const router = express.Router();

//Stories Index
router.get('/',(req,res)=>{
  res.render('stories/index',{ layout:'layout2' });
});

//Add Stories Form
router.get('/add',(req,res)=>{
  res.render('stories/add',{ layout:'layout2' });
});


module.exports = router;
