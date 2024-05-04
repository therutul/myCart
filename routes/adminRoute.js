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

const productImgStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'storage/productimg')
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
// const productImgUpload = multer({ storage: productImgStorage, fileFilter: imageFilter }).array('productImg', 4)

// const productImgUpload = multer({
//     storage: productImgStorage,
//     fileFilter: imageFilter,
//     limits: { files: 4 } // Limit the number of files to 4
// })

const productImgUpload = multer({
    storage: productImgStorage,
    fileFilter: imageFilter,
    limits: { files: 4 } // Limit the number of files to 4
}).fields([
             { name: 'productImg1', maxCount: 1 },
             { name: 'productImg2', maxCount: 1 },
             { name: 'productImg3', maxCount: 1 },
             { name: 'productImg4', maxCount: 1 }
         ]);
    
//also can be use with for specific fields .fields([
//          { name: 'productImg1', maxCount: 1 },
//          { name: 'productImg2', maxCount: 1 },
//          { name: 'productImg3', maxCount: 1 },
//          { name: 'productImg4', maxCount: 1 }
//      ]);

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
router.get('/remove-product-category/:categoryId',adminController.removeProductCategory)
router.get('/edit-product-category/',adminController.editProductCategory)
router.post('/upload/productcategory',productCategoryUpload,adminController.uploadProductCategoryImage)
router.get('/add-product',adminController.addProductGet)
router.post('/add-product',productImgUpload,adminController.addProductPost)
router.post('/edit-product',productImgUpload,adminController.editProduct)
router.get('/orders',adminController.orders)
router.get('/products',adminController.products)
// router.get('/custom',indexController.custom)
// router.post('/verify',hcaptchaMiddleware,indexController.verify)
// router.post('/captcha',indexController.captcha)
module.exports=router






//if you dont user .array method then go with this. this will even upload one file
// router.post('/add-product',productImgUpload.fields([
//     {name:'productImg1', maxCount:1},
//     {name:'productImg2', maxCount:1},
//     {name:'productImg3', maxCount:1},
//     {name:'productImg4', maxCount:1},
// ]),adminController.addProductPost)