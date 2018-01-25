const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');

// const share = require('social-share');

//Stories Index
router.get('/',ensureAuthenticated,(req,res)=>{
  Story.find({status: 'public'})
    .populate('user')
    .then(stories => {
      res.render('stories/index',{
        stories: stories,
        layout:'layout2'
      });

    });
});

//Show Single Story
router.get('/show/:id',ensureAuthenticated,(req,res)=>{
  Story.findOne({
    _id: req.params.id
  })
  .populate('user')
  .then(story => {
      res.render('stories/show',{
        story: story,
        layout:'layout3'
      });

  });
});

//Add Story Form
router.get('/add',ensureAuthenticated,(req,res)=>{
  res.render('stories/add',{ layout:'layout2' });
});

//stories POST
router.post('/',(req,res)=>{

  let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else{
    allowComments = false;
  }

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }

  //Create Story
  new Story(newStory)
    .save()
    .then(story=>{
      res.redirect(`/stories/show/${story.id}`);
    });

});


module.exports = router;
