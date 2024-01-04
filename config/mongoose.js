const mongoose=require('mongoose');

// connect the mongodb
main().catch(function(err){
    console.log('error while connecting db ',err)
})

async function main (){
    mongoose.connect(process.env.NodejsAuthenticationMongodbURL)
}

// acquire the connection
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error while eastablished the db '));
db.once('open',function(){
    console.log('Connection has eastablished with db')
});

module.exports=db;

