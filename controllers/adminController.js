// const express=require('express')
const db=require('../configs/database')
const {AdminAuth,ProductCategory}=require('../models/adminSchema')
const request = require('request');
const bcrypt = require('bcrypt');
const fs = require('fs');
const index=(req,res)=>{
    res.render('admin/index')
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
    addProductGet
}