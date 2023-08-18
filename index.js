const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require("./routes/user")
const PORT = process.env.PORT || 8003
app.use(express.json())           // To parse the json


app.use('/', indexRouter)
app.use('/users', userRouter)


app.listen(PORT, ()=>{
    console.log('server listening' + PORT)
})