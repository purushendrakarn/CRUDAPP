const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()



// mounting middleware function
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080





// schema
 
const schemaData = mongoose.Schema({
    name : String , 
    email : String ,
    mobile : Number , 
},{
    timestamps : true
})

 

// model
const userModel = mongoose.model("user",schemaData)





// middleware get api     //read data

// ​http://localhost:8080


app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({ success : true , data: data})

})





// create data  // save data in mongo db

// ​http://localhost:8080/create
/* 
name,
email,
mobile

*/

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true , message : " data saved successfully" , data : data})

})





// delete api 

// ​http://localhost:8080/delete/id

app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true , message : " data delete successfully" , data : data})

})




// update data

//​http://localhost:8080/update


app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id, ...rest} = req.body
    console.log(rest)
    const data = await userModel.updateOne({_id : _id} ,rest)
    res.send({success:true ,  message : "data updated successfully", data : data})
})




// connecting moongose
mongoose.connect("mongodb://127.0.0.1:27017/CRUDAPP")
.then(()=>{
    console.log("connected to db")
    app.listen(PORT,()=> console.log('server is running'))
})
.catch((err)=>console.log(err))

