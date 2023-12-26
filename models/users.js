const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true, 
    }
},{
    timestamps:true
});



const User=mongoose.model('user',userSchema);
module.exports=User