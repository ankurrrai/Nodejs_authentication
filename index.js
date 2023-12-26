const express=require('express');
const app=express();
const port=8000;
const db =require('./config/mongoose');
const router = require('./routes');
const path=require('path');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const expressLayouts=require('express-ejs-layouts');

const session=require('express-session');
const cookieParser=require('cookie-parser');
const MongoStore=require('connect-mongo')

app.use('/assests',express.static(__dirname+'/assests'))
app.use(express.urlencoded());
app.use(cookieParser());
	
app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(session({
    name:'NodeJs Authentication',
    secret:'NodeJs',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10),
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/nodejs_authentication_development'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

const flash=require('connect-flash');
const customMW=require('./config/customMiddleware');
app.use(flash());
app.use(customMW.setFlash);

app.use('/',require('./routes/index'))
app.listen(port,function(err){
    if(err) { console.log('Server Error :',err) }

    console.log('Server is running on port :' ,port)
})