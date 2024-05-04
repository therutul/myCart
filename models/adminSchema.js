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
const productSubCategory=mongoose.Schema({
    subCategoryName:{
        type:String,
        required:true
    },
    subCategoryImage:{
        type:String,
        required:true
    },
    subCategoryDescription:{
        type:String,
    },
    subCategoryPrice:{
        type:Number,
    },
    subCategoryQuantity:{
        type:Number,
    },
    subCategoryStatus:{
        type:String,
    }
})
const ratingSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference your User model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Assuming a 1-5 star rating system
    },
    comment: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now // Timestamp for rating creation
    }
})
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    productImages: {
        type: [String],
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDiscount: {
        type: Number,
        default: 0
    },
    productStock: {
        type: Number,
        required: true
    },
    productType: String,
    productMfg: Date,
    productExpiry: Date,
    productTags: [String],
    productRatings: {
        type: [ratingSchema] // Array of Rating subdocuments
    }
});

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    // userEmail:{
    //     type:String,
    //     required:true
    // },
    // userPassword:{
    //     type:String,
    //     required:true
    // },
    // userAddress:{
    //     type:String,
    //     required:true
    // },
    // userPhone:{
    //     type:String,
    //     required:true
    // },
    // userImage:{
    //     type:String,
    //     required:true
    // },
    // userStatus:{
    //     type:String,
    //     required:true
    // },
    
})
const AdminAuth=mongoose.model("AdminAuth",adminAuth)
const ProductCategory=mongoose.model("ProductCategory",productCategory)
const Product=mongoose.model("Product",productSchema)
const Rating=mongoose.model("Rating",ratingSchema)
const User=mongoose.model("User",userSchema)
module.exports={
    AdminAuth,
    ProductCategory,
    Product,
    Rating,
    User

}