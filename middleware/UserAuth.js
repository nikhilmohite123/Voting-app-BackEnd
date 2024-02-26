const User=require('../model/user');
const jwt=require('jsonwebtoken');
const jwtPass=require('../config');



function authentication(req,res,next){
    const token=req.headers.authorization;
    try {
        const validToken=jwt.verify(token,jwtPass);
        req.adharCardNumber=validToken.adharCardNumber;

        next();
        return;
    } catch (error) {
        res.json({
            "msg":"in valid token"
        })
    }
}
module.exports=authentication;