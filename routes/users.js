const express=require('express');
const router=express.Router();
const passport=require('passport')


const usersController=require('../controllers/users');
const resetController=require('../controllers/resetPassword')

router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create)
router.post('/create-session',passport.authenticate('local',{failureRedirect:'sign-in'}),usersController.createSession)
router.get('/destroy-session',usersController.destroySession);
router.get('/update-password',usersController.updatePassword)
router.post('/update-new-password',usersController.updateNewPassword);


// Reset the user password
router.get('/reset-password',resetController.forgetPassword);
router.post('/forget-password',resetController.updateNewPassword);
router.get('/reset_password',resetController.resetPassword);
router.post('/new-password',resetController.newPassword);

module.exports=router