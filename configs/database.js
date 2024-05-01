const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/nestCart")
    .then(()=>console.log("connected"))