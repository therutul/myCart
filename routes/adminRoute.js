const express=require('express')
const hcaptcha = require('express-hcaptcha');
const SECRET = "ES_7c79db34efb9474faf7972d1321876ac";
const router=express.Router()
const multer=require('multer')
const indexController=require('../controllers/indexController')
const adminController=require('../controllers/adminController')

const productCategoryStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'storage/productcategory')
    },
    filename:(req,file,cb)=>{
        const timestamp=Date.now()
        const fileName=`${timestamp}-${file.originalname}`
        cb(null,fileName)
    }
})

const imageFilter=(req,file,cb)=>{
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Invalid image format. Please upload a JPEG & PNG Format.';
        cb(null, false);
    }
}


const productCategoryUpload = multer({ storage: productCategoryStorage, fileFilter: imageFilter }).single('productCategoryImg');


const hcaptchaMiddleware = hcaptcha.middleware.validate(SECRET);
router.get('/',adminController.index)
router.get('/signin',adminController.signin)
router.get('/signup',adminController.signup)
router.get('/profile',adminController.profile)
router.get('/billing',adminController.billing)
router.get('/settings',adminController.settings)
router.get('/pricing',adminController.pricing)
router.get('/error',adminController.error404)
router.get('/forget-password',adminController.forgetpassword)
router.get('/add-product-category',adminController.addProductCategory)
router.post('/upload/productcategory',productCategoryUpload,adminController.uploadProductCategoryImage)
// router.get('/custom',indexController.custom)
// router.post('/verify',hcaptchaMiddleware,indexController.verify)
// router.post('/captcha',indexController.captcha)
module.exports=router