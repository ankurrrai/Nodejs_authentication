const express=require('express');
const app=express();
const port=8000;
const db =require('./config/mongoose');
const router = require('./routes');
const path=require('path');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle=require('./config/passport-google-strategy');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const MongoStore=require('connect-mongo')

// Use Assests folder
app.use('/assests',express.static(__dirname+'/assests'))
app.use(express.urlencoded());
app.use(cookieParser());

// Setup for EJS
app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// used session based authentication
app.use(session({
    name:'NodeJs Authentication',
    secret:process.env.NodejsAuthenticationSessionScrectKey,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10),
    },
    store:MongoStore.create({
        mongoUrl:process.env.NodejsAuthenticationMongodbURL
    })
}));

// set for passport 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); // custmo passport authentication

// setup for flash which used to show message 
const flash=require('connect-flash');
const customMW=require('./config/customMiddleware');
app.use(flash());
app.use(customMW.setFlash);

app.use('/',require('./routes/index'))

// Listen to Server
app.listen(port,function(err){
    if(err) { console.log('Server Error :',err) }

    console.log('Server is running on port :' ,port)
})