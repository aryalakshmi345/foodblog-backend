const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("Mongo db Atlas successfully connected with fbServer");
}).catch((err)=>{
    console.log(`"Mongodb connection failed error is : ${err}`);
})