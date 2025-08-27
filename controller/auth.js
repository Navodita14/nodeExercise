const {createUser,getUserByEmail, getUserById}=require('../services/auth')
const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
const login = async (req,res)=>{
    const {email,password}= req.body
    try {
        const user= await getUserByEmail(email)
        if(!user){
            res.send(`user not found`)
        }
        const valid= await bcrypt.compare(password,user.password)
        if(!valid){
            res.send("Password wrong")
        }
        const token=jwt.sign({id:user.id, role:user.role}, process.env.JWT_SECRET, {expiresIn:'30d'})
        console.log(user);
        
        res.send(token)
    } catch (error) {
        res.send(error)
    }
}
const register=async (req,res)=>{
    console.log(req.body);
    
    const {name, password, email, role}=req.body
   try{
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt)
    const user= createUser(name, email, hashedPassword, role)
    res.status(201).json(user)
   }catch(e){
    console.log(e);
    
   }
}

const profile= async(req,res)=>{
    
    const id= req.user.id
    const user=await getUserById(id)
    console.log(user);
    res.status(200).json(user)
    
}

module.exports={login, register, profile}