const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
app.use(cookieParser());

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
app.post('/login',(req,res)=>{
    //요청된 이메일 디비에 있는지 찾기
    console.log('이메일 디비 찾기 시작')
    User.findOne({ email : req.body.email }, (err,user)=>{
        if(!user){
            return res.json({
                loginSuccess : false,
                message:"제공되는 이메일이 없습니다."
            })
        }

    //디비에 있다면 비밀번호 맞는지 확인
        user.comparePassword(req.body.password,(err,isMatch)=>{
            console.log('비번 찾기 시작')
            if(!isMatch)
            return res.json({loginSuccess : false , message : "비밀번호가 틀림"
        
            //비밀번호까지 맞다면 토큰을 생성
        
        })
    
        
        user.generateToken((err,user)=>{
            console.log('token 생성 시작')
            if(err) return res.status(400).send(err);

            //토큰을 저장한다 쿠키에다가
            res.cookie("x_auth", user.token)
            .status(200)
            .json({loginSuccess:true,userId:user._id})
        
        })
     })
  })    
})

app.listen(port,()=> console.log('example app on port'))