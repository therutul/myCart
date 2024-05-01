const mongoose=require('mongoose')
// mongoose.connect("mongodb://localhost:27017/nestCart")
//     .then(()=>console.log("connected"))

mongoose.connect("mongodb+srv://rutull009:rutull009@tonystark.5m0zfsz.mongodb.net/nestCart")
    .then(()=>console.log("connected"))
