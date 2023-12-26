const passport = require('passport');
const LocalStartegy=require('passport-local');


const User=require('../models/users');

passport.use(new LocalStartegy(
    {
        usernameField:'email',
        passReqToCallback:true
    },
    function(req,email,password,done){
        try {
            User.findOne({email:email}).then(function(user){
                
                if (!user || user.password!=password) {
                    return done(null,false);
                };
                return done(null,user);
            }).catch(function(err){
                return done(err)
            })
            

        } catch (err) {
            return done(err)
        }
    }

));

passport.serializeUser(function(user,done){
    return done(null,user.id);
});

passport.deserializeUser(function(id,done){
    console.log(id)
    User.findOne({_id:id}).then(function(user){
        console.log(user)
         return done(null,user);
    }).catch(function(err){
        return done(err);
    })
    

    
});

passport.chekAuthentication=function(req,res,next){
    if (req.isAuthenticated()){
        return next();
    };
    return res.redirect('/users/sign-in')
};

// set the authenticated user 
passport.setAuthenticatedUser=function(req,res,next){
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()){
        res.locals.user=req.user;
    }
    return next();
};

