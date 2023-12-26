const express=require('express');
const router=express.Router();
const passport=require('passport')
const usersController=require('../controllers/users');

router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create)
router.post('/create-session',passport.authenticate('local',{failureRedirect:'sign-in'}),usersController.createSession)
module.exports=router