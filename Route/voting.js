const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Candidate = require('../model/Candidate');
const User = require('../model/user');

const userMiddleware = require('../middleware/UserAuth');
const { findOne } = require('../model/user');


// Voting:post
// /candidates :GET -get the list of candidates.
// /vote/:candidateId: Post -vote for spesific candidates

router.get('/candidates',userMiddleware,async(req,res)=>{
    const allCandidates=await Candidate.find({});
    res.json({allCandidates});

})
router.post('/vote/:candidateId',userMiddleware,async(req,res)=>{
    const adharCardNumber=req.adharCardNumber;
    const candidateId=req.params.candidateId;
    const user=await User.findOne({adharCardNumber});
    if(user.role=="admin"){
        res.json({
            "msg":"you not able to vote"
        })
        return;
    }
const candidate=await Candidate.findByIdAndUpdate(candidateId,{
    "$inc": { voteCount: 1 },
     "$push": { votes: { user:user._id, votedAt: Date.now() } } 


});


   

})
 // votes:[
    //     {
    //         user:{
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref:'User',
    //             require:true
    
    //         },
    //         VotedAt:{
    //             type:Date,
    //             dafalut:Date.now()
    //         }
    //     }
    //    ]
    //    ,
    //    voteCount:{
    //     type:Number,
    //     default:0
    //    }