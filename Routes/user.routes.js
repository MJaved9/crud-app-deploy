const {Router}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const { userModel } = require("../Model/User.model")
const UserController=Router()

UserController.post("/signup",(req,res)=>{
    const {email,password,age}=req.body

    bcrypt.hash(password,4,async function(err,hash){
        if(err){
            res.send("Something Went WRong")
        }
        const user= new userModel({
            email,
            password:hash,
            age
        })
        try{
            await user.save()
        res.status(200).send({msg:"REGISTER_SUCCESS"})
        }
        catch(err){
            console.log(err)
            res.status(500).send({msg:"REGISTER_FAILURE"})
        }
        
    })
    
})

UserController.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    const hash=user.password
    bcrypt.compare(password,hash,async function(err,result){
        if(err){
            res.json("Something went WRog..")
        }
        if(result){
            const token=jwt.sign({userId:user._id},process.env.JWTSECRET)
            res.send({msg:"LOGIN_SUCCESS",token})
        }
        else{
            res.json("LOGIN_FAILURE")
        }
    })
    
})


module.exports={
    UserController
}