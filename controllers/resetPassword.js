const crypto=require('crypto');
const User=require('../models/users');
const AccessToken = require('../models/accesstoken');

const queue=require('../config/kue');
const resetPassWorker=require('../workers/resetWorkers');
const passport = require('passport');

// Open The forget password
module.exports.forgetPassword=function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    };
    return res.render('forgetPassword.ejs',{
        title:'Reset Password'
    })
};

// heck the email and share the email using nodemailer and kue
module.exports.updateNewPassword=async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            let accessToken=await AccessToken.create({
                user:user._id,
                accessToken:crypto.randomBytes(20).toString('hex'),
                isValid:true,
            })

            accessToken=await AccessToken.findOne({accessToken:accessToken.accessToken}).populate('user');

            let job=queue.create('resets',accessToken).save(function(err){
                if (err){console.log('reset_password_controllers : Error in sending queue ',err);return;}
                
            });

            req.flash('success','Reset link shared to your email.')
            return res.redirect('/')

        } else {
            req.flash('error','This email is not registered. Kindly Use regieterd email or signup with this email..');
            return res.redirect('back')
        }
    } catch (err) {
        req.flash('error',err)
        console.log(`Error in resetController -> reset`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')   
    }
    
    
};

// Check the token details and render the page
module.exports.resetPassword=async function(req,res){
    try {
        let accessToken=await AccessToken.findOne({accessToken:req.query.accessToken});
        let createdat=new Date(accessToken.createdAt)
        let now=new Date()
        
        if (accessToken && (Math.abs(now - createdat)<=(1000*60*10)) && accessToken.isValid){
        
            return res.render('createNewPassword.ejs',{
                title:'Reset',
                accessToken:accessToken.accessToken
            })
        }else{
            return res.send('<h1> This link is no longer valid! </h1>')
        }
    } catch (err) {
        req.flash('error',err)
        console.log(`Error in resetController -> resetPassword`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')
    }
};

// Update with new password
module.exports.newPassword=async function(req,res){
    try {

        if (req.body.confirmPassword!=req.body.password){
            req.flash('error','Kindly retry!')
            return res.redirect('back')
        };

        let accessToken=await AccessToken.findOne({accessToken:req.body.accessToken,isValid:true});
        if (accessToken){
            let user=await User.findByIdAndUpdate(accessToken.user,{password:req.body.password});
            accessToken.isValid=false;
            accessToken.save();
            req.flash('success','Password changed successfully!')
            return res.redirect('/')
        }else{
            return res.send('<h1> Error 404! </h1>')
        }

    } catch (err) {
        req.flash('error',err)
        console.log(`Error in resetController -> resetPassword`)
        console.log(`Error Description ${err}`)
        return res.redirect('/')
    }
}
