const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://rutull009:rutull009@tonystark.5m0zfsz.mongodb.net/test5?retryWrites=true&w=majority&appName=tonystark")
    .then(()=>console.log("connected"))