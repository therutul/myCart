const express=require('express')
const hcaptcha = require('express-hcaptcha');
const SECRET = "ES_7c79db34efb9474faf7972d1321876ac";
const router=express.Router()
const indexController=require('../controllers/indexController')



const hcaptchaMiddleware = hcaptcha.middleware.validate(SECRET);
router.get('/',indexController.index)
router.get('/custom',indexController.custom)
router.post('/verify',hcaptchaMiddleware,indexController.verify)
// router.post('/captcha',indexController.captcha)
module.exports=router