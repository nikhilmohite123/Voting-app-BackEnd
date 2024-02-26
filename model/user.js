const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('');

// Define schemas
const UserSchema = new mongoose.Schema({
    // Schema definition here
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    }
    ,
    mobile:{
        type:String,
        
    },
    address:{
        type:String,
        require:true
    },
    adharCardNumber:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["voter","admin"],
        default:"voter"
    },
    isVoted:{
        type:Boolean,
        default:false
    }
});



const User = mongoose.model('users', UserSchema);


module.exports = User;