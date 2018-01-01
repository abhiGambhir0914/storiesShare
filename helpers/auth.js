module.exports = {
  ensureAuthenticated: function(req,res,next){
    if(req.isAuthenticated()){  //isAuthenticated from passport
       return next();
    }
    res.redirect('/');
  },

  ensureGuest: function(req,res,next){
    if(req.isAuthenticated()){  //isAuthenticated from passport
        res.redirect('/dashboard');
    } else{                     //else very imp if not written it localhost keeps on loading
      return next();
    }
  }

}
