const mongoose=require('mongoose');

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
        bcrypt: true, //Encryption provided
        rounds: 9
    }
},{
    timestamps:true
});

userSchema.plugin(require('mongoose-bcrypt')) //used for passpword encrytion refer its documnetions for more

const User=mongoose.model('User',userSchema);
module.exports=User