const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=> console.log('mongodb connect'))
.catch(err => console.log(err))


app.get('/',(req,res)=>res.send('Hello Worlds~~~'))

app.post('/register',(req,res)=>{

    //회원가입 시 필요한 정보 -> DB
    
    const user = new User(req.body)

    user.save((err,userInfo)=>{
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success:true
        })
    })


})

app.listen(port,()=> console.log('example app on port ${port}'))