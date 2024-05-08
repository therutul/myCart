const express=require('express')
const app=express()
const PORT=process.env.PORT||5500
const jwt = require('jsonwebtoken')
const path=require('path')
const {AdminAuth,ProductCategory,Cart,Product,Rating,User}=require('./models/adminSchema')
const browserSync = require('browser-sync');
const session = require('express-session');
const flash = require('connect-flash');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const request = require('request');
const hcaptcha = require('express-hcaptcha');
const indexRouter=require('./routes/indexRoute')
const adminRouter=require('./routes/adminRoute')
const SECRET = "ES_7c79db34efb9474faf7972d1321876ac";





app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")))
app.use(express.static(path.join(__dirname,"views")))
app.use(express.static(path.join(__dirname,"storage")))
// app.use(express.static(path.join(__dirname,"views/admin")))
app.use(express.urlencoded())
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'secret', // Change this to a random string
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(cookieParser());
app.use(function(req, res, next) {
    res.locals.success_messages = req.flash('success');
    res.locals.success_messages2 = req.flash('success2');
    res.locals.error_messages = req.flash('error');
    res.locals.error_messages2 = req.flash('error2');
    next();
});
app.use(async (req, res, next) => {
    // console.log(res.locals.user)
    try {
      const userId=req.cookies.logged
    //   const user = await User.findOne({_id:userId})
      const getCart=await Cart.countDocuments({userId:userId})
    //   res.locals.user = user; // Add user information to response locals
      res.locals.cartCount=getCart;
      console.log(res.locals.cartCount);
      next();
    } catch (error) {
      next(error);
    }
  });

const bs = browserSync.create();
bs.init({
    proxy: 'http://localhost:5500', // Proxy requests to your Express server
    port: 3000, // Specify the port for BrowserSync
    // ui: {
    //     port: 3001 // Specify the port for BrowserSync UI
    // },
    ui:false,
    files: ['**/*.ejs', '**/*.css', '**/*.js'], // Files to watch for changes
    injectChanges: true, // Inject CSS changes directly into the browser (optional)
    notify: false,
    browser: 'firefox', // Optional: specify a specific browser to launch
    ghostMode: false,
    open: false,
    // browser: 'firefox'
});


// const livereload = require("livereload");
// const connectLiveReload = require("connect-livereload");
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, "views"));
// liveReloadServer.server.once("connection", () => {
//     setTimeout(() => {
//         liveReloadServer.refresh("/");
//     }, 100);
// });
// app.use(connectLiveReload());





app.use('/',indexRouter)
app.use('/admin/',adminRouter)
app.listen(PORT)