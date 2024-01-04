const express=require('express');
const router=express.Router();


const homeController=require('../controllers/home');
router.use('/users',require('./users')); //call the users.js
router.get('/',homeController.home); // render the home page

module.exports=router