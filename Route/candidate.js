const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Candidate = require('../model/Candidate');


const jwtPass = require('../config');
const userMiddleware = require('../middleware/UserAuth');
const User = require('../model/user');
const { route } = require('./userRoute');
// /candidate :Post -create new candidate
// /candidate/:candidateId :PUT -update an existing candidate
// /candidate/:candidateId :DELETE -delete candidate from the list


router.use(express.json());

router.post('/', userMiddleware, async (req, res) => {
    const adharCardNumber = req.adharCardNumber;
    const user = await User.findOne({ adharCardNumber });
    if (user.role != 'admin') {
        res.json({
            "msg": "invalid "
        })
        return;
    }
    const newCandidate=await Candidate.create({
        name:req.body.name,
        party:req.body.name
    })
    res.json({
        "msg":"new candidate is create"
    })

})
router.put('/:candidateId',userMiddleware,async(req,res)=>{
    const candidateId=req.params.candidateId;
    const adharCardNumber = req.adharCardNumber;
    const user = await User.findOne({ adharCardNumber });
    if (user.role != 'admin') {
        res.json({
            "msg": "invalid "
        })
        return;
    }

    const updateCandidate=await Candidate.findByIdAndUpdate(candidateId,{

    })
})
router.delete('/:candidateId',userMiddleware,async(req,res)=>{
    const candidateId=req.params.candidateId;
    const adharCardNumber = req.adharCardNumber;
    const user = await User.findOne({ adharCardNumber });
    if (user.role != 'admin') {
        res.json({
            "msg": "invalid "
        })
        return;
    }

    const updateCandidate=await Candidate.findByIdAndDelete(candidateId);
    res.json({
        "msg":"user is deleted"
    })
})

module.exports=router;