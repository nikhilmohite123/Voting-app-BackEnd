const express = require('express')
const router = express.Router()
const jwt=require('jsonwebtoken')
const User=require('../model/user');
const userMiddleware=require('../middleware/UserAuth')


const jwtPass=require('../config')

router.use(express.json());

// 
router.post('/signup',async(req,res)=>{
    
    const adharCardNumber=req.body.adharCardNumber;
    const password=req.body.password;
    const name=req.body.name;
    const age=req.body.age;
    const email=req.body.email;
    const address=req.body.address;
    const mobile=req.body.mobile;
    const role=req.body.role
    const userExist= await User.findOne({adharCardNumber})
    if(userExist!=null){
        res.status(409).json({
          "msg":  "user alredy exist plz login"
        })
        return;
    }

    const newUser={
        name:name,
        age:age,
        email:email,
        mobile:mobile,
        address:address,
        adharCardNumber:adharCardNumber,
        password:password,
        role:role
    }
    
    await User.create(newUser).then(()=>{
        res.status(200).json({
           "msg": "user successfull in sign up"
        })
    })
})

router.post('/login',async(req,res)=>{
    const adharCardNumber=req.body.adharCardNumber;
    const password=req.body.password;

    const userExist=await User.findOne({adharCardNumber,password});
    if(userExist==null){
        res.status(500).json({
            "msg":"plz sigin first in valid authentication"
        })
        return;
    }
    const token=jwt.sign({adharCardNumber,jwtPass});
    res.json({
        token:token
    })
})

// user profile:
// /profile: GET -get user profile info
// /profile/password :put -change the password

router.get('/profile',userMiddleware,async(req,res)=>{
    
    const adharCardNumber=decode.adharCardNumber;

    const profile=await User.findOne({adharCardNumber});
    res.json({
        profile
    })
})
router.put('/profile/password',userMiddleware,async(req,res)=>{
  
    const adharCardNumber=decode.adharCardNumber;
    const password=req.body.password;

    const profile=await User.findOneAndUpdate({adharCardNumber},{
        password:password
    });
    res.json({
        "msg":"passWord is update"
    })
})

module.exports=router