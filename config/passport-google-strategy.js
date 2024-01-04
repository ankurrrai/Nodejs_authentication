const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto')
const User=require('../models/users');


// Eastablish the google strategy
passport.use(new googleStrategy(
    {
        clientID:process.env.NodejsAuthenticationGoogleClientId,
        clientSecret:process.env.NodejsAuthenticationGoogleScrectKey,
        callbackURL:process.env.NodejsAuthenticationGoogleCallBackURL
        
        
    }, function(accesstoken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).then(function(user){
            if(!user){
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex') //password updating for google user
                }).then(function(newUser){
                    return done(null,newUser)
                }).catch(function(err){
                    console.log('Error in passport-google-auth2 while adding the new User : ',err);
                })
            }else{
                return done(null,user)
            }
        }).catch(function(err){
            console.log('Error in passport-google-auth2 while adding the new User : ',err);
        })
    }
));

module.exports=passport