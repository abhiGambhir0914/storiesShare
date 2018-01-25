const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

//Load User model
const User = mongoose.model('users');

module.exports = function(passport){
//GoogleStrategy
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done)=>{
      // console.log(accessToken);
      // console.log(profile);
      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?') );
      // console.log(image);

      const newUser ={
        ID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      }

      //Check for existing user
      User.findOne({
        ID: profile.id
      })
      .then(user => {
        if(user){
          //Return User
          done(null,user);
        }
        else{
          //Create User
          new User(newUser)
            .save()
            .then(user => done(null,user));
        }
      })
    })
  );

//FacebookStrategy
  passport.use(new FacebookStrategy({
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id','displayName','photos','emails'], //did long method could have used 'name'
    proxy: true   //not sure about this
  }, (accessToken, refreshToken, profile, done)=>{
    // console.log(accessToken);
    // console.log(profile);
   const image = `https://graph.facebook.com/${profile.id}/picture?`;
  //  console.log(image);
  const name = profile.displayName.split(' ');

  const newUser ={
    ID: profile.id,
    firstName: name[0],
    lastName: name[1],
    // firstName: profile.displayName.value.substring(0, profile.displayName.value.indexOf(' ')),
    // lastName: profile.displayName.value.substring(profile.displayName.value.indexOf(' '+ 1),),
    email: profile.emails[0].value,
    image: image
  }
  // console.log(newUser);    for debugging
  //Check for existing user
  User.findOne({
    ID: profile.id
  })
  .then(user => {
    if(user){
      //Return User
      done(null,user);
    }
    else{
      //Create User
      new User(newUser)
        .save()
        .then(user => done(null,user));
    }
  })

  })
 );

 //Serialize and Deserialize User
 passport.serializeUser((user,done)=>{
   done(null,user.id);
 });

 passport.deserializeUser((id,done)=>{
   User.findById(id, (err,user)=>{
     done(err,user);
   });
 });

}
