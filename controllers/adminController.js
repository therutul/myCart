// const express=require('express')
const db=require('../configs/database')
const {AdminAuth,ProductCategory,Cart,Product,Rating,User,ProductType}=require('../models/adminSchema')
const request = require('request');
const bcrypt = require('bcrypt');
const fs = require('fs');
const index=async(req,res)=>{
    const user=await User.find({})
    const product=await Product.find({}).populate('productCategory')
    const cart=await Cart.find({})
    const category=await ProductCategory.find({})
    const userCount=await User.countDocuments({})
    const productCount=await Product.countDocuments({})
    const cartCount=await Cart.countDocuments({isPaid:true})
    const categoryCount=await ProductCategory.countDocuments({})
    res.render('admin/index',{user,product,cart,category,userCount,productCount,cartCount,categoryCount})
}
const signin=(req,res)=>{
    res.render('admin/signin')
}
const profile=(req,res)=>{
    res.render('admin/profile')
}
const billing=(req,res)=>{
    res.render('admin/billing')
}
const settings=(req,res)=>{
    res.render('admin/settings')
}
const pricing=(req,res)=>{
    res.render('admin/pricing')
}
const error404=(req,res)=>{
    res.render('admin/error')
}
const forgetpassword=(req,res)=>{
    res.render('admin/forget-password')
}

const signup=async (req,res)=>{
    const newLogin=new AdminAuth({
        adminUname:req.body.uname,
        adminPass:req.body.password
    })
    await newLogin.save()
    res.redirect('back')
}

const addProductCategory= async (req,res)=>{
    const renderCategory=await ProductCategory.find({})
    res.render('admin/add-product-category',{renderCategory})
}
const removeProductCategory= async (req,res)=>{
    const getCategoryId=await ProductCategory.findByIdAndDelete(req.params.categoryId)
    fs.unlink(`storage/productcategory/${getCategoryId.categoryImage}`, (err) => {
        if (err) {
            console.error('Error removing image file:', err);
            req.flash('error2', 'Failed to remove category image.');
            res.redirect('back');
        }
        // Success message (optional)
        req.flash('success2', 'Product Category Removed.');
        res.redirect('back');
    });
}

const uploadProductCategoryImage =async (req,res)=>{
    if(req.body.categoryId){
        if (req.fileValidationError) {
            req.flash('error', req.fileValidationError);
            return res.redirect('back');
        }
        if (req.file) {
            const updateCategory = await ProductCategory.findByIdAndUpdate(req.body.categoryId,{
                categoryName:req.body.categoryName,
                categoryImage:req.file.filename
            })
            return res.redirect('/admin/add-product-category');
        }
        const updateCategory = await ProductCategory.findByIdAndUpdate(req.body.categoryId,{
            categoryName:req.body.categoryName,
        })
        return res.redirect('/admin/add-product-category');
        
    }
    if (req.fileValidationError) {
        req.flash('error', req.fileValidationError);
        return res.redirect('back');
    }
    if (!req.file) {
        req.flash('error', 'No file uploaded.');
        return res.redirect('back');
    }

    const newProductCategory=new ProductCategory({
        categoryName:req.body.categoryName,
        categoryImage:req.file.filename
    })
    await newProductCategory.save()
    req.flash('success', 'Category Successfully Added');
    return res.redirect('back');
}
const editProductCategory= async (req,res)=>{
    
    const renderCategory=await ProductCategory.findById(req.query.categoryId)
    console.log(renderCategory)
    // const renderCategory=await ProductCategory.find({})
    res.render('admin/edit-product-category',{renderCategory})
}


const addProductGet= async (req,res)=>{
    const renderCategory=await ProductCategory.find({})
    res.render('admin/add-product',{renderCategory})
}
const addProductPost= async (req,res)=>{
    const { productName, 
        productCategory, 
        productCode, 
        productDescription, 
        productPrice, 
        productDiscount, 
        productStock, 
        productType, 
        productMfg, 
        productExpiry, 
        productTags } = req.body;
    if (!productName || !productCode || !productDescription || !productCategory || !productPrice || !productDiscount || !productStock || !productType || !productMfg || !productExpiry || !productTags) {
        req.flash('error', 'All fields are required');
        return res.redirect('back');
    }

    if (req.fileValidationError) {
        req.flash('error', req.fileValidationError);
        return res.redirect('back');
    }

    if (Object.keys(req.files).length !== 4) {
        req.flash('error', 'Please Upload Exactly Four Image Files');
        return res.redirect('back');
    }
    

    const productImgPaths = [
        req.files['productImg1'][0].filename,
        req.files['productImg2'][0].filename,
        req.files['productImg3'][0].filename,
        req.files['productImg4'][0].filename
    ];
    console.log(req.files['productImg1'][0].path)
    const newProduct = new Product({
        productName,
        productCode,
        productImages: productImgPaths,
        productDescription,
        productCategory: req.body.productCategory,
        productPrice,
        productDiscount,
        productStock,
        productType,
        productMfg,
        productExpiry,
        productTags: productTags.split(',') // Assuming product tags are comma-separated strings
    });
    console.log(newProduct)
    await newProduct.save();
    req.flash('success', 'Product Added Successfully');
    res.redirect('back')
}
const orders= async (req,res)=>{
    const getOrders=await Cart.find({}).populate('userId').populate('productId');
    console.log(getOrders)
    res.render('admin/orders',{getOrders})
}
const products= async (req,res)=>{
    if(req.query.view){
        const getProducts=await Product.findById(req.query.view).populate('productType')
        const renderCategory=await ProductCategory.find({})
        const selectedCategoryId = getProducts.productCategory
        // const productType = await Product.findById(req.query.view).populate('productType')
        // console.log(productType)
        // console.log(selectedCategoryId)
        return res.render('admin/productpage',{getProducts,renderCategory,selectedCategoryId})
        
    }
    const getProducts=await Product.find({})
    res.render('admin/productlist',{getProducts})
}
const addProductType=async(req,res)=>{
    const renderCategory=await ProductCategory.find({})
    const productType = await ProductType.find({}).populate('productCategory')
    // console.log(productType)
    // const productType = await ProductType.find({}).populate('productCategory.categoryName': 'Clothing');
    // const productType =  await ProductType.find({}).populate('productCategory',{'productCategory.categoryName': 'Clothing'})
    // const productType = await ProductType.find({ productCategory: "66350501cc194d21f0884249"}).populate('productCategory');
    console.log(productType)
    res.render('admin/add-product-type',{renderCategory,productType})
}
const addProductTypePost=async(req,res)=>{
    const newProductType=new ProductType({
        type:req.body.productType,
        productCategory:req.body.productCategory
    })
    await newProductType.save()
    req.flash('success', 'Product Type Added Successfully');
    res.redirect('back')
}
const viewProductType=async(req,res)=>{
    const productType = await ProductType.find({ productCategory: req.body.productCategory}).populate('productCategory');
    console.log(req.body.productCategory)
    res.json(productType)
}
const editProduct= async (req,res)=>{
    console.log("im here")
    const { productId,
        productName, 
        productCategory, 
        productCode, 
        productDescription, 
        productPrice, 
        productDiscount, 
        productStock, 
        productType, 
        productMfg, 
        productExpiry, 
        productTags } = req.body;
    const updateProduct= await Product.findById(productId)
    console.log(updateProduct.productImages[0])
    if (req.fileValidationError) {
        req.flash('error', req.fileValidationError);
        return res.redirect('back');
    }

    const productImgPaths=[]
    if(req.files['productImg1']){
        productImgPaths.push(req.files['productImg1'][0].filename)
    }else{
        productImgPaths.push(updateProduct.productImages[0])
    }
    if(req.files['productImg2']){
        productImgPaths.push(req.files['productImg2'][0].filename)
    }else{
        productImgPaths.push(updateProduct.productImages[1])
    }
    if(req.files['productImg3']){
        productImgPaths.push(req.files['productImg3'][0].filename)
    }else{
        productImgPaths.push(updateProduct.productImages[2])
    }
    if(req.files['productImg4']){
        productImgPaths.push(req.files['productImg4'][0].filename)
    }else{
        productImgPaths.push(updateProduct.productImages[3])
    }
    updateProduct.productName = productName;
    updateProduct.productCode = productCode;
    updateProduct.productImages = productImgPaths;
    updateProduct.productDescription = productDescription;
    updateProduct.productCategory = productCategory;
    updateProduct.productPrice = productPrice;
    updateProduct.productDiscount = productDiscount;
    updateProduct.productStock = productStock;
    updateProduct.productType = productType;
    updateProduct.productMfg = productMfg;
    updateProduct.productExpiry = productExpiry;
    updateProduct.productTags = productTags.split(',')

    // console.log(updateProduct)
    await updateProduct.save();
    req.flash('success', 'Product Updated Successfully');
    res.redirect('back')
}

module.exports={
    index,
    signin,
    profile,
    billing,
    settings,
    pricing,
    error404,
    signup,
    forgetpassword,
    addProductCategory,
    removeProductCategory,
    uploadProductCategoryImage,
    editProductCategory,
    addProductGet,
    orders,
    products,
    addProductPost,
    editProduct,
    addProductType,
    addProductTypePost,
    viewProductType
}