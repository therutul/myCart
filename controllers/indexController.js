// const express=require('express')
const db=require('../configs/database')
const jwt = require('jsonwebtoken')
const {AdminAuth,ProductCategory,Product,Rating,User}=require('../models/adminSchema')
const request = require('request');
const index=async(req,res)=>{
    const getProducts=await Product.find({}).populate('productCategory')
    res.render('index',{getProducts})
}
const custom=(req,res)=>{
    res.render('custom')
}

const ratingPost= async(req,res)=>{
    
    const {productId} = req.params;
    console.log(req.params)
    console.log("================================================")
    console.log(productId)
    console.log("================================================")
    const {rating,comment} = req.body;
    console.log(rating)
    console.log("================================================")
    console.log(comment)
    console.log("================================================")

    const product=await Product.findById(productId);
    const userId=req.cookies.logged
    console.log(req.session.user)
    // req.session.user = "rutul"
    // const user = await User.findOne({_id:userId})
    if(product)
    try {
        // Check if product exists
        // const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Check if user is logged in (implement authentication logic here)
        // if (!req.user) { // Replace `req.user` with your authentication check
        //     return res.status(401).json({
        //         message: 'You must be logged in to rate'
        //     });
        // }
        // const newUser=new User({
        //     userName:"rutul"
        // })
        // await newUser.save()
        // Create a new rating
        const newRating = new Rating({
            userId: "6635225fa0f47cce4beda2a1", // Assuming user ID is available in req.user
            productId,
            rating,
            comment,
        });

        // Save the rating and update the product's ratings
        // await newRating.save();
        console.log(newRating)
        console.log("1================================================")
        product.productRatings.push(newRating);
        // await product.save();
        console.log(product.productRatings)
        console.log("3================================================")
        console.log(product)
        console.log("4================================================")

        res.json({
            message: 'Rating submitted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred'
        });
    }
}

const product=async(req,res)=>{
    const productId=req.query.id
    const productInfo=await Product.findById(productId).populate('productCategory')
    res.render('product',{productInfo})

}




// // 6Le4z7gpAAAAAG_ZSfszwql4t6_d2Gn47zcspgSX
// // 6Le4z7gpAAAAAGSN5JENyfsYhWTFScwRFeOE3Tse
// const captcha = (req, res) => {
//     if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
//         return res.json({ "responseError": "captcha error" });
//     }
//     const secretKey = "6Le4z7gpAAAAAGSN5JENyfsYhWTFScwRFeOE3Tse"
//     const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
//     request(verificationURL, function (error, response, body) {
//         body = JSON.parse(body);
//         if (body.success !== undefined && !body.success) {
//             return res.json({ "responseError": "Failed captcha verification" });
//         }
//         res.json({ "responseSuccess": "Success" });
//     });
// };

// FCMH27P2EML1FCOT
// A1EA2LD0FB0H3RENHC59O9QVOUCJB73A9MECSMQMM84SEQKDFC87EEJPRM

const verify=(req,res)=>{
    // console.log(req.body)
    // res.json({message: 'verified!', hcaptcha: req.hcaptcha});
    // console.log(req.hcaptcha)
    const hcaptchaResponse = req.body['h-captcha-response'];
    // const hcaptchaResponse = req.hcaptcha.response; // Access token from req.hcaptcha
    console.log(hcaptchaResponse)
    if (!hcaptchaResponse) {
        // Handle case where no hCaptcha token is provided
        return res.status(400).json({ error: 'No hCaptcha token provided' });
    }

    // Now you can use hcaptchaResponse to verify the captcha token with hCaptcha service
    // For example, you can send a request to hCaptcha's verification endpoint

    // Replace the following lines with your verification logic
    console.log('hCaptcha token:', hcaptchaResponse);
    // Mock response for demonstration
    res.json({ message: 'Verified!', hcaptchaResponse });
}
const customPost=async(req,res)=>{
    // req.session.user=encodeURIComponent("6635225fa0f47cce4beda2a1")
    req.session.user="rutul"
    console.log(req.session)


    res.redirect('/')
}
const customGet=async(req,res)=>{
    // req.session.user=encodeURIComponent("6635225fa0f47cce4beda2a1")
    req.session.user="rutul"
    console.log(req.session)


    res.redirect('/')
}
const checkSession= async (req, res) => {
    // Check if the session user exists
    res.send(req.session);
    const payload = { user: req.session.user };
    const token = jwt.sign(payload, "123456", { expiresIn: '1h' });
    res.cookie('token', token);
    // res.send(token)
    // res.send(encodeURIComponent("6635225fa0f47cce4beda2a1"))
};

const mongooseQueryGet=(req,res)=>{
    res.render('mongoose')
}

const mongooseQueryPost= async(req,res)=>{
    try {
        const getQuery=req.body.queryData
        const result = await eval(getQuery)
        // console.log(JSON.stringify(result, null, 2)) //only console.log(result) will give wrapped result of object and array
        console.dir(result)
        res.json(result)
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

module.exports={
    index,
    custom,
    verify,
    ratingPost,
    customPost,
    customGet,
    checkSession,
    product,
    mongooseQueryGet,
    mongooseQueryPost
}