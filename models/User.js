const bcrypt = require('bcryptjs/dist/bcrypt')
const mongoose= require('mongoose')
const jwt= require('jsonwebtoken')
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

 UserSchema.pre('save', async function (next) {
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt)
    next()
 })

 UserSchema.methods.getName = function(){
    return this.name
 }

 UserSchema.methods.createToken= function(){
    return jwt.sign({userID:this._id, name:this.name}, process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
 }

 UserSchema.methods.comparePass= async function (password) {
    const isMatch= await bcrypt.compare(password, this.password)
    return isMatch
 }

 module.exports = mongoose.model('User', UserSchema)