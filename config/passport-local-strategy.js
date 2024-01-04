const passport = require('passport');
const LocalStartegy=require('passport-local');
const User=require('../models/users');

//eastablished the local startegy
passport.use(new LocalStartegy(
    {
        usernameField:'email',
        passReqToCallback:true
    },
    function(req,email,password,done){
        try {
            User.findOne({email:email}).then(function(user){
                if (!user) {
                    req.flash('error','UserName or Password is not correct!')
                    return done(null,false);
                };
                user.verifyPassword(password).then(function(valid){
                    if(valid){
                        return done(null,user);
                    }else{
                        req.flash('error','UserName or Password is not correct!')
                        return done(null,false);
                    }
                }).catch(function(err){
                    req.flash('error',err)
                    return done(err)
                })
                
                
            }).catch(function(err){
                req.flash('error',err)
                return done(err)
            })
            

        } catch (err) {
            req.flash('error',err)
            return done(err)
        }
    }

));

// serialize the user details
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

// deseriallize the user details through id
passport.deserializeUser(function(id,done){
    User.findOne({_id:id}).then(function(user){
         return done(null,user);
    }).catch(function(err){
        return done(err);
    })
    
});

// Custom authentication
passport.checkAuthentication=function(req,res,next){
    if (req.isAuthenticated()){   //req.isAuthenticated() is inbuilt function of passport
        return next();
    };
    return res.redirect('/users/sign-in')
};

// set the authenticated user 
passport.setAuthenticatedUser=function(req,res,next){
    if (req.isAuthenticated()){
        res.locals.user=req.user;
    }
    return next();
};

