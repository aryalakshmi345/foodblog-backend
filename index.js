require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

// create n express application
const fbServer = express()

fbServer.use(cors())
fbServer.use(express.json())
fbServer.use(router)

const PORT = 4000 || process.env.PORT

fbServer.listen(PORT,()=>{
    console.log(`Food Blog server started at port ${PORT} and waiting for client requests`);
})

fbServer.get('/',(req,res)=>{
  res.send(`<h1>Food Blog Server started and waiting for client requests!</h1>`)
})
