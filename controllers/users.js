const User=require('../models/users')

// Render the signin page
module.exports.signIn=function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('signIn.ejs',{
        title:'Sign In'
    })
};

// Render the signup page
module.exports.signUp=function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('signUp.ejs',{
        title:'Sign Up'
    })
};


// Sign in using passport local startegy and google startegy
module.exports.createSession=function(req,res){
    req.flash('success','Sign-In SuccessFully!')
    return res.redirect('/')
};
 
// Signup with user details
module.exports.create=async function(req,res){
    try {
        
        if (req.body.confirmPassword!=req.body.password){
            console.log('Password and Confirm Password is not same!')
            req.flash('error','Password and Confirm Password is not same!')
            return res.redirect('back')
        };
        let user=await User.findOne({email:req.body.email})
        if (!user){
            let newuser=await User.create({email:req.body.email,name:req.body.name,password:req.body.password})
            newuser.save();
            req.flash('success','Signup Successfull...')
        }else{
            req.flash('error','This email is already taken')
        }
        return res.redirect('sign-in')
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back')
    }
};

// Logout the session
module.exports.destroySession=function(req,res,next){
    req.logout(function(err){
        if(err){
            req.flash('error','Session Failed')
            return next(err)
        };
        req.flash('success','Logout Successful!')
        res.redirect('/')
        return
    })
};

// render the page for update the password
module.exports.updatePassword=function(req,res){
    if (req.isAuthenticated()){
        return res.render('updatePassword.ejs',{
            title:'Password'
        })
    }
    return res.redirect('/')
    
};


// Update the password with the help of older
module.exports.updateNewPassword=async function(req,res){
    if (req.isAuthenticated()){

        let user=await User.findById(res.locals.user._id);
        if (!user.verifyPasswordSync(req.body.password)){
            req.flash('error','Please provide the correct password');
            return res.redirect('back');
        }
        if (req.body.confirmPassword!=req.body.newpassword){
            req.flash('error','Provided password is not same..');
            return res.redirect('back');
        };
        user=await User.findByIdAndUpdate(res.locals.user._id,{password:req.body.confirmPassword});
        user.save();
        req.flash('success','Password changed successful!');
        return res.redirect('/')
    }
    return res.redirect('/users/sign-in')
}