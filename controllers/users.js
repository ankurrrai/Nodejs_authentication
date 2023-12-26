const User=require('../models/users')

module.exports.signIn=function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('signIn.ejs',{
        title:'Sign In'
    })
};

module.exports.signUp=function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('signUp.ejs',{
        title:'Sign Up'
    })
};


module.exports.createSession=function(req,res){
    req.flash('success','Sign-In SuccessFully!')
    return res.redirect('/')
};

module.exports.create=async function(req,res){
    try {
        console.log('started',req.body)
        if (req.body.confirmPassword!=req.body.password){
            console.log('Password and Confirm Password is not same!')
            req.flash('error','Password and Confirm Password is not same!')
            return res.redirect('back')
        };
        let user=await User.findOne({email:req.body.email})
        if (!user){
            let newuser=await User.create({email:req.body.email,name:req.body.name,password:req.body.password})
            req.flash('success','Signup Successfull...')
        }else{
            req.flash('error','This email is already taken')
        }
        return res.redirect('sign-in')
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back')
    }
}