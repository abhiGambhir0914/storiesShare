const express = require('express');
const router = express.Router();

var path = require("path");

router.use(express.static(path.join(__dirname, '/public')));


// '/' route
router.get('/',(req,res)=>{
  res.sendFile('login.html', { root: __dirname });
});

router.get('/dashboard',(req,res)=>{
  res.send('Dashboard');
});

module.exports = router;
