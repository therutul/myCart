const mongoose=require('mongoose')
const adminAuth=mongoose.Schema({
    adminUname:{
        type:String,
        required:true
    },
    adminPass:{
        type:String,
        required:true
    },
})
const productCategory = mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryImage:{
        type:String,
        required:true
    },
    categoryDescription:{
        type:String,
        required:true
    },
    categoryPrice:{
        type:Number,
        required:true
    },
    categoryQuantity:{
        type:Number,
        required:true
    },
    categoryStatus:{
        type:String,
        required:true
    }
})
const AdminAuth=mongoose.model("AdminAuth",adminAuth)
module.exports=AdminAuth