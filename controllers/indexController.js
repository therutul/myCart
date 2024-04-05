const express=require('express')
const db=require('../configs/database')
const index=(req,res)=>{
    res.render('index')
}
const custom=(req,res)=>{
    res.render('custom')
}
module.exports={
    index,
    custom
}