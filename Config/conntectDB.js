const mongoose = require("mongoose");

const connect = async () =>{
    try {
        await mongoose.connect(process.env.db);
        console.log("database connected");
    } catch (error) {
     console.log(error.message);   
    }
};


module.exports = connect; 