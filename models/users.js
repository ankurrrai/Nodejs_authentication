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
        required: true, 
        rounds: 9
    }
},{
    timestamps:true
});

userSchema.plugin(require('mongoose-bcrypt'))

const User=mongoose.model('User',userSchema);
module.exports=User