const {Router, application}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const { noteModel } = require("../Model/Note.model")
const notesController=Router()

notesController.get("/",async(req,res)=>{

    const notes=await noteModel.find({userId:req.body.userId})
    res.send(notes)
})


notesController.post("/create",async(req,res)=>{
    const {Heading,Note,Tag,userId}=req.body
    const note=new noteModel({
        Heading,
        Note,
        Tag,
        userId
    })
    try{
        await note.save()
        res.send({massage:"Note Created.."})
    }
    catch(err){
        res.send({massage:"Something wrong.."})
    }
})

notesController.delete("/delete/:noteId",async(req,res)=>{
    const {noteId}=req.params
    const deleteNote=await noteModel.findByIdAndDelete({_id:noteId,userId:req.body.userId})
    if(deleteNote){
        res.send({massage:"deleted"})
    }
    else{
        res.send({massage:"could't deleted.."})
    }
})

notesController.patch("/edit/:noteId",async(req,res)=>{
    const {noteId}=req.params
    const updateNote=await noteModel.findOneAndUpdate({_id:noteId,userId:req.body.userId},{...req.body})
    if(updateNote){
        res.send({massage:"Updated"})
    }
    else{
        res.send({massage:"could't Updated.."})
    }
    
})
notesController.get("/:id",async(req,res)=>{
    const {id}=req.params
    const data=await noteModel.findById({_id:id,userId:req.body.userId})
    if(data){
        res.send(data)
    }
    else{
        res.send("Not Found")
    }
})

module.exports={
    notesController
}