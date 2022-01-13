const express = require("express");
const connect = require("./Config/conntectDB");
const User = require("./models/User");
require('dotenv').config({ path: './Config/.env' })

var app = express();

connect();


app.use(express.json());

//CRUD

app.post("/add", async (req,res)=>{
    const {fullName,email,phone}=req.body;
    try {
        const newUser = new User({
         fullName,
         email,
         phone
        });
        await newUser.save();
        res.send(newUser);
    } catch (error) {
        console.log(error);
    }
})
//get users

app.get('/get',async(req,res)=>{
const users = await User.find()
res.send(users)
})

//get a specific user
app.get("/get/:id", async (req,res)=>{
    const users = await User.findById(req.params.id);
    res.send(users);
});

// update
app.put("/update/:id", async(req,res)=>{
    try {
        const editedUser = await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
        res.send(editedUser);
    } catch (error) {
        console.log(error)
    }
});

//delete user
app.delete("/delete/:id", async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send("User Deleted")
    } catch (error) {
        console.log(error)
    }
})

var PORT = process.env.PORT || 4000;


app.listen(PORT,(err)=>
err? console.log(err) : console.log(`server is running on port ${PORT}`)
);


