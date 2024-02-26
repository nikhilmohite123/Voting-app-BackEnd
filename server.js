const express=require('express');
const app=express();
const userRoute=require('./Route/userRoute');
const candidateRoute=require('./Route/candidate');
app.use(express.json());



app.use('/user',userRoute);
app.use('/candidate',candidateRoute);

app.listen(3000,()=>{
    console.log("server is start");
});