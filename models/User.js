const mongoose= require('mongoose')
 const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please provide name"],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required: [true, "Please provide email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique:true
    },
    password:{
        type:String,
        required: [true, "Please provide password"],
        minlength:6
    },
 }
 )

 

 module.exports = mongoose.model('User', UserSchema)