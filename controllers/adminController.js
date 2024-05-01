// const express=require('express')
const db=require('../configs/database')
const AdminAuth=require('../models/adminSchema')
const request = require('request');
const bcrypt = require('bcrypt');
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
const addProductCategory=(req,res)=>{
    res.render('admin/add-product-category')
}
const signup=async (req,res)=>{
    const newLogin=new AdminAuth({
        adminUname:req.body.uname,
        adminPass:req.body.password
    })
    await newLogin.save()
    res.redirect('back')
}
const uploadProductCategoryImage =(req,res)=>{
    console.log(req.file)
    if (!req.file) {
        req.flash('error', 'No file uploaded.');
        return res.redirect('back');
    }
    req.flash('success', 'Category Successfully Added');
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
    uploadProductCategoryImage
}