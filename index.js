const express=require("express")
const {connection} = require("./Config/db")
const {UserController}=require("./Routes/user.routes")
const {notesController}=require("./Routes/notes.routes")
const cors=require("cors")
const PORT=8080
const {authentication}=require("./middlewares/authentication")
const { noteModel } = require("./Model/Note.model")
const app=express()
app.use(express.json())
app.use(cors())

app.get("/",async(req,res)=>{
    const data=await noteModel.find()
    res.send(data)
})
app.use("/user",UserController)
app.use(authentication)
app.use("/notes",notesController)






app.listen(PORT,async()=>{
    try{
        await connection
        console.log("DB Connection Okkk")
    }
    catch(err){
        console.log("Error i DB",err)
    }
    console.log(`Listening on PORT ${PORT}`)
})