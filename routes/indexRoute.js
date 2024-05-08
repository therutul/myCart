const express=require('express')
const hcaptcha = require('express-hcaptcha');
const SECRET = "ES_7c79db34efb9474faf7972d1321876ac";
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {AdminAuth,ProductCategory,Cart,Product,Rating,User}=require('../models/adminSchema')
const router=express.Router()
const indexController=require('../controllers/indexController')

passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        // Find user by username
        const user = await User.findOne({ userName: username });
        if (!user) {
          return done(null, false, { message: 'Unauthorized: Incorrect username or password.' });
        }
  
        // Compare passwords
        if (password !== user.userPassword) {
          return done(null, false, { message: 'Unauthorized: Incorrect username or password.' });
        }
  
        // User authenticated, return user object
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  
passport.serializeUser((user, done) => {
    done(null, user._id); // Example: serialize by user ID
  });
const hcaptchaMiddleware = hcaptcha.middleware.validate(SECRET);
router.get('/',indexController.index)

router.get('/custom',indexController.custom)
router.post('/verify',hcaptchaMiddleware,indexController.verify)
router.post('/products/:productId/rate',indexController.ratingPost)
// router.post('/captcha',indexController.captcha)
router.get('/product',indexController.product)
router.get('/cart',indexController.cartGet)
router.post('/add-to-cart',indexController.addToCart)
router.get('/mongoose',indexController.mongooseQueryGet)
router.post('/mongoose',indexController.mongooseQueryPost)
router.get('/productinfo',indexController.productInfo)
router.get('/login',indexController.loginGet)
router.post('/login',passport.authenticate('local'),indexController.loginPost)
router.get('/register',indexController.registerGet)
router.get('/myaccount',indexController.myAccount)
router.get('/myorder',indexController.myOrder)
router.post('/register',indexController.registerPost)
router.post('/edit-cart',indexController.editCart)
router.get('/verify/:token',indexController.verifyToken)
router.post('/post',indexController.customPost)
router.get('/get',indexController.customGet)
router.get('/check-session',indexController.checkSession)
module.exports=router