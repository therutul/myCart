// const express=require('express')
const db=require('../configs/database')
const request = require('request');
const index=(req,res)=>{
    res.render('index')
}
const custom=(req,res)=>{
    res.render('custom')
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

module.exports={
    index,
    custom,
    verify
}