const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://gun5880:go154154@geon.9txca.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=> console.log('mongodb connect'))
.catch(err => console.log(err))


app.get('/',(req,res)=>res.send('Hello Worlds'))
app.listen(port,()=> console.log('example app on port ${port}'))