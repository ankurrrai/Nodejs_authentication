const express=require('express');
const router=express.Router();
const passport=require('passport')

//Setup the required controllers
const usersController=require('../controllers/users');
const resetController=require('../controllers/resetPassword')

router.get('/sign-in',usersController.signIn); //render the signin page
router.get('/sign-up',usersController.signUp); ////render the sigup page

router.post('/create',usersController.create) //Signup the user
router.post('/create-session',passport.authenticate('local',{failureRedirect:'sign-in'}),usersController.createSession) //local sigin in
router.get('/destroy-session',usersController.destroySession); //destroy the seesion
router.get('/update-password',usersController.updatePassword) ////render the update_password page
router.post('/update-new-password',usersController.updateNewPassword);


// Reset the user password
router.get('/reset-password',resetController.forgetPassword); //render the signin page
router.post('/forget-password',resetController.updateNewPassword); //sended mail to user email
router.get('/reset_password',resetController.resetPassword); //validation link and  render the reset form page
router.post('/new-password',resetController.newPassword); //update the new password

//google authentication
router.get('/auth/google',passport.authenticate('google',{scope:[ 'email', 'profile']})); //check the scope
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'sign-in'}),usersController.createSession) //Created session



module.exports=router