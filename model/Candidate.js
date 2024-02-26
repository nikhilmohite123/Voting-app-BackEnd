const mongoose = require('mongoose');

// Connect to MongoDB

mongoose.connect()
// Define schemas
const CandidateSchema = new mongoose.Schema({
    // Schema definition here
    name:{
        type:String,
        require:true
    },
   party:{
    type:String,
    require:true
   },
   votes:[
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            require:true

        },
        VotedAt:{
            type:Date,
            dafalut:Date.now()
        }
    }
   ]
   ,
   voteCount:{
    type:Number,
    default:0
   }
});



const candidate = mongoose.model('Candidates', CandidateSchema);


module.exports = candidate;