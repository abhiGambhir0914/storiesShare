const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 9000; //process.env.PORT for production port

// '/' route
app.get('/',(req,res)=>{
  res.send('It Works!');
});

app.listen(port,()=>console.log(`Server set at ${port}`));
