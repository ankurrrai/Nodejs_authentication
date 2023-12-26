const mongoose=require('mongoose');

main().catch(function(err){
    console.log('error while connecting db ',err)
})

async function main (){
    mongoose.connect('mongodb://127.0.0.1:27017/nodejs_authentication_development')
}

const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error while eastablished the db '));
db.once('open',function(){
    console.log('Connection has eastablished with db')
});

module.exports=db;

