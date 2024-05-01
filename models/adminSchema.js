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
    },
    categoryPrice:{
        type:Number,
    },
    categoryQuantity:{
        type:Number,
    },
    categoryStatus:{
        type:String,
    }
})
const AdminAuth=mongoose.model("AdminAuth",adminAuth)
const ProductCategory=mongoose.model("ProductCategory",productCategory)
module.exports={
    AdminAuth,
    ProductCategory
}