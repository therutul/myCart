// const express=require('express')
const db=require('../configs/database')
const request = require('request');
const index=(req,res)=>{
    res.render('admin/index')
}

module.exports={
    index
}