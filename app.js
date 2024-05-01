const express=require('express')
const app=express()
const PORT=process.env.PORT||5500
const path=require('path')
const session = require('express-session');
const flash = require('connect-flash');

const multer=require('multer')
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
app.use(function(req, res, next) {
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    next();
});

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views"));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
app.use(connectLiveReload());


const productCategoryStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'storage/productcategory')
    },
    filename:(req,file,cb)=>{
        const timestamp=Date.now()
        const fileName=`${file.originalname}-${timestamp}`
        cb(null,fileName)
    }
})
const productCategoryUpload = multer({ storage: productCategoryStorage }).single('productCategoryImg');



app.use('/',indexRouter)
app.use('/admin/',adminRouter)
app.listen(PORT)